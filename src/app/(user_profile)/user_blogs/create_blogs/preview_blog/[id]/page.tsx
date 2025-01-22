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
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const EditorBlock = dynamic(() => import("@/app/Components/Editor"), {
  ssr: false,
});
const Page = ({ params }: any) => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const router = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    readTime: "",
    blogHeading: "",
    thumbnail: "",
    content: null,
    tags: [] as string[],
  });

  // Utility function to count words in a text string
  const countWords = (text: any) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word: string | any[]): any => word.length > 0).length;
  };

  // Main validation function
  const isContentValid = (content: any) => {
    if (!content || !Array.isArray(content)) {
      return {
        isValid: false,
        wordCount: 0,
        imageCount: 0,
        errors: ["Invalid content format"],
      };
    }

    let totalWords = 0;
    let imageCount = 0;

    // Count words and images
    content.forEach((block) => {
      if (block.type === "paragraph" && block.data?.text) {
        totalWords += countWords(block.data.text);
      } else if (block.type === "image" && block.data?.file?.url) {
        imageCount += 1;
      }
    });

    // Check if requirements are met
    const isValid = totalWords >= 620 && imageCount >= 1;

    // Generate error messages if any
    const errors = [];
    if (totalWords < 620) {
      errors.push(
        `Need ${620 - totalWords} more words (current: ${totalWords})`,
      );
    }
    if (imageCount < 1) {
      errors.push(`Need at least 1 image (current: ${imageCount})`);
    }

    return {
      isValid,
      wordCount: totalWords,
      imageCount,
      errors,
    };
  };
  const [data, setData] = useState<OutputData>();
  const { toast } = useToast();
  const handleReadTimeChange = (value: string) => {
    setBlogData((prevData) => ({
      ...prevData,
      readTime: value,
    }));
  };
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/blog/${params.id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        let parsedTags: string[] = [];
        if (result.data.blog.tags && result.data.blog.tags.length > 0) {
          try {
            parsedTags = JSON.parse(result.data.blog.tags[0]);
          } catch (e) {
            //console.error("Error parsing tags:", e);
          }
        }
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
      } catch (error) {
        //console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  const sendForReview = async (e: any) => {
    e.preventDefault();
    // Validate content before sending
    const validation = isContentValid(blogData.content);

    if (!validation.isValid) {
      toast({
        title: "Please add content to blog!",
        description: validation.errors.join(". "),
        duration: 5000,
      });
      return;
    }

    const blog_id = params.id;
    //console.log("blogid", blog_id);
    try {
      const response = await axios.patch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/save-blog/${blog_id}`,
      );

      //console.log(response);
      if (response.data.success === true) {
        router.push("/user_blogs/all_blogs");
        toast({
          title: "Sent For Review!",
          description: "Your blog has sent for review.",
          duration: 5000, // 5 seconds
        });
      } else {
        //console.error("Error creating blog:", response.data.message);
      }
    } catch (error) {
      //console.error("Error creating blog:", error);
      toast({
        title: "Error creating blog!",
        description: "Please check the blog content.",
        duration: 5000, // 5 seconds
      });
    }
  };
  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        <div className="absolute text-white mq450:ml-2 mq450:top-40 top-28 left-56 mq450:left-0 mq450:mt-5 w-fit">
          <div className="flex ">
            <p className="text-2xl font-bold text-neutral-100">Write Blog</p>
            <Link
              href={`/user_blogs/create_blogs/blog_details/edit_details/${params.id}`}
            >
              <button className="w-[111px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]  mq1240:ml-[600px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[120px] ml-[840px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex">
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
                className="bg-neutral-800 mq450:w-auto text-neutral-400 w-80 h-[42px] p-3 mq1240:w-60  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0"
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
                className="bg-neutral-800 focus:outline-none focus:border-neutral-300 focus:outline-none focus:ring-0 mq450:w-auto  mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
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
              className="py-3 leading-normal text-neutral-100 font-Lato"
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
              {blogData.tags.length >= 1 ? (
                <>
                  {" "}
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
            <p className="p-2">Thumbnail Image:</p>
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

          <div className="p-4 my-5 text-white border-gray-200 rounded-lg">
            <div id="" className="p-4 text-white rounded-lg bg-neutral-800">
              {blogData.content && (
                <EditorBlock
                  readOnly={true}
                  data={{
                    blocks: blogData.content,
                  }}
                  onChange={setData}
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
            className="w-[141px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]  mq450:ml-[185px]  mq1240:ml-[690px] hover:bg-gradient-to-l from-pink-600 to-orange-500 ml-[940px] m-2 text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
          >
            Send For Review
          </button>
          {/* </Link> */}
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
