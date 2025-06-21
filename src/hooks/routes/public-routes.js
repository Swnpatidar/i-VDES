
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { decryptAEStoString } from "../../utils/utilities";
// import { useSelector } from "react-redux";

const PublicRoutes = ({ component: Component }) => {
  const location = useLocation();

  // const rawAccessToken = useSelector(
  //   (state) => state?.amplifyAuthSession?.accessToken
  // );
  const rawAccessToken="sdcv"
  let decryptedToken = null;

  try {
    // Only attempt to decrypt if string looks valid
    if (rawAccessToken && typeof rawAccessToken === "string") {
      decryptedToken = decryptAEStoString(rawAccessToken);
    }
  } catch (error) {
    console.error("Token decryption failed:", error.message);
  }

  if (decryptedToken) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return typeof Component === "function" ? <Component /> : Component;
};

export default PublicRoutes;
