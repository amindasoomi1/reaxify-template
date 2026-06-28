import { appConfig } from "@/constants";
import { useTokenStore } from "@/stores";
import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { c } from "castium";
import { Fragment, useCallback, useEffect } from "react";
import { ChildrenProps } from "reaxify/types";
import { normalizeKeys } from "./helpers";
import { SignalRNotificationCommand } from "./types";

export default function SignalRProvider({ children }: ChildrenProps) {
  const accessToken = useTokenStore((s) => s.accessToken);

  const handleCommandReceived = useCallback(
    // eslint-disable-next-line
    (command: SignalRNotificationCommand, response: any) => {
      const data = c(response).json().transform(normalizeKeys).get();

      console.log({ command, data });

      switch (command) {
        case "TEST":
          console.log("TEST");
          break;
        default:
          break;
      }
    },
    [],
  );

  useEffect(() => {
    if (!accessToken) return;
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
          (command: SignalRNotificationCommand, response) => {
            handleCommandReceived(command, response);
          },
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
  }, [accessToken, handleCommandReceived]);
  return <Fragment>{children}</Fragment>;
}
