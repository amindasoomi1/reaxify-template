export function getAxiosHttpStatus(error: unknown): number | null {
  // eslint-disable-next-line
  const err = error as any;
  const raw = err?.response?.status ?? err?.config?.status ?? err?.status;
  const status = Number(raw);
  if (!Number.isFinite(status) || status === 0) return null;
  return status;
}
