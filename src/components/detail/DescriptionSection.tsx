import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { ContentSection, Section, TitleSection } from ".";

type DescriptionSectionProps = { children: string };

const Placeholder = () => {
  return (
    <div className="bg-slate-200 hover:bg-slate-300 transition rounded-sm py-2 px-3 cursor-pointer h-14">
      <h3 className="text-sm font-semibold text-slate-700">
        Add a more detailed description...
      </h3>
    </div>
  );
};

export function DescriptionSection({ children }: DescriptionSectionProps) {
  return (
    <Section>
      <TitleSection
        icon={faIndent}
        label="Description"
        action={children ? { label: "Edit" } : undefined}
      />
      <ContentSection className="mt-3">
        {children || <Placeholder />}
      </ContentSection>
    </Section>
  );
}
