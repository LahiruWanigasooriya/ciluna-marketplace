import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IProduct } from "@/types/product";
import { getUserWishlist } from "@/actions/wishlists/wishlist";
import { useAuthStore } from "@/store/authStore";

interface WishlistState {
  wishlist: IProduct[];
  fetchWishlist: () => Promise<void>;
  addToWishlist: (product: IProduct) => void;
  removeFromWishlist: (productId: string) => void;
  setWishlist: (wishlist: IProduct[]) => void;
}

export const useWishlistStore = create(
  persist<WishlistState>(
    (set, get) => ({
      wishlist: [],

      setWishlist: (wishlist) => set({ wishlist }),

      fetchWishlist: async () => {
        const { token } = useAuthStore();
        if (!token) return;

        try {
          const response:any = await getUserWishlist(token);
          if (response.success && response.data?.wishlist) {
            set({ wishlist: response.data?.wishlist ?? [] });
          } else {
            set({ wishlist: [] });
          }
        } catch (error) {
          console.error("❌ Error fetching wishlist:", error);
        }
      },

      addToWishlist: (product) =>
        set((state) => ({
          wishlist: [...state.wishlist, product],
        })),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item._id !== productId),
        })),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
