import { Layout } from "@/layouts";
import { useMemo } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button, Card, Typography } from "reaxify/components";

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const errorText = useMemo(() => {
    const status = error?.response?.status ?? null;
    if (status) return `There was an error! ${{ status }}`;
    return error?.toString?.();
  }, [error]);
  return (
    <Layout>
      <Layout.Body className="flex flex-col">
        <Card dir="ltr" className="max-w-sm m-auto rounded-2xl p-3">
          <Card.Body>
            <Typography>{errorText}</Typography>
          </Card.Body>
          <Card.Footer>
            <Button
              type="button"
              onClick={resetErrorBoundary}
              className="w-full"
            >
              Try again
            </Button>
          </Card.Footer>
        </Card>
      </Layout.Body>
    </Layout>
  );
}
