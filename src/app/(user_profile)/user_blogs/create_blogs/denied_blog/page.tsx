"use client";
import Navbar from "@/app/Components/Navbar";
import UserNavbar from "@/app/Components/UserNavbar";
import UserProfileInput from "@/app/Components/UserProfileInput";
import Image from "next/image";
import React, { useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
const EditorBlock = dynamic(() => import("@/app/Components/Editor"), {
  ssr: false,
});
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Page = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const [data, setData] = useState<OutputData>();
  const [data1, setData1] = useState<OutputData>();
  const [value, setValue] = useState("");
  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        <div className="absolute text-white mq450:ml-2 top-40 left-56 mq450:left-0 mq450:mt-5 w-fit">
          <div className="flex ">
            <p className="text-2xl font-bold text-neutral-300">Write Blog</p>
            <button className="w-[111px]  mq1240:ml-[640px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[50px] ml-[720px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex">
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
              <label
                className="py-3 text-base font-bold leading-normal text-neutral-300 font-Lato"
                htmlFor=""
              >
                Blog Title*
              </label>
              <input
                value="Cardio Workouts"
                className="bg-neutral-800  mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="py-3 text-base font-bold leading-normal text-neutral-300 font-Lato"
                htmlFor=""
              >
                Category*
              </label>
              <input
                value="Cardio"
                className="bg-neutral-800  mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="py-3 text-base font-bold leading-normal text-neutral-300 font-Lato"
                htmlFor=""
              >
                Read Time*
              </label>
              <input
                value="10 min"
                className="bg-neutral-800  mq1240:w-64 text-neutral-400 w-80 h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
              />
            </div>
          </div>
          <div className="flex flex-col  mq450:p-[-50px] px-5 py-4">
            <label
              className="py-3 text-base font-bold leading-normal text-neutral-300 font-Lato"
              htmlFor=""
            >
              Blog Heading*
            </label>
            <input
              id="heading"
              name="heading"
              placeholder="Heading"
              // value={formData.title}
              className="bg-neutral-800  text-neutral-400 w-full h-[42px] p-3  rounded-lg border border-neutral-800 flex-col justify-start items-start gap-2.5 inline-flex"
            />
          </div>
          <div className="p-4">
            <p className="p-2">Thumbnail Image:</p>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="my-5 text-white border-gray-200 rounded-lg">
            <div
              id="hehe"
              className="p-4 text-white rounded-lg bg-neutral-800 h-96"
            >
              <EditorBlock
                data={data}
                onChange={setData}
                holder="editorjs-container"
                onWordCountChange={() => {}}
              />
            </div>
          </div>
          <div style={{ marginTop: "40px" }} className="mt-4">
            <UserProfileInput
              label="Denied Reason"
              placeholder=" didnt like hehe"
            />
          </div>
          <div className="my-5 text-white border-gray-200 rounded-lg">
            <div
              id=""
              className="h-40 p-4 text-white rounded-lg bg-neutral-800"
            >
              <EditorBlock
                data={data1}
                onChange={setData1}
                holder="editorjs-container-1"
                onWordCountChange={() => {}}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[141px] mt-10 mq1240:ml-[740px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[50px] ml-[850px] m-2 text-sm text-nowrap h-[38px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
          >
            Send For Review
          </button>
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
