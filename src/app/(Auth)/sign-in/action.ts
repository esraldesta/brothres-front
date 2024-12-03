"use server";

import { NEXT_PUBLIC_BACKEND_URL } from "@/constants";

import { redirect } from "next/navigation";
import { createServerAction } from "zsa";
import * as z from "zod";
import { ApiError } from "@/lib/error";
import { AFTER_LOGIN_URL } from "@/constants";
import { createSession, deleteSession } from "@/lib/session";
import { USER } from "@/constants";

export const signInAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async ({ input }) => {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (response.ok) {
      const result = await response.json();
      const { id, role, accessToken, refreshToken, ...rest } = result;
      await createSession({
        user: {
          id,
          role,
        },
        accessToken,
        refreshToken,
      });

      return { role, ...rest } satisfies USER;
    } else {
      const result = await response.json();
      throw new ApiError(result.message);
    }
  });

export const logOutAction = async () => {
  await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/logout`);
  await deleteSession();
};
