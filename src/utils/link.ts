import { TypeForm } from "@/types/link";

const getTitleByType = (type: TypeForm) => {
  return type === "add" ? "Attachment Link" : "Edit Attachment Link";
};

export { getTitleByType };
