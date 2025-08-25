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
    "font-[400] text-sm w-[34px] h-[38px] flex-shrink-0 bg-[#FFFFFF]/5 hover:opacity-75 hover:bg-gray-100 cursor-pointer flex items-center justify-center";

  return (
    <div className="flex flex-col gap-2 text-[#252525] font-arial bg-white">
      <span className={`text-base leading-[19px] ${countShow ? "block" : "hidden"}`}>
        {/* <span className="font-arial">Quantity:</span> {quantity} */}
        <span className="font-arial leading-6">Quantity</span>
      </span>
      <div className="flex items-center border border-[#252525] rounded-[0.5rem]">
        <div onClick={decreaseQuantity} className={`${buttonStyle} rounded-tl-[0.5rem] rounded-bl-[0.5rem]`}>
          <Minus className="p-2 md:p-1.5" size={24}/>
        </div>
        <div className="text-base h-[40px] w-[34px] cursor-default flex items-center justify-center font-arialBold">
          {quantity}
        </div>
        <div onClick={increaseQuantity} className={`${buttonStyle} rounded-tr-[0.5rem] rounded-br-[0.5rem]`}>
          <Plus className="p-2 md:p-1.5" size={24}/>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;