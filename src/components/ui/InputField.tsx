import React from "react";

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  label?: string;
  errorMessage?: string;
  className?: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ComponentType<{ className?: string }>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  errorMessage,
  className,
  onChange,
  Icon,
  ...reset
}) => {
  return (
    <div className="relative mb-4 flex flex-col items-start">
      {label && <label htmlFor={id} className="lableAuthpage">{label}</label>}

      <div className="relative w-full mt-2">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className="text-gray-500" />
          </div>
        )}
        <input
          id={id}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`${className} w-full px-1 py-2 border rounded-lg focus:border-[#031f47] focus:outline-[#031f47] ${errorMessage ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
          {...reset}
        />
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
