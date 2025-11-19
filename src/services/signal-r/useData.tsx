import { useEffect, useMemo, useState } from "react";
import { isEmptyValue, randomID } from "reaxify/helpers";
import { SignalRNotificationCommand } from "./types";
import useSignalRContext from "./useContext";

export default function useSignalRData<T>(
  command: SignalRNotificationCommand,
  // eslint-disable-next-line
  selector: (data: any) => T,
  config: {
    initValue: T;
    filter?: Record<string, unknown>;
  }
) {
  const { setDataCallback, removeDataCallback } = useSignalRContext();
  const id = useMemo(() => randomID(), []);
  const [data, setData] = useState<T | null>(null);

  const handleData = useMemo(
    // eslint-disable-next-line
    () => (incoming: any) => {
      if (isEmptyValue(incoming)) return;
      if (typeof incoming !== "object") return;
      if (config.filter && typeof config.filter === "object") {
        const isMatch = Object.entries(config.filter).every(
          ([key, value]) => incoming[key] === value
        );
        if (!isMatch) return;
      }
      try {
        setData(selector(incoming));
      } catch (e) {
        console.warn(`Selector error for command "${command}":`, e);
      }
    },
    [selector, command, config.filter]
  );

  useEffect(() => {
    setDataCallback({
      command,
      id,
      // eslint-disable-next-line
      callback: handleData,
    });
    return () => removeDataCallback({ command, id });
  }, [command, id, handleData, setDataCallback, removeDataCallback]);
  return data ?? config.initValue;
}
