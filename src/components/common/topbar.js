
import { Link } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { useLoggedInUserDetails } from "../../utils/utilities";
const Topbar = ({ setSidebarShow, sidebarShow }) => {

//Current user details like name and email
const user = useLoggedInUserDetails();

  // get initial letter from fullName
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.trim()?.split(" ").filter(Boolean);
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    const firstInitial = words[0][0].toUpperCase();
    const lastInitial = words[words.length - 1][0].toUpperCase();
    return firstInitial + lastInitial;
  };



  return (
    <>
      {" "}
      <div className="row position-sticky top-0 bg-off-dark z-index  border-bottom-line m-0 align-items-center py-3 justify-content-between flex-wrap">
        <div className="col-6 col-md-5 p-0">
          <div className="d-flex gap-1 justify-content-sm-start justify-content-md-start align-items-center">
            <i
              className={`bi-transiton bi fs-2 d-md-none me-3 cursor-pointer position-relative ${sidebarShow ? "bi-x" : "bi-list"
                }`}
              onClick={() => setSidebarShow((prev) => !prev)}
            ></i>
            <Link to={ROUTES.INDEX}>
            
              {/* <img src={LOGO_ICON} alt="" className="logoimg d-none d-sm-block" /> */}
              <div className="topbarTextSection">
                <h5 className="font-28 topbar-heading">{`Welcome Back, ${user?.name}`}!</h5>
                <p className="">Hope Your Doing Good!</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-4 col-md-7 col-lg-8 col-xl-7 col-xxl-6 p-0">
          <div
            className={`d-flex align-items-center m-0 justify-content-end gap-1 gap-sm-3`}
          >
            <div className="dropdown topbar-profile-icon">
              <div className="dropdown-toggle " 
              >
                {getInitials(user?.name)}
              </div>
            

              {/* <ul className="dropdown-menu p-0 mt-2 top-right-topbar">
                <Link to={ROUTES.MYPROFILE}>
                  <li>
                    <div className="dropdown-item cursor-pointer d-flex align-items-center gap-1 ">
                      <div className="profile-icon">

                      </div>
                      <img src={LOACK_ICON} alt="Profile Icon"  className="" />
                      <span className="font-15 py-1">Change Password</span>
                    </div>
                  </li>
                </Link>
               
                <li>
                  <li className="dropdown-divider-top">
                    <div className="dropdown-item cursor-pointer d-flex align-items-center gap-2" >
                      <img src={LOGOUT_ICONSMALL} alt="Logout Icon" />
                      <span className="font-15" onClick={() => setIsOpen(true)} >Logout</span>

                    </div>
                  </li>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Topbar;
