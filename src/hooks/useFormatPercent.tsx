import { appConfig, languages } from "@/constants";
import { isNil } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function useFormatPercent() {
  const { i18n } = useTranslation();
  const locale = useMemo(() => {
    return (
      languages.find((e) => e.id === i18n.language)?.locale ?? appConfig.locale
    );
  }, [i18n.language]);
  const formatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
    });
  }, [locale]);

  return (value: number | null | undefined) => {
    if (isNil(value)) return null;
    return formatter.format(value / 100);
  };
}
