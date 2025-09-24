"use client";
import { useRef, useEffect, useState } from "react";
import { IconX } from "justd-icons";
import { FiSearch } from "react-icons/fi";
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
import { useRouter, useSearchParams } from "next/navigation";

const searchFieldStyles = tv({
  slots: {
    base: "group flex flex-col gap-y-1.5 focus:outline-none ",
    searchIcon:
      "mr-[2px] size-[24px] shrink-0 group-disabled:text-muted-fg forced-colors:group-disabled:text-[GrayText]",
    clearButton: [
      "mr-1 h-[24px] w-[24px] text- group-empty:invisible pressed:bg border-solid !px-[5px]",
    ],
    input: "[&::-webkit-search-cancel-button]:hidden text-left text- h-[26px] p-1 md:px-2",
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
  const router = useRouter();
  // const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Handle form submission
  const handleSubmit = (value: string) => {
    if (value.trim()) {
      router.push(`/product?query=${encodeURIComponent(value)}`);
    }
  };

  const handleSearchIconClick = () => {
    // Focus the input when search icon is clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // useEffect(() => {
  //   const currentQuery = searchParams.get("query");
  //   if (!currentQuery) {
  //     setInputValue("");
  //   } else {
  //     setInputValue(currentQuery);
  //   }
  // }, [searchParams]);

  return (
    <SearchFieldPrimitive
      aria-label={
        placeholder ?? props["aria-label"] ?? "Search for anything..."
      }
      {...props}
      value={inputValue}
      onChange={handleInputChange}
      className={ctr(className, base())}
      onSubmit={handleSubmit}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        className={`border-none bg-transparent focus-within:border-none focus-within:ring-2 ${
          isNavbarActive
            ? "focus-within:ring-neutralGray-900"
            : "focus-within:ring-neutralGray-100"
        }`}
      >
        <Input
          ref={inputRef}
          placeholder={placeholder ?? ""}
          className={input() + " border-none"}
        />
        {isPending ? (
          <Loader variant="spin" className="mr-2.5" />
        ) : (
          <Button
            className={
              clearButton() +
              (isNavbarActive
                ? " text-black border-black"
                : " text-white border-white")
            }
          >
            <IconX className="w-6 h-6" />
          </Button>
        )}
        <FiSearch
          onClick={handleSearchIconClick}
          className={
            searchIcon() +
            ` hover:cursor-pointer ${
              isNavbarActive ? " text-black" : " text-white"
            }`
          }
        />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  );
};

export { SearchField, type SearchFieldProps };
