import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { decryptAEStoString } from "../../utils/utilities";

const PublicRoutes = ({ component: Component }) => {
  const location = useLocation();
  const rawAccessToken = useSelector((state) => state?.accessToken?.value);
  const decryptedToken = rawAccessToken ? decryptAEStoString(rawAccessToken) : null;

  if (decryptedToken) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If `Component` is a function (not JSX), render as element
  return typeof Component === "function" ? <Component /> : Component;
};

export default PublicRoutes;
