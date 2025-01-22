"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

// Import tools
import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import axios from "axios";

import Cookies from "js-cookie";

const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  paragraph: Paragraph,

  // link: {
  //   class: LinkTool,
  //   config: {
  //     uploader: {
  //       uploadByUrl: (url: any) => {
  //         return fetch(
  //           `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             if (data.contents) {
  //               const parser = new DOMParser();
  //               const doc = parser.parseFromString(data.contents, "text/html");
  //               const title = doc.querySelector("title")?.textContent || "";
  //               const description =
  //                 doc
  //                   .querySelector('meta[name="description"]')
  //                   ?.getAttribute("content") || "";

  //               return {
  //                 success: 1,
  //                 link: url,
  //                 meta: {
  //                   title,
  //                   description,
  //                 },
  //               };
  //             }
  //             throw new Error("Unable to fetch link data");
  //           });
  //       },
  //     },
  //   },
  // },

  // image: ImageTool,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          const user_id = Cookies.get("user_id");
          const id_token = Cookies.get("id_token");
          const blog_id = Cookies.get("blog_id");
          const refresh_token = Cookies.get("refresh_token");
          try {
            // Ensure user_id is a string
            if (!user_id) {
              throw new Error("User ID is undefined");
            }
            if (!blog_id) {
              throw new Error("blog_id is undefined");
            }
            if (!id_token) {
              throw new Error("ID token is undefined");
            }

            // your own uploading logic here
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", user_id);
            formData.append("blogId", blog_id);

            const response = await axios.post(
              `${apiEndpoint}/api/fitnearn/web/users/blog/upload-file`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${id_token}`,
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
              },
            );

            if (response.data.success === 1) {
              //console.log("refresh token", refresh_token);
              return response.data;
            } else {
              window.location.href = "/login";
              throw new Error("Upload failed");
            }
          } catch (error) {
            //console.error("Error uploading file:", error);
            // Redirect to login page
            window.location.href = "/login";
            // Throw an error to inform EditorJS that the upload failed
            throw new Error("Upload failed, redirecting to login");
          }
        },
        // async uploadByUrl(url: any) {
        //   const id_token = Cookies.get("id_token");
        //   try {
        //     const response = await axios.post(
        //       "${apiEndpoint}/api/fitnearn/web/users/blog/upload-url",
        //       {
        //         url,
        //       },
        //       {
        //         headers: {
        //           Authorization: `Bearer ${id_token}`,
        //         },
        //       },
        //     );

        //     if (response.data.success === 1) {
        //       return response.data;
        //     }
        //   } catch (error) {
        //     //console.error("Error uploading by URL:", error);
        //     // Handle the error appropriately
        //   }
        // },
      },
    },
  },
  // link: LinkTool,
  list: List,
};

type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
  readOnly?: boolean;
  onWordCountChange(count: number): void;
};
const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
const EditorBlock = ({
  data,
  onChange,
  onWordCountChange,
  holder,
  readOnly = false,
}: Props) => {
  const ref = useRef<EditorJS>();
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      //console.log("Initializing EditorJS with tools:", EDITOR_TOOLS);
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        readOnly: readOnly,
        onReady: () => {
          //console.log("EditorJS is ready to use!");
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          //console.log("Editor content changed:", data);
          onChange(data);
          updateWordCount(data);
          //console.log(data);
        },
      });
      ref.current = editor;
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  const updateWordCount = (data: OutputData) => {
    let count = 0;
    data.blocks.forEach((block) => {
      if (block.type === "paragraph" || block.type === "header") {
        count += block.data.text.trim().split(/\s+/).length;
      } else if (block.type === "list") {
        block.data.items.forEach((item: string) => {
          count += item.trim().split(/\s+/).length;
        });
      }
    });
    setWordCount(count);
    onWordCountChange(count);
  };

  return (
    <div
      id={holder}
      className={`max-w-full prose ${readOnly ? "read-only" : ""}`}
    />
  );
};

export default memo(EditorBlock);
