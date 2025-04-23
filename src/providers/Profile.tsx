import { Fragment } from "react/jsx-runtime";
import { ChildrenProps } from "reaxify/types";

export default function ProfileProvider({ children }: ChildrenProps) {
  return <Fragment>{children}</Fragment>;
}
