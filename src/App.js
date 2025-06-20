import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./components/layouts/auth-layout";
import PageNotFound from "./pages/pageNotFound";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import NewPassword from "./pages/auth/new-password";
import Register from "./pages/auth/register";
import ConfirmSignUp from "./pages/auth/confirmsingup";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard-page/dashboard";
import DashboardDetails from "./pages/Dashboard-page/dashboard-details";
import FirstLayout from "./components/layouts/first-layout";

import { ROUTES } from "./hooks/routes/routes-constant";
import PublicRoutes from "./hooks/routes/public-routes";
import useToast from "./hooks/Custom-hooks/useToast";
import useIdleLogout from "./utils/utilities";
import { signOut } from "@aws-amplify/auth";

import "./App.css";
import "./Responsive.css";

function App() {
  const navigate = useNavigate();
  const toast = useToast();
  const [sidebarShow, setSidebarShow] = useState(false);

  // Auto logout on idle (10 minutes)
  useIdleLogout(async () => {
    toast.info("You have been logged out due to session out.");
    await signOut();
    navigate(ROUTES?.LOGIN);
  }, 10 * 60 * 1000); // 10 minutes

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.INDEX} element={<PublicRoutes component={LandingPage} />} />
        <Route path={ROUTES.LOGIN} element={<PublicRoutes component={Login} />} />
        <Route path={ROUTES.REGISTER} element={<PublicRoutes component={Register} />} />
        <Route path={ROUTES.CONFIRM_SINGUP} element={<PublicRoutes component={ConfirmSignUp} />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicRoutes component={ForgotPassword} />} />
        <Route path={ROUTES.NEW_PASSWORD} element={<PublicRoutes component={NewPassword} />} />

        {/* Dashboard Routes (wrapped in FirstLayout) */}
        <Route
          element={<FirstLayout sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />}
        >
          <Route
            path={ROUTES.DASHBOARD}
            element={<PublicRoutes component={() => <Dashboard setSidebarShow={setSidebarShow} />} />}
          />
          <Route
            path={ROUTES.DASHBOARDDETAILS}
            element={<PublicRoutes component={() => <DashboardDetails setSidebarShow={setSidebarShow} />} />}
          />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable={false}
        newestOnTop
        theme="colored"
        position="top-right"
        autoClose={4000}
      />
    </>
  );
}

export default App;
