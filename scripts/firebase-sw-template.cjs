importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "{API_KEY}",
  authDomain: "{AUTH_DOMAIN}",
  projectId: "{PROJECT_ID}",
  storageBucket: "{STORAGE_BUCKET}",
  messagingSenderId: "{MESSAGING_SENDER_ID}",
  appId: "{APP_ID}",
  measurementId: "{MEASUREMENT_ID}",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
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
  self.registration?.showNotification(title, notificationOptions);
});

messaging.onNotificationClick = (event) => {
  const initData = event?.notification?.data ?? null;
  const hasFcm = "FCM_MSG" in initData;
  const data = hasFcm ? initData?.FCM_MSG?.data ?? null : initData;
  const appUrl = "{APP_DOMAIN_URL}";
  const url = data?.url ?? null;

  const command = data?.command ?? null;

  const responseUrl = new URL(appUrl);
  let WINDOW_URL = null;

  const isOrders = ["NewOrderReceived"].includes(command);

  if (isOrders) {
    responseUrl.pathname = "/admin/orders";
  }

  if (url) WINDOW_URL = url;
  else WINDOW_URL = responseUrl.toString();

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        const canFocus = client.url === WINDOW_URL && "focus" in client;
        if (canFocus) {
          client.focus();
          return;
        }
      }
      if (clients.openWindow) return clients.openWindow(WINDOW_URL);
    })
  );
};
