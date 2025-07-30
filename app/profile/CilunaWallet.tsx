import Gold from "@/public/assets/profile/gold.png";

const CilunaWallet = () => {
  return (
    <section className="mx-auto flex min-h-[400px] max-w-[976px] flex-col overflow-hidden rounded-3xl bg-white shadow md:flex-row">
      <div className="flex-1">
        <img
          src={Gold.src}
          alt="wallet"
          className="h-full w-full max-w-[579px] min-w-[200px] object-cover md:max-h-[555px] lg:max-h-[456px] lg:min-w-[300px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center px-[16px] pt-[40px] pb-[32px] md:px-[20px] xl:px-[79px]">
        <div className="font-playFairExtraBold mb-[40px] text-center text-[36px] text-[#252525] md:mb-[48px] md:text-[30px] lg:text-[36px]">
          CILUNA Wallet
        </div>
        <div className="flex w-full flex-col items-center gap-[16px]">
          <div className="flex flex-col items-center gap-1">
            <div className="font-loraBold text-center text-[28px] text-[#252525]">
              20,000 LKR
            </div>
            <div className="font-lora text-center text-[14px] text-gray-500">
              Ciluna Cash
            </div>
          </div>

          <hr className="w-full border-gray-200" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-loraBold text-center text-[28px] text-[#252525]">
              2,000 USD
            </div>
            <div className="font-lora text-center text-[14px] text-gray-500">
              USD Value
            </div>
          </div>

          <button className="font-kaiseiBold mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#252525] py-[16px] text-[18px] text-white shadow hover:bg-gray-800">
            <span className="material-icons text-base">add_circle_outline</span>
            Top-up
          </button>
        </div>
      </div>
    </section>
  );
};

export default CilunaWallet;
