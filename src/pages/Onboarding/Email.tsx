import { Textfield } from "@/components";
import { rules } from "@/constants";
import { useContext } from "react";
import { Card } from "reaxify/components";
import { OnboardingContext } from ".";

export default function Email() {
  const { data, handleSetData } = useContext(OnboardingContext);
  return (
    <Card.Body>
      <Textfield
        label="Email"
        rules={rules.email}
        value={data.email}
        setValue={handleSetData("email")}
        placeholder="Arnold@example.com"
        autoFocus
      />
    </Card.Body>
  );
}
