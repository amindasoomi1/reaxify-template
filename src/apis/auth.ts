import { axios } from "@/boot";
import { appConfig, queryKeys } from "@/constants";
import { useProfileStore, useTokenStore } from "@/stores";
import baseAxios from "axios";
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
  const token = await axios.post(url, body).then((res) => {
    useTokenStore.setState({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    queryClient.invalidateQueries({ queryKey: [queryKeys.profile] });
    return res.data;
  });
  return token;
}
export async function refreshToken() {
  const url = `${appConfig.baseUrl}/api/refresh-token`;
  const refreshToken = useTokenStore.getState().refreshToken;
  const body = { refreshToken };
  const token = await baseAxios
    .post(url, body)
    .then((res) => res.data)
    .catch(() => null);
  if (token) useTokenStore.setState({ ...token });
  return token;
}
export async function logout() {
  queryClient.clear();
  useTokenStore.setState({ accessToken: null, refreshToken: null });
  useProfileStore.setState({ profile: null });
}
