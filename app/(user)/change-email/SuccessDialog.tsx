import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SuccessIcon from "@/public/assets/profile/SuccessIcon.svg";
import ErrorIcon from "@/public/assets/profile/ErrorIcon.svg";
import Image from "next/image";
import { Button } from "@/components/ui";

interface SuccessDialogProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOtherMethods: () => void;
  onEditEmail: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ setPopupOpen, onOtherMethods, onEditEmail }) => {

  const handleClose = () => {
    onEditEmail();
    onOtherMethods();
    setPopupOpen(false);
  };

  return (
    <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[12px] bg-black/65 text-center px-4 md:px-0">
      <div className="bg-white p-6 rounded-[8px] relative w-[520px]">
        <button type="button" onClick={handleClose} aria-label="Close popup" className="absolute top-2 right-2">
          <IoIosCloseCircleOutline className=" text-neutralGray-500 w-5 h-5 cursor-pointer" />
        </button>
        <div className="flex justify-center mb-6">
          <Image src={SuccessIcon} alt="Success" width={50} height={50} />
        </div>
        <h1 className="text-xl leading-6 mb-3 font-arialBold">Success</h1>
        <p className="text-[18px] leading-6 mb-6">Your email address has been successfully updated.</p>
        <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
        <Button
          type="button"
          className="w-full !h-[56px] bg-black text-white !text-[18px] leading-6"
          onClick={handleClose}
        >
          OK
        </Button>
      </div>

      {/* Error Popup Hidden */}
      <div className="bg-white p-6 rounded-[8px] relative w-[520px] hidden">
        <button type="button" onClick={handleClose} aria-label="Close popup" className="absolute top-2 right-2">
          <IoIosCloseCircleOutline className=" text-neutralGray-500 w-5 h-5 cursor-pointer" />
        </button>
        <div className="flex justify-center mb-6">
          <Image src={ErrorIcon} alt="Error" width={50} height={50} />
        </div>
        <h1 className="text-xl leading-6 mb-3 font-arialBold">Error</h1>
        <p className="text-[18px] leading-6 mb-6">Unable to update your email address. Please try again.</p>
        <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
        <Button
          type="button"
          className="w-full !h-[56px] bg-black text-white !text-[18px] leading-6"
          onClick={handleClose}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default SuccessDialog;
