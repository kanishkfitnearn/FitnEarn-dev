"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SessionThumbnail from "../../../public/sessionThumbnail.jpg";
import UserAvatar from "../../../public/userAvatar.png";
import ShareVideoComponent from "../workout/shareVideo";
import ShareSessionDesktop from "../publicLiveSession/shareSessionDesktop";
import LikeButton from "../Components/LikeButton";
import LikeRecommendedSession from "./LikeRecommendedSessions";
import LikeBtnForPublicLiveSession from "./LikePublicLiveSession";
import LikeSessionDesktop from "../publicLiveSession/likeSessionDesktop";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import VideoSkeleton from "./VideoSkeleton";
import { Suspense } from "react";
import { RecommendedVids } from "../Components/skeletons/BlogSkeleton";
import { setPublicSessionPrice } from "@/store/slice";
import { useSelector, useDispatch } from "react-redux";

interface SessionData {
  _id: string;
  bookedSeats: number;
  category: string;
  coachId: string;
  coachName: string;
  createdAt: string;
  dateTime: string;
  date: string;
  level: string;
  description: string;
  calories: string;
  duration: number;
  meetLink: string;
  participants: string[];
  seats: number;
  state: string;
  status: string;
  title: string;
  updatedAt: string;
  thumbnailURL?: string; // Optional if it might be undefined
  __v: number;
  isLiked: boolean;
  focusArea: string[]; // Array of focus areas
  likes: number;
  report: boolean;
  reportReason: string[]; // Array of report reasons
  equipment: string;
  isFree: boolean;
  startTime: string;
  intensityLevel: string;
  price: number;
  isRegistered: string;
  discountPercent: number;
  durationRange: string;
}

