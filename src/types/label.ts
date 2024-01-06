import * as z from "zod";
import { Label } from "./task";
import { COLORS } from "@/datas/color";
import { ReactNode } from "react";

const labelSchema = z.object({
  name: z.string(),
  color: z.enum(COLORS),
});

type LabelForm = z.infer<typeof labelSchema>;

type Color = (typeof COLORS)[number];

type TypeForm = "create" | "edit";

type LabelModalProps = {
  labelsActive?: Array<Label>;
  align?: "end" | "start";
  onSelect?: (label: Label) => void;
  children: ReactNode;
};

type LabelsWrapperProps = Pick<LabelModalProps, "labelsActive" | "onSelect"> & {
  onClose?: (fn?: (() => void) | undefined) => void;
};

type FormLabelProps = {
  withHeader?: boolean;
  initialForm: Label | null;
  type: TypeForm;
  onBack: () => void;
  onClose: () => void;
  onDelete: () => void;
};

type FormSelectLabelProps = {
  withHeader?: boolean;
  onClose: () => void;
  onClickButtonEdit: (label: Label) => void;
  onClickButtonCreate: () => void;
  onSelectLabel?: (label: Label) => void;
  labelsActive: Array<Label> | undefined;
};

interface handleCreateArgs {
  name: string;
  color: Color;
}

interface handleEditArgs extends handleCreateArgs {
  id: string;
}

type ActionDeleteProps = {
  onBack: () => void;
  onClose: () => void;
  onDelete: () => void;
};

type LabelsSectionProps = {
  labels: Array<Label>;
  onSelect: (label: Label) => void;
};

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
  ActionDeleteProps,
  LabelsSectionProps,
  LabelsWrapperProps,
};
