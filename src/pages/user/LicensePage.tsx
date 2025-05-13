import { SkeletonUserLicenses } from "@/components/Skeleton "
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global"
import CustomHook from "@/hooks/CustomHook"

const LicensePage = () => {
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
    // /Api/Licenses/GetLicensesByApplicantId/{applicantId}
    const { isLoading, data } = CustomHook({
        queryKey: ["allAppointmentsForApplicant"],
        url: `Licenses/GetLicensesByApplicantId/${applicantId}`,
        config
    });
    const dataAllAppointments = data?.value;

    if (isLoading) return <SkeletonUserLicenses />
    return (
        <div className="overflow-x-auto mt-3 sm:mt-5">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left whitespace-nowrap">Driver Name</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">License ID</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">License Class</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">Issue Date</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">Expiration Date</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">Issue Reason</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">Notes</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap">Paid Fees</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAllAppointments?.map((test: any, index: number) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2 whitespace-nowrap">{test.driverName}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.licenseId}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.licenseClass}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.issueDate}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.expirationDate}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.issueReason}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.notes}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{test.paidFees} EGP</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default LicensePage