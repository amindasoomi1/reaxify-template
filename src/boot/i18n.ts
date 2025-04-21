import { appConfig } from "@/constants";
import en from "@/langs/en";
import i18n from "i18next";
const resources = {
  en: { translation: en },
};
i18n.init({
  resources,
  lng: appConfig.lang,
});
export default i18n;
