import AddTodoForm from "@/components/forms/addTodoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TodoPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Schedule an activity to do</CardTitle>
          <CardDescription>
            Simply add an activity name and date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddTodoForm />
        </CardContent>
      </Card>
    </div>
  );
}
