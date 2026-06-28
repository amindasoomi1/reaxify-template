import { Icon } from "@/components";
import { useStepper } from "@/hooks";
import { Layout } from "@/layouts";
import { IconName } from "@/types";
import {
  createElement,
  Dispatch,
  Fragment,
  SetStateAction,
  useMemo,
} from "react";
import { Form } from "react-form-rules";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Fill,
  Progress,
  Stack,
  Typography,
} from "reaxify/components";
import { cn, wait } from "reaxify/helpers";
import { usePersistedState } from "reaxify/hooks";
import { createContext } from "use-context-selector";
import Business from "./Business";
import Company from "./Company";
import Email from "./Email";
import Verify from "./Verify";

type Data = {
  email: string;
  code: string;
  companyHave: string;
  software: string;
  companyName: string;
  website: string;
};

type Step = {
  title: string;
  id: string;
  icon: IconName;
  subtitle: string;
  description: string;
  component: typeof Email;
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
  const steps = useMemo<Step[]>(
    () => [
      {
        title: "Email",
        id: "email",
        icon: "Sms",
        subtitle: "Create your account",
        description:
          "Enter your work email to get started. We'll send a verification code next.",
        component: Email,
      },
      {
        title: "Verify",
        id: "verify",
        icon: "ShieldTick",
        subtitle: "Confirm it's you",
        description:
          "Check your inbox for a 6-digit code. It may take a minute to arrive.",
        component: Verify,
      },
      {
        title: "Business",
        id: "business",
        icon: "Building",
        subtitle: "About your business",
        description:
          "Tell us what kind of company you run and what tools you use today.",
        component: Business,
      },
      {
        title: "Company",
        id: "company",
        icon: "Tag",
        subtitle: "Company details",
        description:
          "Add your company name and website to finish setting up your workspace.",
        component: Company,
      },
    ],
    [],
  );

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

  const continueLabel = stepStatus.isLastStep ? "Complete setup" : "Continue";

  return (
    <Layout>
      <Layout.Body className="flex flex-col items-center justify-center p-4 sm:p-6">
        <Stack direction="column" className="mb-6 w-full max-w-md gap-5">
          <nav
            aria-label="Onboarding steps"
            className="flex w-full items-center"
          >
            {steps.map((step, index) => {
              const isCompleted = index < stepStatus.currentIndex;
              const isActive = index === stepStatus.currentIndex;

              return (
                <Fragment key={step.id}>
                  {index !== 0 && (
                    <Fill
                      className={cn(
                        "mx-2 mb-5 h-px",
                        index <= stepStatus.currentIndex
                          ? "bg-primary"
                          : "bg-gray-200",
                      )}
                      aria-hidden
                    />
                  )}
                  <Stack
                    direction="column"
                    className="shrink-0 items-center gap-1.5"
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-sm font-medium",
                        isCompleted && "bg-primary text-white",
                        isActive &&
                          "bg-primary/10 text-primary ring-2 ring-primary",
                        !isCompleted &&
                          !isActive &&
                          "bg-gray-100 text-gray-400",
                      )}
                    >
                      {isCompleted ? (
                        <Icon name="TickCircle" className="size-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <Typography
                      variant="body-3"
                      className={cn(
                        "text-center",
                        isActive
                          ? "font-medium text-gray-800"
                          : "text-gray-500",
                      )}
                    >
                      {step.title}
                    </Typography>
                  </Stack>
                </Fragment>
              );
            })}
          </nav>
        </Stack>

        <Card
          as={Form}
          onSubmit={stepActions.next}
          className="w-full min-h-125 max-w-md flex flex-col *:data-[name='card-body']:flex-1"
        >
          <Card.Header className="space-y-4">
            <Stack className="items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon name={activeStep.icon} className="size-5 text-primary" />
              </div>
              <Stack direction="column" className="gap-1">
                <Typography variant="heading-5" className="text-gray-700">
                  {activeStep.subtitle}
                </Typography>
                <Typography variant="body-2" className="text-gray-500">
                  {activeStep.description}
                </Typography>
              </Stack>
            </Stack>
            <Progress value={stepStatus.progress} className="w-full" />
          </Card.Header>

          <OnboardingContext.Provider value={{ data, setData, handleSetData }}>
            {createElement(activeStep.component ?? Fragment)}
          </OnboardingContext.Provider>

          <Card.Footer className="flex flex-col gap-4 border-t">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              size="lg"
            >
              {continueLabel}
              {stepStatus.isLastStep ? (
                <Icon name="TickCircle" className="size-5" />
              ) : (
                <Icon name="ArrowRight" className="size-5" />
              )}
            </Button>

            <Stack className="items-center justify-between gap-4">
              {!stepStatus.isFirstStep ? (
                <Button
                  type="button"
                  variant="text"
                  color="dark"
                  size="sm"
                  className="inline-flex items-center gap-1 shadow-none"
                  onClick={stepActions.prev}
                >
                  <Icon name="ArrowLeft" className="size-4" />
                  Back
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="text"
                  color="dark"
                  size="sm"
                  className="inline-flex items-center gap-1 shadow-none"
                >
                  <Icon name="Login" className="size-4" />
                  Sign in instead
                </Button>
              )}
              <Typography variant="body-3" className="text-gray-400">
                {stepStatus.currentIndex + 1} / {stepStatus.totalSteps}
              </Typography>
            </Stack>
          </Card.Footer>
        </Card>
      </Layout.Body>
    </Layout>
  );
}
