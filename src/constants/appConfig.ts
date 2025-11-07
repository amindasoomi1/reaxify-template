const appConfig = {
  title: "Reaxify Template",
  description: "Vite + React-19 + TS + Tailwind-4",
  baseUrl: import.meta.env.VITE_GATEWAY_URL as string,
  lang: import.meta.env.VITE_DEFAULT_LANGUAGE as string,
  locale: import.meta.env.VITE_DEFAULT_LOCALE as string,
  currency: import.meta.env.VITE_DEFAULT_CURRENCY as string,
  persistedStateVersion: 1,
  isProduction: import.meta.env.VITE_IS_PRODUCTION === "true",
};
export default appConfig;
