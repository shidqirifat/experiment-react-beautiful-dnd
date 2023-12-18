import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { ContentSection, Section, TitleSection } from ".";
import { useState } from "react";
import { Button } from "../ui/button";

type DescriptionSectionProps = {
  children: string;
  onSave: (value: string) => void;
};

type EditorProps = {
  children: string;
  isEdit: boolean;
  toggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
};

const Placeholder = () => {
  return (
    <div className="bg-slate-200 hover:bg-slate-300 transition rounded-sm py-2 px-3 cursor-pointer h-14">
      <h3 className="text-sm font-semibold text-slate-700">
        Add a more detailed description...
      </h3>
    </div>
  );
};

const Editor = (props: EditorProps) => {
  if (!props.isEdit) {
    return (
      <div onClick={props.toggleEdit} className="cursor-pointer text-sm">
        {props.children}
      </div>
    );
  }

  return (
    <div>
      <textarea
        value={props.children}
        autoFocus
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full h-52 p-4 border border-slate-200 rounded-sm focus:outline-blue-600"
      />
      <div className="flex gap-2">
        <Button onClick={props.onSave}>Save</Button>
        <Button variant="subtle" onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export function DescriptionSection({
  children,
  onSave,
}: DescriptionSectionProps) {
  const [text, setText] = useState(children);
  const [isEdit, setEdit] = useState(false);

  const handleSave = () => {
    onSave(text);
    toggleEdit();
  };

  const toggleEdit = () => setEdit(!isEdit);

  const handleCancel = () => {
    toggleEdit();
    setText(children);
  };

  return (
    <Section>
      <TitleSection
        icon={faIndent}
        label="Description"
        action={text ? { label: "Edit", onClick: toggleEdit } : undefined}
      />
      <ContentSection className="mt-3">
        {text ? (
          <Editor
            isEdit={isEdit}
            onChange={setText}
            onSave={handleSave}
            onCancel={handleCancel}
            toggleEdit={toggleEdit}
          >
            {text}
          </Editor>
        ) : (
          <Placeholder />
        )}
      </ContentSection>
    </Section>
  );
}
