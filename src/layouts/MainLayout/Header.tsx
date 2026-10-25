import { Icon, SearchBox } from "@/components";
import { Avatar, Button } from "reaxify/components";

type Props = {
  onToggle: VoidFunction;
  onToggleLg: VoidFunction;
};

const iconButtonClassName =
  "size-8 bg-white border border-border text-gray-600 hover:text-gray-900 hover:border-gray-300";

export default function Header({ onToggle, onToggleLg }: Props) {
  return (
    <header className="sticky w-full h-(--header-height) flex items-center gap-2 bg-background/80 backdrop-blur-xl px-(--layout-padding) transition-[padding] top-0 z-[2]">
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className={`${iconButtonClassName} flex lg:hidden`}
        onClick={onToggle}
      >
        <Icon name="HambergerMenu" className="size-4" />
      </Button>
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className={`${iconButtonClassName} hidden lg:flex`}
        onClick={onToggleLg}
      >
        <Icon name="HambergerMenu" className="size-4" />
      </Button>
      <SearchBox className="w-64 ms-1" />
      <span className="flex-1" />
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className={`${iconButtonClassName} relative`}
      >
        <Icon name="Notification" className="size-4" />
        <span className="absolute top-1.5 end-2 size-1.5 rounded-full bg-danger ring-2 ring-white" />
      </Button>
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className={iconButtonClassName}
      >
        <Icon name="SliderHorizontal1" className="size-4" />
      </Button>
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className={iconButtonClassName}
      >
        <Icon name="GlobalSearch" className="size-4" />
      </Button>
      <span className="hidden sm:block w-px h-6 bg-border mx-1" />
      <button
        type="button"
        className="hidden sm:flex items-center gap-2 ps-0.5 pe-2.5 h-8 rounded-full bg-white border border-border hover:border-gray-300 transition-colors"
      >
        <Avatar size="sm" className="size-7">
          <Avatar.Fallback className="bg-primary text-white text-[0.625rem] font-semibold">
            AD
          </Avatar.Fallback>
        </Avatar>
        <span className="text-xs font-semibold text-gray-800">Admin</span>
        <Icon name="ArrowDown2" className="size-3 text-gray-400" />
      </button>
    </header>
  );
}
