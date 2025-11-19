import { useContext } from "react";
import SignalRContext from "./Context";

export default function useSignalRContext() {
  const signalRContext = useContext(SignalRContext);
  if (!signalRContext) throw Error("signal-r not found!");
  return signalRContext;
}
