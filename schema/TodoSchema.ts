import { z } from "zod";

export const TodoSchema = z.object({
  activity: z.string().min(1, "Name of activity is required"),
  date: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Date must be in the future",
    })
    .refine((date) => date < new Date("2100-01-01"), {
      message: "Date must be before the year 2100",
    }),
});
