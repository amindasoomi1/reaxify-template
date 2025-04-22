import { Textfield } from "@/components";
import { rules } from "@/constants";
import { useContext } from "react";
import { Card } from "reaxify/components";
import { OnboardingContext } from ".";

export default function Verify() {
  const { data, handleSetData } = useContext(OnboardingContext);
  return (
    <Card.Body>
      <Textfield
        label="Enter verification code"
        rules={rules.verifyCode}
        value={data.code}
        setValue={handleSetData("code")}
        placeholder="000000"
      />
    </Card.Body>
  );
}
