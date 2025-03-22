import { FaEnvelope } from "react-icons/fa"
import Button from "../components/ui/Button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { emailSchema } from "../validation/auth";
import { emailFormValues } from "../interfaces";
import toast from "react-hot-toast";
const ForgotPassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(emailSchema),
    })
    const onSubmit = async (data: emailFormValues) => {
        console.log(data)

        try {


            toast.success('check your email', {
                position: "bottom-center",
                duration: 1500,
                style: {
                    backgroundColor: "green",
                    color: "white",
                    width: "fit-content"
                },
            });

            setTimeout(() => {
                location.replace("/reset-password")
            }, 2000)
        } catch (error) {
            console.log(error)

            // ${errorObj.response?.data.error.message}
            toast.error(`invalid email or this email is not registered`, {
                position: "bottom-center",
                duration: 1500,
                style: {
                    backgroundColor: "red",
                    color: "white",
                    width: "fit-content"
                },
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-3 my-5 border border-[#031f47] rounded-2xl max-w-[500px] mt-10">
            <h3 className="font-semibold text-2xl text-center">Reset Password</h3>

            <div className="mt-10 relative text-[#1a2930] flex flex-col items-start">
                <label htmlFor="email" className="lableAuthpage">
                    Email
                </label>
                <div className="relative w-full space-y-2 mt-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaEnvelope className="text-gray-500 h-5 w-5" />
                    </span>
                    <input
                        placeholder="Enter Your Password ..."
                        id="email"
                        type="email"
                        className={`w-full pl-10 px-1 py-2 border rounded-lg focus:border-[#1a2930] focus:outline-[#1a2930] ${errors.email
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


                <Button type="submit" className="border cursor-pointer active:scale-95 mt-4 w-full">
                    {/* <Link className="w-full" to={"/reset-password"}>  */}
                    Reset
                    {/* </Link> */}
                </Button>
            </div>

        </form>
    )
}

export default ForgotPassword