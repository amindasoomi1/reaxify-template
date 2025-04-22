import { Rules } from "reaxify/types";

const required: Rules = [
  (val) => {
    return !!String(val ?? "").trim().length || "Field is required.";
  },
];
const emailRegex =
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email: Rules = [
  ...required,
  (val) => emailRegex.test(val) || "Email is not valid.",
];
const percent: Rules = [
  ...required,
  (val) =>
    (Number(val) > 0 && Number(val) <= 100) ||
    "Percent should be between 0 and 100.",
];
const verifyCode: Rules = [
  ...required,
  (val) => val.length === 6 || "Please enter a valid 6-digit code.",
];

const rules = {
  required,
  email,
  percent,
  verifyCode,
};
export default rules;
