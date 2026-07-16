import { whoami } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import {
  applyPwaUpdate,
  deferPwaUpdate,
  isNeedRefreshPending,
  subscribePwaNeedRefresh,
} from "./register";
import UpdateModal from "./UpdateModal";

export default function Provider() {
  const [open, setOpen] = useState(isNeedRefreshPending);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(async () => {
    setIsUpdating(true);
    await applyPwaUpdate();
  }, []);

  const handleDefer = useCallback(() => {
    deferPwaUpdate();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!whoami.isWeb) return;
    return subscribePwaNeedRefresh(() => setOpen(true));
  }, []);

  if (!whoami.isWeb) return null;
  return (
    <UpdateModal
      open={open}
      onClose={() => setOpen(false)}
      onUpdate={handleUpdate}
      onDefer={handleDefer}
      isUpdating={isUpdating}
    />
  );
}
