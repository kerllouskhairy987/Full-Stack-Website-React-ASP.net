import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router-dom";
import img from "../../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";
import Button from "../../components/ui/Button";
import PasswordField from "../../components/ui/PasswordField";
import InputField from "../../components/ui/InputField";
import { validationSchemaRegister } from "../../validation/auth";
import { RegisterFormValues } from "../../interfaces";

const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validationSchemaRegister),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Formatted Data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-3 py-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#031f47] text-center">
            Sign up
          </h2>
          <div className="space-y-2">
            <InputField
              id="name"
              type="text"
              label="Name"
              errorMessage={errors.name?.message}
              Icon={FaUser}
            />
            <InputField
              id="email"
              type="email"
              label="Email"
              errorMessage={errors.email?.message}
              Icon={FaEnvelope}
            />
            <InputField
              id="phone"
              type="text"
              label="Mobile number"
              errorMessage={errors.phone?.message}
              Icon={FaPhoneAlt}
            />
            <InputField
              id="BirthOD"
              type="date"
              label="Birth date"
              errorMessage={errors.BirthOD?.message}
              Icon={FaCalendarAlt}
            />
            <InputField
              id="national_id"
              type="text"
              label="National number"
              errorMessage={errors.national_id?.message}
              Icon={FaIdCard}
            />
            <PasswordField
              id="password"
              label="Password"
              isPasswordVisible={showPassword}
              toggleVisibility={() => setShowPassword(!showPassword)}
              errorMessage={errors.password?.message}
            />
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
