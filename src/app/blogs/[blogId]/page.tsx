import Image from "next/image";
import Link from "next/link";
import DetailBlogPageAuthor from "../../../../public/detailBlogPageAuthor.jpg";
import BlogImg from "../../../../public/blogImg.jpg";
import BlogCardPic from "../../../../public/blogCardPic.png";
import AuthorPic from "../../../../public/blogAuthorPic.png";
import LikeButtonForBlog from "@/app/Components/LikeButtonForBlog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CommentShareAndReport from "@/app/Components/blogComponents/CommentShareReport";
import LatestBlogsAside from "@/app/Components/blogComponents/LatestBlogAside";
import TrendingBlogsAside from "@/app/Components/blogComponents/TrendingBlogsAside";
import CommentShareAndReportMobile from "@/app/Components/blogComponents/CommentShareReportMobile";
import SimilarBlogsCorousel from "@/app/Components/blogComponents/SimilarBlogs";
import {
  TitleSkeleton,
  AuthorSkeleton,
  ContentSkeleton,
  TitleSkeletonForMobile,
} from "@/app/Components/skeletons/BlogSkeleton";
import { Tweet } from "react-tweet";
import EditorJsRenderer from "../../Components/blogComponents/EditorJsRenderer";
import { cookies } from "next/headers";
import Logo from "../../../../public/logo.png";
import { InstagramPostSkeleton } from "@/app/Components/skeletons/BlogSkeleton";
import AdComponent from "@/app/Components/AdComponent/AdComponent";

interface Blog {
  content: {
    blocks: any[];
  };
}

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

type BlogData = {
  _id: string;
  category: string;
  thumbnail: string;
  author: string;
  share: number;
  updatedAt: string;
  readTime: string;
  title: string;
  isLiked: boolean;
  heading: string;
};

