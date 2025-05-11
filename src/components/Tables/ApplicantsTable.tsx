import { Trash } from "lucide-react";
import { Button } from "../ui/Button";
import {
  useDeleteApplicantMutation,
  useGetApplicantsQuery,
} from "@/app/api/ApiSlice/ApplicantsApiSlice";
import toast from "react-hot-toast";
import InputField from "../ui/InputField";
import { useEffect, useState } from "react";

export type IApplicant = {
  applicantId: number;
  nationalNo: string;
  fname: string;
  sname: string;
  tname: string;
  lname: string;
  birthDate: string;
  address: string;
};

const ApplicantsTable = () => {
  const { data, isLoading, isError } = useGetApplicantsQuery({});
  const [deleteApplicant] = useDeleteApplicantMutation();
  const [searchResults, setSearchResults] = useState<IApplicant[]>([]);
  const [deletingIds, setDeletingIds] = useState<number[]>([]); 
  console.log(data);

  useEffect(() => {
    if (data && Array.isArray(data.value)) {
      setSearchResults(data.value);
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    try {
      setDeletingIds((prev) => [...prev, id]); // إضافة ID إلى حالة الحذف
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
    } finally {
      setDeletingIds((prev) => prev.filter((item) => item !== id)); // إزالة ID من حالة الحذف
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
          item.fname.toLowerCase().includes(term.toLowerCase()) ||
          item.nationalNo.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredData);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Applicants Table</h1>
      <div>
        <InputField
          onChange={handleSearch}
          id="search"
          type="search"
          placeholder="Search by Name or National Number ..."
        />
      </div>

      <table className="min-w-full table-auto border-collapse mt-4">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">National No</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Birth Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((applicant: IApplicant) => {
              const fullName = `${applicant.fname} ${applicant.sname} ${applicant.tname} ${applicant.lname}`;
              const isDeleting = deletingIds.includes(applicant.applicantId);
              return (
                <tr key={applicant.applicantId} className="border-b">
                  <td className="px-4 py-2">{applicant.applicantId}</td>
                  <td className="px-4 py-2">{fullName}</td>
                  <td className="px-4 py-2">{applicant.nationalNo}</td>
                  <td className="px-4 py-2">{applicant.address}</td>
                  <td className="px-4 py-2">
                    {new Date(applicant.birthDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      disabled={isDeleting}
                      onClick={() => handleDelete(applicant.applicantId)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash className="mr-2" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
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
