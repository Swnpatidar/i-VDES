import React, { useState } from "react";
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { EMAIL_ICON, ARROW_ICON, EYE_CLOSE, EYE_OPEN } from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import { ErrorMsg } from "../../utils/form-utils";
import useToast from "../../hooks/Custom-hooks/useToast";

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
    if (!payload.email) {
      errors.email = "Email is required";
    }
    if (step === 2) {
      if (!payload.code) {
        errors.code = "OTP is required";
      }
      if (!payload.password || payload.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
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
  toast.success("Password reset successfully! Redirecting to login...");
  navigate(ROUTES.LOGIN);
}

    } catch (err) {
       console.log(" err ravin",err)
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Auth-common-bg">
      <div className="container-fluid">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className="modal-content p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <h5 className="text-white mb-2">
                  {step === 1 ? "Forgot Password!" : "Reset Password"}
                </h5>
                <p className="mb-0">
                  {step === 1
                    ? "No worries, we'll send you reset instructions."
                    : "Please enter the OTP sent to your email and set a new password."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  
    <div className="mb-3">
                      <Input
                        className="border-radius_input"
                        type="email"
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
