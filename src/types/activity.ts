import type z from "zod";
import { type AddActivityZodSchema } from "@/validators/activity";

export type ActivityFormSchema = z.infer<typeof AddActivityZodSchema>;
