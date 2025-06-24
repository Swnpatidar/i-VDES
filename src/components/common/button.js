import React from "react";

const Button = ({
  label = "button",
  onClick,
  isLoading,
  icon,
  className,
  iconPosition = "",
  type = "button",
}) => {
  return (
    <>


      <button
        type={type}
        className={`btn btn-common  ${className}`}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading && <i className="fa fa-spinner fa-spin me-2 align-middle"></i>}

        {icon && iconPosition === "front" && (
          <img
            className="me-2 align-middle"
            src={icon}
            alt="button_icon"
            height={20}
          />
        )}

        <span className="align-middle text-white">{label}</span>

        {icon && iconPosition === "back" && (
          <img
            className="ms-2 align-middle"
            src={icon}
            alt="button_icon"
            height={12}
          />
        )}
      </button>

    </>
  );
};

export default Button;
