import { useGetDriversQuery } from "@/app/api/ApiSlice/DriversApiSlice";
interface Driver {
  applicantId: string;
  fullName: string;
  nationalNo: string;
  birthDate: string;
  gender: number;
  address: string;
  countryId: string;
}
export default function DriversPage() {
  const { data, isLoading, isError } = useGetDriversQuery({});

  if (isLoading) return <p>جارٍ التحميل...</p>;
  if (isError || !data?.isSuccess) return <p>حدث خطأ أثناء تحميل البيانات.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">السائقين</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">الاسم بالكامل</th>
              <th className="px-4 py-2 text-left">الرقم القومي</th>
              <th className="px-4 py-2 text-left">تاريخ الميلاد</th>
              <th className="px-4 py-2 text-left">النوع</th>
              <th className="px-4 py-2 text-left">العنوان</th>
              <th className="px-4 py-2 text-left">الدولة</th>
            </tr>
          </thead>
          <tbody>
            {data.value.map((driver: Driver, index: number) => (
              <tr key={driver.applicantId} >
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{driver.fullName}</td>
                <td className="p-2 border">{driver.nationalNo}</td>
                <td className="p-2 border">
                  {new Date(driver.birthDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {driver.gender === 0 ? "ذكر" : "أنثى"}
                </td>
                <td className="p-2 border">{driver.address}</td>
                <td className="p-2 border">{driver.countryId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
