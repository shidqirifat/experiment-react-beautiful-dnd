import { faChevronDown, faHeading } from "@fortawesome/free-solid-svg-icons";
import { ContentSection, Section, TitleSection } from ".";
import { DueDate, Label } from "../../types/task";
import { LabelItem } from "../task";
import { formatDate } from "../../utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderSectionProps = {
  title: string;
  labels: Array<Label> | undefined;
  dueDate: DueDate | undefined;
};
type LabelsSectionProps = { labels: Array<Label> };
type DateProps = { date: string; completed: boolean };
type InListProps = { children: string };

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

const Date = ({ date, completed }: DateProps) => {
  return (
    <div>
      <h4 className="text-sm text-slate-600">Due date</h4>
      <button className="py-2 px-3 bg-slate-200 hover:bg-slate-300 transition rounded-sm mt-1 flex gap-2 items-center">
        <h4 className="text-sm font-medium">
          {formatDate(date, "MMM D")} at {formatDate(date, "h:mm A")}
        </h4>
        {completed && <DateCompleted />}
        <FontAwesomeIcon icon={faChevronDown} size="xs" />
      </button>
    </div>
  );
};

const InList = ({ children }: InListProps) => {
  return (
    <h4 className="text-slate-600 text-sm mb-6">
      in list <span className="font-medium">{children}</span>
    </h4>
  );
};

export function HeaderSection({ title, labels, dueDate }: HeaderSectionProps) {
  return (
    <Section>
      <TitleSection icon={faHeading} label={title} headerSection />
      <ContentSection>
        <InList>Done 🎉</InList>

        <div className="flex gap-3">
          {labels && <LabelsSection labels={labels} />}
          {dueDate && <Date date={dueDate.date} completed={dueDate.is_done} />}
        </div>
      </ContentSection>
    </Section>
  );
}
