"use client";
import React, { useEffect, useState } from "react";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import CreateBlogBtn from "./CreateBlogBtn";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import AuthorPic from "../../../../public/blogAuthorPic.png";
import LikeButtonForBlog from "../LikeButtonForBlog";
import BlogsPageBannerPic from "../../../../public/blogsPageBanner.jpg";
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

const MobileFilterForBlogs = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [singleCategory, setSingleCategory] = useState<string>("");
  const [postedAt, setPostedAt] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const genToken = Cookies.get("genToken");
  const headers = genToken ? { Authorization: `Bearer ${genToken}` } : {};

  const filterCategories = [
    "YOGA",
    "MEDITATION",
    "LIFESTYLE",
    "RECIPES",
    "DANCE",
    "GENERAL",
    "WARMUP",
    "WORKOUT",
    "FITNESS STORY",
    "FITNESS TIPS",
    "CARDIO",
    "RECOVERY",
    "STRETCHING",
    "MOTIVATION",
    "MEN'S HEALTH",
    "WOMEN'S HEALTH",
  ];

  const capitalizeFirstLetter = (string: string) => {
    const words = string.toLowerCase().split(" "); // Split string by space and convert to lowercase
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    ); // Capitalize the first letter of each word
    const changedCategory = capitalizedWords.join(""); // Join the words without spaces
    //console.log("capitalizeFirstLetter", changedCategory);
    return changedCategory; // Return the concatenated result
  };

  const toggleCategoryForFilter = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const toggleCategory = (category: string) => {
    // setSelectedCategories((prevSelectedCategories) => {
    //   let updatedCategories = [...prevSelectedCategories];
    //   // Remove the previous singleCategory if it exists in selectedCategories
    //   if (singleCategory && updatedCategories.includes(singleCategory)) {
    //     updatedCategories = updatedCategories.filter(
    //       (item) => item !== singleCategory,
    //     );
    //   }

    //   // Add the new category to selectedCategories
    //   updatedCategories.push(category);

    //   // Update the singleCategory
    //   setSingleCategory(category);

    //   return updatedCategories;
    // });
    setSingleCategory(category);
  };

  const clearFields = () => {
    setSelectedCategories([]);
    setPostedAt("");
    setSingleCategory("");
  };

  useEffect(() => {
    //console.log("single category", singleCategory);
    //console.log("categories", selectedCategories);
  }, [selectedCategories, singleCategory]);

  const fetchBlogs = async () => {
    const headers = new Headers();
    // Conditionally add the Authorization header
    if (genToken) {
      headers.append("Authorization", `Bearer ${genToken}`);
    }
    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/blog/fetch-all`,
        {
          headers,
        },
      );
      const result = await res.json();
      //console.log("result from all Blogs", result);
      if (result.success) {
        setBlogs(result.blogs);
      } else {
        //console.log("Failed to fetch blogs");
      }
    } catch (err) {
      //console.log(err);
      const error = err as Error; // Casting to Error
      toast({
        title: "Failed to fetch blogs",
        description: error.message,
      });
    }
  };

  const filterBlogs = (blogs: Blog[], categories: string[]) => {
    //console.log("categories in filterBlog", categories);
    if (categories.includes("All")) return blogs;
    if (!categories.length) return [];
    const result = blogs.filter((blog) => categories.includes(blog.category));
    //console.log("result from filterBlog", result);
    if (result.length <= 0) {
      toast({
        title: "Failed to fetch blogs",
        description: "we don't have any blogs available of this category.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
    // console.log(
    //   "filtered blogs",
    //   blogs.filter((blog) => categories.includes(blog.category)),
    // );
    return blogs.filter((blog) => categories.includes(blog.category));
  };

  const filterForPostedAtBlogs = (
    blogs: Blog[],
    categories: string[],
  ): Blog[] => {
    //console.log("categories in PostedAtBlogs filter", categories);
    // Return all blogs if "All" is selected
    if (categories.includes("All")) return blogs;
    // Return all blogs if no categories are selected
    if (!categories.length) return blogs;
    // Filter blogs by selected categories
    const result = blogs.filter((blog) => categories.includes(blog.category));
    // Show a toast if no blogs are found for the selected categories
    if (result.length <= 0) {
      toast({
        title: "Failed to fetch blogs",
        description: "We don't have any blogs available for this category.",
      });
    }
    //console.log("filtered blogs of postedAt", result);
    return result;
  };

  useEffect(() => {
    setFilteredBlogs(filterBlogs(blogs, selectedCategories));
  }, [blogs, selectedCategories]);

  async function fetchLatestBlogs() {
    const headers = new Headers();
    // Conditionally add the Authorization header
    if (genToken) {
      headers.append("Authorization", `Bearer ${genToken}`);
    }
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/latest`,
      {
        headers,
      },
    );
    const latestData = await res.json();
    //console.log("latestBlogs :", latestData);
    if (latestData.success) {
      setLatestBlogs(latestData.blogs);
      //console.log("latestBlogs data:", latestData.blogs);
    } else {
      //console.log("error fetching latest blogs", latestData);
    }
  }

  async function fetchPopularBlogs() {
    const headers = new Headers();
    // Conditionally add the Authorization header
    if (genToken) {
      headers.append("Authorization", `Bearer ${genToken}`);
    }
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/popular`,
      {
        headers,
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
    fetchBlogs();
    fetchLatestBlogs();
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

  const bigFilter = () => {
    // Apply the filter based on the selected "postedAt" option
    setDialogOpen(false);
    if (postedAt === "Latest") {
      //console.log("latest blog is choosen in filter", latestBlogs);
      setFilteredBlogs(filterForPostedAtBlogs(latestBlogs, selectedCategories));
    } else if (postedAt === "Trending") {
      //console.log("Trending API is going to be implemented");
    } else if (postedAt === "Most popular") {
      //console.log("popular blog is choosen in filter", popularBlogs);
      setFilteredBlogs(
        filterForPostedAtBlogs(popularBlogs, selectedCategories),
      );
    } else {
      //console.log("only category is selected and postedAt is not selected yet");
    }
  };

  const searchQuery = async (query: string) => {
    if (query === undefined || query === "") {
      return;
    } else {
      const headers = new Headers();
      // Conditionally add the Authorization header
      if (genToken) {
        headers.append("Authorization", `Bearer ${genToken}`);
      }
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/blog/search?searchText=${query}`,
        {
          headers,
        },
      );
      const result = await res.json();
      //console.log("result from blog serach", result);
      if (result.success) {
        setFilteredBlogs(result.blogs);
      }
      if (result.blogs && result.blogs.length <= 0) {
        toast({
          title: "no blogs found",
          description: `We don't have any blogs related to ${query} keyword. try other keywords.`,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      searchQuery(query);
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <>
      {/* <h1 className="block md:hidden text-[32px] text-start text-[#FFFFFF] font-bold leading-normal my-6 px-4">
        Welcome to the FitnEarn Blogs.
      </h1> */}
      <div className="flex flex-col items-center justify-center px-4 md:hidden">
        {/* search and filter */}
        <div className="flex items-center justify-between w-full px-2">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Posts"
              className=" w-[280px] h-[40px] p-[2.5px] pl-8 text-[14px] text-[#D4D4D4] font-normal leading-[21px] bg-[#171717] border-[1px] border-[#525252] rounded-[8px] focus:outline-none focus:border-none focus:ring-[#FFFFFF]"
              required
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[10px] left-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.50007 14.5C7.31337 14.5 6.15332 14.1481 5.16661 13.4888C4.17991 12.8295 3.41086 11.8925 2.95673 10.7961C2.5026 9.69974 2.38378 8.49334 2.61529 7.32946C2.84681 6.16557 3.41826 5.09648 4.25738 4.25736C5.09651 3.41825 6.16562 2.8468 7.32952 2.61529C8.49342 2.38378 9.69983 2.5026 10.7962 2.95673C11.8926 3.41085 12.8297 4.17989 13.4889 5.16658C14.1482 6.15327 14.5001 7.31331 14.5001 8.5C14.4984 10.0907 13.8656 11.6158 12.7408 12.7407C11.6159 13.8655 10.0908 14.4982 8.50007 14.5ZM8.50007 4C7.61005 4 6.74001 4.26392 5.99998 4.75839C5.25995 5.25285 4.68316 5.95566 4.34257 6.77793C4.00197 7.60019 3.91285 8.50499 4.08649 9.37791C4.26012 10.2508 4.68871 11.0526 5.31805 11.682C5.9474 12.3113 6.74923 12.7399 7.62216 12.9135C8.49508 13.0872 9.39989 12.998 10.2222 12.6575C11.0444 12.3169 11.7473 11.7401 12.2417 11.0001C12.7362 10.26 13.0001 9.39002 13.0001 8.5C12.9989 7.30689 12.5244 6.16299 11.6808 5.31934C10.8371 4.47568 9.69319 4.00119 8.50007 4Z"
                fill="white"
              />
              <path
                d="M16.7502 17.5C16.5513 17.5 16.3605 17.4209 16.2199 17.2803L13.2199 14.2803C13.0832 14.1388 13.0076 13.9493 13.0094 13.7527C13.0111 13.5561 13.0899 13.3679 13.229 13.2289C13.3681 13.0898 13.5562 13.011 13.7528 13.0092C13.9495 13.0075 14.1389 13.0831 14.2804 13.2198L17.2804 16.2198C17.3853 16.3246 17.4567 16.4583 17.4856 16.6037C17.5145 16.7492 17.4997 16.9 17.4429 17.037C17.3862 17.174 17.2901 17.2911 17.1667 17.3736C17.0434 17.456 16.8985 17.5 16.7502 17.5Z"
                fill="white"
              />
            </svg>
          </div>

          <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
            <DrawerTrigger className="filterBtn rounded-full border-[1px] border-[#D1D5DB] p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M18 14V4V14Z" fill="#D1D5DB" />
                <path
                  d="M12 6V4M12 6C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10M12 6C12.5304 6 13.0391 6.21071 13.4142 6.58579C13.7893 6.96086 14 7.46957 14 8C14 8.53043 13.7893 9.03914 13.4142 9.41421C13.0391 9.78929 12.5304 10 12 10M12 10V20M6 18C6.53043 18 7.03914 17.7893 7.41421 17.4142C7.78929 17.0391 8 16.5304 8 16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14M6 18C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16C4 15.4696 4.21071 14.9609 4.58579 14.5858C4.96086 14.2107 5.46957 14 6 14M6 18V20M6 14V4M18 18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16C20 15.4696 19.7893 14.9609 19.4142 14.5858C19.0391 14.2107 18.5304 14 18 14M18 18C17.4696 18 16.9609 17.7893 16.5858 17.4142C16.2107 17.0391 16 16.5304 16 16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14M18 18V20M18 14V4"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DrawerTrigger>
            <DrawerContent
              style={{
                borderRadius: "var(--rounded-2xl, 16px)",
                border: "1px solid var(--Neutral-700, #404040)",
                background:
                  "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                backdropFilter: "blur(100px)",
              }}
            >
              <DrawerHeader>
                <DrawerTitle className="text-[24px] text-[#FFF] font-bold leading-normal border-b-[1px] border-[#a3a3a352] pb-3">
                  Refine by
                </DrawerTitle>
                <DrawerDescription>
                  <div className="flex w-full flex-col justify-start items-start gap-4 mb-[18px] max-h-[60vh] overflow-y-auto py-3">
                    <div className="flex w-full flex-col justify-start items-start gap-4 pb-4 border-b-[1px] border-[#a3a3a352]">
                      <h2 className="text-[20px] text-[#E5E5E5] font-bold leading-[30px]">
                        Posted at
                      </h2>
                      <div className="flex items-center justify-start w-full gap-2">
                        <div
                          onClick={() => setPostedAt("Latest")}
                          className={`${postedAt === "Latest" ? "fitness-level-selected font-medium" : ""} py-2 px-4 inline-block bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                        >
                          LATEST
                        </div>
                        <div
                          onClick={() => setPostedAt("Trending")}
                          className={`${postedAt === "Trending" ? "fitness-level-selected font-medium" : ""} py-2 px-4 inline-block bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                        >
                          TRENDING
                        </div>
                        <div
                          onClick={() => setPostedAt("Most popular")}
                          className={`${postedAt === "Most popular" ? "fitness-level-selected font-medium" : ""} py-2 px-4 inline-block bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                        >
                          POPULAR
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full gap-4 ">
                      <h2 className="text-[20px] text-[#E5E5E5] font-bold leading-[30px]">
                        Categories
                      </h2>
                      <div className="flex flex-wrap items-center justify-start w-full gap-2">
                        {filterCategories.map((item) => {
                          const formattedItem = capitalizeFirstLetter(
                            item.toLowerCase(),
                          );
                          return (
                            <button
                              key={item}
                              onClick={() =>
                                toggleCategoryForFilter(formattedItem)
                              }
                              className={`${
                                selectedCategories.includes(formattedItem)
                                  ? "fitness-level-selected font-medium"
                                  : ""
                              } inline-block py-2 px-4 bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="border-t-[1px] border-[#a3a3a352]">
                <div className="flex items-center justify-between w-full ">
                  <span
                    onClick={clearFields}
                    className="text-[24px] text-[#A3A3A3] font-medium leading-[36px] underline cursor-pointer"
                  >
                    Clear all
                  </span>
                  <Button
                    className="filterBtn text-[16px] text-[#FFF] font-semibold leading-[24px]"
                    style={{
                      borderRadius: "var(--rounded-lg, 8px)",
                      border: "2px solid var(--Neutral-300, #D4D4D4)",
                      background:
                        "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                      backdropFilter: "blur(100px)",
                    }}
                    onClick={bigFilter}
                  >
                    Apply Filter
                  </Button>
                </div>
                {/* <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose> */}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        {/* corousel */}
        <div className="w-full mt-4">
          <nav className="flex items-center justify-start w-full px-4 overflow-x-auto whitespace-nowrap md:px-0">
            <Link
              href={"/blogCategory/Meditation"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] pl-0 pr-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Meditation")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Meditation" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0004 2.75C11.7706 2.75 11.543 2.79527 11.3307 2.88321C11.1184 2.97116 10.9255 3.10006 10.763 3.26256C10.6005 3.42507 10.4716 3.61798 10.3836 3.8303C10.2957 4.04262 10.2504 4.27019 10.2504 4.5C10.2504 4.72981 10.2957 4.95738 10.3836 5.1697C10.4716 5.38202 10.6005 5.57493 10.763 5.73744C10.9255 5.89994 11.1184 6.02884 11.3307 6.11679C11.543 6.20474 11.7706 6.25 12.0004 6.25C12.4645 6.25 12.9097 6.06563 13.2379 5.73744C13.566 5.40925 13.7504 4.96413 13.7504 4.5C13.7504 4.03587 13.566 3.59075 13.2379 3.26256C12.9097 2.93437 12.4645 2.75 12.0004 2.75ZM8.75041 4.5C8.75041 3.63805 9.09282 2.8114 9.70232 2.2019C10.3118 1.59241 11.1385 1.25 12.0004 1.25C12.8624 1.25 13.689 1.59241 14.2985 2.2019C14.908 2.8114 15.2504 3.63805 15.2504 4.5C15.2504 5.36195 14.908 6.1886 14.2985 6.7981C13.689 7.40759 12.8624 7.75 12.0004 7.75C11.1385 7.75 10.3118 7.40759 9.70232 6.7981C9.09282 6.1886 8.75041 5.36195 8.75041 4.5ZM12.0004 9.77C11.7129 9.76635 11.4254 9.78373 11.1404 9.822L10.2484 9.972C8.23541 10.311 6.75041 12.074 6.75041 14.15C6.75097 14.6821 6.62087 15.2062 6.37153 15.6763C6.1222 16.1464 5.76126 16.548 5.32041 16.846L5.22041 16.915C4.96551 17.0866 4.6887 17.2231 4.39741 17.321L3.24041 17.711C3.05185 17.7747 2.84571 17.7608 2.66737 17.6725C2.48902 17.5841 2.35307 17.4286 2.28941 17.24C2.22576 17.0514 2.23963 16.8453 2.32796 16.667C2.41629 16.4886 2.57185 16.3527 2.76041 16.289L3.91941 15.899C4.08241 15.844 4.23841 15.767 4.38141 15.671L4.48341 15.602C4.72028 15.4412 4.91407 15.2247 5.0478 14.9715C5.18152 14.7184 5.2511 14.4363 5.25041 14.15C5.25041 11.353 7.25341 8.955 9.99841 8.493L10.8884 8.343C11.2567 8.2906 11.6285 8.26653 12.0004 8.271C12.3724 8.26646 12.7441 8.29053 13.1124 8.343L14.0024 8.493C16.7484 8.955 18.7504 11.353 18.7504 14.15C18.7504 14.736 19.0404 15.28 19.5184 15.602L19.6194 15.671C19.7634 15.767 19.9194 15.844 20.0824 15.899L21.2404 16.289C21.429 16.3527 21.5845 16.4886 21.6729 16.667C21.7612 16.8453 21.7751 17.0514 21.7114 17.24C21.6478 17.4286 21.5118 17.5841 21.3335 17.6725C21.1551 17.7608 20.949 17.7747 20.7604 17.711L19.6034 17.321C19.3125 17.2231 19.036 17.0865 18.7814 16.915L18.6804 16.846C18.2396 16.548 17.8786 16.1464 17.6293 15.6763C17.38 15.2062 17.2499 14.6821 17.2504 14.15C17.2504 12.074 15.7654 10.311 13.7534 9.972L12.8614 9.822C12.5764 9.78401 12.2889 9.76697 12.0014 9.771M8.90141 15.551C8.96051 15.4722 9.03455 15.4058 9.11929 15.3556C9.20404 15.3055 9.29785 15.2725 9.39535 15.2585C9.49285 15.2446 9.59214 15.25 9.68755 15.2745C9.78296 15.2989 9.87262 15.3419 9.95141 15.401C10.0302 15.4601 10.0966 15.5341 10.1468 15.6189C10.197 15.7036 10.2299 15.7974 10.2439 15.8949C10.2578 15.9924 10.2524 16.0917 10.2279 16.1871C10.2035 16.2825 10.1605 16.3722 10.1014 16.451L9.17741 17.684L9.15541 17.713C9.05054 17.8596 8.937 17.9999 8.81541 18.133C8.53363 18.4283 8.18964 18.6572 7.80841 18.803C7.65341 18.861 7.49241 18.901 7.28841 18.953L7.25341 18.961L5.45941 19.41C5.239 19.4662 5.04663 19.6008 4.91834 19.7887C4.79005 19.9765 4.73463 20.2047 4.76247 20.4304C4.79031 20.6562 4.89949 20.8641 5.06956 21.0151C5.23964 21.1662 5.45895 21.25 5.68641 21.251H6.37041C7.91641 21.251 9.42041 20.75 10.6574 19.822L12.5504 18.4C12.6292 18.3409 12.7189 18.2979 12.8143 18.2735C12.9097 18.249 13.009 18.2436 13.1065 18.2575C13.204 18.2715 13.2978 18.3045 13.3825 18.3546C13.4673 18.4048 13.5413 18.4712 13.6004 18.55C13.6595 18.6288 13.7025 18.7185 13.7269 18.8139C13.7514 18.9093 13.7568 19.0086 13.7429 19.1061C13.7289 19.2036 13.696 19.2974 13.6458 19.3821C13.5956 19.4669 13.5292 19.5409 13.4504 19.6L12.5464 20.278L13.0374 20.463C13.5714 20.663 13.8124 20.753 14.0544 20.829C14.7824 21.0566 15.5358 21.1933 16.2974 21.236C16.5504 21.25 16.8074 21.25 17.3774 21.25H18.3164C18.5438 21.2488 18.7629 21.1647 18.9328 21.0136C19.1027 20.8625 19.2117 20.6546 19.2394 20.4289C19.2671 20.2032 19.2117 19.9752 19.0834 19.7875C18.9551 19.5997 18.7628 19.4652 18.5424 19.409L17.0694 19.04C17.0421 19.0333 17.0148 19.0267 16.9874 19.02C16.5114 18.901 16.1364 18.808 15.8014 18.614C15.7008 18.5562 15.6039 18.4921 15.5114 18.422C15.2034 18.188 14.9714 17.879 14.6784 17.486L14.6274 17.419L13.9004 16.45C13.8413 16.3712 13.7983 16.2815 13.7739 16.1861C13.7494 16.0907 13.744 15.9914 13.758 15.8939C13.7719 15.7964 13.8049 15.7026 13.8551 15.6179C13.9052 15.5331 13.9716 15.4591 14.0504 15.4C14.1292 15.3409 14.2189 15.2979 14.3143 15.2735C14.4097 15.249 14.509 15.2436 14.6065 15.2575C14.704 15.2715 14.7978 15.3045 14.8825 15.3546C14.9673 15.4048 15.0413 15.4712 15.1004 15.55L15.8274 16.519C16.1954 17.01 16.2984 17.137 16.4184 17.228C16.4604 17.259 16.5044 17.288 16.5504 17.315C16.6804 17.39 16.8374 17.436 17.4334 17.585L18.9064 17.953C19.4826 18.0974 19.9862 18.4474 20.3223 18.9371C20.6585 19.4269 20.804 20.0227 20.7314 20.6122C20.6589 21.2018 20.3734 21.7446 19.9286 22.1383C19.4838 22.532 18.9104 22.7496 18.3164 22.75H17.3534C16.8144 22.75 16.5134 22.75 16.2134 22.733C15.3282 22.6834 14.4526 22.5245 13.6064 22.26C13.3204 22.17 13.0394 22.065 12.5344 21.876L11.1024 21.339C9.69552 22.2596 8.05072 22.7499 6.36941 22.75H5.68541C5.09139 22.7496 4.51802 22.532 4.07322 22.1383C3.62843 21.7446 3.3429 21.2018 3.27038 20.6122C3.19787 20.0227 3.34337 19.4269 3.6795 18.9371C4.01563 18.4474 4.5192 18.0974 5.09541 17.953L6.88841 17.505C7.14341 17.441 7.21241 17.423 7.27241 17.4C7.44541 17.334 7.60241 17.23 7.73041 17.096C7.77441 17.049 7.81841 16.994 7.97641 16.783L8.90141 15.551Z"
                      fill="url(#paint0_linear_4943_26709)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_4943_26709"
                        x1="1.49997"
                        y1="14.9734"
                        x2="22.4072"
                        y2="14.9765"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 25 36"
                    fill="none"
                  >
                    <path
                      d="M21.6479 35.9998H3.35148C1.92984 35.9998 0.777344 34.8474 0.777344 33.4257C0.777344 32.0041 1.92984 30.8516 3.35148 30.8516H21.6479C23.0696 30.8516 24.2221 32.0041 24.2221 33.4257C24.2221 34.8474 23.0696 35.9998 21.6479 35.9998Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M24.222 33.4256C24.222 34.1366 23.9339 34.78 23.4681 35.2457C23.0024 35.7115 22.3583 35.9996 21.6473 35.9996H20.6787C21.1687 35.8862 21.6066 35.6373 21.9504 35.2936C22.4282 34.8157 22.7242 34.1553 22.7242 33.4256C22.7242 32.1725 21.8505 31.1219 20.6787 30.8516H21.6473C23.0695 30.8515 24.222 32.0041 24.222 33.4256Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M20.6127 30.8516H4.3877C4.3877 31.8532 5.19966 32.6651 6.20127 32.6651H18.7991C19.8008 32.6651 20.6127 31.8532 20.6127 30.8516Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M20.7128 28.2324L20.0454 22.4879C19.8569 20.8656 18.851 19.4821 17.4224 18.8803L15.7041 18.1565C15.1037 17.9036 14.7094 17.2863 14.7094 16.5994L14.7175 14.6953H10.2826L10.2907 16.5994C10.2907 17.2864 9.89639 17.9037 9.29606 18.1565L7.57776 18.8803C6.14908 19.4821 5.14319 20.8656 4.95475 22.4879L4.28735 28.2324C4.08865 29.9425 5.34253 31.4514 6.96218 31.4514H18.0379C19.6576 31.4515 20.9114 29.9425 20.7128 28.2324Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M20.7123 28.2325L20.0447 22.4881C19.8564 20.8662 18.85 19.4825 17.4214 18.8806L15.7033 18.1567C15.1027 17.9042 14.709 17.2865 14.709 16.5997L14.7169 14.6953H13.2862L13.2783 17.3021C13.2783 17.989 13.6727 18.606 14.2732 18.8591L16.1355 19.7807C17.5641 20.3826 18.4257 21.568 18.6147 23.1906L19.2815 28.935C19.3949 29.9128 19.034 30.8244 18.4014 31.4256C19.84 31.2202 20.8956 29.8123 20.7123 28.2325Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M8.70248 22.6055L8.29685 26.9689C8.24475 27.5294 8.65861 28.0154 9.18806 28.0154H12.0857C13.0345 28.0154 13.8037 28.7845 13.8037 29.7333C13.8037 30.6821 13.0345 31.4513 12.0857 31.4513H6.96218C5.34253 31.4513 4.08865 29.9424 4.28735 28.2323L4.95475 22.6055H8.70248Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M14.0742 29.7018C14.083 30.1887 13.8888 30.6302 13.5709 30.9481C13.3056 31.2134 12.9547 31.3925 12.5631 31.4388C12.6181 31.2705 12.648 31.0915 12.648 30.9046C12.648 29.9553 11.8784 29.1864 10.9299 29.1864H8.032C7.50276 29.1864 7.08911 28.7 7.14114 28.1401L7.61174 23.5755C7.66856 23.0244 8.1329 22.6055 8.68689 22.6055H8.97341L8.56757 26.969C8.51554 27.5296 8.92919 28.0153 9.45843 28.0153H12.3172C13.2604 28.0152 14.0572 28.7588 14.0742 29.7018Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M13.2798 29.3784C13.5164 29.2558 13.785 29.1864 14.0697 29.1864H16.9676C17.4968 29.1864 17.9105 28.7 17.8584 28.1401L17.3878 23.5755C17.331 23.0244 16.8667 22.6055 16.3127 22.6055H16.0262L16.432 26.969C16.484 27.5296 16.0704 28.0153 15.5411 28.0153H12.6824C12.2561 28.0153 11.8598 28.1672 11.5518 28.4207L13.2798 29.3784Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M12.4996 16.0441C14.8493 16.0441 16.7541 14.1393 16.7541 11.7896C16.7541 9.43995 14.8493 7.53516 12.4996 7.53516C10.1499 7.53516 8.24512 9.43995 8.24512 11.7896C8.24512 14.1393 10.1499 16.0441 12.4996 16.0441Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M16.7544 11.7903C16.7544 14.1404 14.8493 16.0447 12.5 16.0447C11.5835 16.0447 10.7347 15.7552 10.04 15.2623C10.413 15.3693 10.8075 15.4264 11.2147 15.4264C13.5649 15.4264 15.4691 13.5213 15.4691 11.172C15.4691 9.73765 14.7602 8.46949 13.6725 7.69922C15.4521 8.20849 16.7544 9.84748 16.7544 11.7903Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M12.4998 5.40886C12.2043 5.40886 11.9648 5.16937 11.9648 4.87392V0.534938C11.9648 0.239484 12.2043 0 12.4998 0C12.7952 0 13.0347 0.239484 13.0347 0.534938V4.87399C13.0347 5.16937 12.7952 5.40886 12.4998 5.40886Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M6.33229 8.97003C6.24152 8.97003 6.14962 8.9469 6.06531 8.89824L2.3076 6.72875C2.05181 6.58102 1.96406 6.25393 2.11178 5.99806C2.25937 5.74227 2.58653 5.65445 2.84247 5.80224L6.60018 7.97173C6.85598 8.11946 6.94373 8.44656 6.796 8.70242C6.697 8.87406 6.51714 8.97003 6.33229 8.97003Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M22.4241 18.2591C22.3333 18.2591 22.2414 18.236 22.1571 18.1873L18.3994 16.0178C18.1436 15.8701 18.0559 15.543 18.2036 15.2871C18.3512 15.0313 18.6783 14.9435 18.9343 15.0913L22.692 17.2608C22.9478 17.4085 23.0355 17.7356 22.8878 17.9915C22.7887 18.1631 22.6089 18.2591 22.4241 18.2591Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M21.7905 12.5308H19.6209C19.3254 12.5308 19.0859 12.2913 19.0859 11.9959C19.0859 11.7004 19.3254 11.4609 19.6209 11.4609H21.7905C22.086 11.4609 22.3254 11.7004 22.3254 11.9959C22.3254 12.2913 22.086 12.5308 21.7905 12.5308Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M5.37937 12.5308H3.20974C2.91429 12.5308 2.6748 12.2913 2.6748 11.9959C2.6748 11.7004 2.91429 11.4609 3.20974 11.4609H5.37937C5.67483 11.4609 5.91431 11.7004 5.91431 11.9959C5.91431 12.2913 5.67483 12.5308 5.37937 12.5308Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M2.57551 18.259C2.39066 18.259 2.2108 18.1631 2.1118 17.9915C1.96407 17.7356 2.05175 17.4085 2.30762 17.2608L6.06533 15.0913C6.32098 14.9435 6.64836 15.0313 6.79602 15.2871C6.94374 15.543 6.85606 15.8702 6.60019 16.0178L2.84248 18.1873C2.75832 18.2359 2.66628 18.259 2.57551 18.259Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18.6673 8.96998C18.4825 8.96998 18.3026 8.874 18.2036 8.70244C18.0559 8.44657 18.1435 8.11941 18.3994 7.97175L22.1571 5.80226C22.4128 5.65446 22.7402 5.74221 22.8878 5.99808C23.0355 6.25395 22.9479 6.58111 22.692 6.72877L18.9343 8.89826C18.85 8.94691 18.758 8.96998 18.6673 8.96998Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M16.0599 6.36412C15.9692 6.36412 15.8772 6.34099 15.793 6.29234C15.5372 6.14461 15.4494 5.81744 15.5971 5.56165L16.9983 3.13481C17.146 2.87887 17.4733 2.7912 17.729 2.93899C17.9848 3.08672 18.0726 3.41388 17.9248 3.66968L16.5236 6.09652C16.4246 6.26815 16.2448 6.36412 16.0599 6.36412Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M8.93959 6.36401C8.75473 6.36401 8.57495 6.26803 8.47588 6.09647L7.07469 3.66963C6.92696 3.41384 7.01464 3.08667 7.27051 2.93895C7.52623 2.79122 7.8534 2.8789 8.0012 3.13477L9.40238 5.5616C9.55011 5.8174 9.46243 6.14456 9.20656 6.29229C9.1224 6.3408 9.03036 6.36401 8.93959 6.36401Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={` ${singleCategory === "Meditation" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] font-bold leading-normal`}
                >
                  MEDITATION
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Yoga"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Yoga")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Yoga" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M21.7499 7.5C21.7499 8.49456 21.3549 9.44839 20.6516 10.1517C19.9483 10.8549 18.9945 11.25 17.9999 11.25C17.0054 11.25 16.0516 10.8549 15.3483 10.1517C14.645 9.44839 14.2499 8.49456 14.2499 7.5C14.2499 6.50544 14.645 5.55161 15.3483 4.84835C16.0516 4.14509 17.0054 3.75 17.9999 3.75C18.9945 3.75 19.9483 4.14509 20.6516 4.84835C21.3549 5.55161 21.7499 6.50544 21.7499 7.5ZM23.2499 32.25C23.2499 32.4489 23.1709 32.6397 23.0303 32.7803C22.8896 32.921 22.6989 33 22.4999 33H9.64195C9.17634 33 8.72342 32.8483 8.35176 32.5678C7.9801 32.2873 7.70994 31.8934 7.5822 31.4457C7.45445 30.9979 7.47608 30.5208 7.64379 30.0864C7.81151 29.6521 8.11619 29.2842 8.5117 29.0385L12.4747 26.577C12.7997 26.3751 13.0679 26.0937 13.2538 25.7593C13.4398 25.4249 13.5374 25.0486 13.5374 24.666V24H15.3179C16.1135 23.9998 16.8765 23.6836 17.4389 23.121L17.9999 22.5607L18.5602 23.121C18.8389 23.3998 19.1698 23.6209 19.534 23.7717C19.8982 23.9225 20.2885 24.0001 20.6827 24H22.4999V24.669C22.5001 25.0505 22.5972 25.4257 22.7822 25.7593C22.9672 26.0929 23.2339 26.3741 23.5574 26.5763L27.4919 29.0355C27.8872 29.2823 28.1913 29.651 28.3584 30.086C28.5254 30.5209 28.5463 30.9985 28.4179 31.4463C28.2894 31.8942 28.0186 32.2881 27.6464 32.5684C27.2742 32.8487 26.8209 33.0002 26.3549 33H24.6224C24.705 32.7652 24.7499 32.5125 24.7499 32.25V32.0625C24.7499 31.5175 24.552 30.9911 24.1931 30.581C23.8342 30.1709 23.3386 29.9051 22.7984 29.8328L12.8872 28.5067C12.6916 28.4835 12.4948 28.5381 12.3391 28.6588C12.1835 28.7795 12.0816 28.9566 12.0554 29.1518C12.0292 29.3469 12.0808 29.5446 12.1991 29.7021C12.3174 29.8595 12.4929 29.9641 12.6877 29.9933L22.5997 31.3192C22.7797 31.3434 22.9448 31.4321 23.0644 31.5687C23.184 31.7054 23.2499 31.8809 23.2499 32.0625V32.25ZM19.6214 22.0605L18.7499 21.189V18.3825C18.8609 18.447 18.9659 18.5265 19.0604 18.621L20.4697 20.031C20.6104 20.1714 20.8012 20.2502 20.9999 20.25H23.2499C23.3777 20.2499 23.5034 20.2172 23.615 20.1549C23.7266 20.0927 23.8204 20.0029 23.8876 19.8942C23.9548 19.7855 23.993 19.6614 23.9988 19.5337C24.0045 19.4061 23.9776 19.2791 23.9204 19.1647L23.1704 17.6647C23.1283 17.5736 23.0683 17.4918 22.994 17.4242C22.9197 17.3567 22.8325 17.3047 22.7377 17.2715C22.6429 17.2383 22.5424 17.2244 22.4422 17.2308C22.342 17.2371 22.244 17.2635 22.1542 17.3084C22.0643 17.3534 21.9844 17.4159 21.9192 17.4923C21.854 17.5686 21.8048 17.6574 21.7745 17.7531C21.7442 17.8489 21.7335 17.9498 21.7429 18.0498C21.7523 18.1498 21.7818 18.2468 21.8294 18.3353L22.0364 18.75H21.3104L20.1209 17.5605C19.5584 16.9981 18.7954 16.6821 17.9999 16.6821C17.2045 16.6821 16.4415 16.9981 15.8789 17.5605L14.6894 18.75H13.9634L14.1704 18.3353C14.2181 18.2468 14.2476 18.1498 14.257 18.0498C14.2664 17.9498 14.2557 17.8489 14.2254 17.7531C14.1951 17.6574 14.1459 17.5686 14.0807 17.4923C14.0155 17.4159 13.9356 17.3534 13.8457 17.3084C13.7559 17.2635 13.6579 17.2371 13.5577 17.2308C13.4575 17.2244 13.357 17.2383 13.2622 17.2715C13.1674 17.3047 13.0802 17.3567 13.0059 17.4242C12.9316 17.4918 12.8716 17.5736 12.8294 17.6647L12.0794 19.1647C12.0223 19.2791 11.9954 19.4061 12.0011 19.5337C12.0069 19.6614 12.0451 19.7855 12.1123 19.8942C12.1795 20.0029 12.2733 20.0927 12.3849 20.1549C12.4965 20.2172 12.6222 20.2499 12.7499 20.25H14.9999C15.1988 20.25 15.3896 20.1709 15.5302 20.0303L16.9394 18.621C17.0347 18.5265 17.1389 18.447 17.2499 18.3825V21.189L16.3784 22.0605C16.0972 22.3418 15.7157 22.4999 15.3179 22.5H10.7894C10.5455 22.5 10.3053 22.4405 10.0895 22.3267C9.87381 22.2129 9.68908 22.0482 9.55136 21.8469C9.41365 21.6456 9.32711 21.4137 9.29924 21.1714C9.27138 20.929 9.30303 20.6836 9.39145 20.4562L11.6444 14.6625C11.8636 14.0991 12.2478 13.6151 12.7467 13.2739C13.2456 12.9326 13.836 12.75 14.4404 12.75H21.5594C22.1639 12.75 22.7543 12.9326 23.2532 13.2739C23.7521 13.6151 24.1363 14.0991 24.3554 14.6625L26.6092 20.4562C26.6977 20.6837 26.7293 20.9293 26.7014 21.1717C26.6734 21.4142 26.5867 21.6461 26.4489 21.8475C26.311 22.0489 26.126 22.2135 25.9101 22.3272C25.6942 22.4409 25.4537 22.5002 25.2097 22.5H20.6812C20.2834 22.4999 19.9019 22.3418 19.6207 22.0605"
                      fill="url(#paint0_linear_7678_44386)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_7678_44386"
                        x1="6.69227"
                        y1="22.4202"
                        x2="29.2078"
                        y2="22.4228"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M21.7499 7.5C21.7499 8.49456 21.3549 9.44839 20.6516 10.1517C19.9483 10.8549 18.9945 11.25 17.9999 11.25C17.0054 11.25 16.0516 10.8549 15.3483 10.1517C14.645 9.44839 14.2499 8.49456 14.2499 7.5C14.2499 6.50544 14.645 5.55161 15.3483 4.84835C16.0516 4.14509 17.0054 3.75 17.9999 3.75C18.9945 3.75 19.9483 4.14509 20.6516 4.84835C21.3549 5.55161 21.7499 6.50544 21.7499 7.5ZM23.2499 32.25C23.2499 32.4489 23.1709 32.6397 23.0303 32.7803C22.8896 32.921 22.6989 33 22.4999 33H9.64195C9.17634 33 8.72342 32.8483 8.35176 32.5678C7.9801 32.2873 7.70994 31.8934 7.5822 31.4457C7.45445 30.9979 7.47608 30.5208 7.64379 30.0864C7.81151 29.6521 8.11619 29.2842 8.5117 29.0385L12.4747 26.577C12.7997 26.3751 13.0679 26.0937 13.2538 25.7593C13.4398 25.4249 13.5374 25.0486 13.5374 24.666V24H15.3179C16.1135 23.9998 16.8765 23.6836 17.4389 23.121L17.9999 22.5607L18.5602 23.121C18.8389 23.3998 19.1698 23.6209 19.534 23.7717C19.8982 23.9225 20.2885 24.0001 20.6827 24H22.4999V24.669C22.5001 25.0505 22.5972 25.4257 22.7822 25.7593C22.9672 26.0929 23.2339 26.3741 23.5574 26.5763L27.4919 29.0355C27.8872 29.2823 28.1913 29.651 28.3584 30.086C28.5254 30.5209 28.5463 30.9985 28.4179 31.4463C28.2894 31.8942 28.0186 32.2881 27.6464 32.5684C27.2742 32.8487 26.8209 33.0002 26.3549 33H24.6224C24.705 32.7652 24.7499 32.5125 24.7499 32.25V32.0625C24.7499 31.5175 24.552 30.9911 24.1931 30.581C23.8342 30.1709 23.3386 29.9051 22.7984 29.8328L12.8872 28.5067C12.6916 28.4835 12.4948 28.5381 12.3391 28.6588C12.1835 28.7795 12.0816 28.9566 12.0554 29.1518C12.0292 29.3469 12.0808 29.5446 12.1991 29.7021C12.3174 29.8595 12.4929 29.9641 12.6877 29.9933L22.5997 31.3192C22.7797 31.3434 22.9448 31.4321 23.0644 31.5687C23.184 31.7054 23.2499 31.8809 23.2499 32.0625V32.25ZM19.6214 22.0605L18.7499 21.189V18.3825C18.8609 18.447 18.9659 18.5265 19.0604 18.621L20.4697 20.031C20.6104 20.1714 20.8012 20.2502 20.9999 20.25H23.2499C23.3777 20.2499 23.5034 20.2172 23.615 20.1549C23.7266 20.0927 23.8204 20.0029 23.8876 19.8942C23.9548 19.7855 23.993 19.6614 23.9988 19.5337C24.0045 19.4061 23.9776 19.2791 23.9204 19.1647L23.1704 17.6647C23.1283 17.5736 23.0683 17.4918 22.994 17.4242C22.9197 17.3567 22.8325 17.3047 22.7377 17.2715C22.6429 17.2383 22.5424 17.2244 22.4422 17.2308C22.342 17.2371 22.244 17.2635 22.1542 17.3084C22.0643 17.3534 21.9844 17.4159 21.9192 17.4923C21.854 17.5686 21.8048 17.6574 21.7745 17.7531C21.7442 17.8489 21.7335 17.9498 21.7429 18.0498C21.7523 18.1498 21.7818 18.2468 21.8294 18.3353L22.0364 18.75H21.3104L20.1209 17.5605C19.5584 16.9981 18.7954 16.6821 17.9999 16.6821C17.2045 16.6821 16.4415 16.9981 15.8789 17.5605L14.6894 18.75H13.9634L14.1704 18.3353C14.2181 18.2468 14.2476 18.1498 14.257 18.0498C14.2664 17.9498 14.2557 17.8489 14.2254 17.7531C14.1951 17.6574 14.1459 17.5686 14.0807 17.4923C14.0155 17.4159 13.9356 17.3534 13.8457 17.3084C13.7559 17.2635 13.6579 17.2371 13.5577 17.2308C13.4575 17.2244 13.357 17.2383 13.2622 17.2715C13.1674 17.3047 13.0802 17.3567 13.0059 17.4242C12.9316 17.4918 12.8716 17.5736 12.8294 17.6647L12.0794 19.1647C12.0223 19.2791 11.9954 19.4061 12.0011 19.5337C12.0069 19.6614 12.0451 19.7855 12.1123 19.8942C12.1795 20.0029 12.2733 20.0927 12.3849 20.1549C12.4965 20.2172 12.6222 20.2499 12.7499 20.25H14.9999C15.1988 20.25 15.3896 20.1709 15.5302 20.0303L16.9394 18.621C17.0347 18.5265 17.1389 18.447 17.2499 18.3825V21.189L16.3784 22.0605C16.0972 22.3418 15.7157 22.4999 15.3179 22.5H10.7894C10.5455 22.5 10.3053 22.4405 10.0895 22.3267C9.87381 22.2129 9.68908 22.0482 9.55136 21.8469C9.41365 21.6456 9.32711 21.4137 9.29924 21.1714C9.27138 20.929 9.30303 20.6836 9.39145 20.4562L11.6444 14.6625C11.8636 14.0991 12.2478 13.6151 12.7467 13.2739C13.2456 12.9326 13.836 12.75 14.4404 12.75H21.5594C22.1639 12.75 22.7543 12.9326 23.2532 13.2739C23.7521 13.6151 24.1363 14.0991 24.3554 14.6625L26.6092 20.4562C26.6977 20.6837 26.7293 20.9293 26.7014 21.1717C26.6734 21.4142 26.5867 21.6461 26.4489 21.8475C26.311 22.0489 26.126 22.2135 25.9101 22.3272C25.6942 22.4409 25.4537 22.5002 25.2097 22.5H20.6812C20.2834 22.4999 19.9019 22.3418 19.6207 22.0605"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={` ${singleCategory === "Yoga" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  YOGA
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Lifestyle"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Lifestyle")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Lifestyle" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 32 30"
                    fill="none"
                  >
                    <path
                      d="M15.616 5.74938L13.0422 3.17557L13.0422 3.17557L13.0408 3.17417C12.4299 2.56808 12.4279 1.57379 13.0422 0.959417L13.0422 0.959417C13.6509 0.350727 14.6357 0.346356 15.2485 0.949464L15.5992 1.29467L15.95 0.949464C16.5627 0.346356 17.5475 0.350727 18.1562 0.959417L18.5064 0.609231L18.1562 0.959417C18.7628 1.56603 18.7651 2.55123 18.1657 3.16621C18.1654 3.16651 18.1651 3.16681 18.1648 3.16712L15.616 5.74938Z"
                      fill="url(#paint0_linear_8279_39364)"
                      stroke="url(#paint1_linear_8279_39364)"
                    />
                    <path
                      d="M28.1287 13.6159L28.207 12.7204C28.2496 12.2343 28.3816 11.5121 28.8141 10.9036L29.2216 11.1933L28.8138 10.904C28.8576 10.8423 28.8431 10.7569 28.7817 10.7132C28.7189 10.6686 28.634 10.6839 28.5909 10.7448L28.5905 10.7453C28.1152 11.4142 27.9633 12.2252 27.9239 12.806L27.8724 13.5645L27.1963 13.2167C26.8697 13.0486 26.5471 12.9997 26.2466 13.0692L28.1287 13.6159ZM28.1287 13.6159L28.9308 13.2102M28.1287 13.6159L28.9308 13.2102M28.9308 13.2102C29.253 13.0472 29.5716 13.0004 29.8691 13.0692L28.9308 13.2102ZM27.8094 18.2201L28.0579 18.0779L28.3063 18.2202C28.4201 18.2853 28.5315 18.3315 28.6445 18.3576C29.082 18.4589 29.5761 18.3184 30.0328 17.9235C30.4892 17.529 30.8758 16.9023 31.0547 16.1298L27.8094 18.2201ZM27.8094 18.2201C27.6956 18.2853 27.5841 18.3315 27.4712 18.3576C27.0337 18.4589 26.5396 18.3184 26.0828 17.9235C25.6264 17.529 25.2399 16.9023 25.061 16.1298M27.8094 18.2201L25.061 16.1298M25.061 16.1298C24.8821 15.3572 24.9539 14.6244 25.1904 14.0694M25.061 16.1298L25.1904 14.0694M25.1904 14.0694C25.4271 13.514 25.8091 13.1706 26.2466 13.0692L25.1904 14.0694Z"
                      fill="url(#paint2_linear_8279_39364)"
                      stroke="url(#paint3_linear_8279_39364)"
                    />
                    <path
                      d="M4.85287 15.4281C4.87675 15.425 4.90078 15.4217 4.92493 15.4184L4.64644 18.2537H1.63656L1.33622 15.1701C1.41246 15.1486 1.49297 15.1296 1.57505 15.115C1.80049 15.0751 1.99797 15.0761 2.14329 15.119L2.14329 15.119L2.14438 15.1193C2.83491 15.3213 3.81399 15.5562 4.84884 15.4286L4.84884 15.4286L4.85287 15.4281Z"
                      fill="url(#paint4_linear_8279_39364)"
                      stroke="url(#paint5_linear_8279_39364)"
                    />
                    <path
                      d="M5.15455 13.0511C4.97087 13.1064 4.77472 13.1472 4.57192 13.1737C3.98039 13.2429 3.33427 13.0925 2.78537 12.9349C2.19292 12.7621 1.60365 12.7903 1.11251 12.883L1.05168 12.2656H5.2334L5.15455 13.0511Z"
                      fill="url(#paint6_linear_8279_39364)"
                      stroke="url(#paint7_linear_8279_39364)"
                    />
                    <path
                      d="M17.5545 27.052H18.0433L18.0544 26.5633C18.0623 26.2151 18.3452 25.9375 18.6922 25.9375C19.0458 25.9375 19.3324 26.2241 19.3324 26.5777V28.8582C19.3324 29.2118 19.0458 29.4985 18.6922 29.4985C18.3452 29.4985 18.0623 29.2209 18.0544 28.8727L18.0433 28.384H17.5545H13.6451H13.1563L13.1452 28.8727C13.1373 29.2209 12.8544 29.4985 12.5074 29.4985C12.1538 29.4985 11.8672 29.2118 11.8672 28.8582V26.5777C11.8672 26.2241 12.1538 25.9375 12.5074 25.9375C12.8544 25.9375 13.1373 26.2151 13.1452 26.5633L13.1563 27.052H13.6451H17.5545Z"
                      fill="url(#paint8_linear_8279_39364)"
                      stroke="url(#paint9_linear_8279_39364)"
                    />
                    <path
                      d="M4.2178 10.1964L4.21653 10.1958C4.1481 10.1646 4.11783 10.0835 4.14927 10.0149L4.14937 10.0147C5.43707 7.2003 7.70539 4.96862 10.5366 3.73052L10.5373 3.73022C10.6056 3.70019 10.6868 3.73188 10.7167 3.80043L10.7169 3.80101C10.7473 3.87036 10.7157 3.95083 10.6466 3.98107L10.6465 3.98109C7.8767 5.19256 5.65764 7.37611 4.39813 10.1285L4.3981 10.1286C4.37533 10.1783 4.326 10.2088 4.27343 10.2088C4.25528 10.2088 4.23657 10.2051 4.2178 10.1964Z"
                      fill="url(#paint10_linear_8279_39364)"
                      stroke="url(#paint11_linear_8279_39364)"
                    />
                    <path
                      d="M26.7659 20.4587L26.7659 20.4586C26.7977 20.3898 26.8792 20.3601 26.9476 20.3917L27.1574 19.9378L26.9473 20.3915C27.0163 20.4234 27.0456 20.5048 27.0141 20.5726L27.0138 20.5733C25.9867 22.7959 24.3353 24.6595 22.2364 25.9627L22.2361 25.9629C22.2137 25.9768 22.1895 25.9832 22.1649 25.9832C22.1176 25.9832 22.0736 25.9597 22.048 25.9185L22.048 25.9185C22.0081 25.8543 22.0279 25.7699 22.0921 25.7301L22.0922 25.73C24.1436 24.4562 25.7599 22.6332 26.7659 20.4587Z"
                      fill="url(#paint12_linear_8279_39364)"
                      stroke="url(#paint13_linear_8279_39364)"
                    />
                    <path
                      d="M9.10371 25.7276L9.10361 25.7276C7.02974 24.4385 5.40172 22.5936 4.39821 20.3927L9.10371 25.7276ZM9.10371 25.7276C9.16769 25.7674 9.1876 25.8514 9.14747 25.916C9.12178 25.9572 9.07781 25.9806 9.03077 25.9806C9.00585 25.9806 8.98202 25.9741 8.96023 25.9605L8.95916 25.9598C6.83683 24.6408 5.1744 22.755 4.14936 20.5064L4.14929 20.5063M9.10371 25.7276L4.14929 20.5063M4.14929 20.5063C4.11779 20.4372 4.14816 20.3564 4.21679 20.3251L4.00943 19.8701L4.14929 20.5063Z"
                      fill="url(#paint14_linear_8279_39364)"
                      stroke="url(#paint15_linear_8279_39364)"
                    />
                    <path
                      d="M26.9767 10.1937L26.9778 10.1931C27.0459 10.162 27.0766 10.081 27.045 10.0116C25.7596 7.20063 23.4894 4.97007 20.6527 3.72995L20.8529 3.27181L20.6537 3.7304C20.5833 3.69983 20.5026 3.73229 20.4727 3.80078L20.4725 3.8012C20.4425 3.86973 20.4737 3.95062 20.5432 3.98106L26.9767 10.1937ZM26.9767 10.1937C26.9588 10.2019 26.9402 10.2057 26.9213 10.2057C26.8677 10.2057 26.819 10.1752 26.7964 10.1258C25.5386 7.37612 23.3177 5.19366 20.5432 3.9811L26.9767 10.1937Z"
                      fill="url(#paint16_linear_8279_39364)"
                      stroke="url(#paint17_linear_8279_39364)"
                    />
                    <path
                      d="M21.0169 19.9197V22.0882H19.9406V20.3146C19.9406 19.6882 19.4302 19.1777 18.8037 19.1777C18.1773 19.1777 17.6669 19.6882 17.6669 20.3146V22.0882H13.5336V20.3146C13.5336 19.6882 13.0231 19.1777 12.3967 19.1777C11.7607 19.1777 11.2598 19.6914 11.2598 20.3146V22.0882H10.1836V19.9197C10.1836 17.8864 11.775 16.2353 13.7839 16.1398H13.8025L13.811 16.139C13.8178 16.1387 13.8258 16.1382 13.8348 16.1373L15.2863 15.999L14.0553 15.2175C13.2438 14.7023 12.706 13.805 12.706 12.7797C12.706 11.182 14.0013 9.88672 15.5991 9.88672C17.1968 9.88672 18.4921 11.1819 18.4921 12.7797C18.4921 13.8049 17.9544 14.7022 17.1429 15.2174L15.8953 16.0096L17.3676 16.1376C17.3756 16.1383 17.3829 16.1388 17.3891 16.1391L17.3972 16.1398H17.4165C19.4254 16.2353 21.0169 17.8864 21.0169 19.9197Z"
                      fill="url(#paint18_linear_8279_39364)"
                      stroke="url(#paint19_linear_8279_39364)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_39364"
                        x1="11.8116"
                        y1="4.12264"
                        x2="19.3499"
                        y2="4.12397"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_39364"
                        x1="11.8116"
                        y1="4.12264"
                        x2="19.3499"
                        y2="4.12397"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_39364"
                        x1="24.1843"
                        y1="15.742"
                        x2="31.8968"
                        y2="15.7431"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_39364"
                        x1="24.1843"
                        y1="15.742"
                        x2="31.8968"
                        y2="15.7431"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_8279_39364"
                        x1="0.620495"
                        y1="17.2462"
                        x2="5.64598"
                        y2="17.2471"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_8279_39364"
                        x1="0.620495"
                        y1="17.2462"
                        x2="5.64598"
                        y2="17.2471"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_8279_39364"
                        x1="0.296688"
                        y1="12.9945"
                        x2="5.96402"
                        y2="12.997"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_8279_39364"
                        x1="0.296688"
                        y1="12.9945"
                        x2="5.96402"
                        y2="12.997"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_8279_39364"
                        x1="11.0416"
                        y1="28.3488"
                        x2="20.1173"
                        y2="28.3515"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_8279_39364"
                        x1="11.0416"
                        y1="28.3488"
                        x2="20.1173"
                        y2="28.3515"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_8279_39364"
                        x1="3.34472"
                        y1="7.99963"
                        x2="11.4841"
                        y2="8.00097"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_8279_39364"
                        x1="3.34472"
                        y1="7.99963"
                        x2="11.4841"
                        y2="8.00097"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_8279_39364"
                        x1="21.2966"
                        y1="24.0944"
                        x2="27.7288"
                        y2="24.0954"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_8279_39364"
                        x1="21.2966"
                        y1="24.0944"
                        x2="27.7288"
                        y2="24.0954"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_8279_39364"
                        x1="3.40474"
                        y1="24.0687"
                        x2="9.87129"
                        y2="24.0697"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_8279_39364"
                        x1="3.40474"
                        y1="24.0687"
                        x2="9.87129"
                        y2="24.0697"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_8279_39364"
                        x1="19.6688"
                        y1="7.99767"
                        x2="27.8132"
                        y2="7.99901"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_8279_39364"
                        x1="19.6688"
                        y1="7.99767"
                        x2="27.8132"
                        y2="7.99901"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_8279_39364"
                        x1="9.22847"
                        y1="17.8132"
                        x2="21.9151"
                        y2="17.8151"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_8279_39364"
                        x1="9.22847"
                        y1="17.8132"
                        x2="21.9151"
                        y2="17.8151"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 32 30"
                    fill="none"
                  >
                    <path
                      d="M15.616 5.74938L13.0422 3.17557L13.0422 3.17557L13.0408 3.17417C12.4299 2.56808 12.4279 1.57379 13.0422 0.959417L13.0422 0.959417C13.6509 0.350727 14.6357 0.346356 15.2485 0.949464L15.5992 1.29467L15.95 0.949464C16.5627 0.346356 17.5475 0.350727 18.1562 0.959417L18.5064 0.609231L18.1562 0.959417C18.7628 1.56603 18.7651 2.55123 18.1657 3.16621C18.1654 3.16651 18.1651 3.16681 18.1648 3.16712L15.616 5.74938Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M28.1287 13.6159L28.207 12.7204C28.2496 12.2343 28.3816 11.5121 28.8141 10.9036L29.2216 11.1933L28.8138 10.904C28.8576 10.8423 28.8431 10.7569 28.7817 10.7132C28.7189 10.6686 28.634 10.6839 28.5909 10.7448L28.5905 10.7453C28.1152 11.4142 27.9633 12.2252 27.9239 12.806L27.8724 13.5645L27.1963 13.2167C26.8697 13.0486 26.5471 12.9997 26.2466 13.0692L28.1287 13.6159ZM28.1287 13.6159L28.9308 13.2102M28.1287 13.6159L28.9308 13.2102M28.9308 13.2102C29.253 13.0472 29.5716 13.0004 29.8691 13.0692L28.9308 13.2102ZM27.8094 18.2201L28.0579 18.0779L28.3063 18.2202C28.4201 18.2853 28.5315 18.3315 28.6445 18.3576C29.082 18.4589 29.5761 18.3184 30.0328 17.9235C30.4892 17.529 30.8758 16.9023 31.0547 16.1298L27.8094 18.2201ZM27.8094 18.2201C27.6956 18.2853 27.5841 18.3315 27.4712 18.3576C27.0337 18.4589 26.5396 18.3184 26.0828 17.9235C25.6264 17.529 25.2399 16.9023 25.061 16.1298M27.8094 18.2201L25.061 16.1298M25.061 16.1298C24.8821 15.3572 24.9539 14.6244 25.1904 14.0694M25.061 16.1298L25.1904 14.0694M25.1904 14.0694C25.4271 13.514 25.8091 13.1706 26.2466 13.0692L25.1904 14.0694Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M4.85287 15.4281C4.87675 15.425 4.90078 15.4217 4.92493 15.4184L4.64644 18.2537H1.63656L1.33622 15.1701C1.41246 15.1486 1.49297 15.1296 1.57505 15.115C1.80049 15.0751 1.99797 15.0761 2.14329 15.119L2.14329 15.119L2.14438 15.1193C2.83491 15.3213 3.81399 15.5562 4.84884 15.4286L4.84884 15.4286L4.85287 15.4281Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M5.15455 13.0511C4.97087 13.1064 4.77472 13.1472 4.57192 13.1737C3.98039 13.2429 3.33427 13.0925 2.78537 12.9349C2.19292 12.7621 1.60365 12.7903 1.11251 12.883L1.05168 12.2656H5.2334L5.15455 13.0511Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M17.5545 27.052H18.0433L18.0544 26.5633C18.0623 26.2151 18.3452 25.9375 18.6922 25.9375C19.0458 25.9375 19.3324 26.2241 19.3324 26.5777V28.8582C19.3324 29.2118 19.0458 29.4985 18.6922 29.4985C18.3452 29.4985 18.0623 29.2209 18.0544 28.8727L18.0433 28.384H17.5545H13.6451H13.1563L13.1452 28.8727C13.1373 29.2209 12.8544 29.4985 12.5074 29.4985C12.1538 29.4985 11.8672 29.2118 11.8672 28.8582V26.5777C11.8672 26.2241 12.1538 25.9375 12.5074 25.9375C12.8544 25.9375 13.1373 26.2151 13.1452 26.5633L13.1563 27.052H13.6451H17.5545Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M4.2178 10.1964L4.21653 10.1958C4.1481 10.1646 4.11783 10.0835 4.14927 10.0149L4.14937 10.0147C5.43707 7.2003 7.70539 4.96862 10.5366 3.73052L10.5373 3.73022C10.6056 3.70019 10.6868 3.73188 10.7167 3.80043L10.7169 3.80101C10.7473 3.87036 10.7157 3.95083 10.6466 3.98107L10.6465 3.98109C7.8767 5.19256 5.65764 7.37611 4.39813 10.1285L4.3981 10.1286C4.37533 10.1783 4.326 10.2088 4.27343 10.2088C4.25528 10.2088 4.23657 10.2051 4.2178 10.1964Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M26.7659 20.4587L26.7659 20.4586C26.7977 20.3898 26.8792 20.3601 26.9476 20.3917L27.1574 19.9378L26.9473 20.3915C27.0163 20.4234 27.0456 20.5048 27.0141 20.5726L27.0138 20.5733C25.9867 22.7959 24.3353 24.6595 22.2364 25.9627L22.2361 25.9629C22.2137 25.9768 22.1895 25.9832 22.1649 25.9832C22.1176 25.9832 22.0736 25.9597 22.048 25.9185L22.048 25.9185C22.0081 25.8543 22.0279 25.7699 22.0921 25.7301L22.0922 25.73C24.1436 24.4562 25.7599 22.6332 26.7659 20.4587Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M9.10371 25.7276L9.10361 25.7276C7.02974 24.4385 5.40172 22.5936 4.39821 20.3927L9.10371 25.7276ZM9.10371 25.7276C9.16769 25.7674 9.1876 25.8514 9.14747 25.916C9.12178 25.9572 9.07781 25.9806 9.03077 25.9806C9.00585 25.9806 8.98202 25.9741 8.96023 25.9605L8.95916 25.9598C6.83683 24.6408 5.1744 22.755 4.14936 20.5064L4.14929 20.5063M9.10371 25.7276L4.14929 20.5063M4.14929 20.5063C4.11779 20.4372 4.14816 20.3564 4.21679 20.3251L4.00943 19.8701L4.14929 20.5063Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M26.9767 10.1937L26.9778 10.1931C27.0459 10.162 27.0766 10.081 27.045 10.0116C25.7596 7.20063 23.4894 4.97007 20.6527 3.72995L20.8529 3.27181L20.6537 3.7304C20.5833 3.69983 20.5026 3.73229 20.4727 3.80078L20.4725 3.8012C20.4425 3.86973 20.4737 3.95062 20.5432 3.98106L26.9767 10.1937ZM26.9767 10.1937C26.9588 10.2019 26.9402 10.2057 26.9213 10.2057C26.8677 10.2057 26.819 10.1752 26.7964 10.1258C25.5386 7.37612 23.3177 5.19366 20.5432 3.9811L26.9767 10.1937Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M21.0169 19.9197V22.0882H19.9406V20.3146C19.9406 19.6882 19.4302 19.1777 18.8037 19.1777C18.1773 19.1777 17.6669 19.6882 17.6669 20.3146V22.0882H13.5336V20.3146C13.5336 19.6882 13.0231 19.1777 12.3967 19.1777C11.7607 19.1777 11.2598 19.6914 11.2598 20.3146V22.0882H10.1836V19.9197C10.1836 17.8864 11.775 16.2353 13.7839 16.1398H13.8025L13.811 16.139C13.8178 16.1387 13.8258 16.1382 13.8348 16.1373L15.2863 15.999L14.0553 15.2175C13.2438 14.7023 12.706 13.805 12.706 12.7797C12.706 11.182 14.0013 9.88672 15.5991 9.88672C17.1968 9.88672 18.4921 11.1819 18.4921 12.7797C18.4921 13.8049 17.9544 14.7022 17.1429 15.2174L15.8953 16.0096L17.3676 16.1376C17.3756 16.1383 17.3829 16.1388 17.3891 16.1391L17.3972 16.1398H17.4165C19.4254 16.2353 21.0169 17.8864 21.0169 19.9197Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={` ${singleCategory === "Lifestyle" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  LIFESTYLE
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/General"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("General")}
                className={`flex flex-col items-center justify-center`}
              >
                {singleCategory === "General" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="24"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M18.1875 28.375H24.9375V31.75H18.1875V28.375Z"
                      fill="url(#paint0_linear_8279_39096)"
                    />
                    <path
                      d="M29.6287 19.7064L32.0756 10.5714C32.1036 10.4765 32.1169 10.3779 32.115 10.2789C32.114 10.0213 32.0247 9.77186 31.8619 9.57222C31.6991 9.37258 31.4727 9.23484 31.2206 9.18204C30.9252 9.13618 30.6233 9.20334 30.3752 9.37015C30.1271 9.53695 29.9509 9.79114 29.8819 10.082L28.1437 15.4427L28.1775 15.4933C28.4747 16.0094 28.5556 16.6221 28.4025 17.1977C28.3272 17.4841 28.1953 17.7526 28.0147 17.9874C27.834 18.2221 27.6083 18.4184 27.3506 18.5645L24.1275 20.4264C23.9989 20.4937 23.8494 20.5086 23.71 20.4682C23.5707 20.4278 23.4524 20.3351 23.3798 20.2095C23.3072 20.0839 23.2859 19.9351 23.3204 19.7942C23.3549 19.6533 23.4426 19.5311 23.565 19.4533L26.7881 17.5914C26.9167 17.5183 27.0295 17.4205 27.1203 17.3037C27.211 17.187 27.2778 17.0534 27.3169 16.9108C27.3908 16.6219 27.3505 16.3157 27.2044 16.0558C27.1304 15.9273 27.0318 15.8148 26.9142 15.7246C26.7966 15.6344 26.6623 15.5683 26.5191 15.5301C26.3759 15.492 26.2265 15.4825 26.0796 15.5022C25.9327 15.522 25.7912 15.5705 25.6631 15.6452L20.6962 18.5533C20.1057 18.9029 19.6159 19.3997 19.2747 19.9952C18.9336 20.5907 18.7528 21.2645 18.75 21.9508V27.2495H24.375V26.012C24.3762 25.6152 24.4603 25.2231 24.6221 24.8608C24.7839 24.4985 25.0197 24.174 25.3144 23.9083L29.1225 20.5277C29.3681 20.3094 29.5441 20.0238 29.6287 19.7064Z"
                      fill="url(#paint1_linear_8279_39096)"
                    />
                    <path
                      d="M27.2342 14.6045L28.8036 9.76141C28.931 9.27529 29.2137 8.84408 29.6086 8.53338C30.0036 8.22268 30.4893 8.04949 30.9917 8.04016V8.02891C30.9907 7.77132 30.9014 7.52186 30.7386 7.32222C30.5758 7.12258 30.3495 6.98484 30.0973 6.93204C29.8019 6.88618 29.5 6.95334 29.2519 7.12015C29.0038 7.28695 28.8276 7.54114 28.7586 7.83204L26.4805 14.3908C26.7419 14.4196 26.9966 14.4918 27.2342 14.6045Z"
                      fill="url(#paint2_linear_8279_39096)"
                    />
                    <path
                      d="M3.37302 19.704C3.45616 20.0237 3.63236 20.3114 3.87927 20.5309L7.68176 23.9115C7.97818 24.1761 8.21552 24.5002 8.37834 24.8627C8.54116 25.2252 8.62581 25.6179 8.62676 26.0152V27.2527H14.2518V21.954C14.249 21.2677 14.0682 20.5939 13.727 19.9984C13.3859 19.4029 12.8961 18.9061 12.3055 18.5565L7.33301 15.6427C7.20485 15.5692 7.06347 15.5217 6.91694 15.5028C6.7704 15.484 6.62159 15.4942 6.47899 15.5328C6.33639 15.5715 6.20281 15.6378 6.08586 15.7281C5.96891 15.8184 5.87089 15.9308 5.79739 16.059C5.65129 16.3189 5.61099 16.6251 5.68489 16.914C5.72396 17.0566 5.79077 17.1902 5.8815 17.3069C5.97223 17.4237 6.0851 17.5215 6.21364 17.5946L9.43676 19.4565C9.5592 19.5343 9.64683 19.6564 9.68135 19.7974C9.71586 19.9383 9.6946 20.0871 9.62199 20.2127C9.54939 20.3383 9.43106 20.431 9.29172 20.4714C9.15239 20.5118 9.00282 20.4969 8.87427 20.4296L5.65114 18.5677C5.39351 18.4216 5.16773 18.2253 4.98708 17.9906C4.80644 17.7558 4.67458 17.4873 4.59927 17.2009C4.44615 16.6253 4.52704 16.0126 4.82427 15.4965L4.85802 15.4459L3.13114 10.1134C3.06429 9.81598 2.88731 9.55495 2.63581 9.38276C2.38431 9.21057 2.07694 9.14 1.77552 9.18524C1.52443 9.23917 1.29935 9.37738 1.13767 9.57692C0.975999 9.77645 0.887459 10.0253 0.886765 10.2821C0.885895 10.3806 0.897231 10.4789 0.920516 10.5746L3.37302 19.704Z"
                      fill="url(#paint3_linear_8279_39096)"
                    />
                    <path
                      d="M8.0625 28.375H14.8125V31.75H8.0625V28.375Z"
                      fill="url(#paint4_linear_8279_39096)"
                    />
                    <path
                      d="M2.90047 6.93449C2.64938 6.98842 2.4243 7.12663 2.26263 7.32617C2.10095 7.5257 2.01241 7.77455 2.01172 8.03136V8.04261C2.51859 8.05571 3.00741 8.23352 3.40423 8.54915C3.80105 8.86478 4.08429 9.30106 4.21109 9.79198L5.76922 14.607C6.00682 14.4943 6.26157 14.422 6.52297 14.3932L4.26172 7.87386C4.19521 7.57442 4.01794 7.31119 3.76548 7.13697C3.51302 6.96275 3.20403 6.89042 2.90047 6.93449Z"
                      fill="url(#paint5_linear_8279_39096)"
                    />
                    <path
                      d="M17.0625 6.4375V4.1875H15.9375V6.4375H13.6875V7.5625H15.9375V9.8125H17.0625V7.5625H19.3125V6.4375H17.0625Z"
                      fill="url(#paint6_linear_8279_39096)"
                    />
                    <path
                      d="M20.4785 0.363392C19.8876 0.361302 19.3023 0.476859 18.7565 0.703326C18.2108 0.929793 17.7156 1.26264 17.2998 1.68245L16.8993 2.08295C16.7938 2.18841 16.6508 2.24765 16.5016 2.24765C16.3524 2.24765 16.2094 2.18841 16.1039 2.08295L15.7045 1.68358C15.2869 1.26505 14.7908 0.933008 14.2447 0.706452C13.6986 0.479897 13.1132 0.363281 12.5219 0.363281C11.9307 0.363281 11.3452 0.479897 10.7991 0.706452C10.253 0.933008 9.75691 1.26505 9.33929 1.68358C8.4967 2.52732 8.02344 3.67098 8.02344 4.86339C8.02344 6.0558 8.4967 7.19947 9.33929 8.0432L16.5016 15.2055L23.6639 8.0432C24.2927 7.41355 24.7207 6.61159 24.8938 5.73873C25.0669 4.86586 24.9773 3.96127 24.6364 3.1393C24.2955 2.31734 23.7185 1.61491 22.9784 1.12082C22.2383 0.626718 21.3683 0.363137 20.4785 0.363392ZM20.4391 8.12589C20.4391 8.27508 20.3798 8.41815 20.2744 8.52364C20.1689 8.62913 20.0258 8.68839 19.8766 8.68839H18.1891V10.3759C18.1891 10.5251 18.1298 10.6681 18.0244 10.7736C17.9189 10.8791 17.7758 10.9384 17.6266 10.9384H15.3766C15.2274 10.9384 15.0843 10.8791 14.9789 10.7736C14.8734 10.6681 14.8141 10.5251 14.8141 10.3759V8.68839H13.1266C12.9774 8.68839 12.8343 8.62913 12.7289 8.52364C12.6234 8.41815 12.5641 8.27508 12.5641 8.12589V5.87589C12.5641 5.72671 12.6234 5.58363 12.7289 5.47814C12.8343 5.37266 12.9774 5.31339 13.1266 5.31339H14.8141V3.62589C14.8141 3.47671 14.8734 3.33363 14.9789 3.22814C15.0843 3.12266 15.2274 3.06339 15.3766 3.06339H17.6266C17.7758 3.06339 17.9189 3.12266 18.0244 3.22814C18.1298 3.33363 18.1891 3.47671 18.1891 3.62589V5.31339H19.8766C20.0258 5.31339 20.1689 5.37266 20.2744 5.47814C20.3798 5.58363 20.4391 5.72671 20.4391 5.87589V8.12589Z"
                      fill="url(#paint7_linear_8279_39096)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_39096"
                        x1="17.9279"
                        y1="30.5293"
                        x2="25.1647"
                        y2="30.5316"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_39096"
                        x1="18.236"
                        y1="20.7094"
                        x2="32.565"
                        y2="20.7111"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_39096"
                        x1="26.307"
                        y1="11.8243"
                        x2="31.1436"
                        y2="11.8248"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_39096"
                        x1="0.372679"
                        y1="20.7129"
                        x2="14.7016"
                        y2="20.7146"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_8279_39096"
                        x1="7.80288"
                        y1="30.5293"
                        x2="15.0397"
                        y2="30.5316"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_8279_39096"
                        x1="1.83821"
                        y1="11.8273"
                        x2="6.67481"
                        y2="11.8277"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_8279_39096"
                        x1="13.4712"
                        y1="7.77793"
                        x2="19.5018"
                        y2="7.7789"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_8279_39096"
                        x1="7.37127"
                        y1="9.83705"
                        x2="25.5505"
                        y2="9.84042"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="24"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M18.1875 28.375H24.9375V31.75H18.1875V28.375Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M29.6287 19.7064L32.0756 10.5714C32.1036 10.4765 32.1169 10.3779 32.115 10.2789C32.114 10.0213 32.0247 9.77186 31.8619 9.57222C31.6991 9.37258 31.4727 9.23484 31.2206 9.18204C30.9252 9.13618 30.6233 9.20334 30.3752 9.37015C30.1271 9.53695 29.9509 9.79114 29.8819 10.082L28.1437 15.4427L28.1775 15.4933C28.4747 16.0094 28.5556 16.6221 28.4025 17.1977C28.3272 17.4841 28.1953 17.7526 28.0147 17.9874C27.834 18.2221 27.6083 18.4184 27.3506 18.5645L24.1275 20.4264C23.9989 20.4937 23.8494 20.5086 23.71 20.4682C23.5707 20.4278 23.4524 20.3351 23.3798 20.2095C23.3072 20.0839 23.2859 19.9351 23.3204 19.7942C23.3549 19.6533 23.4426 19.5311 23.565 19.4533L26.7881 17.5914C26.9167 17.5183 27.0295 17.4205 27.1203 17.3037C27.211 17.187 27.2778 17.0534 27.3169 16.9108C27.3908 16.6219 27.3505 16.3157 27.2044 16.0558C27.1304 15.9273 27.0318 15.8148 26.9142 15.7246C26.7966 15.6344 26.6623 15.5683 26.5191 15.5301C26.3759 15.492 26.2265 15.4825 26.0796 15.5022C25.9327 15.522 25.7912 15.5705 25.6631 15.6452L20.6962 18.5533C20.1057 18.9029 19.6159 19.3997 19.2747 19.9952C18.9336 20.5907 18.7528 21.2645 18.75 21.9508V27.2495H24.375V26.012C24.3762 25.6152 24.4603 25.2231 24.6221 24.8608C24.7839 24.4985 25.0197 24.174 25.3144 23.9083L29.1225 20.5277C29.3681 20.3094 29.5441 20.0238 29.6287 19.7064Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M27.2342 14.6045L28.8036 9.76141C28.931 9.27529 29.2137 8.84408 29.6086 8.53338C30.0036 8.22268 30.4893 8.04949 30.9917 8.04016V8.02891C30.9907 7.77132 30.9014 7.52186 30.7386 7.32222C30.5758 7.12258 30.3495 6.98484 30.0973 6.93204C29.8019 6.88618 29.5 6.95334 29.2519 7.12015C29.0038 7.28695 28.8276 7.54114 28.7586 7.83204L26.4805 14.3908C26.7419 14.4196 26.9966 14.4918 27.2342 14.6045Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M3.37302 19.704C3.45616 20.0237 3.63236 20.3114 3.87927 20.5309L7.68176 23.9115C7.97818 24.1761 8.21552 24.5002 8.37834 24.8627C8.54116 25.2252 8.62581 25.6179 8.62676 26.0152V27.2527H14.2518V21.954C14.249 21.2677 14.0682 20.5939 13.727 19.9984C13.3859 19.4029 12.8961 18.9061 12.3055 18.5565L7.33301 15.6427C7.20485 15.5692 7.06347 15.5217 6.91694 15.5028C6.7704 15.484 6.62159 15.4942 6.47899 15.5328C6.33639 15.5715 6.20281 15.6378 6.08586 15.7281C5.96891 15.8184 5.87089 15.9308 5.79739 16.059C5.65129 16.3189 5.61099 16.6251 5.68489 16.914C5.72396 17.0566 5.79077 17.1902 5.8815 17.3069C5.97223 17.4237 6.0851 17.5215 6.21364 17.5946L9.43676 19.4565C9.5592 19.5343 9.64683 19.6564 9.68135 19.7974C9.71586 19.9383 9.6946 20.0871 9.62199 20.2127C9.54939 20.3383 9.43106 20.431 9.29172 20.4714C9.15239 20.5118 9.00282 20.4969 8.87427 20.4296L5.65114 18.5677C5.39351 18.4216 5.16773 18.2253 4.98708 17.9906C4.80644 17.7558 4.67458 17.4873 4.59927 17.2009C4.44615 16.6253 4.52704 16.0126 4.82427 15.4965L4.85802 15.4459L3.13114 10.1134C3.06429 9.81598 2.88731 9.55495 2.63581 9.38276C2.38431 9.21057 2.07694 9.14 1.77552 9.18524C1.52443 9.23917 1.29935 9.37738 1.13767 9.57692C0.975999 9.77645 0.887459 10.0253 0.886765 10.2821C0.885895 10.3806 0.897231 10.4789 0.920516 10.5746L3.37302 19.704Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M8.0625 28.375H14.8125V31.75H8.0625V28.375Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M2.90047 6.93449C2.64938 6.98842 2.4243 7.12663 2.26263 7.32617C2.10095 7.5257 2.01241 7.77455 2.01172 8.03136V8.04261C2.51859 8.05571 3.00741 8.23352 3.40423 8.54915C3.80105 8.86478 4.08429 9.30106 4.21109 9.79198L5.76922 14.607C6.00682 14.4943 6.26157 14.422 6.52297 14.3932L4.26172 7.87386C4.19521 7.57442 4.01794 7.31119 3.76548 7.13697C3.51302 6.96275 3.20403 6.89042 2.90047 6.93449Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M17.0625 6.4375V4.1875H15.9375V6.4375H13.6875V7.5625H15.9375V9.8125H17.0625V7.5625H19.3125V6.4375H17.0625Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M20.4785 0.363392C19.8876 0.361302 19.3023 0.476859 18.7565 0.703326C18.2108 0.929793 17.7156 1.26264 17.2998 1.68245L16.8993 2.08295C16.7938 2.18841 16.6508 2.24765 16.5016 2.24765C16.3524 2.24765 16.2094 2.18841 16.1039 2.08295L15.7045 1.68358C15.2869 1.26505 14.7908 0.933008 14.2447 0.706452C13.6986 0.479897 13.1132 0.363281 12.5219 0.363281C11.9307 0.363281 11.3452 0.479897 10.7991 0.706452C10.253 0.933008 9.75691 1.26505 9.33929 1.68358C8.4967 2.52732 8.02344 3.67098 8.02344 4.86339C8.02344 6.0558 8.4967 7.19947 9.33929 8.0432L16.5016 15.2055L23.6639 8.0432C24.2927 7.41355 24.7207 6.61159 24.8938 5.73873C25.0669 4.86586 24.9773 3.96127 24.6364 3.1393C24.2955 2.31734 23.7185 1.61491 22.9784 1.12082C22.2383 0.626718 21.3683 0.363137 20.4785 0.363392ZM20.4391 8.12589C20.4391 8.27508 20.3798 8.41815 20.2744 8.52364C20.1689 8.62913 20.0258 8.68839 19.8766 8.68839H18.1891V10.3759C18.1891 10.5251 18.1298 10.6681 18.0244 10.7736C17.9189 10.8791 17.7758 10.9384 17.6266 10.9384H15.3766C15.2274 10.9384 15.0843 10.8791 14.9789 10.7736C14.8734 10.6681 14.8141 10.5251 14.8141 10.3759V8.68839H13.1266C12.9774 8.68839 12.8343 8.62913 12.7289 8.52364C12.6234 8.41815 12.5641 8.27508 12.5641 8.12589V5.87589C12.5641 5.72671 12.6234 5.58363 12.7289 5.47814C12.8343 5.37266 12.9774 5.31339 13.1266 5.31339H14.8141V3.62589C14.8141 3.47671 14.8734 3.33363 14.9789 3.22814C15.0843 3.12266 15.2274 3.06339 15.3766 3.06339H17.6266C17.7758 3.06339 17.9189 3.12266 18.0244 3.22814C18.1298 3.33363 18.1891 3.47671 18.1891 3.62589V5.31339H19.8766C20.0258 5.31339 20.1689 5.37266 20.2744 5.47814C20.3798 5.58363 20.4391 5.72671 20.4391 5.87589V8.12589Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "General" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  GENERAL
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Recipes"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Recipes")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Recipes" ? (
                  <svg
                    width="36"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7678_44406)">
                      <path
                        d="M25.875 31.5V21.375L34.875 9.96694L32.5018 7.59375L24.75 15.75H11.25L3.49819 7.59375L1.125 9.96694L10.125 21.375V31.5H25.875Z"
                        fill="url(#paint0_linear_7678_44406)"
                      />
                      <path
                        d="M0.5625 30.9375H35.4375V35.4375H0.5625V30.9375Z"
                        fill="url(#paint1_linear_7678_44406)"
                      />
                      <path
                        d="M19.3067 34.875H16.6933C15.6395 34.875 14.619 34.5051 13.8099 33.8299C13.0008 33.1546 12.4544 32.2168 12.2659 31.1799L11.8125 28.6875H24.1875L23.7341 31.1799C23.5456 32.2168 22.9992 33.1546 22.1901 33.8299C21.381 34.5051 20.3605 34.875 19.3067 34.875Z"
                        fill="url(#paint2_linear_7678_44406)"
                      />
                      <path
                        d="M12.3294 31.4584C12.9516 31.3312 13.0933 30.9375 13.9444 30.9375C14.9569 30.9375 14.9569 31.5 15.9694 31.5C16.9819 31.5 16.9819 30.9375 17.9944 30.9375C19.0069 30.9375 19.0069 31.5 20.0194 31.5C21.0319 31.5 21.0319 30.9375 22.0444 30.9375C22.9005 30.9375 23.0383 31.3363 23.67 31.4606C23.6931 31.3678 23.7173 31.275 23.7341 31.1794L24.1875 28.6875H11.8125L12.2659 31.1799C12.2827 31.275 12.3064 31.3661 12.3294 31.4584Z"
                        fill="url(#paint3_linear_7678_44406)"
                      />
                      <path
                        d="M17.9922 15.75C20.1668 15.75 21.9297 13.9871 21.9297 11.8125C21.9297 9.63788 20.1668 7.875 17.9922 7.875C15.8176 7.875 14.0547 9.63788 14.0547 11.8125C14.0547 13.9871 15.8176 15.75 17.9922 15.75Z"
                        fill="url(#paint4_linear_7678_44406)"
                      />
                      <path
                        d="M16.4282 26.8356L15.6328 26.0402L16.1953 25.4777C16.2388 25.434 16.2632 25.3748 16.2632 25.3132C16.2632 25.2515 16.2388 25.1924 16.1953 25.1486C15.9408 24.8935 15.7979 24.5479 15.7979 24.1876C15.7979 23.8273 15.9408 23.4816 16.1953 23.2266L16.7578 22.6641L17.5532 23.4594L16.9907 24.0219C16.9689 24.0436 16.9516 24.0694 16.9399 24.0978C16.9281 24.1262 16.922 24.1566 16.922 24.1873C16.922 24.218 16.9281 24.2485 16.9399 24.2768C16.9516 24.3052 16.9689 24.331 16.9907 24.3527C17.2452 24.6073 17.3881 24.9526 17.3881 25.3126C17.3881 25.6726 17.2452 26.0179 16.9907 26.2725L16.4282 26.8356Z"
                        fill="url(#paint5_linear_7678_44406)"
                      />
                      <path
                        d="M19.2407 26.8356L18.4453 26.0402L19.0078 25.4777C19.0513 25.434 19.0757 25.3748 19.0757 25.3132C19.0757 25.2515 19.0513 25.1924 19.0078 25.1486C18.7533 24.8935 18.6104 24.5479 18.6104 24.1876C18.6104 23.8273 18.7533 23.4816 19.0078 23.2266L19.5703 22.6641L20.3657 23.4594L19.8032 24.0219C19.7814 24.0436 19.7641 24.0694 19.7524 24.0978C19.7406 24.1262 19.7345 24.1566 19.7345 24.1873C19.7345 24.218 19.7406 24.2485 19.7524 24.2768C19.7641 24.3052 19.7814 24.331 19.8032 24.3527C20.0577 24.6073 20.2006 24.9526 20.2006 25.3126C20.2006 25.6726 20.0577 26.0179 19.8032 26.2725L19.2407 26.8356Z"
                        fill="url(#paint6_linear_7678_44406)"
                      />
                      <path
                        d="M4.61328 8.78906L7.77967 5.62267L8.57504 6.41805L5.40866 9.58444L4.61328 8.78906Z"
                        fill="url(#paint7_linear_7678_44406)"
                      />
                      <path
                        d="M12.9503 1.24534C11.8529 0.14959 9.80035 0.415652 8.37666 1.84159C6.95297 3.26753 6.68353 5.31953 7.77985 6.41584C8.01003 6.64058 8.28295 6.81686 8.58247 6.93426C8.88198 7.05165 9.20201 7.10776 9.5236 7.09928C9.69316 7.09885 9.86243 7.08512 10.0298 7.05822C10.9144 6.89835 11.7268 6.46562 12.353 5.82072C13.78 4.39422 14.0467 2.34165 12.9503 1.24534Z"
                        fill="url(#paint8_linear_7678_44406)"
                      />
                      <path
                        d="M31.3167 8.86341L28.642 6.18984C29.0637 5.76793 29.3005 5.19586 29.3005 4.59937C29.3005 4.00289 29.0637 3.43082 28.642 3.00891L26.2553 0.621094L25.46 1.41703L27.8461 3.80316C27.9506 3.90763 28.0335 4.03167 28.0901 4.16819C28.1466 4.30471 28.1758 4.45104 28.1758 4.59881C28.1758 4.74659 28.1466 4.89292 28.0901 5.02944C28.0335 5.16596 27.9506 5.29 27.8461 5.39447L24.6646 2.21241L23.8692 3.00778L27.0507 6.18984C26.8365 6.3945 26.5516 6.5087 26.2553 6.5087C25.9591 6.5087 25.6742 6.3945 25.46 6.18984L23.0727 3.80372L22.2773 4.59909L24.6646 6.98522C25.0865 7.40703 25.6587 7.64399 26.2553 7.64399C26.852 7.64399 27.4242 7.40703 27.8461 6.98522L30.5208 9.65934L31.3167 8.86341Z"
                        fill="url(#paint9_linear_7678_44406)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_7678_44406"
                        x1="-0.173077"
                        y1="22.8531"
                        x2="36.0109"
                        y2="22.8613"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_7678_44406"
                        x1="-0.778846"
                        y1="33.8098"
                        x2="36.6112"
                        y2="33.8568"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_7678_44406"
                        x1="11.3365"
                        y1="32.637"
                        x2="24.604"
                        y2="32.6413"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_7678_44406"
                        x1="11.3365"
                        y1="30.4827"
                        x2="24.604"
                        y2="30.4922"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_7678_44406"
                        x1="13.7518"
                        y1="12.9016"
                        x2="22.1947"
                        y2="12.903"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_7678_44406"
                        x1="15.559"
                        y1="25.3267"
                        x2="17.6178"
                        y2="25.3269"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_7678_44406"
                        x1="18.3715"
                        y1="25.3267"
                        x2="20.4303"
                        y2="25.3269"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_7678_44406"
                        x1="4.99918"
                        y1="9.41853"
                        x2="8.39612"
                        y2="6.02598"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_7678_44406"
                        x1="6.8547"
                        y1="4.73827"
                        x2="13.845"
                        y2="4.7394"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_7678_44406"
                        x1="21.9297"
                        y1="6.39019"
                        x2="31.621"
                        y2="6.39176"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <clipPath id="clip0_7678_44406">
                        <rect width="36" height="36" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="36"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6627_38881)">
                      <path
                        d="M25.875 31.5V21.375L34.875 9.96694L32.5018 7.59375L24.75 15.75H11.25L3.49819 7.59375L1.125 9.96694L10.125 21.375V31.5H25.875Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M0.5625 30.9375H35.4375V35.4375H0.5625V30.9375Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M19.3067 34.875H16.6933C15.6395 34.875 14.619 34.5051 13.8099 33.8299C13.0008 33.1546 12.4544 32.2168 12.2659 31.1799L11.8125 28.6875H24.1875L23.7341 31.1799C23.5456 32.2168 22.9992 33.1546 22.1901 33.8299C21.381 34.5051 20.3605 34.875 19.3067 34.875Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M12.3294 31.4584C12.9516 31.3312 13.0933 30.9375 13.9444 30.9375C14.9569 30.9375 14.9569 31.5 15.9694 31.5C16.9819 31.5 16.9819 30.9375 17.9944 30.9375C19.0069 30.9375 19.0069 31.5 20.0194 31.5C21.0319 31.5 21.0319 30.9375 22.0444 30.9375C22.9005 30.9375 23.0383 31.3363 23.67 31.4606C23.6931 31.3678 23.7172 31.275 23.7341 31.1794L24.1875 28.6875H11.8125L12.2659 31.1799C12.2827 31.275 12.3064 31.3661 12.3294 31.4584Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M17.9922 15.75C20.1668 15.75 21.9297 13.9871 21.9297 11.8125C21.9297 9.63788 20.1668 7.875 17.9922 7.875C15.8176 7.875 14.0547 9.63788 14.0547 11.8125C14.0547 13.9871 15.8176 15.75 17.9922 15.75Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M16.4282 26.8356L15.6328 26.0402L16.1953 25.4777C16.2388 25.434 16.2632 25.3748 16.2632 25.3132C16.2632 25.2515 16.2388 25.1924 16.1953 25.1486C15.9408 24.8935 15.7979 24.5479 15.7979 24.1876C15.7979 23.8273 15.9408 23.4816 16.1953 23.2266L16.7578 22.6641L17.5532 23.4594L16.9907 24.0219C16.9689 24.0436 16.9516 24.0694 16.9399 24.0978C16.9281 24.1262 16.922 24.1566 16.922 24.1873C16.922 24.218 16.9281 24.2485 16.9399 24.2768C16.9516 24.3052 16.9689 24.331 16.9907 24.3527C17.2452 24.6073 17.3881 24.9526 17.3881 25.3126C17.3881 25.6726 17.2452 26.0179 16.9907 26.2725L16.4282 26.8356Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M19.2407 26.8356L18.4453 26.0402L19.0078 25.4777C19.0513 25.434 19.0757 25.3748 19.0757 25.3132C19.0757 25.2515 19.0513 25.1924 19.0078 25.1486C18.7533 24.8935 18.6104 24.5479 18.6104 24.1876C18.6104 23.8273 18.7533 23.4816 19.0078 23.2266L19.5703 22.6641L20.3657 23.4594L19.8032 24.0219C19.7814 24.0436 19.7641 24.0694 19.7524 24.0978C19.7406 24.1262 19.7345 24.1566 19.7345 24.1873C19.7345 24.218 19.7406 24.2485 19.7524 24.2768C19.7641 24.3052 19.7814 24.331 19.8032 24.3527C20.0577 24.6073 20.2006 24.9526 20.2006 25.3126C20.2006 25.6726 20.0577 26.0179 19.8032 26.2725L19.2407 26.8356Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M4.61328 8.78906L7.77967 5.62267L8.57504 6.41805L5.40866 9.58444L4.61328 8.78906Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M12.9503 1.24534C11.8529 0.14959 9.80035 0.415652 8.37666 1.84159C6.95297 3.26753 6.68353 5.31953 7.77985 6.41584C8.01003 6.64058 8.28295 6.81686 8.58247 6.93426C8.88198 7.05165 9.20201 7.10776 9.5236 7.09928C9.69316 7.09885 9.86243 7.08512 10.0298 7.05822C10.9144 6.89835 11.7268 6.46562 12.353 5.82071C13.78 4.39422 14.0467 2.34165 12.9503 1.24534Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M31.3167 8.86341L28.642 6.18984C29.0637 5.76793 29.3005 5.19586 29.3005 4.59937C29.3005 4.00289 29.0637 3.43082 28.642 3.00891L26.2553 0.621094L25.46 1.41703L27.8461 3.80316C27.9506 3.90763 28.0335 4.03167 28.0901 4.16819C28.1466 4.30471 28.1758 4.45104 28.1758 4.59881C28.1758 4.74659 28.1466 4.89292 28.0901 5.02944C28.0335 5.16596 27.9506 5.29 27.8461 5.39447L24.6646 2.21241L23.8692 3.00778L27.0507 6.18984C26.8365 6.3945 26.5516 6.5087 26.2553 6.5087C25.9591 6.5087 25.6742 6.3945 25.46 6.18984L23.0727 3.80372L22.2773 4.59909L24.6646 6.98522C25.0865 7.40703 25.6587 7.64399 26.2553 7.64399C26.852 7.64399 27.4242 7.40703 27.8461 6.98522L30.5208 9.65934L31.3167 8.86341Z"
                        fill="#D4D4D4"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6627_38881">
                        <rect width="36" height="36" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Recipes" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  RECIPES
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Motivation"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Motivation")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Motivation" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M15.9258 10.3452C15.6262 10.2857 15.3168 10.2539 15 10.2539C12.383 10.2539 10.2539 12.383 10.2539 15C10.2539 17.617 12.383 19.7461 15 19.7461C17.617 19.7461 19.7461 17.617 19.7461 15C19.7461 14.6832 19.7143 14.3738 19.6548 14.0742L16.8645 16.8645C16.3664 17.3625 15.7043 17.6367 15 17.6367C14.2957 17.6367 13.6336 17.3625 13.1355 16.8645C12.6375 16.3664 12.3633 15.7043 12.3633 15C12.3633 14.2957 12.6375 13.6336 13.1355 13.1355L15.9258 10.3452Z"
                      fill="url(#paint0_linear_8279_35544)"
                    />
                    <path
                      d="M28.6576 8.80005L26.7666 10.6911C26.5773 10.8804 26.364 11.0374 26.1337 11.1591C26.5503 12.3637 26.7773 13.6558 26.7773 15C26.7773 21.4941 21.4941 26.7773 15 26.7773C8.50594 26.7773 3.22266 21.4941 3.22266 15C3.22266 8.50594 8.50594 3.22266 15 3.22266C16.3447 3.22266 17.6374 3.44994 18.8422 3.86673C18.9642 3.63625 19.1201 3.42201 19.3092 3.23318L21.2 1.34239C19.3092 0.480652 17.2099 0 15 0C6.7289 0 0 6.7289 0 15C0 23.2711 6.7289 30 15 30C23.2711 30 30 23.2711 30 15C30 12.7901 29.5193 10.6908 28.6576 8.80005Z"
                      fill="url(#paint1_linear_8279_35544)"
                    />
                    <path
                      d="M18.7331 7.53799L18.5728 5.63919C17.4625 5.2137 16.2582 4.98047 15 4.98047C9.47525 4.98047 4.98047 9.47525 4.98047 15C4.98047 20.5247 9.47525 25.0195 15 25.0195C20.5247 25.0195 25.0195 20.5247 25.0195 15C25.0195 13.7418 24.7863 12.5375 24.3608 11.4272L22.462 11.2669L21.0683 12.6604C21.3494 13.3868 21.5039 14.1756 21.5039 15C21.5039 18.5863 18.5863 21.5039 15 21.5039C11.4137 21.5039 8.49609 18.5863 8.49609 15C8.49609 11.4137 11.4137 8.49609 15 8.49609C15.8244 8.49609 16.6132 8.65059 17.3396 8.93166L18.7331 7.53799Z"
                      fill="url(#paint2_linear_8279_35544)"
                    />
                    <path
                      d="M20.2975 5.17004L20.5534 8.20226L14.3786 14.377C14.0353 14.7201 14.0353 15.2768 14.3786 15.6199C14.55 15.7915 14.775 15.8774 15 15.8774C15.225 15.8774 15.45 15.7915 15.6214 15.6199L21.7962 9.44509L24.8284 9.70075C24.8531 9.70281 24.8776 9.70395 24.9023 9.70395C25.1344 9.70395 25.3583 9.61194 25.5238 9.44646L29.2525 5.71752C29.4944 5.47582 29.5741 5.11556 29.4566 4.79421C29.339 4.47286 29.0458 4.24901 28.705 4.2204L26.0056 3.99267L25.778 1.29346C25.7492 0.95243 25.5254 0.659233 25.2042 0.541816C24.8829 0.424171 24.5226 0.504051 24.2807 0.74575L20.552 4.47469C20.3689 4.6578 20.2757 4.91209 20.2975 5.17004Z"
                      fill="url(#paint3_linear_8279_35544)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_35544"
                        x1="9.88882"
                        y1="16.3128"
                        x2="20.0656"
                        y2="16.3144"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_35544"
                        x1="-1.15385"
                        y1="19.1489"
                        x2="31.0097"
                        y2="19.1542"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_35544"
                        x1="4.20974"
                        y1="17.7714"
                        x2="25.694"
                        y2="17.7748"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_35544"
                        x1="13.5292"
                        y1="10.3111"
                        x2="30.028"
                        y2="10.3138"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M15.9258 10.3452C15.6262 10.2857 15.3168 10.2539 15 10.2539C12.383 10.2539 10.2539 12.383 10.2539 15C10.2539 17.617 12.383 19.7461 15 19.7461C17.617 19.7461 19.7461 17.617 19.7461 15C19.7461 14.6832 19.7143 14.3738 19.6548 14.0742L16.8645 16.8645C16.3664 17.3625 15.7043 17.6367 15 17.6367C14.2957 17.6367 13.6336 17.3625 13.1355 16.8645C12.6375 16.3664 12.3633 15.7043 12.3633 15C12.3633 14.2957 12.6375 13.6336 13.1355 13.1355L15.9258 10.3452Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M28.6576 8.80005L26.7666 10.6911C26.5773 10.8804 26.364 11.0374 26.1337 11.1591C26.5503 12.3637 26.7773 13.6558 26.7773 15C26.7773 21.4941 21.4941 26.7773 15 26.7773C8.50594 26.7773 3.22266 21.4941 3.22266 15C3.22266 8.50594 8.50594 3.22266 15 3.22266C16.3447 3.22266 17.6374 3.44994 18.8422 3.86673C18.9642 3.63625 19.1201 3.42201 19.3092 3.23318L21.2 1.34239C19.3092 0.480652 17.2099 0 15 0C6.7289 0 0 6.7289 0 15C0 23.2711 6.7289 30 15 30C23.2711 30 30 23.2711 30 15C30 12.7901 29.5193 10.6908 28.6576 8.80005Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18.7331 7.53799L18.5728 5.63919C17.4625 5.2137 16.2582 4.98047 15 4.98047C9.47525 4.98047 4.98047 9.47525 4.98047 15C4.98047 20.5247 9.47525 25.0195 15 25.0195C20.5247 25.0195 25.0195 20.5247 25.0195 15C25.0195 13.7418 24.7863 12.5375 24.3608 11.4272L22.462 11.2669L21.0683 12.6604C21.3494 13.3868 21.5039 14.1756 21.5039 15C21.5039 18.5863 18.5863 21.5039 15 21.5039C11.4137 21.5039 8.49609 18.5863 8.49609 15C8.49609 11.4137 11.4137 8.49609 15 8.49609C15.8244 8.49609 16.6132 8.65059 17.3396 8.93166L18.7331 7.53799Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M20.2975 5.17004L20.5534 8.20226L14.3786 14.377C14.0353 14.7201 14.0353 15.2768 14.3786 15.6199C14.55 15.7915 14.775 15.8774 15 15.8774C15.225 15.8774 15.45 15.7915 15.6214 15.6199L21.7962 9.44509L24.8284 9.70075C24.8531 9.70281 24.8776 9.70395 24.9023 9.70395C25.1344 9.70395 25.3583 9.61194 25.5238 9.44646L29.2525 5.71752C29.4944 5.47582 29.5741 5.11556 29.4566 4.79421C29.339 4.47286 29.0458 4.24901 28.705 4.2204L26.0056 3.99267L25.778 1.29346C25.7492 0.95243 25.5254 0.659233 25.2042 0.541816C24.8829 0.424171 24.5226 0.504051 24.2807 0.74575L20.552 4.47469C20.3689 4.6578 20.2757 4.91209 20.2975 5.17004Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Motivation" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  MOTIVATION
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/FitnessStory"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("FitnessStory")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "FitnessStory" ? (
                  <svg
                    width="37"
                    height="24"
                    viewBox="0 0 37 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7678_44416)">
                      <path
                        d="M8.86719 10.2656C9.91391 10.2656 10.7656 9.41391 10.7656 8.36719C10.7656 7.32047 9.91391 6.46875 8.86719 6.46875C7.82047 6.46875 6.96875 7.32047 6.96875 8.36719C6.96875 9.41391 7.82047 10.2656 8.86719 10.2656Z"
                        fill="url(#paint0_linear_7678_44416)"
                      />
                      <path
                        d="M9.07731 18.8184L8.86719 18.9538L8.65706 18.8184C8.51741 18.7284 6.61709 17.4882 4.75931 15.5546C2.88083 13.5994 1.16667 11.0601 1.16667 8.36719C1.16667 4.12167 4.62167 0.666667 8.86719 0.666667C13.1127 0.666667 16.5677 4.12167 16.5677 8.36719C16.5677 11.0601 14.8535 13.5994 12.9751 15.5546C11.1173 17.4882 9.21696 18.7284 9.07731 18.8184ZM13.5417 8.36719C13.5417 5.7891 11.4453 3.69271 8.86719 3.69271C6.2891 3.69271 4.19271 5.7891 4.19271 8.36719C4.19271 10.9453 6.2891 13.0417 8.86719 13.0417C11.4453 13.0417 13.5417 10.9453 13.5417 8.36719Z"
                        fill="url(#paint1_linear_7678_44416)"
                        stroke="url(#paint2_linear_7678_44416)"
                        strokeWidth="1.33333"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M26.1929 22.7031H31.2767C31.8447 22.7031 32.3095 23.1679 32.3095 23.7358V26.0549H30.8741V34.7705C30.8741 34.9641 30.7162 35.1221 30.5225 35.1221C25.7839 35.1221 31.6857 35.1221 26.9471 35.1221C26.7534 35.1221 26.5955 34.9641 26.5955 34.7705V26.0549H25.1602V23.7358C25.1602 23.1678 25.6249 22.7031 26.1929 22.7031Z"
                        fill="url(#paint3_linear_7678_44416)"
                      />
                      <path
                        d="M28.7358 21.6082C29.6642 21.6082 30.4168 20.8556 30.4168 19.9272C30.4168 18.9987 29.6642 18.2461 28.7358 18.2461C27.8073 18.2461 27.0547 18.9987 27.0547 19.9272C27.0547 20.8556 27.8073 21.6082 28.7358 21.6082Z"
                        fill="url(#paint4_linear_7678_44416)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.4493 22.125H22.9406C23.3279 22.125 23.6439 22.4409 23.6439 22.8282V25.8669C23.6439 26.2542 23.3279 26.5701 22.9406 26.5701H22.4493C22.062 26.5701 21.7461 26.2542 21.7461 25.8669V22.8282C21.7461 22.4409 22.062 22.125 22.4493 22.125ZM34.6641 22.125H35.1554C35.5427 22.125 35.8586 22.4409 35.8586 22.8282V25.8669C35.8586 26.2542 35.5427 26.5701 35.1554 26.5701H34.6641C34.2768 26.5701 33.9608 26.2542 33.9608 25.8669V22.8282C33.9608 22.4409 34.2768 22.125 34.6641 22.125Z"
                        fill="url(#paint5_linear_7678_44416)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M31.5918 23.332C31.197 23.332 30.8741 23.655 30.8741 24.0497V26.0522C30.8741 26.4469 31.197 26.7699 31.5918 26.7699C31.9865 26.7699 32.3095 26.4469 32.3095 26.0522V24.0497C32.3095 23.655 31.9865 23.332 31.5918 23.332ZM25.8778 23.332C26.2726 23.332 26.5955 23.655 26.5955 24.0497V26.0522C26.5955 26.4469 26.2726 26.7699 25.8778 26.7699C25.4831 26.7699 25.1602 26.4469 25.1602 26.0522V24.0497C25.1602 23.655 25.4831 23.332 25.8778 23.332Z"
                        fill="url(#paint6_linear_7678_44416)"
                      />
                      <mask id="path-7-inside-1_7678_44416" fill="white">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.0643 26.0539C32.0643 26.3141 31.8525 26.5254 31.5928 26.5254C31.3314 26.5254 31.1197 26.3141 31.1197 26.0539V24.0514C31.1197 23.7912 31.3314 23.5796 31.5928 23.5796C31.8525 23.5796 32.0643 23.7912 32.0643 24.0514V26.0539ZM30.6284 34.8749H28.9807V29.7368C28.9807 29.6012 28.8715 29.4909 28.7342 29.4909C28.5986 29.4909 28.4894 29.6012 28.4894 29.7368V34.8749H26.8417V24.5917H30.6284V34.8749ZM25.8789 26.5254C25.6175 26.5254 25.4074 26.3141 25.4074 26.0539V24.0514C25.4074 23.7911 25.6175 23.5796 25.8789 23.5796C26.1387 23.5796 26.3504 23.7912 26.3504 24.0514V26.0539C26.3504 26.3141 26.1387 26.5254 25.8789 26.5254ZM31.2768 22.9481H26.1932C26.0212 22.9481 25.8607 23.0041 25.7317 23.0987C25.7797 23.0912 25.8276 23.0874 25.8789 23.0874C26.41 23.0874 26.8417 23.5198 26.8417 24.0514V24.0995H30.6284V24.0514C30.6284 23.5198 31.0601 23.0874 31.5928 23.0874C31.6424 23.0874 31.6904 23.0912 31.7384 23.0987C31.6094 23.0041 31.4506 22.9481 31.2768 22.9481ZM23.3991 25.8651C23.3991 26.1172 23.194 26.3222 22.9409 26.3222H22.4512C22.1981 26.3222 21.993 26.1172 21.993 25.8651V22.8262C21.993 22.5741 22.1981 22.3691 22.4512 22.3691H22.9409C23.194 22.3691 23.3991 22.5741 23.3991 22.8262L23.3991 25.8651ZM34.2082 22.8262C34.2082 22.5741 34.4134 22.3691 34.6648 22.3691H35.1561C35.4076 22.3691 35.6144 22.5741 35.6144 22.8262V25.8651C35.6144 26.1172 35.4076 26.3222 35.1561 26.3222H34.6648C34.4134 26.3222 34.2082 26.1172 34.2082 25.8651V22.8262ZM33.7152 24.5917V25.8651C33.7152 26.3885 34.142 26.8143 34.6648 26.8143H35.1561C35.6806 26.8143 36.1057 26.3885 36.1057 25.8651V22.8262C36.1057 22.3026 35.6806 21.877 35.1561 21.877H34.6648C34.1421 21.877 33.7152 22.3026 33.7152 22.8262V24.0995H32.5556V23.7351C32.5556 23.0297 31.9816 22.456 31.2768 22.456H26.1932C25.4885 22.456 24.9144 23.0297 24.9144 23.7351V24.0995H23.8904V22.8262C23.8904 22.3026 23.4653 21.877 22.9409 21.877H22.4512C21.9268 21.877 21.5 22.3026 21.5 22.8262V25.8651C21.5 26.3885 21.9268 26.8143 22.4512 26.8143H22.9409C23.4653 26.8143 23.8904 26.3885 23.8904 25.8651V24.5917H24.9144V26.0539C24.9144 26.5851 25.3462 27.0175 25.8789 27.0175C26.0493 27.0175 26.2097 26.9725 26.3504 26.8938V35.121C26.3504 35.2572 26.4596 35.3672 26.5952 35.3672H30.8748C31.0105 35.3672 31.1197 35.2572 31.1197 35.121V26.8938C31.2603 26.9725 31.4207 27.0175 31.5928 27.0175C32.1238 27.0175 32.5556 26.5851 32.5556 26.0539V24.5917H33.7152ZM28.7342 18.4922C29.5266 18.4922 30.1701 19.1358 30.1701 19.9273C30.1701 20.7182 29.5266 21.3623 28.7342 21.3623C27.9435 21.3623 27.2999 20.7182 27.2999 19.9273C27.2999 19.1358 27.9435 18.4922 28.7342 18.4922ZM28.7342 21.8545C29.7979 21.8545 30.6615 20.9896 30.6615 19.9273C30.6615 18.8644 29.7979 18 28.7342 18C27.6722 18 26.8086 18.8644 26.8086 19.9272C26.8086 20.9896 27.6722 21.8545 28.7342 21.8545Z"
                        />
                      </mask>
                      <path
                        d="M30.6284 34.8749V37.8749H33.6284V34.8749H30.6284ZM28.9807 34.8749H25.9807V37.8749H28.9807V34.8749ZM28.4894 34.8749V37.8749H31.4894V34.8749H28.4894ZM26.8417 34.8749H23.8417V37.8749H26.8417V34.8749ZM26.8417 24.5917V21.5917H23.8417V24.5917H26.8417ZM30.6284 24.5917H33.6284V21.5917H30.6284V24.5917ZM25.7317 23.0987L23.9577 20.6794L26.1921 26.0631L25.7317 23.0987ZM26.8417 24.0995H23.8417V27.0995H26.8417V24.0995ZM30.6284 24.0995V27.0995H33.6284V24.0995H30.6284ZM31.7384 23.0987L31.278 26.0631L33.5123 20.6794L31.7384 23.0987ZM23.3991 25.8651H26.3991V25.8651L23.3991 25.8651ZM23.3991 22.8262H20.3991V22.8263L23.3991 22.8262ZM33.7152 24.5917H36.7152V21.5917H33.7152V24.5917ZM33.7152 24.0995V27.0995H36.7152V24.0995H33.7152ZM32.5556 24.0995H29.5556V27.0995H32.5556V24.0995ZM24.9144 24.0995V27.0995H27.9144V24.0995H24.9144ZM23.8904 24.0995H20.8904V27.0995H23.8904V24.0995ZM23.8904 24.5917V21.5917H20.8904V24.5917H23.8904ZM24.9144 24.5917H27.9144V21.5917H24.9144V24.5917ZM26.3504 26.8938H29.3504V21.7754L24.8846 24.2762L26.3504 26.8938ZM31.1197 26.8938L32.5855 24.2762L28.1197 21.7754V26.8938H31.1197ZM32.5556 24.5917V21.5917H29.5556V24.5917H32.5556ZM29.0643 26.0539C29.0643 24.6552 30.1977 23.5254 31.5928 23.5254V29.5254C33.5073 29.5254 35.0643 27.973 35.0643 26.0539H29.0643ZM31.5928 23.5254C32.9794 23.5254 34.1197 24.6484 34.1197 26.0539H28.1197C28.1197 27.9798 29.6834 29.5254 31.5928 29.5254V23.5254ZM34.1197 26.0539V24.0514H28.1197V26.0539H34.1197ZM34.1197 24.0514C34.1197 25.4543 32.982 26.5796 31.5928 26.5796V20.5796C29.6808 20.5796 28.1197 22.1281 28.1197 24.0514H34.1197ZM31.5928 26.5796C30.195 26.5796 29.0643 25.4474 29.0643 24.0514H35.0643C35.0643 22.1351 33.5101 20.5796 31.5928 20.5796V26.5796ZM29.0643 24.0514V26.0539H35.0643V24.0514H29.0643ZM30.6284 31.8749H28.9807V37.8749H30.6284V31.8749ZM31.9807 34.8749V29.7368H25.9807V34.8749H31.9807ZM31.9807 29.7368C31.9807 27.9493 30.5333 26.4909 28.7342 26.4909V32.4909C27.2096 32.4909 25.9807 31.253 25.9807 29.7368H31.9807ZM28.7342 26.4909C26.9236 26.4909 25.4894 27.9625 25.4894 29.7368H31.4894C31.4894 31.2398 30.2736 32.4909 28.7342 32.4909V26.4909ZM25.4894 29.7368V34.8749H31.4894V29.7368H25.4894ZM28.4894 31.8749H26.8417V37.8749H28.4894V31.8749ZM29.8417 34.8749V24.5917H23.8417V34.8749H29.8417ZM26.8417 27.5917H30.6284V21.5917H26.8417V27.5917ZM27.6284 24.5917V34.8749H33.6284V24.5917H27.6284ZM25.8789 23.5254C27.2792 23.5254 28.4074 24.6621 28.4074 26.0539H22.4074C22.4074 27.9661 23.9559 29.5254 25.8789 29.5254V23.5254ZM28.4074 26.0539V24.0514H22.4074V26.0539H28.4074ZM28.4074 24.0514C28.4074 25.4406 27.2818 26.5796 25.8789 26.5796V20.5796C23.9532 20.5796 22.4074 22.1417 22.4074 24.0514H28.4074ZM25.8789 26.5796C24.4811 26.5796 23.3504 25.4473 23.3504 24.0514H29.3504C29.3504 22.1351 27.7962 20.5796 25.8789 20.5796V26.5796ZM23.3504 24.0514V26.0539H29.3504V24.0514H23.3504ZM23.3504 26.0539C23.3504 24.6552 24.4838 23.5254 25.8789 23.5254V29.5254C27.7935 29.5254 29.3504 27.973 29.3504 26.0539H23.3504ZM31.2768 19.9481H26.1932V25.9481H31.2768V19.9481ZM26.1932 19.9481C25.3657 19.9481 24.587 20.2179 23.9577 20.6794L27.5056 25.518C27.1344 25.7902 26.6766 25.9481 26.1932 25.9481V19.9481ZM26.1921 26.0631C26.0874 26.0794 25.9814 26.0874 25.8789 26.0874V20.0874C25.6739 20.0874 25.472 20.103 25.2713 20.1342L26.1921 26.0631ZM25.8789 26.0874C24.7494 26.0874 23.8417 25.173 23.8417 24.0514H29.8417C29.8417 21.8667 28.0705 20.0874 25.8789 20.0874V26.0874ZM23.8417 24.0514V24.0995H29.8417V24.0514H23.8417ZM26.8417 27.0995H30.6284V21.0995H26.8417V27.0995ZM33.6284 24.0995V24.0514H27.6284V24.0995H33.6284ZM33.6284 24.0514C33.6284 25.1763 32.7173 26.0874 31.5928 26.0874V20.0874C29.4029 20.0874 27.6284 21.8634 27.6284 24.0514H33.6284ZM31.5928 26.0874C31.4861 26.0874 31.3801 26.079 31.278 26.0631L32.1988 20.1342C32.0007 20.1034 31.7988 20.0874 31.5928 20.0874V26.0874ZM33.5123 20.6794C32.8858 20.2199 32.1093 19.9481 31.2768 19.9481V25.9481C30.7918 25.9481 30.333 25.7882 29.9644 25.518L33.5123 20.6794ZM20.3991 25.8651C20.3991 24.4547 21.5428 23.3222 22.9409 23.3222V29.3222C24.8452 29.3222 26.3991 27.7798 26.3991 25.8651H20.3991ZM22.9409 23.3222H22.4512V29.3222H22.9409V23.3222ZM22.4512 23.3222C23.8493 23.3222 24.993 24.4547 24.993 25.8651H18.993C18.993 27.7798 20.547 29.3222 22.4512 29.3222V23.3222ZM24.993 25.8651V22.8262H18.993V25.8651H24.993ZM24.993 22.8262C24.993 24.2367 23.8493 25.3691 22.4512 25.3691V19.3691C20.547 19.3691 18.993 20.9116 18.993 22.8262H24.993ZM22.4512 25.3691H22.9409V19.3691H22.4512V25.3691ZM22.9409 25.3691C21.5427 25.3691 20.3991 24.2365 20.3991 22.8262H26.3991C26.3991 20.9117 24.8453 19.3691 22.9409 19.3691V25.3691ZM20.3991 22.8263L20.3991 25.8652L26.3991 25.8651L26.3991 22.8262L20.3991 22.8263ZM37.2082 22.8262C37.2082 24.2296 36.0716 25.3691 34.6648 25.3691V19.3691C32.7552 19.3691 31.2082 20.9186 31.2082 22.8262H37.2082ZM34.6648 25.3691H35.1561V19.3691H34.6648V25.3691ZM35.1561 25.3691C33.7635 25.3691 32.6144 24.2437 32.6144 22.8262H38.6144C38.6144 20.9045 37.0517 19.3691 35.1561 19.3691V25.3691ZM32.6144 22.8262V25.8651H38.6144V22.8262H32.6144ZM32.6144 25.8651C32.6144 24.4476 33.7635 23.3222 35.1561 23.3222V29.3222C37.0517 29.3222 38.6144 27.7868 38.6144 25.8651H32.6144ZM35.1561 23.3222H34.6648V29.3222H35.1561V23.3222ZM34.6648 23.3222C36.0716 23.3222 37.2082 24.4617 37.2082 25.8651H31.2082C31.2082 27.7727 32.7552 29.3222 34.6648 29.3222V23.3222ZM37.2082 25.8651V22.8262H31.2082V25.8651H37.2082ZM30.7152 24.5917V25.8651H36.7152V24.5917H30.7152ZM30.7152 25.8651C30.7152 28.0481 32.4879 29.8143 34.6648 29.8143V23.8143C35.7962 23.8143 36.7152 24.7289 36.7152 25.8651H30.7152ZM34.6648 29.8143H35.1561V23.8143H34.6648V29.8143ZM35.1561 29.8143C37.3381 29.8143 39.1057 28.0447 39.1057 25.8651H33.1057C33.1057 24.7323 34.023 23.8143 35.1561 23.8143V29.8143ZM39.1057 25.8651V22.8262H33.1057V25.8651H39.1057ZM39.1057 22.8262C39.1057 20.6461 37.3377 18.877 35.1561 18.877V24.877C34.0234 24.877 33.1057 23.9592 33.1057 22.8262H39.1057ZM35.1561 18.877H34.6648V24.877H35.1561V18.877ZM34.6648 18.877C32.4884 18.877 30.7152 20.6426 30.7152 22.8262H36.7152C36.7152 23.9627 35.7958 24.877 34.6648 24.877V18.877ZM30.7152 22.8262V24.0995H36.7152V22.8262H30.7152ZM33.7152 21.0995H32.5556V27.0995H33.7152V21.0995ZM35.5556 24.0995V23.7351H29.5556V24.0995H35.5556ZM35.5556 23.7351C35.5556 21.3728 33.6384 19.456 31.2768 19.456V25.456C30.3247 25.456 29.5556 24.6866 29.5556 23.7351H35.5556ZM31.2768 19.456H26.1932V25.456H31.2768V19.456ZM26.1932 19.456C23.8317 19.456 21.9144 21.3728 21.9144 23.7351H27.9144C27.9144 24.6866 27.1453 25.456 26.1932 25.456V19.456ZM21.9144 23.7351V24.0995H27.9144V23.7351H21.9144ZM24.9144 21.0995H23.8904V27.0995H24.9144V21.0995ZM26.8904 24.0995V22.8262H20.8904V24.0995H26.8904ZM26.8904 22.8262C26.8904 20.6461 25.1225 18.877 22.9409 18.877V24.877C21.8082 24.877 20.8904 23.9592 20.8904 22.8262H26.8904ZM22.9409 18.877H22.4512V24.877H22.9409V18.877ZM22.4512 18.877C20.2764 18.877 18.5 20.6393 18.5 22.8262H24.5C24.5 23.966 23.5771 24.877 22.4512 24.877V18.877ZM18.5 22.8262V25.8651H24.5V22.8262H18.5ZM18.5 25.8651C18.5 28.0515 20.2761 29.8143 22.4512 29.8143V23.8143C23.5775 23.8143 24.5 24.7255 24.5 25.8651H18.5ZM22.4512 29.8143H22.9409V23.8143H22.4512V29.8143ZM22.9409 29.8143C25.1227 29.8143 26.8904 28.0448 26.8904 25.8651H20.8904C20.8904 24.7323 21.8078 23.8143 22.9409 23.8143V29.8143ZM26.8904 25.8651V24.5917H20.8904V25.8651H26.8904ZM23.8904 27.5917H24.9144V21.5917H23.8904V27.5917ZM21.9144 24.5917V26.0539H27.9144V24.5917H21.9144ZM21.9144 26.0539C21.9144 28.2421 23.6896 30.0175 25.8789 30.0175V24.0175C27.0028 24.0175 27.9144 24.928 27.9144 26.0539H21.9144ZM25.8789 30.0175C26.5859 30.0175 27.2485 29.8292 27.8162 29.5113L24.8846 24.2762C25.171 24.1158 25.5127 24.0175 25.8789 24.0175V30.0175ZM23.3504 26.8938V35.121H29.3504V26.8938H23.3504ZM23.3504 35.121C23.3504 36.8969 24.7856 38.3672 26.5952 38.3672V32.3672C28.1335 32.3672 29.3504 33.6175 29.3504 35.121H23.3504ZM26.5952 38.3672H30.8748V32.3672H26.5952V38.3672ZM30.8748 38.3672C32.6847 38.3672 34.1197 36.8966 34.1197 35.121H28.1197C28.1197 33.6177 29.3363 32.3672 30.8748 32.3672V38.3672ZM34.1197 35.121V26.8938H28.1197V35.121H34.1197ZM29.6539 29.5113C30.2239 29.8305 30.8868 30.0175 31.5928 30.0175V24.0175C31.9547 24.0175 32.2967 24.1145 32.5855 24.2762L29.6539 29.5113ZM31.5928 30.0175C33.7837 30.0175 35.5556 28.2389 35.5556 26.0539H29.5556C29.5556 24.9313 30.4639 24.0175 31.5928 24.0175V30.0175ZM35.5556 26.0539V24.5917H29.5556V26.0539H35.5556ZM32.5556 27.5917H33.7152V21.5917H32.5556V27.5917ZM28.7342 21.4922C27.8706 21.4922 27.1701 20.7936 27.1701 19.9273H33.1701C33.1701 17.4781 31.1825 15.4922 28.7342 15.4922V21.4922ZM27.1701 19.9273C27.1701 19.0611 27.87 18.3623 28.7342 18.3623V24.3623C31.1832 24.3623 33.1701 22.3753 33.1701 19.9273H27.1701ZM28.7342 18.3623C29.6023 18.3623 30.2999 19.0633 30.2999 19.9273H24.2999C24.2999 22.3731 26.2847 24.3623 28.7342 24.3623V18.3623ZM30.2999 19.9273C30.2999 20.7913 29.6017 21.4922 28.7342 21.4922V15.4922C26.2853 15.4922 24.2999 17.4803 24.2999 19.9273H30.2999ZM28.7342 24.8545C31.4561 24.8545 33.6615 22.6452 33.6615 19.9273H27.6615C27.6615 19.3341 28.1398 18.8545 28.7342 18.8545V24.8545ZM33.6615 19.9273C33.6615 17.2083 31.4556 15 28.7342 15V21C28.1403 21 27.6615 20.5204 27.6615 19.9273H33.6615ZM28.7342 15C26.0128 15 23.8086 17.21 23.8086 19.9272H29.8086C29.8086 20.5187 29.3315 21 28.7342 21V15ZM23.8086 19.9272C23.8086 22.6434 26.0123 24.8545 28.7342 24.8545V18.8545C29.3321 18.8545 29.8086 19.3358 29.8086 19.9272H23.8086Z"
                        fill="url(#paint7_linear_7678_44416)"
                        mask="url(#path-7-inside-1_7678_44416)"
                      />
                      <path
                        d="M1.94271 32.4844C1.94271 33.6279 2.87208 34.5573 4.01562 34.5573H24.5334L24.6027 35.3333H4.01562C2.44528 35.3333 1.16667 34.0547 1.16667 32.4844C1.16667 30.914 2.44528 29.6354 4.01562 29.6354H13.7188C14.8623 29.6354 15.7917 28.706 15.7917 27.5625C15.7917 26.419 14.8623 25.4896 13.7188 25.4896H11.3281C9.75778 25.4896 8.47917 24.211 8.47917 22.6406V22.5339H9.25521V22.6406C9.25521 23.7842 10.1846 24.7135 11.3281 24.7135H13.7188C15.2891 24.7135 16.5677 25.9922 16.5677 27.5625C16.5677 29.1328 15.2891 30.4115 13.7188 30.4115H4.01562C2.87208 30.4115 1.94271 31.3408 1.94271 32.4844Z"
                        fill="url(#paint8_linear_7678_44416)"
                        stroke="url(#paint9_linear_7678_44416)"
                        strokeWidth="1.33333"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_7678_44416"
                        x1="6.82272"
                        y1="8.89229"
                        x2="10.8934"
                        y2="8.89295"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_7678_44416"
                        x1="-0.14363"
                        y1="12.6044"
                        x2="17.7976"
                        y2="12.6068"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_7678_44416"
                        x1="-0.14363"
                        y1="12.6044"
                        x2="17.7976"
                        y2="12.6068"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_7678_44416"
                        x1="24.8852"
                        y1="30.6301"
                        x2="32.5501"
                        y2="30.6308"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_7678_44416"
                        x1="26.9254"
                        y1="20.3921"
                        x2="30.53"
                        y2="20.3927"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_7678_44416"
                        x1="21.2033"
                        y1="24.9623"
                        x2="36.3336"
                        y2="24.9701"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_7678_44416"
                        x1="24.8852"
                        y1="25.5264"
                        x2="32.5501"
                        y2="25.529"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_7678_44416"
                        x1="20.9382"
                        y1="29.0854"
                        x2="36.5973"
                        y2="29.0876"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_7678_44416"
                        x1="-0.455061"
                        y1="30.8881"
                        x2="26.1673"
                        y2="30.8957"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_7678_44416"
                        x1="-0.455061"
                        y1="30.8881"
                        x2="26.1673"
                        y2="30.8957"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <clipPath id="clip0_7678_44416">
                        <rect
                          width="36"
                          height="36"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="37"
                    height="24"
                    viewBox="0 0 37 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6627_38891)">
                      <path
                        d="M8.86719 10.2656C9.91391 10.2656 10.7656 9.41391 10.7656 8.36719C10.7656 7.32047 9.91391 6.46875 8.86719 6.46875C7.82047 6.46875 6.96875 7.32047 6.96875 8.36719C6.96875 9.41391 7.82047 10.2656 8.86719 10.2656Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M9.07731 18.8184L8.86719 18.9538L8.65706 18.8184C8.51741 18.7284 6.61709 17.4882 4.75931 15.5546C2.88083 13.5994 1.16667 11.0601 1.16667 8.36719C1.16667 4.12167 4.62167 0.666667 8.86719 0.666667C13.1127 0.666667 16.5677 4.12167 16.5677 8.36719C16.5677 11.0601 14.8535 13.5994 12.9751 15.5546C11.1173 17.4882 9.21696 18.7284 9.07731 18.8184ZM13.5417 8.36719C13.5417 5.7891 11.4453 3.69271 8.86719 3.69271C6.2891 3.69271 4.19271 5.7891 4.19271 8.36719C4.19271 10.9453 6.2891 13.0417 8.86719 13.0417C11.4453 13.0417 13.5417 10.9453 13.5417 8.36719Z"
                        fill="#D4D4D4"
                        stroke="#D4D4D4"
                        strokeWidth="1.33333"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M26.1929 22.7031H31.2767C31.8447 22.7031 32.3095 23.1679 32.3095 23.7358V26.0549H30.8741V34.7705C30.8741 34.9641 30.7162 35.1221 30.5225 35.1221C25.7839 35.1221 31.6857 35.1221 26.9471 35.1221C26.7534 35.1221 26.5955 34.9641 26.5955 34.7705V26.0549H25.1602V23.7358C25.1602 23.1678 25.6249 22.7031 26.1929 22.7031Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M28.7358 21.6082C29.6642 21.6082 30.4168 20.8556 30.4168 19.9272C30.4168 18.9987 29.6642 18.2461 28.7358 18.2461C27.8073 18.2461 27.0547 18.9987 27.0547 19.9272C27.0547 20.8556 27.8073 21.6082 28.7358 21.6082Z"
                        fill="#D4D4D4"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.4493 22.125H22.9406C23.3279 22.125 23.6439 22.4409 23.6439 22.8282V25.8669C23.6439 26.2542 23.3279 26.5701 22.9406 26.5701H22.4493C22.062 26.5701 21.7461 26.2542 21.7461 25.8669V22.8282C21.7461 22.4409 22.062 22.125 22.4493 22.125ZM34.6641 22.125H35.1554C35.5427 22.125 35.8586 22.4409 35.8586 22.8282V25.8669C35.8586 26.2542 35.5427 26.5701 35.1554 26.5701H34.6641C34.2768 26.5701 33.9608 26.2542 33.9608 25.8669V22.8282C33.9608 22.4409 34.2768 22.125 34.6641 22.125Z"
                        fill="#D4D4D4"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M31.5918 23.332C31.197 23.332 30.8741 23.655 30.8741 24.0497V26.0522C30.8741 26.4469 31.197 26.7699 31.5918 26.7699C31.9865 26.7699 32.3095 26.4469 32.3095 26.0522V24.0497C32.3095 23.655 31.9865 23.332 31.5918 23.332ZM25.8778 23.332C26.2726 23.332 26.5955 23.655 26.5955 24.0497V26.0522C26.5955 26.4469 26.2726 26.7699 25.8778 26.7699C25.4831 26.7699 25.1602 26.4469 25.1602 26.0522V24.0497C25.1602 23.655 25.4831 23.332 25.8778 23.332Z"
                        fill="#D4D4D4"
                      />
                      <mask id="path-7-inside-1_6627_38891" fill="white">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.0643 26.0539C32.0643 26.3141 31.8525 26.5254 31.5928 26.5254C31.3314 26.5254 31.1197 26.3141 31.1197 26.0539V24.0514C31.1197 23.7912 31.3314 23.5796 31.5928 23.5796C31.8525 23.5796 32.0643 23.7912 32.0643 24.0514V26.0539ZM30.6284 34.8749H28.9807V29.7368C28.9807 29.6012 28.8715 29.4909 28.7342 29.4909C28.5986 29.4909 28.4894 29.6012 28.4894 29.7368V34.8749H26.8417V24.5917H30.6284V34.8749ZM25.8789 26.5254C25.6175 26.5254 25.4074 26.3141 25.4074 26.0539V24.0514C25.4074 23.7911 25.6175 23.5796 25.8789 23.5796C26.1387 23.5796 26.3504 23.7912 26.3504 24.0514V26.0539C26.3504 26.3141 26.1387 26.5254 25.8789 26.5254ZM31.2768 22.9481H26.1932C26.0212 22.9481 25.8607 23.0041 25.7317 23.0987C25.7797 23.0912 25.8276 23.0874 25.8789 23.0874C26.41 23.0874 26.8417 23.5198 26.8417 24.0514V24.0995H30.6284V24.0514C30.6284 23.5198 31.0601 23.0874 31.5928 23.0874C31.6424 23.0874 31.6904 23.0912 31.7384 23.0987C31.6094 23.0041 31.4506 22.9481 31.2768 22.9481ZM23.3991 25.8651C23.3991 26.1172 23.194 26.3222 22.9409 26.3222H22.4512C22.1981 26.3222 21.993 26.1172 21.993 25.8651V22.8262C21.993 22.5741 22.1981 22.3691 22.4512 22.3691H22.9409C23.194 22.3691 23.3991 22.5741 23.3991 22.8262L23.3991 25.8651ZM34.2082 22.8262C34.2082 22.5741 34.4134 22.3691 34.6648 22.3691H35.1561C35.4076 22.3691 35.6144 22.5741 35.6144 22.8262V25.8651C35.6144 26.1172 35.4076 26.3222 35.1561 26.3222H34.6648C34.4134 26.3222 34.2082 26.1172 34.2082 25.8651V22.8262ZM33.7152 24.5917V25.8651C33.7152 26.3885 34.142 26.8143 34.6648 26.8143H35.1561C35.6806 26.8143 36.1057 26.3885 36.1057 25.8651V22.8262C36.1057 22.3026 35.6806 21.877 35.1561 21.877H34.6648C34.1421 21.877 33.7152 22.3026 33.7152 22.8262V24.0995H32.5556V23.7351C32.5556 23.0297 31.9816 22.456 31.2768 22.456H26.1932C25.4885 22.456 24.9144 23.0297 24.9144 23.7351V24.0995H23.8904V22.8262C23.8904 22.3026 23.4653 21.877 22.9409 21.877H22.4512C21.9268 21.877 21.5 22.3026 21.5 22.8262V25.8651C21.5 26.3885 21.9268 26.8143 22.4512 26.8143H22.9409C23.4653 26.8143 23.8904 26.3885 23.8904 25.8651V24.5917H24.9144V26.0539C24.9144 26.5851 25.3462 27.0175 25.8789 27.0175C26.0493 27.0175 26.2097 26.9725 26.3504 26.8938V35.121C26.3504 35.2572 26.4596 35.3672 26.5952 35.3672H30.8748C31.0105 35.3672 31.1197 35.2572 31.1197 35.121V26.8938C31.2603 26.9725 31.4207 27.0175 31.5928 27.0175C32.1238 27.0175 32.5556 26.5851 32.5556 26.0539V24.5917H33.7152ZM28.7342 18.4922C29.5266 18.4922 30.1701 19.1358 30.1701 19.9273C30.1701 20.7182 29.5266 21.3623 28.7342 21.3623C27.9435 21.3623 27.2999 20.7182 27.2999 19.9273C27.2999 19.1358 27.9435 18.4922 28.7342 18.4922ZM28.7342 21.8545C29.7979 21.8545 30.6615 20.9896 30.6615 19.9273C30.6615 18.8644 29.7979 18 28.7342 18C27.6722 18 26.8086 18.8644 26.8086 19.9272C26.8086 20.9896 27.6722 21.8545 28.7342 21.8545Z"
                        />
                      </mask>
                      <path
                        d="M30.6284 34.8749V37.8749H33.6284V34.8749H30.6284ZM28.9807 34.8749H25.9807V37.8749H28.9807V34.8749ZM28.4894 34.8749V37.8749H31.4894V34.8749H28.4894ZM26.8417 34.8749H23.8417V37.8749H26.8417V34.8749ZM26.8417 24.5917V21.5917H23.8417V24.5917H26.8417ZM30.6284 24.5917H33.6284V21.5917H30.6284V24.5917ZM25.7317 23.0987L23.9577 20.6794L26.1921 26.0631L25.7317 23.0987ZM26.8417 24.0995H23.8417V27.0995H26.8417V24.0995ZM30.6284 24.0995V27.0995H33.6284V24.0995H30.6284ZM31.7384 23.0987L31.278 26.0631L33.5123 20.6794L31.7384 23.0987ZM23.3991 25.8651H26.3991V25.8651L23.3991 25.8651ZM23.3991 22.8262H20.3991V22.8263L23.3991 22.8262ZM33.7152 24.5917H36.7152V21.5917H33.7152V24.5917ZM33.7152 24.0995V27.0995H36.7152V24.0995H33.7152ZM32.5556 24.0995H29.5556V27.0995H32.5556V24.0995ZM24.9144 24.0995V27.0995H27.9144V24.0995H24.9144ZM23.8904 24.0995H20.8904V27.0995H23.8904V24.0995ZM23.8904 24.5917V21.5917H20.8904V24.5917H23.8904ZM24.9144 24.5917H27.9144V21.5917H24.9144V24.5917ZM26.3504 26.8938H29.3504V21.7754L24.8846 24.2762L26.3504 26.8938ZM31.1197 26.8938L32.5855 24.2762L28.1197 21.7754V26.8938H31.1197ZM32.5556 24.5917V21.5917H29.5556V24.5917H32.5556ZM29.0643 26.0539C29.0643 24.6552 30.1977 23.5254 31.5928 23.5254V29.5254C33.5073 29.5254 35.0643 27.973 35.0643 26.0539H29.0643ZM31.5928 23.5254C32.9794 23.5254 34.1197 24.6484 34.1197 26.0539H28.1197C28.1197 27.9798 29.6834 29.5254 31.5928 29.5254V23.5254ZM34.1197 26.0539V24.0514H28.1197V26.0539H34.1197ZM34.1197 24.0514C34.1197 25.4543 32.982 26.5796 31.5928 26.5796V20.5796C29.6808 20.5796 28.1197 22.1281 28.1197 24.0514H34.1197ZM31.5928 26.5796C30.195 26.5796 29.0643 25.4474 29.0643 24.0514H35.0643C35.0643 22.1351 33.5101 20.5796 31.5928 20.5796V26.5796ZM29.0643 24.0514V26.0539H35.0643V24.0514H29.0643ZM30.6284 31.8749H28.9807V37.8749H30.6284V31.8749ZM31.9807 34.8749V29.7368H25.9807V34.8749H31.9807ZM31.9807 29.7368C31.9807 27.9493 30.5333 26.4909 28.7342 26.4909V32.4909C27.2096 32.4909 25.9807 31.253 25.9807 29.7368H31.9807ZM28.7342 26.4909C26.9236 26.4909 25.4894 27.9625 25.4894 29.7368H31.4894C31.4894 31.2398 30.2736 32.4909 28.7342 32.4909V26.4909ZM25.4894 29.7368V34.8749H31.4894V29.7368H25.4894ZM28.4894 31.8749H26.8417V37.8749H28.4894V31.8749ZM29.8417 34.8749V24.5917H23.8417V34.8749H29.8417ZM26.8417 27.5917H30.6284V21.5917H26.8417V27.5917ZM27.6284 24.5917V34.8749H33.6284V24.5917H27.6284ZM25.8789 23.5254C27.2792 23.5254 28.4074 24.6621 28.4074 26.0539H22.4074C22.4074 27.9661 23.9559 29.5254 25.8789 29.5254V23.5254ZM28.4074 26.0539V24.0514H22.4074V26.0539H28.4074ZM28.4074 24.0514C28.4074 25.4406 27.2818 26.5796 25.8789 26.5796V20.5796C23.9532 20.5796 22.4074 22.1417 22.4074 24.0514H28.4074ZM25.8789 26.5796C24.4811 26.5796 23.3504 25.4473 23.3504 24.0514H29.3504C29.3504 22.1351 27.7962 20.5796 25.8789 20.5796V26.5796ZM23.3504 24.0514V26.0539H29.3504V24.0514H23.3504ZM23.3504 26.0539C23.3504 24.6552 24.4838 23.5254 25.8789 23.5254V29.5254C27.7935 29.5254 29.3504 27.973 29.3504 26.0539H23.3504ZM31.2768 19.9481H26.1932V25.9481H31.2768V19.9481ZM26.1932 19.9481C25.3657 19.9481 24.587 20.2179 23.9577 20.6794L27.5056 25.518C27.1344 25.7902 26.6766 25.9481 26.1932 25.9481V19.9481ZM26.1921 26.0631C26.0874 26.0794 25.9814 26.0874 25.8789 26.0874V20.0874C25.6739 20.0874 25.472 20.103 25.2713 20.1342L26.1921 26.0631ZM25.8789 26.0874C24.7494 26.0874 23.8417 25.173 23.8417 24.0514H29.8417C29.8417 21.8667 28.0705 20.0874 25.8789 20.0874V26.0874ZM23.8417 24.0514V24.0995H29.8417V24.0514H23.8417ZM26.8417 27.0995H30.6284V21.0995H26.8417V27.0995ZM33.6284 24.0995V24.0514H27.6284V24.0995H33.6284ZM33.6284 24.0514C33.6284 25.1763 32.7173 26.0874 31.5928 26.0874V20.0874C29.4029 20.0874 27.6284 21.8634 27.6284 24.0514H33.6284ZM31.5928 26.0874C31.4861 26.0874 31.3801 26.079 31.278 26.0631L32.1988 20.1342C32.0007 20.1034 31.7988 20.0874 31.5928 20.0874V26.0874ZM33.5123 20.6794C32.8858 20.2199 32.1093 19.9481 31.2768 19.9481V25.9481C30.7918 25.9481 30.333 25.7882 29.9644 25.518L33.5123 20.6794ZM20.3991 25.8651C20.3991 24.4547 21.5428 23.3222 22.9409 23.3222V29.3222C24.8452 29.3222 26.3991 27.7798 26.3991 25.8651H20.3991ZM22.9409 23.3222H22.4512V29.3222H22.9409V23.3222ZM22.4512 23.3222C23.8493 23.3222 24.993 24.4547 24.993 25.8651H18.993C18.993 27.7798 20.547 29.3222 22.4512 29.3222V23.3222ZM24.993 25.8651V22.8262H18.993V25.8651H24.993ZM24.993 22.8262C24.993 24.2367 23.8493 25.3691 22.4512 25.3691V19.3691C20.547 19.3691 18.993 20.9116 18.993 22.8262H24.993ZM22.4512 25.3691H22.9409V19.3691H22.4512V25.3691ZM22.9409 25.3691C21.5427 25.3691 20.3991 24.2365 20.3991 22.8262H26.3991C26.3991 20.9117 24.8453 19.3691 22.9409 19.3691V25.3691ZM20.3991 22.8263L20.3991 25.8652L26.3991 25.8651L26.3991 22.8262L20.3991 22.8263ZM37.2082 22.8262C37.2082 24.2296 36.0716 25.3691 34.6648 25.3691V19.3691C32.7552 19.3691 31.2082 20.9186 31.2082 22.8262H37.2082ZM34.6648 25.3691H35.1561V19.3691H34.6648V25.3691ZM35.1561 25.3691C33.7635 25.3691 32.6144 24.2437 32.6144 22.8262H38.6144C38.6144 20.9045 37.0517 19.3691 35.1561 19.3691V25.3691ZM32.6144 22.8262V25.8651H38.6144V22.8262H32.6144ZM32.6144 25.8651C32.6144 24.4476 33.7635 23.3222 35.1561 23.3222V29.3222C37.0517 29.3222 38.6144 27.7868 38.6144 25.8651H32.6144ZM35.1561 23.3222H34.6648V29.3222H35.1561V23.3222ZM34.6648 23.3222C36.0716 23.3222 37.2082 24.4617 37.2082 25.8651H31.2082C31.2082 27.7727 32.7552 29.3222 34.6648 29.3222V23.3222ZM37.2082 25.8651V22.8262H31.2082V25.8651H37.2082ZM30.7152 24.5917V25.8651H36.7152V24.5917H30.7152ZM30.7152 25.8651C30.7152 28.0481 32.4879 29.8143 34.6648 29.8143V23.8143C35.7962 23.8143 36.7152 24.7289 36.7152 25.8651H30.7152ZM34.6648 29.8143H35.1561V23.8143H34.6648V29.8143ZM35.1561 29.8143C37.3381 29.8143 39.1057 28.0447 39.1057 25.8651H33.1057C33.1057 24.7323 34.023 23.8143 35.1561 23.8143V29.8143ZM39.1057 25.8651V22.8262H33.1057V25.8651H39.1057ZM39.1057 22.8262C39.1057 20.6461 37.3377 18.877 35.1561 18.877V24.877C34.0234 24.877 33.1057 23.9592 33.1057 22.8262H39.1057ZM35.1561 18.877H34.6648V24.877H35.1561V18.877ZM34.6648 18.877C32.4884 18.877 30.7152 20.6426 30.7152 22.8262H36.7152C36.7152 23.9627 35.7958 24.877 34.6648 24.877V18.877ZM30.7152 22.8262V24.0995H36.7152V22.8262H30.7152ZM33.7152 21.0995H32.5556V27.0995H33.7152V21.0995ZM35.5556 24.0995V23.7351H29.5556V24.0995H35.5556ZM35.5556 23.7351C35.5556 21.3728 33.6384 19.456 31.2768 19.456V25.456C30.3247 25.456 29.5556 24.6866 29.5556 23.7351H35.5556ZM31.2768 19.456H26.1932V25.456H31.2768V19.456ZM26.1932 19.456C23.8317 19.456 21.9144 21.3728 21.9144 23.7351H27.9144C27.9144 24.6866 27.1453 25.456 26.1932 25.456V19.456ZM21.9144 23.7351V24.0995H27.9144V23.7351H21.9144ZM24.9144 21.0995H23.8904V27.0995H24.9144V21.0995ZM26.8904 24.0995V22.8262H20.8904V24.0995H26.8904ZM26.8904 22.8262C26.8904 20.6461 25.1225 18.877 22.9409 18.877V24.877C21.8082 24.877 20.8904 23.9592 20.8904 22.8262H26.8904ZM22.9409 18.877H22.4512V24.877H22.9409V18.877ZM22.4512 18.877C20.2764 18.877 18.5 20.6393 18.5 22.8262H24.5C24.5 23.966 23.5771 24.877 22.4512 24.877V18.877ZM18.5 22.8262V25.8651H24.5V22.8262H18.5ZM18.5 25.8651C18.5 28.0515 20.2761 29.8143 22.4512 29.8143V23.8143C23.5775 23.8143 24.5 24.7255 24.5 25.8651H18.5ZM22.4512 29.8143H22.9409V23.8143H22.4512V29.8143ZM22.9409 29.8143C25.1227 29.8143 26.8904 28.0448 26.8904 25.8651H20.8904C20.8904 24.7323 21.8078 23.8143 22.9409 23.8143V29.8143ZM26.8904 25.8651V24.5917H20.8904V25.8651H26.8904ZM23.8904 27.5917H24.9144V21.5917H23.8904V27.5917ZM21.9144 24.5917V26.0539H27.9144V24.5917H21.9144ZM21.9144 26.0539C21.9144 28.2421 23.6896 30.0175 25.8789 30.0175V24.0175C27.0028 24.0175 27.9144 24.928 27.9144 26.0539H21.9144ZM25.8789 30.0175C26.5859 30.0175 27.2485 29.8292 27.8162 29.5113L24.8846 24.2762C25.171 24.1158 25.5127 24.0175 25.8789 24.0175V30.0175ZM23.3504 26.8938V35.121H29.3504V26.8938H23.3504ZM23.3504 35.121C23.3504 36.8969 24.7856 38.3672 26.5952 38.3672V32.3672C28.1335 32.3672 29.3504 33.6175 29.3504 35.121H23.3504ZM26.5952 38.3672H30.8748V32.3672H26.5952V38.3672ZM30.8748 38.3672C32.6847 38.3672 34.1197 36.8966 34.1197 35.121H28.1197C28.1197 33.6177 29.3363 32.3672 30.8748 32.3672V38.3672ZM34.1197 35.121V26.8938H28.1197V35.121H34.1197ZM29.6539 29.5113C30.2239 29.8305 30.8868 30.0175 31.5928 30.0175V24.0175C31.9547 24.0175 32.2967 24.1145 32.5855 24.2762L29.6539 29.5113ZM31.5928 30.0175C33.7837 30.0175 35.5556 28.2389 35.5556 26.0539H29.5556C29.5556 24.9313 30.4639 24.0175 31.5928 24.0175V30.0175ZM35.5556 26.0539V24.5917H29.5556V26.0539H35.5556ZM32.5556 27.5917H33.7152V21.5917H32.5556V27.5917ZM28.7342 21.4922C27.8706 21.4922 27.1701 20.7936 27.1701 19.9273H33.1701C33.1701 17.4781 31.1825 15.4922 28.7342 15.4922V21.4922ZM27.1701 19.9273C27.1701 19.0611 27.87 18.3623 28.7342 18.3623V24.3623C31.1832 24.3623 33.1701 22.3753 33.1701 19.9273H27.1701ZM28.7342 18.3623C29.6023 18.3623 30.2999 19.0633 30.2999 19.9273H24.2999C24.2999 22.3731 26.2847 24.3623 28.7342 24.3623V18.3623ZM30.2999 19.9273C30.2999 20.7913 29.6017 21.4922 28.7342 21.4922V15.4922C26.2853 15.4922 24.2999 17.4803 24.2999 19.9273H30.2999ZM28.7342 24.8545C31.4561 24.8545 33.6615 22.6452 33.6615 19.9273H27.6615C27.6615 19.3341 28.1398 18.8545 28.7342 18.8545V24.8545ZM33.6615 19.9273C33.6615 17.2083 31.4556 15 28.7342 15V21C28.1403 21 27.6615 20.5204 27.6615 19.9273H33.6615ZM28.7342 15C26.0128 15 23.8086 17.21 23.8086 19.9272H29.8086C29.8086 20.5187 29.3315 21 28.7342 21V15ZM23.8086 19.9272C23.8086 22.6434 26.0123 24.8545 28.7342 24.8545V18.8545C29.3321 18.8545 29.8086 19.3358 29.8086 19.9272H23.8086Z"
                        fill="#D4D4D4"
                        mask="url(#path-7-inside-1_6627_38891)"
                      />
                      <path
                        d="M1.94271 32.4844C1.94271 33.6279 2.87208 34.5573 4.01562 34.5573H24.5334L24.6027 35.3333H4.01562C2.44528 35.3333 1.16667 34.0547 1.16667 32.4844C1.16667 30.914 2.44528 29.6354 4.01562 29.6354H13.7188C14.8623 29.6354 15.7917 28.706 15.7917 27.5625C15.7917 26.419 14.8623 25.4896 13.7188 25.4896H11.3281C9.75778 25.4896 8.47917 24.211 8.47917 22.6406V22.5339H9.25521V22.6406C9.25521 23.7842 10.1846 24.7135 11.3281 24.7135H13.7188C15.2891 24.7135 16.5677 25.9922 16.5677 27.5625C16.5677 29.1328 15.2891 30.4115 13.7188 30.4115H4.01562C2.87208 30.4115 1.94271 31.3408 1.94271 32.4844Z"
                        fill="#D4D4D4"
                        stroke="#D4D4D4"
                        strokeWidth="1.33333"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6627_38891">
                        <rect
                          width="36"
                          height="36"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}
                <span
                  className={`${singleCategory === "FitnessStory" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  FITNESS STORY
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Workout"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Workout")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Workout" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M29.6518 2.15018C26.824 -0.641722 22.2655 -0.625339 19.4635 2.21437L18.0005 3.69494L16.5384 2.21451C13.7335 -0.625761 9.17716 -0.6413 6.34989 2.15025C3.52326 4.94144 3.49443 9.51204 6.2857 12.3387L17.4797 23.6741C17.766 23.9639 18.2345 23.9643 18.5211 23.6741L29.715 12.3387C32.5139 9.5055 32.4847 4.94861 29.6519 2.15025C29.6519 2.15032 29.6518 2.15025 29.6518 2.15018ZM24.9526 12.5124H22.0254C21.7807 12.5124 21.5523 12.3901 21.4165 12.1865L20.7023 11.1152L19.039 14.9961C18.9127 15.291 18.6112 15.4657 18.2984 15.4364C17.9821 15.4068 17.721 15.1766 17.6521 14.8665L16.5337 9.83358L15.2929 11.4879C15.1547 11.6721 14.9379 11.7806 14.7075 11.7806H11.0486C10.6444 11.7806 10.3168 11.4529 10.3168 11.0488C10.3168 10.6446 10.6444 10.317 11.0486 10.317H14.3417L16.3175 7.68251C16.489 7.45385 16.7781 7.34613 17.0572 7.40625C17.3366 7.46651 17.5553 7.68391 17.6173 7.96291L18.5883 12.3325L19.8893 9.29688C19.995 9.05001 20.2276 8.88098 20.495 8.85644C20.7626 8.8319 21.0219 8.95579 21.1708 9.17925L22.4171 11.0487H24.9527C25.3568 11.0487 25.6845 11.3764 25.6845 11.7805C25.6845 12.1847 25.3568 12.5124 24.9526 12.5124Z"
                      fill="url(#paint0_linear_8279_37869)"
                    />
                    <path
                      d="M27.1484 35.9287H30.8074C30.8074 33.5201 30.8074 26.4678 30.8074 23.4883H27.1484V35.9287Z"
                      fill="url(#paint1_linear_8279_37869)"
                    />
                    <path
                      d="M5.19531 35.9287H8.85423C8.85423 34.4174 8.85423 24.9082 8.85423 23.4883H5.19531V35.9287Z"
                      fill="url(#paint2_linear_8279_37869)"
                    />
                    <path
                      d="M0.804688 25.6836H3.73187V33.7333H0.804688V25.6836Z"
                      fill="url(#paint3_linear_8279_37869)"
                    />
                    <path
                      d="M10.3164 28.2461H25.684V31.1733H10.3164V28.2461Z"
                      fill="url(#paint4_linear_8279_37869)"
                    />
                    <path
                      d="M32.2734 25.6836H35.2006V33.7333H32.2734V25.6836Z"
                      fill="url(#paint5_linear_8279_37869)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_37869"
                        x1="3.14999"
                        y1="15.2754"
                        x2="32.7239"
                        y2="15.281"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_37869"
                        x1="27.0077"
                        y1="31.429"
                        x2="30.9305"
                        y2="31.4292"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_37869"
                        x1="5.05458"
                        y1="31.429"
                        x2="8.97738"
                        y2="31.4292"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_37869"
                        x1="0.692104"
                        y1="30.8217"
                        x2="3.83039"
                        y2="30.8219"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_8279_37869"
                        x1="9.72535"
                        y1="30.1145"
                        x2="26.2012"
                        y2="30.1285"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_8279_37869"
                        x1="32.1609"
                        y1="30.8217"
                        x2="35.2991"
                        y2="30.8219"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="24"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M29.6518 2.15018C26.824 -0.641722 22.2655 -0.625339 19.4635 2.21437L18.0005 3.69494L16.5384 2.21451C13.7335 -0.625761 9.17716 -0.6413 6.34989 2.15025C3.52326 4.94144 3.49443 9.51204 6.2857 12.3387L17.4797 23.6741C17.766 23.9639 18.2345 23.9643 18.5211 23.6741L29.715 12.3387C32.5139 9.5055 32.4847 4.94861 29.6519 2.15025C29.6519 2.15032 29.6518 2.15025 29.6518 2.15018ZM24.9526 12.5124H22.0254C21.7807 12.5124 21.5523 12.3901 21.4165 12.1865L20.7023 11.1152L19.039 14.9961C18.9127 15.291 18.6112 15.4657 18.2984 15.4364C17.9821 15.4068 17.721 15.1766 17.6521 14.8665L16.5337 9.83358L15.2929 11.4879C15.1547 11.6721 14.9379 11.7806 14.7075 11.7806H11.0486C10.6444 11.7806 10.3168 11.4529 10.3168 11.0488C10.3168 10.6446 10.6444 10.317 11.0486 10.317H14.3417L16.3175 7.68251C16.489 7.45385 16.7781 7.34613 17.0572 7.40625C17.3366 7.46651 17.5553 7.68391 17.6173 7.96291L18.5883 12.3325L19.8893 9.29688C19.995 9.05001 20.2276 8.88098 20.495 8.85644C20.7626 8.8319 21.0219 8.95579 21.1708 9.17925L22.4171 11.0487H24.9527C25.3568 11.0487 25.6845 11.3764 25.6845 11.7805C25.6845 12.1847 25.3568 12.5124 24.9526 12.5124Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M27.1484 35.9287H30.8074C30.8074 33.5201 30.8074 26.4678 30.8074 23.4883H27.1484V35.9287Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M5.19531 35.9287H8.85423C8.85423 34.4174 8.85423 24.9082 8.85423 23.4883H5.19531V35.9287Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M0.804688 25.6836H3.73187V33.7333H0.804688V25.6836Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M10.3164 28.2461H25.684V31.1733H10.3164V28.2461Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M32.2734 25.6836H35.2006V33.7333H32.2734V25.6836Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Workout" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  WORKOUT
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Men'sHealth"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Men'sHealth")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Men'sHealth" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16.4082 19.8328L15.8887 18.3594C15.1832 18.6903 14.3637 18.8579 13.4446 18.8579C12.5156 18.8579 11.6883 18.6822 10.9772 18.3359L10.2645 19.8011C10.2398 19.8521 10.2049 19.8976 10.1622 19.9348C10.1194 19.972 10.0696 20.0003 10.0157 20.0178C9.88155 20.0615 9.7435 20.1047 9.60156 20.1477C9.68966 20.6221 9.99194 21.2875 10.5437 21.8791C10.9117 22.281 11.3603 22.6008 11.8602 22.8177C12.3601 23.0345 12.9001 23.1436 13.445 23.1377C15.0692 23.1377 16.0448 22.2869 16.505 21.7377C16.6671 21.2206 16.8794 20.7207 17.1387 20.245C16.9717 20.1924 16.8163 20.1416 16.6704 20.0919C16.6099 20.0713 16.5549 20.0373 16.5095 19.9925C16.4641 19.9476 16.4295 19.893 16.4082 19.8328Z"
                      fill="url(#paint0_linear_8279_38040)"
                    />
                    <path
                      d="M16.1247 24.232C16.1248 23.8697 16.1482 23.5077 16.195 23.1484C15.3862 23.7023 14.4259 23.9925 13.4458 23.9794C12.7849 23.9865 12.13 23.8541 11.5238 23.591C10.9176 23.3279 10.3736 22.9399 9.9274 22.4525C9.34929 21.8323 8.93487 21.0658 8.78904 20.3828C8.63224 20.4272 8.47287 20.472 8.31091 20.5173C5.03597 21.435 0.960938 22.5772 0.960938 26.103V30.5143C0.960938 31.0302 1.19923 31.7499 1.58721 31.7499H20.8285C19.4191 31.063 18.231 29.9941 17.3993 28.665C16.5677 27.3358 16.1261 25.7999 16.1247 24.232Z"
                      fill="url(#paint1_linear_8279_38040)"
                    />
                    <path
                      d="M13.6172 6.27394C13.773 6.2847 13.9266 6.29841 14.0769 6.31184C15.3636 6.4268 16.2137 6.50267 17.0273 4.71286C17.0603 4.64033 17.1132 4.57861 17.1797 4.53486C17.2463 4.49111 17.3239 4.46711 17.4036 4.46563C17.4833 4.46416 17.5617 4.48528 17.6299 4.52655C17.6981 4.56781 17.7531 4.62753 17.7888 4.6988L17.8295 4.78051C18.3561 5.34842 18.716 6.39692 18.9562 7.41912C18.9929 6.94156 19.0159 6.54022 19.0159 6.38286C19.0159 6.21945 19.0191 6.05562 19.0225 5.88216C19.0464 4.64656 19.0734 3.24608 17.8596 2.01842C16.704 0.849474 15.0636 0.205623 13.3584 0.252381C11.6613 0.298787 10.0739 1.01837 9.00321 2.22662C8.96416 2.27063 8.92458 2.31502 8.88445 2.35979C8.16846 3.1598 7.35691 4.06662 7.4216 6.63001C7.42547 6.78575 7.51666 7.24573 7.63858 7.77188C7.77745 6.92553 8.06166 6.0128 8.63091 5.40235C8.84439 5.16747 9.10565 4.98099 9.39716 4.85544C9.68867 4.72988 10.0037 4.66815 10.321 4.6744C10.9499 4.6744 11.1648 5.29569 11.3728 5.89651C11.6899 6.81268 12.043 7.83256 13.5256 7.9227C12.7625 7.06756 12.8951 6.75924 12.9585 6.61186C13.0064 6.49965 13.1669 6.24293 13.6172 6.27394Z"
                      fill="url(#paint2_linear_8279_38040)"
                    />
                    <path
                      d="M18.0285 13.4854C18.0976 13.441 18.1785 13.4185 18.2606 13.4211H18.2734C18.9695 13.4211 19.7804 12.3777 20.0861 11.084C20.1947 10.6228 20.0442 10.2745 19.8394 10.169C19.6545 10.0739 19.4723 10.2055 19.3607 10.3193C19.3321 10.3928 19.2836 10.4568 19.2205 10.5041C19.1575 10.5514 19.0824 10.5801 19.0039 10.5869C18.9916 10.588 18.9794 10.5885 18.9673 10.5885C18.8618 10.5884 18.7601 10.5487 18.6823 10.4773C18.6046 10.4059 18.5565 10.3079 18.5474 10.2027C18.4661 9.25807 18.1256 6.83749 17.4636 5.7023C16.454 7.37257 15.2105 7.26141 14.0038 7.15362L13.9855 7.15207C14.231 7.44712 14.4962 7.72523 14.7792 7.9845C14.838 8.03855 14.8802 8.10817 14.901 8.18527C14.9218 8.26236 14.9203 8.34377 14.8966 8.42003C14.8729 8.49629 14.8281 8.56427 14.7674 8.61607C14.7066 8.66787 14.6324 8.70136 14.5533 8.71266C11.6017 9.13453 10.9604 7.28095 10.5772 6.17353C10.4983 5.94579 10.3813 5.60766 10.2979 5.51963C10.1008 5.51733 9.90537 5.55703 9.72474 5.6361C9.5441 5.71517 9.38236 5.83179 9.25029 5.9782C8.8249 6.43411 8.53697 7.23989 8.41765 8.30829C8.36039 8.82633 8.3448 9.34813 8.37103 9.86866C8.37715 9.95727 8.35499 10.0455 8.30775 10.1207C8.30091 10.2017 8.27078 10.2789 8.22102 10.3431C8.17126 10.4073 8.10398 10.4557 8.02731 10.4825C7.95064 10.5093 7.86785 10.5134 7.78893 10.4942C7.71001 10.475 7.63833 10.4333 7.58255 10.3743C7.39692 10.1787 7.19808 10.1166 7.03678 10.2036C6.8494 10.305 6.69717 10.6238 6.80588 11.0844C7.11188 12.3778 7.92272 13.4213 8.61881 13.4213C8.62584 13.4213 8.63287 13.4213 8.63991 13.4213C8.74931 13.421 8.85455 13.4633 8.93331 13.5392C9.01206 13.6152 9.05814 13.7188 9.06178 13.8282C9.08991 14.2354 9.31441 16.3205 10.9963 17.3823C11.6598 17.8018 12.4841 18.0144 13.4463 18.0144C14.4109 18.0144 15.2368 17.8066 15.901 17.3967C15.9033 17.3952 15.9054 17.3937 15.908 17.3922C17.6156 16.3317 17.8094 14.2415 17.8309 13.8328C17.8325 13.7631 17.8515 13.6948 17.8859 13.6342C17.9204 13.5736 17.9694 13.5225 18.0285 13.4854Z"
                      fill="url(#paint3_linear_8279_38040)"
                    />
                    <path
                      d="M25.4088 22.5689V20.8398H23.713V22.5689C23.713 22.858 23.4786 23.0924 23.1896 23.0924H21.4609V24.7881H23.1896C23.4786 24.7881 23.713 25.0225 23.713 25.3116V27.0407H25.4088V25.3116C25.4088 25.0225 25.6431 24.7881 25.9322 24.7881H27.6618V23.0924H25.9322C25.6431 23.0924 25.4088 22.858 25.4088 22.5689Z"
                      fill="url(#paint4_linear_8279_38040)"
                    />
                    <path
                      d="M18 17.5V25.188C17.9998 28.8118 20.9372 31.7498 24.561 31.75H24.5615C28.1853 31.75 31.123 28.8123 31.123 25.1885C31.123 25.1883 31.123 25.1882 31.123 25.188V17.5H18ZM28.7087 25.3107C28.709 25.5992 28.4753 25.8333 28.1868 25.8336C28.1865 25.8336 28.1861 25.8336 28.1858 25.8336H26.4557V27.5632C26.4557 27.852 26.2216 28.0861 25.9328 28.0861H23.1902C22.9014 28.0861 22.6673 27.852 22.6673 27.5632V25.8336H20.9387C20.6498 25.8338 20.4155 25.5999 20.4152 25.3111C20.4152 25.311 20.4152 25.3108 20.4152 25.3107V22.568C20.4152 22.2792 20.6494 22.0451 20.9382 22.0451H20.9387H22.6673V20.3175C22.6673 20.0286 22.9014 19.7945 23.1902 19.7945H25.9328C26.2216 19.7945 26.4557 20.0286 26.4557 20.3175V22.047H28.1858C28.4744 22.0468 28.7085 22.2804 28.7087 22.569V22.57V25.3107Z"
                      fill="url(#paint5_linear_8279_38040)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_38040"
                        x1="9.31167"
                        y1="21.401"
                        x2="17.3924"
                        y2="21.4031"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_38040"
                        x1="0.1968"
                        y1="27.6384"
                        x2="21.4972"
                        y2="27.6444"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_38040"
                        x1="6.97138"
                        y1="5.14747"
                        x2="19.4201"
                        y2="5.15052"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_38040"
                        x1="6.25596"
                        y1="13.495"
                        x2="20.5718"
                        y2="13.4975"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_8279_38040"
                        x1="21.2224"
                        y1="24.7978"
                        x2="27.8705"
                        y2="24.7989"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_8279_38040"
                        x1="17.4953"
                        y1="26.5957"
                        x2="31.5647"
                        y2="26.5978"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16.4082 19.8328L15.8887 18.3594C15.1832 18.6903 14.3637 18.8579 13.4446 18.8579C12.5156 18.8579 11.6883 18.6822 10.9772 18.3359L10.2645 19.8011C10.2398 19.8521 10.2049 19.8976 10.1622 19.9348C10.1194 19.972 10.0696 20.0003 10.0157 20.0178C9.88155 20.0615 9.7435 20.1047 9.60156 20.1477C9.68966 20.6221 9.99194 21.2875 10.5437 21.8791C10.9117 22.281 11.3603 22.6008 11.8602 22.8177C12.3601 23.0345 12.9001 23.1436 13.445 23.1377C15.0692 23.1377 16.0448 22.2869 16.505 21.7377C16.6671 21.2206 16.8794 20.7207 17.1387 20.245C16.9717 20.1924 16.8163 20.1416 16.6704 20.0919C16.6099 20.0713 16.5549 20.0373 16.5095 19.9925C16.4641 19.9476 16.4295 19.893 16.4082 19.8328Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M16.1247 24.232C16.1248 23.8697 16.1482 23.5077 16.195 23.1484C15.3862 23.7023 14.4259 23.9925 13.4458 23.9794C12.7849 23.9865 12.13 23.8541 11.5238 23.591C10.9176 23.3279 10.3736 22.9399 9.9274 22.4525C9.34929 21.8323 8.93487 21.0658 8.78904 20.3828C8.63224 20.4272 8.47287 20.472 8.31091 20.5173C5.03597 21.435 0.960938 22.5772 0.960938 26.103V30.5143C0.960938 31.0302 1.19923 31.7499 1.58721 31.7499H20.8285C19.4191 31.063 18.231 29.9941 17.3993 28.665C16.5677 27.3358 16.1261 25.7999 16.1247 24.232Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M13.6172 6.27394C13.773 6.2847 13.9266 6.29841 14.0769 6.31184C15.3636 6.4268 16.2137 6.50267 17.0273 4.71286C17.0603 4.64033 17.1132 4.57861 17.1797 4.53486C17.2463 4.49111 17.3239 4.46711 17.4036 4.46563C17.4833 4.46416 17.5617 4.48528 17.6299 4.52655C17.6981 4.56781 17.7531 4.62753 17.7888 4.6988L17.8295 4.78051C18.3561 5.34842 18.716 6.39692 18.9562 7.41912C18.9929 6.94156 19.0159 6.54022 19.0159 6.38286C19.0159 6.21945 19.0191 6.05562 19.0225 5.88216C19.0464 4.64656 19.0734 3.24608 17.8596 2.01842C16.704 0.849474 15.0636 0.205623 13.3584 0.252381C11.6613 0.298787 10.0739 1.01837 9.00321 2.22662C8.96416 2.27063 8.92458 2.31502 8.88445 2.35979C8.16846 3.1598 7.35691 4.06662 7.4216 6.63001C7.42547 6.78575 7.51666 7.24573 7.63858 7.77188C7.77745 6.92553 8.06166 6.0128 8.63091 5.40235C8.84439 5.16747 9.10565 4.98099 9.39716 4.85544C9.68867 4.72988 10.0037 4.66815 10.321 4.6744C10.9499 4.6744 11.1648 5.29569 11.3728 5.89651C11.6899 6.81268 12.043 7.83256 13.5256 7.9227C12.7625 7.06756 12.8951 6.75924 12.9585 6.61186C13.0064 6.49965 13.1669 6.24293 13.6172 6.27394Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18.0285 13.4854C18.0976 13.441 18.1785 13.4185 18.2606 13.4211H18.2734C18.9695 13.4211 19.7804 12.3777 20.0861 11.084C20.1947 10.6228 20.0442 10.2745 19.8394 10.169C19.6545 10.0739 19.4723 10.2055 19.3607 10.3193C19.3321 10.3928 19.2836 10.4568 19.2205 10.5041C19.1575 10.5514 19.0824 10.5801 19.0039 10.5869C18.9916 10.588 18.9794 10.5885 18.9673 10.5885C18.8618 10.5884 18.7601 10.5487 18.6823 10.4773C18.6046 10.4059 18.5565 10.3079 18.5474 10.2027C18.4661 9.25807 18.1256 6.83749 17.4636 5.7023C16.454 7.37257 15.2105 7.26141 14.0038 7.15362L13.9855 7.15207C14.231 7.44712 14.4962 7.72523 14.7792 7.9845C14.838 8.03855 14.8802 8.10817 14.901 8.18527C14.9218 8.26236 14.9203 8.34377 14.8966 8.42003C14.8729 8.49629 14.8281 8.56427 14.7674 8.61607C14.7066 8.66787 14.6324 8.70136 14.5533 8.71266C11.6017 9.13453 10.9604 7.28095 10.5772 6.17353C10.4983 5.94579 10.3813 5.60766 10.2979 5.51963C10.1008 5.51733 9.90537 5.55703 9.72474 5.6361C9.5441 5.71517 9.38236 5.83179 9.25029 5.9782C8.8249 6.43411 8.53697 7.23989 8.41765 8.30829C8.36039 8.82633 8.3448 9.34813 8.37103 9.86866C8.37715 9.95727 8.35499 10.0455 8.30775 10.1207C8.30091 10.2017 8.27078 10.2789 8.22102 10.3431C8.17126 10.4073 8.10398 10.4557 8.02731 10.4825C7.95064 10.5093 7.86785 10.5134 7.78893 10.4942C7.71001 10.475 7.63833 10.4333 7.58255 10.3743C7.39692 10.1787 7.19808 10.1166 7.03678 10.2036C6.8494 10.305 6.69717 10.6238 6.80588 11.0844C7.11188 12.3778 7.92272 13.4213 8.61881 13.4213C8.62584 13.4213 8.63287 13.4213 8.63991 13.4213C8.74931 13.421 8.85455 13.4633 8.93331 13.5392C9.01206 13.6152 9.05814 13.7188 9.06178 13.8282C9.08991 14.2354 9.31441 16.3205 10.9963 17.3823C11.6598 17.8018 12.4841 18.0144 13.4463 18.0144C14.4109 18.0144 15.2368 17.8066 15.901 17.3967C15.9033 17.3952 15.9054 17.3937 15.908 17.3922C17.6156 16.3317 17.8094 14.2415 17.8309 13.8328C17.8325 13.7631 17.8515 13.6948 17.8859 13.6342C17.9204 13.5736 17.9694 13.5225 18.0285 13.4854Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M25.4088 22.5689V20.8398H23.713V22.5689C23.713 22.858 23.4786 23.0924 23.1896 23.0924H21.4609V24.7881H23.1896C23.4786 24.7881 23.713 25.0225 23.713 25.3116V27.0407H25.4088V25.3116C25.4088 25.0225 25.6431 24.7881 25.9322 24.7881H27.6618V23.0924H25.9322C25.6431 23.0924 25.4088 22.858 25.4088 22.5689Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18 17.5V25.188C17.9998 28.8118 20.9372 31.7498 24.561 31.75H24.5615C28.1853 31.75 31.123 28.8123 31.123 25.1885C31.123 25.1883 31.123 25.1882 31.123 25.188V17.5H18ZM28.7087 25.3107C28.709 25.5992 28.4753 25.8333 28.1868 25.8336C28.1865 25.8336 28.1861 25.8336 28.1858 25.8336H26.4557V27.5632C26.4557 27.852 26.2216 28.0861 25.9328 28.0861H23.1902C22.9014 28.0861 22.6673 27.852 22.6673 27.5632V25.8336H20.9387C20.6498 25.8338 20.4155 25.5999 20.4152 25.3111C20.4152 25.311 20.4152 25.3108 20.4152 25.3107V22.568C20.4152 22.2792 20.6494 22.0451 20.9382 22.0451H20.9387H22.6673V20.3175C22.6673 20.0286 22.9014 19.7945 23.1902 19.7945H25.9328C26.2216 19.7945 26.4557 20.0286 26.4557 20.3175V22.047H28.1858C28.4744 22.0468 28.7085 22.2804 28.7087 22.569V22.57V25.3107Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Men'sHealth" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  MEN&apos;S HEALTH
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Women'sHealth"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Women'sHealth")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Women'sHealth" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="24"
                    viewBox="0 0 37 36"
                    fill="none"
                  >
                    <path
                      d="M5.19141 31.5117H10.2438V34.4125H5.19141V31.5117Z"
                      fill="url(#paint0_linear_7678_44431)"
                    />
                    <path
                      d="M27.0092 24.4479V22.4336H25.0337V24.4479C25.0337 24.7846 24.7606 25.0577 24.4239 25.0577H22.4102V27.0332H24.4239C24.7606 27.0332 25.0337 27.3062 25.0337 27.6429V29.6572H27.0092V27.6429C27.0092 27.3062 27.2822 27.0332 27.6189 27.0332H29.6338V25.0577H27.6189C27.2822 25.0577 27.0092 24.7846 27.0092 24.4479Z"
                      fill="url(#paint1_linear_7678_44431)"
                    />
                    <path
                      d="M20.4903 34.4149C18.3855 32.7374 17.1589 30.1928 17.158 27.5012V20.9762C17.1125 20.9762 17.0675 20.9835 17.0219 20.9835C15.2194 20.9809 13.6735 19.6971 13.3398 17.9258H12.419C8.62413 17.9274 5.47259 20.8549 5.19141 24.6392V30.2952H10.2438V27.3955H11.4627V34.4149H20.4903Z"
                      fill="url(#paint2_linear_7678_44431)"
                    />
                    <path
                      d="M18.375 18.543V27.4991C18.3747 31.7207 21.7967 35.1432 26.0182 35.1435H26.0188C30.2404 35.1435 33.6626 31.7212 33.6626 27.4997C33.6626 27.4994 33.6626 27.4993 33.6626 27.4991V18.543H18.375ZM30.8501 27.642C30.8504 27.9781 30.5782 28.2509 30.2421 28.2512C30.2417 28.2512 30.2413 28.2512 30.2409 28.2512H28.2255V30.266C28.2255 30.6025 27.9528 30.8752 27.6163 30.8752H24.4213C24.0849 30.8752 23.8121 30.6025 23.8121 30.266V28.2512H21.7984C21.4619 28.2514 21.1889 27.979 21.1886 27.6425C21.1886 27.6423 21.1886 27.6422 21.1886 27.642V24.447C21.1886 24.1105 21.4614 23.8378 21.7978 23.8378H21.7984H23.8121V21.8252C23.8121 21.4887 24.0849 21.216 24.4213 21.216H27.6163C27.9528 21.216 28.2255 21.4887 28.2255 21.8252V23.84H30.2409C30.5771 23.8398 30.8498 24.1119 30.8501 24.4481V24.4492V27.642Z"
                      fill="url(#paint3_linear_7678_44431)"
                    />
                    <path
                      d="M17.5442 9.07809L16.6442 9.13434C15.5106 9.23602 14.3725 8.99745 13.375 8.44922V12.5217C13.3765 13.9844 14.5629 15.1691 16.0255 15.1688H18.0179C19.4792 15.1673 20.6635 13.983 20.665 12.5217V9.07134C19.6278 8.95533 18.5809 8.95765 17.5442 9.07809Z"
                      fill="url(#paint4_linear_7678_44431)"
                    />
                    <path
                      d="M17.0217 0.988281C12.5982 0.988 9.012 4.57366 9.01172 8.99716V8.99772V17.4386C10.0835 16.9584 11.2444 16.7092 12.4188 16.7073H13.2732V15.233C12.5592 14.5113 12.1588 13.537 12.1589 12.5218V7.42891C12.0764 7.3297 12.0012 7.22458 11.9339 7.11447L12.992 6.50978C13.0274 6.56884 13.9538 8.06453 16.5762 7.91603L17.4678 7.85978C20.1487 7.68484 22.087 7.55941 22.7311 9.29247L21.8845 9.60747V12.5195C21.8847 13.5346 21.4843 14.5087 20.7702 15.2302V17.2327C20.7702 17.2625 20.7663 17.2923 20.7657 17.3227H25.0323V8.99772C25.032 4.57394 21.4455 0.988 17.0217 0.988281Z"
                      fill="url(#paint5_linear_7678_44431)"
                    />
                    <path
                      d="M14.5383 17.6982C14.7616 18.8941 15.8051 19.7613 17.0218 19.762L17.1101 19.7553H17.1579V17.3236H19.5508V16.0664C19.0671 16.2767 18.5454 16.3851 18.0179 16.3848H16.0256C15.498 16.385 14.9761 16.2766 14.4922 16.0664V17.453L14.5383 17.6982Z"
                      fill="url(#paint6_linear_7678_44431)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_7678_44431"
                        x1="4.99708"
                        y1="33.3633"
                        x2="10.4138"
                        y2="33.3648"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_7678_44431"
                        x1="22.1323"
                        y1="27.0444"
                        x2="29.8769"
                        y2="27.0457"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_7678_44431"
                        x1="4.60299"
                        y1="28.4508"
                        x2="21.0052"
                        y2="28.4532"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_7678_44431"
                        x1="17.787"
                        y1="29.139"
                        x2="34.1772"
                        y2="29.1415"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_7678_44431"
                        x1="13.0946"
                        y1="12.7383"
                        x2="20.9104"
                        y2="12.7397"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_7678_44431"
                        x1="8.39554"
                        y1="11.4885"
                        x2="25.5715"
                        y2="11.4912"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_7678_44431"
                        x1="14.2976"
                        y1="18.4253"
                        x2="19.721"
                        y2="18.4265"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="24"
                    viewBox="0 0 37 36"
                    fill="none"
                  >
                    <path
                      d="M5.19141 31.5117H10.2438V34.4125H5.19141V31.5117Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M27.0092 24.4479V22.4336H25.0337V24.4479C25.0337 24.7846 24.7606 25.0577 24.4239 25.0577H22.4102V27.0332H24.4239C24.7606 27.0332 25.0337 27.3062 25.0337 27.6429V29.6572H27.0092V27.6429C27.0092 27.3062 27.2822 27.0332 27.6189 27.0332H29.6338V25.0577H27.6189C27.2822 25.0577 27.0092 24.7846 27.0092 24.4479Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M20.4903 34.4149C18.3855 32.7374 17.1589 30.1928 17.158 27.5012V20.9762C17.1125 20.9762 17.0675 20.9835 17.0219 20.9835C15.2194 20.9809 13.6735 19.6971 13.3398 17.9258H12.419C8.62413 17.9274 5.47259 20.8549 5.19141 24.6392V30.2952H10.2438V27.3955H11.4627V34.4149H20.4903Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18.375 18.543V27.4991C18.3747 31.7207 21.7967 35.1432 26.0182 35.1435H26.0188C30.2404 35.1435 33.6626 31.7212 33.6626 27.4997C33.6626 27.4994 33.6626 27.4993 33.6626 27.4991V18.543H18.375ZM30.8501 27.642C30.8504 27.9781 30.5782 28.2509 30.2421 28.2512C30.2417 28.2512 30.2413 28.2512 30.2409 28.2512H28.2255V30.266C28.2255 30.6025 27.9528 30.8752 27.6163 30.8752H24.4213C24.0849 30.8752 23.8121 30.6025 23.8121 30.266V28.2512H21.7984C21.4619 28.2514 21.1889 27.979 21.1886 27.6425C21.1886 27.6423 21.1886 27.6422 21.1886 27.642V24.447C21.1886 24.1105 21.4614 23.8378 21.7978 23.8378H21.7984H23.8121V21.8252C23.8121 21.4887 24.0849 21.216 24.4213 21.216H27.6163C27.9528 21.216 28.2255 21.4887 28.2255 21.8252V23.84H30.2409C30.5771 23.8398 30.8498 24.1119 30.8501 24.4481V24.4492V27.642Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M17.5442 9.07809L16.6442 9.13434C15.5106 9.23602 14.3725 8.99745 13.375 8.44922V12.5217C13.3765 13.9844 14.5629 15.1691 16.0255 15.1688H18.0179C19.4792 15.1673 20.6635 13.983 20.665 12.5217V9.07134C19.6278 8.95533 18.5809 8.95765 17.5442 9.07809Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M17.0217 0.988281C12.5982 0.988 9.012 4.57366 9.01172 8.99716V8.99772V17.4386C10.0835 16.9584 11.2444 16.7092 12.4188 16.7073H13.2732V15.233C12.5592 14.5113 12.1588 13.537 12.1589 12.5218V7.42891C12.0764 7.3297 12.0012 7.22458 11.9339 7.11447L12.992 6.50978C13.0274 6.56884 13.9538 8.06453 16.5762 7.91603L17.4678 7.85978C20.1487 7.68484 22.087 7.55941 22.7311 9.29247L21.8845 9.60747V12.5195C21.8847 13.5346 21.4843 14.5087 20.7702 15.2302V17.2327C20.7702 17.2625 20.7663 17.2923 20.7657 17.3227H25.0323V8.99772C25.032 4.57394 21.4455 0.988 17.0217 0.988281Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M14.5383 17.6982C14.7616 18.8941 15.8051 19.7613 17.0218 19.762L17.1101 19.7553H17.1579V17.3236H19.5508V16.0664C19.0671 16.2767 18.5454 16.3851 18.0179 16.3848H16.0256C15.498 16.385 14.9761 16.2766 14.4922 16.0664V17.453L14.5383 17.6982Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Women'sHealth" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  WOMEN&apos;S HEALTH
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Recovery"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Recovery")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Recovery" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M14.089 5.93587C15.7282 5.93587 17.057 4.60708 17.057 2.96793C17.057 1.32879 15.7282 0 14.089 0C12.4499 0 11.1211 1.32879 11.1211 2.96793C11.1211 4.60708 12.4499 5.93587 14.089 5.93587Z"
                      fill="url(#paint0_linear_8279_37643)"
                    />
                    <path
                      d="M29.2275 27.0395L28.1703 16.429C27.9437 14.0249 25.955 12.2188 23.5447 12.2188H22.1979C21.9839 12.2188 21.7762 12.2313 21.5686 12.2628C21.7637 12.6341 21.8706 13.0558 21.8518 13.4963C21.965 13.4837 22.0783 13.4774 22.1979 13.4774H23.5447C25.3005 13.4774 26.7543 14.799 26.9179 16.5486L27.1822 19.1729H18.5855L18.8247 16.5423C18.8436 16.3283 18.8876 16.1143 18.9442 15.9066L17.6856 15.7619C17.6289 15.9822 17.5912 16.2024 17.5723 16.429L16.3073 30.2051C16.2759 30.5512 16.5276 30.8596 16.8737 30.8911H16.9367C17.2576 30.8911 17.5282 30.6456 17.5597 30.3184L18.466 20.4315H27.3018L27.9752 27.1654C27.1445 27.499 26.5592 28.3045 26.5592 29.2485C26.5592 30.4946 27.5661 31.5015 28.8059 31.5015C30.052 31.5015 31.0589 30.4946 31.0589 29.2485C31.0589 28.1535 30.2659 27.2346 29.2275 27.0395ZM28.8059 30.2428C28.2647 30.2428 27.8178 29.796 27.8178 29.2485C27.8178 28.701 28.2647 28.2604 28.8059 28.2604C29.3534 28.2604 29.8002 28.701 29.8002 29.2485C29.8002 29.796 29.3534 30.2428 28.8059 30.2428Z"
                      fill="url(#paint1_linear_8279_37643)"
                    />
                    <path
                      d="M3.7959 29.5357L7.57189 25.3129C7.78587 25.0737 7.93691 24.7842 8.00613 24.4696L8.53477 22.1284L5.67131 19.7433C5.53286 19.6237 5.40069 19.4978 5.29371 19.3594L4.43152 23.1605L0.982778 27.0184C0.284219 27.7987 0.353445 28.9882 1.12752 29.6867C1.40443 29.9322 1.73168 30.0832 2.07152 30.1398C2.68827 30.2468 3.34278 30.0392 3.7959 29.5357Z"
                      fill="url(#paint2_linear_8279_37643)"
                    />
                    <path
                      d="M8.8416 20.7505L10.2702 21.94V28.7493C10.2702 29.7877 11.1135 30.6373 12.1582 30.6373C13.1966 30.6373 14.0462 29.7877 14.0462 28.7493V21.0589C14.0462 20.4988 13.7945 19.9701 13.3665 19.6114L9.91776 16.7291L12.1267 10.8071L14.3231 13.702C14.5308 13.9726 14.8391 14.1551 15.179 14.1929L19.1878 14.6649C19.2382 14.6712 19.2885 14.6712 19.3326 14.6712C19.9619 14.6712 20.5094 14.1992 20.585 13.5635C20.6668 12.8713 20.1696 12.2482 19.4836 12.1664L16.0034 11.7573L12.6742 7.36461C12.4666 6.9933 12.1267 6.69122 11.6988 6.53389C10.7233 6.16887 9.63456 6.66605 9.26955 7.64151C9.24752 7.7013 5.89444 16.7102 5.88374 16.7731C5.86926 16.8015 5.83654 16.9166 5.8271 16.9934C5.70752 17.6479 5.94667 18.3339 6.47531 18.7744L8.8416 20.7505Z"
                      fill="url(#paint3_linear_8279_37643)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_37643"
                        x1="10.8928"
                        y1="3.78885"
                        x2="17.2567"
                        y2="3.78989"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_37643"
                        x1="15.7372"
                        y1="24.5269"
                        x2="31.5555"
                        y2="24.5289"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_37643"
                        x1="0.19097"
                        y1="26.258"
                        x2="8.8052"
                        y2="26.259"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_37643"
                        x1="5.22776"
                        y1="21.8757"
                        x2="21.0918"
                        y2="21.8773"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M14.0881 5.93587C15.7272 5.93587 17.056 4.60708 17.056 2.96793C17.056 1.32879 15.7272 0 14.0881 0C12.4489 0 11.1201 1.32879 11.1201 2.96793C11.1201 4.60708 12.4489 5.93587 14.0881 5.93587Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M29.2275 27.0395L28.1703 16.429C27.9437 14.0249 25.955 12.2188 23.5447 12.2188H22.1979C21.9839 12.2188 21.7762 12.2313 21.5686 12.2628C21.7637 12.6341 21.8706 13.0558 21.8518 13.4963C21.965 13.4837 22.0783 13.4774 22.1979 13.4774H23.5447C25.3005 13.4774 26.7543 14.799 26.9179 16.5486L27.1822 19.1729H18.5855L18.8247 16.5423C18.8436 16.3283 18.8876 16.1143 18.9442 15.9066L17.6856 15.7619C17.6289 15.9822 17.5912 16.2024 17.5723 16.429L16.3073 30.2051C16.2759 30.5512 16.5276 30.8596 16.8737 30.8911H16.9367C17.2576 30.8911 17.5282 30.6456 17.5597 30.3184L18.466 20.4315H27.3018L27.9752 27.1654C27.1445 27.499 26.5592 28.3045 26.5592 29.2485C26.5592 30.4946 27.5661 31.5015 28.8059 31.5015C30.052 31.5015 31.0589 30.4946 31.0589 29.2485C31.0589 28.1535 30.2659 27.2346 29.2275 27.0395ZM28.8059 30.2428C28.2647 30.2428 27.8178 29.796 27.8178 29.2485C27.8178 28.701 28.2647 28.2604 28.8059 28.2604C29.3534 28.2604 29.8002 28.701 29.8002 29.2485C29.8002 29.796 29.3534 30.2428 28.8059 30.2428Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M3.7959 29.5357L7.57189 25.3129C7.78587 25.0737 7.93691 24.7842 8.00613 24.4696L8.53477 22.1284L5.67131 19.7433C5.53286 19.6237 5.40069 19.4978 5.29371 19.3594L4.43152 23.1605L0.982778 27.0184C0.284219 27.7987 0.353445 28.9882 1.12752 29.6867C1.40443 29.9322 1.73168 30.0832 2.07152 30.1398C2.68827 30.2468 3.34278 30.0392 3.7959 29.5357Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M8.84355 20.7505L10.2721 21.94V28.7493C10.2721 29.7877 11.1154 30.6373 12.1601 30.6373C13.1985 30.6373 14.0481 29.7877 14.0481 28.7493V21.0589C14.0481 20.4988 13.7964 19.9701 13.3685 19.6114L9.91971 16.7291L12.1287 10.8071L14.325 13.702C14.5327 13.9726 14.8411 14.1551 15.1809 14.1929L19.1898 14.6649C19.2401 14.6712 19.2905 14.6712 19.3345 14.6712C19.9639 14.6712 20.5114 14.1992 20.5869 13.5635C20.6687 12.8713 20.1715 12.2482 19.4856 12.1664L16.0054 11.7573L12.6762 7.36461C12.4685 6.9933 12.1287 6.69122 11.7007 6.53389C10.7253 6.16887 9.63651 6.66605 9.2715 7.64151C9.24948 7.7013 5.89639 16.7102 5.88569 16.7731C5.87122 16.8015 5.83849 16.9166 5.82905 16.9934C5.70948 17.6479 5.94862 18.3339 6.47726 18.7744L8.84355 20.7505Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Recovery" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  RECOVERY
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Dance"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Dance")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Dance" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="24"
                    viewBox="0 0 35 35"
                    fill="none"
                  >
                    <mask
                      id="mask0_8279_39125"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="35"
                      height="35"
                    >
                      <path d="M0.5 0.5H35V35H0.5V0.5Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_8279_39125)">
                      <path
                        d="M20.1651 17.1828L19.6079 13.4093L21.8054 14.5102L20.1651 17.1828ZM26.3589 32.7074L20.5859 20.033L20.4912 19.3913C20.6806 19.4871 20.8839 19.5335 21.0852 19.5334C21.5299 19.5334 21.9643 19.3093 22.2138 18.9025L24.8143 14.6653C25.2197 14.0049 24.9726 13.1379 24.2795 12.7906L18.6017 9.94608C18.3285 9.80915 18.0308 9.77701 17.7526 9.83233C17.5763 9.80592 13.4093 10.4764 13.4093 10.4764L11.7014 7.41599L12.5534 2.07832C12.6685 1.35686 12.177 0.67865 11.4556 0.563492C10.734 0.448402 10.056 0.939823 9.94087 1.66122L9.01651 7.4517C8.96975 7.74502 9.02298 8.04555 9.16772 8.30497L12.6515 14.5473L13.5952 20.656L10.3909 25.1887C10.1606 25.5144 10.0615 25.9148 10.113 26.3103L11.0595 33.5706C11.1732 34.4423 11.9719 35.0524 12.8387 34.9394C13.7082 34.826 14.321 34.0295 14.2077 33.1601L13.3413 26.5149L16.9996 21.3399L17.6507 21.2437C17.6747 21.3028 19.4078 25.1042 23.4697 34.0233C23.8331 34.8213 24.7745 35.1733 25.5723 34.8099C26.3701 34.4465 26.7222 33.5052 26.3589 32.7074Z"
                        fill="url(#paint0_linear_8279_39125)"
                      />
                      <path
                        d="M12.3266 6.9515C12.5478 8.44935 13.9414 9.48435 15.4393 9.2632C16.9372 9.04205 17.9721 7.64844 17.751 6.15059C17.5298 4.65267 16.1363 3.61767 14.6383 3.83889C13.1404 4.06004 12.1055 5.45365 12.3266 6.9515Z"
                        fill="url(#paint1_linear_8279_39125)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_39125"
                        x1="8.32684"
                        y1="12.9916"
                        x2="27.0911"
                        y2="12.9901"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_39125"
                        x1="12.086"
                        y1="5.79263"
                        x2="17.9653"
                        y2="5.79167"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="24"
                    viewBox="0 0 35 35"
                    fill="none"
                  >
                    <mask
                      id="mask0_7280_37745"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="35"
                      height="35"
                    >
                      <path d="M0.5 0.5H35V35H0.5V0.5Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_7280_37745)">
                      <path
                        d="M20.1651 17.1828L19.6079 13.4093L21.8054 14.5102L20.1651 17.1828ZM26.3589 32.7074L20.5859 20.033L20.4912 19.3913C20.6806 19.4871 20.8839 19.5335 21.0852 19.5334C21.5299 19.5334 21.9643 19.3093 22.2138 18.9025L24.8143 14.6653C25.2197 14.0049 24.9726 13.1379 24.2795 12.7906L18.6017 9.94608C18.3285 9.80915 18.0308 9.77701 17.7526 9.83233C17.5763 9.80592 13.4093 10.4764 13.4093 10.4764L11.7014 7.41599L12.5534 2.07832C12.6685 1.35686 12.177 0.67865 11.4556 0.563492C10.734 0.448402 10.056 0.939823 9.94087 1.66122L9.01651 7.4517C8.96975 7.74502 9.02298 8.04555 9.16772 8.30497L12.6515 14.5473L13.5952 20.656L10.3909 25.1887C10.1606 25.5144 10.0615 25.9148 10.113 26.3103L11.0595 33.5706C11.1732 34.4423 11.9719 35.0524 12.8387 34.9394C13.7082 34.826 14.321 34.0295 14.2077 33.1601L13.3413 26.5149L16.9996 21.3399L17.6507 21.2437C17.6747 21.3028 19.4078 25.1042 23.4697 34.0233C23.8331 34.8213 24.7745 35.1733 25.5723 34.8099C26.3701 34.4465 26.7222 33.5052 26.3589 32.7074Z"
                        fill="#D4D4D4"
                      />
                      <path
                        d="M12.3266 6.9515C12.5478 8.44935 13.9414 9.48435 15.4393 9.2632C16.9372 9.04205 17.9721 7.64844 17.751 6.15059C17.5298 4.65267 16.1363 3.61767 14.6383 3.83889C13.1404 4.06004 12.1055 5.45365 12.3266 6.9515Z"
                        fill="#D4D4D4"
                      />
                    </g>
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Dance" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  DANCE
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Stretching"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Stretching")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Stretching" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="24"
                    viewBox="0 0 27 36"
                    fill="none"
                  >
                    <path
                      d="M24.6548 0.00822755C18.8833 0.516876 14.6244 3.39767 12.1417 7.5623C10.4778 9.64811 7.15415 16.0161 5.94539 19.3497C3.75366 23.4951 1.84244 28.4274 0.346759 32.8737C-0.567529 35.5927 3.53774 37.3666 4.45727 34.6353C5.57583 31.3088 6.92718 27.7121 8.45429 24.3745C9.96976 27.7663 11.5097 31.147 13.1631 34.4741C14.4446 37.057 18.3008 34.7919 17.0239 32.2178C15.3216 28.7929 13.7404 25.3132 12.1824 21.8219C12.2022 21.7544 12.2273 21.6887 12.2482 21.6217C12.5078 21.6956 12.7941 21.7183 13.1095 21.6584C15.4933 21.2109 17.8771 20.7645 20.2626 20.3169C21.2817 20.1255 21.6722 19.0104 21.5116 18.1176C21.0297 15.4423 19.5055 13.5811 17.6082 11.8201C17.3265 10.8621 16.3872 10.0148 15.3449 9.17264C17.4581 5.75642 20.908 3.90224 25.3986 3.5065C27.6904 3.30572 26.9269 -0.191391 24.6548 0.00822755ZM15.9694 15.2147C16.5589 15.8281 17.0606 16.4736 17.4395 17.2208C16.286 17.4373 15.1319 17.6532 13.9784 17.8697C14.5604 16.9327 15.2303 16.0481 15.9694 15.2147Z"
                      fill="url(#paint0_linear_8279_39321)"
                    />
                    <path
                      d="M20.9059 12.1711C22.6014 12.1711 23.9758 10.7967 23.9758 9.10118C23.9758 7.40571 22.6014 6.03125 20.9059 6.03125C19.2104 6.03125 17.8359 7.40571 17.8359 9.10118C17.8359 10.7967 19.2104 12.1711 20.9059 12.1711Z"
                      fill="url(#paint1_linear_8279_39321)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_39321"
                        x1="-0.807047"
                        y1="22.9788"
                        x2="27.6782"
                        y2="22.9823"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_39321"
                        x1="17.5998"
                        y1="9.95032"
                        x2="24.1825"
                        y2="9.95138"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 27 36"
                    fill="none"
                  >
                    <path
                      d="M12.5548 7.84753L12.5336 7.87411C11.7343 8.8761 10.5063 10.9516 9.31667 13.2203C8.13101 15.4814 7.00965 17.8841 6.41642 19.5201L6.40459 19.5527L6.38839 19.5834C4.21452 23.695 2.31326 28.5989 0.821659 33.0331C0.46722 34.0871 1.06355 34.9735 1.91295 35.3391C2.33425 35.5204 2.77413 35.549 3.13403 35.4228C3.47735 35.3025 3.79979 35.0241 3.98438 34.4758C5.10656 31.1385 6.46411 27.5246 8.0006 24.1665L8.46068 23.1609L8.91178 24.1705C10.4266 27.5607 11.9631 30.9339 13.6118 34.2516L13.612 34.2519C13.8693 34.7705 14.2293 35.0073 14.5912 35.0841C14.9697 35.1643 15.4058 35.08 15.8011 34.8484C16.5973 34.3819 17.0708 33.4359 16.5772 32.4403C16.5771 32.4402 16.577 32.4401 16.577 32.44L17.0249 32.2178C15.3766 28.9015 13.8418 25.5339 12.3317 22.1541L12.5548 7.84753ZM12.5548 7.84753L12.5722 7.81833C14.9711 3.7942 19.0851 1.00116 24.6996 0.506309L24.6558 0.00822755M12.5548 7.84753L24.6997 0.506297M13.1105 21.6584C14.4963 21.3982 15.882 21.1385 17.2681 20.8786C18.2664 20.6915 19.2648 20.5043 20.2636 20.3169C21.2826 20.1255 21.6732 19.0104 21.5125 18.1176C21.0307 15.4423 19.5065 13.5811 17.6092 11.8201C17.3275 10.8621 16.3882 10.0148 15.3459 9.17264C17.4591 5.75642 20.909 3.90224 25.3996 3.5065C27.6914 3.30572 26.9278 -0.191391 24.6558 0.00822755M13.1105 21.6584L5.94636 19.3497C7.15513 16.0161 10.4788 9.64811 12.1427 7.5623C14.6254 3.39767 18.8843 0.516876 24.6558 0.00822755M13.1105 21.6584C12.9578 21.6874 12.8118 21.6971 12.6725 21.6909C12.6617 21.6667 12.6508 21.6424 12.64 21.6182L12.5097 21.6763C12.42 21.6642 12.3332 21.6457 12.2492 21.6217C12.2401 21.6508 12.2302 21.6796 12.2204 21.7084C12.2075 21.746 12.1946 21.7837 12.1834 21.8219L13.1105 21.6584ZM24.6558 0.00822755L24.6997 0.506297M24.6997 0.506297C25.5245 0.433896 26.1013 1.02089 26.2503 1.71253C26.3238 2.05348 26.2773 2.36627 26.1428 2.58683C26.0188 2.79018 25.7876 2.97059 25.3559 3.00841L25.3557 3.00843C20.7424 3.41499 17.1334 5.3325 14.9207 8.90961L14.6888 9.28452L15.0317 9.56156C15.5499 9.98024 16.0206 10.3831 16.3942 10.7907C16.7689 11.1997 17.0189 11.585 17.1295 11.9611L17.1683 12.093L17.269 12.1865C19.1372 13.9206 20.5671 15.6896 21.0204 18.2062C21.0834 18.5562 21.0358 18.9483 20.8823 19.2586C20.734 19.5584 20.4996 19.7638 20.1713 19.8255L24.6997 0.506297ZM16.3308 14.8683L15.9556 14.4778L15.5963 14.883C14.8402 15.7355 14.1529 16.6427 13.5547 17.6059L12.9555 18.5706L14.0716 18.3611C14.6424 18.254 15.2134 18.147 15.7844 18.04L15.802 18.0367L15.8067 18.0358C16.382 17.928 16.9574 17.8202 17.5327 17.7122L18.1878 17.5893L17.8864 16.9947C17.4789 16.1911 16.9436 15.5059 16.3308 14.8683Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M23.4758 9.10118C23.4758 10.5205 22.3252 11.6711 20.9059 11.6711C19.4865 11.6711 18.3359 10.5205 18.3359 9.10118C18.3359 7.68185 19.4865 6.53125 20.9059 6.53125C22.3252 6.53125 23.4758 7.68185 23.4758 9.10118Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Stretching" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  STRETCHING
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Warmup"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Warmup")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Warmup" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 32"
                    fill="none"
                  >
                    <path
                      d="M5.25 12.625V18.1909H12V12.625C12 11.3824 10.9926 10.375 9.75 10.375H7.5C6.25744 10.375 5.25 11.3824 5.25 12.625Z"
                      fill="url(#paint0_linear_8279_11757)"
                    />
                    <path
                      d="M5.37431 11.918C5.30006 12.1413 5.25 12.3758 5.25 12.6239V18.1898H6.375V12.6239C6.375 12.3758 6.42506 12.1413 6.49931 11.918H5.37431Z"
                      fill="url(#paint1_linear_8279_11757)"
                    />
                    <path
                      d="M8.625 10.375C7.07194 10.375 5.8125 9.11556 5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625C11.4375 9.11556 10.1781 10.375 8.625 10.375Z"
                      fill="url(#paint2_linear_8279_11757)"
                    />
                    <path
                      d="M5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625H5.8125Z"
                      fill="url(#paint3_linear_8279_11757)"
                    />
                    <path
                      d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625C5.8125 9.11556 7.07194 10.375 8.625 10.375C9.0255 10.375 9.40519 10.2884 9.75 10.1376C8.75775 9.70337 8.0625 8.71506 8.0625 7.5625Z"
                      fill="url(#paint4_linear_8279_11757)"
                    />
                    <path
                      d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625H8.0625Z"
                      fill="url(#paint5_linear_8279_11757)"
                    />
                    <path
                      d="M7.5 12.625H1.875C1.25344 12.625 0.75 12.1216 0.75 11.5C0.75 10.8784 1.25344 10.375 1.875 10.375H7.5V12.625Z"
                      fill="url(#paint6_linear_8279_11757)"
                    />
                    <path
                      d="M7.5 12.625H9.75V13.75H7.5V12.625Z"
                      fill="url(#paint7_linear_8279_11757)"
                    />
                    <path
                      d="M5.5449 15.9015C4.94527 16.0646 4.32709 15.7108 4.16396 15.1112L3.27803 11.8543C3.1149 11.2547 3.46871 10.6365 4.06834 10.4733C4.66796 10.3102 5.28615 10.664 5.44927 11.2637L6.33521 14.5205C6.49777 15.1202 6.14396 15.7383 5.5449 15.9015Z"
                      fill="url(#paint8_linear_8279_11757)"
                    />
                    <path
                      d="M5.24871 18.1914L3.22709 30.3723C3.10784 31.094 3.66415 31.7505 4.3954 31.7505C4.90502 31.7505 5.35727 31.4242 5.51871 30.941L8.62371 21.6255L11.7287 30.941C11.8902 31.4242 12.3424 31.7505 12.852 31.7505C13.5833 31.7505 14.1396 31.094 14.0198 30.3729L11.9987 18.1914H5.24871Z"
                      fill="url(#paint9_linear_8279_11757)"
                    />
                    <path
                      d="M4.14002 30.3723L6.16165 18.1914H5.24871L3.22709 30.3723C3.10784 31.0935 3.66415 31.7499 4.3954 31.7499C4.55402 31.7499 4.70252 31.7088 4.84315 31.6509C4.35996 31.4433 4.04777 30.9292 4.14002 30.3723Z"
                      fill="url(#paint10_linear_8279_11757)"
                    />
                    <path
                      d="M12.6429 30.9406L9.53737 21.625H8.625L11.73 30.9406C11.8914 31.4238 12.3437 31.75 12.8533 31.75C13.0198 31.75 13.1756 31.7123 13.3185 31.651C13.0074 31.5222 12.7538 31.2736 12.6429 30.9406Z"
                      fill="url(#paint11_linear_8279_11757)"
                    />
                    <path
                      d="M16.5 10.375V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C19.7406 18.25 21 16.9906 21 15.4375C21 14.5206 20.5545 13.7134 19.875 13.2004V10.375H16.5Z"
                      fill="url(#paint12_linear_8279_11757)"
                    />
                    <path
                      d="M19.875 1.9375C19.875 1.00544 19.1196 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H19.875V1.9375Z"
                      fill="url(#paint13_linear_8279_11757)"
                    />
                    <path
                      d="M16.5 15.4375C16.5 14.5206 16.9455 13.7134 17.625 13.2004V10.375H16.5V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C18.3804 18.25 18.5683 18.2303 18.75 18.1932C17.4664 17.9327 16.5 16.7982 16.5 15.4375Z"
                      fill="url(#paint14_linear_8279_11757)"
                    />
                    <path
                      d="M18.75 0.3535C18.5734 0.2905 18.3861 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H17.625V1.9375C17.625 1.204 18.0958 0.585813 18.75 0.3535Z"
                      fill="url(#paint15_linear_8279_11757)"
                    />
                    <path
                      d="M18.1875 16.5625C17.5659 16.5625 17.0625 16.0591 17.0625 15.4375C17.0625 14.8159 17.5659 14.3125 18.1875 14.3125C18.8091 14.3125 19.3125 14.8159 19.3125 15.4375C19.3125 16.0591 18.8091 16.5625 18.1875 16.5625Z"
                      fill="url(#paint16_linear_8279_11757)"
                    />
                    <path
                      d="M21 9.25H23.25V10.375H21V9.25Z"
                      fill="url(#paint17_linear_8279_11757)"
                    />
                    <path
                      d="M21 11.5H23.25V12.625H21V11.5Z"
                      fill="url(#paint18_linear_8279_11757)"
                    />
                    <path
                      d="M21 7H23.25V8.125H21V7Z"
                      fill="url(#paint19_linear_8279_11757)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8279_11757"
                        x1="4.99038"
                        y1="15.3639"
                        x2="12.2272"
                        y2="15.3649"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_8279_11757"
                        x1="5.20195"
                        y1="15.9213"
                        x2="6.54136"
                        y2="15.9213"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_8279_11757"
                        x1="5.59615"
                        y1="8.34043"
                        x2="11.6268"
                        y2="8.3414"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_8279_11757"
                        x1="5.59615"
                        y1="6.54521"
                        x2="11.6268"
                        y2="6.54717"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_8279_11757"
                        x1="5.66106"
                        y1="8.34043"
                        x2="9.88253"
                        y2="8.34091"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_8279_11757"
                        x1="5.66106"
                        y1="6.54521"
                        x2="9.88253"
                        y2="6.54617"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_8279_11757"
                        x1="0.490385"
                        y1="11.8112"
                        x2="7.72719"
                        y2="11.8147"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_8279_11757"
                        x1="7.41346"
                        y1="13.3431"
                        x2="9.82573"
                        y2="13.3439"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_8279_11757"
                        x1="3.11765"
                        y1="13.9491"
                        x2="6.48029"
                        y2="13.9494"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_8279_11757"
                        x1="2.79459"
                        y1="26.8461"
                        x2="14.4004"
                        y2="26.8476"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_8279_11757"
                        x1="3.09745"
                        y1="26.8458"
                        x2="6.26096"
                        y2="26.8459"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_8279_11757"
                        x1="8.44448"
                        y1="28.0878"
                        x2="13.4765"
                        y2="28.0881"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_8279_11757"
                        x1="15.1587"
                        y1="15.4016"
                        x2="21.1893"
                        y2="15.4023"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_8279_11757"
                        x1="16.3702"
                        y1="6.71277"
                        x2="19.9886"
                        y2="6.71296"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_8279_11757"
                        x1="15.2452"
                        y1="15.4016"
                        x2="18.8636"
                        y2="15.4018"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_8279_11757"
                        x1="16.4135"
                        y1="6.71277"
                        x2="18.8257"
                        y2="6.71286"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_8279_11757"
                        x1="16.976"
                        y1="15.7487"
                        x2="19.3882"
                        y2="15.7491"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_8279_11757"
                        x1="20.9135"
                        y1="9.96809"
                        x2="23.3257"
                        y2="9.96887"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_8279_11757"
                        x1="20.9135"
                        y1="12.2181"
                        x2="23.3257"
                        y2="12.2189"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_8279_11757"
                        x1="20.9135"
                        y1="7.71809"
                        x2="23.3257"
                        y2="7.71887"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 32"
                    fill="none"
                  >
                    <path
                      d="M11.5 17.6909H5.75V12.625C5.75 11.6586 6.53358 10.875 7.5 10.875H9.75C10.7164 10.875 11.5 11.6586 11.5 12.625V17.6909Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M5.75 12.6239C5.75 12.5554 5.75524 12.4869 5.76518 12.418H5.88395C5.87813 12.4853 5.875 12.5539 5.875 12.6239V17.6898H5.75V12.6239Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M8.625 9.475C7.56899 9.475 6.7125 8.61851 6.7125 7.5625C6.7125 6.50649 7.56899 5.65 8.625 5.65C9.68101 5.65 10.5375 6.50649 10.5375 7.5625C10.5375 8.61851 9.68101 9.475 8.625 9.475Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625H5.8125Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625C5.8125 9.11556 7.07194 10.375 8.625 10.375C9.0255 10.375 9.40519 10.2884 9.75 10.1376C8.75775 9.70337 8.0625 8.71506 8.0625 7.5625Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M6.36672 7.0625C6.58689 6.06407 7.45253 5.30757 8.50351 5.25314C8.03189 5.73617 7.70629 6.36285 7.60008 7.0625H6.36672Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M7 12.125H1.875C1.52958 12.125 1.25 11.8454 1.25 11.5C1.25 11.1546 1.52958 10.875 1.875 10.875H7V12.125Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M8 13.125H9.25V13.25H8V13.125Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M3.76049 11.723L3.76049 11.723L4.64643 14.9799C4.64643 14.9799 4.64643 14.9799 4.64643 14.9799C4.73707 15.3131 5.08043 15.5096 5.41353 15.419L3.76049 11.723ZM3.76049 11.723C3.66986 11.3899 3.86639 11.0464 4.19959 10.9558M3.76049 11.723L4.19959 10.9558M4.19959 10.9558C4.53272 10.8652 4.87616 11.0617 4.96681 11.3949M4.19959 10.9558L4.96681 11.3949M4.96681 11.3949C4.96681 11.3949 4.96681 11.3949 4.96681 11.3949M4.96681 11.3949L4.96681 11.3949M4.96681 11.3949L5.85263 14.6514C5.85264 14.6514 5.85265 14.6514 5.85266 14.6515C5.94302 14.985 5.74611 15.3284 5.41365 15.419L4.96681 11.3949Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M9.09903 21.4674L8.62469 20.0442L8.15034 21.4674L5.04546 30.7826C4.95208 31.0621 4.6906 31.2505 4.39638 31.2505C3.97429 31.2505 3.65251 30.8715 3.72134 30.4541C3.72135 30.454 3.72136 30.4539 3.72137 30.4539L5.67354 18.6914H11.5758L13.5275 30.4547L13.5275 30.4549C13.5967 30.8713 13.2754 31.2505 12.853 31.2505C12.5588 31.2505 12.2973 31.0621 12.2039 30.7826L9.09903 21.4674Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <mask id="path-11-inside-1_6646_36793" fill="white">
                      <path d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z" />
                    </mask>
                    <path
                      d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M4.141 30.3723L3.1545 30.2086L3.15445 30.2089L4.141 30.3723ZM6.16263 18.1914L7.14913 18.3551L7.34227 17.1914H6.16263V18.1914ZM5.24969 18.1914V17.1914H4.40198L4.26318 18.0277L5.24969 18.1914ZM3.22806 30.3723L2.24156 30.2086L2.24146 30.2092L3.22806 30.3723ZM4.84413 31.6509L5.22506 32.5755L7.42253 31.6701L5.23882 30.7321L4.84413 31.6509ZM5.12751 30.5361L7.14913 18.3551L5.17612 18.0277L3.1545 30.2086L5.12751 30.5361ZM6.16263 17.1914H5.24969V19.1914H6.16263V17.1914ZM4.26318 18.0277L2.24156 30.2086L4.21457 30.5361L6.23619 18.3551L4.26318 18.0277ZM2.24146 30.2092C2.02154 31.5391 3.04732 32.7499 4.39638 32.7499V30.7499C4.28293 30.7499 4.19609 30.6478 4.21466 30.5355L2.24146 30.2092ZM4.39638 32.7499C4.7294 32.7499 5.01194 32.6633 5.22506 32.5755L4.46319 30.7263C4.39506 30.7544 4.38061 30.7499 4.39638 30.7499V32.7499ZM5.23882 30.7321C5.15505 30.6961 5.11458 30.6141 5.12756 30.5358L3.15445 30.2089C2.98292 31.2444 3.56683 32.1906 4.44943 32.5697L5.23882 30.7321Z"
                      fill="#D4D4D4"
                      mask="url(#path-11-inside-1_6646_36793)"
                    />
                    <path
                      d="M12.6429 30.9406L9.53737 21.625H8.625L11.73 30.9406C11.8914 31.4238 12.3437 31.75 12.8533 31.75C13.0198 31.75 13.1756 31.7123 13.3185 31.651C13.0074 31.5222 12.7538 31.2736 12.6429 30.9406Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M16.5 10.375V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C19.7406 18.25 21 16.9906 21 15.4375C21 14.5206 20.5545 13.7134 19.875 13.2004V10.375H16.5Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M19.875 1.9375C19.875 1.00544 19.1196 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H19.875V1.9375Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M16.5 15.4375C16.5 14.5206 16.9455 13.7134 17.625 13.2004V10.375H16.5V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C18.3804 18.25 18.5683 18.2303 18.75 18.1932C17.4664 17.9327 16.5 16.7982 16.5 15.4375Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18.75 0.3535C18.5734 0.2905 18.3861 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H17.625V1.9375C17.625 1.204 18.0958 0.585813 18.75 0.3535Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M18.1875 16.5625C17.5659 16.5625 17.0625 16.0591 17.0625 15.4375C17.0625 14.8159 17.5659 14.3125 18.1875 14.3125C18.8091 14.3125 19.3125 14.8159 19.3125 15.4375C19.3125 16.0591 18.8091 16.5625 18.1875 16.5625Z"
                      fill="#D4D4D4"
                    />
                    <path d="M21 9.25H23.25V10.375H21V9.25Z" fill="#D4D4D4" />
                    <path d="M21 11.5H23.25V12.625H21V11.5Z" fill="#D4D4D4" />
                    <path d="M21 7H23.25V8.125H21V7Z" fill="#D4D4D4" />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Warmup" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  WARMUP
                </span>
              </div>
            </Link>
            <Link
              href={"/blogCategory/Cardio"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Cardio")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "Cardio" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="24"
                    viewBox="0 0 37 36"
                    fill="none"
                  >
                    <path
                      d="M9.0126 10.8779C8.43984 9.99544 8.13166 8.96297 8.13166 7.87995C8.13166 6.40402 8.70203 5.02076 9.7378 3.98505C10.7736 2.94935 12.1568 2.37891 13.6328 2.37891C15.1088 2.37891 16.4919 2.94928 17.5277 3.98505L18.3151 4.77241C18.4798 4.93716 18.747 4.93716 18.9116 4.77241L19.699 3.98505C20.7347 2.94935 22.118 2.37891 23.5939 2.37891C25.0699 2.37891 26.4531 2.94928 27.4889 3.98505C28.5247 5.02083 29.095 6.40402 29.095 7.87995C29.095 8.96297 28.7868 9.99544 28.2141 10.8779H24.8068L23.7286 6.88755C23.6756 6.69124 23.4904 6.56074 23.2874 6.57705C23.0847 6.59344 22.9226 6.75206 22.9017 6.95435L22.4283 11.5524L20.8596 6.06771C20.8061 5.88047 20.6321 5.75496 20.4367 5.7622C20.2421 5.77022 20.0783 5.91028 20.0402 6.10132L18.3614 14.5293L15.8086 8.12063C15.7464 7.96467 15.5979 7.8604 15.4301 7.85505C15.2612 7.84971 15.1074 7.94428 15.0355 8.09595L13.7161 10.878H9.0126V10.8779ZM24.0764 11.4098L23.5077 9.30504L23.0434 13.8138C23.0226 14.0149 22.8622 14.1731 22.6608 14.1908C22.4599 14.2086 22.2737 14.081 22.2181 13.8866L20.5272 7.97445L18.9103 16.0914C18.8737 16.2746 18.7211 16.4121 18.535 16.4291C18.5219 16.4303 18.5091 16.4309 18.4963 16.4309C18.3249 16.4309 18.1689 16.3267 18.1046 16.1651L15.3828 9.33211L14.3639 11.4806C14.2941 11.6278 14.1457 11.7217 13.9828 11.7217H9.68711C9.7042 11.7393 9.72037 11.7575 9.73773 11.7748L18.6132 20.6503L27.4887 11.7748C27.5061 11.7575 27.5222 11.7392 27.5393 11.7217H24.4836C24.293 11.7217 24.1261 11.5939 24.0764 11.4098ZM8.02141 10.8779H8.03195C8.03195 10.8779 8.0233 10.8718 8.02141 10.8779ZM24.036 27.423C23.7919 27.5322 23.5539 27.6387 23.3228 27.7409L23.3223 27.7399C22.9767 28.465 22.2368 28.9674 21.3818 28.9674H16.6021C16.5948 28.9674 16.5876 28.9672 16.5803 28.9668C16.3203 28.9534 16.0759 28.9425 15.8466 28.9324C13.6851 28.8367 12.4945 28.784 12.3266 26.8655C12.3063 26.6334 12.478 26.4288 12.7101 26.4085C12.9418 26.3882 13.1468 26.5599 13.1672 26.792C13.2642 27.9008 13.5989 27.9883 15.8839 28.0895C16.1119 28.0996 16.3547 28.1103 16.6129 28.1236H21.3816C22.1011 28.1236 22.6866 27.5378 22.6866 26.8178C22.6866 26.0977 22.1012 25.5124 21.3816 25.5124H16.602C15.2659 25.5082 14.2685 24.9956 13.1579 23.7429C12.9345 23.4909 12.5065 23.3649 11.8738 23.3649H7.92958V30.5644C9.36156 30.918 10.675 31.2458 11.8419 31.5371C14.0198 32.0808 15.74 32.5103 17.0518 32.8139C19.8804 33.4685 20.5911 33.1903 22.6195 32.1234C22.6224 32.1219 22.6252 32.1204 22.6282 32.119C29.497 28.7074 33.4649 26.825 34.7617 26.2158C32.4968 23.6382 27.6317 25.8144 24.0358 27.423H24.036ZM6.95463 21.4943H2.21739C2.14609 21.4943 2.08598 21.5545 2.08598 21.6257V32.3419C2.08598 32.4131 2.14609 32.4733 2.21739 32.4733H6.95463C7.02592 32.4733 7.08604 32.4132 7.08604 32.3419V21.6257C7.08604 21.5545 7.02592 21.4943 6.95463 21.4943ZM35.4883 10.8779H29.1946C28.9745 11.3335 28.6513 11.7217 28.6513 11.7217H35.4883C35.7212 11.7217 35.9102 11.5328 35.9102 11.2998C35.9102 11.0669 35.7212 10.8779 35.4883 10.8779ZM8.26588 11.2841L7.97859 10.8779H1.73828C1.50534 10.8779 1.31641 11.0669 1.31641 11.2998C1.31641 11.5328 1.50534 11.7217 1.73828 11.7217H8.57526C8.44363 11.5394 8.34316 11.3968 8.26588 11.2841Z"
                      fill="url(#paint0_linear_7678_44461)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_7678_44461"
                        x1="-0.0141227"
                        y1="22.0296"
                        x2="37.0745"
                        y2="22.0363"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="24"
                    viewBox="0 0 37 36"
                    fill="none"
                  >
                    <path
                      d="M9.0126 10.8779C8.43984 9.99544 8.13166 8.96297 8.13166 7.87995C8.13166 6.40402 8.70203 5.02076 9.7378 3.98505C10.7736 2.94935 12.1568 2.37891 13.6328 2.37891C15.1088 2.37891 16.4919 2.94928 17.5277 3.98505L18.3151 4.77241C18.4798 4.93716 18.747 4.93716 18.9116 4.77241L19.699 3.98505C20.7347 2.94935 22.118 2.37891 23.5939 2.37891C25.0699 2.37891 26.4531 2.94928 27.4889 3.98505C28.5247 5.02083 29.095 6.40402 29.095 7.87995C29.095 8.96297 28.7868 9.99544 28.2141 10.8779H24.8068L23.7286 6.88755C23.6756 6.69124 23.4904 6.56074 23.2874 6.57705C23.0847 6.59344 22.9226 6.75206 22.9017 6.95435L22.4283 11.5524L20.8596 6.06771C20.8061 5.88047 20.6321 5.75496 20.4367 5.7622C20.2421 5.77022 20.0783 5.91028 20.0402 6.10132L18.3614 14.5293L15.8086 8.12063C15.7464 7.96467 15.5979 7.8604 15.4301 7.85505C15.2612 7.84971 15.1074 7.94428 15.0355 8.09595L13.7161 10.878H9.0126V10.8779ZM24.0764 11.4098L23.5077 9.30504L23.0434 13.8138C23.0226 14.0149 22.8622 14.1731 22.6608 14.1908C22.4599 14.2086 22.2737 14.081 22.2181 13.8866L20.5272 7.97445L18.9103 16.0914C18.8737 16.2746 18.7211 16.4121 18.535 16.4291C18.5219 16.4303 18.5091 16.4309 18.4963 16.4309C18.3249 16.4309 18.1689 16.3267 18.1046 16.1651L15.3828 9.33211L14.3639 11.4806C14.2941 11.6278 14.1457 11.7217 13.9828 11.7217H9.68711C9.7042 11.7393 9.72037 11.7575 9.73773 11.7748L18.6132 20.6503L27.4887 11.7748C27.5061 11.7575 27.5222 11.7392 27.5393 11.7217H24.4836C24.293 11.7217 24.1261 11.5939 24.0764 11.4098ZM8.02141 10.8779H8.03195C8.03195 10.8779 8.0233 10.8718 8.02141 10.8779ZM24.036 27.423C23.7919 27.5322 23.5539 27.6387 23.3228 27.7409L23.3223 27.7399C22.9767 28.465 22.2368 28.9674 21.3818 28.9674H16.6021C16.5948 28.9674 16.5876 28.9672 16.5803 28.9668C16.3203 28.9534 16.0759 28.9425 15.8466 28.9324C13.6851 28.8367 12.4945 28.784 12.3266 26.8655C12.3063 26.6334 12.478 26.4288 12.7101 26.4085C12.9418 26.3882 13.1468 26.5599 13.1672 26.792C13.2642 27.9008 13.5989 27.9883 15.8839 28.0895C16.1119 28.0996 16.3547 28.1103 16.6129 28.1236H21.3816C22.1011 28.1236 22.6866 27.5378 22.6866 26.8178C22.6866 26.0977 22.1012 25.5124 21.3816 25.5124H16.602C15.2659 25.5082 14.2685 24.9956 13.1579 23.7429C12.9345 23.4909 12.5065 23.3649 11.8738 23.3649H7.92958V30.5644C9.36156 30.918 10.675 31.2458 11.8419 31.5371C14.0198 32.0808 15.74 32.5103 17.0518 32.8139C19.8804 33.4685 20.5911 33.1903 22.6195 32.1234C22.6224 32.1219 22.6252 32.1204 22.6282 32.119C29.497 28.7074 33.4649 26.825 34.7617 26.2158C32.4968 23.6382 27.6317 25.8144 24.0358 27.423H24.036ZM6.95463 21.4943H2.21739C2.14609 21.4943 2.08598 21.5545 2.08598 21.6257V32.3419C2.08598 32.4131 2.14609 32.4733 2.21739 32.4733H6.95463C7.02592 32.4733 7.08604 32.4132 7.08604 32.3419V21.6257C7.08604 21.5545 7.02592 21.4943 6.95463 21.4943ZM35.4883 10.8779H29.1946C28.9745 11.3335 28.6513 11.7217 28.6513 11.7217H35.4883C35.7212 11.7217 35.9102 11.5328 35.9102 11.2998C35.9102 11.0669 35.7212 10.8779 35.4883 10.8779ZM8.26588 11.2841L7.97859 10.8779H1.73828C1.50534 10.8779 1.31641 11.0669 1.31641 11.2998C1.31641 11.5328 1.50534 11.7217 1.73828 11.7217H8.57526C8.44363 11.5394 8.34316 11.3968 8.26588 11.2841Z"
                      fill="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "Cardio" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  Cardio
                </span>
              </div>
            </Link>
          </nav>
        </div>
        {/* CREATE YOUR OWN BLOG BTN */}
        <div className="flex items-center justify-center">
          <CreateBlogBtn />
        </div>
      </div>
      <section className="w-full flex md:hidden flex-wrap justify-center items-center gap-[50px] pt-6 md:pt-[50px] px-4 md:px-[67px]">
        <Carousel
          opts={{ align: "start" }}
          className="w-full flex justify-center items-center max-w-[1080px] bg-[#171717]"
        >
          <CarouselContent className="-ml-1 bg-[#171717]">
            <>
              {filteredBlogs.length <= 0 && popularBlogs
                ? popularBlogs.slice(0, 9).map((blog: any) => (
                    <CarouselItem
                      key={blog._id}
                      className="w-full md:basis-auto"
                    >
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
                                <span>Most Popular</span>
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
                  ))
                : filteredBlogs.slice(0, 9).map((blog: any) => (
                    <CarouselItem
                      key={blog._id}
                      className="w-full md:basis-auto"
                    >
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
              {filteredBlogs ? (
                <CarouselItem
                  className={`${singleCategory ? "flex" : "block"} md:basis-auto justify-center items-center w-full text-white`}
                >
                  <Link
                    href={`/blogCategory/${singleCategory}`}
                    className={`${singleCategory ? "block" : "hidden"}`}
                  >
                    View All
                  </Link>
                </CarouselItem>
              ) : (
                ""
              )}
            </>
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
};

export default MobileFilterForBlogs;
