import { Rules } from "react-form-rules";

export const required: Rules = [
  (val) => {
    return !!String(val ?? "").trim().length || "Field is required.";
  },
];
export const emailRegex =
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const email: Rules = [
  (val) => emailRegex.test(val) || "Email is not valid.",
];
export const percent: Rules = [
  (val) =>
    (Number(val) > 0 && Number(val) <= 100) ||
    "Percent should be between 0 and 100.",
];
export const verifyCode: Rules = [
  (val) => val.length === 6 || "Please enter a valid 6-digit code.",
];
