import Title from "@/components/custom/Title";
import { Button } from "@/components/ui";
import { CircleX } from "lucide-react";

interface RemoveOneProps {
  removeOne: (product: any) => void;
  setIsRemoveProduct: React.Dispatch<any>;
  product: any;
}

export const RemoveOne: React.FC<RemoveOneProps> = ({
  removeOne,
  setIsRemoveProduct,
  product,
}) => {
  return (
    <div className="p-4 sm:p-6 bg-white text-gray font-lora gap-6 relative flex flex-col border border-[#E1E1E1] rounded-[8px] w-full sm:w-[600px] md:w-[655px]">
      <div>
        <Title
          title="Remove Product"
          className="font-lora font-bold text-xl sm:text-2xl"
        />
        <p className="text-[1rem] sm:text-lg">Remove item from cart?</p>
      </div>
      <hr className="border border-[#E8E8DA]" />
      <div className="flex gap-2 font-lora">
        <Button
          className="w-full p-4 border !border-gray text-lg"
          size="extra-large"
          onPressChange={() => setIsRemoveProduct(null)}
        >
          Cancel
        </Button>
        <Button
          className="w-full text-white bg-custom-red text-lg"
          size="extra-large"
          onPress={() => removeOne(product)}
        >
          Remove
        </Button>
      </div>
      <div className="absolute top-0 right-0 p-2">
        <CircleX
          color="#252525"
          strokeWidth={2}
          className="cursor-pointer h-5 w-5 hover:opacity-70"
          onClick={() => setIsRemoveProduct(null)}
        />
      </div>
    </div>
  );
};

interface RemoveAllProps {
  removeAll: () => void;
  setIsRemoveAll: React.Dispatch<any>;
  product: any;
}

export const RemoveAll: React.FC<RemoveAllProps> = ({
  setIsRemoveAll,
  removeAll,
  product,
}) => {
  return (
    <div className="p-4 sm:p-6 bg-white text-gray font-lora gap-6 relative flex flex-col border border-[#E1E1E1] rounded-[8px] w-full sm:w-[600px] md:w-[655px]">
      <div>
        <Title title="Remove All" className="font-lora font-bold text-xl sm:text-2xl" />
        <p className="text-[1rem] sm:text-lg">
          This aciton will remove these items from your shopping cart
        </p>
      </div>
      <hr className="border border-[#E8E8DA]" />
      <div className="flex gap-2">
        <Button
          className="w-full p-4 border !border-gray"
          size="extra-large"
          onPressChange={() => setIsRemoveAll(false)}
        >
          Cancel
        </Button>
        <Button
          className="w-full p-4 text-white bg-custom-red"
          size="extra-large"
          onPress={() => removeAll()}
        >
          Remove
        </Button>
      </div>
      <div className="absolute top-0 right-0 p-2">
        <CircleX
          color="#252525"
          strokeWidth={2}
          className="cursor-pointer h-5 w-5 hover:opacity-70"
          onClick={() => setIsRemoveAll(false)}
        />
      </div>
    </div>
  );
};
