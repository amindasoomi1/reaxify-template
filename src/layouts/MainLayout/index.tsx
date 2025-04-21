import { useState } from "react";
import { Outlet } from "react-router";
import { cn } from "reaxify/helpers";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [lgOpen, setLgOpen] = useState(true);

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };
  const toggle = () => {
    setOpen((p) => !p);
  };
  const showLg = () => {
    setLgOpen(true);
  };
  const hideLg = () => {
    setLgOpen(false);
  };
  const toggleLg = () => {
    setLgOpen((p) => !p);
  };
  return (
    <div
      className={cn(
        "[--main-width:4.5rem] [--prime-width:14.375rem] [--layout-padding:1rem] transition-[padding]",
        lgOpen ? "lg:[--layout-padding:1.5rem]" : "lg:[--layout-padding:4rem]",
        lgOpen
          ? "lg:ps-[calc(var(--main-width)+var(--prime-width))]"
          : "lg:ps-(--main-width)"
      )}
    >
      <Header onToggle={toggle} onToggleLg={toggleLg} />
      <Outlet />
      <Sidebar
        open={open}
        lgOpen={lgOpen}
        onShow={show}
        onHide={hide}
        onShowLg={showLg}
        onHideLg={hideLg}
      />
    </div>
  );
}
