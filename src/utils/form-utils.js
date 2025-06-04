import moment from "moment";
import {
  alphaletter,
  alphaLetterWithnoSpaces,
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

  // Perform validation ONLY if formError and setFormError are provided
  if (validationConfig[name] && formError && setFormError) {
    const { regex, message } = validationConfig[name];
    checkValidation(value, name, message, regex, formError, setFormError);
  }

  return {
    ...payload,
    [name]: value,
  };
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
  Name: "Name is Mandatory",
  FirstName: "First Name is Invalid",
  LastName: "Last Name is Invalid",
  Email: "Email is Mandatory",
  Password: "Password is Mandatory",
  ConfirmPassword: "Confirm Password is Mandatory",
  PhoneNumber: "Phone Number is Mandatory",
  MobileNumber: "Mobile Number is Mandatory",
  UserId: "User Id is Mandatory",
  Captcha: "Captcha is Mandetroy",
  MatchPassword: "password and confirm password not matched",
  ApplicationCategory: "application Category is Mandatory",
  ApplicationSubCategory: "application Sub Category is Mandatory",
  Number: "number is Mandatory",
  Valid: {
    FirstName: "First Name is Invalid",
    LastName: "Last Name is Invalid",
    Name: "Name is Invalid",
    RoleName: "Role Name is Invalid",
    Email: "Email is Invalid",
    Password: "Password is Invalid",
    ConfirmPassword: "Confirm Password is Invalid",
    PhoneNumber: "Phone Number is Invalid",
    MobileNumber: "Mobile Number is Invalid",
    AlternateNumber: "Alternate Number is Invalid",
    UserId: "User Id is Invalid",
    Captcha: "Captcha is Invalid",
    Number: "number is Invalid",
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
  return <div className="error-message-style text-danger">{formatMsg}</div>;
};

export const hasValidationErrors = (formError) => {
  return Object.values(formError).some((err) => err !== "" && err !== false);
};

export const restrictInputByRegex = (regex) => {
  return (e) => {
    if (!regex.test(e.data)) {
      e.preventDefault();
    }
  };
};
export const convertToPoints = (html) => {
  const text = html?.replace(/<[^>]+>/g, ""); // Remove HTML tags
  const points = text?.split(/\d+\.\s/).filter((item) => item?.trim() !== "");
  return points;
};

const validationConfig = {
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
