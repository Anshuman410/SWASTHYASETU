import { NextResponse } from "next/server";
import { userStore } from "@/lib/userStore";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, village } = body;

    if (!name || !email || !password || !village) {
      return NextResponse.json(
        { error: "Name, email, password, and assigned village are required." },
        { status: 400 }
      );
    }

    const result = userStore.createAshaWorker({
      name,
      email,
      password,
      phone,
      village,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Attempt Prisma storage as well
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          phone: phone || null,
          passwordHash: password,
          role: "ASHA",
          ashaProfile: {
            create: {
              villageNode: village,
            },
          },
        },
      });
    } catch {
      // Prisma fallback ignored
    }

    return NextResponse.json({
      success: true,
      message: `ASHA Worker ${name} created successfully!`,
      worker: result.user,
    });
  } catch (error: any) {
    console.error("ASHA creation error:", error);
    return NextResponse.json(
      { error: "Failed to create ASHA worker." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const ashaList = userStore.getAshaWorkers();
  return NextResponse.json({ workers: ashaList });
}
