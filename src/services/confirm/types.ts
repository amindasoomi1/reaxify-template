import { Dispatch } from "react";
import { ButtonVariant, Color } from "reaxify/types";

export type ConfirmConfig = {
  title?: string;
  description?: string;
  okButton?: { title?: string; color?: Color; variant?: ButtonVariant };
  cancelButton?: { title?: string; color?: Color; variant?: ButtonVariant };
  onOk?: VoidFunction;
  onCancel?: Dispatch<"canceled" | "closed">;
};
export type ConfirmItem = ConfirmConfig & { id: string };
export type ConfirmResolve =
  | {
      confirmed: true;
      reason: "confirmed";
    }
  | {
      confirmed: false;
      reason: "canceled" | "closed";
    };
