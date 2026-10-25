import { auth } from "@/apis";
import appConfig from "@/constants/appConfig";
import { clearCacheData } from "@/helpers";
import { useTokenStore } from "@/stores";
import initAxios from "axios";

type Meta = {
  id: string;
};
declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: Partial<Meta>;
    _retry?: boolean;
  }
}

const axios = initAxios.create({
  baseURL: `${appConfig.baseUrl}/api`,
});

// Shared across concurrent 401s so only one refresh request is sent
let refreshPromise: ReturnType<typeof auth.refreshToken> | null = null;

axios.interceptors.request.use(
  (request) => {
    request.meta ||= {};
    request.meta.id ??= `${request.method}-${request.url}`;
    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401 && error.config && !error.config._retry) {
      error.config._retry = true;
      refreshPromise ??= auth.refreshToken().finally(() => {
        refreshPromise = null;
      });
      const token = await refreshPromise;
      if (token) {
        error.config.headers.set(
          "Authorization",
          `Bearer ${token.accessToken}`,
        );
        return axios.request(error.config);
      }
      clearCacheData();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axios;
