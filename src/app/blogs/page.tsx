import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogsPageBannerPic from "../../../public/blogsPageBanner.jpg";
import BlogCardPic from "../../../public/blogCardPic.png";
import AuthorPic from "../../../public/blogAuthorPic.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import LikeButton from "../Components/LikeButton";
import LikeButtonForBlog from "../Components/LikeButtonForBlog";
// import useEmblaCarousel from "embla-carousel-react";
import PopularBlogsCorousel from "../Components/blogComponents/PopularBlogsCorousel";
import CardioBlogsCorousel from "../Components/blogComponents/CardioBlogsCorousel";
import HIITBlogsCorousel from "../Components/blogComponents/HIITBlogsCorousel";
import ZumbaBlogsCorousel from "../Components/blogComponents/ZumbaBlogsCorousel";
import BlogSearchBox from "../Components/blogComponents/blogSearchBox";
import CreateBlogBtn from "../Components/blogComponents/CreateBlogBtn";
import { Tweet } from "react-tweet";
import DesktopFilterForBlog from "../Components/blogComponents/DesktopFilterForBlog";
import Logo from "../../../public/logo.png";
import MobileFilterForBlogs from "../Components/blogComponents/MobileFilterForBlogs";
import { cookies } from "next/headers";
import { InstagramPostSkeleton } from "../Components/skeletons/BlogSkeleton";
import MidHeadingAnimation from "../Components/midHeadingAnimation";
import InstagramPosts from "../Components/blogComponents/InstagramPosts";
import AdComponent from "../Components/AdComponent/AdComponent";

interface Blog {
  report: boolean;
  _id: string;
  title: string;
  thumbnail: string;
  category: string;
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
}

