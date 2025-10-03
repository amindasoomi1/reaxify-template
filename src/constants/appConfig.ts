const appConfig = {
  title: "Reaxify Template",
  description: "Vite + React-19 + TS + Tailwind-4",
  baseUrl: import.meta.env.VITE_GATEWAY_URL,
  lang: import.meta.env.VITE_DEFAULT_LANGUAGE,
  persistedStateVersion: 1,
  isProduction: import.meta.env.VITE_IS_PRODUCTION === "true",
};
export default appConfig;
