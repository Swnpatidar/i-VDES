import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { signIn } from "../../hooks/services/api-services";
import {
  decryptAEStoString,
  encryptJSONtoAES,
  encryptStringtoAES,
  toastEmitter,
  validateRegex,
} from "../../utils/utilities";

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
  ARROWTOLEFT,
} from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { ErrorMsg, handleFormInput } from "../../utils/form-utils";
import withModalWrapper from "../../components/common/HOC/withModalWrapper";
import MyModal from "../../components/common/Modal/myModal";
import useToast from "../../hooks/Custom-hooks/useToast";
import { Message } from "../../utils/toastMessages";
import { fetchAuthSession, getCurrentUser, signIn, signOut } from "@aws-amplify/auth";
import { setAmplifyAuthSession } from "../../hooks/redux/slice/auth-session";

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
  const toast = useToast()
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = decryptAEStoString(localStorage.getItem("email"));
    const savedPassword = decryptAEStoString(localStorage.getItem("password"));
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      setLoginPayload({
        ...loginPayload,
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  // common handle change for name , email , password
  const handleChange = (e) => { setLoginPayload(handleFormInput(e, loginPayload, formError, setFormError)) };

  // get token 
  const getSessionAndStore = async () => {
    try {
      const session = await fetchAuthSession();
      dispatch(
        setAmplifyAuthSession({
          accessToken: encryptJSONtoAES(session.tokens?.accessToken?.toString()),
          idToken: encryptJSONtoAES(session.tokens?.idToken?.toString()),
          refreshToken: encryptJSONtoAES(session.tokens?.refreshToken?.toString()),
        })
      );
    } catch (err) {
      console.error("Error fetching session:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginPayload.email.trim() === "") {
      return toast.error("Email is mandatory!");
    }
    if (loginPayload.password.trim() === "") {
      return toast.error("error", "Password is mandatory!");
    }
    if (!validateRegex(loginPayload.email, EmailRegex)) {
      return toast.error("error", "Email is invalid!");
    }
    if (!validateRegex(loginPayload.password, PasswordRegex)) {
      return toast.error(
        "error",
        "password should be a combination  8  characters which include altleast one special character , special symbol , capital letter and number"
      );
    }
    setIsLoading(true);
    await AmplifySignIn();
    setIsLoading(false);
    if (rememberMe) {
      localStorage.setItem("email", encryptStringtoAES(loginPayload?.email));
      localStorage.setItem("password", encryptStringtoAES(loginPayload?.password));
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.setItem("rememberMe", "false");
    }
  };


  const AmplifySignIn = async () => {
    const { email, password } = loginPayload;
    const loginDynamicPayload = {
      username: email,
      password: password
    }
    try {
      const result = await signIn(loginDynamicPayload);
      console.log("result==>", result)
      if (result.isSignedIn) {
        await getSessionAndStore(); //to get the Token
        setIsOpen(true)
        setTimeout(() => {
          navigate(ROUTES?.DASHBOARD)
          setIsOpen(false)
        }, 1200);
      } else {
        toast.error("Account does not exist. Please sign up first.");
      }
    } catch (error) {
      console.log("err", error)
      toast.error(Message.Response.Default);
    }
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
                    <p className="text-white my-2 ">
                      Glad you're back.!

                    </p>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <div className="">
                      <Input
                        className="border-radius_input"
                        type="text"
                        value={loginPayload.email}
                        name="email"
                        placeHolder="Email"
                        handleChange={handleChange}
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
                        value={loginPayload.password}
                        name="password"
                        placeHolder="Password"
                        handleChange={handleChange}
                        error={formError?.password}
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
                  <div className="text-center">
                    <p class="text-white">
                      Don't have an account?{" "}
                      <Link to={ROUTES?.REGISTER} className="singup-color">
                        Signup
                      </Link>
                    </p>
                    <Link to={ROUTES?.INDEX} className="singup-color">
                      <img src={ARROWTOLEFT} className="arrow-left mx-2" alt="right-arrow" width="14px" />
                      Back to home
                    </Link>
                  </div>

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
