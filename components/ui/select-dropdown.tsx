import React from "react";
import Select, {
  SingleValue,
  StylesConfig,
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import ReactCountryFlag from "react-country-flag";
import { Label } from "./field";

interface OptionType {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  label?: string;
  options: OptionType[];
  value?: OptionType | null;
  onChange: (selectedOption: SingleValue<OptionType>) => void;
  placeholder: string;
  formatOptionLabel?: (option: OptionType) => React.ReactNode;
  showFlags?: boolean;
  borderColor?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  formatOptionLabel,
  showFlags = false,
  borderColor,
}) => {
  // Custom Option component to show flags
  const CustomOption = (props: OptionProps<OptionType>) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {showFlags && (
            <ReactCountryFlag
              countryCode={data.value}
              svg
              style={{ marginRight: "8px", width: "20px", height: "15px" }}
            />
          )}
          <span>{data.label}</span>
        </div>
      </components.Option>
    );
  };

  // Custom SingleValue component to show flag in selected value
  const CustomSingleValue = (props: SingleValueProps<OptionType>) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {showFlags && (
            <ReactCountryFlag
              countryCode={data.value}
              svg
              style={{ marginRight: "8px", width: "20px", height: "15px" }}
            />
          )}
          <span>{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  // Custom styles for better appearance
  const customStyles: StylesConfig<OptionType> = {
    option: (provided, state) => ({
      ...provided,
      padding: "10px 12px",
      cursor: "pointer",
      fontSize: "14px",
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: "44px",
      fontSize: "14px",
      borderRadius: "8px",
      // border: state.isFocused ? "2px solid #000000" : "none",
      border: borderColor ? `1px solid ${borderColor}` : "none",
      // boxShadow: state.isFocused ? "0 0 0 1px #d1d5db" : "none",
      boxShadow: "none",
      "&:hover": {
        // border: "1px solid #ea1515",
        cursor: "pointer",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#707070",
      fontSize: "14px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#252525",
      "&:hover": {
        color: "#252525",
        cursor: "pointer",
      },
    }),
  };

  return (
    <div className="group flex flex-col gap-y-[8px] custom-textfield w-full">
      {label && <Label>{label}</Label>}
      <Select<OptionType>
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        formatOptionLabel={formatOptionLabel}
        components={
          showFlags
            ? {
                Option: CustomOption,
                SingleValue: CustomSingleValue,
              }
            : undefined
        }
        styles={customStyles}
        isSearchable
        isClearable
      />
    </div>
  );
};

export default SelectDropdown;
