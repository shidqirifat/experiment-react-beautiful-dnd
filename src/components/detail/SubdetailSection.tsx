import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentSection, Section, Subtitle } from ".";
import { DueDate, Label } from "@/types/task";
import { LabelItem } from "../task";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ActionDate } from "./date";

type SubdetailSectionProps = {
  labels: Array<Label> | undefined;
  dueDate: DueDate | undefined;
  onToggleComplete: (value: boolean) => void;
  onSaveDueDate: (startDate: string, endDate: string) => void;
  onRemoveDueDate: () => void;
};
type LabelsSectionProps = { labels: Array<Label> };
type DateProps = {
  dueDate: DueDate;
  completed: boolean;
} & Pick<
  SubdetailSectionProps,
  "onRemoveDueDate" | "onSaveDueDate" | "onToggleComplete"
>;

const LabelsSection = ({ labels }: LabelsSectionProps) => {
  return (
    <div>
      <Subtitle>Labels</Subtitle>
      <div>
        {labels.map((label) => (
          <LabelItem key={label.id} label={label} />
        ))}
        <Button className="h-9 mt-1">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </div>
  );
};

const Date = ({
  dueDate,
  completed,
  onToggleComplete,
  onSaveDueDate,
  onRemoveDueDate,
}: DateProps) => {
  return (
    <div>
      <Subtitle>Due date</Subtitle>
      <div className="flex items-center gap-2 mt-1">
        <Checkbox checked={completed} onCheckedChange={onToggleComplete} />
        <ActionDate
          completed={completed}
          dueDate={dueDate}
          onSave={onSaveDueDate}
          onRemove={onRemoveDueDate}
        />
      </div>
    </div>
  );
};

export function SubdetailSection({
  labels,
  dueDate,
  onToggleComplete,
  onSaveDueDate,
  onRemoveDueDate,
}: SubdetailSectionProps) {
  return (
    <Section>
      <ContentSection>
        <div className="flex gap-5">
          {labels && <LabelsSection labels={labels} />}
          {dueDate && (
            <Date
              dueDate={dueDate}
              completed={dueDate.is_done}
              onToggleComplete={onToggleComplete}
              onSaveDueDate={onSaveDueDate}
              onRemoveDueDate={onRemoveDueDate}
            />
          )}
        </div>
      </ContentSection>
    </Section>
  );
}
