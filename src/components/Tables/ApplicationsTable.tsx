import { Button } from "../ui/Button";
import {
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
} from "@/app/api/ApiSlice/Applications";
import toast from "react-hot-toast";
import { IappStatus } from "@/types";
import { useState } from "react";
import Modal from "../ui/Modal";
import CreateLicenaceForm from "../Admin/Modals/CreateLicenaceForm";

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
  const [loadingStates, setLoadingStates] = useState<
    Record<number, "accept" | "reject" | "delete" | null>
  >({});
  const [isOpen, setIsOpen] = useState(false);
  const [ApllicationSelection, setApllicationSelection] =
    useState<DrivingLicenseApplication>();
  const [filterType, setFilterType] = useState<string>("all");

  const [acceptApplication] = useAcceptApplicationMutation();
  const [rejectApplication] = useRejectApplicationMutation();

  // تصفية الطلبات حسب النوع المحدد
  const filteredApplications = applications.filter((app) => {
    if (filterType === "all") return true;
    return app.applicationType === filterType;
  });

  // استخراج أنواع الطلبات الفريدة لعرضها في الفلتر
  const applicationTypes = Array.from(
    new Set(applications.map((app) => app.applicationType))
  );

  const handleAccept = async (id: number) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: "accept" }));
      await acceptApplication(id).unwrap();
      toast.success("Successfully Accepted!", {
        duration: 1500,
        position: "bottom-center",
        style: {
          backgroundColor: "green",
          color: "white",
          width: "fit-content",
        },
      });
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { errors?: string } };
        toast.error(err.data?.errors || "حدث خطأ غير متوقع");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id: number) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: "reject" }));
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
    }  catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { errors?: string } };
        toast.error(err.data?.errors || "حدث خطأ غير متوقع");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: null }));
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

  const appType = ApllicationSelection?.applicationType;
  const isValidAppType =
    appType === "New International Driving License" ||
    appType === "New Local Driving License Service" ||
    appType === "Replacement for a Damaged Driving License" ||
    appType === "Replacement for a Lost Driving License" ||
    appType === "Renew Driving License Service" ||
    appType === "Release Detained Driving License";


  return (
    <div className="space-y-4">
      {/* فلتر نوع الطلب */}
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="filter-type" className="font-medium text-gray-700">
          Filter by Type:
        </label>
        <select
          id="filter-type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border bg-background w-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 "
        >
          <option value="all">All Types</option>
          {applicationTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto text-nowrap">
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
            {filteredApplications?.map((app) => (
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
                        <Button onClick={() => handleAccept(app.appId)}>
                          {loadingStates[app.appId] === "accept"
                            ? "Accepting..."
                            : "Accept"}
                        </Button>
                        <Button
                          onClick={() => handleReject(app.appId)}
                          className="bg-yellow-500 hover:bg-yellow-600"
                        >
                          {loadingStates[app.appId] === "reject"
                            ? "Rejecting..."
                            : "Reject"}
                        </Button>
                      </div>
                    )}
                    {app.appStatus === "Approved" ? (
                      <Button
                        onClick={() => {
                          setIsOpen(true);
                          setApllicationSelection(app);
                        }}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {loadingStates[app.appId] === "delete"
                          ? "Creating Licenses..."
                          : "Create Licenses"}
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="Look" isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <CreateLicenaceForm
          setIsOpen={setIsOpen}
          appId={ApllicationSelection?.appId || 0}
          nationalNo={ApllicationSelection?.nationalNumber || ""}
          paidFees={ApllicationSelection?.appFee || 0}
          appType={
            isValidAppType ? appType : "New Local Driving License Service"
          }
        />
      </Modal>
    </div>
  );
};

export default ApplicationsTable;
