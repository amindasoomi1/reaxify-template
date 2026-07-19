import { whoami } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { applyPwaUpdate, deferPwaUpdate, useRegisterSW } from "./register";
import UpdateDrawer from "./UpdateDrawer";

export default function Provider() {
  const needReload = useRegisterSW();
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleUpdate = useCallback(() => {
    setIsUpdating(true);
    applyPwaUpdate();
  }, []);
  const handleDefer = useCallback(() => {
    setOpen(false);
    deferPwaUpdate();
  }, []);

  useEffect(() => {
    if (!whoami.isWeb) return;
    setOpen(needReload);
  }, [needReload]);

  if (!whoami.isWeb) return null;
  return (
    <UpdateDrawer
      open={open}
      onClose={handleClose}
      onUpdate={handleUpdate}
      onDefer={handleDefer}
      isUpdating={isUpdating}
    />
  );
}
