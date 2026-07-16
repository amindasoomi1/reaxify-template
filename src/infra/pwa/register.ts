// eslint-disable-next-line
// @ts-expect-error
import { registerSW } from "virtual:pwa-register";
import { PWA_UPDATE_DEFERRED_KEY } from "./constants";

type Listener = () => void;

const listeners = new Set<Listener>();
let updateSWFn: ((reload?: boolean) => Promise<void>) | null = null;
let needRefreshPending = false;
let reloadFallbackTimer: ReturnType<typeof setTimeout> | null = null;

function notifyNeedRefresh() {
  needRefreshPending = true;
  listeners.forEach((fn) => fn());
}

function clearReloadFallback() {
  if (reloadFallbackTimer) {
    clearTimeout(reloadFallbackTimer);
    reloadFallbackTimer = null;
  }
}

function scheduleReloadFallback() {
  clearReloadFallback();
  reloadFallbackTimer = setTimeout(() => {
    window.location.reload();
  }, 2500);
}

export function registerPwa() {
  const updateSW = registerSW({
    immediate: true,
    onNeedReload() {
      clearReloadFallback();
      window.location.reload();
    },
    onNeedRefresh() {
      if (localStorage.getItem(PWA_UPDATE_DEFERRED_KEY)) {
        localStorage.removeItem(PWA_UPDATE_DEFERRED_KEY);
        void applyPwaUpdate();
        return;
      }
      notifyNeedRefresh();
    },
    onOfflineReady() {
      console.log("App ready to work offline");
    },
  });

  updateSWFn = updateSW;
}

export function isNeedRefreshPending() {
  return needRefreshPending;
}

export async function applyPwaUpdate() {
  if (!updateSWFn) return;

  needRefreshPending = false;
  scheduleReloadFallback();

  try {
    await updateSWFn(true);
  } catch {
    clearReloadFallback();
    window.location.reload();
  }
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
