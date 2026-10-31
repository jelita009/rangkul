import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const path = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const role = payload.role as string;

    if (path.startsWith("/admin") && !["ADMIN", "SUPERADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (path.startsWith("/perawat") && !["PERAWAT", "ADMIN", "SUPERADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/pasien/:path*", "/perawat/:path*", "/admin/:path*", "/superadmin/:path*"],
};