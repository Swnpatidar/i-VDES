import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { decryptAEStoString } from "../../utils/utilities";

const ProtectedRoutes = ({component}) => {
  const location = useLocation();

  const rawAccessToken = useSelector(
    (state) => state?.amplifyAuthSession?.accessToken
  );
 let decryptedToken = null;

  try {
    if (rawAccessToken && typeof rawAccessToken === "string") {
      // decryptedToken = decryptAEStoString(rawAccessToken);
      decryptedToken =rawAccessToken;
    }
  } catch (error) {
    console.error("Token decryption failed:", error.message);
    decryptedToken = null; // fallback to avoid crash
  }

  if (!decryptedToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return component;
};

export default ProtectedRoutes;
