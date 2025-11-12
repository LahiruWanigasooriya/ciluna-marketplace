"use server";
import { cookies } from "next/headers";
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import Cookie from 'js-cookie';

interface TokenPayload extends JWTPayload {
  userId: string;
  name: string;
  email: string;
}

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "wvwvsvdwweevrvrkkk"
);

export async function verifyToken(token: string) {
  try {
    if (!token) {
      return {
        status: 403,
        message: "No token provided.",
      };
    }

    try {
      const { payload } = await jwtVerify(token, secretKey);
      const tokenPayload = payload as TokenPayload;

      return {
        status: 200,
        message: "Token verified successfully.",
        userId: tokenPayload.userId,
        name: tokenPayload.name,
        email: tokenPayload.email,
      };
    } catch (error: unknown) {
      const jwtError = error as { code?: string };
      console.error('JWT Verification failed:', error);
      
      if (jwtError.code === 'ERR_JWT_EXPIRED') {
        return {
          status: 419,
          message: "Token expired.",
        };
      }

      return {
        status: 401,
        message: "Failed to authenticate token.",
      };
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      status: 401,
      message: "Failed to authenticate token.",
    };
  }
}

export async function generateToken(data: TokenPayload) {
  try {
    const token = await new SignJWT({ ...data })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secretKey);
    
    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate token');
  }
}

// ✅ Set Token in Cookies (Server Action)
export async function setAuthToken(token: string, remember: boolean) {
  const cookieStore = cookies();
  
  (await cookieStore).set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 7 : undefined, // 7 days if remember me
  });
}

// ✅ Clear Token from Cookies (Server Action)
export async function clearAuthToken() {
  const cookieStore = cookies();
  
  (await cookieStore).set("authToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
}

export async function getAuthToken() {
  const cookieStore = cookies();
  return (await cookieStore).get("authToken")?.value;
}
