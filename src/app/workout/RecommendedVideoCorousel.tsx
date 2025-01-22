"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogCardPic from "../../../public/blogCardPic.png";
import Link from "next/link";
import LikeButton from "../Components/LikeButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VideoData {
  _id: string;
  itemid: string;
  thumbnailUrl: string;
  level: string;
  title: string;
  category: string;
  description: string;
  calories: string;
  duration: string;
  isLiked: boolean;
  share: number;
  likes: number;
  videoUrl: string;
  contentType: string;
}

const RecommendedVideosCorousel = ({ category }: any) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  //console.log("video category in corousel", category);
  const [categoryVideoData, setCategoryVideoData] = useState<VideoData[]>([]);

  async function fetchVideoByCategory() {
    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/workout/recommended?category=${category}`,
      );
      const result = await res.json();
      //console.log("result from fetchVideoByCategory", result);
      setCategoryVideoData(result.data);
    } catch (error) {
      //console.error("Error fetching category data:", error);
      throw new Error("Failed to load related videos. Please try again later.");
    }
  }

  useEffect(() => {
    fetchVideoByCategory();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center md:hidden">
        <Carousel className="w-full  max-w-[270px]">
          <CarouselContent>
            {categoryVideoData &&
              categoryVideoData.map((item) => (
                <CarouselItem key={item._id}>
                  <Link
                    className="ml-2 w-[304px] h-auto rounded-lg"
                    href={{
                      pathname: `/workout/${item._id}`,
                      query: { playing: false },
                    }}
                  >
                    <div className="relative">
                      <Image
                        src={
                          item.thumbnailUrl ? item.thumbnailUrl : BlogCardPic
                        }
                        alt="man/woman performing exercise"
                        layout="fixed"
                        width={304}
                        height={288}
                        className="rounded-[12px] w-[304px] h-[288px] object-cover"
                      />
                      <span className="absolute top-4 left-4 flex justify-center items-center bg-[#FFF] rounded-[4px] py-1 px-2">
                        <span>{item.category}</span>
                      </span>
                      <LikeButton
                        videoId={item._id}
                        likeFor={"video"}
                        initialLiked={item.isLiked}
                      />
                    </div>
                    <div className="w-[304px]">
                      <div className="flex items-center justify-between max-w-[270px]">
                        <h2 className="text-[24px] max-w-[200px] text-[#FFFFFF] font-bold leading-normal truncate overflow-hidden whitespace-nowrap text-ellipsis">
                          {item.title}
                        </h2>
                        <span className="text-[18px] text-[#E5E5E5] font-bold leading-normal">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#D4D4D4] font-normal leading-normal mt-2 line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between py-2">
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
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default RecommendedVideosCorousel;
