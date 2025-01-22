"use client"
import React, { useEffect, useState } from "react";
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
import Cookies from "js-cookie";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    time: "3 mins read",
    category: "Cardio",
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 2,
    time: "3 mins read",
    category: "Cardio",
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 3,
    time: "3 mins read",
    category: "Cardio",
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
];

type Blog = {
  _id: string;
  category: string;
  thumbnail: string;
  author: string;
  share: number;
  updatedAt: string;
  createdAt: string;
  readTime: string;
  title: string;
};

// import React, { useEffect, useState } from "react";
// import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
// import Cookies from "js-cookie";
// import Link from "next/link";

const LatestBlogsAside = () => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [selectedBlog, setSelectedBlog] = useState<string>("");
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const genToken = Cookies.get("genToken");

  useEffect(() => {
    async function fetchLatestBlogs() {
      const res = await fetch(`${apiEndpoint}/api/fitnearn/web/user/blog/latest`, {
        headers: { Authorization: `Bearer ${genToken}` },
      });
      const latestData = await res.json();
      setLatestBlogs(latestData.blogs);
    }

    fetchLatestBlogs();
  }, []);

  const formatTimeAgo = (updatedAt: string) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffInSeconds = differenceInSeconds(now, updatedDate);
    const diffInMinutes = differenceInMinutes(now, updatedDate);
    const diffInHours = differenceInHours(now, updatedDate);
    const diffInDays = differenceInDays(now, updatedDate);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hr ${diffInMinutes % 60} min ago`;
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const formatReadTime = (readTime: string): string => readTime.replace(/(\d+)(min)/, "$1 $2");

  return (
    <div className=" rounded-md">
      <h3 className="text-[18px] md:text-[28px] text-[#F5F5F5] font-semibold mb-4">
          {/* className="text-[20px] sm:text-[24px] md:text-[28px] text-[#F5F5F5] font-semibold leading-normal mt-8 md:mt-6 mb-4" */}
        Latest Blogs
      </h3>
      <div className="grid grid-cols-[auto_1fr] gap-x-4">
        {/* Dots and connecting lines */}
        <div className="flex flex-col items-center">
          {latestBlogs.slice(0, 3).map((blog, index) => (
            <React.Fragment key={blog._id}>
              <div
                onClick={() => setSelectedBlog(blog._id)}
                className={`w-4 h-4 md:w-6 md:h-6 rounded-full cursor-pointer ${
                  selectedBlog === blog._id || (index === 0 && selectedBlog === "")
                    ? "seperator-gradient"
                    : "bg-[#171717] border border-[#A3A3A3]"
                }`}
              />
              {index < 2 && (
                <div className="h-[80px] border-l-[1px] border-[#A3A3A3] md:h-[100px]"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Blog details */}
        <div className="flex flex-col gap-y-4">
          {latestBlogs.slice(0, 3).map((blog, index) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id} className="block">
              <h4 className="text-[14px] md:text-[16px] lg:text-[18px] text-[#A3A3A3]">
                {formatTimeAgo(blog.createdAt)}
              </h4>
              <h2 className="text-[16px] md:text-[18px] lg:text-[20px] text-[#E5E5E5] font-medium my-1">
                {blog.title}
              </h2>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#A3A3A3]">
                {`${formatReadTime(blog.readTime)} read`} | {blog.category}
              </p>
              {index < 2 && <div className="bg-[#A3A3A3] h-[1px] mt-3"></div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogsAside;

