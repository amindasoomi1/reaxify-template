import { errorCodes } from "@/constants";
import toast from "react-hot-toast";
import { getAxiosHttpStatus } from "./getHttpStatus";

function getStatusMessage(
  // eslint-disable-next-line
  error: any,
) {
  const status = getAxiosHttpStatus(error);
  if (status === null) return null;

  switch (status) {
    case 400:
      return "Request is invalid. Please check the information entered.";
    case 401:
      return "Please login to your account first.";
    case 403:
      return "You do not have permission to access this section.";
    case 404:
      return "The information you are looking for was not found.";
    case 429:
      return "The number of requests is too high. Please wait a moment.";
    case 500:
      return "A server error occurred. Please try again later.";
    case 502:
      return "The server is temporarily unavailable. Please wait a moment.";
    default:
      return null;
  }
}
function getErrorMessages(
  // eslint-disable-next-line
  error: any,
) {
  const details =
    error?.response?.data?.detail || error?.response?.data?.errors || null;
  if (!details) return null;
  if (typeof details === "string") return [details].filter(Boolean) as string[];
  if (typeof details === "object")
    return Object.values(details).filter(Boolean) as string[];
  return null;
}

export default function toastAxiosError(
  // eslint-disable-next-line
  error: any,
) {
  const defaultMessage = "Please wait! Something is not right.";
  if (!error) return toast.error(defaultMessage);
  const errorMessages = getErrorMessages(error);
  if (errorMessages)
    return errorMessages.forEach((code) => {
      const message = errorCodes[code] || code;
      toast.error(message);
    });
  const statusMessage = getStatusMessage(error);
  if (statusMessage) return toast.error(statusMessage);
  return toast.error(defaultMessage);
}
