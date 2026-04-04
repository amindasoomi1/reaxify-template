import { status } from "@/constants";
import { Badge } from "reaxify/components";

type Props<T = number> = {
  id: T | null | undefined;
};

export function Active({ id }: Props<boolean>) {
  const result = status.active.find((e) => e.id === id);
  if (!result) return null;
  return (
    <Badge color={result.color} variant="soft" size="sm">
      {result.name}
    </Badge>
  );
}
