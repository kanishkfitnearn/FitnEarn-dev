"use client";

import UserNavbar from "@/app/Components/UserNavbar";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import TagsInput from "../preview_blog/Hashtags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Zod schema
import { z } from "zod";

const blogSchema = z.object({
  title: z
    .string()
    .min(14, "Title must be at least 14 characters long")
    .refine((value) => value.trim().length >= 14, {
      message: "Title must contain at least 14  characters",
    })
    .refine((value) => /\S/.test(value), {
      message: "Title cannot be empty or contain only spaces",
    }),

  blogHeading: z
    .string()
    .min(80, "Heading must be at least 80 characters long")
    .refine((value) => value.trim().length >= 80, {
      message: "Heading must be at least 80 characters long",
    })
    .refine((value) => /\S/.test(value), {
      message: "Heading cannot be empty or contain only spaces",
    }),

  readTime: z
    .string()
    .min(1, "Please provide a read time")
    .refine((value) => value.trim().length > 0, {
      message: "Please provide a read time",
    }),

  category: z
    .string()
    .min(1, "Please select a blog category")
    .refine((value) => value.trim().length > 0, {
      message: "Please select a blog category",
    }),

  thumbnail: z
    .instanceof(File, { message: "Provide proper thumbnail file" })
    .refine((file) => file.size > 0, {
      message: "Please provide a valid thumbnail",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "File must be a valid image (JPEG, PNG, or WebP)",
      },
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    }),

  tags: z.any(),
});

