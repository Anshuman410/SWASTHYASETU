import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const tokenRole = req.nextauth.token?.role as string | undefined;
    const cookieRole =
      req.cookies.get("user_role")?.value ||
      req.cookies.get("demo_role")?.value;

    const effectiveRole = tokenRole || cookieRole;

    if (pathname.startsWith("/admin") && effectiveRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedAdmin", req.url));
    }
    if (pathname.startsWith("/doctor") && effectiveRole !== "DOCTOR") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedDoctor", req.url));
    }
    if (pathname.startsWith("/patient") && effectiveRole !== "PATIENT") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedPatient", req.url));
    }
    if (pathname.startsWith("/asha") && effectiveRole !== "ASHA") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedAsha", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const cookieRole =
          req.cookies.get("user_role")?.value ||
          req.cookies.get("demo_role")?.value;
        return !!token || !!cookieRole;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/patient/:path*",
    "/asha/:path*",
  ],
};
