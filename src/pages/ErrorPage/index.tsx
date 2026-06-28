import { classifyAxiosError } from "@/boot";
import { Layout } from "@/layouts";
import { ReactNode, useMemo } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Button, Spacer, Typography } from "reaxify/components";
import { ClassNameProps } from "reaxify/types";

type Data = {
  title: string;
  description: ReactNode;
  button: ReactNode;
  loading: boolean;
  action: VoidFunction;
};

export default function ErrorPage({
  error,
  resetErrorBoundary,
  className,
}: FallbackProps & ClassNameProps) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    resetErrorBoundary();
    navigate("/", { replace: true });
  };

  const data: Data = useMemo(() => {
    const kind = classifyAxiosError(error);

    const unknownData: Data = {
      title: "An error occurred!",
      description:
        "It seems that something went wrong. Please try again or wait a moment.",
      button: "Try again",
      loading: false,
      action: resetErrorBoundary,
    };

    const offlineData: Data = {
      title: "No internet connection!",
      description:
        "It seems that your internet connection is not working. Please check your connection and try again.",
      button: "Try again",
      loading: false,
      action: resetErrorBoundary,
    };

    const serverUnreachableData: Data = {
      title: "Connection to the server failed",
      description: "Please try again later or contact the support number.",
      button: "Try again",
      loading: false,
      action: resetErrorBoundary,
    };

    if (kind.type === "offline") return offlineData;
    if (kind.type === "server_unreachable") return serverUnreachableData;
    if (kind.type === "unknown") return unknownData;

    switch (String(kind.status)) {
      case "403": {
        return {
          title: "403 - Unauthorized access",
          description: "You do not have access to this page.",
          button: "Go back",
          loading: false,
          action: navigateToHome,
        };
      }
      case "404": {
        return {
          title: "Oops, page not found!",
          description:
            "The page you are looking for seems to be missing. Don't worry, you can go back to the home page.",
          button: "Go back",
          loading: false,
          action: navigateToHome,
        };
      }
      case "500":
        return {
          title: "500 - Server error!",
          description:
            "Something went wrong on our server. We apologize for the inconvenience. Please try again later.",
          button: "Try again",
          loading: false,
          action: resetErrorBoundary,
        };
      case "502":
        return {
          title: "502 - Server is taking a break!",
          description:
            "Our server is tired and taking a short break. Please try again later or contact the support number.",
          button: "Try again",
          loading: false,
          action: resetErrorBoundary,
        };
      case "503":
        return {
          title: "503 - Server is taking a break!",
          description:
            "Our server is tired and taking a short break. Please try again later or contact the support number.",
          button: "Try again",
          loading: false,
          action: resetErrorBoundary,
        };
      default:
        return unknownData;
    }
  }, [error]);
  return (
    <Layout className={className}>
      <Layout.Body className="flex flex-col gap-3">
        <Spacer />
        <Typography
          variant="heading-4"
          className="text-gray-900 font-medium text-start"
        >
          {data.title}
        </Typography>
        <Typography
          variant="body-2"
          className="text-gray-900 font-light text-start mt-2 whitespace-pre-wrap"
        >
          {data.description}
        </Typography>
      </Layout.Body>
      <Layout.Footer className="flex items-center justify-end">
        <Button
          type="button"
          color="dark"
          loading={data.loading}
          onClick={data.action}
          className="py-3 px-3.5 flex items-center justify-center rounded-full text-sm"
        >
          {data.button}
        </Button>
      </Layout.Footer>
    </Layout>
  );
}
