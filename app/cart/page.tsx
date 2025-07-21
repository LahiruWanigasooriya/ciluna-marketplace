import CartItems from "./CartItems";
import { getPawPrice } from "@/lib/pawService";
import toFixed from "@/functions/pawPrice";

const CartPage = async () => {
  const price = await getPawPrice();
  const pawPrice = toFixed(Number(price));
  return <CartItems pawPrice={pawPrice} />;
};

export default CartPage;
