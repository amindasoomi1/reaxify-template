import logoText from "@/assets/logos/logo-text.png";
import logo from "@/assets/logos/logo.svg";
import { appConfig } from "@/constants";
import { ComponentProps } from "react";
import Image from "./Image";

type Props = {
  variant?: "logo" | "logo-text";
  src?: never;
  alt?: never;
};

export default function Logo({
  variant = "logo",
  ...props
}: Props & Omit<ComponentProps<typeof Image>, keyof Props>) {
  const variants = {
    logo: logo,
    "logo-text": logoText,
  };
  return <Image src={variants[variant]} alt={appConfig.title} {...props} />;
}
