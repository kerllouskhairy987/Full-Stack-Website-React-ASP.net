import Button from "@/components/Button";
import { NavLink, useLocation } from "react-router-dom";

const UserTabs = () => {
    const { pathname } = useLocation();

    const tabs = [
        {
            id: crypto.randomUUID(),
            title: "User Profile",
            href: "/user",
            exact: true,
        },
        {
            id: crypto.randomUUID(),
            title: "Applications",
            href: "/user/applications",
            exact: false,
        },
        {
            id: crypto.randomUUID(),
            title: "Appointments",
            href: "/user/appointments",
            exact: false,
        },
        {
            id: crypto.randomUUID(),
            title: "Your License",
            href: "/user/userLicense",
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
            <nav className="mt-20">
                <ul className="flex items-center flex-wrap gap-4 justify-center">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <NavLink
                                to={tab.href}
                                className={({ isActive }) =>
                                    `cursor-pointer ${isActive ? "active-class" : "inactive-class"
                                    }`
                                }
                                end
                            >
                                <Button
                                    className="cursor-pointer dark:bg-[#031F47] dark:text-white dark:border-white"
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

export default UserTabs;
