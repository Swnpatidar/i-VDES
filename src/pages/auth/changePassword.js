import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, getCurrentUser } from "aws-amplify/auth";

import { ROUTES } from "../../hooks/routes/routes-constant";
import Input from "../../components/common/input";
import Button from "../../components/common/button";
import useToast from "../../hooks/Custom-hooks/useToast";
import { ErrorMessage, ErrorMsg, handleFormInput } from "../../utils/form-utils";
import {
  CHANGE_PASSWORD_LOGO,
  EYE_CLOSE,
  EYE_OPEN,
} from "../../utils/app-image-constant";
import { validateRegex } from "../../utils/utilities";
import { PasswordRegex } from "../../utils/regexValidation";
import BreadCrum from "../../components/common/BreadCrum";
import { Message } from "../../utils/toastMessages";

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
    setPayload(handleFormInput(e, payload, formError, setFormError));
  };
  const validateForm = () => {
    const errors = {};

    if (payload?.oldPassword?.trim() === "") {
      toast.error(ErrorMessage?.Oldpassword);
      return false;
    }
    if (payload.newPassword.trim() === "") {
      toast.error(ErrorMessage?.NewPassword);
      return false;
    }
    else if (!validateRegex(payload.newPassword, PasswordRegex)) {
      toast.error(ErrorMessage?.Valid?.Password_Requirements);
      return false;
    }

    if (payload?.confirmPassword.trim() === "") {
      toast.error(ErrorMessage?.ConfirmPassword);
      return false;
    }

    else if (payload.password !== payload.confirmPassword) {
      toast.error(ErrorMessage?.MatchPassword);
      return false;
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

      toast.success(Message?.Response?.Password_Reset_success);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      toast.error(
        err.message || Message?.Response?.Default
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="Auth-common-bg border-0">
        <div className="row">
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-6 m-2 d-flex justify-content-center align-items-center">
            {/* <div className="col-12 "> */}
            <div className="modal-content changePasswordBody">
              <div className="text-center">
                <img src={CHANGE_PASSWORD_LOGO} className="mb-3" alt="password" width="90px" />
                <h4 className="text-white mb-3">Change Password</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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

                <div className="mb-3">
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
                    value={payload.confirmPassword}
                    name="confirmPassword"
                    placeHolder="Confirm Password"
                    handleChange={handleChange}
                    error={formError?.confirmPassword}
                    showRightIcon={true}
                    showAsterisk={false}
                    showLabel={false}
                    rightIconSrc={
                      isConfirmPwdVisible === "password" ? EYE_CLOSE : EYE_OPEN
                    }
                    onRightIconClick={() =>
                      setIsConfirmPwdVisible(
                        setIsConfirmPwdVisible === "password" ? "text" : "password"
                      )
                    }
                  />
                  <ErrorMsg error={formError?.confirmPassword} />
                </div>
                <div className="text-center">
                  <Button
                    className="rounded-3"
                    label="Change Password"
                    type="submit"
                    isLoading={isLoading}
                  />
                </div>
              </form>

            </div>
            {/* </div> */}
          </div>
          <div className="col-12 col-md-3"></div>

        </div>
      </div >
    </div >
  );
};

export default ChangePassword;
