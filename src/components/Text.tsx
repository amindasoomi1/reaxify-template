import { Trans, useTranslation } from "react-i18next";

type textProps = {
  children: string;
  [key: string]: string | number;
};
export default function Text({ children, ...props }: textProps) {
  const { i18n } = useTranslation();
  return (
    <Trans
      i18n={i18n}
      i18nKey={children}
      components={{
        italic: <i />,
        bold: <strong />,
        b: <b />,
        span: <span />,
      }}
      tOptions={{ ...props, interpolation: { escapeValue: true } }}
      shouldUnescape
    />
  );
}
