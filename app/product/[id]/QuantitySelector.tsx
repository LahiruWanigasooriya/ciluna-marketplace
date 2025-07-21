"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart";

interface QuantityProps {
  productId: string | undefined;
  initialQuantity: number;
  countShow?: boolean;
  isCartContext?: boolean;
  onQuantityChange?: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantityProps> = ({
  productId,
  initialQuantity,
  countShow = true,
  isCartContext = false,
  onQuantityChange,
}) => {
  const { cart, updateQuantity } = useCartStore();
  const [quantity, setQuantity] = React.useState(initialQuantity); // Local state per item

  // Sync local quantity with cart on mount or cart change
  React.useEffect(() => {
    if (isCartContext && productId) {
      const cartItem = cart.find((item) => item._id === productId);
      if (cartItem && cartItem.quantity !== quantity) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [cart, productId, isCartContext, initialQuantity]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isCartContext && productId) {
      updateQuantity(productId, newQuantity);
    }
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    if (isCartContext && productId) {
      updateQuantity(productId, newQuantity);
    }
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  const buttonStyle =
    "font-[400] text-sm h-[34px] w-[34px] lg:h-[40px] lg:w-[40px] rounded-[10px] flex-shrink-0 bg-[#FFFFFF]/5 hover:opacity-75 cursor-pointer flex items-center justify-center border-t border-l border-solid border-[#6B709499]";

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <span className={`text-base leading-[19px] ${countShow ? "block" : "hidden"}`}>
        <span className="font-interSemiBold">Quantity:</span> {quantity}
      </span>
      <div className="flex items-center gap-2">
        <div onClick={decreaseQuantity} className={buttonStyle}>
          <Minus className="p-2 md:p-1.5" />
        </div>
        <div className="font-[400] text-xxs lg:text-xs h-[34px] w-[34px] lg:h-[40px] lg:w-[40px] rounded-[10px] bg-blue hover:opacity-75 cursor-default flex items-center justify-center">
          {quantity}
        </div>
        <div onClick={increaseQuantity} className={buttonStyle}>
          <Plus className="p-2 md:p-1.5" />
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;