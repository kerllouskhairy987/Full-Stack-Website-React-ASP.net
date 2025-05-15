import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Button";
import InputField from "../../components/ui/InputField";
import { UpdateUserSchema } from "../../validation/auth";
import { IUpdateUserFormValues } from "../../interfaces";
import { UPDATE_USER_FORM } from "@/data";
import { FaRegEdit } from "react-icons/fa";
import axiosInstance from "@/config/axios.config";
import CountryDropDown, { GenderDropDown } from "@/components/ui/DropDown";
import CustomHook from "@/hooks/CustomHook";
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global";
import { AlertError, AlertSuccess } from "@/lib";

const UserInfo = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [selectedGender, setSelectedGender] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null)

    // Handlers
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUpdateUserFormValues>({
        resolver: yupResolver(UpdateUserSchema),
    });

    // Get applicant id
    const { data: applicant } = CustomHook({
        queryKey: ["user_information__"],
        url: `Applicants/GetApplicantIdByUserId/${userIdFromLocalStorage}`,
        config: {
            headers: { Authorization: `Bearer ${tokenFromLocalStorage}` }
        }
    });

    // Fetch User Profile Information
    const applicantId = applicant?.value;

    // Set default values
    useEffect(() => {
        const fetchUserData = async () => {
            if (!applicantId) return;

            try {
                const response = await axiosInstance.get(`Applicants/GetUserProfile/${applicantId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenFromLocalStorage}`,
                    }
                });
                reset({ ...response?.data?.value, birthDate: new Date(response?.data?.value?.birthDate).toISOString().split('T')[0] });
                setImageUrl(response?.data?.value?.imageUrl);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, [applicantId]);


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
            />
        </div>
    ))


    // Handle Image Upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file); 
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const imageUrl = e.target?.result as string;
                setImageUrl(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    // Submit Handler
    const onSubmit: SubmitHandler<IUpdateUserFormValues> = async (data) => {
        setIsLoading(true);

        if (!imageFile) {
            console.log("الصورة غير موجودة");
            setIsLoading(false);
            AlertError({ title: "Error", text: "Please upload an image" });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("Image", imageFile);

            // /api/Applicants/UpdateUserProfile/{id}
            const { data: updatedData } = await axiosInstance.put(`Applicants/UpdateUserProfile/${applicantId}`, formData, {
                params: {
                    NationalNo: data.nationalNo,
                    Fname: data.fname,
                    Sname: data.sname,
                    Tname: data.tname,
                    Lname: data.lname,
                    CountryId: selectedCountry,
                    Gender: selectedGender,
                    BirthDate: data.birthDate,
                    Address: data.address,
                    PhoneNumber: data.phonenumber
                },
                headers: {
                    Authorization: `Bearer ${tokenFromLocalStorage}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            );

            console.log("Updated Data:", updatedData);
            AlertSuccess({ title: "Success", html: "Your profile has been updated successfully" })
        } catch (error) {
            console.error("user update Profile error", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row mt-5 sm:mt-10">
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
                                    <img src={"https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"} className="object-fit absolute rounded-full" alt="" />
                            }
                            <FaRegEdit className="absolute text-white text-2xl cursor-pointer bottom-6 right-[30px] z-10" />
                            <input id="image" type="file" accept="image/*" className="w-[200px!important] bg-transparent h-[200px!important] block rounded-[50%!important] opacity-0 border mx-auto cursor-pointer" onChange={handleImageUpload} />
                        </label>

                        {renderRegisterForm}
                        <CountryDropDown setSelectedCountry={setSelectedCountry} />
                        <GenderDropDown setSelectedGender={setSelectedGender} />

                    </div>
                    {/* <Button type="submit" disabled={isLoading} className="w-full"> {isLoading ? "Loading..." : "Submit"} </Button> */}
                    <Button type="submit" className="w-full" disabled={isLoading}> {isLoading ? "loading..." : "Update"}</Button>
                </form>
            </div>
        </div>
    );
};
export default UserInfo;


/*

const updatedData = {
            ...data,
            countryId: selectedCountry,
            gender: selectedGender
            Image: imageUrl,
        }
        
        console.log("DATA ....>>>>>", updatedData)
        
        try {
            const { data: updatedDataFetch } = await axiosInstance.put(`Applicants/UpdateUserProfile/${applicantId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${tokenFromLocalStorage}`
                }
            })
            
            console.log("updatedDataFetch .....", updatedDataFetch);
        } catch (error) {
            console.log(error);
            
        } finally {
            setIsLoading(false)
        }
        
                                {/* <div>
                                    <label htmlFor="image">Upload Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        onChange={handleImageUpload}
                                        className="block w-full mt-1"
                                    />
                                </div> */






