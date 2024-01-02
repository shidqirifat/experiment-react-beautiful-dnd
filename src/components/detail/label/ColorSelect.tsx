import { Color } from "@/types/label";
import { cn } from "@/utils";
import { colorVariants } from "@/utils/label";

type ColorSelectProps = {
  selected?: boolean;
  color: Color;
  children?: string;
  onClick?: (color: Color) => void;
};

export const ColorSelect = ({
  selected,
  color,
  children,
  onClick,
}: ColorSelectProps) => {
  const generateTextHover = () => {
    if (typeof children !== "string") return color;

    return `Color: ${color}; title: ${children || "none"}`;
  };

  return (
    <button
      title={generateTextHover()}
      type="button"
      onClick={() => onClick && onClick(color)}
      className={cn(
        "h-7 w-full block rounded-sm text-sm leading-4 text-left px-3 font-semibold transition hover:brightness-90",
        {
          "outline outline-blue-400 outline-offset-1": selected,
        },
        colorVariants({ color })
      )}
    >
      {children}
    </button>
  );
};
