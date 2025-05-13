import { useState } from "react";
import Button from "./Button";
import axiosInstance from "@/config/axios.config";
import { tokenFromLocalStorage } from "@/global";
import { AlertError, AlertSuccess } from "@/lib";
import { AxiosError } from "axios";
import { IErrorResponse } from "@/interfaces";

const RenewLicense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLicenseId, setIsLicenseId] = useState("");

  // Apply for new license
  const fetchRenewLicense = async () => {
    const licenseId = Number(isLicenseId);
    console.log(licenseId);
    try {
      const { data } = await axiosInstance.post(
        `Applications/ApplyForRenewLicenseApplicantion/${licenseId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        }
      );
      console.log(data);
      AlertSuccess({
        title: "Success",
        html:
          data.message || "Your application has been submitted successfully.",
      });
    } catch (error) {
      console.log("Error in RenewLicense component:", error);
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log("Error response:", errorObj?.response?.data?.errors?.[0]);
      AlertError({
        title: "Error",
        text:
          `${errorObj?.response?.data?.errors?.[0]}` || "Invalid license ID",
      });
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    // fetchRenewLicense();
  };
  const submitHandler = () => fetchRenewLicense();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-2 my-4">
      <div className="flex items-center justify-center my-10">
        <span className="animate-bounce relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-[#031F47]">
          <h2 className="relative text-white font-semibold text-3xl p-2 mx-auto">
            Apply For New License
          </h2>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 border overflow-hidden w-[400px] rounded hover:shadow-2xl dark:shadow-blue-400/40">
        <img
          src="https://media.gettyimages.com/id/501924077/photo/smiling-teenage-girl-sitting-in-car-showing-driving-license-partial-view.jpg?s=612x612&w=gi&k=20&c=OspJNyoMuwH5AG2YHI1NjXcZbEmBF07IzgixEBJkFvU="
          alt="renew license image"
        />
        <h2 className="font-bold text-lg px-2">Renew License</h2>
        <p className="px-2">
          Renew your driving license online with ease. Follow the steps below to
          complete your application.
        </p>
        <Button
          type="button"
          className="w-full rounded-none"
          onClick={openModal}
        >
          Apply
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#171918] rounded-xl shadow-lg p-8 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              Enter your license ID
            </h2>
            <input
              type="number"
              value={isLicenseId}
              onChange={(e) => setIsLicenseId(e.target.value)}
              placeholder="License ID"
              className="w-full p-2 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" onClick={submitHandler} className="w-full">
                Submit
              </Button>
              <Button type="button" onClick={closeModal} className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewLicense;
