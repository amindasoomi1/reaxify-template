import logo from "@/assets/logos/logo.svg";
import { Icon, Image } from "@/components";
import { appConfig, navItems } from "@/constants";
import { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Divider, Toggle, Tooltip } from "reaxify/components";
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
        f.some((g) => pathname === g.to || pathname.startsWith(`${g.to}/`)),
      ),
    );
    return index === -1 ? 0 : index;
  };
  const [activeGroupIndex, setActiveGroupIndex] = useState(
    getInitActiveGroupIndex,
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
        "fixed flex inset-0 size-full z-3 overflow-hidden transition-colors [--ratio:-1] rtl:[--ratio:1]",
        open
          ? "bg-gray-950/20 backdrop-blur-[2px] pointer-events-auto"
          : "bg-transparent pointer-events-none",
        "lg:bg-transparent lg:pointer-events-none",
      )}
    >
      <div
        className={cn(
          "relative w-(--main-width) h-full flex flex-col items-center justify-start py-3 bg-dark transition-[translate] z-1",
          open
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full delay-150",
          "lg:translate-x-0 rtl:lg:translate-x-0 lg:pointer-events-auto",
        )}
      >
        <div className="flex items-center justify-center size-9 rounded-xl bg-white">
          <Image src={logo} alt={appConfig.title} className="block size-5" />
        </div>
        <ul className="w-full flex-1 space-y-1.5 pt-6 overflow-auto">
          {navItems.map((e, i) => {
            const active = i === activeGroupIndex;
            return (
              <li key={e.label} className="flex items-center justify-center">
                <Toggle anchor triggerOn="hover">
                  <Toggle.Trigger>
                    <Button
                      type="button"
                      variant="text"
                      color={active ? "primary" : "light"}
                      className={cn(
                        "size-9 rounded-xl shadow-none transition-colors",
                        active
                          ? "bg-accent text-dark hover:bg-accent"
                          : "text-gray-400 hover:text-white hover:bg-white/10",
                      )}
                      onClick={handleSetActiveGroupIndex(i)}
                      size="icon"
                    >
                      <Icon name={e.icon} className="size-[1.125rem]" variant="Bulk" />
                    </Button>
                  </Toggle.Trigger>
                  <Toggle.Content>
                    <Tooltip placement="end" className="z-3">
                      <Tooltip.Content>{e.label}</Tooltip.Content>
                      <Tooltip.Arrow />
                    </Tooltip>
                  </Toggle.Content>
                </Toggle>
              </li>
            );
          })}
        </ul>
        <div></div>
      </div>
      <div
        className={cn(
          "w-(--prime-width) h-full flex flex-col items-start justify-start bg-white border-e border-border transition-[translate]",
          open
            ? "translate-x-0 delay-150"
            : "translate-x-[calc(var(--ratio)*(100%+var(--main-width)))]",
          "lg:delay-[0ms]",
          lgOpen
            ? "lg:translate-x-0 lg:pointer-events-auto"
            : "lg:translate-x-[calc(var(--ratio)*(100%+var(--main-width)))]",
        )}
      >
        <div className="w-full h-(--header-height) flex items-center gap-2 px-4">
          <p className="flex-1 truncate text-sm font-semibold text-gray-900">
            {activeGroup?.label}
          </p>
          <Button
            type="button"
            variant="text"
            color="dark"
            size="icon"
            className="hidden lg:block"
            onClick={onHideLg}
          >
            <Icon name="ArrowLeft2" className="size-4" />
          </Button>
        </div>
        <div className="w-full flex-1 overflow-auto px-2.5 pt-1">
          {activeGroup?.items?.map((e, i) => (
            <Fragment key={i}>
              <ul className="w-full space-y-0.5">
                {e.map((e) => (
                  <li key={e.to} className="w-full h-fit">
                    <NavLink
                      to={e.to}
                      className="flex items-center gap-2 w-full h-8 px-2.5 rounded-lg text-[0.8125rem] text-gray-600 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 before:size-1 before:rounded-full before:bg-gray-300 before:transition-colors [&.active]:bg-light-primary [&.active]:text-primary [&.active]:before:bg-primary"
                      onClick={onHide}
                    >
                      {e.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Divider className="my-2 mx-2.5 last:hidden" />
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
