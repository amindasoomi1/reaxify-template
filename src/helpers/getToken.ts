import { appConfig } from "@/constants";
import { useTokenStore } from "@/stores";
import axios from "axios";

export default async function getToken() {
  const url = `${appConfig.baseUrl}/refresh-token`;
  const body = { refreshToken: useTokenStore.getState().refreshToken };
  const token = await axios
    .post(url, body)
    .then((res) => res.data)
    .catch(() => null);
  if (token) useTokenStore.setState((s) => ({ ...s, ...token }));
  return token;
}
