import { Icon, Textfield } from "@/components";
import { Card } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Business() {
  const data = useContextSelector(OnboardingContext, (s) => s.data);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData,
  );

  return (
    <Card.Body className="space-y-5">
      <Textfield
        label="What kind of company do you have?"
        value={data.companyHave}
        setValue={handleSetData("companyHave")}
        required
        prepend={<Icon name="Building" className="size-4 text-gray-400" />}
        placeholder="e.g. Gym, Retail, SaaS"
        autoFocus
      />
      <Textfield
        label="Current software"
        value={data.software}
        setValue={handleSetData("software")}
        required
        prepend={<Icon name="Code" className="size-4 text-gray-400" />}
        placeholder="e.g. Excel, Shopify"
      />
    </Card.Body>
  );
}
