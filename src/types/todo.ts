import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Todo } from "./task";

const todoSchema = z.object({
  title: z.string(),
});

type TodoForm = z.infer<typeof todoSchema>;

type FormTodoProps = {
  form: UseFormReturn<TodoForm>;
  onAdd: (form: TodoForm) => void;
  onClose: () => void;
};

type TodoModalProps = {
  onAdd: (form: TodoForm) => void;
};

type CheckItemProps = {
  name: string;
  isDone: boolean;
  onCheck: () => void;
  onChange: (name: string) => void;
  onDelete: () => void;
};

type TitleTodoProps = {
  children: string;
  isEdit: boolean;
  toggleEdit: () => void;
  onSave: (title: string) => void;
};

type onChangeNameCheckItemArgs = Record<"todoId" | "checkId" | "name", string>;

interface TodosSectionProps extends Todo {
  onChangeTitle: (id: string, title: string) => void;
  onDeleteTodo: (id: string) => void;
  onAddCheckItem: (toodId: string, name: string) => void;
  onChangeCheckItem: (toodId: string, checkId: string) => void;
  onChangeNameCheckItem: (args: onChangeNameCheckItemArgs) => void;
  onDeleteCheckItem: (toodId: string, checkId: string) => void;
}

type ProgressProps = {
  percentDone: number;
  hideDone: boolean;
};

export { todoSchema };

export type {
  TodoForm,
  FormTodoProps,
  TodoModalProps,
  CheckItemProps,
  TitleTodoProps,
  TodosSectionProps,
  ProgressProps,
  onChangeNameCheckItemArgs,
};
