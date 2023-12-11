import type z from "zod";
import { type AddActivityZodSchema } from "@/validators/activity";

export type ActivityFormSchema = z.infer<typeof AddActivityZodSchema>;

export type Activity = {
  id: number;
  createdAt: Date;
  userId: number;
  categoryId: number;
  deleted: boolean;
  name: string;
};
