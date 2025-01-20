"use client";

import ActivityInput from "@/components/form-inputs/ActivityInput";
import DatePickerInput from "@/components/form-inputs/DatePickerInput";
import { Form } from "@/components/ui/form";
import { TodoSchema } from "@/schema/TodoSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

export default function AddTodoForm() {
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      activity: "",
      date: new Date(),
    },
  });

  const handleSubmit = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <ActivityInput form={form} />
        <DatePickerInput form={form} />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
