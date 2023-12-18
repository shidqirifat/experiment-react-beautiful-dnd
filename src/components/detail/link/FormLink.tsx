import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLinkProps } from "@/types/link";
import { getTitleByType } from "@/utils/link";
import { PopoverHeader } from "@/components/ui/popover";

export const FormLink = ({ type, form, onSubmit, onClose }: FormLinkProps) => {
  return (
    <div>
      <PopoverHeader onClose={onClose}>{getTitleByType(type)}</PopoverHeader>
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
            <Button type="submit" variant="solid">
              {type === "add" ? "Insert" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
