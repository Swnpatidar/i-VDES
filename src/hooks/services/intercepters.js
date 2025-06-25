import axios from "axios";
import { decryptAEStoString } from "../../utils/utilities";
import { toast } from "react-toastify";
import { Message } from "../../utils/toastMessages";
import { clearAmplifyAuthSession } from "../redux/slice/auth-session";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
// Create Axios instance
const axiosInstance = axios.create();

// Request Interceptor
axiosInstance.interceptors.request.use(async (config) => {
    const encryptedAccessToken = store.getState()?.amplifyAuthSession?.accessToken;
    if (!encryptedAccessToken || typeof encryptedAccessToken !== "string") {
        toast.error("Token is invalid")
    };
    try {
        const decryptedAccessToken = decryptAEStoString(encryptedAccessToken);
        if (decryptedAccessToken) {
            // config.headers.Authorization = `Bearer ${decryptedAccessToken}`; //When token is needed
            config.headers["Content-Type"] = 'application/json'; //When header needed
        }
        return config;
    } catch (err) {
        console.error("useCurrentUser error:", err);
    }
});




// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.code === "ERR_NETWORK") {
            store.dispatch(clearAmplifyAuthSession());
            localStorage.removeItem('persist:root');
            localStorage.clear();
            window.location.href = `${process.env.PUBLIC_URL}/`;  
            return toast.warn(Message.Response.Sessionout);
        }
        // return Promise.reject(error);
    }
);

export default axiosInstance;
