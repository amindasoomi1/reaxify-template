import { range } from "lodash";
import { Skeleton, Table } from "reaxify/components";
type Props = {
  columns: number;
  rows: number;
  hasActions?: boolean;
};

export default function TableBodyRowsLoading({
  columns,
  rows,
  hasActions,
}: Props) {
  return (
    <>
      {range(rows).map((row) => (
        <Table.Row key={row}>
          {range(columns).map((column) => {
            const isLast = hasActions && column === columns - 1;
            return (
              <Table.DataCell key={column}>
                <Skeleton
                  className={isLast ? "size-6 rounded-full" : "h-4 w-full"}
                />
              </Table.DataCell>
            );
          })}
        </Table.Row>
      ))}
    </>
  );
}
