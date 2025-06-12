

import Sidebar from "../common/sidebar";
import Topbar from "../common/topbar";
import { Outlet } from "react-router-dom";

import {
  SIDEBAR_TOP_LEFT_IMAGE,
} from "../../utils/app-image-constant";

const FirstLayout = ({ setSidebarShow, sidebarShow }) => {
  return (
    //FOR TWO PARTS SIDEBAR AND MAIN BODY
    <div className="container-fluid screen-height p-4 overflow-hidden">
  
      <div className="row flex-nowrap h-100 overflow-hidden">
        <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />

        <div className="col table_resp_dnp h-100 ">
          <div className=" px-lg-2   h-100 overflow-auto  ">
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
