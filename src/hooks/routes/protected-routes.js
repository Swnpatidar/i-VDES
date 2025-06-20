import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { decryptAEStoString } from "../../utils/utilities";

const ProtectedRoutes = ({component}) => {
  const location = useLocation();
  const rawToken = useSelector((state) => state?.accessToken?.value);
  const decryptedToken = rawToken ? decryptAEStoString(rawToken) : null;

  if (!decryptedToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return component;
};

export default ProtectedRoutes;
