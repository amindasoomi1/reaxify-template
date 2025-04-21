import { ChildrenProps } from "@/types";
import { ComponentProps } from "react";
import { Fragment } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

function Layout({ children }: ChildrenProps) {
  return <Fragment>{children}</Fragment>;
}
function LayoutBody({ className, children, ...props }: ComponentProps<"main">) {
  return (
    <main
      className={twMerge(
        "w-full pt-5 pb-8 px-(--layout-padding) lg:pt-6 transition-[padding]",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}

Layout.Body = LayoutBody;

export default Layout;
