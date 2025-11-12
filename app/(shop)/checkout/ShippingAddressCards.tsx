import AddressCard from "@/components/custom/AddressCard";
import { Address } from "@/types/checkout";
import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { updateAddress } from "@/backend/actions/users/address";
import { useUserId } from "@/hooks/useUserId";
import { useFormContext } from "react-hook-form";

interface ShippingAddressCardsProps {
  addresses: Address[];
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}

const ShippingAddressCards: React.FC<ShippingAddressCardsProps> = ({ addresses, setIsFormOpen, setEditingAddress }) => {
  const userId = useUserId();

  const { setValue } = useFormContext();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    addresses.find((item) => item.isDefault === true) || null
  );

  useEffect(() => {
    if (selectedAddress) {
      setValue("country", selectedAddress.country, { shouldValidate: true });
      setValue("contactName", selectedAddress.contactName, { shouldValidate: true });
      setValue("mobileNumber", selectedAddress.mobileNumber, { shouldValidate: true });
      setValue("street", selectedAddress.street, { shouldValidate: true });
      setValue("province", selectedAddress.province, { shouldValidate: true });
      setValue("district", selectedAddress.district, { shouldValidate: true });
      setValue("town", selectedAddress.town, { shouldValidate: true });
      setValue("zip", selectedAddress.zip, { shouldValidate: true });
    }
  }, [selectedAddress, setValue]);

  const [defaultAddressId, setDefaultAddressId] = useState<string>(addresses.find((item) => item.isDefault)?._id || "");

  const handleSetDefault = async (addressId: string) => {
    setDefaultAddressId(addressId); // immediate UI response

    await updateAddress(userId, addressId, { isDefault: true });
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            selectedAddress={selectedAddress}
            defaultAddressId={defaultAddressId}
            onSetDefault={handleSetDefault}
            onSelect={setSelectedAddress}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <div className="flex gap-2 group items-center" onClick={handleAddNew}>
        <CirclePlus className="group-hover:opacity-70 group-hover:cursor-pointer" />
        <h2 className="group-hover:underline group-hover:cursor-pointer">Add a New Address</h2>
      </div>
    </div>
  );
};

export default ShippingAddressCards;
