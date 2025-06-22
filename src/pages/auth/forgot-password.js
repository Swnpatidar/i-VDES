import React, { useState } from "react";
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { EMAIL_ICON, ARROW_ICON, EYE_CLOSE, EYE_OPEN, FORGET_PASSWORD } from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { ErrorMsg } from "../../utils/form-utils";
import useToast from "../../hooks/Custom-hooks/useToast";
import { Message } from "../../utils/toastMessages";
import { validateRegex } from "../../utils/utilities";
import { PasswordRegex } from "../../utils/regexValidation";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: enter email, 2: enter code + new password
  const [payload, setPayload] = useState({
    email: "",
    code: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState("password");

  const handleChange = (e) => {
    setPayload((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const validateStep = () => {
  const errors = {};

  if (payload.email.trim() === "") {
    toast.error("Email is mandatory!");
    return false;
  }

  if (step === 2) {
    if (!payload?.code) {
      // errors.code = "OTP is required";
        toast.error("OTP is required");
    return false;
    }
      if (payload?.password.trim() === "") {
    return toast.error("Password is mandatory!");
     return false;
  }
    if (!validateRegex(payload?.password, PasswordRegex)) {
        toast.error("Password must be at least 8 characters long and include a special character, capital letter, and number."
);
 
    }
  }

   setFormError(errors);

  if (Object.keys(errors).length > 0) {
    toast.error(Object.values(errors)[0]); // Show first error
    return false;
  }

  return true;

};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      if (step === 1) {
        await resetPassword({ username: payload.email });
        toast.success("OTP sent to your email.");
        setStep(2);
      } else {
        await confirmResetPassword({
          username: payload.email,
          confirmationCode: payload.code,
          newPassword: payload.password,
        });
        toast.success("Password reset successfully");
        navigate(ROUTES.LOGIN);
      }

    } catch (err) {
  console.log("AWS error:", err);

  if (err.name === "EmptyConfirmResetPasswordNewPassword") {
    // Ignore, since we already validated it
    return;
  }

  toast.error(err.message || Message.Response.Default);
} finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Auth-common-bg">
      <div className="container-fluid">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className="modal-content p-4 border-white">
              {/* Header */}
              <div className="text-center mb-4">
                <img src={FORGET_PASSWORD} className="mb-3" alt="password" width="100px" />
                <h5 className="text-white mb-2">
                  {step === 1 ? "Forgot Password!" : "Reset Password"}
                </h5>
                <p className="mb-0">
                  {step === 1
                    ? "Please enter your registered email address. We will send you a One-Time Password to verify your identity."
                    : "A One-Time Password (OTP) has been sent to your registered email address. Please enter the OTP below to proceed with resetting your password."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {step === 1 && (

                  <div className="mb-3">
                    <Input
                      className="border-radius_input"
                      type="text"
                      value={payload.email}
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
                )}
                {step === 2 && (
                  <>
                    <div className="mb-3">
                      <Input
                        className="border-radius_input"
                        type="text"
                        value={payload.code}
                        name="code"
                        placeHolder="Code"
                        handleChange={handleChange}
                        error={formError?.code}
                        showIcon={false}
                        iconsrc={EMAIL_ICON}
                        showAsterisk={false}
                        showLabel={false}
                      />
                      <ErrorMsg error={formError?.code} />
                    </div>
                    <div className="mb-3">
                      <Input
                        className="border-radius_input"
                        type={isPwdVisible}
                        value={payload.password}
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
                  </>
                )}

                <div className="text-center my-3">
                  <Button
                    className="rounded-3"
                    label={
                      step === 1 ? "Send OTP" : "Reset Password"
                    }
                    type="submit"
                    icon={ARROW_ICON}
                    isLoading={isLoading}
                  />
                </div>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  to={ROUTES?.LOGIN}
                  className="text-decoration-none d-inline-flex align-items-center"
                >
                  <i className="fa fa-long-arrow-left text-white me-2"></i>
                  <span className="fw-semibold">
                    Back to{" "}
                    <span className="singup-color">Login</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
