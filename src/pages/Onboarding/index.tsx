import { Icon } from "@/components";
import { useStepper } from "@/hooks";
import { Layout } from "@/layouts";
import { createElement, Dispatch, Fragment, SetStateAction } from "react";
import { Form } from "react-form-rules";
import { useNavigate } from "react-router-dom";
import { Button, Card, Progress, Typography } from "reaxify/components";
import { wait } from "reaxify/helpers";
import { usePersistedState } from "reaxify/hooks";
import { createContext } from "use-context-selector";
import Email from "./Email";
import Info from "./Info";
import Verify from "./Verify";

type Data = {
  email: string;
  code: string;
  companyHave: string;
  software: string;
  companyName: string;
  website: string;
};
type Context = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  // eslint-disable-next-line
  handleSetData: (key: keyof Data) => (value: any) => void;
};
export const OnboardingContext = createContext<Context>({
  data: {
    email: "",
    code: "",
    companyHave: "",
    software: "",
    companyName: "",
    website: "",
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
  const [data, setData, clearData] = usePersistedState<Data>(
    {
      email: "",
      code: "",
      companyHave: "",
      software: "",
      companyName: "",
      website: "",
    },
    { name: "onboarding-data", storage: "sessionStorage" },
  );
  const handleSetData = (key: keyof Data) => {
    // eslint-disable-next-line
    return (value: any) => {
      setData((p) => ({ ...p, [key]: value }));
    };
  };

  const sendCode = () => {
    return true;
  };
  const verify = () => {
    return true;
  };
  const [activeStep, stepActions, stepStatus] = useStepper(
    steps,
    { name: "onboarding-step-index" },
    {
      onNext: (activeStep) => {
        if (activeStep.id === "email") return sendCode();
        if (activeStep.id === "verify") return verify();
      },
      onCompleted: async () => {
        navigate("/");
        await wait(500);
        stepActions.reset();
        clearData();
      },
    },
  );

  return (
    <Layout>
      <Layout.Body className="min-h-(--main-height) flex flex-col">
        <Card as={Form} onSubmit={stepActions.next} className="max-w-md m-auto">
          <Card.Header className="text-center">
            <Typography variant="heading-6">{activeStep.title}</Typography>
          </Card.Header>
          <OnboardingContext.Provider value={{ data, setData, handleSetData }}>
            {createElement(activeStep.component ?? Fragment)}
          </OnboardingContext.Provider>
          <Card.Footer className="border-t-0">
            <Button type="submit" className="block w-full" size="lg">
              Continue
            </Button>
          </Card.Footer>
          <Card.Footer className="p-0 border-t-0">
            <Progress value={stepStatus.progress} className="w-full" />
          </Card.Footer>
          <Card.Footer className="flex items-center justify-between gap-4 border-t-0">
            {!stepStatus.isFirstStep && (
              <Button
                type="button"
                variant="text"
                color="dark"
                onClick={stepActions.prev}
                className="inline-flex items-center gap-1 shadow-none"
              >
                <Icon name="ArrowLeft" className="size-5" />
                <span>Back</span>
              </Button>
            )}
            <Typography variant="body-2" className="flex-1 text-end">
              Step {stepStatus.currentIndex + 1} / {stepStatus.totalSteps}
            </Typography>
          </Card.Footer>
        </Card>
      </Layout.Body>
    </Layout>
  );
}
