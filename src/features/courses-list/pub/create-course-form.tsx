"use client";

import { Button } from "@/shared/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { describe } from "node:test";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCourseAction } from "../actions";
import { cn } from "@/shared/ui/utils";

const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export function CreateCourseForm({
  revalidatePagePath,
  className,
}: {
  revalidatePagePath: string;
  className: string;
}) {
  const [isCreateTransition, startCreateTransition] = useTransition();
  const form = useForm<z.infer<typeof createCourseFormSchema>>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  function onSubmit(data: z.infer<typeof createCourseFormSchema>) {
    startCreateTransition(async () => {
      await createCourseAction(data, revalidatePagePath);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="описание" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isCreateTransition} type="submit">
          Добавить
        </Button>
      </form>
    </Form>
  );
}
