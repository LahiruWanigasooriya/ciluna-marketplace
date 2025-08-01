import PersonalInfoForm from "./PersonalInfoForm";
import AccountInfoForm from "./AccountInfoForm";
import NotificationSettings from "./NotificationSettings";
import { getUserProfile } from "@/actions/users/user";

export default async function ProfilePage() {
  let response;

  try {
    response = await getUserProfile();
    if (response.status !== 200 || !response.user) {
      throw new Error(response.message || "User data not available");
    }
  } catch (error: any) {
    console.log("❌ Error fetching user data:", error.message);
    return <p className="text-red-500 p-5">Error: Unauthorized. Please log in.</p>;
  }

  return (
    <div className="flex flex-col gap-10 md:gap-8 p-[12px] md:p-[14px] lg:p-[16px] recommend:p-[20px] border-t border-l bg-[#FFFFFF]/5 border-solid border-[#6B709499] rounded-[9px] text-white">
      <PersonalInfoForm initialData={response.user} /> 
      <AccountInfoForm />
      <NotificationSettings initialData={response.user.notificationSettings}  />
    </div>
  );
}
