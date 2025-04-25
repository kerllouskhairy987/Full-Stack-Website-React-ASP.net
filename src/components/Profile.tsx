import { useEffect, useRef, useState } from "react";
import ImgProfile from "../assets/bg-profile.jpg";
import toast from "react-hot-toast";
import CustomHook from "@/hooks/CustomHook";
import { userIdFromLocalStorage } from "@/global";

const Profile = () => {
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ** Handles
    const handleProfile = () => {
        setIsOpenProfile(prev => !prev);
    };

    const handleLogOut = () => {
        localStorage.clear();
        toast.success('Successfully Logout!',
            {
                duration: 1500,
                position: 'bottom-center',
                style: { backgroundColor: "green", color: "white", width: "fit-content" },
            }
        );
        window.setTimeout(() => {
            window.location.replace("/");
        }, 2000)
    }

    // for fetch the emailUser of user
    const { isLoading: isLoadingEmail, data: emailUser } = CustomHook({
        queryKey: ["user"], url: `Users/GetUser/${userIdFromLocalStorage}`, config: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
    })
    // for fetch the nameUser of user
    const { isLoading: isLoadingUserName, data: nameUser } = CustomHook({
        queryKey: ["userName"], url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`, config: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
    })

    // ** Actions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node | null)) {
                setIsOpenProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button"
                onClick={handleProfile}
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full cursor-pointer" src={ImgProfile} alt="user photo" />
            </button>

            {isOpenProfile && <div id="dropdownAvatar" className="z-[10000] absolute left-1/2 -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <h2 className="line-clamp-1">{isLoadingUserName ? "Loading..." : nameUser?.value.fullName}</h2>
                    <p className="font-medium truncate line-clamp-1">{isLoadingEmail ? "Loading..." : emailUser?.data.email}</p>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                </ul>
                <div className="py-2">
                    <span onClick={handleLogOut} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
                </div>
            </div>}
        </div>
    )
}

export default Profile;