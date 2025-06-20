import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { secretCodeAES } from "./app-constants";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import { DNA } from "react-loader-spinner";
import { useEffect } from "react";
export const toastEmitter = (type = "info", message = "") => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      break;
    case "warn":
      toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      break;
    case "info":
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      break;
    default:
      toast(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      break;
  }
};

export const encryptJSONtoAES = (str) => {
  if (!str) return false;
  return CryptoJS.AES.encrypt(JSON.stringify(str), secretCodeAES).toString();
};

export const decryptAEStoJSON = (str) => {
  if (!str) return false;
  // const bytes = CryptoJS.AES.decrypt(str, secretCodeAES);
  // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
   try {
    const bytes = CryptoJS.AES.decrypt(str, secretCodeAES);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      // If decrypted text is empty, return false or null to avoid JSON.parse error
      return false;
    }

    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Failed to decrypt or parse JSON:", error);
    return false; // fallback to false on error
  }
};

export const encryptStringtoAES = (str) => {
  if (!str) return false;
  return CryptoJS.AES.encrypt(str.toString(), secretCodeAES).toString();
};

export const decryptAEStoString = (str) => {
  if (!str) return false;
  const bytes = CryptoJS.AES.decrypt(str, secretCodeAES);
  return bytes.toString(CryptoJS.enc.Utf8);
};



export const modifyTableDate = (str) => {
  if (!str) return false;
  return new Date(str).toLocaleString();
};

export const downloadFile = (filetype, response, filename) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${filename}-${new Date().getTime()}.${filetype}`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
};
const newLocal_1 = (date) => {
  let objectDate = new Date(date);
  let day =
    objectDate.getDate() < 10
      ? "0" + objectDate.getDate()
      : objectDate.getDate();
  let month =
    objectDate.getMonth() + 1 < 10
      ? "0" + (objectDate.getMonth() + 1)
      : objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();
  return month + "-" + day + "-" + year;
};
export const dateFormat = newLocal_1;

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};
export const validateRegex = (field, regex, regex2) => {
  if (regex?.test(field) || regex2?.test(field)) return true;
  return false;
};
export const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
  "image/svg",
  "image/pdf",
];
export const allowedSizes = 5249980;
export const allowedVideoTypes = [
  'video/mp4', 'video/mov', 'video/avi'
];
export const allowedVideoSizes = 52428800;


export const LoaderSpinner = () => {
  return (
    <>
      <div
        // style={{ height: "50vh" }}
        className="set-center"
      >
        <div>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperclassName="dna-wrapper"
          />
        </div>
      </div>
    </>
  );
};



let logoutTimer;

const useIdleLogout = (callback, timeout = 20 * 60 * 1000) => {
  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(callback, timeout);
    };

    // Attach event listeners
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Start initial timer
    logoutTimer = setTimeout(callback, timeout);

    // Cleanup on unmount
    return () => {
      clearTimeout(logoutTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [callback, timeout]);
};

export default useIdleLogout;

