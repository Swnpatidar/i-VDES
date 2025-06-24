import { API_URL } from "../../utils/url-constants";
import axiosMain from "./intercepters";
import axios from "axios";

export async function signIn(payload) {
  return await axiosMain.post(`${API_URL.auth.login}`, payload);
}
export async function registerClinic(payload) {
  return await axiosMain.post(`${API_URL.auth.registerClinic}`, payload);
}
export async function forgotPassword(payload) {
  return await axiosMain?.post(`${API_URL?.auth?.forgotPassword}`, payload);
}
export async function resetPassword(payload) {
  return await axiosMain?.post(`${API_URL?.auth?.ResetPassword}`, payload);
}
// Generate pdf file
export async function uploadImageFile(payload) {
  return await axios?.post(`${API_URL?.dashboard?.uploadImage}`, payload);
}