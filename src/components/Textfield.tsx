import { InputGroup, Typography } from "reaxify/components";
import { cn } from "reaxify/helpers";
import { useInputValidation } from "reaxify/hooks";

type Props = {
  label: string;
};

export default function Textfield({ label }: Props) {
  const { ref, error, errorMessage } = useInputValidation({
    rules: [(val) => !!val.trim().length || "Field is required."],
  });
  return (
    <InputGroup>
      <InputGroup.Label>{label}</InputGroup.Label>
      <InputGroup.Stack className={cn(error && "border-danger")}>
        <InputGroup.FormControl ref={ref} />
      </InputGroup.Stack>
      <Typography
        variant="body-2"
        className={cn("empty:hidden", error ? "text-danger" : "text-gray-400")}
      >
        {errorMessage}
      </Typography>
    </InputGroup>
  );
}
