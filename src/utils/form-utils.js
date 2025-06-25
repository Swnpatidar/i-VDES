import moment from "moment";
import {
  alphaletter,
  alphaLetterWithnoSpaces,
  alphaletterwithtleadingspaces,
  alphaNumericLetterWithNoSpecialCharacter,
  EmailRegex,
  NumberRegex,
  PasswordRegex,
  PhoneNumberRegex,
} from "./regexValidation";

export const handleFormInput = (
  e,
  payload,
  formError = null,
  setFormError = null
) => {
  const { name, value } = e.target;
  if (!name || name.trim() === "") return payload;

  const updatedPayload = {
    ...payload,
    [name]: value,
  };

  // Perform validation ONLY if formError and setFormError are provided
  if (validationConfig[name] && formError && setFormError) {
    const { regex, message } = validationConfig[name];
    checkValidation(value, name, message, regex, formError, setFormError);
  }

  //only if confirmPassword field exists
  if (
    (name === "confirmPassword") &&
    formError &&
    setFormError &&
    updatedPayload.password &&
    !formError.password
  ) {
    if (updatedPayload.password !== updatedPayload.confirmPassword) {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: "The passwords you entered don’t match.",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: "", // Remove mismatch error if matched
      }));
    }
  }

  return updatedPayload;
};
// export const handleFormInput = (e, payload) => {
//   const { name, value } = e.target;
//   if (!name || name.trim() === "") return payload;
//   return {
//     ...payload,
//     [name]: value,
//   };
// };
export const handleFormNumericInput = (e, payload) => {
  return { ...payload, [e.target.name]: parseInt(e.target.value) };
};
export const handleFormRadio = (e, payload) => {
  return { ...payload, [e.target.name]: parseInt(e.target.value) };
};

export const handleFormCheckbox = (e, payload) => {
  return { ...payload, [e.target.name]: e.target.checked ? true : false };
};
export const handleDateChange = (e, payload) => {
  return {
    ...payload,
    [e.target.name]: moment(e.target.value).format("DD-MM-YYYY"),
  };
};
export const handleTimeChange = (e, payload) => {
  return { ...payload, [e.target.name]: parseInt(e.target.value) };
};
export const handleFormMultiSelect = (e, payload) => {
  let options = e.target.options,
    value = [];
  for (let i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      value.push(parseInt(options[i].value));
    }
  }
  return { ...payload, [e.target.name]: value };
};

