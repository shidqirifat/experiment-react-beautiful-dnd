import { Todo } from "@/types/task";

type TodosArg = Array<Todo> | undefined;

const getTotalDone = (todos: TodosArg) => {
  if (!todos) return 0;

  let total = 0;
  for (const todo of todos) {
    total = todo.checklist.reduce((prev, item) => {
      if (item.is_done) return prev + 1;
      return prev;
    }, total);
  }

  return total;
};

const getTotalTodo = (todos: TodosArg) => {
  if (!todos) return 0;

  return todos.reduce((prev, todo) => {
    return prev + todo.checklist.length;
  }, 0);
};

export { getTotalDone, getTotalTodo };
