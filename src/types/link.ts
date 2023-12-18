import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Link } from "./task";

const linkSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  name: z.string(),
});

type LinkForm = z.infer<typeof linkSchema>;

type TypeForm = "add" | "edit";

type LinkModalProps = {
  initialForm?: Link;
  type: TypeForm;
  onInsert?: (form: LinkForm) => void;
  onUpdate?: (id: string, form: LinkForm) => void;
};

type FormLinkProps = {
  type: TypeForm;
  form: UseFormReturn<LinkForm>;
  onSubmit: (form: LinkForm) => void;
  onClose: () => void;
};

type LinkSectionProps = {
  links: Array<Link> | undefined;
  onEditLink: (id: string, form: LinkForm) => void;
};

type LinkItemProps = {
  link: Link;
  onEditLink: (id: string, form: LinkForm) => void;
};

export { linkSchema };
export type {
  LinkForm,
  TypeForm,
  LinkModalProps,
  FormLinkProps,
  LinkItemProps,
  LinkSectionProps,
};
