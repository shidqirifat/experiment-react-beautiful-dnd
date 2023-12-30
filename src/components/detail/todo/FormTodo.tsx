import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PopoverHeader } from "@/components/ui/popover";
import { FormTodoProps } from "@/types/todo";

export const FormTodo = ({ form, onAdd, onClose }: FormTodoProps) => {
  return (
    <div>
      <PopoverHeader onClose={onClose}>Add checklist</PopoverHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAdd)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormInput label="Title">
                <Input
                  autoFocus
                  placeholder="Insert title checklist"
                  {...field}
                />
              </FormInput>
            )}
          />

          <Button type="submit" variant="solid">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
