import { appConfig, languages } from "@/constants";
import { isNil } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function useFormatDate() {
  const { i18n } = useTranslation();

  const locale = useMemo(() => {
    return (
      languages.find((e) => e.id === i18n.language)?.locale ?? appConfig.locale
    );
  }, [i18n.language]);

  const formatDate = (
    value: Date | string | number | null | undefined,
    type: "date" | "time" | "date-time" | "full-date-time" = "date"
  ) => {
    if (isNil(value)) return null;

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return null;

    let options: Intl.DateTimeFormatOptions = {};

    switch (type) {
      case "date":
        options = { year: "numeric", month: "2-digit", day: "2-digit" };
        break;

      case "time":
        options = { hour: "2-digit", minute: "2-digit" };
        break;

      case "date-time":
        options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        break;

      case "full-date-time":
        options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        break;
    }

    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

  return formatDate;
}
