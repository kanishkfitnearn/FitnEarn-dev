"use client";
import { useState } from "react";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

type ReportProps = {
  videoId: string;
};

const VideoReportComponent: React.FC<ReportProps> = ({ videoId }) => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const userId = Cookies.get("user_id");
  const [reason, setReason] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!userId) {
      setDialogOpen(false);
      toast({
        title: "User not exist",
        description:
          "You are not a user of FitnEarn! please signup or login to report this video",
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a reason for reporting the video.",
      });
      return;
    }

    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/workout/videos/report?videoId=${videoId}&userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: [reason] }),
        },
      );
      const data = await response.json();
      //console.log(" data from db for report", data);
      if (response.ok) {
        setDialogOpen(false);
        console.log("video report function is called", videoId, userId, reason);
        (window as any).gtag("event", "video_report", {
          event_category: "Workout Video Report",
          event_videoId: videoId || "Unknown videoId",
          event_userId: userId || "Unknown userId",
          event_report_reason: reason ,
        })
        toast({
          title: "Success",
          description: "Your report has been submitted.",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit your report.",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
      }
    } catch (err) {
      const error = err as Error; // Casting to Error
      toast({
        title: "Error",
        description: error.message || "Failed to submit your report.",
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
    }
  };

  return (
    <>
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
            {/* <DialogClose className="absolute z-40 text-white top-2 md:top-1 right-2 md:right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <path
                  d="M22.409 20.0192L31.2307 11.1975C31.3899 11.0438 31.5169 10.8599 31.6042 10.6565C31.6916 10.4532 31.7375 10.2345 31.7395 10.0132C31.7414 9.79188 31.6992 9.57242 31.6154 9.36759C31.5316 9.16276 31.4079 8.97667 31.2514 8.82019C31.0949 8.6637 30.9088 8.53994 30.704 8.45614C30.4991 8.37234 30.2797 8.33017 30.0584 8.33209C29.8371 8.33402 29.6184 8.37999 29.415 8.46734C29.2117 8.55469 29.0278 8.68166 28.874 8.84085L20.0524 17.6625L11.2307 8.84085C10.9164 8.53725 10.4954 8.36926 10.0584 8.37305C9.62138 8.37685 9.20336 8.55213 8.89435 8.86115C8.58534 9.17016 8.41005 9.58818 8.40626 10.0252C8.40246 10.4622 8.57045 10.8832 8.87405 11.1975L17.6957 20.0192L8.87405 28.8408C8.71486 28.9946 8.58789 29.1785 8.50055 29.3818C8.4132 29.5852 8.36722 29.8039 8.3653 30.0252C8.36337 30.2465 8.40554 30.4659 8.48934 30.6708C8.57315 30.8756 8.6969 31.0617 8.85339 31.2182C9.00988 31.3747 9.19596 31.4984 9.40079 31.5822C9.60562 31.666 9.82508 31.7082 10.0464 31.7063C10.2677 31.7043 10.4864 31.6584 10.6897 31.571C10.8931 31.4837 11.077 31.3567 11.2307 31.1975L20.0524 22.3758L28.874 31.1975C29.1884 31.5011 29.6094 31.6691 30.0464 31.6653C30.4834 31.6615 30.9014 31.4862 31.2104 31.1772C31.5194 30.8682 31.6947 30.4502 31.6985 30.0132C31.7023 29.5762 31.5343 29.1552 31.2307 28.8408L22.409 20.0192Z"
                  fill="#D4D4D4"
                />
              </svg>
            </DialogClose> */}
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoReportComponent;
