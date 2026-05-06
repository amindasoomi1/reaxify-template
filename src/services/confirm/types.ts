import { Dispatch } from "react";
import { ButtonVariant, Color } from "reaxify/types";

export type ConfirmConfig = {
  title?: string;
  description?: string;
  okButton?: { title?: string; color?: Color; variant?: ButtonVariant };
  cancelButton?: { title?: string; color?: Color; variant?: ButtonVariant };
  onOk?: VoidFunction;
  onCancel?: Dispatch<string>;
};
export type ConfirmItem = ConfirmConfig & { id: string };
