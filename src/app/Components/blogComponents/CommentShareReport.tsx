"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bold, Italic } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import CommentUser from "../../../../public/commentUser.jpg";
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
import Cookies from "js-cookie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import LikeButtonForDetailedBlog from "./DetailedBlogLikeBtn";
import CommentLikeBtn from "./CommentLikeBtn";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import CommentOrReplyWithReadMore from "./commentOrReplyWithReadMore";

type CommentProps = {
  blogId: string;
  initialLiked: boolean;
  likeCount: number;
  shareCount: number;
};

// interface Reply {
//   comment: string;
//   // Add other properties if needed
// }
type Reply = {
  userId: string;
  userName: string;
  comment: string;
  likes: number;
  report: boolean;
  createdAt: string;
  userProfile: string;
  _id: string;
  isLiked: boolean;
};

interface Comment {
  _id: string;
  userProfile: string;
  userName: string;
  comment: string;
  isLiked: boolean;
  replies: Reply[];
}

const CommentShareAndReport: React.FC<CommentProps> = ({
  blogId,
  initialLiked,
  likeCount,
  shareCount,
}) => {
  //console.log("blogId,initialLiked,likeCount", blogId, initialLiked, likeCount);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [reportText, setReportText] = useState<string>("");
  // const [commentReportText, setCommentReportText] = useState<string>("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [commentReportText, setCommentReportText] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenForBlog, setDialogOpenForBlog] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [blogShareCount, setBlogShareCount] = useState(shareCount);
  const [isReplying, setIsReplying] = useState(false);
  // const [replyText, setReplyText] = useState("");
  const [replyTexts, setReplyTexts] = useState<{ [commentId: string]: string }>(
    {},
  );
  const [replyingComments, setReplyingComments] = useState<{
    [key: string]: boolean;
  }>({});
  // const [replies, setReplies] = useState<Reply[]>([]);
  const [replies, setReplies] = useState<{ [commentId: string]: any[] }>({});
  const [focus, setFocus] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [isReplyOn, setIsReplyOn] = useState("");
  const [isReplyOnFlag, setIsReplyOnFlag] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );

  const userId = Cookies.get("user_id");
  const genToken = Cookies.get("genToken");

  const { toast } = useToast();

  const commentBoxRef = useRef<HTMLDivElement | null>(null); // Reference for comment box
  const replyRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${blogUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${blogUrl}`,
    telegram: `https://telegram.me/share/url?url=${blogUrl}&text=Check%20this%20out!`,
    instagram: `https://www.instagram.com/`, // No direct sharing link for Instagram
  };

  const handleBold = () => {
    document.execCommand("bold");
  };

  const handleItalic = () => {
    document.execCommand("italic");
  };

  const handleCommentClick = () => {
    setShowCommentBox(!showCommentBox); // Toggle visibility
    setTimeout(() => {
      commentBoxRef.current?.focus(); // Focus on comment box after visibility change
    }, 0);
  };

  const handleSubmit = () => {
    if (comment === null || comment === undefined || comment.length === 0) {
      return;
    }
    if (comment.trim()) {
      addCommentInBE(comment);
      // addComment(comment);
      setComment("");
      const commentBox = document.getElementById("commentBox");
      if (commentBox) {
        commentBox.textContent = "";
      }
      setShowPlaceholder(true);
      // setShowCommentBox(false);
    }
  };

  const handleInput = (e: any) => {
    const text = e.currentTarget.textContent;
    setComment(text);
    setShowPlaceholder(text.length === 0);
    const maxWordLength = 45;

    let words = text.split(/\s+/);
    // Check if any word exceeds the maximum allowed length
    const longWord = words.find((word: string) => word.length > maxWordLength);

    if (longWord) {
      words = words.map((word: string) =>
        word.length > maxWordLength ? word.slice(0, maxWordLength) : word,
      );
      const newText = words.join(" "); // Join the text back together
      e.currentTarget.textContent = newText;
      // Set the cursor to the end of the text
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(e.currentTarget.childNodes[0], newText.length);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
      toast({
        title: "Word too long!",
        description: `The word "${longWord}" is too long and cannot exceed 45 characters.`,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });

      return;
    }
    if (text.length > 1670) {
      const trimmedText = text.slice(0, 1670);
      e.currentTarget.textContent = trimmedText;

      // Move the cursor back to the end of the text
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(e.currentTarget.childNodes[0], 1670);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);

      toast({
        title: "Word limit exceeded!",
        description:
          " Word limit exceeded. You can't enter more than 250 Words.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  };
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userId) {
          //console.log("userId", userId);
          const response = await fetch(
            `${apiEndpoint}/api/fitnearn/web/users/profile/get-profile?userId=${userId}`,
          );
          const data = await response.json();
          //console.log(data);
          if (data.success) {
            setUserProfile(data.userProfile);
          } else {
            //console.error("Failed to fetch user profile");
          }
        } else {
          //console.log("no userId");
        }
      } catch (error) {
        //console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBlogUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReport = () => {
    // Check if user is logged in
    if (!userId) {
      setDialogOpenForBlog(false);
      toast({
        title: "You are logged in",
        description: "You need to login to report this blog.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    // Check if the report text is not null or empty
    if (!reportText || reportText.trim() === "") {
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
      .patch(`${apiEndpoint}/api/fitnearn/web/users/blog/report/${blogId}`, {
        userId: userId,
        reason: reportText,
      })
      .then((response) => {
        // console.log("Response from reporting the blog:", response);
        if (response.status === 200) {
          // console.log(response.data.message);
          setReportText("");
          setDialogOpenForBlog(false);
          // toast.success("Your report has been submitted successfully.");
          toast({
            title: "Done!",
            description: "Your report has been submitted successfully.",
          });
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const handleOpenReportDialog = (commentId: string) => {
    setSelectedCommentId(commentId); // Store the comment ID when opening the dialog
    setDialogOpen(true); // Open the dialog
  };

  const handleCommentReport = (commentIdFromReport: string) => {
    //console.log("commentId from handleCommentReport", commentIdFromReport);
    //console.log("commentId from SelectedCommentId", selectedCommentId);
    if (!userId) {
      setDialogOpen(false);
      toast({
        title: "You are logged out",
        description: "You need to login to report this blog.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    if (!selectedIssue) {
      toast({
        title: "No issue selected",
        description: "Please select an issue to report.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    if (
      (selectedIssue === "false information" || selectedIssue === "other") &&
      (!commentReportText || commentReportText.trim() === "")
    ) {
      toast({
        title: "Null value passed",
        description:
          "Your report reason should not be null. Enter a valid report reason.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    const reportReason =
      selectedIssue === "false information" || selectedIssue === "other"
        ? `${selectedIssue} - ${commentReportText}`
        : selectedIssue;

    //console.log("reportReason", reportReason);

    axios
      .patch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/comment/report/${selectedCommentId}`,
        {
          userId,
          reason: reportReason,
        },
        {
          headers: {
            Authorization: `Bearer ${genToken}`,
          },
        },
      )
      .then((response) => {
        //console.log("Response from reporting the comment:", response);
        if (response.status === 200) {
          //console.log(response.data.message);
          setCommentReportText("");
          setDialogOpen(false);
          setSelectedIssue("");
          setSelectedCommentId(null);
          toast({
            title: "Done!",
            description: "Your report has been submitted successfully.",
          });
        }
      })
      .catch((err) => {
        //console.log("Error reporting comment:", err);
        if (err.response && err.response.status === 400) {
          toast({
            title: "Comment already reported",
            description:
              "You have already reported this comment, we will get back to you soon.",
            action: <ToastAction altText="Try again">Retry</ToastAction>,
          });
        } else {
          // Handle other error cases
          toast({
            title: "Error",
            description:
              "An unexpected error occurred. Please try again later.",
          });
        }
      })
      .finally(() => {
        setSelectedIssue("");
        setSelectedCommentId(null);
        setCommentReportText("");
        setDialogOpen(false);
      });
  };

  const addCommentInBE = async (commentString: string) => {
    if (!userId) {
      toast({
        title: "Can't add comment",
        description: "You are not Logged in!",
      });
    }
    try {
      const response = await axios.post(
        `${apiEndpoint}/api/fitnearn/web/users/blog/comment/add`,
        {
          blogId: blogId,
          userId: userId,
          comment: commentString,
        },
      );
      //console.log("response from add comment", response);
      if (response.status === 201) {
        const newComment = response.data.data as Comment; // Cast the new comment to Comment
        setComments([...comments, newComment]);
      } else {
        toast({
          title: "Can't add comment",
          description: "something went wrong while adding comment",
        });
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const fetchAllComments = async () => {
    let url;
    if (userId && genToken) {
      url = `${apiEndpoint}/api/fitnearn/web/users/blog/comment/get/${blogId}?userId=${userId}`;
    } else {
      url = `${apiEndpoint}/api/fitnearn/web/users/blog/comment/get/${blogId}`;
    }
    try {
      const response = await axios.get(url);
      //console.log("response from all comments", response);
      if (response.status === 200) {
        setComments(response.data.data as Comment[]); // Cast the response data to Comment[]
      } else {
        //console.log("something went wrong in fetching all blog comments");
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, [showCommentBox]);

  const handleShare = () => {
    axios
      .patch(`${apiEndpoint}/api/fitnearn/web/users/blog/share/${blogId}`)
      .then((response) => {
        // //console.log('API Response:', response);
        if (response.data.success) {
          setBlogShareCount((prevCount) => prevCount + 1);
          setPopoverOpen(false);
          //console.log(response.data.message);
        } else {
          // console.log(
          //   "Something went wrong while incrementing the share count",
          // );
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId], // Toggle reply box for the specific comment
    }));

    // Focus the textarea input for this comment
    setTimeout(() => {
      replyRefs.current[commentId]?.focus(); // Automatically focus the textarea
    }, 0); // Small delay to ensure the textarea is rendered before focusing
  };

  const handleReplyTextChange = (commentId: string, text: string) => {
    const maxWordLength = 45;
    const maxTotalLength = 1670;

    // Trim extra spaces and split the reply text into words
    let words = text.trim().split(/\s+/);

    // Check if any word exceeds the maximum allowed length
    const longWord = words.find((word: string) => word.length > maxWordLength);

    // Handle the case when a word exceeds the 45 characters
    if (longWord) {
      toast({
        title: "Word too long!",
        description: `The word "${longWord}" exceeds ${maxWordLength} characters and cannot be added.`,
      });

      // Trim the long word down to the max allowed length
      words = words.map((word) =>
        word.length > maxWordLength ? word.slice(0, maxWordLength) : word,
      );

      // Update the reply text with the trimmed words
      const newText = words.join(" ");
      setReplyTexts((prev) => ({ ...prev, [commentId]: newText }));
      return;
    }

    // Check if the total text length exceeds the maximum allowed length
    if (text.length > maxTotalLength) {
      const trimmedText = text.slice(0, maxTotalLength);

      toast({
        title: "Reply length exceeded!",
        description: `You can't enter more than 250 words or ${maxTotalLength} characters in the reply.`,
      });

      // Set the trimmed text
      setReplyTexts((prev) => ({ ...prev, [commentId]: trimmedText }));
      return;
    }

    // Update the reply text state with the valid input
    setReplyTexts((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleReplySubmit = (commentId: string) => {
    const replyText = replyTexts[commentId];
    if (!replyText || replyText.trim() === "") {
      alert("Reply text cannot be empty.");
      return;
    }

    axios
      .post(`${apiEndpoint}/api/fitnearn/web/users/blog/comment/add`, {
        comment: replyText,
        userId,
        parentCommentId: commentId,
        blogId: blogId,
      })
      .then((response) => {
        //console.log("Response from replying to the comment:", response);
        if (response.status === 201) {
          //console.log(response.data.message);
          // Clear the specific reply text for this comment after submission
          setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));

          const newReply = response.data.data;

          // Update the replies state for this specific comment
          setReplies((prevReplies) => ({
            ...prevReplies,
            [commentId]: [...(prevReplies[commentId] || []), newReply], // Add the new reply to the specific comment's replies
          }));
        }
      })
      .catch((err) => {
        //console.log("Error while replying to the comment:", err);
      });
  };

  // const getReplies = async (commentId: string) => {
  //   const response = await fetch(`${apiEndpoint}/api/fitnearn/web/users/blog/comment/${commentId}`);
  //   const result = await response.json();
  //   //console.log("result from comment Replies:", result);
  //   if (result.success) {
  //     setReplies(result.replies);
  //   }
  // };

  const handleCancel = (commentId: string) => {
    setReplyingComments((prev) => ({
      ...prev,
      [commentId]: false,
    }));
    // setReplyText(""); // Optionally clear the reply text
    setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);

  // Handle emoji select
  // const onEmojiClick = (emojiObject: any) => {
  //   setReplyText(replyText + emojiObject.emoji);
  // };
  const onEmojiClick = (emojiObject: any, commentId: string) => {
    // Update the specific comment's reply text with the selected emoji
    setReplyTexts((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || "") + emojiObject.emoji,
    }));
  };

  const handleIsReply = (c_Id: string, flag: boolean) => {
    if (flag) {
      setIsReplyOn(c_Id); // If true, show the reply for this comment
    } else {
      setIsReplyOn(""); // Hide replies
    }
  };

  const checkReplyLength = (commentId: string, commentReplyLength: number) => {
    if (replies[commentId] && replies[commentId].length > 0) {
      return commentReplyLength + replies[commentId].length;
    } else {
      return commentReplyLength;
    }
  };

  return (
    <div className="hidden md:block">
      <div className="py-[22px] w-full flex justify-between items-center comment-section mb-[20px] gap-0">
        <div className="flex gap-[48px]">
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <LikeButtonForDetailedBlog
              blogId={blogId}
              initialLiked={initialLiked}
              initialLikeCount={likeCount}
            />
          </div>
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleCommentClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 28C18.3734 28 20.6935 27.2962 22.6668 25.9776C24.6402 24.6591 26.1783 22.7849 27.0866 20.5922C27.9948 18.3995 28.2324 15.9867 27.7694 13.6589C27.3064 11.3312 26.1635 9.19295 24.4853 7.51472C22.8071 5.83649 20.6689 4.6936 18.3411 4.23058C16.0133 3.76756 13.6005 4.0052 11.4078 4.91345C9.21509 5.8217 7.34094 7.35977 6.02236 9.33316C4.70379 11.3066 4 13.6266 4 16C4 17.984 4.48 19.8547 5.33333 21.5027L4 28L10.4973 26.6667C12.1453 27.52 14.0173 28 16 28Z"
                stroke="url(#paint0_linear_5730_57286)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5730_57286"
                  x1="3.07692"
                  y1="19.3192"
                  x2="28.8078"
                  y2="19.3233"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[24px] text-[#D4D4D4] font-bold leading-normal">
              {comments ? comments.length : ""}
            </span>
          </div>
        </div>
        <div className="flex gap-[48px]">
          <Dialog open={dialogOpenForBlog} onOpenChange={setDialogOpenForBlog}>
            <DialogTrigger>
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 22.6667C16.3778 22.6667 16.6947 22.5387 16.9507 22.2827C17.2067 22.0267 17.3342 21.7102 17.3333 21.3333C17.3324 20.9564 17.2044 20.64 16.9493 20.384C16.6942 20.128 16.3778 20 16 20C15.6222 20 15.3058 20.128 15.0507 20.384C14.7956 20.64 14.6676 20.9564 14.6667 21.3333C14.6658 21.7102 14.7938 22.0271 15.0507 22.284C15.3076 22.5409 15.624 22.6684 16 22.6667ZM14.6667 17.3333H17.3333V9.33333H14.6667V17.3333ZM11 28L4 21V11L11 4H21L28 11V21L21 28H11ZM12.1333 25.3333H19.8667L25.3333 19.8667V12.1333L19.8667 6.66667H12.1333L6.66667 12.1333V19.8667L12.1333 25.3333Z"
                    fill="url(#paint0_linear_5730_57290)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_5730_57290"
                      x1="3.07692"
                      y1="19.3192"
                      x2="28.8078"
                      y2="19.3233"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[16px] md:text-[24px] text-[#D4D4D4] font-bold leading-normal">
                  Report
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="report-dialog px-[48px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="flex flex-col items-center justify-center pt-6">
                  {/* <div className="w-full h-[1px] bg-[#737373]"></div> */}
                  <h2 className="text-[32px] text-[#FFFFFF] font-bold leading-normal mt-5 mb-[10px]">
                    Report your issue
                  </h2>
                  <h5 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                    Please share the details of issue you are facing?
                  </h5>
                  <Textarea
                    className="h-[148px] bg-[#171717] text-[#A3A3A3] p-[10px] my-6"
                    placeholder="Enter your text here..."
                    onChange={(e) => setReportText(e.target.value)}
                  />
                  <Button
                    onClick={handleReport}
                    className="primaryButton w-[327px] text-[16px] text-[#FFFFFF] font-medium leading-[21px]"
                  >
                    Submit
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger className="flex items-center justify-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M5.0066 25.3346C4.84672 25.3346 4.68277 25.3173 4.51882 25.2826C3.42945 25.052 2.66797 24.0921 2.66797 22.9483V21.1765C2.66797 16.0438 6.20573 11.7857 10.7936 11.0764V10.0432C10.7936 8.94335 11.3952 7.98214 12.3653 7.53553C13.2663 7.11958 14.3083 7.2569 15.082 7.89149L22.0017 13.5588C22.6317 14.0734 22.9921 14.8466 22.9921 15.6798C22.9921 16.5144 22.6304 17.2876 22.0003 17.8022L15.0806 23.4695C14.3083 24.1041 13.2677 24.2388 12.3653 23.8255C11.3965 23.3789 10.7936 22.4177 10.7936 21.3178V20.6792C9.20829 21.1098 7.84792 22.2897 7.07967 23.9668C6.68673 24.824 5.89003 25.3346 5.0066 25.3346ZM13.5265 10.0872L13.5035 12.3043C13.5035 13.0415 12.8964 13.6374 12.1485 13.6374C8.41564 13.6374 5.37786 17.0183 5.37786 21.1752V21.5031C6.94282 19.2047 9.42508 17.8302 12.1485 17.8302C12.8964 17.8302 13.5035 18.4262 13.5035 19.1634V21.2911L20.2687 15.7518C20.289 15.7238 20.289 15.6345 20.266 15.6052L13.5265 10.0872Z"
                  fill="url(#paint0_linear_5730_57293)"
                />
                <path
                  d="M19.9178 24.7827C19.5492 24.7827 19.1807 24.6361 18.9138 24.3454C18.4111 23.8002 18.4531 22.9563 19.0072 22.4617L26.6098 15.6785L19.1333 8.99401C18.5764 8.50341 18.5303 7.65951 19.0289 7.11158C19.5289 6.56365 20.3839 6.51566 20.9435 7.01026L28.4187 13.6081C28.9986 14.12 29.3319 14.8573 29.3346 15.6305C29.336 16.4024 29.0067 17.141 28.4295 17.6556L20.8269 24.4387C20.5681 24.6681 20.243 24.7827 19.9178 24.7827Z"
                  fill="url(#paint1_linear_5730_57293)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5730_57293"
                    x1="1.64233"
                    y1="18.5829"
                    x2="30.2322"
                    y2="18.5895"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_5730_57293"
                    x1="1.64233"
                    y1="18.5829"
                    x2="30.2322"
                    y2="18.5895"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[24px] text-[#D4D4D4] font-bold leading-normal">
                {blogShareCount}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-[#262626] border-solid border-[1px] border-[#404040] rounded-[16px] p-5">
              <h4 className="text-[24px] text-[#FFF] font-semibold leading-[36px] mb-4">
                Share
              </h4>
              <div className="flex gap-[45px]">
                <Link
                  href={socialMediaLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleShare()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_7887_26905)">
                      <path
                        d="M1.02516 23.7126C1.02403 27.7455 2.08603 31.6834 4.10541 35.1543L0.832031 47.0132L13.063 43.8311C16.446 45.6584 20.2363 46.6159 24.088 46.6162H24.0982C36.8135 46.6162 47.164 36.3496 47.1695 23.7306C47.1719 17.6158 44.7742 11.8659 40.4178 7.53994C36.0622 3.21436 30.2693 0.830916 24.0972 0.828125C11.3804 0.828125 1.03059 11.0942 1.02534 23.7126"
                        fill="url(#paint0_linear_7887_26905)"
                      />
                      <path
                        d="M0.200625 23.7053C0.199313 27.8834 1.29937 31.962 3.39075 35.5572L0 47.8413L12.6696 44.5451C16.1604 46.4337 20.0908 47.4294 24.0902 47.4309H24.1005C37.272 47.4309 47.9944 36.795 48 23.7243C48.0023 17.3898 45.5182 11.4331 41.0062 6.95219C36.4937 2.47181 30.4937 0.00260465 24.1005 0C10.9267 0 0.205875 10.6344 0.200625 23.7053ZM7.74581 34.938L7.27275 34.1929C5.28412 31.0554 4.2345 27.4298 4.236 23.7068C4.24012 12.8426 13.1509 4.00372 24.108 4.00372C29.4143 4.00595 34.401 6.05842 38.1517 9.78233C41.9023 13.5066 43.9661 18.4573 43.9648 23.7228C43.9599 34.587 35.049 43.427 24.1005 43.427H24.0926C20.5277 43.4251 17.0314 42.4752 13.9823 40.68L13.2566 40.253L5.73825 42.2089L7.74581 34.938Z"
                        fill="url(#paint1_linear_7887_26905)"
                      />
                      <path
                        d="M18.1277 13.7954C17.6803 12.8088 17.2095 12.7889 16.784 12.7716C16.4357 12.7567 16.0374 12.7578 15.6395 12.7578C15.2413 12.7578 14.5942 12.9065 14.0473 13.499C13.4998 14.0922 11.957 15.5255 11.957 18.4406C11.957 21.3558 14.097 24.1733 14.3953 24.569C14.694 24.964 18.5265 31.1377 24.5962 33.5128C29.6407 35.4866 30.6673 35.094 31.7621 34.995C32.8571 34.8964 35.2953 33.5621 35.7928 32.1785C36.2906 30.795 36.2906 29.6092 36.1413 29.3614C35.9921 29.1145 35.5938 28.9662 34.9967 28.67C34.3995 28.3738 31.4634 26.9402 30.9161 26.7424C30.3686 26.5448 29.9705 26.4462 29.5723 27.0395C29.174 27.6319 28.0305 28.9662 27.6819 29.3614C27.3337 29.7575 26.9852 29.8068 26.3882 29.5104C25.7906 29.2131 23.8674 28.5882 21.5857 26.5697C19.8105 24.9991 18.612 23.0596 18.2636 22.4663C17.9152 21.8739 18.2263 21.5528 18.5257 21.2576C18.794 20.9921 19.1231 20.5656 19.422 20.2198C19.7197 19.8737 19.8191 19.6269 20.0182 19.2317C20.2175 18.8362 20.1178 18.4901 19.9687 18.1937C19.8191 17.8974 18.6587 14.9669 18.1277 13.7954Z"
                        fill="#F5F5F5"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_7887_26905"
                        x1="2317.7"
                        y1="4619.34"
                        x2="2317.7"
                        y2="0.828125"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#1FAF38" />
                        <stop offset="1" stopColor="#60D669" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_7887_26905"
                        x1="2400"
                        y1="4784.13"
                        x2="2400"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F9F9F9" />
                        <stop offset="1" stopColor="white" />
                      </linearGradient>
                      <clipPath id="clip0_7887_26905">
                        <rect width="48" height="48" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[18px] text-[#F5F5F5] font-normal leading-[27px]">
                    WhatsApp
                  </span>
                </Link>
                <Link
                  href={socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleShare()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_7887_26911)">
                      <path
                        d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z"
                        fill="#1877F2"
                      />
                      <path
                        d="M33.3422 30.9375L34.4062 24H27.75V19.5C27.75 17.602 28.68 15.75 31.6613 15.75H34.6875V9.84375C34.6875 9.84375 31.9411 9.375 29.3152 9.375C23.8331 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7084C22.7349 48.0972 25.2651 48.0972 27.75 47.7084V30.9375H33.3422Z"
                        fill="#F5F5F5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_7887_26911">
                        <rect width="48" height="48" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[18px] text-[#F5F5F5] font-normal leading-[27px]">
                    Facebook
                  </span>
                </Link>
                <Link
                  href={socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleShare()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M24 0C10.7456 0 0 10.7456 0 24C0 37.2544 10.7456 48 24 48C37.2544 48 48 37.2544 48 24C48 10.7456 37.2544 0 24 0Z"
                      fill="black"
                    />
                    <path
                      d="M26.624 21.8295L36.8981 9.88672H34.4635L25.5424 20.2565L18.4173 9.88672H10.1992L20.9739 25.5677L10.1992 38.0915H12.634L22.0548 27.1407L29.5795 38.0915H37.7976L26.6234 21.8295H26.624ZM13.5113 11.7196H17.2509L34.4646 36.342H30.7249L13.5113 11.7196Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                  <span className="text-[18px] text-[#F5F5F5] font-normal leading-[27px]">
                    X
                  </span>
                </Link>
                <Link
                  href={socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleShare()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M36.75 0H11.25C5.0368 0 0 5.0368 0 11.25V36.75C0 42.9632 5.0368 48 11.25 48H36.75C42.9632 48 48 42.9632 48 36.75V11.25C48 5.0368 42.9632 0 36.75 0Z"
                      fill="url(#paint0_radial_7887_26923)"
                    />
                    <path
                      d="M36.75 0H11.25C5.0368 0 0 5.0368 0 11.25V36.75C0 42.9632 5.0368 48 11.25 48H36.75C42.9632 48 48 42.9632 48 36.75V11.25C48 5.0368 42.9632 0 36.75 0Z"
                      fill="url(#paint1_radial_7887_26923)"
                    />
                    <path
                      d="M24.0017 5.25C18.9096 5.25 18.2704 5.27231 16.2705 5.36325C14.2744 5.45475 12.9118 5.77069 11.7197 6.23438C10.4863 6.71325 9.44025 7.35394 8.39813 8.39644C7.35506 9.43875 6.71438 10.4848 6.234 11.7176C5.769 12.9101 5.45269 14.2732 5.36287 16.2684C5.27344 18.2685 5.25 18.9079 5.25 24.0002C5.25 29.0925 5.2725 29.7296 5.36325 31.7295C5.45513 33.7256 5.77106 35.0882 6.23438 36.2803C6.71362 37.5137 7.35431 38.5597 8.39681 39.6019C9.43875 40.6449 10.4848 41.2871 11.7172 41.766C12.9103 42.2297 14.2731 42.5456 16.2688 42.6371C18.2689 42.7281 18.9075 42.7504 23.9994 42.7504C29.0921 42.7504 29.7292 42.7281 31.7291 42.6371C33.7253 42.5456 35.0893 42.2297 36.2824 41.766C37.5152 41.2871 38.5597 40.6449 39.6015 39.6019C40.6446 38.5597 41.2851 37.5137 41.7656 36.2809C42.2265 35.0882 42.543 33.7253 42.6367 31.7299C42.7266 29.73 42.75 29.0925 42.75 24.0002C42.75 18.9079 42.7266 18.2689 42.6367 16.2688C42.543 14.2727 42.2265 12.9103 41.7656 11.7182C41.2851 10.4848 40.6446 9.43875 39.6015 8.39644C38.5586 7.35356 37.5156 6.71287 36.2812 6.23456C35.0859 5.77069 33.7226 5.45456 31.7265 5.36325C29.7264 5.27231 29.0897 5.25 23.9959 5.25H24.0017ZM22.3196 8.62894C22.8189 8.62819 23.376 8.62894 24.0017 8.62894C29.0081 8.62894 29.6014 8.64694 31.5784 8.73675C33.4065 8.82038 34.3988 9.12581 35.0597 9.3825C35.9347 9.72225 36.5586 10.1286 37.2144 10.785C37.8707 11.4412 38.2768 12.0662 38.6175 12.9412C38.8742 13.6012 39.18 14.5935 39.2633 16.4216C39.3531 18.3983 39.3726 18.9919 39.3726 23.9959C39.3726 28.9999 39.3531 29.5937 39.2633 31.5701C39.1796 33.3982 38.8742 34.3905 38.6175 35.0507C38.2778 35.9257 37.8707 36.5488 37.2144 37.2047C36.5582 37.8609 35.9351 38.2671 35.0597 38.607C34.3995 38.8648 33.4065 39.1695 31.5784 39.2531C29.6017 39.3429 29.0081 39.3624 24.0017 39.3624C18.9951 39.3624 18.4016 39.3429 16.4252 39.2531C14.5971 39.1688 13.6048 38.8633 12.9433 38.6066C12.0684 38.2667 11.4433 37.8606 10.7871 37.2043C10.1308 36.5481 9.72469 35.9246 9.384 35.0492C9.12731 34.389 8.8215 33.3967 8.73825 31.5686C8.64844 29.592 8.63044 28.9984 8.63044 23.9912C8.63044 18.984 8.64844 18.3936 8.73825 16.4169C8.82188 14.5888 9.12731 13.5966 9.384 12.9356C9.72394 12.0606 10.1308 11.4356 10.7873 10.7794C11.4437 10.1231 12.0684 9.71681 12.9435 9.37631C13.6044 9.1185 14.5971 8.81381 16.4252 8.72981C18.1549 8.65162 18.8252 8.62819 22.3196 8.62425V8.62894ZM34.0104 11.7422C32.7683 11.7422 31.7604 12.7491 31.7604 13.9914C31.7604 15.2336 32.7683 16.2414 34.0104 16.2414C35.2526 16.2414 36.2604 15.2336 36.2604 13.9914C36.2604 12.7493 35.2526 11.7414 34.0104 11.7414V11.7422ZM24.0017 14.3711C18.6842 14.3711 14.3728 18.6825 14.3728 24.0002C14.3728 29.3179 18.6842 33.6272 24.0017 33.6272C29.3194 33.6272 33.6292 29.3179 33.6292 24.0002C33.6292 18.6827 29.319 14.3711 24.0013 14.3711H24.0017ZM24.0017 17.7501C27.4534 17.7501 30.2518 20.5481 30.2518 24.0002C30.2518 27.4519 27.4534 30.2503 24.0017 30.2503C20.55 30.2503 17.7518 27.4519 17.7518 24.0002C17.7518 20.5481 20.5498 17.7501 24.0017 17.7501Z"
                      fill="#F5F5F5"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_7887_26923"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(12.75 51.6969) rotate(-90) scale(47.5716 44.2453)"
                      >
                        <stop stopColor="#FFDD55" />
                        <stop offset="0.1" stopColor="#FFDD55" />
                        <stop offset="0.5" stopColor="#FF543E" />
                        <stop offset="1" stopColor="#C837AB" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_7887_26923"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(-8.04019 3.45769) rotate(78.681) scale(21.2648 87.654)"
                      >
                        <stop stopColor="#3771C8" />
                        <stop offset="0.128" stopColor="#3771C8" />
                        <stop offset="1" stopColor="#6600FF" stop-opacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <span className="text-[18px] text-[#F5F5F5] font-normal leading-[27px]">
                    Instagram
                  </span>
                </Link>
                <Link
                  href={socialMediaLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleShare()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                      fill="url(#paint0_linear_7887_26930)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.8621 23.7479C17.8586 20.6996 22.524 18.69 24.8583 17.7191C31.5234 14.9469 32.9083 14.4653 33.811 14.4494C34.0096 14.4459 34.4535 14.4951 34.741 14.7284C34.9838 14.9254 35.0506 15.1916 35.0826 15.3784C35.1146 15.5652 35.1544 15.9907 35.1227 16.3232C34.7615 20.1181 33.1987 29.3275 32.4036 33.5779C32.0672 35.3764 31.4048 35.9795 30.7635 36.0385C29.3697 36.1667 28.3114 35.1174 26.9615 34.2325C24.8492 32.8479 23.6559 31.986 21.6055 30.6348C19.236 29.0733 20.772 28.2151 22.1224 26.8125C22.4759 26.4454 28.6166 20.8599 28.7355 20.3532C28.7504 20.2899 28.7642 20.0536 28.6238 19.9289C28.4835 19.8042 28.2764 19.8468 28.1269 19.8808C27.9151 19.9288 24.5406 22.1592 18.0036 26.5719C17.0457 27.2296 16.1782 27.5501 15.4009 27.5333C14.5439 27.5148 12.8956 27.0488 11.6702 26.6504C10.1672 26.1619 8.97261 25.9036 9.07663 25.0738C9.13081 24.6416 9.72596 24.1997 10.8621 23.7479Z"
                      fill="#F5F5F5"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_7887_26930"
                        x1="24"
                        y1="0"
                        x2="24"
                        y2="47.644"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#2AABEE" />
                        <stop offset="1" stopColor="#229ED9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[18px] text-[#F5F5F5] font-normal leading-[27px]">
                    Telegram
                  </span>
                </Link>
              </div>
              <div className="relative mt-6">
                <Input
                  type="text"
                  value={blogUrl}
                  readOnly
                  className="h-[54px] bg-[#404040] border-solid border-[1px] border-[#525252] rounded-[8px] p-[10px] text-white"
                />
                <CopyToClipboard text={blogUrl} onCopy={handleCopy}>
                  <Button className="h-[34px] absolute primaryButton top-[10px] right-[10px]">
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </CopyToClipboard>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {showCommentBox && (
        <div className="mt-2 ">
          <div className="h-[160px] relative comment-box rounded-[7px]">
            <div
              id="commentBox"
              contentEditable
              onInput={handleInput}
              ref={commentBoxRef}
              className="h-[160px] text-[22px] text-white bg-[#171717] border-[2px] border-transparent rounded-[7px] pt-6 px-6 focus:outline-none custom-gradient-border"
              style={{
                borderRadius: "7px",
                whiteSpace: "pre-wrap", // Ensures that text wraps within the box
                wordWrap: "break-word", // Breaks long words if necessary
                overflow: "auto", // Adds scrollbars if content overflows
              }}
            ></div>

            {showPlaceholder && (
              <div
                className="absolute top-0 left-0 pt-6 px-6 text-[24px] text-[#A3A3A3] font-normal pointer-events-none"
                style={{ userSelect: "none" }}
              >
                Post Your comment
              </div>
            )}

            <div className="absolute flex justify-end w-full mx-6 bottom-6">
              {/* <div className="text-[34px] text-white">
                <Toggle
                  onClick={handleBold}
                  className="h-[32px] mr-2"
                  aria-label="Toggle bold"
                >
                  <Bold className="w-4 h-5" />
                </Toggle>
                <Toggle
                  onClick={handleItalic}
                  className="h-[32px]"
                  aria-label="Toggle bold"
                >
                  <Italic className="w-4 h-5" />
                </Toggle>
              </div> */}
              <button
                className="w-[104px] h-[41px] primaryButton text-white filterBtn border-[1px] border-[#F43F5E] rounded-[8px] mr-[50px]"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 my-6">
            <h3 className="text-[24px] text-[#E5E5E5] font-semibold leading-normal">
              Latest comments
            </h3>
            {comments &&
              comments
                .slice()
                .reverse()
                .map((comment, index) => (
                  <div key={comment._id}>
                    <div className="flex items-center justify-start gap-2">
                      <div className="w-8 h-8 overflow-hidden rounded-full md:w-11 md:h-11">
                        <Image
                          src={comment.userProfile || CommentUser}
                          alt="user face pic"
                          width={44}
                          height={44}
                          className="object-cover aspect-square rounded-full w-[32px] md:w-[44px] h-[32px] md:h-[44px]"
                        />
                      </div>
                      <span className="text-[22px] text-[#D4D4D4] font-semibold md:font-medium leading-normal">
                        {comment.userName}
                      </span>
                    </div>
                    {/* <p
                      className="text-[24px] text-[#A3A3A3] font-normal leading-[34px] whitespace-pre-wrap break-words"
                      key={index}
                    >
                      {comment.comment}
                    </p> */}
                    <CommentOrReplyWithReadMore
                      replyFromComment={comment}
                      itIsFor={"comment"}
                    />
                    <div className="flex justify-between mt-5">
                      <div className="flex gap-5">
                        <div className="flex gap-1">
                          <CommentLikeBtn
                            commentId={comment._id}
                            initialLiked={
                              comment.isLiked ? comment.isLiked : false
                            }
                          />
                          <span className="text-[19px] text-[#737373] font-semibold leading-normal">
                            Like
                          </span>
                        </div>
                        <div
                          onClick={() => handleReplyClick(comment._id)}
                          className="flex gap-1 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                          >
                            <path
                              d="M26.6654 16.0013L18.132 6.66797V11.3346C13.8654 11.3346 5.33203 14.1346 5.33203 25.3346C5.33203 23.7786 7.89203 20.668 18.132 20.668V25.3346L26.6654 16.0013Z"
                              stroke="url(#paint0_linear_1350_60029)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1350_60029"
                                x1="4.51152"
                                y1="18.5829"
                                x2="27.3834"
                                y2="18.5871"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[19px] text-[#737373] font-semibold leading-normal">
                            Reply
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 pr-3">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger
                            onClick={() => handleOpenReportDialog(comment._id)}
                          >
                            <div className="flex items-center justify-center gap-2 cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                              >
                                <path
                                  d="M16 22.6667C16.3778 22.6667 16.6947 22.5387 16.9507 22.2827C17.2067 22.0267 17.3342 21.7102 17.3333 21.3333C17.3324 20.9564 17.2044 20.64 16.9493 20.384C16.6942 20.128 16.3778 20 16 20C15.6222 20 15.3058 20.128 15.0507 20.384C14.7956 20.64 14.6676 20.9564 14.6667 21.3333C14.6658 21.7102 14.7938 22.0271 15.0507 22.284C15.3076 22.5409 15.624 22.6684 16 22.6667ZM14.6667 17.3333H17.3333V9.33333H14.6667V17.3333ZM11 28L4 21V11L11 4H21L28 11V21L21 28H11ZM12.1333 25.3333H19.8667L25.3333 19.8667V12.1333L19.8667 6.66667H12.1333L6.66667 12.1333V19.8667L12.1333 25.3333Z"
                                  fill="#B94B1C"
                                />
                              </svg>
                              <span className="hidden md:block text-[19px] text-[#737373] font-semibold leading-normal">
                                Report
                              </span>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="report-dialog px-[48px]">
                            <DialogHeader>
                              <DialogTitle></DialogTitle>
                              <DialogDescription className="flex flex-col items-center justify-center pt-6">
                                <h2 className="text-[32px] text-[#FFFFFF] font-bold leading-normal mb-2">
                                  Report
                                </h2>
                                <h5 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal mb-6">
                                  Why are you reporting this comment?
                                </h5>

                                <div className="flex flex-col items-start justify-start w-full space-y-3">
                                  <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    <input
                                      type="radio"
                                      value="nudity or sexual activity"
                                      className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={
                                        selectedIssue ===
                                        "nudity or sexual activity"
                                      }
                                      onChange={(e) =>
                                        setSelectedIssue(e.target.value)
                                      }
                                    />
                                    Nudity or sexual activity
                                  </label>
                                  <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    <input
                                      type="radio"
                                      value="hate speech or symbols"
                                      className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={
                                        selectedIssue ===
                                        "hate speech or symbols"
                                      }
                                      onChange={(e) =>
                                        setSelectedIssue(e.target.value)
                                      }
                                    />
                                    Hate speech or symbols
                                  </label>
                                  <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    <input
                                      type="radio"
                                      value="bullying or harassment"
                                      className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={
                                        selectedIssue ===
                                        "bullying or harassment"
                                      }
                                      onChange={(e) =>
                                        setSelectedIssue(e.target.value)
                                      }
                                    />
                                    Bullying or harassment
                                  </label>
                                  <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    <input
                                      type="radio"
                                      value="false information"
                                      className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={
                                        selectedIssue === "false information"
                                      }
                                      onChange={(e) =>
                                        setSelectedIssue(e.target.value)
                                      }
                                    />
                                    False information
                                  </label>
                                  <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    <input
                                      type="radio"
                                      value="I just don't like it"
                                      className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={
                                        selectedIssue === "I just don't like it"
                                      }
                                      onChange={(e) =>
                                        setSelectedIssue(e.target.value)
                                      }
                                    />
                                    I just don&apos;t like it
                                  </label>
                                  <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                    <input
                                      type="radio"
                                      value="other"
                                      className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={selectedIssue === "other"}
                                      onChange={(e) =>
                                        setSelectedIssue(e.target.value)
                                      }
                                    />
                                    Other
                                  </label>
                                </div>

                                {(selectedIssue === "false information" ||
                                  selectedIssue === "other") && (
                                  <Textarea
                                    className="h-[70px] bg-[#171717] text-white p-[10px] mt-[16px]"
                                    placeholder="Enter your text here ..."
                                    onChange={(e) =>
                                      setCommentReportText(e.target.value)
                                    }
                                    value={commentReportText}
                                  />
                                )}

                                <Button
                                  onClick={() =>
                                    handleCommentReport(comment._id)
                                  }
                                  className="primaryButton w-[327px] text-[18px] text-[#FFFFFF] font-bold leading-[21px] mt-6"
                                >
                                  Submit
                                </Button>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    {replyingComments[comment._id] && (
                      <div className="reply-section">
                        <div className="w-full bg-[#171717] rounded-[7px] border-[2px] custom-gradient-border p-6 mt-2">
                          <div className="flex items-start justify-start w-full gap-3">
                            <Image
                              src={comment.userProfile || CommentUser}
                              width={32}
                              height={32}
                              alt="user image"
                              className="rounded-full"
                            />
                            {/* <textarea
                              className="reply-textarea w-full h-[50px] text-[18px] text-white bg-[#171717] border-none focus:border-none focus:outline-none focus:ring-0 pt-1"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Add a reply"
                              onFocus={() => setFocus(true)}
                            /> */}
                            <textarea
                              ref={(el) => {
                                replyRefs.current[comment._id] = el; // Store the ref for this textarea
                              }}
                              className="reply-textarea w-full h-[50px] text-[18px] text-white bg-[#171717] border-none focus:border-none focus:outline-none focus:ring-0 pt-1"
                              value={replyTexts[comment._id] || ""} // Use reply text specific to this comment
                              onChange={(e) =>
                                handleReplyTextChange(
                                  comment._id,
                                  e.target.value,
                                )
                              }
                              placeholder="Add a reply"
                              onFocus={() => setFocus(true)}
                              maxLength={1670}
                            />
                          </div>
                          <div className="relative flex items-center justify-between">
                            <div
                              ref={buttonRef}
                              onClick={() =>
                                setIsEmojiPickerOpen((prev) => !prev)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM15.5 7C16.328 7 17 7.672 17 8.5C17 9.328 16.328 10 15.5 10C14.672 10 14 9.328 14 8.5C14 7.672 14.672 7 15.5 7ZM8.5 7C9.328 7 10 7.672 10 8.5C10 9.328 9.328 10 8.5 10C7.672 10 7 9.328 7 8.5C7 7.672 7.672 7 8.5 7ZM12 18C8.953 18 6.5 15.265 6.5 13C6.5 12.724 6.724 12.5 7 12.5C7.276 12.5 7.5 12.724 7.5 13C7.692 13.192 9.386 13.583 12 13.583C14.548 13.583 16.221 13.212 16.505 12.933C16.51 12.896 16.519 12.861 16.531 12.828C16.569 12.599 16.764 12.456 17.011 12.456C17.287 12.456 17.499 12.725 17.499 13.001C17.5 15.265 15.047 18 12 18Z"
                                  fill="#E5E5E5"
                                />
                              </svg>
                            </div>
                            {isEmojiPickerOpen && (
                              <div
                                ref={emojiPickerRef}
                                className="absolute left-0 top-[20px] z-10 mt-2"
                              >
                                <EmojiPicker
                                  onEmojiClick={(emoji) =>
                                    onEmojiClick(emoji, comment._id)
                                  }
                                  theme={Theme.DARK} // Set the theme to dark mode
                                  emojiStyle={EmojiStyle.APPLE}
                                />
                              </div>
                            )}
                            <div className="flex items-center justify-center gap-4">
                              <button
                                className="w-[104px] text-[#FFFFFF] text-[14px] font-medium leading-[21px] py-2 px-3"
                                onClick={() => handleCancel(comment._id)}
                              >
                                Cancel
                              </button>
                              <button
                                className={`${focus ? "primaryButton text-bold" : "border-[1px] border-[#A3A3A3]"} rounded-[8px]  w-[104px] text-[#FFFFFF] text-[14px] font-medium leading-[21px] py-2 px-3`}
                                onClick={() => handleReplySubmit(comment._id)}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <div>
                          <p className="text-white">reply</p>
                          {comment.replies.map((reply) => (
                            <p
                              key={reply._id}
                              className="text-[20px] text-[#A3A3A3] font-normal leading-[28px]"
                            >
                              {reply.comment}
                            </p>
                          ))}
                          {replies &&
                            replies.map((reply, index) => (
                              <p
                                key={index}
                                className="text-[20px] text-[#A3A3A3] font-normal leading-[28px]"
                              >
                                {reply.comment}
                              </p>
                            ))}
                        </div> */}
                      </div>
                    )}
                    <div>
                      <div
                        onClick={() =>
                          handleIsReply(comment._id, isReplyOn !== comment._id)
                        }
                        className="flex items-center justify-start flex-1 mt-3 mb-4 cursor-pointer"
                      >
                        {isReplyOn === comment._id ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                          >
                            <path
                              d="M24.9761 19.0853L17.8748 11.464C16.8841 10.4026 15.1201 10.4026 14.1281 11.464L7.02675 19.084C6.52409 19.6226 6.55342 20.4693 7.09075 20.9733C7.62942 21.4786 8.47209 21.4493 8.97609 20.9093L16.0014 13.3706L23.0268 20.9106C23.2894 21.192 23.6454 21.3346 24.0014 21.3346C24.3281 21.3346 24.6548 21.216 24.9121 20.9746C25.4494 20.4693 25.4788 19.624 24.9761 19.0853Z"
                              fill="url(#paint0_linear_9695_43772)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_9695_43772"
                                x1="5.95001"
                                y1="17.4765"
                                x2="25.9631"
                                y2="17.4822"
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
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                          >
                            <path
                              d="M16.0007 21.3347C15.298 21.3347 14.6154 21.0347 14.1287 20.5134L7.02738 12.912C6.52471 12.3734 6.55271 11.5294 7.09004 11.0267C7.62738 10.5267 8.47271 10.5534 8.97404 11.0907L16.0007 18.6107L23.0274 11.0907C23.5287 10.552 24.3754 10.5254 24.9114 11.0267C25.4487 11.5294 25.478 12.3734 24.9754 12.912L17.874 20.5134C17.386 21.0347 16.7034 21.3347 16.0007 21.3347Z"
                              fill="url(#paint0_linear_9695_43707)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_9695_43707"
                                x1="5.95004"
                                y1="17.4765"
                                x2="25.9624"
                                y2="17.4822"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}
                        <span className="mid-heading text-[20px] font-normal leading-normal">
                          {comment.replies
                            ? checkReplyLength(
                                comment._id,
                                comment.replies.length,
                              )
                            : ""}{" "}
                          reply
                        </span>
                      </div>
                      {isReplyOn === comment._id &&
                        comment.replies.map((replyFromComment) => (
                          <div key={replyFromComment._id} className="mb-3">
                            <div className="flex items-start gap-2.5">
                              <Image
                                className="w-8 h-8 rounded-full"
                                height={32}
                                width={32}
                                src={replyFromComment.userProfile}
                                alt="avatar "
                              />
                              <div className="flex flex-col w-full gap-1 ">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <span className="text-[16px] text-[#FAFAFA] font-semibold leading-[21px]">
                                    {replyFromComment.userName}
                                  </span>
                                </div>
                                {/* <div className="flex flex-col max-w-[91vw] leading-1.5 pt-0 p-4 border-[1px] border-[#404040] bg-[#262626] rounded-e-xl rounded-es-xl dark:bg-[#171717]">
                                  <p className="text-[20px] bg-[#262626] text-[#A3A3A3] font-normal leading-[28px] py-2.5 whitespace-pre-wrap break-words">
                                    {replyFromComment.comment}
                                  </p>
                                </div> */}
                                <CommentOrReplyWithReadMore
                                  replyFromComment={replyFromComment}
                                  itIsFor={"reply"}
                                />
                              </div>
                            </div>
                            <div className="flex w-full justify-between items-center mt-[14px]">
                              <div className="flex items-center justify-center gap-2">
                                <CommentLikeBtn
                                  commentId={replyFromComment._id}
                                  initialLiked={
                                    replyFromComment.isLiked
                                      ? replyFromComment.isLiked
                                      : false
                                  }
                                />
                                <span className="text-[18px] text-[#737373] font-semibold leading-normal">
                                  Like
                                </span>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <Dialog
                                  open={dialogOpen}
                                  onOpenChange={setDialogOpen}
                                >
                                  <DialogTrigger
                                    onClick={() =>
                                      handleOpenReportDialog(
                                        replyFromComment._id,
                                      )
                                    }
                                  >
                                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                      >
                                        <path
                                          d="M16 22.6667C16.3778 22.6667 16.6947 22.5387 16.9507 22.2827C17.2067 22.0267 17.3342 21.7102 17.3333 21.3333C17.3324 20.9564 17.2044 20.64 16.9493 20.384C16.6942 20.128 16.3778 20 16 20C15.6222 20 15.3058 20.128 15.0507 20.384C14.7956 20.64 14.6676 20.9564 14.6667 21.3333C14.6658 21.7102 14.7938 22.0271 15.0507 22.284C15.3076 22.5409 15.624 22.6684 16 22.6667ZM14.6667 17.3333H17.3333V9.33333H14.6667V17.3333ZM11 28L4 21V11L11 4H21L28 11V21L21 28H11ZM12.1333 25.3333H19.8667L25.3333 19.8667V12.1333L19.8667 6.66667H12.1333L6.66667 12.1333V19.8667L12.1333 25.3333Z"
                                          fill="#B94B1C"
                                        />
                                      </svg>
                                      <span className="hidden md:block text-[19px] text-[#737373] font-semibold leading-normal">
                                        Report
                                      </span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="report-dialog px-[48px]">
                                    <DialogHeader>
                                      <DialogTitle></DialogTitle>
                                      <DialogDescription className="flex flex-col items-center justify-center pt-6">
                                        <h2 className="text-[32px] text-[#FFFFFF] font-bold leading-normal mb-2">
                                          Report Your Issue
                                        </h2>
                                        <h5 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal mb-6">
                                          Please share what issue you are
                                          facing?
                                        </h5>

                                        <div className="flex flex-col items-start justify-start w-full space-y-3">
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="nudity or sexual activity"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "nudity or sexual activity"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Nudity or sexual activity
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="hate speech or symbols"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "hate speech or symbols"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Hate speech or symbols
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="bullying or harassment"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "bullying or harassment"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Bullying or harassment
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="false information"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "false information"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            False information
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="I just don't like it"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "I just don't like it"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            I just don&apos;t like it
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="other"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue === "other"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Other
                                          </label>
                                        </div>

                                        {(selectedIssue ===
                                          "false information" ||
                                          selectedIssue === "other") && (
                                          <Textarea
                                            className="h-[70px] bg-[#171717] text-white p-[10px] mt-[16px]"
                                            placeholder="Write text here ..."
                                            onChange={(e) =>
                                              setCommentReportText(
                                                e.target.value,
                                              )
                                            }
                                            value={commentReportText}
                                          />
                                        )}

                                        <Button
                                          onClick={() =>
                                            handleCommentReport(
                                              replyFromComment._id,
                                            )
                                          }
                                          className="primaryButton w-[327px] text-[18px] text-[#FFFFFF] font-bold leading-[21px] mt-6"
                                        >
                                          Submit
                                        </Button>
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        ))}
                      {isReplyOn === comment._id &&
                        replies[comment._id] &&
                        replies[comment._id].map((reply, index) => (
                          <div key={reply._id} className="mb-3">
                            <div className="flex items-start gap-2.5">
                              <Image
                                className="w-8 h-8 rounded-full"
                                height={32}
                                width={32}
                                src={reply.userProfile}
                                alt="avatar "
                              />
                              <div className="flex flex-col w-full gap-1 ">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <span className="text-[16px] text-[#FAFAFA] font-semibold leading-[21px]">
                                    {reply.userName}
                                  </span>
                                </div>
                                {/* <div className="flex flex-col max-w-[91vw] leading-1.5 pt-0 p-4 border-[1px] border-[#404040] bg-[#262626] rounded-e-xl rounded-es-xl dark:bg-[#171717]">
                                  <p className="text-[20px] text-[#A3A3A3] bg-[#262626] font-normal leading-[28px]  py-2.5 whitespace-pre-wrap break-words">
                                    {reply.comment}
                                  </p>
                                </div> */}
                                <CommentOrReplyWithReadMore
                                  replyFromComment={reply}
                                  itIsFor={"reply"}
                                />
                              </div>
                            </div>
                            <div className="flex w-full justify-between items-center mt-[14px]">
                              <div className="flex items-center justify-center gap-2">
                                <CommentLikeBtn
                                  commentId={reply._id}
                                  initialLiked={
                                    reply.isLiked ? reply.isLiked : false
                                  }
                                />
                                <span className="text-[18px] text-[#737373] font-semibold leading-normal">
                                  Like
                                </span>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <Dialog
                                  open={dialogOpen}
                                  onOpenChange={setDialogOpen}
                                >
                                  <DialogTrigger
                                    onClick={() =>
                                      handleOpenReportDialog(reply._id)
                                    }
                                  >
                                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                      >
                                        <path
                                          d="M16 22.6667C16.3778 22.6667 16.6947 22.5387 16.9507 22.2827C17.2067 22.0267 17.3342 21.7102 17.3333 21.3333C17.3324 20.9564 17.2044 20.64 16.9493 20.384C16.6942 20.128 16.3778 20 16 20C15.6222 20 15.3058 20.128 15.0507 20.384C14.7956 20.64 14.6676 20.9564 14.6667 21.3333C14.6658 21.7102 14.7938 22.0271 15.0507 22.284C15.3076 22.5409 15.624 22.6684 16 22.6667ZM14.6667 17.3333H17.3333V9.33333H14.6667V17.3333ZM11 28L4 21V11L11 4H21L28 11V21L21 28H11ZM12.1333 25.3333H19.8667L25.3333 19.8667V12.1333L19.8667 6.66667H12.1333L6.66667 12.1333V19.8667L12.1333 25.3333Z"
                                          fill="#B94B1C"
                                        />
                                      </svg>
                                      <span className="hidden md:block text-[19px] text-[#737373] font-semibold leading-normal">
                                        Report
                                      </span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="report-dialog px-[48px]">
                                    <DialogHeader>
                                      <DialogTitle></DialogTitle>
                                      <DialogDescription className="flex flex-col items-center justify-center pt-6">
                                        <h2 className="text-[32px] text-[#FFFFFF] font-bold leading-normal mb-2">
                                          Report Your Issue
                                        </h2>
                                        <h5 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal mb-6">
                                          Please share what issue you are
                                          facing?
                                        </h5>
                                        <div className="flex flex-col items-start justify-start w-full space-y-3">
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="nudity or sexual activity"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "nudity or sexual activity"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Nudity or sexual activity
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="hate speech or symbols"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "hate speech or symbols"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Hate speech or symbols
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="bullying or harassment"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "bullying or harassment"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Bullying or harassment
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="false information"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "false information"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            False information
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="I just don't like it"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue ===
                                                "I just don't like it"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            I just don&apos;t like it
                                          </label>
                                          <label className="flex justify-start items-center gap-[12px] text-[20px] text-[#F5F5F5] font-semibold leading-normal">
                                            <input
                                              type="radio"
                                              value="other"
                                              className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              checked={
                                                selectedIssue === "other"
                                              }
                                              onChange={(e) =>
                                                setSelectedIssue(e.target.value)
                                              }
                                            />
                                            Other
                                          </label>
                                        </div>

                                        {(selectedIssue ===
                                          "false information" ||
                                          selectedIssue === "other") && (
                                          <Textarea
                                            className="h-[70px] bg-[#171717] text-white p-[10px] mt-[16px]"
                                            placeholder="Write text here ..."
                                            onChange={(e) =>
                                              setCommentReportText(
                                                e.target.value,
                                              )
                                            }
                                            value={commentReportText}
                                          />
                                        )}

                                        <Button
                                          onClick={() =>
                                            handleCommentReport(reply._id)
                                          }
                                          className="primaryButton w-[327px] text-[18px] text-[#FFFFFF] font-bold leading-[21px] mt-6"
                                        >
                                          Submit
                                        </Button>
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="seperator-gradient h-[1px] w-full mt-3"></div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentShareAndReport;
