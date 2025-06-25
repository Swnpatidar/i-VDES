export const EmailRegex =
  /^(([^<>()[\]\\.,;:!\s@"]+(\.[^<>()[\]\\.,;:!\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PhoneNumberRegex = /^[4-9][0-9]{9}$/;
export const PasswordRegex =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
export const LinkValidationRegex =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
export const alphaletter = /^(?! )[a-zA-Z\u0900-\u097F]+(?: [a-zA-Z\u0900-\u097F]+)*$/;
export const alphaletterwithtleadingspaces=/^(?!\s)[a-zA-Z\u0900-\u097F\s]+$/;
export const alphaLetterWithnoSpaces = /^[a-zA-Z\u0900-\u097F]+$/;
export const alphaletterwithApostrophe =
  /^(?!\s)[a-zA-Z ]+('[a-zA-Z ])?[a-zA-Z ]*$|^(?!\s)[\u0900-\u097F ]*$/;
export const noWhiteSpace = /^(?!\s)/;
export const alphaLetterWithHypen =
  /^[ A-Za-z\-_']*$|^(?!\s)[ \u0900-\u097F\-_']*$/;
export const alphaWoutSpeChar =
  /^([ A-Za-z\-_']+\s?)*$|^((?!\s)[\u0900-\u097F\-_']+\s?)*$/;
export const alphaWoutSpeCharCommaWithAndHypen = /^([A-Za-z,-_']+\s?)*$/;
export const alphaWithAndOperator =
  /^[ .&a-z A-Z,-]+$|^(?!\s)[ .&\u0900-\u097F,-]+$/;
export const alphaNumericletter = /^(?!\s)[0-9\-_'][a-zA-Z ]*$/;
export const alphaNumericLetterWithNoSpecialCharacter = /^(?!\s)[a-zA-Z0-9 ]*$/;

export const REGEX = {
  alphaNumericOnly: /^[a-zA-Z0-9]+$/,
  // ✅ For character-level filtering (onBeforeInput)
  charLevelAlphaNumeric: /^[a-zA-Z0-9]$/,
};
export const NumWoutSpeChar = /^([0-9\-_']+\s?)*$/;
export const alphaWithCompulsaryNumberRexExp =
  /[^\w\d]*(([A-Za-z]+.*[A-Za-z0-9,_']+.*)|[A-Za-z0-9,_']+.*([A-Za-z]+.*))|^(?!\s)[\u0900-\u097F ]*$/;
export const alphaNumericWithNumberRexExp = /^[A-Za-z0-9]+([.][0-9]+)?$/;
export const pinCodeRegExp = /^.{6,}$/;
export const MultiSixDigitRegex = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;
export const stdCodeRegExp = /^.{3,}$/;
export const aadhaarRegExp = /^\d{12}$/;
export const panRegExp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export const NumberWithDecimalRegex = /^[0-9]+([.][0-9]+)?$/;
export const NumberRegex = /^[0-9]*$/;
export const DecimalNumberRegex = /^[1-9]\d*(\.\d+)?$/;
export const alphanumericHypenRegex =
  /^[a-z0-9]+([-\s]{1}[a-z0-9]+)*$|^(?!\s)([ \u0900-\u097F,-]+)*$/i;
export const alphaWoutSpeCharComma =
  /^([ A-Za-z,_']+\s?)*$|^(?!\s)([ \u0900-\u097F,_']+\s?)*$/;
export const latValidation =
  /^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?[0-8]\d((\.)|\.\d{1,6})?)|(0*?90((\.)|\.0{1,6})?))$/;
export const longValidation =
  /^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?\d\d((\.)|\.\d{1,6})?)|(0*?1[0-7]\d((\.)|\.\d{1,6})?)|(0*?180((\.)|\.0{1,6})?))$/;
export const RatingRegex = /^([1-4]|5)$/;
export const NumericRange1to100Regex = /^[0-9][0-9]?$|^100$/;
export const NumericTempRangeRegex =
  /^(-10|-[1-9]|[0-5]?[0-9]|60)([ ])?-([ ])?(([(])?-10([)])?|-([(])?[1-9]([)])?|[[0-5]?[0-9]|60)$/;
export const HexRegex = /^#[a-fA-F0-9]{6}$/;
export const NoLeadingSpaceRegex = /^(?!\s).*/;
