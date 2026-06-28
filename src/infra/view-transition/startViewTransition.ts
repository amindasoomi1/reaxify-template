import { flushSync as flushSyncFn } from "react-dom";

type Options = {
  flushSync?: boolean;
};

export default function startViewTransition(
  cb: VoidFunction,
  { flushSync }: Options = {},
) {
  const support = "startViewTransition" in document;
  if (!support) return cb();
  document.startViewTransition(() => {
    if (!flushSync) return cb();
    flushSyncFn(() => cb());
  });
}
