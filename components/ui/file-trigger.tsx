"use client";

import React from "react";

import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components";
import { Camera } from "lucide-react";
import { Button } from "./button";

interface FileTriggerProps extends FileTriggerPrimitiveProps {
  withIcon?: boolean;
  isDisabled?: boolean;
  intent?: "primary" | "secondary" | "danger" | "warning";
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small";
  shape?: "square" | "circle";
  appearance?: "solid" | "outline" | "plain";
}

const FileTrigger = ({
  intent = "primary",
  appearance = "plain",
  size = "small",
  shape = "circle",
  withIcon = true,
  ...props
}: FileTriggerProps) => {
  return (
    <>
      <FileTriggerPrimitive {...props}>
        <Button
          isDisabled={props.isDisabled}
          intent={intent}
          size={size}
          shape={shape}
          appearance={appearance}
        >
          {withIcon && (
            <>
              <Camera size={30} className="text-blue" />
            </>
          )}
        </Button>
      </FileTriggerPrimitive>
    </>
  );
};

export { FileTrigger };
