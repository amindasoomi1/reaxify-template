import type { NavigateOptions, To } from "react-router-dom";

export type NavigateFn = (
  to: To | number | null,
  options?: NavigateOptions,
) => void | Promise<void>;

export type CustomizeNavigateCallback = (
  navigate: NavigateFn,
  to: To | number | null,
  options?: NavigateOptions,
) => ReturnType<NavigateFn>;
