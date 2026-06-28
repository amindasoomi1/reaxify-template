import { useContext, useEffect, useEffectEvent } from "react";
import { UNSAFE_DataRouterContext as DataRouterContext } from "react-router-dom";
import type { CustomizeNavigateCallback, NavigateFn } from "./types";

export default function useCustomizeNavigate(
  callback: CustomizeNavigateCallback,
) {
  const context = useContext(DataRouterContext);
  const onNavigate = useEffectEvent(callback);

  useEffect(() => {
    if (!context) return;

    const { router } = context;
    const navigate = router.navigate.bind(router);

    router.navigate = ((to, opts) =>
      onNavigate(navigate as NavigateFn, to, opts)) as typeof router.navigate;

    return () => {
      router.navigate = navigate;
    };
  }, [context?.router]);
}
