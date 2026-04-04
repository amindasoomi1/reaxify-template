import { types } from "@/constants";
import { useMemo } from "react";
import { Badge } from "reaxify/components";

type Props<T = number> = {
  id: T | null | undefined;
};

export function Is({ id }: Props<boolean>) {
  const result = useMemo(() => {
    return types.is.find((e) => e.id === id);
  }, [id]);
  if (!result) return null;
  return (
    <Badge color={result.color} variant="soft" size="sm">
      {result.name}
    </Badge>
  );
}
export function Can({ id }: Props<boolean>) {
  const result = useMemo(() => {
    return types.can.find((e) => e.id === id);
  }, [id]);
  if (!result) return null;
  return (
    <Badge color={result.color} variant="soft" size="sm">
      {result.name}
    </Badge>
  );
}
export function Has({ id }: Props<boolean>) {
  const result = useMemo(() => {
    return types.has.find((e) => e.id === id);
  }, [id]);
  if (!result) return null;
  return (
    <Badge color={result.color} variant="soft" size="sm">
      {result.name}
    </Badge>
  );
}
