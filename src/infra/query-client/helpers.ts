import {
  InvalidateOptions,
  QueryFilters,
  QueryKey,
} from "@tanstack/react-query";
import { cloneDeep, findIndex, has, isArray, isObject, set } from "lodash";
import queryClient from "./queryClient";

export function syncList<TList, TDetail>(
  listKey: QueryKey,
  newItem: TDetail,
  matchKeys: (keyof TDetail)[],
) {
  queryClient.setQueriesData<TList>({ queryKey: listKey }, (old) => {
    if (!old) return old;
    // eslint-disable-next-line
    const shouldUpdate = (item: any) =>
      matchKeys.every((key) => item[key] === newItem[key]);

    if (Array.isArray(old)) {
      const cloned = cloneDeep(old);
      const index = findIndex(cloned, (item) => shouldUpdate(item));
      if (has(cloned, index)) cloned[index] = newItem;
      return cloned;
    }
    // eslint-disable-next-line
    // @ts-ignore
    if (isObject(old) && "items" in old && isArray(old.items)) {
      const cloned = cloneDeep(old);
      // eslint-disable-next-line
      // @ts-ignore
      const index = findIndex(cloned.items, (item) => shouldUpdate(item));
      const path = `items.${index}`;
      if (has(cloned, path)) set(cloned, path, newItem);
      return cloned;
    }
    // eslint-disable-next-line
    // @ts-ignore
    if (isObject(old) && "pages" in old && isArray(old.pages)) {
      const cloned = cloneDeep(old);
      // eslint-disable-next-line
      // @ts-ignore
      const pageIndex = findIndex(cloned.pages, (item) =>
        // eslint-disable-next-line
        // @ts-ignore
        item.items.some((item) => shouldUpdate(item)),
      );

      // eslint-disable-next-line
      // @ts-ignore
      const itemIndex = findIndex(cloned.pages[pageIndex]?.items, (item) =>
        shouldUpdate(item),
      );

      const path = `pages.${pageIndex}.items.${itemIndex}`;
      if (has(cloned, path)) {
        set(cloned, path, newItem);
        return cloned;
      }
    }
    return old;
  });
}

export function syncDetails<TDetail>(
  detailKey: QueryKey,
  newItem: TDetail,
  updater?: (old: TDetail | undefined, item: TDetail) => TDetail,
) {
  queryClient.setQueryData<TDetail>(detailKey, (old) =>
    updater ? updater(old, newItem) : newItem,
  );
}

export async function invalidateQueries(
  queryKey: QueryKey,
  options?: InvalidateOptions,
) {
  await queryClient.invalidateQueries({ queryKey, type: "all", ...options });
}
export async function removeQueries(
  queryKey: QueryKey,
  options?: QueryFilters,
) {
  queryClient.removeQueries({ queryKey, type: "all", ...options });
}
export function clearQueriesExcept(keepQueryKeys: QueryKey[]) {
  queryClient.removeQueries({
    predicate: (query) => {
      return !keepQueryKeys.some((keepKey) => {
        if (keepKey.length !== query.queryKey.length) return false;
        return keepKey.every((part, index) => part === query.queryKey[index]);
      });
    },
  });
}
export async function clearQueries() {
  queryClient.clear();
}
