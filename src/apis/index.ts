import { QueryClient, QueryKey } from "@tanstack/react-query";
import { isArray, isObject } from "lodash";
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

export function syncList<TList, TDetail>(
  listKey: QueryKey,
  newItem: TDetail,
  matchKeys: (keyof TDetail)[]
) {
  queryClient.setQueriesData<TList>({ queryKey: listKey }, (old) => {
    if (!old) return old;

    // eslint-disable-next-line
    const shouldUpdate = (item: any) =>
      matchKeys.every((key) => item[key] === newItem[key]);

    if (Array.isArray(old)) {
      return old.map((item) => (shouldUpdate(item) ? newItem : item));
    }
    // eslint-disable-next-line
    // @ts-ignore
    if (isObject(old) && "items" in old && isArray(old.items)) {
      return {
        ...old,
        items: old.items.map((item) => (shouldUpdate(item) ? newItem : item)),
        // eslint-disable-next-line
      } as any;
    }
    return shouldUpdate(old) ? newItem : old;
  });
}

export function syncDetail<TDetail>(
  detailKey: QueryKey,
  newItem: TDetail,
  updater?: (old: TDetail | undefined, item: TDetail) => TDetail
) {
  queryClient.setQueryData<TDetail>(detailKey, (old) =>
    updater ? updater(old, newItem) : newItem
  );
}

export * as auth from "./auth";
