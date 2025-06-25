import React, { useState, useEffect } from "react";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import {
  EMAIL_ICON,
  ARROW_ICON,
  EYE_CLOSE,
  EYE_OPEN,
  FORGET_PASSWORD,
} from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import {
  ErrorMessage,
  ErrorMsg,
  handleFormInput,
  isEmptyPayload,
} from "../../utils/form-utils";
import useToast from "../../hooks/Custom-hooks/useToast";
import { Message } from "../../utils/toastMessages";
import { validateRegex } from "../../utils/utilities";
import { PasswordRegex } from "../../utils/regexValidation";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState("password");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState("password");

  // Resend OTP timer states
  const [resendTimer, setResendTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && !canResend && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [resendTimer, canResend, step]);

  const handleChange = (e) => {
    if (e.target.name === "code" && e.target.value.length > 6) return;
    setPayload(handleFormInput(e, payload, formError, setFormError));
  };

  const validateStep = () => {
    const errors = {};
    if (payload.email.trim() === "") {
      toast.error(ErrorMessage?.Email);
      return false;
    }

    if (step === 2) {
      const { email, ...fieldsToValidate } = payload;
      if (isEmptyPayload(fieldsToValidate)) {
        toast.error(ErrorMessage?.Allfieldmandatory);
        return false;
      }

      if (!payload?.code) {
        toast.error(ErrorMessage?.OTP_mandatory);
        return false;
      }

      if (payload?.password.trim() === "") {
        toast.error(ErrorMessage?.Password);
        return false;
      }

      if (!validateRegex(payload?.password, PasswordRegex)) {
        toast.error(ErrorMessage?.Valid?.Password_Requirements);
        return false;
      }

      if (payload?.confirmPassword.trim() === "") {
        toast.error(ErrorMessage?.ConfirmPassword);
        return false;
      }

      if (payload.password !== payload.confirmPassword) {
        toast.warn(ErrorMessage?.MatchPassword);
        return false;
      }
    }

    setFormError(errors);
    return true;
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      await resetPassword({ username: payload.email });
      toast.success("OTP resent to your email.");
      setCanResend(false);
      setResendTimer(60);
    } catch (err) {
      if (err.name === "LimitExceededException") {
        toast.warn("You have requested OTP too frequently. Please wait.");
      } else {
        toast.error(err.message || Message.Response.Default);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
     console.log("🔁 Submit clicked");
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      if (step === 1) {
        await resetPassword({ username: payload.email });
        toast.success(Message?.Response?.Otpsent_email);
        setStep(2);
        setCanResend(false);
        setResendTimer(60);
      } else {
        await confirmResetPassword({
          username: payload.email,
          confirmationCode: payload.code,
          newPassword: payload.password,
        });
        toast.success(Message?.Response?.Password_Reset_success);
        navigate(ROUTES.LOGIN);
      }
    } catch (err) {
      console.log("err??", err);
      if (err.name === "UserNotFoundException") {
        toast.warn("The email you entered isn't registered");
      } else if (err.name === "CodeMismatchException") {
        toast.warn("Incorrect verification code, please try again.");
      }else if (err.name === "LimitExceededException") {
        toast.warn("You have blocked. please try again after 10 minutes.");
      } else if (err.name === "EmptyConfirmResetPasswordNewPassword") {
        return;
      } else {

        toast.error(err.message || Message.Response.Default);
      }
    } finally {
      setIsLoading(false);
    }
  };
