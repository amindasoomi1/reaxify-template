import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

export default function PageNotFound() {
  const navigate = useNavigate();
  const resetErrorBoundary = () => {
    navigate("/", { replace: true });
  };
  return (
    <ErrorPage
      error={{ code: "PAGE_NOT_FOUND", response: { status: 404 } }}
      resetErrorBoundary={resetErrorBoundary}
    />
  );
}
