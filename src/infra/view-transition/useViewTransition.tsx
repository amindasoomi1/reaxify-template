import { useCustomizeNavigate } from "@/infra/navigate";

export default function useViewTransition() {
  useCustomizeNavigate((navigate, to, opts) => {
    if (typeof to === "number") return navigate(to);
    if (to == null) return navigate(to, opts);
    return navigate(to, {
      ...opts,
      viewTransition: opts?.viewTransition ?? true,
    });
  });
}
