import { Button, ButtonAction } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import useTasks from "@/hooks/useTasks";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type ActionDeleteProps = { id: string };

export function ActionDelete({ id }: ActionDeleteProps) {
  const { onDeleteTask } = useTasks();
  const [open, setOpen] = useState(false);

  const toggleOpen = (value: boolean) => {
    if (value) setOpen(true);
    else handleClose();
  };

  const handleClose = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className="w-full">
        <ButtonAction
          onClick={(e) => {
            e.preventDefault();
            toggleOpen(true);
          }}
          icon={faTrash}
          className="w-full"
        >
          Delete
        </ButtonAction>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <PopoverHeader onClose={handleClose}>Delete this card?</PopoverHeader>

        <div className="mt-4 space-y-4">
          <h4 className="text-sm text-slate-600">
            Delete this card? There is no undo.
          </h4>
          <Button
            variant="solid"
            color="danger"
            className="w-full"
            onClick={() => onDeleteTask(id)}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
