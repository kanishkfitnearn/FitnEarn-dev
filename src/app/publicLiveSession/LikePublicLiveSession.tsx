"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type LikeBlogButtonProps = {
  sessionId: string;
  initialLiked: boolean;
  initialLikeCount: number;
};

const LikeBtnForPublicLiveSession: React.FC<LikeBlogButtonProps> = ({
  sessionId,
  initialLiked,
  initialLikeCount,
}) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount); // Initialize like count
  const userId = Cookies.get("user_id");
  const { toast } = useToast();

  // console.log(
  //   "sessionId, initialLiked, initialLikeCount, userId",
  //   sessionId,
  //   initialLiked,
  //   initialLikeCount,
  //   userId,
  // );

  // Initialize the liked and likeCount states when the component mounts
  useEffect(() => {
    setLiked(initialLiked);
    setLikeCount(initialLikeCount); // Ensure like count is initialized correctly
  }, [initialLiked, initialLikeCount]);

  const likeLiveSession = async (
    userId: string,
    sessionId: string,
    action: "like" | "dislike",
  ) => {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/session/like/${sessionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, action }),
        },
      );

      const data = await response.json();
      //console.log("Response from like session:", data);

      if (response.ok) {
        setLiked(action === "like");
        setLikeCount(action === "like" ? likeCount + 1 : likeCount - 1); // Update like count
      } else {
        // //console.error("Failed to update like status:", data);
      }
    } catch (error) {
      // //console.error("Error updating like status:", error);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) {
      toast({
        title: "Login required to like.",
        description: "To like this content, you need to have an account.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } else {
      const nextLikedState = !liked;
      const action = nextLikedState ? "like" : "dislike";

      // Optimistically update the UI before the API call
      setLiked(nextLikedState);
      setLikeCount(nextLikedState ? likeCount + 1 : likeCount - 1);

      // Call the API to update the like status
      await likeLiveSession(userId, sessionId, action);
    }
  };

  return (
    <span
      onClick={handleLike}
      className="flex items-center justify-center gap-2 cursor-pointer"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M18.1532 6.053C17.7141 4.413 16.4216 3.1205 14.7824 2.68134C13.1766 2.253 11.4707 2.688 10.0016 3.87884C8.9299 3.003 7.7424 2.52884 6.5299 2.5005C5.2124 2.48217 3.98324 2.96467 3.05657 3.8905C1.31407 5.633 0.934071 8.77967 3.5774 11.423L9.41074 17.2563C9.57324 17.4188 9.78657 17.5005 9.9999 17.5005C10.2132 17.5005 10.4266 17.4188 10.5891 17.2563L16.4224 11.423C18.0107 9.83467 18.6416 7.87717 18.1532 6.053Z"
            fill="url(#paint0_linear_11214_53373)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_11214_53373"
              x1="1.03176"
              y1="12.0748"
              x2="18.8749"
              y2="12.078"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#FB923C" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="hidden md:block"
          >
            <path
              d="M29.0644 9.68481C28.3604 7.06081 26.2898 4.99281 23.6631 4.29014C21.0898 3.60481 18.3564 4.30081 16.0031 6.20614C14.2858 4.80481 12.3831 4.04614 10.4404 4.00081C8.32976 3.97147 6.36043 4.74347 4.8751 6.22481C2.0831 9.01281 1.47376 14.0475 5.70976 18.2768L15.0564 27.6101C15.3178 27.8701 15.6591 28.0008 16.0004 28.0008C16.3418 28.0008 16.6831 27.8701 16.9444 27.6101L26.2911 18.2768C28.8364 15.7355 29.8471 12.6035 29.0644 9.68481ZM24.4031 16.3915L16.0004 24.7821L7.59776 16.3915C4.4631 13.2595 4.9671 9.90481 6.7631 8.11014C7.6311 7.24347 8.8631 6.67814 10.2604 6.67814C11.7538 6.67814 13.4351 7.32481 15.0551 8.94347C15.5764 9.46481 16.4218 9.46481 16.9431 8.94347C20.0524 5.83947 23.4004 6.35947 25.1938 8.15147C26.1591 9.11681 26.6751 10.3968 26.6498 11.7555C26.6204 13.3515 25.8431 14.9541 24.4031 16.3915Z"
              fill="url(#paint0_linear_5730_57305)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_5730_57305"
                x1="1.63059"
                y1="19.3197"
                x2="30.2209"
                y2="19.3248"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F43F5E" />
                <stop offset="1" stopColor="#FB923C" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="block md:hidden"
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
        </span>
      )}
      <span className="text-[16px] md:text-[20px] text-[#FFFFFF] font-normal leading-[24px] md:leading-[36px]">
        {likeCount}
      </span>{" "}
      {/* Display the like count */}
    </span>
  );
};

export default LikeBtnForPublicLiveSession;
