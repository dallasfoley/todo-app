import ActivityCard from "@/components/cards/ActivityCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityTable, UserTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import type { ActivityType } from "@/schema/ActivitySchema";
import type { UserType } from "@/schema/UserSchema";
import { createUser } from "@/server/actions/createUser";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function TodoPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  let user: UserType | undefined = await db
    .select({ clerkUserId: UserTable.clerkUserId })
    .from(UserTable)
    .where(eq(UserTable.clerkUserId, userId))
    .limit(1)
    .then((users) => users[0] || null);

  if (!user) {
    user = await createUser({ clerkUserId: userId });
    if (!user || "error" in user) {
      return <div className="text-red-500">Error: Unable to create user</div>;
    }
  }

  const activities: ActivityType[] = await db
    .select({
      id: ActivityTable.id,
      name: ActivityTable.name,
      date: ActivityTable.date,
      time: ActivityTable.time,
      description: ActivityTable.description,
      userId: ActivityTable.userId,
      completed: ActivityTable.completed,
    })
    .from(ActivityTable)
    .where(eq(ActivityTable.userId, user.clerkUserId))
    .then((activities) =>
      activities.map((activity) => ({
        ...activity,
        description: activity.description ?? undefined,
      }))
    );

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-6">
      <Card className="w-full max-w-5xl p-6 rounded-2xl shadow-lg bg-white">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-3xl font-bold text-gray-800">
            {activities.length > 0
              ? "Your Todo List"
              : "Create an activity to get started!"}
          </CardTitle>
          {activities.length > 0 && (
            <CardDescription className="text-lg text-gray-600">
              Organize your tasks and stay productive.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, id) => (
              <ActivityCard initialActivity={activity} key={id} />
            ))}
          </div>
          <Button className="mt-8 w-full sm:w-auto mx-auto" asChild>
            <Link href="/todo/add">Add Activity</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
