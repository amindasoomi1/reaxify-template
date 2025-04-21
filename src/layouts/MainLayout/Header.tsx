import { Icon, IconButton, SearchBox } from "@/components";

type Props = {
  onToggle: VoidFunction;
  onToggleLg: VoidFunction;
};

export default function Header({ onToggle, onToggleLg }: Props) {
  return (
    <header className="relative w-full h-16 flex items-center gap-3 bg-white shadow px-(--layout-padding) transition-[padding]">
      <IconButton
        type="button"
        variant="text"
        color="dark"
        className="block lg:hidden"
        onClick={onToggle}
      >
        <Icon name="HambergerMenu" />
      </IconButton>
      <IconButton
        type="button"
        variant="text"
        color="dark"
        className="hidden lg:block"
        onClick={onToggleLg}
      >
        <Icon name="HambergerMenu" />
      </IconButton>
      <span className="flex-1" />
      <SearchBox className="w-64" />
      <IconButton type="button" variant="text" color="dark">
        <Icon name="Notification" variant="Bulk" />
      </IconButton>
      <IconButton type="button" variant="text" color="dark">
        <Icon name="SliderHorizontal1" variant="Bulk" />
      </IconButton>
      <IconButton type="button" variant="text" color="dark">
        <Icon name="GlobalSearch" variant="Bulk" />
      </IconButton>
    </header>
  );
}
