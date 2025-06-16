import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./login.css";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../hooks/services/api-services";
import {
  decryptAEStoString,
  encryptJSONtoAES,
  encryptStringtoAES,
  toastEmitter,
  validateRegex,
} from "../../utils/utilities";
import { setAccessTokenReducer } from "../../hooks/redux/slice/access-token";
import { setLoggedUserReducer } from "../../hooks/redux/slice/logged-user";
import { API_RESPONSE } from "../../utils/app-constants";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { EmailRegex, PasswordRegex } from "../../utils/regexValidation";
import {
  EYE_OPEN,
  EMAIL_ICON,
  EYE_CLOSE,
  ARROW_ICON,
  RIGHTARROW_IMG,
  CLOSE_ICON,
} from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { useTranslation } from "react-i18next";
import { ErrorMsg, handleFormInput } from "../../utils/form-utils";
import Modal from "../../components/common/Model";
import { setPermissionReducer } from "../../hooks/redux/slice/permission";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [isPwdVisible, setIsPwdVisible] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const addbuttonClick = useRef();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    userType: "CLINIC",
    deviceToken: "",
    deviceType: "web",
  });

  useEffect(() => {
    const savedEmail = decryptAEStoString(localStorage.getItem("email"));
    const savedPassword = decryptAEStoString(localStorage.getItem("password"));
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      setPayload({
        ...payload,
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <div className="Auth-common-bg">
        <div className="container-fluid">
          <div className="row min-vh-100 d-flex align-items-center justify-content-center">
            {/* Welcome Section (Only visible on md and up) */}
            <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center text-white px-5">
              <div>
                <h1 className="fw-bold mb-3 display-4">Welcome!</h1>
                <p className="fs-5 w-75">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-sm-12 d-flex justify-content-center h-100 ">
              <div className="login-box w-100 mx-3 position-relative">
                <img
                  src={CLOSE_ICON}
                  alt="Close"
                  onClick={() => navigate(ROUTES?.INDEX)}
                  className="position-absolute top-0 end-0 m-4"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
                <form>
                  <div className="login-welcome">
                    <h2 className="text-white">Signup</h2>
                    <p className="text-white my-1 ">Welcome to I-VDES</p>
                  </div>
                  <div className="d-flex flex-column gap-3">         
                             <div className="">
                    <Input
                      className="border-radius_input"
                      type="text"
                      value={payload.username}
                      name="username"
                      placeHolder="Name"
                      handleChange={(e) =>
                        setPayload(
                          handleFormInput(e, payload, formError, setFormError)
                        )
                      }
                      error={formError?.username}
                      showIcon={false}
                      iconsrc={EMAIL_ICON}
                      showAsterisk={false}
                      showLabel={false}
                    />
                    <ErrorMsg error={formError?.username} />
                  </div>
                  <div className="">
                    <Input
                      className="border-radius_input"
                      type="text"
                      value={payload.email}
                      name="email"
                      placeHolder="Username"
                      handleChange={(e) =>
                        setPayload(
                          handleFormInput(e, payload, formError, setFormError)
                        )
                      }
                      error={formError?.email}
                      showIcon={false}
                      iconsrc={EMAIL_ICON}
                      showAsterisk={false}
                        showLabel={false}
                    />
                    <ErrorMsg error={formError?.email} />
                  </div>
                  <div>
                    <Input
                      className="border-radius_input"
                      type={isPwdVisible}
                      value={payload.password}
                      name="password"
                      placeHolder="Password"
                      handleChange={(e) =>
                        setPayload(
                          handleFormInput(e, payload, formError, setFormError)
                        )
                      }
                      error={formError?.password}
                      // labelName="Password"
                      showRightIcon={true}
                      showAsterisk={false}
                        showLabel={false}
                      rightIconSrc={
                        isPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN
                      }
                      onRightIconClick={() =>
                        setIsPwdVisible(
                          isPwdVisible === "password" ? "text" : "password"
                        )
                      }
                    />
                    <ErrorMsg error={formError?.password} />
                  </div>
                  <div>
                    <Input
                      className="border-radius_input"
                      type={isPwdVisible}
                      value={payload.password}
                      name="password"
                      placeHolder="Confirm Password"
                      handleChange={(e) =>
                        setPayload(
                          handleFormInput(e, payload, formError, setFormError)
                        )
                      }
                      error={formError?.password}
                      // labelName="Password"
                      showRightIcon={true}
                      showAsterisk={false}
                        showLabel={false}
                      rightIconSrc={
                        isPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN
                      }
                      onRightIconClick={() =>
                        setIsPwdVisible(
                          isPwdVisible === "password" ? "text" : "password"
                        )
                      }
                    />
                    <ErrorMsg error={formError?.password} />
                  </div>

                  <Button
                    className="btn btn-common btn-lg w-100 rounded-18 fw-600 fs-5  "
                    label="Signup"
                    type="submit"
                    isLoading={isLoading}
                    style={{ letterSpacing: "1.5px" }}
                    onClick={() => navigate(ROUTES?.LOGIN)}
                  />
</div>

                  <div className="divider-line">
                    <span className="line left-line"></span>
                    <span className="divider-text mx-2">Or</span>
                    <span className="line right-line"></span>
                  </div>

                  <p class="text-center text-white m-0">
                    Already have an account?{" "}
                    <Link to={ROUTES?.LOGIN} className="singup-color">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Modal
          modalId="login"
          heading="Login Sucessfully"
          modalClick={addbuttonClick}
          iconsrc={RIGHTARROW_IMG}
        />
      </div>
    </>
  );
};

export default Register;
