"use client";

import Spinner from "@/components/smallPieces/Spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SignFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { signInAction } from "@/app/(Auth)/sign-in/action";
import { useRouter } from "next/navigation";


export default function Signinform() {
  const [isLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter()

  const form = useForm<z.infer<typeof SignFormSchema>>({
    resolver: zodResolver(SignFormSchema),
    defaultValues: {
      userName: "smith",
      password: "123dsagfgA!.dff",
    },
  });

  const { execute, isPending, error } = useServerAction(signInAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Successfully Logged in.",
      });

      router.push("/")
    },
    onError({ err }) {
      toast({
        variant: "destructive",
        description: err?.message,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof SignFormSchema>) {
    await execute(values);
    //const [user, err]: [USER | null, any] = await execute(values);
    // if (!err && user) {
    //   dispatch(set_current_user(user));
    //   router.push(AFTER_LOGIN_URL);
    // }
  }

  return (
    <section className="mainContainer  drop-shadow">
      <h2 className="text-2xl text-blue-900 font-extrabold font-sans text-center mt-10 leading-6">
        Welcome Back!
      </h2>
      <p className="mt-1 text-sm sm:text-base text-center leading-6 font-extralight">
        Login and continue your progress
      </p>
      <div className="mt-10 ml-6 w-full max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="formContainer">
                  <FormLabel className="formLabel">Username</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="SandSmith"
                      disabled={isLoading}
                      className="formInput"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="formContainer mt-7">
                  <FormLabel className="formLabel">Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      disabled={isLoading}
                      placeholder="Enter Password"
                      className="formInput"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-6">
              <Link
                href="/forgot-password"
                className="text-sm text-navy font-semibold max-sm:pr-2"
              >
                {" "}
                Forgot password ?{" "}
              </Link>
            </div>
            <button
              type="submit"
              className="bg-navy w-full mt-7 rounded-md text-white py-2"
            >
              {isLoading ? <Spinner loading={isLoading} /> : "SIGN IN"}
            </button>
            <div className="flex items-center justify-center gap-2 mt-8">
              <p className="text-sm font-medium"> Don't have an account ? </p>
              <Link
                href="/register"
                className="text-sm text-navy font-semibold"
              >
                {" "}
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
