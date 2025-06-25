import { API_URL } from "../../utils/url-constants";
import axiosInstance from "./intercepters";
import axiosMain from "./intercepters";
import axios from "axios";


// Upload image to S3
export async function presigned(payload) {
  return await axiosInstance?.post(`${API_URL?.UploadImageToS3?.getpresigned}`, payload);
}
