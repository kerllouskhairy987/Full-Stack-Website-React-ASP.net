import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { useCreateLicenseMutation } from "@/app/api/ApiSlice/Applications";
interface TestFormData {
  notes: string;
}

const CreateLicenaceForm = ({
  appId,
  paidFees,
  nationalNo,
  setIsOpen,
}: {
  appId: number;
  paidFees: number;
  nationalNo: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [createLicense, { isLoading }] = useCreateLicenseMutation();
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
    const finalData = {
      ...data,
      nationalNo: nationalNo,
      appId: appId,
      paidFees: paidFees,
    };
    try {
      await createLicense({ data: finalData }).unwrap();
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CreateLicenaceForm;
