"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { USER } from "@/components/main/forms/Registrationform";
import Spinner from "@/components/smallPieces/Spinner";
import { useServerAction } from "zsa-react";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/app/edit-profile/action";
import ProfileUpdate from "@/components/smallPieces/ProfileUpdate";
import { EditProfilePicSchema } from "@/lib/validation";

interface EditProfileProps {
  userData: USER & { id: number };
}

export default function EditProfilePic({ userData }: EditProfileProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EditProfilePicSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(EditProfilePicSchema),
    defaultValues: {
      image: [],
    },
  });

  const { execute, isPending, error } = useServerAction(updateProfileAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Successfully updated your profile.",
      });
    },
    onError({ err }) {
      toast({
        variant: "destructive",
        description: "Something went wrong." + err?.message,
      });
    },
  });
  async function onSubmit(values: z.infer<typeof EditProfilePicSchema>) {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    execute({ data: formData, id: userData.id });
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileUpdate
                    fieldchange={field.onChange}
                    mediaUrl={userData.image?userData.image:"/img.png"} // TODO update to default
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-20">
            <button
              type="submit"
              className="bg-navy w-[180px] h-auto text-white text-base rounded-md px-6 py-2.5"
            >
              {isPending ? <Spinner loading={isPending} /> : "Save Changes"}
            </button>
          </div>
        </form>
      </Form>
    </section>
  );
}
