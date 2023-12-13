import { Categories, CheckTodos, Date, Link } from ".";
import { Task } from "../../types/reorder";

type TaskCardProps = { task: Task };
type SymbolProps = { children: string };

const Symbol = ({ children }: SymbolProps) => {
  return <h4 dangerouslySetInnerHTML={{ __html: children }} />;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <>
      <Categories categories={task.categories} />
      <h1 className="text-base mt-1">{task.title}</h1>
      <div className="flex gap-3 items-center">
        <Date dueDate={task.due_date} />
        {task.description && <Symbol>&#x1F4AC</Symbol>}
        <Link total={task.links?.length} />
        <CheckTodos todos={task.todos} />
      </div>
    </>
  );
}
