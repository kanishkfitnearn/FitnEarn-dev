import React from "react";
import VideoPlayerHLS from "@/app/Components/VideoPlayer";
// import { useSearchParams } from "next/navigation";
import Image from "next/image";
import LikeButton from "@/app/Components/LikeButton";
import LikeRecommendedVid from "@/app/workout/likeRecommendVid";
import LikeDetailedVidDesktop from "../likeDetailedVidDesktop";
import UserAvatar from "../../../../public/userAvatar.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import VideoPlayer from "@/app/Components/VideoPlayer";
import Link from "next/link";
import VideoReportComponent from "../handleReport";
// import Cookies from "js-cookie";
import { cookies } from "next/headers";
import LikeForDetailVideo from "../likeForDetailVideo";
import ShareVideoComponent from "../shareVideo";
import ShareVidForDesktop from "../shareVidForDesktop";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecommendedVideosCorousel from "../RecommendedVideoCorousel";
import { formatDate } from "date-fns";

const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
async function fetchVideo(params: { vidId: string }, userId?: string) {
  const baseUrl = `${apiEndpoint}/api/fitnearn/web/users/workout/video/${params.vidId}`;
  const url = userId ? `${baseUrl}?userId=${userId}` : baseUrl;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch video data");
    }
    return res.json();
  } catch (error) {
    //console.error("Error fetching video:", error);
    throw new Error("Failed to load video data. Please try again later.");
  }
}