const Page = () => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [blogHeadingErr, setBlogHeadingErr] = useState<string>();
  const [blogTitleErr, setBlogTitleErr] = useState<string>();
  const [err, setErr] = useState<string>();
  const [err1, setErr1] = useState<string>();
  const [err3, setErr3] = useState<string>();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    readTime: "",
    thumbnail: null as any,
    thumbnailName: "",
    blogHeading: "",
    name: "Default Name",
    blogId: "",
    tags: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReadTimeChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      readTime: value,
    }));
  };
  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Please upload Image file!",
          description: "",
          duration: 3000, // 5 seconds
        });
        // alert("Plese Upload Image file!");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
        thumbnailName: file.name,
      }));
    }
  };

  const handleSelectedTags = (tags: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: tags,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Clear all previous errors
    setErr("");
    setBlogHeadingErr("");
    setBlogTitleErr("");
    setErr1("");
    setErr3("");

    const user_id = Cookies.get("user_id");
    const id_token = Cookies.get("id_token");
    const refresh_token = Cookies.get("refresh_token");
    const username = Cookies.get("username");

    if (!user_id || !id_token) {
      toast({
        title: "User ID or ID token is missing!",
        description: "",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    // Validate form data using Zod
    const formDataToValidate = {
      title: formData.title,
      blogHeading: formData.blogHeading,
      category: formData.category,
      readTime: formData.readTime,
      thumbnail: formData.thumbnail,
      tags: formData.tags,
    };

    try {
      // Zod validation
      blogSchema.parse(formDataToValidate);
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          switch (err.path[0]) {
            case "title":
              setBlogTitleErr(err.message);
              break;
            case "blogHeading":
              setBlogHeadingErr(err.message);
              break;
            case "category":
              setErr(err.message);
              break;
            case "readTime":
              setErr1(err.message);
              break;
            case "thumbnail":
              setErr3(err.message);
              break;
            default:
              break;
          }
        });
      }
      // Set loading to false and return early if validation fails
      setLoading(false);
      return;
    }

    // Only proceed with form submission if validation passes
    const data = new FormData();
    data.append("userId", user_id);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("readTime", formData.readTime);
    data.append("thumbnail", formData.thumbnail);
    data.append("name", formData.name);
    data.append("blogHeading", formData.blogHeading);
    formData.tags.forEach((tag) => {
      data.append("tags", tag);
    });

    try {
      const response = await axios.post(
        `${apiEndpoint}/api/fitnearn/web/users/blog/create-blog`,
        data,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
            "x-username": username,
            "x-refresh-token": refresh_token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success === true) {
        Cookies.set("blog_id", response.data.data, { expires: 7 });
        router.push("/user_blogs/create_blogs/write_blog");
      } else {
        toast({
          title: "Error creating blog",
          description: response.data.message,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error creating blog",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        duration: 3000,
      });
    }

    setLoading(false);
  };

  //logic for clicking the save button
  const handlesave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const user_id = Cookies.get("user_id");
    const id_token = Cookies.get("id_token");
    const refresh_token = Cookies.get("refresh_token");
    const username = Cookies.get("username");
    setErr("");
    setBlogHeadingErr("");
    setBlogTitleErr("");
    setErr1("");
    setErr3("");

    if (!user_id || !id_token) {
      // alert("User ID or ID token is missing!");
      toast({
        title: "User ID or ID token is missing!",
        description: "",
        duration: 3000, // 5 seconds
      });
      setLoading(false);
      return;
    }
    if (formData.title.length < 14) {
      setBlogTitleErr("Title atlest needs to of 14 characters long!");
      // toast({
      //   title: "Title atlest needs to of 5 characters long!",
      //   description: "",
      //   duration: 3000, // 5 seconds
      // });
      setLoading(false);
      return;
    }
    if (formData.blogHeading.length < 80) {
      setBlogHeadingErr("Heading atlest needs to of 80 characters long!");
      // toast({
      //   title: "Heading atlest needs to of 15 characters long!",
      //   description: "",
      //   duration: 3000, // 5 seconds
      // });
      setLoading(false);
      return;
    }
    // Validation checks...

    // if (!formData.readTime) {
    //   // alert("Please fill in all required fields and provide a thumbnail.");
    //   toast({
    //     title: "Please Provide readtime.",
    //     description: "",
    //     duration: 3000, // 5 seconds
    //   });
    //   setLoading(false);
    //   return;
    // }

    // if (!formData.thumbnail) {
    //   // alert("Please fill in all required fields and provide a thumbnail.");
    //   toast({
    //     title: "Please  provide a thumbnail!",
    //     description: "",
    //     duration: 3000, // 5 seconds
    //   });
    //   setLoading(false);
    //   return;
    // }

    // if (!formData.category) {
    //   // alert("Please fill in all required fields and provide a thumbnail.");
    //   toast({
    //     title: "Please select Blog category.",
    //     description: "",
    //     duration: 3000, // 5 seconds
    //   });
    //   setLoading(false);
    //   return;
    // }
    setBlogHeadingErr("");
    setBlogTitleErr("");
    setErr("");
    setErr1("");
    setErr3("");
    // Validate form data using Zod
    const formDataToValidate = {
      title: formData.title,
      blogHeading: formData.blogHeading,
      category: formData.category,
      readTime: formData.readTime,
      thumbnail: formData.thumbnail,
      tags: formData.tags,
    };

    try {
      // Zod validation
      blogSchema.parse(formDataToValidate);
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          switch (err.path[0]) {
            case "title":
              setBlogTitleErr(err.message);
              break;
            case "blogHeading":
              setBlogHeadingErr(err.message);
              break;
            case "category":
              setErr(err.message);
              break;
            case "readTime":
              setErr1(err.message);
              break;
            case "thumbnail":
              setErr3(err.message);
              break;
            default:
              break;
          }
        });
      }
    }
    const data = new FormData();
    // Log the tags being sent
    //console.log("Tags being sent:", formData.tags);
    data.append("userId", user_id);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("readTime", formData.readTime);
    data.append("thumbnail", formData.thumbnail);
    data.append("name", formData.name);
    data.append("blogHeading", formData.blogHeading);
    formData.tags.forEach((tag) => {
      data.append("tags", tag);
    });
    try {
      const response = await axios.post(
        `${apiEndpoint}/api/fitnearn/web/users/blog/create-blog`,
        data,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
            "x-username": username,
            "x-refresh-token": refresh_token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
console.log(response)
      if (response.data.success === true) {
        // Redirect to /write_blog
        //console.log(response);
        // Store the blog_id in a cookie
        Cookies.set("blog_id", response.data.data, { expires: 7 }); // Expires in 7 days, adjust as needed

        //console.log("Blog created successfully. Blog ID:", response.data.data);
        router.push("/user_blogs/all_blogs");
      } else {
        //console.error("Error creating blog:", response.data.message);
        //console.log(response);
      }
    } catch (error) {
      //console.error("Error creating blog:", error);
    }
    setLoading(false);
    setErr("");
    setBlogHeadingErr("");
    setBlogTitleErr("");
  };
  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        <div className="absolute text-white mq450:ml-2 top-28 mq450:top-40 left-56 mq450:left-0 mq450:mt-5 w-fit mq450:w-[360px]">
          <div className="flex ">
            <p className="ml-5 text-2xl font-bold text-neutral-100">
              Write Blog
            </p>
            <button
              onClick={handlesave}
              className="w-[111px] mq450:ml-3 mq1240:ml-[640px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] mq450:ml-[100px] ml-[820px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M15.8333 6.33333H12.0358L10.0367 3.66833C9.72417 3.25 9.225 3 8.7025 3H4.16667C3.2475 3 2.5 3.7475 2.5 4.66667V16.3333C2.5 17.2525 3.2475 18 4.16667 18H15.8333C16.7525 18 17.5 17.2525 17.5 16.3333V8C17.5 7.08083 16.7525 6.33333 15.8333 6.33333ZM4.16667 4.66667H8.7025L9.9525 6.33333H4.16667V4.66667ZM4.16667 16.3333V8H15.8333L15.835 16.3333H4.16667Z"
                  fill="#D4D4D4"
                />
              </svg>
              Save
            </button>
          </div>
          <div className="flex gap-12 p-5 mq450:flex-col mq450:gap-[0px] mq450:p-[-50px]">
            <div className="flex flex-col">
              <label className="py-3 font-Lato" htmlFor="">
                Blog Title*
              </label>
              <input
                id="title"
                name="title"
                placeholder="Add Title"
                value={formData.title}
                onChange={(e) => {
                  const value = e.target.value;
                  // if (value.length < 2) {
                  //   toast({
                  //     title: "Title atlest needs to of 5 characters long!",
                  //     description: "",
                  //     duration: 2000, // 5 seconds
                  //   });
                  // } else if (value.length >= 28) {
                  //   toast({
                  //     title: "Title atlest needs to of 28 characters long!",
                  //     description: "",
                  //     duration: 2000, // 5 seconds
                  //   });
                  // }
                  setFormData({ ...formData, title: e.target.value });
                }}
                maxLength={40}
                className="bg-neutral-800 text-sm focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 mq450:w-[300px] mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              />
              {blogTitleErr ? (
                <span className="flex gap-2 mt-2 ml-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                      fill="#EF4444"
                    />
                  </svg>
                  <span className="text-[#EF4444] text-[12px] leading-normal font-bold font-Lato ">
                    {blogTitleErr}
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col">
              <label className="py-3 leading-normal font-Lato" htmlFor="">
                Category*
              </label>
              {/* <input
                id="category"
                placeholder="Select Categroy"
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="bg-neutral-800  mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              /> */}
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-80 mq1240:w-64 mq450:w-[300px] h-[42px] bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className=" bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Cardio"
                  >
                    Cardio
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Yoga"
                  >
                    Yoga
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Meditation"
                  >
                    Meditation
                  </SelectItem>

                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Lifestyle"
                  >
                    Lifestyle
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Wellbeing"
                  >
                    Wellbeing
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Dance"
                  >
                    Dance
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Workout"
                  >
                    Workout
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Men'sHealth"
                  >
                    Men Health
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Women'sHealth"
                  >
                    Women Health
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="FitnessTips"
                  >
                    Fitness Tips
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Recovery"
                  >
                    Recovery
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Recipes"
                  >
                    Recipes
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Streching"
                  >
                    Streching
                  </SelectItem>

                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="General"
                  >
                    General
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Warmup"
                  >
                    Warmup
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="FitnessStory"
                  >
                    Fitness Story
                  </SelectItem>

                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="Motivation"
                  >
                    Motivation
                  </SelectItem>
                </SelectContent>

                {err ? (
                  <span className="flex gap-2 mt-2 ml-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                        fill="#EF4444"
                      />
                    </svg>
                    <span className="text-[#EF4444] text-[12px] leading-normal font-bold font-Lato ">
                      {err}
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="py-3 font-Lato" htmlFor="readTime">
                Read Time*
              </label>
              <Select
                value={formData.readTime}
                onValueChange={handleReadTimeChange}
              >
                <SelectTrigger className="w-80 mq1240:w-64 h-[42px] mq450:w-[300px] bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectValue placeholder="Select Read Time" />
                </SelectTrigger>
                <SelectContent className=" bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="2min"
                  >
                    2 min
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="5min"
                  >
                    5 min
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="10min"
                  >
                    10 min
                  </SelectItem>
                  <SelectItem
                    className=" bg-neutral-800 text-neutral-400 border-neutral-800"
                    value="15min"
                  >
                    15 min
                  </SelectItem>
                </SelectContent>
              </Select>
              {err1 ? (
                <span className="flex gap-2 mt-2 ml-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                      fill="#EF4444"
                    />
                  </svg>
                  <span className="text-[#EF4444] text-[12px] leading-normal font-bold font-Lato ">
                    {err1}
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex flex-col  mq450:p-[-50px] px-5 py-0">
            <label className="py-3 font-Lato" htmlFor="">
              Blog Heading*
            </label>
            <input
              id="blogHeading"
              name="blogHeading"
              value={formData.blogHeading}
              onChange={(e) => {
                const value = e.target.value;
                // if (value.length < 2) {
                //   toast({
                //     title: "Heading atlest needs to of 15 characters long!",
                //     description: "",
                //     duration: 2000, // 5 seconds
                //   });
                // } else if (value.length >= 120) {
                //   toast({
                //     title: "Heading can be of 120 characters long!",
                //     description: "",
                //     duration: 2000, // 5 seconds
                //   });
                // }
                setFormData({ ...formData, blogHeading: e.target.value });
              }}
              maxLength={100}
              placeholder="Add Heading"
              className="bg-neutral-800 text-neutral-400 text-sm focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 mq450:w-[300px] w-full h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
            />
          </div>
          {blogHeadingErr ? (
            <span className="flex gap-2 mt-2 ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                  fill="#EF4444"
                />
              </svg>
              <span className="text-[#EF4444] text-[12px] leading-normal font-bold font-Lato ">
                {blogHeadingErr}
              </span>
            </span>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-0 p-5 py-5 ml-0 mq450:w-auto ">
            <label className="py-3 font-Lato" htmlFor="">
              Add Your Hashtags here
            </label>
            <TagsInput selectedTags={handleSelectedTags} tags={formData.tags} />
          </div>
          <div className="px-4 mq450:w-[340px]">
            <p className="p-2">Thumbnail Image:</p>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-neutral-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {formData.thumbnailName ? (
                    <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Uploaded file: {formData.thumbnailName}
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {err3 ? (
              <span className="flex gap-2 mt-2 ml-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                    fill="#EF4444"
                  />
                </svg>
                <span className="text-[#EF4444] text-[12px] leading-normal font-bold font-Lato ">
                  {err3}
                </span>
              </span>
            ) : (
              ""
            )}
            {formData.thumbnailName && (
              <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                Uploaded file: {formData.thumbnailName}
              </p>
            )}
            <div className="flex justify-center p-5 text-xl">
              {loading && <Loader />}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-[111px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]   mq1240:ml-[750px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[200px] ml-[970px] m-1 text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
          >
            Next
          </button>
        </div>
      </div>
      <style jsx global>{`
       /* Styling for Tags Input */
.tags-input {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 32px;
  width: screen;
  padding: 0 8px;
  border: 1px solid #333; /* Darker border */
  border-radius: 6px;
  background-color: #202020; /* Dark background */
  color: white;
}
.tags-input input:focus {
  outline: none;
  box-shadow: none; /* To remove any shadow effect */
}
.tags-input input {
  flex: 1;
  border: none;
  background-color: #202020;
  height: 22px;
  font-size: 14px;
  padding: 8px 0;
  color: white;
}

.tags-input input::placeholder {
  color: #999; /* Placeholder color */
}

.tags-input input:focus {
  outline: none;
  border: none;
}

#tags {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 2px 0;
}

.tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  margin: 4px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

.tag .tag-title {
  margin-right: 8px;
}

.tag .tag-close-icon {
  cursor: pointer;
  font-size: 14px;
  color: #999;
  margin-left: 8px;
}

.tag .tag-close-icon:hover {
  color: white;
}

/* Suggested Tags Section */
.suggested-tags {
  margin-top: 16px;
  padding: 16px;
  background-color: #2b2b2b;
  border-radius: 6px;
  max-width: 480px;
}

.suggested-tags h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: white;
}

.suggested-tag {
  display: block;
  color: #999;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
}

.suggested-tag:hover {
  color: white;
}

/* Mobile Responsiveness */
@media screen and (max-width: 567px) {
  .tags-input {
    width: 300px;
  }

  .suggested-tags {
 

        .codex-editor {
          color: white;
        }
        .codex-editor path {
          stroke: gray;
        }
        h1.ce-header {
          font-size: 2em;
        }
        h2.ce-header {
          font-size: 1.5em;
        }
        h3.ce-header {
          font-size: 1.17em;
        }
        h4.ce-header {
          font-size: 1em;
        }
        h5.ce-header {
          font-size: 0.83em;
        }
        h6.ce-header {
          font-size: 0.67em;
        }
           /* Width of 300px on mq450 (max-width: 450px) */
  @media screen and (max-width: 450px) {
    .tags-input {
      width: 300px;
      height:109px
    }
  }
      @media screen and (max-width: 450px) {
    #tags{
   
      height:66px
    }
  }
      `}</style>
    </>
  );
};

export default Page;
