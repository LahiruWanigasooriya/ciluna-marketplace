"use client";

// import PersonalInfoForm from "./PersonalInfoForm";
// import AccountInfoForm from "./AccountInfoForm";
// import NotificationSettings from "./NotificationSettings";
import { getUserProfile } from "@/actions/users/user";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Overview from "./Overview";
import CilunaWallet from "./CilunaWallet";

const sidebarItems = [
  "Overview",
  "Orders",
  "Refund & Return",
  "Feedback",
  "Account Setting",
  "C Wallet",
  "Help Center",
  "FAQ",
  "Terms & Conditions",
  "Logout",
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await getUserProfile();
        if (response.status !== 200 || !response.user) {
          throw new Error(response.message || "User data not available");
        }
        // Store user data in state
        setUserData(response.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#F5F5F5]0">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 p-5">Error: Unauthorized. Please log in.</p>
    );
  }

  return (
    <div className="min-h-screen  bg-white ">
      <div className="flex flex-col mt-[132px]  gap-[24px] md:flex-row">
        {/* Sidebar for md and up */}
        <aside className="hidden w-full h-full max-w-[248px]  min-w-[150px] flex-col py-[24px] gap-[16px] rounded-xl bg-[#F5F5F5] px-[16px] text-[#1E1E1E]  md:flex md:w-[150px] lg:w-[248px] xl:w-[248px]">
          <div className="font-interBold  border-b border-[#E1E1E1]  pb-[16px] text-[16px]">
            Account
          </div>
          <nav className="flex flex-col text-[14px] gap-[12px]">
            {sidebarItems.map((item) => (
              <div key={item}>
                {item === "C Wallet" && (
                  <div className="col-span-2 my-0.5 mb-[12px] h-px w-full bg-[#E1E1E1]"></div>
                )}
                <button
                  className={`cursor-pointer rounded-md w-full px-[16px] py-[8px] text-left ${
                    selected === item
                      ? "font-inter bg-neutral-900 text-white"
                      : "font-inter hover:bg-[#a7a5a5]"
                  } ${item === "Ciluna Wallet" ? "py-[20px]" : ""}`}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </button>
                {item === "C Wallet" && (
                  <div className="col-span-2 my-0.5 mt-[12px] h-px w-full bg-[#E1E1E1] "></div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Dropdown */}
        <div className="flex w-full items-start justify-center md:hidden">
          <div className="relative z-10 w-full max-w-sm">
            {/* Header */}
            <div
              className={` bg-[#F5F5F5] text-[#1E1E1E] ${
                mobileOpen ? "rounded-0" : "rounded-xl"
              }`}
            >
              <button
                className={`font-interBold flex w-full items-center justify-between px-[12px] bg-transparent py-[0] text-[16px] z-10`}
                onClick={() => setMobileOpen((open) => !open)}
              >
                <div
                  className={`flex w-full cursor-pointer items-center justify-between py-[12px] text-black text-[16px]`}
                >
                  {selected}
                  {mobileOpen ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {mobileOpen && (
                <div className="px-[12px]">
                  <div className="col-span-2 h-px w-full bg-[#E1E1E1] md:hidden"></div>
                </div>
              )}
            </div>
            {/* Dropdown List */}
            {mobileOpen && (
              <div className="absolute flex-col top-full left-0 z-0 flex w-full text-[14px] gap-[147px] items-center justify-center bg-white">
                <nav className="relative z-0 flex w-full  max-w-sm flex-col gap-2 bg-[#F5F5F5] px-[16px] py-4 ">
                  {sidebarItems.map((item) => (
                    <div key={item}>
                      {item === "C Wallet" && (
                        <div className="col-span-2  h-px w-full bg-[#E1E1E1] md:hidden"></div>
                      )}
                      <button
                        className={`w-full cursor-pointer rounded-md px-[12px] py-2 text-left ${
                          selected === item
                            ? "font-inter bg-[#252525] text-white"
                            : "font-inter hover:bg-[#a7a5a5]"
                        } ${item === "C Wallet" ? "my-2" : ""}`}
                        onClick={() => {
                          setSelected(item);
                          setMobileOpen(false);
                        }}
                      >
                        {item}
                      </button>
                      {item === "C Wallet" && (
                        <div className="col-span-2  h-px w-full bg-[#E1E1E1] md:hidden"></div>
                      )}
                    </div>
                  ))}
                </nav>
                {/* Black Line */}
                <div className=" flex  w-[134px] h-[5px] bg-[#2D2D2D]"></div>
              </div>
            )}
          </div>
        </div>
        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-6 overflow-hidden">
          {selected === "C Wallet" ? (
            <CilunaWallet />
          ) : selected === "Overview" ? (
            <div className="overflow-x-auto">
              <Overview userData={userData} />
            </div>
          ) : (
            <section className="flex h-full items-center justify-center text-xl text-gray-400">
              Select a menu item to view details.
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
