import { lowerFirst, mapKeys } from "lodash";

// eslint-disable-next-line
export function normalizeKeys(obj: Record<string, any> | null) {
  return mapKeys(obj ?? {}, (_, key) =>
    /^[A-Z]/.test(key) ? lowerFirst(key) : key,
  ) as object;
}
