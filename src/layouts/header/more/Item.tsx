import { ActionDelete } from "@/components/detail/delete";
import { TaskCard } from "@/components/task";
import useArchiveTasks from "@/hooks/useArchiveTasks";
import { Task } from "@/types/task";

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

export const Item = ({ task }: ItemProps) => {
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
