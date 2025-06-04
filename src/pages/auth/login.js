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
} from "../../utils/aap-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { useTranslation } from "react-i18next";
import { ErrorMsg, handleFormInput } from "../../utils/form-utils";
import Modal from "../../components/common/Model";
import { setPermissionReducer } from "../../hooks/redux/slice/permission";

const Login = () => {
  const dispatch = useDispatch();

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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (payload.email.trim() === "") {
  //     return toastEmitter("error", "Email is mandatory!");
  //   }
  //   if (payload.password.trim() === "") {
  //     return toastEmitter("error", "Password is mandatory!");
  //   }
  //   if (!validateRegex(payload.email, EmailRegex)) {
  //     return toastEmitter("error", "Email is invalid!");
  //   }
  //   if (!validateRegex(payload.password, PasswordRegex)) {
  //     return toastEmitter(
  //       "error",
  //       "password should be a combination  8  characters which include altleast one special character , special symbol , capital letter and number"
  //     );
  //   }

  //   setIsLoading(true);
  //   signIn(payload)
  //     .then(function (response) {
  //       if (response.data?.status !== 200) {
  //         toastEmitter("error", response?.data?.message);
  //       }
  //       if (response.data?.status === 200) {
  //         dispatch(
  //           setAccessTokenReducer(
  //             encryptStringtoAES(response?.data?.data?.token)
  //           )
  //         );
  //         dispatch(
  //           setLoggedUserReducer(encryptJSONtoAES(response?.data?.data))
  //         );
  //         dispatch(
  //           setPermissionReducer(
  //             encryptJSONtoAES(
  //               response?.data?.data?.adminResponsePayload?.roleResponsePayload
  //                 ?.roleModuleMappingResponseList
  //             )
  //           )
  //         );

  //         addbuttonClick.current.click();
  //         setPayload({
  //           email: "",
  //           password: "",
  //           userType: "CLINIC",
  //         });
  //       }
  //       return setIsLoading(false);
  //     })
  //     .catch(function (err) {
  //       toastEmitter("error", API_RESPONSE?.MESSAGE_503);
  //       return setIsLoading(false);
  //     });
  //   if (rememberMe) {
  //     localStorage.setItem("email", encryptStringtoAES(payload?.email));
  //     localStorage.setItem("password", encryptStringtoAES(payload?.password));
  //     localStorage.setItem("rememberMe", "true");
  //   } else {
  //     localStorage.removeItem("email");
  //     localStorage.removeItem("password");
  //     localStorage.setItem("rememberMe", "false");
  //   }
  // };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <form>
            <div className="login-welcome">
              <h2 className="text-white">Login</h2>
              <p className="text-white ">
                Glad you're back.!
                {/* <Link to={ROUTES?.REGISTER} style={{ textDecoration: "none" }}>
                <span className=" text-primary cursor-pointer"> Register</span>
              </Link> */}
              </p>
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

                // labelName="Username"
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
            <div className="d-flex justify-content-between align-items-center my-2 text-white ">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Check1"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="my-0 text-white fs-6" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <Button
              className="btn btn-primary btn-lg w-100 border-radius_input fw-600 py-3"
              label="Login"
              type="submit"
              isLoading={isLoading}
              style={{ letterSpacing: "1.5px" }}
            />

            <div className="my-2">
              <Link to={ROUTES?.FORGOT_PASSWORD} className="text-white">
                Forgot password?
              </Link>
            </div>

            <div className="divider-line">
              <span className="divider-text">Or</span>
            </div>

            <p class="text-center text-white mb-5">
              Don't have an account? <a href="#">Signup</a>
            </p>
          </form>
        </div>
      </div>

      <Modal
        modalId="login"
        heading="Login Sucessfully"
        modalClick={addbuttonClick}
        iconsrc={RIGHTARROW_IMG}
      />
    </>
  );
};

export default Login;
