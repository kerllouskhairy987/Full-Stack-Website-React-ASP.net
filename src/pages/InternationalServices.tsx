import { useState } from "react";
import Button from "@/components/Button";
import axiosInstance from "@/config/axios.config";
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global";
import CustomHook from "@/hooks/CustomHook";
import { IErrorResponse } from "@/interfaces";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { SkeletonInternationalServices } from "@/components/Skeleton ";

const InternationalServices = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // shared config between two CustomHook
    const config = {
        headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
        }
    };

    // Fetch international service info
    const { isLoading, data } = CustomHook({
        queryKey: ["internationalServices"],
        url: "Applications/GetApplicationTypeById/6",
        config
    });

    // Fetch applicant info
    const { isLoading: isLoadingApplicant, data: applicantInfo } = CustomHook({
        queryKey: ["ApplicantInfoForInternational"],
        url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`,
        config
    });
    const applicantId = applicantInfo?.value?.applicantId;

    const handleApply = async () => {
        if (isLoadingApplicant) return;
        try {
            setIsSubmitting(true);
            const { data } = await axiosInstance.post(
                `Applications/ApplyForNewInternationalLicenseApplication/${applicantId}`,
                applicantId,
                {
                    headers: {
                        Authorization: `Bearer ${tokenFromLocalStorage}`,
                    }
                }
            );

            if (data?.isSuccess) {
                toast.success('Successfully applied for the international license!', {
                    duration: 1500,
                    position: 'bottom-center',
                    style: { backgroundColor: "green", color: "white", width: "fit-content" },
                });
            }

        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            toast.error(`${errorObj.response?.data?.errors?.[0]}`, {
                duration: 1500,
                position: 'bottom-center',
                style: { backgroundColor: "red", color: "white", width: "fit-content" },
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    // Skeleton while loading
    if (isLoading) {
        return <SkeletonInternationalServices />;
    }


    // Destructure API data
    const { title, description, typeFee } = data?.value || {};

    return (
        <div className="container max-w-xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 p-2 mt-5 sm:mt-10">
            <img
                src="https://digitalinternationaldriverlicense.com/wp-content/uploads/2022/03/F2.jpg"
                alt="International Image"
                className="w-full object-contain min-h-48"
            />

            <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {title ?? "International Driving License"}
            </h2>

            <p className="text-gray-700 mb-4">
                {description ?? "Apply for your international driving license easily through our platform."}
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>The international license has a fixed duration defined in the system (may be adjustable).</li>
                <li>This service is only available for holders of a third-category regular driving license (car license).</li>
                <li>The regular license must be valid and not expired or suspended.</li>
                <li>
                    The service fee is
                    <span className="text-sm text-green-600 font-semibold"> ${typeFee ?? "N/A"}.</span>
                </li>
                <li>Only one active international license is allowed. Issuing a new one will cancel the previous license.</li>
            </ul>

            <Button
                onClick={handleApply}
                className="active:scale-90 w-full"
                type="button"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Applying..." : "Apply Now"}
            </Button>
        </div>
    );
};

export default InternationalServices;
