"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName = "session";
const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string, role: string, username?: string) {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, role, username, expiresAt });

    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "strict",
      path: "/",
    });
    console.log("createSession: Session cookie set for userId:", userId);
    return session;
  } catch (err) {
    console.error("createSession: Failed to create session:", err);
    throw err;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
  console.log("deleteSession: Session cookie deleted");
}

export type SessionPayload = {
  userId: string;
  role: string;
  username?: string;
  expiresAt: Date | string;
};

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    console.log("decrypt: No session provided");
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.error("decrypt: Failed to verify session:", error);
    return null;
  }
}

export async function getSession() {
  const sessionCookie = (await cookies()).get(cookieName)?.value;
  console.log("getSession: Session cookie:", sessionCookie ? "Present" : "Missing");

  console.log(sessionCookie, 'ss value')

  if (!sessionCookie) {
    console.log("getSession: No session cookie found");
    return null;
  }

  const payload = await decrypt(sessionCookie);
  if (!payload) {
    console.log("getSession: Invalid or expired session");
    return null;
  }

  const expiresAt =
    typeof payload.expiresAt === "string" || payload.expiresAt instanceof Date
      ? new Date(payload.expiresAt)
      : payload.expiresAt;

  if (expiresAt < new Date()) {
    console.log("getSession: Session expired");
    await deleteSession();
    return null;
  }

  console.log("getSession: Valid session:", {
    userId: payload.userId,
    role: payload.role,
    username: payload.username,
  });

  return {
    userId: payload.userId,
    role: payload.role,
    username: payload.username,
    expiresAt,
    sessionCookie, // Include raw cookie
  };
}