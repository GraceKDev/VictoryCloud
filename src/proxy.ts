import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log("URL:", request.nextUrl.href);
    console.log("Cookie:", request.cookies.get("auth")?.value);
    const cookie = request.cookies.get("auth")?.value ?? "auth";
    if(cookie != "auth") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const isAuthenticated = async () => {
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
    if (pathname.startsWith("/adminlogin")) {
        if (await isAuthenticated()) {
            return NextResponse.redirect(new URL("/admindashboard", request.url));
        }
        return NextResponse.next();
    }
    if (!await isAuthenticated()) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admindashboard/:path*", "/adminlogin"],
};
