import { useEffect, useState } from "react";
// eslint-disable-next-line
// @ts-expect-error
import { registerSW } from "virtual:pwa-register";

let updateSWFn: (() => Promise<void>) | null = null;
const updateDeferredKey = "pwa-update-deferred";

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
  sessionStorage.setItem(updateDeferredKey, "true");
}

export function useRegisterSW() {
  const [needReload, setNeedReload] = useState(false);
  useEffect(() => {
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        const isDeferred = sessionStorage.getItem(updateDeferredKey);
        if (isDeferred) return
        setNeedReload(true);
      },
      onOfflineReady() {
        console.log("App ready to work offline");
      },
    })
    updateSWFn = async () => await updateSW?.(true);
  }, [])
  return needReload
}
