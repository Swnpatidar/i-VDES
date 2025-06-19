import {
  HAND_ROBOAT,
  LAPTOP_WITH_HAND,
  SECURED_ICON,
  SINGUP_ICON,
  UPLOAD_IMAGE_ICON,
  WOMEN_WITH_LAPTOP,
} from "../../utils/app-image-constant";

const HowItWorks = () => {
  return (
    <div className=" how-it-works-wrapper my-3 my-md-5">
      <div className="row">
        {/* Left Side - Steps */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div></div>
          <h2 className="section-title mb-3 mb-md-5">How It Works</h2>
          <div className="d-flex ">
            <span className="step-number me-4">01</span>
            <div className=" bg-white d-flex align-items-center px-md-4 px-2 rounded-4 w-75 ">
              <div className="icon bg-light-primary d-flex">
                <img
                  src={SINGUP_ICON}
                  alt="Sign Up"
                  className="img-fluid icon-img"
                />
              </div>
              <div className="ms-3">
                <h5 className="text-dark">Sign Up and Create Account</h5>
                <p>Fill out your details.</p>
              </div>
            </div>
          </div>
          <div className="d-flex my-4 py-2 py-md-3 ">
            <div className=" bg-white d-flex align-items-center px-md-4 p-2 rounded-4 w-75 ">
              <div className="icon bg-light-warning d-flex">
                <img
                  src={UPLOAD_IMAGE_ICON}
                  alt="Sign Up"
                  className="img-fluid icon-img"
                />
              </div>
              <div className="ms-3">
                <h5 className="text-dark">Upload Your Image</h5>
                <p>Simply Upload your Image</p>
              </div>
            </div>
            <span className="step-number ms-4">02</span>
          </div>
          <div className="d-flex ">
            <span className="step-number me-4">03</span>
            <div className=" bg-white d-flex align-items-center px-md-4 p-2 rounded-4 w-75 ">
              <div className="icon bg-light-pink d-flex">
                <img
                  src={SECURED_ICON}
                  alt="Sign Up"
                  className="img-fluid icon-img"
                />
              </div>
              <div className="ms-3">
                <h5 className="text-dark">Get Secured</h5>
                <p className="">Secure Your Image.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Images */}
        <div className="col-md-6">
          <div className="how-images d-flex gap-4">
            <div className="d-flex flex-column gap-4">
              <img
                src={LAPTOP_WITH_HAND}
                alt="How 1"
                className="img-fluid rounded"
                height="10px"
              />
              <img
                src={WOMEN_WITH_LAPTOP}
                alt="How 2"
                className="img-fluid rounded"
              />
            </div>

            <div className="">
              <img
                src={HAND_ROBOAT}
                alt="How 3"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default HowItWorks;
