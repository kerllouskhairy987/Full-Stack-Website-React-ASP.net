import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { useDetainLicenseMutation } from "@/app/api/ApiSlice/LicenseApiSlice";
import InputField from "@/components/ui/InputField";
interface TestFormData {
  notes: string;
  fineFees: number;
  reason: string;
}

const schema = object({
  notes: string().required("الملاحظات مطلوبة"),
  fineFees: number().required("الرسوم مطلوبة"),
  reason: string().required("السبب مطلوب"),
});
const Detained = ({
  licenseId,
  detainedDate,
  releasedDate,
}: {
  licenseId: number;
  detainedDate: string;
  releasedDate: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestFormData>({
    resolver: yupResolver(schema),
  });
  const [detainLicense, { isLoading }] = useDetainLicenseMutation();
  const onSubmit = async (data: TestFormData) => {
    const finalData = {
      ...data,
      licenseId: licenseId,
      detainedDate: detainedDate,
      releasedDate: releasedDate,
    };

    try {
      await detainLicense({ data: finalData }).unwrap();
      toast.success("تم تحديث الحالة بنجاح!");
      reset();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="bg-background rounded-lg ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ملاحظات */}
        <div className="w-full">
          <InputField
            id="fineFees"
            type="number"
            label="Fine Fees"
            placeholder="Enter Fine Fees"
            {...register("fineFees")}
            errorMessage={errors.fineFees?.message}
          />
          {errors.fineFees && (
            <p className="text-red-500 text-sm">{errors.fineFees.message}</p>
          )}
        </div>
        <div>
          <InputField
            id="reason"
            type="text"
            label="Reason"
            placeholder="Enter Reason"
            {...register("reason")}
            errorMessage={errors.fineFees?.message}
          />
          {errors.fineFees && (
            <p className="text-red-500 text-sm">{errors.fineFees.message}</p>
          )}
        </div>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Detained;
