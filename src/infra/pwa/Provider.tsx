import { whoami } from "@/constants";
import { useEffect, useState } from "react";
import {
  applyPwaUpdate,
  deferPwaUpdate,
  subscribePwaNeedRefresh,
} from "./register";
import UpdateDrawer from "./UpdateDrawer";

export default function Provider() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!whoami.isWeb) return;
    return subscribePwaNeedRefresh(() => setOpen(true));
  }, []);

  if (!whoami.isWeb) return null;
  return (
    <UpdateDrawer
      open={open}
      onClose={() => setOpen(false)}
      onUpdate={applyPwaUpdate}
      onDefer={deferPwaUpdate}
    />
  );
}
