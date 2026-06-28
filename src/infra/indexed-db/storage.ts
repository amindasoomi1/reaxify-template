import { clear, createStore, del, get, keys, set } from "idb-keyval";
import config from "./config";

const store = createStore(config.dbName, config.storeName);

export const idbStorage = {
  get<T>(key: string) {
    return get<T>(key, store);
  },
  set(key: string, value: unknown) {
    return set(key, value, store);
  },
  remove(key: string) {
    return del(key, store);
  },
  clear() {
    return clear(store);
  },
  keys() {
    return keys(store);
  },
};
