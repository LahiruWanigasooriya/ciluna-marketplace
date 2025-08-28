"use client"

import * as React from "react"

import type { TextInputDOMProps } from "@react-types/shared"
import { IconEye, IconEyeClosed } from "justd-icons"
import {
  Button as ButtonPrimitive,
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps
} from "react-aria-components"

import type { FieldProps } from "./field"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { ctr } from "./primitive"
import { cn } from "@/lib/utils"

type InputType = Exclude<TextInputDOMProps["type"], "password">

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isPending?: boolean
  className?: string
  inputClassName?: string
  groupClassName?:string
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable: true
  type: "password"
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable?: never
  type?: InputType
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps

const TextField = ({
  placeholder,
  label,
  description,
  errorMessage,
  prefix,
  suffix,
  isPending,
  className,
  inputClassName,
  groupClassName,
  isRevealable,
  type,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const inputType = isRevealable ? (isPasswordVisible ? "text" : "password") : type

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }
  return (
    <TextFieldPrimitive
      type={inputType}
      {...props}
      className={ctr(className, "group flex flex-col gap-2")}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-loading={isPending ? "true" : undefined} className={cn(groupClassName, "relative")}>
        {prefix ? (
          <span data-slot="prefix" className="atrs x2e2 !ml-0">
            {prefix}
          </span>
        ) : null}
        <Input placeholder={placeholder} className={inputClassName}/>
        {isRevealable ? (
          <ButtonPrimitive
            type="button"
            aria-label="Toggle password visibility"
            onPress={handleTogglePasswordVisibility}
         className="absolute right-4 top-3 transform-translate-y-1/2 bg-transparent text-muted-fg focus:outline-none focus-visible:ring-1 border-none focus-visible:ring-primary rounded " >
            <>{isPasswordVisible ? <IconEyeClosed /> : <IconEye />}</>
          </ButtonPrimitive>
        ) : isPending ? (
          <Loader variant="spin" data-slot="suffix" />
        ) : suffix ? (
          <span data-slot="suffix" className="!mr-0">{suffix}</span>
        ) : null}
      </FieldGroup>
      {description && <Description className="text-[#FFFFFF] font-[400] text-sm">{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  )
}

export { TextField, TextFieldPrimitive, type TextFieldProps }