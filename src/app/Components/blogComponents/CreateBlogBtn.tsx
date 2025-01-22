"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Popup from "@/app/Components/Popup";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const CreateBlogBtn = () => {
  const [showBioPopup, setShowBioPopup] = useState(false);
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [bio, setBio] = useState("");
  const token = Cookies.get("genToken");
  const router = useRouter();
  const { toast } = useToast();

  const handleUserToCreateBlog = () => {
    //console.log("token :", token);
    if (token) {
      // router.push("/user_blogs/create_blogs/blog_details");
      checkForBio();
    } else {
      router.push("/login");
    }
  };

  const checkForBio = async () => {
    const userId = Cookies.get("user_id");
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/create-bio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            bioContent: "I am a blogger", // This won't be saved if the user already has blogs
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        // User doesn't have any blogs yet, show bio popup
        setShowBioPopup(true);
      } else {
        // User already has blogs, redirect to create blog page
        router.push("/user_blogs/create_blogs/blog_details");
      }
    } catch (error) {
      //console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (bio.length < 80) {
      toast({
        title: "Bio too short",
        description: "Bio must be at least 80 characters long.",
        duration: 3000,
      });
      return;
    }

    if (bio.length > 200) {
      toast({
        title: "Bio too long",
        description: "Bio must be under 200 characters.",
        duration: 3000,
      });
      return;
    }
    const userId = Cookies.get("user_id");
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/blog/create-bio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            bioContent: bio,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
          duration: 3000,
        });
        setShowBioPopup(false);
        router.push("/user_blogs/create_blogs/blog_details");
      } else {
        toast({
          title: "Error",
          description: data.message,
          duration: 3000,
        });
      }
    } catch (error) {
      //console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the bio.",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleUserToCreateBlog}
        className="primaryButton w-[328px] md:w-[180px] xl:w-[auto] h-[46px] text-[#E5E5E5] md:text-[#FFF] text-[18px] md:text-[16px] font-medium leading-[24px] mt-0 md:mt-0"
      >
        Write a blog post
      </Button>
      {showBioPopup && (
        <Dialog open={showBioPopup} onOpenChange={setShowBioPopup}>
          <DialogContent className="report-dialog px-[48px]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <div className="flex flex-col flex-grow">
                <h1 className="text-white text-[24px] md:text-[28px]">
                Tell us about yourself
                </h1>
                <p className="mb-6 text-center text-neutral-500">
                Share your journey, goals, or what motivates you – make your
                profile uniquely yours!
              </p>
                <Textarea
                  className="h-[148px] bg-[#171717] text-white p-[10px] my-6"
                  placeholder="Enter your text here..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className="mb-4 text-sm text-right text-[#A3A3A3]">
                  Max 80 Characters
                </div>
                <button
                  onClick={handleSubmit}
                  className="flex justify-center py-3 m-auto text-center text-white transition-colors rounded-md w-80 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  Submit
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreateBlogBtn;
