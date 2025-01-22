"use client";
import React, { useEffect, useState } from "react";
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
  setCoachCategory,
  setPrivateSessionDiscount,
  setSeatCounter,
} from "@/store/slice";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Datepicker } from "flowbite-react";
import ShinyButton from "@/components/ui/shiny-button";

const CoachAvailability = ({ data, id }: any) => {
  //console.log("id of coach in CoachAvailability", id);
  const [calenderDate, setCalenderDate] = React.useState<Date | undefined>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const [formattedAvailableTimeSlot, setFormattedAvailableTimeSlot] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const allTimeSlots = [
    "06AM-07AM",
    "07AM-08AM",
    "08AM-09AM",
    "09AM-10AM",
    "10AM-11AM",
    "11PM-12PM",
    "12PM-01PM",
    "01PM-02PM",
    "02PM-03PM",
    "03PM-04PM",
    "04PM-05PM",
    "05PM-06PM",
    "06PM-07PM",
    "07PM-08PM",
    "08PM-09PM",
    "09PM-10PM",
    "10PM-11PM",
    "11AM-12AM",
  ];

  const Categories = [
    "Yoga",
    "Meditation",
    "Cardio",
    "Dance",
    "HIIT",
    "Strength",
    "Warmup",
    "General",
    "Kickboxing",
    "Stretching",
    "Recovery",
  ];

  useEffect(() => {
    // Map over availableTimeSlots and format them
    const formattedSlots = availableTimeSlots.map((slot) => {
      return slot.replace(
        /(\d{2}):\d{2}(AM|PM)-(\d{2}):\d{2}(AM|PM)/,
        "$1$2-$3$4",
      );
    });
    // Update state with the new formatted slots
    setFormattedAvailableTimeSlot(formattedSlots);

    // Log the formatted slots for debugging
    //console.log("formattedAvailableTimeSlot", formattedSlots);
    //console.log("availableTimeSlots", availableTimeSlots);
  }, [availableTimeSlots]);

  useEffect(() => {
    //console.log("formattedAvailableTimeSlot state", formattedAvailableTimeSlot);
  }, [formattedAvailableTimeSlot]);

  const handleSelectedTimeSlot = (time: string) => {
    setSelectedTime(time);
    //console.log("selectedTimeSlot", time);
  };

  function emptySlot() {
    setSelectedTime("");
    setIsOpen(false);
  }

  function emptyCategory() {
    setSelectedCategory("");
    setIsOpen(false);
  }

  const router = useRouter();
  const userName = Cookies.get("username");
  const genToken = Cookies.get("genToken");
  const userId = Cookies.get("user_id");

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
  const sessionDiscount = useSelector(
    (state: RootState) => state.counter.privateSessionDiscount,
  );

  const { toast } = useToast();
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  useEffect(() => {
    //console.log("selected date: " + calenderDate);
  }, [calenderDate]);

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // JS months are 0-based, so we subtract 1
  };

  const fetchAvailability = async () => {
    try {
      const response = await fetch(
        userId
          ? `${apiEndpoint}/api/fitnearn/web/coach/availability/get/${id}?userId=${userId}`
          : `${apiEndpoint}/api/fitnearn/web/coach/availability/get/${id}`,
      );
      const result = await response.json();
      //console.log("result from get availability: ", result);

      if (result.success) {
        const upcomingDates = result.upcomingDates;
        const discount = result.discountPercentage;
        //console.log("discounts: ", discount);
        dispatch(setPrivateSessionDiscount(discount));
        // Convert to Date objects
        const parsedDates = upcomingDates.map((dateStr: string) =>
          parseDate(dateStr),
        );
        setAvailableDates(parsedDates);
        setCategory(result.data.category);
        dispatch(setCoachCategory(result.data.category));
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

  useEffect(() => {
    fetchAvailability();
  }, []);

  useEffect(() => {
    //console.log(" days ", availableDates);
  }, [availableDates]);

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
      return;
    }

    const formattedDate = formatDateForAPI(calenderDate);
    //console.log("selected date", formattedDate);
    //console.log("selected time slot", selectedTime);

    try {
      dispatch(setFormattedDate(formattedDate));
      dispatch(setTimeSlot(time));
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/coach/conflict/${id}?date=${formattedDate}&timeSlot=${time}`,
      );
      const result = await response.json();
      if (result.success) {
        const url = `/coachSessionBooking?Id=${id}`;
        router.push(url);
      } else {
        toast({
          title: "Your selected time slot is already booked.",
          description:
            "Please choose any other time slot or date for booking a session.",
        });
      }
      //console.log("result from CheckSessionConflicts", result);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="flex-1/3 hidden md:flex relative flex-col justify-center items-center about-coach-sub-div w-[455px] h-auto px-[19px] py-6">
      <h1 className="mid-heading text-[44px] font-bold leading-normal mb-6">
        Select Availability
      </h1>

      <div
        className={`w-full ${isOpen ? "h-auto coach-dropdown-inner-layer pb-5" : "h-auto"} z-40 flex flex-col justify-start items-center absolute top-[90px] right-0  p-0 m-0`}
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
          <div className="coach-dropdown z-30 w-[285px] h-auto flex flex-col justify-center items-center mt-4 py-2 px-2">
            <div className="flex items-start justify-start w-full px-4 pt-2">
              <h1 className="mid-heading text-[22px]">Select Date</h1>
            </div>
            {/* <Calendar
              mode="single"
              selected={calenderDate}
              onSelect={(day) => {
                if (day && isDateAllowed(day)) {
                  setCalenderDate(day); // Set date only if allowed
                }
              }}
              className="text-white rounded-md"
              disabled={(day) => !isDateAllowed(day)} // Disable dates not in allowed list
            /> */}
            <Calendar
              mode="single"
              selected={calenderDate}
              onSelect={(day) => {
                if (day && isDateAllowed(day)) {
                  setCalenderDate(day); // Only allow selecting if date is in allowedDates
                }
              }}
              className="text-white rounded-md"
              disabled={(day) => !isDateAllowed(day)} // Disable dates not in allowed list
              modifiers={{
                today: (date) => false, // Prevent today from being highlighted
                allowed: (date) => isDateAllowed(date), // Custom modifier for allowed dates
              }}
              modifiersClassNames={{
                allowed: "text-white", // Highlight allowed dates
                selected: calenderDate ? "bg-orange-500 text-white" : "", // Use orange for selected
                today: "", // Remove styling for today if it's not in allowedDates
              }}
            />

            <div className="relative flex items-center justify-center w-full gap-5 p-4 cursor-pointer">
              <button
                onClick={handleSave}
                className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
              >
                Save
              </button>
              <button
                onClick={handleSave}
                className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // <div className="flex flex-col items-center justify-center mt-4 coach-dropdown">
          //   <Datepicker inline onSelectedDateChanged={handleSelectedDateChange} />
          // </div>
          ""
        )}
        {isOpen && flag === "time" ? (
          <div className="w-[320px] z-30 h-auto coach-dropdown flex flex-col justify-center items-center gap-1 mt-4">
            <div className="flex items-start justify-start w-full px-4 pt-2">
              <h1 className="mid-heading text-[22px]">Select Time Slot</h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 my-3">
              {allTimeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleSelectedTimeSlot(time)}
                  className={`
                  ${formattedAvailableTimeSlot.includes(time) ? " text-[#FFFFFF] font-bold cursor-pointer" : "cursor-not-allowed border-none"}
                  text-[#A3A3A3] text-[12px] text-center font-medium tracking-[0.38px] leading-[18px] p-2
                  ${selectedTime === time ? "primaryButton border-red-500" : ""}
                `}
                  disabled={!formattedAvailableTimeSlot.includes(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="relative flex items-center justify-center w-full gap-5 p-4 cursor-pointer">
              <button
                onClick={handleSave}
                className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
              >
                Save
              </button>
              <button
                onClick={emptySlot}
                className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {isOpen && flag === "category" ? (
          <div className="w-[285px] z-30 h-auto coach-dropdown flex flex-col justify-center items-center gap-4 pt-3 mt-4">
            <div className="flex items-start justify-start w-full px-4">
              <h1 className="mid-heading text-[22px]">Select Category</h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedCategory(item)}
                  className={`${item === category ? " text-[#FFFFFF] font-bold cursor-pointer" : "cursor-not-allowed border-none"}
                      ${selectedCategory === item ? "primaryButton" : ""} text-[#A3A3A3] text-[12px] text-center font-medium tracking-[0.38px] leading-[18px] p-2`}
                  disabled={item !== category}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="relative flex items-center justify-center w-full gap-5 p-4 cursor-pointer">
              <button
                onClick={handleSave}
                className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
              >
                Save
              </button>
              <button
                onClick={emptyCategory}
                className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {isOpen && flag === "seats" ? (
          <div className="w-[285px] z-30 min-h-[200px] coach-dropdown flex flex-col justify-center items-center gap-4 mt-4">
            <div className="flex items-start justify-start w-full px-4 pt-2">
              <h1 className="mid-heading text-[22px]">Select Seats</h1>
            </div>
            <div className="flex items-center justify-between w-full gap-4 px-4">
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
            <div className="relative flex items-center justify-center w-full gap-5 p-4 cursor-pointer">
              <button
                onClick={handleSave}
                className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
              >
                Save
              </button>
              <button
                onClick={() => {
                  dispatch(setSeatCounter(1));
                  setIsOpen(false);
                }}
                className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="max-h-[555px] overflow-y-auto">
        <div className="pt-[90px] ">
          {!selectedTime && formattedAvailableTimeSlot ? (
            formattedAvailableTimeSlot.map((time) => (
              <div
                key={time}
                className="w-[420px] px-[20px] py-3 border-b-[1px] border-[#404040]"
              >
                <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                  {category} Session
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
                      {calenderDate
                        ? formatDate(new Date(calenderDate))
                        : formatDate(new Date(selectedDate))}
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
                    {sessionDiscount ? `₹${sessionPrize}` : ""}
                  </span>
                  <span className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
                    ₹
                    {sessionPrize && sessionDiscount
                      ? `${sessionPrize * (1 - sessionDiscount / 100)}`
                      : sessionPrize}
                  </span>
                  <span className="text-[#FACA15] text-[12px] font-medium leading-normal">
                    {sessionDiscount
                      ? `${sessionDiscount}% discount applied`
                      : `Get (20% OFF)`}
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
                      Go Premium now
                    </Link>
                  </span>
                </div>

                {/* <Button
                onClick={() => CheckSessionConflicts(time)}
                className="w-full my-2 primaryButton"
              >
                Book Now
              </Button> */}
                <ShinyButton
                  onClick={() => CheckSessionConflicts(time)}
                  className="bookBtn w-full my-2 border-[1px] border-white"
                  // disabled
                >
                  Book Now
                  {/* Coming soon */}
                </ShinyButton>
              </div>
            ))
          ) : (
            <div className="w-[420px] px-[20px] py-3 border-b-[1px] border-[#404040]">
              <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                {category} Session
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
                    {calenderDate
                      ? formatDate(new Date(calenderDate))
                      : formatDate(new Date(selectedDate))}
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
                    {selectedTime}
                  </span>
                </div>
              </div>

              <div className="flex justify-start items-center gap-3 mt-[6px]">
                <span className="text-[#A3A3A3] text-[16px] font-bold leading-normal line-through">
                  {sessionDiscount ? `₹${sessionPrize}` : ""}
                </span>
                <span className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
                  ₹
                  {sessionPrize && sessionDiscount
                    ? `${sessionPrize * (1 - sessionDiscount / 100)}`
                    : sessionPrize}
                </span>
                <span className="text-[#FACA15] text-[12px] font-medium leading-normal">
                  {sessionDiscount
                    ? `${sessionDiscount}% discount applied`
                    : `Get (20% OFF)`}
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

              <Button
                onClick={() => CheckSessionConflicts(selectedTime)}
                className="w-full my-2 primaryButton"
                // disabled
              >
                Book Now
                {/* Coming soon */}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachAvailability;
