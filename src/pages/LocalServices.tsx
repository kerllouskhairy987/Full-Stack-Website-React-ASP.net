import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton ";
import axiosInstance from "@/config/axios.config";
import { licenseImg } from "@/data";
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global";
import CustomHook from "@/hooks/CustomHook";
import { IErrorResponse, ILocalServices } from "@/interfaces";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const LocalServices = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // shared config between two CustomHook
  const config = {
    headers: {
      Authorization: `Bearer ${tokenFromLocalStorage}`,
    },
  };

  // Fetch local services
  const { isLoading: isLoadingServices, data: localServices } = CustomHook({
    queryKey: ["LocalServices"],
    url: "Licenses/GetAllLicenseClasses",
    config
  });

  // Fetch applicant info
  const { isLoading: isLoadingApplicant, data: applicantInfo } = CustomHook({
    queryKey: ["ApplicantInfo"],
    url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`,
    config
  });
  const applicantId = applicantInfo?.value?.applicantId;

  // handlers
  const handleApply = async (licenseId: number) => {
    if (!isLoadingServices && !isLoadingApplicant) {
      console.log(`You applied for license ID: ${licenseId}, Applicant ID: ${applicantId}`);
      const applyData = {
        applicantId: applicantId,
        classLicenseId: licenseId
      }
      // Post applicantId && classLicenseId
      try {
        setIsSubmitting(true);
        const { data } = await axiosInstance.post("Applications/ApplyForNewLocalDrivingLicense", applyData, {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          }
        });
        console.log("Application submitted successfully:", data);
        if (data?.isSuccess) {
          toast.success('Successfully applied on this class!',
            {
              duration: 1500,
              position: 'bottom-center',
              style: { backgroundColor: "green", color: "white", width: "fit-content" },
            }
          );
        }
      } catch (error) {
        const errorObj = error as AxiosError<IErrorResponse>
        toast.error(`${errorObj.response?.data?.errors?.[0]}`,
          {
            duration: 1500,
            position: 'bottom-center',
            style: { backgroundColor: "red", color: "white", width: "fit-content" },
          }
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoadingServices) {
    return <Skeleton count={7} />
  }

  if (!localServices?.value?.length) {
    return (
      <div className="container mx-auto p-2 mt-5 sm:mt-10">
        <h2 className="mb-5 text-red-500 font-semibold text-lg">No services available at the moment. You Must Create Account First</h2>
        <Link to="/login" className="text-blue-600">
          <Button type="button" className="w-full">Login Now</Button>
        </Link>
      </div>);
  }

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-2 mt-5 sm:mt-10">
      {localServices.value.map(
        ({ id, name, description, minAge, validityPeriod, fee }: ILocalServices, idx: number) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <img src={licenseImg[idx]} alt={name} className="w-full mb-2 h-52 object-contain" />
              <h2 className="text-xl font-bold text-blue-700 mb-2">{name}</h2>
              <p className="text-gray-700 mb-1">{description}</p>
              <p className="text-sm text-gray-500">Min Age: {minAge}</p>
              <p className="text-sm text-gray-500">Validity: {validityPeriod} years</p>
              <p className="text-sm text-green-600 font-semibold">Fee: ${fee}</p>
            </div>
            <Button onClick={() => handleApply(id)} className="mt-4 active:scale-90" type="button" isLoading={isLoadingServices} disabled={isSubmitting} >Apply Now </Button>

          </div>
        )
      )}
    </div>
  );
};

export default LocalServices;