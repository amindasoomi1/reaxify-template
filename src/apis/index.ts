import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchInterval: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      // eslint-disable-next-line
      retry: (failureCount, error: any) => {
        const status = error?.response?.status;
        const retryStatuses = [500, 503, 409];
        if (!retryStatuses.includes(status)) return false;
        return failureCount < 4;
      },
      retryDelay: 500,
      // eslint-disable-next-line
      throwOnError: (error: any) => {
        const status = error?.response?.status;
        const retryStatuses = [500, 503];
        console.log(error);
        if (!retryStatuses.includes(status)) return false;
        return true;
      },
    },
    mutations: {
      // eslint-disable-next-line
      onError: (error: any) => {
        const defaultMessage = "An error occurred!";
        const message = error?.response?.data?.details;
        toast.error(message || defaultMessage);
        return true;
      },
    },
  },
});

export * as auth from "./auth";
