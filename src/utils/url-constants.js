export const API_URL = {
  baseURL: process.env.REACT_APP_API_NEW_SERVER_URI,
  ServerURL: "http://72.167.33.207:3030",
  auth: {
    login: "authController/login",
    // login: "authController/login",
    registerClinic: "clinic/clinicProfileRegister",
    forgotPassword: "authController/forgotPassword",
    ResetPassword: "authController/changeUserPassword",
  },
   dashboard: {
    uploadImage: "https://2p79kmr1tc.execute-api.eu-west-2.amazonaws.com/testing/saveToS3",
  },
};
