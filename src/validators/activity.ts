import z from "zod";

export const AddActivityZodSchema = z.object({
  name: z.string().min(3).max(50),
  categoryId: z.string(),
});
