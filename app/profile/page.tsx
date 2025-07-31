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
  "Ciluna Wallet",
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
        <p className="text-gray-500">Loading...</p>
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
      {/* Breadcrumb */}
      <div className="font-kaisei flex cursor-pointer gap-[8px] pt-[20px] pb-[16px] text-[14px] text-neutral-900 md:pb-[36px]">
        Home <span>&gt; </span>
        <span className="font-kaiseiBold cursor-pointer">Account</span>
      </div>
      <div className="flex flex-col  gap-[24px] md:flex-row">
        {/* Sidebar for md and up */}
        <aside className="hidden w-full h-full max-w-[248px] border-custom min-w-[150px] flex-col py-[24px] gap-[16px] rounded-xl bg-white px-[16px] text-[#1E1E1E]  md:flex md:w-[150px] lg:w-[200px] xl:w-[248px]">
          <div className="font-loraBold  border-b border-gray-200  pb-[16px] text-[18px]">
            Account
          </div>
          <nav className="flex flex-col gap-[12px]">
            {sidebarItems.map((item) => (
              <div key={item}>
                {item === "Ciluna Wallet" && (
                  <div className="col-span-2 my-0.5 mb-[12px] h-px w-full bg-gray-200"></div>
                )}
                <button
                  className={`cursor-pointer rounded-md w-full px-[16px] py-[8px] text-left ${
                    selected === item
                      ? "font-loraBold bg-neutral-900 text-white"
                      : "font-lora hover:bg-gray-100"
                  } ${item === "Ciluna Wallet" ? "py-[20px]" : ""}`}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </button>
                {item === "Ciluna Wallet" && (
                  <div className="col-span-2 my-0.5 mt-[12px] h-px w-full bg-gray-200"></div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Dropdown */}
        <div className="flex w-full items-start justify-center md:hidden">
          <div className="relative w-full max-w-sm">
            <div className="rounded-xl bg-white text-[#1E1E1E] ">
              {/* Header */}
              <button
                className="font-loraBold flex w-full items-center justify-between rounded-xl border-b border-gray-200 bg-transparent px-0 py-4 text-[16px]"
                onClick={() => setMobileOpen((open) => !open)}
              >
                <div
                  className={`flex w-full cursor-pointer items-center justify-between ${
                    !mobileOpen
                      ? "mx-4 rounded-md bg-neutral-900 px-4 py-2 text-white"
                      : "px-4"
                  }`}
                >
                  {mobileOpen ? "Account" : selected}
                  {mobileOpen ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {/* Dropdown List */}
              {mobileOpen && (
                <div className="absolute inset-0 z-0 flex items-start justify-center bg-black bg-opacity-50">
                  <nav className="relative z-0 flex w-full border-custom max-w-sm flex-col gap-2 bg-white px-4 py-4 shadow-lg">
                    {sidebarItems.map((item) => (
                      <div key={item}>
                        {item === "Ciluna Wallet" && (
                          <div className="col-span-2 my-0.5 h-px w-full bg-gray-200 md:hidden"></div>
                        )}
                        <button
                          className={`w-full cursor-pointer rounded-md px-4 py-2 text-left ${
                            selected === item
                              ? "font-loraBold bg-[#252525] text-white"
                              : "font-lora hover:bg-gray-100"
                          } ${item === "Ciluna Wallet" ? "my-2" : ""}`}
                          onClick={() => {
                            setSelected(item);
                            setMobileOpen(false);
                          }}
                        >
                          {item}
                        </button>
                        {item === "Ciluna Wallet" && (
                          <div className="col-span-2 my-0.5 h-px w-full bg-gray-200 md:hidden"></div>
                        )}
                      </div>
                    ))}
                    {/* Black Line */}
                    <div className="absolute bottom-[8px] flex left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#2D2D2D]"></div>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-6 overflow-hidden">
          {selected === "Ciluna Wallet" ? (
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
      {/* Google Material Icons CDN */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </div>
  );
}
