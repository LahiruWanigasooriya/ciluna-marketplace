import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui";
import { Label, Radio, RadioGroup } from "react-aria-components";
import { updateAddress } from "@/actions/users/address";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";

interface Address {
  _id: string;
  country: string;
  contactName: string;
  mobileNumber: string;
  street: string;
  province: string;
  district: string;
  town: string;
  zip: string;
  isDefault: boolean;
}

interface DecodedToken {
  userId: string;
  exp: number;
}

interface AddressCardProps {
  onAddressSelect?: (address: Address) => void;
  options: Address[];
  setIsAddingNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddressForEdit: React.Dispatch<
    React.SetStateAction<Address | null>
  >;
  refetch: () => void;
}

const AddressCards = ({
  onAddressSelect,
  options,
  setIsAddingNewAddress,
  setSelectedAddressForEdit,
  setIsEditingAddress,
  refetch,
  ...props
}: AddressCardProps) => {
  const { getToken } = useAuthStore();
  const token = getToken();
  const [userId, setUserId] = useState("");
  // const [selectedAddressId, setSelectedAddressId] = useState<string>(
  //   options.find((item) => item.isDefault === true)?._id || ""
  // );

  // Always initialize with default address
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    options.find((item) => item.isDefault)?._id || ""
  );

  // const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
  const [defaultAddressId, setDefaultAddressId] = useState<string>(
    options.find((item) => item.isDefault)?._id || ""
  );

  // Keep it synced if `options` change and nothing is selected
  useEffect(() => {
    if (!selectedAddressId) {
      const currentDefault = options.find((item) => item.isDefault);
      if (currentDefault) {
        setSelectedAddressId(currentDefault._id);
      }
    }
  }, [options, selectedAddressId]);

  useEffect(() => {
    const currentDefault = options.find((item) => item.isDefault);
    if (currentDefault) {
      setDefaultAddressId(currentDefault._id);
    }
    handleAddressChange(selectedAddressId);
  }, [options]);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }
  }, [token]);

  const handleSetDefault = async (addressId: string) => {
    setDefaultAddressId(addressId); // immediate UI response

    const res = await updateAddress(userId, addressId, { isDefault: true });

    if (res.success) {
      await refetch(); // re-sync from DB
    } else {
      // rollback if DB failed
      const currentDefault = options.find((item) => item.isDefault);
      setDefaultAddressId(currentDefault?._id || "");
    }
  };

  const handleEdit = (option: Address) => {
    setSelectedAddressForEdit(option);
    setIsEditingAddress(true);
  };

  const handleAddressChange = (id: string) => {
    setSelectedAddressId(id);

    // Find the full address object
    const selectedAddressObj = options.find((addr) => addr._id === id);
    if (selectedAddressObj && onAddressSelect) {
      onAddressSelect(selectedAddressObj);
    }
  };

  // console.log("address options: ", options);

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        {...props}
        value={selectedAddressId}
        onChange={handleAddressChange}
        className="flex flex-col gap-4"
      >
        {options?.map((option, index) => (
          <React.Fragment key={index}>
            <hr className="border-t-2 border-[#E1E1E1]" />
            <div className="flex items-start lg:items-center justify-between gap-2">
              <Radio
                key={index}
                value={option._id}
                className="flex flex-col lg:flex-row items-start gap-4 cursor-pointer w-fit"
              >
                {({ isSelected }) => (
                  <>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-[14px] h-[14px] rounded-full bg-black" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">
                        {option.contactName} |{" "}
                        <span>{option.mobileNumber}</span>
                      </Label>
                      <p className="text-sm">{option.street}</p>
                      <p className="text-sm">
                        {option.town}, {option.province}, {option.country},{" "}
                        {option.zip}
                      </p>
                      {defaultAddressId === option._id ? (
                        <div className="bg-[#E1E1E1] text-[#707070] py-1 px-3 rounded-[4px] w-fit">
                          Default
                        </div>
                      ) : (
                        <div className="w-fit hover:cursor-pointer">
                          <Checkbox
                            isSelected={false}
                            onChange={() => handleSetDefault(option._id)}
                          >
                            Set as a default shipping address
                          </Checkbox>
                        </div>
                      )}

                      {/* {option.isDefault ? (
                        <div className="bg-[#E1E1E1] text-[#707070] py-1 px-3 rounded-[4px] w-fit">
                          Default
                        </div>
                      ) : (
                        <div className="w-fit hover:cursor-pointer">
                          <Checkbox
                            isSelected={isDefaultAddress}
                            onChange={(isSelected: boolean) =>
                              setIsDefaultAddress(isSelected)
                            }
                          >
                            Set as a default shipping address
                          </Checkbox>
                        </div>
                      )} */}
                    </div>
                  </>
                )}
              </Radio>

              <div
                className=" font-bold text-[1rem] hover:cursor-pointer hover:underline"
                onClick={() => handleEdit(option)}
              >
                Edit
              </div>
            </div>
          </React.Fragment>
        ))}
      </RadioGroup>

      <hr className="border-t-2 border-[#E1E1E1]" />

      <div
        className="flex gap-2 group items-center"
        onClick={() => setIsAddingNewAddress(true)}
      >
        <CirclePlus className="group-hover:opacity-70 group-hover:cursor-pointer" />
        <h2 className="group-hover:underline group-hover:cursor-pointer">
          Add a New Address
        </h2>
      </div>

      {/* {isAddingNewAddress && (
        <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
          <ShippingAddress
            title="Add a Shipping Address"
            onCancel={setIsAddingNewAddress}
          />
        </div>
      )}

      {isEditingAddress && (
        <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
          <ShippingAddress
            title="Edit Shipping Address"
            editingAddress={selectedAddressForEdit}
            setEditingAddress={setSelectedAddressForEdit}
            onCancel={setIsEditingAddress}
          />
        </div>
      )} */}
    </div>
  );
};

export default AddressCards;
