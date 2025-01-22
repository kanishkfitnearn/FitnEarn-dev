"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type LikeBlogButtonProps = {
  commentId: string;
  initialLiked: boolean;
};

const CommentLikeBtn: React.FC<LikeBlogButtonProps> = ({
  commentId,
  initialLiked,
}) => {
  //console.log("commentId and initial like status: ", commentId, initialLiked);
  const [liked, setLiked] = useState(initialLiked);
  const userId = Cookies.get("user_id");
  const genToken = Cookies.get("genToken");
  const { toast } = useToast();
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  useEffect(() => {
    //console.log("initialLiked changed to:", initialLiked);
    setLiked(initialLiked);
  }, [initialLiked]);

  //   useEffect(() => {
  //     //console.log("UserId changed to:", userId);
  //   }, [userId]);

  const likeBlog = async (
    userId: string,
    commentId: string,
    action: "like" | "dislike",
  ) => {
    //console.log("action from like comment", action);
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/comment/like/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${genToken}`,
          },
          body: JSON.stringify({
            action,
            userId,
          }),
        },
      );

      const data = await response.json();
      //console.log("Response from like comment:", data);

      if (response.ok) {
        setLiked(action === "like");
      } else {
        //console.error("Failed to update like status:", data);
      }
    } catch (error) {
      //console.error("Error updating like status:", error);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const action = liked ? "dislike" : "like";
    if (!userId) {
      //console.log("no user");
      toast({
        title: "Login required to like.",
        description: "To like this comment, you need to have an account.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } else {
      setLiked(!liked);
      likeBlog(userId, commentId, action);
    }
  };

  return (
    <span onClick={handleLike} className="cursor-pointer">
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="w-[24px] h-[24px] md:h-[32px] md:w-[32px]"
        >
          <path
            d="M29.0454 9.68481C28.3427 7.06081 26.2747 4.99281 23.652 4.29014C21.0827 3.60481 18.3533 4.30081 16.0027 6.20614C14.288 4.80481 12.388 4.04614 10.448 4.00081C8.34002 3.97147 6.37335 4.74347 4.89068 6.22481C2.10268 9.01281 1.49468 14.0475 5.72402 18.2768L15.0573 27.6101C15.3173 27.8701 15.6587 28.0008 16 28.0008C16.3413 28.0008 16.6827 27.8701 16.9427 27.6101L26.276 18.2768C28.8174 15.7355 29.8267 12.6035 29.0454 9.68481Z"
            fill="#E02424"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="w-[24px] h-[24px] md:h-[32px] md:w-[32px]"
        >
          <path
            d="M29.0644 9.68481C28.3604 7.06081 26.2898 4.99281 23.6631 4.29014C21.0898 3.60481 18.3564 4.30081 16.0031 6.20614C14.2858 4.80481 12.3831 4.04614 10.4404 4.00081C8.32976 3.97147 6.36043 4.74347 4.8751 6.22481C2.0831 9.01281 1.47376 14.0475 5.70976 18.2768L15.0564 27.6101C15.3178 27.8701 15.6591 28.0008 16.0004 28.0008C16.3418 28.0008 16.6831 27.8701 16.9444 27.6101L26.2911 18.2768C28.8364 15.7355 29.8471 12.6035 29.0644 9.68481ZM24.4031 16.3915L16.0004 24.7821L7.59776 16.3915C4.4631 13.2595 4.9671 9.90481 6.7631 8.11014C7.6311 7.24347 8.8631 6.67814 10.2604 6.67814C11.7538 6.67814 13.4351 7.32481 15.0551 8.94347C15.5764 9.46481 16.4218 9.46481 16.9431 8.94347C20.0524 5.83947 23.4004 6.35947 25.1938 8.15147C26.1591 9.11681 26.6751 10.3968 26.6498 11.7555C26.6204 13.3515 25.8431 14.9541 24.4031 16.3915Z"
            fill="url(#paint0_linear_5730_87859)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5730_87859"
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
      )}
    </span>
  );
};

export default CommentLikeBtn;
