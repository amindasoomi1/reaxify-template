import { useProfileStore, useTokenStore } from "@/stores";

export default function useLogout() {
  const setProfile = useProfileStore((s) => s.setProfile);
  const setToken = useTokenStore((s) => s.setToken);
  const logout = () => {
    setProfile(null);
    setToken(null);
  };
  return logout;
}
