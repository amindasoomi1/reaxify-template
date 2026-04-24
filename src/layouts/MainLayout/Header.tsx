import { Icon, SearchBox } from "@/components";
import { Button } from "reaxify/components";

type Props = {
  onToggle: VoidFunction;
  onToggleLg: VoidFunction;
};

export default function Header({ onToggle, onToggleLg }: Props) {
  return (
    <header className="sticky w-full h-(--header-height) flex items-center gap-3 bg-white shadow px-(--layout-padding) transition-[padding] top-0 z-[2]">
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className="block lg:hidden"
        onClick={onToggle}
      >
        <Icon name="HambergerMenu" />
      </Button>
      <Button
        type="button"
        variant="text"
        color="dark"
        size="icon"
        className="hidden lg:block"
        onClick={onToggleLg}
      >
        <Icon name="HambergerMenu" />
      </Button>
      <span className="flex-1" />
      <SearchBox className="w-64" />
      <Button type="button" variant="text" color="dark" size="icon">
        <Icon name="Notification" variant="Bulk" />
      </Button>
      <Button type="button" variant="text" color="dark" size="icon">
        <Icon name="SliderHorizontal1" variant="Bulk" />
      </Button>
      <Button type="button" variant="text" color="dark" size="icon">
        <Icon name="GlobalSearch" variant="Bulk" />
      </Button>
    </header>
  );
}
