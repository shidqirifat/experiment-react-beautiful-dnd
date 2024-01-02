import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentSection, Section, Subtitle } from ".";
import { DueDate, Label } from "@/types/task";
import { LabelItem } from "../task";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ActionDate } from "./date";
import { ActionLabel } from "./label";
import { LabelsSectionProps } from "@/types/label";
import { DateProps } from "@/types/date";

export type SubdetailSectionProps = {
  labels: Array<Label> | undefined;
  dueDate: DueDate | undefined;
  onToggleComplete: (value: boolean) => void;
  onSaveDueDate: (startDate: string, endDate: string) => void;
  onRemoveDueDate: () => void;
  onSelectLabel: (label: Label) => void;
};

const LabelsSection = ({ labels, onSelect }: LabelsSectionProps) => {
  return (
    <div>
      <Subtitle>Labels</Subtitle>
      <ActionLabel align="start" labelsActive={labels} onSelect={onSelect}>
        <div>
          {labels.map((label) => (
            <LabelItem key={label.id} label={label} />
          ))}
          <Button className="h-8 mt-1 py-[6px]">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </ActionLabel>
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
  onSelectLabel,
}: SubdetailSectionProps) {
  return (
    <Section>
      <ContentSection>
        <div className="flex gap-5 flex-wrap">
          {labels && labels.length > 0 && (
            <LabelsSection labels={labels} onSelect={onSelectLabel} />
          )}
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
