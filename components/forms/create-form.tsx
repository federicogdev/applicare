"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { JobApplicationValidation } from "@/lib/validations/job-application.validation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type CreateFormProps = {
  userId: string;
};

export const CreateForm = ({ userId }: CreateFormProps) => {
  const form = useForm<z.infer<typeof JobApplicationValidation>>({
    resolver: zodResolver(JobApplicationValidation),
    defaultValues: {
      company: "",
      location: "",
      position: "",
      priority: "HIGH",
      status: "PENDING",
      description: "",
      type: "FULL_TIME",
    },
  });

  const onSubmit = async (data: z.infer<typeof JobApplicationValidation>) => {
    alert(JSON.stringify(data));
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-20 flex flex-col justify-start gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel>Position</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="CEO, Engineer, Developer....."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Apple, Google, Facebook ......"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Textarea
                    rows={17}
                    {...field}
                    placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nam, ut expedita in molestiae pariatur tempora! Quae nisi iusto velit asperiores cum. Aliquam eius ut saepe necessitatibus animi eveniet nulla."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full md:flex-col gap-3">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel>Location</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1 Apple Park Way, Cupertino US"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="PENDING">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Job Application Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="DECLINED">Declined</SelectItem>
                      <SelectItem value="INTERVIEW">Interview</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue="FULL_TIME"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Job Application Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      <SelectItem value="REMOTE">Remote</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue="HIGH"
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HIGH" />
                        </FormControl>
                        <FormLabel className="font-normal">High</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MEDIUM" />
                        </FormControl>
                        <FormLabel className="font-normal">Medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="LOW" />
                        </FormControl>
                        <FormLabel className="font-normal">Low</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" variant="accent">
          Submit
        </Button>
      </form>
    </Form>
  );
};
