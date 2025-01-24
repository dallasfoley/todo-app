"use server";

import { ActivityTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { ActivitySchema, type ActivityType } from "@/schema/ActivitySchema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function toggleCompleted(activity: ActivityType) {
  const { success, data } = ActivitySchema.safeParse(activity);
  const { userId } = await auth();
  if (!success || !userId || data.id === undefined) return undefined;

  const [updatedActivity] = await db
    .update(ActivityTable)
    .set({ completed: !data.completed })
    .where(eq(ActivityTable.id, data.id))
    .returning();

  return updatedActivity;
}
