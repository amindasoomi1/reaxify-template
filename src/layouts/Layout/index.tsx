import { ElementType } from "react";
import { ComponentPropsWithAs, ComponentPropsWithoutAs } from "reaxify/types";
import { twMerge } from "tailwind-merge";

function Layout<E extends ElementType = "section">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "section";
  return (
    <Component
      className={twMerge(
        "layout relative w-full grid grid-rows-[auto_1fr_auto] min-h-[calc(100svh-var(--header-height,0px))] px-(--layout-padding) transition-[padding] mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

function Header({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"header">) {
  return (
    <header
      className={twMerge(
        "layout-header sticky top-(--header-height) w-full bg-background py-4 z-10 min-w-0 min-h-0",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

function Body({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"main">) {
  return (
    <main
      className={twMerge("layout-body py-6 min-w-0 min-h-0", className)}
      {...props}
    >
      {children}
    </main>
  );
}

function Footer({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  return (
    <div
      className={twMerge(
        "layout-footer sticky bottom-0 w-full bg-background py-4 z-10 min-w-0 min-h-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Layout.Header = Header;
Layout.Body = Body;
Layout.Footer = Footer;

export default Layout;
