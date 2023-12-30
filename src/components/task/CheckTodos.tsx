import { Todo } from "@/types/task";
import { getTotalDone, getTotalTodo } from "@/utils/todo";
import { useMemo } from "react";

type CheckTodosProps = { todos: Array<Todo> | undefined };

export const CheckTodos = ({ todos }: CheckTodosProps) => {
  const totalDone = useMemo(() => getTotalDone(todos), [todos]);
  const totalTodo = useMemo(() => getTotalTodo(todos), [todos]);

  if (!todos) return null;

  return (
    <h4 className="text-sm">
      ☑️ {totalDone}/{totalTodo}
    </h4>
  );
};
