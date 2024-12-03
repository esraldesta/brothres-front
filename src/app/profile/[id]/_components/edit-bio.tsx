"use client";

import { LoaderButton } from "@/components/smallPieces/loading-button";
import TipTap from "@/components/tiptap";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useServerAction } from "zsa-react";
import { updateBioAction } from "../actions";

const schema = z.object({
  bio: z.string().min(3, "Too short!"),
});

export function BioEditor({ data }: { data: { bio: string } }) {
  const { toast } = useToast();

  console.log(data);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: data
      ? {
          bio: data.bio,
        }
      : { bio: "" },
  });

  const { execute, isPending, error } = useServerAction(updateBioAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Bio is edited.",
      });
    },
    onError({ err }) {
      toast({
        variant: "destructive",
        description: "Something went wrong." + err?.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    //console.log(values);
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TipTap
                  content={field.value}
                  onChange={field.onChange}
                  height={700}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <LoaderButton isLoading={isPending} className="bg-orangeRed">
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}
