import { Outlet } from "react-router"
import Footer from "../components/Footer"

const RootLayout = () => {
    return (
        <>
            <h1>Root Layout</h1>
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout