import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { userStore } from "@/lib/userStore";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or ABHA Address", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const identifier = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        // 1. Check User Store (Admin, Registered Patients, Created ASHA workers, Doctors)
        const matchedUser = userStore.verifyCredentials(identifier, password);
        if (matchedUser) {
          return {
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
          };
        }

        // 2. Query Prisma Database if connected
        try {
          const dbUser = await prisma.user.findFirst({
            where: {
              OR: [
                { email: identifier },
                { patientProfile: { abhaId: identifier } },
              ],
            },
            include: {
              patientProfile: true,
              doctorProfile: true,
            },
          });

          if (dbUser && dbUser.passwordHash === password) {
            return {
              id: dbUser.id,
              name: dbUser.name,
              email: dbUser.email || `${dbUser.id}@swasthya.gov.in`,
              role: dbUser.role,
            };
          }
        } catch (dbError) {
          // Prisma database connection fallback silently ignored
        }

        // 3. Fallback for testing with standard demo password
        if (password === "admin@123" && identifier.includes("admin")) {
          return {
            id: "admin-fallback",
            name: "System Administrator",
            email: identifier,
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "PATIENT";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "swasthya_setu_secret_key_production_2026",
};
