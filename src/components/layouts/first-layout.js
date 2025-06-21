

import Sidebar from "../common/sidebar";
import Topbar from "../common/topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const FirstLayout = () => {
  const [sidebarShow, setSidebarShow] = useState(false);

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
