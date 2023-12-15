import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentSection, Section } from ".";
import { DueDate, Label } from "@/types/task";
import { formatDate } from "@/utils/time";
import { LabelItem } from "../task";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "../ui/checkbox";

type SubdetailSectionProps = {
  labels: Array<Label> | undefined;
  dueDate: DueDate | undefined;
  onToggleComplete: (value: boolean) => void;
};
type LabelsSectionProps = { labels: Array<Label> };
type DateProps = {
  date: string;
  completed: boolean;
  onToggleComplete: (value: boolean) => void;
};

const LabelsSection = ({ labels }: LabelsSectionProps) => {
  return (
    <div>
      <h4 className="text-sm text-slate-600">Labels</h4>
      {labels.map((label) => (
        <LabelItem key={label.id} label={label} />
      ))}
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

const Date = ({ date, completed, onToggleComplete }: DateProps) => {
  return (
    <div>
      <h4 className="text-sm text-slate-600">Due date</h4>
      <div className="flex items-center gap-2 mt-1">
        <Checkbox checked={completed} onCheckedChange={onToggleComplete} />
        <button className="py-2 px-3 bg-slate-200 hover:bg-slate-300 transition rounded-sm flex gap-2 items-center">
          <h4 className="text-sm font-medium">
            {formatDate(date, "MMM D")} at {formatDate(date, "h:mm A")}
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
        <div className="flex gap-3">
          {labels && <LabelsSection labels={labels} />}
          {dueDate && (
            <Date
              date={dueDate.date}
              completed={dueDate.is_done}
              onToggleComplete={onToggleComplete}
            />
          )}
        </div>
      </ContentSection>
    </Section>
  );
}
