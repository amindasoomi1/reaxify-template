import { appConfig } from "@/constants";
import i18n from "i18next";
import resources from "./resources";

i18n.init({
  resources,
  lng: appConfig.lang,
});

export default i18n;
