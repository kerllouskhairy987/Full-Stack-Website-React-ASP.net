import Button from "@/components/Button"
import axiosInstance from "@/config/axios.config"
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global"
import CustomHook from "@/hooks/CustomHook"
import { IErrorResponse } from "@/interfaces"
import { AlertError, AlertSuccess } from "@/lib"
import { AxiosError } from "axios"

const VisionTest = () => {
    const appIdFromLocal = Number(localStorage.getItem("appId"));
    // for fetch the nameUser of user
    const { data } = CustomHook({
        queryKey: ["userNameVision"], url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`, config: {
            headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
            }
        }
    })
    const applicantId = data?.value?.applicantId



    // send data about vision test
    const handleVisionTestSubmit = async () => {
        if (!applicantId) return;

        try {
            const res = await axiosInstance.post(`Applications/ScheduleVisionTest?appId=${appIdFromLocal}&applicantId=${applicantId}`, null, {
                headers: {
                    Authorization: `Bearer ${tokenFromLocalStorage}`,
                }
            });
            console.log("Response from Vision Test:", res?.data);

            // fetch the test results
            const ID = res?.data?.value;
            const response = await axiosInstance.get(`Tests/${ID}`, {
                headers: {
                    Authorization: `Bearer ${tokenFromLocalStorage}`,
                }
            })
            console.log("Response from practical test: ????????? ", response?.data);
            const dataTestResult = response?.data?.value;

            AlertSuccess({
                title: "Successfully Applied for vision test!", html: `
                        <p><strong>Test Type:</strong> ${dataTestResult.testType}</p>
                        <p><strong>Fee Paid:</strong> ${dataTestResult.paidFee} EGP</p>
                        <p><strong>Appointment:</strong> ${new Date(dataTestResult.appointmentDate).toLocaleString()}</p>
                `})
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            AlertError({
                title: "Error",
                text: `${errorObj?.response?.data?.errors?.[0]}`,
            })
        }

    }

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300" >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Vision Test</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This test measures your ability to distinguish shapes, colors, and distances accurately to ensure your eyesight is fit for specific tasks.
                </p>
                <Button type="button" onClick={handleVisionTestSubmit} className="w-full"> Apply </Button>
            </div>
        </ >
    )
}

export default VisionTest