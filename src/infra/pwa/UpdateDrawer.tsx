import { Drawer } from "@/components";
import { appConfig } from "@/constants";
import { Button, Typography } from "reaxify/components";
import { ToggleProps } from "reaxify/types";

type Props = ToggleProps & {
  onUpdate: VoidFunction;
  onDefer: VoidFunction;
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
    <Drawer
      open={open}
      onClose={isUpdating ? () => {} : onClose}
      preventClose={isUpdating}
    >
      <Drawer.Menu>
        <Drawer.Header>
          <Typography variant="heading-6" className="font-semibold text-dark">
            نسخه جدید موجود است
          </Typography>
        </Drawer.Header>
        <Drawer.Body className="space-y-1">
          <Typography variant="body-2" className="text-gray-600">
            نسخه فعلی:{" "}
            <span className="font-iransans-en">{appConfig.version}</span>
          </Typography>
          <Typography variant="body-2" className="text-gray-600">
            نسخه جدیدی روی سرور قرار گرفته. می‌خواهید الان به‌روزرسانی کنید؟
          </Typography>
        </Drawer.Body>
        <Drawer.Footer className="flex gap-2 pb-4">
          <Button
            type="button"
            variant="solid"
            color="primary"
            onClick={onUpdate}
            loading={isUpdating}
            className="flex-1 text-sm font-normal"
          >
            بله، به‌روزرسانی
          </Button>
          <Button
            type="button"
            variant="solid"
            color="dark"
            onClick={onDefer}
            disabled={isUpdating}
            className="flex-1 text-sm font-normal"
            closeDrawer
          >
            بعداً
          </Button>
        </Drawer.Footer>
      </Drawer.Menu>
    </Drawer>
  );
}
