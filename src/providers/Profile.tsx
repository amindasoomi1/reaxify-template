import { Fragment } from "react/jsx-runtime";
import { ChildrenProps } from "reaxify/types";

export default function ProfileProvider({ children }: ChildrenProps) {
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: [queryKeys.profile],
  //   queryFn: auth.getProfile,
  //   throwOnError: false,
  // });
  // if (isLoading)
  //   return (
  //     <Stack className="fixed inset-0 size-full items-center justify-center">
  //       <Spinner />
  //     </Stack>
  //   );
  // if (isError) return <ErrorPage error={error} resetErrorBoundary={() => {}} />;
  // if (!data) return null;

  return <Fragment>{children}</Fragment>;
}
