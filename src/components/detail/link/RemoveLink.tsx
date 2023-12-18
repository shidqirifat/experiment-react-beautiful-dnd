import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type RemoveLinkProps = { onRemove: () => void };

export function RemoveLink({ onRemove }: RemoveLinkProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = (value: boolean) => {
    if (value) setOpen(true);
    else handleClose();
  };

  const handleClose = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleOpen(true);
          }}
          className="relative z-50 underline underline-offset-1"
        >
          Remove
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <PopoverHeader onClose={handleClose}>Remove attachment?</PopoverHeader>

        <div className="mt-4 space-y-4">
          <h4 className="text-sm text-slate-600">
            Remove this attachment? There is no undo.
          </h4>
          <Button
            variant="solid"
            color="danger"
            className="w-full"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
