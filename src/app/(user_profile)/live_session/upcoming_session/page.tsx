"use client";
import Navbar from "@/app/Components/Navbar";
import ShowFooter from "@/app/Components/ShowFooter";
import UserNavbar from "@/app/Components/UserNavbar";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Truculenta } from "next/font/google";
const Page = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [data, isData] = useState(true);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState<any>([]);
  const navItems = [
    { name: "Upcoming ", path: "/live_session/upcoming_session" },
    { name: "Past", path: "/live_session/past_session" },
  ];

  const pathname = usePathname();
  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelected(currentItem.name);
    } else {
      setSelected("Upcoming");
    }
  }, [pathname]);

  const formatTime = (timeSlot: any) => {
    const [start] = timeSlot.split("-"); // Get the start time
    return start.replace(/^0/, "").replace(/(AM|PM)/, " $1"); // Remove leading zero and add space before AM/PM
  };

  function SkeletonCard1() {
    return (
      <>
        <div className="w-[1100px]  h-28 mq450:h-60 p-6 my-5 border shadow bg-neutral-800 rounded-lg border-neutral-700 animate-pulse mq450:w-[350px]"></div>
        <div className="w-[1100px]  h-28 mq450:h-60 p-6 my-5 border shadow bg-neutral-800 rounded-lg border-neutral-700 animate-pulse mq450:w-[350px]"></div>
        <div className="w-[1100px]  h-28 mq450:h-60 p-6 my-5 border shadow bg-neutral-800 rounded-lg border-neutral-700 animate-pulse mq450:w-[350px]"></div>
        <div className="w-[1100px]  h-28 mq450:h-60 p-6 my-5 border shadow bg-neutral-800 rounded-lg border-neutral-700 animate-pulse mq450:w-[350px]"></div>
        <div className="w-[1100px]  h-28 mq450:h-60 p-6 my-5 border shadow bg-neutral-800 rounded-lg border-neutral-700 animate-pulse mq450:w-[350px]"></div>
      </>
    );
  }
  const fetchPastSessions = async () => {
    // const userId = "66fc27b1fa70c77e22ffe95f";
    setLoading(true);
    const userId = Cookies.get("user_id");
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/session/upcoming/${userId}`,
      );
      const data = await response.json();

      // Combine and process private and public sessions
      const allSessions = [
        ...data.privateSession.map((session: any) => ({
          ...session,
          type: "Private",
        })),
        ...data.publicSession.map((session: any) => ({
          ...session,
          type: "Public",
        })),
      ];

      // Sort sessions by date, most recent first
      allSessions.sort(
        (a: any, b: any) =>
          new Date(b.dateTime as string).getTime() -
          new Date(a.dateTime as string).getTime(),
      );

      setUpcomingSessions(allSessions);
      //console.log(allSessions);
      setLoading(false);
    } catch (error) {
      //console.error("Error fetching past sessions:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPastSessions();
  }, []);
  // fetchPastSessions();

  const [onDetailsClick, setOnDetailsClick] = useState(false);
  return (
    <>
      <div className="relative mq450:static  27px] ">
        <UserNavbar activelive={true} liveactivecolor="neutral-700" />
        {data ? (
          <div className="absolute text-white mq450:left-[9px] mq450:ml-2 top-28 left-44  mq450:mt-14 w-fit mq450:pb-5">
            <div className="flex items-center w-48 gap-5 border-b-1 mq450:gap-2 border-neutral-500">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative  pb-2 text-2xl font-bold text-nowrap mq450:text-xl font-Lato ${
                    selected === item.name
                      ? "bg-clip-text text-transparent  font-semibold bg-gradient-to-r from-[#F43F5E] to-[#FB923C] text-transparent bg-clip-text"
                      : "text-neutral-400"
                  }`}
                  onClick={() => setSelected(item.name)}
                >
                  {item.name}
                  {selected === item.name && (
                    <span className="absolute font-medium bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]" />
                  )}
                </Link>
              ))}
              <a href="/live_session/calendar">
                <button
                  className="w-[111px]   mq1240:ml-[680px] mq1050:ml-[550px]   hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] 
 mq450:ml-[50px] ml-[860px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12.8 3.2H11.6V2.6C11.6 2.44087 11.5368 2.28826 11.4243 2.17574C11.3117 2.06321 11.1591 2 11 2C10.8409 2 10.6883 2.06321 10.5757 2.17574C10.4632 2.28826 10.4 2.44087 10.4 2.6V3.2H8.6V2.6C8.6 2.44087 8.53679 2.28826 8.42426 2.17574C8.31174 2.06321 8.15913 2 8 2C7.84087 2 7.68826 2.06321 7.57574 2.17574C7.46321 2.28826 7.4 2.44087 7.4 2.6V3.2H5.6V2.6C5.6 2.44087 5.53679 2.28826 5.42426 2.17574C5.31174 2.06321 5.15913 2 5 2C4.84087 2 4.68826 2.06321 4.57574 2.17574C4.46321 2.28826 4.4 2.44087 4.4 2.6V3.2H3.2C2.88174 3.2 2.57652 3.32643 2.35147 3.55147C2.12643 3.77652 2 4.08174 2 4.4V12.8C2 13.1183 2.12643 13.4235 2.35147 13.6485C2.57652 13.8736 2.88174 14 3.2 14H12.8C13.1183 14 13.4235 13.8736 13.6485 13.6485C13.8736 13.4235 14 13.1183 14 12.8V4.4C14 4.08174 13.8736 3.77652 13.6485 3.55147C13.4235 3.32643 13.1183 3.2 12.8 3.2ZM4.4 4.4C4.4 4.55913 4.46321 4.71174 4.57574 4.82426C4.68826 4.93679 4.84087 5 5 5C5.15913 5 5.31174 4.93679 5.42426 4.82426C5.53679 4.71174 5.6 4.55913 5.6 4.4H7.4C7.4 4.55913 7.46321 4.71174 7.57574 4.82426C7.68826 4.93679 7.84087 5 8 5C8.15913 5 8.31174 4.93679 8.42426 4.82426C8.53679 4.71174 8.6 4.55913 8.6 4.4H10.4C10.4 4.55913 10.4632 4.71174 10.5757 4.82426C10.6883 4.93679 10.8409 5 11 5C11.1591 5 11.3117 4.93679 11.4243 4.82426C11.5368 4.71174 11.6 4.55913 11.6 4.4H12.8V5.6H3.2V4.4H4.4ZM3.2 12.8V6.8H12.8V12.8H3.2Z"
                      fill="white"
                    />
                    <path
                      d="M5.3 8H4.7C4.53431 8 4.4 8.13432 4.4 8.3V8.9C4.4 9.06569 4.53431 9.2 4.7 9.2H5.3C5.46569 9.2 5.6 9.06569 5.6 8.9V8.3C5.6 8.13432 5.46569 8 5.3 8Z"
                      fill="white"
                    />
                    <path
                      d="M5.3 10.4H4.7C4.53431 10.4 4.4 10.5343 4.4 10.7V11.3C4.4 11.4657 4.53431 11.6 4.7 11.6H5.3C5.46569 11.6 5.6 11.4657 5.6 11.3V10.7C5.6 10.5343 5.46569 10.4 5.3 10.4Z"
                      fill="white"
                    />
                    <path
                      d="M8.3 8H7.7C7.53431 8 7.4 8.13432 7.4 8.3V8.9C7.4 9.06569 7.53431 9.2 7.7 9.2H8.3C8.46569 9.2 8.6 9.06569 8.6 8.9V8.3C8.6 8.13432 8.46569 8 8.3 8Z"
                      fill="white"
                    />
                    <path
                      d="M8.3 10.4H7.7C7.53431 10.4 7.4 10.5343 7.4 10.7V11.3C7.4 11.4657 7.53431 11.6 7.7 11.6H8.3C8.46569 11.6 8.6 11.4657 8.6 11.3V10.7C8.6 10.5343 8.46569 10.4 8.3 10.4Z"
                      fill="white"
                    />
                    <path
                      d="M11.3 8H10.7C10.5343 8 10.4 8.13432 10.4 8.3V8.9C10.4 9.06569 10.5343 9.2 10.7 9.2H11.3C11.4657 9.2 11.6 9.06569 11.6 8.9V8.3C11.6 8.13432 11.4657 8 11.3 8Z"
                      fill="white"
                    />
                    <path
                      d="M11.3 10.4H10.7C10.5343 10.4 10.4 10.5343 10.4 10.7V11.3C10.4 11.4657 10.5343 11.6 10.7 11.6H11.3C11.4657 11.6 11.6 11.4657 11.6 11.3V10.7C11.6 10.5343 11.4657 10.4 11.3 10.4Z"
                      fill="white"
                    />
                  </svg>
                  Calendar
                </button>
              </a>
            </div>
            {loading ? (
              <SkeletonCard1 />
            ) : (
              <>
                <div className="mb-10">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session: any, index: any) => (
                      <Link
                        key={session._id}
                        href={`/live_session/upcoming_session/${session._id}`}
                      >
                        <div
                          style={{ wordSpacing: "0.2rem" }}
                          className="p-1 mt-5 text-xl font-semibold text-neutral-300 font-Lato"
                        >
                          {session.dateTime
                            ? new Date(session.dateTime)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")
                            : ""}
                        </div>
                        <div className="relative flex h-[90px] mt-1 items-center justify-between w-[1200px] p-4 mq450:p-2 rounded-lg bg-neutral-800 border-neutral-700 border-2 mq450:w-[330px] mq450:h-[163px] mq450:flex-col mq450:items-start mq450:justify-start">
                          <div className="flex px-2 mq450:py-3 mq450:w-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                              className="mt-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="mt-2"
                              >
                                <g clipPath="url(#clip0_1421_19244)">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.4914 0.192503C18.269 0.157684 18.0419 0.167015 17.8231 0.219963C17.6043 0.272912 17.398 0.368441 17.2161 0.501096C17.0342 0.633751 16.8802 0.800934 16.763 0.993101C16.6457 1.18527 16.5674 1.39865 16.5326 1.62107C16.4978 1.8435 16.5071 2.0706 16.56 2.28941C16.613 2.50823 16.7085 2.71447 16.8412 2.89637C16.9738 3.07827 17.141 3.23225 17.3332 3.34954C17.5253 3.46682 17.7387 3.54511 17.9611 3.57993C21.0794 4.08206 23.8946 5.73917 25.8471 8.22186C27.7996 10.7046 28.7464 13.831 28.4993 16.9798C28.2522 20.1286 26.8293 23.0691 24.5135 25.2169C22.1977 27.3646 19.1585 28.5623 16 28.5719C13.4793 28.5724 11.0167 27.8154 8.93151 26.399C6.84636 24.9827 5.23493 22.9725 4.30629 20.6291C4.22829 20.4132 4.10775 20.2153 3.95182 20.0469C3.79589 19.8785 3.60774 19.7432 3.39852 19.6489C3.18931 19.5546 2.96329 19.5032 2.73386 19.4979C2.50443 19.4926 2.27627 19.5333 2.0629 19.6178C1.84953 19.7023 1.6553 19.8288 1.49171 19.9897C1.32813 20.1507 1.19853 20.3429 1.1106 20.5548C1.02267 20.7668 0.978188 20.9943 0.979802 21.2238C0.981417 21.4533 1.02909 21.6801 1.12 21.8908C2.49318 25.3501 5.02905 28.2226 8.29132 30.0142C11.5536 31.8058 15.3383 32.4044 18.9942 31.707C22.6501 31.0097 25.9487 29.0599 28.3225 26.1933C30.6962 23.3267 31.9966 19.7224 32 16.0005C31.9998 12.1886 30.6391 8.50184 28.1626 5.60387C25.6862 2.70591 22.2567 0.786997 18.4914 0.192503ZM14.0891 1.51136C14.1455 1.72958 14.1582 1.95678 14.1267 2.17993C14.0951 2.40309 14.0199 2.61784 13.9052 2.81188C13.7906 3.00592 13.6388 3.17546 13.4586 3.31078C13.2783 3.4461 13.0732 3.54455 12.8549 3.6005C12.2822 3.74785 11.7208 3.93575 11.1749 4.16279C10.967 4.24924 10.7441 4.29389 10.519 4.29422C10.2939 4.29454 10.0709 4.25051 9.8628 4.16466C9.65469 4.0788 9.46553 3.9528 9.30612 3.79384C9.1467 3.63488 9.02016 3.44608 8.93371 3.23822C8.84727 3.03035 8.80261 2.8075 8.80229 2.58237C8.80197 2.35725 8.84599 2.13427 8.93184 1.92616C9.0177 1.71805 9.1437 1.52889 9.30266 1.36948C9.46162 1.21006 9.65042 1.08352 9.85829 0.997074C10.5486 0.709074 11.264 0.469074 12.0023 0.27936C12.2204 0.223362 12.4473 0.210868 12.6702 0.242593C12.8931 0.274317 13.1076 0.349638 13.3014 0.464255C13.4952 0.578871 13.6645 0.730538 13.7996 0.910594C13.9348 1.09065 14.0332 1.29328 14.0891 1.51136ZM7.28 4.32965C7.59623 4.6559 7.77 5.09434 7.76314 5.54864C7.75629 6.00295 7.56936 6.43595 7.24343 6.7525C6.39353 7.58085 5.66275 8.52318 5.072 9.5525C4.96334 9.75356 4.81558 9.93085 4.6374 10.074C4.45922 10.2171 4.25423 10.3231 4.03447 10.3859C3.81471 10.4486 3.58463 10.4668 3.35775 10.4393C3.13087 10.4118 2.91178 10.3392 2.71335 10.2259C2.51492 10.1125 2.34117 9.96055 2.20231 9.77904C2.06345 9.59752 1.96229 9.39008 1.90477 9.1689C1.84725 8.94772 1.83454 8.71727 1.86738 8.4911C1.90022 8.26494 1.97795 8.04762 2.096 7.85193C2.84459 6.5418 3.77412 5.34373 4.85714 4.29307C5.18339 3.97685 5.62184 3.80307 6.07614 3.80993C6.53044 3.81679 6.96344 4.00372 7.28 4.32965ZM2.09371 12.0691C2.54378 12.1325 2.95022 12.3721 3.22368 12.7352C3.49714 13.0982 3.61523 13.555 3.552 14.0051C3.46956 14.5919 3.42832 15.1839 3.42857 15.7765C3.42857 16.2312 3.24796 16.6672 2.92647 16.9887C2.60498 17.3102 2.16894 17.4908 1.71429 17.4908C1.25963 17.4908 0.823594 17.3102 0.502103 16.9887C0.180612 16.6672 0 16.2312 0 15.7765C0 15.0154 0.0525714 14.2634 0.157714 13.5274C0.221168 13.0773 0.460754 12.6709 0.823797 12.3974C1.18684 12.1239 1.64362 12.0058 2.09371 12.0691ZM10.2857 20.3022V11.6988C10.2859 11.3093 10.3856 10.9264 10.5754 10.5863C10.7652 10.2462 11.0387 9.96019 11.37 9.75549C11.7014 9.55078 12.0795 9.43413 12.4686 9.41661C12.8577 9.39909 13.2448 9.48127 13.5931 9.65536L22.1966 13.9571C22.5757 14.1471 22.8945 14.4389 23.1173 14.7998C23.3401 15.1606 23.4581 15.5764 23.4581 16.0005C23.4581 16.4246 23.3401 16.8404 23.1173 17.2012C22.8945 17.5621 22.5757 17.8539 22.1966 18.0439L13.5931 22.3456C13.2448 22.5197 12.8577 22.6019 12.4686 22.5844C12.0795 22.5669 11.7014 22.4502 11.37 22.2455C11.0387 22.0408 10.7652 21.7548 10.5754 21.4147C10.3856 21.0746 10.2859 20.6917 10.2857 20.3022Z"
                                    fill="url(#paint0_linear_1421_19244)"
                                  />
                                </g>
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1421_19244"
                                    x1="-1.23077"
                                    y1="20.4816"
                                    x2="33.077"
                                    y2="20.4872"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F43F5E" />
                                    <stop offset="1" stopColor="#FB923C" />
                                  </linearGradient>
                                  <clipPath id="clip0_1421_19244">
                                    <rect width="32" height="32" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </svg>
                            <div className="flex flex-col ml-2">
                              <p className="px-2 text-base text-lg font-semibold mq450:text-nowrap text-neutral-300 mq450:text-base">
                                {session?.timeSlot
                                  ? formatTime(session.timeSlot)
                                  : session.startTime}
                                • 1hr
                              </p>
                              <div className="w-[78px] ml-2 h-[22px] px-2.5 py-0.5 bg-neutral-700 rounded-md justify-center items-center inline-flex">
                                <div className="text-center text-green-700 text-xs font-medium leading-[18px]">
                                  Confirmed
                                </div>
                              </div>
                            </div>

                            <svg
                              className="hidden ml-24 mq450:block"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89471 5.63604 5.63604C6.89471 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C20.9974 14.3861 20.0483 16.6738 18.3611 18.3611C16.6738 20.0483 14.3861 20.9974 12 21ZM12 4.8C10.576 4.8 9.18393 5.22228 7.9999 6.01342C6.81586 6.80457 5.89302 7.92905 5.34807 9.24468C4.80312 10.5603 4.66054 12.008 4.93835 13.4047C5.21616 14.8013 5.9019 16.0842 6.90883 17.0912C7.91577 18.0981 9.19869 18.7838 10.5954 19.0617C11.992 19.3395 13.4397 19.1969 14.7553 18.6519C16.071 18.107 17.1954 17.1841 17.9866 16.0001C18.7777 14.8161 19.2 13.424 19.2 12C19.1979 10.0911 18.4386 8.261 17.0888 6.9112C15.739 5.5614 13.9089 4.80215 12 4.8Z"
                                fill="#E5E5E5"
                              />
                              <path
                                d="M12 16.5C11.7613 16.5 11.5324 16.4052 11.3636 16.2364C11.1948 16.0676 11.1 15.8387 11.1 15.6V12H10.2C9.96131 12 9.73239 11.9052 9.56361 11.7364C9.39482 11.5676 9.3 11.3387 9.3 11.1C9.3 10.8613 9.39482 10.6324 9.56361 10.4636C9.73239 10.2948 9.96131 10.2 10.2 10.2H12C12.2387 10.2 12.4676 10.2948 12.6364 10.4636C12.8052 10.6324 12.9 10.8613 12.9 11.1V15.6C12.9 15.8387 12.8052 16.0676 12.6364 16.2364C12.4676 16.4052 12.2387 16.5 12 16.5Z"
                                fill="#E5E5E5"
                              />
                              <path
                                d="M13.8 16.5H10.2C9.96131 16.5 9.73239 16.4052 9.56361 16.2364C9.39482 16.0676 9.3 15.8387 9.3 15.6C9.3 15.3613 9.39482 15.1324 9.56361 14.9636C9.73239 14.7948 9.96131 14.7 10.2 14.7H13.8C14.0387 14.7 14.2676 14.7948 14.4364 14.9636C14.6052 15.1324 14.7 15.3613 14.7 15.6C14.7 15.8387 14.6052 16.0676 14.4364 16.2364C14.2676 16.4052 14.0387 16.5 13.8 16.5Z"
                                fill="#E5E5E5"
                              />
                              <path
                                d="M11.55 9.3C12.2956 9.3 12.9 8.69559 12.9 7.95C12.9 7.20442 12.2956 6.6 11.55 6.6C10.8044 6.6 10.2 7.20442 10.2 7.95C10.2 8.69559 10.8044 9.3 11.55 9.3Z"
                                fill="#E5E5E5"
                              />
                            </svg>
                          </div>
                          <div className="inline-flex gap-44  w-[550px] px-4 mq450:flex-col mq450:gap-3 mq450:mt-0 mq450:ml-2 mq450:w-full mq450:px-2">
                            <p className="w-full text-lg font-bold truncate text-neutral-300 mq450:text-[18px]">
                              {session.title}
                            </p>
                            <p className="w-full text-lg font-medium truncate text-neutral-300 mq450:text-[17px]">
                              {session.coachName}
                            </p>
                          </div>
                          <button className="w-[86px] h-[37px] px-3 py-2 rounded-lg border border-orange-500 justify-center items-center gap-2 inline-flex text-nowrap mq450:absolute mq450:top-[110px] mq450:right-4 mq450:w-[86px]">
                            Join
                          </button>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="mx-auto mt-10 text-center  ml-[400px] mq1050:ml-60 mq450:ml-4 flex flex-col items-center justify-center">
                    <Image
                      width={250}
                      height={400}
                      src="/no_session.png"
                      alt="No Session"
                    />
                    <div className="flex flex-col mx-auto  items-center justify-center gap-1 text-center mt-7">
                      <p className="text-2xl font-semibold text-neutral-400 font-Lato">
                      No session booked yet ⚠️
                      </p>
                      <p className="text-lg mq450:text-base font-medium text-neutral-400 font-Lato w-[470px] mq450:w-[300px]">
                      Ready to start your fitness journey? Book your first session and connect with top coaches to reach your goals!
                      </p>
                      <a href="/workout">
                        {" "}
                        <button className="w-[200px] mt-2 h-[35px] px-3 py-2 bg-gradient-to-r from-[#F43F5E] to-[#FB923C] rounded-lg justify-center items-center gap-2 inline-flex">
                          Book Now
                        </button>
                      </a>
                    </div>
                  </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="absolute text-white mq450:ml-2 top-40 left-60 mq450:left-0 mq450:mt-5 w-fit">
            <div className="flex items-center gap-5 ">
              <div className="flex items-center gap-5 border-b-2 mq450:gap-2 border-neutral-500 ">
                <p className="bg-clip-text  text-nowrap mq450:text-base text-transparent bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]  text-2xl font-semibold  font-Lato underline">
                  Upcoming
                </p>
                <p className="text-2xl font-semibold text-nowrap mq450:text-base text-neutral-500 font-Lato">
                  Past
                </p>
              </div>
              <button className="w-[111px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[90px] ml-[700px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex">
                Book Now
              </button>
            </div>
            <div className="mx-auto mt-10 text-center  ml-[400px] mq1050:ml-60 mq450:ml-4 flex flex-col items-center justify-center">
                      <Image
                        width={250}
                        height={400}
                        src="/no_session.png"
                        alt="No Session"
                      />
                      <div className="flex flex-col mx-auto  items-center justify-center gap-1 text-center mt-7">
                        <p className="text-2xl font-semibold text-neutral-400 font-Lato">
                        No session booked yet ⚠️
                        </p>
                        <p className="text-lg mq450:text-base font-medium text-neutral-400 font-Lato w-[470px] mq450:w-[300px]">
                        Ready to start your fitness journey? Book your first session and connect with top coaches to reach your goals!
                        </p>
                        <a href="/workout">
                          {" "}
                          <button className="w-[200px] mt-2 h-[35px] px-3 py-2 bg-gradient-to-r from-[#F43F5E] to-[#FB923C] rounded-lg justify-center items-center gap-2 inline-flex">
                            Book Now
                          </button>
                        </a>
                      </div>
                    </div>
          </div>
        )}
         
      </div>
    </>
  );
};

export default Page;
