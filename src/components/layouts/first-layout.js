// import Sidebar from "../common/sidebar";
// import Topbar from "../common/topbar";
// import { Outlet } from "react-router-dom";

// import {
//   SIDEBAR_TOP_IMAGE_1,
//   SIDEBAR_TOP_IMAGE_2,
//   SIDEBAR_TOP_LEFT_IMAGE,
// } from "../../utils/aap-image-constant";

// const FirstLayout = ({ setSidebarShow, sidebarShow }) => {
//   return (
//     //FOR TWO PARTS SIDEBAR AND MAIN BODY
//     <div className="d-flex screen-height overflow-hidden bg-blue ">
//       <img
//         src={SIDEBAR_TOP_LEFT_IMAGE}
//         className=" img-top-left  position-absolute mb-5"
//       // height={150}
//       ></img>
//       <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
//       <div className="p-2 z-1 w-100" >
//         <div className=" px-4 h-100 bg-off-white rounded-30  overflow-auto ">
//           <Topbar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FirstLayout;

// after table scrollabel

import Sidebar from "../common/sidebar";
import Topbar from "../common/topbar";
import { Outlet } from "react-router-dom";

import {
  SIDEBAR_TOP_LEFT_IMAGE,
} from "../../utils/aap-image-constant";

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
