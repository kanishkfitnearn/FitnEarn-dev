"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

type Blog = {
  _id: string;
  category: string;
  thumbnail: string;
  author: string;
  share: number;
  updatedAt: string;
  readTime: string;
  title: string;
  isLiked: boolean;
};

const TrendingBlogsAside = () => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const genToken = Cookies.get("genToken");

  async function fetchPopularBlogs() {
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/popular`,
      {
        headers: {
          Authorization: `Bearer ${genToken}`,
        },
      }
    );
    const popularData = await res.json();
    if (popularData.success) {
      setPopularBlogs(popularData.data);
    }
  }

  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  const formatReadTime = (readTime: string): string => {
    return readTime.replace(/(\d+)(min)/, "$1 $2");
  };

  return (
    <div>
      <h3 className="text-[20px] sm:text-[24px] md:text-[28px] text-[#F5F5F5] font-semibold leading-normal mt-8 md:mt-6 mb-4">
        Popular Blogs
      </h3>
      {popularBlogs &&
        popularBlogs.slice(0, 3).map((blog, index) => (
          <Link href={`/blogs/${blog._id}`} key={blog._id} className="flex gap-4">
            <div className="w-[50px] flex justify-center flex-col items-center text-[30px] sm:text-[40px] md:text-[66px] italic text-white font-normal mid-heading">
              {index + 1}
            </div>
            <div
              className={`border-b-[1px] ${
                index === 2 ? "border-[#171717]" : "border-[#A3A3A3]"
              }`}
            >
              <div className="p-[14px] cursor-pointer">
                <p className="text-[14px] sm:text-[16px] text-[#A3A3A3] font-normal leading-normal">
                  {formatReadTime(blog.readTime)} | {blog.category}
                </p>
                <h2 className="max-w-[260px] w-full text-[16px] sm:text-[18px] text-[#E5E5E5] font-medium leading-normal">
                  {blog.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default TrendingBlogsAside;