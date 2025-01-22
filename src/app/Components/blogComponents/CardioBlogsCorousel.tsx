"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogCardPic from "../../../../public/blogCardPic.png";
import AuthorPic from "../../../../public/blogAuthorPic.png";
import LikeButton from "../LikeButton";
import useEmblaCarousel from "embla-carousel-react";
import LikeButtonForBlog from "../LikeButtonForBlog";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Blog = {
  report: boolean;
  _id: string;
  title: string;
  thumbnail: string;
  category: string;
  profileImage: string;
  status: string;
  userId: string;
  author: string;
  readTime: string;
  editRequest: boolean;
  createdAt: string;
  updatedAt: string;
  __v: string;
  content: [];
  likes: number;
  share: number;
  blogHeading: string;
  authorPic: string;
  isLiked: boolean;
};

const CardioBlogsCorousel = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cardioBlogs, setCardioBlogs] = useState<Blog[]>([]);
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

  async function fetchBlogs() {
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/fetch-all`,
      {
        headers: {
          Authorization: `Bearer ${genToken}`,
        },
      },
    );
    const result = await res.json();
    //console.log("result blogs from cardio category blogs", result);
    if (result.success) {
      setBlogs(result.blogs);
    } else {
      //console.log("failed to fetch Blogs");
    }
  }

  const getBlogsByCategory = (blogs: Blog[], category: string) => {
    const cardioCategoryBlogs = blogs.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase(),
    );
    //console.log("cardioCategoryBlogs", cardioCategoryBlogs);
    setCardioBlogs(cardioCategoryBlogs);
    // return blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
  };

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

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    getBlogsByCategory(blogs, "Cardio");
  }, [blogs]);

  return (
    <>
      <section className="w-full flex md:hidden flex-wrap justify-center items-center gap-[50px] pt-6 md:pt-[50px] px-4 md:px-[67px]">
        <Carousel
          opts={{ align: "start" }}
          className="w-full flex justify-center items-center max-w-[1080px] bg-[#171717]"
        >
          <CarouselContent className="-ml-1 bg-[#171717]">
            {cardioBlogs.slice(0, 3).map((blog) => (
              <CarouselItem key={blog._id} className="w-full md:basis-auto">
                <div
                  key={blog._id}
                  className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative"
                >
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="flex flex-wrap justify-center items-center h-auto gap-2 pb-[64px] cursor-pointer"
                  >
                    <div className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto">
                      <div className="relative">
                        <Image
                          src={blog.thumbnail}
                          alt="man/woman performing exercise"
                          layout="fixed"
                          width={304}
                          height={288}
                          className="rounded-[12px] w-[304px] h-[288px] object-cover hover:filter-none black-and-white  transition-all duration-300 ease-in-out"
                        />
                        <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                          <span>{blog.category}</span>
                        </span>
                      </div>

                      <div className="w-[304px] flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center justify-center gap-2">
                            <Image
                              src={
                                blog.profileImage
                                  ? blog.profileImage
                                  : AuthorPic
                              }
                              className="w-8 h-8 rounded-full"
                              width={32}
                              height={32}
                              alt="author of blog"
                            />
                            <span className="text-[16px] text-[#F5F5F5] font-normal leading-normal">
                              Author: {blog.author}
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
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
                              {blog.share}
                            </span>
                          </div>
                        </div>
                        <div className="text-[12px] text-[#737373] font-normal leading-normal">
                          {formatDate(blog.updatedAt)}| Read time:{" "}
                          {blog.readTime} |
                        </div>
                        <h2 className="text-[16px] text-[#FFF] font-bold leading-normal">
                          {blog.title}
                        </h2>
                        <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                          {blog.blogHeading ||
                            "Amet consectetur. Ut vel viverra auctor et nisi amet consectetur. Utvel viverra auctor et nisi amet."}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <LikeButtonForBlog
                    blogId={blog._id}
                    initialLiked={blog.isLiked}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
};

export default CardioBlogsCorousel;
