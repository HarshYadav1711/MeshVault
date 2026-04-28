import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const cookieName = "meshvault_session";
const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtectedPage = pathname.startsWith("/dashboard") || pathname.startsWith("/requests");
  const token = request.cookies.get(cookieName)?.value;

  let hasSession = false;
  if (token && secret.length > 0) {
    try {
      await jwtVerify(token, secret, { algorithms: ["HS256"] });
      hasSession = true;
    } catch {
      hasSession = false;
    }
  }

  if (isProtectedPage && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/requests/:path*", "/login", "/signup"],
};
