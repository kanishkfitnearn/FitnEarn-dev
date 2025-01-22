"use client";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import CoachAvailability from "./CoachAvailability";
import CoachAvailabilityForMobile from "./CoachAvailabilityForMobile";

const CoachExperience = ({ data, id }: any) => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [calenderDate, setCalenderDate] = React.useState<Date | undefined>();
  const [availableDates, setAvailableDates] = React.useState<Date[]>([]);
  const [category, setCategory] = React.useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<string[]>(
    [],
  );

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // JS months are 0-based, so we subtract 1
  };

  const fetchAvailability = async () => {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/coach/availability/get/${id}`,
      );
      const result = await response.json();
      //console.log("result from get availability: ", result);

      if (result.success) {
        const upcomingDates = result.upcomingDates;
        // Convert to Date objects
        const parsedDates = upcomingDates.map((dateStr: string) =>
          parseDate(dateStr),
        );
        setAvailableDates(parsedDates);
        setCategory(result.data.category);
        if (parsedDates.length > 0) {
          const firstDate = parsedDates[0];
          setCalenderDate(firstDate);
        }
        setAvailableTimeSlots(result.data.availableTime);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short", // "Sat"
      day: "2-digit", // "23"
      month: "short", // "Sept"
    });
  };

  if (!data) {
    return <p>Loading...</p>;
  } else {
    //console.log("data from experience", data);
  }

  return (
    <div className="mb-[60px] mt-[40px]">
      <section className="flex justify-center items-start w-full px-4 md:px-[72px] gap-[32px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="about-coach-sub-div w-[328px] md:w-full h-auto md:h-auto py-6 md:py-10 px-6 md:px-[49px] flex flex-col gap-4 md:gap-[30px]">
            <h1 className="mid-heading text-[24px] md:text-[44px] font-bold leading-normal">
              Experience
            </h1>
            <div className="flex w-full gap-[20px] md:gap-[48px] ">
              <div className="w-[130px] md:w-[245px] exp-small-card-div p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[32px] md:w-[44px] h-[32px] md:h-[44px]"
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                >
                  <rect
                    y="28.1758"
                    width="9.40874"
                    height="15.8168"
                    fill="url(#paint0_linear_6356_1954)"
                  />
                  <rect
                    x="12.0332"
                    y="22.3555"
                    width="8.40874"
                    height="21.1436"
                    fill="url(#paint1_linear_6356_1954)"
                    stroke="url(#paint2_linear_6356_1954)"
                  />
                  <rect
                    x="23.5605"
                    y="12.8672"
                    width="8.40874"
                    height="30.6337"
                    fill="url(#paint3_linear_6356_1954)"
                    stroke="url(#paint4_linear_6356_1954)"
                  />
                  <rect
                    x="35.0938"
                    y="0.5"
                    width="8.40488"
                    height="42.9968"
                    stroke="url(#paint5_linear_6356_1954)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_6356_1954"
                      x1="-0.361875"
                      y1="38.2716"
                      x2="9.72541"
                      y2="38.2726"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_6356_1954"
                      x1="11.1713"
                      y1="35.9897"
                      x2="21.2586"
                      y2="35.9904"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_6356_1954"
                      x1="11.1713"
                      y1="35.9897"
                      x2="21.2586"
                      y2="35.9904"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_6356_1954"
                      x1="22.6987"
                      y1="32.5589"
                      x2="32.786"
                      y2="32.5594"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_6356_1954"
                      x1="22.6987"
                      y1="32.5589"
                      x2="32.786"
                      y2="32.5594"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_6356_1954"
                      x1="34.232"
                      y1="28.0831"
                      x2="44.3152"
                      y2="28.0834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <h4 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-semibold leading-normal">
                  {data && data.categoryLevel}
                </h4>
                <h3 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-bold leading-normal">
                  Experience Level
                </h3>
              </div>
              <div className="w-[130px] md:w-[245px] exp-small-card-div p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[32px] md:w-[44px] h-[32px] md:h-[44px]"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <path
                    d="M24 25.0527C27.3137 25.0527 30 22.225 30 18.7369C30 15.2488 27.3137 12.4212 24 12.4212C20.6863 12.4212 18 15.2488 18 18.7369C18 22.225 20.6863 25.0527 24 25.0527Z"
                    fill="url(#paint0_linear_4001_29896)"
                  />
                  <path
                    d="M22 31.3685H26C28.1217 31.3685 30.1566 32.2557 31.6568 33.8349C33.1571 35.4142 34 37.5561 34 39.7895V44H14V39.7895C14 37.5561 14.8429 35.4142 16.3431 33.8349C17.8434 32.2557 19.8783 31.3685 22 31.3685Z"
                    fill="url(#paint1_linear_4001_29896)"
                  />
                  <path
                    d="M30 18.7369C29.9985 17.2485 29.4967 15.8086 28.5834 14.6723C27.6701 13.536 26.4042 12.7766 25.01 12.5285"
                    fill="url(#paint2_linear_4001_29896)"
                  />
                  <path
                    d="M33 4.00013C31.563 4.00475 30.154 4.41802 28.9218 5.19625C27.6896 5.97447 26.6801 7.08871 26 8.42117C28.2573 8.90942 30.2857 10.2021 31.743 12.0813C33.2003 13.9605 33.9975 16.3111 34 18.7369C33.9967 19.4159 33.9297 20.0929 33.8 20.758C35.845 20.5531 37.7361 19.5259 39.0796 17.8901C40.423 16.2543 41.1153 14.136 41.0122 11.9764C40.9091 9.81678 40.0186 7.78226 38.5261 6.29647C37.0336 4.81068 35.0542 3.98814 33 4.00013Z"
                    fill="url(#paint3_linear_4001_29896)"
                  />
                  <path
                    d="M18.732 27.6464C17.025 26.521 15.676 24.8848 14.858 22.9474H14C11.3488 22.9508 8.80711 24.0609 6.93244 26.0342C5.05776 28.0075 4.00318 30.683 4 33.4737V37.6842C4 38.2426 4.21071 38.7781 4.58579 39.1729C4.96086 39.5677 5.46957 39.7895 6 39.7895H10C10.0046 37.0416 10.8593 34.3701 12.4348 32.1792C14.0103 29.9882 16.2208 28.397 18.732 27.6464Z"
                    fill="url(#paint4_linear_4001_29896)"
                  />
                  <path
                    d="M34 22.9474H33.142C32.324 24.8848 30.975 26.521 29.268 27.6464C31.7792 28.397 33.9897 29.9882 35.5652 32.1792C37.1407 34.3701 37.9954 37.0416 38 39.7895H42C42.5304 39.7895 43.0391 39.5677 43.4142 39.1729C43.7893 38.7781 44 38.2426 44 37.6842V33.4737C43.9968 30.683 42.9422 28.0075 41.0676 26.0342C39.1929 24.0609 36.6512 22.9508 34 22.9474Z"
                    fill="url(#paint5_linear_4001_29896)"
                  />
                  <path
                    d="M14 18.7369C14.0025 16.3111 14.7997 13.9605 16.257 12.0813C17.7143 10.2021 19.7427 8.90943 22 8.42118C21.347 7.14496 20.3913 6.06843 19.2258 5.29639C18.0603 4.52434 16.7248 4.08309 15.3492 4.01557C13.9736 3.94805 12.6049 4.25658 11.3762 4.9111C10.1475 5.56563 9.10072 6.54387 8.33776 7.7506C7.57481 8.95732 7.12165 10.3514 7.02242 11.7972C6.92318 13.243 7.18124 14.6912 7.77148 16.0008C8.36171 17.3104 9.26402 18.4369 10.3906 19.2706C11.5171 20.1042 12.8295 20.6166 14.2 20.758C14.0703 20.0929 14.0033 19.4159 14 18.7369Z"
                    fill="url(#paint6_linear_4001_29896)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint6_linear_4001_29896"
                      x1="2.46154"
                      y1="29.5319"
                      x2="45.3463"
                      y2="29.5389"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <h4 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-semibold leading-normal">
                  {data && data.peopleCoached}+Peoples
                </h4>
                <h3 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-bold leading-normal">
                  People Coached
                </h3>
              </div>
            </div>
            <div className="flex gap-[20px] md:gap-[48px]">
              <div className="w-[130px] md:w-[245px] exp-small-card-div p-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[32px] md:w-[44px] h-[32px] md:h-[44px]"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <path
                    d="M28.9999 10C28.9999 11.3261 28.4731 12.5979 27.5355 13.5355C26.5978 14.4732 25.326 15 23.9999 15C22.6738 15 21.4021 14.4732 20.4644 13.5355C19.5267 12.5979 18.9999 11.3261 18.9999 10C18.9999 8.67392 19.5267 7.40215 20.4644 6.46447C21.4021 5.52678 22.6738 5 23.9999 5C25.326 5 26.5978 5.52678 27.5355 6.46447C28.4731 7.40215 28.9999 8.67392 28.9999 10ZM30.9999 43C30.9999 43.2652 30.8946 43.5196 30.707 43.7071C30.5195 43.8946 30.2651 44 29.9999 44H12.8559C12.2351 44 11.6312 43.7977 11.1357 43.4237C10.6401 43.0498 10.2799 42.5246 10.1096 41.9276C9.93927 41.3306 9.9681 40.6944 10.1917 40.1152C10.4154 39.5361 10.8216 39.0456 11.3489 38.718L16.6329 35.436C17.0663 35.1668 17.4238 34.7916 17.6718 34.3457C17.9197 33.8999 18.0499 33.3982 18.0499 32.888V32H20.4239C21.4847 31.9998 22.502 31.5782 23.2519 30.828L23.9999 30.081L24.7469 30.828C25.1185 31.1997 25.5597 31.4945 26.0453 31.6956C26.5309 31.8967 27.0513 32.0002 27.5769 32H29.9999V32.892C30.0001 33.4006 30.1296 33.9009 30.3762 34.3457C30.6229 34.7906 30.9786 35.1654 31.4099 35.435L36.6559 38.714C37.1829 39.043 37.5884 39.5347 37.8112 40.1146C38.0339 40.6946 38.0617 41.3313 37.8905 41.9285C37.7192 42.5256 37.3581 43.0508 36.8619 43.4245C36.3656 43.7983 35.7612 44.0003 35.1399 44H32.8299C32.9399 43.687 32.9999 43.35 32.9999 43V42.75C32.9998 42.0234 32.736 41.3215 32.2574 40.7747C31.7789 40.2279 31.1181 39.8734 30.3979 39.777L17.1829 38.009C16.9222 37.978 16.6597 38.0509 16.4522 38.2118C16.2447 38.3727 16.1088 38.6087 16.0738 38.869C16.0389 39.1293 16.1078 39.3928 16.2655 39.6027C16.4232 39.8127 16.6572 39.9521 16.9169 39.991L30.1329 41.759C30.3729 41.7912 30.5931 41.9094 30.7526 42.0917C30.912 42.2739 30.9999 42.5078 30.9999 42.75V43ZM26.1619 29.414L24.9999 28.252V24.51C25.1479 24.596 25.2879 24.702 25.4139 24.828L27.2929 26.708C27.4806 26.8952 27.7349 27.0002 27.9999 27H30.9999C31.1703 26.9999 31.3379 26.9563 31.4867 26.8733C31.6355 26.7902 31.7606 26.6706 31.8501 26.5256C31.9397 26.3806 31.9907 26.2152 31.9984 26.045C32.0061 25.8748 31.9701 25.7054 31.8939 25.553L30.8939 23.553C30.8378 23.4314 30.7578 23.3224 30.6586 23.2323C30.5595 23.1422 30.4433 23.073 30.317 23.0287C30.1906 22.9844 30.0566 22.9659 29.9229 22.9744C29.7893 22.9828 29.6587 23.018 29.5389 23.0779C29.4191 23.1378 29.3126 23.2212 29.2256 23.323C29.1387 23.4249 29.073 23.5431 29.0327 23.6708C28.9923 23.7985 28.978 23.933 28.9905 24.0664C29.0031 24.1997 29.0424 24.3291 29.1059 24.447L29.3819 25H28.4139L26.8279 23.414C26.0778 22.6641 25.0606 22.2429 23.9999 22.2429C22.9393 22.2429 21.922 22.6641 21.1719 23.414L19.5859 25H18.6179L18.8939 24.447C18.9575 24.3291 18.9967 24.1997 19.0093 24.0664C19.0219 23.933 19.0076 23.7985 18.9672 23.6708C18.9268 23.5431 18.8612 23.4249 18.7742 23.323C18.6873 23.2212 18.5808 23.1378 18.461 23.0779C18.3412 23.018 18.2106 22.9828 18.0769 22.9744C17.9433 22.9659 17.8093 22.9844 17.6829 23.0287C17.5565 23.073 17.4403 23.1422 17.3412 23.2323C17.2421 23.3224 17.1621 23.4314 17.1059 23.553L16.1059 25.553C16.0298 25.7054 15.9938 25.8748 16.0015 26.045C16.0091 26.2152 16.0602 26.3806 16.1497 26.5256C16.2393 26.6706 16.3644 26.7902 16.5132 26.8733C16.662 26.9563 16.8295 26.9999 16.9999 27H19.9999C20.2651 26.9999 20.5194 26.8946 20.7069 26.707L22.5859 24.828C22.7129 24.702 22.8519 24.596 22.9999 24.51V28.252L21.8379 29.414C21.4629 29.7891 20.9543 29.9999 20.4239 30H14.3859C14.0607 30 13.7404 29.9207 13.4527 29.769C13.1651 29.6172 12.9188 29.3976 12.7351 29.1292C12.5515 28.8607 12.4361 28.5516 12.399 28.2285C12.3618 27.9054 12.404 27.5781 12.5219 27.275L15.5259 19.55C15.8181 18.7989 16.3303 18.1535 16.9956 17.6985C17.6608 17.2434 18.448 17 19.2539 17H28.7459C29.5519 17 30.3391 17.2434 31.0043 17.6985C31.6695 18.1535 32.1818 18.7989 32.4739 19.55L35.4789 27.275C35.5969 27.5783 35.6391 27.9057 35.6018 28.229C35.5646 28.5522 35.449 28.8615 35.2652 29.13C35.0813 29.3985 34.8347 29.618 34.5468 29.7697C34.2589 29.9213 33.9383 30.0003 33.6129 30H27.5749C27.0445 29.9999 26.5359 29.7891 26.1609 29.414"
                    fill="url(#paint0_linear_4001_29901)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4001_29901"
                      x1="8.92303"
                      y1="29.8936"
                      x2="38.9437"
                      y2="29.8971"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <h4 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-semibold leading-normal">
                  {data && data.category}
                </h4>
                <h3 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-bold leading-normal">
                  Expertize
                </h3>
              </div>
              <div className="w-[130px] md:w-[245px] exp-small-card-div p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[32px] md:w-[44px] h-[32px] md:h-[44px]"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <path
                    d="M6 38.4C6 39.3548 6.37928 40.2705 7.05442 40.9456C7.72955 41.6207 8.64522 42 9.6 42H38.4C39.3548 42 40.2705 41.6207 40.9456 40.9456C41.6207 40.2705 42 39.3548 42 38.4V20.4H6V38.4ZM31.2 24.9C31.2 24.6613 31.2948 24.4324 31.4636 24.2636C31.6324 24.0948 31.8613 24 32.1 24H33.9C34.1387 24 34.3676 24.0948 34.5364 24.2636C34.7052 24.4324 34.8 24.6613 34.8 24.9V26.7C34.8 26.9387 34.7052 27.1676 34.5364 27.3364C34.3676 27.5052 34.1387 27.6 33.9 27.6H32.1C31.8613 27.6 31.6324 27.5052 31.4636 27.3364C31.2948 27.1676 31.2 26.9387 31.2 26.7V24.9ZM31.2 32.1C31.2 31.8613 31.2948 31.6324 31.4636 31.4636C31.6324 31.2948 31.8613 31.2 32.1 31.2H33.9C34.1387 31.2 34.3676 31.2948 34.5364 31.4636C34.7052 31.6324 34.8 31.8613 34.8 32.1V33.9C34.8 34.1387 34.7052 34.3676 34.5364 34.5364C34.3676 34.7052 34.1387 34.8 33.9 34.8H32.1C31.8613 34.8 31.6324 34.7052 31.4636 34.5364C31.2948 34.3676 31.2 34.1387 31.2 33.9V32.1ZM22.2 24.9C22.2 24.6613 22.2948 24.4324 22.4636 24.2636C22.6324 24.0948 22.8613 24 23.1 24H24.9C25.1387 24 25.3676 24.0948 25.5364 24.2636C25.7052 24.4324 25.8 24.6613 25.8 24.9V26.7C25.8 26.9387 25.7052 27.1676 25.5364 27.3364C25.3676 27.5052 25.1387 27.6 24.9 27.6H23.1C22.8613 27.6 22.6324 27.5052 22.4636 27.3364C22.2948 27.1676 22.2 26.9387 22.2 26.7V24.9ZM22.2 32.1C22.2 31.8613 22.2948 31.6324 22.4636 31.4636C22.6324 31.2948 22.8613 31.2 23.1 31.2H24.9C25.1387 31.2 25.3676 31.2948 25.5364 31.4636C25.7052 31.6324 25.8 31.8613 25.8 32.1V33.9C25.8 34.1387 25.7052 34.3676 25.5364 34.5364C25.3676 34.7052 25.1387 34.8 24.9 34.8H23.1C22.8613 34.8 22.6324 34.7052 22.4636 34.5364C22.2948 34.3676 22.2 34.1387 22.2 33.9V32.1ZM13.2 24.9C13.2 24.6613 13.2948 24.4324 13.4636 24.2636C13.6324 24.0948 13.8613 24 14.1 24H15.9C16.1387 24 16.3676 24.0948 16.5364 24.2636C16.7052 24.4324 16.8 24.6613 16.8 24.9V26.7C16.8 26.9387 16.7052 27.1676 16.5364 27.3364C16.3676 27.5052 16.1387 27.6 15.9 27.6H14.1C13.8613 27.6 13.6324 27.5052 13.4636 27.3364C13.2948 27.1676 13.2 26.9387 13.2 26.7V24.9ZM13.2 32.1C13.2 31.8613 13.2948 31.6324 13.4636 31.4636C13.6324 31.2948 13.8613 31.2 14.1 31.2H15.9C16.1387 31.2 16.3676 31.2948 16.5364 31.4636C16.7052 31.6324 16.8 31.8613 16.8 32.1V33.9C16.8 34.1387 16.7052 34.3676 16.5364 34.5364C16.3676 34.7052 16.1387 34.8 15.9 34.8H14.1C13.8613 34.8 13.6324 34.7052 13.4636 34.5364C13.2948 34.3676 13.2 34.1387 13.2 33.9V32.1Z"
                    fill="url(#paint0_linear_4001_29906)"
                  />
                  <path
                    d="M42 13.2C42 12.2452 41.6207 11.3295 40.9456 10.6544C40.2705 9.97928 39.3548 9.6 38.4 9.6H34.8V7.8C34.8 7.32261 34.6104 6.86477 34.2728 6.52721C33.9352 6.18964 33.4774 6 33 6C32.5226 6 32.0648 6.18964 31.7272 6.52721C31.3896 6.86477 31.2 7.32261 31.2 7.8V9.6H25.8V7.8C25.8 7.32261 25.6104 6.86477 25.2728 6.52721C24.9352 6.18964 24.4774 6 24 6C23.5226 6 23.0648 6.18964 22.7272 6.52721C22.3896 6.86477 22.2 7.32261 22.2 7.8V9.6H16.8V7.8C16.8 7.32261 16.6104 6.86477 16.2728 6.52721C15.9352 6.18964 15.4774 6 15 6C14.5226 6 14.0648 6.18964 13.7272 6.52721C13.3896 6.86477 13.2 7.32261 13.2 7.8V9.6H9.6C8.64522 9.6 7.72955 9.97928 7.05442 10.6544C6.37928 11.3295 6 12.2452 6 13.2V16.8H42V13.2Z"
                    fill="url(#paint1_linear_4001_29906)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4001_29906"
                      x1="4.61538"
                      y1="28.9787"
                      x2="43.2117"
                      y2="28.985"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_4001_29906"
                      x1="4.61538"
                      y1="28.9787"
                      x2="43.2117"
                      y2="28.985"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <h4 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-semibold leading-normal">
                  {data && data.experience}+
                </h4>
                <h3 className="text-[#A3A3A3] text-[18px] md:text-[24px] font-bold leading-normal">
                  Years of Experience
                </h3>
              </div>
            </div>
          </div>
          <div className="about-coach-sub-div w-[328px] md:w-full h-auto p-6 md:p-[48px] mt-8 flex flex-col gap-5">
            <p className="text-[14px] md:text-[16px] text-[#E5E5E5] font-normal leading-normal">
              <span className="text-[#FACA15] font-semibold">Note :</span> If a
              session is cancelled within 24 hours of the scheduled start time,
              no refund will be provided. For cancellations made more than 24
              hours in advance, a full refund will be issued. Refunds will be
              processed within 5-7 business working days from the date of
              cancellation and will be transferred to the original payment
              method.
            </p>
            <a
              href={"/cancellation-policy"}
              target="_blank"
              className="text-[14px] text-[#FACA15] font-semibold leading-normal tracking-[0.28px]"
              style={{
                textDecoration: "underline dotted",
                textDecorationThickness: "1px",
                textUnderlineOffset: "4px",
              }}
            >
              READ CANCELATION POLICY
            </a>
          </div>
        </div>

        <CoachAvailability id={id} />
      </section>

      {/* coach availability strip on a small devices */}
      <div className="flex justify-between md:hidden w-full bg-[#262626] border-t-[1px] border-[#404040] fixed gap-[37px] px-[16px] py-[22px] bottom-0 z-50">
        <div>
          <h4 className="text-[12px] text-[#FFFFFF] font-medium leading-[150%]">
            Next Available:
          </h4>
          <h3 className="text-[14px] text-[#FFFFFF] font-semibold leading-[150%]">
            {/* Sat, 8 June, 03:00 AM */}
            {calenderDate ? formatDate(new Date(calenderDate)) : ""}
          </h3>
        </div>
        <div>
          <CoachAvailabilityForMobile id={id} />
          {/* <Button className="py-3 primaryButton">Check Availability</Button> */}
          {/* <Dialog>
            <DialogTrigger className="primaryButton text-[#FFFFFF] px-[22px] py-3">
              Check Availability
            </DialogTrigger>
            <DialogContent className="bg-[#171717]">
              <DialogClose className="absolute z-40 text-white top-4 md:top-4 right-5 md:right-4">
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
              </DialogClose>
              <DialogHeader>
                <DialogTitle className="text-[#FFFFFF] text-[20px] font-bold leading-normal text-left mb-2">
                  Select Availability
                </DialogTitle>
                <DialogDescription>
                  <div className="flex w-full gap-4">
                    <Popover>
                      <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                        Add Dates
                      </PopoverTrigger>
                      <PopoverContent className="modal-background w-[328px]">
                        <div className="pb-3 border-solid border-b-[1px] border-[#737373]">
                          <h1 className="mid-heading text-[22px] font-bold leading-normal">
                            Select Date
                          </h1>
                        </div>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="text-white rounded-md"
                        />
                        <div className="flex justify-end border-solid border-t-[1px] border-[#737373] pt-2">
                          <button className="coach-modal-save-btn text-[#FFFFFF] py-2 px-10">
                            Save
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                        Add Time
                      </PopoverTrigger>
                      <PopoverContent className="modal-background w-[328px]">
                        <div className="pb-3 border-solid border-b-[1px] border-[#737373]">
                          <h1 className="mid-heading text-[22px] font-bold leading-normal">
                            Select Date
                          </h1>
                        </div>
                        <div className="flex flex-wrap items-center justify-center w-full gap-4 p-6">
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            07 : 30 PM
                          </span>
                        </div>
                        <div className="flex justify-end border-solid border-t-[1px] border-[#737373] pt-2">
                          <button className="coach-modal-save-btn text-[#FFFFFF] py-2 px-10">
                            Save
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                        Add Category
                      </PopoverTrigger>
                      <PopoverContent className="modal-background w-[328px] px-2 pt-3 pb-6">
                        <div className="pb-3 border-solid border-b-[1px] border-[#737373] mb-3">
                          <h1 className="mid-heading text-[22px] font-bold leading-normal">
                            Select Category
                          </h1>
                        </div>
                        <div className="flex flex-wrap items-center justify-center w-full gap-4">
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Yoga
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Meditation
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Cardio
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Stretching
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Strength & Conditioning
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Kick Boxing
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Rehab & Recovery
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            General Workout
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Dance Fitness
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            Warmup
                          </span>
                          <span className="p-2 border-[1px] border-[#FFFFFF] rounded-[6px] text-[16px] text-[#FFFFFF] font-normal leading-[24px] tracking-[0.38px]">
                            HIIT
                          </span>
                        </div>
                        <div className="flex justify-end border-solid border-t-[1px] border-[#737373] pt-2 mt-3">
                          <button className="coach-modal-save-btn text-[#FFFFFF] py-2 px-10">
                            Save
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                        1 Seat
                      </PopoverTrigger>
                      <PopoverContent className="modal-background w-[328px]">
                        <div className="pb-3 border-solid border-b-[1px] border-[#737373] mb-3">
                          <h1 className="mid-heading text-[22px] font-bold leading-normal">
                            Select Date
                          </h1>
                        </div>
                        <div className="flex items-center justify-between w-full gap-4">
                          <div>
                            <h1 className="text-[#FFFFFF] text-[20px] font-normal tracking-[0.38px] leading-[24px]">
                              Add Your Friend
                            </h1>
                            <h4 className="text-[#D1D5DB] text-[13px] font-semibold tracking-[-0.078px] leading-[18px] mt-[14px]">
                              Add Now
                            </h4>
                          </div>
                          <div className="flex">
                            <button className="w-[32px] h-[32px] flex justify-center items-center border-[1px] border-[#FFFFFF] rounded-full transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M13.9045 9.00391L3.72266 9.00391Z"
                                  fill="#525252"
                                />
                                <path
                                  d="M13.9045 9.00391L3.72266 9.00391"
                                  stroke="white"
                                  strokeWidth="1.81818"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <span className="mx-6 flex justify-center items-center text-white text-[18px] font-medium tracking-[0.38px] leading-[24px]">
                              1
                            </span>
                            <button className="w-[32px] h-[32px] flex justify-center items-center border-[1px] border-[#FFFFFF] rounded-full transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M9.00107 9.00107H3.91016Z"
                                  fill="#FFF7ED"
                                />
                                <path
                                  d="M9.00107 3.91016V9.00107M9.00107 9.00107V14.092M9.00107 9.00107H14.092M9.00107 9.00107H3.91016"
                                  stroke="white"
                                  strokeWidth="1.45455"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end border-solid border-t-[1px] border-[#737373] pt-2 mt-3">
                          <button className="coach-modal-save-btn text-[#FFFFFF] py-2 px-10">
                            Save
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <h2 className="text-[20px] text-[#FFFFFF] font-bold leading-normal text-left my-3">
                    Sat, 8 Jun
                  </h2>
                  <div className="flex flex-col items-center justify-center w-full gap-3">
                    <div className="w-[328px] px-4 py-4 border-[1px] border-[#404040] rounded-[8px]">
                      <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                        Cardio Session
                      </h2>

                      <div className="w-[80px] flex one-one-call justify-center items-center gap-2 p-1 my-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.00065 10.668H7.33398V8.66797H9.33398V7.33464H7.33398V5.33464H6.00065V7.33464H4.00065V8.66797H6.00065V10.668ZM2.66732 13.3346C2.30065 13.3346 1.98687 13.2042 1.72598 12.9433C1.4651 12.6824 1.33443 12.3684 1.33398 12.0013V4.0013C1.33398 3.63464 1.46465 3.32086 1.72598 3.05997C1.98732 2.79908 2.3011 2.66841 2.66732 2.66797H10.6673C11.034 2.66797 11.348 2.79864 11.6093 3.05997C11.8707 3.3213 12.0011 3.63508 12.0007 4.0013V7.0013L14.6673 4.33464V11.668L12.0007 9.0013V12.0013C12.0007 12.368 11.8702 12.682 11.6093 12.9433C11.3484 13.2046 11.0344 13.3351 10.6673 13.3346H2.66732ZM2.66732 12.0013H10.6673V4.0013H2.66732V12.0013Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                          1:1 Call
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex items-center justify-center gap-2 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M13.3 3.2H12.1V2.6C12.1 2.44087 12.0368 2.28826 11.9243 2.17574C11.8117 2.06321 11.6591 2 11.5 2C11.3409 2 11.1883 2.06321 11.0757 2.17574C10.9632 2.28826 10.9 2.44087 10.9 2.6V3.2H9.1V2.6C9.1 2.44087 9.03679 2.28826 8.92426 2.17574C8.81174 2.06321 8.65913 2 8.5 2C8.34087 2 8.18826 2.06321 8.07574 2.17574C7.96321 2.28826 7.9 2.44087 7.9 2.6V3.2H6.1V2.6C6.1 2.44087 6.03679 2.28826 5.92426 2.17574C5.81174 2.06321 5.65913 2 5.5 2C5.34087 2 5.18826 2.06321 5.07574 2.17574C4.96321 2.28826 4.9 2.44087 4.9 2.6V3.2H3.7C3.38174 3.2 3.07652 3.32643 2.85147 3.55147C2.62643 3.77652 2.5 4.08174 2.5 4.4V12.8C2.5 13.1183 2.62643 13.4235 2.85147 13.6485C3.07652 13.8736 3.38174 14 3.7 14H13.3C13.6183 14 13.9235 13.8736 14.1485 13.6485C14.3736 13.4235 14.5 13.1183 14.5 12.8V4.4C14.5 4.08174 14.3736 3.77652 14.1485 3.55147C13.9235 3.32643 13.6183 3.2 13.3 3.2ZM4.9 4.4C4.9 4.55913 4.96321 4.71174 5.07574 4.82426C5.18826 4.93679 5.34087 5 5.5 5C5.65913 5 5.81174 4.93679 5.92426 4.82426C6.03679 4.71174 6.1 4.55913 6.1 4.4H7.9C7.9 4.55913 7.96321 4.71174 8.07574 4.82426C8.18826 4.93679 8.34087 5 8.5 5C8.65913 5 8.81174 4.93679 8.92426 4.82426C9.03679 4.71174 9.1 4.55913 9.1 4.4H10.9C10.9 4.55913 10.9632 4.71174 11.0757 4.82426C11.1883 4.93679 11.3409 5 11.5 5C11.6591 5 11.8117 4.93679 11.9243 4.82426C12.0368 4.71174 12.1 4.55913 12.1 4.4H13.3V5.6H3.7V4.4H4.9ZM3.7 12.8V6.8H13.3V12.8H3.7Z"
                              fill="url(#paint0_linear_4900_27548)"
                            />
                            <path
                              d="M5.8 8H5.2C5.03431 8 4.9 8.13432 4.9 8.3V8.9C4.9 9.06569 5.03431 9.2 5.2 9.2H5.8C5.96569 9.2 6.1 9.06569 6.1 8.9V8.3C6.1 8.13432 5.96569 8 5.8 8Z"
                              fill="url(#paint1_linear_4900_27548)"
                            />
                            <path
                              d="M5.8 10.4H5.2C5.03431 10.4 4.9 10.5343 4.9 10.7V11.3C4.9 11.4657 5.03431 11.6 5.2 11.6H5.8C5.96569 11.6 6.1 11.4657 6.1 11.3V10.7C6.1 10.5343 5.96569 10.4 5.8 10.4Z"
                              fill="url(#paint2_linear_4900_27548)"
                            />
                            <path
                              d="M8.8 8H8.2C8.03431 8 7.9 8.13432 7.9 8.3V8.9C7.9 9.06569 8.03431 9.2 8.2 9.2H8.8C8.96569 9.2 9.1 9.06569 9.1 8.9V8.3C9.1 8.13432 8.96569 8 8.8 8Z"
                              fill="url(#paint3_linear_4900_27548)"
                            />
                            <path
                              d="M8.8 10.4H8.2C8.03431 10.4 7.9 10.5343 7.9 10.7V11.3C7.9 11.4657 8.03431 11.6 8.2 11.6H8.8C8.96569 11.6 9.1 11.4657 9.1 11.3V10.7C9.1 10.5343 8.96569 10.4 8.8 10.4Z"
                              fill="url(#paint4_linear_4900_27548)"
                            />
                            <path
                              d="M11.8 8H11.2C11.0343 8 10.9 8.13432 10.9 8.3V8.9C10.9 9.06569 11.0343 9.2 11.2 9.2H11.8C11.9657 9.2 12.1 9.06569 12.1 8.9V8.3C12.1 8.13432 11.9657 8 11.8 8Z"
                              fill="url(#paint5_linear_4900_27548)"
                            />
                            <path
                              d="M11.8 10.4H11.2C11.0343 10.4 10.9 10.5343 10.9 10.7V11.3C10.9 11.4657 11.0343 11.6 11.2 11.6H11.8C11.9657 11.6 12.1 11.4657 12.1 11.3V10.7C12.1 10.5343 11.9657 10.4 11.8 10.4Z"
                              fill="url(#paint6_linear_4900_27548)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint3_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint4_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint5_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint6_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                            Sat, 8 June
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M8.50261 14.6654C7.18407 14.6654 5.89513 14.2744 4.79881 13.5418C3.70248 12.8093 2.84799 11.7681 2.34341 10.5499C1.83883 9.33175 1.7068 7.99131 1.96404 6.6981C2.22127 5.40489 2.85621 4.21701 3.78856 3.28466C4.72091 2.35231 5.9088 1.71737 7.20201 1.46013C8.49521 1.2029 9.83566 1.33492 11.0538 1.8395C12.272 2.34409 13.3132 3.19857 14.0457 4.2949C14.7783 5.39123 15.1693 6.68016 15.1693 7.9987C15.1673 9.76622 14.4643 11.4608 13.2145 12.7106C11.9647 13.9604 10.2701 14.6634 8.50261 14.6654ZM8.50261 2.66537C7.44777 2.66537 6.41663 2.97816 5.53957 3.5642C4.6625 4.15023 3.97892 4.98318 3.57525 5.95772C3.17158 6.93226 3.06596 8.00462 3.27175 9.03918C3.47754 10.0737 3.98549 11.0241 4.73137 11.7699C5.47725 12.5158 6.42756 13.0238 7.46213 13.2296C8.49669 13.4353 9.56905 13.3297 10.5436 12.9261C11.5181 12.5224 12.3511 11.8388 12.9371 10.9617C13.5231 10.0847 13.8359 9.05353 13.8359 7.9987C13.8344 6.5847 13.2719 5.22907 12.2721 4.22922C11.2722 3.22937 9.91661 2.66696 8.50261 2.66537Z"
                              fill="url(#paint0_linear_4900_27551)"
                            />
                            <path
                              d="M8.50261 8.66537C8.3258 8.66537 8.15623 8.59513 8.0312 8.47011C7.90618 8.34508 7.83594 8.17551 7.83594 7.9987V5.33203C7.83594 5.15522 7.90618 4.98565 8.0312 4.86063C8.15623 4.73561 8.3258 4.66537 8.50261 4.66537C8.67942 4.66537 8.84899 4.73561 8.97401 4.86063C9.09904 4.98565 9.16927 5.15522 9.16927 5.33203V7.9987C9.16927 8.17551 9.09904 8.34508 8.97401 8.47011C8.84899 8.59513 8.67942 8.66537 8.50261 8.66537Z"
                              fill="url(#paint1_linear_4900_27551)"
                            />
                            <path
                              d="M10.6859 10.8487C10.5091 10.8487 10.3396 10.7784 10.2146 10.6534L8.0312 8.47011C7.90976 8.34437 7.84264 8.1759 7.84416 8.0011C7.84568 7.8263 7.91579 7.65909 8.0394 7.53549C8.163 7.41188 8.33021 7.34177 8.50501 7.34025C8.6798 7.33873 8.84821 7.40593 8.97394 7.52737L11.1573 9.7107C11.2505 9.80394 11.314 9.92271 11.3397 10.052C11.3654 10.1813 11.3522 10.3153 11.3017 10.4371C11.2513 10.5589 11.1659 10.663 11.0562 10.7363C10.9466 10.8096 10.8178 10.8487 10.6859 10.8487Z"
                              fill="url(#paint2_linear_4900_27551)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                            03:00 AM - 04:00 AM
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-start items-center gap-3 mt-[6px]">
                        <span className="text-[#A3A3A3] text-[16px] font-bold leading-normal line-through">
                          ₹450
                        </span>
                        <span className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
                          ₹450
                        </span>
                        <span className="text-[#FACA15] text-[12px] font-medium leading-normal">
                          Get (15% OFF)
                        </span>
                        <span className="flex items-center justify-start gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M0.75 3.08594L1.91667 10.6693H10.0833L11.25 3.08594L8.33333 4.83594L6 1.33594L3.66667 4.83594L0.75 3.08594Z"
                              stroke="#FACA15"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.00065 8.33724C6.64498 8.33724 7.16732 7.81491 7.16732 7.17057C7.16732 6.52624 6.64498 6.00391 6.00065 6.00391C5.35632 6.00391 4.83398 6.52624 4.83398 7.17057C4.83398 7.81491 5.35632 8.33724 6.00065 8.33724Z"
                              stroke="#FACA15"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[#FACA15] text-[12px] font-medium leading-normal underline">
                            Go Pro now
                          </span>
                        </span>
                      </div>

                      <Link href={"/coachSessionBooking"}>
                        <Button className="w-full my-2 primaryButton">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <div className="w-[328px] px-4 py-4 border-[1px] border-[#404040] rounded-[8px]">
                      <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                        Cardio Session
                      </h2>

                      <div className="w-[80px] flex one-one-call justify-center items-center gap-2 p-1 my-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.00065 10.668H7.33398V8.66797H9.33398V7.33464H7.33398V5.33464H6.00065V7.33464H4.00065V8.66797H6.00065V10.668ZM2.66732 13.3346C2.30065 13.3346 1.98687 13.2042 1.72598 12.9433C1.4651 12.6824 1.33443 12.3684 1.33398 12.0013V4.0013C1.33398 3.63464 1.46465 3.32086 1.72598 3.05997C1.98732 2.79908 2.3011 2.66841 2.66732 2.66797H10.6673C11.034 2.66797 11.348 2.79864 11.6093 3.05997C11.8707 3.3213 12.0011 3.63508 12.0007 4.0013V7.0013L14.6673 4.33464V11.668L12.0007 9.0013V12.0013C12.0007 12.368 11.8702 12.682 11.6093 12.9433C11.3484 13.2046 11.0344 13.3351 10.6673 13.3346H2.66732ZM2.66732 12.0013H10.6673V4.0013H2.66732V12.0013Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                          1:1 Call
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex items-center justify-center gap-2 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M13.3 3.2H12.1V2.6C12.1 2.44087 12.0368 2.28826 11.9243 2.17574C11.8117 2.06321 11.6591 2 11.5 2C11.3409 2 11.1883 2.06321 11.0757 2.17574C10.9632 2.28826 10.9 2.44087 10.9 2.6V3.2H9.1V2.6C9.1 2.44087 9.03679 2.28826 8.92426 2.17574C8.81174 2.06321 8.65913 2 8.5 2C8.34087 2 8.18826 2.06321 8.07574 2.17574C7.96321 2.28826 7.9 2.44087 7.9 2.6V3.2H6.1V2.6C6.1 2.44087 6.03679 2.28826 5.92426 2.17574C5.81174 2.06321 5.65913 2 5.5 2C5.34087 2 5.18826 2.06321 5.07574 2.17574C4.96321 2.28826 4.9 2.44087 4.9 2.6V3.2H3.7C3.38174 3.2 3.07652 3.32643 2.85147 3.55147C2.62643 3.77652 2.5 4.08174 2.5 4.4V12.8C2.5 13.1183 2.62643 13.4235 2.85147 13.6485C3.07652 13.8736 3.38174 14 3.7 14H13.3C13.6183 14 13.9235 13.8736 14.1485 13.6485C14.3736 13.4235 14.5 13.1183 14.5 12.8V4.4C14.5 4.08174 14.3736 3.77652 14.1485 3.55147C13.9235 3.32643 13.6183 3.2 13.3 3.2ZM4.9 4.4C4.9 4.55913 4.96321 4.71174 5.07574 4.82426C5.18826 4.93679 5.34087 5 5.5 5C5.65913 5 5.81174 4.93679 5.92426 4.82426C6.03679 4.71174 6.1 4.55913 6.1 4.4H7.9C7.9 4.55913 7.96321 4.71174 8.07574 4.82426C8.18826 4.93679 8.34087 5 8.5 5C8.65913 5 8.81174 4.93679 8.92426 4.82426C9.03679 4.71174 9.1 4.55913 9.1 4.4H10.9C10.9 4.55913 10.9632 4.71174 11.0757 4.82426C11.1883 4.93679 11.3409 5 11.5 5C11.6591 5 11.8117 4.93679 11.9243 4.82426C12.0368 4.71174 12.1 4.55913 12.1 4.4H13.3V5.6H3.7V4.4H4.9ZM3.7 12.8V6.8H13.3V12.8H3.7Z"
                              fill="url(#paint0_linear_4900_27548)"
                            />
                            <path
                              d="M5.8 8H5.2C5.03431 8 4.9 8.13432 4.9 8.3V8.9C4.9 9.06569 5.03431 9.2 5.2 9.2H5.8C5.96569 9.2 6.1 9.06569 6.1 8.9V8.3C6.1 8.13432 5.96569 8 5.8 8Z"
                              fill="url(#paint1_linear_4900_27548)"
                            />
                            <path
                              d="M5.8 10.4H5.2C5.03431 10.4 4.9 10.5343 4.9 10.7V11.3C4.9 11.4657 5.03431 11.6 5.2 11.6H5.8C5.96569 11.6 6.1 11.4657 6.1 11.3V10.7C6.1 10.5343 5.96569 10.4 5.8 10.4Z"
                              fill="url(#paint2_linear_4900_27548)"
                            />
                            <path
                              d="M8.8 8H8.2C8.03431 8 7.9 8.13432 7.9 8.3V8.9C7.9 9.06569 8.03431 9.2 8.2 9.2H8.8C8.96569 9.2 9.1 9.06569 9.1 8.9V8.3C9.1 8.13432 8.96569 8 8.8 8Z"
                              fill="url(#paint3_linear_4900_27548)"
                            />
                            <path
                              d="M8.8 10.4H8.2C8.03431 10.4 7.9 10.5343 7.9 10.7V11.3C7.9 11.4657 8.03431 11.6 8.2 11.6H8.8C8.96569 11.6 9.1 11.4657 9.1 11.3V10.7C9.1 10.5343 8.96569 10.4 8.8 10.4Z"
                              fill="url(#paint4_linear_4900_27548)"
                            />
                            <path
                              d="M11.8 8H11.2C11.0343 8 10.9 8.13432 10.9 8.3V8.9C10.9 9.06569 11.0343 9.2 11.2 9.2H11.8C11.9657 9.2 12.1 9.06569 12.1 8.9V8.3C12.1 8.13432 11.9657 8 11.8 8Z"
                              fill="url(#paint5_linear_4900_27548)"
                            />
                            <path
                              d="M11.8 10.4H11.2C11.0343 10.4 10.9 10.5343 10.9 10.7V11.3C10.9 11.4657 11.0343 11.6 11.2 11.6H11.8C11.9657 11.6 12.1 11.4657 12.1 11.3V10.7C12.1 10.5343 11.9657 10.4 11.8 10.4Z"
                              fill="url(#paint6_linear_4900_27548)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint3_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint4_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint5_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint6_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                            Sat, 8 June
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M8.50261 14.6654C7.18407 14.6654 5.89513 14.2744 4.79881 13.5418C3.70248 12.8093 2.84799 11.7681 2.34341 10.5499C1.83883 9.33175 1.7068 7.99131 1.96404 6.6981C2.22127 5.40489 2.85621 4.21701 3.78856 3.28466C4.72091 2.35231 5.9088 1.71737 7.20201 1.46013C8.49521 1.2029 9.83566 1.33492 11.0538 1.8395C12.272 2.34409 13.3132 3.19857 14.0457 4.2949C14.7783 5.39123 15.1693 6.68016 15.1693 7.9987C15.1673 9.76622 14.4643 11.4608 13.2145 12.7106C11.9647 13.9604 10.2701 14.6634 8.50261 14.6654ZM8.50261 2.66537C7.44777 2.66537 6.41663 2.97816 5.53957 3.5642C4.6625 4.15023 3.97892 4.98318 3.57525 5.95772C3.17158 6.93226 3.06596 8.00462 3.27175 9.03918C3.47754 10.0737 3.98549 11.0241 4.73137 11.7699C5.47725 12.5158 6.42756 13.0238 7.46213 13.2296C8.49669 13.4353 9.56905 13.3297 10.5436 12.9261C11.5181 12.5224 12.3511 11.8388 12.9371 10.9617C13.5231 10.0847 13.8359 9.05353 13.8359 7.9987C13.8344 6.5847 13.2719 5.22907 12.2721 4.22922C11.2722 3.22937 9.91661 2.66696 8.50261 2.66537Z"
                              fill="url(#paint0_linear_4900_27551)"
                            />
                            <path
                              d="M8.50261 8.66537C8.3258 8.66537 8.15623 8.59513 8.0312 8.47011C7.90618 8.34508 7.83594 8.17551 7.83594 7.9987V5.33203C7.83594 5.15522 7.90618 4.98565 8.0312 4.86063C8.15623 4.73561 8.3258 4.66537 8.50261 4.66537C8.67942 4.66537 8.84899 4.73561 8.97401 4.86063C9.09904 4.98565 9.16927 5.15522 9.16927 5.33203V7.9987C9.16927 8.17551 9.09904 8.34508 8.97401 8.47011C8.84899 8.59513 8.67942 8.66537 8.50261 8.66537Z"
                              fill="url(#paint1_linear_4900_27551)"
                            />
                            <path
                              d="M10.6859 10.8487C10.5091 10.8487 10.3396 10.7784 10.2146 10.6534L8.0312 8.47011C7.90976 8.34437 7.84264 8.1759 7.84416 8.0011C7.84568 7.8263 7.91579 7.65909 8.0394 7.53549C8.163 7.41188 8.33021 7.34177 8.50501 7.34025C8.6798 7.33873 8.84821 7.40593 8.97394 7.52737L11.1573 9.7107C11.2505 9.80394 11.314 9.92271 11.3397 10.052C11.3654 10.1813 11.3522 10.3153 11.3017 10.4371C11.2513 10.5589 11.1659 10.663 11.0562 10.7363C10.9466 10.8096 10.8178 10.8487 10.6859 10.8487Z"
                              fill="url(#paint2_linear_4900_27551)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                            03:00 AM - 04:00 AM
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-start items-center gap-3 mt-[6px]">
                        <span className="text-[#A3A3A3] text-[16px] font-bold leading-normal line-through">
                          ₹450
                        </span>
                        <span className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
                          ₹450
                        </span>
                        <span className="text-[#FACA15] text-[12px] font-medium leading-normal">
                          Get (15% OFF)
                        </span>
                        <span className="flex items-center justify-start gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M0.75 3.08594L1.91667 10.6693H10.0833L11.25 3.08594L8.33333 4.83594L6 1.33594L3.66667 4.83594L0.75 3.08594Z"
                              stroke="#FACA15"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.00065 8.33724C6.64498 8.33724 7.16732 7.81491 7.16732 7.17057C7.16732 6.52624 6.64498 6.00391 6.00065 6.00391C5.35632 6.00391 4.83398 6.52624 4.83398 7.17057C4.83398 7.81491 5.35632 8.33724 6.00065 8.33724Z"
                              stroke="#FACA15"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[#FACA15] text-[12px] font-medium leading-normal underline">
                            Go Pro now
                          </span>
                        </span>
                      </div>

                      <Link href={"/coachSessionBooking"}>
                        <Button className="w-full my-2 primaryButton">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <div className="w-[328px] px-4 py-4 border-[1px] border-[#404040] rounded-[8px]">
                      <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                        Cardio Session
                      </h2>

                      <div className="w-[80px] flex one-one-call justify-center items-center gap-2 p-1 my-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.00065 10.668H7.33398V8.66797H9.33398V7.33464H7.33398V5.33464H6.00065V7.33464H4.00065V8.66797H6.00065V10.668ZM2.66732 13.3346C2.30065 13.3346 1.98687 13.2042 1.72598 12.9433C1.4651 12.6824 1.33443 12.3684 1.33398 12.0013V4.0013C1.33398 3.63464 1.46465 3.32086 1.72598 3.05997C1.98732 2.79908 2.3011 2.66841 2.66732 2.66797H10.6673C11.034 2.66797 11.348 2.79864 11.6093 3.05997C11.8707 3.3213 12.0011 3.63508 12.0007 4.0013V7.0013L14.6673 4.33464V11.668L12.0007 9.0013V12.0013C12.0007 12.368 11.8702 12.682 11.6093 12.9433C11.3484 13.2046 11.0344 13.3351 10.6673 13.3346H2.66732ZM2.66732 12.0013H10.6673V4.0013H2.66732V12.0013Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                          1:1 Call
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex items-center justify-center gap-2 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M13.3 3.2H12.1V2.6C12.1 2.44087 12.0368 2.28826 11.9243 2.17574C11.8117 2.06321 11.6591 2 11.5 2C11.3409 2 11.1883 2.06321 11.0757 2.17574C10.9632 2.28826 10.9 2.44087 10.9 2.6V3.2H9.1V2.6C9.1 2.44087 9.03679 2.28826 8.92426 2.17574C8.81174 2.06321 8.65913 2 8.5 2C8.34087 2 8.18826 2.06321 8.07574 2.17574C7.96321 2.28826 7.9 2.44087 7.9 2.6V3.2H6.1V2.6C6.1 2.44087 6.03679 2.28826 5.92426 2.17574C5.81174 2.06321 5.65913 2 5.5 2C5.34087 2 5.18826 2.06321 5.07574 2.17574C4.96321 2.28826 4.9 2.44087 4.9 2.6V3.2H3.7C3.38174 3.2 3.07652 3.32643 2.85147 3.55147C2.62643 3.77652 2.5 4.08174 2.5 4.4V12.8C2.5 13.1183 2.62643 13.4235 2.85147 13.6485C3.07652 13.8736 3.38174 14 3.7 14H13.3C13.6183 14 13.9235 13.8736 14.1485 13.6485C14.3736 13.4235 14.5 13.1183 14.5 12.8V4.4C14.5 4.08174 14.3736 3.77652 14.1485 3.55147C13.9235 3.32643 13.6183 3.2 13.3 3.2ZM4.9 4.4C4.9 4.55913 4.96321 4.71174 5.07574 4.82426C5.18826 4.93679 5.34087 5 5.5 5C5.65913 5 5.81174 4.93679 5.92426 4.82426C6.03679 4.71174 6.1 4.55913 6.1 4.4H7.9C7.9 4.55913 7.96321 4.71174 8.07574 4.82426C8.18826 4.93679 8.34087 5 8.5 5C8.65913 5 8.81174 4.93679 8.92426 4.82426C9.03679 4.71174 9.1 4.55913 9.1 4.4H10.9C10.9 4.55913 10.9632 4.71174 11.0757 4.82426C11.1883 4.93679 11.3409 5 11.5 5C11.6591 5 11.8117 4.93679 11.9243 4.82426C12.0368 4.71174 12.1 4.55913 12.1 4.4H13.3V5.6H3.7V4.4H4.9ZM3.7 12.8V6.8H13.3V12.8H3.7Z"
                              fill="url(#paint0_linear_4900_27548)"
                            />
                            <path
                              d="M5.8 8H5.2C5.03431 8 4.9 8.13432 4.9 8.3V8.9C4.9 9.06569 5.03431 9.2 5.2 9.2H5.8C5.96569 9.2 6.1 9.06569 6.1 8.9V8.3C6.1 8.13432 5.96569 8 5.8 8Z"
                              fill="url(#paint1_linear_4900_27548)"
                            />
                            <path
                              d="M5.8 10.4H5.2C5.03431 10.4 4.9 10.5343 4.9 10.7V11.3C4.9 11.4657 5.03431 11.6 5.2 11.6H5.8C5.96569 11.6 6.1 11.4657 6.1 11.3V10.7C6.1 10.5343 5.96569 10.4 5.8 10.4Z"
                              fill="url(#paint2_linear_4900_27548)"
                            />
                            <path
                              d="M8.8 8H8.2C8.03431 8 7.9 8.13432 7.9 8.3V8.9C7.9 9.06569 8.03431 9.2 8.2 9.2H8.8C8.96569 9.2 9.1 9.06569 9.1 8.9V8.3C9.1 8.13432 8.96569 8 8.8 8Z"
                              fill="url(#paint3_linear_4900_27548)"
                            />
                            <path
                              d="M8.8 10.4H8.2C8.03431 10.4 7.9 10.5343 7.9 10.7V11.3C7.9 11.4657 8.03431 11.6 8.2 11.6H8.8C8.96569 11.6 9.1 11.4657 9.1 11.3V10.7C9.1 10.5343 8.96569 10.4 8.8 10.4Z"
                              fill="url(#paint4_linear_4900_27548)"
                            />
                            <path
                              d="M11.8 8H11.2C11.0343 8 10.9 8.13432 10.9 8.3V8.9C10.9 9.06569 11.0343 9.2 11.2 9.2H11.8C11.9657 9.2 12.1 9.06569 12.1 8.9V8.3C12.1 8.13432 11.9657 8 11.8 8Z"
                              fill="url(#paint5_linear_4900_27548)"
                            />
                            <path
                              d="M11.8 10.4H11.2C11.0343 10.4 10.9 10.5343 10.9 10.7V11.3C10.9 11.4657 11.0343 11.6 11.2 11.6H11.8C11.9657 11.6 12.1 11.4657 12.1 11.3V10.7C12.1 10.5343 11.9657 10.4 11.8 10.4Z"
                              fill="url(#paint6_linear_4900_27548)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint3_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint4_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint5_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint6_linear_4900_27548"
                                x1="2.03846"
                                y1="9.65958"
                                x2="14.9039"
                                y2="9.66166"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                            Sat, 8 June
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M8.50261 14.6654C7.18407 14.6654 5.89513 14.2744 4.79881 13.5418C3.70248 12.8093 2.84799 11.7681 2.34341 10.5499C1.83883 9.33175 1.7068 7.99131 1.96404 6.6981C2.22127 5.40489 2.85621 4.21701 3.78856 3.28466C4.72091 2.35231 5.9088 1.71737 7.20201 1.46013C8.49521 1.2029 9.83566 1.33492 11.0538 1.8395C12.272 2.34409 13.3132 3.19857 14.0457 4.2949C14.7783 5.39123 15.1693 6.68016 15.1693 7.9987C15.1673 9.76622 14.4643 11.4608 13.2145 12.7106C11.9647 13.9604 10.2701 14.6634 8.50261 14.6654ZM8.50261 2.66537C7.44777 2.66537 6.41663 2.97816 5.53957 3.5642C4.6625 4.15023 3.97892 4.98318 3.57525 5.95772C3.17158 6.93226 3.06596 8.00462 3.27175 9.03918C3.47754 10.0737 3.98549 11.0241 4.73137 11.7699C5.47725 12.5158 6.42756 13.0238 7.46213 13.2296C8.49669 13.4353 9.56905 13.3297 10.5436 12.9261C11.5181 12.5224 12.3511 11.8388 12.9371 10.9617C13.5231 10.0847 13.8359 9.05353 13.8359 7.9987C13.8344 6.5847 13.2719 5.22907 12.2721 4.22922C11.2722 3.22937 9.91661 2.66696 8.50261 2.66537Z"
                              fill="url(#paint0_linear_4900_27551)"
                            />
                            <path
                              d="M8.50261 8.66537C8.3258 8.66537 8.15623 8.59513 8.0312 8.47011C7.90618 8.34508 7.83594 8.17551 7.83594 7.9987V5.33203C7.83594 5.15522 7.90618 4.98565 8.0312 4.86063C8.15623 4.73561 8.3258 4.66537 8.50261 4.66537C8.67942 4.66537 8.84899 4.73561 8.97401 4.86063C9.09904 4.98565 9.16927 5.15522 9.16927 5.33203V7.9987C9.16927 8.17551 9.09904 8.34508 8.97401 8.47011C8.84899 8.59513 8.67942 8.66537 8.50261 8.66537Z"
                              fill="url(#paint1_linear_4900_27551)"
                            />
                            <path
                              d="M10.6859 10.8487C10.5091 10.8487 10.3396 10.7784 10.2146 10.6534L8.0312 8.47011C7.90976 8.34437 7.84264 8.1759 7.84416 8.0011C7.84568 7.8263 7.91579 7.65909 8.0394 7.53549C8.163 7.41188 8.33021 7.34177 8.50501 7.34025C8.6798 7.33873 8.84821 7.40593 8.97394 7.52737L11.1573 9.7107C11.2505 9.80394 11.314 9.92271 11.3397 10.052C11.3654 10.1813 11.3522 10.3153 11.3017 10.4371C11.2513 10.5589 11.1659 10.663 11.0562 10.7363C10.9466 10.8096 10.8178 10.8487 10.6859 10.8487Z"
                              fill="url(#paint2_linear_4900_27551)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_4900_27551"
                                x1="1.32312"
                                y1="9.84267"
                                x2="15.618"
                                y2="9.84499"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                            03:00 AM - 04:00 AM
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-start items-center gap-3 mt-[6px]">
                        <span className="text-[#A3A3A3] text-[16px] font-bold leading-normal line-through">
                          ₹450
                        </span>
                        <span className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
                          ₹450
                        </span>
                        <span className="text-[#FACA15] text-[12px] font-medium leading-normal">
                          Get (15% OFF)
                        </span>
                        <span className="flex items-center justify-start gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M0.75 3.08594L1.91667 10.6693H10.0833L11.25 3.08594L8.33333 4.83594L6 1.33594L3.66667 4.83594L0.75 3.08594Z"
                              stroke="#FACA15"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.00065 8.33724C6.64498 8.33724 7.16732 7.81491 7.16732 7.17057C7.16732 6.52624 6.64498 6.00391 6.00065 6.00391C5.35632 6.00391 4.83398 6.52624 4.83398 7.17057C4.83398 7.81491 5.35632 8.33724 6.00065 8.33724Z"
                              stroke="#FACA15"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[#FACA15] text-[12px] font-medium leading-normal underline">
                            Go Pro now
                          </span>
                        </span>
                      </div>

                      <Link href={"/coachSessionBooking"}>
                        <Button className="w-full my-2 primaryButton">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
  );
};

export default CoachExperience;
