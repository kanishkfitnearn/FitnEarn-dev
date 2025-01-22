"use client";
import Navbar from "@/app/Components/Navbar";
import UserNavbar from "@/app/Components/UserNavbar";
import UserProfileInput from "@/app/Components/UserProfileInput";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import TagsInput from "../../../preview_blog/Hashtags";
import { useToast } from "@/components/ui/use-toast";

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

  thumbnail: z.any(),

  tags: z.any(),
});

const Page = ({ params }: any) => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState<any>();
  const { toast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    readTime: "",
    thumbnail: null as any,
    thumbnailName: "",
    blogHeading: "",
    name: "Default Name",
    tags: [] as string[],
  });
  const [blogHeadingErr, setBlogHeadingErr] = useState<string>();
  const [blogTitleErr, setBlogTitleErr] = useState<string>();
  const [err, setErr] = useState<string>();
  const [err1, setErr1] = useState<string>();
  const [err3, setErr3] = useState<string>();
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    readTime: "",
    blogHeading: "",
    thumbnail: "",
    content: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length < 2) {
      // toast({
      //   title: "Title atlest needs to of 5 characters long!",
      //   description: "",
      //   duration: 2000, // 5 seconds
      // });
    } else if (value.length >= 28) {
      toast({
        title: "Title atlest needs to of 28 characters long!",
        description: "",
        duration: 2000, // 5 seconds
      });
    }

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file!");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
        thumbnailName: file.name,
      }));
    }
  };

  //logic for clicking the next button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user_id = Cookies.get("user_id");
    const id_token = Cookies.get("id_token");
    const refresh_token = Cookies.get("refresh_token");
    const username = Cookies.get("username");

    // Clear previous errors
    setErr("");
    setBlogHeadingErr("");
    setBlogTitleErr("");
    setErr1("");
    setErr3("");

    if (!user_id || !id_token) {
      alert("User ID or ID token is missing!");
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
      //console.log("Zod validation passed");
    } catch (error) {
      //console.error("Zod validation failed:", error);
      if (error instanceof z.ZodError) {
        let hasErrors = false;
        error.errors.forEach((err) => {
          hasErrors = true;
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
            // case "thumbnail":
            //   setErr3(err.message);
            //   break;
            default:
              console.warn("Unhandled error path:", err.path[0]);
              break;
          }
        });

        if (hasErrors) {
          //console.log("Validation errors detected, stopping form submission");
          setLoading(false);
          return; // Stop execution if there are validation errors
        }
      }
    }

    //console.log("Proceeding with form submission");

    const data = new FormData();
    data.append("userId", user_id);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("readTime", formData.readTime);
    data.append("name", formData.name);
    data.append("blogHeading", formData.blogHeading);
    formData.tags.forEach((tag) => {
      data.append("tags", tag);
    });
    if (blogId) {
      data.append("blogId", blogId);
    }
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    try {
      const response = await axios.post(
        `{apiEndpoint}/api/fitnearn/web/users/blog/create-blog`,
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
        //console.log("Blog updated successfully. Blog ID:", response.data.data);
        Cookies.set("blog_id", response.data.data, { expires: 7 });
        router.push(
          `/user_blogs/create_blogs/write_blog/edit_content/${response.data.data}`,
        );
      } else {
        //console.error("Error updating blog:", response.data.message);
      }
    } catch (error) {
      //console.error("Error updating blog:", error);
    }
    setLoading(false);
  };
  const handleSelectedTags = (tags: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: tags,
    }));
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      const storedBlogId = params.id;
      if (!storedBlogId) {
        //console.error("Blog ID not found in cookies");
        setBlogId(params.id);
      }
      setBlogId(params.id);

      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/blog/${params.id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setFormData({
          title: result.data.blog.title,
          category: result.data.blog.category,
          readTime: result.data.blog.readTime,
          blogHeading: result.data.blog.blogHeading,
          thumbnail: result.data.blog.thumbnail || null,
          thumbnailName: "",
          name: result.data.blog.name || "Default Name",
          tags: result.data.blog.tags || [],
        });
        //console.log(result.data.blog);
      } catch (error) {
        //console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);
  const newTagArray = formData.tags.map((tag: any) => tag);

  //console.log(newTagArray);
  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        <div className="absolute text-white mq450:ml-2 mq450:top-40 top-28 left-56 mq450:left-0 mq450:mt-5 mq450:w-[320x]">
          <div className="flex ">
            <p className="mx-2 text-2xl font-bold text-neutral-100">
              Write Blog
            </p>
            {/* <button
              onClick={handlesave}
              className="w-[111px] mq450:ml-3 mq1240:ml-[640px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[100px] ml-[780px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
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
            </button> */}
          </div>
          <div className="flex gap-12 p-5 mq450:flex-col mq450:gap-[0px] mq450:p-[-50px]">
            <div className="flex flex-col">
              <label
                className="py-3 leading-normal text-neutral-100 font-Lato"
                htmlFor=""
              >
                Blog Title*
              </label>
              <input
                id="title"
                name="title"
                placeholder="Select Title"
                value={formData.title}
                // onChange={(e) => {
                //   handleInputChange;
                //   const value = e.target.value;
                //   if (value.length < 2) {
                //     toast({
                //       title: "Title atlest needs to of 5 characters long!",
                //       description: "",
                //       duration: 2000, // 5 seconds
                //     });
                //   } else if (value.length >= 28) {
                //     toast({
                //       title: "Title atlest needs to of 28 characters long!",
                //       description: "",
                //       duration: 2000, // 5 seconds
                //     });
                //   }

                // }}
                onChange={handleInputChange}
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
              <label
                className="py-3 leading-normal text-neutral-100 font-Lato"
                htmlFor=""
              >
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
                <SelectTrigger className="w-80 mq1240:w-64 h-[42px] mq450:w-auto bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectValue placeholder="Select Read Time" />
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
              </Select>
            </div>
            <div className="flex flex-col">
              <label
                className="py-3 leading-normal text-neutral-100 font-Lato"
                htmlFor="readTime"
              >
                Read Time*
              </label>
              <Select
                value={formData.readTime}
                onValueChange={handleReadTimeChange}
              >
                <SelectTrigger className="w-80 mq1240:w-64 mq450:w-auto h-[42px] bg-neutral-800 text-neutral-400 border-neutral-800">
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
            </div>
          </div>
          <div className="flex flex-col  mq450:p-[-50px] px-5 py-4">
            <label
              className="py-3 leading-normal text-neutral-100 font-Lato"
              htmlFor=""
            >
              Blog Heading*
            </label>
            <input
              id="blogHeading"
              name="blogHeading"
              value={formData.blogHeading}
              maxLength={100}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length < 2) {
                  // toast({
                  //   title: "Heading atlest needs to of 15 characters long!",
                  //   description: "",
                  //   duration: 2000, // 5 seconds
                  // });
                } else if (value.length >= 120) {
                  toast({
                    title: "Heading can be of 120 characters long!",
                    description: "",
                    duration: 2000, // 5 seconds
                  });
                }
                setFormData({ ...formData, blogHeading: e.target.value });
              }}
              // onChange={(e) =>
              //   setFormData({ ...formData, blogHeading: e.target.value })
              // }
              placeholder="Add Heading"
              className="bg-neutral-800 text-neutral-400 text-sm focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 mq450:w-[300px] w-full h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
            />
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
          </div>
          <div className="flex flex-col gap-0 p-5 py-5 ml-0 mq450:w-auto ">
            <label
              className="py-3 leading-normal text-neutral-100 font-Lato"
              htmlFor=""
            >
              Add Your tags here
            </label>

            <TagsInput selectedTags={handleSelectedTags} tags={formData.tags} />
          </div>
          {!showUpload && (
            <>
              <div className="flex items-center justify-between mx-5">
                <p className="py-2 ml-0 leading-normal text-neutral-100 font-Lato">
                  Previous Thumbnail:
                </p>
                <p
                  className="border-b cursor-pointer border-neutral-300 text-neutral-400"
                  onClick={() => setShowUpload(true)}
                >
                  Edit Image
                </p>
              </div>
              <div className="flex flex-row justify-center py-5 m-auto align-middle">
                {formData.thumbnailName ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    {formData.thumbnail ? (
                      <Image
                        className="mq450:w-[320px]"
                        src={formData.thumbnail ? formData.thumbnail : ""}
                        alt="thumbnail"
                        width={500}
                        height={100}
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {formData.thumbnail ? (
            <></>
          ) : (
            <div className="p-4">
              <p className="p-2">New Thumbnail:</p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-neutral-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"></p>
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
          )}

          {showUpload && (
            <div className="p-4">
              <p className="p-2">New Thumbnail:</p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-neutral-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {formData.thumbnailName && (
                <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  Uploaded file: {formData.thumbnailName}
                </p>
              )}
              <div className="flex justify-center p-5 text-xl">
                {loading && <Loader />}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-[111px] mb-3 hover:bg-gradient-to-r hover:from-[#F43F5E]  hover:to-[#FB923C]  mq1240:ml-[750px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[220px] ml-[960px] m-0 text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
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
    width: auto;
  }

  .suggested-tags {
    width: calc(100vw - 32

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
      `}</style>
    </>
  );
};

export default Page;
