import { ComponentProps } from "react";

export default function Image({ src, alt, ...props }: ComponentProps<"img">) {
  return <img src={src} alt={alt} {...props} />;
}
