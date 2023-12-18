import * as z from "zod";

const linkSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  name: z.string(),
});

type LinkForm = z.infer<typeof linkSchema>;

export { linkSchema };
export type { LinkForm };
