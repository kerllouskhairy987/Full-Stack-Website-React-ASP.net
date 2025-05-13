import Button from "@/components/Button"
import { SkeletonUserTests } from "@/components/Skeleton "
import axiosInstance from "@/config/axios.config"
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global"
import CustomHook from "@/hooks/CustomHook"
import { AlertSuccess } from "@/lib"
import { useState } from "react"

const AppointmentPage = () => {
    const [isLoadingShowResult, setIsLoadingShowResult] = useState(false)
    const config = {
        headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`
        }
    }
    // fetch applicant by userId
    const { data: applicant } = CustomHook({
        queryKey: ["user_information_appointment"],
        url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`,
        config
    })


    // fetch all appointments
    const applicantId = applicant?.value?.applicantId;
    console.log("applicantId ...................", applicantId)
    const { isLoading, data } = CustomHook({
        queryKey: ["allAppointmentsForApplicant"],
        url: `Tests/GetAllTestAppoinmentByApplicantId/${applicantId}`,
        config
    });
    const dataAllAppointments = data?.value;

    // show result handler
    const showResultHandler = async (appointmentId: number) => {
        console.log("show result handler", appointmentId)
        setIsLoadingShowResult(true)
        try {
            const response = await axiosInstance.get(
                `Tests/GetTestResultByTestAppoinmentId/${appointmentId}`, {
                headers: {
                    Authorization: `Bearer ${tokenFromLocalStorage}`
                }
            })

            console.log("response", response)
            if (!response) return;
            AlertSuccess({
                title: `Result: ${response?.data?.value?.result ? "Passed" : "Failed"}` || "No result available",
                html: `Notes: ${response?.data?.value?.notes}` || "No notes available",
            })

        } catch (error) {
            console.log("error", error)

        } finally {
            setIsLoadingShowResult(false)
        }
    }

    if (isLoading) return <SkeletonUserTests />
    return (
        <div className="overflow-x-auto mt-3 sm:mt-5">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Applicant Name</th>
                        <th className="px-4 py-2 text-left">Test Type</th>
                        <th className="px-4 py-2 text-left">Appointment</th>
                        <th className="px-4 py-2 text-left">Fee</th>
                        <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAllAppointments?.map((test: any, index: number) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2 whitespace-nowrap">{test.applicantName}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.testType}</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                {new Date(test.appointmentDate).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.paidFee} EGP</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                {test.isLooked ? (
                                    <div className="flex items-center justify-start gap-3">
                                        <span className="text-green-600 font-semibold">Looked</span>
                                        <Button type="button" className="py-1"
                                            disabled={isLoadingShowResult}
                                            onClick={() => showResultHandler(test.appointmentId)}
                                        >
                                            {isLoadingShowResult ? "View Result..." : "View Result"}
                                        </Button>
                                    </div>
                                ) : (
                                    <span className="text-yellow-500 font-semibold">Pending</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default AppointmentPage