"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { createComment } from "@/actions/job-applications";
import { toast } from "@/hooks/use-toast";
import { CommentValidation } from "@/lib/validations/comment.validation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  jobApplicationId: string;
}

export const CommentForm = ({ jobApplicationId }: CommentFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CommentValidation>) => {
    try {
      await createComment(jobApplicationId, data.text);

      form.reset();

      toast({
        title: "Success",
        description: "Comment created successfully!",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex items-center gap-4 py-5 max-xs:flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" variant="accent">
          Reply
        </Button>
      </form>
    </Form>
  );
};
