export type WhoamiOS = "ios" | "android" | "desktop";
export type WhoamiRuntime = "native" | "pwa" | "web";
export type WhoamiName = `${WhoamiOS}-${WhoamiRuntime}` | "unknown";

const userAgent = navigator.userAgent;

const uaIsIOS =
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
  /iPhone|iPad|iPod/i.test(navigator.userAgent);

const uaIsAndroid = /Android/i.test(userAgent);

const isNative = false;
const isPWAStandalone = window.matchMedia("(display-mode: standalone)").matches;
const isWeb = !isNative;

const runtime: WhoamiRuntime = isPWAStandalone ? "pwa" : "web";

let os: WhoamiOS;
let isIOS: boolean;
let isAndroid: boolean;

if (uaIsIOS) {
  os = "ios";
  isIOS = true;
  isAndroid = false;
} else if (uaIsAndroid) {
  os = "android";
  isIOS = false;
  isAndroid = true;
} else {
  os = "desktop";
  isIOS = false;
  isAndroid = false;
}

const isDesktop = os === "desktop";
const isMobile = isIOS || isAndroid;

const name: WhoamiName = `${os}-${runtime}`;

const whoami = {
  name,
  os,
  runtime,
  isNative,
  isWeb,
  isIOS,
  isAndroid,
  isDesktop,
  isMobile,
  isPWAStandalone,
};

export default whoami;
