import { auth } from "@/apis";
import { appConfig } from "@/constants";
import { getToken } from "@/helpers";
import initAxios, { InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { wait } from "reaxify/helpers";

type Meta = {
  id: string;
  cancelDuplicated: boolean;
  cancelOnUnmount: boolean;
};
declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: Partial<Meta>;
  }
}

const cancelMessage = "Canceled!";

const allControllers = new Map<string, AbortController>();
const pendingRequests = new Map<string, AbortController>();
const retryCounts = new Map<string, number>();
const retryStatuses = [401, 500, 503];

const retry = true;
const retryMaxCount = 5;
const retryDelay = 0;

const canRetry = (status: number, id: string) => {
  if (!retry) return false;
  const retryCount = retryCounts.get(id) ?? 0;
  if (retryCount >= retryMaxCount) return false;
  if (!retryStatuses.includes(status)) return false;
  return true;
};
const handleSetCancelDuplicated = (request: InternalAxiosRequestConfig) => {
  const { id, cancelDuplicated, cancelOnUnmount } = request.meta ?? {};
  if (!cancelDuplicated && !cancelOnUnmount) return request;
  const key = id ?? "";
  const controller = new AbortController();
  if (cancelDuplicated && pendingRequests.has(key)) {
    pendingRequests.get(key)?.abort(cancelMessage);
  }
  if (cancelDuplicated || cancelOnUnmount) {
    request.signal = controller.signal;
  }
  if (cancelDuplicated) pendingRequests.set(key, controller);
  if (cancelOnUnmount) allControllers.set(key, controller);
  return request;
};
const handleDeleteCancelDuplicated = (config: InternalAxiosRequestConfig) => {
  const key = config.meta?.id ?? "";
  pendingRequests.delete(key);
};
const beforeRetryHandler = async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token.accessToken}`);
  }
  return config;
};
const incrementRetryCount = (config: InternalAxiosRequestConfig) => {
  const key = config.meta?.id ?? "";
  const count = retryCounts.get(key) ?? 0;
  retryCounts.set(key, count + 1);
};
const resetRetryCount = (config: InternalAxiosRequestConfig) => {
  const key = config.meta?.id ?? "";
  retryCounts.set(key, 0);
};

const axios = initAxios.create({
  baseURL: `${appConfig.baseUrl}/api`,
});

axios.interceptors.request.use(
  (request) => {
    request.meta ||= {};
    request.meta.id ??= `${request.method}-${request.url}`;
    request.meta.cancelOnUnmount ??= true;
    request.meta.cancelDuplicated ??= true;
    const handledRequest = handleSetCancelDuplicated(request);
    return handledRequest;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const isCanceled = [
      error?.code === "ERR_CANCELED",
      error?.config?.signal?.reason === cancelMessage,
    ].some(Boolean);
    const isUnauthorized = error?.response?.status === 401;
    const status = error?.response?.status ?? 0;
    if (!isCanceled && canRetry(status, error?.config?.meta?.id)) {
      if (retryDelay) await wait(retryDelay);
      const handledRequest = await beforeRetryHandler(error?.config);
      incrementRetryCount(error?.config);
      return axios.request(handledRequest);
    }
    if (!isCanceled) handleDeleteCancelDuplicated(error?.config);
    if (!isCanceled && !isUnauthorized)
      toast.error(error?.response?.data?.details);
    if (isUnauthorized) await auth.logout();
    resetRetryCount(error?.config);
    return Promise.reject(error);
  }
);

export default axios;
