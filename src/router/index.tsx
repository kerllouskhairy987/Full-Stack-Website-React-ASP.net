import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../errors/ErrorHandler";
import RootLayout from "../layout/RootLayout";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Services from "../pages/Services";
import AdminLayout from "../layout/AdminLayout";
import UsersPage from "../pages/admin/UsersPage";
import ServecesPage from "../pages/admin/ServecesPage";

const isAuthenticated = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<Services />} />
        <Route path="services" element={<Services />} />

        <Route
          path="contact"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath={`/login`}>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isAuthenticated} redirectPath={`/`}>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectPath={`/login`}
            >
              <Register />
            </ProtectedRoute>
          }
        />

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route
        path="/admin"
        element={<AdminLayout />}
        errorElement={<ErrorHandler />}
      >
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectPath={`/login`}
            >
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="services"
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectPath={`/login`}
            >
              <ServecesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
