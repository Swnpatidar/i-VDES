import React, { useEffect, useRef, useState } from "react";
import {
  DOWNLOAD_ICONSMALL, LOACK_ICON, LOGO_ICON, LOGOUT_ICONSMALL, LOGOUT_IMG, NOTIFICATION_ICON, PAYMENT_ICON, PROFILE_ICONSMALL, PROFILE_IMG, SMALL_LOGO, STARICON,
} from "../../utils/aap-image-constant";
import LanguageChange from "./laungaugechange";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { decryptAEStoJSON, encryptJSONtoAES, encryptStringtoAES, toastEmitter } from "../../utils/utilities";
import { clearAccessTokenReducer } from "../../hooks/redux/slice/access-token";
import { clearLoggedUserReducer, setLoggedUserReducer } from "../../hooks/redux/slice/logged-user";
import { useDispatch, useSelector } from "react-redux";
import { getCLinicById } from "../../hooks/services/api-services";
import { API_RESPONSE } from "../../utils/app-constants";
import { API_URL } from "../../utils/url-constants";
import Modal from "./Model";
import { setPermissionReducer } from "../../hooks/redux/slice/permission";
const Topbar = ({ setSidebarShow, sidebarShow }) => {
  const addbuttonClick = useRef()
  const { t, i18n } = useTranslation();
  const [isUserData, setIsUserData] = useState(false)
  const { value } = useSelector((state) => state?.loggedUser);
  const userData = decryptAEStoJSON(value)
  localStorage.setItem("languageChange", encryptStringtoAES(i18n.language));
  const dispatch = useDispatch();
  console.log("userData>>>", userData?.adminResponsePayload?.id)
  console.log("userData>>>", userData?.loginClinicType)
  const logoutSession = (e) => {
    e.preventDefault();
    addbuttonClick.current.click();
  };
  const handleSureLogout = () => {
    // e.preventDefault();
    dispatch(clearAccessTokenReducer());
    dispatch(clearLoggedUserReducer());
    setIsUserData(true)
    addbuttonClick.current.click();
  }
  useEffect(() => {
    if (userData?.status === 0) {
      dispatch(clearAccessTokenReducer());
      dispatch(clearLoggedUserReducer());
      setIsUserData(true)
      // toastEmitter("error", "Clinic is blocked. please contact to admin");
    }
  }, [userData?.status]);

  const getClinicById = async () => {
    try {
      const response = await getCLinicById(userData?.id, userData?.loginClinicType ? 0 : userData?.adminResponsePayload?.id);
      if (response.data?.status !== 200) {
        toastEmitter("error", response.data.message);
      } else {

        dispatch(
          setLoggedUserReducer(encryptJSONtoAES(response?.data?.data))
        );
        dispatch(
          setPermissionReducer(
            encryptJSONtoAES(
              response?.data?.data?.adminResponsePayload?.roleResponsePayload
                ?.roleModuleMappingResponseList
            )
          )
        );
      }
      return;
    } catch (err) {
      toastEmitter("error", API_RESPONSE.MESSAGE_503);
      return;
    }
  };
  useEffect(() => {
    if (!isUserData && userData?.id) {
      getClinicById();
    }
  }, [userData?.id, isUserData]);

  const fileDownload = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };
  return (
    <>    <div className="row position-sticky top-0 bg-off-white z-2 border-bottom m-0 align-items-center py-3 justify-content-between flex-wrap">
      <div className="col-6 col-sm-5 col-md-3 p-0">
        <div className="d-flex gap-1 justify-content-sm-centerjustify-content-md-start align-items-center">
          <Link to={ROUTES.INDEX}>
            <img src={LOGO_ICON} alt="" className="logoimg d-none d-sm-block" />
            <img
              src={SMALL_LOGO}
              className=" d-block d-sm-none smalllogo"
              alt="Logo Small"
            />
          </Link>
          {
            <i
              className="bi bi-list fs-2   d-md-none"
              onClick={() => setSidebarShow((prev) => !prev)}
            ></i>
          }
        </div>
      </div>
      <div className="col-4 col-md-9  col-lg-8 col-xl-7 col-xxl-6 p-0">
        <div
          className={`d-flex  align-items-center   m-0 justify-content-end gap-1 gap-sm-3`}
        >
          <div className="    ">
            <LanguageChange bgColour="bg-off-white" />
          </div>
          <div className="dropdown notification_content">
            <div className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
              <div className="text-center">
                <img src={NOTIFICATION_ICON} alt="NOTIFICATION_ICON" />
              </div>
            </div>
            <ul className="dropdown-menu rounded10">
              <li><div className="dropdown-item p-2" ><h3 className="fs-14 fw-600 mb-2">{t("Today")}</h3>
                <li><div className="dropdown-item border rounded10 d-flex justify-content-start align-items-center  px-1" >
                  <div className="notificationicon rounded10 me-2 ">
                    <img src={PAYMENT_ICON} alt="icon" />
                  </div>
                  <div>
                    <p className="mb-0 fs-14 fw-600">{t("Payment Successful")}</p>
                    <p className="mb-0 fs-12">{t("Appointment Booked for 15 April 2025")}</p>
                  </div>
                </div></li>
              </div></li>
            </ul>
          </div>

          <div className="dropdown  ">
            {" "}
            <button
              className="w-100  bg-sky-normal   ms-md-0 dropdown-toggle px-md-3 px-2 d-flex align-items-center justify-content-md-between justify-content-end   p-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={userData?.profile ? `${API_URL?.ServerURL}${userData?.profile}` : PROFILE_IMG}
                alt="PROFILE_PICTURE"
                width={26}
                height={26}
              />
              <span
                className={`text-dark fs-14 m-0 d-none d-xl-block fw-medium  ms-0 ${i18n.language === "ar" ? "me-lg-1" : "ms-lg-1"
                  }`}
              >
                {userData?.loginClinicType ? userData && userData?.clinicName : userData?.adminResponsePayload?.userName}
              </span>
            </button>{" "}
            <ul className="dropdown-menu p-0">
              {" "}
              <Link to={ROUTES.MYPROFILE}><li>
                <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2 " >
                  <img src={PROFILE_ICONSMALL} alt="plusicon" />
                  {/* <span className="">{t("Profile")}</span> */}
                  <span className="">{t("Profile")}</span>
                </div>

              </li>{" "}</Link>
              <Link to={ROUTES.CHANGEPASSWORD}><li>
                <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2 " >
                  <img src={LOACK_ICON} alt="plusicon" />
                  <span className="">{t("Change Password")}</span>
                </div>

              </li>{" "}</Link>

              {userData?.isVerified === 5 || userData?.isVerified === 1 && userData?.loginClinicType &&
                <li onClick={() => fileDownload(`${API_URL?.ServerURL}${userData?.contract}`)} className="cursor-pointer">
                  <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2 " >
                    <img src={DOWNLOAD_ICONSMALL} alt="plusicon" />
                    <span className="">{t("Download Contract")}</span>
                  </div>
                </li>}

              <li>
                {userData?.isVerified === 1 && userData?.loginClinicType &&
                  <Link to={ROUTES.RATING}><li>
                    <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2 " >
                      <img src={STARICON} alt="plusicon" />
                      <span className="">{t("Rating")}</span>
                    </div>

                  </li>{" "}</Link>
                }
                <hr className="dropdown-divider m-0" /></li>
              <li>
                <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2 " onClick={(e) => logoutSession(e)}>
                  <img src={LOGOUT_ICONSMALL} alt="icon" />
                  <span>{t("Logout")}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
      <Modal heading="Do You Want to Logout ?" modalClick={addbuttonClick} modalId="logoutModal"
        iconsrc={LOGOUT_IMG} buttonLable="Logout" cancelLable="Cancel" onOkClick={handleSureLogout} logoutimg="logoutimg" />
    </>

  );
};

export default Topbar;
