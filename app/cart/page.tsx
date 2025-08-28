import CartItems from "./CartItems";
import Title from "@/components/custom/Title";
import SwiperCards from "@/components/custom/SwiperCards";
import { getAllProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";

const CartPage = async () => {
  const productres = await getAllProducts();

  if (!productres.success || !productres.data) {
    return (
      <div className="p-4">
        <h2>{productres.message || "No products found in this section!"}</h2>
      </div>
    );
  }

  const products: IProduct[] = productres.data?.products;

  return (
    <div className="flex flex-col bg-white pt-[120px] lg:pt-[132px] px-[16px] md:px-[32px] lg:px-[72px] xl:px-[84px] recommend:px-[96px]">
      <div className="flex items-center justify-between pb-6">
        <Title
          title="Shopping Cart"
          className="font-arialBold text-xl lg:text-2xl leading-[32px]"
        />
      </div>
      <CartItems />
      <div className="py-8 md:py-20">
        <SwiperCards
          products={products}
          section={{
            category: "Jewellery",
            title: "Recommended Products",
            description: "A fleeting collection of rare beauty.",
          }}
        />
      </div>
    </div>
  );
};

export default CartPage;