export const onInputChange = (input) => {
  let { value, maxLength } = input.target;
  if (value.length > maxLength) {
    input.target.value = value.slice(0, maxLength);
  }
};
export const convertTimeToAmPm = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours12}:${formattedMinutes} ${period}`;
};
export const convertAppointmentTimeToAMPM = (startTime, endTime) => {
  function toAMPM(time) {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const adjustedHour = h % 12 || 12;
    return `${adjustedHour}:${minute} ${ampm}`;
  }
  return `${toAMPM(startTime)} - ${toAMPM(endTime)}`;
};
export const handleDateFormate = (row) => {
  const date = new Date(row);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
export const convertToInputDateFormat = (dateStr) => {
  // from "DD-MM-YYYY" to "YYYY-MM-DD"
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};
export const getFileExtension = (filename) =>
  filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
// export const renderImageSource = (path) => ["pdf", "doc", "docx"].includes(getFileExtension(path)) ? PDF_TABLE_IMG : path;
export const fileDownload = (imageUrl) => {
  window.open(imageUrl, "_blank");
};

export const ErrorMessage = {
  Name: "Name is mandatory!",
   Allfieldmandatory:"All fields are mandatory!",
 EmailandPassword :"Email and Password are mandatory!",
  Email: "Email is mandatory!",
  Password: "Password is mandatory!",
  Oldpassword:"Old password is mandatory!",
  NewPassword:"New password is mandatory!",
  ConfirmPassword: "Confirm Password is mandatory!",
  MatchPassword: "Please make sure the confirm password is the same as the new password.",
 
  EmailAlreadyRegistered:"This email is already registered.",
  OTP_mandatory:"OTP is mandatory!",
  Six_digit_OTP:"Please enter a 6-digit OTP.",
  
  Valid: {
    Name:"Name is invalid!",
    Email: "Email is invalid!",
    Password: "Password is invalid!",
    ConfirmPassword: "Confirm Password is Invalid",
    Password_Requirements:"Password must be at least 8 characters long and include at least one special character, symbol, uppercase letter, and number.",
  Invalid_Credentials:"Invalid credentials,Please check.",
   Singup_Required:"Invalid user,Please sign up.",
   Already_Logged_In:"You're already logged in." ,
     
  },
  Invalid: {
    Formate: "Format is not valid",
  },
};

export const checkValidation = (
  value,
  fieldName,
  errorMessage,
  regex,
  formError,
  setFormError
) => {
    console.log("fieldName",fieldName)
  const updatedError = { ...formError };

  let statusName = `${fieldName}Status`;
  if (value === "") {
    updatedError[fieldName] = "";
    updatedError[statusName] = false;
  } else if (!value.match(regex)) {
    updatedError[fieldName] = errorMessage;
    updatedError[statusName] = true;
  } else {
    updatedError[fieldName] = "";
    updatedError[statusName] = false;
  }
  setFormError(updatedError);
};

export const ErrorMsg = ({ error }) => {
  let errMsg = error ? error : "";
  let formatMsg =
    errMsg &&
    (errMsg.charAt(0).toUpperCase() + errMsg.slice(1))
      .replace(/[A-Z]/g, " $&")
      .trim();
  return <small className="error-message-style text-danger">{formatMsg}</small>;
};

export const hasValidationErrors = (formError) => {
  return Object.values(formError).some((err) => err !== "" && err !== false);
};
  //To check if all values are empty after trimming
export const isEmptyPayload = (payload = {}) => {
  return Object.values(payload).every(
    val => typeof val === "string" ? val.trim() === "" : !val
  );
};
// export const restrictInputByRegex = (regex) => {
//   return (e) => {
//     if (!regex.test(e.data)) {
//       e.preventDefault();
//     }
//   };
// };
// export const convertToPoints = (html) => {
//   const text = html?.replace(/<[^>]+>/g, ""); // Remove HTML tags
//   const points = text?.split(/\d+\.\s/).filter((item) => item?.trim() !== "");
//   return points;
// };

const validationConfig = {
    name: {
    regex: alphaletterwithtleadingspaces,
    message: ErrorMessage.Valid.Name,
  },
  firstName: {
    regex: alphaLetterWithnoSpaces,
    message: ErrorMessage.Valid.FirstName,
  },
  lastName: {
    regex: alphaLetterWithnoSpaces,
    message: ErrorMessage.Valid.LastName,
  },
  clinicName: { regex: alphaletter, message: ErrorMessage.Valid.Name },
  email: { regex: EmailRegex, message: ErrorMessage.Valid.Email },
  mobileNumber: {
    regex: PhoneNumberRegex,
    message: ErrorMessage.Valid.MobileNumber,
  },
  password: { regex: PasswordRegex, message: ErrorMessage.Valid.Password },
  oldPassword: { regex: PasswordRegex, message: ErrorMessage.Valid.Password },
  experiance: { regex: NumberRegex, message: ErrorMessage.Valid.Number },
  iban: {
    regex: alphaNumericLetterWithNoSpecialCharacter,
    message: ErrorMessage.Valid.Number,
  },
  bankName: { regex: alphaletter, message: ErrorMessage.Valid.Name },
  swiftBicCode: {
    regex: alphaNumericLetterWithNoSpecialCharacter,
    message: ErrorMessage.Valid.Number,
  },
  nationalId: {
    regex: alphaNumericLetterWithNoSpecialCharacter,
    message: ErrorMessage.Valid.Number,
  },
  sirenNo: {
    regex: alphaNumericLetterWithNoSpecialCharacter,
    message: ErrorMessage.Valid.Number,
  },
  // add other fields here as needed
};

