import React from "react";
import { useTranslation } from "react-i18next";
const NumberInput = ({
  className,
  disabled,
  type,
  value,
  name,
  id,
  placeHolder,
  handleChange,
  error,
  labelName,
  required = true,
  iconsrc = "",
  showIcon = false,
  showRightIcon = false,
  rightIconSrc = "",
  showAsterisk = true,
  lableClassName = "",
  accept = "",
  onRightIconClick = () => { },
  ...rest
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <label className={`${lableClassName}`} htmlFor="username">
        {t(labelName)} {showAsterisk && <span className="text-danger">*</span>}
      </label>
      <div
        className={`input-group ${disabled ? "userdisabled" : ""} ${i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
      >
        <input
          type="number"
          maxLength={15}
          name={name}
          value={value}
          className={`form-control  ${className} ${error && "border-danger bg-error"
            }`}
          placeholder={t(placeHolder)}
          onChange={handleChange}
          // required={required}
          disabled={disabled}
          accept={accept}
          {...rest}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {showIcon && (
          <span className="input-group-text bg-white border-radius_input">
            <img src={iconsrc} alt="icon" />
          </span>
        )}
        {showRightIcon && (
          <span
            className="input-group-text bg-white border-radius_input"
            onClick={onRightIconClick}
            style={{ cursor: "pointer" }}
          >
            <img src={rightIconSrc} alt="toggle-icon" />
          </span>
        )}
      </div>
    </>
  );
};

export default NumberInput;
