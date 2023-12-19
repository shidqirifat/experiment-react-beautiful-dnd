import { Label } from "@/types/task";
import cx from "clsx";

type LabelsProps = { labels: Array<Label> | undefined };
type LabelProps = { label: Label; cardLabel?: boolean };

export const LabelItem = ({ label, cardLabel }: LabelProps) => {
  return (
    <button
      key={label.id}
      className={cx(
        "px-3 inline-flex w-max mr-1 hover:brightness-110 transition",
        {
          "mt-2 rounded-md py-1 text-xs": cardLabel,
          "mt-1 rounded py-2 text-sm": !cardLabel,
        }
      )}
      style={{ backgroundColor: label.color }}
    >
      <h3 className="font-medium">{label.name}</h3>
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
