import React from "react";
import { Label } from "react-aria-components";
import { Address } from "@/types/checkout";
import { Checkbox } from "@/components/ui";

interface AddressCardProps {
  address: Address;
  selectedAddress: Address | null;
  defaultAddressId: string;
  onSetDefault: (addressId: string) => Promise<void>;
  onSelect: (address: Address) => void;
  onEdit: (data: Address) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, selectedAddress, defaultAddressId, onSetDefault, onSelect, onEdit }) => {
  const isSelectedAddress = selectedAddress === address;

  const handleCheckboxChange = async () => {
    console.log("changing checkbox");
    onSetDefault(address._id);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start lg:items-center justify-between gap-2">
        <div className="flex flex-col lg:flex-row items-start gap-4 cursor-pointer w-fit">
          <div className="relative w-5 h-5 cursor-pointer" onClick={() => onSelect(address)}>
            {/* Hidden native input for accessibility */}
            <input
              type="radio"
              name="selectedAddress"
              checked={isSelectedAddress}
              onChange={() => onSelect(address)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {/* Custom visual radio */}
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isSelectedAddress ? "border-blue-500 bg-blue-500" : "border-gray-400"
              }`}
            >
              {isSelectedAddress && <div className="w-[14px] h-[14px] rounded-full bg-black" />}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="font-bold">
              {address.contactName} | <span>{address.mobileNumber}</span>
            </Label>
            <p className="text-sm">{address.street}</p>
            <p className="text-sm">
              {address.district}, {address.province}, {address.country}, {address.zip}
            </p>
            {defaultAddressId === address._id ? (
              <span className="bg-[#E1E1E1] text-[#707070] py-1 px-3 rounded-[4px] w-fit">Default</span>
            ) : (
              // <label className="flex items-center text-sm text-black gap-x-2">
              //   <input type="checkbox" onChange={handleCheckboxChange} className="w-5 h-5 border-[#252525]/70 bg-[#252525] text-black" />
              //   <span>Set as a default shipping address</span>
              // </label>
              <Checkbox isSelected={false} onChange={handleCheckboxChange}>
                Set as a default shipping address
              </Checkbox>
            )}
          </div>
        </div>

        <div
          className=" font-bold text-[1rem] hover:cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address);
          }}
        >
          Edit
        </div>
      </div>
      <div className="h-[1px] bg-neutralGray-100" />
    </div>
  );
};

export default AddressCard;
