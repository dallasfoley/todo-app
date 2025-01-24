"use client";

import { Button } from "../ui/button";
import type { ActivityType } from "@/schema/ActivitySchema";
import { deleteTodo } from "@/server/actions/deleteTodo";
import UpdateTodoForm from "../forms/updateTodoForm";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toggleCompleted } from "@/server/actions/completed";
import { useTransition, useState } from "react";

export default function ActivityCardButtons({
  activity,
}: {
  activity: ActivityType;
}) {
  const [isPending, startTransition] = useTransition();
  const [isCompleted, setIsCompleted] = useState(activity.completed);

  const handleDelete = async () => {
    await deleteTodo(activity);
  };

  const handleToggleCompleted = () => {
    startTransition(async () => {
      setIsCompleted(!isCompleted);
      const updatedActivity = await toggleCompleted(activity);
      if (updatedActivity) {
        setIsCompleted(updatedActivity.completed);
      } else {
        setIsCompleted(isCompleted);
      }
    });
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <UpdateTodoForm activity={activity} />
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="ml-4 bg-red-500 hover:bg-red-600"
      >
        Delete
      </Button>
      <div className="flex flex-col items-center ml-4">
        <Label className="mb-2">Completed</Label>
        <Switch
          checked={isCompleted}
          onCheckedChange={handleToggleCompleted}
          disabled={isPending}
          className="bg-gray-200"
        />
      </div>
    </div>
  );
}
