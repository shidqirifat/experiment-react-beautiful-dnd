import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { ContentSection, Section, Subtitle } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Input } from "../ui/input";
import { useClickOutside } from "@mantine/hooks";

type HeaderSectionProps = { title: string; onSave: (value: string) => void };
type InListProps = { children: string };
type TitleProps = { children: string; onSave: (value: string) => void };

const InList = ({ children }: InListProps) => {
  return (
    <Subtitle>
      in list <span className="font-medium">{children}</span>
    </Subtitle>
  );
};

const Title = ({ children, onSave }: TitleProps) => {
  const [title, setTitle] = useState(children);
  const [isEdit, setEdit] = useState(false);

  const toggleEdit = () => setEdit(!isEdit);
  const ref = useClickOutside(() => {
    onSave(title);
    toggleEdit();
  });

  return (
    <div className="flex gap-3 items-center">
      <FontAwesomeIcon icon={faHeading} />
      <div className="h-10 w-full mr-8">
        {isEdit ? (
          <Input
            ref={ref}
            autoFocus
            className="relative -left-2 text-base font-semibold pl-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1
            onClick={toggleEdit}
            className="cursor-pointer text-base font-semibold w-full py-2"
          >
            {title}
          </h1>
        )}
      </div>
    </div>
  );
};

export function HeaderSection({ title, onSave }: HeaderSectionProps) {
  return (
    <Section>
      <Title onSave={onSave}>{title}</Title>
      <ContentSection className="mt-1">
        <InList>Done 🎉</InList>
      </ContentSection>
    </Section>
  );
}
