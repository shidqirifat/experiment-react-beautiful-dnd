import { useNavigate, useParams } from "react-router-dom";
import useTasks from "./useTasks";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../types/task";

type TParams = { taskId?: string };

export default function useTask() {
  const [task, setTask] = useState<Task | null>(null);
  const { tasks } = useTasks();
  const { taskId } = useParams<TParams>();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate("/");
  }, []);

  useEffect(() => {
    const currentTask = tasks.find((task) => task.id === taskId);

    if (currentTask) setTask(currentTask);
    else handleClose();

    return () => setTask(null);
  }, [taskId, tasks]);

  return { task, onClose: handleClose };
}
