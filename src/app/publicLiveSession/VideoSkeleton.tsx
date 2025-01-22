import React from "react";

const VideoSkeleton = () => {
  return (
    <div className="mt-[52px] w-full px-4 md:px-6 lg:px-8">
      {/* Video Skeleton */}
      <div
        role="status"
        className="flex items-center justify-center w-full sm:max-w-[450px] md:max-w-[750px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[486px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>

      {/* Metadata Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-3/4 md:w-1/2 lg:w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-1/4 md:w-1/6 lg:w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-1/6 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-1/6 animate-pulse"></div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
