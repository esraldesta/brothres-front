"use client";

import { EditProfileSchema } from "@/lib/validation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { USER } from "@/components/main/forms/Registrationform";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/smallPieces/Spinner";
import { areObjectsEqual } from "@/utils";

import { useServerAction } from "zsa-react";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/app/edit-profile/action";
import { Input } from "@/components/ui/input";

interface EditProfileProps {
  userData: USER;
}

export default function EditProfile({ userData }: EditProfileProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      sex: userData.sex,
      dob: userData.dob,
      languages: userData.languages?.join(","),
      languagesToLearn: userData.languagesToLearn?.join(","),
      nickName: userData.nickName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      instagramUserName: userData.instagramUserName,
      facebookId: userData.facebookId,
      weChatId: userData.weChatId,
      vkId: userData.vkId,
      telegramUserName: userData.telegramUserName,
      city: userData.city,
      newPassword: "123dsagfgA!.dff",
      confirmPassword: "",
      country: userData.country,
      state: userData.state,
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
  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    const { newPassword, userName, confirmPassword, ...rest } = values;
    // Compare the two objects to make sure if there is nothing changed so that we don't need to make an http request
    const isNothingChanges = areObjectsEqual(userData, values);
    if (isNothingChanges) return;

    execute({ ...rest, password: newPassword });
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-lg:ml-8">
            {/* SECTION 1 */}
            <section className="mt-16">
              <h2 className="text-xl text-black mb-4 font-semibold">
                {" "}
                Personal Information{" "}
              </h2>
              <div className="editProfileFormContainer">
                {/* FIRST NAME */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">First Name</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* LAST NAME */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Last Name</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* USERNAME */}
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Username"
                          className="formInput"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="editProfileFormContainer">
                {/* SEX */}
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Sex</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="focus:border-none focus-visible:outline-none py-4">
                          <SelectTrigger
                            {...field}
                            className="bg-button max-sm:w-[260px] sm:w-[300px] md:w-[350px] lg:w-[380px] px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male"> Male </SelectItem>
                          <SelectItem value="Female"> Female </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* BIRTH DATE  */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Birth Date</FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          placeholder="DD/MM/YYY"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* LANGUAGES SPOKEN */}
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">
                        Languages Spoken
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="English , French, German"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="editProfileFormContainer">
                <div>
                  {/* Nickname */}
                  <FormField
                    control={form.control}
                    name="nickName"
                    render={({ field }) => (
                      <FormItem className="formContainer">
                        <FormLabel className="formLabel">Nick Name</FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            placeholder="Nickname"
                            className="formInput"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {/* LANGUAGES WISHING TO LEARN  */}
                  <FormField
                    control={form.control}
                    name="languagesToLearn"
                    render={({ field }) => (
                      <FormItem className="formContainer">
                        <FormLabel className="formLabel">
                          Languages wishes to learn
                        </FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            placeholder="English , French, German"
                            className="formInput"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
            {/* SECTION 2 */}
            <section className="mt-20">
              <h2 className="text-xl text-black mb-4 font-semibold">
                {" "}
                Contact Information{" "}
              </h2>
              <div className="editProfileFormContainer">
                {/* PHONE NUMBER */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Phone Number</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Phone number"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Email Address</FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          placeholder="Email address"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* INSTAGRAM USERNAME */}
                <FormField
                  control={form.control}
                  name="instagramUserName"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">
                        Instagram Username
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Instagram Username"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="editProfileFormContainer">
                {/* FACEBOOK ID */}
                <FormField
                  control={form.control}
                  name="facebookId"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Facebook Id</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Facebook Id"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* WECHAT ID */}
                <FormField
                  control={form.control}
                  name="weChatId"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Wechat Id</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Wechat Id"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* VK ID */}
                <FormField
                  control={form.control}
                  name="vkId"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Vk Id</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Vk Id"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 max-xl:flex-wrap gap-8 mt-10">
                {/* TELEGRAM USERNAME */}
                <FormField
                  control={form.control}
                  name="telegramUserName"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">
                        Telegram Username
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Telegram username"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* COUNTRY */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">Country</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Country"
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
                  name="state"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">State</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="state"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                {/* CITY */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">City</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="City"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            {/* //! this must have its own form */}
            <section className="mt-14">
              <h2 className="text-xl text-black mb-4 font-semibold">
                {" "}
                Account Information
              </h2>
              <div className="editProfileFormContainer">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">New Password</FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          placeholder="**********"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="formContainer">
                      <FormLabel className="formLabel">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          placeholder="**********"
                          className="formInput"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </section>
          </div>
          <div className="flex justify-end mt-20">
            <button
              type="submit"
              className="bg-navy w-[180px] h-auto text-white text-base rounded-md px-6 py-2.5"
            >
              {isPending ? <Spinner loading={isPending} /> : "Save Changes"}{" "}
            </button>
          </div>
        </form>
      </Form>
    </section>
  );
}
