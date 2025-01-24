"use server";

import { ActivityTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { ActivitySchema } from "@/schema/ActivitySchema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function addTodo(formData: z.infer<typeof ActivitySchema>) {
  const { success, data } = ActivitySchema.safeParse(formData);
  const { userId } = await auth();
  if (!success || userId === null) return undefined;

  await db.insert(ActivityTable).values({ ...data, userId });

  redirect("/todo");
}
