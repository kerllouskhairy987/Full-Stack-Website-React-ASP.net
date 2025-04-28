// import Button from "../../ui/Button";

import { useGetAllUsersQuery } from "@/app/api/ApiUsers/ApiUserSlice";
import { Button } from "@/components/ui/Button";
interface User {
  id: number;
  email: string;
  isActive: boolean;
  phoneNumber: string;
  userName: string;
}

const UserTable = () => {
  const { data } = useGetAllUsersQuery({});
  console.log("data", data);

  return (
    <main>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user: User) => (
              <tr key={user.id} className="border-b ">
                <td className="px-4 py-2">{user.userName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.isActive === true
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive === true ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2 flex gap-2">
                  <Button type="button" variant={"default"}>
                    Edit
                  </Button>
                  <Button type="button" variant={"outline"}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UserTable;
