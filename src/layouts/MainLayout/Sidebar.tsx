import logo from "@/assets/logos/logo.svg";
import { Icon, IconButton, Image } from "@/components";
import { appConfig, navItems } from "@/constants";
import { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "reaxify/components";
import { cn } from "reaxify/helpers";

type Props = {
  open: boolean;
  lgOpen: boolean;
  onShow: VoidFunction;
  onHide: VoidFunction;
  onShowLg: VoidFunction;
  onHideLg: VoidFunction;
};

export default function Sidebar({
  open,
  lgOpen,
  // onShow,
  onHide,
  onShowLg,
  onHideLg,
}: Props) {
  const location = useLocation();
  const getInitActiveGroupIndex = () => {
    const pathname = location.pathname.replace(/^\//, "");
    const index = navItems.findIndex((e) =>
      e.items?.some((f) =>
        f.some((g) => pathname === g.to || pathname.startsWith(`${g.to}/`))
      )
    );
    return index === -1 ? 0 : index;
  };
  const [activeGroupIndex, setActiveGroupIndex] = useState(
    getInitActiveGroupIndex
  );
  const activeGroup = navItems[activeGroupIndex];
  const handleSetActiveGroupIndex = (index: number) => {
    return () => {
      onShowLg();
      setActiveGroupIndex(index);
    };
  };
  return (
    <aside
      className={cn(
        "fixed flex inset-0 size-full z-10 overflow-hidden transition-colors [--ratio:-1] rtl:[--ratio:1]",
        open
          ? "bg-black/10 pointer-events-auto"
          : "bg-transparent pointer-events-none",
        "lg:bg-transparent lg:pointer-events-none"
      )}
    >
      <div
        className={cn(
          "relative w-(--main-width) h-full flex flex-col items-center justify-start py-3.5 bg-white border-e border-gray-200 transition-[translate] z-[1]",
          open
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full delay-150",
          "lg:translate-x-0 rtl:lg:translate-x-0 lg:pointer-events-auto"
        )}
      >
        <Image src={logo} alt={appConfig.title} className="block size-10" />
        <ul className="w-full flex-1 space-y-4 lg:space-y-3 xl:pt-5 2xl:space-y-4 pt-5 overflow-auto">
          {navItems.map((e, i) => {
            const active = i === activeGroupIndex;
            return (
              <li key={e.label} className="flex items-center justify-center">
                <Tooltip title={e.label} placement="end">
                  <IconButton
                    type="button"
                    variant="text"
                    color={active ? "primary" : "dark"}
                    className={cn(
                      "size-11 rounded-lg shadow-none",
                      active ? "bg-primary/10" : "text-gray-500"
                    )}
                    onClick={handleSetActiveGroupIndex(i)}
                  >
                    <Icon name={e.icon} className="size-6" variant="Bulk" />
                  </IconButton>
                </Tooltip>
              </li>
            );
          })}
        </ul>
        <div></div>
      </div>
      <div
        className={cn(
          "w-(--prime-width) h-full flex flex-col items-start justify-start bg-white transition-[translate]",
          open
            ? "translate-x-0 delay-150"
            : "translate-x-[calc(var(--ratio)*(100%+var(--main-width)))]",
          "lg:delay-[0ms]",
          lgOpen
            ? "lg:translate-x-0 lg:pointer-events-auto"
            : "lg:translate-x-[calc(var(--ratio)*(100%+var(--main-width)))]"
        )}
      >
        <div className="w-full h-16 flex items-center gap- px-4">
          <p className="flex-1 truncate tracking-wider text-base text-gray-800">
            {activeGroup?.label}
          </p>
          <IconButton
            type="button"
            variant="text"
            color="dark"
            className="hidden lg:block"
            onClick={onHideLg}
          >
            <Icon name="ArrowLeft2" className="size-4" />
          </IconButton>
        </div>
        <div className="w-full flex-1 overflow-auto px-4">
          {activeGroup?.items?.map((e, i) => (
            <Fragment key={i}>
              <ul className="w-full">
                {e.map((e) => (
                  <li key={e.to} className="w-full h-fit">
                    <NavLink
                      to={e.to}
                      className="flex items-center w-full h-[2.125rem] text-[0.8125rem] text-gray-600 font-normal transition-colors hover:text-gray-900 [&.active]:text-primary [&.active]:font-medium"
                    >
                      {e.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="w-full my-2.5 h-px bg-gray-200 dark:bg-dark-500" />
            </Fragment>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="flex-1 h-full opacity-0 cursor-default lg:hidden"
        onClick={onHide}
      />
    </aside>
  );
}
