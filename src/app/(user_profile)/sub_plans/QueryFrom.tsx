import React, { useState } from "react";
import { X, Paperclip, ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "../../Components/phone-input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must not exceed 20 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "Phone number must contain only numbers",
    })
    .refine((val) => !val || isValidPhoneNumber(val), {
      message: "Invalid phone number",
    }),
  issueType: z.string().min(1, "Please select an issue type"),
  message: z.string().min(1, "Message is required"),
  attachment: z
    .custom<File>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      {
        message: "Attachment must be an image file",
      },
    )
    .optional(),
});

const QueryForm = (props: any) => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      issueType: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", values.fullName);
    formDataToSend.append("email", values.email);
    if (values.phone) {
      formDataToSend.append("phone", values.phone);
    }
    formDataToSend.append("issueType", values.issueType);
    formDataToSend.append("message", values.message);

    if (values.attachment) {
      formDataToSend.append("attachment", values.attachment);
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
          description: "You will be updated through an email!",
          duration: 5000,
        });
        //console.log(result);
        props.close();
      } else {
        toast({
          title: "Failed to submit",
          description:
            "Please confirm the credentials entered and re-upload the Query.",
          duration: 5000,
        });
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
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80"></div>
      <div className="absolute mq450:w-[340px] mq450:ml-5 bg-black z-50 mq450:left-1 mq450:top-20 max-w-md p-6 mx-auto bg-neutral-800 shadow-3xl rounded-lg shadow-lg top-8 left-[530px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-center text-white">
            Query Form
          </h2>
          <button
            onClick={props.close}
            className="text-white hover:text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        <p className="mb-6 text-left text-white">
          If you are having any trouble with the website, please fill the form.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Full Name"
                      {...field}
                      className="text-white bg-neutral-700"
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email Id"
                      {...field}
                      className="text-white bg-neutral-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone" // Ensure this matches the schema
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter a phone number"
                      {...field}
                      maxLength={10}
                      inputMode="numeric"
                      className="w-[430px] mq450:w-[290px]"
                    />
                  </FormControl>
                  <FormMessage /> {/* This should display errors */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Issue Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full px-3 py-2 text-white rounded-md bg-neutral-700 focus:outline-none focus:border-neutral-300 focus:ring-0">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-700 border-neutral-600">
                        <SelectItem
                          value="Technical"
                          className="text-white focus:bg-neutral-600 focus:text-white bdata-[highlighted]:bg-neutral-700 data-[highlighted]:text-white"
                        >
                          Technical
                        </SelectItem>
                        <SelectItem
                          value="Technical"
                          className="text-white focus:bg-neutral-600 focus:text-white bdata-[highlighted]:bg-neutral-700 data-[highlighted]:text-white"
                        >
                          Bookings Related
                        </SelectItem>
                        <SelectItem
                          value="Plan Related"
                          className="text-white focus:bg-neutral-600 focus:text-white bdata-[highlighted]:bg-neutral-700 data-[highlighted]:text-white"
                        >
                          Plan Related
                        </SelectItem>
                        <SelectItem
                          value="Other"
                          className="text-white focus:bg-neutral-600 focus:text-white bdata-[highlighted]:bg-neutral-00 data-[highlighted]:text-white"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Attachment</FormLabel>
                  <FormControl>
                    <>
                      <div className="rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-neutral-200">
                        <button
                          type="button"
                          className="flex items-center w-full px-3 py-2 text-white rounded-md justify-left bg-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-200"
                          onClick={() =>
                            document.getElementById("attachment")?.click()
                          }
                        >
                          <Paperclip className="mr-2 size-5" />
                          Upload Attachment
                        </button>
                        <input
                          id="attachment"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </div>
                      {field.value && (
                        <span className="text-white truncate ">
                          Uploaded file : {field.value.name}
                        </span>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write text here ..."
                      className="text-white bg-neutral-700"
                      {...field}
                      maxLength={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white rounded-md bg-gradient-to-r from-[#F43F5E] to-[#FB923C] hover:shadow-[inset_0_0_0_1px_#FFFFFF] focus:outline-neutral-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Query"
              )}
            </button>
          </form>
        </Form>
      </div>
      <style jsx global>{`
        .PhoneInputInput {
          width: 300px;
          background-color: #404040;
        }
        .phoneInputInput input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default QueryForm;
