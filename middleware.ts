import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // Allow demo/preview override in development if explicitly passed
    const isDev = process.env.NODE_ENV !== "production";
    const demoOverride = req.cookies.get("demo_role")?.value;
    const effectiveRole = role || (isDev ? demoOverride : null);

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
      // In dev mode, allow visiting dashboards if a token exists or if testing directly
      authorized: ({ token, req }) => {
        if (process.env.NODE_ENV !== "production") {
          // Allow access in development if token exists or demo query flag present
          if (token) return true;
          const isTesting = req.nextUrl.searchParams.get("demo") === "true";
          if (isTesting) return true;
        }
        return !!token;
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
