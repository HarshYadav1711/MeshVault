import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import { env } from "@/lib/env";

const cookieName = "meshvault_session";
const sessionTtlSeconds = 60 * 60 * 24 * 7;
const secret = new TextEncoder().encode(env.JWT_SECRET);

export type SessionUser = {
  sub: string;
  email: string;
  name: string;
};

export async function createSessionToken(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${sessionTtlSeconds}s`)
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
  return payload as unknown as SessionUser;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionTtlSeconds,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}
