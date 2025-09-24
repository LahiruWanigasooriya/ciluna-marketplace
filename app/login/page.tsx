import Image from "next/image";
import bgpattern from "@/public/assets/login/bgpattern.png";
import LoginForm from "./LoginForm"; 

const LoginPage = () => {
  return (
    <div className="flex items-start flex-col w-full relative justify-between text-black min-h-screen overflow-y-auto overflow-x-hidden sm:overflow-hidden">
      <div className="hidden sm:block absolute -right-0 top-36 h-[301px] w-[320px]">
        <Image
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right"
          priority
        />
      </div>
      <div className="hidden sm:block absolute -left-0 top-[50vh] h-[301px] w-[320px]">
        <Image
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right transform scale-x-[-1]"
          priority
        />
      </div>

      <div className="flex items-center w-full relative pt-12">
        <div className="flex items-center justify-between space-x-12 w-full relative">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;