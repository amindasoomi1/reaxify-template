import { ComponentProps, useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

type Props = Omit<ComponentProps<typeof ConfirmModal>, "open" | "onClose">;

export default function ConfirmModalHandler(props: Props) {
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  useEffect(() => {
    showModal();
  }, []);
  return <ConfirmModal open={open} onClose={closeModal} {...props} />;
}
