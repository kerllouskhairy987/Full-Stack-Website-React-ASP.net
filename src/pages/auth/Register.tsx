import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import img from "../../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";
import Button from "../../components/Button";
import InputField from "../../components/ui/InputField";
import { registerSchema } from "../../validation/auth";
import { IErrorResponse, RegisterFormValues } from "../../interfaces";
import { REGISTER_FORM } from "@/data";
import { FaRegEdit } from "react-icons/fa";
import axiosInstance from "@/config/axios.config";
import CountryDropDown, { GenderDropDown } from "@/components/ui/DropDown";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const Register = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("selectedGender ............", selectedGender)

  const navigate = useNavigate();

  // Handlers
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    console.log("Formatted Data:", data);
    setIsLoading(true)

    const formData = {
      ...data,
      countryId: selectedCountry,
      gender: selectedGender
    }

    console.log("DATA ....", formData)

    try {
      const res = await axiosInstance.post("Account/Register", formData, {
        timeout: 20000,
      });
      console.log("res FROM REGISTER FORM", res);
      toast.success('Successfully Registered, will navigate to login!',
        {
          duration: 1500,
          position: 'bottom-center',
          style: { backgroundColor: "green", color: "white", width: "fit-content" },
        }
      );
      setIsLoading(true)
      setTimeout(() => {
        navigate("/login", { replace: true })
      }, 2000)

      console.log("response .....", data);

    } catch (error) {
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>
      console.log("MY ERROR", errorObj)
      console.log("strong error", errorObj.response?.data?.messages)
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


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Renders
  const renderRegisterForm = REGISTER_FORM.map(({ label, name, id, type, placeholder, validation }, index) => (
    <div key={index}>
      <InputField
        label={label}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name, validation)}
        errorMessage={errors[name]?.message}
      />
    </div>
  ))

  return (
    <div className="flex flex-col md:flex-row"> {/* h-screen */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-3 py-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#031f47] text-center pt-5 dark:text-white">
            Sign up
          </h2>
          <div className="space-y-2">
            <label htmlFor="image" className={`block w-[200px] h-[200px] border overflow-hidden mx-auto rounded-[50%!important] relative shadow-md`}>
              {
                imageUrl ? <img src={imageUrl} className="object-fit absolute rounded-full" alt="" /> :
                  <img src={"https://avatar.iran.liara.run/public/8"} className="object-fit absolute rounded-full" alt="" />
              }
              <FaRegEdit className="absolute text-white text-2xl cursor-pointer bottom-6 right-[30px] z-10" />
              <input id="image" type="file" accept="image/*" className="w-[200px!important] bg-transparent h-[200px!important] block rounded-[50%!important] opacity-0 border mx-auto cursor-pointer" onChange={handleImageUpload} />
            </label>

            {renderRegisterForm}
            <CountryDropDown setSelectedCountry={setSelectedCountry} />
            <GenderDropDown setSelectedGender={setSelectedGender} />

          </div>
          <Button type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already Have Account?{" "}
            <NavLink to="/login" className="dark:text-white/90 text-[#1a2930] hover:underline">
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
          <h2 className="text-[#b9a76d] text-[80px] lg:text-[120px] font-inter font-extrabold leading-[60px] break-words"> DVLD </h2>
        </div>
      </div>
    </div>
  );
};
export default Register;
