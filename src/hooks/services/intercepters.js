// import axios from "axios";
// import { API_URL } from "../../utils/url-constants";
// import { decryptAEStoString, toastEmitter } from "../../utils/utilities";
// import { fetchAuthSession } from "@aws-amplify/auth";

// const axiosMain = axios.create({
//   baseURL: `${API_URL.baseURL}`,
// });
// let hasErrorHandled = false;
// axiosMain.interceptors.request.use(async (config) => {
//   const session = await fetchAuthSession();
//   const token = session.tokens?.accessToken?.toString();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default axiosMain;
