import { Button } from "@/components/ui/button";
import { PopoverHeader } from "@/components/ui/popover";
import { ActionDeleteProps } from "@/types/label";

export function ActionDelete({ onBack, onClose, onDelete }: ActionDeleteProps) {
  return (
    <div>
      <PopoverHeader onBack={onBack} onClose={onClose}>
        Delete label
      </PopoverHeader>
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-normal">
          This will remove this label from all cards. There is no undo.
        </h4>
        <Button
          onClick={onDelete}
          variant="solid"
          color="danger"
          className="w-full"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
