import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import {
  useAcceptRenewLicenseMutation,
  useCreateLicenseInternationalMutation,
  useCreateLicenseMutation,
  useDetainLicenseMutation,
  useReplaceForDamagedLicenseMutation,
  useReplaceForLostLicenseMutation,
} from "@/app/api/ApiSlice/Applications";

interface TestFormData {
  notes: string;
}

const CreateLicenaceForm = ({
  appId,
  paidFees,
  nationalNo,
  appType,
  setIsOpen,
}: {
  appId: number;
  paidFees: number;
  nationalNo: string;
  appType:
    | "New International Driving License"
    | "New Local Driving License Service"
    | "Replacement for a Damaged Driving License"
    | "Replacement for a Lost Driving License"
    | "Renew Driving License Service"
    | "Release Detained Driving License";

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [createLicense, { isLoading }] = useCreateLicenseMutation();
  const [createInternational, { isLoading: isLoadingInternational }] =
    useCreateLicenseInternationalMutation();
  const [acceptRenewLicense] = useAcceptRenewLicenseMutation();
  const [replaceForDamagedLicense] = useReplaceForDamagedLicenseMutation();
  const [replaceForLostLicense] = useReplaceForLostLicenseMutation();
  const [detainLicense] = useDetainLicenseMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestFormData>({
    resolver: yupResolver(
      object({
        notes: string().required("الملاحظات مطلوبة"),
      })
    ),
  });

  const onSubmit = async (data: TestFormData) => {
    let finalData = {};
    if (
      appType === "New International Driving License" ||
      appType === "New Local Driving License Service"
    ) {
      finalData = {
        ...data,
        nationalNo: nationalNo,
        appId: appId,
        paidFees: paidFees,
      };
    } else if (
      appType === "Replacement for a Lost Driving License" ||
      appType === "Replacement for a Damaged Driving License" ||
      appType === "Renew Driving License Service"
    ) {
      finalData = {
        ...data,
        applicationId: appId,
        paidFees: paidFees,
      };
    } else {
      finalData = {
        ...data,
        licenseId: appId,
        
      };
    }
    try {
      if (appType === "New International Driving License") {
        await createInternational({ data: finalData }).unwrap();
      } else if (appType === "New Local Driving License Service") {
        await createLicense({ data: finalData }).unwrap();
      } else if (appType === "Renew Driving License Service") {
        await acceptRenewLicense({ data: finalData }).unwrap();
      } else if (appType === "Replacement for a Damaged Driving License") {
        await replaceForDamagedLicense({ data: finalData }).unwrap();
      } else if (appType === "Replacement for a Lost Driving License") {
        await replaceForLostLicense({ data: finalData }).unwrap();
      } else {
        await detainLicense({ data: finalData }).unwrap();
      }
      toast.success("تم قبول الاختبار بنجاح!");
      setIsOpen(false);
      reset();
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { errors?: string } };
        toast.error(err.data?.errors || "حدث خطأ غير متوقع");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <div className="bg-background rounded-lg ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ملاحظات */}
        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            {...register("notes")}
            className="w-full border p-2 rounded"
            rows={3}
          />
          {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes.message}</p>
          )}
        </div>

        {/* زر الإرسال */}
        <Button type="submit" disabled={isLoading || isLoadingInternational}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CreateLicenaceForm;
