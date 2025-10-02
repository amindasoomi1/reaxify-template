import { Textfield } from "@/components";
import { rules } from "@/constants";
import { Card } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Verify() {
  const verifyCode = useContextSelector(OnboardingContext, (s) => s.data.code);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData
  );
  return (
    <Card.Body>
      <Textfield
        label="Enter verification code"
        rules={rules.verifyCode}
        required
        value={verifyCode}
        setValue={handleSetData("code")}
        placeholder="000000"
        autoFocus
      />
    </Card.Body>
  );
}
