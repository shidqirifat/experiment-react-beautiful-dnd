import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Labels, CheckTodos, Date, Link } from ".";
import { Task } from "@/types/task";
import { Link as RouterLink } from "react-router-dom";
import { faIndent } from "@fortawesome/free-solid-svg-icons";

type TaskCardProps = { task: Task };

export function TaskCard({ task }: TaskCardProps) {
  return (
    <RouterLink to={task.id}>
      <Labels labels={task.labels} />
      <h1 className="text-base mt-1">{task.title}</h1>
      <div className="flex gap-3 items-center">
        <Date dueDate={task.due_date} />
        {task.description && <FontAwesomeIcon icon={faIndent} />}
        <Link total={task.links?.length} />
        <CheckTodos todos={task.todos} />
      </div>
    </RouterLink>
  );
}
