import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { decryptAEStoString } from "../../utils/utilities";

const ProtectedRoutes = ({ component }) => {
  let location = useLocation(),
    rawAccessToken = useSelector((state) => state?.accessToken?.value);
  rawAccessToken = rawAccessToken
    ? decryptAEStoString(rawAccessToken)
    : rawAccessToken;
  if (!rawAccessToken)
    return <Navigate to="/" state={{ from: location }} replace />;
  return component;
};

export default ProtectedRoutes;
