import React from "react";
import { SITE_NAME } from "../../utils/app-constants";
import { Link, Outlet, useLocation } from "react-router";
import {
  LOGO_ICON,
  LOGO_SECOND,
  LOGIN_BG,
  REGISTER_BG,
} from "../../utils/aap-image-constant";
import { ROUTES } from "../../hooks/routes/routes-constant";
function AuthLayout() {
  const location = useLocation();
  return (
    <div className="container ">
      <div
        className="row align-items-center my-auto authlayout"
        style={{ height: "100vh" }}
      >
        <div
          className={`col-12   ${
            location?.pathname === "/register" ? "col-md-6" : "col-md-5"
          }`}
        >
          {/* <div className="    ">
            <LanguageChange
              bgColour="bg-white" />
          </div> */}
          <div className="">
            <div className="d-flex justify-content-between align-items-center ">
              <div>
                {" "}
                <Link to={ROUTES.INDEX}>
                  {/* <img src={LOGO_ICON} alt={SITE_NAME} /> */}
                </Link>
              </div>
              <div>
                {/* <img
                  src={LOGO_SECOND}
                  alt="second_icon"
                  style={{ width: "130px", height: "85px" }}
                /> */}
              </div>
            </div>
            <div className="auth-form">
              <Outlet />
            </div>
          </div>
        </div>
        <div
          className={`col-12  d-none d-sm-block mt-4 mt-md-0 ${
            location?.pathname === "/register" ? "col-md-6" : "col-md-7"
          }`}
        >
          <div className="login-bg-img-div text-end text-center">
            {/* <img
              src={location?.pathname === "/register" ? REGISTER_BG : LOGIN_BG}
              alt="dr_background_img"
              className="login-bg-img"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
