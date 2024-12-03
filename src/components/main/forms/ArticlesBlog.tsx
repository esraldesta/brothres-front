"use client";

import TextEditor from "../TextEditor";
import References from "../../smallPieces/References";
import ThumbnailUploader from "../../smallPieces/ThumbnailUploader";
import { BlogPostSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { z } from "zod";
import Tags from "../../smallPieces/Tags";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useServerAction } from "zsa-react";
import { useToast } from "@/hooks/use-toast";
import { createPostAction, updatePostAction } from "@/app/create-post/action";
import { LoaderButton } from "@/components/smallPieces/loading-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/smallPieces/Avatar";
import Image from "next/image";
import DisplayContent from "../post/DisplayContent";
import Link from "next/link";

interface PostData {
  id: string;
  title: string;
  content: string;
  references: string[];
  tags: string[];
  [key: string]: any;
}

export default function ArticlesBlog({ postData }: { postData?: PostData }) {
  // const [setIsPreviewLoading] = useState<boolean>(false);
  const { refresh } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof BlogPostSchema>>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: postData
      ? {
          title: postData.title,
          content: postData.content,
          references: postData.references,
          image: postData.image,
          tags: postData.tags,
        }
      : {
          title: "",
          content: "Text here",
          references: [],
          image: "",
          tags: [],
        },
  });

  const { execute, isPending, error } = useServerAction(
    !postData ? createPostAction : updatePostAction,
    {
      onSuccess() {
        toast({
          title: "Success",
          description: !postData
            ? "Successfully created a blog post."
            : "Successfully updated a blog post.",
        });
      },
      onError({ err }) {
        toast({
          variant: "destructive",
          description: err?.message,
        });
      },
    }
  );

  // async function handlePreview() {
  //   const postData = form.getValues();
  //   setIsPreviewLoading(true);
  //   //TODO: Upadte this post id after creating the post. It's used for the url
  //   let postId = "1rssggetegb"; // FAKE POST ID
  //   // TODO: MAke an HTTP request to upload the Post but with a status of "pending"
  //   try {
  //   } catch (error: any) {
  //   } finally {
  //     setIsPreviewLoading(false);
  //   }
  //   // Redirect the User to the Preview-post Page
  //   push(`/preview-post/${postId}`);
  // }
  function handleClearForm() {
    // refresh the page to clear the form. form.reset() doesn't work
    refresh();
  }

  async function onSubmit(values: z.infer<typeof BlogPostSchema>) {
    const { image, ...rest } = values;
    const post = {
      ...rest,
      references: values.references || [],
      tags: values.tags || [],
    };

    const formData = new FormData();
    if (image[0]) {
      formData.append("image", image[0]);
    }

    for (const [k, v] of Object.entries(post)) {
      if (Array.isArray(v)) {
        //v.forEach((item) => formData.append(k, item));
        //formData.append(k, JSON.stringify(v));
        formData.append(k, v.join(","));
      } else {
        formData.append(k, v);
      }
    }

    if (postData) {
      execute({ data: formData, id: postData.id });
    } else {
      execute({ data: formData });
    }
  }
  return (
    <section className="border rounded-3xl px-10 mt-10 pb-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center gap-10 mt-10">
                <FormLabel className="text-lg text-black font-medium">
                  Title
                </FormLabel>
                <div>
                  <FormControl>
                    <Input
                      className="max-w-80 bg-gray-100"
                      placeholder="Enter our post title here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm mt-1 text-red-500" />
                </div>
              </FormItem>
            )}
          />
          {/* WYSIWYG editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mt-10 flex flex-col justify-start gap-5">
                <FormLabel className="text-lg text-black font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <TextEditor
                    initialValue={field.value}
                    fieldchange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          {/* Adding Citations for the Post */}
          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem className="mt-64 md:mt-0">
                <FormControl>
                  <References
                    fieldchange={field.onChange}
                    initialValue={field.value || []}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          {/* Uploading the Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ThumbnailUploader
                    fieldchange={field.onChange}
                    title="Featured Image"
                    mediaUrl={
                      postData?.image
                        ? postData.image
                        : "./public/postImage.png"
                    }
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          {postData?.image && (
            <Image
              src={postData.image}
              width={100}
              height={100}
              alt="Selected blog image"
            />
          )}
          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Tags
                    fieldchange={field.onChange}
                    title="Add tags"
                    initialValue={field.value || []}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap justify-between items-center gap-16 mt-14">
            {/* <button
              type="button"
              onClick={handlePreview}
              className="border border-orangeRed w-[180px] h-auto max-sm:text-sm sm:text-base text-orangeRed font-semibold px-4 py-2 rounded-md focus-visible:outline-none"
            >
              {isPreviewLoading ? (
                <Spinner loading={isPreviewLoading} color="#000000" size={15} />
              ) : (
                "Preview Page"
              )}
            </button> */}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Preview</Button>
              </DialogTrigger>
              <DialogContent className="max-h-screen min-h-screen min-w-full overflow-auto">
                <DialogHeader>
                  <DialogTitle>Here is Your Blog</DialogTitle>
                  <DialogDescription>
                    Share something amazing with the international community
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Preview form={form} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={handleClearForm}
                className="border border-navy text-navy max-sm:text-sm sm:text-base font-semibold px-4 py-2 rounded-md focus-visible:outline-none"
              >
                Cancel
              </button>
              <LoaderButton className="px-10" isLoading={isPending}>
                Save
              </LoaderButton>
              {/* <button
                type="submit"
                className="bg-navy w-[100px] h-auto max-sm:text-sm sm:text-base text-white font-semibold px-4 py-2 rounded-md focus-visible:outline-none"
              >
                {isSaveLoading ? (
                  <Spinner loading={isSaveLoading} size={15} />
                ) : (
                  "Save"
                )}
              </button> */}
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}

