import { Dispatch, HTMLInputTypeAttribute } from "react";
import { Rules, useInputRules } from "react-form-rules";
import { InputGroup, Typography } from "reaxify/components";
import { cn } from "reaxify/helpers";
type Props = {
  label: string;
  rules?: Rules;
  value?: string | null;
  setValue?: Dispatch<string | null>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoFocus?: boolean;
};

export default function Textfield({
  label,
  rules = [],
  value,
  setValue,
  placeholder,
  type = "text",
  autoFocus = false,
}: Props) {
  const { ref, error, helperText } = useInputRules({ rules });
  return (
    <InputGroup>
      <InputGroup.Label>{label}</InputGroup.Label>
      <InputGroup.Stack className={cn(error && "border-danger")}>
        <InputGroup.FormControl
          ref={ref}
          value={value ?? ""}
          onChange={(e) => setValue?.(e.target.value || null)}
          placeholder={placeholder}
          type={type}
          autoFocus={autoFocus}
        />
      </InputGroup.Stack>
      <Typography
        variant="body-2"
        className={cn(
          "empty:hidden mt-px",
          error ? "text-danger" : "text-gray-400"
        )}
      >
        {helperText}
      </Typography>
    </InputGroup>
  );
}
