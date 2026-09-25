import { NextResponse } from "next/server";
import { userStore } from "@/lib/userStore";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, abhaId, gender, age } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Register into in-memory store
    const result = userStore.registerPatient({
      name,
      email,
      password,
      phone,
      abhaId,
      gender,
      age: age ? parseInt(age, 10) : undefined,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Try creating in Prisma if available
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          phone: phone || null,
          passwordHash: password,
          role: "PATIENT",
          patientProfile: {
            create: {
              abhaId: result.user?.abhaId || `9821-${Date.now().toString().slice(-8)}`,
              gender: gender || "OTHER",
            },
          },
        },
      });
    } catch {
      // Prisma fallback ignored if DB is offline
    }

    return NextResponse.json({
      success: true,
      message: "Patient registered successfully! You can now log in.",
      user: {
        id: result.user?.id,
        name: result.user?.name,
        email: result.user?.email,
        abhaId: result.user?.abhaId,
        role: "PATIENT",
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
