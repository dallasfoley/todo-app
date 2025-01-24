"use server";

import { UserTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { UserSchema, UserType } from "@/schema/UserSchema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createUser(
  userData: z.infer<typeof UserSchema>
): Promise<UserType | undefined> {
  const { success, data } = UserSchema.safeParse(userData);
  const { userId } = await auth();

  if (!success || userId === null) return undefined;

  await db
    .insert(UserTable)
    .values({ ...data, clerkUserId: userData.clerkUserId })
    .returning({ id: UserTable.id, clerkUserId: UserTable.clerkUserId });

  redirect("/todo");
}
