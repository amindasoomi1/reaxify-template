import { c } from "castium";
import { usePersistedState } from "reaxify/hooks";

type Options = {
  name: string;
  initialStepIndex?: number;
};
type ActionsResultValue = boolean | undefined | void;
type Actions<T> = {
  onPrev?: (currentStep: T) => Promise<ActionsResultValue> | ActionsResultValue;
  onNext?: (currentStep: T) => Promise<ActionsResultValue> | ActionsResultValue;
  onCompleted?: VoidFunction;
};

export default function useStepper<T>(
  steps: T[],
  options: Options,
  actions?: Actions<T>,
) {
  if (!options?.name) {
    throw new Error("useStepper: options.name is required");
  }

  if (!Array.isArray(steps) || steps.length === 0) {
    throw new Error("useStepper: steps must be a non-empty array");
  }

  const [activeStepIndex, setActiveStepIndex, reset] = usePersistedState(
    options?.initialStepIndex ?? 0,
    { name: options.name, storage: "sessionStorage" },
  );

  const lastStepIndex = steps.length - 1;
  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === lastStepIndex;
  const activeStep = steps.at(activeStepIndex) ?? steps[0];

  const goTo = (index: number) => {
    setActiveStepIndex(c(index).clamp(0, lastStepIndex).get());
  };

  const prev = async () => {
    if (isFirstStep) return;
    const canProceed = (await actions?.onPrev?.(activeStep)) ?? true;
    if (canProceed) setActiveStepIndex((p) => Math.max(p - 1, 0));
  };

  const next = async () => {
    const canProceed = (await actions?.onNext?.(activeStep)) ?? true;

    if (!canProceed) return;
    if (isLastStep) return actions?.onCompleted?.();
    console.log(isLastStep);
    setActiveStepIndex((p) => Math.min(p + 1, lastStepIndex));
  };

  const goToLast = () => setActiveStepIndex(lastStepIndex);
  const hasNext = () => !isLastStep;
  const hasPrev = () => !isFirstStep;

  return [
    activeStep,
    {
      prev,
      next,
      goTo,
      goToFirst: reset,
      goToLast,
      hasNext,
      hasPrev,
      reset,
    },
    {
      isFirstStep,
      isLastStep,
      currentIndex: activeStepIndex,
      totalSteps: steps.length,
      progress: ((activeStepIndex + 1) / steps.length) * 100,
    },
  ] as const;
}
