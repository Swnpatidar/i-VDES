import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { decryptAEStoString } from "../../utils/utilities";

const PublicRoutes = ({ component }) => {
  const location = useLocation();

  const rawAccessToken = useSelector(
    (state) => state?.amplifyAuthSession?.accessToken
  );

  let decryptedToken = null;

  try {
    // Avoid decryption if token is not a valid encrypted string
    if (rawAccessToken && typeof rawAccessToken === "string") {
      // decryptedToken = decryptAEStoString(rawAccessToken);
      decryptedToken = rawAccessToken;
    }
  } catch (err) {
    console.error("Decryption failed:", err.message);
    decryptedToken = null; // fallback to safe value
  }

  if (decryptedToken) {
    // If already signed in, redirect to dashboard
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return component;
};

export default PublicRoutes;
