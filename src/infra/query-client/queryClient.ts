import { getAxiosHttpStatus, toastAxiosError } from "@/boot";
import { QueryClient } from "@tanstack/react-query";
import config from "./config";
import { setupBroadcastQueryClient } from "./setupBroadcastQueryClient";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.staleTime,
      refetchInterval: config.refetchInterval,
      refetchOnWindowFocus: config.refetchOnWindowFocus,
      refetchOnReconnect: config.refetchOnReconnect,
      refetchOnMount: config.refetchOnMount,
      // eslint-disable-next-line
      retry: (failureCount, error: any) => {
        const status = getAxiosHttpStatus(error);
        if (
          status === null ||
          !(config.retry.statuses as readonly number[]).includes(status)
        )
          return false;
        return failureCount < config.retry.maxFailureCount;
      },
      retryDelay: config.retry.delay,
      // eslint-disable-next-line
      throwOnError: (error: any) => {
        const isNetworkError = error?.code === "ERR_NETWORK";
        const status = getAxiosHttpStatus(error);
        if (
          isNetworkError ||
          (status !== null &&
            (config.throwErrorStatuses as readonly number[]).includes(status))
        )
          return true;
        toastAxiosError(error);
        return false;
      },
    },
    mutations: {
      // eslint-disable-next-line
      retry: (failureCount, error: any) => {
        const status = getAxiosHttpStatus(error);
        if (
          status === null ||
          !(config.retry.statuses as readonly number[]).includes(status)
        )
          return false;
        return failureCount < config.retry.maxFailureCount;
      },
      retryDelay: config.retry.delay,
      // eslint-disable-next-line
      onError: (error: any) => {
        toastAxiosError(error);
        return true;
      },
    },
  },
});

setupBroadcastQueryClient(queryClient);

export default queryClient;
