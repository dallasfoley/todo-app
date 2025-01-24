import { z } from "zod";

export const UserSchema = z.object({
  clerkUserId: z.string(),
  id: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
