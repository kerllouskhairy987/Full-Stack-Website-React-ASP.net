import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout