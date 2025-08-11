"use client";

import { useState } from "react";
import { cn } from "@/utils/classes"
import { IconCircleCheckFill} from "justd-icons";
import { Button, Loader } from "ui";

interface IconButtonProps {
  name: string;
  process?: string;
  success?: string;
  className?: string;
  isDisabled?: boolean;
  loading?: "idle" | "loading" | "success"; 
}

export function IconButton({
  name,
  process,
  success,
  loading: externalLoading,
  className,
  isDisabled,
}: IconButtonProps) {
  const [internalLoading, setInternalLoading] = useState<"idle" | "loading" | "success">("idle");

  const loading = externalLoading ?? internalLoading;

  const pressHandler = () => {
    if (externalLoading !== undefined) return; 

    setInternalLoading("loading");


    setTimeout(() => setInternalLoading("success"), 3000);
    setTimeout(() => setInternalLoading("idle"), 6000);
  };

  const getButtonText = () => {
    switch (loading) {
      case "loading":
        return process;
      case "success":
        return success;
      default:
        return name;
    }
  };

  return (
    <Button
      isPending={loading === "loading"}
      className={cn("w-50", className)}
      onPress={pressHandler}
      intent="primary"
      isDisabled={isDisabled}

    >
      {getButtonText()}
      {loading === "success" ? (
        <IconCircleCheckFill />
      ) : loading === "loading" ? (
        <Loader variant="spin" />
      ) : null}
    </Button>
  );
}
