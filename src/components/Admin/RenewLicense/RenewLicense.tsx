import { useGetLicenseQuery } from "@/app/api/ApiSlice/LicenseApiSlice";
import RenewLicenseTable from "@/components/Tables/RenewLicenseTable";

export default function RenewLicense() {
  const { data } = useGetLicenseQuery({});
  console.log(data);
  return (
    <div>
      <RenewLicenseTable applications={data?.value || []} />
    </div>
  );
}
