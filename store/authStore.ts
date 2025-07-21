"use client";
import { create } from "zustand";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  exp: number;
}

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, remember: boolean) => void;
  clearAuth: () => void;
  checkAuth: () => boolean;
  getToken: () => string | null;
  getUserId: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  userId: null,
  isAuthenticated: !!Cookies.get('authToken'),

  setAuth: (token: string, remember: boolean) => {
    const options = {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      expires: remember ? 7 : undefined, // 7 days if remember me is checked
    };

    Cookies.set("authToken", token, options);

    // Decode the token to extract the userId
    const decoded: DecodedToken = jwtDecode(token);
    
    set({
      token,
      userId: decoded.userId, // Store the userId from the decoded token
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    Cookies.remove('authToken', { path: '/' });
    set({ 
      token: null,
      userId: null,
      isAuthenticated: false 
    });
  },

  checkAuth: () => {
    const token = Cookies.get("authToken");
    const isAuthenticated = !!token;

    let userId = null;
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      userId = decoded.userId;
    }

    set({
      token: token || null,
      userId,
      isAuthenticated,
    });
    return isAuthenticated;
  },

  getToken: () => {
    return get().token || Cookies.get('authToken') || null;
  },

  getUserId: () => {
    return get().userId;
  }
}));
