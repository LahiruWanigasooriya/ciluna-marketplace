import HeartIcon from "../assets/profile/heart.svg";
import HeartRoundIcon from "../assets/profile/heartround.svg";
import PurseIcon from "../assets/profile/purse.svg";
import CouponIcon from "../assets/profile/coupon.svg";
import ShopCartIcon from "../assets/profile/shopcart.svg";
import TruckIcon from "../assets/profile/truck.svg";
import WalletIcon from "../assets/profile/wallet.svg";
import { FormValues } from "@/types/profile";
import User from "@/public/assets/user.jpeg";
import ProductCard from "../product/ProductCard";
import { IProduct } from "@/types/product";
import Product1 from "@/public/assets/product/product1.webp";
import Product2 from "@/public/assets/product/product2.webp";

interface OverviewProps {
  userData?: FormValues;
}

// Corrected mock data to use the correct structure for the `category` field
const mockProducts: IProduct[] = [
  {
    _id: "1",
    name: "Product 1",
    price: 1000,
    discount: { percentage: 10 },
    image: Product1.src,
    colors: ["Red", "Blue"],
    color: "Red",
    colorCodes: ["#FF0000", "#0000FF"],
    description: "A beautiful product.",
    stock: 10,
    category: { _id: "cat1", name: "Category 1" },
    createdBy: "Admin",
  },
  {
    _id: "2",
    name: "Product 2",
    price: 2000,
    discount: { percentage: 20 },
    image: Product2.src,
    colors: ["Green", "Yellow"],
    color: "Green",
    colorCodes: ["#00FF00", "#FFFF00"],
    description: "Another amazing product.",
    stock: 5,
    category: { _id: "cat2", name: "Category 2" },
    createdBy: "Admin",
  },
  {
    _id: "3",
    name: "Product 3",
    price: 3000,
    discount: { percentage: 15 },
    image: Product1.src,
    colors: ["Black", "White"],
    color: "Black",
    colorCodes: ["#000000", "#FFFFFF"],
    description: "Yet another great product.",
    stock: 8,
    category: { _id: "cat3", name: "Category 3" },
    createdBy: "Admin",
  },
];

const Overview: React.FC<OverviewProps> = ({ userData }) => {
  // Get profile image with fallback
  const profileImage = userData?.profileImage || User;

  // Get full name with fallback
  const fullName =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : userData?.nickName || "User";

  return (
    <>
      {/* Profile Card */}
      <section className="flex min-w-screen flex-col items-center rounded-xl bg-white px-[16px] py-[16px] shadow md:min-w-[530px] md:flex-row md:justify-between md:px-[24px]">
        <div className="flex items-center gap-[16px]">
          {" "}
          {/* Profile Image */}
          <img
            src={
              typeof profileImage === "string" ? profileImage : profileImage.src
            }
            alt="Profile"
            className="h-[52px] w-[52px] rounded-full object-cover"
          />
          {/* Name */}
          <div className="py-[14px]">
            <div className="font-kaiseiBold text-[16px]">{fullName}</div>
            <div className="font-lora text-[14px]  text-gray-400">
              Last login : Yesterday 11.39ams
            </div>
          </div>
        </div>

        <div className="font-loraBold flex w-full max-w-[400px] justify-center px-[2px] text-center text-[16px] text-neutral-900 md:max-w-[800px] md:justify-end md:px-0">
          {/* Item 1 */}
          <div className="flex cursor-pointer flex-col items-center gap-1 px-[10px] py-[16px] sm:px-[15px] md:px-[20px] xl:px-[45px]">
            <img
              src={HeartIcon.src}
              alt="Heart"
              className="h-[24px] w-[24px]"
            />
            Wish List
          </div>

          {/* Divider */}
          <div className="mx-0 h-[80px] w-px bg-gray-200 self-center" />

          {/* Item 2 */}
          <div className="flex cursor-pointer flex-col items-center gap-1 px-[10px] py-[16px] sm:px-[15px] md:px-[20px] xl:px-[45px]">
            <img
              src={WalletIcon.src}
              alt="Wallet"
              className="h-[24px] w-[24px]"
            />
            Ciluna Wallet
          </div>

          {/* Divider */}
          <div className="mx-0 h-[80px] w-px bg-gray-200 self-center" />

          {/* Item 3 */}
          <div className="flex cursor-pointer flex-col items-center gap-1 px-[10px] py-[16px] sm:px-[15px] md:px-[20px] xl:px-[45px]">
            <img
              src={CouponIcon.src}
              alt="CouponIcon"
              className="h-[24px] w-[24px]"
            />
            Coupons
          </div>
        </div>
      </section>
      {/* Orders Card */}
      <section className="rounded-xl bg-white px-[16px] text-[#1E1E1E] shadow md:px-[24px]">
        <div className="flex items-center justify-between border-b border-gray-200 py-[16px]">
          <div className="font-kaiseiBold text-[18px]">My Orders</div>
          <button className="font-lora cursor-pointer text-[16px] hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2  font-loraBold justify-between gap-y-[32px] divide-gray-200 py-[16px] text-center md:flex md:gap-y-0 md:divide-x xl:divide-x">
          <div className="flex-1 border-r border-gray-200 py-[14px]">
            <span className="mb-1 flex cursor-pointer items-center justify-center">
              <img
                src={PurseIcon.src}
                alt="Purse"
                className="w-[24px] h-[24px]"
              />
            </span>
            <div className="cursor-pointer font-medium">Unpaid</div>
          </div>

          <div className="flex-1 py-[14px]">
            <span className="mb-1 flex cursor-pointer items-center justify-center">
              <img
                src={ShopCartIcon.src}
                alt="Cart"
                className="w-[24px] h-[24px]"
              />
            </span>
            <div className="cursor-pointer font-medium">To be Shipped</div>
          </div>

          {/* Horizontal divider for mobile view only */}
          <div className="col-span-2 my-0.5 h-px w-full bg-gray-200 md:hidden"></div>

          <div className="flex-1 border-r border-gray-200 py-[14px]">
            <span className="mb-1 flex items-center justify-center">
              <img
                src={TruckIcon.src}
                alt="Truck"
                className="w-[24px] h-[24px]"
              />
            </span>
            <div className="cursor-pointer font-medium">Shipped</div>
          </div>

          <div className="flex-1 py-[14px]">
            <span className="mb-1 flex items-center justify-center">
              <img
                src={HeartRoundIcon.src}
                alt="Round Heart"
                className="w-[24px] h-[24px]"
              />
            </span>
            <div className="cursor-pointer font-medium">To be reviewed</div>
          </div>
        </div>
      </section>
      {/* More to love */}
      <section className="flex flex-col mb-[158px] gap-[12px]">
        <div className="font-kaiseiBold text-[24px] text-[#252525]">
          <span className="hidden md:block">More to love</span>
          <span className="md:hidden">Recent Viewed</span>
        </div>
        <div className="text-[16px] font-lora text-[#5D5D5D]">
          A fleeting collection of rare beauty.
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] mt-4">
          {mockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Overview;
