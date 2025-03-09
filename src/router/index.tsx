
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../errors/ErrorHandler";
import RootLayout from "../pages/RootLayout";

const isAuthenticated = false;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route path="login" element={
                    <ProtectedRoute isAllowed={!isAuthenticated} redirectPath={`/login`}>
                        <Login />
                    </ProtectedRoute>
                }
                />
                <Route path="register" element={
                        <ProtectedRoute isAllowed={!isAuthenticated} redirectPath={`/register`} >
                            <Register />
                        </ProtectedRoute>
                    }
                />
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </>
    )
);

export default router;
