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
  LOGIN_SUCCESS_ICON,
  LOGIN_SUCCESS_PNG,
} from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { ErrorMsg, handleFormInput } from "../../utils/form-utils";
import { setPermissionReducer } from "../../hooks/redux/slice/permission";
import withModalWrapper from "../../components/common/HOC/withModalWrapper";
import MyModal from "../../components/common/Modal/myModal";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [isPwdVisible, setIsPwdVisible] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const addbuttonClick = useRef();
  const LogInModal = withModalWrapper(MyModal) //for login modal
  const [isOpen, setIsOpen] = useState(false); //for login Modal
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
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true)
    setTimeout(() => {
      navigate(ROUTES?.DASHBOARD)
      setIsOpen(false)
    }, 1200);
  }

  return (

    <>
      <div className="Auth-common-bg">
        <div className="container-fluid">
          <div className="row min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center text-white px-5">
              <div>
                <h1 className="fw-bold mb-3 display-4">Welcome Back!</h1>
                <p className="fs-5 w-75">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            {/* Login Box */}

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
                    <h2 className="text-white">Login</h2>
                    <p className="text-white my-1 ">
                      Glad you're back.!

                    </p>
                  </div>
                  <div className="d-flex flex-column gap-3">
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
                  <div className="align-position justify-content-between  text-white ">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="Check1"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        className="my-0 text-white fs-6"
                        htmlFor="exampleCheck1"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <Button
                    className="btn btn-common btn-lg w-100 rounded-18 fw-600 fs-5  "
                    label="Login"
                    type="submit"
                    isLoading={isLoading}
                    style={{ letterSpacing: "1.5px" }}
                    onClick={(e) => handleSubmit(e)}
                  />
</div>
                  <div className="my-3">
                    <Link to={ROUTES?.FORGOT_PASSWORD} className="text-white">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="divider-line">
                    <span className="line left-line"></span>
                    <span className="divider-text mx-2">Or</span>
                    <span className="line right-line"></span>
                  </div>

                  <p class="text-center text-white mb-5 ">
                    Don't have an account?{" "}

                    <Link to={ROUTES?.REGISTER} className="singup-color">
                      Signup
                    </Link>

                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <LogInModal isOpen={isOpen} onClose={() => setIsOpen(false)} icon={LOGIN_SUCCESS_PNG}
          heading="Login Successful" />

      </div>
    </>
  );
};

export default Login;
