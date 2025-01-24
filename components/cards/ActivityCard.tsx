import { ActivitySchema } from "@/schema/ActivitySchema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ActivityCardButtons from "../button-groups/ActivityCardButtons";
import { Label } from "../ui/label";

export default function ActivityCard({
  activity,
}: {
  activity: z.infer<typeof ActivitySchema>;
}) {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg">
      <CardHeader className="text-center mb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          {activity.name}
        </CardTitle>
        {activity.description && (
          <CardDescription className="text-gray-600">
            {activity.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col justify-around items-center">
        <div className="flex justify-between items-center text-gray-700 my-4">
          <Label className="mr-16">{activity.date.toLocaleDateString()}</Label>
          <Label className="ml-4">{activity.time}</Label>
        </div>
        <ActivityCardButtons activity={activity} />
      </CardContent>
    </Card>
  );
}
