import React from "react";
import { useTranslation } from "react-i18next";

const Button = ({
  label,
  onClick,
  isLoading,
  icon,
  className,
  type,
}) => {
  const { t } = useTranslation();
  return (
    <>
    <button
      type={type}
      className={`${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && <i className="fa fa-spinner fa-spin me-2"></i>}
      {t(label)}
      {icon && (
        <img className="ms-2" src={icon} alt="button_icon" height={14} />
      )}
    </button>
    </>
  );
};

export default Button;
