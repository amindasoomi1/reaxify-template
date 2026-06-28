import { useFirebaseTokenStore } from "@/infra/firebase";
import { clearQueries } from "@/infra/query-client";
import { useProfileStore, useTokenStore } from "@/stores";

export default function clearCacheData() {
  localStorage.clear();
  sessionStorage.clear();

  useProfileStore.setState({ profile: null });
  useTokenStore.setState({ accessToken: null, refreshToken: null });
  useFirebaseTokenStore.setState({ firebaseToken: null });

  clearQueries();
}
