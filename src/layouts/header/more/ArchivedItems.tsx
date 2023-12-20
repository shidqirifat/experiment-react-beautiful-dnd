import { ActionDelete } from "@/components/detail/delete";
import { TaskCard } from "@/components/task";
import useArchiveTasks from "@/hooks/useArchiveTasks";
import { Task } from "@/types/task";

type ArchivedItemsProps = { archivedTasks: Array<Task> };
type ItemProps = { task: Task };
type ActionProps = { children: string; onClick?: () => void };

const Dot = () => <>&#8226;</>;

const Action = ({ children, onClick }: ActionProps) => {
  return (
    <button
      onClick={onClick}
      className="underline underline-offset-2 text-sm font-normal"
    >
      {children}
    </button>
  );
};

const Item = ({ task }: ItemProps) => {
  const { toggleArchive } = useArchiveTasks();

  return (
    <div>
      <div className="border border-slate-200 shadow-lg rounded-lg">
        <TaskCard task={task} />
      </div>
      <div className="flex items-center gap-1 px-5">
        <Action onClick={() => toggleArchive(task.id)}>Send to board</Action>
        <Dot />
        <ActionDelete id={task.id} triggerEl={<Action>Delete</Action>} />
      </div>
    </div>
  );
};

export function ArchivedItems({ archivedTasks }: ArchivedItemsProps) {
  if (archivedTasks.length === 0) {
    return (
      <div className="grid place-content-center h-96">
        <img src="/empty.png" alt="Empty Archive" />
        <h3 className="text-slate-600 text-lg font-medium text-center">
          No archive item
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {archivedTasks.map((task) => (
        <Item key={task.id} task={task} />
      ))}
    </div>
  );
}
