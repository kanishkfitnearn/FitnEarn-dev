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
  DialogFooter,
  DialogTitle,
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
import CreateBlogBtn from "@/app/Components/blogComponents/CreateBlogBtn";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import AuthorPic from "../../../../public/blogAuthorPic.png";
import LikeButtonForBlog from "@/app/Components/LikeButtonForBlog";
import BlogsPageBannerPic from "../../../../public/blogsPageBanner.jpg";
import Cookies from "js-cookie";
import { useSearchParams, usePathname } from "next/navigation";

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

export default function CategoryBlogs() {
  // //console.log(params.category);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = pathname.split("/").pop();
  //console.log("category from category page: " + category);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [singleCategory, setSingleCategory] = useState<string | undefined>(
    category,
  );
  const [postedAt, setPostedAt] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mobDialogOpen, setMobDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const genToken = Cookies.get("genToken");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const filterCategories = [
    "YOGA",
    "MEDITATION",
    "LIFESTYLE",
    "RECIPES",
    "DANCE",
    "WELLBEING",
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
    "GENERAL",
  ];

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/blog/fetch-all`,
        {
          headers: {
            Authorization: `Bearer ${genToken}`,
          },
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
    }
  };

  const getBlogsByCategory = (
    blogs: Blog[],
    category: string | undefined,
  ): Blog[] => {
    if (!category) return blogs;
    if (category === "All") return blogs;
    // console.log(
    //   "getting blog by categories",
    //   blogs.filter(
    //     (blog) => blog.category.toLowerCase() === category.toLowerCase(),
    //   ),
    // );
    return blogs.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase(),
    );
  };

  const blogsByCategory = getBlogsByCategory(blogs, category);
  const displayBlogs =
    filteredBlogs.length > 0 ? filteredBlogs : blogsByCategory;

  const totalPages = Math.ceil(displayBlogs.length / itemsPerPage);
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (filteredBlogs && filteredBlogs.length <= 9) {
      setCurrentPage(1);
    }
  }, [filteredBlogs]);

  async function fetchLatestBlogs() {
    const res = await fetch(
      `${apiEndpoint}/api/fitnearn/web/user/blog/latest`,
      {
        headers: {
          Authorization: `Bearer ${genToken}`,
        },
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
    fetchBlogs();
    fetchLatestBlogs();
    fetchPopularBlogs();
  }, []);

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

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

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

  useEffect(() => {
    setFilteredBlogs(filterBlogs(blogs, selectedCategories));
  }, [blogs, selectedCategories]);

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

  const bigFilter = () => {
    // Apply the filter based on the selected "postedAt" option
    setDialogOpen(false);
    setMobDialogOpen(false);
    if (postedAt === "Latest") {
      setFilteredBlogs(filterForPostedAtBlogs(latestBlogs, selectedCategories));
    } else if (postedAt === "Trending") {
      //console.log("Trending API is going to be implemented");
    } else if (postedAt === "Most popular") {
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
    <div className="pt-[72px] md:pt-[92px]">
      {/* <h1 className="text-[32px] md:text-[54px] text-[#E5E5E5] font-extrabold tracking-[0.64px] md:tracking-[1.08px] leading-normal my-3 md:my-12 ml-4 md:ml-[92px]">
        {category}
      </h1> */}
      {/* this is for mobile only it contains search, filter, corousel and create blog btn */}
      <div className="flex flex-col items-center justify-center px-4 md:hidden">
        {/* search and filter */}
        <div className="flex items-center justify-between w-full px-2">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
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
          <Drawer open={mobDialogOpen} onOpenChange={setMobDialogOpen}>
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
              href={"/blogCategory/Wellbeing"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("Wellbeing")}
                className={`flex flex-col items-center justify-center`}
              >
                {singleCategory === "Wellbeing" ? (
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
                  className={`${singleCategory === "Wellbeing" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  WELLBEING
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
            <Link
              href={"/blogCategory/General"}
              className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
            >
              <div
                onClick={() => toggleCategory("General")}
                className="flex flex-col items-center justify-center"
              >
                {singleCategory === "General" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="24"
                    viewBox="0 0 30 36"
                    fill="none"
                  >
                    <path
                      d="M28.8264 13.1545L28.8155 13.1295C28.5939 12.6239 28.0289 12.3607 27.4944 12.5158C27.4941 12.5159 27.4939 12.516 27.4936 12.516L23.3469 13.739L23.0435 13.8284L22.8327 13.5925L19.1697 9.49368L28.8264 13.1545ZM28.8264 13.1545L28.8293 13.1718L28.8429 13.2113C29.041 13.7864 28.7376 14.4088 28.162 14.6075C28.1618 14.6076 28.1616 14.6077 28.1614 14.6077L23.5513 16.1819C23.5511 16.182 23.5508 16.1821 23.5506 16.1821C22.4565 16.5525 21.2519 16.2231 20.5071 15.3476C20.5069 15.3475 20.5068 15.3473 20.5067 15.3472L19.5299 14.1947L18.6484 13.1547V14.518V20.7406V20.8061L18.6653 20.8693L22.0965 33.7506L22.0967 33.7511C22.293 34.4846 21.8651 35.2391 21.1302 35.4466C20.3898 35.6537 19.6256 35.2243 19.419 34.4856L19.4187 34.4844L15.8832 21.9661C15.8829 21.9653 15.8827 21.9644 15.8825 21.9636C15.7952 21.6468 15.5453 21.3835 15.21 21.3025C14.7184 21.1812 14.2214 21.4833 14.0953 21.9677L10.5602 34.4844L10.5601 34.4847C10.353 35.2202 9.5982 35.6485 8.86442 35.4522L8.86357 35.4519C8.12743 35.2563 7.68554 34.4913 7.88246 33.7503L11.3206 20.8696L11.3375 20.8062V20.7406V14.532V13.1688L10.4561 14.2087L9.47926 15.3613C9.47917 15.3614 9.47909 15.3615 9.47901 15.3616C8.73269 16.239 7.52796 16.5723 6.43698 16.1968L6.43644 16.1966L1.83452 14.6182C1.82582 14.6148 1.81779 14.6117 1.81148 14.6093L1.7868 14.5999C1.77308 14.5945 1.76766 14.592 1.7658 14.5911L1.75546 14.5859L1.7449 14.5812C1.18789 14.3342 0.936131 13.6857 1.1778 13.1289C1.39953 12.6237 1.96426 12.3608 2.49854 12.5158C2.49883 12.5159 2.49912 12.516 2.49941 12.516L6.64607 13.739L6.94984 13.8285L7.16065 13.5922L10.8163 9.49368C10.8164 9.49353 10.8165 9.49338 10.8167 9.49323C11.2631 8.99489 11.9008 8.71094 12.5672 8.71094H17.4188C18.0916 8.71094 18.7225 8.99444 19.1694 9.49333L28.8264 13.1545Z"
                      fill="url(#paint0_linear_10800_45107)"
                      stroke="url(#paint1_linear_10800_45107)"
                    />
                    <path
                      d="M18.0281 3.69844C18.0281 5.48715 16.6499 6.89687 14.9984 6.89687C13.3469 6.89687 11.9688 5.48715 11.9688 3.69844C11.9688 1.90973 13.3469 0.5 14.9984 0.5C16.6499 0.5 18.0281 1.90973 18.0281 3.69844Z"
                      fill="url(#paint2_linear_10800_45107)"
                      stroke="url(#paint3_linear_10800_45107)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10800_45107"
                        x1="-0.522436"
                        y1="25.9486"
                        x2="30.3736"
                        y2="25.9538"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_10800_45107"
                        x1="-0.522436"
                        y1="25.9486"
                        x2="30.3736"
                        y2="25.9538"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_10800_45107"
                        x1="11.1972"
                        y1="4.72141"
                        x2="18.7657"
                        y2="4.72258"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_10800_45107"
                        x1="11.1972"
                        y1="4.72141"
                        x2="18.7657"
                        y2="4.72258"
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
                    viewBox="0 0 30 36"
                    fill="none"
                  >
                    <path
                      d="M28.8264 13.1545L28.8155 13.1295C28.5939 12.6239 28.0289 12.3607 27.4944 12.5158C27.4941 12.5159 27.4939 12.516 27.4936 12.516L23.3469 13.739L23.0435 13.8284L22.8327 13.5925L19.1697 9.49368L28.8264 13.1545ZM28.8264 13.1545L28.8293 13.1718L28.8429 13.2113C29.041 13.7864 28.7376 14.4088 28.162 14.6075C28.1618 14.6076 28.1616 14.6077 28.1614 14.6077L23.5513 16.1819C23.5511 16.182 23.5508 16.1821 23.5506 16.1821C22.4565 16.5525 21.2519 16.2231 20.5071 15.3476C20.5069 15.3475 20.5068 15.3473 20.5067 15.3472L19.5299 14.1947L18.6484 13.1547V14.518V20.7406V20.8061L18.6653 20.8693L22.0965 33.7506L22.0967 33.7511C22.293 34.4846 21.8651 35.2391 21.1302 35.4466C20.3898 35.6537 19.6256 35.2243 19.419 34.4856L19.4187 34.4844L15.8832 21.9661C15.8829 21.9653 15.8827 21.9644 15.8825 21.9636C15.7952 21.6468 15.5453 21.3835 15.21 21.3025C14.7184 21.1812 14.2214 21.4833 14.0953 21.9677L10.5602 34.4844L10.5601 34.4847C10.353 35.2202 9.5982 35.6485 8.86442 35.4522L8.86357 35.4519C8.12743 35.2563 7.68554 34.4913 7.88246 33.7503L11.3206 20.8696L11.3375 20.8062V20.7406V14.532V13.1688L10.4561 14.2087L9.47926 15.3613C9.47917 15.3614 9.47909 15.3615 9.47901 15.3616C8.73269 16.239 7.52796 16.5723 6.43698 16.1968L6.43644 16.1966L1.83452 14.6182C1.82582 14.6148 1.81779 14.6117 1.81148 14.6093L1.7868 14.5999C1.77308 14.5945 1.76766 14.592 1.7658 14.5911L1.75546 14.5859L1.7449 14.5812C1.18789 14.3342 0.936131 13.6857 1.1778 13.1289C1.39953 12.6237 1.96426 12.3608 2.49854 12.5158C2.49883 12.5159 2.49912 12.516 2.49941 12.516L6.64607 13.739L6.94984 13.8285L7.16065 13.5922L10.8163 9.49368C10.8164 9.49353 10.8165 9.49338 10.8167 9.49323C11.2631 8.99489 11.9008 8.71094 12.5672 8.71094H17.4188C18.0916 8.71094 18.7225 8.99444 19.1694 9.49333L28.8264 13.1545Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                    <path
                      d="M18.0281 3.69844C18.0281 5.48715 16.6499 6.89687 14.9984 6.89687C13.3469 6.89687 11.9688 5.48715 11.9688 3.69844C11.9688 1.90973 13.3469 0.5 14.9984 0.5C16.6499 0.5 18.0281 1.90973 18.0281 3.69844Z"
                      fill="#D4D4D4"
                      stroke="#D4D4D4"
                    />
                  </svg>
                )}
                <span
                  className={`${singleCategory === "General" ? "mid-heading activeLinkForBlogCategory" : ""} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                >
                  General
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

      <div className="hidden md:h-[91px] bg-[#171717] z-50 sticky top-[70px] md:flex w-full justify-center items-center md:pl-[40px] xl:pl-[120px] xl:pr-[60px] border-y-[1.5px] border-y-[#262626] py-4">
        <div className="w-[1200px] max-w-[1200px] flex justify-between items-center">
          <Carousel
            opts={{ align: "start" }}
            className="w-full flex justify-center items-center md:max-w-[600px] xl:max-w-[790px] mr-[60px] xl:mr-[80px]"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[24px]">
                <Link href={"/blogCategory/All"}>
                  <div className="bg-[#171717] flex justify-center items-center">
                    <button
                      onClick={() => toggleCategory("All")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "All" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_6618_3177)">
                            <path
                              d="M33.71 17.2908L18.71 2.29079C18.5227 2.10454 18.2692 2 18.005 2C17.7408 2 17.4874 2.10454 17.3 2.29079L2.30003 17.2908C2.1362 17.4821 2.05059 17.7282 2.06032 17.9798C2.07004 18.2315 2.17437 18.4703 2.35246 18.6484C2.53056 18.8265 2.7693 18.9308 3.02097 18.9405C3.27265 18.9502 3.51873 18.8646 3.71003 18.7008L18 4.41079L32.29 18.7108C32.4813 18.8746 32.7274 18.9602 32.9791 18.9505C33.2308 18.9408 33.4695 18.8365 33.6476 18.6584C33.8257 18.4803 33.93 18.2415 33.9397 17.9898C33.9495 17.7382 33.8639 17.4921 33.7 17.3008L33.71 17.2908Z"
                              fill="url(#paint0_linear_6618_3177)"
                            />
                            <path
                              d="M28 32.0017H23V22.0017H13V32.0017H8V18.0017L6 20.0017V32.0017C6 32.5322 6.21071 33.0409 6.58579 33.4159C6.96086 33.791 7.46957 34.0017 8 34.0017H15V24.0017H21V34.0017H28C28.5304 34.0017 29.0391 33.791 29.4142 33.4159C29.7893 33.0409 30 32.5322 30 32.0017V19.7617L28 17.7617V32.0017Z"
                              fill="url(#paint1_linear_6618_3177)"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_6618_3177"
                              x1="0.833381"
                              y1="12.82"
                              x2="35.0135"
                              y2="12.8304"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_6618_3177"
                              x1="5.07692"
                              y1="28.1277"
                              x2="30.8078"
                              y2="28.1338"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <clipPath id="clip0_6618_3177">
                              <rect width="36" height="36" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_7678_44378)">
                            <path
                              d="M33.709 17.2908L18.709 2.29079C18.5217 2.10454 18.2682 2 18.0041 2C17.7399 2 17.4864 2.10454 17.2991 2.29079L2.29905 17.2908C2.13522 17.4821 2.04962 17.7282 2.05934 17.9798C2.06906 18.2315 2.17339 18.4703 2.35149 18.6484C2.52958 18.8265 2.76832 18.9308 3.02 18.9405C3.27167 18.9502 3.51775 18.8646 3.70905 18.7008L17.9991 4.41079L32.2891 18.7108C32.4804 18.8746 32.7264 18.9602 32.9781 18.9505C33.2298 18.9408 33.4685 18.8365 33.6466 18.6584C33.8247 18.4803 33.929 18.2415 33.9388 17.9898C33.9485 17.7382 33.8629 17.4921 33.6991 17.3008L33.709 17.2908Z"
                              fill="#D4D4D4"
                            />
                            <path
                              d="M28 32.0017H23V22.0017H13V32.0017H8V18.0017L6 20.0017V32.0017C6 32.5322 6.21071 33.0409 6.58579 33.4159C6.96086 33.791 7.46957 34.0017 8 34.0017H15V24.0017H21V34.0017H28C28.5304 34.0017 29.0391 33.791 29.4142 33.4159C29.7893 33.0409 30 32.5322 30 32.0017V19.7617L28 17.7617V32.0017Z"
                              fill="#D4D4D4"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_7678_44378">
                              <rect width="36" height="36" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      <span
                        className={`h-[30px]  ${singleCategory === "All" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        ALL
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Yoga"}>
                  <div className="bg-[#171717] flex justify-center items-center">
                    <button
                      onClick={() => toggleCategory("Yoga")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Yoga" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="30"
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
                          width="30"
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Yoga" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        YOGA
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Meditation"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Meditation")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Meditation" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="30"
                          viewBox="0 0 25 36"
                          fill="none"
                        >
                          <path
                            d="M21.6479 35.9998H3.35148C1.92984 35.9998 0.777344 34.8474 0.777344 33.4257C0.777344 32.0041 1.92984 30.8516 3.35148 30.8516H21.6479C23.0696 30.8516 24.2221 32.0041 24.2221 33.4257C24.2221 34.8474 23.0696 35.9998 21.6479 35.9998Z"
                            fill="url(#paint0_linear_8279_37936)"
                          />
                          <path
                            d="M24.223 33.4256C24.223 34.1366 23.9349 34.78 23.4691 35.2457C23.0034 35.7115 22.3593 35.9996 21.6482 35.9996H20.6797C21.1697 35.8862 21.6076 35.6373 21.9514 35.2936C22.4292 34.8157 22.7252 34.1553 22.7252 33.4256C22.7252 32.1725 21.8515 31.1219 20.6797 30.8516H21.6482C23.0705 30.8515 24.223 32.0041 24.223 33.4256Z"
                            fill="url(#paint1_linear_8279_37936)"
                          />
                          <path
                            d="M20.6117 30.8516H4.38672C4.38672 31.8532 5.19869 32.6651 6.20029 32.6651H18.7981C19.7998 32.6651 20.6117 31.8532 20.6117 30.8516Z"
                            fill="url(#paint2_linear_8279_37936)"
                          />
                          <path
                            d="M20.7118 28.2324L20.0444 22.4879C19.8559 20.8656 18.85 19.4821 17.4214 18.8803L15.7031 18.1565C15.1028 17.9036 14.7084 17.2863 14.7084 16.5994L14.7165 14.6953H10.2816L10.2897 16.5994C10.2897 17.2864 9.89541 17.9037 9.29508 18.1565L7.57679 18.8803C6.14811 19.4821 5.14222 20.8656 4.95378 22.4879L4.28637 28.2324C4.08767 29.9425 5.34155 31.4514 6.9612 31.4514H18.0369C19.6566 31.4515 20.9104 29.9425 20.7118 28.2324Z"
                            fill="url(#paint3_linear_8279_37936)"
                          />
                          <path
                            d="M20.7113 28.2325L20.0437 22.4881C19.8554 20.8662 18.849 19.4825 17.4204 18.8806L15.7023 18.1567C15.1017 17.9042 14.7081 17.2865 14.7081 16.5997L14.7159 14.6953H13.2852L13.2773 17.3021C13.2773 17.989 13.6717 18.606 14.2723 18.8591L16.1345 19.7807C17.5631 20.3826 18.4247 21.568 18.6137 23.1906L19.2806 28.935C19.394 29.9128 19.0331 30.8244 18.4005 31.4256C19.839 31.2202 20.8946 29.8123 20.7113 28.2325Z"
                            fill="url(#paint4_linear_8279_37936)"
                          />
                          <path
                            d="M8.70151 22.6055L8.29587 26.9689C8.24377 27.5294 8.65763 28.0154 9.18708 28.0154H12.0847C13.0335 28.0154 13.8027 28.7845 13.8027 29.7333C13.8027 30.6821 13.0335 31.4513 12.0847 31.4513H6.9612C5.34155 31.4513 4.08767 29.9424 4.28637 28.2323L4.95378 22.6055H8.70151Z"
                            fill="url(#paint5_linear_8279_37936)"
                          />
                          <path
                            d="M14.0742 29.7018C14.083 30.1887 13.8888 30.6302 13.5709 30.9481C13.3056 31.2134 12.9547 31.3925 12.5631 31.4388C12.6181 31.2705 12.648 31.0915 12.648 30.9046C12.648 29.9553 11.8784 29.1864 10.9299 29.1864H8.032C7.50276 29.1864 7.08911 28.7 7.14114 28.1401L7.61174 23.5755C7.66856 23.0244 8.1329 22.6055 8.68689 22.6055H8.97341L8.56757 26.969C8.51554 27.5296 8.92919 28.0153 9.45843 28.0153H12.3172C13.2604 28.0152 14.0572 28.7588 14.0742 29.7018Z"
                            fill="url(#paint6_linear_8279_37936)"
                          />
                          <path
                            d="M13.2789 29.3784C13.5154 29.2558 13.784 29.1864 14.0687 29.1864H16.9666C17.4958 29.1864 17.9095 28.7 17.8575 28.1401L17.3869 23.5755C17.33 23.0244 16.8657 22.6055 16.3117 22.6055H16.0252L16.431 26.969C16.4831 27.5296 16.0694 28.0153 15.5402 28.0153H12.6814C12.2552 28.0153 11.8588 28.1672 11.5508 28.4207L13.2789 29.3784Z"
                            fill="url(#paint7_linear_8279_37936)"
                          />
                          <path
                            d="M12.5006 16.0441C14.8502 16.0441 16.755 14.1393 16.755 11.7896C16.755 9.43995 14.8502 7.53516 12.5006 7.53516C10.1509 7.53516 8.24609 9.43995 8.24609 11.7896C8.24609 14.1393 10.1509 16.0441 12.5006 16.0441Z"
                            fill="url(#paint8_linear_8279_37936)"
                          />
                          <path
                            d="M16.7534 11.7903C16.7534 14.1404 14.8484 16.0447 12.499 16.0447C11.5825 16.0447 10.7337 15.7552 10.0391 15.2623C10.4121 15.3693 10.8065 15.4264 11.2138 15.4264C13.5639 15.4264 15.4682 13.5213 15.4682 11.172C15.4682 9.73765 14.7592 8.46949 13.6715 7.69922C15.4511 8.20849 16.7534 9.84748 16.7534 11.7903Z"
                            fill="url(#paint9_linear_8279_37936)"
                          />
                          <path
                            d="M12.4998 5.40886C12.2043 5.40886 11.9648 5.16937 11.9648 4.87392V0.534938C11.9648 0.239484 12.2043 0 12.4998 0C12.7952 0 13.0347 0.239484 13.0347 0.534938V4.87399C13.0347 5.16937 12.7952 5.40886 12.4998 5.40886Z"
                            fill="url(#paint10_linear_8279_37936)"
                          />
                          <path
                            d="M6.33131 8.97003C6.24054 8.97003 6.14864 8.9469 6.06434 8.89824L2.30663 6.72875C2.05083 6.58102 1.96308 6.25393 2.11081 5.99806C2.25839 5.74227 2.58556 5.65445 2.84149 5.80224L6.5992 7.97173C6.855 8.11946 6.94275 8.44656 6.79502 8.70242C6.69602 8.87406 6.51616 8.97003 6.33131 8.97003Z"
                            fill="url(#paint11_linear_8279_37936)"
                          />
                          <path
                            d="M22.4212 18.2591C22.3304 18.2591 22.2385 18.236 22.1542 18.1873L18.3965 16.0178C18.1407 15.8701 18.0529 15.543 18.2006 15.2871C18.3483 15.0313 18.6754 14.9435 18.9313 15.0913L22.689 17.2608C22.9448 17.4085 23.0326 17.7356 22.8849 17.9915C22.7858 18.1631 22.606 18.2591 22.4212 18.2591Z"
                            fill="url(#paint12_linear_8279_37936)"
                          />
                          <path
                            d="M21.7905 12.5308H19.6209C19.3254 12.5308 19.0859 12.2913 19.0859 11.9959C19.0859 11.7004 19.3254 11.4609 19.6209 11.4609H21.7905C22.086 11.4609 22.3254 11.7004 22.3254 11.9959C22.3254 12.2913 22.086 12.5308 21.7905 12.5308Z"
                            fill="url(#paint13_linear_8279_37936)"
                          />
                          <path
                            d="M5.38035 12.5308H3.21072C2.91527 12.5308 2.67578 12.2913 2.67578 11.9959C2.67578 11.7004 2.91527 11.4609 3.21072 11.4609H5.38035C5.6758 11.4609 5.91529 11.7004 5.91529 11.9959C5.91529 12.2913 5.6758 12.5308 5.38035 12.5308Z"
                            fill="url(#paint14_linear_8279_37936)"
                          />
                          <path
                            d="M2.57453 18.259C2.38968 18.259 2.20982 18.1631 2.11082 17.9915C1.96309 17.7356 2.05077 17.4085 2.30664 17.2608L6.06435 15.0913C6.32001 14.9435 6.64738 15.0313 6.79504 15.2871C6.94277 15.543 6.85509 15.8702 6.59922 16.0178L2.84151 18.1873C2.75734 18.2359 2.66531 18.259 2.57453 18.259Z"
                            fill="url(#paint15_linear_8279_37936)"
                          />
                          <path
                            d="M18.6644 8.96998C18.4795 8.96998 18.2997 8.874 18.2007 8.70244C18.0529 8.44657 18.1406 8.11941 18.3965 7.97175L22.1542 5.80226C22.4099 5.65446 22.7372 5.74221 22.8849 5.99808C23.0326 6.25395 22.9449 6.58111 22.6891 6.72877L18.9314 8.89826C18.8471 8.94691 18.7551 8.96998 18.6644 8.96998Z"
                            fill="url(#paint16_linear_8279_37936)"
                          />
                          <path
                            d="M16.058 6.36412C15.9672 6.36412 15.8752 6.34099 15.791 6.29234C15.5352 6.14461 15.4475 5.81744 15.5952 5.56165L16.9964 3.13481C17.144 2.87887 17.4713 2.7912 17.7271 2.93899C17.9829 3.08672 18.0706 3.41388 17.9229 3.66968L16.5217 6.09652C16.4226 6.26815 16.2428 6.36412 16.058 6.36412Z"
                            fill="url(#paint17_linear_8279_37936)"
                          />
                          <path
                            d="M8.94056 6.36401C8.75571 6.36401 8.57592 6.26803 8.47685 6.09647L7.07566 3.66963C6.92794 3.41384 7.01562 3.08667 7.27148 2.93895C7.52721 2.79122 7.85438 2.8789 8.00217 3.13477L9.40336 5.5616C9.55109 5.8174 9.46341 6.14456 9.20754 6.29229C9.12337 6.3408 9.03134 6.36401 8.94056 6.36401Z"
                            fill="url(#paint18_linear_8279_37936)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_8279_37936"
                              x1="-0.124376"
                              y1="34.1377"
                              x2="25.0111"
                              y2="34.1563"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_8279_37936"
                              x1="20.5434"
                              y1="34.1376"
                              x2="24.3423"
                              y2="34.138"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_8279_37936"
                              x1="3.76268"
                              y1="32.0092"
                              x2="21.1578"
                              y2="32.0344"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_8279_37936"
                              x1="3.63228"
                              y1="25.3907"
                              x2="21.2868"
                              y2="25.3935"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint4_linear_8279_37936"
                              x1="12.9906"
                              y1="25.3742"
                              x2="20.9829"
                              y2="25.3748"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint5_linear_8279_37936"
                              x1="3.89882"
                              y1="28.2517"
                              x2="14.1237"
                              y2="28.2535"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint6_linear_8279_37936"
                              x1="6.86988"
                              y1="28.2438"
                              x2="14.308"
                              y2="28.2447"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint7_linear_8279_37936"
                              x1="11.308"
                              y1="26.9286"
                              x2="18.0743"
                              y2="26.9296"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint8_linear_8279_37936"
                              x1="7.91883"
                              y1="12.9664"
                              x2="17.0414"
                              y2="12.9679"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint9_linear_8279_37936"
                              x1="9.78082"
                              y1="13.0262"
                              x2="16.9794"
                              y2="13.0271"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint10_linear_8279_37936"
                              x1="11.9237"
                              y1="3.45247"
                              x2="13.0707"
                              y2="3.4525"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint11_linear_8279_37936"
                              x1="1.85338"
                              y1="7.79828"
                              x2="7.02925"
                              y2="7.79953"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint12_linear_8279_37936"
                              x1="17.9432"
                              y1="17.0873"
                              x2="23.1191"
                              y2="17.0886"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint13_linear_8279_37936"
                              x1="18.9613"
                              y1="12.1438"
                              x2="22.4345"
                              y2="12.1455"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint14_linear_8279_37936"
                              x1="2.55118"
                              y1="12.1438"
                              x2="6.02432"
                              y2="12.1455"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint15_linear_8279_37936"
                              x1="1.85338"
                              y1="17.0873"
                              x2="7.02929"
                              y2="17.0886"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint16_linear_8279_37936"
                              x1="17.9432"
                              y1="7.79824"
                              x2="23.1191"
                              y2="7.79949"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint17_linear_8279_37936"
                              x1="15.4284"
                              y1="5.09928"
                              x2="18.0778"
                              y2="5.09958"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint18_linear_8279_37936"
                              x1="6.90886"
                              y1="5.0992"
                              x2="9.55829"
                              y2="5.09951"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Meditation" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        MEDITATION
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Cardio"}>
                  <div className="bg-[#171717] flex justify-center items-center">
                    <button
                      onClick={() => toggleCategory("Cardio")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Cardio" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 28"
                          fill="none"
                        >
                          <path
                            d="M20.9514 0.5C18.625 0.5 16.4185 1.43056 14.7971 3.08722C13.1686 1.43056 10.9621 0.5 8.62161 0.5C3.87019 0.5 0 4.37031 0 9.12167C0 18.8994 13.8525 27.0629 14.4375 27.4083C14.5504 27.4717 14.6702 27.5 14.797 27.5C14.9169 27.5 15.0367 27.4718 15.1495 27.4083C15.7417 27.0629 29.6082 18.8994 29.6082 9.12167C29.6083 4.37031 25.724 0.5 20.9514 0.5ZM23.588 13.8519H19.2383L17.5041 17.1159C17.3702 17.3556 17.1023 17.5177 16.7992 17.4825C16.5101 17.4543 16.2775 17.2498 16.1999 16.9678L14.4728 10.5879L13.0559 14.9798C12.9642 15.2477 12.7245 15.4451 12.4355 15.4662C12.1464 15.4874 11.8785 15.3323 11.7517 15.0785L10.6096 12.7874L9.77074 13.9225C9.63679 14.1057 9.42531 14.2115 9.19975 14.2115H6.02037C5.63265 14.2115 5.31543 13.8943 5.31543 13.5065C5.31543 13.1118 5.63265 12.8016 6.02037 12.8016H8.84728L10.1585 11.018C10.2994 10.8206 10.5321 10.7078 10.7859 10.736C11.0256 10.7572 11.2441 10.9052 11.3569 11.1238L12.2451 12.9002L13.8594 7.89506C13.9511 7.59895 14.2331 7.4016 14.5433 7.40864C14.8535 7.41568 15.1284 7.62716 15.2059 7.93031L17.0952 14.8812L18.1949 12.8157C18.3148 12.583 18.5545 12.442 18.8153 12.442H23.5879C23.9756 12.442 24.2928 12.7522 24.2928 13.147C24.2929 13.5348 23.9757 13.8519 23.588 13.8519Z"
                            fill="url(#paint0_linear_8970_21520)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_8970_21520"
                              x1="-1.13878"
                              y1="17.734"
                              x2="30.6047"
                              y2="17.7397"
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
                          height="30"
                          viewBox="0 0 30 28"
                          fill="none"
                        >
                          <path
                            d="M20.9514 0.5C18.625 0.5 16.4185 1.43056 14.7971 3.08722C13.1686 1.43056 10.9621 0.5 8.62161 0.5C3.87019 0.5 0 4.37031 0 9.12167C0 18.8994 13.8525 27.0629 14.4375 27.4083C14.5504 27.4717 14.6702 27.5 14.797 27.5C14.9169 27.5 15.0367 27.4718 15.1495 27.4083C15.7417 27.0629 29.6082 18.8994 29.6082 9.12167C29.6083 4.37031 25.724 0.5 20.9514 0.5ZM23.588 13.8519H19.2383L17.5041 17.1159C17.3702 17.3556 17.1023 17.5177 16.7992 17.4825C16.5101 17.4543 16.2775 17.2498 16.1999 16.9678L14.4728 10.5879L13.0559 14.9798C12.9642 15.2477 12.7245 15.4451 12.4355 15.4662C12.1464 15.4874 11.8785 15.3323 11.7517 15.0785L10.6096 12.7874L9.77074 13.9225C9.63679 14.1057 9.42531 14.2115 9.19975 14.2115H6.02037C5.63265 14.2115 5.31543 13.8943 5.31543 13.5065C5.31543 13.1118 5.63265 12.8016 6.02037 12.8016H8.84728L10.1585 11.018C10.2994 10.8206 10.5321 10.7078 10.7859 10.736C11.0256 10.7572 11.2441 10.9052 11.3569 11.1238L12.2451 12.9002L13.8594 7.89506C13.9511 7.59895 14.2331 7.4016 14.5433 7.40864C14.8535 7.41568 15.1284 7.62716 15.2059 7.93031L17.0952 14.8812L18.1949 12.8157C18.3148 12.583 18.5545 12.442 18.8153 12.442H23.5879C23.9756 12.442 24.2928 12.7522 24.2928 13.147C24.2929 13.5348 23.9757 13.8519 23.588 13.8519Z"
                            fill="#D4D4D4"
                          />
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "Cardio" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        CARDIO
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>

              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Lifestyle"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Lifestyle")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Lifestyle" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="30"
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
                          width="32"
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Lifestyle" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        LIFESTYLE
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Wellbeing"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Wellbeing")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Wellbeing" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="30"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Wellbeing" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        WELLBEING
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Recipes"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Recipes")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Recipes" ? (
                        <svg
                          width="36"
                          height="30"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Recipes" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        RECIPES
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Motivation"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Motivation")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Motivation" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Motivation" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        MOTIVATION
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/FitnessStory"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("FitnessStory")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "FitnessStory" ? (
                        <svg
                          width="37"
                          height="30"
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
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_9636_42692)">
                            <mask id="path-1-inside-1_9636_42692" fill="white">
                              <path d="M8.36719 10.2656C9.41391 10.2656 10.2656 9.41391 10.2656 8.36719C10.2656 7.32046 9.41391 6.46875 8.36719 6.46875C7.32047 6.46875 6.46875 7.32046 6.46875 8.36719C6.46875 9.41391 7.32047 10.2656 8.36719 10.2656Z" />
                              <path d="M7.7959 19.3788L8.36719 19.7468L8.93848 19.3788C9.25681 19.1736 16.7344 14.2883 16.7344 8.36719C16.7344 3.75348 12.9809 0 8.36719 0C3.75348 0 5.36442e-07 3.75348 5.36442e-07 8.36719C5.36442e-07 14.2883 7.47757 19.1736 7.7959 19.3788ZM8.36719 4.35938C10.5771 4.35938 12.375 6.15729 12.375 8.36719C12.375 10.5771 10.5771 12.375 8.36719 12.375C6.15729 12.375 4.35938 10.5771 4.35938 8.36719C4.35938 6.15729 6.15729 4.35938 8.36719 4.35938Z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M25.6928 22.7021H30.7766C31.3446 22.7021 31.8094 23.167 31.8094 23.7349V26.0539H30.374V34.7695C30.374 34.9632 30.2161 35.1211 30.0224 35.1211C25.2838 35.1211 31.1856 35.1211 26.447 35.1211C26.2533 35.1211 26.0954 34.9632 26.0954 34.7695V26.0539H24.66V23.7349C24.66 23.1668 25.1248 22.7021 25.6928 22.7021Z"
                              />
                              <path d="M28.2347 21.6082C29.1631 21.6082 29.9158 20.8556 29.9158 19.9272C29.9158 18.9987 29.1631 18.2461 28.2347 18.2461C27.3063 18.2461 26.5536 18.9987 26.5536 19.9272C26.5536 20.8556 27.3063 21.6082 28.2347 21.6082Z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.9499 22.1232H22.4412C22.8285 22.1232 23.1445 22.4391 23.1445 22.8264V25.865C23.1445 26.2523 22.8285 26.5682 22.4412 26.5682H21.9499C21.5626 26.5682 21.2467 26.2524 21.2467 25.865V22.8264C21.2467 22.439 21.5626 22.1232 21.9499 22.1232ZM34.1647 22.1232H34.656C35.0433 22.1232 35.3592 22.4391 35.3592 22.8264V25.865C35.3592 26.2523 35.0433 26.5682 34.656 26.5682H34.1647C33.7774 26.5682 33.4614 26.2524 33.4614 25.865V22.8264C33.4614 22.439 33.7774 22.1232 34.1647 22.1232Z"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M31.0917 23.3337C30.6969 23.3337 30.374 23.6566 30.374 24.0514V26.0539C30.374 26.4486 30.6969 26.7716 31.0917 26.7716C31.4864 26.7716 31.8094 26.4486 31.8094 26.0539V24.0514C31.8094 23.6566 31.4864 23.3337 31.0917 23.3337ZM25.3777 23.3337C25.7725 23.3337 26.0954 23.6566 26.0954 24.0514V26.0539C26.0954 26.4486 25.7725 26.7716 25.3777 26.7716C24.983 26.7716 24.66 26.4486 24.66 26.0539V24.0514C24.66 23.6566 24.983 23.3337 25.3777 23.3337Z"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M31.5643 26.0539C31.5643 26.3141 31.3525 26.5254 31.0928 26.5254C30.8314 26.5254 30.6197 26.3141 30.6197 26.0539V24.0514C30.6197 23.7912 30.8314 23.5796 31.0928 23.5796C31.3525 23.5796 31.5643 23.7912 31.5643 24.0514V26.0539ZM30.1284 34.8749H28.4807V29.7368C28.4807 29.6012 28.3715 29.4909 28.2342 29.4909C28.0986 29.4909 27.9894 29.6012 27.9894 29.7368V34.8749H26.3417V24.5917H30.1284V34.8749ZM25.3789 26.5254C25.1175 26.5254 24.9074 26.3141 24.9074 26.0539V24.0514C24.9074 23.7911 25.1175 23.5796 25.3789 23.5796C25.6387 23.5796 25.8504 23.7912 25.8504 24.0514V26.0539C25.8504 26.3141 25.6387 26.5254 25.3789 26.5254ZM30.7768 22.9481H25.6932C25.5212 22.9481 25.3607 23.0041 25.2317 23.0987C25.2797 23.0912 25.3276 23.0874 25.3789 23.0874C25.91 23.0874 26.3417 23.5198 26.3417 24.0514V24.0995H30.1284V24.0514C30.1284 23.5198 30.5601 23.0874 31.0928 23.0874C31.1424 23.0874 31.1904 23.0912 31.2384 23.0987C31.1094 23.0041 30.9506 22.9481 30.7768 22.9481ZM22.8991 25.8651C22.8991 26.1172 22.694 26.3222 22.4409 26.3222H21.9512C21.6981 26.3222 21.493 26.1172 21.493 25.8651V22.8262C21.493 22.5741 21.6981 22.3691 21.9512 22.3691H22.4409C22.694 22.3691 22.8991 22.5741 22.8991 22.8262L22.8991 25.8651ZM33.7082 22.8262C33.7082 22.5741 33.9134 22.3691 34.1648 22.3691H34.6561C34.9076 22.3691 35.1144 22.5741 35.1144 22.8262V25.8651C35.1144 26.1172 34.9076 26.3222 34.6561 26.3222H34.1648C33.9134 26.3222 33.7082 26.1172 33.7082 25.8651V22.8262ZM33.2152 24.5917V25.8651C33.2152 26.3885 33.642 26.8143 34.1648 26.8143H34.6561C35.1806 26.8143 35.6057 26.3885 35.6057 25.8651V22.8262C35.6057 22.3026 35.1806 21.877 34.6561 21.877H34.1648C33.6421 21.877 33.2152 22.3026 33.2152 22.8262V24.0995H32.0556V23.7351C32.0556 23.0297 31.4816 22.456 30.7768 22.456H25.6932C24.9885 22.456 24.4144 23.0297 24.4144 23.7351V24.0995H23.3904V22.8262C23.3904 22.3026 22.9653 21.877 22.4409 21.877H21.9512C21.4268 21.877 21 22.3026 21 22.8262V25.8651C21 26.3885 21.4268 26.8143 21.9512 26.8143H22.4409C22.9653 26.8143 23.3904 26.3885 23.3904 25.8651V24.5917H24.4144V26.0539C24.4144 26.5851 24.8462 27.0175 25.3789 27.0175C25.5493 27.0175 25.7097 26.9725 25.8504 26.8938V35.121C25.8504 35.2572 25.9596 35.3672 26.0952 35.3672H30.3748C30.5105 35.3672 30.6197 35.2572 30.6197 35.121V26.8938C30.7603 26.9725 30.9207 27.0175 31.0928 27.0175C31.6238 27.0175 32.0556 26.5851 32.0556 26.0539V24.5917H33.2152ZM28.2342 18.4922C29.0266 18.4922 29.6701 19.1358 29.6701 19.9273C29.6701 20.7182 29.0266 21.3623 28.2342 21.3623C27.4435 21.3623 26.7999 20.7182 26.7999 19.9273C26.7999 19.1358 27.4435 18.4922 28.2342 18.4922ZM28.2342 21.8545C29.2979 21.8545 30.1615 20.9896 30.1615 19.9273C30.1615 18.8644 29.2979 18 28.2342 18C27.1722 18 26.3086 18.8644 26.3086 19.9272C26.3086 20.9896 27.1722 21.8545 28.2342 21.8545Z"
                              />
                              <path d="M3.51562 33.8906C2.74026 33.8906 2.10938 33.2597 2.10938 32.4844C2.10938 31.709 2.74026 31.0781 3.51562 31.0781H13.2188C15.1573 31.0781 16.7344 29.501 16.7344 27.5625C16.7344 25.624 15.1573 24.0469 13.2188 24.0469H10.8281C10.0528 24.0469 9.42188 23.416 9.42188 22.6406V21.8672H7.3125V22.6406C7.3125 24.5792 8.88959 26.1562 10.8281 26.1562H13.2188C13.9941 26.1562 14.625 26.7871 14.625 27.5625C14.625 28.3379 13.9941 28.9687 13.2188 28.9687H3.51562C1.57709 28.9687 0 30.5458 0 32.4844C0 34.4229 1.57709 36 3.51562 36H24.8316L24.6432 33.8906H3.51562Z" />
                            </mask>
                            <path
                              d="M8.36719 10.2656C9.41391 10.2656 10.2656 9.41391 10.2656 8.36719C10.2656 7.32046 9.41391 6.46875 8.36719 6.46875C7.32047 6.46875 6.46875 7.32046 6.46875 8.36719C6.46875 9.41391 7.32047 10.2656 8.36719 10.2656Z"
                              fill="#D4D4D4"
                            />
                            <path
                              d="M7.7959 19.3788L8.36719 19.7468L8.93848 19.3788C9.25681 19.1736 16.7344 14.2883 16.7344 8.36719C16.7344 3.75348 12.9809 0 8.36719 0C3.75348 0 5.36442e-07 3.75348 5.36442e-07 8.36719C5.36442e-07 14.2883 7.47757 19.1736 7.7959 19.3788ZM8.36719 4.35938C10.5771 4.35938 12.375 6.15729 12.375 8.36719C12.375 10.5771 10.5771 12.375 8.36719 12.375C6.15729 12.375 4.35938 10.5771 4.35938 8.36719C4.35938 6.15729 6.15729 4.35938 8.36719 4.35938Z"
                              fill="#D4D4D4"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M25.6928 22.7021H30.7766C31.3446 22.7021 31.8094 23.167 31.8094 23.7349V26.0539H30.374V34.7695C30.374 34.9632 30.2161 35.1211 30.0224 35.1211C25.2838 35.1211 31.1856 35.1211 26.447 35.1211C26.2533 35.1211 26.0954 34.9632 26.0954 34.7695V26.0539H24.66V23.7349C24.66 23.1668 25.1248 22.7021 25.6928 22.7021Z"
                              fill="#D4D4D4"
                            />
                            <path
                              d="M28.2347 21.6082C29.1631 21.6082 29.9158 20.8556 29.9158 19.9272C29.9158 18.9987 29.1631 18.2461 28.2347 18.2461C27.3063 18.2461 26.5536 18.9987 26.5536 19.9272C26.5536 20.8556 27.3063 21.6082 28.2347 21.6082Z"
                              fill="#D4D4D4"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M21.9499 22.1232H22.4412C22.8285 22.1232 23.1445 22.4391 23.1445 22.8264V25.865C23.1445 26.2523 22.8285 26.5682 22.4412 26.5682H21.9499C21.5626 26.5682 21.2467 26.2524 21.2467 25.865V22.8264C21.2467 22.439 21.5626 22.1232 21.9499 22.1232ZM34.1647 22.1232H34.656C35.0433 22.1232 35.3592 22.4391 35.3592 22.8264V25.865C35.3592 26.2523 35.0433 26.5682 34.656 26.5682H34.1647C33.7774 26.5682 33.4614 26.2524 33.4614 25.865V22.8264C33.4614 22.439 33.7774 22.1232 34.1647 22.1232Z"
                              fill="#D4D4D4"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M31.0917 23.3337C30.6969 23.3337 30.374 23.6566 30.374 24.0514V26.0539C30.374 26.4486 30.6969 26.7716 31.0917 26.7716C31.4864 26.7716 31.8094 26.4486 31.8094 26.0539V24.0514C31.8094 23.6566 31.4864 23.3337 31.0917 23.3337ZM25.3777 23.3337C25.7725 23.3337 26.0954 23.6566 26.0954 24.0514V26.0539C26.0954 26.4486 25.7725 26.7716 25.3777 26.7716C24.983 26.7716 24.66 26.4486 24.66 26.0539V24.0514C24.66 23.6566 24.983 23.3337 25.3777 23.3337Z"
                              fill="#D4D4D4"
                            />
                            <path
                              d="M3.51562 33.8906C2.74026 33.8906 2.10938 33.2597 2.10938 32.4844C2.10938 31.709 2.74026 31.0781 3.51562 31.0781H13.2188C15.1573 31.0781 16.7344 29.501 16.7344 27.5625C16.7344 25.624 15.1573 24.0469 13.2188 24.0469H10.8281C10.0528 24.0469 9.42188 23.416 9.42188 22.6406V21.8672H7.3125V22.6406C7.3125 24.5792 8.88959 26.1562 10.8281 26.1562H13.2188C13.9941 26.1562 14.625 26.7871 14.625 27.5625C14.625 28.3379 13.9941 28.9687 13.2188 28.9687H3.51562C1.57709 28.9687 0 30.5458 0 32.4844C0 34.4229 1.57709 36 3.51562 36H24.8316L24.6432 33.8906H3.51562Z"
                              fill="#D4D4D4"
                            />
                            <path
                              d="M7.7959 19.3788L7.07357 20.4995L7.0738 20.4997L7.7959 19.3788ZM8.36719 19.7468L7.64509 20.8677L8.36719 21.3329L9.08929 20.8677L8.36719 19.7468ZM8.93848 19.3788L9.66058 20.4997L9.66081 20.4995L8.93848 19.3788ZM30.1284 34.8749V36.2082H31.4617V34.8749H30.1284ZM28.4807 34.8749H27.1474V36.2082H28.4807V34.8749ZM27.9894 34.8749V36.2082H29.3227V34.8749H27.9894ZM26.3417 34.8749H25.0084V36.2082H26.3417V34.8749ZM26.3417 24.5917V23.2584H25.0084V24.5917H26.3417ZM30.1284 24.5917H31.4617V23.2584H30.1284V24.5917ZM25.2317 23.0987L24.4433 22.0234L25.4363 24.4162L25.2317 23.0987ZM26.3417 24.0995H25.0084V25.4328H26.3417V24.0995ZM30.1284 24.0995V25.4328H31.4617V24.0995H30.1284ZM31.2384 23.0987L31.0338 24.4162L32.0268 22.0234L31.2384 23.0987ZM22.8991 25.8651H24.2325V25.8651L22.8991 25.8651ZM22.8991 22.8262H21.5658V22.8262L22.8991 22.8262ZM33.2152 24.5917H34.5486V23.2583H33.2152V24.5917ZM33.2152 24.0995V25.4328H34.5486V24.0995H33.2152ZM32.0556 24.0995H30.7222V25.4328H32.0556V24.0995ZM24.4144 24.0995V25.4328H25.7478V24.0995H24.4144ZM23.3904 24.0995H22.0571V25.4328H23.3904V24.0995ZM23.3904 24.5917V23.2583H22.0571V24.5917H23.3904ZM24.4144 24.5917H25.7478V23.2583H24.4144V24.5917ZM25.8504 26.8938H27.1837V24.6189L25.1989 25.7304L25.8504 26.8938ZM30.6197 26.8938L31.2711 25.7304L29.2863 24.6189V26.8938H30.6197ZM32.0556 24.5917V23.2583H30.7222V24.5917H32.0556ZM9.42188 21.8672H10.7552V20.5339H9.42188V21.8672ZM7.3125 21.8672V20.5339H5.97917V21.8672H7.3125ZM24.8316 36V37.3333H26.2893L26.1596 35.8814L24.8316 36ZM24.6432 33.8906L25.9712 33.772L25.8627 32.5573H24.6432V33.8906ZM8.36719 11.599C10.1503 11.599 11.599 10.1503 11.599 8.36719H8.93229C8.93229 8.67753 8.67753 8.93229 8.36719 8.93229V11.599ZM11.599 8.36719C11.599 6.58408 10.1503 5.13542 8.36719 5.13542V7.80208C8.67753 7.80208 8.93229 8.05684 8.93229 8.36719H11.599ZM8.36719 5.13542C6.58409 5.13542 5.13542 6.58408 5.13542 8.36719H7.80208C7.80208 8.05684 8.05684 7.80208 8.36719 7.80208V5.13542ZM5.13542 8.36719C5.13542 10.1503 6.58409 11.599 8.36719 11.599V8.93229C8.05684 8.93229 7.80208 8.67753 7.80208 8.36719H5.13542ZM7.0738 20.4997L7.64509 20.8677L9.08929 18.626L8.518 18.2579L7.0738 20.4997ZM9.08929 20.8677L9.66058 20.4997L8.21638 18.2579L7.64509 18.626L9.08929 20.8677ZM9.66081 20.4995C9.859 20.3718 11.9053 19.0343 13.9173 16.9402C15.8879 14.8892 18.0677 11.863 18.0677 8.36719H15.401C15.401 10.7924 13.8421 13.1695 11.9943 15.0927C10.188 16.9728 8.33628 18.1806 8.21615 18.2581L9.66081 20.4995ZM18.0677 8.36719C18.0677 3.0171 13.7173 -1.33333 8.36719 -1.33333V1.33333C12.2445 1.33333 15.401 4.48986 15.401 8.36719H18.0677ZM8.36719 -1.33333C3.0171 -1.33333 -1.33333 3.0171 -1.33333 8.36719H1.33333C1.33333 4.48986 4.48986 1.33333 8.36719 1.33333V-1.33333ZM-1.33333 8.36719C-1.33333 11.863 0.846514 14.8892 2.8171 16.9402C4.8291 19.0343 6.87538 20.3718 7.07357 20.4995L8.51823 18.2581C8.39809 18.1806 6.54642 16.9728 4.74005 15.0927C2.89227 13.1695 1.33333 10.7924 1.33333 8.36719H-1.33333ZM8.36719 5.69271C9.84071 5.69271 11.0417 6.89367 11.0417 8.36719H13.7083C13.7083 5.42091 11.3135 3.02604 8.36719 3.02604V5.69271ZM11.0417 8.36719C11.0417 9.84071 9.84071 11.0417 8.36719 11.0417V13.7083C11.3135 13.7083 13.7083 11.3135 13.7083 8.36719H11.0417ZM8.36719 11.0417C6.89367 11.0417 5.69271 9.84071 5.69271 8.36719H3.02604C3.02604 11.3135 5.42091 13.7083 8.36719 13.7083V11.0417ZM5.69271 8.36719C5.69271 6.89367 6.89367 5.69271 8.36719 5.69271V3.02604C5.42091 3.02604 3.02604 5.42091 3.02604 8.36719H5.69271ZM25.6928 24.0355H30.7766V21.3688H25.6928V24.0355ZM30.7766 24.0355C30.6082 24.0355 30.476 23.9033 30.476 23.7349H33.1427C33.1427 22.4306 32.0811 21.3688 30.7766 21.3688V24.0355ZM30.476 23.7349V26.0539H33.1427V23.7349H30.476ZM31.8094 24.7205H30.374V27.3872H31.8094V24.7205ZM29.0407 26.0539V34.7695H31.7073V26.0539H29.0407ZM29.0407 34.7695C29.0407 34.2268 29.4797 33.7878 30.0224 33.7878V36.4544C30.9524 36.4544 31.7073 35.6996 31.7073 34.7695H29.0407ZM30.0224 33.7878C30.0132 33.7878 30.004 33.7878 29.9948 33.7878C29.9856 33.7878 29.9765 33.7878 29.9674 33.7878C29.9583 33.7878 29.9492 33.7878 29.9402 33.7878C29.9312 33.7878 29.9222 33.7878 29.9133 33.7878C29.9044 33.7878 29.8955 33.7878 29.8866 33.7878C29.8778 33.7878 29.869 33.7878 29.8602 33.7878C29.8514 33.7878 29.8427 33.7878 29.834 33.7878C29.8253 33.7878 29.8166 33.7878 29.808 33.7878C29.7994 33.7878 29.7908 33.7878 29.7823 33.7878C29.7738 33.7878 29.7653 33.7878 29.7568 33.7878C29.7483 33.7878 29.7399 33.7878 29.7315 33.7878C29.7232 33.7878 29.7148 33.7878 29.7065 33.7878C29.6982 33.7878 29.6899 33.7878 29.6817 33.7878C29.6735 33.7878 29.6653 33.7878 29.6571 33.7878C29.649 33.7878 29.6409 33.7878 29.6328 33.7878C29.6247 33.7878 29.6167 33.7878 29.6087 33.7878C29.6007 33.7878 29.5927 33.7878 29.5848 33.7878C29.5769 33.7878 29.569 33.7878 29.5612 33.7878C29.5533 33.7878 29.5455 33.7878 29.5378 33.7878C29.53 33.7878 29.5223 33.7878 29.5146 33.7878C29.5069 33.7878 29.4992 33.7878 29.4916 33.7878C29.484 33.7878 29.4764 33.7878 29.4688 33.7878C29.4613 33.7878 29.4538 33.7878 29.4463 33.7878C29.4388 33.7878 29.4314 33.7878 29.424 33.7878C29.4166 33.7878 29.4092 33.7878 29.4019 33.7878C29.3946 33.7878 29.3873 33.7878 29.3801 33.7878C29.3728 33.7878 29.3656 33.7878 29.3584 33.7878C29.3512 33.7878 29.3441 33.7878 29.337 33.7878C29.3299 33.7878 29.3228 33.7878 29.3158 33.7878C29.3087 33.7878 29.3017 33.7878 29.2948 33.7878C29.2878 33.7878 29.2809 33.7878 29.274 33.7878C29.2671 33.7878 29.2602 33.7878 29.2534 33.7878C29.2466 33.7878 29.2398 33.7878 29.2331 33.7878C29.2263 33.7878 29.2196 33.7878 29.2129 33.7878C29.2063 33.7878 29.1996 33.7878 29.193 33.7878C29.1864 33.7878 29.1798 33.7878 29.1733 33.7878C29.1667 33.7878 29.1602 33.7878 29.1538 33.7878C29.1473 33.7878 29.1409 33.7878 29.1345 33.7878C29.1281 33.7878 29.1217 33.7878 29.1154 33.7878C29.109 33.7878 29.1028 33.7878 29.0965 33.7878C29.0902 33.7878 29.084 33.7878 29.0778 33.7878C29.0716 33.7878 29.0655 33.7878 29.0593 33.7878C29.0532 33.7878 29.0471 33.7878 29.0411 33.7878C29.035 33.7878 29.029 33.7878 29.023 33.7878C29.017 33.7878 29.011 33.7878 29.0051 33.7878C28.9992 33.7878 28.9933 33.7878 28.9874 33.7878C28.9816 33.7878 28.9758 33.7878 28.97 33.7878C28.9642 33.7878 28.9584 33.7878 28.9527 33.7878C28.947 33.7878 28.9413 33.7878 28.9356 33.7878C28.93 33.7878 28.9243 33.7878 28.9188 33.7878C28.9132 33.7878 28.9076 33.7878 28.9021 33.7878C28.8965 33.7878 28.8911 33.7878 28.8856 33.7878C28.8801 33.7878 28.8747 33.7878 28.8693 33.7878C28.8639 33.7878 28.8585 33.7878 28.8532 33.7878C28.8479 33.7878 28.8426 33.7878 28.8373 33.7878C28.832 33.7878 28.8268 33.7878 28.8216 33.7878C28.8164 33.7878 28.8112 33.7878 28.8061 33.7878C28.8009 33.7878 28.7958 33.7878 28.7907 33.7878C28.7856 33.7878 28.7806 33.7878 28.7756 33.7878C28.7706 33.7878 28.7656 33.7878 28.7606 33.7878C28.7557 33.7878 28.7507 33.7878 28.7458 33.7878C28.741 33.7878 28.7361 33.7878 28.7313 33.7878C28.7264 33.7878 28.7216 33.7878 28.7169 33.7878C28.7121 33.7878 28.7073 33.7878 28.7026 33.7878C28.6979 33.7878 28.6933 33.7878 28.6886 33.7878C28.684 33.7878 28.6793 33.7878 28.6747 33.7878C28.6702 33.7878 28.6656 33.7878 28.6611 33.7878C28.6565 33.7878 28.652 33.7878 28.6476 33.7878C28.6431 33.7878 28.6387 33.7878 28.6343 33.7878C28.6299 33.7878 28.6255 33.7878 28.6211 33.7878C28.6168 33.7878 28.6125 33.7878 28.6082 33.7878C28.6039 33.7878 28.5996 33.7878 28.5954 33.7878C28.5912 33.7878 28.5869 33.7878 28.5828 33.7878C28.5786 33.7878 28.5745 33.7878 28.5703 33.7878C28.5662 33.7878 28.5621 33.7878 28.5581 33.7878C28.554 33.7878 28.55 33.7878 28.546 33.7878C28.542 33.7878 28.538 33.7878 28.5341 33.7878C28.5301 33.7878 28.5262 33.7878 28.5223 33.7878C28.5184 33.7878 28.5146 33.7878 28.5107 33.7878C28.5069 33.7878 28.5031 33.7878 28.4993 33.7878C28.4956 33.7878 28.4918 33.7878 28.4881 33.7878C28.4844 33.7878 28.4807 33.7878 28.477 33.7878C28.4733 33.7878 28.4697 33.7878 28.4661 33.7878C28.4625 33.7878 28.4589 33.7878 28.4554 33.7878C28.4518 33.7878 28.4483 33.7878 28.4448 33.7878C28.4413 33.7878 28.4378 33.7878 28.4344 33.7878C28.4309 33.7878 28.4275 33.7878 28.4241 33.7878C28.4207 33.7878 28.4173 33.7878 28.414 33.7878C28.4107 33.7878 28.4073 33.7878 28.4041 33.7878C28.4008 33.7878 28.3975 33.7878 28.3943 33.7878C28.391 33.7878 28.3878 33.7878 28.3847 33.7878C28.3815 33.7878 28.3783 33.7878 28.3752 33.7878C28.3721 33.7878 28.369 33.7878 28.3659 33.7878C28.3628 33.7878 28.3598 33.7878 28.3567 33.7878C28.3537 33.7878 28.3507 33.7878 28.3477 33.7878C28.3448 33.7878 28.3418 33.7878 28.3389 33.7878C28.336 33.7878 28.3331 33.7878 28.3302 33.7878C28.3273 33.7878 28.3245 33.7878 28.3217 33.7878C28.3188 33.7878 28.316 33.7878 28.3133 33.7878C28.3105 33.7878 28.3077 33.7878 28.305 33.7878C28.3023 33.7878 28.2996 33.7878 28.2969 33.7878C28.2943 33.7878 28.2916 33.7878 28.289 33.7878C28.2864 33.7878 28.2838 33.7878 28.2812 33.7878C28.2786 33.7878 28.2761 33.7878 28.2735 33.7878C28.271 33.7878 28.2685 33.7878 28.266 33.7878C28.2635 33.7878 28.2611 33.7878 28.2586 33.7878C28.2562 33.7878 28.2538 33.7878 28.2514 33.7878C28.249 33.7878 28.2467 33.7878 28.2443 33.7878C28.242 33.7878 28.2397 33.7878 28.2374 33.7878C28.2351 33.7878 28.2328 33.7878 28.2306 33.7878C28.2284 33.7878 28.2261 33.7878 28.2239 33.7878C28.2217 33.7878 28.2196 33.7878 28.2174 33.7878C28.2153 33.7878 28.2131 33.7878 28.211 33.7878C28.2089 33.7878 28.2068 33.7878 28.2048 33.7878C28.2027 33.7878 28.2007 33.7878 28.1987 33.7878C28.1966 33.7878 28.1946 33.7878 28.1927 33.7878C28.1907 33.7878 28.1888 33.7878 28.1868 33.7878C28.1849 33.7878 28.183 33.7878 28.1811 33.7878C28.1792 33.7878 28.1774 33.7878 28.1755 33.7878C28.1737 33.7878 28.1719 33.7878 28.1701 33.7878C28.1683 33.7878 28.1665 33.7878 28.1647 33.7878C28.163 33.7878 28.1613 33.7878 28.1595 33.7878C28.1578 33.7878 28.1561 33.7878 28.1545 33.7878C28.1528 33.7878 28.1512 33.7878 28.1495 33.7878C28.1479 33.7878 28.1463 33.7878 28.1447 33.7878C28.1431 33.7878 28.1416 33.7878 28.14 33.7878C28.1385 33.7878 28.137 33.7878 28.1355 33.7878C28.134 33.7878 28.1325 33.7878 28.131 33.7878C28.1295 33.7878 28.1281 33.7878 28.1267 33.7878C28.1253 33.7878 28.1239 33.7878 28.1225 33.7878C28.1211 33.7878 28.1197 33.7878 28.1184 33.7878C28.1171 33.7878 28.1157 33.7878 28.1144 33.7878C28.1131 33.7878 28.1118 33.7878 28.1106 33.7878C28.1093 33.7878 28.1081 33.7878 28.1069 33.7878C28.1056 33.7878 28.1044 33.7878 28.1032 33.7878C28.1021 33.7878 28.1009 33.7878 28.0997 33.7878C28.0986 33.7878 28.0975 33.7878 28.0964 33.7878C28.0952 33.7878 28.0942 33.7878 28.0931 33.7878C28.092 33.7878 28.091 33.7878 28.0899 33.7878C28.0889 33.7878 28.0879 33.7878 28.0869 33.7878C28.0859 33.7878 28.0849 33.7878 28.0839 33.7878C28.083 33.7878 28.082 33.7878 28.0811 33.7878C28.0802 33.7878 28.0793 33.7878 28.0784 33.7878C28.0775 33.7878 28.0766 33.7878 28.0758 33.7878C28.0749 33.7878 28.0741 33.7878 28.0733 33.7878C28.0725 33.7878 28.0717 33.7878 28.0709 33.7878C28.0701 33.7878 28.0693 33.7878 28.0686 33.7878C28.0678 33.7878 28.0671 33.7878 28.0664 33.7878C28.0657 33.7878 28.065 33.7878 28.0643 33.7878C28.0636 33.7878 28.063 33.7878 28.0623 33.7878C28.0617 33.7878 28.061 33.7878 28.0604 33.7878C28.0598 33.7878 28.0592 33.7878 28.0586 33.7878C28.0581 33.7878 28.0575 33.7878 28.0569 33.7878C28.0564 33.7878 28.0559 33.7878 28.0554 33.7878C28.0548 33.7878 28.0543 33.7878 28.0539 33.7878C28.0534 33.7878 28.0529 33.7878 28.0525 33.7878C28.052 33.7878 28.0516 33.7878 28.0512 33.7878C28.0507 33.7878 28.0503 33.7878 28.05 33.7878C28.0496 33.7878 28.0492 33.7878 28.0488 33.7878C28.0485 33.7878 28.0481 33.7878 28.0478 33.7878C28.0475 33.7878 28.0472 33.7878 28.0469 33.7878C28.0466 33.7878 28.0463 33.7878 28.046 33.7878C28.0458 33.7878 28.0455 33.7878 28.0453 33.7878C28.0451 33.7878 28.0448 33.7878 28.0446 33.7878C28.0444 33.7878 28.0442 33.7878 28.0441 33.7878C28.0439 33.7878 28.0437 33.7878 28.0436 33.7878C28.0434 33.7878 28.0433 33.7878 28.0432 33.7878C28.0431 33.7878 28.0429 33.7878 28.0429 33.7878C28.0428 33.7878 28.0427 33.7878 28.0426 33.7878C28.0426 33.7878 28.0425 33.7878 28.0425 33.7878C28.0424 33.7878 28.0424 33.7878 28.0424 33.7878C28.0424 35.1211 28.0424 36.4544 28.0424 36.4544C28.0424 36.4544 28.0425 36.4544 28.0425 36.4544C28.0425 36.4544 28.0426 36.4544 28.0427 36.4544C28.0427 36.4544 28.0428 36.4544 28.0429 36.4544C28.043 36.4544 28.0431 36.4544 28.0432 36.4544C28.0434 36.4544 28.0435 36.4544 28.0436 36.4544C28.0438 36.4544 28.044 36.4544 28.0441 36.4544C28.0443 36.4544 28.0445 36.4544 28.0447 36.4544C28.0449 36.4544 28.0451 36.4544 28.0453 36.4544C28.0455 36.4544 28.0457 36.4544 28.046 36.4544C28.0462 36.4544 28.0465 36.4544 28.0468 36.4544C28.047 36.4544 28.0473 36.4544 28.0476 36.4544C28.0479 36.4544 28.0482 36.4544 28.0485 36.4544C28.0488 36.4544 28.0491 36.4544 28.0495 36.4544C28.0498 36.4544 28.0502 36.4544 28.0505 36.4544C28.0509 36.4544 28.0513 36.4544 28.0516 36.4544C28.052 36.4544 28.0524 36.4544 28.0528 36.4544C28.0532 36.4544 28.0536 36.4544 28.0541 36.4544C28.0545 36.4544 28.0549 36.4544 28.0554 36.4544C28.0558 36.4544 28.0563 36.4544 28.0567 36.4544C28.0572 36.4544 28.0577 36.4544 28.0582 36.4544C28.0586 36.4544 28.0591 36.4544 28.0596 36.4544C28.0602 36.4544 28.0607 36.4544 28.0612 36.4544C28.0617 36.4544 28.0623 36.4544 28.0628 36.4544C28.0633 36.4544 28.0639 36.4544 28.0645 36.4544C28.065 36.4544 28.0656 36.4544 28.0662 36.4544C28.0668 36.4544 28.0674 36.4544 28.068 36.4544C28.0686 36.4544 28.0692 36.4544 28.0698 36.4544C28.0704 36.4544 28.0711 36.4544 28.0717 36.4544C28.0723 36.4544 28.073 36.4544 28.0736 36.4544C28.0743 36.4544 28.075 36.4544 28.0756 36.4544C28.0763 36.4544 28.077 36.4544 28.0777 36.4544C28.0784 36.4544 28.0791 36.4544 28.0798 36.4544C28.0805 36.4544 28.0812 36.4544 28.0819 36.4544C28.0826 36.4544 28.0834 36.4544 28.0841 36.4544C28.0849 36.4544 28.0856 36.4544 28.0864 36.4544C28.0871 36.4544 28.0879 36.4544 28.0886 36.4544C28.0894 36.4544 28.0902 36.4544 28.091 36.4544C28.0918 36.4544 28.0926 36.4544 28.0934 36.4544C28.0942 36.4544 28.095 36.4544 28.0958 36.4544C28.0966 36.4544 28.0974 36.4544 28.0983 36.4544C28.0991 36.4544 28.0999 36.4544 28.1008 36.4544C28.1016 36.4544 28.1025 36.4544 28.1033 36.4544C28.1042 36.4544 28.105 36.4544 28.1059 36.4544C28.1068 36.4544 28.1076 36.4544 28.1085 36.4544C28.1094 36.4544 28.1103 36.4544 28.1112 36.4544C28.1121 36.4544 28.113 36.4544 28.1139 36.4544C28.1148 36.4544 28.1157 36.4544 28.1166 36.4544C28.1175 36.4544 28.1185 36.4544 28.1194 36.4544C28.1203 36.4544 28.1213 36.4544 28.1222 36.4544C28.1232 36.4544 28.1241 36.4544 28.1251 36.4544C28.126 36.4544 28.127 36.4544 28.1279 36.4544C28.1289 36.4544 28.1299 36.4544 28.1308 36.4544C28.1318 36.4544 28.1328 36.4544 28.1338 36.4544C28.1348 36.4544 28.1357 36.4544 28.1367 36.4544C28.1377 36.4544 28.1387 36.4544 28.1397 36.4544C28.1407 36.4544 28.1417 36.4544 28.1427 36.4544C28.1438 36.4544 28.1448 36.4544 28.1458 36.4544C28.1468 36.4544 28.1478 36.4544 28.1489 36.4544C28.1499 36.4544 28.1509 36.4544 28.152 36.4544C28.153 36.4544 28.154 36.4544 28.1551 36.4544C28.1561 36.4544 28.1572 36.4544 28.1582 36.4544C28.1593 36.4544 28.1603 36.4544 28.1614 36.4544C28.1625 36.4544 28.1635 36.4544 28.1646 36.4544C28.1657 36.4544 28.1667 36.4544 28.1678 36.4544C28.1689 36.4544 28.1699 36.4544 28.171 36.4544C28.1721 36.4544 28.1732 36.4544 28.1743 36.4544C28.1754 36.4544 28.1764 36.4544 28.1775 36.4544C28.1786 36.4544 28.1797 36.4544 28.1808 36.4544C28.1819 36.4544 28.183 36.4544 28.1841 36.4544C28.1852 36.4544 28.1863 36.4544 28.1874 36.4544C28.1885 36.4544 28.1896 36.4544 28.1907 36.4544C28.1918 36.4544 28.193 36.4544 28.1941 36.4544C28.1952 36.4544 28.1963 36.4544 28.1974 36.4544C28.1985 36.4544 28.1996 36.4544 28.2008 36.4544C28.2019 36.4544 28.203 36.4544 28.2041 36.4544C28.2053 36.4544 28.2064 36.4544 28.2075 36.4544C28.2086 36.4544 28.2098 36.4544 28.2109 36.4544C28.212 36.4544 28.2131 36.4544 28.2143 36.4544C28.2154 36.4544 28.2165 36.4544 28.2177 36.4544C28.2188 36.4544 28.2199 36.4544 28.2211 36.4544C28.2222 36.4544 28.2233 36.4544 28.2245 36.4544C28.2256 36.4544 28.2267 36.4544 28.2279 36.4544C28.229 36.4544 28.2301 36.4544 28.2313 36.4544C28.2324 36.4544 28.2336 36.4544 28.2347 36.4544C28.2358 36.4544 28.237 36.4544 28.2381 36.4544C28.2392 36.4544 28.2404 36.4544 28.2415 36.4544C28.2426 36.4544 28.2438 36.4544 28.2449 36.4544C28.246 36.4544 28.2472 36.4544 28.2483 36.4544C28.2494 36.4544 28.2506 36.4544 28.2517 36.4544C28.2528 36.4544 28.254 36.4544 28.2551 36.4544C28.2562 36.4544 28.2574 36.4544 28.2585 36.4544C28.2596 36.4544 28.2607 36.4544 28.2619 36.4544C28.263 36.4544 28.2641 36.4544 28.2652 36.4544C28.2664 36.4544 28.2675 36.4544 28.2686 36.4544C28.2697 36.4544 28.2708 36.4544 28.272 36.4544C28.2731 36.4544 28.2742 36.4544 28.2753 36.4544C28.2764 36.4544 28.2775 36.4544 28.2786 36.4544C28.2797 36.4544 28.2809 36.4544 28.282 36.4544C28.2831 36.4544 28.2842 36.4544 28.2853 36.4544C28.2864 36.4544 28.2875 36.4544 28.2886 36.4544C28.2897 36.4544 28.2908 36.4544 28.2918 36.4544C28.2929 36.4544 28.294 36.4544 28.2951 36.4544C28.2962 36.4544 28.2973 36.4544 28.2983 36.4544C28.2994 36.4544 28.3005 36.4544 28.3016 36.4544C28.3026 36.4544 28.3037 36.4544 28.3048 36.4544C28.3058 36.4544 28.3069 36.4544 28.308 36.4544C28.309 36.4544 28.3101 36.4544 28.3111 36.4544C28.3122 36.4544 28.3132 36.4544 28.3143 36.4544C28.3153 36.4544 28.3164 36.4544 28.3174 36.4544C28.3184 36.4544 28.3195 36.4544 28.3205 36.4544C28.3215 36.4544 28.3226 36.4544 28.3236 36.4544C28.3246 36.4544 28.3256 36.4544 28.3266 36.4544C28.3276 36.4544 28.3286 36.4544 28.3296 36.4544C28.3306 36.4544 28.3316 36.4544 28.3326 36.4544C28.3336 36.4544 28.3346 36.4544 28.3356 36.4544C28.3366 36.4544 28.3376 36.4544 28.3385 36.4544C28.3395 36.4544 28.3405 36.4544 28.3414 36.4544C28.3424 36.4544 28.3434 36.4544 28.3443 36.4544C28.3453 36.4544 28.3462 36.4544 28.3472 36.4544C28.3481 36.4544 28.349 36.4544 28.35 36.4544C28.3509 36.4544 28.3518 36.4544 28.3527 36.4544C28.3537 36.4544 28.3546 36.4544 28.3555 36.4544C28.3564 36.4544 28.3573 36.4544 28.3582 36.4544C28.3591 36.4544 28.36 36.4544 28.3609 36.4544C28.3617 36.4544 28.3626 36.4544 28.3635 36.4544C28.3643 36.4544 28.3652 36.4544 28.3661 36.4544C28.3669 36.4544 28.3678 36.4544 28.3686 36.4544C28.3695 36.4544 28.3703 36.4544 28.3711 36.4544C28.372 36.4544 28.3728 36.4544 28.3736 36.4544C28.3744 36.4544 28.3752 36.4544 28.376 36.4544C28.3768 36.4544 28.3776 36.4544 28.3784 36.4544C28.3792 36.4544 28.38 36.4544 28.3807 36.4544C28.3815 36.4544 28.3823 36.4544 28.383 36.4544C28.3838 36.4544 28.3845 36.4544 28.3853 36.4544C28.386 36.4544 28.3867 36.4544 28.3875 36.4544C28.3882 36.4544 28.3889 36.4544 28.3896 36.4544C28.3903 36.4544 28.391 36.4544 28.3917 36.4544C28.3924 36.4544 28.3931 36.4544 28.3937 36.4544C28.3944 36.4544 28.3951 36.4544 28.3957 36.4544C28.3964 36.4544 28.397 36.4544 28.3977 36.4544C28.3983 36.4544 28.3989 36.4544 28.3996 36.4544C28.4002 36.4544 28.4008 36.4544 28.4014 36.4544C28.402 36.4544 28.4026 36.4544 28.4032 36.4544C28.4038 36.4544 28.4043 36.4544 28.4049 36.4544C28.4055 36.4544 28.406 36.4544 28.4066 36.4544C28.4071 36.4544 28.4077 36.4544 28.4082 36.4544C28.4087 36.4544 28.4092 36.4544 28.4097 36.4544C28.4102 36.4544 28.4107 36.4544 28.4112 36.4544C28.4117 36.4544 28.4122 36.4544 28.4127 36.4544C28.4131 36.4544 28.4136 36.4544 28.414 36.4544C28.4145 36.4544 28.4149 36.4544 28.4153 36.4544C28.4157 36.4544 28.4162 36.4544 28.4166 36.4544C28.417 36.4544 28.4174 36.4544 28.4177 36.4544C28.4181 36.4544 28.4185 36.4544 28.4188 36.4544C28.4192 36.4544 28.4196 36.4544 28.4199 36.4544C28.4202 36.4544 28.4206 36.4544 28.4209 36.4544C28.4212 36.4544 28.4215 36.4544 28.4218 36.4544C28.4221 36.4544 28.4223 36.4544 28.4226 36.4544C28.4229 36.4544 28.4231 36.4544 28.4234 36.4544C28.4236 36.4544 28.4239 36.4544 28.4241 36.4544C28.4243 36.4544 28.4245 36.4544 28.4247 36.4544C28.4249 36.4544 28.4251 36.4544 28.4253 36.4544C28.4254 36.4544 28.4256 36.4544 28.4257 36.4544C28.4259 36.4544 28.426 36.4544 28.4261 36.4544C28.4263 36.4544 28.4264 36.4544 28.4265 36.4544C28.4266 36.4544 28.4266 36.4544 28.4267 36.4544C28.4268 36.4544 28.4268 36.4544 28.4269 36.4544C28.4269 36.4544 28.427 36.4544 28.427 36.4544C28.427 36.4544 28.427 35.1211 28.427 33.7878C28.427 33.7878 28.4269 33.7878 28.4269 33.7878C28.4269 33.7878 28.4268 33.7878 28.4268 33.7878C28.4267 33.7878 28.4266 33.7878 28.4265 33.7878C28.4264 33.7878 28.4263 33.7878 28.4262 33.7878C28.4261 33.7878 28.426 33.7878 28.4258 33.7878C28.4257 33.7878 28.4255 33.7878 28.4253 33.7878C28.4251 33.7878 28.4249 33.7878 28.4247 33.7878C28.4245 33.7878 28.4243 33.7878 28.4241 33.7878C28.4238 33.7878 28.4236 33.7878 28.4233 33.7878C28.4231 33.7878 28.4228 33.7878 28.4225 33.7878C28.4222 33.7878 28.4219 33.7878 28.4216 33.7878C28.4212 33.7878 28.4209 33.7878 28.4205 33.7878C28.4202 33.7878 28.4198 33.7878 28.4194 33.7878C28.419 33.7878 28.4186 33.7878 28.4182 33.7878C28.4178 33.7878 28.4174 33.7878 28.4169 33.7878C28.4165 33.7878 28.416 33.7878 28.4155 33.7878C28.415 33.7878 28.4145 33.7878 28.414 33.7878C28.4135 33.7878 28.413 33.7878 28.4124 33.7878C28.4119 33.7878 28.4113 33.7878 28.4107 33.7878C28.4102 33.7878 28.4096 33.7878 28.409 33.7878C28.4083 33.7878 28.4077 33.7878 28.4071 33.7878C28.4064 33.7878 28.4058 33.7878 28.4051 33.7878C28.4044 33.7878 28.4037 33.7878 28.403 33.7878C28.4023 33.7878 28.4016 33.7878 28.4008 33.7878C28.4001 33.7878 28.3993 33.7878 28.3985 33.7878C28.3977 33.7878 28.3969 33.7878 28.3961 33.7878C28.3953 33.7878 28.3945 33.7878 28.3936 33.7878C28.3927 33.7878 28.3919 33.7878 28.391 33.7878C28.3901 33.7878 28.3892 33.7878 28.3883 33.7878C28.3873 33.7878 28.3864 33.7878 28.3854 33.7878C28.3845 33.7878 28.3835 33.7878 28.3825 33.7878C28.3815 33.7878 28.3805 33.7878 28.3795 33.7878C28.3784 33.7878 28.3774 33.7878 28.3763 33.7878C28.3752 33.7878 28.3741 33.7878 28.373 33.7878C28.3719 33.7878 28.3708 33.7878 28.3696 33.7878C28.3685 33.7878 28.3673 33.7878 28.3661 33.7878C28.365 33.7878 28.3638 33.7878 28.3625 33.7878C28.3613 33.7878 28.3601 33.7878 28.3588 33.7878C28.3575 33.7878 28.3563 33.7878 28.355 33.7878C28.3536 33.7878 28.3523 33.7878 28.351 33.7878C28.3496 33.7878 28.3483 33.7878 28.3469 33.7878C28.3455 33.7878 28.3441 33.7878 28.3427 33.7878C28.3413 33.7878 28.3398 33.7878 28.3384 33.7878C28.3369 33.7878 28.3354 33.7878 28.3339 33.7878C28.3324 33.7878 28.3309 33.7878 28.3294 33.7878C28.3278 33.7878 28.3263 33.7878 28.3247 33.7878C28.3231 33.7878 28.3215 33.7878 28.3198 33.7878C28.3182 33.7878 28.3166 33.7878 28.3149 33.7878C28.3132 33.7878 28.3115 33.7878 28.3098 33.7878C28.3081 33.7878 28.3064 33.7878 28.3046 33.7878C28.3029 33.7878 28.3011 33.7878 28.2993 33.7878C28.2975 33.7878 28.2957 33.7878 28.2939 33.7878C28.292 33.7878 28.2902 33.7878 28.2883 33.7878C28.2864 33.7878 28.2845 33.7878 28.2826 33.7878C28.2806 33.7878 28.2787 33.7878 28.2767 33.7878C28.2747 33.7878 28.2727 33.7878 28.2707 33.7878C28.2687 33.7878 28.2667 33.7878 28.2646 33.7878C28.2625 33.7878 28.2605 33.7878 28.2584 33.7878C28.2563 33.7878 28.2541 33.7878 28.252 33.7878C28.2498 33.7878 28.2476 33.7878 28.2454 33.7878C28.2432 33.7878 28.241 33.7878 28.2388 33.7878C28.2365 33.7878 28.2343 33.7878 28.232 33.7878C28.2297 33.7878 28.2274 33.7878 28.225 33.7878C28.2227 33.7878 28.2203 33.7878 28.218 33.7878C28.2156 33.7878 28.2132 33.7878 28.2107 33.7878C28.2083 33.7878 28.2058 33.7878 28.2034 33.7878C28.2009 33.7878 28.1984 33.7878 28.1959 33.7878C28.1933 33.7878 28.1908 33.7878 28.1882 33.7878C28.1856 33.7878 28.183 33.7878 28.1804 33.7878C28.1778 33.7878 28.1751 33.7878 28.1725 33.7878C28.1698 33.7878 28.1671 33.7878 28.1644 33.7878C28.1616 33.7878 28.1589 33.7878 28.1561 33.7878C28.1534 33.7878 28.1506 33.7878 28.1477 33.7878C28.1449 33.7878 28.1421 33.7878 28.1392 33.7878C28.1363 33.7878 28.1334 33.7878 28.1305 33.7878C28.1276 33.7878 28.1246 33.7878 28.1217 33.7878C28.1187 33.7878 28.1157 33.7878 28.1127 33.7878C28.1096 33.7878 28.1066 33.7878 28.1035 33.7878C28.1004 33.7878 28.0973 33.7878 28.0942 33.7878C28.0911 33.7878 28.0879 33.7878 28.0847 33.7878C28.0815 33.7878 28.0783 33.7878 28.0751 33.7878C28.0719 33.7878 28.0686 33.7878 28.0653 33.7878C28.062 33.7878 28.0587 33.7878 28.0554 33.7878C28.052 33.7878 28.0487 33.7878 28.0453 33.7878C28.0419 33.7878 28.0385 33.7878 28.035 33.7878C28.0316 33.7878 28.0281 33.7878 28.0246 33.7878C28.0211 33.7878 28.0176 33.7878 28.014 33.7878C28.0105 33.7878 28.0069 33.7878 28.0033 33.7878C27.9997 33.7878 27.996 33.7878 27.9924 33.7878C27.9887 33.7878 27.985 33.7878 27.9813 33.7878C27.9776 33.7878 27.9738 33.7878 27.9701 33.7878C27.9663 33.7878 27.9625 33.7878 27.9586 33.7878C27.9548 33.7878 27.951 33.7878 27.9471 33.7878C27.9432 33.7878 27.9393 33.7878 27.9353 33.7878C27.9314 33.7878 27.9274 33.7878 27.9234 33.7878C27.9194 33.7878 27.9154 33.7878 27.9113 33.7878C27.9073 33.7878 27.9032 33.7878 27.899 33.7878C27.8949 33.7878 27.8908 33.7878 27.8866 33.7878C27.8824 33.7878 27.8782 33.7878 27.874 33.7878C27.8698 33.7878 27.8655 33.7878 27.8612 33.7878C27.8569 33.7878 27.8526 33.7878 27.8483 33.7878C27.8439 33.7878 27.8395 33.7878 27.8351 33.7878C27.8307 33.7878 27.8263 33.7878 27.8218 33.7878C27.8173 33.7878 27.8128 33.7878 27.8083 33.7878C27.8038 33.7878 27.7992 33.7878 27.7946 33.7878C27.7901 33.7878 27.7854 33.7878 27.7808 33.7878C27.7761 33.7878 27.7715 33.7878 27.7668 33.7878C27.762 33.7878 27.7573 33.7878 27.7525 33.7878C27.7478 33.7878 27.743 33.7878 27.7381 33.7878C27.7333 33.7878 27.7284 33.7878 27.7235 33.7878C27.7187 33.7878 27.7137 33.7878 27.7088 33.7878C27.7038 33.7878 27.6988 33.7878 27.6938 33.7878C27.6888 33.7878 27.6837 33.7878 27.6787 33.7878C27.6736 33.7878 27.6685 33.7878 27.6633 33.7878C27.6582 33.7878 27.653 33.7878 27.6478 33.7878C27.6426 33.7878 27.6374 33.7878 27.6321 33.7878C27.6268 33.7878 27.6215 33.7878 27.6162 33.7878C27.6109 33.7878 27.6055 33.7878 27.6001 33.7878C27.5947 33.7878 27.5893 33.7878 27.5838 33.7878C27.5783 33.7878 27.5728 33.7878 27.5673 33.7878C27.5618 33.7878 27.5562 33.7878 27.5506 33.7878C27.545 33.7878 27.5394 33.7878 27.5338 33.7878C27.5281 33.7878 27.5224 33.7878 27.5167 33.7878C27.511 33.7878 27.5052 33.7878 27.4994 33.7878C27.4936 33.7878 27.4878 33.7878 27.4819 33.7878C27.4761 33.7878 27.4702 33.7878 27.4643 33.7878C27.4584 33.7878 27.4524 33.7878 27.4464 33.7878C27.4404 33.7878 27.4344 33.7878 27.4283 33.7878C27.4223 33.7878 27.4162 33.7878 27.4101 33.7878C27.4039 33.7878 27.3978 33.7878 27.3916 33.7878C27.3854 33.7878 27.3792 33.7878 27.3729 33.7878C27.3666 33.7878 27.3603 33.7878 27.354 33.7878C27.3477 33.7878 27.3413 33.7878 27.3349 33.7878C27.3285 33.7878 27.3221 33.7878 27.3156 33.7878C27.3092 33.7878 27.3026 33.7878 27.2961 33.7878C27.2896 33.7878 27.283 33.7878 27.2764 33.7878C27.2698 33.7878 27.2631 33.7878 27.2565 33.7878C27.2498 33.7878 27.2431 33.7878 27.2363 33.7878C27.2296 33.7878 27.2228 33.7878 27.216 33.7878C27.2091 33.7878 27.2023 33.7878 27.1954 33.7878C27.1885 33.7878 27.1816 33.7878 27.1746 33.7878C27.1677 33.7878 27.1607 33.7878 27.1536 33.7878C27.1466 33.7878 27.1395 33.7878 27.1324 33.7878C27.1253 33.7878 27.1182 33.7878 27.111 33.7878C27.1038 33.7878 27.0966 33.7878 27.0893 33.7878C27.0821 33.7878 27.0748 33.7878 27.0675 33.7878C27.0602 33.7878 27.0528 33.7878 27.0454 33.7878C27.038 33.7878 27.0306 33.7878 27.0231 33.7878C27.0156 33.7878 27.0081 33.7878 27.0006 33.7878C26.993 33.7878 26.9854 33.7878 26.9778 33.7878C26.9702 33.7878 26.9625 33.7878 26.9548 33.7878C26.9471 33.7878 26.9394 33.7878 26.9316 33.7878C26.9239 33.7878 26.9161 33.7878 26.9082 33.7878C26.9004 33.7878 26.8925 33.7878 26.8846 33.7878C26.8766 33.7878 26.8687 33.7878 26.8607 33.7878C26.8527 33.7878 26.8447 33.7878 26.8366 33.7878C26.8285 33.7878 26.8204 33.7878 26.8123 33.7878C26.8041 33.7878 26.7959 33.7878 26.7877 33.7878C26.7795 33.7878 26.7712 33.7878 26.7629 33.7878C26.7546 33.7878 26.7462 33.7878 26.7379 33.7878C26.7295 33.7878 26.7211 33.7878 26.7126 33.7878C26.7041 33.7878 26.6956 33.7878 26.6871 33.7878C26.6786 33.7878 26.67 33.7878 26.6614 33.7878C26.6528 33.7878 26.6441 33.7878 26.6354 33.7878C26.6267 33.7878 26.618 33.7878 26.6092 33.7878C26.6004 33.7878 26.5916 33.7878 26.5828 33.7878C26.5739 33.7878 26.565 33.7878 26.5561 33.7878C26.5472 33.7878 26.5382 33.7878 26.5292 33.7878C26.5202 33.7878 26.5111 33.7878 26.502 33.7878C26.4929 33.7878 26.4838 33.7878 26.4746 33.7878C26.4654 33.7878 26.4562 33.7878 26.447 33.7878V36.4544C26.4562 36.4544 26.4654 36.4544 26.4746 36.4544C26.4838 36.4544 26.4929 36.4544 26.502 36.4544C26.5111 36.4544 26.5202 36.4544 26.5292 36.4544C26.5382 36.4544 26.5472 36.4544 26.5561 36.4544C26.565 36.4544 26.5739 36.4544 26.5828 36.4544C26.5916 36.4544 26.6004 36.4544 26.6092 36.4544C26.618 36.4544 26.6267 36.4544 26.6354 36.4544C26.6441 36.4544 26.6528 36.4544 26.6614 36.4544C26.67 36.4544 26.6786 36.4544 26.6871 36.4544C26.6956 36.4544 26.7041 36.4544 26.7126 36.4544C26.7211 36.4544 26.7295 36.4544 26.7379 36.4544C26.7462 36.4544 26.7546 36.4544 26.7629 36.4544C26.7712 36.4544 26.7795 36.4544 26.7877 36.4544C26.7959 36.4544 26.8041 36.4544 26.8123 36.4544C26.8204 36.4544 26.8285 36.4544 26.8366 36.4544C26.8447 36.4544 26.8527 36.4544 26.8607 36.4544C26.8687 36.4544 26.8766 36.4544 26.8846 36.4544C26.8925 36.4544 26.9004 36.4544 26.9082 36.4544C26.9161 36.4544 26.9239 36.4544 26.9316 36.4544C26.9394 36.4544 26.9471 36.4544 26.9548 36.4544C26.9625 36.4544 26.9702 36.4544 26.9778 36.4544C26.9854 36.4544 26.993 36.4544 27.0006 36.4544C27.0081 36.4544 27.0156 36.4544 27.0231 36.4544C27.0306 36.4544 27.038 36.4544 27.0454 36.4544C27.0528 36.4544 27.0602 36.4544 27.0675 36.4544C27.0748 36.4544 27.0821 36.4544 27.0893 36.4544C27.0966 36.4544 27.1038 36.4544 27.111 36.4544C27.1182 36.4544 27.1253 36.4544 27.1324 36.4544C27.1395 36.4544 27.1466 36.4544 27.1536 36.4544C27.1607 36.4544 27.1677 36.4544 27.1746 36.4544C27.1816 36.4544 27.1885 36.4544 27.1954 36.4544C27.2023 36.4544 27.2091 36.4544 27.216 36.4544C27.2228 36.4544 27.2296 36.4544 27.2363 36.4544C27.2431 36.4544 27.2498 36.4544 27.2565 36.4544C27.2631 36.4544 27.2698 36.4544 27.2764 36.4544C27.283 36.4544 27.2896 36.4544 27.2961 36.4544C27.3026 36.4544 27.3092 36.4544 27.3156 36.4544C27.3221 36.4544 27.3285 36.4544 27.3349 36.4544C27.3413 36.4544 27.3477 36.4544 27.354 36.4544C27.3603 36.4544 27.3666 36.4544 27.3729 36.4544C27.3792 36.4544 27.3854 36.4544 27.3916 36.4544C27.3978 36.4544 27.4039 36.4544 27.4101 36.4544C27.4162 36.4544 27.4223 36.4544 27.4283 36.4544C27.4344 36.4544 27.4404 36.4544 27.4464 36.4544C27.4524 36.4544 27.4584 36.4544 27.4643 36.4544C27.4702 36.4544 27.4761 36.4544 27.4819 36.4544C27.4878 36.4544 27.4936 36.4544 27.4994 36.4544C27.5052 36.4544 27.511 36.4544 27.5167 36.4544C27.5224 36.4544 27.5281 36.4544 27.5338 36.4544C27.5394 36.4544 27.545 36.4544 27.5506 36.4544C27.5562 36.4544 27.5618 36.4544 27.5673 36.4544C27.5728 36.4544 27.5783 36.4544 27.5838 36.4544C27.5893 36.4544 27.5947 36.4544 27.6001 36.4544C27.6055 36.4544 27.6109 36.4544 27.6162 36.4544C27.6215 36.4544 27.6268 36.4544 27.6321 36.4544C27.6374 36.4544 27.6426 36.4544 27.6478 36.4544C27.653 36.4544 27.6582 36.4544 27.6633 36.4544C27.6685 36.4544 27.6736 36.4544 27.6787 36.4544C27.6837 36.4544 27.6888 36.4544 27.6938 36.4544C27.6988 36.4544 27.7038 36.4544 27.7088 36.4544C27.7137 36.4544 27.7187 36.4544 27.7235 36.4544C27.7284 36.4544 27.7333 36.4544 27.7381 36.4544C27.743 36.4544 27.7478 36.4544 27.7525 36.4544C27.7573 36.4544 27.762 36.4544 27.7668 36.4544C27.7715 36.4544 27.7761 36.4544 27.7808 36.4544C27.7854 36.4544 27.7901 36.4544 27.7946 36.4544C27.7992 36.4544 27.8038 36.4544 27.8083 36.4544C27.8128 36.4544 27.8173 36.4544 27.8218 36.4544C27.8263 36.4544 27.8307 36.4544 27.8351 36.4544C27.8395 36.4544 27.8439 36.4544 27.8483 36.4544C27.8526 36.4544 27.8569 36.4544 27.8612 36.4544C27.8655 36.4544 27.8698 36.4544 27.874 36.4544C27.8782 36.4544 27.8824 36.4544 27.8866 36.4544C27.8908 36.4544 27.8949 36.4544 27.899 36.4544C27.9032 36.4544 27.9073 36.4544 27.9113 36.4544C27.9154 36.4544 27.9194 36.4544 27.9234 36.4544C27.9274 36.4544 27.9314 36.4544 27.9353 36.4544C27.9393 36.4544 27.9432 36.4544 27.9471 36.4544C27.951 36.4544 27.9548 36.4544 27.9586 36.4544C27.9625 36.4544 27.9663 36.4544 27.9701 36.4544C27.9738 36.4544 27.9776 36.4544 27.9813 36.4544C27.985 36.4544 27.9887 36.4544 27.9924 36.4544C27.996 36.4544 27.9997 36.4544 28.0033 36.4544C28.0069 36.4544 28.0105 36.4544 28.014 36.4544C28.0176 36.4544 28.0211 36.4544 28.0246 36.4544C28.0281 36.4544 28.0316 36.4544 28.035 36.4544C28.0385 36.4544 28.0419 36.4544 28.0453 36.4544C28.0487 36.4544 28.052 36.4544 28.0554 36.4544C28.0587 36.4544 28.062 36.4544 28.0653 36.4544C28.0686 36.4544 28.0719 36.4544 28.0751 36.4544C28.0783 36.4544 28.0815 36.4544 28.0847 36.4544C28.0879 36.4544 28.0911 36.4544 28.0942 36.4544C28.0973 36.4544 28.1004 36.4544 28.1035 36.4544C28.1066 36.4544 28.1096 36.4544 28.1127 36.4544C28.1157 36.4544 28.1187 36.4544 28.1217 36.4544C28.1246 36.4544 28.1276 36.4544 28.1305 36.4544C28.1334 36.4544 28.1363 36.4544 28.1392 36.4544C28.1421 36.4544 28.1449 36.4544 28.1477 36.4544C28.1506 36.4544 28.1534 36.4544 28.1561 36.4544C28.1589 36.4544 28.1616 36.4544 28.1644 36.4544C28.1671 36.4544 28.1698 36.4544 28.1725 36.4544C28.1751 36.4544 28.1778 36.4544 28.1804 36.4544C28.183 36.4544 28.1856 36.4544 28.1882 36.4544C28.1908 36.4544 28.1933 36.4544 28.1959 36.4544C28.1984 36.4544 28.2009 36.4544 28.2034 36.4544C28.2058 36.4544 28.2083 36.4544 28.2107 36.4544C28.2132 36.4544 28.2156 36.4544 28.218 36.4544C28.2203 36.4544 28.2227 36.4544 28.225 36.4544C28.2274 36.4544 28.2297 36.4544 28.232 36.4544C28.2343 36.4544 28.2365 36.4544 28.2388 36.4544C28.241 36.4544 28.2432 36.4544 28.2454 36.4544C28.2476 36.4544 28.2498 36.4544 28.252 36.4544C28.2541 36.4544 28.2563 36.4544 28.2584 36.4544C28.2605 36.4544 28.2625 36.4544 28.2646 36.4544C28.2667 36.4544 28.2687 36.4544 28.2707 36.4544C28.2727 36.4544 28.2747 36.4544 28.2767 36.4544C28.2787 36.4544 28.2806 36.4544 28.2826 36.4544C28.2845 36.4544 28.2864 36.4544 28.2883 36.4544C28.2902 36.4544 28.292 36.4544 28.2939 36.4544C28.2957 36.4544 28.2975 36.4544 28.2993 36.4544C28.3011 36.4544 28.3029 36.4544 28.3046 36.4544C28.3064 36.4544 28.3081 36.4544 28.3098 36.4544C28.3115 36.4544 28.3132 36.4544 28.3149 36.4544C28.3166 36.4544 28.3182 36.4544 28.3198 36.4544C28.3215 36.4544 28.3231 36.4544 28.3247 36.4544C28.3263 36.4544 28.3278 36.4544 28.3294 36.4544C28.3309 36.4544 28.3324 36.4544 28.3339 36.4544C28.3354 36.4544 28.3369 36.4544 28.3384 36.4544C28.3398 36.4544 28.3413 36.4544 28.3427 36.4544C28.3441 36.4544 28.3455 36.4544 28.3469 36.4544C28.3483 36.4544 28.3496 36.4544 28.351 36.4544C28.3523 36.4544 28.3536 36.4544 28.355 36.4544C28.3563 36.4544 28.3575 36.4544 28.3588 36.4544C28.3601 36.4544 28.3613 36.4544 28.3625 36.4544C28.3638 36.4544 28.365 36.4544 28.3661 36.4544C28.3673 36.4544 28.3685 36.4544 28.3696 36.4544C28.3708 36.4544 28.3719 36.4544 28.373 36.4544C28.3741 36.4544 28.3752 36.4544 28.3763 36.4544C28.3774 36.4544 28.3784 36.4544 28.3795 36.4544C28.3805 36.4544 28.3815 36.4544 28.3825 36.4544C28.3835 36.4544 28.3845 36.4544 28.3854 36.4544C28.3864 36.4544 28.3873 36.4544 28.3883 36.4544C28.3892 36.4544 28.3901 36.4544 28.391 36.4544C28.3919 36.4544 28.3927 36.4544 28.3936 36.4544C28.3945 36.4544 28.3953 36.4544 28.3961 36.4544C28.3969 36.4544 28.3977 36.4544 28.3985 36.4544C28.3993 36.4544 28.4001 36.4544 28.4008 36.4544C28.4016 36.4544 28.4023 36.4544 28.403 36.4544C28.4037 36.4544 28.4044 36.4544 28.4051 36.4544C28.4058 36.4544 28.4064 36.4544 28.4071 36.4544C28.4077 36.4544 28.4083 36.4544 28.409 36.4544C28.4096 36.4544 28.4102 36.4544 28.4107 36.4544C28.4113 36.4544 28.4119 36.4544 28.4124 36.4544C28.413 36.4544 28.4135 36.4544 28.414 36.4544C28.4145 36.4544 28.415 36.4544 28.4155 36.4544C28.416 36.4544 28.4165 36.4544 28.4169 36.4544C28.4174 36.4544 28.4178 36.4544 28.4182 36.4544C28.4186 36.4544 28.419 36.4544 28.4194 36.4544C28.4198 36.4544 28.4202 36.4544 28.4205 36.4544C28.4209 36.4544 28.4212 36.4544 28.4216 36.4544C28.4219 36.4544 28.4222 36.4544 28.4225 36.4544C28.4228 36.4544 28.4231 36.4544 28.4233 36.4544C28.4236 36.4544 28.4238 36.4544 28.4241 36.4544C28.4243 36.4544 28.4245 36.4544 28.4247 36.4544C28.4249 36.4544 28.4251 36.4544 28.4253 36.4544C28.4255 36.4544 28.4257 36.4544 28.4258 36.4544C28.426 36.4544 28.4261 36.4544 28.4262 36.4544C28.4263 36.4544 28.4264 36.4544 28.4265 36.4544C28.4266 36.4544 28.4267 36.4544 28.4268 36.4544C28.4268 36.4544 28.4269 36.4544 28.4269 36.4544C28.4269 36.4544 28.427 36.4544 28.427 36.4544C28.427 35.1211 28.427 33.7878 28.427 33.7878C28.427 33.7878 28.4269 33.7878 28.4269 33.7878C28.4268 33.7878 28.4268 33.7878 28.4267 33.7878C28.4266 33.7878 28.4266 33.7878 28.4265 33.7878C28.4264 33.7878 28.4263 33.7878 28.4261 33.7878C28.426 33.7878 28.4259 33.7878 28.4257 33.7878C28.4256 33.7878 28.4254 33.7878 28.4253 33.7878C28.4251 33.7878 28.4249 33.7878 28.4247 33.7878C28.4245 33.7878 28.4243 33.7878 28.4241 33.7878C28.4239 33.7878 28.4236 33.7878 28.4234 33.7878C28.4231 33.7878 28.4229 33.7878 28.4226 33.7878C28.4223 33.7878 28.4221 33.7878 28.4218 33.7878C28.4215 33.7878 28.4212 33.7878 28.4209 33.7878C28.4206 33.7878 28.4202 33.7878 28.4199 33.7878C28.4196 33.7878 28.4192 33.7878 28.4188 33.7878C28.4185 33.7878 28.4181 33.7878 28.4177 33.7878C28.4174 33.7878 28.417 33.7878 28.4166 33.7878C28.4162 33.7878 28.4157 33.7878 28.4153 33.7878C28.4149 33.7878 28.4145 33.7878 28.414 33.7878C28.4136 33.7878 28.4131 33.7878 28.4127 33.7878C28.4122 33.7878 28.4117 33.7878 28.4112 33.7878C28.4107 33.7878 28.4102 33.7878 28.4097 33.7878C28.4092 33.7878 28.4087 33.7878 28.4082 33.7878C28.4077 33.7878 28.4071 33.7878 28.4066 33.7878C28.406 33.7878 28.4055 33.7878 28.4049 33.7878C28.4043 33.7878 28.4038 33.7878 28.4032 33.7878C28.4026 33.7878 28.402 33.7878 28.4014 33.7878C28.4008 33.7878 28.4002 33.7878 28.3996 33.7878C28.3989 33.7878 28.3983 33.7878 28.3977 33.7878C28.397 33.7878 28.3964 33.7878 28.3957 33.7878C28.3951 33.7878 28.3944 33.7878 28.3937 33.7878C28.3931 33.7878 28.3924 33.7878 28.3917 33.7878C28.391 33.7878 28.3903 33.7878 28.3896 33.7878C28.3889 33.7878 28.3882 33.7878 28.3875 33.7878C28.3867 33.7878 28.386 33.7878 28.3853 33.7878C28.3845 33.7878 28.3838 33.7878 28.383 33.7878C28.3823 33.7878 28.3815 33.7878 28.3807 33.7878C28.38 33.7878 28.3792 33.7878 28.3784 33.7878C28.3776 33.7878 28.3768 33.7878 28.376 33.7878C28.3752 33.7878 28.3744 33.7878 28.3736 33.7878C28.3728 33.7878 28.372 33.7878 28.3711 33.7878C28.3703 33.7878 28.3695 33.7878 28.3686 33.7878C28.3678 33.7878 28.3669 33.7878 28.3661 33.7878C28.3652 33.7878 28.3643 33.7878 28.3635 33.7878C28.3626 33.7878 28.3617 33.7878 28.3609 33.7878C28.36 33.7878 28.3591 33.7878 28.3582 33.7878C28.3573 33.7878 28.3564 33.7878 28.3555 33.7878C28.3546 33.7878 28.3537 33.7878 28.3527 33.7878C28.3518 33.7878 28.3509 33.7878 28.35 33.7878C28.349 33.7878 28.3481 33.7878 28.3472 33.7878C28.3462 33.7878 28.3453 33.7878 28.3443 33.7878C28.3434 33.7878 28.3424 33.7878 28.3414 33.7878C28.3405 33.7878 28.3395 33.7878 28.3385 33.7878C28.3376 33.7878 28.3366 33.7878 28.3356 33.7878C28.3346 33.7878 28.3336 33.7878 28.3326 33.7878C28.3316 33.7878 28.3306 33.7878 28.3296 33.7878C28.3286 33.7878 28.3276 33.7878 28.3266 33.7878C28.3256 33.7878 28.3246 33.7878 28.3236 33.7878C28.3226 33.7878 28.3215 33.7878 28.3205 33.7878C28.3195 33.7878 28.3184 33.7878 28.3174 33.7878C28.3164 33.7878 28.3153 33.7878 28.3143 33.7878C28.3132 33.7878 28.3122 33.7878 28.3111 33.7878C28.3101 33.7878 28.309 33.7878 28.308 33.7878C28.3069 33.7878 28.3058 33.7878 28.3048 33.7878C28.3037 33.7878 28.3026 33.7878 28.3016 33.7878C28.3005 33.7878 28.2994 33.7878 28.2983 33.7878C28.2973 33.7878 28.2962 33.7878 28.2951 33.7878C28.294 33.7878 28.2929 33.7878 28.2918 33.7878C28.2908 33.7878 28.2897 33.7878 28.2886 33.7878C28.2875 33.7878 28.2864 33.7878 28.2853 33.7878C28.2842 33.7878 28.2831 33.7878 28.282 33.7878C28.2809 33.7878 28.2797 33.7878 28.2786 33.7878C28.2775 33.7878 28.2764 33.7878 28.2753 33.7878C28.2742 33.7878 28.2731 33.7878 28.272 33.7878C28.2708 33.7878 28.2697 33.7878 28.2686 33.7878C28.2675 33.7878 28.2664 33.7878 28.2652 33.7878C28.2641 33.7878 28.263 33.7878 28.2619 33.7878C28.2607 33.7878 28.2596 33.7878 28.2585 33.7878C28.2574 33.7878 28.2562 33.7878 28.2551 33.7878C28.254 33.7878 28.2528 33.7878 28.2517 33.7878C28.2506 33.7878 28.2494 33.7878 28.2483 33.7878C28.2472 33.7878 28.246 33.7878 28.2449 33.7878C28.2438 33.7878 28.2426 33.7878 28.2415 33.7878C28.2404 33.7878 28.2392 33.7878 28.2381 33.7878C28.237 33.7878 28.2358 33.7878 28.2347 33.7878C28.2336 33.7878 28.2324 33.7878 28.2313 33.7878C28.2301 33.7878 28.229 33.7878 28.2279 33.7878C28.2267 33.7878 28.2256 33.7878 28.2245 33.7878C28.2233 33.7878 28.2222 33.7878 28.2211 33.7878C28.2199 33.7878 28.2188 33.7878 28.2177 33.7878C28.2165 33.7878 28.2154 33.7878 28.2143 33.7878C28.2131 33.7878 28.212 33.7878 28.2109 33.7878C28.2098 33.7878 28.2086 33.7878 28.2075 33.7878C28.2064 33.7878 28.2053 33.7878 28.2041 33.7878C28.203 33.7878 28.2019 33.7878 28.2008 33.7878C28.1996 33.7878 28.1985 33.7878 28.1974 33.7878C28.1963 33.7878 28.1952 33.7878 28.1941 33.7878C28.193 33.7878 28.1918 33.7878 28.1907 33.7878C28.1896 33.7878 28.1885 33.7878 28.1874 33.7878C28.1863 33.7878 28.1852 33.7878 28.1841 33.7878C28.183 33.7878 28.1819 33.7878 28.1808 33.7878C28.1797 33.7878 28.1786 33.7878 28.1775 33.7878C28.1764 33.7878 28.1754 33.7878 28.1743 33.7878C28.1732 33.7878 28.1721 33.7878 28.171 33.7878C28.1699 33.7878 28.1689 33.7878 28.1678 33.7878C28.1667 33.7878 28.1657 33.7878 28.1646 33.7878C28.1635 33.7878 28.1625 33.7878 28.1614 33.7878C28.1603 33.7878 28.1593 33.7878 28.1582 33.7878C28.1572 33.7878 28.1561 33.7878 28.1551 33.7878C28.154 33.7878 28.153 33.7878 28.152 33.7878C28.1509 33.7878 28.1499 33.7878 28.1489 33.7878C28.1478 33.7878 28.1468 33.7878 28.1458 33.7878C28.1448 33.7878 28.1438 33.7878 28.1427 33.7878C28.1417 33.7878 28.1407 33.7878 28.1397 33.7878C28.1387 33.7878 28.1377 33.7878 28.1367 33.7878C28.1357 33.7878 28.1348 33.7878 28.1338 33.7878C28.1328 33.7878 28.1318 33.7878 28.1308 33.7878C28.1299 33.7878 28.1289 33.7878 28.1279 33.7878C28.127 33.7878 28.126 33.7878 28.1251 33.7878C28.1241 33.7878 28.1232 33.7878 28.1222 33.7878C28.1213 33.7878 28.1203 33.7878 28.1194 33.7878C28.1185 33.7878 28.1175 33.7878 28.1166 33.7878C28.1157 33.7878 28.1148 33.7878 28.1139 33.7878C28.113 33.7878 28.1121 33.7878 28.1112 33.7878C28.1103 33.7878 28.1094 33.7878 28.1085 33.7878C28.1076 33.7878 28.1068 33.7878 28.1059 33.7878C28.105 33.7878 28.1042 33.7878 28.1033 33.7878C28.1025 33.7878 28.1016 33.7878 28.1008 33.7878C28.0999 33.7878 28.0991 33.7878 28.0983 33.7878C28.0974 33.7878 28.0966 33.7878 28.0958 33.7878C28.095 33.7878 28.0942 33.7878 28.0934 33.7878C28.0926 33.7878 28.0918 33.7878 28.091 33.7878C28.0902 33.7878 28.0894 33.7878 28.0886 33.7878C28.0879 33.7878 28.0871 33.7878 28.0864 33.7878C28.0856 33.7878 28.0849 33.7878 28.0841 33.7878C28.0834 33.7878 28.0826 33.7878 28.0819 33.7878C28.0812 33.7878 28.0805 33.7878 28.0798 33.7878C28.0791 33.7878 28.0784 33.7878 28.0777 33.7878C28.077 33.7878 28.0763 33.7878 28.0756 33.7878C28.075 33.7878 28.0743 33.7878 28.0736 33.7878C28.073 33.7878 28.0723 33.7878 28.0717 33.7878C28.0711 33.7878 28.0704 33.7878 28.0698 33.7878C28.0692 33.7878 28.0686 33.7878 28.068 33.7878C28.0674 33.7878 28.0668 33.7878 28.0662 33.7878C28.0656 33.7878 28.065 33.7878 28.0645 33.7878C28.0639 33.7878 28.0633 33.7878 28.0628 33.7878C28.0623 33.7878 28.0617 33.7878 28.0612 33.7878C28.0607 33.7878 28.0602 33.7878 28.0596 33.7878C28.0591 33.7878 28.0586 33.7878 28.0582 33.7878C28.0577 33.7878 28.0572 33.7878 28.0567 33.7878C28.0563 33.7878 28.0558 33.7878 28.0554 33.7878C28.0549 33.7878 28.0545 33.7878 28.0541 33.7878C28.0536 33.7878 28.0532 33.7878 28.0528 33.7878C28.0524 33.7878 28.052 33.7878 28.0516 33.7878C28.0513 33.7878 28.0509 33.7878 28.0505 33.7878C28.0502 33.7878 28.0498 33.7878 28.0495 33.7878C28.0491 33.7878 28.0488 33.7878 28.0485 33.7878C28.0482 33.7878 28.0479 33.7878 28.0476 33.7878C28.0473 33.7878 28.047 33.7878 28.0468 33.7878C28.0465 33.7878 28.0462 33.7878 28.046 33.7878C28.0457 33.7878 28.0455 33.7878 28.0453 33.7878C28.0451 33.7878 28.0449 33.7878 28.0447 33.7878C28.0445 33.7878 28.0443 33.7878 28.0441 33.7878C28.044 33.7878 28.0438 33.7878 28.0436 33.7878C28.0435 33.7878 28.0434 33.7878 28.0432 33.7878C28.0431 33.7878 28.043 33.7878 28.0429 33.7878C28.0428 33.7878 28.0427 33.7878 28.0427 33.7878C28.0426 33.7878 28.0425 33.7878 28.0425 33.7878C28.0425 33.7878 28.0424 33.7878 28.0424 33.7878C28.0424 33.7878 28.0424 35.1211 28.0424 36.4544C28.0424 36.4544 28.0424 36.4544 28.0425 36.4544C28.0425 36.4544 28.0426 36.4544 28.0426 36.4544C28.0427 36.4544 28.0428 36.4544 28.0429 36.4544C28.0429 36.4544 28.0431 36.4544 28.0432 36.4544C28.0433 36.4544 28.0434 36.4544 28.0436 36.4544C28.0437 36.4544 28.0439 36.4544 28.0441 36.4544C28.0442 36.4544 28.0444 36.4544 28.0446 36.4544C28.0448 36.4544 28.0451 36.4544 28.0453 36.4544C28.0455 36.4544 28.0458 36.4544 28.046 36.4544C28.0463 36.4544 28.0466 36.4544 28.0469 36.4544C28.0472 36.4544 28.0475 36.4544 28.0478 36.4544C28.0481 36.4544 28.0485 36.4544 28.0488 36.4544C28.0492 36.4544 28.0496 36.4544 28.05 36.4544C28.0503 36.4544 28.0507 36.4544 28.0512 36.4544C28.0516 36.4544 28.052 36.4544 28.0525 36.4544C28.0529 36.4544 28.0534 36.4544 28.0539 36.4544C28.0543 36.4544 28.0548 36.4544 28.0554 36.4544C28.0559 36.4544 28.0564 36.4544 28.0569 36.4544C28.0575 36.4544 28.0581 36.4544 28.0586 36.4544C28.0592 36.4544 28.0598 36.4544 28.0604 36.4544C28.061 36.4544 28.0617 36.4544 28.0623 36.4544C28.063 36.4544 28.0636 36.4544 28.0643 36.4544C28.065 36.4544 28.0657 36.4544 28.0664 36.4544C28.0671 36.4544 28.0678 36.4544 28.0686 36.4544C28.0693 36.4544 28.0701 36.4544 28.0709 36.4544C28.0717 36.4544 28.0725 36.4544 28.0733 36.4544C28.0741 36.4544 28.0749 36.4544 28.0758 36.4544C28.0766 36.4544 28.0775 36.4544 28.0784 36.4544C28.0793 36.4544 28.0802 36.4544 28.0811 36.4544C28.082 36.4544 28.083 36.4544 28.0839 36.4544C28.0849 36.4544 28.0859 36.4544 28.0869 36.4544C28.0879 36.4544 28.0889 36.4544 28.0899 36.4544C28.091 36.4544 28.092 36.4544 28.0931 36.4544C28.0942 36.4544 28.0952 36.4544 28.0964 36.4544C28.0975 36.4544 28.0986 36.4544 28.0997 36.4544C28.1009 36.4544 28.1021 36.4544 28.1032 36.4544C28.1044 36.4544 28.1056 36.4544 28.1069 36.4544C28.1081 36.4544 28.1093 36.4544 28.1106 36.4544C28.1118 36.4544 28.1131 36.4544 28.1144 36.4544C28.1157 36.4544 28.1171 36.4544 28.1184 36.4544C28.1197 36.4544 28.1211 36.4544 28.1225 36.4544C28.1239 36.4544 28.1253 36.4544 28.1267 36.4544C28.1281 36.4544 28.1295 36.4544 28.131 36.4544C28.1325 36.4544 28.134 36.4544 28.1355 36.4544C28.137 36.4544 28.1385 36.4544 28.14 36.4544C28.1416 36.4544 28.1431 36.4544 28.1447 36.4544C28.1463 36.4544 28.1479 36.4544 28.1495 36.4544C28.1512 36.4544 28.1528 36.4544 28.1545 36.4544C28.1561 36.4544 28.1578 36.4544 28.1595 36.4544C28.1613 36.4544 28.163 36.4544 28.1647 36.4544C28.1665 36.4544 28.1683 36.4544 28.1701 36.4544C28.1719 36.4544 28.1737 36.4544 28.1755 36.4544C28.1774 36.4544 28.1792 36.4544 28.1811 36.4544C28.183 36.4544 28.1849 36.4544 28.1868 36.4544C28.1888 36.4544 28.1907 36.4544 28.1927 36.4544C28.1946 36.4544 28.1966 36.4544 28.1987 36.4544C28.2007 36.4544 28.2027 36.4544 28.2048 36.4544C28.2068 36.4544 28.2089 36.4544 28.211 36.4544C28.2131 36.4544 28.2153 36.4544 28.2174 36.4544C28.2196 36.4544 28.2217 36.4544 28.2239 36.4544C28.2261 36.4544 28.2284 36.4544 28.2306 36.4544C28.2328 36.4544 28.2351 36.4544 28.2374 36.4544C28.2397 36.4544 28.242 36.4544 28.2443 36.4544C28.2467 36.4544 28.249 36.4544 28.2514 36.4544C28.2538 36.4544 28.2562 36.4544 28.2586 36.4544C28.2611 36.4544 28.2635 36.4544 28.266 36.4544C28.2685 36.4544 28.271 36.4544 28.2735 36.4544C28.2761 36.4544 28.2786 36.4544 28.2812 36.4544C28.2838 36.4544 28.2864 36.4544 28.289 36.4544C28.2916 36.4544 28.2943 36.4544 28.2969 36.4544C28.2996 36.4544 28.3023 36.4544 28.305 36.4544C28.3077 36.4544 28.3105 36.4544 28.3133 36.4544C28.316 36.4544 28.3188 36.4544 28.3217 36.4544C28.3245 36.4544 28.3273 36.4544 28.3302 36.4544C28.3331 36.4544 28.336 36.4544 28.3389 36.4544C28.3418 36.4544 28.3448 36.4544 28.3477 36.4544C28.3507 36.4544 28.3537 36.4544 28.3567 36.4544C28.3598 36.4544 28.3628 36.4544 28.3659 36.4544C28.369 36.4544 28.3721 36.4544 28.3752 36.4544C28.3783 36.4544 28.3815 36.4544 28.3847 36.4544C28.3878 36.4544 28.391 36.4544 28.3943 36.4544C28.3975 36.4544 28.4008 36.4544 28.4041 36.4544C28.4073 36.4544 28.4107 36.4544 28.414 36.4544C28.4173 36.4544 28.4207 36.4544 28.4241 36.4544C28.4275 36.4544 28.4309 36.4544 28.4344 36.4544C28.4378 36.4544 28.4413 36.4544 28.4448 36.4544C28.4483 36.4544 28.4518 36.4544 28.4554 36.4544C28.4589 36.4544 28.4625 36.4544 28.4661 36.4544C28.4697 36.4544 28.4733 36.4544 28.477 36.4544C28.4807 36.4544 28.4844 36.4544 28.4881 36.4544C28.4918 36.4544 28.4956 36.4544 28.4993 36.4544C28.5031 36.4544 28.5069 36.4544 28.5107 36.4544C28.5146 36.4544 28.5184 36.4544 28.5223 36.4544C28.5262 36.4544 28.5301 36.4544 28.5341 36.4544C28.538 36.4544 28.542 36.4544 28.546 36.4544C28.55 36.4544 28.554 36.4544 28.5581 36.4544C28.5621 36.4544 28.5662 36.4544 28.5703 36.4544C28.5745 36.4544 28.5786 36.4544 28.5828 36.4544C28.5869 36.4544 28.5912 36.4544 28.5954 36.4544C28.5996 36.4544 28.6039 36.4544 28.6082 36.4544C28.6125 36.4544 28.6168 36.4544 28.6211 36.4544C28.6255 36.4544 28.6299 36.4544 28.6343 36.4544C28.6387 36.4544 28.6431 36.4544 28.6476 36.4544C28.652 36.4544 28.6565 36.4544 28.6611 36.4544C28.6656 36.4544 28.6702 36.4544 28.6747 36.4544C28.6793 36.4544 28.684 36.4544 28.6886 36.4544C28.6933 36.4544 28.6979 36.4544 28.7026 36.4544C28.7073 36.4544 28.7121 36.4544 28.7169 36.4544C28.7216 36.4544 28.7264 36.4544 28.7313 36.4544C28.7361 36.4544 28.741 36.4544 28.7458 36.4544C28.7507 36.4544 28.7557 36.4544 28.7606 36.4544C28.7656 36.4544 28.7706 36.4544 28.7756 36.4544C28.7806 36.4544 28.7856 36.4544 28.7907 36.4544C28.7958 36.4544 28.8009 36.4544 28.8061 36.4544C28.8112 36.4544 28.8164 36.4544 28.8216 36.4544C28.8268 36.4544 28.832 36.4544 28.8373 36.4544C28.8426 36.4544 28.8479 36.4544 28.8532 36.4544C28.8585 36.4544 28.8639 36.4544 28.8693 36.4544C28.8747 36.4544 28.8801 36.4544 28.8856 36.4544C28.8911 36.4544 28.8965 36.4544 28.9021 36.4544C28.9076 36.4544 28.9132 36.4544 28.9188 36.4544C28.9243 36.4544 28.93 36.4544 28.9356 36.4544C28.9413 36.4544 28.947 36.4544 28.9527 36.4544C28.9584 36.4544 28.9642 36.4544 28.97 36.4544C28.9758 36.4544 28.9816 36.4544 28.9874 36.4544C28.9933 36.4544 28.9992 36.4544 29.0051 36.4544C29.011 36.4544 29.017 36.4544 29.023 36.4544C29.029 36.4544 29.035 36.4544 29.0411 36.4544C29.0471 36.4544 29.0532 36.4544 29.0593 36.4544C29.0655 36.4544 29.0716 36.4544 29.0778 36.4544C29.084 36.4544 29.0902 36.4544 29.0965 36.4544C29.1028 36.4544 29.109 36.4544 29.1154 36.4544C29.1217 36.4544 29.1281 36.4544 29.1345 36.4544C29.1409 36.4544 29.1473 36.4544 29.1538 36.4544C29.1602 36.4544 29.1667 36.4544 29.1733 36.4544C29.1798 36.4544 29.1864 36.4544 29.193 36.4544C29.1996 36.4544 29.2063 36.4544 29.2129 36.4544C29.2196 36.4544 29.2263 36.4544 29.2331 36.4544C29.2398 36.4544 29.2466 36.4544 29.2534 36.4544C29.2602 36.4544 29.2671 36.4544 29.274 36.4544C29.2809 36.4544 29.2878 36.4544 29.2948 36.4544C29.3017 36.4544 29.3087 36.4544 29.3158 36.4544C29.3228 36.4544 29.3299 36.4544 29.337 36.4544C29.3441 36.4544 29.3512 36.4544 29.3584 36.4544C29.3656 36.4544 29.3728 36.4544 29.3801 36.4544C29.3873 36.4544 29.3946 36.4544 29.4019 36.4544C29.4092 36.4544 29.4166 36.4544 29.424 36.4544C29.4314 36.4544 29.4388 36.4544 29.4463 36.4544C29.4538 36.4544 29.4613 36.4544 29.4688 36.4544C29.4764 36.4544 29.484 36.4544 29.4916 36.4544C29.4992 36.4544 29.5069 36.4544 29.5146 36.4544C29.5223 36.4544 29.53 36.4544 29.5378 36.4544C29.5455 36.4544 29.5533 36.4544 29.5612 36.4544C29.569 36.4544 29.5769 36.4544 29.5848 36.4544C29.5927 36.4544 29.6007 36.4544 29.6087 36.4544C29.6167 36.4544 29.6247 36.4544 29.6328 36.4544C29.6409 36.4544 29.649 36.4544 29.6571 36.4544C29.6653 36.4544 29.6735 36.4544 29.6817 36.4544C29.6899 36.4544 29.6982 36.4544 29.7065 36.4544C29.7148 36.4544 29.7232 36.4544 29.7315 36.4544C29.7399 36.4544 29.7483 36.4544 29.7568 36.4544C29.7653 36.4544 29.7738 36.4544 29.7823 36.4544C29.7908 36.4544 29.7994 36.4544 29.808 36.4544C29.8166 36.4544 29.8253 36.4544 29.834 36.4544C29.8427 36.4544 29.8514 36.4544 29.8602 36.4544C29.869 36.4544 29.8778 36.4544 29.8866 36.4544C29.8955 36.4544 29.9044 36.4544 29.9133 36.4544C29.9222 36.4544 29.9312 36.4544 29.9402 36.4544C29.9492 36.4544 29.9583 36.4544 29.9674 36.4544C29.9765 36.4544 29.9856 36.4544 29.9948 36.4544C30.004 36.4544 30.0132 36.4544 30.0224 36.4544V33.7878ZM26.447 33.7878C26.9897 33.7878 27.4287 34.2268 27.4287 34.7695H24.7621C24.7621 35.6996 25.517 36.4544 26.447 36.4544V33.7878ZM27.4287 34.7695V26.0539H24.7621V34.7695H27.4287ZM26.0954 24.7205H24.66V27.3872H26.0954V24.7205ZM25.9934 26.0539V23.7349H23.3267V26.0539H25.9934ZM25.9934 23.7349C25.9934 23.9033 25.8611 24.0355 25.6928 24.0355V21.3688C24.3884 21.3688 23.3267 22.4304 23.3267 23.7349H25.9934ZM28.5824 19.9272C28.5824 20.1192 28.4267 20.2749 28.2347 20.2749V22.9416C29.8995 22.9416 31.2491 21.592 31.2491 19.9272H28.5824ZM28.2347 20.2749C28.0427 20.2749 27.887 20.1192 27.887 19.9272H25.2203C25.2203 21.592 26.5699 22.9416 28.2347 22.9416V20.2749ZM27.887 19.9272C27.887 19.7351 28.0427 19.5794 28.2347 19.5794V16.9128C26.5699 16.9128 25.2203 18.2624 25.2203 19.9272H27.887ZM28.2347 19.5794C28.4267 19.5794 28.5824 19.7351 28.5824 19.9272H31.2491C31.2491 18.2624 29.8995 16.9128 28.2347 16.9128V19.5794ZM21.9499 23.4565H22.4412V20.7898H21.9499V23.4565ZM22.4412 23.4565C22.0922 23.4565 21.8111 23.1755 21.8111 22.8264H24.4778C24.4778 21.7027 23.5649 20.7898 22.4412 20.7898V23.4565ZM21.8111 22.8264V25.865H24.4778V22.8264H21.8111ZM21.8111 25.865C21.8111 25.516 22.0922 25.2349 22.4412 25.2349V27.9016C23.5649 27.9016 24.4778 26.9887 24.4778 25.865H21.8111ZM22.4412 25.2349H21.9499V27.9016H22.4412V25.2349ZM21.9499 25.2349C22.2989 25.2349 22.58 25.5159 22.58 25.865H19.9134C19.9134 26.9888 20.8263 27.9016 21.9499 27.9016V25.2349ZM22.58 25.865V22.8264H19.9134V25.865H22.58ZM22.58 22.8264C22.58 23.1755 22.2989 23.4565 21.9499 23.4565V20.7898C20.8263 20.7898 19.9134 21.7026 19.9134 22.8264H22.58ZM34.1647 23.4565H34.656V20.7898H34.1647V23.4565ZM34.656 23.4565C34.3069 23.4565 34.0259 23.1754 34.0259 22.8264H36.6926C36.6926 21.7027 35.7797 20.7898 34.656 20.7898V23.4565ZM34.0259 22.8264V25.865H36.6926V22.8264H34.0259ZM34.0259 25.865C34.0259 25.516 34.3069 25.2349 34.656 25.2349V27.9016C35.7797 27.9016 36.6926 26.9887 36.6926 25.865H34.0259ZM34.656 25.2349H34.1647V27.9016H34.656V25.2349ZM34.1647 25.2349C34.5137 25.2349 34.7948 25.5159 34.7948 25.865H32.1281C32.1281 26.9888 33.041 27.9016 34.1647 27.9016V25.2349ZM34.7948 25.865V22.8264H32.1281V25.865H34.7948ZM34.7948 22.8264C34.7948 23.1755 34.5137 23.4565 34.1647 23.4565V20.7898C33.041 20.7898 32.1281 21.7026 32.1281 22.8264H34.7948ZM31.0917 22.0004C29.9606 22.0004 29.0407 22.9203 29.0407 24.0514H31.7073C31.7073 24.393 31.4333 24.667 31.0917 24.667V22.0004ZM29.0407 24.0514V26.0539H31.7073V24.0514H29.0407ZM29.0407 26.0539C29.0407 27.185 29.9606 28.1049 31.0917 28.1049V25.4382C31.4333 25.4382 31.7073 25.7122 31.7073 26.0539H29.0407ZM31.0917 28.1049C32.2228 28.1049 33.1427 27.185 33.1427 26.0539H30.476C30.476 25.7122 30.75 25.4382 31.0917 25.4382V28.1049ZM33.1427 26.0539V24.0514H30.476V26.0539H33.1427ZM33.1427 24.0514C33.1427 22.9202 32.2227 22.0004 31.0917 22.0004V24.667C30.75 24.667 30.476 24.3931 30.476 24.0514H33.1427ZM25.3777 24.667C25.0361 24.667 24.7621 24.393 24.7621 24.0514H27.4287C27.4287 22.9203 26.5088 22.0004 25.3777 22.0004V24.667ZM24.7621 24.0514V26.0539H27.4287V24.0514H24.7621ZM24.7621 26.0539C24.7621 25.7122 25.0361 25.4382 25.3777 25.4382V28.1049C26.5088 28.1049 27.4287 27.185 27.4287 26.0539H24.7621ZM25.3777 25.4382C25.7194 25.4382 25.9934 25.7122 25.9934 26.0539H23.3267C23.3267 27.185 24.2466 28.1049 25.3777 28.1049V25.4382ZM25.9934 26.0539V24.0514H23.3267V26.0539H25.9934ZM25.9934 24.0514C25.9934 24.393 25.7194 24.667 25.3777 24.667V22.0004C24.2466 22.0004 23.3267 22.9203 23.3267 24.0514H25.9934ZM30.2309 26.0539C30.2309 25.5768 30.6171 25.1921 31.0928 25.1921V27.8587C32.088 27.8587 32.8976 27.0514 32.8976 26.0539H30.2309ZM31.0928 25.1921C31.5638 25.1921 31.953 25.5738 31.953 26.0539H29.2863C29.2863 27.0545 30.099 27.8587 31.0928 27.8587V25.1921ZM31.953 26.0539V24.0514H29.2863V26.0539H31.953ZM31.953 24.0514C31.953 24.5303 31.565 24.9129 31.0928 24.9129V22.2463C30.0978 22.2463 29.2863 23.052 29.2863 24.0514H31.953ZM31.0928 24.9129C30.6158 24.9129 30.2309 24.5273 30.2309 24.0514H32.8976C32.8976 23.0552 32.0892 22.2463 31.0928 22.2463V24.9129ZM30.2309 24.0514V26.0539H32.8976V24.0514H30.2309ZM30.1284 33.5415H28.4807V36.2082H30.1284V33.5415ZM29.814 34.8749V29.7368H27.1474V34.8749H29.814ZM29.814 29.7368C29.814 28.867 29.1101 28.1575 28.2342 28.1575V30.8242C27.6329 30.8242 27.1474 30.3353 27.1474 29.7368H29.814ZM28.2342 28.1575C27.3541 28.1575 26.656 28.8729 26.656 29.7368H29.3227C29.3227 30.3295 28.843 30.8242 28.2342 30.8242V28.1575ZM26.656 29.7368V34.8749H29.3227V29.7368H26.656ZM27.9894 33.5416H26.3417V36.2082H27.9894V33.5416ZM27.675 34.8749V24.5917H25.0084V34.8749H27.675ZM26.3417 25.925H30.1284V23.2584H26.3417V25.925ZM28.795 24.5917V34.8749H31.4617V24.5917H28.795ZM25.3789 25.192C25.8561 25.192 26.2408 25.5799 26.2408 26.0539H23.5741C23.5741 27.0483 24.379 27.8587 25.3789 27.8587V25.192ZM26.2408 26.0539V24.0514H23.5741V26.0539H26.2408ZM26.2408 24.0514C26.2408 24.5242 25.8572 24.9129 25.3789 24.9129V22.2462C24.3778 22.2462 23.5741 23.0581 23.5741 24.0514H26.2408ZM25.3789 24.9129C24.902 24.9129 24.5171 24.5272 24.5171 24.0514H27.1837C27.1837 23.0551 26.3754 22.2462 25.3789 22.2462V24.9129ZM24.5171 24.0514V26.0539H27.1837V24.0514H24.5171ZM24.5171 26.0539C24.5171 25.5768 24.9032 25.192 25.3789 25.192V27.8587C26.3741 27.8587 27.1837 27.0514 27.1837 26.0539H24.5171ZM30.7768 21.6148H25.6932V24.2815H30.7768V21.6148ZM25.6932 21.6148C25.2298 21.6148 24.7946 21.7658 24.4433 22.0234L26.0201 24.1739C25.9268 24.2424 25.8125 24.2815 25.6932 24.2815V21.6148ZM25.4363 24.4162C25.4274 24.4176 25.4173 24.4188 25.4066 24.4196C25.3959 24.4205 25.3865 24.4208 25.3789 24.4208V21.7541C25.2593 21.7541 25.1429 21.7631 25.0271 21.7811L25.4363 24.4162ZM25.3789 24.4208C25.1719 24.4208 25.0084 24.2546 25.0084 24.0514H27.675C27.675 22.7851 26.648 21.7541 25.3789 21.7541V24.4208ZM25.0084 24.0514V24.0995H27.675V24.0514H25.0084ZM26.3417 25.4328H30.1284V22.7662H26.3417V25.4328ZM31.4617 24.0995V24.0514H28.795V24.0995H31.4617ZM31.4617 24.0514C31.4617 24.2561 31.2967 24.4208 31.0928 24.4208V21.7541C29.8236 21.7541 28.795 22.7836 28.795 24.0514H31.4617ZM31.0928 24.4208C31.0729 24.4208 31.0525 24.4191 31.0338 24.4162L31.443 21.7811C31.3283 21.7633 31.212 21.7541 31.0928 21.7541V24.4208ZM32.0268 22.0234C31.6767 21.7667 31.2433 21.6148 30.7768 21.6148V24.2815C30.6578 24.2815 30.5421 24.2415 30.45 24.1739L32.0268 22.0234ZM21.5658 25.8651C21.5658 25.3783 21.9602 24.9889 22.4409 24.9889V27.6555C23.4279 27.6555 24.2325 26.8561 24.2325 25.8651H21.5658ZM22.4409 24.9889H21.9512V27.6555H22.4409V24.9889ZM21.9512 24.9889C22.432 24.9889 22.8263 25.3783 22.8263 25.8651H20.1597C20.1597 26.8561 20.9643 27.6555 21.9512 27.6555V24.9889ZM22.8263 25.8651V22.8262H20.1597V25.8651H22.8263ZM22.8263 22.8262C22.8263 23.313 22.432 23.7025 21.9512 23.7025V21.0358C20.9643 21.0358 20.1597 21.8352 20.1597 22.8262H22.8263ZM21.9512 23.7025H22.4409V21.0358H21.9512V23.7025ZM22.4409 23.7025C21.9601 23.7025 21.5658 23.3129 21.5658 22.8262H24.2324C24.2324 21.8353 23.4279 21.0358 22.4409 21.0358V23.7025ZM21.5658 22.8262L21.5658 25.8651L24.2325 25.8651L24.2324 22.8262L21.5658 22.8262ZM35.0416 22.8262C35.0416 23.3099 34.6504 23.7025 34.1648 23.7025V21.0358C33.1764 21.0358 32.3749 21.8383 32.3749 22.8262H35.0416ZM34.1648 23.7025H34.6561V21.0358H34.1648V23.7025ZM34.6561 23.7025C34.1768 23.7025 33.781 23.3161 33.781 22.8262H36.4477C36.4477 21.8321 35.6383 21.0358 34.6561 21.0358V23.7025ZM33.781 22.8262V25.8651H36.4477V22.8262H33.781ZM33.781 25.8651C33.781 25.3752 34.1768 24.9889 34.6561 24.9889V27.6555C35.6383 27.6555 36.4477 26.8593 36.4477 25.8651H33.781ZM34.6561 24.9889H34.1648V27.6555H34.6561V24.9889ZM34.1648 24.9889C34.6504 24.9889 35.0416 25.3815 35.0416 25.8651H32.3749C32.3749 26.853 33.1764 27.6555 34.1648 27.6555V24.9889ZM35.0416 25.8651V22.8262H32.3749V25.8651H35.0416ZM31.8819 24.5917V25.8651H34.5486V24.5917H31.8819ZM31.8819 25.8651C31.8819 27.1261 32.9069 28.1477 34.1648 28.1477V25.481C34.3772 25.481 34.5486 25.6509 34.5486 25.8651H31.8819ZM34.1648 28.1477H34.6561V25.481H34.1648V28.1477ZM34.6561 28.1477C35.9172 28.1477 36.939 27.1246 36.939 25.8651H34.2724C34.2724 25.6524 34.4439 25.481 34.6561 25.481V28.1477ZM36.939 25.8651V22.8262H34.2724V25.8651H36.939ZM36.939 22.8262C36.939 21.5664 35.9171 20.5437 34.6561 20.5437V23.2103C34.444 23.2103 34.2724 23.0389 34.2724 22.8262H36.939ZM34.6561 20.5437H34.1648V23.2103H34.6561V20.5437ZM34.1648 20.5437C32.9071 20.5437 31.8819 21.5648 31.8819 22.8262H34.5486C34.5486 23.0404 34.377 23.2103 34.1648 23.2103V20.5437ZM31.8819 22.8262V24.0995H34.5486V22.8262H31.8819ZM33.2152 22.7662H32.0556V25.4328H33.2152V22.7662ZM33.3889 24.0995V23.7351H30.7222V24.0995H33.3889ZM33.3889 23.7351C33.3889 22.2933 32.2179 21.1227 30.7768 21.1227V23.7893C30.7706 23.7893 30.7619 23.7878 30.7537 23.7843C30.7463 23.7812 30.7412 23.7773 30.7377 23.7738C30.7341 23.7703 30.7303 23.7652 30.7272 23.7579C30.7237 23.7496 30.7222 23.7411 30.7222 23.7351H33.3889ZM30.7768 21.1227H25.6932V23.7893H30.7768V21.1227ZM25.6932 21.1227C24.2522 21.1227 23.0811 22.2933 23.0811 23.7351H25.7478C25.7478 23.7411 25.7463 23.7496 25.7428 23.7579C25.7397 23.7652 25.7359 23.7703 25.7324 23.7738C25.7288 23.7774 25.7238 23.7812 25.7164 23.7843C25.7081 23.7878 25.6994 23.7893 25.6932 23.7893V21.1227ZM23.0811 23.7351V24.0995H25.7478V23.7351H23.0811ZM24.4144 22.7662H23.3904V25.4328H24.4144V22.7662ZM24.7238 24.0995V22.8262H22.0571V24.0995H24.7238ZM24.7238 22.8262C24.7238 21.5664 23.7018 20.5437 22.4409 20.5437V23.2103C22.2288 23.2103 22.0571 23.0389 22.0571 22.8262H24.7238ZM22.4409 20.5437H21.9512V23.2103H22.4409V20.5437ZM21.9512 20.5437C20.6933 20.5437 19.6667 21.5634 19.6667 22.8262H22.3333C22.3333 23.0419 22.1603 23.2103 21.9512 23.2103V20.5437ZM19.6667 22.8262V25.8651H22.3333V22.8262H19.6667ZM19.6667 25.8651C19.6667 27.1276 20.6931 28.1477 21.9512 28.1477V25.481C22.1604 25.481 22.3333 25.6494 22.3333 25.8651H19.6667ZM21.9512 28.1477H22.4409V25.481H21.9512V28.1477ZM22.4409 28.1477C23.7019 28.1477 24.7238 27.1246 24.7238 25.8651H22.0571C22.0571 25.6524 22.2286 25.481 22.4409 25.481V28.1477ZM24.7238 25.8651V24.5917H22.0571V25.8651H24.7238ZM23.3904 25.925H24.4144V23.2583H23.3904V25.925ZM23.0811 24.5917V26.0539H25.7478V24.5917H23.0811ZM23.0811 26.0539C23.0811 27.3215 24.1099 28.3508 25.3789 28.3508V25.6842C25.5825 25.6842 25.7478 25.8486 25.7478 26.0539H23.0811ZM25.3789 28.3508C25.7878 28.3508 26.1714 28.2421 26.5018 28.0571L25.1989 25.7304C25.2481 25.7029 25.3108 25.6842 25.3789 25.6842V28.3508ZM24.517 26.8938V35.121H27.1837V26.8938H24.517ZM24.517 35.121C24.517 35.9859 25.2156 36.7005 26.0952 36.7005V34.0339C26.7035 34.0339 27.1837 34.5284 27.1837 35.121H24.517ZM26.0952 36.7005H30.3748V34.0339H26.0952V36.7005ZM30.3748 36.7005C31.2546 36.7005 31.953 35.9858 31.953 35.121H29.2863C29.2863 34.5285 29.7664 34.0339 30.3748 34.0339V36.7005ZM31.953 35.121V26.8938H29.2863V35.121H31.953ZM29.9682 28.0571C30.2997 28.2427 30.6834 28.3508 31.0928 28.3508V25.6842C31.1581 25.6842 31.2209 25.7023 31.2711 25.7304L29.9682 28.0571ZM31.0928 28.3508C32.3616 28.3508 33.3889 27.3201 33.3889 26.0539H30.7222C30.7222 25.8501 30.8861 25.6842 31.0928 25.6842V28.3508ZM33.3889 26.0539V24.5917H30.7222V26.0539H33.3889ZM32.0556 25.925H33.2152V23.2583H32.0556V25.925ZM28.2342 19.8255C28.2906 19.8255 28.3368 19.8726 28.3368 19.9273H31.0035C31.0035 18.399 29.7626 17.1588 28.2342 17.1588V19.8255ZM28.3368 19.9273C28.3368 19.9817 28.2904 20.029 28.2342 20.029V22.6957C29.7629 22.6957 31.0035 21.4547 31.0035 19.9273H28.3368ZM28.2342 20.029C28.2083 20.029 28.1847 20.0199 28.1637 19.9989C28.1427 19.9779 28.1333 19.9538 28.1333 19.9273H25.4666C25.4666 21.4537 26.7062 22.6957 28.2342 22.6957V20.029ZM28.1333 19.9273C28.1333 19.8716 28.1804 19.8255 28.2342 19.8255V17.1588C26.7065 17.1588 25.4666 18.4 25.4666 19.9273H28.1333ZM28.2342 23.1878C30.0349 23.1878 31.4948 21.7254 31.4948 19.9273H28.8281C28.8281 20.2538 28.561 20.5212 28.2342 20.5212V23.1878ZM31.4948 19.9273C31.4948 18.1283 30.0347 16.6667 28.2342 16.6667V19.3333C28.5612 19.3333 28.8281 19.6004 28.8281 19.9273H31.4948ZM28.2342 16.6667C26.4347 16.6667 24.9753 18.1291 24.9753 19.9272H27.642C27.642 19.5996 27.9097 19.3333 28.2342 19.3333V16.6667ZM24.9753 19.9272C24.9753 21.7246 26.4344 23.1878 28.2342 23.1878V20.5212C27.9099 20.5212 27.642 20.2546 27.642 19.9272H24.9753ZM3.51562 32.5573C3.49697 32.5573 3.48025 32.5512 3.46455 32.5354C3.44885 32.5198 3.44271 32.503 3.44271 32.4844H0.776042C0.776042 33.9961 2.00389 35.224 3.51562 35.224V32.5573ZM3.44271 32.4844C3.44271 32.4657 3.44885 32.449 3.46455 32.4333C3.48025 32.4176 3.49697 32.4115 3.51562 32.4115V29.7448C2.00389 29.7448 0.776042 30.9726 0.776042 32.4844H3.44271ZM3.51562 32.4115H13.2188V29.7448H3.51562V32.4115ZM13.2188 32.4115C15.8937 32.4115 18.0677 30.2374 18.0677 27.5625H15.401C15.401 28.7647 14.4209 29.7448 13.2188 29.7448V32.4115ZM18.0677 27.5625C18.0677 24.8876 15.8937 22.7135 13.2188 22.7135V25.3802C14.4209 25.3802 15.401 26.3603 15.401 27.5625H18.0677ZM13.2188 22.7135H10.8281V25.3802H13.2188V22.7135ZM10.8281 22.7135C10.8095 22.7135 10.7927 22.7074 10.777 22.6917C10.7613 22.676 10.7552 22.6593 10.7552 22.6406H8.08854C8.08854 24.1524 9.31639 25.3802 10.8281 25.3802V22.7135ZM10.7552 22.6406V21.8672H8.08854V22.6406H10.7552ZM9.42188 20.5339H7.3125V23.2005H9.42188V20.5339ZM5.97917 21.8672V22.6406H8.64583V21.8672H5.97917ZM5.97917 22.6406C5.97917 25.3155 8.15321 27.4896 10.8281 27.4896V24.8229C9.62597 24.8229 8.64583 23.8428 8.64583 22.6406H5.97917ZM10.8281 27.4896H13.2188V24.8229H10.8281V27.4896ZM13.2188 27.4896C13.2374 27.4896 13.2541 27.4957 13.2698 27.5114C13.2855 27.5271 13.2917 27.5438 13.2917 27.5625H15.9583C15.9583 26.0508 14.7305 24.8229 13.2188 24.8229V27.4896ZM13.2917 27.5625C13.2917 27.5812 13.2855 27.5979 13.2698 27.6136C13.2541 27.6293 13.2374 27.6354 13.2188 27.6354V30.3021C14.7305 30.3021 15.9583 29.0742 15.9583 27.5625H13.2917ZM13.2188 27.6354H3.51562V30.3021H13.2188V27.6354ZM3.51562 27.6354C0.840707 27.6354 -1.33333 29.8095 -1.33333 32.4844H1.33333C1.33333 31.2822 2.31347 30.3021 3.51562 30.3021V27.6354ZM-1.33333 32.4844C-1.33333 35.1593 0.840708 37.3333 3.51562 37.3333V34.6667C2.31347 34.6667 1.33333 33.6865 1.33333 32.4844H-1.33333ZM3.51562 37.3333H24.8316V34.6667H3.51562V37.3333ZM26.1596 35.8814L25.9712 33.772L23.3151 34.0093L23.5035 36.1186L26.1596 35.8814ZM24.6432 32.5573H3.51562V35.224H24.6432V32.5573Z"
                              fill="#D4D4D4"
                              mask="url(#path-1-inside-1_9636_42692)"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9636_42692">
                              <rect width="36" height="36" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "FitnessStory" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        FITNESS STORY
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Workout"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Workout")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Workout" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="30"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Workout" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        WORKOUT
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Men'sHealth"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Men'sHealth")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Men'sHealth" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Men'sHealth" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        MEN&apos;S HEALTH
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Women'sHealth"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Women'sHealth")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Women'sHealth" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="37"
                          height="30"
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
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Women'sHealth" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        WOMEN&apos;S HEALTH
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/FitnessTips"}>
                  <div className=" bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("FitnessTips")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "FitnessTips" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.2798 4.74984C24.3916 4.80328 24.4752 4.90312 24.5069 5.02336C24.5385 5.14359 24.5153 5.27156 24.4436 5.37351L24.1448 5.7975L27.4157 6.0893L26.0348 3.11156L25.7359 3.53695C25.615 3.70711 25.3914 3.76477 25.2044 3.67336L25.0462 3.59602C22.8348 2.51391 20.4576 1.96547 17.9798 1.96547C15.407 1.96547 12.8631 2.58352 10.5941 3.75562C10.8149 4.1557 10.9844 4.58953 11.0913 5.04586C13.202 3.92719 15.5709 3.33797 17.9798 3.33797C20.182 3.33727 22.304 3.81258 24.2798 4.74984ZM20.5152 21.6305C20.5152 20.8099 19.9844 20.1131 19.1912 19.8959L16.6009 19.1857C15.9836 19.6104 15.2341 19.8593 14.4276 19.8593C13.6204 19.8593 12.8716 19.6104 12.2542 19.1857L9.66109 19.8959C8.87148 20.1131 8.33992 20.8099 8.33992 21.6305V25.8084C10.8388 28.2223 14.2391 30.5377 17.9791 30.5377C18.8418 30.5377 19.6891 30.4596 20.5145 30.3077V21.6305H20.5152ZM24.5526 13.7611C23.6912 13.7611 22.9874 14.4621 22.9874 15.3241V15.3811C22.9874 16.2424 23.6912 16.9434 24.5526 16.9434H26.5227C26.7555 16.9434 26.9446 17.1326 26.9446 17.3653V19.3376C26.9446 20.1989 27.6449 20.8999 28.507 20.8999H28.5646C29.4259 20.8999 30.1298 20.1989 30.1298 19.3376V17.3653C30.1298 17.1326 30.3161 16.9434 30.5488 16.9434H32.5218C33.3831 16.9434 34.0841 16.2424 34.0841 15.3811V15.3241C34.0841 14.4621 33.3838 13.7611 32.5218 13.7611H30.5488C30.3161 13.7611 30.1298 13.5727 30.1298 13.3392V11.3677C30.1298 10.5056 29.4259 9.80531 28.5646 9.80531H28.507C27.6456 9.80531 26.9446 10.5063 26.9446 11.3677V13.3392C26.9446 13.5727 26.7548 13.7611 26.5227 13.7611H24.5526ZM14.4276 12.982C12.7647 12.982 11.4098 14.3348 11.4098 15.9984C11.4098 17.6613 12.7654 19.0148 14.4276 19.0148C16.0905 19.0148 17.4426 17.6613 17.4426 15.9984C17.4426 14.3355 16.0905 12.982 14.4276 12.982ZM4.96633 11.1666C3.84344 13.2809 3.25211 15.6518 3.25211 18.0628C3.25211 21.9961 4.78562 25.6945 7.56508 28.4754C10.3473 31.257 14.0458 32.7884 17.9798 32.7884C20.9259 32.7884 23.7742 31.9172 26.2148 30.2698C28.6553 28.6237 30.5277 26.3126 31.633 23.5859L31.8918 22.9495L33.1637 23.4649L32.905 24.1012C30.43 30.2121 24.5723 34.1609 17.9791 34.1609C9.1007 34.1609 1.87891 26.9398 1.87891 18.0635C1.87891 15.4887 2.49906 12.942 3.67328 10.6709C4.07617 10.8916 4.51 11.059 4.96633 11.1666ZM8.33148 4.49883C8.07906 4.24641 7.74016 4.10719 7.38086 4.10719C7.01875 4.10719 6.68055 4.24711 6.43023 4.50023C6.35008 4.57898 6.24039 4.62398 6.12859 4.62398C6.01961 4.62398 5.91062 4.57969 5.83258 4.50023C5.5682 4.23797 5.22367 4.10648 4.87914 4.10648C4.53461 4.10648 4.19289 4.23727 3.93133 4.49883C3.66695 4.7618 3.54391 5.03742 3.54953 5.34117C3.56992 6.29883 4.82148 7.44773 5.73766 8.28656C5.87266 8.41101 6.00484 8.53266 6.12789 8.64797C6.26289 8.5207 6.40633 8.38641 6.55891 8.24859C7.4575 7.42101 8.69219 6.28758 8.71258 5.34187C8.71961 5.03883 8.59305 4.7625 8.33148 4.49883ZM10.3818 6.20812C10.3818 8.55234 8.47492 10.4592 6.13211 10.4592C3.7893 10.4592 1.87961 8.55234 1.87961 6.20812C1.87961 3.86391 3.7893 1.95703 6.13211 1.95703C8.47492 1.95703 10.3818 3.86461 10.3818 6.20812ZM3.33578 3.90258C4.09375 3.1432 5.27711 3.06023 6.13 3.65367C6.49492 3.40055 6.92523 3.26414 7.37875 3.26344H7.38156C7.96727 3.26344 8.5157 3.49055 8.92633 3.90187C9.35734 4.33078 9.56687 4.82156 9.55492 5.35945C9.52891 6.66445 8.1993 7.88719 7.12844 8.86945C6.86687 9.11062 6.62008 9.33844 6.43375 9.53039C6.35641 9.61266 6.24742 9.65906 6.13211 9.65977C6.13211 9.65977 6.13211 9.65977 6.1293 9.65977C6.0175 9.65977 5.90852 9.61406 5.83047 9.53391C5.64977 9.35039 5.41422 9.13523 5.16742 8.90812C4.08461 7.91391 2.73531 6.67641 2.70648 5.35875C2.69523 4.82086 2.90758 4.33008 3.33578 3.90258Z"
                            fill="url(#paint0_linear_7678_44436)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_7678_44436"
                              x1="0.640243"
                              y1="22.5127"
                              x2="35.1681"
                              y2="22.5183"
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
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.2798 4.74984C24.3916 4.80328 24.4752 4.90312 24.5069 5.02336C24.5385 5.14359 24.5153 5.27156 24.4436 5.37351L24.1448 5.7975L27.4157 6.0893L26.0348 3.11156L25.7359 3.53695C25.615 3.70711 25.3914 3.76477 25.2044 3.67336L25.0462 3.59602C22.8348 2.51391 20.4576 1.96547 17.9798 1.96547C15.407 1.96547 12.8631 2.58352 10.5941 3.75562C10.8149 4.1557 10.9844 4.58953 11.0913 5.04586C13.202 3.92719 15.5709 3.33797 17.9798 3.33797C20.182 3.33727 22.304 3.81258 24.2798 4.74984ZM20.5152 21.6305C20.5152 20.8099 19.9844 20.1131 19.1912 19.8959L16.6009 19.1857C15.9836 19.6104 15.2341 19.8593 14.4276 19.8593C13.6204 19.8593 12.8716 19.6104 12.2542 19.1857L9.66109 19.8959C8.87148 20.1131 8.33992 20.8099 8.33992 21.6305V25.8084C10.8388 28.2223 14.2391 30.5377 17.9791 30.5377C18.8418 30.5377 19.6891 30.4596 20.5145 30.3077V21.6305H20.5152ZM24.5526 13.7611C23.6912 13.7611 22.9874 14.4621 22.9874 15.3241V15.3811C22.9874 16.2424 23.6912 16.9434 24.5526 16.9434H26.5227C26.7555 16.9434 26.9446 17.1326 26.9446 17.3653V19.3376C26.9446 20.1989 27.6449 20.8999 28.507 20.8999H28.5646C29.4259 20.8999 30.1298 20.1989 30.1298 19.3376V17.3653C30.1298 17.1326 30.3161 16.9434 30.5488 16.9434H32.5218C33.3831 16.9434 34.0841 16.2424 34.0841 15.3811V15.3241C34.0841 14.4621 33.3838 13.7611 32.5218 13.7611H30.5488C30.3161 13.7611 30.1298 13.5727 30.1298 13.3392V11.3677C30.1298 10.5056 29.4259 9.80531 28.5646 9.80531H28.507C27.6456 9.80531 26.9446 10.5063 26.9446 11.3677V13.3392C26.9446 13.5727 26.7548 13.7611 26.5227 13.7611H24.5526ZM14.4276 12.982C12.7647 12.982 11.4098 14.3348 11.4098 15.9984C11.4098 17.6613 12.7654 19.0148 14.4276 19.0148C16.0905 19.0148 17.4426 17.6613 17.4426 15.9984C17.4426 14.3355 16.0905 12.982 14.4276 12.982ZM4.96633 11.1666C3.84344 13.2809 3.25211 15.6518 3.25211 18.0628C3.25211 21.9961 4.78562 25.6945 7.56508 28.4754C10.3473 31.257 14.0458 32.7884 17.9798 32.7884C20.9259 32.7884 23.7742 31.9172 26.2148 30.2698C28.6553 28.6237 30.5277 26.3126 31.633 23.5859L31.8918 22.9495L33.1637 23.4649L32.905 24.1012C30.43 30.2121 24.5723 34.1609 17.9791 34.1609C9.1007 34.1609 1.87891 26.9398 1.87891 18.0635C1.87891 15.4887 2.49906 12.942 3.67328 10.6709C4.07617 10.8916 4.51 11.059 4.96633 11.1666ZM8.33148 4.49883C8.07906 4.24641 7.74016 4.10719 7.38086 4.10719C7.01875 4.10719 6.68055 4.24711 6.43023 4.50023C6.35008 4.57898 6.24039 4.62398 6.12859 4.62398C6.01961 4.62398 5.91062 4.57969 5.83258 4.50023C5.5682 4.23797 5.22367 4.10648 4.87914 4.10648C4.53461 4.10648 4.19289 4.23727 3.93133 4.49883C3.66695 4.7618 3.54391 5.03742 3.54953 5.34117C3.56992 6.29883 4.82148 7.44773 5.73766 8.28656C5.87266 8.41101 6.00484 8.53266 6.12789 8.64797C6.26289 8.5207 6.40633 8.38641 6.55891 8.24859C7.4575 7.42101 8.69219 6.28758 8.71258 5.34187C8.71961 5.03883 8.59305 4.7625 8.33148 4.49883ZM10.3818 6.20812C10.3818 8.55234 8.47492 10.4592 6.13211 10.4592C3.7893 10.4592 1.87961 8.55234 1.87961 6.20812C1.87961 3.86391 3.7893 1.95703 6.13211 1.95703C8.47492 1.95703 10.3818 3.86461 10.3818 6.20812ZM3.33578 3.90258C4.09375 3.1432 5.27711 3.06023 6.13 3.65367C6.49492 3.40055 6.92523 3.26414 7.37875 3.26344H7.38156C7.96727 3.26344 8.5157 3.49055 8.92633 3.90187C9.35734 4.33078 9.56687 4.82156 9.55492 5.35945C9.52891 6.66445 8.1993 7.88719 7.12844 8.86945C6.86687 9.11062 6.62008 9.33844 6.43375 9.53039C6.35641 9.61266 6.24742 9.65906 6.13211 9.65977C6.13211 9.65977 6.13211 9.65977 6.1293 9.65977C6.0175 9.65977 5.90852 9.61406 5.83047 9.53391C5.64977 9.35039 5.41422 9.13523 5.16742 8.90812C4.08461 7.91391 2.73531 6.67641 2.70648 5.35875C2.69523 4.82086 2.90758 4.33008 3.33578 3.90258Z"
                            fill="#D4D4D4"
                          />
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "FitnessTips" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        FITNESS TIPS
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Recovery"}>
                  <div className="bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Recovery")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Recovery" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
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
                          width="32"
                          height="30"
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
                        className={`h-[30px] ${singleCategory === "Recovery" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        RECOVERY
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Dance"}>
                  <div className="bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Dance")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Dance" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_9778_52425)">
                            <path
                              d="M20.2631 7.66563C21.4201 6.50859 21.4201 4.63265 20.2631 3.4756C19.106 2.31856 17.2301 2.31856 16.073 3.47561C14.916 4.63265 14.916 6.50859 16.073 7.66563C17.2301 8.82267 19.106 8.82267 20.2631 7.66563Z"
                              fill="url(#paint0_linear_9778_52425)"
                            />
                            <path
                              d="M22.145 20.3006C22.7396 20.7201 23.563 20.6182 24.0361 20.0533L27.4352 15.9936C27.965 15.3606 27.8394 14.4088 27.1632 13.9352L22.0905 10.3693C21.4797 9.93985 20.7511 9.70941 20.0043 9.70941H17.062L12.5811 6.54883L10.998 1.02132C10.7836 0.273242 10.0035 -0.159418 9.25565 0.054825C8.50771 0.269068 8.07491 1.04913 8.28922 1.79714L10.0088 7.80089C10.0971 8.10916 10.2879 8.3781 10.5497 8.56326L14.6925 11.4931C14.6786 11.6337 14.6827 20.4108 14.6827 20.4179C13.3576 22.2924 12.2442 23.8675 11.0188 25.6009C10.7737 25.9477 10.668 26.3741 10.7229 26.7953C10.8262 27.5876 11.646 33.8762 11.7309 34.5277C11.852 35.4562 12.7026 36.1059 13.6259 35.9856C14.5518 35.8649 15.2045 35.0164 15.0838 34.0906L14.1611 27.0132L17.8392 21.8102H18.7343C18.7127 22.5251 18.5879 26.663 18.563 27.4863C18.5539 27.7883 18.6259 28.0872 18.7714 28.3519L22.4953 35.1238C22.9453 35.942 23.9732 36.2405 24.7913 35.7906C25.6094 35.3406 25.908 34.3127 25.4581 33.4945L21.9565 27.127L22.1448 21.8103L22.145 20.3006ZM22.145 13.8603L24.289 15.3621L22.145 17.9227V13.8603Z"
                              fill="url(#paint1_linear_9778_52425)"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_9778_52425"
                              x1="7.48325"
                              y1="22.9788"
                              x2="28.421"
                              y2="22.9806"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_9778_52425"
                              x1="7.48325"
                              y1="22.9788"
                              x2="28.421"
                              y2="22.9806"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <clipPath id="clip0_9778_52425">
                              <rect width="36" height="36" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_9780_52432)">
                            <path
                              d="M20.2631 7.66563C21.4201 6.50859 21.4201 4.63265 20.2631 3.4756C19.106 2.31856 17.2301 2.31856 16.073 3.47561C14.916 4.63265 14.916 6.50859 16.073 7.66563C17.2301 8.82267 19.106 8.82267 20.2631 7.66563Z"
                              fill="#D4D4D4"
                            />
                            <path
                              d="M22.145 20.3006C22.7396 20.7201 23.563 20.6182 24.0361 20.0533L27.4352 15.9936C27.965 15.3606 27.8394 14.4088 27.1632 13.9352L22.0905 10.3693C21.4797 9.93985 20.7511 9.70941 20.0043 9.70941H17.062L12.5811 6.54883L10.998 1.02132C10.7836 0.273242 10.0035 -0.159418 9.25565 0.054825C8.50771 0.269068 8.07491 1.04913 8.28922 1.79714L10.0088 7.80089C10.0971 8.10916 10.2879 8.3781 10.5497 8.56326L14.6925 11.4931C14.6786 11.6337 14.6827 20.4108 14.6827 20.4179C13.3576 22.2924 12.2442 23.8675 11.0188 25.6009C10.7737 25.9477 10.668 26.3741 10.7229 26.7953C10.8262 27.5876 11.646 33.8762 11.7309 34.5277C11.852 35.4562 12.7026 36.1059 13.6259 35.9856C14.5518 35.8649 15.2045 35.0164 15.0838 34.0906L14.1611 27.0132L17.8392 21.8102H18.7343C18.7127 22.5251 18.5879 26.663 18.563 27.4863C18.5539 27.7883 18.6259 28.0872 18.7714 28.3519L22.4953 35.1238C22.9453 35.942 23.9732 36.2405 24.7913 35.7906C25.6094 35.3406 25.908 34.3127 25.4581 33.4945L21.9565 27.127L22.1448 21.8103L22.145 20.3006ZM22.145 13.8603L24.289 15.3621L22.145 17.9227V13.8603Z"
                              fill="#D4D4D4"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9780_52432">
                              <rect width="36" height="36" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "Dance" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        DANCE
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Stretching"}>
                  <div className="bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Stretching")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Stretching" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <path
                            d="M29.7502 19.7199L26.1645 14.8307C26.0472 14.6706 25.8975 14.5371 25.7253 14.4388L21.4503 11.9073L20.3577 7.28778L23.1243 2.07696C23.4907 1.38757 23.2284 0.531458 22.5387 0.165339C21.8491 -0.200781 20.9932 0.0615178 20.6271 0.75091L17.6105 6.43194C17.4496 6.73517 17.4043 7.08645 17.4834 7.42044L18.8036 13.0012L13.606 22.1075L6.31878 33.3822C5.81011 34.1691 6.03588 35.2194 6.82278 35.7281C7.61132 36.2376 8.66079 36.0094 9.16836 35.2241L16.6374 23.6679L18.8344 24.6943L23.6371 28.8174L23.6234 34.2988C23.6212 35.2359 24.3789 35.9973 25.3158 35.9997H25.3202C26.2551 35.9995 27.0143 35.2428 27.0165 34.3073L27.0321 28.0437C27.0335 27.5477 26.8174 27.0755 26.4408 26.7523L23.2037 23.9733L29.0827 21.8883C29.9746 21.5722 30.3102 20.4835 29.7502 19.7199ZM22.8727 21.0907L24.7637 17.702L26.3458 19.8589L22.8727 21.0907Z"
                            fill="url(#paint0_linear_9780_52437)"
                          />
                          <path
                            d="M26.5051 7.06091C25.0996 6.25863 23.31 6.7478 22.508 8.15323C21.7057 9.55865 22.1949 11.3483 23.6003 12.1503C25.0057 12.9526 26.7951 12.4634 27.5974 11.058C28.3997 9.65259 27.9105 7.86291 26.5051 7.06091Z"
                            fill="url(#paint1_linear_9780_52437)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_9780_52437"
                              x1="5.12467"
                              y1="22.9787"
                              x2="30.8312"
                              y2="22.9815"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_9780_52437"
                              x1="5.12467"
                              y1="22.9787"
                              x2="30.8312"
                              y2="22.9815"
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
                          width="27"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <path
                            d="M29.7502 19.7199L26.1645 14.8307C26.0472 14.6706 25.8975 14.5371 25.7253 14.4388L21.4503 11.9073L20.3577 7.28778L23.1243 2.07696C23.4907 1.38757 23.2284 0.531458 22.5387 0.165339C21.8491 -0.200781 20.9932 0.0615178 20.6271 0.75091L17.6105 6.43194C17.4496 6.73517 17.4043 7.08645 17.4834 7.42044L18.8036 13.0012L13.606 22.1075L6.31878 33.3822C5.81011 34.1691 6.03588 35.2194 6.82278 35.7281C7.61132 36.2376 8.66079 36.0093 9.16836 35.2241L16.6374 23.6679L18.8344 24.6943L23.6371 28.8174L23.6234 34.2988C23.6212 35.2359 24.3789 35.9973 25.3158 35.9997H25.3202C26.2551 35.9995 27.0143 35.2428 27.0165 34.3073L27.0321 28.0437C27.0335 27.5477 26.8174 27.0755 26.4408 26.7523L23.2037 23.9733L29.0827 21.8883C29.9746 21.5722 30.3102 20.4835 29.7502 19.7199ZM22.8727 21.0907L24.7637 17.702L26.3458 19.8589L22.8727 21.0907Z"
                            fill="#D4D4D4"
                          />
                          <path
                            d="M26.383 7.38587C24.9776 6.58359 23.1879 7.07276 22.3859 8.47819C21.5836 9.88362 22.0728 11.6733 23.4782 12.4753C24.8836 13.2776 26.673 12.7884 27.4753 11.383C28.2776 9.97755 27.7884 8.18787 26.383 7.38587Z"
                            fill="#D4D4D4"
                          />
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "Stretching" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        STRETCHING
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/Warmup"}>
                  <div className="bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("Warmup")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "Warmup" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="32"
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
                          height="30"
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
                          <mask id="path-11-inside-1_6624_38064" fill="white">
                            <path d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z" />
                          </mask>
                          <path
                            d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z"
                            fill="#D4D4D4"
                          />
                          <path
                            d="M4.141 30.3723L3.1545 30.2086L3.15445 30.2089L4.141 30.3723ZM6.16263 18.1914L7.14913 18.3551L7.34227 17.1914H6.16263V18.1914ZM5.24969 18.1914V17.1914H4.40198L4.26318 18.0277L5.24969 18.1914ZM3.22806 30.3723L2.24156 30.2086L2.24146 30.2092L3.22806 30.3723ZM4.84413 31.6509L5.22506 32.5755L7.42253 31.6701L5.23882 30.7321L4.84413 31.6509ZM5.12751 30.5361L7.14913 18.3551L5.17612 18.0277L3.1545 30.2086L5.12751 30.5361ZM6.16263 17.1914H5.24969V19.1914H6.16263V17.1914ZM4.26318 18.0277L2.24156 30.2086L4.21457 30.5361L6.23619 18.3551L4.26318 18.0277ZM2.24146 30.2092C2.02154 31.5391 3.04732 32.7499 4.39638 32.7499V30.7499C4.28293 30.7499 4.19609 30.6478 4.21466 30.5355L2.24146 30.2092ZM4.39638 32.7499C4.7294 32.7499 5.01194 32.6633 5.22506 32.5755L4.46319 30.7263C4.39506 30.7544 4.38061 30.7499 4.39638 30.7499V32.7499ZM5.23882 30.7321C5.15505 30.6961 5.11458 30.6141 5.12756 30.5358L3.15445 30.2089C2.98292 31.2444 3.56683 32.1906 4.44943 32.5697L5.23882 30.7321Z"
                            fill="#D4D4D4"
                            mask="url(#path-11-inside-1_6624_38064)"
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
                          <path
                            d="M21 9.25H23.25V10.375H21V9.25Z"
                            fill="#D4D4D4"
                          />
                          <path
                            d="M21 11.5H23.25V12.625H21V11.5Z"
                            fill="#D4D4D4"
                          />
                          <path d="M21 7H23.25V8.125H21V7Z" fill="#D4D4D4" />
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "Warmup" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        WARMUP
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
              <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                <Link href={"/blogCategory/General"}>
                  <div className="bg-[#171717]">
                    <button
                      onClick={() => toggleCategory("General")}
                      className="flex flex-col items-center justify-center"
                    >
                      {singleCategory === "General" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="30"
                          viewBox="0 0 30 36"
                          fill="none"
                        >
                          <path
                            d="M28.8264 13.1545L28.8155 13.1295C28.5939 12.6239 28.0289 12.3607 27.4944 12.5158C27.4941 12.5159 27.4939 12.516 27.4936 12.516L23.3469 13.739L23.0435 13.8284L22.8327 13.5925L19.1697 9.49368L28.8264 13.1545ZM28.8264 13.1545L28.8293 13.1718L28.8429 13.2113C29.041 13.7864 28.7376 14.4088 28.162 14.6075C28.1618 14.6076 28.1616 14.6077 28.1614 14.6077L23.5513 16.1819C23.5511 16.182 23.5508 16.1821 23.5506 16.1821C22.4565 16.5525 21.2519 16.2231 20.5071 15.3476C20.5069 15.3475 20.5068 15.3473 20.5067 15.3472L19.5299 14.1947L18.6484 13.1547V14.518V20.7406V20.8061L18.6653 20.8693L22.0965 33.7506L22.0967 33.7511C22.293 34.4846 21.8651 35.2391 21.1302 35.4466C20.3898 35.6537 19.6256 35.2243 19.419 34.4856L19.4187 34.4844L15.8832 21.9661C15.8829 21.9653 15.8827 21.9644 15.8825 21.9636C15.7952 21.6468 15.5453 21.3835 15.21 21.3025C14.7184 21.1812 14.2214 21.4833 14.0953 21.9677L10.5602 34.4844L10.5601 34.4847C10.353 35.2202 9.5982 35.6485 8.86442 35.4522L8.86357 35.4519C8.12743 35.2563 7.68554 34.4913 7.88246 33.7503L11.3206 20.8696L11.3375 20.8062V20.7406V14.532V13.1688L10.4561 14.2087L9.47926 15.3613C9.47917 15.3614 9.47909 15.3615 9.47901 15.3616C8.73269 16.239 7.52796 16.5723 6.43698 16.1968L6.43644 16.1966L1.83452 14.6182C1.82582 14.6148 1.81779 14.6117 1.81148 14.6093L1.7868 14.5999C1.77308 14.5945 1.76766 14.592 1.7658 14.5911L1.75546 14.5859L1.7449 14.5812C1.18789 14.3342 0.936131 13.6857 1.1778 13.1289C1.39953 12.6237 1.96426 12.3608 2.49854 12.5158C2.49883 12.5159 2.49912 12.516 2.49941 12.516L6.64607 13.739L6.94984 13.8285L7.16065 13.5922L10.8163 9.49368C10.8164 9.49353 10.8165 9.49338 10.8167 9.49323C11.2631 8.99489 11.9008 8.71094 12.5672 8.71094H17.4188C18.0916 8.71094 18.7225 8.99444 19.1694 9.49333L28.8264 13.1545Z"
                            fill="url(#paint0_linear_10800_45107)"
                            stroke="url(#paint1_linear_10800_45107)"
                          />
                          <path
                            d="M18.0281 3.69844C18.0281 5.48715 16.6499 6.89687 14.9984 6.89687C13.3469 6.89687 11.9688 5.48715 11.9688 3.69844C11.9688 1.90973 13.3469 0.5 14.9984 0.5C16.6499 0.5 18.0281 1.90973 18.0281 3.69844Z"
                            fill="url(#paint2_linear_10800_45107)"
                            stroke="url(#paint3_linear_10800_45107)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_10800_45107"
                              x1="-0.522436"
                              y1="25.9486"
                              x2="30.3736"
                              y2="25.9538"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_10800_45107"
                              x1="-0.522436"
                              y1="25.9486"
                              x2="30.3736"
                              y2="25.9538"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_10800_45107"
                              x1="11.1972"
                              y1="4.72141"
                              x2="18.7657"
                              y2="4.72258"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#F43F5E" />
                              <stop offset="1" stopColor="#FB923C" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_10800_45107"
                              x1="11.1972"
                              y1="4.72141"
                              x2="18.7657"
                              y2="4.72258"
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
                          height="30"
                          viewBox="0 0 30 36"
                          fill="none"
                        >
                          <path
                            d="M28.8264 13.1545L28.8155 13.1295C28.5939 12.6239 28.0289 12.3607 27.4944 12.5158C27.4941 12.5159 27.4939 12.516 27.4936 12.516L23.3469 13.739L23.0435 13.8284L22.8327 13.5925L19.1697 9.49368L28.8264 13.1545ZM28.8264 13.1545L28.8293 13.1718L28.8429 13.2113C29.041 13.7864 28.7376 14.4088 28.162 14.6075C28.1618 14.6076 28.1616 14.6077 28.1614 14.6077L23.5513 16.1819C23.5511 16.182 23.5508 16.1821 23.5506 16.1821C22.4565 16.5525 21.2519 16.2231 20.5071 15.3476C20.5069 15.3475 20.5068 15.3473 20.5067 15.3472L19.5299 14.1947L18.6484 13.1547V14.518V20.7406V20.8061L18.6653 20.8693L22.0965 33.7506L22.0967 33.7511C22.293 34.4846 21.8651 35.2391 21.1302 35.4466C20.3898 35.6537 19.6256 35.2243 19.419 34.4856L19.4187 34.4844L15.8832 21.9661C15.8829 21.9653 15.8827 21.9644 15.8825 21.9636C15.7952 21.6468 15.5453 21.3835 15.21 21.3025C14.7184 21.1812 14.2214 21.4833 14.0953 21.9677L10.5602 34.4844L10.5601 34.4847C10.353 35.2202 9.5982 35.6485 8.86442 35.4522L8.86357 35.4519C8.12743 35.2563 7.68554 34.4913 7.88246 33.7503L11.3206 20.8696L11.3375 20.8062V20.7406V14.532V13.1688L10.4561 14.2087L9.47926 15.3613C9.47917 15.3614 9.47909 15.3615 9.47901 15.3616C8.73269 16.239 7.52796 16.5723 6.43698 16.1968L6.43644 16.1966L1.83452 14.6182C1.82582 14.6148 1.81779 14.6117 1.81148 14.6093L1.7868 14.5999C1.77308 14.5945 1.76766 14.592 1.7658 14.5911L1.75546 14.5859L1.7449 14.5812C1.18789 14.3342 0.936131 13.6857 1.1778 13.1289C1.39953 12.6237 1.96426 12.3608 2.49854 12.5158C2.49883 12.5159 2.49912 12.516 2.49941 12.516L6.64607 13.739L6.94984 13.8285L7.16065 13.5922L10.8163 9.49368C10.8164 9.49353 10.8165 9.49338 10.8167 9.49323C11.2631 8.99489 11.9008 8.71094 12.5672 8.71094H17.4188C18.0916 8.71094 18.7225 8.99444 19.1694 9.49333L28.8264 13.1545Z"
                            fill="#D4D4D4"
                            stroke="#D4D4D4"
                          />
                          <path
                            d="M18.0281 3.69844C18.0281 5.48715 16.6499 6.89687 14.9984 6.89687C13.3469 6.89687 11.9688 5.48715 11.9688 3.69844C11.9688 1.90973 13.3469 0.5 14.9984 0.5C16.6499 0.5 18.0281 1.90973 18.0281 3.69844Z"
                            fill="#D4D4D4"
                            stroke="#D4D4D4"
                          />
                        </svg>
                      )}
                      <span
                        className={`h-[30px] ${singleCategory === "General" ? "mid-heading activeLinkForFilter" : ""} text-[16px] text-[#D4D4D4] font-bold leading-normal tracking-[0.36px]`}
                      >
                        GENERAL
                      </span>
                    </button>
                  </div>
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="flex gap-4 xl:gap-7">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger className="filterBtn flex lg:w-[103px] h-[46px] justify-center items-center gap-3 border-[1px] border-solid border-[#FFF] rounded-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M3.99954 3.69844C3.99954 3.48626 3.91525 3.28278 3.76522 3.13275C3.6152 2.98272 3.41171 2.89844 3.19954 2.89844C2.98737 2.89844 2.78388 2.98272 2.63385 3.13275C2.48382 3.28278 2.39954 3.48626 2.39954 3.69844V9.51284C2.15633 9.65327 1.95436 9.85525 1.81395 10.0985C1.67353 10.3417 1.59961 10.6176 1.59961 10.8984C1.59961 11.1793 1.67353 11.4552 1.81395 11.6984C1.95436 11.9416 2.15633 12.1436 2.39954 12.284V13.2984C2.39954 13.5106 2.48382 13.7141 2.63385 13.8641C2.78388 14.0142 2.98737 14.0984 3.19954 14.0984C3.41171 14.0984 3.6152 14.0142 3.76522 13.8641C3.91525 13.7141 3.99954 13.5106 3.99954 13.2984V12.284C4.24275 12.1436 4.44471 11.9416 4.58513 11.6984C4.72555 11.4552 4.79947 11.1793 4.79947 10.8984C4.79947 10.6176 4.72555 10.3417 4.58513 10.0985C4.44471 9.85525 4.24275 9.65327 3.99954 9.51284V3.69844ZM8.79954 3.69844C8.79954 3.48626 8.71525 3.28278 8.56522 3.13275C8.4152 2.98272 8.21171 2.89844 7.99954 2.89844C7.78737 2.89844 7.58388 2.98272 7.43385 3.13275C7.28382 3.28278 7.19954 3.48626 7.19954 3.69844V4.71284C6.95633 4.85327 6.75436 5.05525 6.61395 5.29847C6.47353 5.5417 6.39961 5.81759 6.39961 6.09844C6.39961 6.37928 6.47353 6.65518 6.61395 6.8984C6.75436 7.14162 6.95633 7.3436 7.19954 7.48404V13.2984C7.19954 13.5106 7.28382 13.7141 7.43385 13.8641C7.58388 14.0142 7.78737 14.0984 7.99954 14.0984C8.21171 14.0984 8.4152 14.0142 8.56522 13.8641C8.71525 13.7141 8.79954 13.5106 8.79954 13.2984V7.48404C9.04275 7.3436 9.24471 7.14162 9.38513 6.8984C9.52555 6.65518 9.59947 6.37928 9.59947 6.09844C9.59947 5.81759 9.52555 5.5417 9.38513 5.29847C9.24471 5.05525 9.04275 4.85327 8.79954 4.71284V3.69844ZM12.7995 2.89844C13.0117 2.89844 13.2152 2.98272 13.3652 3.13275C13.5153 3.28278 13.5995 3.48626 13.5995 3.69844V9.51284C13.8428 9.65327 14.0447 9.85525 14.1851 10.0985C14.3255 10.3417 14.3995 10.6176 14.3995 10.8984C14.3995 11.1793 14.3255 11.4552 14.1851 11.6984C14.0447 11.9416 13.8428 12.1436 13.5995 12.284V13.2984C13.5995 13.5106 13.5153 13.7141 13.3652 13.8641C13.2152 14.0142 13.0117 14.0984 12.7995 14.0984C12.5874 14.0984 12.3839 14.0142 12.2339 13.8641C12.0838 13.7141 11.9995 13.5106 11.9995 13.2984V12.284C11.7563 12.1436 11.5544 11.9416 11.4139 11.6984C11.2735 11.4552 11.1996 11.1793 11.1996 10.8984C11.1996 10.6176 11.2735 10.3417 11.4139 10.0985C11.5544 9.85525 11.7563 9.65327 11.9995 9.51284V3.69844C11.9995 3.48626 12.0838 3.28278 12.2339 3.13275C12.3839 2.98272 12.5874 2.89844 12.7995 2.89844Z"
                    fill="#E5E5E5"
                  />
                </svg>
                <span className="text-[20px] hidden lg:block text-[#E5E5E5] font-medium leading-[30px]">
                  Filter
                </span>
              </DialogTrigger>
              <DialogContent
                className="w-[568px] px-6"
                style={{
                  borderRadius: "var(--rounded-2xl, 16px)",
                  border: "1px solid var(--Neutral-700, #404040)",
                  background:
                    "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                  backdropFilter: "blur(100px)",
                }}
              >
                <DialogHeader>
                  <DialogTitle className="flex justify-center items-center border-b-[1px] border-[#a3a3a352]">
                    <h1 className="text-[30px] h-[60px] text-[#FFF] font-bold leading-normal">
                      Refine by
                    </h1>
                  </DialogTitle>
                  <DialogDescription className="flex flex-col items-center justify-center">
                    {/* Scrollable content */}
                    <div className="flex w-full flex-col justify-start items-start py-6 gap-[18px] max-h-[450px] overflow-y-auto">
                      <h2 className="text-[24px] text-[#E5E5E5] font-bold leading-[36px]">
                        Posted at
                      </h2>
                      <div className="flex items-center justify-start w-full gap-2 pb-6 border-b-[1px] border-[#a3a3a352]">
                        <div
                          onClick={() => setPostedAt("Latest")}
                          className={`${postedAt === "Latest" ? "fitness-level-selected" : ""} py-3 px-4 inline-block bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[16px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                        >
                          LATEST
                        </div>
                        <div
                          onClick={() => setPostedAt("Trending")}
                          className={`${postedAt === "Trending" ? "fitness-level-selected" : ""} py-3 px-4 inline-block bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[16px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                        >
                          TRENDING
                        </div>
                        <div
                          onClick={() => setPostedAt("Most popular")}
                          className={`${postedAt === "Most popular" ? "fitness-level-selected" : ""} py-3 px-4 inline-block bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[16px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                        >
                          MOST POPULAR
                        </div>
                      </div>

                      <h2 className="text-[24px] text-[#E5E5E5] font-bold leading-[36px]">
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
                                  ? "fitness-level-selected"
                                  : ""
                              } inline-block mb-1 px-4 py-3 bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[16px] text-[#DADADA] font-normal leading-normal`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {/* Fixed footer section */}
                  <div className="flex items-center justify-between w-full sticky bottom-0 px-4 border-t-[1px] border-[#a3a3a352] pt-4">
                    <span
                      onClick={clearFields}
                      className="text-[24px] text-[#A3A3A3] font-medium leading-[36px] underline cursor-pointer"
                    >
                      Clear all
                    </span>
                    <Button
                      className="filterBtn text-[16px] text-[#FFF] font-semibold leading-[24px] cursor-pointer"
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
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div>
              <CreateBlogBtn />
            </div>
          </div>
        </div>
      </div>

      {/* this is the code for category related blog cards */}
      <section className="w-full flex flex-wrap  justify-center items-start gap-[50px] pt-6 md:pt-[50px] px-4 md:px-[130px] ">
        {filteredBlogs.length <= 0 && blogsByCategory
          ? currentItems.map((blog: any) => (
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
                        className="rounded-[12px] object-cover w-[304px] h-[288px] hover:filter-none black-and-white  transition-all duration-300 ease-in-out"
                      />
                      <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                        <span>{blog.category}</span>
                      </span>
                      {/* <LikeButtonForBlog blogId={blog._id} initialLiked={false} /> */}
                    </div>

                    <div className="w-[304px] flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src={
                              blog.profileImage ? blog.profileImage : AuthorPic
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
                        {formatDate(blog.updatedAt)}| Read time: {blog.readTime}{" "}
                        |
                      </div>
                      <h2 className="text-[16px] text-[#FFF] font-bold leading-normal truncate">
                        {blog.title}
                      </h2>
                      <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal line-clamp-3">
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
            ))
          : currentItems.map((blog: any) => (
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
                        className="rounded-[12px] object-cover w-[304px] h-[288px] hover:filter-none black-and-white  transition-all duration-300 ease-in-out"
                      />
                      <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                        <span>{blog.category}</span>
                      </span>
                      {/* <LikeButtonForBlog blogId={blog._id} initialLiked={false} /> */}
                    </div>

                    <div className="w-[304px] flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src={
                              blog.profileImage ? blog.profileImage : AuthorPic
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
                        {formatDate(blog.updatedAt)}| Read time: {blog.readTime}{" "}
                        |
                      </div>
                      <h2 className="text-[16px] text-[#FFF] font-bold leading-normal truncate">
                        {blog.title}
                      </h2>
                      <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal line-clamp-3">
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
            ))}
      </section>

      {/* pagination section */}
      <Pagination
        className={`${displayBlogs.length <= 9 ? "hidden" : "flex"} cursor-pointer text-[#A3A3A3] text-[24px] font-medium leading-[35px] mb-10`}
      >
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              className={`pagination-link ${currentPage === 1 ? "pagination-disabled" : ""}`}
              onClick={
                currentPage === 1
                  ? undefined
                  : () => handlePageChange(currentPage - 1)
              }
            />
          </PaginationItem>

          {/* First page always visible */}
          <PaginationItem>
            <PaginationLink
              href="#"
              className={
                currentPage === 1
                  ? "pagination-link pagination-link-active"
                  : "pagination-link"
              }
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Show pages in the middle */}
          {currentPage > 5 && totalPages > 7 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((page) => page > 1 && page < totalPages) // Filter middle pages
            .filter((page) => {
              return (
                totalPages <= 7 || // Show all if total pages <= 7
                (page >= currentPage - 1 && page <= currentPage + 1) // Show around current page
              );
            })
            .map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  className={
                    currentPage === page
                      ? "pagination-link pagination-link-active"
                      : "pagination-link"
                  }
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Show ellipsis before last page if needed */}
          {currentPage < totalPages - 3 && totalPages > 7 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page always visible */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                className={
                  currentPage === totalPages
                    ? "pagination-link pagination-link-active"
                    : "pagination-link"
                }
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext
              className={`pagination-link cursor-pointer ${currentPage === totalPages ? "pagination-disabled" : ""}`}
              onClick={
                currentPage === totalPages
                  ? undefined
                  : () => handlePageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
