import { auth } from "@/apis";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { Spinner, Stack } from "reaxify/components";
import { ChildrenProps } from "reaxify/types";

export default function ProfileProvider({ children }: ChildrenProps) {
  const { isLoading } = useQuery({
    queryKey: [queryKeys.profile],
    queryFn: auth.getProfile,
  });
  if (isLoading)
    return (
      <Stack className="fixed inset-0 size-full items-center justify-center">
        <Spinner />
      </Stack>
    );
  // if (!data) return null;
  return <Fragment>{children}</Fragment>;
}
