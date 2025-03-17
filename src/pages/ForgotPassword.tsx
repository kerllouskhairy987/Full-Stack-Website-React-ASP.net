import { FaEnvelope } from "react-icons/fa"
import Button from "../components/ui/Button"
import { FormEvent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

const ForgotPassword = () => {


    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpenResetPasswordModal(true)
    }

    const onSubmitResetPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div className="p-2">
            <form className="container mx-auto p-3 my-5 border border-[#031f47] rounded-2xl max-w-[500px] mt-10"
                onSubmit={(event) => onSubmit(event)} >
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
                            className={`w-full pl-10 px-1 py-2 border rounded-lg focus:border-[#1a2930] focus:outline-[#1a2930]`}
                        // {...register("email")}
                        />
                    </div>
                    {/* {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                    </p>
                )} */}

                    <Button type="submit" className="border cursor-pointer active:scale-95 mt-4 w-full">Reset</Button>
                </div>

            </form>

            {/* Modal Which Enter The Number */}

            <form action="" onSubmit={(e) => { onSubmitResetPassword(e) }}>
                {openResetPasswordModal ?
                    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[110] flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center bg-white w-[400px] p-5 rounded-2xl shadow-2xl">

                            <div className="flex gap-2 justify-center mt-10">
                                {[...Array(6)].map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        ref={(el) => {
                                            if (el) inputsRef.current[index] = el;
                                        }}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ))}
                            </div>
                            <NavLink to={"/reset-password"} className={"w-full"}>
                                <Button type="submit" className="my-5 w-full cursor-pointer active:scale-95">send</Button>
                            </NavLink>
                        </div>
                    </div>
                    : null}
            </form>
        </div>
    )
}

export default ForgotPassword