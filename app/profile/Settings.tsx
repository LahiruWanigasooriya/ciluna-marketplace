import { FormValues } from "@/types/profile";
import PersonalInfoForm from "./PersonalInfoForm";
import { useState } from "react";

interface SettingsProps {
  userData: FormValues;
  onProfileUpdate: (updatedUser: FormValues) => void;
}

const Settings: React.FC<SettingsProps> = ({ userData, onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState<string>("Profile");
  const handleTabClick = (tab: string) => {
    if (tab === "Security") {
      window.open("/security", "_blank", "noopener,noreferrer");
    } else {
      setActiveTab(tab);
    }
  };
  const renderContent = () =>
    ({
      Profile: (
        <PersonalInfoForm
          initialData={userData}
          onProfileUpdate={onProfileUpdate}
        />
      ),
    }[activeTab] || null);

  const tabs = ["Profile", "Security"];
  return (
    <div className="w-full overflow-hidden items-center bg-neutralGray-50 p-4 md:p-6 rounded-[8px]">
      <div className="flex gap-4 font-arial transition-all duration-1000">
        {tabs.map((tab) => (
          <div key={tab} className="relative">
            <button
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 font-arialBold text-base md:text-lg leading-6 whitespace-nowrap ${
                activeTab === tab && tab !== "Security"
                  ? "text-black"
                  : "text-neutralGray-700"
              }`}
            >
              {tab}
            </button>
            <div
              className={`h-[5px] w-[49px] mx-auto bg-gray rounded-t-[12px] mt-1 ${
                activeTab === tab && tab !== "Security"
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-5 md:mt-6 md:py-0">
        <>{renderContent()}</>
      </div>
    </div>
  );
};

export default Settings;
