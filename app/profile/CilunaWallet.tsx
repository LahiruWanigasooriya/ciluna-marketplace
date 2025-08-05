import Gold from "@/public/assets/profile/gold.png";
import Goldmb from "@/public/assets/profile/goldmb.png";

const CilunaWallet = () => {
  return (
    <section className="mx-auto mb-[759px] flex min-h-[328px] border-custom max-w-[976px]  flex-col overflow-hidden rounded-3xl bg-white  md:flex-row">
      <div className="flex-1 relative">
        <img
          src={Gold.src}
          alt="wallet"
          className="h-full w-full hidden md:block min-w-[200px] object-cover md:max-h-[555px] lg:max-h-[328px] lg:max-w-[576px]"
        />
        <img
          src={Goldmb.src}
          alt="wallet"
          className="h-full w-full md:hidden  min-w-[200px] object-cover md:max-h-[555px] lg:max-h-[328px] lg:max-w-[576px]"
        />
        <div className="absolute inset-0 px-[24px]  gap-[2px] py-[24px] flex flex-col items-start justify-end  text-white">
          <h2 className="font-kaiseiBold text-[28px]">C Wallet</h2>
          <p className="font-inter text-[14px]">
            All your C balances in one place
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center   justify-center  px-[16px] w-full md:w-[300px] lg:w-[380px] xl:w-[440px]  pb-[24px] md:px-[20px] xl:px-[32px]">
        <div className="font-kaiseiBold pt-[24px] md:pt-0  text-center text-[28px] text-[#252525] mb-[32px] md:text-[28px] lg:text-[28px]">
          C Wallet
        </div>
        <div className="flex w-full flex-col items-center gap-[16px]">
          <div className="flex flex-col items-center gap-1">
            <div className="font-loraBold text-center text-[20px] text-[#252525]">
              20,000 LKR
            </div>
            <div className="font-lora text-center text-[14px] text-[#707070]">
              C Cash
            </div>
          </div>

          <hr className="w-full border-[#F5F5F5]" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-loraBold text-center text-[20px] text-[#252525]">
              2,000 USD
            </div>
            <div className="font-lora text-center text-[14px] text-[#707070]">
              C USD
            </div>
          </div>

          <button className="font-kaiseiBold mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#252525] py-[16px] text-[18px] text-white  hover:bg-gray-800">
            <span className="material-icons text-base">add_circle_outline</span>
            Top-up
          </button>
        </div>
      </div>
    </section>
  );
};

export default CilunaWallet;
