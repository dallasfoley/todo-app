import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

export default function ActivityInput({
  form,
}: {
  form: UseFormReturn<
    {
      activity: string;
      date: Date;
    },
    unknown,
    undefined
  >;
}) {
  return (
    <FormField
      control={form.control}
      name="activity"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name of activity</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
