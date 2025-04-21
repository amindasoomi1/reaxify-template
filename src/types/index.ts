import * as IconSax from "iconsax-react";
import { ReactNode } from "react";
export type IconName = keyof typeof IconSax;
export type IconVariant = IconSax.IconProps["variant"];
export type ClassNameProps = {
  className?: string;
};
export type ChildrenProps = {
  children?: ReactNode;
};
