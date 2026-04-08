import React from "react";

interface RadioProps {
  id: string;
  name: string;
  value: string;
  label: string;
  className?: string;
  disabled?: boolean;

  // For controlled mode
  checked?: boolean;
  onChange?: (value: string) => void;

  // For uncontrolled/react-hook-form mode
  inputRef?: React.Ref<HTMLInputElement>;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Radio: React.FC<RadioProps> = React.memo(({
  id,
  name,
  value,
  label,
  className = "",
  disabled = false,
  checked,
  onChange,
  inputRef,
  onInputChange,
}) => {
  return (
    <label
      htmlFor={id}
      className={`relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${disabled
        ? "text-gray-300  cursor-not-allowed"
        : "text-gray-700 "
        } ${className}`}
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={
          onChange ? () => !disabled && onChange(value) : onInputChange
        }
        ref={inputRef}
        className="sr-only"
        disabled={disabled}
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${checked
          ? "border-brand-500 bg-brand-500"
          : "bg-transparent border-gray-300 "
          } ${disabled
            ? "bg-gray-100  border-gray-200 "
            : ""
          }`}
      >
        <span
          className={`h-2 w-2 rounded-full bg-white ${checked ? "block" : "hidden"
            }`}
        ></span>
      </span>
      {label}
    </label>
  );
});

export default Radio;
