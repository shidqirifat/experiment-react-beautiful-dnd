import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Labels, CheckTodos, Date, Link, Archived } from ".";
import { Task } from "@/types/task";
import { Link as RouterLink } from "react-router-dom";
import { faIndent } from "@fortawesome/free-solid-svg-icons";

type TaskCardProps = { task: Task };

export function TaskCard({ task }: TaskCardProps) {
  return (
    <RouterLink to={task.id} className="px-4 py-2 block">
      <Labels labels={task.labels} />
      <h1 className="text-base">{task.title}</h1>
      <div className="flex gap-3 items-center">
        <Date dueDate={task.due_date} />
        {task.description && <FontAwesomeIcon icon={faIndent} />}
        <Link total={task.links?.length} />
        <CheckTodos todos={task.todos} />
        {task.archived && <Archived />}
      </div>
    </RouterLink>
  );
}
