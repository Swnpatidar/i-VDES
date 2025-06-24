import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, getCurrentUser } from "aws-amplify/auth";

import { ROUTES } from "../../hooks/routes/routes-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import useToast from "../../hooks/Custom-hooks/useToast";
import { ErrorMsg } from "../../utils/form-utils";
import {
  CHANGE_PASSWORD_LOGO,
  EYE_CLOSE,
  EYE_OPEN,
} from "../../utils/app-image-constant";
import { validateRegex } from "../../utils/utilities";
import { PasswordRegex } from "../../utils/regexValidation";
import BreadCrum from "../../components/common/BreadCrum";

const ChangePassword = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [showOldPwd, setShowOldPwd] = useState("password");
  const [isPwdVisible, setIsPwdVisible] = useState("password");
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState("password");

  const [payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPayload((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!payload.oldPassword.trim()) {
      errors.oldPassword = "Old password is required";
    }
    if (!payload.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (!validateRegex(payload.newPassword, PasswordRegex)) {
      errors.newPassword =
        "Password must be at least 8 characters long and include a special character, capital letter, and number.";
    }
    if (!payload.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (payload.newPassword !== payload.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await getCurrentUser(); // Ensure the user is authenticated
      await updatePassword({
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      });

      toast.success("Password changed successfully");
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.log("error changing password", err);
      toast.error(
        err.message || "Something went wrong while changing password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrum firstData="Change Password" iconshow1={false} />
      </div>

      <div className="Auth-common-bg min-vh-100">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div className="w-50">
              <div className="modal-content p-4 border-white">
                <div className="text-center mb-4">
                  <img src={CHANGE_PASSWORD_LOGO} className="mb-3" alt="password" width="100px" />
                  <h5 className="text-white mb-1">Change Password</h5>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <Input
                      className="border-radius_input"
                      type={showOldPwd}
                      name="oldPassword"
                      value={payload.oldPassword}
                      placeHolder="Old Password"
                      handleChange={handleChange}
                      showRightIcon
                      rightIconSrc={showOldPwd === "password" ? EYE_CLOSE : EYE_OPEN}
                      onRightIconClick={() =>
                        setShowOldPwd((prev) =>
                          prev === "password" ? "text" : "password"
                        )
                      }
                      showLabel={false}
                    />
                    <ErrorMsg error={formError.oldPassword} />
                  </div>

                  <div className="mb-2">
                    <Input
                      className="border-radius_input"
                      type={isPwdVisible}
                      name="newPassword"
                      value={payload.newPassword}
                      placeHolder="New Password"
                      handleChange={handleChange}
                      error={formError.newPassword}
                      showRightIcon
                      showAsterisk={false}
                      showLabel={false}
                      rightIconSrc={isPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN}
                      onRightIconClick={() =>
                        setIsPwdVisible(isPwdVisible === "password" ? "text" : "password")
                      }
                    />
                    <ErrorMsg error={formError.newPassword} />
                  </div>

                  <div className="mb-3">
                    <Input
                      className="border-radius_input"
                      type={isConfirmPwdVisible}
                      name="confirmPassword"
                      value={payload.confirmPassword}
                      placeHolder="Confirm Password"
                      handleChange={handleChange}
                      error={formError.confirmPassword}
                      showRightIcon
                      showAsterisk={false}
                      showLabel={false}
                      rightIconSrc={isConfirmPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN}
                      onRightIconClick={() =>
                        setIsConfirmPwdVisible(
                          isConfirmPwdVisible === "password" ? "text" : "password"
                        )
                      }
                    />
                    <ErrorMsg error={formError.confirmPassword} />
                  </div>

                  <div className="text-center my-3">
                    <Button
                      className="rounded-3"
                      label="Change Password"
                      type="submit"
                      isLoading={isLoading}
                    />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
