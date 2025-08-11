"use client";

import { IconX } from "justd-icons";
import {
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps as SearchFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Button } from "./button";
import { Description, FieldError, FieldGroup, Input, Label } from "./field";
import { Loader } from "./loader";
import { ctr } from "./primitive";
import { useRouter } from "next/navigation";

const searchFieldStyles = tv({
  slots: {
    base: "group flex flex-col gap-y-1.5 focus:outline-none ",
    searchIcon:
      "mr-[2px] size-[24px] shrink-0 text-white group-disabled:text-muted-fg forced-colors:group-disabled:text-[GrayText]",
    clearButton: [
      "mr-1 h-[26px] w-[26px] text- group-empty:invisible pressed:bg",
    ],
    input:
      "[&::-webkit-search-cancel-button]:hidden text-center text- h-[26px] ",
  },
});

const { base, searchIcon, clearButton, input } = searchFieldStyles();

interface SearchFieldProps extends SearchFieldPrimitiveProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isPending?: boolean;
  isNavbarActive?: boolean;
}

const SearchField = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  isNavbarActive = false,
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
      aria-label={
        placeholder ?? props["aria-label"] ?? "Search for anything..."
      }
      {...props}
      className={ctr(className, base())}
      onSubmit={handleSubmit}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="border-none bg-transparent focus-within:border-none focus-within:ring-0">
        <Input
          placeholder={placeholder ?? ""}
          className={input() + " border-none"}
        />
        {isPending ? (
          <Loader variant="spin" className="mr-2.5" />
        ) : (
          <Button
            className={
              clearButton() +
              (isNavbarActive ? " text-black" : "text-white") +
              "p-0"
            }
          >
            <IconX
              aria-hidden
              className={`p-0 ${
                isNavbarActive ? " text-black" : " text-white"
              }`}
            />
          </Button>
        )}
        <img
          src={
            isNavbarActive
              ? "/assets/header/searchActiveIcon.svg"
              : "/assets/header/searchIcon.svg"
          }
          alt="Search"
          className={searchIcon() + ""}
        />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  );
};

export { SearchField, type SearchFieldProps };
