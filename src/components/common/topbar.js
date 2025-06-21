import {
  LOGOUT_CONFIRM_PNG,
  LOGOUT_ICONSMALL,
  LOGOUT_IMG,
  PROFILE_ICONSMALL,
  SIDEBAR_SETTING_ACTIVE,
  TOPBAR_PROFILE,
} from "../../utils/app-image-constant";

import { Link } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import Modal from "./Model";
import MyModal from "./Modal/myModal";
import withModalWrapper from "./HOC/withModalWrapper";
import { useState } from "react";
const Topbar = ({ setSidebarShow, sidebarShow }) => {
  const LogoutModal = withModalWrapper(MyModal) //for logout modal
  const [isOpen, setIsOpen] = useState(false); //for logout Modal
  console.log("isOpen==>", isOpen)
  return (
    <>
      {" "}
      <div className="row position-sticky top-0 bg-off-dark z-index  border-bottom-line m-0 align-items-center py-3 justify-content-between flex-wrap">
        <div className="col-6 col-md-4 p-0">
          <div className="d-flex gap-1 justify-content-sm-center justify-content-md-start align-items-center">
            <i
              className={`bi-transiton bi fs-2 d-md-none me-3 cursor-pointer position-relative ${sidebarShow ? "bi-x" : "bi-list"
                }`}
              onClick={() => setSidebarShow((prev) => !prev)}
            ></i>
            <Link to={ROUTES.INDEX}>
              {/* <img src={LOGO_ICON} alt="" className="logoimg d-none d-sm-block" /> */}
              <div className="topbarTextSection">
                <h5 className="font-28 topbar-heading">Welcome Back, Hassan!</h5>
                <p className="">Hope Your Doing Good...!</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-4 col-md-8 col-lg-8 col-xl-7 col-xxl-6 p-0">
          <div
            className={`d-flex align-items-center m-0 justify-content-end gap-1 gap-sm-3`}
          >
            <div className="dropdown">
              <img
                src={TOPBAR_PROFILE}
                alt="PROFILE_PICTURE"
                width={32}
                height={32}
                className="dropdown-toggle cursor-pointer "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />

              <ul className="dropdown-menu p-0 mt-2 top-right-topbar">
                <Link to={ROUTES.MYPROFILE}>
                  <li>
                    <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2">
                      <img src={PROFILE_ICONSMALL} alt="Profile Icon" />
                      <span>Profile</span>
                    </div>
                  </li>
                </Link>
                {/* <Link to={ROUTES.MYPROFILE}>
                  <li>
                    <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2">
                      <img src={SIDEBAR_SETTING_ACTIVE} alt="Profile Icon" />
                      <span>Setting</span>
                    </div>
                  </li>
                </Link> */}
                <li>
                  <li className="dropdown-divider-top">
                    <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2" >
                      <img src={LOGOUT_ICONSMALL} alt="Logout Icon" />
                      <span onClick={() => setIsOpen(true)} >Logout</span>
                    </div>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <LogoutModal isOpen={isOpen} onClose={() => setIsOpen(false)} icon={LOGOUT_CONFIRM_PNG} heading="Come Back Soon!" subHeading="Are You Sure You Want To Logout?" isButton={true} />
    </>
  );
};

export default Topbar;
