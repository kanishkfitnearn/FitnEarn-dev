"use client";
import Navbar from "@/app/Components/Navbar";
import ShowFooter from "@/app/Components/ShowFooter";
import UserNavbar from "@/app/Components/UserNavbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
const Page = () => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [data, isData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [onDetailsClick, setOnDetailsClick] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState<any>([]);
  const [email, setEmail] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [selected, setSelected] = useState("");

  const navItems = [
    { name: "Upcoming ", path: "/my_bookings/upcoming_bookings" },
    { name: "Past", path: "/my_bookings/past_bookings" },
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

  const formatTime = (timeSlot: any) => {
    if (!timeSlot) return ""; // Return an empty string if timeSlot is undefined or null
    const [start] = timeSlot.split("-"); // Get the start time
    return start.replace(/^0/, "").replace(/(AM|PM)/, " $1"); // Remove leading zero and add space before AM/PM
  };

  const fetchPastSessions = async () => {
    // const userId = "66db258b94703f01dfc49512";
    setLoading(true);
    const userId = Cookies.get("user_id");
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/session/upcoming/${userId}`,
      );
      const data = await response.json();

      // Combine and process private and public sessions
      const allSessions = [
        ...data.privateSession
          .filter((session: any) => session.userRole !== "participant")
          .map((session: any) => ({
            ...session,
            type: "Private",
          })),
        ...data.publicSession
          // .filter((session: any) => session.userRole !== "participant")
          .map((session: any) => ({
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
      console.log(allSessions);
      setLoading(false);
    } catch (error) {
      //console.error("Error fetching past sessions:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPastSessions();
  }, []);
  return (
    <>
      <div className="relative mq450:static ">
        <UserNavbar bookingsactivecolor="neutral-700" activebookings={true} />
        {data ? (
          <div className="absolute mq450:left-[10px] text-white mq450:ml-2 top-28 left-44 mq450:left-0 mq450:mt-14  w-fit mq450:pb-5">
            <div className="flex items-center w-48 gap-5 mq450:gap-2 border-neutral-500">
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
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]" />
                  )}
                </Link>
              ))}
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
                        href={`/my_bookings/upcoming_bookings/${session._id}`}
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
                        <div className="relative flex h-[90px] mt-1 items-center justify-between w-[1200px] p-4 mq450:p-2 rounded-lg bg-neutral-800 border-neutral-700 border-2 mq450:w-[330px] mq450:h-auto mq450:flex-col mq450:items-start mq450:justify-start">
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
                              <p className="px-2 text-base text-lg font-medium mq450:text-nowrap text-neutral-300 mq450:text-base">
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
                          </div>
                          <div className="flex flex-col px-16 mq450:absolute mq450:left-[180px] mq450:top-[20px] mq450:px-2">
                            <div className="text-base text-neutral-300">
                              ID: {session?.sessionId? session.sessionId : "LSP00425"}
                            </div>
                            <div className="text-sm italic text-neutral-300">
                              Date:{" "}
                              {session.dateTime
                                ? new Date(session.dateTime)
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, "-")
                                : ""}
                            </div>
                          </div>
                          {/* Middle section */}
                          <div className="grid flex-1 gap-4 md:grid-cols-3">
                            <div className="mq450:p-2">
                              <div className="text-lg text-neutral-300">
                                {session.title && session.title.length > 12
                                  ? session.title.slice(0, 12) + "..."
                                  : session.title}
                              </div>
                              <div className="text-sm italic font-medium text-neutral-300">
                                By: {session.coachName}
                              </div>
                            </div>
                            <div className="mq450:absolute mq450:left-[185px]">
                              <div className="text-lg text-neutral-300">
                                Session Type
                              </div>
                              <div className="text-base italic font-medium text-neutral-300">
                                {session.type || "Group"}
                              </div>
                            </div>
                            <div className="mq450:p-2">
                              <div className="text-[18px] text-neutral-300">
                                Amount
                              </div>
                              <div className="text-base italic font-medium text-neutral-300">
                                Paid: {session.price || "1000"}
                              </div>
                            </div>
                          </div>

                          <button className="w-[106px]  h-[37px] px-3 py-2 rounded-lg border border-orange-500 justify-center items-center gap-2 inline-flex text-nowrap mq450:absolute mq450:top-[170px] mq450:right-10 mq450:w-[106px]">
                            View Details
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
                          Ready to start your fitness journey? Book your first
                          session and connect with top coaches to reach your
                          goals!
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
        ) : null}
      </div>
    </>
  );
};

export default Page;
