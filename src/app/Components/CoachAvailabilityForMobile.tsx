import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import Cookies from "js-cookie";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ShinyButton from "@/components/ui/shiny-button";

const CoachAvailabilityForMobile = ({ data, id }: any) => {
  //console.log("id of coach in CoachAvailability mobile", id);
  const { toast } = useToast();
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [openPopover1, setOpenPopover1] = useState(false);
  const [openPopover2, setOpenPopover2] = useState(false);
  const [openPopover3, setOpenPopover3] = useState(false);
  const [openPopover4, setOpenPopover4] = useState(false);
  const [calenderDate, setCalenderDate] = React.useState<Date | undefined>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [category, setCategory] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [formattedAvailableTimeSlot, setFormattedAvailableTimeSlot] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const userName = Cookies.get("username");
  const genToken = Cookies.get("genToken");
  const userId = Cookies.get("user_id");

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
    "Recovery",
    "HIIT",
    "Stretching",
    "Warmup",
    "General",
    "Kickboxing",
    "Strength",
  ];

  const handleSelectedTimeSlot = (time: string) => {
    setSelectedTime(time);
    //console.log("selectedTimeSlot", time);
  };

  function emptySlot() {
    setSelectedTime("");
    setOpenPopover2(false);
  }

  useEffect(() => {
    // Map over availableTimeSlots and format them
    // const formattedSlots = availableTimeSlots.map((slot) => {
    //   return slot.replace(
    //     /(\d{2}):\d{2}(AM|PM)-(\d{2}):\d{2}(AM|PM)/,
    //     "$1-$3 $2",
    //   );
    // });

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
  }, [availableTimeSlots]);

  useEffect(() => {
    //console.log("formattedAvailableTimeSlot state", formattedAvailableTimeSlot);
  }, [formattedAvailableTimeSlot]);

  function emptyCategory() {
    setSelectedCategory("");
    setOpenPopover3(false);
  }
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
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

  const handleIncrement = () => {
    dispatch(incrementSeat());
  };

  const handleDecrement = () => {
    dispatch(decrementSeat());
  };

  const isDateAllowed = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    );
  };

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // JS months are 0-based, so we subtract 1
  };

  useEffect(() => {
    //console.log("selected date: " + calenderDate);
  }, [calenderDate]);

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
    <div>
      <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerTrigger className="primaryButton text-[#FFFFFF] px-[22px] py-3">
          Check Availability
        </DrawerTrigger>
        <DrawerContent className="bg-[#171717]">
          <DrawerHeader>
            <DrawerTitle className="text-[#FFFFFF] text-[20px] font-bold leading-normal text-left mb-2">
              Select Availability
            </DrawerTitle>
            <DrawerDescription>
              <div className="flex w-full gap-4 ">
                <Popover open={openPopover1} onOpenChange={setOpenPopover1}>
                  <PopoverTrigger className=" px-2 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                    Add Dates
                  </PopoverTrigger>
                  <PopoverContent className="modal-background w-[328px]">
                    <div className="pb-3 border-solid border-b-[1px] border-[#737373]">
                      <h1 className="mid-heading text-[22px] font-bold leading-normal">
                        Select Date
                      </h1>
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
                        selected: calenderDate
                          ? "bg-orange-500 text-white"
                          : "", // Use orange for selected
                        today: "", // Remove styling for today if it's not in allowedDates
                      }}
                    />
                    <div className="w-full flex justify-center items-center gap-5 p-2 mt-3 cursor-pointer border-solid border-t-[1px] border-[#737373]">
                      <button
                        onClick={() => setOpenPopover1(false)}
                        className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
                      >
                        Save
                      </button>
                      <button
                        // onClick={handleSave}
                        onClick={() => setOpenPopover1(false)}
                        className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
                      >
                        Cancel
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover open={openPopover2} onOpenChange={setOpenPopover2}>
                  <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                    Add Time
                  </PopoverTrigger>
                  <PopoverContent className="modal-background w-[328px]">
                    <div className="pb-3 border-solid border-b-[1px] border-[#737373]">
                      <h1 className="mid-heading text-[22px] font-bold leading-normal">
                        Select Time Slot
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 my-3">
                      {allTimeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleSelectedTimeSlot(time)}
                          className={` ${formattedAvailableTimeSlot.includes(time) ? " text-[#FFFFFF] font-bold cursor-pointer" : "cursor-not-allowed border-none"}
                                                    text-[#A3A3A3] text-[12px] text-center font-medium tracking-[0.38px] leading-[18px] p-2
                                                     ${selectedTime === time ? "primaryButton border-red-500" : ""}`}
                          disabled={!formattedAvailableTimeSlot.includes(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <div className="w-full flex justify-center items-center gap-5 p-2 mt-3 cursor-pointer border-solid border-t-[1px] border-[#737373]">
                      <button
                        onClick={() => setOpenPopover2(false)}
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
                  </PopoverContent>
                </Popover>

                <Popover open={openPopover3} onOpenChange={setOpenPopover3}>
                  <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                    Add Category
                  </PopoverTrigger>
                  <PopoverContent className="modal-background w-[328px] px-2 pt-3 pb-6">
                    <div className="pb-3 border-solid border-b-[1px] border-[#737373] mb-3">
                      <h1 className="mid-heading text-[22px] font-bold leading-normal">
                        Select Category
                      </h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
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
                    </div>
                    <div className="w-full flex justify-center items-center gap-5 p-2 mt-3 cursor-pointer border-solid border-t-[1px] border-[#737373]">
                      <button
                        onClick={() => setOpenPopover3(false)}
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
                  </PopoverContent>
                </Popover>

                <Popover open={openPopover4} onOpenChange={setOpenPopover4}>
                  <PopoverTrigger className=" px-3 py-3 border-solid border-[1px] border-[#FFFFFF] rounded-full text-[12px] text-[#FFFFFF] leading-normal font-semibold">
                    {seatCounter} Seat
                  </PopoverTrigger>
                  <PopoverContent className="modal-background w-[328px]">
                    <div className="pb-3 border-solid border-b-[1px] border-[#737373] mb-3">
                      <h1 className="mid-heading text-[22px] font-bold leading-normal">
                        Select Seats
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

                    <div className="w-full flex justify-center items-center gap-5 p-2 mt-3 cursor-pointer border-solid border-t-[1px] border-[#737373]">
                      <button
                        onClick={() => setOpenPopover4(false)}
                        className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          dispatch(setSeatCounter(1));
                          setOpenPopover4(false);
                        }}
                        className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
                      >
                        Cancel
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <h2 className="text-[20px] text-[#FFFFFF] font-bold leading-normal text-left my-3">
                {calenderDate ? formatDate(new Date(calenderDate)) : ""}
              </h2>
              <div className="w-full flex flex-col items-start gap-3 h-[70vh] overflow-y-auto py-3 px-3">
                {!selectedTime && formattedAvailableTimeSlot ? (
                  formattedAvailableTimeSlot.map((time) => (
                    <div
                      key={time}
                      className="w-[328px] px-4 py-4 border-[1px] border-[#404040] rounded-[8px]"
                    >
                      <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                        {category} Session
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
                            {/* Sat, 8 June */}
                            {calenderDate
                              ? formatDate(new Date(calenderDate))
                              : ""}
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
                            ? `${sessionDiscount}% applied`
                            : `Get (20% OFF)`}
                        </span>
                        <Link
                          href={"/subscription-plans"}
                          className="flex items-center justify-start gap-1"
                        >
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
                        </Link>
                      </div>

                      {/* <Button
                        onClick={() => CheckSessionConflicts(time)}
                        className="primaryButton h-[30px] w-full text-[16px] text-[#E5E5E5] font-semibold leading-normal my-2 border-[1px] border-[#F5F5F5]"
                      >
                        Book Now
                      </Button> */}
                      <ShinyButton
                        onClick={() => CheckSessionConflicts(time)}
                        className="bookBtn w-full my-2 border-[1px] border-white"
                        disabled
                      >
                        {" "}
                        Coming soon
                      </ShinyButton>
                    </div>
                  ))
                ) : (
                  <div className="w-[328px] px-4 py-4 border-[1px] border-[#404040] rounded-[8px]">
                    <h2 className="text-[#FFFFFF] text-[18px] text-left font-bold leading-normal">
                      {category} Session
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
                          {calenderDate
                            ? formatDate(new Date(calenderDate))
                            : ""}
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
                          ? `${sessionDiscount}% applied`
                          : `Get (20% OFF)`}
                      </span>
                      <Link
                        href={"/subscription-plans"}
                        className="flex items-center justify-start gap-1"
                      >
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
                      </Link>
                    </div>

                    {/* <Button
                      onClick={() => CheckSessionConflicts(selectedTime)}
                      className="w-full my-2 primaryButton"
                    >
                      Book Now
                    </Button> */}
                    <ShinyButton
                      onClick={() => CheckSessionConflicts(selectedTime)}
                      className="bookBtn w-full my-2 border-[1px] border-white"
                      disabled
                    >
                      {" "}
                      Coming soon
                    </ShinyButton>
                  </div>
                )}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="border-t-[1px] border-[#a3a3a352]">
            {/* <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CoachAvailabilityForMobile;
