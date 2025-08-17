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
  inputDir?: "ltr" | "rtl" | "auto";
  name?: string;
};

export default function Textfield({
  label,
  rules = [],
  value,
  setValue,
  placeholder,
  type = "text",
  autoFocus = false,
  inputDir,
  name,
}: Props) {
  const { ref, error, helperText } = useInputRules({ rules });
  return (
    <InputGroup>
      <InputGroup.Label>{label}</InputGroup.Label>
      <InputGroup.Stack className={cn(error && "border-danger")}>
        <InputGroup.FormControl
          ref={ref}
          dir={inputDir}
          name={name}
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
          "empty:hidden mt-px px-px",
          error ? "text-danger" : "text-gray-400"
        )}
      >
        {helperText}
      </Typography>
    </InputGroup>
  );
}
