import { IconName, IconVariant } from "@/types";
import * as IconSax from "iconsax-react";
import { ComponentProps, useMemo } from "react";
import { twMerge } from "tailwind-merge";
type IconProps = {
  name: IconName;
  variant?: IconVariant;
  size?: number | string;
} & Omit<ComponentProps<"svg">, "ref">;

export default function Icon({
  name,
  variant = "Linear",
  className,
  size = "1em",
  ...props
}: IconProps) {
  const Component = useMemo(() => IconSax[name], [name]);
  return (
    <Component
      variant={variant}
      size={size}
      color="currentColor"
      className={twMerge("inline-flex text-current align-middle", className)}
      {...props}
    />
  );
}
