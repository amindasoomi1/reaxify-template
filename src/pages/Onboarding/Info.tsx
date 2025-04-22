import { Textfield } from "@/components";
import { rules } from "@/constants";
import { useContext } from "react";
import { Card } from "reaxify/components";
import { OnboardingContext } from ".";

export default function Info() {
  const { data, handleSetData } = useContext(OnboardingContext);
  return (
    <Card.Body className="space-y-4">
      <Textfield
        label="What kind of company do you have?"
        value={data.companyHave}
        setValue={handleSetData("companyHave")}
        rules={rules.required}
        placeholder="Gym"
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
