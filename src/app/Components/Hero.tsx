import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "./phone-input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Cookies from "js-cookie";

const FormSchema = z.object({
  phone: z.any(),
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
  issueType: z.string().optional(), // Added issueType field
  attachment: z.any().optional(), // Added attachment field
});

export default function Hero({ close }: { close?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      fullName: "",
      email: "",
      message: "",
      issueType: "Other",
      attachment: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", data.fullName);
    formDataToSend.append("email", data.email);
    formDataToSend.append("phone", data.phone);
    formDataToSend.append("issueType", "Other");
    formDataToSend.append("message", data.message);

    if (data.attachment) {
      formDataToSend.append("attachment", data.attachment);
    }

    try {
      const id_token = Cookies.get("id_token");
      const refresh_token = Cookies.get("refresh_token") || "";
      const username = Cookies.get("username") || "";

      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${id_token}`,
            "x-refresh-token": refresh_token,
            "x-username": username,
          },
          body: formDataToSend,
        },
      );

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Query Submitted!",
          description: "Watch out email for status!",
          duration: 5000,
        });
        //console.log(result);
        close?.();
      } else {
        const result = await response.json();
        //console.log(result);
        toast({
          title: "Failed to submit",
          description:
            "Please confirm the credentials entered and re-upload the Query.",
          duration: 5000,
        });
      }
    } catch (error) {
      //console.error("Error submitting query:", error);
      toast({
        title: "Failed to submit",
        description:
          "Please confirm the credentials entered and re-upload the Query.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function onError(errors: any) {
    //console.error("Validation errors:", errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center gap-3 md:items-start md:gap-6"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <div className="w-[327px] md:w-[366px] relative">
                <Input
                  type="text"
                  placeholder="Enter Full Name"
                  maxLength={50}
                  {...field}
                  className="w-[327px] focus:outline-none focus:border-neutral-300 focus:ring-0 md:w-[366px] bg-[#262626] text-white border rounded-[8px] py-3 px-10"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute top-3 left-4"
                >
                  <path
                    d="M10.7295 4.48993C10.7295 5.94715 9.51768 7.14782 7.9987 7.14782C6.47972 7.14782 5.26793 5.94715 5.26793 4.48993C5.26793 3.0327 6.47972 1.83203 7.9987 1.83203C9.51768 1.83203 10.7295 3.0327 10.7295 4.48993ZM6.92197 8.84958C6.9221 8.84958 6.92223 8.84957 6.92236 8.84957H9.07504C9.07517 8.84957 9.07529 8.84958 9.07542 8.84958C9.89822 8.85064 10.6848 9.17069 11.2632 9.73606C11.8413 10.3011 12.1644 11.0648 12.1654 11.859V13.9636C12.1654 14.0134 12.1452 14.0635 12.1056 14.1023C12.0655 14.1414 12.0089 14.1654 11.9474 14.1654H4.04998C3.98854 14.1654 3.93185 14.1414 3.89181 14.1023C3.85216 14.0635 3.83203 14.0134 3.83203 13.9636V11.8587C3.83309 11.0646 4.15615 10.3011 4.7342 9.73606C5.31262 9.17069 6.09918 8.85064 6.92197 8.84958Z"
                    fill="#A3A3A3"
                    stroke="#A3A3A3"
                  />
                </svg>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <div className="w-[327px] md:w-[366px] relative">
                <Input
                  type="text"
                  placeholder="Enter Email Address"
                  {...field}
                  className="w-[327px] md:w-[366px] bg-[#262626] text-white border-1px border-[#525252] rounded-[8px] py-3 px-10"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute top-3 left-4"
                >
                  <path
                    d="M9.12255 9.94688L9.1336 9.93899L9.1442 9.93052L14.1654 5.91734V11.4209C14.1654 11.6068 14.0866 11.7927 13.9337 11.9353C13.7796 12.0791 13.5637 12.1654 13.332 12.1654H2.66536C2.43365 12.1654 2.21777 12.0791 2.06371 11.9353C1.91083 11.7927 1.83203 11.6068 1.83203 11.4209V5.91708L6.88594 9.95485L6.89812 9.96458L6.91089 9.97354C7.22499 10.1939 7.60322 10.3101 7.98831 10.3094L7.99 10.3094C8.39602 10.3072 8.79368 10.1817 9.12255 9.94688ZM2.8744 3.83203H13.123L7.9987 7.92735L2.8744 3.83203Z"
                    fill="#A3A3A3"
                    stroke="#A3A3A3"
                  />
                </svg>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormControl className="w-full">
                <PhoneInput placeholder="Enter a phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <Textarea
                placeholder="Write your query..."
                maxLength={200}
                {...field}
                className="w-[327px] md:w-[461px] h-[126px] focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 bg-[#262626] text-white border-1px border-[#525252] rounded-[8px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="query-btn bg-gradient-to-r from-[#F43F5E] to-[#FB923C] hover:border-white hover:border-1 w-[327px] md:w-[114px]"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Query"}
        </Button>
      </form>
    </Form>
  );
}
