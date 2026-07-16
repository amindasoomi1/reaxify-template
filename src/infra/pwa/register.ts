// eslint-disable-next-line
// @ts-expect-error
import { registerSW } from "virtual:pwa-register";
import { PWA_UPDATE_DEFERRED_KEY } from "./constants";

type Listener = () => void;

const listeners = new Set<Listener>();
let updateSWFn: ((reload?: boolean) => Promise<void>) | null = null;

export function registerPwa() {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      if (localStorage.getItem(PWA_UPDATE_DEFERRED_KEY)) {
        localStorage.removeItem(PWA_UPDATE_DEFERRED_KEY);
        void updateSW(true);
        return;
      }
      listeners.forEach((fn) => fn());
    },
    onOfflineReady() {
      console.log("App ready to work offline");
    },
  });

  updateSWFn = updateSW;
}

export function applyPwaUpdate() {
  void updateSWFn?.(true);
}

export function deferPwaUpdate() {
  localStorage.setItem(PWA_UPDATE_DEFERRED_KEY, "1");
}

export function subscribePwaNeedRefresh(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
