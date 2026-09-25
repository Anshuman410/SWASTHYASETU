import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SwasthyaSetu | Universal Healthcare Coordination Platform",
  description: "Unified AI-powered healthcare ecosystem bridging rural and urban patients, ASHA workers, doctors, and facility administrators.",
  keywords: ["Healthcare", "ABHA", "Ayushman Bharat", "Telemedicine", "ASHA", "Doctor Portal", "AI Triage"],
  authors: [{ name: "SwasthyaSetu Health Network" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#0b0f17] text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300 min-h-screen`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
