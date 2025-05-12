import React from "react";
import Modal from "../ui/Modal";
import Detained from "../Admin/Modals/Detained";
import Button from "../Button";

interface License {
  licenseId: number;
  issueDate: string;
  expirationDate: string;
  licenseClass: string;
  driverName: string;
  driverDateOfBirth: string;
  issueReason: string;
  isValid: boolean;
  notes: string;
  paidFees: number;
  isDetained: boolean;
}

const RenewLicenseTable = ({ applications }: { applications: License[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="space-y-4">
      {applications.length > 0 ? (
        <div className="overflow-x-auto text-nowrap">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Driver Name</th>
                <th className="px-4 py-2 text-left">Birth Date</th>
                <th className="px-4 py-2 text-left">License Class</th>
                <th className="px-4 py-2 text-left">Issue Reason</th>
                <th className="px-4 py-2 text-left">Issue Date</th>
                <th className="px-4 py-2 text-left">Expiration Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Fee</th>
                <th className="px-4 py-2 text-left">Detained?</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.licenseId} className="border-b">
                  <td className="px-4 py-2">{app.licenseId}</td>
                  <td className="px-4 py-2">{app.driverName}</td>
                  <td className="px-4 py-2">
                    {new Date(app.driverDateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{app.licenseClass}</td>
                  <td className="px-4 py-2">{app.issueReason}</td>
                  <td className="px-4 py-2">
                    {new Date(app.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(app.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {app.isValid ? "Valid" : "Expired"}
                  </td>
                  <td className="px-4 py-2">${app.paidFees}</td>
                  <td className="px-4 py-2">{app.isDetained ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    <Button type="button" onClick={() => setIsOpen(true)}>Detained</Button>
                  </td>
                  <Modal
                    isOpen={isOpen}
                    closeModal={() => setIsOpen(false)}
                    title="Detained"
                  >
                    <Detained
                      licenseId={app.licenseId}
                      detainedDate={app.issueDate}
                      releasedDate={app.expirationDate}
                    />
                  </Modal>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-8 text-lg font-semibold">
          No license records found.
        </p>
      )}
    </div>
  );
};

export default RenewLicenseTable;
