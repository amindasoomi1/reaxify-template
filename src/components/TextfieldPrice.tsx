// import num2persian from "num2persian";
import LocaleFormattedInput from "react-locale-formatted-input";
import { ComponentPropsWithoutAs } from "reaxify/types";
import Textfield from "./Textfield";

type Props = ComponentPropsWithoutAs<
  typeof Textfield<"input">,
  {
    // helperText?: never;
    append?: never;
    type?: never;
    inputMode?: never;
    locale?: never;
    format?: never;
  }
>;

export default function TextfieldPrice({ ...props }: Props) {
  return (
    <Textfield
      as={LocaleFormattedInput}
      locale="en-US"
      format="price"
      append="USD"
      //   helperText={helperText}
      {...props}
    />
  );
}
