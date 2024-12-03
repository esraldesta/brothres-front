"use server";

import { NEXT_PUBLIC_BACKEND_URL } from "@/constants";

import { redirect } from "next/navigation";
import { createServerAction } from "zsa";
import * as z from "zod";
import { ApiError } from "@/lib/error";

export const registerAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async ({ input }) => {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (response.ok) {
      redirect("/sign-in");
    } else {
      const res = await response.json();
      throw new ApiError(res.message);
    }
  });
