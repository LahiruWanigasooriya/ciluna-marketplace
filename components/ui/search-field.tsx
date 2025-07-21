"use client"

import { IconSearch, IconX } from "justd-icons"
import {
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps as SearchFieldPrimitiveProps,
  type ValidationResult
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button } from "./button"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { ctr } from "./primitive"
import { useRouter } from "next/navigation";

const searchFieldStyles = tv({
  slots: {
    base: "group flex min-w-10 flex-col gap-y-1.5 focus:outline-none border border-solid border-gray-300 rounded-lg",
    searchIcon:
      "ml-2.5 mr-2.5 size-4 shrink-0 text-white group-disabled:text-muted-fg forced-colors:group-disabled:text-[GrayText]",
    clearButton: [
      "mr-1 size-8 text-muted-fg group-empty:invisible pressed:bg-transparent hover:bg-transparent pressed:text-fg"
    ],
    input: "[&::-webkit-search-cancel-button]:hidden"
  }
})

const { base, searchIcon, clearButton, input } = searchFieldStyles()

interface SearchFieldProps extends SearchFieldPrimitiveProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  isPending?: boolean
}

const SearchField = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  ...props
}: SearchFieldProps) => {
  const router = useRouter(); // Initialize router

  // Handle form submission
  const handleSubmit = (value: string) => {
    if (value.trim()) {
      // Redirect to search results page with query
      router.push(`/search?query=${encodeURIComponent(value)}`);
    }
  };
  return (
    <SearchFieldPrimitive
      aria-label={placeholder ?? props["aria-label"] ?? "Search for anything..."}
      {...props}
      className={ctr(className, base())}
      onSubmit={handleSubmit}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        
        <Input placeholder={placeholder ?? "Search for anything..."} className={input()} />
        {isPending ? (
          <Loader variant="spin" className="mr-2.5" />
        ) : (
          <Button size="square-petite" appearance="plain" className={clearButton()}>
            <IconX aria-hidden />
          </Button>
        )}
        <IconSearch aria-hidden className={searchIcon()} />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  )
}

export { SearchField, type SearchFieldProps }
