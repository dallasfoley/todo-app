"use client";

import ActivityInput from "@/components/form-inputs/ActivityInput";
import DatePickerInput from "@/components/form-inputs/DatePickerInput";
import { Form } from "@/components/ui/form";
import { ActivitySchema } from "@/schema/ActivitySchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { addTodo } from "@/server/actions/addTodo";
import { revalidatePath } from "next/cache";
import DescriptionInput from "../form-inputs/DescriptionInput";
import TimePickerInput from "../form-inputs/TimePickerInput";

export default function AddTodoForm() {
  const form = useForm<z.infer<typeof ActivitySchema>>({
    resolver: zodResolver(ActivitySchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      time: "00:00",
    },
  });

  const handleSubmit = async (values: z.infer<typeof ActivitySchema>) => {
    await addTodo(values);
    revalidatePath("/todo");
    redirect("/todo");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <ActivityInput form={form} />
        <DescriptionInput form={form} />
        <DatePickerInput form={form} />
        <TimePickerInput form={form} />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
