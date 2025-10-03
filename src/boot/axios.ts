import { auth } from "@/apis";
import { appConfig } from "@/constants";
import { getToken } from "@/helpers";
import initAxios, { InternalAxiosRequestConfig } from "axios";

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
  (response) => response,
  async (error) => {
    const isCanceled =
      error?.code === "ERR_CANCELED" ||
      error?.config?.signal?.reason === cancelMessage;
    if (isCanceled) return Promise.reject(error);
    const status = error?.response?.status;
    if (status === 401) {
      const token = await getToken();
      if (token) {
        error.config.headers.set(
          "Authorization",
          `Bearer ${token.accessToken}`
        );
        return axios.request(error.config);
      }
      await auth.logout();
      return Promise.reject(error);
    }
    handleDeleteCancelDuplicated(error?.config);
    return Promise.reject(error);
  }
);

export default axios;
