import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
// import Button from "../ui/Button";

const AdminTabs = () => {
  const { pathname } = useLocation();

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: "Users",
      href: "/admin",
      exact: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Applications",
      href: "/admin/applications",
      exact: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Applicant",
      href: "/admin/applicant",
      exact: false,
    },
  ];

  const isActiveTab = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div>
      <nav className="mt-20 pb-10">
        <ul className="flex items-center flex-wrap gap-4 justify-center">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <NavLink
                to={tab.href}
                className={({ isActive }) =>
                  `cursor-pointer ${
                    isActive ? "active-class" : "inactive-class"
                  }`
                }
                end
              >
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant={
                    isActiveTab(tab.href, tab.exact) ? "default" : "outline"
                  }
                >
                  {tab.title}
                </Button>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminTabs;
