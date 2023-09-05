"use client";

import {
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteJobApplication } from "@/actions/job-applications";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  //@ts-ignore
  const id = row.original.id;
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();
  const removeApplication = async () => {
    try {
      await deleteJobApplication(id);
      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/jobs/${id}`}>
          <DropdownMenuItem className="cursor-pointer">
            View
            <DropdownMenuShortcut>
              <EyeOpenIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        {/* <Link href={`/jobs/${id}`}>
          <DropdownMenuItem className="cursor-pointer">
            Edit
            <DropdownMenuShortcut>
              <Pencil2Icon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link> */}

        <DropdownMenuItem
          className="cursor-pointer text-red-500"
          onClick={() => {
            startTransition(removeApplication);
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <TrashIcon className="text-red-500" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
