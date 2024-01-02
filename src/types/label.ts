import * as z from "zod";
import { Label } from "./task";
import { COLORS } from "@/datas/color";

const labelSchema = z.object({
  name: z.string(),
  color: z.enum(COLORS),
});

type LabelForm = z.infer<typeof labelSchema>;

type Color = (typeof COLORS)[number];

type TypeForm = "create" | "edit";

type LabelModalProps = {
  labelsActive: Array<Label> | undefined;
  withIcon?: boolean;
  onInsert?: (form: LabelForm) => void;
  onUpdate?: (id: string, form: LabelForm) => void;
};

type FormLabelProps = {
  initialForm: Label | null;
  type: TypeForm;
  onBack: () => void;
  onClose: () => void;
};

type FormSelectLabelProps = {
  onClose: () => void;
  onClickButtonEdit: (label: Label) => void;
  onClickButtonCreate: () => void;
  labelsActive: Array<Label> | undefined;
};

interface handleCreateArgs {
  name: string;
  color: Color;
}

interface handleEditArgs extends handleCreateArgs {
  id: string;
}

export { labelSchema };

export type {
  TypeForm,
  Color,
  LabelForm,
  LabelModalProps,
  FormLabelProps,
  FormSelectLabelProps,
  handleCreateArgs,
  handleEditArgs,
};
