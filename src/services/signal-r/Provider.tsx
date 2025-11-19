import { appConfig } from "@/constants";
import { useTokenStore } from "@/stores";
import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { c } from "castium";
import { lowerFirst, mapKeys } from "lodash";
import { Dispatch, useCallback, useEffect, useRef } from "react";
import { ChildrenProps } from "reaxify/types";
import SignalRContext from "./Context";
import { SignalRNotificationCommand } from "./types";

type CommandCallbackItem = {
  id: string;
  // eslint-disable-next-line
  callback: Dispatch<any>;
};
type DataCallbackItem = {
  id: string;
  // eslint-disable-next-line
  callback: Dispatch<any>;
};

export default function SignalRProvider({ children }: ChildrenProps) {
  const commandCallbacksRef = useRef<Record<string, CommandCallbackItem[]>>({});
  const dataCallbacksRef = useRef<Record<string, DataCallbackItem[]>>({});

  const accessToken = useTokenStore((s) => s.accessToken);

  const setCommandCallback = useCallback(
    ({
      command,
      id,
      callback,
    }: {
      command: SignalRNotificationCommand;
      id: string;
      // eslint-disable-next-line
      callback: Dispatch<any>;
    }) => {
      if (!commandCallbacksRef.current[command]) {
        commandCallbacksRef.current[command] = [];
      }
      const callbacks = commandCallbacksRef.current[command];
      const index = callbacks.findIndex((e) => e.id === id);
      const has = index !== -1;
      if (has) callbacks[index].callback = callback;
      else callbacks.push({ id, callback });
    },
    []
  );
  const removeCommandCallback = useCallback(
    ({ command, id }: { command: SignalRNotificationCommand; id: string }) => {
      const callbacks = commandCallbacksRef.current[command];
      if (!callbacks) return;
      const index = callbacks.findIndex((e) => e.id === id);
      const has = index !== -1;
      if (has) callbacks.splice(index, 1);
    },
    []
  );
  const setDataCallback = useCallback(
    ({
      command,
      id,
      callback,
    }: {
      command: SignalRNotificationCommand;
      id: string;
      // eslint-disable-next-line
      callback: Dispatch<any>;
    }) => {
      if (!dataCallbacksRef.current[command]) {
        dataCallbacksRef.current[command] = [];
      }
      const callbacks = dataCallbacksRef.current[command];
      const index = callbacks.findIndex((e) => e.id === id);
      const has = index !== -1;
      if (has) callbacks[index].callback = callback;
      else callbacks.push({ id, callback });
    },
    []
  );
  const removeDataCallback = useCallback(
    ({ command, id }: { command: SignalRNotificationCommand; id: string }) => {
      const callbacks = dataCallbacksRef.current[command];
      if (!callbacks) return;
      const index = callbacks.findIndex((e) => e.id === id);
      const has = index !== -1;
      if (has) callbacks.splice(index, 1);
    },
    []
  );

  useEffect(() => {
    if (!accessToken) return;
    // eslint-disable-next-line
    const normalizeKeys = (obj: Record<string, any>) =>
      mapKeys(obj, (_, key) => (/^[A-Z]/.test(key) ? lowerFirst(key) : key));

    const connection = new HubConnectionBuilder()
      .withUrl(`${appConfig.baseUrl}/app-hub`, {
        accessTokenFactory: () => accessToken,
        withCredentials: true,
        transport:
          HttpTransportType.WebSockets |
          HttpTransportType.ServerSentEvents |
          HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log("✅ SignalR connection started");
        connection.on(
          "onCommandReceived",
          (command: SignalRNotificationCommand, data) => {
            const jsonData = c(data).json().get();
            const normalizedData = jsonData ? normalizeKeys(jsonData) : null;
            console.log({ command, data: normalizedData });
            commandCallbacksRef.current[command]?.forEach((e) => {
              e.callback(normalizedData);
            });
            dataCallbacksRef.current[command]?.forEach((e) => {
              e.callback(normalizedData);
            });
          }
        );
      })
      .catch((err) => {
        console.error("❌ SignalR connection failed:", err);
      });
    connection.onreconnected(() => {
      console.log("🔁 SignalR reconnected");
    });
    connection.onclose((err) => {
      console.warn("⚠️ SignalR disconnected", err);
    });
    return () => {
      console.log("🛑 SignalR connection stopped");
      connection.stop();
    };
  }, [accessToken]);
  return (
    <SignalRContext.Provider
      value={{
        setCommandCallback,
        removeCommandCallback,
        setDataCallback,
        removeDataCallback,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
}
