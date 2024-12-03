"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { useServerAction } from "zsa-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/smallPieces/loading-button";
import { deleteBlogAction } from "../action";
import { FaRegTrashAlt } from "react-icons/fa";

export function DeleteBlogButton({
  id,
  userId,
  type = "submit",
}: {
  id: string;
  type?: "button" | "submit";
  userId: string;
}) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { execute, isPending, error } = useServerAction(deleteBlogAction, {
    onSuccess() {
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Successfully deleted.",
      });
    },
    onError({ err }) {
      setIsOpen(false);
      toast({
        title: "Uh oh",
        variant: "destructive",
        description: "Something went wrong deleting the blog." + err?.message,
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          className={cn("bg-red-200 rounded ml-2")}
          type={type}
        >
          <span className="flex items-center gap-2 text-orangeRed font-bold ">
            <FaRegTrashAlt className="w-3 h-3" />
            <p className="text-base"> Delete </p>
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoaderButton
            isLoading={isPending}
            onClick={() => {
              execute({ id, userId });
            }}
            className="bg-orangeRed"
          >
            Delete Blog
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
