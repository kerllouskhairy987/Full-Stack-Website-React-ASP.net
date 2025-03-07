import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaIdCard,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import Button from "../../UI/Shared/Button";
import img from "../../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";

// Validation Schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Mobile number must be between 10 and 15 digits")
    .required("Mobile number is required"),
  BirthOD: yup
    .string()
    .required("Birthdate is required")
    .test(
      "is-valid-date",
      "Birthdate must be a valid date",
      (value) => !isNaN(new Date(value || "").getTime())
    )
    .test(
      "is-not-in-future",
      "Birthdate cannot be in the future",
      (value) => new Date(value || "") <= new Date()
    ),
  national_id: yup
    .string()
    .matches(/^\d{14}$/, "National number must be 14 digits")
    .required("National number is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one lowercase letter and one number"
    )
    .required("Password is required"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  national_id: string;
  phone: string;
  BirthOD: string;
  password: string;
}

const Register = () => {
  //   const navigate = useNavigate();
  //   const [registerApi, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Formatted Data:", data);
  };

  const renderInputField = (
    id: string,
    type: string,
    label: string,
    Icon: React.ComponentType<{ className: string }>,
    errorMessage?: string
  ) => (
    <div className="relative mb-4 ">
      <label htmlFor={id} className="lableAuthpage">
        {label}
      </label>
      <div className="relative w-full mt-2">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="text-gray-500 h-5 w-5" />
        </span>
        <input
          id={id}
          type={type}
          className={`w-full pl-10 px-1 py-2 border rounded-lg focus:border-[#031f47] focus:outline-[#031f47] ${
            errorMessage
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          {...register(id as keyof RegisterFormValues)}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );

  const renderPasswordField = (
    id: string,
    label: string,
    isPasswordVisible: boolean,
    toggleVisibility: () => void,
    errorMessage?: string
  ) => (
    <div className="relative mb-4 space-y-2">
      <label htmlFor={id} className="lableAuthpage text-[#031f47]">
        {label}
      </label>
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
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
          {...register(id as keyof RegisterFormValues)}
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-3 py-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#031f47] text-center">
            Sign up
          </h2>
          <div className="space-y-2">
            {renderInputField(
              "name",
              "text",
              "Name",
              FaUser,
              errors.name?.message
            )}
            {renderInputField(
              "email",
              "email",
              "Email",
              FaEnvelope,
              errors.email?.message
            )}
            {renderInputField(
              "phone",
              "text",
              "Mobile number",
              FaPhoneAlt,
              errors.phone?.message
            )}
            {renderInputField(
              "BirthOD",
              "date",
              "Birth date",
              FaCalendarAlt,
              errors.BirthOD?.message
            )}
            {renderInputField(
              "national_id",
              "text",
              "National number",
              FaIdCard,
              errors.national_id?.message
            )}

            {renderPasswordField(
              "password",
              "Password",
              showPassword,
              () => setShowPassword(!showPassword),
              errors.password?.message
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already Have Account?{" "}
            <NavLink to="/login" className="text-[#1a2930] hover:underline">
              Login
            </NavLink>
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div
        className="hidden md:flex w-1/2 bg-gray-900 text-white justify-center items-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>
        <div className="relative text-center">
          <h2 className="text-[#b9a76d] text-[80px] lg:text-[120px] font-inter font-extrabold leading-[60px] break-words">
            DVLD
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
