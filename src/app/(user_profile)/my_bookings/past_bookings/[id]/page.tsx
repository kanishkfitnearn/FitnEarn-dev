"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Popup from "@/app/Components/Popup";
import Image from "next/image";
import UserNavbar from "@/app/Components/UserNavbar";
import QueryForm from "@/app/(user_profile)/sub_plans/QueryFrom";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Page = ({ params }: any) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [email, setEmail] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingsDetails, setBookingsDetails] = useState<any>(null);
  const [coachImg, setCoachImg] = useState<any>(null);
  const [coachLvl, setCoachLvl] = useState<any>(null);
  const [raiseTicket, setRaiseTicket] = useState(false);
  const formatTimeSlot = (timeSlot: any) => {
    const [start, end] = timeSlot.split("-");
    const formattedStart = start.replace(/^0/, "").replace(/AM|PM/, "");
    const period = start.includes("AM") ? "AM" : "PM";
    const formattedEnd = end.replace(/^0/, "").replace(/AM|PM/, "");
    return `${formattedStart} - ${formattedEnd} ${period}`;
  };
  const addFriend = () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = pattern.test(email);
    //console.log("validEmail", validEmail);
    if (validEmail) {
      if (invitees.includes(email)) {
        setErr("This email is already added");
        setEmail("");
      } else if (invitees.length < 6) {
        setInvitees([...invitees, email]);
        setEmail("");
        //console.log("Invitees list :", [...invitees, email]);
        setErr(""); // Clear any previous error message
      } else {
        setErr("Only six are allowed");
      }
    } else {
      setErr("Valid email is required");
    }
  };

  const removeFriend = (emailToRemove: string) => {
    setInvitees(invitees.filter((invitee) => invitee !== emailToRemove));
    setErr("");
  };

  useEffect(() => {
    //console.log("invitees", invitees);
  }, [invitees]);

  const handleInvite = (e: any) => {
    e.preventDefault();
    //console.log("email :", email);
    if (invitees.length === 0) {
      setErr("At least one email is required");
      //console.log("invitees", invitees);
    } else {
      setErr("");
      //console.log("you have successfully invited your friends", invitees);
    }
  };
  const router = useRouter();
  const userId = Cookies.get("user_id");
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleRebookClick = () => {
    // Scroll down by 100px before navigating

    router.push(`/coach/${sessionData?.coachId}`);

    // Navigate to the coach page after the scroll is done
    setTimeout(() => {
      window.scrollTo({
        top: 600,
        behavior: "smooth", // Optional: Smooth scroll
      });
    }, 1000); // Delay to allow the scroll animation to complete
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };
  useEffect(() => {
    const fetchSessionData = async () => {
      //console.log("params", { params });
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/session/${params.id}?userId=${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        const data = await response.json();
        setSessionData(data.data.session);
        setBookingsDetails(data.data.bookingDetails[0].bookings);
        setCoachImg(data.data.coachData.coachProfile);
        setCoachLvl(data.data.coachData.coachLevel);
        //console.log(data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        //console.log("error to fetch the session details");
      }
    };

    fetchSessionData();
  }, []);
  //console.log(sessionData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );
  if (!bookingsDetails || bookingsDetails.length === 0) {
    return null;
  }
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === bookingsDetails.length - 1;

  const handlePrevious = () => {
    if (!isTransitioning && !isFirstSlide) {
      setSlideDirection("right");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }, 300);
    }
  };

  const handleNext = () => {
    if (!isTransitioning && !isLastSlide) {
      setSlideDirection("left");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 300);
    }
  };

  const currentBooking = bookingsDetails[currentIndex];

  const getSlideStyle = () => {
    if (!isTransitioning) return {};

    return {
      transform: `translateX(${slideDirection === "left" ? "-100%" : "100%"})`,
      opacity: 0,
      transition: "all 300ms ease-in-out",
    };
  };
  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        {raiseTicket && (
          <QueryForm
            close={() => {
              setRaiseTicket(false);
            }}
          />
        )}
        <UserNavbar bookingsactivecolor="neutral-700" activebookings={true} />
        {showPopup && (
          <Popup
            p1="Cancel Session"
            p2="Are you sure you want to Cancel this session?"
            p3="This action cannot be undone."
            // confirm={handleConfirmDelete}
            cancel={() => setShowPopup(false)}
          />
        )}
        <div className="absolute ml-12 mq450:left-[10px] text-white mq1 mq450:justify-center mq450:ml-2 top-32 left-44 mq450:left-0 mq450:mt-5 w-fit mq1050:ml-2">
          <Link href="/my_bookings/past_bookings">
            <div className="w-11 h-11 p-2.5 rounded-full border border-neutral-600 justify-start items-start inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.7007 11.6351L9.30954 12.0004L9.70067 12.3658L15.3399 17.6341C15.34 17.6342 15.3401 17.6342 15.3401 17.6343C15.5425 17.8243 15.5527 18.1405 15.3644 18.3423L15.3637 18.3432C15.2669 18.4473 15.136 18.5004 15 18.5004C14.8766 18.5004 14.755 18.4561 14.6583 18.3661C14.6582 18.366 14.6581 18.3659 14.658 18.3658L8.95788 13.0406C8.95777 13.0405 8.95765 13.0404 8.95754 13.0403C8.65922 12.7606 8.5 12.3938 8.5 12.0004C8.5 11.6071 8.65926 11.2403 8.95842 10.9607L14.6593 5.63481L14.66 5.63416C14.8603 5.44637 15.1778 5.45698 15.365 5.65809L15.3654 5.65857C15.554 5.8606 15.5431 6.17735 15.3417 6.36605C15.3416 6.36614 15.3415 6.36622 15.3414 6.36631L9.7007 11.6351Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </div>
          </Link>
          <button
            onClick={() => {
              setRaiseTicket(!raiseTicket);
            }}
            className={` hover:bg-gradient-to-r hover:border hover:border-neutral-50 hover:from-[#F43F5E] hover:to-[#FB923C] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px] mq1240:ml-[00px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[px] text-sm text-nowrap h-[33px] px-3 py-3 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex 
             
                         ml-[860px] mq450:ml-52 mq450:top-[-210px]
                      
                    }`}
          >
            Raise Ticket
          </button>
          <div>
            <p
              style={{ textAlign: "left" }}
              className="flex flex-col justify-start py-5 pl-5 text-4xl font-bold text-left text-center capitaliz text-neutral-300 font-Lato"
            >
              Booking Detail
            </p>
            <p
              style={{ textAlign: "left" }}
              className="py-2 pl-5 text-lg font-normal text-left text-white capitalize font-Lato"
            >
              Booked on{" "}
              {bookingsDetails && bookingsDetails[0]?.payment_date
                ? bookingsDetails[0]?.payment_date
                : "NaN"}
            </p>

            <div className="flex flex-col items-center overflow-hidden">
              <div className="relative w-full">
                <div
                  style={getSlideStyle()}
                  className="w-full max-w-[1024px] mq450:w-[328px] mx-auto mq450:pl-8 mq450:h-auto mq450:flex-col mq450:gap-5 mq1050:w-[800px] h-auto min-h-[147px] pl-[58px] pr-[57px] py-5 flex bg-neutral-800 rounded-2xl shadow border border-neutral-700 mq1240:gap-[65px] gap-[90px]"
                >
                  <div>
                    <p className="text-xl font-extrabold text-nowrap">
                      Booking Id
                    </p>
                    <p className="text-nowrap md:text-center">
                      {currentBooking?.bookingId || "MX41"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-extrabold text-nowrap">
                      Payment Mode
                    </p>
                    <p className="text-nowrap md:text-center">
                      {currentBooking?.payment_mode || "Card"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-extrabold text-nowrap">
                      Transaction Id
                    </p>
                    <p className="md:text-center text-nowrap">
                      {currentBooking?.transactionId || "2201"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-extrabold text-nowrap">Seats</p>
                    <p className="md:text-center text-nowrap">
                      {currentBooking?.seats || "5"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-nowrap">
                      Session Amount
                    </p>
                    <div className="grid grid-cols-2 gap-1 mt-[1px] text-neutral-200 text-[16px]">
                      <p className="">Total:</p>
                      <p className="text-right">
                        ₹ {currentBooking?.actualAmount || "2000"}
                      </p>
                      <p className="text-neutral-200">Discount:</p>
                      <p className="text-right text-neutral-200">
                        - ₹ {currentBooking?.discountAmount || "0"}
                      </p>
                      <p className="font-semibold text-neutral-200 text-nowrap">
                        Grand Total:
                      </p>
                      <p className="font-semibold text-right text-neutral-200">
                        ₹ {currentBooking?.grandTotal || "2000"}
                      </p>
                    </div>
                    {bookingsDetails.length > 1 && (
                      <div className="flex justify-end gap-4 mt-4">
                        <button
                          onClick={handlePrevious}
                          disabled={isTransitioning}
                          className={`p-2 transition-colors rounded-full bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isFirstSlide ? "opacity-50" : "hover:opacity-100"}`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={isTransitioning}
                          className={`p-2 transition-colors rounded-full bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isLastSlide ? "opacity-50" : "hover:opacity-100"}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[1024px] mq450:w-[340px] mq450:pl-0 mq450:h-[640px] mq450:justify-center mq450:flex-col mq1050:pl-12 mq1050:w-[800px] mq1240:gap-5 mt-4 items-center  h-[332px] pl-10  py-[41px] bg-neutral-800 rounded-2xl shadow border border-neutral-700 gap-36 inline-flex">
            {coachImg ? (
              <Image
                layout="fixed"
                className="object-cover rounded-xl w-[370px] h-[300px] mq450:w-[300px]"
                src={coachImg}
                width={370}
                height={300}
                alt="session_img"
                quality={100}
              />
            ) : (
              <Image
                className=""
                src="/"
                width={300}
                height={400}
                alt="sessioin_img"
                quality={100}
              />
            )}
            <div className="">
              <p className="py-2 text-neutral-300 text-[32px] font-bold font-Lato overflow-hidden whitespace-wrap mq450:text-wrap text-ellipsis  mq450:w-[295px]">
                {sessionData?.title ? sessionData.title : sessionData?.title}
              </p>
              <p className="py-1 text-xl font-normal text-white capitalize font-Lato">
                {sessionData?.coachName}
              </p>
              <div className="flex gap-6 mq450:gap-4">
                <div className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.24992 2.5C6.97214 2.5 7.65964 2.65278 8.31242 2.95833C8.9652 3.26389 9.5277 3.69444 9.99992 4.25C10.4721 3.69444 11.0346 3.26389 11.6874 2.95833C12.3402 2.65278 13.0277 2.5 13.7499 2.5C15.0555 2.5 16.1458 2.9375 17.0208 3.8125C17.8958 4.6875 18.3333 5.77778 18.3333 7.08333C18.3333 7.15278 18.3299 7.22222 18.3233 7.29167C18.3166 7.36111 18.313 7.43056 18.3124 7.5H16.6458C16.6596 7.43056 16.6666 7.36111 16.6666 7.29167V7.08333C16.6666 6.25 16.3888 5.55556 15.8333 5C15.2777 4.44444 14.5833 4.16667 13.7499 4.16667C13.0971 4.16667 12.493 4.35083 11.9374 4.71917C11.3819 5.0875 10.9999 5.55611 10.7916 6.125H9.20825C8.99992 5.55556 8.61797 5.08694 8.06242 4.71917C7.50686 4.35139 6.9027 4.16722 6.24992 4.16667C5.41658 4.16667 4.72214 4.44444 4.16659 5C3.61103 5.55556 3.33325 6.25 3.33325 7.08333V7.29167C3.33325 7.36111 3.3402 7.43056 3.35409 7.5H1.68742C1.68742 7.43056 1.68409 7.36111 1.67742 7.29167C1.67075 7.22222 1.66714 7.15278 1.66659 7.08333C1.66659 5.77778 2.10409 4.6875 2.97909 3.8125C3.85409 2.9375 4.94436 2.5 6.24992 2.5ZM9.99992 17.2292C9.80547 17.2292 9.61103 17.1944 9.41658 17.125C9.22214 17.0556 9.04853 16.9444 8.89575 16.7917C8.42353 16.3611 7.97575 15.9514 7.55242 15.5625C7.12909 15.1736 6.72964 14.7986 6.35408 14.4375C5.97908 14.0764 5.62825 13.7361 5.30159 13.4167C4.97492 13.0972 4.67992 12.7917 4.41659 12.5H6.74992C7.19436 12.9306 7.68047 13.3958 8.20825 13.8958C8.73603 14.3958 9.33325 14.9444 9.99992 15.5417C10.6666 14.9444 11.2638 14.3958 11.7916 13.8958C12.3194 13.3958 12.8055 12.9306 13.2499 12.5H15.6041C15.3402 12.7917 15.0452 13.0972 14.7191 13.4167C14.393 13.7361 14.0421 14.0764 13.6666 14.4375C13.2916 14.7986 12.8888 15.1736 12.4583 15.5625C12.0277 15.9514 11.5763 16.3611 11.1041 16.7917C10.9513 16.9444 10.7777 17.0556 10.5833 17.125C10.3888 17.1944 10.1944 17.2292 9.99992 17.2292ZM9.20825 13.3333C9.38881 13.3333 9.5452 13.2814 9.67742 13.1775C9.80964 13.0736 9.90325 12.9381 9.95825 12.7708L11.0833 9.375L11.8124 10.4583C11.8819 10.5694 11.9791 10.6597 12.1041 10.7292C12.2291 10.7986 12.361 10.8333 12.4999 10.8333H18.3333C18.5694 10.8333 18.7674 10.7533 18.9274 10.5933C19.0874 10.4333 19.1671 10.2356 19.1666 10C19.1666 9.76389 19.0866 9.56611 18.9266 9.40667C18.7666 9.24722 18.5688 9.16722 18.3333 9.16667H12.9791L11.5416 7.04167C11.4583 6.91667 11.3508 6.82306 11.2191 6.76083C11.0874 6.69861 10.9449 6.66722 10.7916 6.66667C10.611 6.66667 10.4549 6.71889 10.3233 6.82333C10.1916 6.92778 10.0977 7.06306 10.0416 7.22917L8.91658 10.6042L8.20825 9.54167C8.13881 9.43056 8.04158 9.34028 7.91658 9.27083C7.79158 9.20139 7.65964 9.16667 7.52075 9.16667H1.66659C1.43047 9.16667 1.2327 9.24667 1.07325 9.40667C0.913807 9.56667 0.833808 9.76444 0.833252 10C0.833252 10.2361 0.913252 10.4342 1.07325 10.5942C1.23325 10.7542 1.43103 10.8339 1.66659 10.8333H7.02075L8.45825 12.9583C8.54158 13.0833 8.64936 13.1772 8.78159 13.24C8.91381 13.3028 9.05603 13.3339 9.20825 13.3333Z"
                      fill="url(#paint0_linear_3962_28069)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3962_28069"
                        x1="9.99992"
                        y1="2.5"
                        x2="9.99992"
                        y2="17.2292"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E3206D" />
                        <stop offset="1" stopColor="#F16A33" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-lg font-normal text-neutral-400 font-Lato">
                    {sessionData?.category && sessionData?.category?.length > 10
                      ? sessionData.category.slice(0, 10) + "..."
                      : sessionData?.category}
                  </p>
                  <svg
                    className="ml-2 mq450:ml-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M16.6667 8.83333H16.0358L15.4467 7.41083L15.8925 6.96417C16.0487 6.80789 16.1365 6.59597 16.1365 6.375C16.1365 6.15403 16.0487 5.94211 15.8925 5.78583L14.7142 4.6075C14.5579 4.45127 14.346 4.36351 14.125 4.36351C13.904 4.36351 13.6921 4.45127 13.5358 4.6075L13.0892 5.05333L11.6667 4.46417V3.83333C11.6667 3.61232 11.5789 3.40036 11.4226 3.24408C11.2663 3.0878 11.0543 3 10.8333 3H9.16667C8.94565 3 8.73369 3.0878 8.57741 3.24408C8.42113 3.40036 8.33333 3.61232 8.33333 3.83333V4.46417L6.91083 5.05333L6.46417 4.6075C6.30789 4.45127 6.09597 4.36351 5.875 4.36351C5.65403 4.36351 5.44211 4.45127 5.28583 4.6075L4.1075 5.78583C3.95127 5.94211 3.86351 6.15403 3.86351 6.375C3.86351 6.59597 3.95127 6.80789 4.1075 6.96417L4.55417 7.41083L3.96417 8.83333H3.33333C3.11232 8.83333 2.90036 8.92113 2.74408 9.07741C2.5878 9.23369 2.5 9.44565 2.5 9.66667V11.3333C2.5 11.5543 2.5878 11.7663 2.74408 11.9226C2.90036 12.0789 3.11232 12.1667 3.33333 12.1667H3.96417C4.24833 12.8525 4.27 12.9033 4.55333 13.5892L4.1075 14.0358C3.95127 14.1921 3.86351 14.404 3.86351 14.625C3.86351 14.846 3.95127 15.0579 4.1075 15.2142L5.28583 16.3925C5.44211 16.5487 5.65403 16.6365 5.875 16.6365C6.09597 16.6365 6.30789 16.5487 6.46417 16.3925L6.91083 15.9467L8.33333 16.5358V17.1667C8.33333 17.3877 8.42113 17.5996 8.57741 17.7559C8.73369 17.9122 8.94565 18 9.16667 18H10.8333C11.0543 18 11.2663 17.9122 11.4226 17.7559C11.5789 17.5996 11.6667 17.3877 11.6667 17.1667V16.5358L13.0892 15.9458L13.5358 16.3925C13.6921 16.5487 13.904 16.6365 14.125 16.6365C14.346 16.6365 14.5579 16.5487 14.7142 16.3925L15.8925 15.2142C16.0487 15.0579 16.1365 14.846 16.1365 14.625C16.1365 14.404 16.0487 14.1921 15.8925 14.0358L15.4467 13.5892L16.0358 12.1667H16.6667C16.8877 12.1667 17.0996 12.0789 17.2559 11.9226C17.4122 11.7663 17.5 11.5543 17.5 11.3333V9.66667C17.5 9.44565 17.4122 9.23369 17.2559 9.07741C17.0996 8.92113 16.8877 8.83333 16.6667 8.83333ZM10 13.8333C9.34073 13.8333 8.69626 13.6378 8.1481 13.2716C7.59994 12.9053 7.17269 12.3847 6.9204 11.7756C6.66811 11.1665 6.6021 10.4963 6.73072 9.8497C6.85933 9.2031 7.1768 8.60915 7.64298 8.14298C8.10915 7.6768 8.7031 7.35933 9.3497 7.23072C9.9963 7.1021 10.6665 7.16811 11.2756 7.4204C11.8847 7.67269 12.4053 8.09994 12.7716 8.6481C13.1378 9.19626 13.3333 9.84073 13.3333 10.5C13.3333 11.3841 12.9821 12.2319 12.357 12.857C11.7319 13.4821 10.8841 13.8333 10 13.8333Z"
                      fill="url(#paint0_linear_11257_17810)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_11257_17810"
                        x1="1.92308"
                        y1="12.5745"
                        x2="18.0049"
                        y2="12.5771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                    Equipment
                  </p>
                </div>

                <div className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <rect
                      x="2"
                      y="10.1914"
                      width="4.43182"
                      height="7.19"
                      fill="url(#paint0_linear_3962_28074)"
                    />
                    <rect
                      x="7.90918"
                      y="7.3125"
                      width="4.43182"
                      height="10.066"
                      fill="url(#paint1_linear_3962_28074)"
                    />
                    <rect
                      x="14.3181"
                      y="3.5"
                      width="3.43182"
                      height="13.38"
                      stroke="url(#paint2_linear_3962_28074)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3962_28074"
                        x1="4.21591"
                        y1="10.1914"
                        x2="4.21591"
                        y2="17.3814"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E3206D" />
                        <stop offset="1" stopColor="#F16A33" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_3962_28074"
                        x1="10.1251"
                        y1="7.3125"
                        x2="10.1251"
                        y2="17.3785"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E3206D" />
                        <stop offset="1" stopColor="#F16A33" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_3962_28074"
                        x1="16.034"
                        y1="3"
                        x2="16.034"
                        y2="17.38"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E3206D" />
                        <stop offset="1" stopColor="#F16A33" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-lg font-normal text-neutral-400 font-Lato">
                    {coachLvl}
                  </p>
                </div>
              </div>
              <p className="py-2 text-xl font-bold capitalize text-neutral-300 font-Lato">
                Session Time
              </p>
              <div className="flex gap-5 mq450:gap-2">
                <div className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16 4H14.5V3.25C14.5 3.05109 14.421 2.86032 14.2803 2.71967C14.1397 2.57902 13.9489 2.5 13.75 2.5C13.5511 2.5 13.3603 2.57902 13.2197 2.71967C13.079 2.86032 13 3.05109 13 3.25V4H10.75V3.25C10.75 3.05109 10.671 2.86032 10.5303 2.71967C10.3897 2.57902 10.1989 2.5 10 2.5C9.80109 2.5 9.61032 2.57902 9.46967 2.71967C9.32902 2.86032 9.25 3.05109 9.25 3.25V4H7V3.25C7 3.05109 6.92098 2.86032 6.78033 2.71967C6.63968 2.57902 6.44891 2.5 6.25 2.5C6.05109 2.5 5.86032 2.57902 5.71967 2.71967C5.57902 2.86032 5.5 3.05109 5.5 3.25V4H4C3.60218 4 3.22064 4.15804 2.93934 4.43934C2.65804 4.72064 2.5 5.10218 2.5 5.5V16C2.5 16.3978 2.65804 16.7794 2.93934 17.0607C3.22064 17.342 3.60218 17.5 4 17.5H16C16.3978 17.5 16.7794 17.342 17.0607 17.0607C17.342 16.7794 17.5 16.3978 17.5 16V5.5C17.5 5.10218 17.342 4.72064 17.0607 4.43934C16.7794 4.15804 16.3978 4 16 4ZM5.5 5.5C5.5 5.69891 5.57902 5.88968 5.71967 6.03033C5.86032 6.17098 6.05109 6.25 6.25 6.25C6.44891 6.25 6.63968 6.17098 6.78033 6.03033C6.92098 5.88968 7 5.69891 7 5.5H9.25C9.25 5.69891 9.32902 5.88968 9.46967 6.03033C9.61032 6.17098 9.80109 6.25 10 6.25C10.1989 6.25 10.3897 6.17098 10.5303 6.03033C10.671 5.88968 10.75 5.69891 10.75 5.5H13C13 5.69891 13.079 5.88968 13.2197 6.03033C13.3603 6.17098 13.5511 6.25 13.75 6.25C13.9489 6.25 14.1397 6.17098 14.2803 6.03033C14.421 5.88968 14.5 5.69891 14.5 5.5H16V7H4V5.5H5.5ZM4 16V8.5H16V16H4Z"
                      fill="url(#paint0_linear_3962_28060)"
                    />
                    <path
                      d="M6.625 10H5.875C5.66789 10 5.5 10.1679 5.5 10.375V11.125C5.5 11.3321 5.66789 11.5 5.875 11.5H6.625C6.83211 11.5 7 11.3321 7 11.125V10.375C7 10.1679 6.83211 10 6.625 10Z"
                      fill="url(#paint1_linear_3962_28060)"
                    />
                    <path
                      d="M6.625 13H5.875C5.66789 13 5.5 13.1679 5.5 13.375V14.125C5.5 14.3321 5.66789 14.5 5.875 14.5H6.625C6.83211 14.5 7 14.3321 7 14.125V13.375C7 13.1679 6.83211 13 6.625 13Z"
                      fill="url(#paint2_linear_3962_28060)"
                    />
                    <path
                      d="M10.375 10H9.625C9.41789 10 9.25 10.1679 9.25 10.375V11.125C9.25 11.3321 9.41789 11.5 9.625 11.5H10.375C10.5821 11.5 10.75 11.3321 10.75 11.125V10.375C10.75 10.1679 10.5821 10 10.375 10Z"
                      fill="url(#paint3_linear_3962_28060)"
                    />
                    <path
                      d="M10.375 13H9.625C9.41789 13 9.25 13.1679 9.25 13.375V14.125C9.25 14.3321 9.41789 14.5 9.625 14.5H10.375C10.5821 14.5 10.75 14.3321 10.75 14.125V13.375C10.75 13.1679 10.5821 13 10.375 13Z"
                      fill="url(#paint4_linear_3962_28060)"
                    />
                    <path
                      d="M14.125 10H13.375C13.1679 10 13 10.1679 13 10.375V11.125C13 11.3321 13.1679 11.5 13.375 11.5H14.125C14.3321 11.5 14.5 11.3321 14.5 11.125V10.375C14.5 10.1679 14.3321 10 14.125 10Z"
                      fill="url(#paint5_linear_3962_28060)"
                    />
                    <path
                      d="M14.125 13H13.375C13.1679 13 13 13.1679 13 13.375V14.125C13 14.3321 13.1679 14.5 13.375 14.5H14.125C14.3321 14.5 14.5 14.3321 14.5 14.125V13.375C14.5 13.1679 14.3321 13 14.125 13Z"
                      fill="url(#paint6_linear_3962_28060)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_3962_28060"
                        x1="1.92308"
                        y1="12.0745"
                        x2="18.0049"
                        y2="12.0771"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-lg font-normal text-neutral-400 font-Lato text-nowrap">
                    {/* {formatDate(sessionData?.dateTime)} */}
                    {sessionData?.dateTime
                      ? new Date(sessionData?.dateTime)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.0001 18.3346C8.35191 18.3346 6.74074 17.8459 5.37033 16.9302C3.99992 16.0145 2.93182 14.7131 2.30109 13.1903C1.67036 11.6676 1.50533 9.99206 1.82687 8.37555C2.14842 6.75905 2.94209 5.27419 4.10753 4.10875C5.27297 2.94331 6.75782 2.14964 8.37433 1.8281C9.99084 1.50655 11.6664 1.67158 13.1891 2.30231C14.7118 2.93304 16.0133 4.00114 16.929 5.37155C17.8447 6.74196 18.3334 8.35313 18.3334 10.0013C18.331 12.2107 17.4522 14.3289 15.89 15.8912C14.3277 17.4535 12.2095 18.3322 10.0001 18.3346ZM10.0001 3.33464C8.68154 3.33464 7.39261 3.72563 6.29628 4.45818C5.19996 5.19072 4.34547 6.23191 3.84089 7.45008C3.3363 8.66826 3.20428 10.0087 3.46152 11.3019C3.71875 12.5951 4.35369 13.783 5.28604 14.7154C6.21839 15.6477 7.40628 16.2826 8.69948 16.5399C9.99269 16.7971 11.3331 16.6651 12.5513 16.1605C13.7695 15.6559 14.8107 14.8014 15.5432 13.7051C16.2758 12.6088 16.6668 11.3198 16.6668 10.0013C16.6648 8.23381 15.9617 6.53927 14.7119 5.28945C13.4621 4.03964 11.7676 3.33662 10.0001 3.33464Z"
                      fill="url(#paint0_linear_3962_28063)"
                    />
                    <path
                      d="M10.0001 10.8346C9.77907 10.8346 9.56711 10.7468 9.41083 10.5906C9.25455 10.4343 9.16675 10.2223 9.16675 10.0013V6.66797C9.16675 6.44696 9.25455 6.235 9.41083 6.07872C9.56711 5.92244 9.77907 5.83464 10.0001 5.83464C10.2211 5.83464 10.4331 5.92244 10.5893 6.07872C10.7456 6.235 10.8334 6.44696 10.8334 6.66797V10.0013C10.8334 10.2223 10.7456 10.4343 10.5893 10.5906C10.4331 10.7468 10.2211 10.8346 10.0001 10.8346Z"
                      fill="url(#paint1_linear_3962_28063)"
                    />
                    <path
                      d="M12.7293 13.5638C12.5083 13.5638 12.2963 13.4759 12.1401 13.3196L9.41083 10.5906C9.25903 10.4334 9.17513 10.2228 9.17702 10.0043C9.17892 9.78581 9.26656 9.5768 9.42107 9.42229C9.57558 9.26778 9.78459 9.18014 10.0031 9.17824C10.2216 9.17635 10.4321 9.26034 10.5893 9.41214L13.3184 12.1413C13.4349 12.2578 13.5143 12.4063 13.5464 12.5679C13.5785 12.7296 13.562 12.8971 13.499 13.0494C13.4359 13.2016 13.3291 13.3317 13.1921 13.4233C13.0551 13.5149 12.894 13.5638 12.7293 13.5638Z"
                      fill="url(#paint2_linear_3962_28063)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3962_28063"
                        x1="1.02572"
                        y1="12.3063"
                        x2="18.8944"
                        y2="12.3092"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_3962_28063"
                        x1="1.02572"
                        y1="12.3063"
                        x2="18.8944"
                        y2="12.3092"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_3962_28063"
                        x1="1.02572"
                        y1="12.3063"
                        x2="18.8944"
                        y2="12.3092"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-lg font-normal text-neutral-400 text-nowrap font-Lato">
                    {sessionData?.timeSlot
                      ? formatTimeSlot(sessionData.timeSlot)
                      : "7:00 - 8:00 AM"}
                  </p>
                  {bookingsDetails?.seat == 1 ? (
                    <></>
                  ) : (
                    <></>
                    // <div className="flex items-center gap-1 ml-2 mq450:absolute mq450:top-[1100px] mq450:left-5">
                    //   <svg
                    //     xmlns="http://www.w3.org/2000/svg"
                    //     width="20"
                    //     height="21"
                    //     viewBox="0 0 20 21"
                    //     fill="none"
                    //   >
                    //     <path
                    //       d="M9.99999 10.9399C11.3807 10.9399 12.5 9.76173 12.5 8.30835C12.5 6.85498 11.3807 5.67678 9.99999 5.67678C8.61928 5.67678 7.49999 6.85498 7.49999 8.30835C7.49999 9.76173 8.61928 10.9399 9.99999 10.9399Z"
                    //       fill="url(#paint0_linear_11257_18131)"
                    //     />
                    //     <path
                    //       d="M9.16666 13.5715H10.8333C11.7174 13.5715 12.5652 13.9412 13.1903 14.5992C13.8155 15.2572 14.1667 16.1497 14.1667 17.0803V18.8346H5.83332V17.0803C5.83332 16.1497 6.18451 15.2572 6.80963 14.5992C7.43475 13.9412 8.2826 13.5715 9.16666 13.5715Z"
                    //       fill="url(#paint1_linear_11257_18131)"
                    //     />
                    //     <path
                    //       d="M12.5 8.30835C12.4994 7.68818 12.2903 7.08823 11.9097 6.61477C11.5292 6.14131 11.0018 5.82488 10.4208 5.72152"
                    //       fill="url(#paint2_linear_11257_18131)"
                    //     />
                    //     <path
                    //       d="M13.75 2.16802C13.1513 2.16995 12.5641 2.34215 12.0507 2.6664C11.5373 2.99066 11.1167 3.45493 10.8333 4.01012C11.7739 4.21356 12.619 4.75219 13.2262 5.53518C13.8335 6.31816 14.1656 7.29761 14.1667 8.30835C14.1653 8.59126 14.1374 8.87333 14.0833 9.15046C14.9354 9.06511 15.7234 8.63708 16.2831 7.95549C16.8429 7.27391 17.1314 6.39131 17.0884 5.49147C17.0454 4.59163 16.6744 3.74391 16.0525 3.12483C15.4307 2.50575 14.6059 2.16303 13.75 2.16802Z"
                    //       fill="url(#paint3_linear_11257_18131)"
                    //     />
                    //     <path
                    //       d="M7.80499 12.0206C7.09373 11.5517 6.53167 10.87 6.19082 10.0627H5.83332C4.72866 10.0641 3.66962 10.5267 2.88851 11.3489C2.10739 12.1711 1.66798 13.2859 1.66666 14.4487V16.2031C1.66666 16.4357 1.75445 16.6588 1.91073 16.8233C2.06701 16.9878 2.27898 17.0803 2.49999 17.0803H4.16666C4.16856 15.9353 4.52468 14.8222 5.18114 13.9093C5.8376 12.9964 6.75867 12.3334 7.80499 12.0206Z"
                    //       fill="url(#paint4_linear_11257_18131)"
                    //     />
                    //     <path
                    //       d="M14.1667 10.0627H13.8092C13.4683 10.87 12.9062 11.5517 12.195 12.0206C13.2413 12.3334 14.1624 12.9964 14.8188 13.9093C15.4753 14.8222 15.8314 15.9353 15.8333 17.0803H17.5C17.721 17.0803 17.933 16.9878 18.0892 16.8233C18.2455 16.6588 18.3333 16.4357 18.3333 16.2031V14.4487C18.332 13.2859 17.8926 12.1711 17.1115 11.3489C16.3304 10.5267 15.2713 10.0641 14.1667 10.0627Z"
                    //       fill="url(#paint5_linear_11257_18131)"
                    //     />
                    //     <path
                    //       d="M5.83332 8.30836C5.83438 7.29761 6.16652 6.31817 6.77374 5.53518C7.38095 4.75219 8.2261 4.21357 9.16666 4.01013C8.89459 3.47837 8.49636 3.02981 8.01074 2.70813C7.52511 2.38645 6.96864 2.20259 6.39548 2.17446C5.82233 2.14632 5.25202 2.27488 4.74006 2.5476C4.22811 2.82032 3.79196 3.22792 3.47406 3.73072C3.15616 4.23352 2.96735 4.81439 2.926 5.4168C2.88465 6.0192 2.99217 6.62262 3.2381 7.1683C3.48404 7.71398 3.86 8.18335 4.32939 8.5307C4.79878 8.87806 5.34561 9.09157 5.91666 9.15046C5.86262 8.87333 5.83471 8.59126 5.83332 8.30836Z"
                    //       fill="url(#paint6_linear_11257_18131)"
                    //     />
                    //     <defs>
                    //       <linearGradient
                    //         id="paint0_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //       <linearGradient
                    //         id="paint1_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //       <linearGradient
                    //         id="paint2_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //       <linearGradient
                    //         id="paint3_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //       <linearGradient
                    //         id="paint4_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //       <linearGradient
                    //         id="paint5_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //       <linearGradient
                    //         id="paint6_linear_11257_18131"
                    //         x1="1.02563"
                    //         y1="12.8063"
                    //         x2="18.8943"
                    //         y2="12.8092"
                    //         gradientUnits="userSpaceOnUse"
                    //       >
                    //         <stop stopColor="#F43F5E" />
                    //         <stop offset="1" stopColor="#FB923C" />
                    //       </linearGradient>
                    //     </defs>
                    //   </svg>
                    //   <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                    //     Group session
                    //   </p>
                    // </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleRebookClick}
                className=" text-nowrap hover:bg-gradient-to-r from-rose-500 to-orange-400 mt-10 h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center gap-2 inline-flex"
              >
                Rebook
              </button>
            </div>
          </div>
          <div className=" flex flex-col  mb-[235px] md:mb-[100px]">
            <form onSubmit={handleInvite}>
              <div className="flex md:flex-row flex-col justify-center items-start gap-[20px] mt-[40px] mb-[100px] md:mb-[40px] ">
                <section className="flex">
                  <div className="invite-div h-full w-[340px] md:w-[1024px] px-5 md:px-10 py-6 md:py-6">
                    <div className="flex items-center gap-4 mb-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[24px] md:w-[32px] h-[24px] md:h-[32px]"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M11.3327 15.2995C10.146 15.2995 8.98596 14.9291 7.99926 14.2351C7.01257 13.5412 6.24353 12.5548 5.78941 11.4007C5.33528 10.2466 5.21646 8.97675 5.44797 7.75161C5.67948 6.52647 6.25093 5.4011 7.09004 4.51782C7.92916 3.63454 8.99825 3.03302 10.1621 2.78933C11.326 2.54563 12.5324 2.67071 13.6288 3.14873C14.7251 3.62676 15.6622 4.43627 16.3215 5.4749C16.9808 6.51352 17.3327 7.73462 17.3327 8.98376C17.3309 10.6582 16.6982 12.2636 15.5734 13.4476C14.4485 14.6317 12.9234 15.2977 11.3327 15.2995ZM11.3327 5.47499C10.6734 5.47499 10.0289 5.68077 9.48078 6.06632C8.93262 6.45187 8.50538 6.99987 8.25308 7.64101C8.00079 8.28216 7.93478 8.98765 8.0634 9.66829C8.19202 10.3489 8.50948 10.9741 8.97566 11.4648C9.44183 11.9555 10.0358 12.2897 10.6824 12.4251C11.329 12.5605 11.9992 12.491 12.6083 12.2254C13.2174 11.9599 13.738 11.5101 14.1042 10.9331C14.4705 10.3561 14.666 9.67773 14.666 8.98376C14.666 8.05318 14.3148 7.16071 13.6897 6.50268C13.0646 5.84466 12.2167 5.47499 11.3327 5.47499Z"
                          fill="white"
                        />
                        <path
                          d="M18.666 29.3346H3.99935C3.64573 29.3346 3.30659 29.1868 3.05654 28.9236C2.80649 28.6604 2.66602 28.3034 2.66602 27.9311V23.7206C2.66813 21.8601 3.37119 20.0765 4.62098 18.7609C5.87076 17.4453 7.56522 16.7053 9.33268 16.7031H13.3327C15.1001 16.7053 16.7946 17.4453 18.0444 18.7609C19.2942 20.0765 19.9972 21.8601 19.9993 23.7206V27.9311C19.9993 28.3034 19.8589 28.6604 19.6088 28.9236C19.3588 29.1868 19.0196 29.3346 18.666 29.3346ZM5.33268 26.5276H17.3327V23.7206C17.3327 22.6039 16.9113 21.5329 16.1611 20.7433C15.411 19.9537 14.3935 19.5101 13.3327 19.5101H9.33268C8.27182 19.5101 7.2544 19.9537 6.50426 20.7433C5.75411 21.5329 5.33268 22.6039 5.33268 23.7206V26.5276Z"
                          fill="white"
                        />
                        <path
                          d="M27.9993 12.4925H25.3327V9.68551C25.3327 9.31328 25.1922 8.95629 24.9422 8.69308C24.6921 8.42988 24.353 8.28201 23.9993 8.28201C23.6457 8.28201 23.3066 8.42988 23.0565 8.69308C22.8065 8.95629 22.666 9.31328 22.666 9.68551V12.4925H19.9993C19.6457 12.4925 19.3066 12.6404 19.0565 12.9036C18.8065 13.1668 18.666 13.5238 18.666 13.896C18.666 14.2683 18.8065 14.6253 19.0565 14.8885C19.3066 15.1517 19.6457 15.2995 19.9993 15.2995H22.666V18.1066C22.666 18.4788 22.8065 18.8358 23.0565 19.099C23.3066 19.3622 23.6457 19.5101 23.9993 19.5101C24.353 19.5101 24.6921 19.3622 24.9422 19.099C25.1922 18.8358 25.3327 18.4788 25.3327 18.1066V15.2995H27.9993C28.353 15.2995 28.6921 15.1517 28.9422 14.8885C29.1922 14.6253 29.3327 14.2683 29.3327 13.896C29.3327 13.5238 29.1922 13.1668 28.9422 12.9036C28.6921 12.6404 28.353 12.4925 27.9993 12.4925Z"
                          fill="white"
                        />
                      </svg>
                      <span className="text-[24px] md:text-[32px] text-[#FFFFFF] font-bold leading-normal">
                        Lets Invite your Friend
                      </span>
                    </div>
                    <div className="items-end hidden w-full gap-4 md:flex">
                      <div className="w-[781px]">
                        <Label
                          htmlFor="email"
                          className="text-[#FFFFFF] text-[18px] md:text-[20px] font-normal leading-normal"
                        >
                          Invite additional team members by email
                        </Label>
                        <Input
                          type="email"
                          disabled={true}
                          value={email ?? ""}
                          id="email"
                          placeholder="Email"
                          className="bg-[#404040] text-[#FFFFFF] border-solid border-[1px] border-[#737373] mt-4"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button
                        // onClick={addFriend}
                        className="seatButton cursor-not-allowed w-[112px]"
                      >
                        + Add
                      </Button>
                    </div>
                    <div className="items-end hidden w-full gap-4 mt-4 md:flex">
                      <div className="w-[781px] h-full text-[14px] text-[#A3A3A3] font-normal leading-normal pb-3">
                        {invitees && invitees.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {invitees.map((invitee) => (
                              <span
                                className="flex justify-center items-center gap-1 h-[40px] border-solid border-[1px] border-[#404040] rounded-[8px]"
                                key={invitee}
                              >
                                <span className="text-[#A3A3A3] text-[12px] font-normal leading-[15px]">
                                  {invitee}
                                </span>
                                <span onClick={() => removeFriend(invitee)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M8.59796 7.65334L8.2444 8.00689L8.59796 8.36044L12.1225 11.885C12.1516 11.9162 12.1677 11.9574 12.1673 12.0001C12.1669 12.0438 12.1494 12.0856 12.1185 12.1165L12.4721 12.4701L12.1185 12.1166C12.0876 12.1475 12.0458 12.165 12.0021 12.1654C11.9594 12.1657 11.9182 12.1497 11.887 12.1206L8.3624 8.596L8.00884 8.24245L7.65529 8.596L4.12662 12.1247L4.12657 12.1246L4.12053 12.1309C4.10516 12.1468 4.08677 12.1595 4.06644 12.1682C4.0461 12.177 4.02423 12.1816 4.0021 12.1817C3.97997 12.1819 3.95802 12.1777 3.93754 12.1693C3.91706 12.161 3.89845 12.1486 3.8828 12.1329L3.52972 12.486L3.8828 12.1329C3.86715 12.1173 3.85478 12.0987 3.8464 12.0782C3.83802 12.0577 3.8338 12.0358 3.83399 12.0136C3.83418 11.9915 3.83878 11.9696 3.84752 11.9493C3.85625 11.929 3.86895 11.9106 3.88487 11.8952L3.88492 11.8953L3.89106 11.8891L7.41973 8.36044L7.77328 8.00689L7.41973 7.65334L3.89516 4.12876C3.86606 4.09757 3.85 4.05637 3.85037 4.01363C3.85075 3.96993 3.86828 3.92813 3.89918 3.89723C3.93009 3.86633 3.97189 3.8488 4.01559 3.84842C4.05832 3.84805 4.09952 3.86411 4.13072 3.8932L7.65529 7.41778L8.00884 7.77133L8.3624 7.41778L11.8911 3.88911L11.8911 3.88916L11.8972 3.88291C11.9125 3.86699 11.9309 3.8543 11.9513 3.84556C11.9716 3.83683 11.9935 3.83223 12.0156 3.83204C12.0377 3.83185 12.0597 3.83606 12.0801 3.84444C12.1006 3.85282 12.1192 3.8652 12.1349 3.88084L12.488 3.52777L12.1349 3.88085C12.1505 3.8965 12.1629 3.91511 12.1713 3.93559C12.1797 3.95607 12.1839 3.97802 12.1837 4.00014C12.1835 4.02227 12.1789 4.04414 12.1702 4.06448C12.1614 4.08482 12.1487 4.10321 12.1328 4.11858L12.1328 4.11852L12.1266 4.12467L8.59796 7.65334Z"
                                      fill="#A3A3A3"
                                      stroke="#A3A3A3"
                                    />
                                  </svg>
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span>
                            You Have select only five seat so you can also add
                            only as per your requirement
                          </span>
                        )}
                      </div>
                      {/* <Button className="seatButton cursor-not-allowed w-[112px] h-[35px]">
                        + Seat
                      </Button> */}
                    </div>
                    {err ? (
                      <p className="hidden md:flex gap-2 text-[12px] text-[#EF4444] font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                            fill="#EF4444"
                          />
                        </svg>
                        {err}
                      </p>
                    ) : (
                      ""
                    )}

                    {/* this is only for mobile design start*/}
                    <div className="w-full md:hidden">
                      <div className="w-full gap-4 ">
                        <Label
                          htmlFor="email"
                          className="text-[#FFFFFF] text-[18px] md:text-[20px] font-normal leading-normal"
                        >
                          Invite additional team members by email
                        </Label>
                        <Input
                          type="email"
                          value={email ?? ""}
                          id="email"
                          placeholder="Email"
                          className="bg-[#404040] text-[#FFFFFF] border-solid border-[1px] border-[#737373] mt-4"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-3 mt-2">
                        <Button
                          // onClick={addFriend}
                          className="seatButton cursor-not-allowed w-[112px]"
                        >
                          + Add
                        </Button>
                        {/* <Button className="seatButton cursor-not-allowed w-[112px]">
                          + Seat
                        </Button> */}
                      </div>
                      {invitees && invitees.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {invitees.map((invitee) => (
                            <span
                              className="flex justify-center items-center gap-1 h-[21px] p-[1.5px] border-solid border-[1px] border-[#404040] rounded-[8px]"
                              key={invitee}
                            >
                              <span className="text-[#A3A3A3] text-[10px] md:text-[12px] font-normal leading-[15px]">
                                {invitee}
                              </span>
                              <span onClick={() => removeFriend(invitee)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M8.59796 7.65334L8.2444 8.00689L8.59796 8.36044L12.1225 11.885C12.1516 11.9162 12.1677 11.9574 12.1673 12.0001C12.1669 12.0438 12.1494 12.0856 12.1185 12.1165L12.4721 12.4701L12.1185 12.1166C12.0876 12.1475 12.0458 12.165 12.0021 12.1654C11.9594 12.1657 11.9182 12.1497 11.887 12.1206L8.3624 8.596L8.00884 8.24245L7.65529 8.596L4.12662 12.1247L4.12657 12.1246L4.12053 12.1309C4.10516 12.1468 4.08677 12.1595 4.06644 12.1682C4.0461 12.177 4.02423 12.1816 4.0021 12.1817C3.97997 12.1819 3.95802 12.1777 3.93754 12.1693C3.91706 12.161 3.89845 12.1486 3.8828 12.1329L3.52972 12.486L3.8828 12.1329C3.86715 12.1173 3.85478 12.0987 3.8464 12.0782C3.83802 12.0577 3.8338 12.0358 3.83399 12.0136C3.83418 11.9915 3.83878 11.9696 3.84752 11.9493C3.85625 11.929 3.86895 11.9106 3.88487 11.8952L3.88492 11.8953L3.89106 11.8891L7.41973 8.36044L7.77328 8.00689L7.41973 7.65334L3.89516 4.12876C3.86606 4.09757 3.85 4.05637 3.85037 4.01363C3.85075 3.96993 3.86828 3.92813 3.89918 3.89723C3.93009 3.86633 3.97189 3.8488 4.01559 3.84842C4.05832 3.84805 4.09952 3.86411 4.13072 3.8932L7.65529 7.41778L8.00884 7.77133L8.3624 7.41778L11.8911 3.88911L11.8911 3.88916L11.8972 3.88291C11.9125 3.86699 11.9309 3.8543 11.9513 3.84556C11.9716 3.83683 11.9935 3.83223 12.0156 3.83204C12.0377 3.83185 12.0597 3.83606 12.0801 3.84444C12.1006 3.85282 12.1192 3.8652 12.1349 3.88084L12.488 3.52777L12.1349 3.88085C12.1505 3.8965 12.1629 3.91511 12.1713 3.93559C12.1797 3.95607 12.1839 3.97802 12.1837 4.00014C12.1835 4.02227 12.1789 4.04414 12.1702 4.06448C12.1614 4.08482 12.1487 4.10321 12.1328 4.11858L12.1328 4.11852L12.1266 4.12467L8.59796 7.65334Z"
                                    fill="#A3A3A3"
                                    stroke="#A3A3A3"
                                  />
                                </svg>
                              </span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#A3A3A3] font-normal leading-normal pb-3 mt-2">
                          You Have select only five seat so you can also add
                          only as per your requirement
                        </span>
                      )}
                    </div>
                    {err ? (
                      <p className="md:hidden flex  gap-2 text-[12px] text-[#EF4444] font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                            fill="#EF4444"
                          />
                        </svg>
                        {err}
                      </p>
                    ) : (
                      ""
                    )}

                    {/* this is only for mobile design end*/}

                    <div>
                      <div className="flex w-full justify-start my-[30px]">
                        <div className="flex-1 text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                          Name
                        </div>
                        <div className="flex-1 text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                          Email
                        </div>
                      </div>
                      {/* <div className="flex justify-start w-full">
                        <div className="flex-1 text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                          Zoffi Khan (You)
                        </div>
                        <div className="flex-1 flex justify-start items-center gap-[110px]">
                          <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                            afprlosreifviz@dropmail.me
                          </span>
                          <span className="hidden md:flex justify-center items-center verified-bg w-[70px]">
                            <span className="text-[14px] text-[#15803D] font-medium leading-normal">
                              Verified
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M7 12.25C5.96165 12.25 4.94662 11.9421 4.08326 11.3652C3.2199 10.7883 2.54699 9.9684 2.14963 9.00909C1.75227 8.04978 1.64831 6.99418 1.85088 5.97578C2.05345 4.95738 2.55347 4.02192 3.28769 3.28769C4.02192 2.55347 4.95738 2.05345 5.97578 1.85088C6.99418 1.64831 8.04978 1.75227 9.00909 2.14963C9.9684 2.54699 10.7883 3.2199 11.3652 4.08326C11.9421 4.94662 12.25 5.96165 12.25 7C12.2485 8.39192 11.6949 9.72639 10.7106 10.7106C9.72639 11.6949 8.39192 12.2485 7 12.25ZM7 2.8C6.16932 2.8 5.35729 3.04633 4.66661 3.50783C3.97592 3.96933 3.4376 4.62528 3.11971 5.39273C2.80182 6.16018 2.71865 7.00466 2.8807 7.81938C3.04276 8.6341 3.44277 9.38247 4.03015 9.96985C4.61753 10.5572 5.3659 10.9572 6.18062 11.1193C6.99534 11.2814 7.83982 11.1982 8.60727 10.8803C9.37472 10.5624 10.0307 10.0241 10.4922 9.3334C10.9537 8.64271 11.2 7.83068 11.2 7C11.1987 5.88648 10.7558 4.81892 9.96847 4.03153C9.18109 3.24415 8.11353 2.80125 7 2.8Z"
                                fill="#15803D"
                              />
                              <path
                                d="M6.475 8.575C6.33577 8.57497 6.20226 8.51964 6.10383 8.42118L5.05383 7.37118C4.95819 7.27216 4.90528 7.13954 4.90647 7.00189C4.90767 6.86424 4.96288 6.73256 5.06022 6.63522C5.15756 6.53788 5.28924 6.48267 5.42689 6.48147C5.56454 6.48028 5.69716 6.53319 5.79618 6.62883L6.475 7.30765L8.20383 5.57883C8.30284 5.48319 8.43546 5.43028 8.57311 5.43147C8.71076 5.43267 8.84244 5.48788 8.93978 5.58522C9.03712 5.68256 9.09233 5.81424 9.09353 5.95189C9.09473 6.08954 9.04181 6.22216 8.94618 6.32118L6.84618 8.42118C6.74774 8.51964 6.61423 8.57497 6.475 8.575Z"
                                fill="#15803D"
                              />
                            </svg>
                          </span>
                        </div>
                      </div> */}
                      {sessionData?.participantEmail &&
                        sessionData?.participantEmail.map(
                          (email: string, index: number) => (
                            <div
                              key={email}
                              className="flex items-center w-full mb-4"
                            >
                              <div className="grid grid-cols-[425px_1fr_48px] mq450:grid-cols-[85px_1fr_18px] w-full items-center gap-4 mq450:gap-2">
                                <div className="flex items-center mq450:flex-wrap mq450:items-start">
                                  <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                    {sessionData.participantNames[index]
                                      ? sessionData.participantNames[index]
                                      : "------------"}
                                  </span>
                                  {sessionData.participantNames[index] ? (
                                    <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0 verified-bg text-[#15803D] font-medium leading-normal">
                                      Verified
                                    </span>
                                  ) : (
                                    <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0 verified-bg text-yellow-300 font-medium leading-normal">
                                      Invited
                                    </span>
                                  )}{" "}
                                </div>

                                <span className="text-[14px] mq450:W-[20px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                  {email}
                                </span>

                                <div
                                  // onClick={() =>
                                  //   setActionPopup({
                                  //     isOpen: true,
                                  //     email,
                                  //     index,
                                  //   })
                                  // }
                                  className="h-8 w-8 p-1 cursor-not-allowed bg-[#3f3f3f] rounded-[999px] flex items-center justify-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              {/* {actionPopup.isOpen &&
                                      actionPopup.email === email && (
                                        <OnActionButton
                                          email={email}
                                          index={index}
                                        />
                                      )} */}
                            </div>
                          ),
                        )}
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
