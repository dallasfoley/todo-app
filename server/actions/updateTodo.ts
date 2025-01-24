"use server";

import { ActivityTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { ActivitySchema, ActivityType } from "@/schema/ActivitySchema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTodo(activity: ActivityType) {
  const { success, data } = ActivitySchema.safeParse(activity);
  const { userId } = await auth();
  if (!success || userId === null || !activity.id) return undefined;

  await db
    .update(ActivityTable)
    .set({ ...data })
    .where(eq(ActivityTable.id, activity.id));

  revalidatePath("/todo");
}
