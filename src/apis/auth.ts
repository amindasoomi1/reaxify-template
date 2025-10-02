import { axios } from "@/boot";
import { queryKeys } from "@/constants";
import { useProfileStore, useTokenStore } from "@/stores";
import { c } from "castium";
import { cloneDeep } from "lodash";
import { queryClient } from ".";

export async function getProfile() {
  const url = "/profile";
  return await axios.get(url).then((res) => {
    useProfileStore.setState({ profile: res.data });
    return res.data;
  });
}
export async function login(data: { email: string; password: string }) {
  const url = "/login";
  const body = cloneDeep(data);
  body.email = c(body.email).string().get();
  return await axios.post(url, body).then((res) => {
    useTokenStore.setState({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    queryClient.invalidateQueries({ queryKey: [queryKeys.profile] });
    return res.data;
  });
}
export async function logout() {
  queryClient.invalidateQueries({ queryKey: [queryKeys.profile] });
  useTokenStore.setState({ accessToken: null, refreshToken: null });
  useProfileStore.setState({ profile: null });
}
