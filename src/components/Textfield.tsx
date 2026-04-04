import { rules } from "@/constants";
import {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  ElementType,
  HTMLInputTypeAttribute,
  ReactNode,
  useMemo,
} from "react";
import { Rules, useInputRules } from "react-form-rules";
import { InputGroup, Typography } from "reaxify/components";
import { cn } from "reaxify/helpers";
import { ComponentPropsWithAs } from "reaxify/types";
type Props = {
  label?: string;
  rules?: Rules;
  value?: string;
  setValue?: Dispatch<string>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoFocus?: boolean;
  inputDir?: "ltr" | "rtl" | "auto";
  name?: string;
  required?: boolean;
  inputMode?: ComponentProps<"input">["inputMode"];
  prepend?: ReactNode;
  append?: ReactNode;
};

export default function Textfield<E extends ElementType = "input">({
  as,
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
  inputMode,
  prepend = null,
  append = null,
  ...props
}: ComponentPropsWithAs<E, Props>) {
  const inputRules = useMemo(() => {
    if (required) return [...rules.required, ...userRules];
    if (value?.length) return userRules;
    return [];
  }, [userRules, required, value]);
  const { ref, error, helperText } = useInputRules({ rules: inputRules });
  return (
    <InputGroup>
      {label && (
        <InputGroup.Label>
          {label}
          {required ? (
            <span className="inline-block ms-1 text-danger">*</span>
          ) : (
            <span>(Optional)</span>
          )}
        </InputGroup.Label>
      )}
      <InputGroup.Stack className={cn(error && "border-danger")}>
        {!!prepend && <InputGroup.Text dir="auto">{prepend}</InputGroup.Text>}
        <InputGroup.FormControl
          ref={ref}
          as={as as ElementType}
          dir={inputDir}
          name={name}
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue?.(e.target.value)
          }
          placeholder={placeholder}
          type={type}
          autoFocus={autoFocus}
          inputMode={inputMode}
          {...props}
        />
        {!!append && <InputGroup.Text dir="auto">{append}</InputGroup.Text>}
      </InputGroup.Stack>
      <Typography
        variant="body-2"
        className={cn(
          "empty:hidden mt-px px-px",
          error ? "text-danger" : "text-gray-400",
        )}
      >
        {helperText}
      </Typography>
    </InputGroup>
  );
}
