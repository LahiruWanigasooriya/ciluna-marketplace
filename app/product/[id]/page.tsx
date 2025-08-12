import { IProduct } from "@/types/product";
import { IProductVariant } from "@/types/productVariant";
import DummyProduct from "@/public/assets/product/DummyProduct.svg";
import ProductInfoTabs from "./ProductInfoTabs";

interface Pro {
  product: IProduct;
  variants?: IProductVariant;
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <div className="flex flex-col gap-[64px] md:gap-[36px] lg:gap-[42px] recommend:gap-[64px] md:mt-[132px] custom-container md:py-0">
      {/* Dummy Product */}
      <img
        src={DummyProduct.src}
        alt="Dummy Product"
        className="w-full h-auto object-cover"
      />
      <ProductInfoTabs />

    </div>
  );
};

export default ProductDetails;
