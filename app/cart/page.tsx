import CartItems from "./CartItems";
import Title from "@/components/custom/Title";
import { X } from "lucide-react";

const CartPage = async () => {
  return(
    <div className="flex flex-col bg-white py-8 lg:pb-20 pt-28">
      <div className="flex items-center justify-between pb-6 md:pb-9">
        <Title title="Shopping Cart" className="font-arialBold text-xl lg:text-2xl leading-[32px]"/>
      </div>
      <CartItems/>
    </div>
  ) 
};

export default CartPage;
