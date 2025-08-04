"use client";

import * as React from "react";
import clsx from "clsx";

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  // composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusButtonStyles } from "./primitive";

const buttonStyles = tv(
  {
    extend: focusButtonStyles,
    base: [
      "kbt32x before:absolute after:absolute box-border relative no-underline isolate inline-flex items-center justify-center gap-x-2 border font-medium",
      "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
      "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-1 [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--button-icon]",
    ],
    variants: {
      intent: {
        primary: [
          "outline-primary [--btn-bg:theme(--color-primary/95%)] [--btn-border:var(--color-primary)] [--btn-fg:var(--color-primary-fg)] dark:[--btn-bg:theme(--color-primary/90%)]",
          "[--btn-bg-hovered:theme(--color-primary/87%)] [--btn-border-hovered:theme(--color-primary/87%)] dark:[--btn-bg-hovered:theme(--color-primary)] dark:[--btn-border-hovered:theme(--color-primary)]",
          "inset-shadow-primary-fg/20 data-hovered:inset-shadow-primary-fg/25 data-pressed:inset-shadow-primary-fg/20",
        ],
        secondary: [
          "[--btn-bg:theme(--color-secondary/95%)] [--btn-border:theme(--color-secondary-fg/10%)] [--btn-fg:var(--color-secondary-fg)] dark:[--btn-bg:theme(--color-secondary/85%)] dark:[--btn-border:theme(--color-secondary-fg/7%)]",
          "[--btn-bg-hovered:color-mix(in_oklab,var(--color-secondary)_60%,white_20%)] dark:[--btn-bg-hovered:color-mix(in_oklab,var(--color-secondary)_96%,white_4%)]",
          "inset-shadow-white/15 data-hovered:inset-shadow-white/20 data-pressed:inset-shadow-white/15",
        ],
        warning: [
          "[--btn-warning:theme(--color-warning/97%)]",
          "[--btn-warning-hovered:color-mix(in_oklab,var(--color-warning)_85%,white_15%)]",
          "dark:[--btn-warning-hovered:color-mix(in_oklab,var(--color-warning)_90%,white_10%)]",
          "outline-warning [--btn-bg:var(--btn-warning)] [--btn-border:var(--btn-warning)] [--btn-fg:var(--color-warning-fg)]",
          "[--btn-bg-hovered:var(--btn-warning-hovered)] [--btn-border-hovered:var(--btn-warning-hovered)]",
          "inset-shadow-white/25 data-hovered:inset-shadow-white/30 data-pressed:inset-shadow-white/25",
        ],
        danger: [
          "outline-danger [--btn-bg:theme(--color-danger/95%)] [--btn-border:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] dark:[--btn-bg:var(--color-danger)]",
          "[--btn-danger-hovered:color-mix(in_oklab,var(--color-danger)_93%,white_7%)]",
          "dark:[--btn-danger-hovered:color-mix(in_oklab,var(--color-danger)_96%,white_4%)]",
          "[--btn-bg-hovered:var(--btn-danger-hovered)] [--btn-border-hovered:var(--btn-danger-hovered)]",
          "inset-shadow-danger-fg/30 data-hovered:inset-shadow-danger-fg/35 data-pressed:inset-shadow-danger-fg/30",
        ],
      },
      appearance: {
        solid: [
          "border-transparent bg-[--button-border]",
          "before:inset-0 before:-z-10 before:bg-[--button-bg] before:shadow before:data-[disabled]:shadow-none",
          "after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:active:bg-[--button-hover-overlay] after:hover:bg-[--button-hover-overlay] after:data-[disabled]:shadow-none after:inset-0 after:-z-10",
          "dark:after:-inset-px dark:before:hidden dark:border-white/5 dark:bg-[--button-bg]",
        ],
        outline: [
          "border-border text-fg [--button-icon:theme(colors.muted.fg)]",
          "hover:[--button-icon:theme(colors.fg)] hover:bg-secondary/90",
          "active:bg-secondary/90 active:[--button-icon:theme(colors.fg)]",
        ],
        plain: [
          "border-transparent text-fg [--button-icon:theme(colors.muted.fg)]",
          "pressed:bg-secondary/90",
          "active:[--button-icon:theme(colors.fg)] active:bg-secondary/90",
          "hover:[--button-icon:theme(colors.fg)] hover:bg-secondary/90",
        ],
      },
      size: {
        "extra-small":
          "h-8 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.1)-1px)] text-xs/4 lg:text-[0.800rem]/4",
        small:
          "h-9 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-sm/5 lg:text-sm/5",
        medium:
          "h-10 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm",
        large:
          "h-10 [&>[data-slot=icon]]:mx-[-3px] sm:h-11 px-[calc(theme(spacing.4)-1px)] sm:px-[calc(theme(spacing.5)-1px)] py-[calc(theme(spacing[2.5])-1px)] text-base lg:text-base/7 sm:[&>[data-slot=icon]]:size-5",
        "square-petite": "size-9 shrink-0 [&_[data-slot=icon]]:text-current",
        "extra-large": "p-4 hover:opacity-90 h-14 "
      },
      shape: {
        square:
          "rounded-lg before:rounded-[calc(theme(borderRadius.lg)-1px)] after:rounded-[calc(theme(borderRadius.lg)-1px)] dark:after:rounded-lg",
        circle:
          "rounded-[9999px] before:rounded-[9998px] after:rounded-[9998px] dark:after:rounded-[9999px]",
      },
      isDisabled: {
        false: "forced-colors:disabled:text-[GrayText]",
        true: "cursor-default opacity-60 forced-colors:disabled:text-[GrayText]",
      },
      isPending: {
        true: "cursor-default",
      },
    },
    defaultVariants: {
      intent: "primary",
      appearance: "solid",
      size: "medium",
      shape: "square",
    },
  },
  {
    responsiveVariants: ["sm", "lg"],
  }
);

interface ButtonProps extends ButtonPrimitiveProps {
  intent?: "primary" | "secondary" | "danger" | "warning";
  size?: "medium" | "large" | "extra-large" | "square-petite" | "extra-small" | "small";
  shape?: "square" | "circle";
  appearance?: "solid" | "outline" | "plain";
  bgColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, appearance, size, shape, bgColor, ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        {...props}
        className={clsx(
          // "purchase--btn",
          bgColor && `bg-[${bgColor}]`,
          className,
          buttonStyles({
            intent,
            appearance,
            size,
            shape,
          })
        )}
      ></ButtonPrimitive>
    );
  }
);

Button.displayName = "Button";

export { Button, ButtonPrimitive, buttonStyles, type ButtonProps };
