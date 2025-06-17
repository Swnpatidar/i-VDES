import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./components/layouts/auth-layout";
import PageNotFound from "./pages/pageNotFound";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import NewPassword from "./pages/auth/new-password";
import PublicRoutes from "./hooks/routes/public-routes";
import { ROUTES } from "./hooks/routes/routes-constant";
import "./App.css";
import "./Responsive.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { decryptAEStoJSON } from "./utils/utilities";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard-page/dashboard";
import FirstLayout from "./components/layouts/first-layout";
import { useState } from "react";
import DashboardDetails from "./pages/Dashboard-page/dashboard-details";
import Register from "./pages/auth/register";


function App() {
  const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <>
      <Routes>
        {/* auth layout */}

        <Route
          path={ROUTES?.INDEX}
          element={<PublicRoutes component={<LandingPage />} />}
        />

        <Route element={<FirstLayout sidebarShow={sidebarShow}
          setSidebarShow={setSidebarShow} />}>

          <Route
            path={ROUTES?.DASHBOARD}
            element={
              <PublicRoutes
                component={<Dashboard setSidebarShow={setSidebarShow} />}
              />
            }
          />
          <Route
            path={ROUTES?.DASHBOARDDETAILS}
            element={
              <PublicRoutes
                component={<DashboardDetails setSidebarShow={setSidebarShow} />}
              />
            }
          />
        </Route>
        {/* <Route element={<AuthLayout />}> */}
        <Route
          path={ROUTES?.LOGIN}
          element={<PublicRoutes component={<Login />} />}
        />
        <Route
          path={ROUTES?.REGISTER}
          element={<PublicRoutes component={<Register />} />}
        />
        <Route
          path={ROUTES?.FORGOT_PASSWORD}
          element={<PublicRoutes component={<ForgotPassword />} />}
        />
        <Route
          path={ROUTES?.NEW_PASSWORD}
          element={<PublicRoutes component={<NewPassword />} />}
        />

        {/* </Route> */}
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
        autoClose={4000} />
    </>
  );
}
export default App;
