import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router-dom";
import img from "../../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";
import Button from "../../components/Button";
import { IErrorResponse, LoginFormValues } from "../../interfaces";
import { loginSchema } from "../../validation/auth";
import { LOGIN_FORM } from "@/data";
import InputField from "@/components/ui/InputField";
import { useState } from "react";
import axiosInstance from "@/config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log("DATA FROM FORM", data);
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("Account/Login", data, {
        timeout: 20000,
      });
      console.log("res FROM LOGIN FORM", res);

      console.log("FROM FORM DATA", res?.data?.token);
      localStorage.setItem("token", res?.data?.token);

      console.log("FROM FORM DATA", res?.data?.userId);
      localStorage.setItem("userId", res?.data?.userId);

      setIsLoading(true);

      const roleRes = await axiosInstance.get(`Users/GetRolesNameOfUser/${res?.data?.userId}`, {
        headers: {
          Authorization: `Bearer ${res?.data?.token}`,
        },
      });

      console.log("roleRes ...........", roleRes)
      console.log("roleRes ...........", roleRes.data.data[0])

      const role = roleRes?.data?.data[0];
      console.log("User role:", role);

      if (role === "Admin") {
        toast.success('Successfully Login, will navigate to dashboard!',
          {
            duration: 1500,
            position: 'bottom-center',
            style: { backgroundColor: "green", color: "white", width: "fit-content" },
          }
        );
        setTimeout(() => {
          location.replace("/admin");
        }, 2000);
      } else {
        toast.success('Successfully Login, will navigate to home page!',
          {
            duration: 1500,
            position: 'bottom-center',
            style: { backgroundColor: "green", color: "white", width: "fit-content" },
          }
        );
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }



    } catch (error) {
      console.log(error)
      const errorObj = error as AxiosError<IErrorResponse>
      toast.error(`${errorObj.response?.data?.messages}`,
        {
          duration: 1500,
          position: 'bottom-center',
          style: { backgroundColor: "red", color: "white", width: "fit-content" },
        }
      );

    } finally {
      setIsLoading(false)
    }
  };

  // ** Renders
  const renderLoginForm = LOGIN_FORM.map(({ id, type, label, name, placeholder, validation }, index) => (
    <div key={index}>
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        label={label}
        errorMessage={errors[name]?.message}
      />
    </div>
  ))

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen w-full">
      <div className="w-full md:w-1/2 flex justify-center items-center px-3 py-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="dark:text-white text-[#1a2930]  text-[40px] md:text-[60px] mt-10 font-inter font-normal leading-[60px] break-words text-center"> Welcome Back </h2>

          <div className="space-y-2">
            {renderLoginForm}
          </div>

          {/* Remember Me and Forget Password */}
          <div className="flex justify-between items-center ">
            <label className="flex items-center text-sm dark:text-white/90 text-gray-600 ">
              <input type="checkbox" className="mr-2  border-gray-300 rounded" />
              Remember me
            </label>
            <NavLink
              to="/forgot-password"
              className="text-[#1a2930] text-sm hover:underline dark:text-white/90"
            >
              Forgot password?
            </NavLink>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isLoading} isLoading={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don't have account?{" "}
            <NavLink to="/register" className="text-[#1a2930] hover:underline dark:text-white/90">
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
          <h2 className="text-[#b9a76d] text-[80px] lg:text-[120px] font-inter font-extrabold leading-[60px] break-words"> DVLD </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
