import { FallbackProps } from "react-error-boundary";
import { Button } from "reaxify/components";

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const status = error?.response?.status;
  return (
    <div className="w-full p-8 text-center">
      There was an error! ({status})
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
