import React from "react";
import { FACEBOOK_LOGO, INSTAGRAM_LOGO, NAVBAR_LOGO, TWITTER_LOGO, YOUTUBE_LOGO } from "../../utils/app-image-constant";

const Footer = () => {
  return (
    <div>
     
        <div className="">
          <footer className="my-5">
            <div className="">
              <div className="text-center">
                <img src={NAVBAR_LOGO} alt="Footer Logo" />
              </div>

              {/* Description */}
              <div className=" d-flex justify-content-center align-items-center ">
                <p className="mt-3  text-center ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </p>
              </div>

              {/* Social Media Icons with Circular Background */}
              <div className="d-flex justify-content-center mt-3">
                <div className=" mx-2 d-flex align-items-center justify-content-center  ">
                  <img
                    src={YOUTUBE_LOGO}
                    alt="youtube "
                    className="footericon"
                  />
                </div>
                <div className=" mx-2 d-flex align-items-center justify-content-center  ">
                  <img
                    src={TWITTER_LOGO}
                    alt="twitter"
                    className="footericon"
                  />
                </div>
                <div className=" mx-2 d-flex align-items-center justify-content-center ">
                  <img src={FACEBOOK_LOGO} alt="facebook" className="footericon" />
                </div>
                     <div className=" mx-2 d-flex align-items-center justify-content-center ">
                  <img src={INSTAGRAM_LOGO} alt="instagram" className="footericon" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      
    </div>
  );
};

export default Footer;