const LiveSession = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const params = useSearchParams();
  const sessionId = params.get("id")!;
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [categorySessions, setCategorySession] = useState([]);
  const [reason, setReason] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userPlan, setUserPlan] = useState<number>();
  const router = useRouter();
  const genToken = Cookies.get("genToken");
  const userId = Cookies.get("user_id");
  const username = Cookies.get("username");

  const { toast } = useToast();

  const dispatch = useDispatch();

  const getSessionDetails = async () => {
    const response = await fetch(
      userId
        ? `${apiEndpoint}/api/fitnearn/web/users/session/${sessionId}?userId=${userId}`
        : `${apiEndpoint}/api/fitnearn/web/users/session/${sessionId}`,
    );
    const result = await response.json();
    //console.log("result from sessionDetails", result);
    if (result.success) {
      setSessionData(result.data.session);
      setIsLiked(result.data.isLiked);
      setCategorySession(result.data.recommendedSessions);
    } else {
      //console.log("problem while fetching session details", result);
    }
  };

  useEffect(() => {
    getSessionDetails();
  }, [sessionId]);

  const showTime = (sessionDate: string | undefined) => {
    if (sessionDate === undefined) return "NaN";
    const date = new Date(sessionDate);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Format hours and minutes to 12-hour format with AM/PM
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // const showDuration = (time:number)=>{
  //     return time/60 ;
  // }

  function timeRemaining(targetDateTime: string | undefined): string {
    if (targetDateTime === undefined) return "NaN";

    const now = new Date();
    const targetDate = new Date(targetDateTime);

    // Check if the target date is valid
    if (isNaN(targetDate.getTime())) {
      return "Invalid date";
    }

    const diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return "Live";
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ${diffHours} hr`;
    }

    if (diffHours > 0) {
      return `${diffHours} hr`;
    }

    if (diffMinutes > 0) {
      return `${diffMinutes} min`;
    }

    return "Less than a minute";
  }

  const handleJoin = async () => {
    const coachId = sessionData?.coachId;
    if (username && genToken === undefined) {
      router.push(`/login`);
      return;
    }
    if (username && genToken) {
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/user/seats/${sessionId}`,
          {
            headers: {
              Authorization: "Bearer " + genToken,
            },
          },
        );
        const result = await response.json();
        //console.log("result from handleJoin", result);
        if (result.success) {
          if (result.isRegistered && result.isStarted) {
            const fallbackUrl = sessionData?.meetLink?.replace(
              "intent://",
              "https://",
            );
            //console.log("meetlink", fallbackUrl);
            if (fallbackUrl) {
              window.open(fallbackUrl, "_blank");
            }
            return;
          }
          if (result.isRegistered && !result.isStarted) {
            toast({
              title: "Session not stated yet!",
              description: result.message,
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });
            return;
          }
          if (!result.isRegistered && result.isStarted) {
            toast({
              title: "Session has already been started!",
              description: `Booking is close for this session. ${result.message}`,
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });
          }
          const metadata = {
            coachId: sessionData?.coachId,
            sessionId: sessionData?._id,
          };

          if (!result.isRegistered && !result.isStarted) {
            //console.log("i am on right condition");
            let url;
            let price;
            if (userPlan === 3 || userPlan === 4) {
              if (sessionData?.price && sessionData?.discountPercent) {
                price =
                  sessionData?.price * (1 - sessionData?.discountPercent / 100);
                dispatch(setPublicSessionPrice(price));
                url = `/confirmBooking?coachId=${metadata.coachId}&sessionId=${metadata.sessionId}`;
                router.push(url);
              }
            } else {
              dispatch(setPublicSessionPrice(sessionData?.price));
              url = `/confirmBooking?coachId=${metadata.coachId}&sessionId=${metadata.sessionId}`;
              router.push(url);
            }
          }
        } else {
          //console.log(result.message);
          toast({
            title: result.message,
            description: result.message,
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }
      } catch (err) {
        //console.log("error while checking seats", err);
      }
    } else {
      router.push(`/signup`);
    }
  };

  // const getAllSessions = async () => {
  //   try {
  //     const response = await fetch(
  //       "${apiEndpoint}/api/fitnearn/web/user/public/session/get",
  //       {
  //         headers: {
  //           Authorization: "Bearer " + genToken,
  //         },
  //       },
  //     );
  //     const result = await response.json();
  //     //console.log("sessions result", result.sessions);
  //     if (result.success) {
  //       const filteredSessions = result.sessions.filter(
  //         (item: SessionData) => item.category === sessionData?.category,
  //       );
  //       //console.log("filteredSessions", filteredSessions);
  //       setCategorySession(filteredSessions);
  //     }
  //   } catch (error) {
  //     //console.error("Error fetching sessions:", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllSessions();
  // }, [sessionData]);

  const handleReport = () => {
    // Check if user is logged in
    if (!userId) {
      setDialogOpen(false);
      toast({
        title: "You are logged in",
        description: "You need to login to report this blog.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    // Check if the report text is not null or empty
    if (!reason || reason.trim() === "") {
      toast({
        title: "Null value passed",
        description:
          "Your report reason should not be null. enter a valid report reason.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    // If both checks pass, call the patch API
    axios
      .patch(
        `${apiEndpoint}/api/fitnearn/web/user/session/report/${sessionId}`,
        {
          userId,
          reason,
        },
      )
      .then((response) => {
        //console.log("Response from reporting the blog:", response);
        if (response.status === 200) {
          //console.log(response.data.message);
          setReason("");
          setDialogOpen(false);
          // toast.success("Your report has been submitted successfully.");
          toast({
            title: "Done!",
            description: "Your report has been submitted successfully.",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const getPlanDetails = async () => {
    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/subscription-plan/active/${userId}`,
      );
      const result = await res.json();
      //console.log("planDetails", result);
      if (result.success) {
        //console.log("planId", result.subscription.plan_id);
        setUserPlan(result.subscription.plan_id);
        return;
      }
      setUserPlan(0);
    } catch (err) {
      //console.log("something went wrong", err);
    }
  };

  useEffect(() => {
    getPlanDetails();
  }, [userId]);

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

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5 pt-[72px] md:py-[72px] px-3 md:px-[72px]">
      {sessionData ? (
        <div className="w-full md:flex-[70%] flex flex-col justify-start items-start mt-0 md:mt-7 shrink-0">
          <div className="relative max-w-full md:max-w-[95%] w-full h-[220px] md:h-[486px] mt-1 rounded-[18px]">
            <Image
              src={
                sessionData?.thumbnailURL
                  ? sessionData.thumbnailURL
                  : SessionThumbnail
              }
              // height={486}
              // width={1000}
              alt="session thumbnail"
              // className="h-[220px] md:h-[486px] w-full  max-w-[95%] border-[1px] border-[#404040] rounded-[18px]"
              layout="fill"
              objectFit="cover"
              className="rounded-[18px]"
            />
            <div
              className="w-full h-[44px] md:h-[90px] bg-[#262626] absolute bottom-0 rounded-tl-[4px] rounded-tr-[4px] rounded-br-[18px] rounded-bl-[18px] border-[1px] border-[#262626] px-5 
                      flex justify-between items-center"
            >
              <div className="flex items-center justify-center gap-0 md:gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[14px] md:w-[32px] h-[15px] md:h-[32px]"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_10952_52045)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.4914 0.192503C18.269 0.157684 18.0419 0.167015 17.8231 0.219963C17.6043 0.272912 17.398 0.368441 17.2161 0.501096C17.0342 0.633751 16.8802 0.800934 16.763 0.993101C16.6457 1.18527 16.5674 1.39865 16.5326 1.62107C16.4978 1.8435 16.5071 2.0706 16.56 2.28941C16.613 2.50823 16.7085 2.71447 16.8412 2.89637C16.9738 3.07827 17.141 3.23225 17.3332 3.34954C17.5253 3.46683 17.7387 3.54511 17.9611 3.57993C21.0794 4.08206 23.8946 5.73917 25.8471 8.22186C27.7996 10.7046 28.7464 13.831 28.4993 16.9798C28.2522 20.1286 26.8293 23.0691 24.5135 25.2169C22.1977 27.3646 19.1585 28.5623 16 28.5719C13.4793 28.5724 11.0167 27.8154 8.93151 26.399C6.84636 24.9827 5.23493 22.9725 4.30629 20.6291C4.22829 20.4132 4.10775 20.2153 3.95182 20.0469C3.79589 19.8785 3.60774 19.7432 3.39852 19.6489C3.18931 19.5546 2.96329 19.5032 2.73386 19.4979C2.50443 19.4926 2.27627 19.5333 2.0629 19.6178C1.84953 19.7023 1.6553 19.8288 1.49171 19.9897C1.32813 20.1507 1.19853 20.3429 1.1106 20.5548C1.02267 20.7668 0.978188 20.9943 0.979802 21.2238C0.981417 21.4533 1.02909 21.6801 1.12 21.8908C2.49318 25.3501 5.02905 28.2226 8.29132 30.0142C11.5536 31.8058 15.3383 32.4044 18.9942 31.707C22.6501 31.0097 25.9487 29.0599 28.3225 26.1933C30.6962 23.3267 31.9966 19.7224 32 16.0005C31.9998 12.1886 30.6391 8.50184 28.1626 5.60387C25.6862 2.70591 22.2567 0.786997 18.4914 0.192503ZM14.0891 1.51136C14.1455 1.72958 14.1582 1.95678 14.1267 2.17993C14.0951 2.40309 14.0199 2.61784 13.9052 2.81188C13.7906 3.00592 13.6388 3.17546 13.4586 3.31078C13.2783 3.4461 13.0732 3.54455 12.8549 3.6005C12.2822 3.74785 11.7208 3.93575 11.1749 4.16279C10.967 4.24924 10.7441 4.29389 10.519 4.29422C10.2939 4.29454 10.0709 4.25051 9.8628 4.16466C9.65469 4.0788 9.46553 3.9528 9.30612 3.79384C9.1467 3.63488 9.02016 3.44608 8.93371 3.23822C8.84727 3.03035 8.80261 2.8075 8.80229 2.58238C8.80197 2.35725 8.84599 2.13427 8.93184 1.92616C9.0177 1.71805 9.1437 1.52889 9.30266 1.36948C9.46162 1.21006 9.65042 1.08352 9.85829 0.997074C10.5486 0.709074 11.264 0.469074 12.0023 0.27936C12.2204 0.223362 12.4473 0.210868 12.6702 0.242593C12.8931 0.274317 13.1076 0.349638 13.3014 0.464255C13.4952 0.578871 13.6645 0.730538 13.7996 0.910594C13.9348 1.09065 14.0332 1.29328 14.0891 1.51136ZM7.28 4.32965C7.59623 4.6559 7.77 5.09434 7.76314 5.54864C7.75629 6.00295 7.56936 6.43595 7.24343 6.7525C6.39353 7.58085 5.66275 8.52318 5.072 9.5525C4.96334 9.75356 4.81558 9.93085 4.6374 10.074C4.45922 10.2171 4.25423 10.3231 4.03447 10.3859C3.81471 10.4486 3.58463 10.4668 3.35775 10.4393C3.13087 10.4118 2.91178 10.3392 2.71335 10.2259C2.51492 10.1125 2.34117 9.96055 2.20231 9.77904C2.06345 9.59752 1.96229 9.39008 1.90477 9.1689C1.84725 8.94772 1.83454 8.71727 1.86738 8.4911C1.90022 8.26494 1.97795 8.04762 2.096 7.85193C2.84459 6.5418 3.77412 5.34373 4.85714 4.29307C5.18339 3.97685 5.62184 3.80307 6.07614 3.80993C6.53044 3.81679 6.96344 4.00372 7.28 4.32965ZM2.09371 12.0691C2.54378 12.1325 2.95022 12.3721 3.22368 12.7352C3.49714 13.0982 3.61523 13.555 3.552 14.0051C3.46956 14.5919 3.42832 15.1839 3.42857 15.7765C3.42857 16.2312 3.24796 16.6672 2.92647 16.9887C2.60498 17.3102 2.16894 17.4908 1.71429 17.4908C1.25963 17.4908 0.823594 17.3102 0.502103 16.9887C0.180612 16.6672 0 16.2312 0 15.7765C0 15.0154 0.0525714 14.2634 0.157714 13.5274C0.221168 13.0773 0.460754 12.6709 0.823797 12.3974C1.18684 12.1239 1.64362 12.0058 2.09371 12.0691ZM10.2857 20.3022V11.6988C10.2859 11.3093 10.3856 10.9264 10.5754 10.5863C10.7652 10.2462 11.0387 9.96019 11.37 9.75549C11.7014 9.55078 12.0795 9.43413 12.4686 9.41661C12.8577 9.39909 13.2448 9.48127 13.5931 9.65536L22.1966 13.9571C22.5757 14.1471 22.8945 14.4389 23.1173 14.7998C23.3401 15.1606 23.4581 15.5764 23.4581 16.0005C23.4581 16.4246 23.3401 16.8404 23.1173 17.2012C22.8945 17.5621 22.5757 17.8539 22.1966 18.0439L13.5931 22.3456C13.2448 22.5197 12.8577 22.6019 12.4686 22.5844C12.0795 22.5669 11.7014 22.4502 11.37 22.2455C11.0387 22.0408 10.7652 21.7548 10.5754 21.4147C10.3856 21.0746 10.2859 20.6917 10.2857 20.3022Z"
                      fill="url(#paint0_linear_10952_52045)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_10952_52045"
                      x1="-1.23077"
                      y1="20.4816"
                      x2="33.077"
                      y2="20.4872"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <clipPath id="clip0_10952_52045">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="flex flex-col justify-start items-center gap-[2px] md:gap-1">
                  <span className="flex justify-center items-center gap-1 text-[10px] md:text-[16px] text-[#D4D4D4] font-semibold leading-normal">
                    {/* {showTime(sessionData?.dateTime)} */}
                    {sessionData?.startTime}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="none"
                    >
                      <circle cx="2" cy="2" r="2" fill="#D4D4D4" />
                    </svg>
                    {sessionData?.duration} min
                  </span>
                  <span className="text-[8px] md:text-[12px] bg-[#404040] text-[#15803D] font-medium leading-[12px] md:leading-[18px] rounded-[6px] px-[2px] md:px-[10px] py-[2px]">
                    Starting in {timeRemaining(sessionData?.dateTime)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="hidden md:block text-[20px] text-[#E5E5E5] font-medium leading-normal">
                  {sessionData?.date}
                </div>
                <div className="text-[10px] md:text-[20px] text-[#D4D4D4] font-medium leading-[15px] md:leading-[30px]">
                  {sessionData?.coachName}
                </div>
              </div>
              <div className="flex-col items-start justify-center hidden md:flex">
                <div className=" text-[20px] text-[#D4D4D4] font-medium leading-[30px]">
                  Seats Left
                </div>
                <div className=" text-[16px]  text-[#D4D4D4] font-medium leading-[30px]">
                  {(sessionData?.seats ?? 0) - (sessionData?.bookedSeats ?? 0)}{" "}
                </div>
              </div>
              <div className="flex-col items-start justify-center hidden md:flex">
                <div className="flex items-center justify-start gap-2">
                  <span className="text-[20px] text-[#D4D4D4] font-medium leading-[30px]">
                    {userPlan === 3 || userPlan === 4
                      ? `₹ ${sessionData?.price * (1 - sessionData?.discountPercent / 100)}`
                      : `₹ ${sessionData?.price}`}{" "}
                  </span>
                  <span className="text-[20px] text-[#D4D4D4] font-medium leading-[30px] line-through">
                    {userPlan === 3 || userPlan === 4
                      ? `₹ ${sessionData?.price}`
                      : ""}
                  </span>
                </div>
                {userPlan === 3 || userPlan === 4 ? (
                  <div className=" text-[16px]  text-[#FACA15] font-medium leading-[30px]">
                    {`${sessionData?.discountPercent}% discount applied`}
                  </div>
                ) : (
                  <Link
                    href={"/subscription-plans"}
                    className=" text-[16px]  text-[#FACA15] font-medium leading-[30px]"
                  >
                    {`Get (${sessionData?.discountPercent ? sessionData?.discountPercent : 5}% OFF)`}
                  </Link>
                )}
              </div>
              <div className="">
                <button
                  className="primaryButton flex justify-center items-center text-[12px] md:text-[14px] md:leading-[21px] text-[#FFFFFF] font-medium py-[5px] md:py-[10px] px-[7px] md:px-5 rounded-[8px]"
                  onClick={handleJoin}
                  // disabled
                >
                  {sessionData?.isRegistered ? "Join Now" : "Book Now"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-1 my-3 md:hidden">
            <div className="text-[12px] text-[#D4D4D4] font-medium leading-[18px]">
              {(sessionData?.seats ?? 0) - (sessionData?.bookedSeats ?? 0)}{" "}
              Seats Left
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
            >
              <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
            </svg>
            <div className="text-[12px] text-[#D4D4D4] font-medium leading-[18px]">
              {sessionData?.date}
            </div>
          </div>

          <div className="flex items-start justify-between w-full gap-4 mb-3 md:hidden md:justify-end">
            <div className="flex items-center justify-center gap-2 pt-2">
              <LikeBtnForPublicLiveSession
                sessionId={sessionData?._id ?? ""}
                initialLiked={isLiked}
                initialLikeCount={sessionData?.likes ?? 0}
              />
            </div>
            <div className="pt-2">
              <ShareVideoComponent />
            </div>
            <div className="ml-[150px] md:ml-0 mr-[10px] md:mr-0 pt-2">
              <Popover>
                <PopoverTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[20px] md:w-[24px] h-[20px] md:h-[20px]"
                    width="6"
                    height="24"
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
                <PopoverContent className="w-[232px] bg-[#262626] border-[1px] border-[#404040] rounded-[16px] py-3 px-5 flex flex-col md:mt-[20px] md:mr-[70px]">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger>
                      <div className="flex items-center justify-between cursor-pointer">
                        <h4 className="text-[14px] text-[#D4D4D4] font-semibold leading-normal">
                          Report
                        </h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16C12.9993 15.7173 12.9033 15.48 12.712 15.288C12.5207 15.096 12.2833 15 12 15C11.7167 15 11.4793 15.096 11.288 15.288C11.0967 15.48 11.0007 15.7173 11 16C10.9993 16.2827 11.0953 16.5203 11.288 16.713C11.4807 16.9057 11.718 17.0013 12 17ZM11 13H13V7H11V13ZM8.25 21L3 15.75V8.25L8.25 3H15.75L21 8.25V15.75L15.75 21H8.25ZM9.1 19H14.9L19 14.9V9.1L14.9 5H9.1L5 9.1V14.9L9.1 19Z"
                            fill="#D4D4D4"
                          />
                        </svg>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="report-dialog px-[20px] md:px-[48px]">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription className="flex flex-col items-center justify-center pt-6">
                          <div className="w-full h-[1px] bg-[#737373]"></div>
                          <h2 className="text-[28px] md:text-[32px] text-[#FFFFFF] font-bold leading-normal mt-3 md:mt-5 mb-2 md:mb-[10px]">
                            Report Your Issue
                          </h2>
                          <h5 className="text-[16px] md:text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                            Please share what issue you are facing?
                          </h5>
                          <Textarea
                            className="h-[148px] bg-[#171717] text-white p-[10px] my-6"
                            placeholder="Enter your text here..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          />
                          <Button
                            className="primaryButton w-[327px] text-[18px] text-[#FFFFFF] font-bold leading-[21px]"
                            onClick={handleReport}
                          >
                            Submit
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex w-full max-w-[98%]  flex-wrap-reverse md:flex-nowrap justify-between md:mt-[42px]">
            {/* this is for mobile view only */}
            <div className="flex flex-wrap items-center justify-start gap-2 mt-2 md:hidden">
              {/* <div className="flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.9974 4.16797C5.5074 4.16797 1.66406 8.61464 1.66406 10.0013C1.66406 11.453 4.61906 15.8346 9.9974 15.8346C15.3757 15.8346 18.3307 11.453 18.3307 10.0013C18.3307 8.61464 14.4874 4.16797 9.9974 4.16797ZM9.9974 12.5013C9.50294 12.5013 9.01959 12.3547 8.60847 12.08C8.19735 11.8053 7.87692 11.4148 7.6877 10.958C7.49848 10.5012 7.44897 9.99853 7.54543 9.51358C7.6419 9.02862 7.88 8.58317 8.22963 8.23353C8.57926 7.8839 9.02472 7.6458 9.50967 7.54934C9.99462 7.45288 10.4973 7.50238 10.9541 7.6916C11.4109 7.88082 11.8014 8.20125 12.0761 8.61238C12.3508 9.0235 12.4974 9.50685 12.4974 10.0013C12.4974 10.6643 12.234 11.3002 11.7652 11.7691C11.2963 12.2379 10.6604 12.5013 9.9974 12.5013Z" fill="url(#paint0_linear_11214_53419)" />
                  <defs>
                    <linearGradient id="paint0_linear_11214_53419" x1="1.02304" y1="11.6148" x2="18.8917" y2="11.6189" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px]">
                  {sessionData?.duration ? sessionData.duration : 60}
                </span>
              </div> */}

              <div className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.6693 2.1888C11.6693 3.15994 11.8483 4.05512 12.2064 4.87435C12.5645 5.69358 13.0799 6.4477 13.7526 7.13672C14.4253 7.82574 14.9408 8.57986 15.2988 9.39909C15.6569 10.2183 15.8359 11.1135 15.8359 12.0846C15.8359 12.6597 15.7627 13.2131 15.6162 13.7448C15.4697 14.2765 15.2581 14.7729 14.9814 15.234C14.7048 15.6952 14.3792 16.1184 14.0049 16.5036C13.6305 16.8888 13.2101 17.2143 12.7435 17.4801C12.2769 17.746 11.7778 17.9549 11.2461 18.1068C10.7144 18.2587 10.161 18.3346 9.58594 18.3346C9.01085 18.3346 8.45747 18.2614 7.92578 18.1149C7.3941 17.9684 6.89768 17.7568 6.43652 17.4801C5.97537 17.2035 5.55219 16.8779 5.16699 16.5036C4.78179 16.1292 4.45627 15.7088 4.19043 15.2422C3.92459 14.7756 3.71571 14.2765 3.5638 13.7448C3.41189 13.2131 3.33594 12.6597 3.33594 12.0846C3.33594 11.6289 3.38477 11.1813 3.48242 10.7419C3.58008 10.3024 3.72114 9.88194 3.9056 9.48047C4.09006 9.07899 4.31793 8.69651 4.58919 8.33301C4.86046 7.96951 5.16699 7.64128 5.50879 7.34831C5.54677 7.55447 5.59831 7.76606 5.66341 7.98307C5.72852 8.20009 5.80447 8.4171 5.89128 8.63411C5.97808 8.85113 6.08116 9.05729 6.20052 9.2526C6.31988 9.44792 6.44466 9.62967 6.57487 9.79785C6.68338 9.93349 6.82444 10.0013 6.99805 10.0013C7.14453 10.0013 7.2666 9.94976 7.36426 9.84668C7.46191 9.7436 7.51345 9.61881 7.51888 9.47233C7.51888 9.41265 7.51074 9.3584 7.49447 9.30957C7.47819 9.26074 7.45106 9.21191 7.41309 9.16309C7.26118 8.94065 7.12826 8.72092 7.01432 8.50391C6.90039 8.28689 6.80002 8.06445 6.71322 7.83659C6.62641 7.60872 6.56402 7.37272 6.52604 7.12858C6.48806 6.88444 6.46636 6.62674 6.46094 6.35547C6.46094 5.70985 6.58301 5.10221 6.82715 4.53255C7.07129 3.96289 7.40766 3.46647 7.83626 3.04329C8.26487 2.62012 8.76128 2.28646 9.32552 2.04232C9.88976 1.79818 10.4974 1.67339 11.1484 1.66797H11.6693V2.1888Z"
                    fill="url(#paint0_linear_11214_53422)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11214_53422"
                      x1="2.85517"
                      y1="12.3063"
                      x2="16.2567"
                      y2="12.3079"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px]">
                  {/* {sessionData?.calories ? sessionData.calories : 295} Kcal */}
                  {getCaloriesDisplayValue(sessionData?.calories)} cal
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <rect
                    x="0.664062"
                    y="11.3359"
                    width="3.56391"
                    height="5.99166"
                    fill="url(#paint0_linear_11291_11743)"
                  />
                  <rect
                    x="5.44792"
                    y="9.35807"
                    width="2.73058"
                    height="7.55499"
                    fill="url(#paint1_linear_11291_11743)"
                    stroke="url(#paint2_linear_11291_11743)"
                    strokeWidth="0.833333"
                  />
                  <rect
                    x="9.8151"
                    y="5.76432"
                    width="2.73058"
                    height="11.15"
                    fill="url(#paint3_linear_11291_11743)"
                    stroke="url(#paint4_linear_11291_11743)"
                    strokeWidth="0.833333"
                  />
                  <rect
                    x="14.1823"
                    y="1.08073"
                    width="2.72912"
                    height="15.8333"
                    stroke="url(#paint5_linear_11291_11743)"
                    strokeWidth="0.833333"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11291_11743"
                      x1="0.526989"
                      y1="15.1604"
                      x2="4.34793"
                      y2="15.1608"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_11291_11743"
                      x1="4.89418"
                      y1="14.2957"
                      x2="8.71512"
                      y2="14.2959"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_11291_11743"
                      x1="4.89418"
                      y1="14.2957"
                      x2="8.71512"
                      y2="14.2959"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_11291_11743"
                      x1="9.26136"
                      y1="12.9966"
                      x2="13.0823"
                      y2="12.9968"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_11291_11743"
                      x1="9.26136"
                      y1="12.9966"
                      x2="13.0823"
                      y2="12.9968"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_11291_11743"
                      x1="13.6286"
                      y1="11.3024"
                      x2="17.448"
                      y2="11.3025"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px]">
                  {sessionData?.level ? sessionData.level : "Intermediate"}
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
                  <rect
                    x="0.416666"
                    y="8.41667"
                    width="3.02559"
                    height="7.16667"
                    fill="url(#paint0_linear_11291_15274)"
                    stroke="url(#paint1_linear_11291_15274)"
                    strokeWidth="0.833333"
                  />
                  <rect
                    x="6.48698"
                    y="5.41667"
                    width="3.02559"
                    height="10.1667"
                    fill="url(#paint2_linear_11291_15274)"
                    stroke="url(#paint3_linear_11291_15274)"
                    strokeWidth="0.833333"
                  />
                  <rect
                    x="12.5573"
                    y="0.416666"
                    width="3.02559"
                    height="15.1664"
                    stroke="url(#paint4_linear_11291_15274)"
                    strokeWidth="0.833333"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11291_15274"
                      x1="-0.14842"
                      y1="13.1064"
                      x2="3.9888"
                      y2="13.1067"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_11291_15274"
                      x1="-0.14842"
                      y1="13.1064"
                      x2="3.9888"
                      y2="13.1067"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_11291_15274"
                      x1="5.92189"
                      y1="12.0213"
                      x2="10.0591"
                      y2="12.0215"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_11291_15274"
                      x1="5.92189"
                      y1="12.0213"
                      x2="10.0591"
                      y2="12.0215"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_11291_15274"
                      x1="11.9922"
                      y1="10.2126"
                      x2="16.1294"
                      y2="10.2128"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px]">
                  {sessionData?.intensityLevel
                    ? sessionData.intensityLevel
                    : "Intermediate"}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
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
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px]">
                  {/* {sessionData?.duration ? sessionData.duration : 60} min */}
                  {getDurationDisplayValue(sessionData.durationRange)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6667 8.33333H16.0358L15.4467 6.91083L15.8925 6.46417C16.0487 6.30789 16.1365 6.09597 16.1365 5.875C16.1365 5.65403 16.0487 5.44211 15.8925 5.28583L14.7142 4.1075C14.5579 3.95127 14.346 3.86351 14.125 3.86351C13.904 3.86351 13.6921 3.95127 13.5358 4.1075L13.0892 4.55333L11.6667 3.96417V3.33333C11.6667 3.11232 11.5789 2.90036 11.4226 2.74408C11.2663 2.5878 11.0543 2.5 10.8333 2.5H9.16667C8.94565 2.5 8.73369 2.5878 8.57741 2.74408C8.42113 2.90036 8.33333 3.11232 8.33333 3.33333V3.96417L6.91083 4.55333L6.46417 4.1075C6.30789 3.95127 6.09597 3.86351 5.875 3.86351C5.65403 3.86351 5.44211 3.95127 5.28583 4.1075L4.1075 5.28583C3.95127 5.44211 3.86351 5.65403 3.86351 5.875C3.86351 6.09597 3.95127 6.30789 4.1075 6.46417L4.55417 6.91083L3.96417 8.33333H3.33333C3.11232 8.33333 2.90036 8.42113 2.74408 8.57741C2.5878 8.73369 2.5 8.94565 2.5 9.16667V10.8333C2.5 11.0543 2.5878 11.2663 2.74408 11.4226C2.90036 11.5789 3.11232 11.6667 3.33333 11.6667H3.96417C4.24833 12.3525 4.27 12.4033 4.55333 13.0892L4.1075 13.5358C3.95127 13.6921 3.86351 13.904 3.86351 14.125C3.86351 14.346 3.95127 14.5579 4.1075 14.7142L5.28583 15.8925C5.44211 16.0487 5.65403 16.1365 5.875 16.1365C6.09597 16.1365 6.30789 16.0487 6.46417 15.8925L6.91083 15.4467L8.33333 16.0358V16.6667C8.33333 16.8877 8.42113 17.0996 8.57741 17.2559C8.73369 17.4122 8.94565 17.5 9.16667 17.5H10.8333C11.0543 17.5 11.2663 17.4122 11.4226 17.2559C11.5789 17.0996 11.6667 16.8877 11.6667 16.6667V16.0358L13.0892 15.4458L13.5358 15.8925C13.6921 16.0487 13.904 16.1365 14.125 16.1365C14.346 16.1365 14.5579 16.0487 14.7142 15.8925L15.8925 14.7142C16.0487 14.5579 16.1365 14.346 16.1365 14.125C16.1365 13.904 16.0487 13.6921 15.8925 13.5358L15.4467 13.0892L16.0358 11.6667H16.6667C16.8877 11.6667 17.0996 11.5789 17.2559 11.4226C17.4122 11.2663 17.5 11.0543 17.5 10.8333V9.16667C17.5 8.94565 17.4122 8.73369 17.2559 8.57741C17.0996 8.42113 16.8877 8.33333 16.6667 8.33333ZM10 13.3333C9.34073 13.3333 8.69626 13.1378 8.1481 12.7716C7.59994 12.4053 7.17269 11.8847 6.9204 11.2756C6.66811 10.6665 6.6021 9.9963 6.73072 9.3497C6.85933 8.7031 7.1768 8.10915 7.64298 7.64298C8.10915 7.1768 8.7031 6.85933 9.3497 6.73072C9.9963 6.6021 10.6665 6.66811 11.2756 6.9204C11.8847 7.17269 12.4053 7.59994 12.7716 8.1481C13.1378 8.69626 13.3333 9.34073 13.3333 10C13.3333 10.8841 12.9821 11.7319 12.357 12.357C11.7319 12.9821 10.8841 13.3333 10 13.3333Z"
                    fill="url(#paint0_linear_11214_53434)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11214_53434"
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
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px] whitespace-nowrap">
                  {sessionData?.equipment ? sessionData.equipment : "None"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <circle
                    cx="8.14062"
                    cy="8.64062"
                    r="8"
                    fill="url(#paint0_linear_10610_90794)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.1265 11.2997L12.0622 7.75138L10.6948 8.61907C10.4221 8.79229 10.0921 8.85207 9.77568 8.78556C9.45926 8.71906 9.18163 8.53158 9.00241 8.26338L8.1025 6.9163L7.20197 8.264C7.02266 8.53209 6.74498 8.71945 6.42857 8.78584C6.11215 8.85222 5.78222 8.79235 5.50962 8.61907L4.14276 7.75138L5.0785 11.2997H11.1265ZM4.47444 7.232C4.00071 6.93107 3.40221 7.36615 3.54488 7.90769L4.48124 11.456C4.5159 11.5875 4.5933 11.7039 4.70136 11.7869C4.80941 11.87 4.94203 11.915 5.0785 11.9151H11.1265C11.263 11.915 11.3956 11.87 11.5036 11.7869C11.6117 11.7039 11.6891 11.5875 11.7238 11.456L12.6601 7.90769C12.8022 7.36615 12.2043 6.93169 11.7306 7.232L10.3631 8.09969C10.2268 8.18636 10.0619 8.21634 9.90368 8.18321C9.74548 8.15007 9.60662 8.05646 9.51691 7.92246L8.61638 6.57477C8.55998 6.49048 8.48356 6.42138 8.39392 6.37358C8.30427 6.32579 8.20417 6.30078 8.1025 6.30078C8.00083 6.30078 7.90073 6.32579 7.81108 6.37358C7.72144 6.42138 7.64502 6.49048 7.58862 6.57477L6.68809 7.92246C6.59848 8.05656 6.45966 8.1503 6.30145 8.18355C6.14324 8.2168 5.97825 8.18691 5.84191 8.1003L4.47444 7.232Z"
                    fill="white"
                  />
                  <path
                    d="M8.68524 5.22155C8.6854 5.37578 8.62406 5.52376 8.51472 5.63294C8.40538 5.74211 8.25698 5.80354 8.10218 5.8037C7.94738 5.80387 7.79885 5.74275 7.68928 5.63381C7.5797 5.52486 7.51805 5.37701 7.51789 5.22278C7.51772 5.06855 7.57906 4.92056 7.6884 4.81139C7.79775 4.70221 7.94614 4.64079 8.10094 4.64063C8.25575 4.64046 8.40427 4.70157 8.51385 4.81052C8.62342 4.91946 8.68507 5.06731 8.68524 5.22155ZM13.3522 6.38524C13.3522 6.46161 13.3372 6.53724 13.3079 6.60781C13.2786 6.67838 13.2356 6.74251 13.1814 6.79654C13.1273 6.85057 13.063 6.89344 12.9922 6.9227C12.9214 6.95196 12.8455 6.96705 12.7688 6.96709C12.6922 6.96713 12.6163 6.95213 12.5454 6.92294C12.4746 6.89375 12.4102 6.85095 12.356 6.79698C12.3018 6.743 12.2587 6.67892 12.2294 6.60838C12.2 6.53784 12.1849 6.46222 12.1848 6.38586C12.1848 6.23162 12.2463 6.08371 12.3558 5.97465C12.4652 5.86559 12.6137 5.80432 12.7685 5.80432C12.9233 5.80432 13.0718 5.86559 13.1812 5.97465C13.2907 6.08371 13.3522 6.23101 13.3522 6.38524ZM4.01892 6.38524C4.019 6.53947 3.95758 6.68742 3.84818 6.79654C3.73878 6.90566 3.59035 6.96701 3.43555 6.96709C3.3589 6.96713 3.28299 6.95213 3.21216 6.92294C3.14133 6.89375 3.07696 6.85095 3.02274 6.79698C2.91322 6.68797 2.85164 6.54009 2.85156 6.38586C2.85156 6.23162 2.91306 6.08371 3.02252 5.97465C3.13198 5.86559 3.28044 5.80432 3.43524 5.80432C3.59004 5.80432 3.7385 5.86559 3.84796 5.97465C3.95742 6.08371 4.01892 6.23101 4.01892 6.38524Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.17188 12.6397C5.17188 12.5581 5.20441 12.4799 5.26233 12.4222C5.32024 12.3644 5.39879 12.332 5.4807 12.332H10.8771C10.959 12.332 11.0375 12.3644 11.0955 12.4222C11.1534 12.4799 11.1859 12.5581 11.1859 12.6397C11.1859 12.7213 11.1534 12.7996 11.0955 12.8573C11.0375 12.915 10.959 12.9474 10.8771 12.9474H5.4807C5.39879 12.9474 5.32024 12.915 5.26233 12.8573C5.20441 12.7996 5.17188 12.7213 5.17188 12.6397Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_10610_90794"
                      x1="-0.47476"
                      y1="10.8534"
                      x2="16.6791"
                      y2="10.8562"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px] whitespace-nowrap">
                  {sessionData?.isFree ? "" : "Premium"}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.91406 10.6042L8.20573 9.54167C8.13628 9.43056 8.03906 9.34028 7.91406 9.27083C7.78906 9.20139 7.65712 9.16667 7.51823 9.16667H2.0599C1.90712 8.80556 1.80295 8.45833 1.7474 8.125C1.69184 7.79167 1.66406 7.44444 1.66406 7.08333C1.66406 5.77778 2.10156 4.6875 2.97656 3.8125C3.85156 2.9375 4.94184 2.5 6.2474 2.5C6.96962 2.5 7.65712 2.65278 8.3099 2.95833C8.96267 3.26389 9.52517 3.69444 9.9974 4.25C10.4696 3.69444 11.0321 3.26389 11.6849 2.95833C12.3377 2.65278 13.0252 2.5 13.7474 2.5C15.053 2.5 16.1432 2.9375 17.0182 3.8125C17.8932 4.6875 18.3307 5.77778 18.3307 7.08333C18.3307 7.44444 18.3029 7.79167 18.2474 8.125C18.1918 8.45833 18.0877 8.80556 17.9349 9.16667H12.9766L11.5391 7.04167C11.4557 6.91667 11.3482 6.82306 11.2166 6.76083C11.0849 6.69861 10.9424 6.66722 10.7891 6.66667C10.6085 6.66667 10.4524 6.71889 10.3207 6.82333C10.1891 6.92778 10.0952 7.06306 10.0391 7.22917L8.91406 10.6042ZM9.9974 17.7917L8.78906 16.7083C7.33073 15.4028 6.13628 14.2847 5.20573 13.3542C4.27517 12.4236 3.54601 11.5833 3.01823 10.8333H7.01823L8.45573 12.9583C8.53906 13.0833 8.64684 13.1772 8.77906 13.24C8.91128 13.3028 9.05351 13.3339 9.20573 13.3333C9.38628 13.3333 9.54267 13.2814 9.6749 13.1775C9.80712 13.0736 9.90073 12.9381 9.95573 12.7708L11.0807 9.375L11.8099 10.4583C11.8793 10.5694 11.9766 10.6597 12.1016 10.7292C12.2266 10.7986 12.3585 10.8333 12.4974 10.8333H16.9766C16.4488 11.5833 15.7196 12.4236 14.7891 13.3542C13.8585 14.2847 12.6641 15.4028 11.2057 16.7083L9.9974 17.7917Z"
                    fill="url(#paint0_linear_11214_53437)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11214_53437"
                      x1="1.02304"
                      y1="12.2606"
                      x2="18.8917"
                      y2="12.2638"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] text-[#A3A3A3] font-normal leading-[24px]">
                  {sessionData?.category}
                </span>
              </div>
            </div>

            {/* this is for both mobile and desktop just some part is arranged in above code */}
            {/* left part */}
            <div className="flex max-w-[96%] w-full justify-start items-center gap-4">
              <Image
                src={UserAvatar}
                alt="avatar"
                className="w-[40px] md:w-[80px] h-[40px] md:h-[80px]"
                width={80}
                height={80}
              />
              <div className="flex flex-col w-full gap-1">
                <div className="flex items-center justify-between w-full max-w-full">
                  <div className="flex items-center justify-center gap-4">
                    <h2 className="text-[20px] md:text-[28px] text-[#FFFFFF] font-normal leading-normal whitespace-nowrap">
                      {sessionData?.title}
                    </h2>
                    <span
                      className="flex justify-center items-center text-[#DADADA] text-[12px] md:text-[20px] font-semibold py-[2px] md:py-1 px-3 md:px-3 rounded-[8px] leading-normal"
                      style={{
                        background:
                          "radial-gradient(1413.54% 103.95% at -3.95% 100%, #D33753 0%, #D13660 52.83%, #C72D65 100%)",
                      }}
                    >
                      Live
                    </span>
                  </div>

                  <div className="items-start justify-between hidden mb-3 md:flex md:justify-end md:gap-2 xl:gap-6 md:mb-0">
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <LikeSessionDesktop
                        sessionId={sessionData?._id ?? ""}
                        initialLiked={isLiked}
                        initialLikeCount={sessionData?.likes ?? 0}
                      />
                    </div>
                    <div className="pt-2">
                      <ShareSessionDesktop />
                    </div>
                    <div className="ml-[150px] md:ml-0 mr-[10px] md:mr-0 md:pt-4">
                      <Popover>
                        <PopoverTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="24"
                            viewBox="0 0 6 24"
                            fill="none"
                          >
                            <path
                              d="M0.746094 21.6C0.746094 20.9635 0.99895 20.353 1.44904 19.9029C1.89912 19.4529 2.50957 19.2 3.14609 19.2C3.78261 19.2 4.39306 19.4529 4.84315 19.9029C5.29324 20.353 5.54609 20.9635 5.54609 21.6C5.54609 22.2365 5.29324 22.847 4.84315 23.2971C4.39306 23.7471 3.78261 24 3.14609 24C2.50957 24 1.89912 23.7471 1.44904 23.2971C0.99895 22.847 0.746094 22.2365 0.746094 21.6ZM0.746094 12C0.746094 11.3635 0.99895 10.753 1.44904 10.3029C1.89912 9.85286 2.50957 9.6 3.14609 9.6C3.78261 9.6 4.39306 9.85286 4.84315 10.3029C5.29324 10.753 5.54609 11.3635 5.54609 12C5.54609 12.6365 5.29324 13.247 4.84315 13.6971C4.39306 14.1471 3.78261 14.4 3.14609 14.4C2.50957 14.4 1.89912 14.1471 1.44904 13.6971C0.99895 13.247 0.746094 12.6365 0.746094 12ZM0.746094 2.4C0.746094 1.76348 0.99895 1.15303 1.44904 0.702944C1.89912 0.252856 2.50957 0 3.14609 0C3.78261 0 4.39306 0.252856 4.84315 0.702944C5.29324 1.15303 5.54609 1.76348 5.54609 2.4C5.54609 3.03652 5.29324 3.64697 4.84315 4.09706C4.39306 4.54714 3.78261 4.8 3.14609 4.8C2.50957 4.8 1.89912 4.54714 1.44904 4.09706C0.99895 3.64697 0.746094 3.03652 0.746094 2.4Z"
                              fill="url(#paint0_linear_10952_51782)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_10952_51782"
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
                        <PopoverContent className="w-[232px] bg-[#262626] border-[1px] border-[#404040] rounded-[16px] py-3 px-5 flex flex-col md:mt-[20px] md:mr-[70px]">
                          <Dialog
                            open={dialogOpen}
                            onOpenChange={setDialogOpen}
                          >
                            <DialogTrigger>
                              <div className="flex items-center justify-between cursor-pointer">
                                <h4 className="text-[14px] text-[#D4D4D4] font-semibold leading-normal">
                                  Report
                                </h4>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16C12.9993 15.7173 12.9033 15.48 12.712 15.288C12.5207 15.096 12.2833 15 12 15C11.7167 15 11.4793 15.096 11.288 15.288C11.0967 15.48 11.0007 15.7173 11 16C10.9993 16.2827 11.0953 16.5203 11.288 16.713C11.4807 16.9057 11.718 17.0013 12 17ZM11 13H13V7H11V13ZM8.25 21L3 15.75V8.25L8.25 3H15.75L21 8.25V15.75L15.75 21H8.25ZM9.1 19H14.9L19 14.9V9.1L14.9 5H9.1L5 9.1V14.9L9.1 19Z"
                                    fill="#D4D4D4"
                                  />
                                </svg>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="report-dialog px-[20px] md:px-[48px]">
                              <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription className="flex flex-col items-center justify-center pt-6">
                                  <div className="w-full h-[1px] bg-[#737373]"></div>
                                  <h2 className="text-[28px] md:text-[32px] text-[#FFFFFF] font-bold leading-normal mt-3 md:mt-5 mb-2 md:mb-[10px]">
                                    Report Your Issue
                                  </h2>
                                  <h5 className="text-[16px] md:text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    Please share what issue you are facing?
                                  </h5>
                                  <Textarea
                                    className="h-[148px] bg-[#171717] text-white p-[10px] my-6"
                                    placeholder="Enter your text here..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                  />
                                  <Button
                                    className="primaryButton w-[327px] text-[18px] text-[#FFFFFF] font-bold leading-[21px]"
                                    onClick={handleReport}
                                  >
                                    Submit
                                  </Button>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                          <div className="flex items-center justify-between cursor-pointer">
                            <h4 className="text-[14px] text-[#D4D4D4] font-semibold leading-normal">
                              Save
                            </h4>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M3 17H10H3ZM15 16H18H15ZM18 16H21H18ZM18 16V19V16ZM18 16V13V16ZM3 12H14H3ZM3 7H14H3Z"
                                fill="#D4D4D4"
                              />
                              <path
                                d="M3 17H10M15 16H18M18 16H21M18 16V19M18 16V13M3 12H14M3 7H14"
                                stroke="#D4D4D4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="flex-wrap items-center justify-start hidden w-full gap-4 md:flex">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.0003 9.56271C12.2307 9.56271 14.0388 7.79541 14.0388 5.61534C14.0388 3.43527 12.2307 1.66797 10.0003 1.66797C7.76994 1.66797 5.96186 3.43527 5.96186 5.61534C5.96186 7.79541 7.76994 9.56271 10.0003 9.56271Z"
                        fill="url(#paint0_linear_11151_68495)"
                      />
                      <path
                        d="M11.3465 10.4399H8.65417C7.46453 10.4413 6.32403 10.9038 5.48283 11.7261C4.64163 12.5483 4.16842 13.6631 4.16699 14.8259V17.4574C4.16699 17.6901 4.26154 17.9132 4.42985 18.0777C4.59815 18.2422 4.82641 18.3346 5.06443 18.3346H14.9362C15.1742 18.3346 15.4025 18.2422 15.5708 18.0777C15.7391 17.9132 15.8337 17.6901 15.8337 17.4574V14.8259C15.8322 13.6631 15.359 12.5483 14.5178 11.7261C13.6766 10.9038 12.5361 10.4413 11.3465 10.4399Z"
                        fill="url(#paint1_linear_11151_68495)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11151_68495"
                          x1="3.71827"
                          y1="12.3063"
                          x2="16.2263"
                          y2="12.3077"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_11151_68495"
                          x1="3.71827"
                          y1="12.3063"
                          x2="16.2263"
                          y2="12.3077"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {sessionData?.seats} seats
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
                        fill="url(#paint0_linear_11151_68498)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11151_68498"
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
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal">
                      {/* {sessionData?.calories ? sessionData.calories : 295} cal */}
                      {getCaloriesDisplayValue(sessionData?.calories)} cal
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
                        fill="url(#paint0_linear_11279_15402)"
                      />
                      <rect
                        x="5.45182"
                        y="9.35807"
                        width="2.73058"
                        height="7.55499"
                        fill="url(#paint1_linear_11279_15402)"
                        stroke="url(#paint2_linear_11279_15402)"
                        strokeWidth="0.833333"
                      />
                      <rect
                        x="9.81999"
                        y="5.76432"
                        width="2.73058"
                        height="11.15"
                        fill="url(#paint3_linear_11279_15402)"
                        stroke="url(#paint4_linear_11279_15402)"
                        strokeWidth="0.833333"
                      />
                      <rect
                        x="14.1872"
                        y="1.08073"
                        width="2.72912"
                        height="15.8333"
                        stroke="url(#paint5_linear_11279_15402)"
                        strokeWidth="0.833333"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11279_15402"
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
                          id="paint1_linear_11279_15402"
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
                          id="paint2_linear_11279_15402"
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
                          id="paint3_linear_11279_15402"
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
                          id="paint4_linear_11279_15402"
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
                          id="paint5_linear_11279_15402"
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
                      {sessionData?.level ? sessionData.level : "Intermediate"}
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
                      {sessionData?.intensityLevel
                        ? sessionData.intensityLevel
                        : "Moderate"}
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
                        fill="url(#paint0_linear_11151_68507)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11151_68507"
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
                      {/* {sessionData?.duration ? sessionData.duration : 60} min */}
                      {getDurationDisplayValue(sessionData.durationRange)}
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
                        fill="url(#paint0_linear_11151_68510)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11151_68510"
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
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal whitespace-nowrap">
                      {sessionData?.equipment ? sessionData.equipment : "None"}
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
                        fill="url(#paint0_linear_11151_68543)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11151_68543"
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
                      {sessionData?.category}
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
                      <circle
                        cx="10"
                        cy="10"
                        r="10"
                        fill="url(#paint0_linear_11151_68513)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.6399 13.3229L14.8053 8.88747L13.1022 9.97208C12.7626 10.1886 12.3517 10.2633 11.9576 10.1802C11.5635 10.0971 11.2177 9.86271 10.9945 9.52747L9.87376 7.84362L8.75222 9.52824C8.5289 9.86336 8.18308 10.0976 7.78901 10.1805C7.39493 10.2635 6.98403 10.1887 6.64453 9.97208L4.94222 8.88747L6.10761 13.3229H13.6399ZM5.3553 8.23824C4.7653 7.86208 4.01991 8.40593 4.19761 9.08285L5.36376 13.5182C5.40693 13.6826 5.50333 13.8281 5.6379 13.9319C5.77248 14.0357 5.93764 14.092 6.10761 14.0921H13.6399C13.8099 14.092 13.975 14.0357 14.1096 13.9319C14.2442 13.8281 14.3406 13.6826 14.3838 13.5182L15.5499 9.08285C15.7268 8.40593 14.9822 7.86285 14.3922 8.23824L12.6891 9.32285C12.5194 9.43119 12.314 9.46867 12.117 9.42725C11.92 9.38583 11.747 9.26881 11.6353 9.10131L10.5138 7.4167C10.4435 7.31135 10.3483 7.22497 10.2367 7.16522C10.1251 7.10548 10.0004 7.07422 9.87376 7.07422C9.74713 7.07422 9.62247 7.10548 9.51082 7.16522C9.39918 7.22497 9.30401 7.31135 9.23376 7.4167L8.11222 9.10131C8.00062 9.26894 7.82774 9.38611 7.6307 9.42768C7.43366 9.46924 7.22817 9.43188 7.05838 9.32362L5.3553 8.23824Z"
                        fill="white"
                      />
                      <path
                        d="M10.5994 5.72615C10.5996 5.91895 10.5232 6.10392 10.387 6.24039C10.2508 6.37686 10.066 6.45364 9.87321 6.45385C9.68042 6.45405 9.49545 6.37766 9.35898 6.24148C9.22251 6.1053 9.14573 5.92048 9.14552 5.72769C9.14532 5.5349 9.22171 5.34992 9.35789 5.21346C9.49407 5.07699 9.67888 5.0002 9.87168 5C10.0645 4.9998 10.2494 5.07619 10.3859 5.21237C10.5224 5.34855 10.5992 5.53336 10.5994 5.72615ZM16.4117 7.18077C16.4117 7.27623 16.393 7.37077 16.3565 7.45898C16.32 7.54719 16.2665 7.62736 16.199 7.69489C16.1316 7.76243 16.0515 7.81602 15.9633 7.8526C15.8751 7.88917 15.7806 7.90803 15.6851 7.90808C15.5897 7.90813 15.4951 7.88938 15.4069 7.85289C15.3187 7.81641 15.2385 7.7629 15.171 7.69544C15.1035 7.62797 15.0499 7.54787 15.0133 7.45969C14.9767 7.37152 14.9579 7.277 14.9578 7.18154C14.9578 6.98875 15.0344 6.80385 15.1707 6.66753C15.3071 6.5312 15.492 6.45462 15.6848 6.45462C15.8775 6.45462 16.0624 6.5312 16.1988 6.66753C16.3351 6.80385 16.4117 6.98798 16.4117 7.18077ZM4.78783 7.18077C4.78793 7.37356 4.71144 7.5585 4.57519 7.69489C4.43894 7.83129 4.25408 7.90797 4.06129 7.90808C3.96583 7.90813 3.8713 7.88938 3.78308 7.85289C3.69487 7.81641 3.6147 7.7629 3.54717 7.69544C3.41077 7.55919 3.33409 7.37433 3.33398 7.18154C3.33398 6.98875 3.41057 6.80385 3.5469 6.66753C3.68322 6.5312 3.86812 6.45462 4.06091 6.45462C4.2537 6.45462 4.4386 6.5312 4.57492 6.66753C4.71124 6.80385 4.78783 6.98798 4.78783 7.18077Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.21875 14.9979C6.21875 14.8959 6.25927 14.7981 6.3314 14.7259C6.40353 14.6538 6.50136 14.6133 6.60337 14.6133H13.3241C13.4261 14.6133 13.524 14.6538 13.5961 14.7259C13.6682 14.7981 13.7088 14.8959 13.7088 14.9979C13.7088 15.0999 13.6682 15.1977 13.5961 15.2699C13.524 15.342 13.4261 15.3825 13.3241 15.3825H6.60337C6.50136 15.3825 6.40353 15.342 6.3314 15.2699C6.25927 15.1977 6.21875 15.0999 6.21875 14.9979Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_11151_68513"
                          x1="-0.769231"
                          y1="12.766"
                          x2="20.6731"
                          y2="12.7694"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[20px] text-[#A3A3A3] font-normal leading-normal whitespace-nowrap">
                      {sessionData?.isFree ? "" : "Premium"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[14px] md:text-[20px] text-[#D4D4D4] font-normal leading-normal mt-2 mb-4 md:mt-4 md:my-3">
            {sessionData?.description}
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] md:text-[28px] text-[#FFFFFF] font-bold md:font-normal leading-normal">
              Focus Area
            </h2>
            <div className="flex gap-4 md:gap-7">
              {sessionData.focusArea?.map((focusarea: string) => (
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
      ) : (
        <VideoSkeleton />
      )}

      {/* Recommended workout sessions */}
      <div className="w-full md:flex-[30%] flex flex-col gap-4 mt-[24px] mb-[62px] shrink-0">
        <h1 className="text-[20px] md:text-[24px] text-[#E5E5E5] font-bold leading-normal">
          Recommended Workout Sessions
        </h1>

        <div className=" md:h-[680px] md:overflow-y-scroll">
          <div className="flex-col items-center justify-center gap-6  md:flex md:items-start">
            {sessionData ? (
              <>
                {categorySessions &&
                  categorySessions.map((item: any) => (
                    <div
                      key={item._id}
                      className="relative mb-6 md:basis-auto md:mb-0"
                    >
                      <Link
                        className="flex gap-4 cursor-pointer"
                        href={{
                          pathname: "/publicLiveSession",
                          query: { id: item._id },
                        }}
                      >
                        <div className="relative w-[156px]">
                          <Image
                            src={item.thumbnailURL}
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
                          <span className="video-level-tag absolute bottom-1 left-1 text-[12px] text-[#FFFFFF] font-bold leading-normal py-1 px-2">
                            {item.level}
                          </span>
                        </div>

                        <div className="w-[170px] md:w-[200px] flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <h2 className=" text-[18px] text-[#FFFFFF] font-bold leading-normal truncate overflow-hidden whitespace-nowrap text-ellipsis">
                              {item.title}
                            </h2>
                          </div>
                          <p className="text-[12px] text-[#D4D4D4] font-normal leading-normal line-clamp-3">
                            {item.description}
                          </p>
                          <span className="text-[10px] text-[#D4D4D4] font-semibold leading-normal line-clamp-3">
                            Equipment : Dumballs
                          </span>
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
                      <LikeRecommendedSession
                        videoId={item._id}
                        likeFor={"liveSession"}
                        initialLiked={false}
                      />
                    </div>
                  ))}
              </>
            ) : (
              <RecommendedVids />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PublicLiveSessionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LiveSession />
    </Suspense>
  );
}
