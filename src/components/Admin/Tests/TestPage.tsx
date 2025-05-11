import { useGetTestsQuery } from "@/app/api/ApiSlice/TestsApiSlice";
import TestsTable from "@/components/Tables/TestsTable";


export default function TestPage() {
  const { data } = useGetTestsQuery({});

  console.log(data);
  return (
    <div>
      <TestsTable data={data?.value || []} />
    </div>
  );
}
