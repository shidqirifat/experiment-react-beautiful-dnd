import { Input } from "@/components/ui/input";
import { TitleTodoProps } from "@/types/todo";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";

export const TitleTodo = ({
  children,
  isEdit,
  toggleEdit,
  onSave,
}: TitleTodoProps) => {
  const [title, setTitle] = useState(children);

  const ref = useClickOutside(() => {
    onSave(title);
    toggleEdit();
  });

  if (!isEdit) {
    return (
      <h1
        onClick={toggleEdit}
        className="text-base font-semibold cursor-pointer"
      >
        {children}
      </h1>
    );
  }

  return (
    <Input
      ref={ref}
      autoFocus
      className="relative -left-2 text-base font-semibold pl-2 w-full"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};
