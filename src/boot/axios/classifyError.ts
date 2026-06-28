import { getAxiosHttpStatus } from "./getHttpStatus";

export type AxiosErrorKind =
  | { type: "status"; status: number }
  | { type: "offline" }
  | { type: "server_unreachable" }
  | { type: "unknown" };

export function classifyAxiosError(error: unknown): AxiosErrorKind {
  const status = getAxiosHttpStatus(error);
  if (status !== null) return { type: "status", status };

  // eslint-disable-next-line
  const err = error as any;
  const responseStatus = err?.response?.status;
  const requestStatus = err?.request?.status;

  if (responseStatus === 0 || requestStatus === 0) {
    return { type: "server_unreachable" };
  }

  if (err?.code !== "ERR_NETWORK") return { type: "server_unreachable" };
  if (!navigator?.onLine) return { type: "offline" };
  return { type: "unknown" };
}
