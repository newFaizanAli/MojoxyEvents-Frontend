import React, { forwardRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}

const FormSelect = React.memo(forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = "Select an option",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 
          bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400
           focus:border-brand-300 focus:outline-hidden focus:ring-3
            focus:ring-brand-500/10   ${props.value
            ? "text-gray-800"
            : "text-gray-600"
          } ${className}`}
        {...props}
      >
        {/* Placeholder option */}
        <option value="" disabled className="text-gray-700  ">
          {placeholder}
        </option>

        {/* Mapped options */}
        {options.map((option, idx) => (
          <option
            key={idx}
            value={option.value}
            className="text-gray-700"
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
));

// Select.displayName = "Select";

export default FormSelect;