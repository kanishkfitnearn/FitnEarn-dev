"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UserNavbar from "@/app/Components/UserNavbar";
import Link from "next/link";
import Popup from "@/app/Components/Popup";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ReceiptPoundSterling } from "lucide-react";
import { useRouter } from "next/navigation";
import CancellationModal from "@/app/Components/CancellationModal";
import axios from "axios";

const Page = ({ params }: any) => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showJoinButton, setShowJoinButton] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [bookingId, setBookingId] = useState();
  const { toast } = useToast();
  const router = useRouter();
  const [coachImg, setCoachImg] = useState<any>(null);
  const [coachLvl, setCoachLvl] = useState<any>(null);
  const [bookingsDetails, setBookingsDetails] = useState<any>(null);
  const [showPolicyPopup, setShowPolicyPopup] = useState(false);

  const formatTimeSlot = (timeSlot: any) => {
    const [start, end] = timeSlot.split("-");
    const formattedStart = start.replace(/^0/, "").replace(/AM|PM/, "");
    const period = start.includes("AM") ? "AM" : "PM";
    const formattedEnd = end.replace(/^0/, "").replace(/AM|PM/, "");
    return `${formattedStart} - ${formattedEnd} ${period}`;
  };
  const userId = Cookies.get("user_id");
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
        setCoachImg(data.data.coachData.coachProfile);
        setCoachLvl(data.data.coachData.coachLevel);
        setBookingsDetails(data);
