import { useProfileStore } from "@/stores";

export default function useProfile() {
  const { profile } = useProfileStore();
  if (!profile) throw Error("profile not found!");
  return profile;
}
