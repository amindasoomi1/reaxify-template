import { appConfig } from "@/constants";
import { Button, Modal, Typography } from "reaxify/components";
import { ToggleProps } from "reaxify/types";

type Props = ToggleProps & {
  onUpdate: () => void | Promise<void>;
  onDefer: () => void;
  isUpdating?: boolean;
};

export default function UpdateDrawer({
  open,
  onClose,
  onUpdate,
  onDefer,
  isUpdating = false,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={isUpdating ? () => {} : onClose}
      draggable={!isUpdating}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Typography variant="heading-6" className="font-semibold text-dark">
            New version available
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-1">
          <Typography variant="body-2" className="text-gray-600">
            Current version:{" "}
            <span className="font-iransans-en">{appConfig.version}</span>
          </Typography>
          <Typography variant="body-2" className="text-gray-600">
            A new version is available on the server. Would you like to update
            now?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex gap-2 pb-4">
          <Button
            type="button"
            variant="solid"
            color="primary"
            onClick={onUpdate}
            loading={isUpdating}
            disabled={isUpdating}
            className="flex-1 text-sm font-normal"
          >
            Yes, update
          </Button>
          <Button
            type="button"
            variant="solid"
            color="dark"
            onClick={onDefer}
            disabled={isUpdating}
            className="flex-1 text-sm font-normal"
          >
            Later
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
