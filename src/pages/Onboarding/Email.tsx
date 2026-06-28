import { Icon, Textfield } from "@/components";
import { rules } from "@/constants";
import { Alert, Card } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Email() {
  const email = useContextSelector(OnboardingContext, (s) => s.data.email);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData,
  );

  return (
    <Card.Body className="space-y-5">
      <Alert variant="soft" color="info">
        <Alert.Icon>
          <Icon name="InfoCircle" className="size-5" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Description>
            Use your work email for the best experience with team features.
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <Textfield
        label="Email"
        rules={rules.email}
        value={email}
        required
        setValue={handleSetData("email")}
        type="email"
        prepend={<Icon name="Sms" className="size-4 text-gray-400" />}
        placeholder="you@company.com"
        autoFocus
      />
    </Card.Body>
  );
}
