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
import { LinkForm, linkSchema } from "@/types/link";

type LinkModalProps = { onInsert: (form: LinkForm) => void };

export function LinkModal({ onInsert }: LinkModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      url: "",
      name: "",
    },
  });

  const onSubmit = (form: LinkForm) => {
    onInsert(form);
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
      <PopoverTrigger className="w-full">
        <ButtonAction icon={faLink} sizeIcon="sm">
          Attachment Link
        </ButtonAction>
      </PopoverTrigger>
      <PopoverContent align="end">
        <h2 className="text-sm text-slate-600 font-semibold text-center">
          Attachment Link
        </h2>
        <Button
          variant="subtle"
          className="absolute top-3 right-2"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
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
              <Button onClick={handleClose} variant="subtle">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Insert
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
