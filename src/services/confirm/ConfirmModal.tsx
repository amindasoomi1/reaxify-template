import { Button, Modal, Typography } from "reaxify/components";
import {
  ButtonVariant,
  Color,
  ToggleEventProps,
  ToggleProps,
} from "reaxify/types";
import { ConfirmConfig } from "./types";

type Props = Partial<ConfirmConfig> &
  Partial<Pick<ToggleEventProps, "onExited">> &
  ToggleProps;

export default function ConfirmModal({
  open,
  onClose,
  title,
  description,
  okButton,
  cancelButton,
  onOk,
  onCancel,
  onExited,
}: Props) {
  const buttonConfig = {
    title: title ?? "Confirm Action",
    description: description ?? "Are you sure you want to perform this action?",
    okButton: {
      title: "Yes",
      color: "danger" as Color,
      variant: "solid" as ButtonVariant,
      ...okButton,
    },
    cancelButton: {
      title: "No",
      color: "dark" as Color,
      variant: "solid" as ButtonVariant,
      ...cancelButton,
    },
  };
  const handleClose = () => {
    onClose()
    onCancel?.('Closed!')
  }
  const handleOk = () => {
    onClose()
    onOk?.()
  }
  const handleCancel = () => {
    onClose()
    onCancel?.('Canceled!')
  }
  return (
    <Modal open={open} onClose={handleClose} onExited={onExited}>
      <Modal.Dialog>
        <Modal.Body className="space-y-1">
          <Typography
            as="h6"
            variant="body-1"
            className="text-dark font-bold text-start"
          >
            {buttonConfig.title}
          </Typography>
          <Typography
            variant="body-2"
            className="text-gray-500 font-light text-start"
          >
            {buttonConfig.description}
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center gap-2 *:flex-1">
          <Button
            type="button"
            onClick={handleOk}
            color={buttonConfig.okButton.color}
            variant={buttonConfig.okButton.variant}
          >
            {buttonConfig.okButton.title}
          </Button>
          <Button
            autoFocus
            type="button"
            onClick={handleCancel}
            color={buttonConfig.cancelButton.color}
            variant={buttonConfig.cancelButton.variant}
          >
            {buttonConfig.cancelButton.title}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
