import { Icon, Textfield } from "@/components";
import { Card } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Company() {
  const data = useContextSelector(OnboardingContext, (s) => s.data);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData,
  );

  return (
    <Card.Body className="space-y-5">
      <Textfield
        label="Company name"
        value={data.companyName}
        setValue={handleSetData("companyName")}
        required
        prepend={<Icon name="Tag" className="size-4 text-gray-400" />}
        placeholder="My Company"
        autoFocus
      />
      <Textfield
        label="Website"
        value={data.website}
        setValue={handleSetData("website")}
        required
        prepend={<Icon name="Global" className="size-4 text-gray-400" />}
        placeholder="www.example.com"
      />
    </Card.Body>
  );
}
