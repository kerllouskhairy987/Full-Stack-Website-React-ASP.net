import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Button from "../components/Button";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordFormValues } from "../interfaces";
import { resetPasswordSchema } from "../validation/auth";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axios.config";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    // Renders
    const renderPasswordField = (id: string, label: string, isPasswordVisible: boolean, toggleVisibility: () => void, errorMessage?: string) => (
        <div className="relative mb-4 space-y-2 flex flex-col items-start dark:text-white/90">
            <label htmlFor={id} className="lableAuthpage text-[#031f47] dark:text-white/90">
                {label}
            </label>
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                    <FaLock className="text-gray-500 h-5 w-5" />
                </span>
                <input
                    id={id}
                    type={isPasswordVisible ? "text" : "password"}
                    className={`w-full pl-10 pr-10 px-1 py-2 border rounded-lg focus:border-[#031f47] focus:outline-[#031f47] ${errorMessage
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                        }`}
                    {...register("password")}
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

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(resetPasswordSchema),
    })

    // Handlers
    const onSubmit = async (data: passwordFormValues) => {
        console.log("data from reset password", data?.password)

        try {
            const dataResetPassword = {
                userId,
                code,
                newPassword: data?.password,
            }

            const { data: dataResetFromAxios } = await axiosInstance.post("Account/ResetPassword", dataResetPassword)
            console.log("dataResetFromAxios", dataResetFromAxios)

            toast.success('Your Password Already Update Login Now', {
                position: "bottom-center",
                duration: 1500,
                style: {
                    backgroundColor: "green",
                    color: "white",
                    width: "fit-content"
                }
            });

            setTimeout(() => {
                location.replace("/login")
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-2 ">
            <form className="container mx-auto p-3 my-5 border-5  border-[#031f47] rounded-2xl max-w-[500px] mt-10" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="font-semibold text-2xl my-5 text-center ">Enter New Password</h2>
                {renderPasswordField(
                    "password",
                    "Password",
                    showPassword,
                    () => setShowPassword(!showPassword),
                    errors.password?.message
                )}

                <Button type="submit" className="w-full mt-5 active:scale-95 cursor-pointer">submit</Button>

            </form>
        </div>
    )
}

export default ResetPassword