import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import cx from "clsx";

type SectionProps = { children: ReactNode };
type TitleSectionProps = {
  icon: IconProp;
  sizeIcon?: SizeProp;
  label: string;
  action?: ReactNode;
};
type ContentSectionProps = { className?: string; children: ReactNode };
type SubtitleProps = SectionProps;

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
      {action}
    </div>
  );
}

export function Subtitle({ children }: SubtitleProps) {
  return <h4 className="text-sm text-slate-600">{children}</h4>;
}

export function ContentSection({ className, children }: ContentSectionProps) {
  return <div className={cx("pl-7", className)}>{children}</div>;
}
