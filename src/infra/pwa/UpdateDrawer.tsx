import { appConfig } from "@/constants";
import { Button, Modal, Typography } from "reaxify/components";
import { ToggleProps } from "reaxify/types";

type Props = ToggleProps & {
  onUpdate: () => void;
  onDefer: () => void;
};

export default function UpdateDrawer({
  open,
  onClose,
  onUpdate,
  onDefer,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Dialog>
        <Modal.Header>
          <Typography variant="heading-6" className="font-semibold text-dark">
            نسخه جدید موجود است
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-1">
          <Typography variant="body-2" className="text-gray-600">
            نسخه فعلی:{" "}
            <span className="font-iransans-en">{appConfig.version}</span>
          </Typography>
          <Typography variant="body-2" className="text-gray-600">
            نسخه جدیدی روی سرور قرار گرفته. می‌خواهید الان به‌روزرسانی کنید؟
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex gap-2 pb-4">
          <Button
            type="button"
            variant="solid"
            color="primary"
            onClick={onUpdate}
            className="flex-1 text-sm font-normal"
            closeDrawer
          >
            بله، به‌روزرسانی
          </Button>
          <Button
            type="button"
            variant="solid"
            color="dark"
            onClick={onDefer}
            className="flex-1 text-sm font-normal"
            closeDrawer
          >
            بعداً
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
