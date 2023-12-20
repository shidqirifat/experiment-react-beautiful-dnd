import { TaskCard } from "@/components/task";
import { Task } from "@/types/task";

type ArchivedItemsProps = { archivedTasks: Array<Task> };
type ItemProps = { task: Task };
type ActionProps = { children: string };

const Dot = () => <>&#8226;</>;

const Action = ({ children }: ActionProps) => {
  return (
    <button className="underline underline-offset-1 text-sm font-normal">
      {children}
    </button>
  );
};

const Item = ({ task }: ItemProps) => {
  return (
    <div>
      <div className="border border-slate-200 shadow-lg rounded-lg">
        <TaskCard task={task} />
      </div>
      <div className="flex items-center gap-1 px-5">
        <Action>Send to board</Action>
        <Dot />
        <Action>Delete</Action>
      </div>
    </div>
  );
};

export function ArchivedItems({ archivedTasks }: ArchivedItemsProps) {
  return (
    <div className="space-y-5">
      {archivedTasks.map((task) => (
        <Item key={task.id} task={task} />
      ))}
    </div>
  );
}
