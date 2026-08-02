import ErrorPage from "@/pages/ErrorPage";
import routes from "@/routes";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider as RouterProviderComponent } from "react-router-dom";

export default function RouterProvider() {
  const { reset } = useQueryErrorResetBoundary();
  const [error, setError] = useState<unknown | null>(null);
  const handleReset = () => {
    setError(null);
    reset();
  };
  if (error)
    return (
      <ErrorBoundary onReset={handleReset} FallbackComponent={ErrorPage} />
    );
  return (
    <RouterProviderComponent
      router={routes}
      onError={(error) => setError(error)}
    />
  );
}
