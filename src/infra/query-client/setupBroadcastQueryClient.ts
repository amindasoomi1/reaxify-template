import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import type { QueryClient } from "@tanstack/react-query";
import config from "./config";

export function setupBroadcastQueryClient(queryClient: QueryClient) {
  if (typeof window === "undefined") return;

  broadcastQueryClient({
    queryClient,
    broadcastChannel: config.broadcastChannel,
  });
}
