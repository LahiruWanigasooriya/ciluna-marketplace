"use client";

import { cn } from "@/utils/cn";
import { ChevronLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface BackButtonProps {
  to?: string;
  text?: string;
  className?: string;
}

export default function BackButton({ to, text, className }: BackButtonProps) {
  const router = useRouter();
   const pathname = usePathname();

  if (!pathname.startsWith("/product")) {
    return null;
  }

  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back(); // fallback to history back
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Go Back"
      className={cn("flex items-center justify-center hover:opacity-70", className)}
    >
      <ChevronLeft className="text-black"/>
      <p className="font-arial pl-2 text-gray">{text}</p>
    </button>
  );
}
