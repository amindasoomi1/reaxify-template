import * as IconSax from "iconsax-react";
export type IconName = keyof typeof IconSax;
export type IconVariant = IconSax.IconProps["variant"];
export type SelectItem<T> = { name: string; id: T };
