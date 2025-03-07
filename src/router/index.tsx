import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import PageNotFound from "../components/feedback/PageNotFound";
import Register from "../pages/auth/Register";

const isAuthenticated = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="login"
        element={
          <ProtectedRoute isAllowed={!isAuthenticated} redirectPath={`/login`}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute
            isAllowed={!isAuthenticated}
            redirectPath={`/register`}
          >
            <Register />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
