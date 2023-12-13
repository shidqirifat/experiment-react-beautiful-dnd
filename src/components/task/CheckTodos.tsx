import { Todo } from "../../types/task";

type CheckTodosProps = { todos: Array<Todo> | undefined };

export const CheckTodos = ({ todos }: CheckTodosProps) => {
  if (!todos) return null;

  const totalDone = todos.reduce((prev, todo) => {
    if (todo.is_done) return prev + 1;
    else return prev;
  }, 0);

  return (
    <h4 className="text-sm">
      ☑️ {totalDone}/{todos.length}
    </h4>
  );
};
