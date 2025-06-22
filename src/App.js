import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/pageNotFound";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import NewPassword from "./pages/auth/new-password";
import PublicRoutes from "./hooks/routes/public-routes";
import { ROUTES } from "./hooks/routes/routes-constant";
import "./App.css";
import "./Responsive.css";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard-page/dashboard";
import FirstLayout from "./components/layouts/first-layout";
import DashboardDetails from "./pages/Dashboard-page/dashboard-details";

import "./App.css";
import "./Responsive.css";
import ConfirmSignUp from "./pages/auth/confirmsingup";
import Register from "./pages/auth/register";
import ProtectedRoutes from "./hooks/routes/protected-routes";

function App() {

  return (
    <>
      {/* ******************************Public Route******************************* */}
      <Routes>
        {/* landing page */}
        <Route
          path={ROUTES?.INDEX}
          element={<PublicRoutes component={<LandingPage />} />}
        />
        {/* login page */}
        <Route
          path={ROUTES?.LOGIN}
          element={<PublicRoutes component={<Login />} />}
        />
        {/* SignUp page */}
        <Route
          path={ROUTES?.REGISTER}
          element={<PublicRoutes component={<Register />} />}
        />
        {/* Confirm Signup page */}
        <Route
          path={ROUTES?.CONFIRM_SINGUP}
          element={<PublicRoutes component={<ConfirmSignUp />} />}
        />
        {/* Forget password page */}
        <Route
          path={ROUTES?.FORGOT_PASSWORD}
          element={<PublicRoutes component={<ForgotPassword />} />}
        />
        {/* Change Password */}
        <Route
          path={ROUTES?.NEW_PASSWORD}
          element={<PublicRoutes component={<NewPassword />} />}
        />

        {/* ****************************Protected Route********************************* */}
        {/*Start Layout for protected route is FirstLayout*/}
        <Route element={<FirstLayout />}>
          <Route
            path={ROUTES?.DASHBOARD}
            element={
              <ProtectedRoutes
                component={<Dashboard />}
              />
            }
          />
          <Route
            path={ROUTES?.DASHBOARDDETAILS}
            element={
              <ProtectedRoutes
                component={<DashboardDetails />}
              />
            }
          />
        </Route>
        {/* End Layout for protected route is FirstLayout*/}

        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Notification toaster */}
      <ToastContainer
        hideProgressBar={false}
        closeOnClick={false}
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