function Preview({
  form,
}: {
  form: UseFormReturn<
    {
      content: string;
      title: string;
      image: string | File[];
      references?: string[];
      tags?: string[];
    },
    any,
    undefined
  >;
}) {
  const postData = form.getValues();

  const renderImage = (image: string | File[]): string | null => {
    if (typeof image === "string") {
      return image;
    } else if (Array.isArray(image) && image[0] instanceof File) {
      return URL.createObjectURL(image[0]);
    }
    return null;
  };

  const imageSrc = renderImage(postData.image);

  return (
    <div>
      <div className="rounded-3xl border px-10 py-10">
        <div className="flex justify-end items-center gap-x-2">
          <Avatar
            width="w-[50px]"
            height="h-[50px]"
            iconWidth="w-[20px]"
            iconHeight="h-[20px]"
          />
        </div>

        <div className="text-center">
          <h2 className="mt-10 pl-3 text-xl text-black font-semibold">
            {" "}
            {postData.title}{" "}
          </h2>
        </div>

        {/* To prevent content shifting */}
        <div className="max-w-[900px] pb-10 mx-auto w-full">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="blog-post-header"
              width={700}
              height={100}
              className="mt-7 mx-auto rounded-3xl"
            />
          ) : (
            <div className="mt-7 mx-auto rounded-3xl bg-gray-300 w-[700px] h-[100px] flex items-center justify-center">
              <span>No image</span>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-lg mb-2">Subtitle</h3>
          <DisplayContent content={postData.content} line={2} />
        </div>

        <div className="flex items-center gap-4">
          <h3 className="text-base text-black font-semibold"> Tags: </h3>
          <span className="flex items-center gap-3">
            {postData.tags?.map((tag, index) => (
              <button key={index} className="text-sm hover:text-blue-500">
                {tag}
              </button>
            ))}
          </span>
        </div>

        <div className="mt-14">
          <h2 className="text-xl text-black font-semibold"> Refrences </h2>
          <div className="flex flex-col justify-start gap-4 mt-4">
            {postData.references?.map((citation: string, i: number) => {
              return (
                <span
                  key={citation}
                  className="flex items-center gap-2 max-w-[350px] text-base text-black hover:text-blue-500"
                >
                  <p> {i + 1} </p>
                  <Link href={citation} target="_blank">
                    {" "}
                    {citation}{" "}
                  </Link>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
