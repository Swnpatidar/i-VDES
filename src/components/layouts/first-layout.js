

import Sidebar from "../common/sidebar";
import Topbar from "../common/topbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { useDispatch } from "react-redux";
import { clearAmplifyAuthSession } from "../../hooks/redux/slice/auth-session";
import useIdleLogout from "../../utils/utilities";
import { toast } from "react-toastify";
import { Message } from "../../utils/toastMessages";

const FirstLayout = () => {
  const [sidebarShow, setSidebarShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAutoLogout = () => {
    dispatch(clearAmplifyAuthSession());
    localStorage.removeItem('persist:root');
    localStorage.clear();
    toast.warn(Message.Response.Sessionout)
    navigate(ROUTES.LOGIN)
  }

  useIdleLogout(handleAutoLogout) //run when user idel for 3 minutes

  return (
    //FOR TWO PARTS SIDEBAR AND MAIN BODY
    <div className="container-fluid screen-height p-4 overflow-hidden">

      <div className="row flex-nowrap h-100 overflow-hidden">
        <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />

        <div className="col table_resp_dnp h-100 ">
          <div className="px-lg-2 h-100 overflow-auto  ">
            <div className="">
              <Topbar
                sidebarShow={sidebarShow}
                setSidebarShow={setSidebarShow}
              />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstLayout;
