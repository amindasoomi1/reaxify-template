import { Icon } from "@/components";
import { appConfig } from "@/constants";
import {
  Avatar,
  Button,
  Fill,
  Modal,
  Stack,
  Typography,
} from "reaxify/components";
import { ToggleProps } from "reaxify/types";

type Props = ToggleProps & {
  onUpdate: () => void | Promise<void>;
  onDefer: () => void;
  isUpdating?: boolean;
};

export default function UpdateModal({
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
      preventClose={isUpdating}
    >
      <Modal.Dialog>
        <Modal.Body className="space-y-4">
          <Stack className="items-start gap-3">
            <Avatar className="bg-light-primary">
              <Avatar.Fallback>
                <Icon name="Refresh" className="text-primary" />
              </Avatar.Fallback>
            </Avatar>
            <Fill className="space-y-1">
              <Typography
                as="h6"
                variant="body-1"
                className="text-start font-bold text-dark"
              >
                Update available
              </Typography>
              <Typography
                variant="body-2"
                className="text-start font-light text-gray-500"
              >
                A newer version of the app is ready. Update now to get the
                latest features and fixes.
              </Typography>
            </Fill>
          </Stack>

          <Typography
            variant="body-2"
            className="rounded-lg bg-gray-50 px-3 py-2.5 text-gray-500"
          >
            Current version{" "}
            <span className="font-medium tabular-nums text-dark">
              {appConfig.version}
            </span>
          </Typography>

          {isUpdating && (
            <Typography variant="body-2" className="text-center text-gray-500">
              Applying update — the page will reload shortly.
            </Typography>
          )}
        </Modal.Body>
        <Modal.Footer className="flex items-center gap-2 *:flex-1">
          <Button
            autoFocus
            type="button"
            variant="solid"
            color="primary"
            onClick={onUpdate}
            loading={isUpdating}
            disabled={isUpdating}
          >
            Update now
          </Button>
          <Button
            type="button"
            variant="solid"
            color="dark"
            onClick={onDefer}
            disabled={isUpdating}
          >
            Later
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
