import { Icon, Textfield } from "@/components";
import { rules } from "@/constants";
import { Button, Card, Stack, Typography } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Verify() {
  const verifyCode = useContextSelector(OnboardingContext, (s) => s.data.code);
  const email = useContextSelector(OnboardingContext, (s) => s.data.email);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData,
  );

  return (
    <Card.Body className="space-y-5">
      <Stack
        direction="column"
        className="rounded-xl border border-border bg-gray-50 p-4"
      >
        <Stack className="items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon name="Sms" className="size-4 text-primary" />
          </div>
          <Stack direction="column" className="gap-0.5">
            <Typography variant="body-3" className="text-gray-500">
              Code sent to
            </Typography>
            <Typography variant="body-2" className="font-medium text-gray-700">
              {email || "your email"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Textfield
        label="Verification code"
        rules={rules.verifyCode}
        required
        value={verifyCode}
        setValue={handleSetData("code")}
        prepend={<Icon name="ShieldTick" className="size-4 text-gray-400" />}
        placeholder="000000"
        autoFocus
      />

      <Stack className="items-center justify-center gap-1">
        <Typography variant="body-3" className="text-gray-500">
          Didn&apos;t receive it?
        </Typography>
        <Button
          type="button"
          variant="text"
          color="primary"
          size="sm"
          className="shadow-none"
        >
          Resend code
        </Button>
      </Stack>
    </Card.Body>
  );
}