const Blogs = async () => {
  const filterCategories = [
    "YOGA",
    "MEDITATION",
    "LIFESTYLE",
    "HEALTHY RECIPES",
    "GENERAL HEALTH",
    "WARMUP",
    "FITNESS JOURNEY",
    "MEN'S HEALTH",
    "DANCE FITNESS",
    "WOMEN'S HEALTH",
    "REHAB & RECOVERY",
    "WORKOUT",
    "STRETCHING",
    "CARDIOVASCULAR HEALTH",
    "FITNESS MOTIVATION",
    "FITNESS TIPS & TRICKS",
  ];

  const cookieStore = cookies();
  const genToken = cookieStore.get("genToken")?.value;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  async function fetchBlogs() {
    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/blog/fetch-all`,
        {
          headers: {
            Authorization: `Bearer ${genToken}`, // Ensure genToken is available in the scope
          },
        },
      );
      if (!res.ok) {
        return null;
      }
      return await res.json();
    } catch (error) {
      //console.error("Error fetching blogs:", error);
      return null;
    }
  }
  // //console.log("blogData :", blogs);

  // async function fetchInstagramPosts() {
  //   try {
  //     const res = await fetch(
  //       `${apiEndpoint}/api/fitnearn/web/users/instagram`,
  //     );
  //     if (!res.ok) {
  //       //console.log("Failed to fetch Instagram posts");
  //       return null; // Return null or handle it appropriately
  //     }
  //     return res.json();
  //   } catch (error) {
  //     //console.log("Error fetching Instagram posts:", error);
  //     return null; // Return null or handle it appropriately
  //   }
  // }

  // const instaData = await fetchInstagramPosts();
  // console.log("instaData",instaData);
  // const posts = instaData?.data;
  // console.log("posts",posts);

  const getBlogsByCategory = (blogs: Blog[], category: string): Blog[] => {
    return blogs.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase(),
    );
  };
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  async function fetchLatestBlogs() {
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/latest`,
      {
        headers: {
          Authorization: `Bearer ${genToken}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  try {
    const data = await fetchBlogs();
    const blogs = data.blogs;
    // console.log("allBlogs",blogs);

    const latestData = await fetchLatestBlogs();
    const latestBlogs = latestData.data;
    //console.log("latestBlogs :", latestBlogs);

    const yogaBlogs = getBlogsByCategory(blogs, "yoga").slice(0, 2);
    // //console.log("yogaBlogs",yogaBlogs);

    const cardioBlogs = getBlogsByCategory(blogs, "Cardio").slice(0, 2);
    //console.log("cardioBlogs", cardioBlogs);
    // //console.log("cardioBlogs is liked",cardioBlogs.isLiked);

    const LifestyleBlogs = getBlogsByCategory(blogs, "Lifestyle").slice(0, 2);
    // //console.log("LifestyleBlogs",LifestyleBlogs);

    const meditationBlogs = getBlogsByCategory(blogs, "Meditation").slice(0, 2);
    // //console.log("meditationBlogs",meditationBlogs);

    return (
      <div className="pt-[72px] md:pt-[72px]">
        {/* this is for mobile only it contains search, filter, corousel and create blog btn */}
        <MobileFilterForBlogs />

        {/* this is corousel,filter and create blog btn code for desktop */}
        <DesktopFilterForBlog />

        <MidHeadingAnimation
          head4=" BLOGS"
          head1="Blog Categories"
          head2="Blog Categories"
        />

        <div className="container mx-auto px-1 md:px-[40px] xl:px-[80px] py-5 md:py-[50px]">
          <div className="grid grid-cols-1 gap-0 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
            <section className="col-span-2 blog-side-line">
              <div>
                <div className="flex items-center justify-between w-full">
                  <h2 className="ml-6 text-[24px] md:text-[32px] font-bold text-white md:ml-0">
                    Cardio
                  </h2>
                  <Link
                    href={"/blogCategory/Cardio"}
                    className="flex justify-center items-center gap-1 pr-4  md:pr-[80px]"
                  >
                    <span className="text-[16px] md:text-[18px] text-[#A3A3A3] font-semibold leading-normal">
                      View All
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20px] md:w-[33px] h-[20px] md:h-[32px]"
                      width="24"
                      height="24"
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <path
                        d="M12.4418 9.88L18.5512 16L12.4473 22.12L14.3281 24L22.3245 16L14.321 8L12.4418 9.88Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="hidden grid-cols-1 py-6 md:grid place-content-center md:place-content-start place-items-center md:place-items-start md:grid-cols-2">
                  {cardioBlogs.map((blog: any) => (
                    <div
                      key={blog._id}
                      className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative"
                    >
                      <Link href={`/blogs/${blog._id}`}>
                        <article className=" w-[304px] h-auto rounded-lg">
                          <div className="relative">
                            <Image
                              src={blog.thumbnail}
                              alt="man/woman performing exercise"
                              layout="fixed"
                              width={304}
                              height={288}
                              className="rounded-[12px] object-cover w-[304px] h-[288px]"
                            />
                            <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                              <span>{blog.category}</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center justify-center gap-2">
                              <Image
                                src={
                                  blog.profileImage
                                    ? blog.profileImage
                                    : AuthorPic
                                }
                                className="rounded-full"
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
                          <div className="text-[12px] text-[#A3A3A3] font-normal leading-normal mt-2">
                            {formatDate(blog.updatedAt)} | Read time:{" "}
                            {blog.readTime} |
                          </div>
                          <h2 className="text-[16px] text-[#FFF] font-bold leading-normal my-2">
                            {blog.title}
                          </h2>
                          <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                            {blog.blogHeading ||
                              "Amet consectetur. Ut vel viverra auctor et nisi amet consectetur. Utvel viverra auctor et nisi amet."}
                          </p>
                        </article>
                      </Link>
                      <LikeButtonForBlog
                        blogId={blog._id}
                        initialLiked={blog.isLiked}
                      />
                    </div>
                  ))}
                </div>

                <CardioBlogsCorousel />
              </div>

              {/* YOGA blogs */}
              <div>
                <div className="flex items-center justify-between w-full">
                  <h2 className="ml-6 text-[24px] md:text-[32px] font-bold text-white md:ml-0">
                    Yoga
                  </h2>
                  <Link
                    href={"/blogCategory/Yoga"}
                    className="flex justify-center items-center gap-1 pr-4  md:pr-[80px]"
                  >
                    <span className="text-[16px] md:text-[18px] text-[#A3A3A3] font-semibold leading-normal">
                      View All
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20px] md:w-[33px] h-[20px] md:h-[32px]"
                      width="24"
                      height="24"
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <path
                        d="M12.4418 9.88L18.5512 16L12.4473 22.12L14.3281 24L22.3245 16L14.321 8L12.4418 9.88Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="hidden grid-cols-1 py-6 md:grid place-content-center md:place-content-start place-items-center md:place-items-start md:grid-cols-2">
                  {yogaBlogs.map((blog: any) => (
                    <div
                      key={blog._id}
                      className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative"
                    >
                      <Link href={`/blogs/${blog._id}`}>
                        <article className=" w-[304px] h-auto rounded-lg">
                          <div className="relative">
                            <Image
                              src={blog.thumbnail}
                              alt="man/woman performing exercise"
                              layout="fixed"
                              width={304}
                              height={288}
                              className="rounded-[12px] object-cover w-[304px] h-[288px]"
                            />
                            <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                              <span>{blog.category}</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
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
                          <div className="text-[12px] text-[#A3A3A3] font-normal leading-normal mt-2">
                            {formatDate(blog.updatedAt)} | Read time:{" "}
                            {blog.readTime} |
                          </div>
                          <h2 className="text-[16px] text-[#FFF] font-bold leading-normal my-2">
                            {blog.title}
                          </h2>
                          <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                            {blog.blogHeading ||
                              "Amet consectetur. Ut vel viverra auctor et nisi amet consectetur. Utvel viverra auctor et nisi amet."}
                          </p>
                        </article>
                      </Link>
                      <LikeButtonForBlog
                        blogId={blog._id}
                        initialLiked={blog.isLiked}
                      />
                    </div>
                  ))}
                </div>

                <HIITBlogsCorousel />
              </div>

              {/* Zumba Blogs */}
              <div>
                <div className="flex items-center justify-between w-full">
                  <h2 className="ml-6 text-[24px] md:text-[32px] font-bold text-white md:ml-0">
                    LifeStyle
                  </h2>
                  <Link
                    href={"/blogCategory/Lifestyle"}
                    className="flex justify-center items-center gap-1 pr-4  md:pr-[80px]"
                  >
                    <span className="text-[16px] md:text-[18px] text-[#A3A3A3] font-semibold leading-normal">
                      View All
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20px] md:w-[33px] h-[20px] md:h-[32px]"
                      width="24"
                      height="24"
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <path
                        d="M12.4418 9.88L18.5512 16L12.4473 22.12L14.3281 24L22.3245 16L14.321 8L12.4418 9.88Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="hidden grid-cols-1 py-6 md:grid place-content-center md:place-content-start place-items-center md:place-items-start md:grid-cols-2">
                  {LifestyleBlogs.map((blog: any) => (
                    <div
                      key={blog._id}
                      className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative"
                    >
                      <Link href={`/blogs/${blog._id}`}>
                        <article className=" w-[304px] h-auto rounded-lg">
                          <div className="relative">
                            <Image
                              src={blog.thumbnail}
                              alt="man/woman performing exercise"
                              layout="fixed"
                              width={304}
                              height={288}
                              className="rounded-[12px] object-cover w-[304px] h-[288px]"
                            />
                            <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                              <span>{blog.category}</span>
                            </span>
                            <LikeButtonForBlog
                              blogId={blog._id}
                              initialLiked={false}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
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
                          <div className="text-[12px] text-[#A3A3A3] font-normal leading-normal mt-2">
                            {formatDate(blog.updatedAt)} | Read time:{" "}
                            {blog.readTime} |
                          </div>
                          <h2 className="text-[16px] text-[#FFF] font-bold leading-normal my-2">
                            {blog.title}
                          </h2>
                          <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                            {blog.blogHeading ||
                              "Amet consectetur. Ut vel viverra auctor et nisi amet consectetur. Utvel viverra auctor et nisi amet."}
                          </p>
                        </article>
                      </Link>
                      <LikeButtonForBlog
                        blogId={blog._id}
                        initialLiked={blog.isLiked}
                      />
                    </div>
                  ))}
                </div>

                <ZumbaBlogsCorousel />
              </div>

              {/* Meditation Blogs */}
              <div>
                <div className="items-center justify-between hidden w-full md:flex">
                  <h2 className="ml-6 text-[24px] md:text-[32px] font-bold text-white md:ml-0 ">
                    Meditation
                  </h2>
                  <Link
                    href={"/blogCategory/Meditation"}
                    className="flex justify-center items-center gap-1 pr-4  md:pr-[80px]"
                  >
                    <span className="text-[16px] md:text-[18px] text-[#A3A3A3] font-semibold leading-normal">
                      View All
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20px] md:w-[33px] h-[20px] md:h-[32px]"
                      width="24"
                      height="24"
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <path
                        d="M12.4418 9.88L18.5512 16L12.4473 22.12L14.3281 24L22.3245 16L14.321 8L12.4418 9.88Z"
                        fill="#A3A3A3"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="hidden grid-cols-1 py-6 md:grid place-content-center md:place-content-start place-items-center md:place-items-start md:grid-cols-2">
                  {meditationBlogs.map((blog: any) => (
                    <div
                      key={blog._id}
                      className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative"
                    >
                      <Link href={`/blogs/${blog._id}`}>
                        <article className=" w-[304px] h-auto rounded-lg">
                          <div className="relative">
                            <Image
                              src={blog.thumbnail}
                              alt="man/woman performing exercise"
                              layout="fixed"
                              width={304}
                              height={288}
                              className="rounded-[12px] object-cover w-[304px] h-[288px]"
                            />
                            <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                              <span>{blog.category}</span>
                            </span>
                            <LikeButtonForBlog
                              blogId={blog._id}
                              initialLiked={false}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
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
                          <div className="text-[12px] text-[#A3A3A3] font-normal leading-normal mt-2">
                            {formatDate(blog.updatedAt)} | Read time:{" "}
                            {blog.readTime} |
                          </div>
                          <h2 className="text-[16px] text-[#FFF] font-bold leading-normal my-2">
                            {blog.title}
                          </h2>
                          <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                            {blog.blogHeading ||
                              "Amet consectetur. Ut vel viverra auctor et nisi amet consectetur. Utvel viverra auctor et nisi amet."}
                          </p>
                        </article>
                      </Link>
                      <LikeButtonForBlog
                        blogId={blog._id}
                        initialLiked={blog.isLiked}
                      />
                    </div>
                  ))}
                </div>

                {/* <ZumbaBlogsCorousel /> */}
              </div>
            </section>

            <section className="flex flex-col items-center justify-start">
              <h2 className=" text-[20px] md:text-[28px] text-start w-full font-extrabold md:font-semibold text-white ml-5 md:ml-0">
                Our X Posts
              </h2>
              <div
                data-theme="dark"
                className="w-full md:w-[320px] xl:w-[402px]"
              >
                <Tweet id="1832345557266002121" />
              </div>

              <AdComponent/>

              <h2 className="text-[20px] md:text-[28px] text-start w-full font-extrabold md:font-semibold text-[#F5F5F5] leading-normal mb-4 mt-4 md:mt-8 md:mb-6 ml-5 md:ml-0">
                Our Instagram Posts
              </h2>

              <InstagramPosts />

            </section>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-6">
        <h1 className="text-[40px] text-white">Blogs Not Available</h1>
        <p className="text-[24px] text-white">
          Sorry, we are unable to load the Blogs at the moment. Please try again
          later.
        </p>
      </div>
    );
  }
};

export default Blogs;
