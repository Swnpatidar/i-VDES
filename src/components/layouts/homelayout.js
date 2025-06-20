import React, { useEffect, useRef } from "react";
import {
  ARROW_ICON,
  FACEBOOKLOGO,
  FOOTERVECTOR,
  INSTAGARMLOGO,
  LOGO_ICON,
  LOGOUT_ICONSMALL,
  LOGOUT_IMG,
  PROFILE_ICONSMALL,
  PROFILE_IMG,
  SMALL_LOGO,
  TWITTERLOGO,
} from "../../utils/app-image-constant";
import { decryptAEStoJSON } from "../../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessTokenReducer } from "../../hooks/redux/slice/access-token";
import { clearLoggedUserReducer } from "../../hooks/redux/slice/logged-user";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import LanguageChange from "../common/laungaugechange";
import { API_URL } from "../../utils/url-constants";
import Button from "../common/button";
import Modal from "../common/Model";

const HomeLayout = () => {
  const addbuttonClick = useRef();
  const { t, i18n } = useTranslation();
  const { value } = useSelector((state) => state?.loggedUser);
  const userData = decryptAEStoJSON(value);
  const dispatch = useDispatch();
  const logoutSession = (e) => {
    addbuttonClick.current.click();
  };
  const handleSureLogout = () => {
    dispatch(clearAccessTokenReducer());
    dispatch(clearLoggedUserReducer());
    addbuttonClick.current.click();
  };
  useEffect(() => {
    if (userData?.status === 0) {
      dispatch(clearAccessTokenReducer());
      dispatch(clearLoggedUserReducer());
      // toastEmitter("error", "Clinic is blocked. please contact to admin");
    }
  }, [userData?.status]);
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <div className="Navbar_content">
          <div className="Navbar_content">
            <div className="container  mb-0 pt-lg-4 pt-md-1 pt-sm-2 ">
              <div className="d-flex justify-content-between align-items-center">
                <div className="navbar-brand mb-sm-0 ">
                  <a href="/b&s">
                    <img
                      src={LOGO_ICON}
                      className="navbarlogo d-none d-sm-block"
                      alt="Logo"
                    />
                    <img
                      src={SMALL_LOGO}
                      className=" d-block d-sm-none"
                      alt="Logo Small"
                    />
                  </a>
                </div>
                <div className="d-flex align-items-center ">
                  <div
                    className={` ${i18n.language === "ar" ? "ms-2" : "me-3"}`}
                  >
                    <LanguageChange bgColour="bg-white" />
                  </div>
                  {userData && userData?.email ? (
                    <>
                      <div className="dropdown homenavbar_content ">
                        {" "}
                        <button
                          className="w-100 bg-sky-normal  ms-md-0 dropdown-toggle px-3  py-2 d-flex align-items-center justify-content-md-between justify-content-end"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src={
                              userData?.profile
                                ? `${API_URL?.ServerURL}${userData?.profile}`
                                : PROFILE_IMG
                            }
                            alt="PROFILE_PICTURE"
                            width={26}
                            height={26}
                          />
                          <span
                            className={`text-dark fs-14 m-0 d-none d-xl-block fw-medium  ms-0 ${
                              i18n.language === "ar" ? "me-lg-1" : "ms-lg-1"
                            }`}
                          >
                            {userData?.loginClinicType
                              ? userData && userData?.clinicName
                              : userData?.adminResponsePayload?.userName}
                          </span>
                        </button>{" "}
                        <ul className="dropdown-menu p-0">
                          {" "}
                          <Link to={ROUTES?.DASHBOARD}>
                            <li>
                              <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2 ">
                                <img src={PROFILE_ICONSMALL} alt="plusicon" />
                                <span className="">{t("Dashboard")}</span>
                              </div>
                            </li>{" "}
                          </Link>
                          <li>
                            <div
                              className="dropdown-item cursor-pointer d-flex align-items-center gap-2 "
                              onClick={(e) => logoutSession(e)}
                            >
                              <img src={LOGOUT_ICONSMALL} alt="icon" />
                              <span>{t("Logout")}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link to={ROUTES?.LOGIN}>
                      <Button
                        className="rounded10 py-2 px-4 fs-16 fw-600 border-0 text-white bg-blue"
                        label="Login"
                        type="submit"
                        icon={ARROW_ICON}
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="Footer_Content bg-dark text-white">
          <div className="Footer_Content">
            <footer className="bg-dark text-center text-white py-4 footer-section">
              <div className="container py-3 my-md-4 my-2">
                <div className="navbar-brand">
                  <img src={FOOTERVECTOR} alt="Footer Logo" />
                </div>

                {/* Description */}
                <div className=" d-flex justify-content-center align-items-center ">
                  <p className="mt-3 fs-14 footerparaColor w-50">
                    {t(
                      "Medicine simplifies healthcare with an easy-to-use platform for booking appointments, telehealth services, and managing patient records."
                    )}
                  </p>
                </div>

                {/* Social Media Icons with Circular Background */}
                <div className="d-flex justify-content-center mt-3">
                  <div className="footericondiv text-white mx-2 d-flex align-items-center justify-content-center  ">
                    <img
                      src={FACEBOOKLOGO}
                      alt="Facebook "
                      className="footericon"
                    />
                  </div>
                  <div className="footericondiv text-white mx-2 d-flex align-items-center justify-content-center  ">
                    <img
                      src={INSTAGARMLOGO}
                      alt="Instagram"
                      className="footericon"
                    />
                  </div>
                  <div className="footericondiv text-white mx-2 d-flex align-items-center justify-content-center ">
                    <img
                      src={TWITTERLOGO}
                      alt="Twitter"
                      className="footericon"
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center mt-3">
                  <div className=" d-flex align-items-center justify-content-center  ">
                    <Link to={ROUTES.PRIVACYPOLICY} className="footerparaColor">
                      <p>{t("Privacy And Policy")} ||</p>
                    </Link>
                  </div>
                  <div className="mx-1 d-flex align-items-center justify-content-center  ">
                    <Link
                      to={ROUTES.TERMSANDCONDITION}
                      className="footerparaColor"
                    >
                      <p>{t("Terms And Condition")} ||</p>
                    </Link>
                  </div>
                  <div className="mx-1 d-flex align-items-center justify-content-center ">
                    <Link
                      to={ROUTES.CANCELATIONPOLICY}
                      className="footerparaColor"
                    >
                      <p>{t("Cancellation Policy")} ||</p>
                    </Link>
                  </div>
                  <div className=" mx-1 d-flex align-items-center justify-content-center ">
                    <Link
                      to={ROUTES.RESCHEDULINGPOLICY}
                      className="footerparaColor"
                    >
                      <p>{t("Rescheduling Policy")}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </footer>
      </div>
      <Modal
        heading="Do You Want to Logout ?"
        modalClick={addbuttonClick}
        modalId="logoutModal"
        iconsrc={LOGOUT_IMG}
        buttonLable="Logout"
        cancelLable="Cancel"
        onOkClick={handleSureLogout}
        logoutimg="logoutimg"
      />
    </>
  );
};

export default HomeLayout;
