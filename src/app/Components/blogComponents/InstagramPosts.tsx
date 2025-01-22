"use client";
import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import { InstagramPostSkeleton } from "../skeletons/BlogSkeleton";

type InstagramPost = {
    id: string;
    media_url: string;
    caption: string;
  };

const InstagramPosts = () => {
    const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
    console.log("apiEndpoint",apiEndpoint);
    const [posts, setPosts] = useState<InstagramPost[] | null>(null);

    const fetchInstagramPosts = async()=>{
        try {
            const res = await fetch(
              `${apiEndpoint}/api/fitnearn/web/users/instagram`,
            );
            if (!res.ok) {
              return null; // Return null or handle it appropriately
            }
            const result = await res.json();
            console.log("fetchInstagramPosts",result);
            setPosts(result.data)
          } catch (error) {
            //console.log("Error fetching Instagram posts:", error);
            return null; // Return null or handle it appropriately
          }
    }

    useEffect(()=>{
        fetchInstagramPosts();
    },[]);
    
  return (
    <div className="w-auto md:w-[320px] xl:w-[402px]  bg-[#262626] rounded-[7px] border-[0.5px] border-[#444444]">
                {posts ? (
                  posts.slice(0, 1).map((post: any) => (
                    <Link
                      href="https://www.instagram.com/fitearn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      key={post.id}
                    >
                      <div className="w-auto md:w-[320px] xl:w-[402px] h-auto p-4">
                        <div className="flex justify-start items-center w-full gap-2 mt-[10px]">
                          <Image
                            src={Logo}
                            width={32}
                            height={32}
                            alt="FitnEarn logo"
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
                  ))
                ) : (
                  <InstagramPostSkeleton />
                )}
              </div>
  )
};

export default InstagramPosts;
