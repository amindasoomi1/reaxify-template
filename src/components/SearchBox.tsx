import { Dispatch, FormEvent } from "react";
import { Button } from "reaxify/components";
import { ClassNameProps } from "reaxify/types";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";

type Props = {
  value?: string | null;
  setValue?: Dispatch<string | null>;
} & ClassNameProps;

export default function SearchBox({ className }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge(
        "lg:flex items-center w-full h-8 border border-gray-200 hover:border-gray-400 transition-colors rounded-full px-3 gap-2 hidden",
        className,
      )}
    >
      <Button type="submit" variant="text" color="dark" size="icon">
        <Icon name="SearchNormal1" className="size-4 text-gray-700" />
      </Button>
      <input
        type="text"
        className="flex-1 focus:outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
        placeholder="Search here..."
      />
    </form>
  );
}
