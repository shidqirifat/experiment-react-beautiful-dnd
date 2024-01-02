import { SubdetailSectionProps } from "@/components/detail";
import { DueDate } from "./task";

type DateProps = {
  dueDate: DueDate;
  completed: boolean;
} & Pick<
  SubdetailSectionProps,
  "onRemoveDueDate" | "onSaveDueDate" | "onToggleComplete"
>;

export type { DateProps };
