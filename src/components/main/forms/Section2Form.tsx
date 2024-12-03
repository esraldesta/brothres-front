"use client";

import { Section2FormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { GeneralSectionsFormProps } from "./Section1Form";
import FormRow from "@/components/smallPieces/FormRow";
import { useRouter } from "next/navigation";

export default function Section2Form({
  userData,
  setUserData,
  setFilledSection,
  setCurrentlySelected,
}: GeneralSectionsFormProps) {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof Section2FormSchema>>({
    resolver: zodResolver(Section2FormSchema),
    defaultValues: {
      email: userData?.email || "smith@gmail.com",
      telegramUserName: userData?.telegramUserName || "smith",
      phoneNumber: userData?.phoneNumber || "0912334424",
      facebookId: userData?.facebookId || "smith",
      instagramUserName: userData?.instagramUserName || "smith",
      vkId: userData?.vkId || "smith",
      weChatId: userData?.weChatId || "snith",
      country: userData?.country || "smith",
      state: userData?.state || "smith",
      city: userData?.city || "smith",
    },
  });

  function handleBack() {
    push("#main");
    setFilledSection((filledSections) =>
      filledSections.filter((index) => index !== 2)
    );
    setCurrentlySelected(1);
  }

  function onSubmit(values: z.infer<typeof Section2FormSchema>) {
    setUserData({
      ...userData,
      email: values.email,
      telegramUserName: values.telegramUserName,
      phoneNumber: values.phoneNumber && values.phoneNumber,
      facebookId: values.facebookId,
      instagramUserName: values.instagramUserName,
      vkId: values.vkId,
      weChatId: values.weChatId,
      country: values.country,
      state: values.state,
      city: values.city,
    });
    setFilledSection((filledSections) => [...filledSections, 3]);
    setCurrentlySelected(3);
    push("#main");
  }

  return (
    <section className="registrationFormContainer">
      <h2 className="text-navy text-xl text-center font-semibold">
        {" "}
        Contact Information{" "}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="registrationForm"
        >
          <FormRow
            fieldname1="email"
            fieldname2="telegramUserName"
            control={form.control}
            label1="Email"
            label2="Telegram username"
            inputType1="email"
            inputType2="text"
            placeholder1="Email"
            placeholder2="Sandsmith"
            needTopMargin={false}
            optional2={true}
          />
          <FormRow
            fieldname1="phoneNumber"
            fieldname2="vkId"
            control={form.control}
            label1="Phone Number"
            label2="Vk Id"
            inputType1="text"
            inputType2="text"
            placeholder1="Phone Number"
            placeholder2="Your VK ID"
            optional1={true}
            optional2={true}
          />
          <FormRow
            fieldname1="facebookId"
            fieldname2="country"
            control={form.control}
            label1="Facebook Id"
            label2="Country"
            inputType1="text"
            inputType2="text"
            placeholder1="123456789012345"
            placeholder2="USA"
            optional1={true}
          />
          <FormRow
            fieldname1="instagramUserName"
            fieldname2="state"
            control={form.control}
            label1="Instagram username"
            label2="State"
            inputType1="text"
            inputType2="text"
            placeholder1="sand_smith"
            placeholder2="Texas"
            optional1={true}
          />
          <FormRow
            fieldname1="weChatId"
            fieldname2="city"
            control={form.control}
            label1="Wechat Id"
            label2="City"
            inputType1="text"
            inputType2="text"
            placeholder1="unionid=1234567890"
            placeholder2="Austin"
            optional1={true}
            optional2={true}
          />
          <div className="flex items-center max-sm:gap-10 gap-28 mt-14">
            <div>
              <button
                type="button"
                onClick={handleBack}
                className="formBackButton"
              >
                Back
              </button>
            </div>
            <div>
              <button type="submit" className="formNextButton">
                Next
              </button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
