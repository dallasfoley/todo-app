import { z } from "zod";

export const ActivitySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name of activity is required"),
  date: z
    .date()
    .refine((date) => date >= new Date(), {
      message: "Date must be in the future",
    })
    .refine((date) => date < new Date("2100-01-01"), {
      message: "Date must be before the year 2100",
    }),
  time: z.string().min(5, "Time is required").max(5, "Time is required"),
  description: z.string().optional().nullable(),
  userId: z.string().optional(),
  completed: z.boolean().default(false),
});

export type ActivityType = z.infer<typeof ActivitySchema>;
