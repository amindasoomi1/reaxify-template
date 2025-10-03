import ErrorPage from "@/pages/ErrorPage";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ChildrenProps } from "reaxify/types";

export default function ErrorBoundaryProvider({ children }: ChildrenProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorPage}>
      {children}
    </ErrorBoundary>
  );
}
