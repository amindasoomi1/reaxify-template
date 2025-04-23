import { useTokenStore } from "@/stores";

export default function useIsLogged() {
  const accessToken = useTokenStore((s) => s.accessToken);
  return !!accessToken;
}
