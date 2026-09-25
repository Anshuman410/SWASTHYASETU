import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { userStore } from "@/lib/userStore";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const email = session.user.email || "";
    const matchedUser = userStore.findUser(email);

    const role = (session.user as any).role || matchedUser?.role || "PATIENT";

    return NextResponse.json({
      authenticated: true,
      user: {
        id: (session.user as any).id || matchedUser?.id,
        name: session.user.name || matchedUser?.name,
        email: session.user.email,
        role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
