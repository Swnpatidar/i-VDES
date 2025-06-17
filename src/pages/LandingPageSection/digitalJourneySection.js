import React from "react";
import { DISCOVER_JOURNENY } from "../../utils/app-image-constant";

const DigitalJourneySection = () => {
  return (
    <div className="digital-journey-section ">
      <div className="row align-items-center custom-section">
        {/* Left side: Single Image */}
        <div className="col-md-5 mb-4 mb-md-0 text-lg-start m-0 ">
          <img
            src={DISCOVER_JOURNENY}
            alt="Digital Journey"
            className="img-fluid"
          />
        </div>

        {/* Right side: Content */}
        <div className="col-md-7 content text-lg-start text-center">
          <h2>
            Discover Our Journey <br />
            Protecting Your Digital World <br />
            with Expertise and Care
          </h2>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalJourneySection;
