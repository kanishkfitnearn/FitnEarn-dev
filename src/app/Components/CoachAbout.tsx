"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  incrementSeat,
  decrementSeat,
  setFormattedDate,
  setTimeSlot,
} from "@/store/slice";
import Cookies from "js-cookie";
import CoachAvailability from "./CoachAvailability";
import CoachAvailabilityForMobile from "./CoachAvailabilityForMobile";

const CoachAbout = ({ data, id }: any) => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  console.log("id of coach", id);
  const [calenderDate, setCalenderDate] = React.useState<Date | undefined>();
  // const [availableDates, setAvailableDates] = useState<number[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  // const [seatCounter, setSeatCounter] = useState(1);
  // const [sessionPrize, setSessionPrize] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const router = useRouter();
  const userName = Cookies.get("username");
  const genToken = Cookies.get("genToken");

  const dispatch = useDispatch();
  const seatCounter = useSelector(
    (state: RootState) => state.counter.seatCounter,
  );
  const sessionPrize = useSelector(
    (state: RootState) => state.counter.sessionPrize,
  );
  const { formattedDate, timeSlot } = useSelector(
    (state: RootState) => state.counter,
  );

  useEffect(() => {
    //console.log("selected date: " + calenderDate);
  }, [calenderDate]);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString); // Parse the time string into a Date object
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Format hours and minutes into 12-hour time
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    // Return the formatted time string
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  // const fetchAvailability = async () => {
  //   try {
  //     const response = await fetch(`${apiEndpoint}/api/fitnearn/web/coach/availability/get/${id}`);
  //     const result = await response.json();
  //     //console.log("result from get availability: ", result);
  //     if (result.success) {
  //       //console.log("result from get availability data: ", result.data);
  //       setAvailableDates(result.data.availableDay); // availableDay is an array of numbers
  //       const formattedTimes = result.data.availableTime.map((time: string) => formatTime(time));
  //       setAvailableTimeSlots(formattedTimes);
  //     }
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };

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
      console.log("result from get availability: ", result);

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
        // if (upcomingDates.length > 0) {
        //   const firstDay = upcomingDates[0]; // Get the first available day (like 5)
        //   const formattedFirstDate = formatDateWithDayAndMonth(firstDay); // Format it
        //   setSelectedDate(formattedFirstDate); // Set the formatted date
        // }
        // const formattedTimes = result.data.availableTime.map((time: string) =>
        //   formatTime(time),
        // );
        setAvailableTimeSlots(result.data.availableTime);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const isDateAllowed = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    );
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const formatDateWithDayAndMonth = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // Example: "Sun"
    const dayNumber = date.getDate(); // Example: 1
    const monthName = date.toLocaleDateString("en-US", { month: "long" }); // Example: "September"
    return `${dayName}, ${dayNumber} ${monthName}`;
  };

  // Dynamically create allowedDates array (availableDates is an array of numbers)
  // const allowedDates = availableDates.map(
  //   (day: number) => new Date(currentYear, currentMonth, day), // Construct Date objects from the numbers
  // );

  // Check if the selected date is allowed
  // const isDateAllowed = (day: Date) => {
  //   return allowedDates.some(
  //     (allowedDate: Date) => allowedDate.toDateString() === day.toDateString(), // Compare the dates
  //   );
  // };

  useEffect(() => {
    fetchAvailability();
  }, []);

  useEffect(() => {
    //console.log(" days ", availableDates);
  }, [availableDates]);

  // const handleSeatIncrement = () => {
  //   if (seatCounter < 10) {
  //     setSeatCounter((prev) => prev + 1);
  //   }
  // };

  // const handleSeatDecrement = () => {
  //   if (seatCounter > 1) {
  //     setSeatCounter((prev) => prev - 1);
  //   }
  // };

  // useEffect(() => {
  //   const basePrizePerSeat = 450;
  //   setSessionPrize(basePrizePerSeat * seatCounter);
  // }, [seatCounter]);

  const handleIncrement = () => {
    dispatch(incrementSeat());
  };

  const handleDecrement = () => {
    dispatch(decrementSeat());
  };

  const handleOpen = (option: string) => {
    //console.log(`i opened ${option}`);
    setIsOpen(!isOpen);
    setFlag(option);
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short", // "Sat"
      day: "2-digit", // "23"
      month: "short", // "Sept"
    });
  };

  const formatDateForAPI = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero to day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`; // Return the formatted date
  };

  const CheckSessionConflicts = async (time: string) => {
    if (userName && !genToken) {
      router.push("/login");
      return;
    }
    if (!userName && !genToken) {
      router.push("/signup");
      return;
    }
    if (!calenderDate) {
      //console.log("Calendar date is undefined");
      return; // Stop execution if the date is not set
    }

    const formattedDate = formatDateForAPI(calenderDate); // Format the date
    //console.log("selected date", formattedDate);
    //console.log("selected time slot", selectedTime);

    try {
      dispatch(setFormattedDate(formattedDate));
      dispatch(setTimeSlot(time));
      // if(!selectedTime){
      //    dispatch(setTimeSlot(time));
      // }else{
      //   dispatch(setTimeSlot(selectedTime));
      // }
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/coach/conflict/${id}?date=${formattedDate}&timeSlot=${time}`,
      );
      const result = await response.json();
      if (result.success) {
        const url = `/coachSessionBooking?Id=${id}`;
        router.push(url);
        // router.push("/coachSessionBooking")
      }
      //console.log("result from CheckSessionConflicts", result);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="mb-[60px] mt-[40px]">
      <section className="flex justify-center items-start w-full px-4 md:px-[72px] gap-[32px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="about-coach-sub-div w-[328px] md:w-full h-[280px] md:h-[430px] py-6 md:py-10 px-6 md:px-[49px] flex flex-col gap-4 md:gap-[30px]">
            <h1 className="mid-heading text-[24px] md:text-[44px] font-bold leading-normal">
              About
            </h1>
            <p className="text-[16px] md:text-[26px] text-[#E5E5E5] font-normal leading-normal">
              {data && data.bio}
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-[16px] md:text-[21px] text-[#D4D4D4] font-semibold leading-normal tracking-[0.42px]">
                View More
              </span>
              <span className="w-[21px] h-[21px] relative flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="10"
                    fill="url(#paint0_linear_4001_30000)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4001_30000"
                      x1="-0.269231"
                      y1="13.266"
                      x2="21.1731"
                      y2="13.2694"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute "
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M7.49909 9.83467C7.19167 9.83467 6.89301 9.70342 6.68009 9.47533L3.57326 6.14975C3.35334 5.91408 3.36559 5.54483 3.60067 5.32492C3.83576 5.10617 4.20559 5.11783 4.42492 5.35292L7.49909 8.64292L10.5733 5.35292C10.7926 5.11725 11.163 5.10558 11.3975 5.32492C11.6326 5.54483 11.6454 5.91408 11.4255 6.14975L8.31867 9.47533C8.10517 9.70342 7.80651 9.83467 7.49909 9.83467Z"
                    fill="white"
                  />
                </svg>
              </span>
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

        {/* <div className="flex-1/3 hidden md:flex relative flex-col justify-center items-center about-coach-sub-div w-[455px] h-auto px-[19px] py-6">
          <h1 className="mid-heading text-[44px] font-bold leading-normal">
            Select Availability
          </h1>

          <div
            className={`w-full ${isOpen ? "h-auto coach-dropdown pb-5" : "h-auto"} flex flex-col justify-start items-center absolute top-[90px] right-0  p-0 m-0`}
          >
            <div className="coach-dropdown flex w-[420px] h-[72px] md:h-[72px] mt-[20px] relative border-[1px] border-[#404040]">
              <div
                onClick={() => handleOpen("dates")}
                className={`flex-1 flex justify-center items-center border-r-[1px] ${flag === "dates" ? "border-[#404040]" : "border-[#404040]"}`}
              >
                <div className="flex items-center justify-center gap-1 text-white cursor-pointer">
                  <span>Dates</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9996 16.0001C11.4726 16.0001 10.9606 15.7751 10.5956 15.3841L5.26956 9.68306C4.89256 9.27905 4.91356 8.64606 5.31656 8.26906C5.71956 7.89406 6.35356 7.91406 6.72956 8.31706L11.9996 13.9571L17.2696 8.31706C17.6456 7.91306 18.2806 7.89306 18.6826 8.26906C19.0856 8.64606 19.1076 9.27905 18.7306 9.68306L13.4046 15.3841C13.0386 15.7751 12.5266 16.0001 11.9996 16.0001Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div
                onClick={() => handleOpen("time")}
                className="flex-1 flex justify-center items-center border-r-[1px] border-[#404040]"
              >
                <div className="flex items-center justify-center gap-1 text-white cursor-pointer">
                  <span>Time</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9996 16.0001C11.4726 16.0001 10.9606 15.7751 10.5956 15.3841L5.26956 9.68306C4.89256 9.27905 4.91356 8.64606 5.31656 8.26906C5.71956 7.89406 6.35356 7.91406 6.72956 8.31706L11.9996 13.9571L17.2696 8.31706C17.6456 7.91306 18.2806 7.89306 18.6826 8.26906C19.0856 8.64606 19.1076 9.27905 18.7306 9.68306L13.4046 15.3841C13.0386 15.7751 12.5266 16.0001 11.9996 16.0001Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div
                onClick={() => handleOpen("category")}
                className="flex-1 flex justify-center items-center border-r-[1px] border-[#404040]"
              >
                <div className="flex items-center justify-center gap-1 text-white cursor-pointer">
                  <span>Category</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9996 16.0001C11.4726 16.0001 10.9606 15.7751 10.5956 15.3841L5.26956 9.68306C4.89256 9.27905 4.91356 8.64606 5.31656 8.26906C5.71956 7.89406 6.35356 7.91406 6.72956 8.31706L11.9996 13.9571L17.2696 8.31706C17.6456 7.91306 18.2806 7.89306 18.6826 8.26906C19.0856 8.64606 19.1076 9.27905 18.7306 9.68306L13.4046 15.3841C13.0386 15.7751 12.5266 16.0001 11.9996 16.0001Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div
                onClick={() => handleOpen("seats")}
                className="flex-1 flex justify-center items-center border-r-[1px] border-[#404040]"
              >
                <div className="flex items-center justify-center gap-1 text-white cursor-pointer">
                  <span>Seats</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9996 16.0001C11.4726 16.0001 10.9606 15.7751 10.5956 15.3841L5.26956 9.68306C4.89256 9.27905 4.91356 8.64606 5.31656 8.26906C5.71956 7.89406 6.35356 7.91406 6.72956 8.31706L11.9996 13.9571L17.2696 8.31706C17.6456 7.91306 18.2806 7.89306 18.6826 8.26906C19.0856 8.64606 19.1076 9.27905 18.7306 9.68306L13.4046 15.3841C13.0386 15.7751 12.5266 16.0001 11.9996 16.0001Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {isOpen && flag === "dates" ? (
              <div className="flex flex-col items-center justify-center mt-4 coach-dropdown">
                <Calendar
                  mode="single"
                  selected={calenderDate}
                  onSelect={(day) => {
                    if (day && isDateAllowed(day)) {
                      setCalenderDate(day); 
                    }
                  }}
                  className="text-white rounded-md"
                  disabled={(day) => !isDateAllowed(day)} 
                />
                <div className="flex items-center justify-between w-full px-4 pt-4">
                  <span className="text-[#737373] text-[20px] font-normal tracking-[0.38px] leading-[24px] underline cursor-pointer">
                    Clear Dates
                  </span>
                  <button
                    onClick={handleSave}
                    className="primaryButton text-[#FFFFFF] py-2 px-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {isOpen && flag === "time" ? (
              <div className="w-[450px] h-auto coach-dropdown flex flex-col justify-center items-center gap-4 mt-4 px-5">
                <div className="flex flex-wrap items-center justify-center gap-4 my-3">
                  {availableTimeSlots.map((time) => (
                    <div
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`text-[#FFFFFF] text-[20px] text-center font-normal tracking-[0.38px] leading-[24px] border-[1px] rounded-[6px] ${selectedTime === time ? "border-red-500" : "border-[#FFFFFF]"} p-2 cursor-pointer`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                <div className="relative w-full p-4 cursor-pointer">
                  <button
                    onClick={handleSave}
                    className="primaryButton text-[#FFFFFF] py-2 px-3 absolute right-2 bottom-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {isOpen && flag === "category" ? (
              <div className="w-[450px] h-auto coach-dropdown flex flex-col justify-center items-center gap-4 py-4 px-5">
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  <div className="text-[#FFFFFF] text-[20px] text-center font-normal tracking-[0.38px] leading-[24px] border-[1px] rounded-[6px] border-[#FFFFFF] p-2 cursor-pointer">
                    {category}
                  </div>
                </div>
                <div className="relative w-full p-4 cursor-pointer">
                  <button
                    onClick={handleSave}
                    className="primaryButton text-[#FFFFFF] py-2 px-3 absolute right-2 bottom-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {isOpen && flag === "seats" ? (
              <div className="w-[450px] min-h-[200px] coach-dropdown flex flex-col justify-center items-center gap-4 px-5">
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
                    <button
                      aria-label="Decrement value"
                      onClick={handleDecrement}
                      className="counterButton w-[32px] h-[32px] flex justify-center items-center border-[1px] border-[#FFFFFF] rounded-full"
                    >
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
                      {seatCounter}
                    </span>
                    <button
                      aria-label="Increment value"
                      onClick={handleIncrement}
                      className="counterButton w-[32px] h-[32px] flex justify-center items-center border-[1px] border-[#FFFFFF] rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path d="M9.00107 9.00107H3.91016Z" fill="#FFF7ED" />
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
                <div className="relative w-full p-4">
                  <button
                    onClick={handleSave}
                    className="primaryButton text-[#FFFFFF] py-2 px-3 absolute right-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="pt-[110px]">
            {availableTimeSlots.map((time) => (
              <div
                key={time}
                className="w-[420px] px-[20px] py-3 border-b-[1px] border-[#404040]"
              >
                <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                  Cardio Session
                </h2>
                <div className="flex gap-3 mt-1">
                  <div className="flex items-center justify-center gap-2 p-1 one-one-call">
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
                  <div className="flex items-center justify-center gap-2 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12.8 3.2H11.6V2.6C11.6 2.44087 11.5368 2.28826 11.4243 2.17574C11.3117 2.06321 11.1591 2 11 2C10.8409 2 10.6883 2.06321 10.5757 2.17574C10.4632 2.28826 10.4 2.44087 10.4 2.6V3.2H8.6V2.6C8.6 2.44087 8.53679 2.28826 8.42426 2.17574C8.31174 2.06321 8.15913 2 8 2C7.84087 2 7.68826 2.06321 7.57574 2.17574C7.46321 2.28826 7.4 2.44087 7.4 2.6V3.2H5.6V2.6C5.6 2.44087 5.53679 2.28826 5.42426 2.17574C5.31174 2.06321 5.15913 2 5 2C4.84087 2 4.68826 2.06321 4.57574 2.17574C4.46321 2.28826 4.4 2.44087 4.4 2.6V3.2H3.2C2.88174 3.2 2.57652 3.32643 2.35147 3.55147C2.12643 3.77652 2 4.08174 2 4.4V12.8C2 13.1183 2.12643 13.4235 2.35147 13.6485C2.57652 13.8736 2.88174 14 3.2 14H12.8C13.1183 14 13.4235 13.8736 13.6485 13.6485C13.8736 13.4235 14 13.1183 14 12.8V4.4C14 4.08174 13.8736 3.77652 13.6485 3.55147C13.4235 3.32643 13.1183 3.2 12.8 3.2ZM4.4 4.4C4.4 4.55913 4.46321 4.71174 4.57574 4.82426C4.68826 4.93679 4.84087 5 5 5C5.15913 5 5.31174 4.93679 5.42426 4.82426C5.53679 4.71174 5.6 4.55913 5.6 4.4H7.4C7.4 4.55913 7.46321 4.71174 7.57574 4.82426C7.68826 4.93679 7.84087 5 8 5C8.15913 5 8.31174 4.93679 8.42426 4.82426C8.53679 4.71174 8.6 4.55913 8.6 4.4H10.4C10.4 4.55913 10.4632 4.71174 10.5757 4.82426C10.6883 4.93679 10.8409 5 11 5C11.1591 5 11.3117 4.93679 11.4243 4.82426C11.5368 4.71174 11.6 4.55913 11.6 4.4H12.8V5.6H3.2V4.4H4.4ZM3.2 12.8V6.8H12.8V12.8H3.2Z"
                        fill="url(#paint0_linear_4896_23563)"
                      />
                      <path
                        d="M5.3 8H4.7C4.53431 8 4.4 8.13432 4.4 8.3V8.9C4.4 9.06569 4.53431 9.2 4.7 9.2H5.3C5.46569 9.2 5.6 9.06569 5.6 8.9V8.3C5.6 8.13432 5.46569 8 5.3 8Z"
                        fill="url(#paint1_linear_4896_23563)"
                      />
                      <path
                        d="M5.3 10.4H4.7C4.53431 10.4 4.4 10.5343 4.4 10.7V11.3C4.4 11.4657 4.53431 11.6 4.7 11.6H5.3C5.46569 11.6 5.6 11.4657 5.6 11.3V10.7C5.6 10.5343 5.46569 10.4 5.3 10.4Z"
                        fill="url(#paint2_linear_4896_23563)"
                      />
                      <path
                        d="M8.3 8H7.7C7.53431 8 7.4 8.13432 7.4 8.3V8.9C7.4 9.06569 7.53431 9.2 7.7 9.2H8.3C8.46569 9.2 8.6 9.06569 8.6 8.9V8.3C8.6 8.13432 8.46569 8 8.3 8Z"
                        fill="url(#paint3_linear_4896_23563)"
                      />
                      <path
                        d="M8.3 10.4H7.7C7.53431 10.4 7.4 10.5343 7.4 10.7V11.3C7.4 11.4657 7.53431 11.6 7.7 11.6H8.3C8.46569 11.6 8.6 11.4657 8.6 11.3V10.7C8.6 10.5343 8.46569 10.4 8.3 10.4Z"
                        fill="url(#paint4_linear_4896_23563)"
                      />
                      <path
                        d="M11.3 8H10.7C10.5343 8 10.4 8.13432 10.4 8.3V8.9C10.4 9.06569 10.5343 9.2 10.7 9.2H11.3C11.4657 9.2 11.6 9.06569 11.6 8.9V8.3C11.6 8.13432 11.4657 8 11.3 8Z"
                        fill="url(#paint5_linear_4896_23563)"
                      />
                      <path
                        d="M11.3 10.4H10.7C10.5343 10.4 10.4 10.5343 10.4 10.7V11.3C10.4 11.4657 10.5343 11.6 10.7 11.6H11.3C11.4657 11.6 11.6 11.4657 11.6 11.3V10.7C11.6 10.5343 11.4657 10.4 11.3 10.4Z"
                        fill="url(#paint6_linear_4896_23563)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint5_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint6_linear_4896_23563"
                          x1="1.53846"
                          y1="9.65958"
                          x2="14.4039"
                          y2="9.66166"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                      {calenderDate ? formatDate(new Date(calenderDate)) : formatDate(new Date(selectedDate))}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.00065 14.6654C6.68211 14.6654 5.39318 14.2744 4.29685 13.5418C3.20052 12.8093 2.34604 11.7681 1.84146 10.5499C1.33687 9.33175 1.20485 7.99131 1.46209 6.6981C1.71932 5.40489 2.35426 4.21701 3.28661 3.28466C4.21896 2.35231 5.40685 1.71737 6.70005 1.46013C7.99326 1.2029 9.3337 1.33492 10.5519 1.8395C11.7701 2.34409 12.8112 3.19857 13.5438 4.2949C14.2763 5.39123 14.6673 6.68016 14.6673 7.9987C14.6654 9.76622 13.9624 11.4608 12.7126 12.7106C11.4627 13.9604 9.76817 14.6634 8.00065 14.6654ZM8.00065 2.66537C6.94582 2.66537 5.91467 2.97816 5.03761 3.5642C4.16055 4.15023 3.47696 4.98318 3.0733 5.95772C2.66963 6.93226 2.56401 8.00462 2.7698 9.03918C2.97559 10.0737 3.48354 11.0241 4.22942 11.7699C4.9753 12.5158 5.92561 13.0238 6.96017 13.2296C7.99474 13.4353 9.06709 13.3297 10.0416 12.9261C11.0162 12.5224 11.8491 11.8388 12.4352 10.9617C13.0212 10.0847 13.334 9.05353 13.334 7.9987C13.3324 6.5847 12.77 5.22907 11.7701 4.22922C10.7703 3.22937 9.41465 2.66696 8.00065 2.66537Z"
                        fill="url(#paint0_linear_4896_23566)"
                      />
                      <path
                        d="M8.00065 8.66537C7.82384 8.66537 7.65427 8.59513 7.52925 8.47011C7.40423 8.34508 7.33399 8.17551 7.33399 7.9987V5.33203C7.33399 5.15522 7.40423 4.98565 7.52925 4.86063C7.65427 4.73561 7.82384 4.66537 8.00065 4.66537C8.17747 4.66537 8.34703 4.73561 8.47206 4.86063C8.59708 4.98565 8.66732 5.15522 8.66732 5.33203V7.9987C8.66732 8.17551 8.59708 8.34508 8.47206 8.47011C8.34703 8.59513 8.17747 8.66537 8.00065 8.66537Z"
                        fill="url(#paint1_linear_4896_23566)"
                      />
                      <path
                        d="M10.184 10.8487C10.0072 10.8487 9.83765 10.7784 9.71265 10.6534L7.52925 8.47011C7.40781 8.34437 7.34069 8.1759 7.34221 8.0011C7.34372 7.8263 7.41384 7.65909 7.53744 7.53549C7.66105 7.41188 7.82826 7.34177 8.00305 7.34025C8.17785 7.33873 8.34625 7.40593 8.47199 7.52737L10.6553 9.7107C10.7485 9.80394 10.812 9.92271 10.8377 10.052C10.8634 10.1813 10.8502 10.3153 10.7998 10.4371C10.7493 10.5589 10.6639 10.663 10.5543 10.7363C10.4447 10.8096 10.3158 10.8487 10.184 10.8487Z"
                        fill="url(#paint2_linear_4896_23566)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4896_23566"
                          x1="0.821164"
                          y1="9.84267"
                          x2="15.1161"
                          y2="9.84499"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_4896_23566"
                          x1="0.821164"
                          y1="9.84267"
                          x2="15.1161"
                          y2="9.84499"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_4896_23566"
                          x1="0.821164"
                          y1="9.84267"
                          x2="15.1161"
                          y2="9.84499"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[#FFFFFF] text-[14px] font-semibold leading-normal">
                      {time}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-3 mt-[6px]">
                  <span className="text-[#A3A3A3] text-[16px] font-bold leading-normal line-through">
                    ₹450
                  </span>
                  <span className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
                    ₹{sessionPrize}
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
                    <Link
                      href={"/subscription-plans"}
                      className="text-[#FACA15] text-[12px] font-medium leading-normal underline"
                    >
                      Go Pro now
                    </Link>
                  </span>
                </div>

                <Button onClick={() => CheckSessionConflicts(time)} className="w-full my-2 primaryButton">
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div> */}
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

export default CoachAbout;
