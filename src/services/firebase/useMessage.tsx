import { useIsLogged } from "@/hooks";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useCallback, useEffect } from "react";
import { useAxios } from "reaxify/axios";
import firebaseConfig from "./config";
import useFirebaseTokenStore from "./useTokenStore";

export default function useFirebaseMessage() {
  const [axios] = useAxios({ cancelDuplicatedRequests: false });
  const isLogged = useIsLogged();
  const handleSetFirebaseToken = useCallback((token: string) => {
    const url = "/users/update/firebase-token";
    const body = token;
    const config = { headers: { "Content-Type": "application/json" } };
    axios.put(url, body, config).then(() => {
      useFirebaseTokenStore.getState().setFirebaseToken(token);
    });
  }, []);
  const notificationHandler = useCallback(async () => {
    if (!isLogged) return;
    const firebaseToken = useFirebaseTokenStore.getState().firebaseToken;
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();
    const isGranted = permission === "granted";
    if (!isGranted) return;
    if (!firebaseToken) {
      const token = await getToken(messaging);
      handleSetFirebaseToken(token);
    }
    onMessage(messaging, (payload) => {
      const title = payload.notification?.title || payload.data?.title || "";
      const body = payload.notification?.body || payload.data?.body || "";
      const icon = payload.data?.image || "/512x512.png";
      const notificationOptions = {
        body,
        icon,
        vibrate: [200],
        data: payload.data,
        actions: [],
      };
      new Notification(title, notificationOptions);
    });
  }, [isLogged, handleSetFirebaseToken]);
  useEffect(() => {
    notificationHandler();
  }, [notificationHandler]);
}
