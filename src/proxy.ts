import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "auth_token";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (!cookie?.value) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    try {
        await jwtVerify(cookie.value, JWT_SECRET);
    } catch {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/adminDashboard/:path*"],
};
