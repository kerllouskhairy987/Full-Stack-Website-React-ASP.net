import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../errors/ErrorHandler";


const storageKey = "loggedInUser"
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
console.log("user data from local storage ", userData);


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<h3>home page</h3>} errorElement={<ErrorHandler />} >

            </Route>

            {/* Page Not Found */}
            <Route path="*" element={<PageNotFound />} />
        </>
    )
);

export default router;