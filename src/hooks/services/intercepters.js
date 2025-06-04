import axios from "axios";
import { API_URL } from "../../utils/url-constants";
import { decryptAEStoString, toastEmitter } from "../../utils/utilities";
import { clearLoggedUserReducer } from "../redux/slice/logged-user";
import { clearAccessTokenReducer } from "../redux/slice/access-token";
import { store } from "../redux/store";

const axiosMain = axios.create({
  baseURL: `${API_URL.baseURL}`,
});
let hasErrorHandled = false;
axiosMain.interceptors.request.use(
  (config) => {
    let state = store.getState(),
      rawAccessToken = state?.accessToken?.value;
    rawAccessToken = rawAccessToken
      ? decryptAEStoString(rawAccessToken)
      : rawAccessToken;
    if (rawAccessToken) {
      config.headers.Authorization = `Bearer ${rawAccessToken}`;
    }
    return config;
  },
  (error) => {
    // return Promise.reject(error);
  }
);
axiosMain.interceptors.response.use(
  (response) => {

    return response;

  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(clearLoggedUserReducer());
      store.dispatch(clearAccessTokenReducer());
      if (!hasErrorHandled) {
        hasErrorHandled = true;
        toastEmitter("error", 'Session Expired, Please login Again!');
      }
    }
    return error.response;
  }
);

export default axiosMain;