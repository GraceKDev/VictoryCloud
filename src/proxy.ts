import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { flags } from "./app/lib/flags";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (flags.maintenance && pathname !== "/maintenance") {
    return NextResponse.redirect(
      new URL("/maintenance", request.url)
    );
  }

  const isAdminRoute =
    pathname === "/adminlogin" ||
    pathname.startsWith("/admindashboard/") ||
    pathname === "/admindashboard";

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("auth")?.value;

  const isAuthenticated = async () => {
    if (!cookie) return false;

    try {
      await jwtVerify(cookie, JWT_SECRET, {
        issuer: "VictoryCloudApi",
        audience: "VictoryCloudApiUsers",
      });

      return true;
    } catch {
      return false;
    }
  };


  if (pathname === "/adminlogin") {
    if (await isAuthenticated()) {
      return NextResponse.redirect(
        new URL("/admindashboard", request.url)
      );
    }

    return NextResponse.next();
  }


  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};