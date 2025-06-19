import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./login.css";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../hooks/services/api-services";
import {
  decryptAEStoString,
  toastEmitter,
  validateRegex,
} from "../../utils/utilities";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { EmailRegex, PasswordRegex } from "../../utils/regexValidation";
import {
  EYE_OPEN,
  EMAIL_ICON,
  EYE_CLOSE,
  RIGHTARROW_IMG,
  CLOSE_ICON,
} from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { ErrorMsg, handleFormInput } from "../../utils/form-utils";
import Modal from "../../components/common/Model";
// import { Auth } from "aws-amplify";
import { signUp } from '@aws-amplify/auth'; //Gen2
import useToast from "../../hooks/Custom-hooks/useToast";
import { Message } from "../../utils/toastMessages";

const Register = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [isPwdVisible, setIsPwdVisible] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const addbuttonClick = useRef();
  const toast = useToast();

  const [registedPayload, setRegistedPayload] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  // common handle change for name , email , password
  const handleChange = (e) => { setRegistedPayload(handleFormInput(e, registedPayload, formError, setFormError)) };


  // Function for form register form submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError({});
    setIsLoading(true);
    const { name, email, password } = registedPayload;
    const signUpDynamicPayload = {
      username: email,
      password: password,
      options: {
        userAttributes: {
          ...(email && { email }),
          ...(name && { name }),
        }
      }
    }
    try {
      const result = await signUp(signUpDynamicPayload);
      console.log("Sign up result:==>", result);
      
      // {
      //   "isSignUpComplete": false,
      //     "nextStep": {
      //     "signUpStep": "CONFIRM_SIGN_UP",
      //       "codeDeliveryDetails": {
      //       "destination": "k***@h***",
      //         "deliveryMedium": "EMAIL",
      //           "attributeName": "email"
      //     }
      //   },
      //   "userId": "b682c2e4-6091-701f-9612-6a6372862016"
      // }
      if(result.userId && !result.isSignUpComplete){
        toast.success("Registration complete. We've sent a verification code to your email.")
        navigate(ROUTES.CONFIRM_SINGUP, { state: { email: registedPayload?.email } });
      }else{
        toast.error(Message.Response.Default)
      }
    } catch (error) {
      toast.error(Message.Response.Error);
    } finally {
      setIsLoading(false);
    }
  };


  // useEffect(() => {
  //   const savedEmail = decryptAEStoString(localStorage.getItem("email"));
  //   const savedPassword = decryptAEStoString(localStorage.getItem("password"));
  //   const savedRememberMe = localStorage.getItem("rememberMe") === "true";
  //   if (savedRememberMe) {
  //     setRegistedPayload({
  //       ...registedPayload,
  //       email: savedEmail,
  //       password: savedPassword,
  //     });
  //     setRememberMe(true);
  //   }
  // }, []);


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
                <form onSubmit={handleRegister}>
                  <div className="login-welcome">
                    <h2 className="text-white">Signup</h2>
                    <p className="text-white my-1 ">Welcome to I-VDES</p>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <div className="">
                      <Input
                        className="border-radius_input"
                        type="text"
                        value={registedPayload.name}
                        name="name"
                        placeHolder="Name"
                        handleChange={handleChange}
                        error={formError?.name}
                        showIcon={false}
                        showAsterisk={false}
                        showLabel={false}
                      />
                      <ErrorMsg error={formError?.name} />
                    </div>

                    <div className="">
                      <Input
                        className="border-radius_input"
                        type="text"
                        value={registedPayload.email}
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
                        value={registedPayload.password}
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
                    <div>
                      <Input
                        className="border-radius_input"
                        type={isPwdVisible}
                        value={registedPayload.confirmPassword}
                        name="confirmPassword"
                        placeHolder="Confirm Password"
                        handleChange={handleChange}
                        error={formError?.confirmPassword}
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
                      <ErrorMsg error={formError?.confirmPassword} />
                    </div>

                    <Button
                      className="btn btn-common btn-lg w-100 rounded-18 fw-600 fs-5  "
                      label="Signup"
                      type="submit"
                      isLoading={isLoading}
                      style={{ letterSpacing: "1.5px" }}
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
