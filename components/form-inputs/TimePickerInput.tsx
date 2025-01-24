import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";

export default function TimePickerInput({
  form,
}: {
  form: UseFormReturn<
    {
      name: string;
      description?: string;
      date: Date;
      time: string;
      completed: boolean;
    },
    unknown,
    undefined
  >;
}) {
  return (
    <FormField
      control={form.control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <FormControl>
            <div className="flex justify-center items-center space-x-2">
              <Input type={"time"} {...form.register("time")} {...field} />
            </div>
          </FormControl>
          <FormDescription>(Click the clock)</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
