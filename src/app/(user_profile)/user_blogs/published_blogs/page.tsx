"use client";
import Navbar from "@/app/Components/Navbar";
import ShowFooter from "@/app/Components/ShowFooter";
import UserNavbar from "@/app/Components/UserNavbar";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Card } from "flowbite-react";

const BlogCardSkeleton = () => (
  <div className="overflow-hidden mq450:w-[320px] border rounded-lg shadow bg-neutral-800 border-neutral-700">
    <div className="h-48 bg-neutral-700 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="h-6 rounded bg-neutral-700 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 rounded bg-neutral-700 animate-pulse" />
        <div className="h-4 rounded bg-neutral-700 animate-pulse" />
        <div className="w-2/3 h-4 rounded bg-neutral-700 animate-pulse" />
      </div>
      <div className="pt-2">
        <div className="w-32 h-10 rounded-lg bg-neutral-600 animate-pulse" />
      </div>
    </div>
  </div>
);
const SkeletonLoader = ({ count = 6 }) => (
  <div className="grid grid-cols-3 gap-6 p-6 mq450:grid-cols-1 bg-neutral-900">
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
  </div>
);
interface Blog {
  _id: string;
  title: string;
  thumbnail: string;
  category: string;
  status: string;
  author: string;
  blogHeading: string;
  createdAt: string;
  content?: any[];
}

