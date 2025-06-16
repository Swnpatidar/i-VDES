import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGOUT_CONFIRM_PNG,
  SIDEBAR_ANALYSIS_ACTIVE,
  SIDEBAR_ANALYSIS_DEACTIVE,
  SIDEBAR_DASHBOARD_ACTIVE,
  SIDEBAR_DASHBOARD_DEACTIVE,
  SIDEBAR_LOGOUT,
  SIDEBAR_MAINLOGO,
  SIDEBAR_SETTING_ACTIVE,
  SIDEBAR_SETTING_DEACTIVE,
} from "../../utils/app-image-constant";

import { ROUTES } from "../../hooks/routes/routes-constant";
import withModalWrapper from "./HOC/withModalWrapper";
import { useState } from "react";
import MyModal from "./Modal/myModal";

const Sidebar = ({ setSidebarShow, sidebarShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const LogoutModal = withModalWrapper(MyModal) //for logout modal
  const [isOpen, setIsOpen] = useState(false); //for logout Modal
  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      route: ROUTES.DASHBOARD,
      src_not_active: SIDEBAR_DASHBOARD_DEACTIVE,
      src_active: SIDEBAR_DASHBOARD_ACTIVE,
    },
    {
      id: 2,
      name: "Analysis",
      route: ROUTES.ROLE_MANAGEMENT,
      src_not_active: SIDEBAR_ANALYSIS_DEACTIVE,
      src_active: SIDEBAR_ANALYSIS_ACTIVE,
    },
    {
      id: 3,
      name: "Setting",
      route: ROUTES.PATIENT,
      src_not_active: SIDEBAR_SETTING_DEACTIVE,
      src_active: SIDEBAR_SETTING_ACTIVE,
    },
  ];

  return (
    <div
      className={`sidebar col-auto  p-0 overflow-visible  bg-sidebar rounded-30 ${sidebarShow ? "sidebar-show" : ""
        }`}
    >
      <i
        className="bi p-3 text-white fs-1 bi-x d-inline d-md-none position-fixed top-0"
        onClick={() => setSidebarShow(false)}
      ></i>
      <div className="pb-3 pt-1 cursor-pointer" onClick={() => navigate(ROUTES?.INDEX)}>
        <div className="ms-2 me-2 text-center border-bottom-line" >
          <img
            src={SIDEBAR_MAINLOGO}
            alt="Main Logo"
            className="sidebar-logo-img"
          />

        </div>
      </div>

      {/* TOP LOGO AND LINE */}

      {/* MENU ITEMS */}
      <div className="d-flex flex-column gap-3 overflow-auto h-100 justify-content-center">
        <div className="h-100">
          <ul className="p-0">
            {menuItems.map((sidebar) => {
              const isActive = location.pathname.includes(sidebar.route);
              return (
                <li
                  key={sidebar.id}
                  className="position-relative pb-4 ps-1 pe-1 pe-lg-0"
                >
                  <NavLink
                    to={sidebar.route}
                    className={({ isActive: linkIsActive }) =>
                      `fs-6 sidebar-item text-decoration-none ${linkIsActive ? "active" : ""
                      }`
                    }
                    onClick={() => setSidebarShow(false)}
                  >
                    <div className="d-flex justify-content-center px-2">
                      <div className="sidebar-not-active-icon sidebar-active-icon w-auto d-inline-block">
                        <img
                          src={
                            isActive
                              ? sidebar.src_active
                              : sidebar.src_not_active
                          }
                          alt="sidebar_icon"
                        />
                      </div>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* LOGOUT ICON */}
          <div className="pt-3 pb-3 cursor-pointer" onClick={() => setIsOpen(true)}> 
            <div className="ms-2 me-2 text-center border-top-logout">
              <img
                src={SIDEBAR_LOGOUT}
                alt="LOGOUT-ICON"
                className="mt-3 mb-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}

      <LogoutModal isOpen={isOpen} onClose={()=>setIsOpen(false)} icon={LOGOUT_CONFIRM_PNG} heading="Come Back Soon!" subHeading="Are You Sure You Want To Logout?" isButton={true}/>
      
    </div>
  );
};

export default Sidebar;


