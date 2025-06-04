import { NavLink, useLocation } from "react-router-dom";
import {
  APPOINTMENT_ACTIVE,
  APPOINTMENT_NOT_ACTIVE,
  BANKIMAGE_ACTIVE_ACTIVE,
  BANKIMAGE_NOT_ACTIVE,
  LOGOUT_ICON,
  LOGOUT_IMG,
  MATCHINGMANAGEMENT_ACTIVE,
  MATCHINGMANAGEMENT_NOT_ACTIVE,
  PATIENT_ACTIVE,
  PATIENT_NOT_ACTIVE,
  PAYMENT_ACTIVE_,
  PAYMENT_NOT_ACTIVE,
  ROLE_MANAGEMENT_INACTIVE,
  ROLEMANAGEMENT_ACTIVE,
} from "../../utils/aap-image-constant";
import {
  AVAILABILITY_ACTIVE,
  AVAILABILITY_NOT_ACTIVE,
  DASHBOARD_ACTIVE,
  DASHBOARD_NOT_ACTIVE,
  DOCTOR_ACTIVE,
  DOCTOR_NOT_ACTIVE,
} from "../../utils/aap-image-constant";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { useTranslation } from "react-i18next";
import { clearAccessTokenReducer } from "../../hooks/redux/slice/access-token";
import { clearLoggedUserReducer } from "../../hooks/redux/slice/logged-user";
import { useDispatch, useSelector } from "react-redux";
import { decryptAEStoJSON, toastEmitter } from "../../utils/utilities";
import Modal from "./Model";
import { useEffect, useRef } from "react";

