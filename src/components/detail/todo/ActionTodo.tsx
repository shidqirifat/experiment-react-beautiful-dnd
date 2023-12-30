import { useForm } from "react-hook-form";
import { ButtonAction } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { FormTodo } from ".";
import usePopover from "@/hooks/usePopover";
import { TodoForm, TodoModalProps, todoSchema } from "@/types/todo";

export function ActionTodo({ onAdd }: TodoModalProps) {
  const form = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "Checklist",
    },
  });
  const { open, toggleOpen, onClose } = usePopover();

  const onSubmit = (form: TodoForm) => {
    onAdd(form);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className="w-full">
        <ButtonAction icon={faTableList}>Todos</ButtonAction>
      </PopoverTrigger>
      <PopoverContent align="end">
        <FormTodo form={form} onAdd={onSubmit} onClose={handleClose} />
      </PopoverContent>
    </Popover>
  );
}
