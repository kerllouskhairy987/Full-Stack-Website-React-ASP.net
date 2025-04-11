// import Button from "../../ui/Button";

import { Button } from "@/components/ui/Button";

const UserTable = () => {
  const users = [
    {
      id: 1,
      name: "Ahmed",
      email: "ahmed@example.com",
      status: "Admin",
      joinDate: "01/01/2023",
      phone: "1234567890",
      birthDate: "01/01/1990",
      nationalId: "12345678901234",
    },
    {
      id: 2,
      name: "Sarah",
      email: "sara@example.com",
      status: "User",
      joinDate: "05/02/2023",
      phone: "0987654321",
      birthDate: "05/05/1995",
      nationalId: "98765432109876",
    },
    {
      id: 3,
      name: "Mohamed",
      email: "mohamed@example.com",
      status: "Admin",
      joinDate: "15/03/2023",
      phone: "1122334455",
      birthDate: "10/10/1985",
      nationalId: "11223344556677",
    },
  ];

  return (
    <main>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Birth Date</th>
              <th className="px-4 py-2 text-left">National ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Join Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.birthDate}</td>
                <td className="px-4 py-2">{user.nationalId}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">{user.joinDate}</td>
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
