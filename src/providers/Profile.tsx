import { ChildrenProps } from "@/types";
import { Fragment } from "react/jsx-runtime";

export default function ProfileProvider({ children }: ChildrenProps) {
  return <Fragment>{children}</Fragment>;
}
