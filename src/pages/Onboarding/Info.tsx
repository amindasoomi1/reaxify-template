import { Textfield } from "@/components";
import { rules } from "@/constants";
import { Card } from "reaxify/components";
import { useContextSelector } from "use-context-selector";
import { OnboardingContext } from ".";

export default function Info() {
  const data = useContextSelector(OnboardingContext, (s) => s.data);
  const handleSetData = useContextSelector(
    OnboardingContext,
    (s) => s.handleSetData
  );
  return (
    <Card.Body className="space-y-4">
      <Textfield
        label="What kind of company do you have?"
        value={data.companyHave}
        setValue={handleSetData("companyHave")}
        rules={rules.required}
        placeholder="Gym"
        autoFocus
      />
      <Textfield
        label="Current software"
        value={data.software}
        setValue={handleSetData("software")}
        rules={rules.required}
      />
      <Textfield
        label="Company name"
        value={data.companyName}
        setValue={handleSetData("companyName")}
        rules={rules.required}
        placeholder="My Gym"
      />
      <Textfield
        label="Website"
        value={data.website}
        setValue={handleSetData("website")}
        rules={rules.required}
        placeholder="www.mygym.com"
      />
    </Card.Body>
  );
}