async function fetchVideoByCategory(


  category: string,
  userId: string | undefined,
) {
  //console.log("in fetchVideoByCategory function", userId, category);
  try {

    const res = await fetch(
      userId
        ? `${apiEndpoint}/api/fitnearn/web/users/workout/recommended?category=${category}&userId=${userId}`
        : `${apiEndpoint}/api/fitnearn/web/users/workout/recommended?category=${category}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch category data");
    }
    return res.json();
  } catch (error) {
    //console.error("Error fetching category data:", error);
    throw new Error("Failed to load related videos. Please try again later.");
  }
}

function formatViewCount(views: number) {
  if (views >= 1_000_000) {
    const millions = views / 1_000_000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  } else if (views >= 1_000) {
    const thousands = views / 1_000;
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
  } else {
    return views.toString(); // Less than 1 thousand
  }
}

const calories = [
  { name: "<20", value: "below_20" },
  { name: "20-49", value: "range_20_49" },
  { name: "50-99", value: "range_50_99" },
  { name: "100-149", value: "range_100_149" },
  { name: "150-199", value: "range_150_199" },
  { name: "200-499", value: "range_200_499" },
  { name: "500+", value: "above_500" },
];

function getCaloriesDisplayValue(backendValue: string) {
  const calorieEntry = calories.find((cal) => cal.value === backendValue);
  return calorieEntry ? calorieEntry.name : backendValue;
}

const durations = [
  { name: "<5 min", value: "below_5" },
  { name: "5-10 min", value: "range_5_10" },
  { name: "10-15 min", value: "range_10_15" },
  { name: "15-20 min", value: "range_15_20" },
  { name: "20-25 min", value: "range_20_25" },
  { name: "25-30 min", value: "range_25_30" },
  { name: "30-35 min", value: "range_30_35" },
  { name: "35-40 min", value: "range_35_40" },
  { name: ">40 min", value: "above_40" },
];

function getDurationDisplayValue(backendValue: string) {
  const durationEntry = durations.find((dur) => dur.value === backendValue);
  return durationEntry ? durationEntry.name : backendValue;
}

export default async function WorkoutVideo({
  params,
  searchParams,
}: {
  params: { vidId: string };
  searchParams: { playing?: string };
}) {
  //console.log("params", params);
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")?.value;
  //console.log("userId from detail video", userId);
  //console.log("should we play a video?", searchParams.playing);

  try {
    const data = await fetchVideo(params, userId);
    const likeOrNot = data.isLiked;
    console.log("likeOrNot:", likeOrNot);
    const videoData = data.data;
    const likeCount = videoData.likes;

    //console.log("VideoData:", videoData);

    // Fetch videos by category if the video data exists
    const details = await fetchVideoByCategory(videoData.category, userId);
    const categoryVideoData = details.data;

    //console.log("CategoryVideo Data:", categoryVideoData);

    const showView = await formatViewCount(videoData.views);
    //console.log("Show View:", showView);

    return (
      <div className="flex flex-wrap  md:flex-nowrap pt-[72px] md:pt-[72px] px-3 md:px-[72px]">
        {/* <div className="flex flex-col items-center justify-center w-full mt-7">
          <div className="p-1 video-wrap-div">
            <VideoPlayerHLS videoData={videoData} />
          </div>
        </div> */}

        <div className="w-full flex flex-[70%] flex-col justify-start items-start mt-0 md:mt-7">
          {/* <div className="video-wrap-div relative w-[100%] md:w-[89%] h-[200px] md:h-[480px]"> */}
          <div className="video-wrap-div relative w-[100%] md:w-[89%]">
            <VideoPlayer videoData={videoData} isPlay={searchParams.playing} />
          </div>

          <div className="flex items-start justify-between w-full mt-4 md:hidden md:justify-end md:gap-2 xl:gap-6">
            <div className="flex items-center justify-center gap-2">
              <LikeDetailedVidDesktop
                videoId={params.vidId}
                initialLiked={likeOrNot}
                initialLikeCount={likeCount}
              />
            </div>
            <ShareVideoComponent />
            <div className="ml-[150px] md:ml-0 mr-[10px] md:mr-0 md:pt-2">
              <Popover>
                <PopoverTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[20] md:w-[24] h-[20] md:h-[24]"
                    width="6"
                    height="20"
                    viewBox="0 0 6 24"
                    fill="none"
                  >
                    <path
                      d="M0.746094 21.6C0.746094 20.9635 0.99895 20.353 1.44904 19.9029C1.89912 19.4529 2.50957 19.2 3.14609 19.2C3.78261 19.2 4.39306 19.4529 4.84315 19.9029C5.29324 20.353 5.54609 20.9635 5.54609 21.6C5.54609 22.2365 5.29324 22.847 4.84315 23.2971C4.39306 23.7471 3.78261 24 3.14609 24C2.50957 24 1.89912 23.7471 1.44904 23.2971C0.99895 22.847 0.746094 22.2365 0.746094 21.6ZM0.746094 12C0.746094 11.3635 0.99895 10.753 1.44904 10.3029C1.89912 9.85286 2.50957 9.6 3.14609 9.6C3.78261 9.6 4.39306 9.85286 4.84315 10.3029C5.29324 10.753 5.54609 11.3635 5.54609 12C5.54609 12.6365 5.29324 13.247 4.84315 13.6971C4.39306 14.1471 3.78261 14.4 3.14609 14.4C2.50957 14.4 1.89912 14.1471 1.44904 13.6971C0.99895 13.247 0.746094 12.6365 0.746094 12ZM0.746094 2.4C0.746094 1.76348 0.99895 1.15303 1.44904 0.702944C1.89912 0.252856 2.50957 0 3.14609 0C3.78261 0 4.39306 0.252856 4.84315 0.702944C5.29324 1.15303 5.54609 1.76348 5.54609 2.4C5.54609 3.03652 5.29324 3.64697 4.84315 4.09706C4.39306 4.54714 3.78261 4.8 3.14609 4.8C2.50957 4.8 1.89912 4.54714 1.44904 4.09706C0.99895 3.64697 0.746094 3.03652 0.746094 2.4Z"
                      fill="url(#paint0_linear_5441_25702)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_5441_25702"
                        x1="3.14609"
                        y1="0"
                        x2="3.14609"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E3206D" />
                        <stop offset="1" stopColor="#F16A33" />
                      </linearGradient>
                    </defs>
                  </svg>
                </PopoverTrigger>
                <PopoverContent className="w-[232px] bg-[#262626] border-[1px] border-[#404040] rounded-[16px] py-3 px-5 flex flex-col md:mt-5 md:mr-[70px]">
                  <VideoReportComponent videoId={params.vidId} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex max-w-[90%] flex-wrap-reverse xl:flex-nowrap justify-between mt-5 md:mt-10">
            {/* left part */}
            <div className="flex items-center justify-center gap-4">
              <Image
                src={UserAvatar}
                alt="avatar"
                className="w-[40px] md:w-[80px] h-[40px] md:h-[80px]"
                width={80}
                height={80}
              />
              <div className="flex flex-col">
                <div className="flex items-center justify-between max-w-full">
                  <h2 className="text-[28px] max-w-[300px] md:max-w-[450px] text-[#FFFFFF] font-normal leading-normal truncate overflow-hidden whitespace-nowrap text-ellipsis">
                    {videoData.title}
                  </h2>
                  <div className="items-start justify-between hidden mb-3 md:flex md:justify-end md:gap-2 xl:gap-6 md:mb-0">
                    <div className="flex items-center justify-center gap-2">
                      <LikeForDetailVideo
                        videoId={params.vidId}
                        initialLiked={likeOrNot}
                        initialLikeCount={likeCount}
                      />
                    </div>
                    <ShareVidForDesktop />
                    <div className="ml-[150px] md:ml-0 mr-[10px] md:mr-0 md:pt-2">
                      <Popover>
                        <PopoverTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="4"
                            height="20"
                            viewBox="0 0 4 20"
                            fill="none"
                          >
                            <path
                              d="M0 18C0 17.4696 0.210714 16.9609 0.585786 16.5858C0.960859 16.2107 1.46957 16 2 16C2.53043 16 3.03914 16.2107 3.41421 16.5858C3.78929 16.9609 4 17.4696 4 18C4 18.5304 3.78929 19.0391 3.41421 19.4142C3.03914 19.7893 2.53043 20 2 20C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18ZM0 10C0 9.46957 0.210714 8.96086 0.585786 8.58579C0.960859 8.21071 1.46957 8 2 8C2.53043 8 3.03914 8.21071 3.41421 8.58579C3.78929 8.96086 4 9.46957 4 10C4 10.5304 3.78929 11.0391 3.41421 11.4142C3.03914 11.7893 2.53043 12 2 12C1.46957 12 0.960859 11.7893 0.585786 11.4142C0.210714 11.0391 0 10.5304 0 10ZM0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585786C3.78929 0.960859 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210714 3.03914 0 2.53043 0 2Z"
                              fill="url(#paint0_linear_5097_22094)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_5097_22094"
                                x1="2"
                                y1="0"
                                x2="2"
                                y2="20"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#E3206D" />
                                <stop offset="1" stopColor="#F16A33" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </PopoverTrigger>
                        <PopoverContent className="w-[232px] bg-[#262626] border-[1px] border-[#404040] rounded-[16px] py-3 px-5 flex flex-col md:mt-5 md:mr-[70px]">
                          <VideoReportComponent videoId={params.vidId} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="flex-wrap items-center justify-start hidden gap-4 md:flex">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.0003 4.16797C5.51033 4.16797 1.66699 8.61464 1.66699 10.0013C1.66699 11.453 4.62199 15.8346 10.0003 15.8346C15.3787 15.8346 18.3337 11.453 18.3337 10.0013C18.3337 8.61464 14.4903 4.16797 10.0003 4.16797ZM10.0003 12.5013C9.50587 12.5013 9.02252 12.3547 8.6114 12.08C8.20028 11.8053 7.87985 11.4148 7.69063 10.958C7.50141 10.5012 7.4519 9.99853 7.54836 9.51358C7.64483 9.02862 7.88293 8.58317 8.23256 8.23353C8.58219 7.8839 9.02765 7.6458 9.5126 7.54934C9.99755 7.45288 10.5002 7.50238 10.957 7.6916C11.4138 7.88082 11.8043 8.20125 12.079 8.61238C12.3537 9.0235 12.5003 9.50685 12.5003 10.0013C12.5003 10.6643 12.2369 11.3002 11.7681 11.7691C11.2993 12.2379 10.6634 12.5013 10.0003 12.5013Z"
                        fill="url(#paint0_linear_11152_68646)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11152_68646"
                          x1="1.02597"
                          y1="11.6148"
                          x2="18.8946"
                          y2="11.6189"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {showView}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M11.6663 2.1888C11.6663 3.15994 11.8454 4.05512 12.2035 4.87435C12.5615 5.69358 13.0769 6.4477 13.7497 7.13672C14.4224 7.82574 14.9378 8.57986 15.2959 9.39909C15.654 10.2183 15.833 11.1135 15.833 12.0846C15.833 12.6597 15.7598 13.2131 15.6133 13.7448C15.4668 14.2765 15.2552 14.7729 14.9785 15.234C14.7018 15.6952 14.3763 16.1184 14.002 16.5036C13.6276 16.8888 13.2071 17.2143 12.7406 17.4801C12.274 17.746 11.7748 17.9549 11.2432 18.1068C10.7115 18.2587 10.1581 18.3346 9.58301 18.3346C9.00792 18.3346 8.45454 18.2614 7.92285 18.1149C7.39117 17.9684 6.89475 17.7568 6.43359 17.4801C5.97244 17.2035 5.54926 16.8779 5.16406 16.5036C4.77886 16.1292 4.45334 15.7088 4.1875 15.2422C3.92166 14.7756 3.71278 14.2765 3.56087 13.7448C3.40896 13.2131 3.33301 12.6597 3.33301 12.0846C3.33301 11.6289 3.38184 11.1813 3.47949 10.7419C3.57715 10.3024 3.71821 9.88194 3.90267 9.48047C4.08713 9.07899 4.315 8.69651 4.58626 8.33301C4.85753 7.96951 5.16406 7.64128 5.50586 7.34831C5.54384 7.55447 5.59538 7.76606 5.66048 7.98307C5.72559 8.20009 5.80154 8.4171 5.88835 8.63411C5.97515 8.85113 6.07823 9.05729 6.19759 9.2526C6.31695 9.44792 6.44173 9.62967 6.57194 9.79785C6.68045 9.93349 6.82151 10.0013 6.99512 10.0013C7.1416 10.0013 7.26367 9.94976 7.36133 9.84668C7.45898 9.7436 7.51053 9.61881 7.51595 9.47233C7.51595 9.41265 7.50781 9.3584 7.49154 9.30957C7.47526 9.26074 7.44813 9.21191 7.41016 9.16309C7.25825 8.94065 7.12533 8.72092 7.01139 8.50391C6.89746 8.28689 6.79709 8.06445 6.71029 7.83659C6.62348 7.60872 6.56109 7.37272 6.52311 7.12858C6.48513 6.88444 6.46343 6.62674 6.45801 6.35547C6.45801 5.70985 6.58008 5.10221 6.82422 4.53255C7.06836 3.96289 7.40473 3.46647 7.83333 3.04329C8.26194 2.62012 8.75835 2.28646 9.32259 2.04232C9.88683 1.79818 10.4945 1.67339 11.1455 1.66797H11.6663V2.1888Z"
                        fill="url(#paint0_linear_11152_68649)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11152_68649"
                          x1="2.85224"
                          y1="12.3063"
                          x2="16.2537"
                          y2="12.3079"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal whitespace-nowrap">
                      {/* {videoData.calories} cal */}
                      {getCaloriesDisplayValue(videoData.calories)} cal
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <rect
                        x="0.666992"
                        y="11.3359"
                        width="3.56391"
                        height="5.99166"
                        fill="url(#paint0_linear_11191_25565)"
                      />
                      <rect
                        x="5.45182"
                        y="9.35807"
                        width="2.73058"
                        height="7.55499"
                        fill="url(#paint1_linear_11191_25565)"
                        stroke="url(#paint2_linear_11191_25565)"
                        strokeWidth="0.833333"
                      />
                      <rect
                        x="9.81999"
                        y="5.76432"
                        width="2.73058"
                        height="11.15"
                        fill="url(#paint3_linear_11191_25565)"
                        stroke="url(#paint4_linear_11191_25565)"
                        strokeWidth="0.833333"
                      />
                      <rect
                        x="14.1872"
                        y="1.08073"
                        width="2.72912"
                        height="15.8333"
                        stroke="url(#paint5_linear_11191_25565)"
                        strokeWidth="0.833333"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11191_25565"
                          x1="0.529919"
                          y1="15.1604"
                          x2="4.35086"
                          y2="15.1608"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_11191_25565"
                          x1="4.89808"
                          y1="14.2957"
                          x2="8.71902"
                          y2="14.2959"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_11191_25565"
                          x1="4.89808"
                          y1="14.2957"
                          x2="8.71902"
                          y2="14.2959"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_11191_25565"
                          x1="9.26625"
                          y1="12.9966"
                          x2="13.0872"
                          y2="12.9968"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_11191_25565"
                          x1="9.26625"
                          y1="12.9966"
                          x2="13.0872"
                          y2="12.9968"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint5_linear_11191_25565"
                          x1="13.6335"
                          y1="11.3024"
                          x2="17.4529"
                          y2="11.3025"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {videoData.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15.5252 16.6654H3.68411C3.37007 16.6654 3.06888 16.5337 2.84682 16.2992C2.62475 16.0648 2.5 15.7469 2.5 15.4154V4.58203C2.5 4.25051 2.62475 3.93257 2.84682 3.69815C3.06888 3.46373 3.37007 3.33203 3.68411 3.33203C3.99816 3.33203 4.29934 3.46373 4.52141 3.69815C4.74347 3.93257 4.86822 4.25051 4.86822 4.58203V14.1654H15.5252C15.8393 14.1654 16.1405 14.2971 16.3625 14.5315C16.5846 14.7659 16.7093 15.0838 16.7093 15.4154C16.7093 15.7469 16.5846 16.0648 16.3625 16.2992C16.1405 16.5337 15.8393 16.6654 15.5252 16.6654Z"
                        fill="url(#paint0_linear_11449_61248)"
                      />
                      <path
                        d="M6.84174 13.332C6.62184 13.332 6.40628 13.2674 6.21922 13.1453C6.03216 13.0233 5.88099 12.8487 5.78264 12.641C5.6843 12.4334 5.64267 12.201 5.66242 11.9698C5.68217 11.7386 5.76251 11.5177 5.89445 11.332L8.26268 7.9987C8.44429 7.74311 8.71172 7.57063 9.01004 7.5167C9.30836 7.46276 9.61492 7.53147 9.86676 7.7087L11.2016 8.64786L12.9312 5.6062C13.0136 5.46113 13.1231 5.33523 13.2529 5.23612C13.3827 5.13701 13.5303 5.06674 13.6866 5.02958C13.8429 4.99242 14.0048 4.98913 14.1623 5.01992C14.3199 5.05071 14.4698 5.11493 14.6032 5.2087L16.9714 6.87536C17.2331 7.05925 17.4149 7.34535 17.4768 7.67072C17.5387 7.9961 17.4756 8.3341 17.3014 8.61036C17.1272 8.88663 16.8562 9.07854 16.548 9.14386C16.2397 9.20919 15.9196 9.14258 15.6579 8.9587L14.323 8.01953L12.5934 11.0612C12.511 11.2063 12.4015 11.3322 12.2717 11.4313C12.1419 11.5304 11.9943 11.6007 11.838 11.6378C11.6817 11.675 11.5199 11.6783 11.3623 11.6475C11.2048 11.6167 11.0548 11.5525 10.9214 11.4587L9.48547 10.4479L7.78903 12.832C7.67874 12.9873 7.53572 13.1133 7.37129 13.2001C7.20687 13.2868 7.02557 13.332 6.84174 13.332Z"
                        fill="url(#paint1_linear_11449_61248)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11449_61248"
                          x1="1.92308"
                          y1="11.8427"
                          x2="18.0049"
                          y2="11.8456"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_11449_61248"
                          x1="1.92308"
                          y1="11.8427"
                          x2="18.0049"
                          y2="11.8456"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {videoData.intensityLevel
                        ? videoData.intensityLevel
                        : "None"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.0003 1.66797C8.35215 1.66797 6.74099 2.15671 5.37058 3.07239C4.00017 3.98807 2.93206 5.28956 2.30133 6.81227C1.6706 8.33499 1.50558 10.0105 1.82712 11.6271C2.14866 13.2436 2.94234 14.7284 4.10777 15.8939C5.27321 17.0593 6.75807 17.853 8.37458 18.1745C9.99109 18.4961 11.6666 18.331 13.1894 17.7003C14.7121 17.0696 16.0136 16.0015 16.9292 14.6311C17.8449 13.2606 18.3337 11.6495 18.3337 10.0013C18.3312 7.79191 17.4525 5.6737 15.8902 4.11143C14.3279 2.54915 12.2097 1.6704 10.0003 1.66797ZM13.3187 13.3196C13.1624 13.4759 12.9505 13.5636 12.7295 13.5636C12.5085 13.5636 12.2966 13.4759 12.1403 13.3196L9.412 10.5913C9.25612 10.4344 9.16813 10.2225 9.167 10.0013V6.66797C9.167 6.44696 9.25479 6.23499 9.41107 6.07871C9.56735 5.92243 9.77932 5.83464 10.0003 5.83464C10.2213 5.83464 10.4333 5.92243 10.5896 6.07871C10.7459 6.23499 10.8337 6.44696 10.8337 6.66797V9.6563L13.3187 12.1413C13.4749 12.2976 13.5627 12.5095 13.5627 12.7305C13.5627 12.9514 13.4749 13.1634 13.3187 13.3196Z"
                        fill="url(#paint0_linear_11152_68658)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11152_68658"
                          x1="1.02597"
                          y1="12.3063"
                          x2="18.8946"
                          y2="12.3092"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {/* {videoData.duration} min */}
                      {videoData.durationRange
                        ? getDurationDisplayValue(videoData.durationRange)
                        : "None"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M16.6667 8.33333H16.0358L15.4467 6.91083L15.8925 6.46417C16.0487 6.30789 16.1365 6.09597 16.1365 5.875C16.1365 5.65403 16.0487 5.44211 15.8925 5.28583L14.7142 4.1075C14.5579 3.95127 14.346 3.86351 14.125 3.86351C13.904 3.86351 13.6921 3.95127 13.5358 4.1075L13.0892 4.55333L11.6667 3.96417V3.33333C11.6667 3.11232 11.5789 2.90036 11.4226 2.74408C11.2663 2.5878 11.0543 2.5 10.8333 2.5H9.16667C8.94565 2.5 8.73369 2.5878 8.57741 2.74408C8.42113 2.90036 8.33333 3.11232 8.33333 3.33333V3.96417L6.91083 4.55333L6.46417 4.1075C6.30789 3.95127 6.09597 3.86351 5.875 3.86351C5.65403 3.86351 5.44211 3.95127 5.28583 4.1075L4.1075 5.28583C3.95127 5.44211 3.86351 5.65403 3.86351 5.875C3.86351 6.09597 3.95127 6.30789 4.1075 6.46417L4.55417 6.91083L3.96417 8.33333H3.33333C3.11232 8.33333 2.90036 8.42113 2.74408 8.57741C2.5878 8.73369 2.5 8.94565 2.5 9.16667V10.8333C2.5 11.0543 2.5878 11.2663 2.74408 11.4226C2.90036 11.5789 3.11232 11.6667 3.33333 11.6667H3.96417C4.24833 12.3525 4.27 12.4033 4.55333 13.0892L4.1075 13.5358C3.95127 13.6921 3.86351 13.904 3.86351 14.125C3.86351 14.346 3.95127 14.5579 4.1075 14.7142L5.28583 15.8925C5.44211 16.0487 5.65403 16.1365 5.875 16.1365C6.09597 16.1365 6.30789 16.0487 6.46417 15.8925L6.91083 15.4467L8.33333 16.0358V16.6667C8.33333 16.8877 8.42113 17.0996 8.57741 17.2559C8.73369 17.4122 8.94565 17.5 9.16667 17.5H10.8333C11.0543 17.5 11.2663 17.4122 11.4226 17.2559C11.5789 17.0996 11.6667 16.8877 11.6667 16.6667V16.0358L13.0892 15.4458L13.5358 15.8925C13.6921 16.0487 13.904 16.1365 14.125 16.1365C14.346 16.1365 14.5579 16.0487 14.7142 15.8925L15.8925 14.7142C16.0487 14.5579 16.1365 14.346 16.1365 14.125C16.1365 13.904 16.0487 13.6921 15.8925 13.5358L15.4467 13.0892L16.0358 11.6667H16.6667C16.8877 11.6667 17.0996 11.5789 17.2559 11.4226C17.4122 11.2663 17.5 11.0543 17.5 10.8333V9.16667C17.5 8.94565 17.4122 8.73369 17.2559 8.57741C17.0996 8.42113 16.8877 8.33333 16.6667 8.33333ZM10 13.3333C9.34073 13.3333 8.69626 13.1378 8.1481 12.7716C7.59994 12.4053 7.17269 11.8847 6.9204 11.2756C6.66811 10.6665 6.6021 9.9963 6.73072 9.3497C6.85933 8.7031 7.1768 8.10915 7.64298 7.64298C8.10915 7.1768 8.7031 6.85933 9.3497 6.73072C9.9963 6.6021 10.6665 6.66811 11.2756 6.9204C11.8847 7.17269 12.4053 7.59994 12.7716 8.1481C13.1378 8.69626 13.3333 9.34073 13.3333 10C13.3333 10.8841 12.9821 11.7319 12.357 12.357C11.7319 12.9821 10.8841 13.3333 10 13.3333Z"
                        fill="url(#paint0_linear_11152_68661)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11152_68661"
                          x1="1.92308"
                          y1="12.0745"
                          x2="18.0049"
                          y2="12.0771"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {videoData.equipment ? videoData.equipment : "None"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M8.91699 10.6042L8.20866 9.54167C8.13921 9.43056 8.04199 9.34028 7.91699 9.27083C7.79199 9.20139 7.66005 9.16667 7.52116 9.16667H2.06283C1.91005 8.80556 1.80588 8.45833 1.75033 8.125C1.69477 7.79167 1.66699 7.44444 1.66699 7.08333C1.66699 5.77778 2.10449 4.6875 2.97949 3.8125C3.85449 2.9375 4.94477 2.5 6.25033 2.5C6.97255 2.5 7.66005 2.65278 8.31283 2.95833C8.9656 3.26389 9.5281 3.69444 10.0003 4.25C10.4725 3.69444 11.035 3.26389 11.6878 2.95833C12.3406 2.65278 13.0281 2.5 13.7503 2.5C15.0559 2.5 16.1462 2.9375 17.0212 3.8125C17.8962 4.6875 18.3337 5.77778 18.3337 7.08333C18.3337 7.44444 18.3059 7.79167 18.2503 8.125C18.1948 8.45833 18.0906 8.80556 17.9378 9.16667H12.9795L11.542 7.04167C11.4587 6.91667 11.3512 6.82306 11.2195 6.76083C11.0878 6.69861 10.9453 6.66722 10.792 6.66667C10.6114 6.66667 10.4553 6.71889 10.3237 6.82333C10.192 6.92778 10.0981 7.06306 10.042 7.22917L8.91699 10.6042ZM10.0003 17.7917L8.79199 16.7083C7.33366 15.4028 6.13921 14.2847 5.20866 13.3542C4.2781 12.4236 3.54894 11.5833 3.02116 10.8333H7.02116L8.45866 12.9583C8.54199 13.0833 8.64977 13.1772 8.78199 13.24C8.91421 13.3028 9.05644 13.3339 9.20866 13.3333C9.38921 13.3333 9.5456 13.2814 9.67782 13.1775C9.81005 13.0736 9.90366 12.9381 9.95866 12.7708L11.0837 9.375L11.8128 10.4583C11.8823 10.5694 11.9795 10.6597 12.1045 10.7292C12.2295 10.7986 12.3614 10.8333 12.5003 10.8333H16.9795C16.4517 11.5833 15.7225 12.4236 14.792 13.3542C13.8614 14.2847 12.667 15.4028 11.2087 16.7083L10.0003 17.7917Z"
                        fill="url(#paint0_linear_11152_68664)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11152_68664"
                          x1="1.02597"
                          y1="12.2606"
                          x2="18.8946"
                          y2="12.2638"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {videoData.category}
                    </span>
                  </div>
                  {videoData.contentType === 'Premium' ?
                    <div className="flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="url(#paint0_linear_13634_36142)" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.6393 13.3211L14.8047 8.88573L13.1016 9.97035C12.762 10.1869 12.351 10.2616 11.957 10.1785C11.5629 10.0953 11.2171 9.86098 10.9939 9.52573L9.87315 7.84189L8.75161 9.5265C8.52829 9.86162 8.18247 10.0958 7.78839 10.1788C7.39432 10.2618 6.98342 10.1869 6.64392 9.97035L4.94161 8.88573L6.107 13.3211H13.6393ZM5.35469 8.2365C4.76469 7.86035 4.0193 8.40419 4.197 9.08112L5.36315 13.5165C5.40632 13.6809 5.50272 13.8264 5.63729 13.9302C5.77187 14.034 5.93703 14.0903 6.107 14.0903H13.6393C13.8093 14.0903 13.9744 14.034 14.109 13.9302C14.2436 13.8264 14.34 13.6809 14.3831 13.5165L15.5493 9.08112C15.7262 8.40419 14.9816 7.86112 14.3916 8.2365L12.6885 9.32112C12.5188 9.42945 12.3134 9.46693 12.1164 9.42551C11.9193 9.38409 11.7464 9.26708 11.6347 9.09958L10.5131 7.41496C10.4429 7.30961 10.3477 7.22323 10.2361 7.16349C10.1244 7.10374 9.99977 7.07248 9.87315 7.07248C9.74652 7.07248 9.62186 7.10374 9.51021 7.16349C9.39857 7.22323 9.3034 7.30961 9.23315 7.41496L8.11161 9.09958C8.00001 9.2672 7.82713 9.38438 7.63009 9.42594C7.43305 9.46751 7.22756 9.43015 7.05777 9.32189L5.35469 8.2365Z" fill="white" />
                        <path d="M10.5991 5.72615C10.5993 5.91895 10.5229 6.10392 10.3867 6.24039C10.2505 6.37686 10.0657 6.45364 9.87293 6.45385C9.68014 6.45405 9.49516 6.37766 9.35869 6.24148C9.22222 6.1053 9.14544 5.92048 9.14524 5.72769C9.14503 5.5349 9.22143 5.34992 9.3576 5.21346C9.49378 5.07699 9.6786 5.0002 9.87139 5C10.0642 4.9998 10.2492 5.07619 10.3856 5.21237C10.5221 5.34855 10.5989 5.53336 10.5991 5.72615ZM16.4114 7.18077C16.4114 7.27623 16.3927 7.37077 16.3562 7.45898C16.3197 7.54719 16.2662 7.62736 16.1988 7.69489C16.1313 7.76243 16.0512 7.81602 15.963 7.8526C15.8748 7.88917 15.7803 7.90803 15.6849 7.90808C15.5894 7.90813 15.4949 7.88938 15.4066 7.85289C15.3184 7.81641 15.2383 7.7629 15.1707 7.69544C15.1032 7.62797 15.0496 7.54787 15.013 7.45969C14.9764 7.37152 14.9576 7.277 14.9575 7.18154C14.9575 6.98875 15.0341 6.80385 15.1705 6.66753C15.3068 6.5312 15.4917 6.45462 15.6845 6.45462C15.8773 6.45462 16.0622 6.5312 16.1985 6.66753C16.3348 6.80385 16.4114 6.98798 16.4114 7.18077ZM4.78755 7.18077C4.78765 7.37356 4.71116 7.5585 4.57491 7.69489C4.43865 7.83129 4.2538 7.90798 4.06101 7.90808C3.96555 7.90813 3.87101 7.88938 3.7828 7.85289C3.69458 7.81641 3.61442 7.7629 3.54688 7.69544C3.41049 7.55919 3.3338 7.37433 3.3337 7.18154C3.3337 6.98875 3.41029 6.80385 3.54661 6.66753C3.68293 6.5312 3.86783 6.45462 4.06062 6.45462C4.25341 6.45462 4.43831 6.5312 4.57463 6.66753C4.71096 6.80385 4.78755 6.98798 4.78755 7.18077Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.21886 14.9983C6.21886 14.8963 6.25938 14.7985 6.33151 14.7264C6.40364 14.6542 6.50147 14.6137 6.60347 14.6137H13.3242C13.4262 14.6137 13.5241 14.6542 13.5962 14.7264C13.6683 14.7985 13.7089 14.8963 13.7089 14.9983C13.7089 15.1003 13.6683 15.1982 13.5962 15.2703C13.5241 15.3424 13.4262 15.3829 13.3242 15.3829H6.60347C6.50147 15.3829 6.40364 15.3424 6.33151 15.2703C6.25938 15.1982 6.21886 15.1003 6.21886 14.9983Z" fill="white" />
                        <defs>
                          <linearGradient id="paint0_linear_13634_36142" x1="-0.769231" y1="12.766" x2="20.6731" y2="12.7694" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                        {videoData.contentType}
                      </span>
                    </div>
                    : ""
                  }
                </div>
              </div>
            </div>

            {/* right part */}
            {/* <div className="flex items-start justify-between w-full mb-3 md:justify-end md:gap-2 xl:gap-6 md:mb-0">
              <div className="flex items-center justify-center gap-2">
                <LikeForDetailVideo
                  videoId={params.vidId}
                  initialLiked={likeOrNot}
                  initialLikeCount={likeCount}
                />
              </div>
              <ShareVideoComponent />
              <div className="ml-[150px] md:ml-0 mr-[10px] md:mr-0 md:pt-2">
                <Popover>
                  <PopoverTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20] md:w-[24] h-[20] md:h-[24]"
                      width="6"
                      height="20"
                      viewBox="0 0 6 24"
                      fill="none"
                    >
                      <path
                        d="M0.746094 21.6C0.746094 20.9635 0.99895 20.353 1.44904 19.9029C1.89912 19.4529 2.50957 19.2 3.14609 19.2C3.78261 19.2 4.39306 19.4529 4.84315 19.9029C5.29324 20.353 5.54609 20.9635 5.54609 21.6C5.54609 22.2365 5.29324 22.847 4.84315 23.2971C4.39306 23.7471 3.78261 24 3.14609 24C2.50957 24 1.89912 23.7471 1.44904 23.2971C0.99895 22.847 0.746094 22.2365 0.746094 21.6ZM0.746094 12C0.746094 11.3635 0.99895 10.753 1.44904 10.3029C1.89912 9.85286 2.50957 9.6 3.14609 9.6C3.78261 9.6 4.39306 9.85286 4.84315 10.3029C5.29324 10.753 5.54609 11.3635 5.54609 12C5.54609 12.6365 5.29324 13.247 4.84315 13.6971C4.39306 14.1471 3.78261 14.4 3.14609 14.4C2.50957 14.4 1.89912 14.1471 1.44904 13.6971C0.99895 13.247 0.746094 12.6365 0.746094 12ZM0.746094 2.4C0.746094 1.76348 0.99895 1.15303 1.44904 0.702944C1.89912 0.252856 2.50957 0 3.14609 0C3.78261 0 4.39306 0.252856 4.84315 0.702944C5.29324 1.15303 5.54609 1.76348 5.54609 2.4C5.54609 3.03652 5.29324 3.64697 4.84315 4.09706C4.39306 4.54714 3.78261 4.8 3.14609 4.8C2.50957 4.8 1.89912 4.54714 1.44904 4.09706C0.99895 3.64697 0.746094 3.03652 0.746094 2.4Z"
                        fill="url(#paint0_linear_5441_25702)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_5441_25702"
                          x1="3.14609"
                          y1="0"
                          x2="3.14609"
                          y2="24"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#E3206D" />
                          <stop offset="1" stopColor="#F16A33" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </PopoverTrigger>
                  <PopoverContent className="w-[232px] bg-[#262626] border-[1px] border-[#404040] rounded-[16px] py-3 px-5 flex flex-col md:mt-5 md:mr-[70px]">
                    <VideoReportComponent videoId={params.vidId} />
                  </PopoverContent>
                </Popover>
              </div>
            </div> */}
          </div>

          {/*added for mobile view */}
          {/* <div className="flex md:hidden justify-center items-center gap-3 mt-[10px] overflow-x-scroll"> */}
          <div className="flex md:hidden gap-3 mt-[10px] flex-wrap w-full pr-4">
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.0003 4.16797C5.51033 4.16797 1.66699 8.61464 1.66699 10.0013C1.66699 11.453 4.62199 15.8346 10.0003 15.8346C15.3787 15.8346 18.3337 11.453 18.3337 10.0013C18.3337 8.61464 14.4903 4.16797 10.0003 4.16797ZM10.0003 12.5013C9.50587 12.5013 9.02252 12.3547 8.6114 12.08C8.20028 11.8053 7.87985 11.4148 7.69063 10.958C7.50141 10.5012 7.4519 9.99853 7.54836 9.51358C7.64483 9.02862 7.88293 8.58317 8.23256 8.23353C8.58219 7.8839 9.02765 7.6458 9.5126 7.54934C9.99755 7.45288 10.5002 7.50238 10.957 7.6916C11.4138 7.88082 11.8043 8.20125 12.079 8.61238C12.3537 9.0235 12.5003 9.50685 12.5003 10.0013C12.5003 10.6643 12.2369 11.3002 11.7681 11.7691C11.2993 12.2379 10.6634 12.5013 10.0003 12.5013Z"
                  fill="url(#paint0_linear_11152_68646)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_11152_68646"
                    x1="1.02597"
                    y1="11.6148"
                    x2="18.8946"
                    y2="11.6189"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block md:hidden"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M19.3372 9.7875C18.6021 7.88603 17.326 6.24164 15.6665 5.05755C14.007 3.87347 12.0369 3.20161 9.99973 3.125C7.96256 3.20161 5.99248 3.87347 4.33299 5.05755C2.67349 6.24164 1.39733 7.88603 0.662234 9.7875C0.612589 9.92482 0.612589 10.0752 0.662234 10.2125C1.39733 12.114 2.67349 13.7584 4.33299 14.9424C5.99248 16.1265 7.96256 16.7984 9.99973 16.875C12.0369 16.7984 14.007 16.1265 15.6665 14.9424C17.326 13.7584 18.6021 12.114 19.3372 10.2125C19.3869 10.0752 19.3869 9.92482 19.3372 9.7875ZM9.99973 15.625C6.68723 15.625 3.18723 13.1687 1.91848 10C3.18723 6.83125 6.68723 4.375 9.99973 4.375C13.3122 4.375 16.8122 6.83125 18.081 10C16.8122 13.1687 13.3122 15.625 9.99973 15.625Z"
                  fill="url(#paint0_linear_5097_22056)"
                />
                <path
                  d="M10 6.25C9.25832 6.25 8.5333 6.46993 7.91661 6.88199C7.29993 7.29404 6.81928 7.87971 6.53545 8.56494C6.25162 9.25016 6.17736 10.0042 6.32206 10.7316C6.46675 11.459 6.8239 12.1272 7.34835 12.6517C7.8728 13.1761 8.54098 13.5333 9.26841 13.6779C9.99584 13.8226 10.7498 13.7484 11.4351 13.4645C12.1203 13.1807 12.706 12.7001 13.118 12.0834C13.5301 11.4667 13.75 10.7417 13.75 10C13.75 9.00544 13.3549 8.05161 12.6517 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25ZM10 12.5C9.50555 12.5 9.0222 12.3534 8.61108 12.0787C8.19995 11.804 7.87952 11.4135 7.6903 10.9567C7.50108 10.4999 7.45158 9.99723 7.54804 9.51227C7.6445 9.02732 7.8826 8.58186 8.23223 8.23223C8.58187 7.8826 9.02732 7.6445 9.51228 7.54804C9.99723 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5Z"
                  fill="url(#paint1_linear_5097_22056)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5097_22056"
                    x1="9.99973"
                    y1="3.125"
                    x2="9.99973"
                    y2="16.875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_5097_22056"
                    x1="10"
                    y1="6.25"
                    x2="10"
                    y2="13.75"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {showView}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.9974 1.66797C8.34922 1.66797 6.73806 2.15671 5.36765 3.07239C3.99724 3.98807 2.92913 5.28956 2.2984 6.81227C1.66767 8.33499 1.50265 10.0105 1.82419 11.6271C2.14573 13.2436 2.93941 14.7284 4.10484 15.8939C5.27028 17.0593 6.75514 17.853 8.37165 18.1745C9.98816 18.4961 11.6637 18.331 13.1864 17.7003C14.7091 17.0696 16.0106 16.0015 16.9263 14.6311C17.842 13.2606 18.3307 11.6495 18.3307 10.0013C18.3283 7.79191 17.4496 5.6737 15.8873 4.11143C14.325 2.54915 12.2068 1.6704 9.9974 1.66797ZM13.3157 13.3196C13.1595 13.4759 12.9475 13.5636 12.7266 13.5636C12.5056 13.5636 12.2937 13.4759 12.1374 13.3196L9.40907 10.5913C9.25319 10.4344 9.1652 10.2225 9.16407 10.0013V6.66797C9.16407 6.44696 9.25186 6.23499 9.40814 6.07871C9.56442 5.92243 9.77639 5.83464 9.9974 5.83464C10.2184 5.83464 10.4304 5.92243 10.5867 6.07871C10.7429 6.23499 10.8307 6.44696 10.8307 6.66797V9.6563L13.3157 12.1413C13.472 12.2976 13.5597 12.5095 13.5597 12.7305C13.5597 12.9514 13.472 13.1634 13.3157 13.3196Z"
                  fill="url(#paint0_linear_11214_53431)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_11214_53431"
                    x1="1.02304"
                    y1="12.3063"
                    x2="18.8917"
                    y2="12.3092"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {videoData.durationRange
                  ? getDurationDisplayValue(videoData.durationRange)
                  : "None"}
              </span>
            </div>
            <span className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
              </svg>
            </span>
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
              >
                <path
                  d="M13.9648 0C12.4136 0 10.9459 0.621873 9.86234 1.72241C8.77834 0.621873 7.3065 0 5.7475 0C2.57854 0 0 2.5783 0 5.74774C0 12.2647 9.23315 17.7077 9.62601 17.9362C9.69897 17.9789 9.78067 18 9.86238 18C9.94408 18 10.0253 17.9789 10.0983 17.9367C10.492 17.7081 19.7378 12.2647 19.7378 5.74774C19.7378 2.5783 17.148 0 13.9648 0ZM9.86234 16.9803C8.42584 16.0881 0.939866 11.1779 0.939866 5.74774C0.939866 3.09692 3.09664 0.939906 5.74746 0.939906C7.20551 0.939906 8.57267 1.58977 9.49834 2.72243C9.58784 2.83165 9.72139 2.89498 9.8623 2.89498C10.0032 2.89498 10.1368 2.83165 10.2263 2.72243C11.1524 1.58977 12.515 0.939906 13.9648 0.939906C16.6298 0.939906 18.7978 3.09692 18.7978 5.74774C18.7978 11.1784 11.3006 16.0885 9.86234 16.9803Z"
                  fill="url(#paint0_linear_6520_35224)"
                />
                <path
                  d="M15.7245 7.96028H12.5427C12.3687 7.96028 12.2095 8.05618 12.1278 8.2095L11.3944 9.58723L10.1379 4.95243C10.0837 4.7514 9.90336 4.6105 9.69546 4.60549C9.48939 4.60366 9.30077 4.73307 9.237 4.93131L8.1608 8.26826L7.56878 7.08236C7.49582 6.93597 7.3517 6.83776 7.18876 6.82397C7.02034 6.80608 6.8666 6.88134 6.76974 7.0135L5.89639 8.19987H4.01292C3.75318 8.19987 3.54297 8.41008 3.54297 8.66983C3.54297 8.92957 3.75318 9.13978 4.01292 9.13978H6.13415C6.28377 9.13978 6.4242 9.06865 6.51278 8.94842L7.07132 8.18981L7.83453 9.71808C7.91942 9.8888 8.09476 9.99389 8.29025 9.97691C8.4807 9.96268 8.64363 9.83417 8.70239 9.65243L9.64552 6.72763L10.7984 10.9792C10.8489 11.1651 11.0077 11.3019 11.199 11.3234C11.4022 11.3443 11.5805 11.2393 11.6667 11.077L12.825 8.90023H15.7246C15.9843 8.90023 16.1945 8.69002 16.1945 8.43028C16.1944 8.17049 15.9842 7.96028 15.7245 7.96028Z"
                  fill="url(#paint1_linear_6520_35224)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6520_35224"
                    x1="-0.759146"
                    y1="11.4894"
                    x2="20.4021"
                    y2="11.4931"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6520_35224"
                    x1="3.05637"
                    y1="8.89521"
                    x2="16.6203"
                    y2="8.89935"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block md:hidden"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.2526 2.5C6.97483 2.5 7.66233 2.65278 8.3151 2.95833C8.96788 3.26389 9.53038 3.69444 10.0026 4.25C10.4748 3.69444 11.0373 3.26389 11.6901 2.95833C12.3429 2.65278 13.0304 2.5 13.7526 2.5C15.0582 2.5 16.1484 2.9375 17.0234 3.8125C17.8984 4.6875 18.3359 5.77778 18.3359 7.08333C18.3359 7.15278 18.3326 7.22222 18.3259 7.29167C18.3193 7.36111 18.3157 7.43056 18.3151 7.5H16.6484C16.6623 7.43056 16.6693 7.36111 16.6693 7.29167V7.08333C16.6693 6.25 16.3915 5.55556 15.8359 5C15.2804 4.44444 14.5859 4.16667 13.7526 4.16667C13.0998 4.16667 12.4957 4.35083 11.9401 4.71917C11.3845 5.0875 11.0026 5.55611 10.7943 6.125H9.21094C9.0026 5.55556 8.62066 5.08694 8.0651 4.71917C7.50955 4.35139 6.90538 4.16722 6.2526 4.16667C5.41927 4.16667 4.72483 4.44444 4.16927 5C3.61372 5.55556 3.33594 6.25 3.33594 7.08333V7.29167C3.33594 7.36111 3.34288 7.43056 3.35677 7.5H1.6901C1.6901 7.43056 1.68677 7.36111 1.6801 7.29167C1.67344 7.22222 1.66983 7.15278 1.66927 7.08333C1.66927 5.77778 2.10677 4.6875 2.98177 3.8125C3.85677 2.9375 4.94705 2.5 6.2526 2.5ZM10.0026 17.2292C9.80816 17.2292 9.61372 17.1944 9.41927 17.125C9.22483 17.0556 9.05122 16.9444 8.89844 16.7917C8.42622 16.3611 7.97844 15.9514 7.5551 15.5625C7.13177 15.1736 6.73233 14.7986 6.35677 14.4375C5.98177 14.0764 5.63094 13.7361 5.30427 13.4167C4.9776 13.0972 4.6826 12.7917 4.41927 12.5H6.7526C7.19705 12.9306 7.68316 13.3958 8.21094 13.8958C8.73872 14.3958 9.33594 14.9444 10.0026 15.5417C10.6693 14.9444 11.2665 14.3958 11.7943 13.8958C12.322 13.3958 12.8082 12.9306 13.2526 12.5H15.6068C15.3429 12.7917 15.0479 13.0972 14.7218 13.4167C14.3957 13.7361 14.0448 14.0764 13.6693 14.4375C13.2943 14.7986 12.8915 15.1736 12.4609 15.5625C12.0304 15.9514 11.579 16.3611 11.1068 16.7917C10.954 16.9444 10.7804 17.0556 10.5859 17.125C10.3915 17.1944 10.197 17.2292 10.0026 17.2292ZM9.21094 13.3333C9.39149 13.3333 9.54788 13.2814 9.6801 13.1775C9.81233 13.0736 9.90594 12.9381 9.96094 12.7708L11.0859 9.375L11.8151 10.4583C11.8845 10.5694 11.9818 10.6597 12.1068 10.7292C12.2318 10.7986 12.3637 10.8333 12.5026 10.8333H18.3359C18.572 10.8333 18.7701 10.7533 18.9301 10.5933C19.0901 10.4333 19.1698 10.2356 19.1693 10C19.1693 9.76389 19.0893 9.56611 18.9293 9.40667C18.7693 9.24722 18.5715 9.16722 18.3359 9.16667H12.9818L11.5443 7.04167C11.4609 6.91667 11.3534 6.82306 11.2218 6.76083C11.0901 6.69861 10.9476 6.66722 10.7943 6.66667C10.6137 6.66667 10.4576 6.71889 10.3259 6.82333C10.1943 6.92778 10.1004 7.06306 10.0443 7.22917L8.91927 10.6042L8.21094 9.54167C8.14149 9.43056 8.04427 9.34028 7.91927 9.27083C7.79427 9.20139 7.66233 9.16667 7.52344 9.16667H1.66927C1.43316 9.16667 1.23538 9.24667 1.07594 9.40667C0.916493 9.56667 0.836493 9.76444 0.835938 10C0.835938 10.2361 0.915937 10.4342 1.07594 10.5942C1.23594 10.7542 1.43372 10.8339 1.66927 10.8333H7.02344L8.46094 12.9583C8.54427 13.0833 8.65205 13.1772 8.78427 13.24C8.91649 13.3028 9.05871 13.3339 9.21094 13.3333Z"
                  fill="url(#paint0_linear_5097_22063)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5097_22063"
                    x1="10.0026"
                    y1="2.5"
                    x2="10.0026"
                    y2="17.2292"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {videoData.category}
              </span>
            </div>
            <span className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
              </svg>
            </span>
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect
                  y="12.8086"
                  width="4.2767"
                  height="7.19"
                  fill="url(#paint0_linear_6520_30919)"
                />
                <rect
                  x="5.74219"
                  y="10.4336"
                  width="3.2767"
                  height="9.066"
                  fill="url(#paint1_linear_6520_30919)"
                  stroke="url(#paint2_linear_6520_30919)"
                />
                <rect
                  x="10.9824"
                  y="6.12109"
                  width="3.2767"
                  height="13.38"
                  fill="url(#paint3_linear_6520_30919)"
                  stroke="url(#paint4_linear_6520_30919)"
                />
                <rect
                  x="16.2246"
                  y="0.5"
                  width="3.27495"
                  height="19"
                  stroke="url(#paint5_linear_6520_30919)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6520_30919"
                    x1="-0.164488"
                    y1="17.398"
                    x2="4.42064"
                    y2="17.3984"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6520_30919"
                    x1="5.0777"
                    y1="16.3587"
                    x2="9.66283"
                    y2="16.359"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_6520_30919"
                    x1="5.0777"
                    y1="16.3587"
                    x2="9.66283"
                    y2="16.359"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_6520_30919"
                    x1="10.3179"
                    y1="14.7998"
                    x2="14.9031"
                    y2="14.8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_6520_30919"
                    x1="10.3179"
                    y1="14.7998"
                    x2="14.9031"
                    y2="14.8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_6520_30919"
                    x1="15.5602"
                    y1="12.766"
                    x2="20.1434"
                    y2="12.7661"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block md:hidden"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
              >
                <rect
                  y="8"
                  width="4.8"
                  height="8"
                  fill="url(#paint0_linear_5097_22068)"
                />
                <rect
                  x="6.39844"
                  y="4.80078"
                  width="4.8"
                  height="11.2"
                  fill="url(#paint1_linear_5097_22068)"
                />
                <rect
                  x="13.2969"
                  y="0.5"
                  width="3.8"
                  height="15"
                  stroke="url(#paint2_linear_5097_22068)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5097_22068"
                    x1="2.4"
                    y1="8"
                    x2="2.4"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_5097_22068"
                    x1="8.79844"
                    y1="4.80078"
                    x2="8.79844"
                    y2="16.0008"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_5097_22068"
                    x1="15.1969"
                    y1="0"
                    x2="15.1969"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {videoData.level}
              </span>
            </div>
            <span className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
              </svg>
            </span>
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.5252 16.6654H3.68411C3.37007 16.6654 3.06888 16.5337 2.84682 16.2992C2.62475 16.0648 2.5 15.7469 2.5 15.4154V4.58203C2.5 4.25051 2.62475 3.93257 2.84682 3.69815C3.06888 3.46373 3.37007 3.33203 3.68411 3.33203C3.99816 3.33203 4.29934 3.46373 4.52141 3.69815C4.74347 3.93257 4.86822 4.25051 4.86822 4.58203V14.1654H15.5252C15.8393 14.1654 16.1405 14.2971 16.3625 14.5315C16.5846 14.7659 16.7093 15.0838 16.7093 15.4154C16.7093 15.7469 16.5846 16.0648 16.3625 16.2992C16.1405 16.5337 15.8393 16.6654 15.5252 16.6654Z"
                  fill="url(#paint0_linear_11449_61253)"
                />
                <path
                  d="M6.84174 13.332C6.62184 13.332 6.40628 13.2674 6.21922 13.1453C6.03216 13.0233 5.88099 12.8487 5.78264 12.641C5.6843 12.4334 5.64267 12.201 5.66242 11.9698C5.68217 11.7386 5.76251 11.5177 5.89445 11.332L8.26268 7.9987C8.44429 7.74311 8.71172 7.57063 9.01004 7.5167C9.30836 7.46276 9.61492 7.53147 9.86676 7.7087L11.2016 8.64786L12.9312 5.6062C13.0136 5.46113 13.1231 5.33523 13.2529 5.23612C13.3827 5.13701 13.5303 5.06674 13.6866 5.02958C13.8429 4.99242 14.0048 4.98913 14.1623 5.01992C14.3199 5.05071 14.4698 5.11493 14.6032 5.2087L16.9714 6.87536C17.2331 7.05925 17.4149 7.34535 17.4768 7.67072C17.5387 7.9961 17.4756 8.3341 17.3014 8.61036C17.1272 8.88663 16.8562 9.07854 16.548 9.14386C16.2397 9.20919 15.9196 9.14258 15.6579 8.9587L14.323 8.01953L12.5934 11.0612C12.511 11.2063 12.4015 11.3322 12.2717 11.4313C12.1419 11.5304 11.9943 11.6007 11.838 11.6378C11.6817 11.675 11.5199 11.6783 11.3623 11.6475C11.2048 11.6167 11.0548 11.5525 10.9214 11.4587L9.48547 10.4479L7.78903 12.832C7.67874 12.9873 7.53572 13.1133 7.37129 13.2001C7.20687 13.2868 7.02557 13.332 6.84174 13.332Z"
                  fill="url(#paint1_linear_11449_61253)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_11449_61253"
                    x1="1.92308"
                    y1="11.8427"
                    x2="18.0049"
                    y2="11.8456"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_11449_61253"
                    x1="1.92308"
                    y1="11.8427"
                    x2="18.0049"
                    y2="11.8456"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {videoData.intensityLevel ? videoData.intensityLevel : "None"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 0.75C15 2.14844 15.2578 3.4375 15.7734 4.61719C16.2891 5.79688 17.0312 6.88281 18 7.875C18.9688 8.86719 19.7109 9.95312 20.2266 11.1328C20.7422 12.3125 21 13.6016 21 15C21 15.8281 20.8945 16.625 20.6836 17.3906C20.4727 18.1562 20.168 18.8711 19.7695 19.5352C19.3711 20.1992 18.9023 20.8086 18.3633 21.3633C17.8242 21.918 17.2188 22.3867 16.5469 22.7695C15.875 23.1523 15.1562 23.4531 14.3906 23.6719C13.625 23.8906 12.8281 24 12 24C11.1719 24 10.375 23.8945 9.60938 23.6836C8.84375 23.4727 8.12891 23.168 7.46484 22.7695C6.80078 22.3711 6.19141 21.9023 5.63672 21.3633C5.08203 20.8242 4.61328 20.2188 4.23047 19.5469C3.84766 18.875 3.54688 18.1562 3.32812 17.3906C3.10938 16.625 3 15.8281 3 15C3 14.3438 3.07031 13.6992 3.21094 13.0664C3.35156 12.4336 3.55469 11.8281 3.82031 11.25C4.08594 10.6719 4.41406 10.1211 4.80469 9.59766C5.19531 9.07422 5.63672 8.60156 6.12891 8.17969C6.18359 8.47656 6.25781 8.78125 6.35156 9.09375C6.44531 9.40625 6.55469 9.71875 6.67969 10.0312C6.80469 10.3438 6.95312 10.6406 7.125 10.9219C7.29688 11.2031 7.47656 11.4648 7.66406 11.707C7.82031 11.9023 8.02344 12 8.27344 12C8.48438 12 8.66016 11.9258 8.80078 11.7773C8.94141 11.6289 9.01562 11.4492 9.02344 11.2383C9.02344 11.1523 9.01172 11.0742 8.98828 11.0039C8.96484 10.9336 8.92578 10.8633 8.87109 10.793C8.65234 10.4727 8.46094 10.1562 8.29688 9.84375C8.13281 9.53125 7.98828 9.21094 7.86328 8.88281C7.73828 8.55469 7.64844 8.21484 7.59375 7.86328C7.53906 7.51172 7.50781 7.14062 7.5 6.75C7.5 5.82031 7.67578 4.94531 8.02734 4.125C8.37891 3.30469 8.86328 2.58984 9.48047 1.98047C10.0977 1.37109 10.8125 0.890625 11.625 0.539062C12.4375 0.1875 13.3125 0.0078125 14.25 0H15V0.75ZM12 22.5C13.0391 22.5 14.0117 22.3047 14.918 21.9141C15.8242 21.5234 16.6211 20.9883 17.3086 20.3086C17.9961 19.6289 18.5312 18.8359 18.9141 17.9297C19.2969 17.0234 19.4922 16.0469 19.5 15C19.5 13.8203 19.2812 12.7227 18.8438 11.707C18.4062 10.6914 17.7734 9.76953 16.9453 8.94141C15.9297 7.91797 15.1328 6.78906 14.5547 5.55469C13.9766 4.32031 13.6328 2.98438 13.5234 1.54688C12.875 1.63281 12.2773 1.82812 11.7305 2.13281C11.1836 2.4375 10.7031 2.82422 10.2891 3.29297C9.875 3.76172 9.55859 4.28906 9.33984 4.875C9.12109 5.46094 9.00781 6.08594 9 6.75C9 7.35938 9.08984 7.91016 9.26953 8.40234C9.44922 8.89453 9.71484 9.38672 10.0664 9.87891C10.2148 10.082 10.3281 10.293 10.4062 10.5117C10.4844 10.7305 10.5273 10.9727 10.5352 11.2383C10.5352 11.5508 10.4766 11.8438 10.3594 12.1172C10.2422 12.3906 10.0781 12.6289 9.86719 12.832C9.65625 13.0352 9.41797 13.1992 9.15234 13.3242C8.88672 13.4492 8.59375 13.5078 8.27344 13.5C7.91406 13.5 7.59766 13.4336 7.32422 13.3008C7.05078 13.168 6.80859 12.9883 6.59766 12.7617C6.38672 12.5352 6.19922 12.2812 6.03516 12C5.87109 11.7188 5.71484 11.4375 5.56641 11.1562C5.20703 11.7266 4.94141 12.3398 4.76953 12.9961C4.59766 13.6523 4.50781 14.3203 4.5 15C4.5 16.0391 4.69531 17.0117 5.08594 17.918C5.47656 18.8242 6.01172 19.6211 6.69141 20.3086C7.37109 20.9961 8.16406 21.5312 9.07031 21.9141C9.97656 22.2969 10.9531 22.4922 12 22.5Z"
                  fill="url(#paint0_linear_5730_57069)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5730_57069"
                    x1="2.30769"
                    y1="15.3192"
                    x2="21.6058"
                    y2="15.3215"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block md:hidden"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <g opacity="0.5">
                  <mask id="path-1-inside-1_5097_22075" fill="white">
                    <path d="M11.2949 18.1685C13.8999 17.6468 17.2682 15.7726 17.2682 10.9268C17.2682 6.51763 14.0407 3.58096 11.7199 2.23179C11.2041 1.93179 10.6016 2.32596 10.6016 2.92179V4.44513C10.6016 5.64679 10.0966 7.84013 8.69323 8.75263C7.97656 9.21846 7.20156 8.52096 7.1149 7.67096L7.04323 6.97263C6.9599 6.16096 6.13323 5.66846 5.4849 6.16346C4.31906 7.05096 3.10156 8.60929 3.10156 10.926C3.10156 16.8518 7.50906 18.3343 9.7124 18.3343C9.84073 18.3343 9.97573 18.3293 10.1157 18.3218C10.4874 18.2751 10.1157 18.4043 11.2949 18.1676" />
                  </mask>
                  <path
                    d="M11.7199 2.23179L10.463 4.39288L10.4635 4.39312L11.7199 2.23179ZM8.69323 8.75263L10.0557 10.8487L10.056 10.8485L8.69323 8.75263ZM7.1149 7.67096L9.602 7.41737L9.60183 7.41574L7.1149 7.67096ZM7.04323 6.97263L9.53017 6.7174L9.53016 6.7173L7.04323 6.97263ZM5.4849 6.16346L6.99919 8.15266L7.002 8.15051L5.4849 6.16346ZM10.1157 18.3218L10.2495 20.8182L10.3386 20.8134L10.4272 20.8023L10.1157 18.3218ZM11.7858 20.6198C13.4123 20.2941 15.3961 19.5279 17.0044 17.9585C18.6749 16.3284 19.7682 13.994 19.7682 10.9268H14.7682C14.7682 12.7054 14.1774 13.731 13.5124 14.3799C12.7853 15.0894 11.7825 15.5212 10.804 15.7171L11.7858 20.6198ZM19.7682 10.9268C19.7682 5.20205 15.6105 1.60175 12.9763 0.0704622L10.4635 4.39312C12.471 5.56017 14.7682 7.83321 14.7682 10.9268H19.7682ZM12.9768 0.0707014C10.5648 -1.33207 8.10156 0.669639 8.10156 2.92179H13.1016C13.1016 3.49502 12.8009 4.04045 12.2999 4.35606C11.7739 4.68747 11.0557 4.73757 10.463 4.39288L12.9768 0.0707014ZM8.10156 2.92179V4.44513H13.1016V2.92179H8.10156ZM8.10156 4.44513C8.10156 4.75388 8.02654 5.30765 7.82993 5.83725C7.62302 6.39461 7.40169 6.61039 7.33041 6.65674L10.056 10.8485C11.3881 9.98236 12.1209 8.64522 12.5174 7.57738C12.9241 6.48176 13.1016 5.33804 13.1016 4.44513H8.10156ZM7.33076 6.65652C7.58527 6.49109 7.94302 6.37652 8.34421 6.40673C8.7226 6.43523 9.00387 6.58126 9.17548 6.71101C9.48352 6.94388 9.58122 7.2136 9.602 7.41737L4.62779 7.92455C4.73523 8.97832 5.26378 10.0218 6.16014 10.6995C7.1616 11.4566 8.68301 11.741 10.0557 10.8487L7.33076 6.65652ZM9.60183 7.41574L9.53017 6.7174L4.55629 7.22785L4.62796 7.92618L9.60183 7.41574ZM9.53016 6.7173C9.4081 5.52843 8.72606 4.458 7.67361 3.8836C6.55497 3.27308 5.11739 3.29869 3.96779 4.17641L7.002 8.15051C6.50074 8.53323 5.80065 8.55759 5.27827 8.27249C4.82207 8.02351 4.59503 7.60516 4.5563 7.22796L9.53016 6.7173ZM3.9706 4.17426C2.36451 5.39691 0.601562 7.62646 0.601562 10.926H5.60156C5.60156 9.59212 6.27362 8.70501 6.99919 8.15266L3.9706 4.17426ZM0.601562 10.926C0.601562 14.5904 2.00435 17.1789 4.0108 18.7979C5.91049 20.3308 8.14813 20.8343 9.7124 20.8343V15.8343C9.07332 15.8343 8.00555 15.5965 7.15065 14.9067C6.40252 14.303 5.60156 13.1874 5.60156 10.926H0.601562ZM9.7124 20.8343C9.9024 20.8343 10.0861 20.827 10.2495 20.8182L9.98199 15.8254C9.86539 15.8316 9.77905 15.8343 9.7124 15.8343V20.8343ZM10.4272 20.8023C10.4306 20.8019 10.4012 20.8058 10.3506 20.8083C10.2911 20.8113 10.2266 20.8113 10.1622 20.808C10.1364 20.8066 10.1175 20.8051 10.12 20.8053C10.1209 20.8054 10.1213 20.8054 10.1244 20.8056C10.1268 20.8058 10.1308 20.8062 10.1354 20.8065C10.1447 20.8072 10.1592 20.8083 10.1765 20.8095C10.2589 20.8149 10.36 20.8185 10.4799 20.8148C10.689 20.8083 10.8874 20.7813 11.0607 20.7536C11.2448 20.7241 11.4793 20.6805 11.7869 20.6187L10.8029 15.7165C10.5209 15.7731 10.3597 15.8021 10.2702 15.8164C10.1699 15.8325 10.2169 15.8205 10.3251 15.8172C10.3946 15.815 10.4577 15.8172 10.506 15.8203C10.5181 15.8211 10.5341 15.8224 10.5128 15.8208C10.499 15.8197 10.4634 15.8169 10.4197 15.8146C10.1948 15.803 9.99429 15.8174 9.80427 15.8413L10.4272 20.8023Z"
                    fill="url(#paint0_linear_5097_22075)"
                    mask="url(#path-1-inside-1_5097_22075)"
                  />
                </g>
                <path
                  d="M10.119 17.0665C9.76269 17.0203 9.35662 16.8865 9.05447 16.6486C8.77508 16.4286 8.51562 16.0738 8.51562 15.3712C8.51562 14.8527 8.70558 14.3895 8.99368 13.9966C9.11962 14.3308 9.30228 14.6657 9.55503 14.9593C9.8305 15.2795 10.2245 15.5241 10.7058 15.5678C11.1664 15.6096 11.5608 15.4543 11.8437 15.2602C11.8471 15.2962 11.849 15.3332 11.849 15.3712C11.849 15.9817 11.6859 16.3292 11.5284 16.5345C11.3777 16.7311 11.1744 16.8711 10.9483 16.9626C10.7163 17.0085 10.565 17.0358 10.4652 17.0518C10.4221 17.0587 10.3928 17.0628 10.3743 17.0651C10.3678 17.0648 10.3607 17.0644 10.3527 17.064C10.2741 17.0599 10.198 17.0611 10.119 17.0665ZM11.2497 14.3885L11.2511 14.3893L11.2497 14.3885Z"
                  stroke="url(#paint1_linear_5097_22075)"
                  strokeWidth="2.5"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5097_22075"
                    x1="10.1849"
                    y1="2.12891"
                    x2="10.1849"
                    y2="18.3343"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_5097_22075"
                    x1="10.1823"
                    y1="11.8945"
                    x2="10.1823"
                    y2="18.3228"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {getCaloriesDisplayValue(videoData.calories)} cal
              </span>
            </div>
            <span className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
              </svg>
            </span>
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M15.0841 8.81165L15.4037 9.58333H16.239H16.4531V10.4167H16.239H15.4037L15.0841 11.1883L14.4949 12.6108L14.1757 13.3817L14.7651 13.9722L14.9173 14.1247L14.3281 14.7139L14.1762 14.5619L13.5853 13.9711L12.8134 14.2912L11.3909 14.8812L10.6198 15.201V16.0358V16.25H9.78646V16.0358V15.2006L9.01478 14.881L7.59228 14.2918L6.82143 13.9725L6.2309 14.562L6.0784 14.7142L5.48895 14.1247L5.64117 13.9722L6.23002 13.3823L5.91175 12.6119C5.7243 12.1581 5.65091 11.9812 5.54084 11.7158C5.48437 11.5797 5.41824 11.4202 5.32209 11.1882L5.00242 10.4167H4.16729H3.95312V9.58333H4.16729H5.00209L5.32192 8.81223L5.91192 7.38973L6.23207 6.61784L5.64118 6.02695L5.48923 5.875L6.0784 5.28583L6.2309 5.43804L6.82143 6.02747L7.59228 5.7082L9.01478 5.11903L9.78646 4.79942V3.96417V3.75H10.6198V3.96417V4.79942L11.3915 5.11903L12.814 5.7082L13.5848 6.02747L14.1754 5.43804L14.3279 5.28583L14.9173 5.87527L14.7651 6.02778L14.1757 6.6183L14.4949 7.38915L15.0841 8.81165ZM14.6227 4.99152C14.6225 4.99175 14.6222 4.99198 14.622 4.99221L14.6227 4.99152ZM7.65676 13.8109C8.41049 14.3145 9.29663 14.5833 10.2031 14.5833C11.4187 14.5833 12.5845 14.1004 13.444 13.2409C14.3036 12.3814 14.7865 11.2156 14.7865 10C14.7865 9.0935 14.5177 8.20736 14.014 7.45364C13.5104 6.69991 12.7946 6.11245 11.9571 5.76555C11.1196 5.41865 10.198 5.32788 9.30896 5.50473C8.41988 5.68158 7.60321 6.1181 6.96222 6.75909C6.32123 7.40008 5.88471 8.21676 5.70786 9.10584C5.53101 9.99492 5.62178 10.9165 5.96868 11.754C6.31558 12.5915 6.90304 13.3073 7.65676 13.8109Z"
                  stroke="url(#paint0_linear_10631_54104)"
                  strokeWidth="2.5"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_10631_54104"
                    x1="10.2031"
                    y1="2.5"
                    x2="10.2031"
                    y2="17.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E3206D" />
                    <stop offset="1" stopColor="#F16A33" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[16px] md:text-[24px] text-[#A3A3A3] font-normal leading-normal">
                {videoData?.equipment}
              </span>
            </div>
          </div>

          <p className="text-[14px] md:text-[20px] text-[#D4D4D4] font-normal leading-normal mt-4 mb-3">
            {videoData.description}
          </p>

          <div className="flex flex-col gap-2 md:mb-[120px]">
            <h2 className="text-[20px] md:text-[28px] text-[#FFFFFF] font-bold md:font-normal leading-normal">
              Focus Area
            </h2>
            <div className="flex gap-4 md:gap-7">
              {videoData.focusArea.map((focusarea: string) => (
                <span
                  key={focusarea}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[6px] md:w-[6px] h-[6px] md:h-[6px]"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="4"
                      fill="url(#paint0_linear_5441_25687)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_5441_25687"
                        x1="4"
                        y1="0"
                        x2="4"
                        y2="8"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E3206D" />
                        <stop offset="1" stopColor="#F16A33" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[14px] md:text-[20px] text-[#D4D4D4] font-semibold leading-normal">
                    {focusarea}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended workout sessions */}
        <div className="flex flex-[30%] flex-col gap-4 mt-[24px] mb-[62px]">
          <h1 className="text-[20px] md:text-[24px] text-[#E5E5E5] font-bold leading-normal">
            Recommended Workout Sessions
          </h1>

          <div className=" md:h-[680px] md:overflow-y-scroll">
            <div className="flex-col items-center justify-center gap-6 md:flex md:items-start">
              {categoryVideoData &&
                categoryVideoData.map((item: any) => (
                  <div
                    key={item._id}
                    className="relative mb-6 md:basis-auto md:mb-0"
                  >
                    <Link
                      className="flex gap-4 cursor-pointer"
                      href={{
                        pathname: `/workout/${item._id}/`,
                        query: { playing: false },
                      }}
                    >
                      <div className="relative w-[156px]">
                        <Image
                          src={item.thumbnailUrl}
                          alt="video banner"
                          layout="fixed"
                          width={156}
                          height={128}
                          className="rounded-[12px] object-cover md:w-[280px] w-[156px] h-[128px]"
                        />
                        <span className="absolute left-2 top-2">
                          {item.contentType === "Premium" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                            >
                              <circle
                                cx="8.14453"
                                cy="8.14062"
                                r="8"
                                fill="url(#paint0_linear_10610_90831)"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.1285 10.7997L12.0642 7.25138L10.6967 8.11907C10.424 8.29229 10.0941 8.35207 9.77764 8.28556C9.46121 8.21906 9.18358 8.03158 9.00436 7.76338L8.10445 6.4163L7.20392 7.764C7.02461 8.03209 6.74693 8.21945 6.43052 8.28584C6.1141 8.35222 5.78417 8.29235 5.51157 8.11907L4.14472 7.25138L5.08045 10.7997H11.1285ZM4.47639 6.732C4.00266 6.43107 3.40416 6.86615 3.54684 7.40769L4.48319 10.956C4.51785 11.0875 4.59526 11.2039 4.70331 11.2869C4.81136 11.37 4.94398 11.415 5.08045 11.4151H11.1285C11.2649 11.415 11.3975 11.37 11.5056 11.2869C11.6137 11.2039 11.6911 11.0875 11.7257 10.956L12.6621 7.40769C12.8041 6.86615 12.2062 6.43169 11.7325 6.732L10.365 7.59969C10.2288 7.68636 10.0638 7.71634 9.90563 7.68321C9.74743 7.65007 9.60857 7.55646 9.51886 7.42246L8.61834 6.07477C8.56193 5.99048 8.48551 5.92138 8.39587 5.87358C8.30623 5.82579 8.20613 5.80078 8.10445 5.80078C8.00278 5.80078 7.90268 5.82579 7.81304 5.87358C7.72339 5.92138 7.64698 5.99048 7.59057 6.07477L6.69004 7.42246C6.60043 7.55656 6.46162 7.6503 6.30341 7.68355C6.14519 7.7168 5.9802 7.68691 5.84386 7.6003L4.47639 6.732Z"
                                fill="white"
                              />
                              <path
                                d="M8.68719 4.72155C8.68736 4.87578 8.62602 5.02376 8.51667 5.13294C8.40733 5.24211 8.25893 5.30354 8.10413 5.3037C7.94933 5.30387 7.80081 5.24275 7.69123 5.13381C7.58165 5.02486 7.52 4.87701 7.51984 4.72278C7.51967 4.56855 7.58101 4.42056 7.69036 4.31139C7.7997 4.20221 7.9481 4.14079 8.1029 4.14063C8.2577 4.14046 8.40622 4.20157 8.5158 4.31052C8.62538 4.41946 8.68703 4.56731 8.68719 4.72155ZM13.3541 5.88524C13.3542 5.96161 13.3391 6.03724 13.3098 6.10781C13.2805 6.17838 13.2376 6.24251 13.1834 6.29654C13.1292 6.35057 13.0649 6.39344 12.9941 6.4227C12.9233 6.45196 12.8474 6.46705 12.7708 6.46709C12.6941 6.46713 12.6182 6.45213 12.5474 6.42294C12.4765 6.39375 12.4122 6.35095 12.358 6.29698C12.3037 6.243 12.2607 6.17892 12.2313 6.10838C12.202 6.03784 12.1868 5.96222 12.1868 5.88586C12.1868 5.73162 12.2483 5.58371 12.3577 5.47465C12.4672 5.36559 12.6157 5.30432 12.7705 5.30432C12.9253 5.30432 13.0737 5.36559 13.1832 5.47465C13.2926 5.58371 13.3541 5.73101 13.3541 5.88524ZM4.02087 5.88524C4.02095 6.03947 3.95953 6.18742 3.85013 6.29654C3.74073 6.40566 3.5923 6.46701 3.4375 6.46709C3.36085 6.46713 3.28494 6.45213 3.21411 6.42294C3.14328 6.39375 3.07892 6.35095 3.02469 6.29698C2.91517 6.18797 2.8536 6.04009 2.85352 5.88586C2.85352 5.73162 2.91501 5.58371 3.02447 5.47465C3.13393 5.36559 3.28239 5.30432 3.43719 5.30432C3.59199 5.30432 3.74045 5.36559 3.84991 5.47465C3.95937 5.58371 4.02087 5.73101 4.02087 5.88524Z"
                                fill="white"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.17188 12.1397C5.17188 12.0581 5.20441 11.9799 5.26233 11.9222C5.32024 11.8644 5.39879 11.832 5.4807 11.832H10.8771C10.959 11.832 11.0375 11.8644 11.0955 11.9222C11.1534 11.9799 11.1859 12.0581 11.1859 12.1397C11.1859 12.2213 11.1534 12.2996 11.0955 12.3573C11.0375 12.415 10.959 12.4474 10.8771 12.4474H5.4807C5.39879 12.4474 5.32024 12.415 5.26233 12.3573C5.20441 12.2996 5.17188 12.2213 5.17188 12.1397Z"
                                fill="white"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_10610_90831"
                                  x1="-0.470853"
                                  y1="10.3534"
                                  x2="16.683"
                                  y2="10.3562"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#F43F5E" />
                                  <stop offset="1" stopColor="#FB923C" />
                                </linearGradient>
                              </defs>
                            </svg>
                          ) : (
                            ""
                          )}
                        </span>
                        <span className="video-level-tag absolute bottom-1 left-1 text-[12px] text-[#FFFFFF] font-bold leading-normal px-[6px]">
                          {item.level}
                        </span>
                      </div>

                      <div className="w-[170px] md:w-[200px] flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <h2 className=" text-[18px] text-[#FFFFFF] font-bold leading-normal truncate overflow-hidden whitespace-nowrap text-ellipsis">
                            {item.title}
                          </h2>
                          {/* <span className="text-[18px] text-[#E5E5E5] font-bold leading-normal">
                            {item.category}
                          </span> */}
                        </div>
                        <p className="text-[12px] text-[#D4D4D4] font-normal leading-normal line-clamp-3">
                          {item.description}
                        </p>
                        <span className="text-[10px] text-[#D4D4D4] font-semibold leading-normal line-clamp-3">
                          Equipment : {item.equipment ? item.equipment : "None"}
                        </span>
                        {/* <div className="flex items-center justify-between py-2">
                          <div className="flex items-center justify-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 33 33"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_4150_23264)">
                                <path
                                  d="M19.0392 0.75H19.5371V1.25C19.5371 3.1775 19.8928 4.96515 20.6102 6.6065C21.3237 8.23889 22.3488 9.73652 23.6794 11.0993C24.9321 12.3824 25.8862 13.7806 26.5477 15.294C27.2053 16.7985 27.5371 18.4483 27.5371 20.25C27.5371 21.3112 27.402 22.3289 27.1332 23.3047C26.8637 24.2829 26.4751 25.1941 25.9677 26.0396C25.4563 26.8921 24.8548 27.674 24.1629 28.3859C23.4769 29.0918 22.707 29.6878 21.8521 30.1749C20.992 30.665 20.0708 31.0507 19.0872 31.3317C18.1128 31.6101 17.0967 31.75 16.0371 31.75C14.9759 31.75 13.9582 31.6149 12.9824 31.3461C12.0042 31.0766 11.093 30.688 10.2475 30.1806C9.39503 29.6692 8.61315 29.0677 7.9012 28.3758C7.19535 27.6898 6.59929 26.9199 6.11217 26.065C5.62212 25.2049 5.23638 24.2837 4.95537 23.3001C4.67697 22.3257 4.53711 21.3096 4.53711 20.25C4.53711 19.411 4.62696 18.588 4.80645 17.7803C4.98643 16.9705 5.24608 16.1968 5.5852 15.4587C5.92432 14.7207 6.34368 14.0165 6.84408 13.3459C7.17217 12.9063 7.52811 12.4949 7.91198 12.1117C7.94766 12.2465 7.98599 12.3821 8.02695 12.5187C8.15634 12.95 8.30711 13.3807 8.47912 13.8107C8.65598 14.2528 8.86638 14.6738 9.11047 15.0732C9.3485 15.4627 9.59843 15.827 9.8605 16.1655L9.86045 16.1655L9.86543 16.1717C10.1686 16.5507 10.583 16.75 11.0684 16.75C11.482 16.75 11.8492 16.5981 12.1345 16.297C12.4085 16.0078 12.5533 15.6513 12.568 15.2529L12.5684 15.2436V15.2344C12.5684 15.0744 12.5465 14.9159 12.4958 14.7638C12.4452 14.612 12.3664 14.4732 12.2702 14.347C11.9917 13.9383 11.7493 13.5369 11.5423 13.1426C11.3328 12.7435 11.1483 12.3345 10.9887 11.9158C10.8347 11.5114 10.7238 11.0922 10.6562 10.6575C10.5872 10.2144 10.5473 9.74376 10.5371 9.24502C10.5377 8.07214 10.7595 6.97442 11.1998 5.94696C11.6438 4.9109 12.2535 4.01215 13.029 3.24642C13.8069 2.47836 14.708 1.8723 15.7357 1.42764C16.7534 0.987252 17.8529 0.760138 19.0392 0.75Z"
                                  fill="url(#paint0_linear_4150_23264)"
                                  fillOpacity="0.12"
                                  stroke="url(#paint1_linear_4150_23264)"
                                />
                              </g>
                              <defs>
                                <linearGradient
                                  id="paint0_linear_4150_23264"
                                  x1="16.0371"
                                  y1="32.25"
                                  x2="15.1979"
                                  y2="0.272026"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#FB923C" />
                                  <stop offset="1" stopColor="#F43F5E" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_4150_23264"
                                  x1="3.11403"
                                  y1="20.6755"
                                  x2="28.8449"
                                  y2="20.6787"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#F43F5E" />
                                  <stop offset="1" stopColor="#FB923C" />
                                </linearGradient>
                                <clipPath id="clip0_4150_23264">
                                  <rect
                                    width="32"
                                    height="32"
                                    fill="white"
                                    transform="translate(0.0371094 0.25)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <div className="text-[14px] text-[#D4D4D4] font-semibold leading-normal">
                              {item.calories}
                            </div>
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
                                d="M7.9987 14.6654C6.68016 14.6654 5.39123 14.2744 4.2949 13.5418C3.19857 12.8093 2.34409 11.7681 1.8395 10.5499C1.33492 9.33175 1.2029 7.99131 1.46013 6.6981C1.71737 5.40489 2.35231 4.21701 3.28466 3.28466C4.21701 2.35231 5.40489 1.71737 6.6981 1.46013C7.99131 1.2029 9.33175 1.33492 10.5499 1.8395C11.7681 2.34409 12.8093 3.19857 13.5418 4.2949C14.2744 5.39123 14.6654 6.68016 14.6654 7.9987C14.6634 9.76622 13.9604 11.4608 12.7106 12.7106C11.4608 13.9604 9.76622 14.6634 7.9987 14.6654ZM7.9987 2.66537C6.94387 2.66537 5.91272 2.97816 5.03566 3.5642C4.1586 4.15023 3.47501 4.98318 3.07134 5.95772C2.66768 6.93226 2.56206 8.00462 2.76785 9.03918C2.97363 10.0737 3.48158 11.0241 4.22746 11.7699C4.97334 12.5158 5.92365 13.0238 6.95822 13.2296C7.99278 13.4353 9.06514 13.3297 10.0397 12.9261C11.0142 12.5224 11.8472 11.8388 12.4332 10.9617C13.0192 10.0847 13.332 9.05353 13.332 7.9987C13.3304 6.5847 12.768 5.22907 11.7682 4.22922C10.7683 3.22937 9.4127 2.66696 7.9987 2.66537Z"
                                fill="url(#paint0_linear_6488_11793)"
                              />
                              <path
                                d="M7.9987 8.66537C7.82189 8.66537 7.65232 8.59513 7.5273 8.47011C7.40227 8.34508 7.33203 8.17551 7.33203 7.9987V5.33203C7.33203 5.15522 7.40227 4.98565 7.5273 4.86063C7.65232 4.73561 7.82189 4.66537 7.9987 4.66537C8.17551 4.66537 8.34508 4.73561 8.47011 4.86063C8.59513 4.98565 8.66537 5.15522 8.66537 5.33203V7.9987C8.66537 8.17551 8.59513 8.34508 8.47011 8.47011C8.34508 8.59513 8.17551 8.66537 7.9987 8.66537Z"
                                fill="url(#paint1_linear_6488_11793)"
                              />
                              <path
                                d="M10.182 10.8487C10.0052 10.8487 9.8357 10.7784 9.7107 10.6534L7.5273 8.47011C7.40586 8.34437 7.33873 8.1759 7.34025 8.0011C7.34177 7.8263 7.41188 7.65909 7.53549 7.53549C7.65909 7.41188 7.8263 7.34177 8.0011 7.34025C8.1759 7.33873 8.3443 7.40593 8.47003 7.52737L10.6534 9.7107C10.7466 9.80394 10.81 9.92271 10.8358 10.052C10.8615 10.1813 10.8483 10.3153 10.7978 10.4371C10.7474 10.5589 10.6619 10.663 10.5523 10.7363C10.4427 10.8096 10.3139 10.8487 10.182 10.8487Z"
                                fill="url(#paint2_linear_6488_11793)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_6488_11793"
                                  x1="0.819211"
                                  y1="9.84267"
                                  x2="15.1141"
                                  y2="9.84499"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#F43F5E" />
                                  <stop offset="1" stopColor="#FB923C" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_6488_11793"
                                  x1="0.819211"
                                  y1="9.84267"
                                  x2="15.1141"
                                  y2="9.84499"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#F43F5E" />
                                  <stop offset="1" stopColor="#FB923C" />
                                </linearGradient>
                                <linearGradient
                                  id="paint2_linear_6488_11793"
                                  x1="0.819211"
                                  y1="9.84267"
                                  x2="15.1141"
                                  y2="9.84499"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#F43F5E" />
                                  <stop offset="1" stopColor="#FB923C" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="text-[14px] text-[#D4D4D4] font-semibold leading-normal">
                              {item.duration} min
                            </div>
                          </div>
                        </div> */}
                        <h5 className="text-[14px] text-[#FFFFFF] font-bold leading-normal">
                          Focus Areas
                        </h5>
                        <div className="flex gap-[6px]">
                          {item.focusArea.map((area: string) => (
                            <div
                              key={area}
                              className="flex items-center justify-center gap-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="4"
                                height="5"
                                viewBox="0 0 4 5"
                                fill="none"
                              >
                                <circle
                                  cx="2"
                                  cy="2.5"
                                  r="2"
                                  fill="url(#paint0_linear_10610_90885)"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_10610_90885"
                                    x1="-0.153846"
                                    y1="3.05319"
                                    x2="4.13463"
                                    y2="3.05389"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F43F5E" />
                                    <stop offset="1" stopColor="#FB923C" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <span className="text-[11px] text-[#D4D4D4] font-semibold leading-normal">
                                {area}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                    <LikeRecommendedVid
                      videoId={item._id}
                      likeFor={"video"}
                      initialLiked={item.isLiked}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* <RecommendedVideosCorousel category={videoData.category} /> */}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-6">
        <h1 className="text-[40px] text-white">Video Not Available</h1>
        <p className="text-[24px] text-white">
          Sorry, we are unable to load the video at the moment. Please try again
          later.
        </p>
      </div>
    );
  }
}
