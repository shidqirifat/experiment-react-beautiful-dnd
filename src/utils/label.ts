import { Color, LabelForm, TypeForm } from "@/types/label";
import { Label } from "@/types/task";
import { cva } from "class-variance-authority";

const getTitleByType = (type: TypeForm) => {
  return type === "create" ? "Create Label" : "Edit Label";
};

const colorVariants = cva("", {
  variants: {
    color: {
      green: "bg-green-400 text-green-900",
      yellow: "bg-yellow-400 text-yellow-900",
      orange: "bg-orange-400 text-orange-900",
      red: "bg-red-400 text-red-900",
      purple: "bg-purple-400 text-purple-900",
      blue: "bg-blue-400 text-blue-900",
      sky: "bg-sky-300 text-sky-900",
      lime: "bg-lime-400 text-lime-900",
      pink: "bg-pink-400 text-pink-900",
      gray: "bg-gray-400 text-gray-900",
    },
  },
  defaultVariants: {
    color: "green",
  },
});

const generateInitialFormLabel = (
  form: Label | null,
  defaultColor: Color
): LabelForm => {
  return {
    name: form?.name || "",
    color: form?.color || defaultColor,
  };
};

export { getTitleByType, colorVariants, generateInitialFormLabel };
