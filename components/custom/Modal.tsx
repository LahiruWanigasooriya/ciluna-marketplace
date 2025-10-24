import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={cn(className, "w-full flex justify-center")}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
