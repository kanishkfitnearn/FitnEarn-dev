"use client";
import UserNavbar from "@/app/Components/UserNavbar";
import React, { useState, useEffect } from "react";
import { OutputData } from "@editorjs/editorjs";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const EditorBlock = dynamic(() => import("@/app/Components/Editor"), {
  ssr: false,
});

const Page: React.FC = ({ params }: any) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [blogId, setBlogId] = useState<any>(null);
  const [wordCount, setWordCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    readTime: "",
    blogHeading: "",
    thumbnail: "",
    content: null,
  });

  const router = useRouter();
  const [data, setData] = useState<OutputData>();
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  useEffect(() => {
    const totalWordCount = wordCount + imageCount * 250;
    if (wordCount >= 620 && imageCount <= 2 && wordCount <= 2000) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [wordCount, imageCount]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const storedBlogId = params.id;
      setBlogId(params.id);
      if (!storedBlogId) {
        //console.error("Blog ID not found in cookies");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/blog/${params.id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setBlogData({
          title: result.data.blog.title,
          category: result.data.blog.category,
          readTime: result.data.blog.readTime,
          blogHeading: result.data.blog.blogHeading,
          thumbnail: result.data.blog.thumbnail,
          content: result.data.blog.content,
        });
        setData(result.data.blog.content);
        //console.log(result);
      } catch (error) {
        //console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const updateBlogContent = async () => {
    if (!blogId) {
      //console.error("Blog ID not found");
      return;
    }

    const apiUrl = `${apiEndpoint}/api/fitnearn/web/users/blog/update-blog`;

    const bodyData = {
      blogId: blogId,
      content: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("id_token")}`,
          "x-username": Cookies.get("username") || "",
          "x-refresh-token": Cookies.get("refresh_token") || "",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      //console.log("Blog updated successfully:", result);
      router.push("/user_blogs/create_blogs/preview_blog");
    } catch (error) {
      //console.error("Error updating blog:", error);
      // You can add an error message here
    }
  };
  const handleEditorChange = (newData: OutputData) => {
    setData(newData);

    // Calculate word count
    const textBlocks = newData.blocks.filter(
      (block) => block.type === "paragraph" || block.type === "header",
    );
    const text = textBlocks.map((block) => block.data.text).join(" ");
    const words = text.trim().split(/\s+/);
    const newWordCount = words.length;

    // Count images
    const newImageCount = newData.blocks.filter(
      (block) => block.type === "image",
    ).length;

    setWordCount(newWordCount);
    setImageCount(newImageCount);
  };
  const onSave = async () => {
    const blogId = Cookies.get("blog_id");
    if (!blogId) {
      //console.error("Blog ID not found in cookies");
      return;
    }

    const apiUrl = `${apiEndpoint}/api/fitnearn/web/users/blog/update-blog`;

    const bodyData = {
      blogId: blogId,
      content: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status == 500) {
        toast({
          title: "Please add Blog content!",
          description: "",
          duration: 3000, // 5 seconds
        });
      }

      const result = await response.json();
      //console.log("Blog updated successfully:", result);
      router.push("/user_blogs/all_blogs");
      // You can add a success message or redirect here
    } catch (error) {
      toast({
        title: "Please add content to blog!",
        description: "",
        duration: 3000, // 5 seconds
      });
      //console.error("Error updating blog:", error);

      // You can add an error message here
    }
  };

  //console.log(blogData.content);
  const totalWordCount = wordCount + imageCount * 250;
  return (
    <>
      <div className="relative mq450:static pt-[827px]">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        <div className="absolute text-white mq450:ml-2 mq450:top-40 top-28 left-72 mq450:left-0 mq450:mt-5 w-fit">
          <div className="flex mq450:ml-6">
            <p className="text-2xl font-bold text-neutral-300">Write Blog</p>

            <button
              onClick={onSave}
              className="w-[111px] mq450:ml-[80px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] mq1240:ml-[400px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[50px] ml-[720px] text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
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

          <div className="my-5 mq450:w-[320px] text-white border-gray-200 rounded-lg mq450:ml-4 w-[950px]">
            <div
              id=""
              className="p-4 text-white rounded-lg bg-neutral-800 mq450:ml-4"
            >
              {isLoading ? (
                <p className="text-center text-neutral-400">Loading...</p>
              ) : blogData?.content ? (
                <EditorBlock
                  data={{
                    blocks: blogData.content,
                  }}
                  onChange={handleEditorChange}
                  holder="editorjs-container"
                  onWordCountChange={() => {}}
                />
              ) : (
                <EditorBlock
                  data={data}
                  onChange={handleEditorChange}
                  holder="editorjs-container"
                  onWordCountChange={() => {}}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between mq450:ml-5 mq450:flex-col mq450:gap-3 text-neutral-500">
            <span className="flex gap-2 mq450:w-[300px]">
              <span className="p-1 px-2 text-white rounded-sm bg-neutral-800">
                Min. 620 words <span className="text-red-400">*</span>
              </span>
              <span className="flex p-1 px-2 text-white rounded-sm bg-neutral-800">
                Max. 2000 words & 2 images
                <span className="text-red-400">*</span>{" "}
              </span>
            </span>
            <span className="p-0 px-2 mq450:py-1 items-center mr-3 text-center flex justify-center align-middle text-white rounded-sm bg-[linear-gradient(359deg,rgba(251,146,60,0.12)_0.97%,rgba(244,63,94,0.12)_99.03%)]">
              Word Count: {wordCount}, Images: {imageCount}
            </span>
          </div>
          {showButtons ? (
            <button
              onClick={updateBlogContent}
              style={{ marginTop: "16px" }}
              type="submit"
              className="w-[111px] mq450:ml-[220px] hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] mq1240:ml-[400px] hover:bg-gradient-to-l from-pink-600 to-orange-500 ml-[850px] m-2 text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
            >
              Next
            </button>
          ) : (
            <button
              style={{ marginTop: "40px" }}
              type="submit"
              disabled={true}
              className="w-[111px] mq450:ml-[220px] mq1240:ml-[400px] 
              bg-neutral-700 text-neutral-400 cursor-not-allowed
              ml-[850px] m-2 text-nowrap h-[33px] px-3 py-1.5 rounded-lg 
              border border-gray-500 justify-center items-center gap-2 inline-flex
              opacity-50 "
            >
              Next
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
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
