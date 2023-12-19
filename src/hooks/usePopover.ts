import { useCallback, useState } from "react";

export default function usePopover() {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback((value: boolean) => {
    if (value) setOpen(true);
    else handleClose();
  }, []);

  const handleClose = useCallback((fn?: () => void) => {
    if (typeof fn === "function") fn();

    setOpen(false);
  }, []);

  return { open, toggleOpen, onClose: handleClose };
}
