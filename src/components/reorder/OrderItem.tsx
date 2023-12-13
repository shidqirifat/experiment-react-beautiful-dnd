import { Draggable } from "react-beautiful-dnd";
import { Category, DueDate, Task, Todo } from "../../types/reorder";
import { formatDate, getDayToNow } from "../../utils/time";
import cx from "clsx";

type CategoriesProps = { categories: Array<Category> };

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          className="px-4 py-1 rounded-md inline-flex w-max mr-2 mb-2"
          style={{ backgroundColor: category.color }}
        >
          <h3 className="text-xs font-medium">{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

type DateProps = { dueDate: DueDate };

const Date = ({ dueDate: { date, is_done } }: DateProps) => {
  const dayToNow = getDayToNow(date);
  const isPast = dayToNow < 0;

  return (
    <button
      className={cx("py-1 px-2 rounded w-max mt-1", {
        "bg-yellow-400": !is_done && !isPast && dayToNow < 1,
        "bg-slate-200": !is_done && !isPast,
        "bg-red-400": !is_done && isPast,
        "bg-green-500": is_done,
      })}
    >
      <h4 className="text-xs">📅 {formatDate(date, "MMM D")}</h4>
    </button>
  );
};

type LinkProps = { total: number };

const Link = ({ total }: LinkProps) => {
  return (
    <div>
      <h4 className="text-gray-600 text-sm">🔗{total}</h4>
    </div>
  );
};

const Todos = ({ todos }: { todos: Array<Todo> }) => {
  const totalDone = todos.reduce((prev, todo) => {
    if (todo.is_done) return prev + 1;
    else return prev;
  }, 0);

  return (
    <h4 className="text-sm">
      ☑️{totalDone}/{todos.length}
    </h4>
  );
};

type SymbolProps = { children: string };

const Symbol = ({ children }: SymbolProps) => {
  return <h4 dangerouslySetInnerHTML={{ __html: children }} />;
};

type TaskItemProps = { task: Task; index: number };

export const TaskItem = ({ task, index }: TaskItemProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-lg bg-white px-4 py-2 select-none"
        >
          {task.categories && <Categories categories={task.categories} />}
          <h1 className="text-base">{task.title}</h1>
          <div className="flex gap-3 items-center">
            {task.due_date && <Date dueDate={task.due_date} />}
            {task.description && <Symbol>&#x1F4AC</Symbol>}
            {task.links && <Link total={task.links.length} />}
            {task.todos && <Todos todos={task.todos} />}
          </div>
        </div>
      )}
    </Draggable>
  );
};
