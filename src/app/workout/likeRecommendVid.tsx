"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type LikeButtonProps = {
  videoId: string;
  initialLiked: boolean;
  likeFor: string;
};

const LikeRecommendedVid: React.FC<LikeButtonProps> = ({
  videoId,
  likeFor,
  initialLiked,
}) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [liked, setLiked] = useState(initialLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false); // For triggering animation
  const userId = Cookies.get("user_id");
  const { toast } = useToast();
  //console.log("videoId,likeFor,initialLiked", videoId, likeFor, initialLiked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [userId]);

  const likeVideo = async () => {
    try {
      await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/workout/videos/likes/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId }),
        },
      ).then((response) => {
        if (response.status === 200) {
          //console.log("response from like video", response);
          setLiked(!liked);
          setAnimate(true); // Trigger animation
        }
      });
    } catch (error) {
      //console.error("Error liking video:", error);
    }
  };

  // const likeLiveSession = async () => {
  //   try {
  //     await fetch(
  //       `${apiEndpoint}/api/fitnearn/web/users/workout/live-session/likes/${userId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ videoId }),
  //       },
  //     ).then((response) => {
  //       if (response.status === 200) {
  //         //console.log("response from like video", response);
  //         setLiked(!liked);
  //         setAnimate(true); // Trigger animation
  //       }
  //     });
  //   } catch (error) {
  //     //console.error("Error liking video:", error);
  //   }
  // };

  const likeLiveSession = async (action: "like" | "dislike") => {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/session/like/${videoId}`,
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
        setLiked(!liked);
        setAnimate(true); // Trigger animation
        // setLikeCount(action === "like" ? likeCount + 1 : likeCount - 1); // Update like count
      } else {
        //console.error("Failed to update like status:", data);
      }
    } catch (error) {
      //console.error("Error updating like status:", error);
    }
  };

  const handleLike = async () => {
    if (!userId) {
      toast({
        title: "Login required to like.",
        description: "To like this content, you need to have an account.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } else {
      if (likeFor === "liveSession") {
        const nextLikedState = !liked;
        const action = nextLikedState ? "like" : "dislike";
        setLiked(!liked);
        likeLiveSession(action);
      } else if (likeFor === "video") {
        setLiked(!liked);
        likeVideo();
      }
    }
  };

  const onAnimationEnd = () => {
    setAnimate(false); // Reset animation state once animation ends
  };

  return (
    <span
      onClick={handleLike}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-2 left-[132px] cursor-pointer"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
        >
          <path
            d="M14.5796 4.8424C14.2283 3.5304 13.1943 2.4964 11.883 2.14507C10.5983 1.8024 9.23362 2.1504 8.05829 3.10307C7.20095 2.4024 6.25095 2.02307 5.28095 2.0004C4.22695 1.98574 3.24362 2.37174 2.50229 3.1124C1.10829 4.5064 0.804288 7.02374 2.91895 9.1384L7.58562 13.8051C7.71562 13.9351 7.88629 14.0004 8.05695 14.0004C8.22762 14.0004 8.39829 13.9351 8.52829 13.8051L13.195 9.1384C14.4656 7.86774 14.9703 6.30174 14.5796 4.8424Z"
            fill="url(#paint0_linear_10698_44852)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_10698_44852"
              x1="0.882442"
              y1="9.65983"
              x2="15.157"
              y2="9.6624"
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
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
        >
          <path
            d="M15.1885 4.98693C14.8365 3.67493 13.8011 2.64093 12.4878 2.2896C11.2011 1.94693 9.83447 2.29493 8.6578 3.2476C7.79913 2.54693 6.8478 2.1676 5.87646 2.14493C4.82113 2.13027 3.83646 2.51627 3.0938 3.25693C1.6978 4.65093 1.39313 7.16827 3.51113 9.28293L8.18446 13.9496C8.31513 14.0796 8.4858 14.1449 8.65647 14.1449C8.82713 14.1449 8.9978 14.0796 9.12847 13.9496L13.8018 9.28293C15.0745 8.01227 15.5798 6.44627 15.1885 4.98693ZM12.8578 8.34027L8.65647 12.5356L4.45513 8.34027C2.8878 6.77427 3.1398 5.09693 4.0378 4.1996C4.4718 3.76627 5.0878 3.4836 5.78646 3.4836C6.53313 3.4836 7.3738 3.80693 8.1838 4.61627C8.44447 4.87693 8.86713 4.87693 9.1278 4.61627C10.6825 3.06427 12.3565 3.32427 13.2531 4.22027C13.7358 4.70293 13.9938 5.34293 13.9811 6.02227C13.9665 6.82027 13.5778 7.6216 12.8578 8.34027Z"
            fill="#F5F5F5"
          />
        </svg>
      )}
    </span>
  );
};

export default LikeRecommendedVid;
