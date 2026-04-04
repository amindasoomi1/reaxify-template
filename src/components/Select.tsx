import { SelectItem } from "@/types";
import { isEqual, sortBy } from "lodash";
import {
  ComponentProps,
  Dispatch,
  FocusEvent,
  Fragment,
  MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu, Spinner } from "reaxify/components";
import Icon from "./Icon";
import Textfield from "./Textfield";

type BaseProps<T> = {
  value?: T;
  setValue?: Dispatch<T>;
  items?: SelectItem<T>[];
  onClick?: never;
  onFocus?: never;
  loading?: boolean;
  disabled?: boolean;
};
type Props<T> = BaseProps<T> &
  Omit<ComponentProps<typeof Textfield>, keyof BaseProps<T>>;
export default function Select<T>({
  value,
  setValue,
  items = [],
  loading,
  ...props
}: Props<T>) {
  const widthRef = useRef(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const anchorWidth = useMemo(() => {
    if (!anchorEl) return widthRef.current || "auto";
    widthRef.current = anchorEl.clientWidth;
    return anchorEl.clientWidth;
  }, [anchorEl]);
  const inputValue = useMemo(() => {
    return items.find((e) => e.id === value)?.name;
  }, [items, value]);
  const sortedItems = useMemo(() => {
    return sortBy(
      items,
      (e) => Number(e.id),
      (e) => e.name,
    );
  }, [items]);
  const show = (
    e:
      | MouseEvent<HTMLInputElement | HTMLTextAreaElement>
      | FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const parent = e.currentTarget.parentElement;
    setAnchorEl(parent);
  };
  const hide = () => {
    setAnchorEl(null);
  };
  const handleSetValue = (id: T) => {
    return () => {
      if (!isEqual(id, value)) setValue?.(id);
    };
  };
  return (
    <Fragment>
      <Textfield
        value={inputValue}
        onClick={show}
        onFocus={show}
        append={<Icon name="ArrowDown2" className="size-4" />}
        readOnly
        {...props}
      />
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={hide}
        style={{ width: anchorWidth }}
        className="max-h-60 overflow-auto"
        closeOnClick
      >
        {loading ? (
          <Spinner className="block mx-auto" />
        ) : sortedItems.length ? (
          sortedItems.map((e, i) => {
            return (
              <Menu.Item
                key={String(e.id)}
                as="button"
                type="button"
                onClick={handleSetValue(e.id)}
                autoFocus={i === 0}
              >
                {e.name}
              </Menu.Item>
            );
          })
        ) : null}
      </Menu>
    </Fragment>
  );
}
