import { useForm } from "react-hook-form";
import { Button, ButtonAction } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  LinkForm,
  TypeForm,
  FormLinkProps,
  LinkModalProps,
  linkSchema,
} from "@/types/link";
import { Link } from "@/types/task";
import cx from "clsx";

const getTitleByType = (type: TypeForm) => {
  return type === "add" ? "Attachment Link" : "Edit Attachment Link";
};

const FormLink = ({ type, form, onSubmit, onClose }: FormLinkProps) => {
  return (
    <div>
      <h2 className="text-sm text-slate-600 font-semibold text-center">
        {getTitleByType(type)}
      </h2>
      <Button
        variant="subtle"
        className="absolute top-3 right-2"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormInput label="Link">
                <Input autoFocus placeholder="Insert the URL" {...field} />
              </FormInput>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput label="Display text (optional)">
                <Input placeholder="Text to display" {...field} />
              </FormInput>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="subtle">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {type === "add" ? "Insert" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const generateInitialForm = (form: Link | undefined): LinkForm => {
  return {
    name: form?.name || "",
    url: form?.url || "",
  };
};

export function LinkModal({
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
