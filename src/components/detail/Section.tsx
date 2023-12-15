import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import cx from "clsx";
import { Button } from "../ui/button";

type SectionProps = { children: ReactNode };
type TitleSectionProps = {
  icon: IconProp;
  sizeIcon?: SizeProp;
  label: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
};
type ContentSectionProps = { className?: string; children: ReactNode };

export function Section({ children }: SectionProps) {
  return <div className="pb-8">{children}</div>;
}

export function TitleSection({
  icon,
  sizeIcon = "1x",
  label,
  action,
}: TitleSectionProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon icon={icon} size={sizeIcon} />
        <h1 className="text-base font-semibold">{label}</h1>
      </div>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

export function ContentSection({ className, children }: ContentSectionProps) {
  return <div className={cx("pl-7", className)}>{children}</div>;
}
