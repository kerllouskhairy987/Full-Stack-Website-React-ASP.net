import React from "react";

interface InputFieldProps {
  id: string;
  type: string;
  label?: string;
  errorMessage?: string;
  className?: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  errorMessage,
  className,
  Icon,
  ... reset
}) => {
  return (
    <div className="relative mb-4 flex flex-col items-start">
      <label htmlFor={id} className="lableAuthpage">
        {label}
      </label>
      <div className="relative w-full mt-2">
        {Icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="text-gray-500 h-5 w-5" />
          </span>
        )}
        <input
          id={id}
          type={type}
          className={`${className} w-full ${Icon ? "pl-10" : "pl-2"} px-1 py-2 border rounded-lg focus:border-[#031f47] focus:outline-[#031f47] ${
            errorMessage ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }` }
          {...reset}
        />
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
