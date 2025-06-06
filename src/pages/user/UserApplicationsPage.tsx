import Button from "@/components/Button";
import { ChartUser, ChartUserTwo } from "@/components/charts";
import { SkeletonUserLicense } from "@/components/Skeleton ";
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global";
import CustomHook from "@/hooks/CustomHook";
import { IDataLicense } from "@/interfaces";
import { FaDiagramSuccessor } from "react-icons/fa6";
import { MdOutlinePending, MdOutlineSmsFailed } from "react-icons/md";
import { Link } from "react-router";
import { NavLink } from "react-router-dom";

const UserApplicationPage = () => {
  // Get Applicant
  const { data: applicant, isLoading: applicant_loading } = CustomHook({
    queryKey: ["user_information__"],
    url: `Applicants/GetApplicantIdByUserId/${userIdFromLocalStorage}`,
    config: { headers: { Authorization: `Bearer ${tokenFromLocalStorage}` } },
  });
  console.log("data and isLoading", applicant?.value, applicant_loading);
  const applicantId = applicant?.value;
  console.log("applicantId ...................", applicantId);
  console.log("applicant ...............", applicant);

  // Get Licenses By Applicant
  const { data, isLoading } = CustomHook({
    queryKey: ["user_applications"],
    url: `Applications/ApplicantApplicationById/${applicantId}`,
    config: {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`,
      },
    },
  });
  console.log("data and isLoading LICENSE ......", data, isLoading);
  const dataLicense = data?.value;
console.log("dataLicense", dataLicense);
  const pendingCount =
    dataLicense?.filter((app: IDataLicense) => app.appStatus === "Pending")
      .length || 0;
  const approvedCount =
    dataLicense?.filter((app: IDataLicense) => app.appStatus === "Approved")
      .length || 0;
  const rejectedCount =
    dataLicense?.filter((app: IDataLicense) => app.appStatus === "Rejected")
      .length || 0;

  // Render Status
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

  if (isLoading) {
    return <SkeletonUserLicense />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-8 text-lg font-semibold">
        <h2>No applications found.</h2>
        <Link to="/services">
          <Button type="button" className="mx-auto mt-4">
            Apply Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-5 sm:mt-10">
      <div className="container grid gird-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <ChartUser />
        <ChartUserTwo />
      </div>
      <div className="container px-2 sm:px-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm">
          <MdOutlinePending className="font-bold text-4xl mx-auto" />
          <h2 className="text-lg font-semibold">Pending</h2>
          <span className="text-3xl font-bold">
            {pendingCount ? pendingCount : "0"}
          </span>
        </div>

        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm">
          <FaDiagramSuccessor className="font-bold text-4xl mx-auto" />
          <h2 className="text-lg font-semibold">Approved</h2>
          <span className="text-3xl font-bold">
            {approvedCount ? approvedCount : "0"}
          </span>
        </div>

        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm">
          <MdOutlineSmsFailed className="font-bold text-4xl mx-auto" />
          <h2 className="text-lg font-semibold">Rejected</h2>
          <span className="text-3xl font-bold">
            {rejectedCount ? rejectedCount : "0"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto mt-3 sm:mt-5 text-nowrap">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">License Class</th>
              <th className="px-4 py-2 text-left">Application Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Fee</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataLicense?.map((app: IDataLicense) => (
              <tr key={app.appId} className="border-b">
                <td className="px-4 py-2">{app.licenseClass}</td>
                <td className="px-4 py-2">{app.applicationType}</td>
                <td className="px-4 py-2">{renderStatus(app.appStatus)}</td>
                <td className="px-4 py-2">${app.appFee}</td>
                <td className="px-4 py-2">
                  {
                    (app.applicationType == "New Local Driving License Service" && (
                      <NavLink to={"tests"} className="whitespace-nowrap">
                        <Button
                          onClick={() => {
                            localStorage.setItem("appId", `${app?.appId}`);
                          }}
                          type="button"
                          className="whitespace-nowrap"
                        >
                          {" "}
                          Test NOW{" "}
                        </Button>
                      </NavLink>
                    ))
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserApplicationPage;
