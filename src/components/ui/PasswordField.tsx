import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

interface PasswordFieldProps {
  id: string;
  label: string;
  isPasswordVisible: boolean;
  toggleVisibility: () => void;
  errorMessage?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  isPasswordVisible,
  toggleVisibility,
  errorMessage,
}) => {
  return (
    <div className="relative mb-4 space-y-2 flex flex-col items-start">
      <label htmlFor={id} className="lableAuthpage">
        {label}
      </label>
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaLock className="text-gray-500 h-5 w-5" />
        </span>
        <input
          id={id}
          type={isPasswordVisible ? "text" : "password"}
          className={`w-full pl-10 pr-10 px-1 py-2 border rounded-lg focus:border-[#031f47] focus:outline-[#031f47] ${
            errorMessage
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={toggleVisibility}
        >
          {isPasswordVisible ? (
            <FaEyeSlash className="text-gray-500 h-5 w-5" />
          ) : (
            <FaEye className="text-gray-500 h-5 w-5" />
          )}
        </span>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default PasswordField;
