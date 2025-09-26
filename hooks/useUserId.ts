import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useAuthStore } from "@/store/authStore";

interface DecodedToken {
  userId: string;
  exp?: number;
}

export function useUserId() {
  const { getToken } = useAuthStore();
  const token = getToken();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  return userId;
}
