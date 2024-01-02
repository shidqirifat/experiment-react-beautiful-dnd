import { Label } from "@/types/task";
import { colorVariants } from "@/utils/label";
import cx from "clsx";

type LabelsProps = { labels: Array<Label> | undefined };
type LabelProps = { label: Label; cardLabel?: boolean };

export const LabelItem = ({ label, cardLabel }: LabelProps) => {
  return (
    <button
      key={label.id}
      className={cx(
        "px-3 inline-flex w-max mr-1 text-sm hover:brightness-110 transition",
        {
          "mt-2 rounded-md py-[1px]": cardLabel,
          "mt-1 rounded py-[6px] h-8": !cardLabel,
        },
        colorVariants({ color: label.color })
      )}
    >
      <h3 className={cx("font-bold", { "opacity-0": !label.name })}>
        {label.name || "Empty"}
      </h3>
    </button>
  );
};

export const Labels = ({ labels }: LabelsProps) => {
  if (!labels) return null;

  return (
    <div className="mb-1">
      {labels.map((label) => (
        <LabelItem key={label.id} label={label} cardLabel />
      ))}
    </div>
  );
};
