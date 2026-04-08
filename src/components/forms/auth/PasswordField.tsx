import React, { useState } from "react";
import { Input } from "../../ui/forms";
import { EyeCloseIcon, EyeIcon } from "../../../icons";

interface PasswordFieldProps {
  id?: string;
  name: string;
  label?: string;
  value: string;
  autoComplete?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id = "password",
  name,
  value,
  placeholder = "Enter your password",
  onChange,
  autoComplete,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        {showPassword ? (
          <EyeIcon className="size-5 fill-gray-500 " />
        ) : (
          <EyeCloseIcon className="size-5 fill-gray-500 " />
        )}
      </span>
    </div>
  );
};

export default PasswordField;
