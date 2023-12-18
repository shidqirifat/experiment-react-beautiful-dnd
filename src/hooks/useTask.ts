import { useNavigate, useParams } from "react-router-dom";
import useTasks from "./useTasks";
import { useCallback, useEffect, useState } from "react";
import { DueDate, Link, Task } from "@/types/task";
import { LinkForm } from "@/types/link";

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

  const handleAddLink = useCallback((form: LinkForm) => {
    const link: Link = {
      id: (+new Date()).toString(),
      updated_at: new Date().toISOString(),
      ...form,
    };

    setTask((prev) => {
      if (!prev) return null;
      return { ...prev, links: [...(prev.links as Array<Link>), link] };
    });
  }, []);

  const handleEditLink = useCallback((id: string, form: LinkForm) => {
    setTask((prev) => {
      if (!prev) return null;

      const cloneLinks = [...(prev.links || [])];
      const index = cloneLinks.findIndex((link) => link.id === id);

      if (index === -1) return { ...prev, links: [] };
      else {
        const link: Link = {
          id,
          updated_at: new Date().toISOString(),
          ...form,
        };
        cloneLinks.splice(index, 1, link);

        return { ...prev, links: cloneLinks };
      }
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
    onAddLink: handleAddLink,
    onEditLink: handleEditLink,
  };
}