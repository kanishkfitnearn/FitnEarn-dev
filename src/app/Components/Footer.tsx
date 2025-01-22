"use client";
import React, { useState } from "react";
import type { NextPage } from "next";
import Eclips from "@/app/images/Ellipse-71.png";
import logo from "../../../public/logo.png";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
export type LogoLinksType = {
  className?: string;
};

const NewsletterConfirmationModal = ({ onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-[358px] h-[192px] bg-neutral-900 rounded-lg shadow-lg relative flex flex-col items-center justify-center text-center p-6">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            d="M52.9798 24.6994L50.7348 22.4519C50.2598 21.9794 49.9998 21.3494 49.9998 20.6819V17.5019C49.9998 13.3669 46.6348 10.0019 42.4998 10.0019H39.3198C38.6623 10.0019 38.0173 9.73437 37.5523 9.26937L35.3048 7.02187C32.3798 4.09687 27.6248 4.09687 24.6998 7.02187L22.4473 9.26937C21.9823 9.73437 21.3373 10.0019 20.6798 10.0019H17.4998C13.3648 10.0019 9.99977 13.3669 9.99977 17.5019V20.6819C9.99977 21.3494 9.73977 21.9794 9.26727 22.4519L7.01977 24.6969C5.60227 26.1144 4.82227 27.9994 4.82227 30.0019C4.82227 32.0044 5.60477 33.8894 7.01977 35.3044L9.26477 37.5519C9.73977 38.0244 9.99977 38.6544 9.99977 39.3219V42.5019C9.99977 46.6369 13.3648 50.0019 17.4998 50.0019H20.6798C21.3373 50.0019 21.9823 50.2694 22.4473 50.7344L24.6948 52.9844C26.1573 54.4444 28.0773 55.1744 29.9973 55.1744C31.9173 55.1744 33.8373 54.4444 35.2998 52.9819L37.5473 50.7344C38.0173 50.2694 38.6623 50.0019 39.3198 50.0019H42.4998C46.6348 50.0019 49.9998 46.6369 49.9998 42.5019V39.3219C49.9998 38.6544 50.2598 38.0244 50.7348 37.5519L52.9798 35.3069C54.3948 33.8894 55.1773 32.0069 55.1773 30.0019C55.1773 27.9969 54.3973 26.1144 52.9798 24.6994ZM41.3873 27.0819L26.3873 37.0819C25.9648 37.3644 25.4798 37.5019 24.9998 37.5019C24.3548 37.5019 23.7148 37.2519 23.2323 36.7694L18.2323 31.7694C17.2548 30.7919 17.2548 29.2119 18.2323 28.2344C19.2098 27.2569 20.7898 27.2569 21.7673 28.2344L25.3173 31.7844L38.6123 22.9219C39.7648 22.1544 41.3148 22.4644 42.0798 23.6144C42.8473 24.7644 42.5373 26.3169 41.3873 27.0819Z"
            fill="#15803D"
          />
        </svg>

        <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">
          Please check Email!
        </h2>

        <p className="text-sm text-gray-300">
          Verification link has been sent to your email address.
        </p>
      </div>
    </div>
  );
};

