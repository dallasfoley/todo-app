"use client";

// import ActivityInput from "@/components/form-inputs/ActivityInput";
// import DatePickerInput from "@/components/form-inputs/DatePickerInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ActivitySchema } from "@/schema/ActivitySchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addTodo } from "@/server/actions/addTodo";
// import DescriptionInput from "../form-inputs/DescriptionInput";
// import TimePickerInput from "../form-inputs/TimePickerInput";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

export default function AddTodoForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof ActivitySchema>>({
    resolver: zodResolver(ActivitySchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      time: "00:00",
      completed: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof ActivitySchema>) => {
    await addTodo(values);
    router.push("/todo");
    router.refresh();
  };

  // return (
  //   <Form {...form}>
  //     <form
  //       onSubmit={form.handleSubmit(handleSubmit)}
  //       className="flex flex-col gap-4"
  //     >
  //       <ActivityInput form={form} />
  //       <DescriptionInput form={form} />
  //       <DatePickerInput form={form} />
  //       <TimePickerInput form={form} />
  //       <Button type="submit">Add</Button>
  //     </form>
  //   </Form>
  // );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
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
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2100-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
