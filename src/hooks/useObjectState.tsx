import { cloneDeep } from "lodash";
import { Dispatch, SetStateAction } from "react";

type Rule<D, K extends keyof D> = (value: D[K], data: D) => Partial<D> | void;

type Rules<D> = {
  [K in keyof D]?: Rule<D, K>;
};

export default function useObjectState<D extends object>(
  setData: Dispatch<SetStateAction<D>>,
  rules?: Rules<D>,
) {
  const handleSetData = <K extends keyof D>(key: K) => {
    return (value: D[K]) => {
      setData((p) => {
        const data = cloneDeep(p);
        data[key] = value;

        const rule = rules?.[key];
        if (!rule) return data;

        const changes = rule(value, data);
        if (!changes) return data;

        return { ...data, ...changes };
      });
    };
  };
  return handleSetData;
}
