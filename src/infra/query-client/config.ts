const config = {
  staleTime: 1000 * 60 * 2,
  refetchInterval: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: false,
  broadcastChannel: "reaxify-template-query",
  retry: {
    delay: 1000,
    maxFailureCount: 4,
    statuses: [500, 503, 409] as const,
  },
  throwErrorStatuses: [403, 404, 500, 502, 503] as const,
};
export default config;
