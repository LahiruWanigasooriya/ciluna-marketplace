"use client";

import { useQuantityStore } from "@/store/quantity";
import { useEffect } from "react";

interface UseQuantityReturn {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const useQuantity = (
  initialQuantity: number = 1,
  onChange?: (newQuantity: number) => void
): UseQuantityReturn => {
  const { quantity, setQuantity } = useQuantityStore();

  // Set initial quantity on mount if different
  useEffect(() => {
    if (quantity !== initialQuantity) {
      setQuantity(initialQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuantity]);

  const updateQuantity = (newQuantity: number) => {
    if (quantity !== newQuantity) {
      setQuantity(newQuantity);
      if (onChange) {
        onChange(newQuantity);
      }
    }
  };

  const increaseQuantity = () => {
    updateQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    updateQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useQuantity;