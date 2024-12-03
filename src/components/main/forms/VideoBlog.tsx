"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VideoBlogSchema } from "@/lib/validation";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import TextEditor from "../TextEditor";
import References from "@/components/smallPieces/References";
import ThumbnailUploader from "@/components/smallPieces/ThumbnailUploader";
import Tags from "@/components/smallPieces/Tags";
import { useRouter } from "next/navigation";
import { useRef,useState, useEffect } from 'react';
import Spinner from "@/components/smallPieces/Spinner";
import { LoaderButton } from "@/components/smallPieces/loading-button";
import { useServerAction } from "zsa-react";
import { useToast } from "@/hooks/use-toast";
import {
  createVblogAction,
  updateVblogAction,
} from "@/app/video-blog/_actions";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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
import DisplayContent from "../post/DisplayContent";
import Link from "next/link";

interface PostData {
  id: string;
  title: string;
  content: string;
  references: string[];
  tags: string[];
  videoLink: string;
  [key: string]: any;
}

export default function VideoBlog({ vblogData }: { vblogData?: PostData }) {
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const { refresh, push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof VideoBlogSchema>>({
    resolver: zodResolver(VideoBlogSchema),
    defaultValues: vblogData
      ? {
          content: vblogData.content,
          references: vblogData.references,
          title: vblogData.title,
          videoLink: vblogData.videoLink,
          tags: vblogData.tags,
          image: vblogData.image,
        }
      : {
          content: "Text text text",
          references: [],
          title: "jsahdfjg hdsgfh ahgf",
          videoLink: "https://www.youtube.com",
          tags: [],
          image: "",
        },
  });

  const { execute, isPending, error } = useServerAction(
    !vblogData ? createVblogAction : updateVblogAction,
    {
      onSuccess() {
        toast({
          title: "Success",
          description: "Successfully created a blog post.",
        });
      },
      onError({ err }) {
        toast({
          variant: "destructive",
          description: "Something went wrong." + err?.message,
        });
      },
    }
  );

  async function handlePreview() {
    const postData = form.getValues();
    setIsPreviewLoading(true);
    let postId = "fake-id";
    try {
    } catch (error: any) {
    } finally {
      setIsPreviewLoading(false);
    }
    push(`/preview-post/${postId}`);
  }
  function handleClearForm() {
    refresh();
  }
  async function onSubmit(values: z.infer<typeof VideoBlogSchema>) {
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

    if (vblogData) {
      execute({ data: formData, id: vblogData.id });
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
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title of your blog"
                    {...field}
                    className="max-w-80 bg-gray-100"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          {/* VIDEO LINK */}
          <FormField
            control={form.control}
            name="videoLink"
            render={({ field }) => (
              <FormItem className="flex flex-wrap items-center max-sm:gap-3 sm:gap-6 mt-10">
                <FormLabel className="text-lg text-black pt-3 font-medium">
                  Enter video link
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://www.youtube.com/tutorial"
                    {...field}
                    className="max-w-80 bg-gray-100"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mt-14 flex flex-col justify-start gap-3">
                <FormLabel className="text-lg text-black font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <TextEditor
                    fieldchange={field.onChange}
                    initialValue={field.value}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          {/* REFERENCES */}
          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem className="mt-64 md:mt-0">
                <FormControl>
                  <References
                    fieldchange={field.onChange}
                    initialValue={field.value as []}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ThumbnailUploader
                    fieldchange={field.onChange}
                    title="Featured Image"
                    mediaUrl={"./public/postImage.png"}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="mt-10">
                <FormControl>
                  <Tags
                    fieldchange={field.onChange}
                    title="Add tags to your Post"
                    initialValue={field.value as []}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap justify-between items-center gap-16 mt-14">
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
              <LoaderButton isLoading={isPending}>Save</LoaderButton>
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
      title: string;
      image: string | File[];
      content: string;
      videoLink: string;
      references?: string[] | undefined;
      tags?: string[] | undefined;
    },
    any,
    undefined
  >;
}) {
  const postData = form.getValues();

  console.log("postData", postData);

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

        <div className="my-10">
          <h3 className="font-bold text-lg mb-2">videoLink</h3>
          <p>{postData.videoLink}</p>
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
