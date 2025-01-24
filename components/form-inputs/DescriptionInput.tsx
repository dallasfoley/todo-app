import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";

export default function DescriptionInput({
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
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description (optional)</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
