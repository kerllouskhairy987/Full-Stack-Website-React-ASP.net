import { useGetApplicationsQuery } from "@/app/api/ApiSlice/Applications";
import ApplicationsTable from "@/components/Tables/ApplicationsTable";

export default function ApplicationsPage() {
  const { data, isLoading } = useGetApplicationsQuery({});
  console.log("data", data);

  if (isLoading) {
    return <div className="text-center mt-8 text-lg font-semibold">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center mt-8 text-lg font-semibold">No applications found.</div>;
  }

  return (
    <div>
      <ApplicationsTable applications={data.value} />
    </div>
  );
}
