"use client";
import Navbar from "@/app/Components/Navbar";
import UserNavbar from "@/app/Components/UserNavbar";
import UserProfileInput from "@/app/Components/UserProfileInput";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { OutputData } from "@editorjs/editorjs";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import TagsInput from "./Hashtags";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Blogs from "@/app/blogs/page";
const EditorBlock = dynamic(() => import("@/app/Components/Editor"), {
  ssr: false,
});
const Page = () => {
  const handleSelectedTags = (tags: string[]) => {
    setBlogData((prevData) => ({
      ...prevData,
      tags: tags,
    }));
  };
  const [showBioPopup, setShowBioPopup] = useState(false);
  const BioPopup = ({ onClose }: any) => {
    const [bio, setBio] = useState("");
    const [bioErr, setBioErr] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const userId = Cookies.get("user_id");

      // Count characters excluding spaces
      const charCountWithoutSpaces = bio.replace(/\s/g, "").length;

      if (bio.length > 80) {
        setBioErr("Max 80 characters allowed.");
        toast({
          title: "Bio is too long!",
          description: "Max 80 characters allowed.",
          duration: 3000,
        });
        return;
      } else if (bio.length === 0) {
        setBioErr("Bio cannot be empty!");
        return;
      } else if (charCountWithoutSpaces < 40) {
        setBioErr("Min 40 characters required.");
        return;
      } else {
        setBioErr(""); // Clear error if all conditions are met
      }

      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/blog/create-bio`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              bioContent: bio,
            }),
          },
        );

        const data = await response.json();

        if (data.success) {
          toast({
            title: "Success",
            description: data.message,
            duration: 3000,
          });
          router.push("/user_blogs/create_blogs/blog_details");
        } else {
          toast({
            title: "Error",
            description: data.message,
            duration: 3000,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while creating the bio.",
          duration: 3000,
        });
      }
      onClose();
    };

    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-neutral-800 w-[580px] h-[437px] rounded-lg shadow-lg relative flex flex-col">
            <button
              onClick={() => setShowBioPopup(false)}
              className="absolute text-gray-600 top-4 right-4 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col flex-grow p-8">
              <h2 className="mb-2 text-3xl font-bold text-center text-white">
                Tell us about yourself
              </h2>
              <p className="mb-6 text-center text-neutral-500">
                Share your journey, goals, or what motivates you – make your
                profile uniquely yours!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                <textarea
                  className="flex-grow w-full p-4 mb-4 text-white rounded-md resize-none focus:border-none focus:outline-neutral-600 focus:ring-0 bg-neutral-900"
                  placeholder="Write text here ..."
                  value={bio}
                  onChange={(e: any) => {
                    const inputValue = e.target.value;
                    setBio(inputValue);

                    if (inputValue.length > 80) {
                      toast({
                        title: "Bio is too long!",
                        description: "Max 80 characters allowed.",
                        duration: 3000,
                      });
                    }
                  }}
                  maxLength={80}
                />
                <div className="mb-2 text-right text-sm text-gray-400">
                  {bio.length}/80 characters
                </div>
                {bioErr ? (
                  <span className="flex gap-2 mt-0">
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
                    <span className="text-[#EF4444] text-[12px] leading-normal font-bold font-Lato">
                      {bioErr}
                    </span>
                  </span>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="flex justify-center py-3 m-auto text-center text-white transition-colors rounded-md w-80 bg-gradient-to-r from-[#F43F5E] to-[#FB923C] hover:border-white hover:outline-white hover:from-red-600 hover:to-orange-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  const PopUp = () => {
    return (
      <div className="w-[580px] mq1050:left-36 mq450:w-[240px] mq450:left-10 top-10 left-72 absolute h-[397px]  bg-neutral-800 rounded-2xl border border-[#3f3f3f] backdrop-blur-[200px]">
        <div className="left-[52px] mq450:w-[240px] mq450:left-0 top-[53px] absolute flex-col justify-center items-center gap-5 inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
            fill="none"
          >
            <path
              d="M102.428 47.7478L98.0874 43.4027C97.1691 42.4892 96.6664 41.2712 96.6664 39.9807V33.8327C96.6664 25.8383 90.1607 19.3327 82.1664 19.3327H76.0184C74.7472 19.3327 73.5002 18.8155 72.6012 17.9165L68.2561 13.5713C62.6011 7.91633 53.4081 7.91633 47.7531 13.5713L43.3982 17.9165C42.4992 18.8155 41.2522 19.3327 39.9811 19.3327H33.8331C25.8387 19.3327 19.3331 25.8383 19.3331 33.8327V39.9807C19.3331 41.2712 18.8304 42.4892 17.9169 43.4027L13.5717 47.743C10.8312 50.4835 9.32324 54.1278 9.32324 57.9993C9.32324 61.8708 10.8361 65.5152 13.5717 68.2508L17.9121 72.596C18.8304 73.5095 19.3331 74.7275 19.3331 76.018V82.166C19.3331 90.1603 25.8387 96.666 33.8331 96.666H39.9811C41.2522 96.666 42.4992 97.1832 43.3982 98.0822L47.7434 102.432C50.5709 105.255 54.2829 106.666 57.9949 106.666C61.7069 106.666 65.4189 105.255 68.2464 102.427L72.5916 98.0822C73.5002 97.1832 74.7472 96.666 76.0184 96.666H82.1664C90.1607 96.666 96.6664 90.1603 96.6664 82.166V76.018C96.6664 74.7275 97.1691 73.5095 98.0874 72.596L102.428 68.2557C105.163 65.5152 106.676 61.8757 106.676 57.9993C106.676 54.123 105.168 50.4835 102.428 47.7478ZM80.0156 52.354L51.0156 71.6873C50.1987 72.2335 49.2611 72.4993 48.3331 72.4993C47.0861 72.4993 45.8487 72.016 44.9159 71.0832L35.2492 61.4165C33.3594 59.5267 33.3594 56.472 35.2492 54.5822C37.1391 52.6923 40.1937 52.6923 42.0836 54.5822L48.9469 61.4455L74.6506 44.3113C76.8787 42.8275 79.8754 43.4268 81.3544 45.6502C82.8382 47.8735 82.2389 50.875 80.0156 52.354Z"
              fill="#15803D"
            />
          </svg>{" "}
          <div className="h-[88px] mq450:w-[240px] mq450:justify-center mq450:text-center  relative text-center flex justify-center ">
            <div className=" top-0 mq450:text-3xl absolute text-center text-white text-[40px] font-bold font-Lato leading-[60px]">
              Congratulation
            </div>
            <div className="w-[476px] left-0 mq450:text-sm mq450:w-[240px] mq450:justify-center mq450:text-center mt-16 text-center text-neutral-100 text-xl font-md font-Lato">
              Your Blog is Sent for Review
            </div>
          </div>
          <div className="w-[190px] justify-center mq450:w-[240px] mq450:justify-center mq450:text-center items-start gap-[21px] inline-flex">
            <div className="flex items-center justify-center gap-2 px-5 py-3 border rounded-lg bg-gradient-to-r from-rose-500 to-orange-400 border-rose-500">
              <div className="text-base font-medium leading-normal text-white font-Lato">
                Thanks
              </div>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 left-[515px] top-[17px] absolute" />
      </div>
    );
  };
  const { toast } = useToast();
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const router = useRouter();
  const [blogId, setBlogId] = useState<any>();
  const [popup, setShowPopUp] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    readTime: "",
    blogHeading: "",
    thumbnail: "",
    content: null,
    tags: [] as string[],
  });

  const [data, setData] = useState<OutputData>();
  const handleReadTimeChange = (value: string) => {
    setBlogData((prevData) => ({
      ...prevData,
      readTime: value,
    }));
  };
  useEffect(() => {
    const fetchBlogData = async () => {
      const blogId = Cookies.get("blog_id");
      setBlogId(blogId);
      if (!blogId) {
        //console.error("Blog ID not found in cookies");
        return;
      }

      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/blog/${blogId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        //console.log(result);
        // Parse the tags correctly
        let parsedTags: string[] = [];
        if (result.data.blog.tags && result.data.blog.tags.length > 0) {
          try {
            parsedTags = JSON.parse(result.data.blog.tags[0]);
          } catch (e) {
            //console.error("Error parsing tags:", e);
          }
        }
        //console.log(result.data.blog.tags);
        setBlogData({
          title: result.data.blog.title,
          category: result.data.blog.category,
          readTime: result.data.blog.readTime,
          blogHeading: result.data.blog.blogHeading,
          thumbnail: result.data.blog.thumbnail,
          content: result.data.blog.content,
          tags: result.data.blog.tags,
        });
        setData(result.data.blog.content);
        //console.log(result.data.blog.content);
      } catch (error) {
        //console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  const sendForReview = async (e: any) => {
    e.preventDefault();
    const blog_id = Cookies.get("blog_id");
    const userId = Cookies.get("user_id");

    try {
      // Step 1: Check if the user has a bio
      const bioCheckResponse = await axios.get(
        `https://iwojpgsdff.execute-api.ap-south-1.amazonaws.com/dev/api/fitnearn/web/users/blog/get-bio/${userId}`,
      );
console.log(bioCheckResponse.data);
      if (!bioCheckResponse.data.success) {
        // User doesn't have a bio, show BioPopup
        setShowBioPopup(true); // This will render the `BioPopup` component
        return; // Exit the function until bio is submitted
      }

      // Step 2: Proceed to send the blog for review if the user has a bio
      const response = await axios.patch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/save-blog/${blog_id}`,
      );

      if (response.data.success === true) {
        setTimeout(() => {
          setShowPopUp(true);
        }, 2000);

        router.push("/user_blogs/under_review_blogs");
        Cookies.remove("blog_id");
        toast({
          title: "Sent For Review!",
          description: "Your blog has been sent for review.",
          duration: 5000, // 5 seconds
        });
      } else {
        toast({
          title: "Error",
          description:
            response.data.message || "Failed to send the blog for review.",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending the blog for review.",
        duration: 5000,
      });
    } finally {
      Cookies.remove("blog_id");
    }
  };

  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        {showBioPopup && <BioPopup onClose={() => setShowBioPopup(false)} />}

        <div className="absolute text-white mq450:ml-2 top-40 left-56 mq450:left-0 mq450:mt-5 w-fit">
          <div className="flex ">
            <p className="text-2xl font-bold text-neutral-100 mq450:ml-2">
              Write Blog
            </p>
            <Link href={`/user_blogs/create_blogs/blog_details/${blogId}`}>
              <button className="w-[111px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] mq1240:ml-[600px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[120px] ml-[840px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M13.1349 16.2657C13.1349 16.3011 13.1215 16.3351 13.0977 16.3602C13.0739 16.3853 13.0417 16.3993 13.008 16.3993H4.14613C4.11248 16.3993 4.08021 16.3853 4.05642 16.3602C4.03263 16.3351 4.01927 16.3011 4.01927 16.2657V6.92909C4.01927 6.89364 4.03263 6.85965 4.05642 6.83458C4.08021 6.80952 4.11248 6.79543 4.14613 6.79543H9.59726L11.1165 5.19478H4.14613C3.70967 5.19521 3.2912 5.37806 2.98258 5.70322C2.67396 6.02837 2.5004 6.46925 2.5 6.92909V16.2657C2.5004 16.7255 2.67396 17.1664 2.98258 17.4916C3.2912 17.8167 3.70967 17.9996 4.14613 18H13.008C13.4445 17.9996 13.8629 17.8167 14.1716 17.4916C14.4802 17.1664 14.6537 16.7255 14.6541 16.2657V10.5226L13.1349 12.1232V16.2657Z"
                    fill="#D4D4D4"
                  />
                  <path
                    d="M16.8297 3.70297C16.4024 3.25286 15.8228 3 15.2185 3C14.6143 3 14.0347 3.25286 13.6074 3.70297L7.69817 9.92791C7.59226 10.0397 7.5201 10.182 7.49079 10.3369L6.95373 13.1668C6.9312 13.2831 6.9335 13.4032 6.96047 13.5185C6.98744 13.6337 7.0384 13.7412 7.10966 13.8331C7.18092 13.9251 7.27069 13.9991 7.37248 14.05C7.47426 14.1009 7.58552 14.1272 7.69817 14.1272C7.74915 14.127 7.8 14.122 7.8501 14.112L10.5354 13.5462C10.6825 13.5151 10.8176 13.4388 10.9236 13.3269L16.832 7.10196C17.044 6.87879 17.2121 6.61376 17.3267 6.32205C17.4413 6.03035 17.5002 5.71769 17.5 5.40197C17.4998 5.08625 17.4405 4.77368 17.3255 4.48214C17.2104 4.19061 17.042 3.92583 16.8297 3.70297ZM15.7556 4.83464C15.8262 4.90896 15.8823 4.99723 15.9205 5.09439C15.9587 5.19155 15.9784 5.29569 15.9784 5.40087C15.9784 5.50604 15.9587 5.61019 15.9205 5.70734C15.8823 5.8045 15.8262 5.89277 15.7556 5.9671L15.3484 6.39527L14.2743 5.26361L14.6815 4.83464C14.8239 4.6846 15.0171 4.60031 15.2185 4.60031C15.42 4.60031 15.6132 4.6846 15.7556 4.83464ZM10.0097 12.0208L8.6667 12.3041L8.93562 10.8883L13.2002 6.39527L14.2743 7.52693L10.0097 12.0208Z"
                    fill="#D4D4D4"
                  />
                </svg>
                Edit
              </button>
            </Link>
          </div>
          <div className="flex gap-12 p-5 mq450:flex-col mq450:gap-[0px] mq450:p-[-50px] ">
            <div className="flex flex-col">
              <label
                className="py-3 leading-normal text-neutral-100 font-Lato"
                htmlFor=""
              >
                Blog Title*
              </label>
              <input
                value={blogData.title}
                readOnly
                className="bg-neutral-800 focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 mq450:w-auto text-neutral-400 w-80 h-[42px] p-3 mq1240:w-60  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="py-3 leading-normal text-neutral-100 font-Lato"
                htmlFor=""
              >
                Category*
              </label>
              <input
                value={blogData.category}
                readOnly
                className="bg-neutral-800 focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 mq450:w-auto mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="py-3 leading-normal text-neutral-100 font-Lato"
                htmlFor="readTime"
              >
                Read Time*
              </label>
              <Select
                value={blogData.readTime}
                onValueChange={handleReadTimeChange}
              >
                <SelectTrigger className="w-80 mq1240:w-64 mq450:w-auto h-[42px] bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectValue placeholder="Select read time" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 text-neutral-400 border-neutral-800">
                  <SelectItem value="2min">2 min</SelectItem>
                  <SelectItem value="5min">5 min</SelectItem>
                  <SelectItem value="10min">10 min</SelectItem>
                  <SelectItem value="15min">15 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col  mq450:p-[-50px] px-5 py-4">
            <label
              className="py-3  mq450:w-[300px] leading-normal text-neutral-100 font-Lato"
              htmlFor=""
            >
              Blog Heading*
            </label>
            <input
              id="heading"
              name="heading"
              value={blogData.blogHeading}
              readOnly
              className="bg-neutral-800 focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 text-neutral-400 w-full h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
            />
          </div>
          <div className="flex flex-col gap-0 p-5 py-2 ml-0">
            <label
              className="py-3 leading-normal text-neutral-100 font-Lato"
              htmlFor=""
            >
              Tags:
            </label>
            <div className="w-full  h-[38px] rounded-md bg-neutral-800 text-neutral-400 ">
              {blogData.tags ? (
                <>
                  <ul id="tags">
                    {blogData.tags.map((tag: any, index: any) => (
                      <li key={index} className="tag">
                        <span className="tag-title text-neutral-400">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="p-1">No tags selected</p>
              )}
            </div>
            {/* <TagsInput selectedTags={handleSelectedTags} tags={blogData.tags} /> */}
          </div>
          <div className="p-4">
            <p className="p-2 text-base font-bold leading-normal text-neutral-100 font-Lato">
              Thumbnail Image:
            </p>
            <div className="flex items-center justify-center w-full">
              {blogData.thumbnail ? (
                <Image
                  src={blogData.thumbnail}
                  alt="Blog Thumbnail"
                  width={700}
                  height={400}
                  layout="fixed"
                  objectFit="contain"
                />
              ) : (
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="p-4 my-5 text-white border-gray-200 rounded-lg ">
            <div id="" className="p-4 text-white rounded-lg bg-neutral-800">
              {blogData.content && (
                <EditorBlock
                  data={{
                    blocks: blogData.content,
                  }}
                  onChange={setData}
                  readOnly={true}
                  holder="editorjs-container"
                  onWordCountChange={() => {}}
                />
              )}
            </div>
          </div>
          {/* <Link href="/user_blogs/all_blogs"> */}

          <button
            onClick={sendForReview}
            style={{ marginTop: "15px" }}
            type="submit"
            className="w-[141px]  mq450:ml-[195px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]  mq1240:ml-[690px] hover:bg-gradient-to-l from-pink-600 to-orange-500 ml-[940px] m-2 text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
          >
            Send For Review
          </button>
          {/* </Link> */}
          {popup && <PopUp />}
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
    width: calc(100vw - 32px);
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
