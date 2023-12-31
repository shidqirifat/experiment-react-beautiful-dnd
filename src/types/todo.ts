import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Todo } from "./task";
import { OnDragEndResponder } from "react-beautiful-dnd";

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

type BaseTodosSectionProps = {
  onChangeTitle: (id: string, title: string) => void;
  onDeleteTodo: (id: string) => void;
  onAddCheckItem: (toodId: string, name: string) => void;
  onChangeCheckItem: (toodId: string, checkId: string) => void;
  onChangeNameCheckItem: (args: onChangeNameCheckItemArgs) => void;
  onDeleteCheckItem: (toodId: string, checkId: string) => void;
};

interface TodosSectionProps extends BaseTodosSectionProps {
  todos: Array<Todo> | undefined;
  onReorder: OnDragEndResponder;
}

type TodoSectionProps = BaseTodosSectionProps & Todo;

interface TodoItemProps extends BaseTodosSectionProps {
  todo: Todo;
  index: number;
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
  TodoSectionProps,
  TodoItemProps,
  ProgressProps,
  onChangeNameCheckItemArgs,
};
