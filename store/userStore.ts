"use client";

import { create } from "zustand";
import { getUserProfile } from "@/actions/users/user";
import { useAuthStore } from "@/store/authStore";
import { IUser } from "@/types/user";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  refetchUser: () => void;
  setUser: (updatedUser: IUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchUser: async () => {
    const { token, isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated || !token) {
      set({ error: "Not authenticated" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await getUserProfile(token);
      if (response.success && response.user) {
        set({ user: response.user });
      } else {
        set({ error: response.message || "Failed to fetch user profile" });
      }
    } catch (err: any) {
      set({ error: err.message || "An error occurred while fetching profile" });
    } finally {
      set({ isLoading: false });
    }
  },

  refetchUser: () => {
    get().fetchUser();
  },

  setUser: (updatedUser: IUser) => {
    set({ user: updatedUser, error: null });
  },

  clearUser: () => {
    set({ user: null, error: null, isLoading: false });
  },
}));