const Page = () => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [data, setData] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All ");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const categories = ["Draft", "Published", "Rejected", "Under-review"];
  const [selected, setSelected] = useState("");
  const toggleDropdown = () => setIsOpen(!isOpen);
  const router = useRouter();
  const navItems = [
    { name: "All", path: "/user_blogs/all_blogs" },
    { name: "Under Review", path: "/user_blogs/under_review_blogs" },
    { name: "Published", path: "/user_blogs/published_blogs" },
    { name: "Rejected", path: "/user_blogs/rejected_blogs" },
    { name: "Draft", path: "/user_blogs/draft_blogs" },
  ];
  const pathname = usePathname();
  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelected(currentItem.name);
    } else {
      setSelected("All"); // Default to 'All' if no match is found
    }
  }, [pathname]);
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const { toast } = useToast();
  useEffect(() => {
    const user_id = Cookies.get("user_id");
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/blog/user-blog/${user_id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        const filteredData: any = data.filter(
          (blog: any) => blog.status === "published",
        );

        // Reverse the order of the blogs for descending order
        const reversedBlogs = filteredData.reverse();
        setBlogs(reversedBlogs);
        setFilteredBlogs(reversedBlogs);
        setIsLoading(false);
      } catch (error) {
        //console.error("Error fetching blogs:", error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const onAddBlog = async () => {
    const userId = Cookies.get("user_id");
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/create-bio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            bioContent: "Temporary content", // This won't be saved if the user already has blogs
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        // User doesn't have any blogs yet, show bio popup
        // setShowBioPopup(true);
      } else {
        // User already has blogs, redirect to create blog page
        router.push("/user_blogs/create_blogs/blog_details");
      }
    } catch (error) {
      //console.error("Error:", error);
      router.push("/user_blogs/create_blogs/blog_details");
    }
  };

  const ResponsiveContentSlicer = ({ blog }: any) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 450);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const extractContent = (blogContent: any) => {
      if (!Array.isArray(blogContent)) return "";

      return blogContent
        .reduce((acc, item) => {
          if (item && item.data && item.data.text) {
            return acc + " " + item.data.text;
          }
          return acc;
        }, "")
        .trim();
    };

    const sliceContent = (content: any, length: any) => {
      if (!content) return "No content available";
      const words = content.split(/\s+/);
      if (words.length > length) {
        return words.slice(0, length).join(" ") + "...";
      }
      return content;
    };

    const content = extractContent(blog.content);
    const slicedContent = isMobile
      ? sliceContent(content, 5)
      : sliceContent(content, 150);

    return (
      <p className="w-full mt-10 text-base font-medium leading-tight truncate mq450:mt-1 text-neutral-500 font-Lato">
        {slicedContent}
      </p>
    );
  };
  const requestDelete = () => {
    toast({
      title: "Delete Request sent",
      description: "Watch out email for status!",
      duration: 5000, // 5 seconds
    }); //route the user to the home page
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;

    // Find the last space within maxLength or return -1 if not found
    const lastSpaceIndex = text.lastIndexOf(" ", maxLength);

    // If no space is found, truncate at maxLength
    if (lastSpaceIndex === -1) {
      return text.slice(0, maxLength) + "...";
    }

    // If space is found, truncate at the last space
    return text.slice(0, lastSpaceIndex) + "...";
  };

  const renderButtons = (blog: any) => {
    switch (blog.status.toLowerCase()) {
      case "published":
      case "denied":
        return (
          <>
            <button
              // onClick={() => handleDeleteClick(blog._id)}
              onClick={requestDelete}
              className="p-2 w-[140px] mq450:w-[140px]  mq450:h-[40px] mq450:text-sm border rounded-lg border-neutral-600  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]"
            >
              Delete
            </button>

            <Link href={`/blogs/${blog._id}`}>
              <button className="p-2 w-[137px] mq450:w-[135px]  mq450:h-[40px] mq450:text-sm border rounded-lg border-neutral-600  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
                View
              </button>
            </Link>
          </>
        );
      case "under review":
        return (
          <>
            <button className="p-2 text-sm mq450:text-[12px] w-[108px] mq450:text-wrap text-nowrap mq450:w-[60px] mq450:h-[45px] mq450:text-sm mq450:p-0 border rounded-lg border-neutral-600  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
              Edit Request
            </button>
            <button className="p-2 text-sm w-[108px] mq450:text-[12px] mq450:text-wrap text-nowrap mq450:w-[60px] mq450:h-[45px] mq450:text-sm mq450:p-0 border rounded-lg border-neutral-600  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
              Cancel Request
            </button>
          </>
        );
      case "draft":
        return (
          <>
            <button className="p-2 w-[104px] mq450:w-[60px] mq450:h-[40px] mq450:text-sm border rounded-lg border-neutral-600  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
              Delete
            </button>
            <button className="p-2 w-[104px] mq450:w-[60px] mq450:h-[40px] mq450:text-sm border rounded-lg border-neutral-600  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
              Edit
            </button>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <div className="relative mq450:static pt-[827px] oveflow-x-hidden">
        <UserNavbar blogsactivecolor="neutral-700" activeblogs={true} />
        <div className="absolute md:ml-3 mq450:left-[10px] w-auto text-white oveflow-x-hidden mq450:ml-2 top-28 left-44 mq450:left-0 mq450:mt-14 mq450:w-52">
          <>
            <div className="flex items-center gap-5  oveflow-x-hidden mq450:w-[340px]">
              <div className="flex items-center gap-6 mq450:gap-3 border-neutral-500 mq450:w-[340px] mq450:overflow-x-auto mq450:scrollbar-thin">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative pb-2 text-2xl font-bold text-nowrap mq450:text-xl font-Lato ${
                      selected === item.name
                        ? "bg-clip-text text-transparent font-semibold bg-gradient-to-r from-[#F43F5E] to-[#FB923C]"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setSelected(item.name)}
                  >
                    {item.name}
                    {selected === item.name && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]" />
                    )}
                  </Link>
                ))}
              </div>
              {/* <Link href="/user_blogs/create_blogs/blog_details"> */}
              {/* <Link href="/user_blogs/create_blogs/blog_details"> */}
              <button
                onClick={onAddBlog}
                className="w-[128px] h-[35px] cursor-none mq450:hidden mq1050:ml-[150px] mq1240:ml-[250px]   mq450:ml-[50px] ml-[500px] text-sm text-nowrap h-[33px]  justify-center items-center gap-2 inline-flex"
              ></button>
              {/* </Link> */}
              {/* </Link> */}
            </div>
          </>
          {filteredBlogs.length == 0 ? (
            <></>
          ) : (
            <div className="flex max-w-lg pt-10 mx-auto ml-[0px]  mq450:mr-40 mq450:pt-5 ">
              <div className="flex gap-0 ">
                <div className="relative flex w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block focus:ring-1 mq450:w-[200px]  focus:ring-neutral-900 focus:outline-none p-2.5 w-[410px]  z-20 text-sm text-neutral-500 bg-neutral-800 border-s-neutral-100 border-s-1 border border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500 rounded-l-lg
                  [&::-webkit-search-cancel-button]:appearance-none
                  [&::-ms-clear]:hidden"
                    placeholder="Search Blogs here..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <button
                    className="  bg-gradient-to-r from-[#F43F5E] to-[#FB923C] 
 rounded-tr-lg rounded-br-lg p-2.5 text-sm font-medium h-full text-neutral-100 bg-neutral-500 border border-neutral-500 hover:bg-neutral-600 focus:ring-4 focus:outline-none focus:ring-neutral-300"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
                <button
                  onClick={onAddBlog}
                  className="w-[111px] hidden  mq450:ml-0 mq450:block mq1050:hidden mq1240:hidden hover:bg-gradient-to-l from-pink-600 to-orange-500 ml-[550px] text-sm text-nowrap h-[39px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
                >
                  Add Blog
                </button>
              </div>
              <button
                onClick={onAddBlog}
                className="w-[128px] h-[38px] hover:border hover:border-neutral-50 mq450:hidden mq1050:ml-[330px] mq1240:ml-[460px]  hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[50px] ml-[580px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.7618 18.9188C15.7618 18.9614 15.7458 19.0022 15.7173 19.0322C15.6887 19.0623 15.65 19.0792 15.6096 19.0792H4.97535C4.93498 19.0792 4.89626 19.0623 4.86771 19.0322C4.83916 19.0022 4.82312 18.9614 4.82312 18.9188V7.71491C4.82312 7.67237 4.83916 7.63157 4.86771 7.6015C4.89626 7.57142 4.93498 7.55452 4.97535 7.55452H11.5167L13.3398 5.63374H4.97535C4.4516 5.63425 3.94945 5.85368 3.5791 6.24386C3.20875 6.63404 3.00048 7.1631 3 7.71491V18.9188C3.00048 19.4706 3.20875 19.9997 3.5791 20.3899C3.94945 20.7801 4.4516 20.9995 4.97535 21H15.6096C16.1334 20.9995 16.6355 20.7801 17.0059 20.3899C17.3762 19.9997 17.5845 19.4706 17.585 18.9188V12.0271L15.7618 13.9478V18.9188Z"
                    fill="white"
                  />
                  <path
                    d="M20.1957 3.84357C19.6828 3.30343 18.9874 3 18.2623 3C17.5371 3 16.8417 3.30343 16.3288 3.84357L9.23781 11.3135C9.11071 11.4476 9.02412 11.6184 8.98895 11.8043L8.34448 15.2002C8.31744 15.3397 8.3202 15.4839 8.35256 15.6222C8.38493 15.7605 8.44608 15.8894 8.53159 15.9998C8.6171 16.1101 8.72483 16.199 8.84697 16.26C8.96912 16.321 9.10262 16.3527 9.23781 16.3527C9.29898 16.3525 9.36 16.3463 9.42012 16.3344L12.6425 15.6554C12.819 15.6181 12.9811 15.5265 13.1083 15.3923L20.1984 7.92235C20.4528 7.65454 20.6545 7.33651 20.792 6.98646C20.9296 6.63641 21.0003 6.26122 21 5.88236C20.9997 5.5035 20.9286 5.12842 20.7906 4.77857C20.6525 4.42873 20.4504 4.111 20.1957 3.84357ZM18.9067 5.20156C18.9915 5.29076 19.0587 5.39668 19.1046 5.51327C19.1505 5.62986 19.1741 5.75483 19.1741 5.88104C19.1741 6.00725 19.1505 6.13222 19.1046 6.24881C19.0587 6.3654 18.9915 6.47132 18.9067 6.56052L18.4181 7.07433L17.1292 5.71633L17.6178 5.20156C17.7887 5.02152 18.0205 4.92037 18.2623 4.92037C18.504 4.92037 18.7358 5.02152 18.9067 5.20156ZM12.0117 13.8249L10.4 14.1649L10.7227 12.466L15.8402 7.07433L17.1292 8.43232L12.0117 13.8249Z"
                    fill="white"
                  />
                </svg>
                Add Blog
              </button>
            </div>
          )}

          {isLoading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : filteredBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-y-7 gap-x-[-5px]   mt-5 mq450:grid-cols-1 mq450:ml-4 mq1240:gap-[30px]">
                {" "}
                {filteredBlogs.map((blog) => (
                  <Card
                    style={{ padding: "0px" }}
                    key={blog._id} // Always add a unique key when rendering lists
                    className="cardComponent rounded-[16px] object-cover p-0 max-w-sm border w-[350px] mq1050:w-[290px] mq1240:w-[320px] border-neutral-700 h-[490px] bg-neutral-900 mq450:w-[330px] "
                    // imgAlt="Meaningful alt text for an image that is not purely decorative"
                    renderImage={() => (
                      <div className="relative w-full h-[450px]">
                        <Image
                          layout="fixed"
                          width={304}
                          height={288}
                          className="rounded-t-[16px]object-cover w-[350px] h-[288px]"
                          src={blog.thumbnail}
                          alt={blog.title || "Blog thumbnail"}
                          objectFit="cover"
                        />
                        <span
                          className={`absolute top-4 text-${blog.status === "draft" ? "blue" : blog.status === "published" ? "green" : "purple"}-600 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] font-medium py-1 px-2`}
                        >
                          <span>
                            {" "}
                            {blog.status.charAt(0).toUpperCase() +
                              blog.status.slice(1)}
                          </span>
                        </span>
                      </div>
                    )}
                  >
                    {/* <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={400}
                    height={150}
                    className="h-[150px] w-full object-cover p-0"
                  /> */}

                    <div className="flex items-center justify-between ">
                      <h5 className="overflow-hidden text-xl font-bold tracking-tight text-white dark:text-white text-ellipsis whitespace-nowrap">
                        {/* {blog.title && blog.title.length > 15
                          ? `${blog.title.slice(0, 15)}..`
                          : blog.title} */}
                        {/* {blog?.title && blog.title} */}
                        {truncateText(blog?.title ?? "", 38)}
                      </h5>
                      {/* <p
                        className={` mq450:text-sm  text-nowrap text-[14px]   text-${blog.status === "draft" || blog.status === "published" ? "green" : "purple"}-600 h-[25px] px-3 py-0.5 bg-neutral-800 rounded-md  justify-center items-center inline-flex`}
                      >
                        {blog.status.charAt(0).toUpperCase() +
                          blog.status.slice(1)}
                      </p> */}
                    </div>
                    <p className="overflow-hidden  mq450:text-[15px]  text-sm font-normal text-neutral-500 dark:text-gray-400 line-clamp-2 h-[47px] mq450:h-[40px] sm:text-base">
                      {/* {blog.content &&
                      (blog.content[0] || blog.content[1]) &&
                      (blog.content[0]?.data?.text ||
                        blog.content[1]?.data?.text)
                        ? blog.content[0]?.data?.text?.length > 35 ||
                          blog.content[1]?.data?.text?.length > 35
                          ? `${blog.content[0]?.data?.text?.slice(0, 35) || ""}${
                              blog.content[1]?.data?.text
                                ? blog.content[1].data.text.slice(0, 20)
                                : ""
                            }..`
                          : blog.content[0]?.data?.text ||
                            blog.content[1]?.data?.text
                        : "No content available"} */}
                      {truncateText(blog?.blogHeading ?? "", 75)}
                      {/* {blog?.blogHeading && blog.blogHeading.slice(0, 71)}.. */}
                    </p>
                    <div className="flex justify-between gap-8 mt-2 mq450:gap-6 mq450:mt-5">
                      {renderButtons(blog)}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-16 mq450:absolute  mq450:left-8">
            <Image
              width={250}
              height={400}
              quality={100}
              src="/no_blogs.png"
              alt="no blogs"
            />
            <div className="flex flex-col items-center justify-center gap-3 mt-10 text-center">
              <p className="text-2xl font-semibold text-neutral-400 font-Lato">
              No blog post yet ✍️
              </p>
              <p className="text-lg font-medium text-neutral-400 w-[450px] mq450:w-[300px] font-Lato">
              Share your insights, experiences, or tips with the community. Start with your first blog post now!
              </p>
              <button
                onClick={onAddBlog}
                className="w-[200px] h-[35px]  px-3 py-2 bg-gradient-to-r from-[#F43F5E] to-[#FB923C] rounded-lg justify-center items-center gap-2 inline-flex"
              >
                Write a blog post
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
