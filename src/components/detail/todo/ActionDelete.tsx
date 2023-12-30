import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePopover from "@/hooks/usePopover";

type ActionDeleteProps = {
  titleTodo: string;
  onDeleteTodo: () => void;
};

export function ActionDelete({ titleTodo, onDeleteTodo }: ActionDeleteProps) {
  const { open, toggleOpen, onClose } = usePopover();

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger>
        <Button
          onClick={(e) => {
            e.preventDefault();
            toggleOpen(true);
          }}
        >
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <PopoverHeader
          onClose={onClose}
        >{`Delete ${titleTodo}?`}</PopoverHeader>

        <div className="mt-4 space-y-4">
          <h4 className="text-sm text-slate-600">
            Deleting a checklist is permanent and there is no way to get it
            back.
          </h4>
          <Button
            variant="solid"
            color="danger"
            className="w-full"
            onClick={onDeleteTodo}
          >
            Delete checklist
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
