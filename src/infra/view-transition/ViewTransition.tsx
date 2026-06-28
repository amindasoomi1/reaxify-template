import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
} from "react";
import { ChildrenProps } from "reaxify/types";

type Props = {
  name: string;
  enabled?: boolean;
} & ChildrenProps;

export default function ViewTransition({
  name,
  enabled = true,
  children,
}: Props) {
  const child = Children.only(children);

  if (!isValidElement(child) || !enabled) return children;

  const childProps = child.props as { style?: CSSProperties };
  const style: CSSProperties = {
    ...childProps.style,
    viewTransitionName: name,
  };
  return cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
    style,
  });
}
