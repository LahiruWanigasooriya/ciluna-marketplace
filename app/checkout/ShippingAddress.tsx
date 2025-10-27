import { Address } from "@/types/checkout";
import React, { useState } from "react";
import InitialAddressForm from "./InitialAddressForm";
import ShippingAddressCards from "./ShippingAddressCards";
import Title from "@/components/custom/Title";
import Modal from "@/components/custom/Modal";
import ShippingAddressForm from "./ShippingAddressForm";

interface ShippingAddressProps {
  addresses: Address[];
  fetchData: () => Promise<void>
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ addresses, fetchData }) => {
  const newAddress = addresses.length === 0;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleSuccess = async () => {
    fetchData();
    setIsFormOpen(false);
  }

  return (
    <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
      <Title title="Shipping Address" className="!text-base md:!text-lg !leading-6 font-arialBold text-start" />
      <div className="h-[1px] bg-neutralGray-100" />
      {newAddress ? (
        <InitialAddressForm />
      ) : (
        <ShippingAddressCards
          setEditingAddress={setEditingAddress}
          setIsFormOpen={setIsFormOpen}
          addresses={addresses}
        />
      )}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} className="">
        <ShippingAddressForm
          title={editingAddress ? "Edit Shipping Address" : "Add a Shipping Address"}
          defaultData={editingAddress || undefined}
          onCancel={() => setIsFormOpen(false)}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};

export default ShippingAddress;
