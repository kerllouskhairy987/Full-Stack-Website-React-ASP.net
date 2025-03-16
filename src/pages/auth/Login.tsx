import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { NavLink } from "react-router-dom";
import img from "../../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";
import Button from "../../components/ui/Button";
import { LoginFormValues } from "../../interfaces";
import PasswordField from "../../components/ui/PasswordField";
import { validationSchemaLogin } from "../../validation/auth";

const Login = () => {
  //   const [loginApi, { isLoading }] = useLoginMutation();
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchemaLogin),
  });

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-3 py-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-[#1a2930]  text-[40px] md:text-[60px] mt-10 font-inter font-normal leading-[60px] break-words text-center">
            Welcome Back
          </h2>

          <h2 className="text-3xl font-bold text-[#031f47] text-center">
            Login
          </h2>
          <div className="space-y-2">
            {/* Email Field */}
            <div className="relative text-[#1a2930] flex flex-col items-start">
              <label htmlFor="email" className="lableAuthpage">
                Email
              </label>
              <div className="relative w-full space-y-2 mt-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-500 h-5 w-5" />
                </span>
                <input
                  id="email"
                  type="email"
                  className={`w-full pl-10 px-1 py-2 border rounded-lg focus:border-[#1a2930] focus:outline-[#1a2930] ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <PasswordField
              id="password"
              label="Password"
              isPasswordVisible={showPassword}
              toggleVisibility={() => setShowPassword(!showPassword)}
              errorMessage={errors.password?.message}
            />
          </div>

          {/* Remember Me and Forget Password */}
          <div className="flex justify-between items-center ">
            <label className="flex items-center text-sm text-gray-600 ">
              <input
                type="checkbox"
                className="mr-2  border-gray-300 rounded"
              />
              Remember me
            </label>
            <NavLink
              to="/forgot-password"
              className="text-[#1a2930] text-sm hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>

          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don't have account?{" "}
            <NavLink to="/register" className="text-[#1a2930] hover:underline">
              Sign up
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

export default Login;
