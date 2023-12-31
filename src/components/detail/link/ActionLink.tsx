import { useForm } from "react-hook-form";
import { Button, ButtonAction } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { LinkForm, LinkModalProps, linkSchema } from "@/types/link";
import { Link } from "@/types/task";
import cx from "clsx";
import { getTitleByType } from "@/utils/link";
import { FormLink } from ".";
import usePopover from "@/hooks/usePopover";
import { useEffect } from "react";

const generateInitialForm = (form: Link | undefined): LinkForm => {
  return {
    name: form?.name || "",
    url: form?.url || "",
  };
};

export function ActionLink({
  initialForm,
  type,
  withIcon,
  onInsert,
  onUpdate,
}: LinkModalProps) {
  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
  });
  const { open, toggleOpen, onClose } = usePopover();

  const onSubmit = (form: LinkForm) => {
    if (type === "add" && onInsert) onInsert(form);
    else if (type === "edit" && initialForm?.id && onUpdate) {
      onUpdate(initialForm.id, form);
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  useEffect(() => {
    form.reset(generateInitialForm(initialForm));
  }, [initialForm]);

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className={cx({ "w-full": type === "add" && withIcon })}>
        {type === "add" ? (
          withIcon ? (
            <ButtonAction icon={faLink} sizeIcon="sm">
              {getTitleByType(type)}
            </ButtonAction>
          ) : (
            <Button>Add</Button>
          )
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
