
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../errors/ErrorHandler";
import RootLayout from "../pages/RootLayout";
import Services from "../pages/auth/Services";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const isAuthenticated = true;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route index element={<Services />} />
                <Route path="services" element={<Services />} />

                <Route path="contact" element={
                    <ProtectedRoute isAllowed={isAuthenticated} redirectPath={`/login`}>
                        <Contact />
                    </ProtectedRoute>
                } />

                <Route path="login" element={
                    <ProtectedRoute isAllowed={isAuthenticated} redirectPath={`/register`}>
                        <Login />
                    </ProtectedRoute>
                }
                />

                <Route path="register" element={
                    <ProtectedRoute isAllowed={!isAuthenticated} redirectPath={`/login`} >
                        <Register />
                    </ProtectedRoute>
                }
                />

                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </>
    )
);

export default router;
