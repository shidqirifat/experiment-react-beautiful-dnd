import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

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

export { todoSchema };

export type { TodoForm, FormTodoProps, TodoModalProps };
