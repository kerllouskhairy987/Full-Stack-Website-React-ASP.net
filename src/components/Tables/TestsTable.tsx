import React from "react";
import Button from "../Button";
import Modal from "../ui/Modal";
import { Tests } from "@/interfaces";
import AcceptTestForm from "../Admin/Modals/AcceptTest";

interface Props {
  data: Tests[];
}

const AppointmentTable: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [testAppointmentId, setTestAppointmentId] = React.useState(0);
  console.log(data);

  return (
    <div className="overflow-x-auto p-4 text-nowrap">
      <table className="min-w-full border border-gray-300 rounded shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Nathional ID</th>
            <th className="px-4 py-2 border">Test Type</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Fee</th>
            <th className="px-4 py-2 border">Looked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((appointment, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{appointment.applicantName}</td>
              <td className="px-4 py-2 border">
                {appointment.applicantNationalNo}
              </td>
              <td className="px-4 py-2 border">{appointment.testType}</td>
              <td className="px-4 py-2 border">
                {new Date(appointment.appointmentDate).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">{appointment.paidFee} $</td>
              <td className="px-4 py-2 border ">
                {appointment.isLooked ? (
                  "yes"
                ) : (
                  <Button
                    size="sm"
                    className="text-center m-auto"
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                      setTestAppointmentId(appointment.appointmentId);
                    }}
                  >
                    Look
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title="Look" isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <AcceptTestForm setIsOpen={setIsOpen} testId={testAppointmentId} />
      </Modal>
    </div>
  );
};

export default AppointmentTable;
