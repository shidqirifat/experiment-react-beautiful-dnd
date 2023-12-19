import { useForm } from "react-hook-form";
import { ButtonAction } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LinkForm, LinkModalProps, linkSchema } from "@/types/link";
import { Link } from "@/types/task";
import cx from "clsx";
import { getTitleByType } from "@/utils/link";
import { FormLink } from ".";

const generateInitialForm = (form: Link | undefined): LinkForm => {
  return {
    name: form?.name || "",
    url: form?.url || "",
  };
};

export function ActionLink({
  initialForm,
  type,
  onInsert,
  onUpdate,
}: LinkModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
    defaultValues: generateInitialForm(initialForm),
  });

  const onSubmit = (form: LinkForm) => {
    if (type === "add" && onInsert) onInsert(form);
    else if (type === "edit" && initialForm?.id && onUpdate) {
      onUpdate(initialForm.id, form);
    }

    handleClose();
  };

  const toggleOpen = (value: boolean) => {
    if (value) setOpen(true);
    else handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className={cx({ "w-full": type === "add" })}>
        {type === "add" ? (
          <ButtonAction icon={faLink} sizeIcon="sm">
            {getTitleByType(type)}
          </ButtonAction>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleOpen(true);
            }}
            className="relative z-50 underline underline-offset-1"
          >
            Edit
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent align="end">
        <FormLink
          type={type}
          form={form}
          onSubmit={onSubmit}
          onClose={handleClose}
        />
      </PopoverContent>
    </Popover>
  );
}
