import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaIdCard,
  FaRegEdit,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiUnitednations } from "react-icons/si";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router-dom";
import img from "../../assets/6e9f3830-8eb1-48dd-bf25-cb311bd50b2d.jpg";
import Button from "../../components/Button";
import PasswordField from "../../components/ui/PasswordField";
import InputField from "../../components/ui/InputField";
import { validationSchemaRegister } from "../../validation/auth";
import { RegisterFormValues } from "../../interfaces";
import bgProfile from "../../assets/bg-profile.jpg"

const Register = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);


  // Handlers
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
                  <img src={bgProfile} className="object-fit absolute rounded-full" alt="" />
              }
              <FaRegEdit className="absolute text-white text-2xl cursor-pointer bottom-6 right-[30px] z-10" />
              <input id="image" type="file" accept="image/*" className="w-[200px!important] bg-transparent h-[200px!important] block rounded-[50%!important] opacity-0 border mx-auto cursor-pointer" onChange={handleImageUpload} />
            </label>
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
              id="address"
              type="text"
              label="address"
              errorMessage={errors.address?.message}
              Icon={FaLocationDot}
            />
            <InputField
              id="nationality"
              type="text"
              label="nationality"
              errorMessage={errors.nationality?.message}
              Icon={SiUnitednations}
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
          <h2 className="text-[#b9a76d] text-[80px] lg:text-[120px] font-inter font-extrabold leading-[60px] break-words">
            DVLD
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Register;
