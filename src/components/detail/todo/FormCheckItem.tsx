import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useClickOutside } from "@mantine/hooks";
import { KeyboardEvent, useState } from "react";

type FormCheckItemProps = {
  initialName?: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

export function FormCheckItem({
  initialName = "",
  onSubmit,
  onCancel,
}: FormCheckItemProps) {
  const [nameCheckItem, setNameCheckItem] = useState(initialName);

  const handleAddCheckItem = () => {
    onSubmit(nameCheckItem);
    if (!initialName) setNameCheckItem("");
  };

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleAddCheckItem();
    }
  };

  const ref = useClickOutside(() => onCancel());

  return (
    <form onSubmit={handleAddCheckItem} className="mt-1 ml-7 space-y-2">
      <Textarea
        ref={ref}
        autoFocus
        className="!min-h-[20px] p-2 rounded-none text-sm"
        placeholder="Add an item"
        value={nameCheckItem}
        onChange={(e) => setNameCheckItem(e.currentTarget.value)}
        onKeyDown={handleEnter}
      />
      <div className="flex gap-2">
        <Button type="submit" variant="solid">
          Add
        </Button>
        <Button onClick={onCancel} variant="subtle">
          Cancel
        </Button>
      </div>
    </form>
  );
}
