import { Icon } from "@/components";
import { Layout } from "@/layouts";
import { createContext, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Progress, Typography } from "reaxify/components";
import { usePersistedState } from "reaxify/hooks";
import Email from "./Email";
import Info from "./Info";
import Verify from "./Verify";

type Data = {
  email: string | null;
  code: string | null;
  companyHave: string | null;
  software: string | null;
  companyName: string | null;
  website: string | null;
};
type Context = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  // eslint-disable-next-line
  handleSetData: (key: keyof Data) => (value: any) => void;
};
export const OnboardingContext = createContext<Context>({
  data: {
    email: null,
    code: null,
    companyHave: null,
    software: null,
    companyName: null,
    website: null,
  },
  setData: () => {},
  handleSetData: () => () => {},
});

export default function Onboarding() {
  const steps = [
    { title: "Email address", id: "email", component: Email },
    { title: "Verify email", id: "verify", component: Verify },
    { title: "Company info", id: "info", component: Info },
  ];
  const navigate = useNavigate();
  const [activeStepIndex, setActiveStepIndex, clearActiveStepIndex] =
    usePersistedState("onboarding-sep", 0, "sessionStorage");
  const [data, setData, clearData] = usePersistedState<Data>(
    "onboarding-data",
    {
      email: null,
      code: null,
      companyHave: null,
      software: null,
      companyName: null,
      website: null,
    },
    "sessionStorage"
  );
  const isFirstStep = activeStepIndex === 0;
  const percent = 100 * ((activeStepIndex + 1) / steps.length);
  const activeStep = steps[activeStepIndex];
  const ActiveStepComponent = activeStep.component;
  const handleSetData = (key: keyof Data) => {
    // eslint-disable-next-line
    return (value: any) => {
      setData((p) => ({ ...p, [key]: value }));
    };
  };
  const goToPrevStep = () => {
    setActiveStepIndex((p) => p - 1);
  };
  const sendCode = () => {
    setActiveStepIndex(1);
  };
  const verify = () => {
    setActiveStepIndex(2);
  };
  const completed = () => {
    navigate("/");
    clearActiveStepIndex();
    clearData();
  };
  const submit = () => {
    if (activeStepIndex === 0) return sendCode();
    if (activeStepIndex === 1) return verify();
    completed();
  };
  return (
    <Layout>
      <Layout.Body className="min-h-(--main-height) flex flex-col">
        <Card as={Form} onSubmit={submit} className="max-w-md m-auto">
          <Card.Header className="text-center">
            <Typography variant="heading-3" className="mb-5">
              {activeStep.title}
            </Typography>
          </Card.Header>
          <OnboardingContext.Provider value={{ data, setData, handleSetData }}>
            <ActiveStepComponent />
          </OnboardingContext.Provider>
          <Card.Footer>
            <Button type="submit" className="block w-full" size="lg">
              Continue
            </Button>
          </Card.Footer>
          <Card.Footer className="p-0">
            <Progress value={percent} className="w-full" />
          </Card.Footer>
          <Card.Footer className="flex items-center justify-between gap-4">
            {!isFirstStep && (
              <Button
                type="button"
                variant="text"
                color="dark"
                onClick={goToPrevStep}
                className="inline-flex items-center gap-1 shadow-none"
              >
                <Icon name="ArrowLeft" className="size-5" />
                <span>Back</span>
              </Button>
            )}
            <Typography variant="body-2" className="flex-1 text-end">
              Step {activeStepIndex + 1} / {steps.length}
            </Typography>
          </Card.Footer>
        </Card>
      </Layout.Body>
    </Layout>
  );
}
