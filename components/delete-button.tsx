"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { deleteJobApplication } from "@/actions/job-applications";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type DeleteButtonProps = { jobApplicationid: string };

export const DeleteButton = ({ jobApplicationid }: DeleteButtonProps) => {
  const router = useRouter();
  const removeApplication = async () => {
    try {
      await deleteJobApplication(jobApplicationid, "/jobs");
      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
      router.push("/jobs");
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => removeApplication()}
    >
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
};
