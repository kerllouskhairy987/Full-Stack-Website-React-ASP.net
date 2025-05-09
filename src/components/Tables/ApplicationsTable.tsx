import { Trash } from "lucide-react";
import { Button } from "../ui/Button";
import {
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
  useDeleteApplicationMutation,
} from "@/app/api/ApiSlice/Applications";
import toast from "react-hot-toast";
import { IappStatus } from "@/types";
interface DrivingLicenseApplication {
  appId: number;
  applicationType: string;
  appDate: string;
  appStatus: IappStatus;
  appFee: number;
  applicantName: string;
  nationalNumber: string;
  licenseClass: string;
}

const ApplicationsTable = ({
  applications,
}: {
  applications: DrivingLicenseApplication[];
}) => {
  const [acceptApplication, { isLoading: isLoadingAccept }] =
    useAcceptApplicationMutation();
  const [rejectApplication, { isLoading: isLoadingReject }] =
    useRejectApplicationMutation();
  const [deleteApplication, { isLoading: isLoadingDelete }] =
    useDeleteApplicationMutation();

  const handleAccept = async (id: number) => {
    try {
      const res = await acceptApplication(id).unwrap();
      console.log(res);
      toast.success("Successfully Accepted!", {
        duration: 1500,
        position: "bottom-center",
        style: {
          backgroundColor: "green",
          color: "white",
          width: "fit-content",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Accept!");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectApplication(id).unwrap();
      toast.success("Successfully Rejected!", {
        duration: 1500,
        position: "bottom-center",
        style: {
          backgroundColor: "red",
          color: "white",
          width: "fit-content",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Reject!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteApplication(id).unwrap();
      console.log(res);
      toast.success("Successfully Deleted!", {
        duration: 1500,
        position: "bottom-center",
        style: {
          backgroundColor: "red",
          color: "white",
          width: "fit-content",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Delete!");
    }
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return <span className="text-yellow-500">Pending</span>;
      case "Accepted":
        return <span className="text-green-500">Accepted</span>;
      case "Rejected":
        return <span className="text-red-500">Rejected</span>;
      case "Completed":
        return <span className="text-blue-500">Completed</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Applicant Name</th>
            <th className="px-4 py-2 text-left">National Number</th>
            <th className="px-4 py-2 text-left">License Class</th>
            <th className="px-4 py-2 text-left">Application Type</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Fee</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications?.map((app) => (
            <tr key={app.appId} className="border-b">
              <td className="px-4 py-2">{app.appId}</td>
              <td className="px-4 py-2">{app.applicantName}</td>
              <td className="px-4 py-2">{app.nationalNumber}</td>
              <td className="px-4 py-2">{app.licenseClass}</td>
              <td className="px-4 py-2">{app.applicationType}</td>
              <td className="px-4 py-2">
                {new Date(app.appDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{renderStatus(app.appStatus)}</td>
              <td className="px-4 py-2">${app.appFee}</td>
              <td className="px-4 py-2">
                <div className="flex flex-col gap-2">
                  {app.appStatus === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAccept(app.appId)}
                        disabled={isLoadingAccept}
                      >
                        {isLoadingAccept ? "Accepting..." : "Accept"}
                      </Button>
                      <Button
                        onClick={() => handleReject(app.appId)}
                        disabled={isLoadingReject}
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        {isLoadingReject ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
                  )}
                  <Button
                    onClick={() => handleDelete(app.appId)}
                    disabled={isLoadingDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash className="mr-2" />
                    {isLoadingDelete ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