const handleResendOtpClick = async (e) => {
  console.log("🔁 Resend OTP clicked");
  e.preventDefault();
  e.stopPropagation();

  if (e.nativeEvent) {
    e.nativeEvent.stopImmediatePropagation(); 
  }

  if (!canResend) return;

  try {
    await handleResendOtp();
  } catch (err) {
    console.error("Resend OTP Error:", err);
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
                <img src={FORGET_PASSWORD} className="mb-3" alt="password" width="80px" />
                <h4 className="text-white mb-2">
                  {step === 1 ? "Forgot Password!" : "Reset Password"}
                </h4>
              <p className="mb-0">
  {step === 1
    ? "Enter your registered email to receive an OTP."
    : "OTP sent to your email. Enter it to reset your password."}
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
                    <div className="mb-2 position-relative">
                      <Input
                        className="border-radius_input pe-5"
                        type="text"
                        maxLength={6}
                        value={payload.code}
                        name="code"
                        placeHolder="Verification Code"
                        handleChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,6}$/.test(inputValue)) handleChange(e);
                        }}
                        error={formError?.code}
                        showIcon={false}
                        showAsterisk={false}
                        showLabel={false}
                      />
                      {payload.code.length === 6 && (
                        <i
                          className="fa fa-check position-absolute d-flex justify-content-center align-items-center"
                          style={{
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            fontSize: "14px",
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        ></i>
                      )}
                      <ErrorMsg error={formError?.code} />
                    </div>

               

                    <div className="mb-2">
                      <Input
                        className="border-radius_input"
                        type={isPwdVisible}
                        value={payload.password}
                        name="password"
                        placeHolder="New Password"
                        handleChange={handleChange}
                        error={formError?.password}
                        showRightIcon={true}
                        showAsterisk={false}
                        showLabel={false}
                        rightIconSrc={isPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN}
                        onRightIconClick={() =>
                          setIsPwdVisible(isPwdVisible === "password" ? "text" : "password")
                        }
                      />
                      <ErrorMsg error={formError?.password} />
                    </div>

                    <div>
                      <Input
                        className="border-radius_input"
                        type={isConfirmPasswordVisible}
                        value={payload.confirmPassword}
                        name="confirmPassword"
                        placeHolder="Confirm Password"
                        handleChange={handleChange}
                        error={formError?.confirmPassword}
                        showRightIcon={true}
                        showAsterisk={false}
                        showLabel={false}
                        rightIconSrc={
                          isConfirmPasswordVisible === "password" ? EYE_CLOSE : EYE_OPEN
                        }
                        onRightIconClick={() =>
                          setIsConfirmPasswordVisible(
                            isConfirmPasswordVisible === "password" ? "text" : "password"
                          )
                        }
                      />
                      <ErrorMsg error={formError?.confirmPassword} />
                    </div>
                  </>
                )}

                <div className="text-center my-3">
                  <Button
                    className="rounded-3"
                    label={step === 1 ? "Send OTP" : "Reset Password"}
                    type="submit"
                    icon={ARROW_ICON}
                    isLoading={isLoading}
                  />
                </div>
              </form>
{step==1 &&(
   <div className="text-center">
      <Link
        to={ROUTES?.LOGIN}
        className="text-decoration-none d-inline-flex align-items-center"
      >
        <i className="fa fa-long-arrow-left text-white me-2"></i>
        <span className="fw-semibold">
          Back to <span className="singup-color">Login</span>
        </span>
      </Link>
    </div>
)}

{step === 2 && (
  <div className="d-flex justify-content-between align-items-center mb-1">
    <div className="text-start">
      <Link
        to={ROUTES?.LOGIN}
        className="text-decoration-none d-inline-flex align-items-center"
      >
        <i className="fa fa-long-arrow-left text-white me-2"></i>
        <span className="fw-semibold">
          Back to <span className="singup-color">Login</span>
        </span>
      </Link>
    </div>

    <div className="text-end">
      <button
        type="button"
        onClick={handleResendOtpClick}
        disabled={!canResend}
        style={{
          background: "none",
          border: "none",
          color: canResend ? "rgba(10, 118, 123, 1)" : "#6c757d",
          fontSize: "15px",
          textDecoration: "underline",
          cursor: canResend ? "pointer" : "not-allowed",
        }}
      >
        {canResend ? "Resend OTP" : `Resend OTP in ${resendTimer} sec`}
      </button>
    </div>
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
