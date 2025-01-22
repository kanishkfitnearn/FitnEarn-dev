"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type LikeVideoButtonProps = {
  videoId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

const LikeDetailedVidDesktop: React.FC<LikeVideoButtonProps> = ({
  videoId,
  initialLiked,
  initialLikeCount,
}) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const userId = Cookies.get("user_id");
  const { toast } = useToast();
  console.log(
    "videoId,initialLiked,initialLikeCount",
    videoId,
    initialLiked,
    initialLikeCount,
  );

  useEffect(() => {
    setLiked(initialLiked);
    setLikeCount(initialLikeCount);
  }, [userId, initialLiked, initialLikeCount]);

  const likeVideo = async () => {

    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/workout/videos/likes/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId }),
        },
      );

      console.log("response from like video", response);

      if (response.status === 200) {
          // (window as any).gtag("event", "video_like", {
          //   event_category: "Workout Videos",
          //   event_videoId: videoId || "Unknown Video",
          //   value: 1,
          // });
        setLiked(!liked);
      } else {
        setLiked(liked); // revert state if there's an error
      }
    } catch (error) {
      // //console.error("Error liking video:", error);
      setLiked(liked); // revert state if there's an error
    }
  };

  const handleLike = async () => {
    if (!userId) {
      console.log("no user");
      toast({
        title: "Login required to like.",
        description: "To like this content, you need to have an account.",
      });
    } else {
      setLiked(!liked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      likeVideo();
    }
  };

  return (
    <span
      onClick={handleLike}
      className="flex items-center gap-2 cursor-pointer"
    >
      {liked ? (
        <svg
          className="w-[20] md:w-[24] h-[20] md:h-[24]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M29.045 9.68481C28.3423 7.06081 26.2743 4.99281 23.6516 4.29014C21.0823 3.60481 18.353 4.30081 16.0023 6.20614C14.2876 4.80481 12.3877 4.04614 10.4477 4.00081C8.33965 3.97147 6.37298 4.74347 4.89032 6.22481C2.10232 9.01281 1.49432 14.0475 5.72365 18.2768L15.057 27.6101C15.317 27.8701 15.6583 28.0008 15.9997 28.0008C16.341 28.0008 16.6823 27.8701 16.9423 27.6101L26.2757 18.2768C28.817 15.7355 29.8263 12.6035 29.045 9.68481Z"
            fill="url(#paint0_linear_9892_42452)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_9892_42452"
              x1="1.65063"
              y1="19.3197"
              x2="30.1997"
              y2="19.3248"
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
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21.7983 7.2636C21.2703 5.2956 19.7173 3.7446 17.7473 3.2176C15.8173 2.7036 13.7673 3.2256 12.0023 4.6546C10.7143 3.6036 9.28732 3.0346 7.83032 3.0006C6.24732 2.9786 4.77032 3.5576 3.65632 4.6686C1.56232 6.7596 1.10532 10.5356 4.28232 13.7076L11.2923 20.7076C11.4883 20.9026 11.7443 21.0006 12.0003 21.0006C12.2563 21.0006 12.5123 20.9026 12.7083 20.7076L19.7183 13.7076C21.6273 11.8016 22.3853 9.4526 21.7983 7.2636ZM18.3023 12.2936L12.0003 18.5866L5.69832 12.2936C3.34732 9.9446 3.72532 7.4286 5.07232 6.0826C5.72332 5.4326 6.64732 5.0086 7.69532 5.0086C8.81532 5.0086 10.0763 5.4936 11.2913 6.7076C11.6823 7.0986 12.3163 7.0986 12.7073 6.7076C15.0393 4.3796 17.5503 4.7696 18.8953 6.1136C19.6193 6.8376 20.0063 7.7976 19.9873 8.8166C19.9653 10.0136 19.3823 11.2156 18.3023 12.2936Z"
            fill="url(#paint0_linear_10952_51776)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_10952_51776"
              x1="1.22294"
              y1="14.4898"
              x2="22.6657"
              y2="14.4936"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#FB923C" />
            </linearGradient>
          </defs>
        </svg>
      )}
      <span className="text-[16px] md:text-[20px] text-[#FFFFFF] font-normal leading-[24px] md:leading-[36px]">
        {likeCount}
      </span>{" "}
    </span>
  );
};

export default LikeDetailedVidDesktop;
