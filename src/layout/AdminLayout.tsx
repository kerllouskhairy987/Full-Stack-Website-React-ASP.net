import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AdminTabs from "../components/Admin/AdminTabs"

const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <AdminTabs />
            <Outlet />
            <Footer />
        </>
    )
}

export default AdminLayout