const Footer: NextPage<LogoLinksType> = ({ className = "" }) => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const token = Cookies.get("genToken");
  const router = useRouter();

  const handleUserToCreateBlog = () => {
    //console.log($&)
    if (token) {
      router.push("/user_blogs/create_blogs/blog_details");
    } else {
      router.push("/signup");
    }
  };
  function isValidEmail(email: any) {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubscribe = async (e: any) => {
    e.preventDefault();
    setSubscriptionStatus("Subscribing...");

    try {
      setLoading(true);
      if (isValidEmail(email)) {
        //console.log($&)
      } else {
        setLoading(false);
        toast({
          title: "Invalid Email !",
          description: "Please enter valid Email ID.",
          duration: 3000, // 5 seconds
        });
        return;
      }
      const response = await axios.post(
        `${apiEndpoint}/api/fitnearn/web/users/newsletter-subscribe`,
        { email },
      );

      if (response.status === 200) {
        setSubscriptionStatus("Subscribed successfully!");
        setSuccess(true);
        setEmail("");
        //console.log($&)
        setLoading(false);
      } else {
        setSubscriptionStatus("Subscription failed. Please try again.");
        //console.log($&)
        setLoading(false);
      }
    } catch (error) {
      //console.error("Error subscribing:", error);
      setSubscriptionStatus("An error occurred. Please try again.");
      setLoading(false);
    }

    // Clear status message after 3 seconds
    setTimeout(() => setSubscriptionStatus(""), 3000);
    setTimeout(() => setSuccess(false), 3000);
  };
  return (
    <>
      <div className="z-50 flex flex-row w-auto px-0 pb-0 overflow-x-auto z over bg-neutral-900">
        {success && <NewsletterConfirmationModal />}
        <footer className="flex-1 [background:linear-gradient(180deg,_rgba(219,_39,_119,_0.12),_rgba(249,_115,_22,_0.12))] box-border overflow-hidden flex flex-col items-start justify-start pt-[62px] px-[72px]  gap-[32px] max-w-full text-left text-xs text-neutral-400 font-sm-14-regular border-t-[0px] border-solid border-border mq750:gap-[16px] mq750:pt-10 mq750:px-9 mq750:pb-5 mq750:box-border">
          <div
            className={`self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full text-left text-13xl text-neutral-100 font-sm-14-regular mq750:gap-[16px] ${className}`}
          >
            <div className="self-stretch mq450:flex-col flex flex-row items-center justify-between max-w-full gap-[20px] mq1100:flex-wrap ">
              <div className="w-[509px] flex flex-col items-start justify-start gap-[8px] max-w-full">
                <div className="flex flex-col gap-2">
                  <h1 className=" text-[29px] h-[30px] py-2 font-bold  text-[transparent] !bg-clip-text [background:linear-gradient(-86.88deg,_#e3206d,_#f16a33)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mq450:text-[25px] mq1025:text-[26px]">
                    Join Our Newsletter
                  </h1>
                  <p className="relative m-0 text-base font-medium mq450:hidden ">
                    Be the first to know about our latest updates, exclusive
                    offers, and more.
                  </p>
                </div>
              </div>
              <div className="w-[432px] flex flex-row items-start justify-start gap-[12px] max-w-full text-sm text-color-text-primary mq450:flex-wrap ">
                <div className="flex-1 flex flex-col items-start justify-start min-w-[208px]">
                  <div className="self-stretch rounded-lg flex flex-row items-center justify-start py-2.5 px-[11px] gap-[16px] border-[1px] border-solid border-neutral-3001">
                    <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                      <div className="flex-1 flex flex-row items-center justify-start gap-[2px]">
                        <div className="h-5 w-0.5 relative bg-primary-blue-700 overflow-hidden shrink-0 hidden" />

                        <input
                          value={email}
                          type=""
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="  Enter your email address"
                          className="flex-1 h-5 font-medium bg-transparent border border-none focus:outline-0 bgrelative text-text-300 active:border-none focus:border-none selection:border-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubscribe}
                  className="cursor-pointer [border:none] py-3 px-[19px] bg-[transparent] rounded-lg [background:linear-gradient(-86.88deg,_#e3206d,_#f16a33)] flex flex-row items-center justify-center  "
                >
                  <div className="relative text-sm font-medium font-sm-14-regular text-text-50 text-left inline-block min-w-[61px] text-neutral-50">
                    {loading ? "Loading" : "Subscribe"}
                  </div>
                </button>
              </div>
            </div>
            {/* white line */}
            <div className="relative self-stretch h-px overflow-hidden bg-neutral-200 shrink-0" />
          </div>

          <div
            className={` mq450:flex-col mq750:flex-col mq1050:flex-row self-stretch flex flex-row items-start justify-between pt-0 pb-2.5 pr-0 pl-px box-border max-w-full gap-[20px] text-left text-base text-neutral-2001 font-sm-14-regular mq1100:flex-wrap ${className}`}
          >
            <div className="w-[365px] text-neutral-300  flex flex-col items-start justify-start relative gap-[17px] min-w-[365px] max-w-full mq750:min-w-full mq1100:flex-1">
              <p className="!m-[0] text-neutral-300 mq450:hidden w-[360px] absolute top-[65px] right-[0px] leading-[24px] flex items-center">
                {
                  "Welcome to FitnEarn, where fitness meets reward in an innovative and engaging way. Our platform is designed to inspire, motivate, you towards a healthier lifestyle, as you achieve your fitness goals. "
                }
              </p>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center flex-row items-start justify-start gap-[1px] text-11xl">
                  <Logo />
                  <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
                    <div className="flex flex-row items-start justify-start">
                      {/* <a href="/" target="_blank" rel="noopener noreferrer"> */}
                        <h1 className="m-0 pl-2 mq450:text-[22px] mq450:pl-2 relative text-[30px] font-bold logoName inline-block min-w-[116px] mq1025:text-5xl">
                          FitnEarn
                        </h1>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </a>
              {/* socail logos */}
              <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[5px] box-border max-w-full">
                  <p className="m-0 flex-1 relative leading-[24px] inline-block max-w-full z-[1]">
                    {
                      "Welcome to FitnEarn, where fitness meets reward in an innovative and engaging way. Our platform is designed to inspire, motivate, you towards a healthier lifestyle, as you achieve your fitness goals. "
                    }
                  </p>
                </div>
                <div className="flex mq450:flex-row flex-col items-start justify-start gap-[8px] text-neutral-400">
                  <div className="relative inline-block min-w-[69px]">
                    Follow Us
                  </div>
                  <div className="flex flex-row items-start justify-start gap-[16px]">
                    <a href="https://www.facebook.com/fitnearn" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_4861_21275)">
                          <path
                            d="M23.5 12.0694C23.5 5.71811 18.3513 0.569391 12 0.569391C5.64872 0.569391 0.5 5.71811 0.5 12.0694C0.5 17.8094 4.70538 22.567 10.2031 23.4297V15.3936H7.2832V12.0694H10.2031V9.5358C10.2031 6.65361 11.92 5.06158 14.5468 5.06158C15.805 5.06158 17.1211 5.28619 17.1211 5.28619V8.11627H15.671C14.2424 8.11627 13.7969 9.00273 13.7969 9.91218V12.0694H16.9863L16.4765 15.3936H13.7969V23.4297C19.2946 22.567 23.5 17.8094 23.5 12.0694Z"
                            fill="url(#paint0_linear_4861_21275)"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_4861_21275"
                            x1="22.996"
                            y1="0.56939"
                            x2="-0.684182"
                            y2="1.87004"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                          <clipPath id="clip0_4861_21275">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/fitearn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.50078 11.7445C8.50078 9.95069 9.95546 8.4961 11.7504 8.4961C13.5453 8.4961 15.0008 9.95069 15.0008 11.7445C15.0008 13.5384 13.5453 14.993 11.7504 14.993C9.95546 14.993 8.50078 13.5384 8.50078 11.7445ZM6.74368 11.7445C6.74368 14.5081 8.98518 16.7482 11.7504 16.7482C14.5156 16.7482 16.7571 14.5081 16.7571 11.7445C16.7571 8.98099 14.5156 6.74084 11.7504 6.74084C8.98518 6.74084 6.74368 8.98099 6.74368 11.7445ZM15.7853 6.54244C15.7852 6.77371 15.8537 6.99982 15.9822 7.19217C16.1107 7.38452 16.2934 7.53447 16.5071 7.62306C16.7209 7.71165 16.9561 7.7349 17.1831 7.68987C17.4101 7.64485 17.6186 7.53356 17.7823 7.37009C17.946 7.20662 18.0575 6.99831 18.1028 6.77149C18.148 6.54468 18.1249 6.30955 18.0365 6.09585C17.948 5.88214 17.7981 5.69946 17.6057 5.57089C17.4134 5.44232 17.1872 5.37365 16.9558 5.37356H16.9553C16.6451 5.37371 16.3477 5.49689 16.1283 5.71605C15.9089 5.93521 15.7855 6.23243 15.7853 6.54244ZM7.81123 19.6764C6.86061 19.6331 6.34392 19.4748 6.00055 19.3412C5.54532 19.164 5.22051 18.9531 4.87902 18.6123C4.53752 18.2714 4.32613 17.9471 4.14969 17.4922C4.01583 17.1492 3.85749 16.6326 3.81427 15.6826C3.767 14.6554 3.75757 14.3469 3.75757 11.7446C3.75757 9.14236 3.76778 8.83467 3.81427 7.80666C3.85757 6.8566 4.01708 6.34108 4.14969 5.99706C4.32691 5.5421 4.53799 5.21749 4.87902 4.8762C5.22005 4.53491 5.54454 4.32364 6.00055 4.14731C6.34376 4.01353 6.86061 3.85528 7.81123 3.8121C8.839 3.76485 9.14774 3.75542 11.7504 3.75542C14.353 3.75542 14.6621 3.76563 15.6907 3.8121C16.6413 3.85536 17.1572 4.01478 17.5014 4.14731C17.9566 4.32364 18.2814 4.53537 18.6229 4.8762C18.9644 5.21702 19.175 5.5421 19.3523 5.99706C19.4861 6.34006 19.6445 6.8566 19.6877 7.80666C19.7349 8.83467 19.7444 9.14236 19.7444 11.7446C19.7444 14.3469 19.7349 14.6546 19.6877 15.6826C19.6444 16.6326 19.4853 17.149 19.3523 17.4922C19.175 17.9471 18.964 18.2717 18.6229 18.6123C18.2819 18.9528 17.9566 19.164 17.5014 19.3412C17.1582 19.4749 16.6413 19.6332 15.6907 19.6764C14.6629 19.7236 14.3542 19.733 11.7504 19.733C9.14657 19.733 8.83869 19.7236 7.81123 19.6764ZM7.7305 2.05901C6.69251 2.10625 5.98323 2.27074 5.36381 2.51163C4.72231 2.76039 4.17925 3.09412 3.63658 3.6356C3.09392 4.17709 2.76084 4.72068 2.51193 5.36179C2.2709 5.98123 2.10632 6.6897 2.05905 7.72706C2.011 8.76607 2 9.09824 2 11.7445C2 14.3908 2.011 14.723 2.05905 15.762C2.10632 16.7995 2.2709 17.5079 2.51193 18.1273C2.76084 18.768 3.09399 19.3122 3.63658 19.8535C4.17917 20.3947 4.72231 20.728 5.36381 20.9775C5.9844 21.2183 6.69251 21.3828 7.7305 21.4301C8.77067 21.4773 9.1025 21.4891 11.7504 21.4891C14.3983 21.4891 14.7307 21.4781 15.7703 21.4301C16.8083 21.3828 17.5172 21.2183 18.137 20.9775C18.7781 20.728 19.3215 20.395 19.8642 19.8535C20.4069 19.312 20.7392 18.768 20.9888 18.1273C21.2299 17.5079 21.3952 16.7994 21.4417 15.762C21.489 14.7222 21.5 14.3908 21.5 11.7445C21.5 9.09824 21.489 8.76607 21.4417 7.72706C21.3945 6.68962 21.2299 5.98084 20.9888 5.36179C20.7392 4.72107 20.406 4.17794 19.8642 3.6356C19.3224 3.09326 18.7781 2.76039 18.1378 2.51163C17.5172 2.27074 16.8083 2.10547 15.7711 2.05901C14.7314 2.01177 14.3991 2 11.7512 2C9.10328 2 8.77067 2.01099 7.7305 2.05901Z"
                          fill="url(#paint0_linear_4861_21277)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_4861_21277"
                            x1="21.0727"
                            y1="21.4891"
                            x2="0.995355"
                            y2="20.3924"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>
                    <a target="_blank" href="https://www.x.com/fitnearn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21.4133 5.93098C20.7825 6.20244 20.1194 6.39148 19.4402 6.4934C19.7577 6.43898 20.2249 5.86748 20.4109 5.63616C20.6934 5.28723 20.9087 4.88891 21.0459 4.46142C21.0459 4.42967 21.0776 4.38431 21.0459 4.36163C21.0299 4.3529 21.0119 4.34832 20.9937 4.34832C20.9755 4.34832 20.9576 4.3529 20.9416 4.36163C20.2041 4.76096 19.4193 5.06574 18.6057 5.26877C18.5773 5.27743 18.5471 5.27821 18.5184 5.27102C18.4896 5.26383 18.4633 5.24894 18.4424 5.22795C18.3791 5.15253 18.3109 5.08132 18.2383 5.01477C17.9064 4.71743 17.5299 4.47407 17.1225 4.2936C16.5726 4.06798 15.9786 3.97027 15.3853 4.00785C14.8097 4.0442 14.2478 4.19859 13.7344 4.46142C13.2288 4.73851 12.7845 5.11495 12.4281 5.56812C12.0532 6.03455 11.7825 6.57585 11.6343 7.15561C11.5121 7.70709 11.4983 8.27706 11.5935 8.83382C11.5935 8.92907 11.5935 8.94268 11.5119 8.92907C8.27792 8.45282 5.62455 7.30529 3.45649 4.84241C3.36124 4.73356 3.31135 4.73356 3.23424 4.84241C2.29082 6.27569 2.74892 8.54354 3.9282 9.66385C4.08695 9.81353 4.25023 9.95867 4.42259 10.0947C3.8819 10.0564 3.35441 9.90983 2.87138 9.66385C2.78067 9.60489 2.73078 9.63664 2.72624 9.74549C2.71338 9.89641 2.71338 10.0481 2.72624 10.1991C2.82088 10.9223 3.10591 11.6075 3.55219 12.1844C3.99847 12.7614 4.58998 13.2095 5.26623 13.4829C5.43108 13.5535 5.60286 13.6067 5.77876 13.6416C5.27821 13.7402 4.76484 13.7555 4.2593 13.687C4.15045 13.6643 4.10963 13.7233 4.15045 13.8276C4.81719 15.6419 6.26408 16.1952 7.32543 16.5037C7.47057 16.5263 7.61571 16.5263 7.779 16.5626C7.779 16.5626 7.779 16.5626 7.75178 16.5898C7.43882 17.1613 6.17336 17.5469 5.5928 17.7464C4.53311 18.1271 3.40329 18.2726 2.28175 18.1728C2.10485 18.1456 2.06403 18.1501 2.01868 18.1728C1.97332 18.1955 2.01868 18.2454 2.06857 18.2907C2.29535 18.4404 2.52214 18.5719 2.75799 18.6989C3.46014 19.0819 4.20245 19.3861 4.97141 19.6061C8.95374 20.7037 13.435 19.8964 16.424 16.9255C18.7735 14.5941 19.599 11.3783 19.599 8.158C19.599 8.03554 19.7487 7.96297 19.8349 7.89947C20.4293 7.43633 20.9533 6.88937 21.3906 6.27569C21.4663 6.18421 21.5052 6.06774 21.4995 5.94912C21.4995 5.88109 21.4995 5.89469 21.4133 5.93098Z"
                          fill="url(#paint0_linear_4861_21280)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_4861_21280"
                            x1="21.0727"
                            y1="20.0744"
                            x2="1.02339"
                            y2="18.7466"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/fit-n-earn/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.44117 2C2.64548 2 2 2.62583 2 3.39684V20.1036C2 20.8747 2.64556 21.5 3.44117 21.5H20.0588C20.8548 21.5 21.5 20.8746 21.5 20.1034V3.39684C21.5 2.62583 20.8548 2 20.0588 2H3.44117ZM7.9257 9.54002V18.319H5.00771V9.54002H7.9257ZM8.11804 6.82502C8.11804 7.66748 7.48467 8.34161 6.46732 8.34161L6.4482 8.34153C5.46886 8.34153 4.83572 7.66741 4.83572 6.82495C4.83572 5.96337 5.48798 5.30806 6.48667 5.30806C7.48467 5.30806 8.099 5.96337 8.11804 6.82502ZM12.4586 18.319H9.54085C9.54085 18.319 9.57909 10.3639 9.54101 9.54032H12.4588V10.7829C12.8467 10.1849 13.5409 9.3342 15.0887 9.3342C17.0084 9.3342 18.4478 10.589 18.4478 13.2854V18.319H15.5301V13.623C15.5301 12.4427 15.1076 11.6377 14.052 11.6377C13.2457 11.6377 12.7656 12.1806 12.5547 12.705C12.4777 12.8922 12.4586 13.1549 12.4586 13.4169V18.319Z"
                          fill="url(#paint0_linear_4861_21283)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_4861_21283"
                            x1="21.0727"
                            y1="21.5"
                            x2="0.995289"
                            y2="20.4039"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[554px] mq450:gap-40 mq450:flex-row flex flex-col items-start justify-start pt-[17px] px-0 pb-0 box-border min-w-[554px] max-w-full text-neutral-100 mq750:min-w-full mq1100:flex-1">
              <div className="self-stretch mq450:justify-between mq450:py-2  flex flex-row items-start justify-start py-0 px-0 gap-[32px] mq750:flex-wrap mq750:gap-[16px]">
                <div className="w-[124px] flex flex-col items-start justify-start gap-[16px] shrink-0">
                  <b className="relative self-stretch font-bold mq450:text-[21px]">
                    Join FitnEarn
                  </b>
                  <div className="flex flex-col items-start justify-start gap-[12px] text-sm text-neutral-300">
                    <a
                      href="/ourstory"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <div className="w-[62px] h-6 rounded hidden flex-row items-center justify-start gap-[8px]">
                        <div className="h-[17px] flex-1 relative inline-block">
                          Our Story
                        </div>
                      </div>
                    </a>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <div className="relative inline-block min-w-[118px]">
                        <a
                          href="https://app.formbricks.com/s/clzcvjsn5000jjziteyiqolfd"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Be a early bird user
                        </a>
                      </div>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <div className="relative inline-block min-w-[112px]">
                        <a
                          href="https://app.formbricks.com/s/clzlf0t9u0000ajhzqf1n63wo"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Partner as a coach
                        </a>
                      </div>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <div className="relative inline-block min-w-[102px]">
                        <a
                          href="https://app.formbricks.com/s/clzmewgfs00009edi7qrj0n52"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Partner as a gym
                        </a>
                      </div>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <div className="relative inline-block min-w-[112px]">
                        <a
                          href="https://app.formbricks.com/s/clzmfc8kz00019edi3lr4tu8e"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Partner as a brand
                        </a>
                      </div>
                    </div>
                    <div className="w-[85px] h-6 rounded hidden flex-row items-center justify-start py-0 pr- pl-0 box-border gap-[8px]">
                      <Link
                        href={"/contactUs"}
                        className="h-[17px] flex-1 relative inline-block"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[16px]">
                  <b className="w-[124px] mq450:text-[21px] relative font-bold inline-block">
                    Services
                  </b>
                  <div className="flex flex-col items-start justify-center gap-[12px] text-sm text-neutral-300">
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <Link href="/calculator">
                        <div className="relative inline-block min-w-[111px]">
                          Fitness Calculator
                        </div>
                      </Link>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <div className="relative inline-block min-w-[82px]">
                        Fitness Score
                      </div>
                      <div className="inline-flex  items-center justify-center px-1 py-0 text-[10px] font-semibold text-gray-800 bg-orange-200 text-nowrap rounded-full">
                        Coming soon
                      </div>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <Link href="/workout">
                        <div className="relative inline-block min-w-[101px]">
                          Workout Videos
                        </div>
                      </Link>
                    </div>
                    <Link href="/workout">
                      <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                        <div className="relative inline-block min-w-[104px]">
                          Join Live Session
                        </div>
                      </div>
                    </Link>
                    <div className="w-[61px] rounded flex flex-row items-center justify-start py-[3.5px] px-0 box-border gap-[8px]">
                      <Link href="/coach">
                        <div className="w-[122px] relative inline-block shrink-0">
                          Connect with coach
                        </div>
                      </Link>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px] cursor-pointer">
                      <p className="relative text-nowrap" onClick={handleUserToCreateBlog}>
                          Create your own blog
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[16px]">
                  <b className="relative mq450:text-[21px] leading-[19.2px] font-bold inline-block min-w-[87px]">
                    Our Policies
                  </b>
                  <div className="flex flex-col items-start justify-start gap-[12px] text-sm text-neutral-300">
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <a
                        target="_blank"
                        href="/privacy-policy"
                        className="[text-decoration:none] relative text-[inherit] inline-block min-w-[86px]"
                      >
                        Privacy Policy
                      </a>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <div className="relative inline-block min-w-[121px]">
                        <a target="_blank" href="/terms-and-conditions">
                          {"Terms & Conditions"}
                        </a>
                      </div>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <a target="_blank" href="/return-and-refund">
                        <div className="relative inline-block min-w-[127px]">
                          Return & Refund Policy
                        </div>
                      </a>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <a
                        href="/cancellation-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative inline-block min-w-[114px]">
                          Cancelation Policy
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-[124px] flex flex-col items-start justify-start gap-[16px] shrink-0">
                  <b className="relative mq450:text-[21px] self-stretch font-bold">
                    Explore
                  </b>
                  <div className="flex flex-col items-start justify-start gap-[12px] text-sm text-neutral-300">
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <a href="/ourstory" rel="noopener noreferrer">
                        {" "}
                        <div className="relative inline-block min-w-[61px]">
                          Our Story
                        </div>
                      </a>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <a
                        target="_blank"
                        href="/about-us"
                        className="[text-decoration:none] relative text-[inherit] inline-block min-w-[58px]"
                      >
                        About Us
                      </a>
                    </div>
                    <div className="w-[61px] h-6 rounded hidden flex-row items-center justify-start gap-[8px]">
                      <div className="relative whitespace-nowrap shrink-0">
                        Be a early bird user
                      </div>
                    </div>
                    <div className="w-[61px] h-6 rounded hidden flex-row items-center justify-start gap-[8px]">
                      <div className="relative whitespace-nowrap shrink-0">
                        Partner as a coach
                      </div>
                    </div>
                    <div className="w-[115px] h-6 rounded hidden flex-row items-center justify-start py-0 pr-[13px] pl-0 box-border gap-[8px]">
                      <div className="h-[17px] flex-1 relative inline-block">
                        Partner as a gym
                      </div>
                    </div>
                    <div className="w-[85px] h-6 rounded hidden flex-row items-center justify-start py-0 pr- pl-0 box-border gap-[8px]">
                      <Link
                        href={"/contactUs"}
                        className="h-[17px] flex-1 relative inline-block"
                      >
                        Contact Us
                      </Link>
                    </div>
                    <div className="rounded flex flex-row items-center justify-start py-[3.5px] px-0 gap-[8px]">
                      <Link
                        href={"/contactUs"}
                        className="[text-decoration:none] relative text-[inherit] inline-block min-w-[69px]"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-[203px] w-[132px] hidden flex-col items-start justify-start gap-[16px]">
                  <b className="self-stretch h-[19px] relative inline-block">
                    About
                  </b>
                  <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[12px] text-sm text-neutral-300">
                    <div className="w-[86px] flex-1 rounded flex flex-row items-center justify-start gap-[8px]">
                      <div className="h-[17px] flex-1 relative inline-block">
                        Company Info
                      </div>
                    </div>
                    <div className="w-[106px] flex-1 rounded flex flex-row items-center justify-start gap-[8px]">
                      <div className="h-[17px] flex-1 relative inline-block">
                        Brand Guidelines
                      </div>
                    </div>
                    <div className="w-[49px] flex-1 rounded flex flex-row items-center justify-start gap-[8px]">
                      <div className="h-[17px] flex-1 relative inline-block">
                        Careers
                      </div>
                    </div>
                    <div className="w-[137px] h-6 rounded flex flex-row items-center justify-start gap-[7.5px]">
                      <div className="h-[17px] flex-1 relative inline-block">
                        Investors
                      </div>
                    </div>
                    <div className="w-[82px] flex-1 rounded flex flex-row items-center justify-start gap-[8px]">
                      <div className="h-[17px] flex-1 relative inline-block">
                        About Us
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
            <div className="relative self-stretch h-px overflow-hidden bg-neutral-200 shrink-0" />
            <div className="self-stretch flex pb-8 flex-col items-center justify-start py-0 px-5 gap-[8px]">
              <div className="flex flex-row items-center justify-start">
                <div className="flex flex-col items-start justify-center">
                  <div className="relative leading-[16px] font-medium inline-block min-w-[116px]">
                    Made with ❤️ in India
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start">
                <div className="flex flex-col items-start justify-center">
                  <div className="relative leading-[16px] font-medium">
                    © 2024 All Rights Reserved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
