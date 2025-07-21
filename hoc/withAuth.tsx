"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const withAuth = (WrappedComponent: React.FC) => {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login"); // Redirect if not authenticated
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Avoid flashing protected content before redirection
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
