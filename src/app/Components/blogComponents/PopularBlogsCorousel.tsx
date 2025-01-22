"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogCardPic from "../../../../public/blogCardPic.png";
import AuthorPic from "../../../../public/blogAuthorPic.png";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import LikeButtonForBlog from "../LikeButtonForBlog";
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
  authorPic: string;
  blogHeading: string;
  isLiked: boolean;
};

const PopularBlogsCorousel = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);

  const genToken = Cookies.get("genToken");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });
  useEffect(() => {
    if (emblaApi) {
      //console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  async function fetchPopularBlogs() {
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/popular`,
      {
        headers: {
          Authorization: `Bearer ${genToken}`,
        },
      },
    );
    const popularData = await res.json();
    //console.log("popularBlogs :", popularData.data);
    if (popularData.success) {
      setPopularBlogs(popularData.data);
    } else {
      //console.log("something went wrong in fetching popular blogs");
    }
  }

  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const formatReadTime = (readTime: string): string => {
    return readTime.replace(/(\d+)(min)/, "$1 $2");
  };

  return (
    <>
      <div className="block embla md:hidden mb-7" ref={emblaRef}>
        <div className="embla__container">
          {popularBlogs.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative mt-6"
            >
              <Link
                href={`/blogs/${item._id}`}
                className="embla__slide card-for-corousel-on-mobile ml-2 flex flex-wrap justify-center items-center h-auto gap-2 pb-[64px] cursor-pointer"
              >
                <div className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto">
                  <div className="relative">
                    <Image
                      src={item.thumbnail ? item.thumbnail : BlogCardPic}
                      alt="man/woman performing exercise"
                      layout="fixed"
                      width={304}
                      height={288}
                      className="rounded-[12px] black-and-white "
                    />
                    <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                      <span> Most Popular</span>
                    </span>
                  </div>

                  <div className="w-[304px] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center gap-2">
                        <Image
                          src={item.authorPic ? item.authorPic : AuthorPic}
                          className="w-8 h-8 rounded-full"
                          width={32}
                          height={32}
                          alt="author of blog"
                        />
                        <span className="text-[16px] text-[#F5F5F5] font-normal leading-normal">
                          Author: {item.author}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10.7582 7.97526C10.7582 7.6483 10.6325 7.34606 10.4135 7.14618L7.21864 4.22688C6.95152 3.98235 6.60682 3.93015 6.29715 4.09088C5.96059 4.2626 5.75164 4.63902 5.75164 5.07107V5.90702C3.65593 6.10073 2 8.2246 2 10.8073V11.7202C2 12.1461 2.24961 12.5033 2.60744 12.5877C2.66062 12.5994 2.71254 12.6056 2.76384 12.6056C3.05036 12.6056 3.3106 12.4181 3.43947 12.1035C3.89553 10.9928 4.76321 10.2626 5.75164 10.1349V10.8801C5.75164 11.3122 5.96059 11.6879 6.29715 11.861C6.60682 12.0204 6.95089 11.9695 7.21802 11.7257L10.4135 8.80571C10.6325 8.60514 10.7582 8.30222 10.7582 7.97526Z"
                            fill="#F5F5F5"
                          />
                          <path
                            d="M13.5771 6.90783L10.1257 3.50839C9.86737 3.25356 9.47326 3.27828 9.24179 3.5606C9.01095 3.84291 9.03284 4.27771 9.28996 4.53049L12.7419 7.97457L9.23178 11.4695C8.97591 11.7243 8.95652 12.1591 9.18861 12.4401C9.31185 12.5898 9.48201 12.6654 9.65217 12.6654C9.80169 12.6654 9.95245 12.6063 10.0719 12.4875L13.5821 8.99255C13.8486 8.72741 14.0006 8.34755 14 7.94916C13.9987 7.55145 13.8449 7.17159 13.5771 6.90783Z"
                            fill="#F5F5F5"
                          />
                        </svg>
                        <span className="text-[12px] text-[#F5F5F5] font-bold leading-normal">
                          {item.share}
                        </span>
                      </div>
                    </div>
                    <div className="text-[12px] text-[#737373] font-normal leading-normal">
                      {formatDate(item.updatedAt)} | Read time:{" "}
                      {`${formatReadTime(item.readTime)}utes`} |
                    </div>
                    <h2 className="text-[16px] text-[#FFF] font-bold leading-normal">
                      {item.title}
                    </h2>
                    <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                      {item.blogHeading
                        ? item.blogHeading
                        : "blog heading is missing in this blog"}
                    </p>
                  </div>
                </div>
              </Link>
              <LikeButtonForBlog
                blogId={item._id}
                initialLiked={item.isLiked}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularBlogsCorousel;
