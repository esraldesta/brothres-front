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

export const createPostAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async ({ input }) => {
    const response = await authFetch(
      `blogs/write-blog`,
      {
        method: "POST",
        body: input.data as FormData,
      },
      true
    );
    if (response.ok) {
      const result = await response.json();
      // ! revalidate cached page
      revalidatePath("/");
      // ! where to redirect
      redirect("/blog/" + result.id);
    } else {
      const data = await response.json();
      throw new ApiError(data.message);
    }
  });

export const updatePostAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async ({ input }) => {
    const response = await authFetch(
      `blogs/${input.id}/edit`,
      {
        method: "PATCH",
        body: input.data as FormData,
      },
      true
    );
    if (response.ok) {
      revalidatePath(`/blog/${input.id}`);
      redirect(`/blog/${input.id}`);
    } else {{
      const data = await response.json()
      throw new ApiError(data.message);
    }
    }
  });
