import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/ui/InputField";
import { registerSchema } from "../../validation/auth";
import { IErrorResponse, RegisterFormValues } from "../../interfaces";
import { UPDATE_USER_FORM } from "@/data";
import { FaRegEdit } from "react-icons/fa";
import axiosInstance from "@/config/axios.config";
import CountryDropDown, { GenderDropDown } from "@/components/ui/DropDown";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import CustomHook from "@/hooks/CustomHook";
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global";

const UserInfo = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [selectedGender, setSelectedGender] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false)

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
    // Get applicant id
    const { data: applicant, isLoading: applicant_loading } = CustomHook({
        queryKey: ["user_information__"],
        url: `Applicants/GetApplicantIdByUserId/${userIdFromLocalStorage}`,
        config: {
            headers: { Authorization: `Bearer ${tokenFromLocalStorage}` }
        }
    });
    console.log("data and isLoading", applicant?.value, applicant_loading)

    // Fetch User Profile Information
    const applicantId = applicant?.value;
    const { data } = CustomHook({
        queryKey: ["userProfile_information"],
        url: `Applicants/GetUserProfile/${applicantId}`,
        config: {
            headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
            }
        }
    })
    console.log("data and isLoading", data)

    // Renders
    const renderRegisterForm = UPDATE_USER_FORM.map(({ label, name, id, type, placeholder, validation }, index) => (
        <div key={index}>
            <InputField
                label={label}
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(name, validation)}
                errorMessage={errors[name]?.message}
            // value={name}
            />
        </div>
    ))

    const handleButtonClick = () => {
        console.log("selectedCountry")
        setIsEditable(prev => prev = !prev);
        console.log("isEditable", isEditable);
    }

    return (
        <div className="flex flex-col md:flex-row mt-5 sm:mt-10"> {/* h-screen */}
            <div className="w-full mx-auto md:w-1/2 flex justify-center items-center px-3 py-1">
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
                    <Button onClick={handleButtonClick} type={isEditable ? "submit" : "button"} className="w-full" disabled={isLoading} isLoading={isLoading}>
                        {isEditable ? isLoading ? "Updating..." : "submit" : "Update"}
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default UserInfo;
