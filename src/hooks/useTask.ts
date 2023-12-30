import { useNavigate, useParams } from "react-router-dom";
import useTasks from "./useTasks";
import { useCallback, useEffect, useState } from "react";
import { DueDate, Link, Task, Todo } from "@/types/task";
import { LinkForm } from "@/types/link";
import { TodoForm } from "@/types/todo";

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

  const handleRemoveLink = useCallback((id: string) => {
    setTask((prev) => {
      if (!prev) return null;

      const cloneLinks = [...(prev.links || [])];
      const index = cloneLinks.findIndex((link) => link.id === id);

      if (index === -1) return { ...prev, links: [] };
      else {
        cloneLinks.splice(index, 1);

        return { ...prev, links: cloneLinks };
      }
    });
  }, []);

  const handleSaveDueDate = useCallback(
    (startDate: string, endDate: string) => {
      setTask((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          due_date: {
            ...(prev.due_date as DueDate),
            start_date: startDate,
            end_date: endDate,
          },
        };
      });
    },
    []
  );

  const handleRemoveDueDate = useCallback(() => {
    setTask((prev) => {
      if (!prev) return null;

      const cloneTask = { ...prev };
      delete cloneTask.due_date;

      return cloneTask;
    });
  }, []);

  const handleAddTodo = useCallback((form: TodoForm) => {
    const newTodo = { ...form, id: (+new Date()).toString(), checklist: [] };

    setTask((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        todos: [...(prev.todos as Array<Todo>), newTodo],
      };
    });
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    setTask((prev) => {
      if (!prev) return null;
      return { ...prev, todos: prev.todos?.filter((todo) => todo.id !== id) };
    });
  }, []);

  const handleChangeCheckItem = useCallback(
    (todoId: string, checkId: string) => {
      setTask((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          todos: prev?.todos?.map((todo) => {
            if (todo.id === todoId) {
              const newChecklist = [...todo.checklist];
              const index = newChecklist.findIndex(
                (check) => check.id === checkId
              );
              newChecklist[index].is_done = !newChecklist[index].is_done;

              return { ...todo, checklist: newChecklist };
            }

            return todo;
          }),
        };
      });
    },
    []
  );

  const handleDeleteCheckItem = useCallback(
    (todoId: string, checkId: string) => {
      setTask((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          todos: prev.todos?.map((todo) => {
            if (todo.id === todoId) {
              return {
                ...todo,
                checklist: todo.checklist.filter(
                  (check) => check.id !== checkId
                ),
              };
            }

            return todo;
          }),
        };
      });
    },
    []
  );

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
    onRemoveLink: handleRemoveLink,
    onSaveDueDate: handleSaveDueDate,
    onRemoveDueDate: handleRemoveDueDate,
    onAddTodo: handleAddTodo,
    onDeleteTodo: handleDeleteTodo,
    onChangeCheckItem: handleChangeCheckItem,
    onDeleteCheckItem: handleDeleteCheckItem,
  };
}
