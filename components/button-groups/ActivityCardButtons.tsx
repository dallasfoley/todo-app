"use client";

import { Button } from "../ui/button";
import type { ActivityType } from "@/schema/ActivitySchema";
import { deleteTodo } from "@/server/actions/deleteTodo";
import UpdateTodoForm from "../forms/updateTodoForm";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toggleCompleted } from "@/server/actions/completed";
import { useTransition } from "react";

export default function ActivityCardButtons({
  activity,
  onUpdate,
}: {
  activity: ActivityType;
  onUpdate: (updatedActivity: ActivityType) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    await deleteTodo(activity);
  };

  const handleToggleCompleted = () => {
    startTransition(async () => {
      const updatedActivity = await toggleCompleted(activity);
      if (updatedActivity) {
        onUpdate({
          ...updatedActivity,
          description: updatedActivity.description ?? undefined,
        });
      }
    });
  };

  return (
    <div className="flex justify-between items-center m-2 md:m-4">
      <UpdateTodoForm activity={activity} onUpdate={onUpdate} />
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="ml-1 md:ml-4 bg-red-500 hover:bg-red-600"
      >
        Delete
      </Button>
      <div className="flex flex-col items-center ml-1 md:ml-4">
        <Label className="mb-2">Completed</Label>
        <Switch
          checked={activity.completed}
          onCheckedChange={handleToggleCompleted}
          disabled={isPending}
          className="bg-gray-200"
        />
      </div>
    </div>
  );
}
