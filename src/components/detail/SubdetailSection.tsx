import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentSection, Section, Subtitle } from ".";
import { DueDate, Label } from "@/types/task";
import { formatDate } from "@/utils/time";
import { LabelItem } from "../task";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

type SubdetailSectionProps = {
  labels: Array<Label> | undefined;
  dueDate: DueDate | undefined;
  onToggleComplete: (value: boolean) => void;
};
type LabelsSectionProps = { labels: Array<Label> };
type DateProps = {
  endDate: string;
  completed: boolean;
  onToggleComplete: (value: boolean) => void;
};

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

const DateCompleted = () => {
  return (
    <button className="bg-green-700 py-[1px] px-1 text-xs font-semibold text-white rounded-sm">
      Complete
    </button>
  );
};

const Date = ({ endDate, completed, onToggleComplete }: DateProps) => {
  return (
    <div>
      <Subtitle>Due date</Subtitle>
      <div className="flex items-center gap-2 mt-1">
        <Checkbox checked={completed} onCheckedChange={onToggleComplete} />
        <button className="py-2 px-3 bg-slate-200 hover:bg-slate-300 transition rounded-sm flex gap-2 items-center">
          <h4 className="text-sm font-medium">
            {formatDate(endDate, "MMM D")} at {formatDate(endDate, "h:mm A")}
          </h4>
          {completed && <DateCompleted />}
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </button>
      </div>
    </div>
  );
};

export function SubdetailSection({
  labels,
  dueDate,
  onToggleComplete,
}: SubdetailSectionProps) {
  return (
    <Section>
      <ContentSection>
        <div className="flex gap-5">
          {labels && <LabelsSection labels={labels} />}
          {dueDate && (
            <Date
              endDate={dueDate.end_date}
              completed={dueDate.is_done}
              onToggleComplete={onToggleComplete}
            />
          )}
        </div>
      </ContentSection>
    </Section>
  );
}
