"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareSessionDesktop = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [blogShareCount, setBlogShareCount] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${videoUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${videoUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${videoUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${videoUrl}`,
    telegram: `https://telegram.me/share/url?url=${videoUrl}&text=Check%20this%20out!`,
    instagram: `https://www.instagram.com/`, // No direct sharing link for Instagram
  };

  const handleShare = () => {
    // axios.patch(
    //     `${apiEndpoint}/api/fitnearn/web/users/blog/share/${blogId}`,
    //   )
    //   .then((response) => {
    //     // //console.log('API Response:', response);
    //     if (response.data.success) {
    //       setBlogShareCount((prevCount) => prevCount + 1);
    //       setPopoverOpen(false);
    //       //console.log(response.data.message);
    //     } else {
    //       //console.log(
    //         "Something went wrong while incrementing the share count",
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     //console.log(error);
    //   });
    //console.log("blog share function is called");
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVideoUrl(window.location.href);
    }
  }, []);
  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger className="flex justify-center items-center  gap-2 cursor-pointer p-0  md:py-[2px] md:px-4">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M4.50007 19C4.38016 19 4.2572 18.987 4.13423 18.961C3.3172 18.788 2.74609 18.0681 2.74609 17.2102V15.8814C2.74609 12.0319 5.39941 8.83827 8.84029 8.30634V7.53144C8.84029 6.70654 9.29149 5.98563 10.0191 5.65067C10.6949 5.33871 11.4763 5.4417 12.0566 5.91764L17.2464 10.1681C17.7189 10.5541 17.9892 11.134 17.9892 11.7589C17.9892 12.3848 17.7179 12.9648 17.2454 13.3507L12.0556 17.6012C11.4763 18.0771 10.6959 18.1781 10.0191 17.8681C9.29251 17.5332 8.84029 16.8123 8.84029 15.9874V15.5084C7.65133 15.8314 6.63106 16.7163 6.05487 17.9741C5.76017 18.617 5.16264 19 4.50007 19ZM10.89 7.56443L10.8727 9.22722C10.8727 9.78015 10.4174 10.2271 9.8565 10.2271C7.05685 10.2271 4.77851 12.7628 4.77851 15.8804V16.1264C5.95223 14.4026 7.81392 13.3717 9.8565 13.3717C10.4174 13.3717 10.8727 13.8186 10.8727 14.3716V15.9674L15.9466 11.8129C15.9619 11.7919 15.9619 11.7249 15.9446 11.7029L10.89 7.56443Z"
                fill="url(#paint0_linear_10952_51779)"
              />
              <path
                d="M15.6834 18.5861C15.407 18.5861 15.1306 18.4761 14.9304 18.2581C14.5534 17.8491 14.5849 17.2162 15.0005 16.8453L20.7025 11.7579L15.0951 6.74453C14.6774 6.37658 14.6428 5.74366 15.0168 5.33271C15.3918 4.92176 16.033 4.88577 16.4527 5.25672L22.0591 10.2051C22.4941 10.5891 22.7441 11.142 22.7461 11.7219C22.7471 12.3008 22.5002 12.8548 22.0673 13.2407L16.3653 18.3281C16.1712 18.5001 15.9273 18.5861 15.6834 18.5861Z"
                fill="url(#paint1_linear_10952_51779)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_10952_51779"
                  x1="1.97686"
                  y1="13.9362"
                  x2="23.4192"
                  y2="13.9411"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_10952_51779"
                  x1="1.97686"
                  y1="13.9362"
                  x2="23.4192"
                  y2="13.9411"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="text-[16px] md:text-[20px] text-[#FFFFFF] font-normal">
            {/* {blogShareCount} */}
            Share
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-[#262626] border-solid border-[1px] border-[#404040] rounded-[16px] p-5 md:mr-[70px]">
          <h4 className="text-[24px] text-[#FFF] font-semibold leading-[36px] mb-4">
            Share
          </h4>
          <div className="flex gap-5 md:gap-[45px]">
            <Link
              href={socialMediaLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 cursor-pointer md:gap-0"
              onClick={() => handleShare()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
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
              <span className="text-[14px] md:text-[18px] text-[#F5F5F5] font-normal leading-normal md:leading-[27px]">
                WhatsApp
              </span>
            </Link>
            <Link
              href={socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 cursor-pointer md:gap-0"
              onClick={() => handleShare()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
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
              <span className="text-[14px] md:text-[18px] text-[#F5F5F5] font-normal leading-normal md:leading-[27px]">
                Facebook
              </span>
            </Link>
            <Link
              href={socialMediaLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 cursor-pointer md:gap-0"
              onClick={() => handleShare()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
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
              <span className="text-[14px] md:text-[18px] text-[#F5F5F5] font-normal leading-normal md:leading-[27px]">
                X
              </span>
            </Link>
            <Link
              href={socialMediaLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 cursor-pointer md:gap-0"
              onClick={() => handleShare()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
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
              <span className="text-[14px] md:text-[18px] text-[#F5F5F5] font-normal leading-normal md:leading-[27px]">
                Instagram
              </span>
            </Link>
            <Link
              href={socialMediaLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 cursor-pointer md:gap-0"
              onClick={() => handleShare()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
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
              <span className="text-[14px] md:text-[18px] text-[#F5F5F5] font-normal leading-normal md:leading-[27px]">
                Telegram
              </span>
            </Link>
          </div>
          <div className="relative mt-6">
            <Input
              type="text"
              value={videoUrl}
              readOnly
              className="h-[54px] bg-[#404040] border-solid border-[1px] border-[#525252] rounded-[8px] p-[10px] text-white"
            />
            <CopyToClipboard text={videoUrl} onCopy={handleCopy}>
              <Button className="h-[34px] absolute primaryButton top-[10px] right-[10px]">
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </CopyToClipboard>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ShareSessionDesktop;
