import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  colorVariants,
  generateInitialFormLabel,
  getTitleByType,
} from "@/utils/label";
import { PopoverHeader } from "@/components/ui/popover";
import { Color, FormLabelProps, LabelForm, labelSchema } from "@/types/label";
import { cn } from "@/utils";
import { COLORS } from "@/datas/color";
import { ColorSelect } from ".";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLabels } from "@/hooks/useLabels";
import { useEffect } from "react";

const Preview = ({ name, color }: LabelForm) => {
  return (
    <div className="p-8 bg-slate-100 my-4">
      <div
        className={cn(
          "h-8 flex items-center px-3 rounded-sm",
          colorVariants({ color })
        )}
      >
        <h2 className="text-sm leading-4">{name}</h2>
      </div>
    </div>
  );
};

export const FormLabel = ({
  initialForm,
  type,
  onBack,
  onClose,
}: FormLabelProps) => {
  const { colorNewLabel, onCreate, onEdit } = useLabels();

  const form = useForm<LabelForm>({
    resolver: zodResolver(labelSchema),
  });

  const [name, color] = form.watch(["name", "color"]);

  const handleChangeColor = (color: Color) => {
    form.setValue("color", color);
  };

  const onSubmit = (formData: LabelForm) => {
    if (type === "create") onCreate(formData);
    else if (type === "edit" && initialForm?.id) {
      onEdit({ ...formData, id: initialForm.id });
    }

    setTimeout(() => {
      onBack();
    }, 100);
  };

  useEffect(() => {
    form.reset(generateInitialFormLabel(initialForm, colorNewLabel));
  }, [initialForm, colorNewLabel]);

  return (
    <div>
      <PopoverHeader onBack={onBack} onClose={onClose}>
        {getTitleByType(type)}
      </PopoverHeader>
      <Preview name={name} color={color} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput label="Name">
                <Input
                  autoFocus
                  placeholder="Insert the label name"
                  {...field}
                />
              </FormInput>
            )}
          />

          <div className="space-y-[6px]">
            {COLORS.map((colorVal) => (
              <ColorSelect
                key={colorVal}
                selected={color === colorVal}
                color={colorVal}
                onClick={handleChangeColor}
              />
            ))}
          </div>

          <div className="flex justify-between gap-2 border-t border-gray-300 pt-4">
            <Button type="submit" variant="solid">
              {type === "create" ? "Create" : "Save"}
            </Button>
            {type === "edit" && (
              <Button onClick={onClose} variant="solid" color="danger">
                Delete
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
