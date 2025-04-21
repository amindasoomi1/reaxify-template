import { ComponentProps, ElementType, createContext } from "react";
import { Button } from "reaxify/components";
import { twMerge } from "tailwind-merge";

type IconButtonContextType = { iconClassName: string };

export const IconButtonContext = createContext<
  IconButtonContextType | undefined
>(undefined);

export default function IconButton<E extends ElementType = "button">({
  as,
  className,
  children,
  ...props
}: ComponentProps<typeof Button<E>>) {
  return (
    <Button
      as={as as ElementType}
      className={twMerge(
        "size-8 rounded-full p-0 inline-flex justify-center items-center",
        className
      )}
      {...props}
    >
      <IconButtonContext.Provider value={{ iconClassName: "size-6" }}>
        {children}
      </IconButtonContext.Provider>
    </Button>
  );
}
