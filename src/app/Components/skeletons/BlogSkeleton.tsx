import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Main blog skeleton component
const BlogSkeleton = () => {
  return (
    <div className="space-y-4">
      <TitleSkeleton />
      <AuthorSkeleton />
      <ContentSkeleton />
    </div>
  );
};

// Title skeleton component
const TitleSkeleton = () => {
  return (
    <section className="md:flex-[70%] hidden md:flex flex-col justify-center items-center space-y-4">
      {/* Blog Title Skeleton */}
      <Skeleton className="h-14 bg-gray-300 rounded w-3/4 max-w-[500px]"></Skeleton>

      {/* Blog Subtitle Skeleton */}
      <div className="space-y-2 w-full max-w-[700px]">
        <Skeleton className="h-8 bg-gray-200 rounded w-full"></Skeleton>
        <Skeleton className="h-8 bg-gray-200 rounded w-5/6"></Skeleton>
      </div>

      {/* Blog Meta Info Skeleton */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-6 bg-gray-100 rounded w-24"></Skeleton>
        <Skeleton className="h-6 bg-gray-100 rounded w-1"></Skeleton>
        <Skeleton className="h-6 bg-gray-100 rounded w-24"></Skeleton>
      </div>
    </section>
  );
};

// Author skeleton component
const AuthorSkeleton = () => {
  return (
    <section className="flex-[30%] flex flex-col justify-center items-center gap-3">
      <Skeleton
        className="rounded-full w-[70px] md:w-[84px] h-[70px] md:h-[84px]"
      // style={{ width: 84, height: 84 }}
      ></Skeleton>
      <Skeleton className="w-[200px] h-5 md:h-6"></Skeleton>
      <Skeleton className="w-[320px] h-3 md:h-4"></Skeleton>
      <Skeleton className="w-[320px] h-3 md:h-4"></Skeleton>
      <Skeleton style={{ width: 327, height: 1 }}></Skeleton>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-1">
          <Skeleton className="w-[20px] md:w-[23px] h-[20px] md:h-[23px]"></Skeleton>
          <Skeleton className="w-[80px] md:w-[100px] h-[17px] md:h-[19px]"></Skeleton>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Skeleton className="w-[20px] md:w-[23px] h-[20px] md:h-[23px]"></Skeleton>
          <Skeleton className="w-[80px] md:w-[100px] h-[17px] md:h-[19px]"></Skeleton>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Skeleton className="w-[20px] md:w-[23px] h-[20px] md:h-[23px]"></Skeleton>
          <Skeleton className="w-[80px] md:w-[100px] h-[17px] md:h-[19px]"></Skeleton>
        </div>
      </div>
    </section>
  );
};

// Content skeleton component
const ContentSkeleton = () => {
  return (
    <article className="w-full space-y-2 flex flex-col gap-5 mb-5">
      <div role="status" className="max-w-[750px] animate-pulse">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[900px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[550px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[650px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[580px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[860px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[550px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[650px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[580px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

        <span className="sr-only">Loading...</span>
      </div>

      {/* <Skeleton className="rounded-[10px] h-[450px] w-[693px]"></Skeleton> */}
      <div className="flex animate-pulse items-center justify-center md:w-[693px] h-[450px] bg-gray-300 rounded-[10px] sm:w-96 dark:bg-gray-700 my-6">
        <svg
          className="w-12 h-12 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      <div role="status" className="max-w-[750px] animate-pulse">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[900px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[550px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[650px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[580px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[860px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[550px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[650px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[580px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

        <span className="sr-only">Loading...</span>
      </div>

      <div className="flex w-full flex-wrap justify-start items-center gap-6 md:gap-10 my-8">
        {Array.from("abcdef").map((item) => (
          <Skeleton
            key={item}
            className="h-[40px] md:h-[50px] w-[140px] md:w-[184px]  px-4 md:px-[45px]  rounded-[48px]"
          ></Skeleton>
        ))}
      </div>
    </article>
  );
};

const TitleSkeletonForMobile = () => {
  return (
    <div className="flex md:hidden flex-col gap-2 mb-4">
      <Skeleton className="h-5 w-[150px]"></Skeleton>
      <Skeleton className="h-3 w-[300px]"></Skeleton>
      <Skeleton className="h-3 w-[200px]"></Skeleton>
      <div className="flex justify-start items-center gap-3">
        <Skeleton className="h-4 w-[70px]"></Skeleton>
        <Skeleton className="h-4 w-[70px]"></Skeleton>
      </div>
    </div>
  );
};

const InstagramPostSkeleton = () => {
  return (
    <div
      role="status"
      className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          className="w-8 sm:w-10 h-8 sm:h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 sm:w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32 sm:w-40"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32 sm:w-40"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 sm:w-40"></div>
      <div className="flex items-center mt-4">
        <svg
          className="w-8 sm:w-10 h-8 sm:h-10 me-3 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 sm:w-32 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 sm:w-48"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>

  );
};

const BlogCardsRowSkeleton = () => {
  return (
    <div className="flex justify-between gap-5 xl:gap-10 mb-[60px]">
      {Array.from("nji").map((item) => (
        <div
          key={item}
          role="status"
          className="w-full md:max-w-xs xl:max-w-sm p-4  rounded shadow animate-pulse "
        >
          <div className="flex items-center justify-center h-[288px] w-[300px] xl:w-[304px] mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-center mt-4">
            <svg
              className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

const RecommendedVids = () => {
  return (
    <div className="flex flex-col justify-between gap-5 xl:gap-10 mb-[60px]">
      {Array.from("nji").map((item) => (
        <div
          key={item}
          role="status"
          className="w-full flex gap-2 md:max-w-xs xl:max-w-sm  rounded shadow animate-pulse "
        >
          <div className="flex items-center justify-center h-[128px] w-[150px] xl:w-[160px] mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex mb-3">
              <svg
                className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px] mb-1"></div>
                <div className="w-[150px] h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
                <div className="w-[150px] h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-[200px] mb-1.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-[200px] mb-1.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-[200px] mb-1.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-[200px] mb-1.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-[200px] "></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

const HeaderImageSkeleton = () => {
  return (
    <div className="w-full max-w-[1260px] h-[444px] bg-gray-300 animate-pulse rounded-lg md:h-[444px] sm:h-[200px]" />
  );
};

const ResponsiveImageSkeleton = () => {
  return (
    <div className="w-[84px] md:w-[200px] h-[84px] md:h-[200px] rounded-full bg-gray-300 animate-pulse" />
  );
};

export {
  BlogSkeleton,
  TitleSkeleton,
  AuthorSkeleton,
  ContentSkeleton,
  TitleSkeletonForMobile,
  InstagramPostSkeleton,
  BlogCardsRowSkeleton,
  RecommendedVids,
  HeaderImageSkeleton,
  ResponsiveImageSkeleton
};

// Default export
export default BlogSkeleton;
