import { SkeletonUserTests } from "@/components/Skeleton "
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global"
import CustomHook from "@/hooks/CustomHook"

const AppointmentPage = () => {
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
                                    <span className="text-green-600 font-semibold">Looked</span>
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