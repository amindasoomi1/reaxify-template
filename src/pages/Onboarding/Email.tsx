import { Textfield } from "@/components";
import { rules } from "@/constants";
import { Card } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Email() {
  const email = useContextSelector(OnboardingContext, (s) => s.data.email);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData
  );
  return (
    <Card.Body>
      <Textfield
        label="Email"
        rules={rules.email}
        value={email}
        required
        setValue={handleSetData("email")}
        placeholder="Arnold@example.com"
        autoFocus
      />
    </Card.Body>
  );
}
