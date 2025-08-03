import CartItems from "./CartItems";
import Title from "@/components/custom/Title";
import { X } from "lucide-react";

const CartPage = async () => {
  return(
    <div className="flex flex-col bg-white">
      <div className="flex items-center justify-between pb-6 md:pb-9">
        <Title title="Shopping Cart" className="font-lora text-2xl leading-[32px]"/>
        <p className="text-black"><X size={28} strokeWidth={2}/></p>
      </div>
      <CartItems/>;
    </div>
  ) 
};

export default CartPage;
