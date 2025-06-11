import React from "react";
import { SITE_NAME } from "../../utils/app-constants";
import { Link, Outlet, useLocation } from "react-router";
import { ROUTES } from "../../hooks/routes/routes-constant";

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <div
        className="row align-items-center authlayout"
        style={{ height: "100vh" }}
      >
        {/* LEFT SIDE: Welcome Content */}
        <div
          className={`col-12 d-none d-sm-flex ${
            location?.pathname === "/register" ? "col-md-6" : "col-md-6"
          } align-items-center justify-content-center`}
          style={{
            // backgroundColor: "#0d6efd",
            color: "white",
            textAlign: "center",
            height: "100%",
            padding: "2rem",
            borderRadius: "12px",
          }}
        >
          <div>
            <h1 className="fw-bold mb-3 text-white">Welcome Back!</h1>
            <p
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Login/Register Form */}
        <div
          className={`col-12 ${
            location?.pathname === "/register" ? "col-md-6" : "col-md-6"
          }`}
        >
          <div className="px-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to={ROUTES.INDEX}>
                {/* <img src={LOGO_ICON} alt={SITE_NAME} /> */}
              </Link>
              <div>{/* <img src={LOGO_SECOND} alt="logo" /> */}</div>
            </div>

            <div className="auth-form">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
