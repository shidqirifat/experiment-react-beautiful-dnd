import { Button, ButtonAction } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePopover from "@/hooks/usePopover";
import useTasks from "@/hooks/useTasks";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import cx from "clsx";

type ActionDeleteProps = { id: string; triggerEl?: ReactNode };

export function ActionDelete({ id, triggerEl }: ActionDeleteProps) {
  const { onDeleteTask } = useTasks();
  const { open, toggleOpen, onClose } = usePopover();

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className={cx({ "w-full": !triggerEl })}>
        {triggerEl ? (
          triggerEl
        ) : (
          <ButtonAction
            onClick={(e) => {
              e.preventDefault();
              toggleOpen(true);
            }}
            icon={faMinus}
            variant="solid"
            color="danger"
            className="w-full"
          >
            Delete
          </ButtonAction>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <PopoverHeader onClose={onClose}>Delete this card?</PopoverHeader>

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
