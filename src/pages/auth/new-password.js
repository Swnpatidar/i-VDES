import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";
import { resetPassword } from "../../hooks/services/api-services";
import { toastEmitter, validateRegex } from "../../utils/utilities";
import { PasswordRegex } from "../../utils/regexValidation";
import {
  ARROW_ICON,
  EYE_CLOSE,
  EYE_OPEN,
} from "../../utils/app-image-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState("password");
  const [formError, setFormError] = useState();
  const [payload, setPayload] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  let resetToken = window.location.pathname?.slice(24);

  useEffect(() => {
    if (resetToken) {
      setPayload((prevPayload) => ({ ...prevPayload, token: resetToken }));
    }
  }, [resetToken]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (payload.newPassword.trim() === "") {
      return toastEmitter("error", "New Password is mandatory!");
    }
    if (payload.confirmPassword.trim() === "") {
      return toastEmitter("error", " Confirm Password is mandatory!");
    }
    if (!validateRegex(payload.newPassword, PasswordRegex)) {
      return toastEmitter(
        "error",
        "Password should be a combination  8  characters which include altleast one special character , special symbol , capital letter and number"
      );
    }
    if (!validateRegex(payload.confirmPassword, PasswordRegex)) {
      return toastEmitter(
        "error",
        " Confirm Password should be a combination  8  characters which include altleast one special character , special symbol , capital letter and number"
      );
    }
    if (payload.newPassword !== payload.confirmPassword) {
      return toastEmitter(
        "error",
        "New Password and Confirm Password Not Match!"
      );
    }
    setIsLoading(true);

    resetPassword(payload)
      .then(function (response) {
        if (response?.data?.status !== 200) {
          toastEmitter("error", response?.data?.message);
        }

        if (response.data?.status === 200) {
          toastEmitter("success", response?.data?.message);
        }
        return setIsLoading(false);
      })
      .catch(function (err) {
        // toastEmitter("error", API_RESPONSE?.MESSAGE_503);
        return setIsLoading(false);
      });
  };
  const handleNewPasswordChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.vale });
  };
  return (
    <>
      <div className="form-group">
        <div className="login-welcome">
          <h5>Set new password!</h5>
          <p className="form-subtitle">
            Must be at least 8 characters and alphanumeric.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="">
            <Input
              className="border-radius_input"
              type={isPwdVisible}
              value={payload.password}
              name="password"
              placeHolder="Enter your password"
              handleChange={handleNewPasswordChange}
              error={formError?.password}
              showRightIcon={true}
              labelName="Password"
              rightIconSrc={isPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN} // This should toggle correctly
              onRightIconClick={() =>
                setIsPwdVisible(
                  isPwdVisible === "password" ? "text" : "password"
                )
              }
            />
          </div>
          <div className="mb-3">
            <Input
              className="border-radius_input"
              type={isPwdVisible}
              value={payload.confirmPassword}
              name="confirmPassword"
              placeHolder="Enter Confirm Password"
              handleChange={handleNewPasswordChange}
              error={formError?.confirmPassword}
              showRightIcon={true}
              labelName="Confirm Password"
              showAsterisk={false}
              rightIconSrc={isPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN} // This should toggle correctly
              onRightIconClick={() =>
                setIsPwdVisible(
                  isPwdVisible === "password" ? "text" : "password"
                )
              }
            />
          </div>
          {/* <button
            type="submit"
            className="btn btn-primary btn-lg btn-block w-100 border-radius_input fw-600 fs-16"
            disabled={isLoading}
          >
            {isLoading && <i className="fa fa-spinner fa-spin mr-2 me-2"></i>}
            Reset Password{" "}
            <img
              className="ms-2"
              src={ARROW_ICON}
              alt="arrow_icon"
              height={14}
            />
          </button> */}
          <Button
            className="btn btn-primary btn-lg w-100 border-radius_input fw-600 fs-16"
            label="Reset Password"
            type="submit"
            icon={ARROW_ICON}
          />
        </form>
        <Link to={ROUTES?.LOGIN} style={{ textDecoration: "none" }}>
          <div className="set-center mt-4">
            <i className="fa fa-long-arrow-left text-dark me-2"></i>
            <h6 className="pl-2 mb-0 text-dark fw-600">
              Back to <span className="text-primary">log in</span>{" "}
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NewPassword;
