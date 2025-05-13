import { useForm } from "react-hook-form";
import { object, boolean, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAcceptTestMutation } from "@/app/api/ApiSlice/TestsApiSlice";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

interface TestFormData {
  testResult: boolean;
  notes: string;
}

const schema = object({
  testResult: boolean().required("The test result is required"),
  notes: string().required("Notes are required"),
});

const AcceptTestForm = ({
  testId,
  setIsOpen,
}: {
  testId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(testId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestFormData>({
    resolver: yupResolver(schema),
  });

  const [acceptTest, { isLoading }] = useAcceptTestMutation();

  const onSubmit = async (data: TestFormData) => {
    const finalData = {
      ...data,
      testAppointmentId: testId,
    };
    try {
      await acceptTest({ data: finalData }).unwrap();
      toast.success("The test has been accepted successfully!");
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
        {/* النتيجة */}
        <div>
          <label className="block mb-1 font-medium">Did Pass?</label>
          <select
            {...register("testResult")}
            className="w-full border p-2 rounded bg-background"
          >
            <option value="">Select...</option>
            <option value="true">Passed</option>
            <option value="false">Failed</option>
          </select>
          {errors.testResult && (
            <p className="text-red-500 text-sm">{errors.testResult.message}</p>
          )}
        </div>

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

export default AcceptTestForm;
