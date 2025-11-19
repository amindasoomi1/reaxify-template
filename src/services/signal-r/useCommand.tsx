import { useCallback, useEffect, useMemo } from "react";
import { randomID } from "reaxify/helpers";
import { SignalRNotificationCommand } from "./types";
import useSignalRContext from "./useContext";

export default function useCommand(
  command: SignalRNotificationCommand,
  callback: VoidFunction,
  config: null | { filter?: Record<string, unknown> } = null
) {
  const { setCommandCallback, removeCommandCallback } = useSignalRContext();
  const id = useMemo(() => randomID(), []);
  const handleCommand = useCallback(
    // eslint-disable-next-line
    (incoming: any) => {
      if (config?.filter && typeof config.filter === "object") {
        const isMatch = Object.entries(config.filter).every(
          ([key, value]) => incoming?.[key] === value
        );
        if (!isMatch) return;
      }
      return callback();
    },
    [callback, config]
  );

  useEffect(() => {
    setCommandCallback({ command, id, callback: handleCommand });
    return () => removeCommandCallback({ command, id });
  }, [command, id, handleCommand, setCommandCallback, removeCommandCallback]);
}
