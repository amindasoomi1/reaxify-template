// eslint-disable-next-line
// @ts-expect-error
import { registerSW } from "virtual:pwa-register";

let needReload = false;
let updateSWFn: (() => Promise<void>) | null = null;
const listeners = new Set<VoidFunction>()
const updateDeferredKey = "pwa-update-deferred";

export function registerServiceWorker() {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      const isDeferred = sessionStorage.getItem(updateDeferredKey);
      if (isDeferred) return
      needReload = true
      listeners.forEach(fn => fn());
    },
    onOfflineReady() {
      console.log("App ready to work offline");
    },
  })
  updateSWFn = async () => await updateSW?.(true);
}

export async function applyPwaUpdate() {
  if (!updateSWFn) return;
  try {
    await updateSWFn?.();
  } catch {
    window.location.reload();
  }
  sessionStorage.removeItem(updateDeferredKey)
}

export function deferPwaUpdate() {
  needReload = false
  sessionStorage.setItem(updateDeferredKey, "true");
  listeners.forEach(fn => fn());
}

export const serviceWorkerStore = {
  get: () => {
    return needReload;
  },
  subscribe: (fn: VoidFunction) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
}
