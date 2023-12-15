import { useNavigate, useParams } from "react-router-dom";
import useTasks from "./useTasks";
import { useCallback, useEffect, useState } from "react";
import { DueDate, Task } from "@/types/task";

type TParams = { taskId?: string };

export default function useTask() {
  const [task, setTask] = useState<Task | null>(null);
  const { tasks, updateTask } = useTasks();
  const { taskId } = useParams<TParams>();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    updateTask(taskId as string, task as Task);
    navigate("/");
  }, [taskId, task]);

  const handleSaveTitle = useCallback((value: string) => {
    setTask((prev) => {
      if (!prev) return null;
      return { ...prev, title: value };
    });
  }, []);

  const handleSaveDescription = useCallback((value: string) => {
    setTask((prev) => {
      if (!prev) return null;
      return { ...prev, description: value };
    });
  }, []);

  const handleToggleCompleteDate = useCallback((value: boolean) => {
    setTask((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        due_date: { ...(prev?.due_date as DueDate), is_done: value },
      };
    });
  }, []);

  useEffect(() => {
    const currentTask = tasks.find((task) => task.id === taskId);

    if (currentTask) setTask(currentTask);
    else handleClose();

    return () => setTask(null);
  }, [taskId, tasks]);

  return {
    task,
    onClose: handleClose,
    onToggleComplete: handleToggleCompleteDate,
    onSaveTitle: handleSaveTitle,
    onSaveDescription: handleSaveDescription,
  };
}
