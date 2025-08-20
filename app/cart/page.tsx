import CartItems from "./CartItems";
import Title from "@/components/custom/Title";
import { X } from "lucide-react";

const CartPage = async () => {
  return(
    <div className="flex flex-col bg-white pt-[120px] lg:pt-[132px] px-[16px] md:px-[32px] lg:px-[72px] xl:px-[84px] recommend:px-[96px]">
      <div className="flex items-center justify-between pb-6">
        <Title title="Shopping Cart" className="font-arialBold !text-xl lg:text-2xl leading-[32px]"/>
      </div>
      <CartItems/>
    </div>
  ) 
};

export default CartPage;
