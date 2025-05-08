import { MdOutlinePending, MdOutlineSmsFailed } from "react-icons/md";
import { FaDiagramSuccessor } from "react-icons/fa6";

interface IProps {
  count: number;
}

const Skeleton = ({ count = 3 }: IProps) => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-2 mt-5 sm:mt-10">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white border rounded-xl p-5 shadow-sm space-y-4"
        >
          <div className="w-full h-52 bg-gray-300 rounded mb-2" />
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-300 rounded w-1/4" />
          <div className="mt-4 h-10 bg-gray-300 rounded w-full" />
        </div>
      ))}
    </div>
  )
}

export default Skeleton;

export const SkeletonInternationalServices = () => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 animate-pulse mt-10">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
      <ul className="space-y-3 mb-6">
        <li className="h-3 bg-gray-300 rounded w-11/12"></li>
        <li className="h-3 bg-gray-300 rounded w-10/12"></li>
        <li className="h-3 bg-gray-300 rounded w-9/12"></li>
        <li className="h-3 bg-gray-300 rounded w-8/12"></li>
        <li className="h-3 bg-gray-300 rounded w-7/12"></li>
      </ul>
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
}

export const SkeletonUserLicense = () => {
  return (
    <div className="mt-5 sm:mt-10">
      <div className="container px-2 sm:px-0 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm">
          <MdOutlinePending className="font-bold text-4xl mx-auto" />
          <h2 className="text-lg font-semibold">Pending</h2>
          <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm">
          <FaDiagramSuccessor className="font-bold text-4xl mx-auto" />
          <h2 className="text-lg font-semibold">Approved</h2>
          <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm">
          <MdOutlineSmsFailed className="font-bold text-4xl mx-auto" />
          <h2 className="text-lg font-semibold">Rejected</h2>
          <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="overflow-x-auto mt-3 sm:mt-5">
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
            {
              [...Array(7)].map((_, i) => (
                <tr key={i} className="border-b animate-pulse">
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-300 rounded min-w-1/4"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-300 rounded min-w-1/4"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-300 rounded min-w-[15%]"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-300 rounded min-w-[15%]"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-8 bg-gray-300 rounded min-w-1/5"></div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}







