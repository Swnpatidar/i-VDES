
import {
  DOWNLOAD_ICONSMALL, LOACK_ICON, LOGO_ICON, LOGOUT_ICONSMALL, LOGOUT_IMG, NOTIFICATION_ICON, PAYMENT_ICON, PROFILE_ICONSMALL, PROFILE_IMG, SMALL_LOGO, STARICON,
  TOPBAR_PROFILE,
} from "../../utils/app-image-constant";

import { Link } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";

import { API_URL } from "../../utils/url-constants";
import Modal from "./Model";
const Topbar = ({ setSidebarShow, sidebarShow }) => {
  
  return (
    <>    <div className="row position-sticky top-0   z-index  border-bottom-line m-0 align-items-center py-3 justify-content-between flex-wrap">
      <div className="col-6 col-md-4 p-0">
        <div className="d-flex gap-1 justify-content-sm-centerjustify-content-md-start align-items-center">
          <Link to={ROUTES.INDEX}>
            {/* <img src={LOGO_ICON} alt="" className="logoimg d-none d-sm-block" /> */}
           <div className="d-none d-sm-block">
             <h5 className="font-28">Welcome Back, Hassan!</h5>
            <p className="" >Hope Your Doing Good...!</p>
           </div>
           
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
         <div className="dropdown">
  <img
    src={TOPBAR_PROFILE}
    alt="PROFILE_PICTURE"
    width={32}
    height={32}
    className="dropdown-toggle cursor-pointer"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  />

  <ul className="dropdown-menu p-0 mt-2">
    <Link to={ROUTES.MYPROFILE}>
      <li>
        <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2">
          <img src={PROFILE_ICONSMALL} alt="Profile Icon" />
          <span>Profile</span>
        </div>
      </li>
    </Link>

    <li>
      <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2">
        <img src={LOGOUT_ICONSMALL} alt="Logout Icon" />
        <span>Logout</span>
      </div>
    </li>
  </ul>
</div>

      

         
        </div>

      </div>
    </div>
      <Modal heading="Do You Want to Logout ?"  modalId="logoutModal"
        iconsrc={LOGOUT_IMG} buttonLable="Logout" cancelLable="Cancel"  logoutimg="logoutimg" />


        {/* <div></div> */}
    </>

  );
};

export default Topbar;
