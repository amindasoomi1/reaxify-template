import { randomID } from "reaxify/helpers";
import { ConfirmConfig, ConfirmItem, ConfirmResolve } from "./types";

let confirms: ConfirmItem[] = [];
const confirmListeners = new Set<VoidFunction>();

export const confirmStore = {
  get() {
    return confirms;
  },
  set(config: ConfirmConfig) {
    const id = randomID();
    confirms = [...confirms, { ...config, id }];
    confirmListeners.forEach((listener) => listener());
  },
  delete(id: string) {
    confirms = confirms.filter((e) => e.id !== id);
    confirmListeners.forEach((listener) => listener());
  },
  subscribe(cb: VoidFunction) {
    confirmListeners.add(cb);
    return () => {
      confirmListeners.delete(cb);
    };
  },
};

export function confirm(config: Omit<ConfirmConfig, "onOk" | "onCancel"> = {}) {
  return new Promise<ConfirmResolve>((resolve) => {
    confirmStore.set({
      ...config,
      onOk: () => resolve({ confirmed: true, reason: "confirmed" }),
      onCancel: (reason) => resolve({ confirmed: false, reason }),
    });
  });
}
