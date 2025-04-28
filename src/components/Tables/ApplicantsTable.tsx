import { Trash } from "lucide-react";
import { Button } from "../ui/Button";
import {
  useDeleteApplicantMutation,
  useGetApplicantsQuery,
} from "@/app/api/ApiSlice/ApplicantsApiSlice";
import toast from "react-hot-toast";
import InputField from "../ui/InputField";
import { useEffect, useState } from "react";
import { IappStatus } from "@/types";


export type IApplicant = {
  appId: number;
  applicationType: string;
  appDate: string;
  appStatus: IappStatus;
  appFee: number;
  applicantName: string;
  nationalNumber: string;
  licenseClass: string;
};

const ApplicantsTable = () => {
  const { data, isLoading, isError } = useGetApplicantsQuery({});
  const [deleteApplicant, { isLoading: isDeleting }] =
    useDeleteApplicantMutation();
  const [searchResults, setSearchResults] = useState<IApplicant[]>([]);
  useEffect(() => {
    if (data && Array.isArray(data.value)) {
      setSearchResults(data.value);
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    try {
      console.log(`Deleting applicant with ID: ${id}`);
      await deleteApplicant(id).unwrap();
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

  const renderStatus = (status: IappStatus) => {
    switch (status) {
      case "Pending":
        return <span className="text-yellow-500">Pending</span>;
      case "Approved":
        return <span className="text-green-500">Approved</span>;
      case "Rejected":
        return <span className="text-red-500">Rejected</span>;
      case "Completed":
        return <span className="text-blue-500">Completed</span>;
      default:
        return <span>{status}</span>;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching applicants.</div>;
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    if (data && Array.isArray(data.value)) {
      const filteredData = data.value.filter(
        (item: IApplicant) =>
          item.applicantName.toLowerCase().includes(term.toLowerCase()) ||
          item.nationalNumber.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredData);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Applicants Table</h1>
      <div>
        <InputField
          onChange={(e) => handleSearch(e)}
          id="search"
          type="search"
          placeholder="Search by Name or National Number ..."
        />
      </div>

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
          {searchResults && data.value.length > 0 ? (
            searchResults.map((applicant: IApplicant) => (
              <tr key={applicant.appId} className="border-b">
                <td className="px-4 py-2">{applicant.appId}</td>
                <td className="px-4 py-2">{applicant.applicantName}</td>
                <td className="px-4 py-2">{applicant.nationalNumber}</td>
                <td className="px-4 py-2">{applicant.licenseClass}</td>
                <td className="px-4 py-2">{applicant.applicationType}</td>
                <td className="px-4 py-2">
                  {new Date(applicant.appDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {renderStatus(applicant.appStatus)}
                </td>
                <td className="px-4 py-2">${applicant.appFee}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col gap-2">
                    <Button
                      disabled={isDeleting}
                      onClick={() => handleDelete(applicant.appId)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash className="mr-2" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-6 text-gray-500">
                No applicants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