// export default async function DetailBlogPage({ params }: any) {
const DetailBlogPage: React.FC<BlogPageProps> = async ({ params }) => {
  //console.log(params.blogId);
  const cookieStore = cookies();
  const genToken = cookieStore.get("genToken")?.value;
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  async function fetchBlogById() {
    if (params.blogId) {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/${params.blogId}`,
        {
          next: { revalidate: 0 }, // Ensures no caching
          headers: {
            "Cache-Control": "no-store",
            Authorization: `Bearer ${genToken}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } else {
      //console.log("failed to fetch blog data");
    }
  }

  const data = await fetchBlogById();
  //console.log("data returned from fetchBlogById", data);
  const blog = data?.data?.blog;
  //console.log("blogData :", blog);
  const isLiked = data.isLiked;
  //console.log("isLiked", isLiked);
  const likeCount = blog.likes;
  //console.log("like count", likeCount);
  const shareCount = blog.share;
  //console.log("shareCount", shareCount);
  const bio = data?.data?.bio;
  //console.log("coachBio", bio);
  const blogContent = blog.content;
  // //console.log("blogContent :", blogContent);
  // //console.log("blog category", blog.category);

  const fetchAuthorDetails = async (authorId: string) => {
    if (!authorId) {
      //console.log("No coach ID provided.");
      return null;
    }
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/profile/get-profile?userId=${authorId}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      //console.log("Fetched authorData:", data);

      if (data.success) {
        return data.userProfile;
      } else {
        //console.error("API returned success as false:", data.message);
        return null;
      }
    } catch (error) {
      //console.error("Error fetching coach details:", error);
      return null;
    }
  };

  const authorId = blog.authorId || ""; // Use params.coachId as the coach ID
  //console.log("authorId", authorId);
  const authorData = await fetchAuthorDetails(authorId);
  //console.log("authorData", authorData);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatReadTime = (readTime: string): string => {
    return readTime.replace(/(\d+)(min)/, "$1 $2");
  };

  // async function fetchInstagramPosts() {
  //   try {
  //     const res = await fetch(
  //       `${apiEndpoint}/api/fitnearn/web/users/instagram`,
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const instadata = await res.json();
  //     return instadata.data; // Return the data for posts
  //   } catch (error) {
  //     //console.error("Error fetching Instagram posts:", error);
  //     return null; // Return null to indicate a failure
  //   }
  // }

  async function fetchInstagramPosts() {
    try {
      const res = await fetch(`${apiEndpoint}/api/fitnearn/web/users/instagram`);
      if (!res.ok) {
        // Log or handle the error
        console.log("Failed to fetch Instagram posts");
        return null; // Return null or handle it appropriately
      }

      // Parse the JSON response only once
      const result = await res.json();
      console.log("result InstagramPosts", result);

      // Return the parsed result
      return result;
    } catch (error) {
      console.log("Error fetching Instagram posts:", error);
      return null; // Return null or handle it appropriately
    }
  }


  // const posts = await fetchInstagramPosts();

  const instaData = await fetchInstagramPosts();
  console.log("instaData", instaData);
  const posts = instaData?.data;
  console.log("posts", posts);

  const fetchBlogs = async () => {
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/fetch-all`,
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
  };

  const allBlogsData = await fetchBlogs();
  const allBlogs = allBlogsData.blogs;
  // //console.log("allBlogs", allBlogs);

  const getBlogsByCategory = (
    blogs: BlogData[],
    category: string | undefined,
  ): BlogData[] => {
    if (!category) return blogs;
    // //console.log(
    //   "getting blog by categories",
    //   blogs.filter(
    //     (blog) => blog.category.toLowerCase() === category.toLowerCase(),
    //   ),
    // );
    return blogs.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase(),
    );
  };

  //console.log("blog category", blog.category);
  const blogsByCategory = getBlogsByCategory(allBlogs, blog.category);
  // //console.log("blogsByCategory", blogsByCategory);

  return (
    <>
      {/* <Head>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={"fitnearn blog page"} />
        <meta property="og:url" content={`https://yoursite.com/blog/${blog.title}`} />
        <meta property="og:image" content={blog.thumbnail} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={"fitnearn blog page"} />
        <meta name="twitter:image" content={blog.thumbnail} />
        <meta name="twitter:url" content={`https://yoursite.com/blog/${blog.title}`} />
      </Head> */}

      <div className="pt-[72px] md:mx-10">
        <header className="flex items-center justify-center w-full pt-1 md:pt-9">
          {!blog ? (
            <TitleSkeleton />
          ) : (
            <section className="flex-[70%] hidden md:flex flex-col justify-center items-center ">
              <h1
                className="text-[42px] text-[#F5F5F5] font-bold leading-normal"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                {blog.title}
              </h1>
              {/* <h3 className="text-[28px] text-[#D4D4D4] text-center font-medium leading-normal w-full">
                {blog.blogHeading
                  ? blog.blogHeading
                  : "Lorem ipsum dolor sit amet consectetur. Accumsan purus purus title."}
              </h3> */}
              <h3
                className="text-[28px] text-[#D4D4D4] text-center font-medium leading-normal w-full"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                {blog.blogHeading
                  ? blog.blogHeading
                  : "Lorem ipsum dolor sit amet consectetur. Accumsan purus purus title."}
              </h3>
              <div className="text-[20px] text-[#A3A3A3] font-normal leading-normal md:mt-4">
                {formatDate(blog.createdAt)} <span className="mx-4">|</span>{" "}
                {formatReadTime(blog.readTime)} read{" "}
                <span className="mx-4">|</span> {blog.category}
              </div>
            </section>
          )}
          {!blog ? (
            <AuthorSkeleton />
          ) : (
            <section className="flex-[30%] flex flex-col justify-center items-center gap-3">
              <Image
                src={blog ? blog.profileImage : DetailBlogPageAuthor}
                alt="man or woman"
                width={84}
                height={84}
                className="rounded-full"
              />
              <h2 className="text-[#F5F5F5] text-[24px] font-bold leading-normal">
                {blog.author}
              </h2>
              <p
                className="text-[#D4D4D4] text-[16px] font-normal leading-normal text-center w-[320px] md:w-[327px]"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                {bio
                  ? bio
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolor, at vero cupiditate provident aliquam inventore."}
              </p>
            </section>
          )}
        </header>

        <main className="w-full flex flex-wrap justify-center items-start border-t-[1px] border-[#525252] mt-5 xl:pt-[60px] py-5 px-5 md:px-0">
          <article className="w-full md:w-[70%] blog-side-line md:pr-[35px] max-w-full overflow-x-hidden">
            {/* Blog title and content */}
            {!blog ? (
              <TitleSkeletonForMobile />
            ) : (
              <div className="flex flex-col gap-2 mb-4 md:hidden">
                <h1 className="text-[24px] text-[#F5F5F5] font-extrabold leading-normal">
                  {blog.title}
                </h1>
                <h5 className="text-[18px] text-[#D4D4D4] font-semibold leading-normal">
                  {blog.heading
                    ? blog.heading
                    : "Lorem ipsum dolor sit amet consectetur. Accumsan purus purus title."}
                </h5>
                <div className="text-[14px] text-[#A3A3A3] font-medium leading-normal">
                  {formatDate(blog.updatedAt)} <span className="mx-2">|</span>{" "}
                  {formatReadTime(blog.readTime)} read{" "}
                  <span className="mx-2">|</span> {blog.category}
                </div>
              </div>
            )}

            {!blog ? <ContentSkeleton /> : <EditorJsRenderer content={blogContent} />}

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-start w-full gap-6 my-8 md:gap-10">
              {blog.tags ? (
                blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="py-2 md:py-[14px] px-4 md:px-[45px] rounded-[48px] bg-[#262626] text-[14px] md:text-[20px] text-[#F5F5F5] font-normal italic leading-normal"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="w-[100px] py-2 md:py-[14px] px-4 md:px-[45px] rounded-[48px] bg-[#262626] text-[14px] md:text-[20px] text-[#F5F5F5] font-normal italic leading-normal">
                  tags are loading
                </span>
              )}
            </div>

            <CommentShareAndReportMobile
              blogId={params.blogId}
              initialLiked={isLiked}
              likeCount={likeCount}
              shareCount={shareCount}
            />
          </article>

          <aside className="w-full md:w-[30%] flex flex-col justify-start items-start pl-0 md:pl-[35px] md:pt-6 mt-8 md:mt-0">
            <LatestBlogsAside />
            <TrendingBlogsAside />

            <div data-theme="dark" className="w-full md:mt-7">
              <h2 className="text-[20px] md:text-[28px] text-[#F5F5F5] font-semibold leading-normal">
                Our X posts
              </h2>
              <Tweet id="1844323876421107740" />
            </div>

            <AdComponent />

            <h2 className="text-[20px] md:text-[28px] my-6 text-[#F5F5F5] font-semibold leading-normal">
              Our Instagram posts
            </h2>
            <div className="w-full bg-[#262626] rounded-[7px] border-[0.5px] border-[#444444]">
              {posts ? (
                <div className="w-full h-[500px] overflow-y-scroll overflow-x-hidden">
                  {posts.slice(0, 2).map((post: any) => (
                    <Link
                      href="https://www.instagram.com/fitearn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      key={post.id}
                    >
                      <div className="w-full h-auto p-4">
                        <div className="flex justify-start items-center w-full gap-2 mt-[10px]">
                          <Image
                            src={Logo}
                            width={32}
                            height={32}
                            alt="fitnearn logo"
                          />
                          <div>
                            <h5 className="text-[18px] text-[#404040] font-semibold leading-normal">
                              FitNEarn
                            </h5>
                            <h4 className="text-[14px] text-[#737373] font-medium leading-normal">
                              @Fitnearn
                            </h4>
                          </div>
                        </div>
                        <div className="mt-2">
                          {post.media_url.includes(".mp4") ? (
                            <video className="w-full" controls>
                              <source src={post.media_url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={post.media_url}
                              alt="Instagram Post"
                              className="w-full rounded-[7px]"
                            />
                          )}
                        </div>
                        <p className="text-[14px] text-[#D4D4D4] font-normal leading-normal mt-2">
                          {post.caption}
                        </p>
                      </div>
                      <div className="flex w-full justify-between items-center bg-[#404040] py-2 px-5">
                        <div className="flex items-center justify-center gap-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1393_11549)">
                              <path
                                d="M4.9987 1.33203C2.9737 1.33203 1.33203 3.24506 1.33203 5.60479C1.33203 9.87755 5.66536 13.7619 7.9987 14.6654C10.332 13.7619 14.6654 9.87755 14.6654 5.60479C14.6654 3.24506 13.0237 1.33203 10.9987 1.33203C9.7587 1.33203 8.66203 2.04947 7.9987 3.14757C7.66059 2.58636 7.21142 2.12835 6.68921 1.81232C6.167 1.49629 5.58713 1.33155 4.9987 1.33203Z"
                                stroke="#D4D4D4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1393_11549">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 14C9.18669 14 10.3467 13.6481 11.3334 12.9888C12.3201 12.3295 13.0892 11.3925 13.5433 10.2961C13.9974 9.19975 14.1162 7.99335 13.8847 6.82946C13.6532 5.66557 13.0818 4.59648 12.2426 3.75736C11.4035 2.91825 10.3344 2.3468 9.17054 2.11529C8.00666 1.88378 6.80026 2.0026 5.7039 2.45673C4.60754 2.91085 3.67047 3.67989 3.01118 4.66658C2.35189 5.65328 2 6.81331 2 8C2 8.992 2.24 9.92734 2.66667 10.7513L2 14L5.24867 13.3333C6.07267 13.76 7.00867 14 8 14Z"
                              stroke="#D4D4D4"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3.33203 14.0013V2.66797H9.33203L9.5987 4.0013H13.332V10.668H8.66536L8.3987 9.33463H4.66536V14.0013H3.33203Z"
                              fill="#D4D4D4"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <InstagramPostSkeleton />
              )}
            </div>
          </aside>
        </main>


        {/* like comment share and report for desktop*/}
        {/* <div className="hidden md:block">
          <CommentShareAndReport />
        </div> */}
        <CommentShareAndReport
          blogId={params.blogId}
          initialLiked={isLiked}
          likeCount={likeCount}
          shareCount={shareCount}
        />

        {/* similar blogs section */}
        <div className="mb-0 md:mb-[76px]">
          <h2 className="text-[24px] md:text-[44px] text-[#F5F5F5] font-bold leading-normal my-5 md:my-8 pl-4 md:pl-0">
            Similar Blogs
          </h2>
          <div className="items-center justify-center hidden w-full md:flex">
            <Carousel
              opts={{ align: "start" }}
              className="w-full flex justify-center items-center max-w-[1080px] mr-[80px] bg-[#171717]"
            >
              <CarouselContent className="-ml-1 bg-[#171717]">
                {blogsByCategory.map((blog, index) => (
                  <CarouselItem
                    key={blog._id}
                    className="md:basis-auto bg-[#171717] pl-[48px]"
                  >
                    <div className="flex flex-col gap-4 w-[304px] md:w-[304px] h-auto relative">
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
                              className="rounded-[12px] object-cover w-[304px] h-[288px] hover:filter-none black-and-white  transition-all duration-300 ease-in-out"
                            />
                            <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                              <span>{blog.category}</span>
                            </span>
                          </div>

                          <div className="w-[304px] flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center justify-center gap-2">
                                <Image
                                  src={AuthorPic}
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
                              Amet consectetur. Ut vel viverra auctor et nisi
                              amet consectetur. Utvel viverra auctor et nisi
                              amet.{" "}
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            {/* <div className="p-1 bg-[#171717]">
                      <Link
                        href={`/blogs/${blog._id}`}
                        key={index}
                        className="bg-[#171717]"
                      >
                        <article className=" w-[304px] h-auto rounded-lg bg-[#171717]">
                          <div className="relative">
                            <Image
                              src={blog.thumbnail || BlogCardPic}
                              alt="man/woman performing exercise"
                              layout="fixed"
                              width={304}
                              height={288}
                              className="rounded-[12px]"
                            />
                            <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                              <span>{blog.category}</span>
                            </span>
                            <LikeButton
                              videoId={"1234"}
                              likeFor={"blogs"}
                              initialLiked={blog.isLiked}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center justify-center gap-2">
                              <Image
                                src={AuthorPic}
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
                          <div className="text-[12px] text-[#737373] font-normal leading-normal mt-2">
                            {formatDate(blog.updatedAt)} | Read time: {formatReadTime(blog.readTime)} |
                          </div>
                          <h2 className="text-[16px] text-[#FFF] font-bold leading-normal my-2">
                            {blog.title}
                          </h2>
                          <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                            {blog.heading ? blog.heading : "Amet consectetur. Ut vel viverra auctor et nisi amet consectetur. Utvel viverra auctor et nisi amet."}
                          </p>
                        </article>
                      </Link>
                    </div> */}
          </div>
          <div className="flex md:hidden">
            <SimilarBlogsCorousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBlogPage;
