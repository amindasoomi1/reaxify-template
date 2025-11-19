import { createContext, Dispatch } from "react";
import { SignalRNotificationCommand } from "./types";

type Context = {
  setCommandCallback: Dispatch<{
    command: SignalRNotificationCommand;
    id: string;
    // eslint-disable-next-line
    callback: Dispatch<any>;
  }>;
  removeCommandCallback: Dispatch<{
    command: SignalRNotificationCommand;
    id: string;
  }>;
  setDataCallback: Dispatch<{
    command: SignalRNotificationCommand;
    id: string;
    // eslint-disable-next-line
    callback: Dispatch<any>;
  }>;
  removeDataCallback: Dispatch<{
    command: SignalRNotificationCommand;
    id: string;
  }>;
};

const SignalRContext = createContext<Context | null>(null);

export default SignalRContext;
