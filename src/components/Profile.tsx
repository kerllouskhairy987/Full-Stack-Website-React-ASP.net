import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import CustomHook from "@/hooks/CustomHook";
import { tokenFromLocalStorage, userIdFromLocalStorage } from "@/global";
import { Link } from "react-router";

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
                Authorization: `Bearer ${tokenFromLocalStorage}`,
            }
        }
    })
    // for fetch the nameUser of user
    const { isLoading: isLoadingUserName, data: nameUser } = CustomHook({
        queryKey: ["userName"], url: `Applicants/GetApplicantByUserId/${userIdFromLocalStorage}`, config: {
            headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
            }
        }
    })
    const applicantId = nameUser?.value?.applicantId

    // get image of user(imageUrl)
    const { isLoading: isLoadingImageUrl, data: dataImageUrl } = CustomHook({
        queryKey: ["userImageUrl"], url: `Applicants/GetUserProfile/${applicantId}`, config: {
            headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`
            }
        }
    })
    const prevImageUrl = dataImageUrl?.value?.imageUrl;

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
                <img className="w-8 h-8 rounded-full cursor-pointer" src={prevImageUrl && !isLoadingImageUrl ? prevImageUrl : "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"} alt="user photo" />
            </button>

            {isOpenProfile && <div id="dropdownAvatar" className="z-[10000] absolute left-1/2 -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <h2 className="line-clamp-1">{isLoadingUserName ? "Loading..." : nameUser?.value.fullName}</h2>
                    <p className="font-medium truncate line-clamp-1">{isLoadingEmail ? "Loading..." : emailUser?.data.email}</p>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link to={"/user"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsOpenProfile(false)}>Dashboard</Link>
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