const Sidebar = ({ setSidebarShow, sidebarShow }) => {
  const { t, i18n } = useTranslation();
  const addbuttonClick = useRef();
  const location = useLocation();
  const dispatch = useDispatch();

  const { value } = useSelector((state) => state?.loggedUser);
  const permission = useSelector((state) => state?.permission?.value);
  const userData = decryptAEStoJSON(value);
  const modulePermission = decryptAEStoJSON(permission);
  console.log("modulePermission", modulePermission);

  const logoutSession = () => {
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
  const isDisabled =
    userData?.isVerified === 2 ||
    userData?.isVerified === 4 ||
    userData?.isVerified === 5 ||
    userData?.isVerified === 3;

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      route: ROUTES.DASHBOARD,
      src_not_active: DASHBOARD_NOT_ACTIVE,
      src_active: DASHBOARD_ACTIVE,
      moduleCode: "dashboard",
    },
    {
      id: 2,
      name: "Role Management",
      route: ROUTES.ROLE_MANAGEMENT,
      src_not_active: ROLE_MANAGEMENT_INACTIVE,
      src_active: ROLEMANAGEMENT_ACTIVE,
      moduleCode: "role-management",
    },
    {
      id: 3,
      name: "Patient Management",
      route: ROUTES.PATIENT,
      src_not_active: PATIENT_NOT_ACTIVE,
      src_active: PATIENT_ACTIVE,
      moduleCode: "patient-management",
    },
    {
      id: 4,
      name: "Doctor Management",
      route: ROUTES.DOCTOR,
      src_not_active: DOCTOR_NOT_ACTIVE,
      src_active: DOCTOR_ACTIVE,
      moduleCode: "doctor-management",
    },
    {
      id: 5,
      name: "Availability Management",
      route: ROUTES.AVAILABILITY,
      src_not_active: AVAILABILITY_NOT_ACTIVE,
      src_active: AVAILABILITY_ACTIVE,
      moduleCode: "availability-management",
    },
    {
      id: 6,
      name: "Appointment Management",
      route: ROUTES.APPOINTMENT,
      src_not_active: APPOINTMENT_NOT_ACTIVE,
      src_active: APPOINTMENT_ACTIVE,
      moduleCode: "appointment-management",
    },
    {
      id: 7,
      name: "Bank Management",
      route: ROUTES.MYBANKMANAGEMENT,
      src_not_active: BANKIMAGE_NOT_ACTIVE,
      src_active: BANKIMAGE_ACTIVE_ACTIVE,
      moduleCode: "bank-management",
    },
    {
      id: 8,
      name: "Matching Management",
      route: ROUTES.JOBPOTSLIST,
      src_not_active: MATCHINGMANAGEMENT_NOT_ACTIVE,
      src_active: MATCHINGMANAGEMENT_ACTIVE,
      moduleCode: "matching-management",
    },
    {
      id: 9,
      name: "Payment Management",
      route: ROUTES.PAYMENT,
      src_not_active: PAYMENT_NOT_ACTIVE,
      src_active: PAYMENT_ACTIVE_,
      moduleCode: "payment-management",
    },
  ];

  const allowedModuleCodes = modulePermission && modulePermission?.map((item) => item?.moduleCode);
  const filteredMenuItems = menuItems && menuItems?.filter((menuItem) =>
    allowedModuleCodes && allowedModuleCodes?.includes(menuItem?.moduleCode)
  );

  return (
    <div
      className={`sidebar col-auto p-0 py-5 overflow-visible ${sidebarShow ? "sidebar-show" : ""
        }`}
    >
      <i
        className={`bi p-3 text-white fs-1 bi-x d-inline d-md-none position-fixed top-0 ${i18n.language === "ar" ? "start-0" : "end-0"
          }`}
        onClick={() => setSidebarShow(false)}
      ></i>

      <div className="d-flex flex-column gap-3 overflow-auto h-100 my-5 justify-content-center">
        <div className="h-100">
          {/* <ul className="p-0">
            {menuItems &&
              menuItems?.map((sidebar) => {
                const isActive =
                  !isDisabled && location.pathname.includes(sidebar.route); // Check if active only when NOT disabled

                return (
                  <li
                    key={sidebar.id}
                    className={`position-relative pb-4 ps-1 pe-1 pe-lg-0 ${isDisabled ? "disabled-menu" : ""
                      }`}
                  >
                    <NavLink
                      to={sidebar.route} // Always keep the correct route
                      className={({ isActive: linkIsActive }) =>
                        `fs-6 sidebar-item text-decoration-none ${isDisabled
                          ? "disabled-menu"
                          : linkIsActive
                            ? "active"
                            : ""
                        }`
                      }
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault();
                        } else {
                          setSidebarShow(false);
                        }
                      }}
                    >
                      <div className="d-flex justify-content-center px-2">
                        <div className="sidebar-not-active-icon sidebar-active-icon w-auto d-inline-block">
                          <img
                            src={
                              isDisabled
                                ? sidebar.src_not_active
                                : isActive
                                  ? sidebar.src_active
                                  : sidebar.src_not_active
                            }
                            alt="sidebar_icon"
                          />
                        </div>
                      </div>
                      <p className="fs-12 text-center fw-500 lh-1 sidebar-not-active-text-color mt-1">
                        {t(sidebar.name)}
                      </p>
                    </NavLink>
                  </li>
                );
              })}
          </ul> */}
          <ul className="p-0">
            {filteredMenuItems.map((sidebar) => {
              const isActive = !isDisabled && location.pathname.includes(sidebar.route);

              return (
                <li
                  key={sidebar.id}
                  className={`position-relative pb-4 ps-1 pe-1 pe-lg-0 ${isDisabled ? "disabled-menu" : ""}`}
                >
                  <NavLink
                    to={sidebar.route}
                    className={({ isActive: linkIsActive }) =>
                      `fs-6 sidebar-item text-decoration-none ${isDisabled
                        ? "disabled-menu"
                        : linkIsActive
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={(e) => {
                      if (isDisabled) {
                        e.preventDefault();
                      } else {
                        setSidebarShow(false);
                      }
                    }}
                  >
                    <div className="d-flex justify-content-center px-2">
                      <div className="sidebar-not-active-icon sidebar-active-icon w-auto d-inline-block">
                        <img
                          src={
                            isDisabled
                              ? sidebar.src_not_active
                              : isActive
                                ? sidebar.src_active
                                : sidebar.src_not_active
                          }
                          alt="sidebar_icon"
                        />
                      </div>
                    </div>
                    <p className="fs-12 text-center fw-500 lh-1 sidebar-not-active-text-color mt-1">
                      {t(sidebar.name)}
                    </p>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="pt-3 pb-3 cursor-pointer" onClick={logoutSession}>
            <div
              className={`ms-2 me-2 text-center border-top-logout ${i18n.language === "ar" ? "me-xl-2" : "me-xl-0"
                }`}
            >
              <img src={LOGOUT_ICON} alt="LOGOUT-ICON" className="mt-3 mb-1" />
              <p className="sidebar-not-active-text-color fs-12 fw-500">
                {t("Logout")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        heading="Do You Want to Logout ?"
        modalClick={addbuttonClick}
        modalId="logoutModal"
        logoutimg="logoutimg"
        iconsrc={LOGOUT_IMG}
        buttonLable="Logout"
        cancelLable="Cancel"
        onOkClick={handleSureLogout}
      />
    </div>
  );
};

export default Sidebar;
