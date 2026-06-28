import { useContext, useEffect } from "react";
import {
  UNSAFE_DataRouterContext as DataRouterContext,
  type NavigateOptions,
  type To,
} from "react-router-dom";

export default function useViewTransition() {
  const context = useContext(DataRouterContext);

  useEffect(() => {
    if (!context) return;

    const { router } = context;
    const navigate = router.navigate.bind(router);

    router.navigate = ((to: To | number | null, opts?: NavigateOptions) => {
      if (typeof to === "number") return navigate(to);
      if (to == null) return navigate(to, opts);
      return navigate(to, {
        ...opts,
        viewTransition: opts?.viewTransition ?? true,
      });
    }) as typeof router.navigate;

    return () => {
      router.navigate = navigate;
    };
  }, [context]);
}
