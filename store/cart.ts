import { IProduct } from "@/types/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the interface for cart item
interface CartItem {
  _id: string;
  proudct: any;
  productId: string;
  name: string;
  productVariantId?: string | null;
  description: string;
  discount?: number;
  stock?: number;
  quantity?: number;
  image: string;
  price: number;
  sold?: number;
  rating?: number;
  isActive?: boolean;
}

interface CartState {
  updateQuantity: any;
  cart: any[];
  setCart: (cart: any[]) => void;
  addToCartItem: (cartData: any) => void;
  removeFromCart: (cartItemId: string) => void;
  // updateQuantity: (productId: string, variantId?: string | null, quantity?: number) => void;
  totalItems: () => number;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: [],

      setCart: (cart) => set({ cart }),

      // Updated addToCart with the new structure
      addToCartItem: (cartData: CartItem) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) =>
              item.productId === cartData.productId &&
              (cartData.productVariantId
                ? item.productVariantId === cartData.productVariantId
                : true) // Check if variantId is provided and match it
          );

          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.productId === cartData.productId &&
                (cartData.productVariantId
                  ? item.productVariantId === cartData.productVariantId
                  : true)
                  ? { ...item, quantity: item.quantity + cartData.quantity }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, cartData] };
          }
        }),

      // Updated removeFromCart to consider productVariantId
      removeFromCart: (cartItemId: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== cartItemId),
        })),

      // Updated updateQuantity to work with the new data
      updateQuantity: (itemId: any, newQuantity: any) =>
      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        ),
      })),

      // Modified totalItems calculation
      totalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
