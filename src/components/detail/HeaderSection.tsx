import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { ContentSection, Section, TitleSection } from ".";

type HeaderSectionProps = { title: string };
type InListProps = { children: string };

const InList = ({ children }: InListProps) => {
  return (
    <h4 className="text-slate-600 text-sm">
      in list <span className="font-medium">{children}</span>
    </h4>
  );
};

export function HeaderSection({ title }: HeaderSectionProps) {
  return (
    <Section>
      <TitleSection icon={faHeading} label={title} headerSection />
      <ContentSection className="mt-1">
        <InList>Done 🎉</InList>
      </ContentSection>
    </Section>
  );
}