setBookingId(data.data.bookingDetails[0].bookingId);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        //console.log("error to fetch the session details");
      }
    };

    fetchSessionData();
  }, []);
  console.log();
  console.log(sessionData);
  console.log(sessionData?.coachName);
  console.log(sessionData);
  console.log(bookingsDetails);
  console.log(bookingId);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    // Function to get ordinal suffix for the day
    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return "th"; // covers 11th to 19th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const day = date.getDate(); // Get day
    const month = date.toLocaleString("en-US", { month: "short" }); // Get abbreviated month name, e.g., "Oct"
    const year = date.getFullYear(); // Get full year

    // Add the ordinal suffix to the day
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };
  const formatDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so add 1)
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

    return `${day}-${month}-${year}`; // Return the date in DD-MM-YY format
  };

  function SkeletonCard() {
    return (
      <div className="p-6 border shadow bg-neutral-800 rounded-2xl border-neutral-700 animate-pulse w-[1100px] mq450:w-[320px]">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full h-64 md:w-1/3 bg-neutral-700 rounded-xl"></div>
          <div className="w-full space-y-4 md:w-2/3">
            <div className="w-3/4 h-8 rounded bg-neutral-700"></div>
            <div className="w-1/2 h-6 rounded bg-neutral-700"></div>
            <div className="flex gap-4">
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
            </div>
            <div className="w-1/3 h-6 rounded bg-neutral-700"></div>
            <div className="flex gap-4">
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="w-1/4 h-10 rounded bg-neutral-700"></div>
              <div className="w-1/4 h-10 rounded bg-neutral-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const formatTime = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancelSession = async () => {
    const userId = Cookies.get("user_id");
    const sessionId = params.id;

    if (!userId || !sessionId) {
      // User ID or Session ID is missing
      return;
    }

    // Determine which API endpoint to use based on sessionType
    const apiendpoint =
      sessionData?.sessionType === "private"
        ? `${apiEndpoint}/api/fitnearn/web/users/session/private/cancel`
        : `${apiEndpoint}/api/fitnearn/web/users/session/public/cancel`;

    try {
      // Step 1: Cancel the session
      const cancelResponse = await fetch(apiendpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          sessionId: sessionId,
        }),
      });

      if (!cancelResponse.ok) {
        throw new Error("Failed to cancel session");
      }

      const cancelResult = await cancelResponse.json();

      // Display cancellation success message
      toast({
        title: "Canceled.",
        description: "Session Booking Cancelled Successfully!",
        duration: 3000, // 3 seconds
      });

      // Step 2: Trigger Razorpay refund API
      const refundApiEndpoint = `${apiEndpoint}/api/fitnearn/web/razorpay/refund/${bookingId}`;

      const refundResponse = await fetch(refundApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const refundResult = await refundResponse.json();

      if (refundResponse.ok && refundResult.success) {
        // Display refund success message
        toast({
          title: "Refund has been initiated",
          description: "Process could take 3 business days",
          duration: 3000, // 3 seconds
        });
      } else {
        throw new Error(refundResult.message || "Refund failed");
      }

      // Redirect to upcoming bookings page
      router.push("/my_bookings/upcoming_bookings");
      setShowPopup(false);
    } catch (error: any) {
      console.error("Error during cancellation or refund:", error.message);

      // Handle error (e.g., show an error message)
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        duration: 3000, // 3 seconds
      });
    }
  };
  async function checkSessionStatus(sessionId: string) {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/session/meetlink/${sessionId}`,
        {
          method: "PATCH",
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking session status:", error);
      return { success: false, message: "Error checking session status" };
    }
  }

  useEffect(() => {
    const checkSessionTime = () => {
      try {
        const now = new Date();
        const sessionDate = new Date(sessionData?.dateTime);

        // Extract start time from timeSlot safely
        const timeSlot = sessionData?.startTime || "";
        const startTimeMatch = timeSlot.match(/(\d{2}:\d{2})(AM|PM)/);

        if (!startTimeMatch) {
          //console.error("Invalid time slot format");
          return;
        }

        const timeStr = startTimeMatch[1]; // "04:00"
        const period = startTimeMatch[2]; // "PM"

        // Parse hours and minutes
        const [hoursStr, minutesStr] = timeStr.split(":");
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        // Convert to 24-hour format
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        // Set session date hours and minutes
        sessionDate.setHours(hours);
        sessionDate.setMinutes(minutes);

        // Calculate time window for joining (15 minutes before session)
        const joinWindowStart = new Date(sessionDate);
        joinWindowStart.setMinutes(joinWindowStart.getMinutes() - 15);

        // Calculate session end time (1 hour after start)
        const sessionEnd = new Date(sessionDate);
        sessionEnd.setHours(sessionEnd.getHours() + 1);

        // Show join button if current time is within the join window
        setShowJoinButton(now >= joinWindowStart && now <= sessionEnd);
      } catch (error) {
        //console.error("Error checking session time:", error);
        setShowJoinButton(false);
      }
    };

    // Initial check
    checkSessionTime();

    // Update every minute
    const interval = setInterval(checkSessionTime, 60000);

    return () => clearInterval(interval);
  }, [sessionData]);
  // console.log(sessionData)

  const handleJoinSession = async () => {
    if (!params.id) {
      toast({
        title: "Error",
        description: "Session ID is missing",
        duration: 3000,
      });
      return;
    }

    const { success, message } = await checkSessionStatus(params.id);

    if (success) {
      window.open(sessionData?.meetLink, "_blank");
    } else {
      toast({
        title: "Refund initiated",
        description: message || "The session link is not available.",
        duration: 3000,
      });
    }
  };
  const handleRefundEligibility = async () => {
    try {
      // Check refund eligibility
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/session/refund/${params.id}`,
      );

      if (response.data.success) {
        // User is eligible for a refund
        setPopupMessage("Session amount will be refunded.");
        console.log(response.data.message);
        try {
          // Call Razorpay refund API
          const razorpayResponse = await axios.post(
            `${apiEndpoint}/api/fitnearn/web/razorpay/refund/${params.id}`,
          );

          if (razorpayResponse.data.success) {
            // Refund successfully initiated
            setPopupMessage("Refund initiated successfully.");
          } else {
            // Handle Razorpay API failure messages
            setPopupMessage(razorpayResponse.data.message || "Refund failed.");
          }
        } catch (razorpayError) {
          // Handle Razorpay API error
          setPopupMessage(
            response?.data?.message ||
              "An error occurred while processing the refund.",
          );
        }
      } else {
        // User is not eligible for a refund
        setPopupMessage("You are not eligible for a refund.");
      }

      setShowPopup(true); // Show popup with the appropriate message
    } catch (error) {
      // Handle errors from the refund eligibility API
      setPopupMessage("You are not eligible for a refund.");
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="relative mq450:static ">
        <CancellationModal
          isOpen={showPolicyPopup}
          onClose={() => {
            setShowPolicyPopup(false);
            setShowPopup(true);
          }}
        />

        {showPopup && (
          <Popup
            p1="Cancel Session?"
            p2={popupMessage}
            p3="Terms and Conditions."
            confirm={handleCancelSession}
            p3button={() => {
              setShowPolicyPopup(true);
              setShowPopup(false);
            }}
            cancel={() => setShowPopup(false)}
          />
        )}

        <UserNavbar activelive={true} liveactivecolor="neutral-700" />
        <div className="absolute ml-12 mq450:left-[9px] mq450:overflow-y-auto mq450:h-[900px] text-white mq1 mq450:justify-center mq450:ml-2 top-28 left-44 mq450:left-0 mq450:mt-14 w-fit mq1050:ml-2">
          <Link href="/live_session/upcoming_session">
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
          <div>
            <p
              style={{ textAlign: "left" }}
              className="flex flex-col justify-start py-5 pl-2 text-4xl font-bold text-left text-center capitaliz text-neutral-300 font-Lato"
            >
              Session Details
            </p>
            <p
              style={{ textAlign: "left" }}
              className="py-2 pl-2 text-lg font-normal text-left text-white capitalize font-Lato"
            >
              Booked on{" "}
              {bookingsDetails &&
              bookingsDetails.length > 0 &&
              bookingsDetails[0].payment_date
                ? bookingsDetails[0].payment_date
                : formatDate(sessionData?.createdAt)}
            </p>

            {/* <div className="w-[1024px] mq450:w-[328px] mx-auto mq450:pl-8 mq450:h-[310px] mq450:flex-col mq450:gap-5 mq1050:w-[800px] h-[147px] pl-[58px] pr-[57px] py-7 flex  bg-neutral-800 rounded-2xl shadow border border-neutral-700 mq1240:gap-[170px]  gap-[239px] ">
              <div>
                <p className="text-xl font-extrabold text-nowrap">Booking Id</p>
                <p className="text-nowrap">0212</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-nowrap">
                  Transaction Id
                </p>
                <p className="text-nowrap">2200</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-nowrap">
                  Session Amount
                </p>
                <p className="text-nowrap">Discount: ̥₹200</p>
                <p className="text-nowrap">Total: ₹2000</p>
                <p className="text-nowrap">Grand Total:₹2000</p>
              </div>
            </div> */}
          </div>

          {loading ? (
            <SkeletonCard />
          ) : (
            <>
              <div className="w-[1024px] mq450:w-[340px] mq450:pl-0 mq450:h-auto mq450:justify-center mq450:flex-col mq1050:pl-12 mq1050:w-[800px] mq1240:gap-5 mt-4 items-center  h-auto pl-10  py-[21px] bg-neutral-800 rounded-2xl shadow border border-neutral-700 gap-36 inline-flex">
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

                <div className="mb-">
                  <p className="py-2 text-neutral-300 text-[32px] font-bold font-Lato overflow-hidden whitespace-wrap mq450:text-wrap text-ellipsis  mq450:w-[295px]">
                    {sessionData?.title
                      ? sessionData.title
                      : sessionData?.title}
                  </p>
                  <p className="py-1 text-xl font-normal text-white capitalize font-Lato">
                    {sessionData?.coachName}
                  </p>
                  <div className="flex gap-8 mq450:gap-2">
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
                        {sessionData?.category}
                      </p>
                      {sessionData?.equipment ? (
                        <>
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
                            {sessionData?.equipment}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
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
                  <div className="flex gap-5">
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
                      <p className="text-lg font-normal text-neutral-400 font-Lato">
                        {formatDate1(sessionData?.dateTime)}
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
                      <p className="text-lg font-normal text-neutral-400 font-Lato">
                        {sessionData?.timeSlot
                          ? formatTimeSlot(sessionData.timeSlot)
                          : sessionData?.startTime}
                      </p>
                      {bookingsDetails?.seat == 1 ? (
                        <></>
                      ) : (
                        <div className="flex items-center gap-1 ml-2 mq450:hidden mq450:top-[1100px] mq450:left-2  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              d="M9.99999 10.9399C11.3807 10.9399 12.5 9.76173 12.5 8.30835C12.5 6.85498 11.3807 5.67678 9.99999 5.67678C8.61928 5.67678 7.49999 6.85498 7.49999 8.30835C7.49999 9.76173 8.61928 10.9399 9.99999 10.9399Z"
                              fill="url(#paint0_linear_11257_18131)"
                            />
                            <path
                              d="M9.16666 13.5715H10.8333C11.7174 13.5715 12.5652 13.9412 13.1903 14.5992C13.8155 15.2572 14.1667 16.1497 14.1667 17.0803V18.8346H5.83332V17.0803C5.83332 16.1497 6.18451 15.2572 6.80963 14.5992C7.43475 13.9412 8.2826 13.5715 9.16666 13.5715Z"
                              fill="url(#paint1_linear_11257_18131)"
                            />
                            <path
                              d="M12.5 8.30835C12.4994 7.68818 12.2903 7.08823 11.9097 6.61477C11.5292 6.14131 11.0018 5.82488 10.4208 5.72152"
                              fill="url(#paint2_linear_11257_18131)"
                            />
                            <path
                              d="M13.75 2.16802C13.1513 2.16995 12.5641 2.34215 12.0507 2.6664C11.5373 2.99066 11.1167 3.45493 10.8333 4.01012C11.7739 4.21356 12.619 4.75219 13.2262 5.53518C13.8335 6.31816 14.1656 7.29761 14.1667 8.30835C14.1653 8.59126 14.1374 8.87333 14.0833 9.15046C14.9354 9.06511 15.7234 8.63708 16.2831 7.95549C16.8429 7.27391 17.1314 6.39131 17.0884 5.49147C17.0454 4.59163 16.6744 3.74391 16.0525 3.12483C15.4307 2.50575 14.6059 2.16303 13.75 2.16802Z"
                              fill="url(#paint3_linear_11257_18131)"
                            />
                            <path
                              d="M7.80499 12.0206C7.09373 11.5517 6.53167 10.87 6.19082 10.0627H5.83332C4.72866 10.0641 3.66962 10.5267 2.88851 11.3489C2.10739 12.1711 1.66798 13.2859 1.66666 14.4487V16.2031C1.66666 16.4357 1.75445 16.6588 1.91073 16.8233C2.06701 16.9878 2.27898 17.0803 2.49999 17.0803H4.16666C4.16856 15.9353 4.52468 14.8222 5.18114 13.9093C5.8376 12.9964 6.75867 12.3334 7.80499 12.0206Z"
                              fill="url(#paint4_linear_11257_18131)"
                            />
                            <path
                              d="M14.1667 10.0627H13.8092C13.4683 10.87 12.9062 11.5517 12.195 12.0206C13.2413 12.3334 14.1624 12.9964 14.8188 13.9093C15.4753 14.8222 15.8314 15.9353 15.8333 17.0803H17.5C17.721 17.0803 17.933 16.9878 18.0892 16.8233C18.2455 16.6588 18.3333 16.4357 18.3333 16.2031V14.4487C18.332 13.2859 17.8926 12.1711 17.1115 11.3489C16.3304 10.5267 15.2713 10.0641 14.1667 10.0627Z"
                              fill="url(#paint5_linear_11257_18131)"
                            />
                            <path
                              d="M5.83332 8.30836C5.83438 7.29761 6.16652 6.31817 6.77374 5.53518C7.38095 4.75219 8.2261 4.21357 9.16666 4.01013C8.89459 3.47837 8.49636 3.02981 8.01074 2.70813C7.52511 2.38645 6.96864 2.20259 6.39548 2.17446C5.82233 2.14632 5.25202 2.27488 4.74006 2.5476C4.22811 2.82032 3.79196 3.22792 3.47406 3.73072C3.15616 4.23352 2.96735 4.81439 2.926 5.4168C2.88465 6.0192 2.99217 6.62262 3.2381 7.1683C3.48404 7.71398 3.86 8.18335 4.32939 8.5307C4.79878 8.87806 5.34561 9.09157 5.91666 9.15046C5.86262 8.87333 5.83471 8.59126 5.83332 8.30836Z"
                              fill="url(#paint6_linear_11257_18131)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint3_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint4_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint5_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                              <linearGradient
                                id="paint6_linear_11257_18131"
                                x1="1.02563"
                                y1="12.8063"
                                x2="18.8943"
                                y2="12.8092"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                            Group session
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 mt-10">
                    <button
                      onClick={handleRefundEligibility}
                      className=" h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center hover:bg-gradient-to-r from-rose-500 to-orange-400 text-nowrap inline-flex"
                    >
                      Cancel Session
                    </button>
                    {showJoinButton ? (
                      // <Link target="_blank" href={`${sessionData?.meetLink}`}>
                      <button
                        onClick={handleJoinSession}
                        className="text-nowrap mx-1 hover:bg-gradient-to-r from-rose-500 to-orange-400 mt-0 h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center gap-2 inline-flex"
                      >
                        Join Session
                      </button>
                    ) : (
                      // </Link>
                      <button
                        onClick={() => {
                          toast({
                            title: "Session not started yet.",
                            description:
                              "You can join the session when its started!",
                            duration: 3000, // 3 seconds
                          });
                        }}
                        className="text-nowrap mx-1 hover:bg-gradient-to-r from-rose-500 to-orange-400 mt-0 h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center gap-2 inline-flex"
                      >
                        Join Session
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
