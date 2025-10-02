import { rules } from "@/constants";
import { Dispatch, HTMLInputTypeAttribute, useMemo } from "react";
import { Rules, useInputRules } from "react-form-rules";
import { InputGroup, Typography } from "reaxify/components";
import { cn } from "reaxify/helpers";
type Props = {
  label: string;
  rules?: Rules;
  value?: string;
  setValue?: Dispatch<string>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoFocus?: boolean;
  inputDir?: "ltr" | "rtl" | "auto";
  name?: string;
  required?: boolean;
};

export default function Textfield({
  label,
  rules: userRules = [],
  value,
  setValue,
  placeholder,
  type = "text",
  autoFocus = false,
  inputDir,
  name,
  required,
}: Props) {
  const inputRules = useMemo(() => {
    if (required) return [...rules.required, ...userRules];
    return userRules;
  }, [userRules, required]);
  const { ref, error, helperText } = useInputRules({ rules: inputRules });
  return (
    <InputGroup>
      <InputGroup.Label>
        {label}
        {required && <span className="inline-block ms-1 text-danger">*</span>}
      </InputGroup.Label>
      <InputGroup.Stack className={cn(error && "border-danger")}>
        <InputGroup.FormControl
          ref={ref}
          dir={inputDir}
          name={name}
          value={value ?? ""}
          onChange={(e) => setValue?.(e.target.value)}
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
