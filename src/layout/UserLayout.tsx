
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import UserTabs from '@/pages/user/UserTabs'
import { Outlet } from 'react-router'

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <UserTabs />
            <Outlet />
            <Footer />
        </>
    )
}

export default UserLayout