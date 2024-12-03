"use server";

import { NEXT_PUBLIC_BACKEND_URL } from "@/constants";

import { redirect } from "next/navigation";
import { createServerAction } from "zsa";
import * as z from "zod";
import { ApiError } from "@/lib/error";
import { AFTER_LOGIN_URL } from "@/constants";
import { createSession } from "@/lib/session";
import { USER } from "@/constants";
import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/authFetch";

export const createVblogAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async ({ input }) => {
    console.log(input.data);
    const response = await authFetch(
      `blogs/write-vblog`,
      {
        method: "POST",
        body: input.data as FormData,
      },
      true
    );
    if (response.ok) {
      const result = await response.json();
      redirect("/profile/blogs/" + result.id);

      //! revalidate cached page
      revalidatePath("/");
      //! where to redirect
      redirect("/profile/blogs/" + result.id);
    } else {
      const result = await response.json();
      console.log(result.message);
      throw new ApiError(result.message, "CreateBlogError");
    }
  });

export const updateVblogAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async ({ input }) => {
    const response = await authFetch(
      `blogs/${input.id}/edit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
      true
    );
    if (response.ok) {
      revalidatePath(`/video-blog/${input.id}`);
      redirect(`/video-blog/${input.id}`);
    } else {
      throw new ApiError(response.statusText, "CreateBlogError");
    }
  });
