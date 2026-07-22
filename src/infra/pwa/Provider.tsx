import { whoami } from "@/constants";
import { useCallback, useState, useSyncExternalStore } from "react";
import { applyPwaUpdate, deferPwaUpdate, serviceWorkerStore } from "./register";
import UpdateModal from "./UpdateModal";

export default function Provider() {
  const needReload = useSyncExternalStore(
    serviceWorkerStore.subscribe,
    serviceWorkerStore.get,
    () => false,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsUpdating(true);
    applyPwaUpdate();
  }, []);
  const handleDefer = useCallback(() => {
    deferPwaUpdate();
  }, []);

  if (!whoami.isWeb) return null;
  return (
    <UpdateModal
      open={needReload}
      onClose={handleDefer}
      onUpdate={handleUpdate}
      isUpdating={isUpdating}
    />
  );
}
