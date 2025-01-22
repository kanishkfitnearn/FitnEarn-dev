"use client"
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogClose,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import GymCard from "../Components/gymComponents/GymCard";
// import GymCard from "../Components/gymComponents/GymCard2";
import GymHeader from "../../../public/gymPageHeader.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {General} from "../../contexts/generalContext";
import { GET_PLACES } from "../../utils/API";


const FullThunderbolt = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <g clipPath="url(#clip0_14115_70097)">
            <path d="M14.0849 0.5L5.5 11.833H9.09863L6.14392 20.5L15.1767 9.22805H11.4417L14.0849 0.5Z" fill="#E5E5E5" />
        </g>
        <defs>
            <clipPath id="clip0_14115_70097">
                <rect width="20" height="20" fill="white" transform="translate(0.5 0.5)" />
            </clipPath>
        </defs>
    </svg>
);

const HalfThunderbolt = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <g clipPath="url(#clip0_14115_70140)">
            <path
                d="M11.4417 9.62805H14.3435L7.25897 18.4689L9.47724 11.9621L9.6576 11.433H9.09863H6.30481L13.0543 2.52287L11.0589 9.11211L10.9026 9.62805H11.4417Z"
                stroke="#E5E5E5"
                strokeWidth="0.8"
            />
        </g>
        <defs>
            <clipPath id="clip0_14115_70140">
                <rect width="20" height="20" fill="white" transform="translate(0.5 0.5)" />
            </clipPath>
        </defs>
    </svg>
);

const Rating = ({
    value,
    selectedRating,
    setSelectedRating,
}: {
    value: number;
    selectedRating: string[];
    setSelectedRating: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const Rate = [];
    const hasHalf = 5 - value;

    // Generate Full Thunderbolts
    for (let i = 0; i < value; i++) {
        Rate.push(<FullThunderbolt key={`full-${i}`} />);
    }

    // Generate Half Thunderbolts
    if (hasHalf >= 1) {
        for (let i = 0; i < hasHalf; i++) {
            Rate.push(<HalfThunderbolt key={`half-${i}`} />);
        }
    }

    // Handle Rating Selection
    const handleClick = () => {
        const ratingValue = `${value}`; // Convert value to string for the `selectedRating` array
        if (selectedRating.includes(ratingValue)) {
            // If already selected, remove it
            setSelectedRating(selectedRating.filter((rating) => rating !== ratingValue));
        } else {
            // Otherwise, add it
            setSelectedRating([...selectedRating, ratingValue]);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex gap-2 border-[1px] border-[#262626] rounded-[8px] py-2 px-3 cursor-pointer ${selectedRating.includes(`${value}`) ? "fitness-level-selected font-semibold" : "bg-[#262626]"}`}
        >
            {Rate}
        </div>
    );
};


const Gym: React.FC = () => {
    const gymCardsData = [
        {
            id: 1,
            imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
            label: "Evening",
            name: "Gym Name",
            distance: "5 km away",
            status: "Open Now",
            categories: "Gym, Yoga +21",
            location: "City, State",
            rating: 4.7,
            reviews: 50,
            buttonText: "Book Now",
        },
        {
            id: 2,
            imageUrl: "/images/gym-placeholder.jpg",
            label: "Morning",
            name: "Fitness Center",
            distance: "3 km away",
            status: "Closed",
            categories: "Cardio, Zumba +12",
            location: "Town, State",
            rating: 4.5,
            reviews: 30,
            buttonText: "View Details",
        },
        {
            id: 3,
            imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
            label: "Evening",
            name: "Gym Name",
            distance: "5 km away",
            status: "Open Now",
            categories: "Gym, Yoga +21",
            location: "City, State",
            rating: 4.7,
            reviews: 50,
            buttonText: "Book Now",
        },
        {
            id: 4,
            imageUrl: "/images/gym-placeholder.jpg",
            label: "Morning",
            name: "Fitness Center",
            distance: "3 km away",
            status: "Closed",
            categories: "Cardio, Zumba +12",
            location: "Town, State",
            rating: 4.5,
            reviews: 30,
            buttonText: "View Details",
        },
        {
            id: 5,
            imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
            label: "Evening",
            name: "Gym Name",
            distance: "5 km away",
            status: "Open Now",
            categories: "Gym, Yoga +21",
            location: "City, State",
            rating: 4.7,
            reviews: 50,
            buttonText: "Book Now",
        },
        {
            id: 6,
            imageUrl: "/images/gym-placeholder.jpg",
            label: "Morning",
            name: "Fitness Center",
            distance: "3 km away",
            status: "Closed",
            categories: "Cardio, Zumba +12",
            location: "Town, State",
            rating: 4.5,
            reviews: 30,
            buttonText: "View Details",
        },
        {
            id: 7,
            imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
            label: "Evening",
            name: "Gym Name",
            distance: "5 km away",
            status: "Open Now",
            categories: "Gym, Yoga +21",
            location: "City, State",
            rating: 4.7,
            reviews: 50,
            buttonText: "Book Now",
        },
        {
            id: 8,
            imageUrl: "/images/gym-placeholder.jpg",
            label: "Morning",
            name: "Fitness Center",
            distance: "3 km away",
            status: "Closed",
            categories: "Cardio, Zumba +12",
            location: "Town, State",
            rating: 4.5,
            reviews: 30,
            buttonText: "View Details",
        },
        {
            id: 9,
            imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
            label: "Evening",
            name: "Gym Name",
            distance: "5 km away",
            status: "Open Now",
            categories: "Gym, Yoga +21",
            location: "City, State",
            rating: 4.7,
            reviews: 50,
            buttonText: "Book Now",
        }
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [SingleCategory, setSingleCategory] = useState("All");
    const [content, setContent] = useState("");
    const [postedAt, setPostedAt] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<string[]>([]);
    const [liveSession, setLiveSession] = useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [dialogOpen, setDialogOpen] = useState(false);

    // const { state, fetchData, } = General();

    // useEffect(() => {
    //     fetchData(GET_PLACES, {
    //         latitude: 28.5355,
    //         longitude: 77.391,
    //         radius: 10000,
    //         keyword: "gym,yoga",
    //     });
    // }, []);
    // console.log("state",state);

    const filterCategories = [
        "YOGA",
        "MEDITATION",
        "CARDIO",
        "DANCE",
        "RECOVERY",
        "HIIT",
        "STRETCHING",
        "WARMUP",
        "PILATES",
        "KICKBOXING",
        "STRENGTH",
    ];

    const time = ["Any Time", "Morning", "Afternoon", "Evening"];

    const Amenities = ["SHOWER", "SWIMMING POOL", "WATER COOLER", "WAITING LOUNGE", "AC", "TOWELS", "CHANGE ROOM", "SPA", "WATER", "WIFI", "SUPPLEMENTS STORE", "LOCKER"];

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const manageCategory = (categoryString: string) => {
        setCategories((prevSelectedCategories: string[]) => {
            if (prevSelectedCategories.includes(categoryString)) {
                // Remove categoryString if already selected
                return prevSelectedCategories.filter((item) => item !== categoryString);
            } else {
                // Add categoryString if not already selected
                return [...prevSelectedCategories, categoryString];
            }
        });
    };

    const manageOtherFilters = (categoryString: string, manageFor: string) => {
        if (manageFor === "amenities") {
            setSelectedAmenities((prevSelectedAmenities: string[]) => {
                if (prevSelectedAmenities.includes(categoryString)) {
                    return prevSelectedAmenities.filter(
                        (item) => item !== categoryString,
                    );
                } else {
                    return [...prevSelectedAmenities, categoryString];
                }
            });
        }
        if (manageFor === "ratings") {
            setSelectedRating((prevSelectedRating: string[]) => {
                if (prevSelectedRating.includes(categoryString)) {
                    return prevSelectedRating.filter((item) => item !== categoryString);
                } else {
                    return [...prevSelectedRating, categoryString];
                }
            });
        }
    };


    return (
        <div className="pt-[72px] md:pt-[72px]">
            <div className="flex relative w-full max-h-[522px] h-[320px] md:h-full justify-center items-center">
                <Image
                    src={GymHeader}
                    alt="man with dumbbell"
                    width={1280}
                    height={522}
                    className="hidden md:block w-full h-[522px]"
                    loading="lazy"
                />
                <div className="absolute flex flex-col justify-center items-center w-full max-w-[1140px]">
                    <h1 className="text-[24px] md:text-[72px] text-[#F5F5F5] font-extrabold leading-normal text-center">
                        Workouts & Live Sessions
                    </h1>
                    <p className="text-[18px] md:text-[32px] max-w-[710px] text-[#E5E5E5] font-normal md:font-regular leading-normal text-center mt-4 md:mt-6">
                        Curated by a team of fitness coaches for everybody, every mood,
                        every goal
                    </p>
                    <div className="flex justify-center items-center mt-4 md:mt-[52px]">
                        {/* desktop location,date,time search filter */}
                        <div className="hidden md:flex relative w-[481px] h-[50px]">
                            <div className="w-[500px] flex justify-center items-center">
                                <div className="w-[455px] flex gap-6 py-2 px-[10px] bg-[#171717] border-[1px] border-[#525252]" style={{ "borderRadius": "10px 0px 0px 10px" }}>
                                    <Popover>
                                        <PopoverTrigger className="flex gap-1 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <path d="M10.4995 1.66651C9.28411 1.66532 8.09156 1.99674 7.05106 2.62487C6.01055 3.253 5.16177 4.15389 4.59667 5.22993C4.03157 6.30596 3.77169 7.51612 3.8452 8.7293C3.91871 9.94247 4.32279 11.1124 5.01368 12.1123C5.04133 12.1667 5.07487 12.2178 5.11368 12.2648L5.21368 12.3865C5.30701 12.5073 5.40285 12.624 5.48535 12.7198L9.85618 18.0315C9.93455 18.1261 10.0329 18.2022 10.1441 18.2543C10.2553 18.3065 10.3767 18.3334 10.4995 18.3332C10.6227 18.3332 10.7444 18.306 10.8557 18.2534C10.9671 18.2008 11.0655 18.1242 11.1437 18.029L15.387 12.8582C15.5589 12.6734 15.7197 12.4786 15.8687 12.2748L15.9745 12.1457C16.0148 12.0967 16.049 12.043 16.0762 11.9857C16.7347 10.9801 17.1092 9.81524 17.1598 8.61431C17.2105 7.41337 16.9356 6.22108 16.3641 5.16361C15.7927 4.10615 14.9459 3.22287 13.9135 2.60725C12.8811 1.99163 11.7015 1.66658 10.4995 1.66651ZM10.4995 5.83317C10.994 5.83317 11.4773 5.9798 11.8884 6.2545C12.2996 6.5292 12.62 6.91965 12.8092 7.37647C12.9984 7.83328 13.0479 8.33595 12.9515 8.8209C12.855 9.30585 12.6169 9.75131 12.2673 10.1009C11.9177 10.4506 11.4722 10.6887 10.9872 10.7851C10.5023 10.8816 9.99962 10.8321 9.54281 10.6429C9.08599 10.4537 8.69554 10.1332 8.42084 9.7221C8.14614 9.31098 7.99951 8.82763 7.99951 8.33317C7.99951 7.67013 8.26291 7.03425 8.73175 6.56541C9.20059 6.09657 9.83647 5.83317 10.4995 5.83317Z" fill="#A3A3A3" />
                                            </svg>
                                            <span className="text-[#A3A3A3] text-[16px] font-medium leading-[24px] cursor-pointer">Current Location</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex justify-start items-center gap-1 bg-[#171717] border-[1px] border-[#525252] mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M3.17532 2.06201C2.32866 1.76618 1.51532 2.57951 1.81116 3.42618L6.74866 17.5345C7.06949 18.4495 8.34449 18.5012 8.73782 17.6153L11.1203 12.2553L7.76699 8.90118C7.76699 8.90118 8.7497 10.1132 8.86421 9.99868C8.44755 10.4153 11.1203 12.2553 11.1203 12.2553L17.3645 8.98868C18.2503 8.59452 18.1978 7.32035 17.2837 6.99952L3.17532 2.06201Z" fill="#A3A3A3" />
                                            </svg>
                                            <span className="text-[#A3A3A3] text-[16px] font-medium leading-[24px] cursor-pointer">Current Location</span>
                                        </PopoverContent>
                                    </Popover>
                                    <span className="text-[#A3A3A3] text-[16px] font-medium leading-[24px]">|</span>
                                    <Popover>
                                        <PopoverTrigger className="flex gap-1 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <path d="M3 16C3 16.3978 3.15804 16.7794 3.43934 17.0607C3.72064 17.342 4.10218 17.5 4.5 17.5H16.5C16.8978 17.5 17.2794 17.342 17.5607 17.0607C17.842 16.7794 18 16.3978 18 16V8.5H3V16ZM13.5 10.375C13.5 10.2755 13.5395 10.1802 13.6098 10.1098C13.6802 10.0395 13.7755 10 13.875 10H14.625C14.7245 10 14.8198 10.0395 14.8902 10.1098C14.9605 10.1802 15 10.2755 15 10.375V11.125C15 11.2245 14.9605 11.3198 14.8902 11.3902C14.8198 11.4605 14.7245 11.5 14.625 11.5H13.875C13.7755 11.5 13.6802 11.4605 13.6098 11.3902C13.5395 11.3198 13.5 11.2245 13.5 11.125V10.375ZM13.5 13.375C13.5 13.2755 13.5395 13.1802 13.6098 13.1098C13.6802 13.0395 13.7755 13 13.875 13H14.625C14.7245 13 14.8198 13.0395 14.8902 13.1098C14.9605 13.1802 15 13.2755 15 13.375V14.125C15 14.2245 14.9605 14.3198 14.8902 14.3902C14.8198 14.4605 14.7245 14.5 14.625 14.5H13.875C13.7755 14.5 13.6802 14.4605 13.6098 14.3902C13.5395 14.3198 13.5 14.2245 13.5 14.125V13.375ZM9.75 10.375C9.75 10.2755 9.78951 10.1802 9.85983 10.1098C9.93016 10.0395 10.0255 10 10.125 10H10.875C10.9745 10 11.0698 10.0395 11.1402 10.1098C11.2105 10.1802 11.25 10.2755 11.25 10.375V11.125C11.25 11.2245 11.2105 11.3198 11.1402 11.3902C11.0698 11.4605 10.9745 11.5 10.875 11.5H10.125C10.0255 11.5 9.93016 11.4605 9.85983 11.3902C9.78951 11.3198 9.75 11.2245 9.75 11.125V10.375ZM9.75 13.375C9.75 13.2755 9.78951 13.1802 9.85983 13.1098C9.93016 13.0395 10.0255 13 10.125 13H10.875C10.9745 13 11.0698 13.0395 11.1402 13.1098C11.2105 13.1802 11.25 13.2755 11.25 13.375V14.125C11.25 14.2245 11.2105 14.3198 11.1402 14.3902C11.0698 14.4605 10.9745 14.5 10.875 14.5H10.125C10.0255 14.5 9.93016 14.4605 9.85983 14.3902C9.78951 14.3198 9.75 14.2245 9.75 14.125V13.375ZM6 10.375C6 10.2755 6.03951 10.1802 6.10984 10.1098C6.18016 10.0395 6.27554 10 6.375 10H7.125C7.22446 10 7.31984 10.0395 7.39016 10.1098C7.46049 10.1802 7.5 10.2755 7.5 10.375V11.125C7.5 11.2245 7.46049 11.3198 7.39016 11.3902C7.31984 11.4605 7.22446 11.5 7.125 11.5H6.375C6.27554 11.5 6.18016 11.4605 6.10984 11.3902C6.03951 11.3198 6 11.2245 6 11.125V10.375ZM6 13.375C6 13.2755 6.03951 13.1802 6.10984 13.1098C6.18016 13.0395 6.27554 13 6.375 13H7.125C7.22446 13 7.31984 13.0395 7.39016 13.1098C7.46049 13.1802 7.5 13.2755 7.5 13.375V14.125C7.5 14.2245 7.46049 14.3198 7.39016 14.3902C7.31984 14.4605 7.22446 14.5 7.125 14.5H6.375C6.27554 14.5 6.18016 14.4605 6.10984 14.3902C6.03951 14.3198 6 14.2245 6 14.125V13.375Z" fill="#A3A3A3" />
                                                <path d="M18 5.5C18 5.10218 17.842 4.72064 17.5607 4.43934C17.2794 4.15804 16.8978 4 16.5 4H15V3.25C15 3.05109 14.921 2.86032 14.7803 2.71967C14.6397 2.57902 14.4489 2.5 14.25 2.5C14.0511 2.5 13.8603 2.57902 13.7197 2.71967C13.579 2.86032 13.5 3.05109 13.5 3.25V4H11.25V3.25C11.25 3.05109 11.171 2.86032 11.0303 2.71967C10.8897 2.57902 10.6989 2.5 10.5 2.5C10.3011 2.5 10.1103 2.57902 9.96967 2.71967C9.82902 2.86032 9.75 3.05109 9.75 3.25V4H7.5V3.25C7.5 3.05109 7.42098 2.86032 7.28033 2.71967C7.13968 2.57902 6.94891 2.5 6.75 2.5C6.55109 2.5 6.36032 2.57902 6.21967 2.71967C6.07902 2.86032 6 3.05109 6 3.25V4H4.5C4.10218 4 3.72064 4.15804 3.43934 4.43934C3.15804 4.72064 3 5.10218 3 5.5V7H18V5.5Z" fill="#A3A3A3" />
                                            </svg>
                                            <span className="text-[#A3A3A3] text-[16px] font-medium leading-[24px] cursor-pointer">Any Date</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex justify-start items-center gap-1 bg-[#171717] border-[1px] border-[#525252] py-0 pl-2 pr-0 mt-2 ">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                //   onSelect={(day) => {
                                                //     if (day && isDateAllowed(day)) {
                                                //       setCalenderDate(day); // Only allow selecting if date is in allowedDates
                                                //     }
                                                //   }}
                                                className="text-white rounded-[8px]"
                                                //   disabled={(day) => !isDateAllowed(day)} // Disable dates not in allowed list
                                                //   modifiers={{
                                                //     today: (date) => false, // Prevent today from being highlighted
                                                //     allowed: (date) => isDateAllowed(date), // Custom modifier for allowed dates
                                                //   }}
                                                modifiersClassNames={{
                                                    allowed: "text-white", // Highlight allowed dates
                                                    // selected: calenderDate ? "bg-orange-500 text-white" : "", // Use orange for selected
                                                    today: "", // Remove styling for today if it's not in allowedDates
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <span className="text-[#A3A3A3] text-[16px] font-medium leading-[24px]">|</span>
                                    <Popover>
                                        <PopoverTrigger className="flex gap-1 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <path d="M10.5003 1.6665C8.85215 1.6665 7.24099 2.15525 5.87058 3.07092C4.50017 3.9866 3.43206 5.28809 2.80133 6.81081C2.1706 8.33353 2.00558 10.0091 2.32712 11.6256C2.64866 13.2421 3.44234 14.727 4.60777 15.8924C5.77321 17.0578 7.25807 17.8515 8.87458 18.173C10.4911 18.4946 12.1666 18.3296 13.6894 17.6988C15.2121 17.0681 16.5136 16 17.4292 14.6296C18.3449 13.2592 18.8337 11.648 18.8337 9.99984C18.8312 7.79044 17.9525 5.67224 16.3902 4.10996C14.8279 2.54768 12.7097 1.66893 10.5003 1.6665ZM13.8187 13.3182C13.6624 13.4744 13.4505 13.5622 13.2295 13.5622C13.0085 13.5622 12.7966 13.4744 12.6403 13.3182L9.912 10.5898C9.75612 10.4329 9.66813 10.221 9.667 9.99984V6.6665C9.667 6.44549 9.75479 6.23353 9.91107 6.07725C10.0674 5.92097 10.2793 5.83317 10.5003 5.83317C10.7213 5.83317 10.9333 5.92097 11.0896 6.07725C11.2459 6.23353 11.3337 6.44549 11.3337 6.6665V9.65484L13.8187 12.1398C13.9749 12.2961 14.0627 12.508 14.0627 12.729C14.0627 12.95 13.9749 13.1619 13.8187 13.3182Z" fill="#A3A3A3" />
                                            </svg>
                                            <span className="text-[#A3A3A3] text-[16px] font-medium leading-[24px] cursor-pointer">Any Time</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto bg-[#171717] border-[1px] border-[#525252] mt-2">
                                            <div className="flex gap-3">
                                                {time.map((item) => (
                                                    <button key={item} className="bg-[#262626] rounded-[8px] py-2 px-3 text-[12px] text-[#FFFFFF] font-medium leading-[18px]">
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex mt-4 gap-4">
                                                <Select>
                                                    <SelectTrigger className="w-[150px] bg-[#171717] text-[#A3A3A3] border-[1px] border-[#525252] rounded-[10px] flex items-center">
                                                        <div className="flex gap-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                className=""
                                                            >
                                                                <path
                                                                    d="M9.99984 1.6665C8.35166 1.6665 6.7405 2.15525 5.37009 3.07092C3.99968 3.9866 2.93158 5.28809 2.30084 6.81081C1.67011 8.33353 1.50509 10.0091 1.82663 11.6256C2.14817 13.2421 2.94185 14.727 4.10728 15.8924C5.27272 17.0578 6.75758 17.8515 8.37409 18.173C9.9906 18.4946 11.6662 18.3296 13.1889 17.6988C14.7116 17.0681 16.0131 16 16.9288 14.6296C17.8444 13.2592 18.3332 11.648 18.3332 9.99984C18.3307 7.79044 17.452 5.67224 15.8897 4.10996C14.3274 2.54768 12.2092 1.66893 9.99984 1.6665ZM13.3182 13.3182C13.1619 13.4744 12.95 13.5622 12.729 13.5622C12.508 13.5622 12.2961 13.4744 12.1398 13.3182L9.41151 10.5898C9.25563 10.4329 9.16764 10.221 9.16651 9.99984V6.6665C9.16651 6.44549 9.25431 6.23353 9.41059 6.07725C9.56687 5.92097 9.77883 5.83317 9.99984 5.83317C10.2209 5.83317 10.4328 5.92097 10.5891 6.07725C10.7454 6.23353 10.8332 6.44549 10.8332 6.6665V9.65484L13.3182 12.1398C13.4744 12.2961 13.5622 12.508 13.5622 12.729C13.5622 12.95 13.4744 13.1619 13.3182 13.3182Z"
                                                                    fill="#A3A3A3"
                                                                />
                                                            </svg>
                                                            <SelectValue placeholder="From" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">5</SelectItem>
                                                        <SelectItem value="dark">6</SelectItem>
                                                        <SelectItem value="system">7</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <Select>
                                                    <SelectTrigger className="w-[150px] bg-[#171717] text-[#A3A3A3] border-[1px] border-[#525252] rounded-[10px] flex items-center">
                                                        <div className="flex gap-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                className=""
                                                            >
                                                                <path
                                                                    d="M9.99984 1.6665C8.35166 1.6665 6.7405 2.15525 5.37009 3.07092C3.99968 3.9866 2.93158 5.28809 2.30084 6.81081C1.67011 8.33353 1.50509 10.0091 1.82663 11.6256C2.14817 13.2421 2.94185 14.727 4.10728 15.8924C5.27272 17.0578 6.75758 17.8515 8.37409 18.173C9.9906 18.4946 11.6662 18.3296 13.1889 17.6988C14.7116 17.0681 16.0131 16 16.9288 14.6296C17.8444 13.2592 18.3332 11.648 18.3332 9.99984C18.3307 7.79044 17.452 5.67224 15.8897 4.10996C14.3274 2.54768 12.2092 1.66893 9.99984 1.6665ZM13.3182 13.3182C13.1619 13.4744 12.95 13.5622 12.729 13.5622C12.508 13.5622 12.2961 13.4744 12.1398 13.3182L9.41151 10.5898C9.25563 10.4329 9.16764 10.221 9.16651 9.99984V6.6665C9.16651 6.44549 9.25431 6.23353 9.41059 6.07725C9.56687 5.92097 9.77883 5.83317 9.99984 5.83317C10.2209 5.83317 10.4328 5.92097 10.5891 6.07725C10.7454 6.23353 10.8332 6.44549 10.8332 6.6665V9.65484L13.3182 12.1398C13.4744 12.2961 13.5622 12.508 13.5622 12.729C13.5622 12.95 13.4744 13.1619 13.3182 13.3182Z"
                                                                    fill="#A3A3A3"
                                                                />
                                                            </svg>
                                                            <SelectValue placeholder="To" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">6</SelectItem>
                                                        <SelectItem value="dark">7</SelectItem>
                                                        <SelectItem value="system">8</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <button className="w-[45px] px-2 py-[10px] border-[1px] border-[#525252]" style={{ "borderRadius": "0px 8px 8px 0px", "background": "var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%))" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M9.00007 14.5C7.81337 14.5 6.65332 14.1481 5.66661 13.4888C4.67991 12.8295 3.91086 11.8925 3.45673 10.7961C3.0026 9.69974 2.88378 8.49334 3.11529 7.32946C3.34681 6.16557 3.91826 5.09648 4.75738 4.25736C5.59651 3.41825 6.66562 2.8468 7.82952 2.61529C8.99342 2.38378 10.1998 2.5026 11.2962 2.95673C12.3926 3.41085 13.3297 4.17989 13.9889 5.16658C14.6482 6.15327 15.0001 7.31331 15.0001 8.5C14.9984 10.0907 14.3656 11.6158 13.2408 12.7407C12.1159 13.8655 10.5908 14.4982 9.00007 14.5ZM9.00007 4C8.11005 4 7.24001 4.26392 6.49998 4.75839C5.75995 5.25285 5.18316 5.95566 4.84257 6.77793C4.50197 7.60019 4.41285 8.50499 4.58649 9.37791C4.76012 10.2508 5.18871 11.0526 5.81805 11.682C6.4474 12.3113 7.24923 12.7399 8.12216 12.9135C8.99508 13.0872 9.89989 12.998 10.7222 12.6575C11.5444 12.3169 12.2473 11.7401 12.7417 11.0001C13.2362 10.26 13.5001 9.39002 13.5001 8.5C13.4989 7.30689 13.0244 6.16299 12.1808 5.31934C11.3371 4.47568 10.1932 4.00119 9.00007 4Z" fill="white" />
                                        <path d="M17.2502 17.5C17.0513 17.5 16.8605 17.4209 16.7199 17.2803L13.7199 14.2803C13.5832 14.1388 13.5076 13.9493 13.5094 13.7527C13.5111 13.5561 13.5899 13.3679 13.729 13.2289C13.8681 13.0898 14.0562 13.011 14.2528 13.0092C14.4495 13.0075 14.6389 13.0831 14.7804 13.2198L17.7804 16.2198C17.8853 16.3246 17.9567 16.4583 17.9856 16.6037C18.0145 16.7492 17.9997 16.9 17.9429 17.037C17.8862 17.174 17.7901 17.2911 17.6667 17.3736C17.5434 17.456 17.3985 17.5 17.2502 17.5Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile location,date,time search filter */}
                        <div className="flex flex-col gap-4 md:hidden bg-[#262626] max-w-[328px] w-auto  rounded-[12px] p-3">

                            {/* <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label> */}
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99951 1.66651C8.78411 1.66532 7.59156 1.99674 6.55106 2.62487C5.51055 3.253 4.66177 4.15389 4.09667 5.22993C3.53157 6.30596 3.27169 7.51612 3.3452 8.7293C3.41871 9.94247 3.82279 11.1124 4.51368 12.1123C4.54133 12.1667 4.57487 12.2178 4.61368 12.2648L4.71368 12.3865C4.80701 12.5073 4.90285 12.624 4.98535 12.7198L9.35618 18.0315C9.43455 18.1261 9.53286 18.2022 9.64408 18.2543C9.7553 18.3065 9.87668 18.3334 9.99951 18.3332C10.1227 18.3332 10.2444 18.306 10.3557 18.2534C10.4671 18.2008 10.5655 18.1242 10.6437 18.029L14.887 12.8582C15.0589 12.6734 15.2197 12.4786 15.3687 12.2748L15.4745 12.1457C15.5148 12.0967 15.549 12.043 15.5762 11.9857C16.2347 10.9801 16.6092 9.81524 16.6598 8.61431C16.7105 7.41337 16.4356 6.22108 15.8641 5.16361C15.2927 4.10615 14.4459 3.22287 13.4135 2.60725C12.3811 1.99163 11.2015 1.66658 9.99951 1.66651ZM9.99951 5.83317C10.494 5.83317 10.9773 5.9798 11.3884 6.2545C11.7996 6.5292 12.12 6.91965 12.3092 7.37647C12.4984 7.83328 12.5479 8.33595 12.4515 8.8209C12.355 9.30585 12.1169 9.75131 11.7673 10.1009C11.4177 10.4506 10.9722 10.6887 10.4872 10.7851C10.0023 10.8816 9.49962 10.8321 9.04281 10.6429C8.58599 10.4537 8.19554 10.1332 7.92084 9.7221C7.64614 9.31098 7.49951 8.82763 7.49951 8.33317C7.49951 7.67013 7.76291 7.03425 8.23175 6.56541C8.70059 6.09657 9.33647 5.83317 9.99951 5.83317Z" fill="#A3A3A3" />
                                    </svg>
                                </div>
                                <input type="text" id="input-group-1" className="bg-[#171717] border border-[#525252] text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Current Location" />
                            </div>

                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[150px] bg-[#171717] text-[#A3A3A3] border-[1px] border-[#525252] rounded-[10px] flex items-center">
                                        <div className="flex gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                className=""
                                            >
                                                <path
                                                    d="M9.99984 1.6665C8.35166 1.6665 6.7405 2.15525 5.37009 3.07092C3.99968 3.9866 2.93158 5.28809 2.30084 6.81081C1.67011 8.33353 1.50509 10.0091 1.82663 11.6256C2.14817 13.2421 2.94185 14.727 4.10728 15.8924C5.27272 17.0578 6.75758 17.8515 8.37409 18.173C9.9906 18.4946 11.6662 18.3296 13.1889 17.6988C14.7116 17.0681 16.0131 16 16.9288 14.6296C17.8444 13.2592 18.3332 11.648 18.3332 9.99984C18.3307 7.79044 17.452 5.67224 15.8897 4.10996C14.3274 2.54768 12.2092 1.66893 9.99984 1.6665ZM13.3182 13.3182C13.1619 13.4744 12.95 13.5622 12.729 13.5622C12.508 13.5622 12.2961 13.4744 12.1398 13.3182L9.41151 10.5898C9.25563 10.4329 9.16764 10.221 9.16651 9.99984V6.6665C9.16651 6.44549 9.25431 6.23353 9.41059 6.07725C9.56687 5.92097 9.77883 5.83317 9.99984 5.83317C10.2209 5.83317 10.4328 5.92097 10.5891 6.07725C10.7454 6.23353 10.8332 6.44549 10.8332 6.6665V9.65484L13.3182 12.1398C13.4744 12.2961 13.5622 12.508 13.5622 12.729C13.5622 12.95 13.4744 13.1619 13.3182 13.3182Z"
                                                    fill="#A3A3A3"
                                                />
                                            </svg>
                                            <SelectValue placeholder="From" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">5</SelectItem>
                                        <SelectItem value="dark">6</SelectItem>
                                        <SelectItem value="system">7</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="w-[150px] bg-[#171717] text-[#A3A3A3] border-[1px] border-[#525252] rounded-[10px] flex items-center">
                                        <div className="flex gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                className=""
                                            >
                                                <path
                                                    d="M9.99984 1.6665C8.35166 1.6665 6.7405 2.15525 5.37009 3.07092C3.99968 3.9866 2.93158 5.28809 2.30084 6.81081C1.67011 8.33353 1.50509 10.0091 1.82663 11.6256C2.14817 13.2421 2.94185 14.727 4.10728 15.8924C5.27272 17.0578 6.75758 17.8515 8.37409 18.173C9.9906 18.4946 11.6662 18.3296 13.1889 17.6988C14.7116 17.0681 16.0131 16 16.9288 14.6296C17.8444 13.2592 18.3332 11.648 18.3332 9.99984C18.3307 7.79044 17.452 5.67224 15.8897 4.10996C14.3274 2.54768 12.2092 1.66893 9.99984 1.6665ZM13.3182 13.3182C13.1619 13.4744 12.95 13.5622 12.729 13.5622C12.508 13.5622 12.2961 13.4744 12.1398 13.3182L9.41151 10.5898C9.25563 10.4329 9.16764 10.221 9.16651 9.99984V6.6665C9.16651 6.44549 9.25431 6.23353 9.41059 6.07725C9.56687 5.92097 9.77883 5.83317 9.99984 5.83317C10.2209 5.83317 10.4328 5.92097 10.5891 6.07725C10.7454 6.23353 10.8332 6.44549 10.8332 6.6665V9.65484L13.3182 12.1398C13.4744 12.2961 13.5622 12.508 13.5622 12.729C13.5622 12.95 13.4744 13.1619 13.3182 13.3182Z"
                                                    fill="#A3A3A3"
                                                />
                                            </svg>
                                            <SelectValue placeholder="To" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">6</SelectItem>
                                        <SelectItem value="dark">7</SelectItem>
                                        <SelectItem value="system">8</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-between items-center">
                                <Button className="primaryButton text-[18px] text-[#E5E5E5] font-semibold leading-normal max-w-[250px] w-full">
                                    Search
                                </Button>

                                <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <DrawerTrigger className="filterBtn rounded-full border-[1px] border-[#D1D5DB] p-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path d="M18 14V4V14Z" fill="#D1D5DB" />
                                            <path
                                                d="M12 6V4M12 6C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10M12 6C12.5304 6 13.0391 6.21071 13.4142 6.58579C13.7893 6.96086 14 7.46957 14 8C14 8.53043 13.7893 9.03914 13.4142 9.41421C13.0391 9.78929 12.5304 10 12 10M12 10V20M6 18C6.53043 18 7.03914 17.7893 7.41421 17.4142C7.78929 17.0391 8 16.5304 8 16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14M6 18C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16C4 15.4696 4.21071 14.9609 4.58579 14.5858C4.96086 14.2107 5.46957 14 6 14M6 18V20M6 14V4M18 18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16C20 15.4696 19.7893 14.9609 19.4142 14.5858C19.0391 14.2107 18.5304 14 18 14M18 18C17.4696 18 16.9609 17.7893 16.5858 17.4142C16.2107 17.0391 16 16.5304 16 16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14M18 18V20M18 14V4"
                                                stroke="#D1D5DB"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </DrawerTrigger>
                                    <DrawerContent
                                        style={{
                                            borderRadius: "var(--rounded-2xl, 16px)",
                                            border: "1px solid var(--Neutral-700, #404040)",
                                            background:
                                                "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                                            backdropFilter: "blur(100px)",
                                        }}
                                    >
                                        <DrawerHeader>
                                            <DrawerTitle className="text-[24px] text-[#FFF] font-bold leading-normal border-b-[1px] border-[#a3a3a352] pb-3">
                                                Refine by
                                            </DrawerTitle>
                                            <DrawerDescription>
                                                <div className="flex w-full flex-col justify-start items-start gap-4 mb-[18px] max-h-[60vh] overflow-y-auto py-3">

                                                    <div className="flex w-full flex-col justify-start items-start gap-4 pb-4 border-b-[1px] border-[#a3a3a352]">
                                                        <h2 className="text-[20px] text-[#F5F5F5] font-medium leading-[30px]">
                                                            Categories
                                                        </h2>
                                                        <div className="flex flex-wrap items-center justify-start w-full gap-2">
                                                            {filterCategories.map((item) => {
                                                                const formattedItem = capitalizeFirstLetter(
                                                                    item.toLowerCase(),
                                                                );
                                                                return (
                                                                    <div
                                                                        key={item}
                                                                        onClick={() => manageCategory(formattedItem)}
                                                                        className={`${categories.includes(formattedItem) || SingleCategory === formattedItem ? "fitness-level-selected font-semibold" : ""}
                                inline-block mb-1 px-4 py-2 bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-start w-full gap-2 pb-1 border-b-[1px] border-[#a3a3a352]">
                                                        <Accordion type="single" collapsible className="w-full">
                                                            <AccordionItem value="item-1" className="border-b-0">
                                                                <AccordionTrigger className="text-[20px] text-[#F5F5F5] font-medium leading-[30px]">
                                                                    Amenities
                                                                </AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div className="flex flex-wrap items-center justify-start w-full gap-2 cursor-pointer">
                                                                        {Amenities.map((item) => (
                                                                            <div
                                                                                key={item}
                                                                                onClick={() =>
                                                                                    manageOtherFilters(item, "amenities")
                                                                                }
                                                                                className={`${selectedAmenities.includes(item) ? "fitness-level-selected font-semibold" : ""}
                                inline-block py-2 px-4 bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                                                                            >
                                                                                {item}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </div>

                                                    <div className="flex items-center justify-start w-full gap-2">
                                                        <Accordion type="single" collapsible className="w-full">
                                                            <AccordionItem value="item-1" className="border-b-0">
                                                                <AccordionTrigger className="text-[20px] text-[#F5F5F5] font-medium leading-[30px]">
                                                                    Rating
                                                                </AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div className="flex flex-wrap items-center justify-start w-full gap-2 cursor-pointer">
                                                                        <div className="flex flex-wrap gap-3">
                                                                            {[5, 4, 3, 2, 1].map((value) => (
                                                                                <Rating
                                                                                    key={value}
                                                                                    value={value}
                                                                                    selectedRating={selectedRating}
                                                                                    setSelectedRating={setSelectedRating}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </div>
                                                </div>
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerFooter className="border-t-[1px] border-[#a3a3a352]">
                                            <div className="flex items-center justify-between w-full ">
                                                <span
                                                    // onClick={clearFields}
                                                    className="text-[24px] text-[#A3A3A3] font-medium leading-[36px] underline cursor-pointer"
                                                >
                                                    Clear all
                                                </span>
                                                <DrawerClose>
                                                    <Button
                                                        className="filterBtn text-[16px] text-[#FFF] font-semibold leading-[24px]"
                                                        style={{
                                                            borderRadius: "var(--rounded-lg, 8px)",
                                                            border: "2px solid var(--Neutral-300, #D4D4D4)",
                                                            background:
                                                                "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                                                            backdropFilter: "blur(100px)",
                                                        }}
                                                    // onClick={() => fetchVideos(currentPage)}
                                                    >
                                                        Apply Filter
                                                    </Button>
                                                </DrawerClose>
                                            </div>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* desktop carousel  */}
            <div className="hidden md:h-[91px] bg-[#171717] z-50 sticky top-[70px] md:flex w-full justify-center items-center pl-[120px] pr-[60px] border-y-[1.5px] border-y-[#262626] py-4">
                <div className="w-[1200px] max-w-[1200px] flex justify-between items-center">
                    <Carousel
                        opts={{ align: "start" }}
                        className="w-full flex justify-center items-center md:max-w-[600px] xl:max-w-[790px] mr-[80px]"
                    >
                        <CarouselContent>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[24px]">
                                <div className="bg-[#171717] flex justify-center items-center relative">
                                    <button
                                        onClick={() => setSingleCategory("All")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "All" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_6618_3177)">
                                                    <path
                                                        d="M33.71 17.2908L18.71 2.29079C18.5227 2.10454 18.2692 2 18.005 2C17.7408 2 17.4874 2.10454 17.3 2.29079L2.30003 17.2908C2.1362 17.4821 2.05059 17.7282 2.06032 17.9798C2.07004 18.2315 2.17437 18.4703 2.35246 18.6484C2.53056 18.8265 2.7693 18.9308 3.02097 18.9405C3.27265 18.9502 3.51873 18.8646 3.71003 18.7008L18 4.41079L32.29 18.7108C32.4813 18.8746 32.7274 18.9602 32.9791 18.9505C33.2308 18.9408 33.4695 18.8365 33.6476 18.6584C33.8257 18.4803 33.93 18.2415 33.9397 17.9898C33.9495 17.7382 33.8639 17.4921 33.7 17.3008L33.71 17.2908Z"
                                                        fill="url(#paint0_linear_6618_3177)"
                                                    />
                                                    <path
                                                        d="M28 32.0017H23V22.0017H13V32.0017H8V18.0017L6 20.0017V32.0017C6 32.5322 6.21071 33.0409 6.58579 33.4159C6.96086 33.791 7.46957 34.0017 8 34.0017H15V24.0017H21V34.0017H28C28.5304 34.0017 29.0391 33.791 29.4142 33.4159C29.7893 33.0409 30 32.5322 30 32.0017V19.7617L28 17.7617V32.0017Z"
                                                        fill="url(#paint1_linear_6618_3177)"
                                                    />
                                                </g>
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_6618_3177"
                                                        x1="0.833381"
                                                        y1="12.82"
                                                        x2="35.0135"
                                                        y2="12.8304"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_6618_3177"
                                                        x1="5.07692"
                                                        y1="28.1277"
                                                        x2="30.8078"
                                                        y2="28.1338"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_6618_3177">
                                                        <rect width="36" height="36" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_7678_44161)">
                                                    <path
                                                        d="M33.71 17.2908L18.71 2.29079C18.5227 2.10454 18.2692 2 18.005 2C17.7408 2 17.4874 2.10454 17.3 2.29079L2.30003 17.2908C2.1362 17.4821 2.05059 17.7282 2.06032 17.9798C2.07004 18.2315 2.17437 18.4703 2.35246 18.6484C2.53056 18.8265 2.7693 18.9308 3.02097 18.9405C3.27265 18.9502 3.51873 18.8646 3.71003 18.7008L18 4.41079L32.29 18.7108C32.4813 18.8746 32.7274 18.9602 32.9791 18.9505C33.2308 18.9408 33.4695 18.8365 33.6476 18.6584C33.8257 18.4803 33.93 18.2415 33.9397 17.9898C33.9495 17.7382 33.8639 17.4921 33.7 17.3008L33.71 17.2908Z"
                                                        fill="#D4D4D4"
                                                    />
                                                    <path
                                                        d="M28 32.0017H23V22.0017H13V32.0017H8V18.0017L6 20.0017V32.0017C6 32.5322 6.21071 33.0409 6.58579 33.4159C6.96086 33.791 7.46957 34.0017 8 34.0017H15V24.0017H21V34.0017H28C28.5304 34.0017 29.0391 33.791 29.4142 33.4159C29.7893 33.0409 30 32.5322 30 32.0017V19.7617L28 17.7617V32.0017Z"
                                                        fill="#D4D4D4"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_7678_44161">
                                                        <rect width="36" height="36" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        )}

                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "All" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"} font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            ALL
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] flex justify-center items-center relative">
                                    <button
                                        onClick={() => setSingleCategory("Yoga")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Yoga" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M21.7499 7.5C21.7499 8.49456 21.3549 9.44839 20.6516 10.1517C19.9483 10.8549 18.9945 11.25 17.9999 11.25C17.0054 11.25 16.0516 10.8549 15.3483 10.1517C14.645 9.44839 14.2499 8.49456 14.2499 7.5C14.2499 6.50544 14.645 5.55161 15.3483 4.84835C16.0516 4.14509 17.0054 3.75 17.9999 3.75C18.9945 3.75 19.9483 4.14509 20.6516 4.84835C21.3549 5.55161 21.7499 6.50544 21.7499 7.5ZM23.2499 32.25C23.2499 32.4489 23.1709 32.6397 23.0303 32.7803C22.8896 32.921 22.6989 33 22.4999 33H9.64195C9.17634 33 8.72342 32.8483 8.35176 32.5678C7.9801 32.2873 7.70994 31.8934 7.5822 31.4457C7.45445 30.9979 7.47608 30.5208 7.64379 30.0864C7.81151 29.6521 8.11619 29.2842 8.5117 29.0385L12.4747 26.577C12.7997 26.3751 13.0679 26.0937 13.2538 25.7593C13.4398 25.4249 13.5374 25.0486 13.5374 24.666V24H15.3179C16.1135 23.9998 16.8765 23.6836 17.4389 23.121L17.9999 22.5607L18.5602 23.121C18.8389 23.3998 19.1698 23.6209 19.534 23.7717C19.8982 23.9225 20.2885 24.0001 20.6827 24H22.4999V24.669C22.5001 25.0505 22.5972 25.4257 22.7822 25.7593C22.9672 26.0929 23.2339 26.3741 23.5574 26.5763L27.4919 29.0355C27.8872 29.2823 28.1913 29.651 28.3584 30.086C28.5254 30.5209 28.5463 30.9985 28.4179 31.4463C28.2894 31.8942 28.0186 32.2881 27.6464 32.5684C27.2742 32.8487 26.8209 33.0002 26.3549 33H24.6224C24.705 32.7652 24.7499 32.5125 24.7499 32.25V32.0625C24.7499 31.5175 24.552 30.9911 24.1931 30.581C23.8342 30.1709 23.3386 29.9051 22.7984 29.8328L12.8872 28.5067C12.6916 28.4835 12.4948 28.5381 12.3391 28.6588C12.1835 28.7795 12.0816 28.9566 12.0554 29.1518C12.0292 29.3469 12.0808 29.5446 12.1991 29.7021C12.3174 29.8595 12.4929 29.9641 12.6877 29.9933L22.5997 31.3192C22.7797 31.3434 22.9448 31.4321 23.0644 31.5687C23.184 31.7054 23.2499 31.8809 23.2499 32.0625V32.25ZM19.6214 22.0605L18.7499 21.189V18.3825C18.8609 18.447 18.9659 18.5265 19.0604 18.621L20.4697 20.031C20.6104 20.1714 20.8012 20.2502 20.9999 20.25H23.2499C23.3777 20.2499 23.5034 20.2172 23.615 20.1549C23.7266 20.0927 23.8204 20.0029 23.8876 19.8942C23.9548 19.7855 23.993 19.6614 23.9988 19.5337C24.0045 19.4061 23.9776 19.2791 23.9204 19.1647L23.1704 17.6647C23.1283 17.5736 23.0683 17.4918 22.994 17.4242C22.9197 17.3567 22.8325 17.3047 22.7377 17.2715C22.6429 17.2383 22.5424 17.2244 22.4422 17.2308C22.342 17.2371 22.244 17.2635 22.1542 17.3084C22.0643 17.3534 21.9844 17.4159 21.9192 17.4923C21.854 17.5686 21.8048 17.6574 21.7745 17.7531C21.7442 17.8489 21.7335 17.9498 21.7429 18.0498C21.7523 18.1498 21.7818 18.2468 21.8294 18.3353L22.0364 18.75H21.3104L20.1209 17.5605C19.5584 16.9981 18.7954 16.6821 17.9999 16.6821C17.2045 16.6821 16.4415 16.9981 15.8789 17.5605L14.6894 18.75H13.9634L14.1704 18.3353C14.2181 18.2468 14.2476 18.1498 14.257 18.0498C14.2664 17.9498 14.2557 17.8489 14.2254 17.7531C14.1951 17.6574 14.1459 17.5686 14.0807 17.4923C14.0155 17.4159 13.9356 17.3534 13.8457 17.3084C13.7559 17.2635 13.6579 17.2371 13.5577 17.2308C13.4575 17.2244 13.357 17.2383 13.2622 17.2715C13.1674 17.3047 13.0802 17.3567 13.0059 17.4242C12.9316 17.4918 12.8716 17.5736 12.8294 17.6647L12.0794 19.1647C12.0223 19.2791 11.9954 19.4061 12.0011 19.5337C12.0069 19.6614 12.0451 19.7855 12.1123 19.8942C12.1795 20.0029 12.2733 20.0927 12.3849 20.1549C12.4965 20.2172 12.6222 20.2499 12.7499 20.25H14.9999C15.1988 20.25 15.3896 20.1709 15.5302 20.0303L16.9394 18.621C17.0347 18.5265 17.1389 18.447 17.2499 18.3825V21.189L16.3784 22.0605C16.0972 22.3418 15.7157 22.4999 15.3179 22.5H10.7894C10.5455 22.5 10.3053 22.4405 10.0895 22.3267C9.87381 22.2129 9.68908 22.0482 9.55136 21.8469C9.41365 21.6456 9.32711 21.4137 9.29924 21.1714C9.27138 20.929 9.30303 20.6836 9.39145 20.4562L11.6444 14.6625C11.8636 14.0991 12.2478 13.6151 12.7467 13.2739C13.2456 12.9326 13.836 12.75 14.4404 12.75H21.5594C22.1639 12.75 22.7543 12.9326 23.2532 13.2739C23.7521 13.6151 24.1363 14.0991 24.3554 14.6625L26.6092 20.4562C26.6977 20.6837 26.7293 20.9293 26.7014 21.1717C26.6734 21.4142 26.5867 21.6461 26.4489 21.8475C26.311 22.0489 26.126 22.2135 25.9101 22.3272C25.6942 22.4409 25.4537 22.5002 25.2097 22.5H20.6812C20.2834 22.4999 19.9019 22.3418 19.6207 22.0605"
                                                    fill="url(#paint0_linear_7678_44386)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_7678_44386"
                                                        x1="6.69227"
                                                        y1="22.4202"
                                                        x2="29.2078"
                                                        y2="22.4228"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M21.7499 7.5C21.7499 8.49456 21.3549 9.44839 20.6516 10.1517C19.9483 10.8549 18.9945 11.25 17.9999 11.25C17.0054 11.25 16.0516 10.8549 15.3483 10.1517C14.645 9.44839 14.2499 8.49456 14.2499 7.5C14.2499 6.50544 14.645 5.55161 15.3483 4.84835C16.0516 4.14509 17.0054 3.75 17.9999 3.75C18.9945 3.75 19.9483 4.14509 20.6516 4.84835C21.3549 5.55161 21.7499 6.50544 21.7499 7.5ZM23.2499 32.25C23.2499 32.4489 23.1709 32.6397 23.0303 32.7803C22.8896 32.921 22.6989 33 22.4999 33H9.64195C9.17634 33 8.72342 32.8483 8.35176 32.5678C7.9801 32.2873 7.70994 31.8934 7.5822 31.4457C7.45445 30.9979 7.47608 30.5208 7.64379 30.0864C7.81151 29.6521 8.11619 29.2842 8.5117 29.0385L12.4747 26.577C12.7997 26.3751 13.0679 26.0937 13.2538 25.7593C13.4398 25.4249 13.5374 25.0486 13.5374 24.666V24H15.3179C16.1135 23.9998 16.8765 23.6836 17.4389 23.121L17.9999 22.5607L18.5602 23.121C18.8389 23.3998 19.1698 23.6209 19.534 23.7717C19.8982 23.9225 20.2885 24.0001 20.6827 24H22.4999V24.669C22.5001 25.0505 22.5972 25.4257 22.7822 25.7593C22.9672 26.0929 23.2339 26.3741 23.5574 26.5763L27.4919 29.0355C27.8872 29.2823 28.1913 29.651 28.3584 30.086C28.5254 30.5209 28.5463 30.9985 28.4179 31.4463C28.2894 31.8942 28.0186 32.2881 27.6464 32.5684C27.2742 32.8487 26.8209 33.0002 26.3549 33H24.6224C24.705 32.7652 24.7499 32.5125 24.7499 32.25V32.0625C24.7499 31.5175 24.552 30.9911 24.1931 30.581C23.8342 30.1709 23.3386 29.9051 22.7984 29.8328L12.8872 28.5067C12.6916 28.4835 12.4948 28.5381 12.3391 28.6588C12.1835 28.7795 12.0816 28.9566 12.0554 29.1518C12.0292 29.3469 12.0808 29.5446 12.1991 29.7021C12.3174 29.8595 12.4929 29.9641 12.6877 29.9933L22.5997 31.3192C22.7797 31.3434 22.9448 31.4321 23.0644 31.5687C23.184 31.7054 23.2499 31.8809 23.2499 32.0625V32.25ZM19.6214 22.0605L18.7499 21.189V18.3825C18.8609 18.447 18.9659 18.5265 19.0604 18.621L20.4697 20.031C20.6104 20.1714 20.8012 20.2502 20.9999 20.25H23.2499C23.3777 20.2499 23.5034 20.2172 23.615 20.1549C23.7266 20.0927 23.8204 20.0029 23.8876 19.8942C23.9548 19.7855 23.993 19.6614 23.9988 19.5337C24.0045 19.4061 23.9776 19.2791 23.9204 19.1647L23.1704 17.6647C23.1283 17.5736 23.0683 17.4918 22.994 17.4242C22.9197 17.3567 22.8325 17.3047 22.7377 17.2715C22.6429 17.2383 22.5424 17.2244 22.4422 17.2308C22.342 17.2371 22.244 17.2635 22.1542 17.3084C22.0643 17.3534 21.9844 17.4159 21.9192 17.4923C21.854 17.5686 21.8048 17.6574 21.7745 17.7531C21.7442 17.8489 21.7335 17.9498 21.7429 18.0498C21.7523 18.1498 21.7818 18.2468 21.8294 18.3353L22.0364 18.75H21.3104L20.1209 17.5605C19.5584 16.9981 18.7954 16.6821 17.9999 16.6821C17.2045 16.6821 16.4415 16.9981 15.8789 17.5605L14.6894 18.75H13.9634L14.1704 18.3353C14.2181 18.2468 14.2476 18.1498 14.257 18.0498C14.2664 17.9498 14.2557 17.8489 14.2254 17.7531C14.1951 17.6574 14.1459 17.5686 14.0807 17.4923C14.0155 17.4159 13.9356 17.3534 13.8457 17.3084C13.7559 17.2635 13.6579 17.2371 13.5577 17.2308C13.4575 17.2244 13.357 17.2383 13.2622 17.2715C13.1674 17.3047 13.0802 17.3567 13.0059 17.4242C12.9316 17.4918 12.8716 17.5736 12.8294 17.6647L12.0794 19.1647C12.0223 19.2791 11.9954 19.4061 12.0011 19.5337C12.0069 19.6614 12.0451 19.7855 12.1123 19.8942C12.1795 20.0029 12.2733 20.0927 12.3849 20.1549C12.4965 20.2172 12.6222 20.2499 12.7499 20.25H14.9999C15.1988 20.25 15.3896 20.1709 15.5302 20.0303L16.9394 18.621C17.0347 18.5265 17.1389 18.447 17.2499 18.3825V21.189L16.3784 22.0605C16.0972 22.3418 15.7157 22.4999 15.3179 22.5H10.7894C10.5455 22.5 10.3053 22.4405 10.0895 22.3267C9.87381 22.2129 9.68908 22.0482 9.55136 21.8469C9.41365 21.6456 9.32711 21.4137 9.29924 21.1714C9.27138 20.929 9.30303 20.6836 9.39145 20.4562L11.6444 14.6625C11.8636 14.0991 12.2478 13.6151 12.7467 13.2739C13.2456 12.9326 13.836 12.75 14.4404 12.75H21.5594C22.1639 12.75 22.7543 12.9326 23.2532 13.2739C23.7521 13.6151 24.1363 14.0991 24.3554 14.6625L26.6092 20.4562C26.6977 20.6837 26.7293 20.9293 26.7014 21.1717C26.6734 21.4142 26.5867 21.6461 26.4489 21.8475C26.311 22.0489 26.126 22.2135 25.9101 22.3272C25.6942 22.4409 25.4537 22.5002 25.2097 22.5H20.6812C20.2834 22.4999 19.9019 22.3418 19.6207 22.0605"
                                                    fill="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Yoga" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            YOGA
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto  bg-[#171717] pl-[32px]">
                                <div className=" bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Meditation")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Meditation" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="28"
                                                viewBox="0 0 25 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M21.6479 35.9998H3.35148C1.92984 35.9998 0.777344 34.8474 0.777344 33.4257C0.777344 32.0041 1.92984 30.8516 3.35148 30.8516H21.6479C23.0696 30.8516 24.2221 32.0041 24.2221 33.4257C24.2221 34.8474 23.0696 35.9998 21.6479 35.9998Z"
                                                    fill="url(#paint0_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M24.223 33.4256C24.223 34.1366 23.9349 34.78 23.4691 35.2457C23.0034 35.7115 22.3593 35.9996 21.6482 35.9996H20.6797C21.1697 35.8862 21.6076 35.6373 21.9514 35.2936C22.4292 34.8157 22.7252 34.1553 22.7252 33.4256C22.7252 32.1725 21.8515 31.1219 20.6797 30.8516H21.6482C23.0705 30.8515 24.223 32.0041 24.223 33.4256Z"
                                                    fill="url(#paint1_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M20.6117 30.8516H4.38672C4.38672 31.8532 5.19869 32.6651 6.20029 32.6651H18.7981C19.7998 32.6651 20.6117 31.8532 20.6117 30.8516Z"
                                                    fill="url(#paint2_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M20.7118 28.2324L20.0444 22.4879C19.8559 20.8656 18.85 19.4821 17.4214 18.8803L15.7031 18.1565C15.1028 17.9036 14.7084 17.2863 14.7084 16.5994L14.7165 14.6953H10.2816L10.2897 16.5994C10.2897 17.2864 9.89541 17.9037 9.29508 18.1565L7.57679 18.8803C6.14811 19.4821 5.14222 20.8656 4.95378 22.4879L4.28637 28.2324C4.08767 29.9425 5.34155 31.4514 6.9612 31.4514H18.0369C19.6566 31.4515 20.9104 29.9425 20.7118 28.2324Z"
                                                    fill="url(#paint3_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M20.7113 28.2325L20.0437 22.4881C19.8554 20.8662 18.849 19.4825 17.4204 18.8806L15.7023 18.1567C15.1017 17.9042 14.7081 17.2865 14.7081 16.5997L14.7159 14.6953H13.2852L13.2773 17.3021C13.2773 17.989 13.6717 18.606 14.2723 18.8591L16.1345 19.7807C17.5631 20.3826 18.4247 21.568 18.6137 23.1906L19.2806 28.935C19.394 29.9128 19.0331 30.8244 18.4005 31.4256C19.839 31.2202 20.8946 29.8123 20.7113 28.2325Z"
                                                    fill="url(#paint4_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M8.70151 22.6055L8.29587 26.9689C8.24377 27.5294 8.65763 28.0154 9.18708 28.0154H12.0847C13.0335 28.0154 13.8027 28.7845 13.8027 29.7333C13.8027 30.6821 13.0335 31.4513 12.0847 31.4513H6.9612C5.34155 31.4513 4.08767 29.9424 4.28637 28.2323L4.95378 22.6055H8.70151Z"
                                                    fill="url(#paint5_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M14.0742 29.7018C14.083 30.1887 13.8888 30.6302 13.5709 30.9481C13.3056 31.2134 12.9547 31.3925 12.5631 31.4388C12.6181 31.2705 12.648 31.0915 12.648 30.9046C12.648 29.9553 11.8784 29.1864 10.9299 29.1864H8.032C7.50276 29.1864 7.08911 28.7 7.14114 28.1401L7.61174 23.5755C7.66856 23.0244 8.1329 22.6055 8.68689 22.6055H8.97341L8.56757 26.969C8.51554 27.5296 8.92919 28.0153 9.45843 28.0153H12.3172C13.2604 28.0152 14.0572 28.7588 14.0742 29.7018Z"
                                                    fill="url(#paint6_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M13.2789 29.3784C13.5154 29.2558 13.784 29.1864 14.0687 29.1864H16.9666C17.4958 29.1864 17.9095 28.7 17.8575 28.1401L17.3869 23.5755C17.33 23.0244 16.8657 22.6055 16.3117 22.6055H16.0252L16.431 26.969C16.4831 27.5296 16.0694 28.0153 15.5402 28.0153H12.6814C12.2552 28.0153 11.8588 28.1672 11.5508 28.4207L13.2789 29.3784Z"
                                                    fill="url(#paint7_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M12.5006 16.0441C14.8502 16.0441 16.755 14.1393 16.755 11.7896C16.755 9.43995 14.8502 7.53516 12.5006 7.53516C10.1509 7.53516 8.24609 9.43995 8.24609 11.7896C8.24609 14.1393 10.1509 16.0441 12.5006 16.0441Z"
                                                    fill="url(#paint8_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M16.7534 11.7903C16.7534 14.1404 14.8484 16.0447 12.499 16.0447C11.5825 16.0447 10.7337 15.7552 10.0391 15.2623C10.4121 15.3693 10.8065 15.4264 11.2138 15.4264C13.5639 15.4264 15.4682 13.5213 15.4682 11.172C15.4682 9.73765 14.7592 8.46949 13.6715 7.69922C15.4511 8.20849 16.7534 9.84748 16.7534 11.7903Z"
                                                    fill="url(#paint9_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M12.4998 5.40886C12.2043 5.40886 11.9648 5.16937 11.9648 4.87392V0.534938C11.9648 0.239484 12.2043 0 12.4998 0C12.7952 0 13.0347 0.239484 13.0347 0.534938V4.87399C13.0347 5.16937 12.7952 5.40886 12.4998 5.40886Z"
                                                    fill="url(#paint10_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M6.33131 8.97003C6.24054 8.97003 6.14864 8.9469 6.06434 8.89824L2.30663 6.72875C2.05083 6.58102 1.96308 6.25393 2.11081 5.99806C2.25839 5.74227 2.58556 5.65445 2.84149 5.80224L6.5992 7.97173C6.855 8.11946 6.94275 8.44656 6.79502 8.70242C6.69602 8.87406 6.51616 8.97003 6.33131 8.97003Z"
                                                    fill="url(#paint11_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M22.4212 18.2591C22.3304 18.2591 22.2385 18.236 22.1542 18.1873L18.3965 16.0178C18.1407 15.8701 18.0529 15.543 18.2006 15.2871C18.3483 15.0313 18.6754 14.9435 18.9313 15.0913L22.689 17.2608C22.9448 17.4085 23.0326 17.7356 22.8849 17.9915C22.7858 18.1631 22.606 18.2591 22.4212 18.2591Z"
                                                    fill="url(#paint12_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M21.7905 12.5308H19.6209C19.3254 12.5308 19.0859 12.2913 19.0859 11.9959C19.0859 11.7004 19.3254 11.4609 19.6209 11.4609H21.7905C22.086 11.4609 22.3254 11.7004 22.3254 11.9959C22.3254 12.2913 22.086 12.5308 21.7905 12.5308Z"
                                                    fill="url(#paint13_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M5.38035 12.5308H3.21072C2.91527 12.5308 2.67578 12.2913 2.67578 11.9959C2.67578 11.7004 2.91527 11.4609 3.21072 11.4609H5.38035C5.6758 11.4609 5.91529 11.7004 5.91529 11.9959C5.91529 12.2913 5.6758 12.5308 5.38035 12.5308Z"
                                                    fill="url(#paint14_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M2.57453 18.259C2.38968 18.259 2.20982 18.1631 2.11082 17.9915C1.96309 17.7356 2.05077 17.4085 2.30664 17.2608L6.06435 15.0913C6.32001 14.9435 6.64738 15.0313 6.79504 15.2871C6.94277 15.543 6.85509 15.8702 6.59922 16.0178L2.84151 18.1873C2.75734 18.2359 2.66531 18.259 2.57453 18.259Z"
                                                    fill="url(#paint15_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M18.6644 8.96998C18.4795 8.96998 18.2997 8.874 18.2007 8.70244C18.0529 8.44657 18.1406 8.11941 18.3965 7.97175L22.1542 5.80226C22.4099 5.65446 22.7372 5.74221 22.8849 5.99808C23.0326 6.25395 22.9449 6.58111 22.6891 6.72877L18.9314 8.89826C18.8471 8.94691 18.7551 8.96998 18.6644 8.96998Z"
                                                    fill="url(#paint16_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M16.058 6.36412C15.9672 6.36412 15.8752 6.34099 15.791 6.29234C15.5352 6.14461 15.4475 5.81744 15.5952 5.56165L16.9964 3.13481C17.144 2.87887 17.4713 2.7912 17.7271 2.93899C17.9829 3.08672 18.0706 3.41388 17.9229 3.66968L16.5217 6.09652C16.4226 6.26815 16.2428 6.36412 16.058 6.36412Z"
                                                    fill="url(#paint17_linear_8967_39992)"
                                                />
                                                <path
                                                    d="M8.94056 6.36401C8.75571 6.36401 8.57592 6.26803 8.47685 6.09647L7.07566 3.66963C6.92794 3.41384 7.01562 3.08667 7.27148 2.93895C7.52721 2.79122 7.85438 2.8789 8.00217 3.13477L9.40336 5.5616C9.55109 5.8174 9.46341 6.14456 9.20754 6.29229C9.12337 6.3408 9.03134 6.36401 8.94056 6.36401Z"
                                                    fill="url(#paint18_linear_8967_39992)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8967_39992"
                                                        x1="-0.124376"
                                                        y1="34.1377"
                                                        x2="25.0111"
                                                        y2="34.1563"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8967_39992"
                                                        x1="20.5434"
                                                        y1="34.1376"
                                                        x2="24.3423"
                                                        y2="34.138"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8967_39992"
                                                        x1="3.76268"
                                                        y1="32.0092"
                                                        x2="21.1578"
                                                        y2="32.0344"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8967_39992"
                                                        x1="3.63228"
                                                        y1="25.3907"
                                                        x2="21.2868"
                                                        y2="25.3935"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint4_linear_8967_39992"
                                                        x1="12.9906"
                                                        y1="25.3742"
                                                        x2="20.9829"
                                                        y2="25.3748"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint5_linear_8967_39992"
                                                        x1="3.89882"
                                                        y1="28.2517"
                                                        x2="14.1237"
                                                        y2="28.2535"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint6_linear_8967_39992"
                                                        x1="6.86988"
                                                        y1="28.2438"
                                                        x2="14.308"
                                                        y2="28.2447"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint7_linear_8967_39992"
                                                        x1="11.308"
                                                        y1="26.9286"
                                                        x2="18.0743"
                                                        y2="26.9296"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint8_linear_8967_39992"
                                                        x1="7.91883"
                                                        y1="12.9664"
                                                        x2="17.0414"
                                                        y2="12.9679"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint9_linear_8967_39992"
                                                        x1="9.78082"
                                                        y1="13.0262"
                                                        x2="16.9794"
                                                        y2="13.0271"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint10_linear_8967_39992"
                                                        x1="11.9237"
                                                        y1="3.45247"
                                                        x2="13.0707"
                                                        y2="3.4525"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint11_linear_8967_39992"
                                                        x1="1.85338"
                                                        y1="7.79828"
                                                        x2="7.02925"
                                                        y2="7.79953"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint12_linear_8967_39992"
                                                        x1="17.9432"
                                                        y1="17.0873"
                                                        x2="23.1191"
                                                        y2="17.0886"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint13_linear_8967_39992"
                                                        x1="18.9613"
                                                        y1="12.1438"
                                                        x2="22.4345"
                                                        y2="12.1455"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint14_linear_8967_39992"
                                                        x1="2.55118"
                                                        y1="12.1438"
                                                        x2="6.02432"
                                                        y2="12.1455"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint15_linear_8967_39992"
                                                        x1="1.85338"
                                                        y1="17.0873"
                                                        x2="7.02929"
                                                        y2="17.0886"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint16_linear_8967_39992"
                                                        x1="17.9432"
                                                        y1="7.79824"
                                                        x2="23.1191"
                                                        y2="7.79949"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint17_linear_8967_39992"
                                                        x1="15.4284"
                                                        y1="5.09928"
                                                        x2="18.0778"
                                                        y2="5.09958"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint18_linear_8967_39992"
                                                        x1="6.90886"
                                                        y1="5.0992"
                                                        x2="9.55829"
                                                        y2="5.09951"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="28"
                                                viewBox="0 0 25 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M21.6479 35.9998H3.35148C1.92984 35.9998 0.777344 34.8474 0.777344 33.4257C0.777344 32.0041 1.92984 30.8516 3.35148 30.8516H21.6479C23.0696 30.8516 24.2221 32.0041 24.2221 33.4257C24.2221 34.8474 23.0696 35.9998 21.6479 35.9998Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M24.222 33.4256C24.222 34.1366 23.9339 34.78 23.4681 35.2457C23.0024 35.7115 22.3583 35.9996 21.6473 35.9996H20.6787C21.1687 35.8862 21.6066 35.6373 21.9504 35.2936C22.4282 34.8157 22.7242 34.1553 22.7242 33.4256C22.7242 32.1725 21.8505 31.1219 20.6787 30.8516H21.6473C23.0695 30.8515 24.222 32.0041 24.222 33.4256Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M20.6127 30.8516H4.3877C4.3877 31.8532 5.19966 32.6651 6.20127 32.6651H18.7991C19.8008 32.6651 20.6127 31.8532 20.6127 30.8516Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M20.7128 28.2324L20.0454 22.4879C19.8569 20.8656 18.851 19.4821 17.4224 18.8803L15.7041 18.1565C15.1037 17.9036 14.7094 17.2863 14.7094 16.5994L14.7175 14.6953H10.2826L10.2907 16.5994C10.2907 17.2864 9.89639 17.9037 9.29606 18.1565L7.57776 18.8803C6.14908 19.4821 5.14319 20.8656 4.95475 22.4879L4.28735 28.2324C4.08865 29.9425 5.34253 31.4514 6.96218 31.4514H18.0379C19.6576 31.4515 20.9114 29.9425 20.7128 28.2324Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M20.7123 28.2325L20.0447 22.4881C19.8564 20.8662 18.85 19.4825 17.4214 18.8806L15.7033 18.1567C15.1027 17.9042 14.709 17.2865 14.709 16.5997L14.7169 14.6953H13.2862L13.2783 17.3021C13.2783 17.989 13.6727 18.606 14.2732 18.8591L16.1355 19.7807C17.5641 20.3826 18.4257 21.568 18.6147 23.1906L19.2815 28.935C19.3949 29.9128 19.034 30.8244 18.4014 31.4256C19.84 31.2202 20.8956 29.8123 20.7123 28.2325Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M8.70248 22.6055L8.29685 26.9689C8.24475 27.5294 8.65861 28.0154 9.18806 28.0154H12.0857C13.0345 28.0154 13.8037 28.7845 13.8037 29.7333C13.8037 30.6821 13.0345 31.4513 12.0857 31.4513H6.96218C5.34253 31.4513 4.08865 29.9424 4.28735 28.2323L4.95475 22.6055H8.70248Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M14.0742 29.7018C14.083 30.1887 13.8888 30.6302 13.5709 30.9481C13.3056 31.2134 12.9547 31.3925 12.5631 31.4388C12.6181 31.2705 12.648 31.0915 12.648 30.9046C12.648 29.9553 11.8784 29.1864 10.9299 29.1864H8.032C7.50276 29.1864 7.08911 28.7 7.14114 28.1401L7.61174 23.5755C7.66856 23.0244 8.1329 22.6055 8.68689 22.6055H8.97341L8.56757 26.969C8.51554 27.5296 8.92919 28.0153 9.45843 28.0153H12.3172C13.2604 28.0152 14.0572 28.7588 14.0742 29.7018Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M13.2798 29.3784C13.5164 29.2558 13.785 29.1864 14.0697 29.1864H16.9676C17.4968 29.1864 17.9105 28.7 17.8584 28.1401L17.3878 23.5755C17.331 23.0244 16.8667 22.6055 16.3127 22.6055H16.0262L16.432 26.969C16.484 27.5296 16.0704 28.0153 15.5411 28.0153H12.6824C12.2561 28.0153 11.8598 28.1672 11.5518 28.4207L13.2798 29.3784Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M12.4996 16.0441C14.8493 16.0441 16.7541 14.1393 16.7541 11.7896C16.7541 9.43995 14.8493 7.53516 12.4996 7.53516C10.1499 7.53516 8.24512 9.43995 8.24512 11.7896C8.24512 14.1393 10.1499 16.0441 12.4996 16.0441Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M16.7544 11.7903C16.7544 14.1404 14.8493 16.0447 12.5 16.0447C11.5835 16.0447 10.7347 15.7552 10.04 15.2623C10.413 15.3693 10.8075 15.4264 11.2147 15.4264C13.5649 15.4264 15.4691 13.5213 15.4691 11.172C15.4691 9.73765 14.7602 8.46949 13.6725 7.69922C15.4521 8.20849 16.7544 9.84748 16.7544 11.7903Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M12.4998 5.40886C12.2043 5.40886 11.9648 5.16937 11.9648 4.87392V0.534938C11.9648 0.239484 12.2043 0 12.4998 0C12.7952 0 13.0347 0.239484 13.0347 0.534938V4.87399C13.0347 5.16937 12.7952 5.40886 12.4998 5.40886Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M6.33229 8.97003C6.24152 8.97003 6.14962 8.9469 6.06531 8.89824L2.3076 6.72875C2.05181 6.58102 1.96406 6.25393 2.11178 5.99806C2.25937 5.74227 2.58653 5.65445 2.84247 5.80224L6.60018 7.97173C6.85598 8.11946 6.94373 8.44656 6.796 8.70242C6.697 8.87406 6.51714 8.97003 6.33229 8.97003Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M22.4241 18.2591C22.3333 18.2591 22.2414 18.236 22.1571 18.1873L18.3994 16.0178C18.1436 15.8701 18.0559 15.543 18.2036 15.2871C18.3512 15.0313 18.6783 14.9435 18.9343 15.0913L22.692 17.2608C22.9478 17.4085 23.0355 17.7356 22.8878 17.9915C22.7887 18.1631 22.6089 18.2591 22.4241 18.2591Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M21.7905 12.5308H19.6209C19.3254 12.5308 19.0859 12.2913 19.0859 11.9959C19.0859 11.7004 19.3254 11.4609 19.6209 11.4609H21.7905C22.086 11.4609 22.3254 11.7004 22.3254 11.9959C22.3254 12.2913 22.086 12.5308 21.7905 12.5308Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M5.37937 12.5308H3.20974C2.91429 12.5308 2.6748 12.2913 2.6748 11.9959C2.6748 11.7004 2.91429 11.4609 3.20974 11.4609H5.37937C5.67483 11.4609 5.91431 11.7004 5.91431 11.9959C5.91431 12.2913 5.67483 12.5308 5.37937 12.5308Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M2.57551 18.259C2.39066 18.259 2.2108 18.1631 2.1118 17.9915C1.96407 17.7356 2.05175 17.4085 2.30762 17.2608L6.06533 15.0913C6.32098 14.9435 6.64836 15.0313 6.79602 15.2871C6.94374 15.543 6.85606 15.8702 6.60019 16.0178L2.84248 18.1873C2.75832 18.2359 2.66628 18.259 2.57551 18.259Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M18.6673 8.96998C18.4825 8.96998 18.3026 8.874 18.2036 8.70244C18.0559 8.44657 18.1435 8.11941 18.3994 7.97175L22.1571 5.80226C22.4128 5.65446 22.7402 5.74221 22.8878 5.99808C23.0355 6.25395 22.9479 6.58111 22.692 6.72877L18.9343 8.89826C18.85 8.94691 18.758 8.96998 18.6673 8.96998Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M16.0599 6.36412C15.9692 6.36412 15.8772 6.34099 15.793 6.29234C15.5372 6.14461 15.4494 5.81744 15.5971 5.56165L16.9983 3.13481C17.146 2.87887 17.4733 2.7912 17.729 2.93899C17.9848 3.08672 18.0726 3.41388 17.9248 3.66968L16.5236 6.09652C16.4246 6.26815 16.2448 6.36412 16.0599 6.36412Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M8.93959 6.36401C8.75473 6.36401 8.57495 6.26803 8.47588 6.09647L7.07469 3.66963C6.92696 3.41384 7.01464 3.08667 7.27051 2.93895C7.52623 2.79122 7.8534 2.8789 8.0012 3.13477L9.40238 5.5616C9.55011 5.8174 9.46243 6.14456 9.20656 6.29229C9.1224 6.3408 9.03036 6.36401 8.93959 6.36401Z"
                                                    fill="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Meditation" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            MEDITATION
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Cardio")}
                                        className="flex flex-col items-center"
                                    >
                                        {SingleCategory === "Cardio" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 30 28"
                                                fill="none"
                                            >
                                                <path
                                                    d="M20.9514 0.5C18.625 0.5 16.4185 1.43056 14.7971 3.08722C13.1686 1.43056 10.9621 0.5 8.62161 0.5C3.87019 0.5 0 4.37031 0 9.12167C0 18.8994 13.8525 27.0629 14.4375 27.4083C14.5504 27.4717 14.6702 27.5 14.797 27.5C14.9169 27.5 15.0367 27.4718 15.1495 27.4083C15.7417 27.0629 29.6082 18.8994 29.6082 9.12167C29.6083 4.37031 25.724 0.5 20.9514 0.5ZM23.588 13.8519H19.2383L17.5041 17.1159C17.3702 17.3556 17.1023 17.5177 16.7992 17.4825C16.5101 17.4543 16.2775 17.2498 16.1999 16.9678L14.4728 10.5879L13.0559 14.9798C12.9642 15.2477 12.7245 15.4451 12.4355 15.4662C12.1464 15.4874 11.8785 15.3323 11.7517 15.0785L10.6096 12.7874L9.77074 13.9225C9.63679 14.1057 9.42531 14.2115 9.19975 14.2115H6.02037C5.63265 14.2115 5.31543 13.8943 5.31543 13.5065C5.31543 13.1118 5.63265 12.8016 6.02037 12.8016H8.84728L10.1585 11.018C10.2994 10.8206 10.5321 10.7078 10.7859 10.736C11.0256 10.7572 11.2441 10.9052 11.3569 11.1238L12.2451 12.9002L13.8594 7.89506C13.9511 7.59895 14.2331 7.4016 14.5433 7.40864C14.8535 7.41568 15.1284 7.62716 15.2059 7.93031L17.0952 14.8812L18.1949 12.8157C18.3148 12.583 18.5545 12.442 18.8153 12.442H23.5879C23.9756 12.442 24.2928 12.7522 24.2928 13.147C24.2929 13.5348 23.9757 13.8519 23.588 13.8519Z"
                                                    fill="url(#paint0_linear_8970_21520)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8970_21520"
                                                        x1="-1.13878"
                                                        y1="17.734"
                                                        x2="30.6047"
                                                        y2="17.7397"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 30 28"
                                                fill="none"
                                            >
                                                <path
                                                    d="M20.9514 0.5C18.625 0.5 16.4185 1.43056 14.7971 3.08722C13.1686 1.43056 10.9621 0.5 8.62161 0.5C3.87019 0.5 0 4.37031 0 9.12167C0 18.8994 13.8525 27.0629 14.4375 27.4083C14.5504 27.4717 14.6702 27.5 14.797 27.5C14.9169 27.5 15.0367 27.4718 15.1495 27.4083C15.7417 27.0629 29.6082 18.8994 29.6082 9.12167C29.6083 4.37031 25.724 0.5 20.9514 0.5ZM23.588 13.8519H19.2383L17.5041 17.1159C17.3702 17.3556 17.1023 17.5177 16.7992 17.4825C16.5101 17.4543 16.2775 17.2498 16.1999 16.9678L14.4728 10.5879L13.0559 14.9798C12.9642 15.2477 12.7245 15.4451 12.4355 15.4662C12.1464 15.4874 11.8785 15.3323 11.7517 15.0785L10.6096 12.7874L9.77074 13.9225C9.63679 14.1057 9.42531 14.2115 9.19975 14.2115H6.02037C5.63265 14.2115 5.31543 13.8943 5.31543 13.5065C5.31543 13.1118 5.63265 12.8016 6.02037 12.8016H8.84728L10.1585 11.018C10.2994 10.8206 10.5321 10.7078 10.7859 10.736C11.0256 10.7572 11.2441 10.9052 11.3569 11.1238L12.2451 12.9002L13.8594 7.89506C13.9511 7.59895 14.2331 7.4016 14.5433 7.40864C14.8535 7.41568 15.1284 7.62716 15.2059 7.93031L17.0952 14.8812L18.1949 12.8157C18.3148 12.583 18.5545 12.442 18.8153 12.442H23.5879C23.9756 12.442 24.2928 12.7522 24.2928 13.147C24.2929 13.5348 23.9757 13.8519 23.588 13.8519Z"
                                                    fill="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Cardio" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            CARDIO
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("KickBoxing")}
                                        className="flex flex-col items-center"
                                    >
                                        {SingleCategory === "KickBoxing" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                            >
                                                <path
                                                    d="M6.71606 8.13928C6.71606 9.8558 5.32455 11.2473 3.60803 11.2473C1.89151 11.2473 0.5 9.8558 0.5 8.13928C0.5 6.42276 1.89151 5.03125 3.60803 5.03125C5.32455 5.03125 6.71606 6.42276 6.71606 8.13928Z"
                                                    fill="url(#paint0_linear_8970_37585)"
                                                    stroke="url(#paint1_linear_8970_37585)"
                                                />
                                                <path
                                                    d="M17.0158 10.3373L17.19 10.3162L17.3128 10.1909L25.938 1.38849C25.9384 1.38819 25.9387 1.38788 25.939 1.38758C26.3509 0.971693 26.8825 0.657159 27.388 0.544888C27.8826 0.435057 28.3105 0.522132 28.6324 0.83985C28.939 1.14354 28.997 1.51525 28.8589 1.97068C28.7141 2.44794 28.3609 2.9636 27.9271 3.40237L27.9271 3.40233L27.9216 3.40806L18.7118 13.0234L18.5661 13.1755L18.5732 13.3861C18.5741 13.4128 18.5764 13.4357 18.5783 13.4524C18.579 13.4579 18.5797 13.4635 18.5804 13.4685C18.5812 13.4748 18.582 13.4804 18.5825 13.4842V27.5953C18.5825 28.2025 18.4568 28.6899 18.2345 29.0107C18.0302 29.3057 17.7192 29.5 17.2124 29.5C16.7056 29.5 16.3949 29.3057 16.1907 29.0108C15.9685 28.69 15.8429 28.2026 15.8429 27.5953V15.9981V15.5262L15.3718 15.4989L11.7729 15.2902L10.8794 15.2384L11.3037 16.0264L12.8505 18.8991C12.8506 18.8992 12.8506 18.8992 12.8506 18.8993C13.2704 19.6799 12.9785 20.6528 12.1987 21.0729L12.1983 21.0731C11.9562 21.2038 11.6962 21.2651 11.4395 21.2651C10.8672 21.2651 10.3151 20.9587 10.0252 20.421C10.0251 20.4209 10.0251 20.4209 10.025 20.4208L6.51773 13.907L6.51764 13.9068C6.2121 13.3399 6.2861 12.6694 6.65484 12.1807L6.75813 12.0438L6.75732 11.9874C6.76752 11.9687 6.77965 11.9467 6.79382 11.9215C6.8559 11.8108 6.94654 11.6553 7.05775 11.4679C7.27961 11.0939 7.57648 10.6043 7.87447 10.1165C8.17222 9.62906 8.47012 9.14497 8.69365 8.78264C8.8054 8.6015 8.89852 8.45085 8.9637 8.34552L9.03932 8.22335L9.05559 8.19709C9.06744 8.18036 9.08214 8.15753 9.09632 8.12919L9.12332 8.07519L9.13669 8.01632C9.21736 7.66121 9.40676 7.33806 9.70624 7.1045L16.1694 2.06923C16.8691 1.52508 17.8777 1.65056 18.421 2.34873L18.4212 2.34906C18.9662 3.04818 18.8405 4.05664 18.1418 4.60074L18.1417 4.60081L12.0333 9.3598L11.4964 9.77809L12.0561 10.1654L12.4866 10.4633C12.4867 10.4634 12.4867 10.4634 12.4868 10.4635C12.7021 10.6125 12.9673 10.699 13.2128 10.7371C13.4428 10.7728 13.7023 10.7733 13.9401 10.7098L17.0158 10.3373ZM9.06595 8.18024C9.06594 8.18026 9.06593 8.18027 9.06592 8.18028L8.64106 7.91681L9.06595 8.18024Z"
                                                    fill="url(#paint2_linear_8970_37585)"
                                                    stroke="url(#paint3_linear_8970_37585)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8970_37585"
                                                        x1="-0.277541"
                                                        y1="9.13725"
                                                        x2="7.45894"
                                                        y2="9.1385"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8970_37585"
                                                        x1="-0.277541"
                                                        y1="9.13725"
                                                        x2="7.45894"
                                                        y2="9.1385"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8970_37585"
                                                        x1="4.91938"
                                                        y1="19.1489"
                                                        x2="30.2236"
                                                        y2="19.1522"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8970_37585"
                                                        x1="4.91938"
                                                        y1="19.1489"
                                                        x2="30.2236"
                                                        y2="19.1522"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="28"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                            >
                                                <path
                                                    d="M6.71606 8.13928C6.71606 9.8558 5.32455 11.2473 3.60803 11.2473C1.89151 11.2473 0.5 9.8558 0.5 8.13928C0.5 6.42276 1.89151 5.03125 3.60803 5.03125C5.32455 5.03125 6.71606 6.42276 6.71606 8.13928Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M17.0158 10.3373L17.19 10.3162L17.3128 10.1909L25.938 1.38849C25.9384 1.38819 25.9387 1.38788 25.939 1.38758C26.3509 0.971693 26.8825 0.657159 27.388 0.544888C27.8826 0.435057 28.3105 0.522132 28.6324 0.83985C28.939 1.14354 28.997 1.51525 28.8589 1.97068C28.7141 2.44794 28.3609 2.9636 27.9271 3.40237L27.9271 3.40233L27.9216 3.40806L18.7118 13.0234L18.5661 13.1755L18.5732 13.3861C18.5741 13.4128 18.5764 13.4357 18.5783 13.4524C18.579 13.4579 18.5797 13.4635 18.5804 13.4685C18.5812 13.4748 18.582 13.4804 18.5825 13.4842V27.5953C18.5825 28.2025 18.4568 28.6899 18.2345 29.0107C18.0302 29.3057 17.7192 29.5 17.2124 29.5C16.7056 29.5 16.3949 29.3057 16.1907 29.0108C15.9685 28.69 15.8429 28.2026 15.8429 27.5953V15.9981V15.5262L15.3718 15.4989L11.7729 15.2902L10.8794 15.2384L11.3037 16.0264L12.8505 18.8991C12.8506 18.8992 12.8506 18.8992 12.8506 18.8993C13.2704 19.6799 12.9785 20.6528 12.1987 21.0729L12.1983 21.0731C11.9562 21.2038 11.6962 21.2651 11.4395 21.2651C10.8672 21.2651 10.3151 20.9587 10.0252 20.421C10.0251 20.4209 10.0251 20.4209 10.025 20.4208L6.51773 13.907L6.51764 13.9068C6.2121 13.3399 6.2861 12.6694 6.65484 12.1807L6.75813 12.0438L6.75732 11.9874C6.76752 11.9687 6.77965 11.9467 6.79382 11.9215C6.8559 11.8108 6.94654 11.6553 7.05775 11.4679C7.27961 11.0939 7.57648 10.6043 7.87447 10.1165C8.17222 9.62906 8.47012 9.14497 8.69365 8.78264C8.8054 8.6015 8.89852 8.45085 8.9637 8.34552L9.03932 8.22335L9.05559 8.19709C9.06744 8.18036 9.08214 8.15753 9.09632 8.12919L9.12332 8.07519L9.13669 8.01632C9.21736 7.66121 9.40676 7.33806 9.70624 7.1045L16.1694 2.06923C16.8691 1.52508 17.8777 1.65056 18.421 2.34873L18.4212 2.34906C18.9662 3.04818 18.8405 4.05664 18.1418 4.60074L18.1417 4.60081L12.0333 9.3598L11.4964 9.77809L12.0561 10.1654L12.4866 10.4633C12.4867 10.4634 12.4867 10.4634 12.4868 10.4635C12.7021 10.6125 12.9673 10.699 13.2128 10.7371C13.4428 10.7728 13.7023 10.7733 13.9401 10.7098L17.0158 10.3373ZM9.06595 8.18024C9.06594 8.18026 9.06593 8.18027 9.06592 8.18028L8.64106 7.91681L9.06595 8.18024Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "KickBoxing" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            KICKBOXING
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Strength")}
                                        className="flex flex-col items-center"
                                    >
                                        {SingleCategory === "Strength" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="31"
                                                height="28"
                                                viewBox="0 0 31 30"
                                                fill="none"
                                            >
                                                <path
                                                    d="M25.4311 8.25189L25.4311 8.2519L25.4335 8.25722C25.4673 8.3299 25.4845 8.40917 25.4839 8.48931C25.4834 8.56946 25.465 8.64847 25.4302 8.72065C25.3954 8.79284 25.345 8.8564 25.2826 8.90674C25.2202 8.95709 25.1475 8.99296 25.0696 9.01177L25.0615 9.01367L25.0287 9.02142L24.9026 9.05121L24.4387 9.16105C24.047 9.25395 23.5055 9.38271 22.9064 9.5261C21.7098 9.81255 20.2793 10.1584 19.3553 10.3935C19.2159 10.4288 19.0706 10.4347 18.9287 10.4111C18.7867 10.3874 18.6511 10.3346 18.5306 10.2559C18.41 10.1772 18.307 10.0744 18.2282 9.95391C18.1493 9.83344 18.0963 9.69794 18.0724 9.55596C18.0486 9.41397 18.0544 9.26858 18.0895 9.12895C18.1246 8.98933 18.1883 8.85849 18.2765 8.7447C18.3647 8.63092 18.4756 8.53664 18.602 8.46783C18.7281 8.39925 18.8669 8.35744 19.0099 8.34502L19.4759 8.30774L19.6654 8.29258L19.8116 8.17106C20.1851 7.86061 20.6442 7.67109 21.1279 7.62766C21.6116 7.58423 22.0971 7.68895 22.5199 7.92791L22.6846 8.02099L22.8729 8.00277L23.308 7.96067L24.0312 7.89068L23.8257 7.19376C23.6094 6.46 23.0781 4.73902 22.7703 3.83452L22.6762 3.558L22.4005 3.46151L21.4648 3.13403L21.4649 3.13395L21.4555 3.13084C21.3708 3.10275 21.3007 3.04217 21.2606 2.96242C21.2206 2.88266 21.2139 2.79027 21.242 2.70557C21.2701 2.62087 21.3307 2.55079 21.4104 2.51076C21.49 2.47079 21.5823 2.46403 21.6669 2.49198C21.667 2.49202 21.6671 2.49206 21.6672 2.4921L23.0698 2.95963L23.0815 2.96351L23.0933 2.96691C23.1768 2.991 23.1834 3.00039 23.1947 3.01653C23.1962 3.01863 23.1977 3.02084 23.1995 3.02321C23.2563 3.09751 23.3354 3.25125 23.4943 3.64251C23.5539 3.78924 23.6213 3.9602 23.6998 4.15917C24.02 4.9709 24.5242 6.24905 25.4311 8.25189Z"
                                                    fill="url(#paint0_linear_8970_22042)"
                                                    stroke="url(#paint1_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M5.5069 8.25723L5.50687 8.25722C5.4731 8.3299 5.45588 8.40917 5.45646 8.48931C5.45704 8.56946 5.4754 8.64847 5.51022 8.72066C5.54504 8.79284 5.59545 8.8564 5.65781 8.90674L5.28092 9.3736L5.65781 8.90674C5.71982 8.9568 5.79211 8.99256 5.86953 9.01146L5.87053 9.01169L5.87891 9.01367L5.91174 9.02142L6.03786 9.05121L6.50169 9.16105C6.89342 9.25395 7.43492 9.38271 8.03396 9.5261C9.23067 9.81256 10.6612 10.1585 11.5852 10.3936M5.5069 8.25723L11.4375 10.9751M5.5069 8.25723L5.50931 8.25189C6.41626 6.24905 6.92041 4.97091 7.24058 4.15918C7.31907 3.9602 7.3865 3.78924 7.44609 3.64251C7.60502 3.25125 7.68414 3.09751 7.74089 3.02321C7.7427 3.02084 7.74425 3.01863 7.74572 3.01653C7.75705 3.00039 7.76365 2.991 7.84713 2.96691L7.85892 2.96351L7.87057 2.95963L9.27316 2.4921L5.5069 8.25723ZM11.5852 10.3936C11.5853 10.3936 11.5854 10.3936 11.5855 10.3936L11.4375 10.9751M11.5852 10.3936C11.585 10.3935 11.5849 10.3935 11.5847 10.3934L11.4375 10.9751M11.5852 10.3936C11.7246 10.4288 11.8698 10.4347 12.0117 10.4111C12.1537 10.3874 12.2893 10.3346 12.4098 10.2559C12.5304 10.1772 12.6334 10.0744 12.7122 9.95391C12.7911 9.83344 12.8441 9.69794 12.868 9.55596C12.8918 9.41397 12.886 9.26858 12.8509 9.12896C12.8158 8.98933 12.7521 8.85849 12.6639 8.7447L13.08 8.42214L12.6639 8.7447C12.5757 8.63092 12.4648 8.53664 12.3384 8.46783C12.2123 8.39925 12.0735 8.35744 11.9305 8.34502M11.4375 10.9751C11.6575 11.0308 11.8865 11.0402 12.1103 11.0029C12.3341 10.9656 12.5478 10.8823 12.7377 10.7583C12.9277 10.6344 13.09 10.4723 13.2142 10.2825C13.3385 10.0927 13.4221 9.87917 13.4597 9.65543C13.4973 9.4317 13.4881 9.20259 13.4328 8.98257C13.3774 8.76255 13.2771 8.55639 13.1381 8.37708C12.9991 8.19778 12.8244 8.04923 12.6251 7.94079C12.4258 7.83236 12.2062 7.7664 11.9802 7.74708M11.9305 8.34502L11.9323 8.34517L11.9802 7.74708M11.9305 8.34502C11.93 8.34498 11.9296 8.34494 11.9291 8.3449L11.9802 7.74708M11.9305 8.34502L11.4645 8.30774L11.275 8.29258L11.1288 8.17106C10.7553 7.86061 10.2963 7.67109 9.81253 7.62766C9.3288 7.58423 8.8433 7.68895 8.42049 7.92791L8.25578 8.02099L8.06748 8.00277L7.6324 7.96067L6.90919 7.89068L7.11469 7.19376C7.33105 6.46 7.86231 4.73902 8.17012 3.83452L8.26422 3.558L8.53992 3.46151L9.47558 3.13403L9.48493 3.13076L9.48495 3.13084C9.56965 3.10275 9.63973 3.04217 9.67976 2.96242C9.7198 2.88266 9.72651 2.79027 9.69842 2.70557C9.67034 2.62087 9.60976 2.55079 9.53 2.51076C9.45036 2.47078 9.35812 2.46403 9.27351 2.49198L9.27406 2.4918L9.08432 1.92259C9.32007 1.84442 9.57721 1.86311 9.79918 1.97453C10.0211 2.08595 10.1898 2.28099 10.2679 2.51673C10.3461 2.75248 10.3274 3.00962 10.216 3.23159C10.1046 3.45356 9.90953 3.62218 9.67379 3.70035L8.73813 4.02783C8.49911 4.73019 8.12134 5.93837 7.86611 6.77768L7.74798 6.76625L7.69019 7.36346L8.11716 7.48936L8.18372 7.50898L8.26569 7.53315C8.28635 7.4631 8.30991 7.38393 8.3359 7.29728C8.81233 7.07571 9.34009 6.98283 9.86618 7.03006C10.4711 7.08437 11.0453 7.32139 11.5124 7.70965L11.9802 7.74708"
                                                    fill="url(#paint2_linear_8970_22042)"
                                                    stroke="url(#paint3_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M19.042 8.08438C18.7408 12.8801 18.6591 13.8824 18.6301 14.8863C18.5904 16.2618 18.6497 17.6401 18.3791 28.7842L18.3788 28.7992L18.3792 28.8143C18.3831 28.9654 18.3268 29.1119 18.2228 29.2215C18.1712 29.2758 18.1095 29.3194 18.0411 29.3499C17.9727 29.3803 17.899 29.397 17.8242 29.3989C17.6731 29.4028 17.5266 29.3466 17.417 29.2425L17.0039 29.6776L17.417 29.2425C17.3073 29.1384 17.2435 28.9951 17.2396 28.8439L17.2392 28.8277L17.2379 28.8115L16.5361 20.0678L16.4918 19.5158H15.9381H15.0024H14.4486L14.4043 20.0678L13.7026 28.8115L13.7013 28.8277L13.7009 28.8439C13.6969 28.9951 13.6331 29.1384 13.5235 29.2425L13.9366 29.6776L13.5235 29.2425C13.4139 29.3466 13.2674 29.4028 13.1163 29.3989C12.9652 29.395 12.8218 29.3312 12.7177 29.2215C12.6136 29.1119 12.5574 28.9654 12.5613 28.8143L12.5617 28.7992L12.5613 28.7841C12.3826 21.4301 12.3367 19.9858 12.327 18.5413C12.3214 17.717 12.3276 16.8925 12.3276 14.9697V14.9509L12.3264 14.9322L11.8984 8.08438H13.4573L15.2019 8.95669L15.4702 9.09086L15.7386 8.95669L17.4832 8.08438H19.042Z"
                                                    fill="url(#paint4_linear_8970_22042)"
                                                    stroke="url(#paint5_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M18.1449 3.27481C18.1449 4.75207 16.9474 5.94962 15.4701 5.94962C13.9929 5.94962 12.7953 4.75207 12.7953 3.27481C12.7953 1.79755 13.9929 0.6 15.4701 0.6C16.9474 0.6 18.1449 1.79755 18.1449 3.27481Z"
                                                    fill="url(#paint6_linear_8970_22042)"
                                                    stroke="url(#paint7_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M17.3422 7.48438C17.3422 7.98068 17.1451 8.45666 16.7942 8.8076C16.4432 9.15854 15.9672 9.3557 15.4709 9.3557C14.9746 9.3557 14.4986 9.15854 14.1477 8.8076C13.7968 8.45666 13.5996 7.98068 13.5996 7.48438H17.3422Z"
                                                    fill="url(#paint8_linear_8970_22042)"
                                                />
                                                <path
                                                    d="M29.978 24.8008H0.963152C0.70736 24.8008 0.5 25.0081 0.5 25.2639V25.2686C0.5 25.5244 0.70736 25.7318 0.963152 25.7318H29.978C30.2338 25.7318 30.4411 25.5244 30.4411 25.2686V25.2639C30.4411 25.0081 30.2338 24.8008 29.978 24.8008Z"
                                                    fill="url(#paint9_linear_8970_22042)"
                                                />
                                                <path
                                                    d="M5.17785 21.1859H6.11351C6.29889 21.1859 6.44917 21.3362 6.44917 21.5216V29.0069C6.44917 29.1923 6.29889 29.3425 6.11351 29.3425H5.17785C4.99247 29.3425 4.84219 29.1923 4.84219 29.0069V21.5216C4.84219 21.3362 4.99247 21.1859 5.17785 21.1859Z"
                                                    fill="url(#paint10_linear_8970_22042)"
                                                    stroke="url(#paint11_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M2.37121 21.1859H3.30687C3.49225 21.1859 3.64253 21.3362 3.64253 21.5216V29.0069C3.64253 29.1923 3.49225 29.3425 3.30687 29.3425H2.37121C2.18583 29.3425 2.03555 29.1923 2.03555 29.0069V21.5216C2.03555 21.3362 2.18583 21.1859 2.37121 21.1859Z"
                                                    fill="url(#paint12_linear_8970_22042)"
                                                    stroke="url(#paint13_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M25.7626 29.3414H24.8269C24.6415 29.3414 24.4913 29.1911 24.4913 29.0057V21.5205C24.4913 21.3351 24.6415 21.1848 24.8269 21.1848H25.7626C25.948 21.1848 26.0982 21.3351 26.0982 21.5205V29.0057C26.0982 29.1911 25.948 29.3414 25.7626 29.3414Z"
                                                    fill="url(#paint14_linear_8970_22042)"
                                                    stroke="url(#paint15_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M28.5702 29.3414H27.6345C27.4492 29.3414 27.2989 29.1911 27.2989 29.0057V21.5205C27.2989 21.3351 27.4492 21.1848 27.6345 21.1848H28.5702C28.7556 21.1848 28.9059 21.3351 28.9059 21.5205V29.0057C28.9059 29.1911 28.7556 29.3414 28.5702 29.3414Z"
                                                    fill="url(#paint16_linear_8970_22042)"
                                                    stroke="url(#paint17_linear_8970_22042)"
                                                    strokeWidth="1.2"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8970_22042"
                                                        x1="17.1262"
                                                        y1="7.7156"
                                                        x2="26.3743"
                                                        y2="7.71702"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8970_22042"
                                                        x1="17.1262"
                                                        y1="7.7156"
                                                        x2="26.3743"
                                                        y2="7.71702"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8970_22042"
                                                        x1="4.52468"
                                                        y1="7.7156"
                                                        x2="13.7727"
                                                        y2="7.71702"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8970_22042"
                                                        x1="4.52468"
                                                        y1="7.7156"
                                                        x2="13.7727"
                                                        y2="7.71702"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint4_linear_8970_22042"
                                                        x1="10.9359"
                                                        y1="21.8555"
                                                        x2="19.9641"
                                                        y2="21.856"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint5_linear_8970_22042"
                                                        x1="10.9359"
                                                        y1="21.8555"
                                                        x2="19.9641"
                                                        y2="21.856"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint6_linear_8970_22042"
                                                        x1="11.9434"
                                                        y1="4.18061"
                                                        x2="18.9654"
                                                        y2="4.18175"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint7_linear_8970_22042"
                                                        x1="11.9434"
                                                        y1="4.18061"
                                                        x2="18.9654"
                                                        y2="4.18175"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint8_linear_8970_22042"
                                                        x1="13.4557"
                                                        y1="8.67884"
                                                        x2="17.4682"
                                                        y2="8.68014"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint9_linear_8970_22042"
                                                        x1="-0.651582"
                                                        y1="25.395"
                                                        x2="31.448"
                                                        y2="25.5624"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint10_linear_8970_22042"
                                                        x1="4.13423"
                                                        y1="26.5582"
                                                        x2="7.14364"
                                                        y2="26.5584"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint11_linear_8970_22042"
                                                        x1="4.13423"
                                                        y1="26.5582"
                                                        x2="7.14364"
                                                        y2="26.5584"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint12_linear_8970_22042"
                                                        x1="1.32759"
                                                        y1="26.5582"
                                                        x2="4.337"
                                                        y2="26.5584"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint13_linear_8970_22042"
                                                        x1="1.32759"
                                                        y1="26.5582"
                                                        x2="4.337"
                                                        y2="26.5584"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint14_linear_8970_22042"
                                                        x1="26.8062"
                                                        y1="23.9691"
                                                        x2="23.7968"
                                                        y2="23.969"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint15_linear_8970_22042"
                                                        x1="26.8062"
                                                        y1="23.9691"
                                                        x2="23.7968"
                                                        y2="23.969"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint16_linear_8970_22042"
                                                        x1="29.6138"
                                                        y1="23.9691"
                                                        x2="26.6044"
                                                        y2="23.969"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint17_linear_8970_22042"
                                                        x1="29.6138"
                                                        y1="23.9691"
                                                        x2="26.6044"
                                                        y2="23.969"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="31"
                                                height="28"
                                                viewBox="0 0 31 30"
                                                fill="none"
                                            >
                                                <path
                                                    d="M25.4311 8.25189L25.4311 8.2519L25.4335 8.25722C25.4673 8.3299 25.4845 8.40917 25.4839 8.48931C25.4834 8.56946 25.465 8.64847 25.4302 8.72065C25.3954 8.79284 25.345 8.8564 25.2826 8.90674C25.2202 8.95709 25.1475 8.99296 25.0696 9.01177L25.0615 9.01367L25.0287 9.02142L24.9026 9.05121L24.4387 9.16105C24.047 9.25395 23.5055 9.38271 22.9064 9.5261C21.7098 9.81255 20.2793 10.1584 19.3553 10.3935C19.2159 10.4288 19.0706 10.4347 18.9287 10.4111C18.7867 10.3874 18.6511 10.3346 18.5306 10.2559C18.41 10.1772 18.307 10.0744 18.2282 9.95391C18.1493 9.83344 18.0963 9.69794 18.0724 9.55596C18.0486 9.41397 18.0544 9.26858 18.0895 9.12895C18.1246 8.98933 18.1883 8.85849 18.2765 8.7447C18.3647 8.63092 18.4756 8.53664 18.602 8.46783C18.7281 8.39925 18.8669 8.35744 19.0099 8.34502L19.4759 8.30774L19.6654 8.29258L19.8116 8.17106C20.1851 7.86061 20.6442 7.67109 21.1279 7.62766C21.6116 7.58423 22.0971 7.68895 22.5199 7.92791L22.6846 8.02099L22.8729 8.00277L23.308 7.96067L24.0312 7.89068L23.8257 7.19376C23.6094 6.46 23.0781 4.73902 22.7703 3.83452L22.6762 3.558L22.4005 3.46151L21.4648 3.13403L21.4649 3.13395L21.4555 3.13084C21.3708 3.10275 21.3007 3.04217 21.2606 2.96242C21.2206 2.88266 21.2139 2.79027 21.242 2.70557C21.2701 2.62087 21.3307 2.55079 21.4104 2.51076C21.49 2.47079 21.5823 2.46403 21.6669 2.49198C21.667 2.49202 21.6671 2.49206 21.6672 2.4921L23.0698 2.95963L23.0815 2.96351L23.0933 2.96691C23.1768 2.991 23.1834 3.00039 23.1947 3.01653C23.1962 3.01863 23.1977 3.02084 23.1995 3.02321C23.2563 3.09751 23.3354 3.25125 23.4943 3.64251C23.5539 3.78924 23.6213 3.9602 23.6998 4.15917C24.02 4.9709 24.5242 6.24905 25.4311 8.25189Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M5.5069 8.25723L5.50687 8.25722C5.4731 8.3299 5.45588 8.40917 5.45646 8.48931C5.45704 8.56946 5.4754 8.64847 5.51022 8.72066C5.54504 8.79284 5.59545 8.8564 5.65781 8.90674L5.28092 9.3736L5.65781 8.90674C5.71982 8.9568 5.79211 8.99256 5.86953 9.01146L5.87053 9.01169L5.87891 9.01367L5.91174 9.02142L6.03786 9.05121L6.50169 9.16105C6.89342 9.25395 7.43492 9.38271 8.03396 9.5261C9.23067 9.81256 10.6612 10.1585 11.5852 10.3936M5.5069 8.25723L11.4375 10.9751M5.5069 8.25723L5.50931 8.25189C6.41626 6.24905 6.92041 4.97091 7.24058 4.15918C7.31907 3.9602 7.3865 3.78924 7.44609 3.64251C7.60502 3.25125 7.68414 3.09751 7.74089 3.02321C7.7427 3.02084 7.74425 3.01863 7.74572 3.01653C7.75705 3.00039 7.76365 2.991 7.84713 2.96691L7.85892 2.96351L7.87057 2.95963L9.27316 2.4921L5.5069 8.25723ZM11.5852 10.3936C11.5853 10.3936 11.5854 10.3936 11.5855 10.3936L11.4375 10.9751M11.5852 10.3936C11.585 10.3935 11.5849 10.3935 11.5847 10.3934L11.4375 10.9751M11.5852 10.3936C11.7246 10.4288 11.8698 10.4347 12.0117 10.4111C12.1537 10.3874 12.2893 10.3346 12.4098 10.2559C12.5304 10.1772 12.6334 10.0744 12.7122 9.95391C12.7911 9.83344 12.8441 9.69794 12.868 9.55596C12.8918 9.41397 12.886 9.26858 12.8509 9.12896C12.8158 8.98933 12.7521 8.85849 12.6639 8.7447L13.08 8.42214L12.6639 8.7447C12.5757 8.63092 12.4648 8.53664 12.3384 8.46783C12.2123 8.39925 12.0735 8.35744 11.9305 8.34502M11.4375 10.9751C11.6575 11.0308 11.8865 11.0402 12.1103 11.0029C12.3341 10.9656 12.5478 10.8823 12.7377 10.7583C12.9277 10.6344 13.09 10.4723 13.2142 10.2825C13.3385 10.0927 13.4221 9.87917 13.4597 9.65543C13.4973 9.4317 13.4881 9.20259 13.4328 8.98257C13.3774 8.76255 13.2771 8.55639 13.1381 8.37708C12.9991 8.19778 12.8244 8.04923 12.6251 7.94079C12.4258 7.83236 12.2062 7.7664 11.9802 7.74708M11.9305 8.34502L11.9323 8.34517L11.9802 7.74708M11.9305 8.34502C11.93 8.34498 11.9296 8.34494 11.9291 8.3449L11.9802 7.74708M11.9305 8.34502L11.4645 8.30774L11.275 8.29258L11.1288 8.17106C10.7553 7.86061 10.2963 7.67109 9.81253 7.62766C9.3288 7.58423 8.8433 7.68895 8.42049 7.92791L8.25578 8.02099L8.06748 8.00277L7.6324 7.96067L6.90919 7.89068L7.11469 7.19376C7.33105 6.46 7.86231 4.73902 8.17012 3.83452L8.26422 3.558L8.53992 3.46151L9.47558 3.13403L9.48493 3.13076L9.48495 3.13084C9.56965 3.10275 9.63973 3.04217 9.67976 2.96242C9.7198 2.88266 9.72651 2.79027 9.69842 2.70557C9.67034 2.62087 9.60976 2.55079 9.53 2.51076C9.45036 2.47078 9.35812 2.46403 9.27351 2.49198L9.27406 2.4918L9.08432 1.92259C9.32007 1.84442 9.57721 1.86311 9.79918 1.97453C10.0211 2.08595 10.1898 2.28099 10.2679 2.51673C10.3461 2.75248 10.3274 3.00962 10.216 3.23159C10.1046 3.45356 9.90953 3.62218 9.67379 3.70035L8.73813 4.02783C8.49911 4.73019 8.12134 5.93837 7.86611 6.77768L7.74798 6.76625L7.69019 7.36346L8.11716 7.48936L8.18372 7.50898L8.26569 7.53315C8.28635 7.4631 8.30991 7.38393 8.3359 7.29728C8.81233 7.07571 9.34009 6.98283 9.86618 7.03006C10.4711 7.08437 11.0453 7.32139 11.5124 7.70965L11.9802 7.74708"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M19.042 8.08438C18.7408 12.8801 18.6591 13.8824 18.6301 14.8863C18.5904 16.2618 18.6497 17.6401 18.3791 28.7842L18.3788 28.7992L18.3792 28.8143C18.3831 28.9654 18.3268 29.1119 18.2228 29.2215C18.1712 29.2758 18.1095 29.3194 18.0411 29.3499C17.9727 29.3803 17.899 29.397 17.8242 29.3989C17.6731 29.4028 17.5266 29.3466 17.417 29.2425L17.0039 29.6776L17.417 29.2425C17.3073 29.1384 17.2435 28.9951 17.2396 28.8439L17.2392 28.8277L17.2379 28.8115L16.5361 20.0678L16.4918 19.5158H15.9381H15.0024H14.4486L14.4043 20.0678L13.7026 28.8115L13.7013 28.8277L13.7009 28.8439C13.6969 28.9951 13.6331 29.1384 13.5235 29.2425L13.9366 29.6776L13.5235 29.2425C13.4139 29.3466 13.2674 29.4028 13.1163 29.3989C12.9652 29.395 12.8218 29.3312 12.7177 29.2215C12.6136 29.1119 12.5574 28.9654 12.5613 28.8143L12.5617 28.7992L12.5613 28.7841C12.3826 21.4301 12.3367 19.9858 12.327 18.5413C12.3214 17.717 12.3276 16.8925 12.3276 14.9697V14.9509L12.3264 14.9322L11.8984 8.08438H13.4573L15.2019 8.95669L15.4702 9.09086L15.7386 8.95669L17.4832 8.08438H19.042Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M18.1449 3.27481C18.1449 4.75207 16.9474 5.94962 15.4701 5.94962C13.9929 5.94962 12.7953 4.75207 12.7953 3.27481C12.7953 1.79755 13.9929 0.6 15.4701 0.6C16.9474 0.6 18.1449 1.79755 18.1449 3.27481Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M17.3422 7.48438C17.3422 7.98068 17.1451 8.45666 16.7942 8.8076C16.4432 9.15854 15.9672 9.3557 15.4709 9.3557C14.9746 9.3557 14.4986 9.15854 14.1477 8.8076C13.7968 8.45666 13.5996 7.98068 13.5996 7.48438H17.3422Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M29.978 24.8008H0.963152C0.70736 24.8008 0.5 25.0081 0.5 25.2639V25.2686C0.5 25.5244 0.70736 25.7318 0.963152 25.7318H29.978C30.2338 25.7318 30.4411 25.5244 30.4411 25.2686V25.2639C30.4411 25.0081 30.2338 24.8008 29.978 24.8008Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M5.17785 21.1859H6.11351C6.29889 21.1859 6.44917 21.3362 6.44917 21.5216V29.0069C6.44917 29.1923 6.29889 29.3425 6.11351 29.3425H5.17785C4.99247 29.3425 4.84219 29.1923 4.84219 29.0069V21.5216C4.84219 21.3362 4.99247 21.1859 5.17785 21.1859Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M2.37121 21.1859H3.30687C3.49225 21.1859 3.64253 21.3362 3.64253 21.5216V29.0069C3.64253 29.1923 3.49225 29.3425 3.30687 29.3425H2.37121C2.18583 29.3425 2.03555 29.1923 2.03555 29.0069V21.5216C2.03555 21.3362 2.18583 21.1859 2.37121 21.1859Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M25.7626 29.3414H24.8269C24.6415 29.3414 24.4913 29.1911 24.4913 29.0057V21.5205C24.4913 21.3351 24.6415 21.1848 24.8269 21.1848H25.7626C25.948 21.1848 26.0982 21.3351 26.0982 21.5205V29.0057C26.0982 29.1911 25.948 29.3414 25.7626 29.3414Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M28.5702 29.3414H27.6345C27.4492 29.3414 27.2989 29.1911 27.2989 29.0057V21.5205C27.2989 21.3351 27.4492 21.1848 27.6345 21.1848H28.5702C28.7556 21.1848 28.9059 21.3351 28.9059 21.5205V29.0057C28.9059 29.1911 28.7556 29.3414 28.5702 29.3414Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.2"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Strength" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            STRENGTH
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Dance")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Dance" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="35"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_9778_52425)">
                                                    <path
                                                        d="M20.2631 7.66563C21.4201 6.50859 21.4201 4.63265 20.2631 3.4756C19.106 2.31856 17.2301 2.31856 16.073 3.47561C14.916 4.63265 14.916 6.50859 16.073 7.66563C17.2301 8.82267 19.106 8.82267 20.2631 7.66563Z"
                                                        fill="url(#paint0_linear_9778_52425)"
                                                    />
                                                    <path
                                                        d="M22.145 20.3006C22.7396 20.7201 23.563 20.6182 24.0361 20.0533L27.4352 15.9936C27.965 15.3606 27.8394 14.4088 27.1632 13.9352L22.0905 10.3693C21.4797 9.93985 20.7511 9.70941 20.0043 9.70941H17.062L12.5811 6.54883L10.998 1.02132C10.7836 0.273242 10.0035 -0.159418 9.25565 0.054825C8.50771 0.269068 8.07491 1.04913 8.28922 1.79714L10.0088 7.80089C10.0971 8.10916 10.2879 8.3781 10.5497 8.56326L14.6925 11.4931C14.6786 11.6337 14.6827 20.4108 14.6827 20.4179C13.3576 22.2924 12.2442 23.8675 11.0188 25.6009C10.7737 25.9477 10.668 26.3741 10.7229 26.7953C10.8262 27.5876 11.646 33.8762 11.7309 34.5277C11.852 35.4562 12.7026 36.1059 13.6259 35.9856C14.5518 35.8649 15.2045 35.0164 15.0838 34.0906L14.1611 27.0132L17.8392 21.8102H18.7343C18.7127 22.5251 18.5879 26.663 18.563 27.4863C18.5539 27.7883 18.6259 28.0872 18.7714 28.3519L22.4953 35.1238C22.9453 35.942 23.9732 36.2405 24.7913 35.7906C25.6094 35.3406 25.908 34.3127 25.4581 33.4945L21.9565 27.127L22.1448 21.8103L22.145 20.3006ZM22.145 13.8603L24.289 15.3621L22.145 17.9227V13.8603Z"
                                                        fill="url(#paint1_linear_9778_52425)"
                                                    />
                                                </g>
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_9778_52425"
                                                        x1="7.48325"
                                                        y1="22.9788"
                                                        x2="28.421"
                                                        y2="22.9806"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_9778_52425"
                                                        x1="7.48325"
                                                        y1="22.9788"
                                                        x2="28.421"
                                                        y2="22.9806"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_9778_52425">
                                                        <rect width="36" height="36" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="35"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_9780_52432)">
                                                    <path
                                                        d="M20.2631 7.66563C21.4201 6.50859 21.4201 4.63265 20.2631 3.4756C19.106 2.31856 17.2301 2.31856 16.073 3.47561C14.916 4.63265 14.916 6.50859 16.073 7.66563C17.2301 8.82267 19.106 8.82267 20.2631 7.66563Z"
                                                        fill="#D4D4D4"
                                                    />
                                                    <path
                                                        d="M22.145 20.3006C22.7396 20.7201 23.563 20.6182 24.0361 20.0533L27.4352 15.9936C27.965 15.3606 27.8394 14.4088 27.1632 13.9352L22.0905 10.3693C21.4797 9.93985 20.7511 9.70941 20.0043 9.70941H17.062L12.5811 6.54883L10.998 1.02132C10.7836 0.273242 10.0035 -0.159418 9.25565 0.054825C8.50771 0.269068 8.07491 1.04913 8.28922 1.79714L10.0088 7.80089C10.0971 8.10916 10.2879 8.3781 10.5497 8.56326L14.6925 11.4931C14.6786 11.6337 14.6827 20.4108 14.6827 20.4179C13.3576 22.2924 12.2442 23.8675 11.0188 25.6009C10.7737 25.9477 10.668 26.3741 10.7229 26.7953C10.8262 27.5876 11.646 33.8762 11.7309 34.5277C11.852 35.4562 12.7026 36.1059 13.6259 35.9856C14.5518 35.8649 15.2045 35.0164 15.0838 34.0906L14.1611 27.0132L17.8392 21.8102H18.7343C18.7127 22.5251 18.5879 26.663 18.563 27.4863C18.5539 27.7883 18.6259 28.0872 18.7714 28.3519L22.4953 35.1238C22.9453 35.942 23.9732 36.2405 24.7913 35.7906C25.6094 35.3406 25.908 34.3127 25.4581 33.4945L21.9565 27.127L22.1448 21.8103L22.145 20.3006ZM22.145 13.8603L24.289 15.3621L22.145 17.9227V13.8603Z"
                                                        fill="#D4D4D4"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_9780_52432">
                                                        <rect width="36" height="36" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Dance" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            DANCE
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Recovery")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Recovery" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="32"
                                                height="28"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                            >
                                                <path
                                                    d="M14.0881 5.93587C15.7272 5.93587 17.056 4.60708 17.056 2.96793C17.056 1.32879 15.7272 0 14.0881 0C12.4489 0 11.1201 1.32879 11.1201 2.96793C11.1201 4.60708 12.4489 5.93587 14.0881 5.93587Z"
                                                    fill="url(#paint0_linear_8987_21528)"
                                                />
                                                <path
                                                    d="M29.2275 27.0395L28.1703 16.429C27.9437 14.0249 25.955 12.2188 23.5447 12.2188H22.1979C21.9839 12.2188 21.7762 12.2313 21.5686 12.2628C21.7637 12.6341 21.8706 13.0558 21.8518 13.4963C21.965 13.4837 22.0783 13.4774 22.1979 13.4774H23.5447C25.3005 13.4774 26.7543 14.799 26.9179 16.5486L27.1822 19.1729H18.5855L18.8247 16.5423C18.8436 16.3283 18.8876 16.1143 18.9442 15.9066L17.6856 15.7619C17.6289 15.9822 17.5912 16.2024 17.5723 16.429L16.3073 30.2051C16.2759 30.5512 16.5276 30.8596 16.8737 30.8911H16.9367C17.2576 30.8911 17.5282 30.6456 17.5597 30.3184L18.466 20.4315H27.3018L27.9752 27.1654C27.1445 27.499 26.5592 28.3045 26.5592 29.2485C26.5592 30.4946 27.5661 31.5015 28.8059 31.5015C30.052 31.5015 31.0589 30.4946 31.0589 29.2485C31.0589 28.1535 30.2659 27.2346 29.2275 27.0395ZM28.8059 30.2428C28.2647 30.2428 27.8178 29.796 27.8178 29.2485C27.8178 28.701 28.2647 28.2604 28.8059 28.2604C29.3534 28.2604 29.8002 28.701 29.8002 29.2485C29.8002 29.796 29.3534 30.2428 28.8059 30.2428Z"
                                                    fill="url(#paint1_linear_8987_21528)"
                                                />
                                                <path
                                                    d="M3.7959 29.5357L7.57189 25.3129C7.78587 25.0737 7.93691 24.7842 8.00613 24.4696L8.53477 22.1284L5.67131 19.7433C5.53286 19.6237 5.40069 19.4978 5.29371 19.3594L4.43152 23.1605L0.982778 27.0184C0.284219 27.7987 0.353445 28.9882 1.12752 29.6867C1.40443 29.9322 1.73168 30.0832 2.07152 30.1398C2.68827 30.2468 3.34278 30.0392 3.7959 29.5357Z"
                                                    fill="url(#paint2_linear_8987_21528)"
                                                />
                                                <path
                                                    d="M8.84355 20.7505L10.2721 21.94V28.7493C10.2721 29.7877 11.1154 30.6373 12.1601 30.6373C13.1985 30.6373 14.0481 29.7877 14.0481 28.7493V21.0589C14.0481 20.4988 13.7964 19.9701 13.3685 19.6114L9.91971 16.7291L12.1287 10.8071L14.325 13.702C14.5327 13.9726 14.8411 14.1551 15.1809 14.1929L19.1898 14.6649C19.2401 14.6712 19.2905 14.6712 19.3345 14.6712C19.9639 14.6712 20.5114 14.1992 20.5869 13.5635C20.6687 12.8713 20.1715 12.2482 19.4856 12.1664L16.0054 11.7573L12.6762 7.36461C12.4685 6.9933 12.1287 6.69122 11.7007 6.53389C10.7253 6.16887 9.63651 6.66605 9.2715 7.64151C9.24948 7.7013 5.89639 16.7102 5.88569 16.7731C5.87122 16.8015 5.83849 16.9166 5.82905 16.9934C5.70948 17.6479 5.94862 18.3339 6.47726 18.7744L8.84355 20.7505Z"
                                                    fill="url(#paint3_linear_8987_21528)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8987_21528"
                                                        x1="10.8918"
                                                        y1="3.78885"
                                                        x2="17.2558"
                                                        y2="3.78989"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8987_21528"
                                                        x1="15.7372"
                                                        y1="24.5269"
                                                        x2="31.5555"
                                                        y2="24.5289"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8987_21528"
                                                        x1="0.19097"
                                                        y1="26.258"
                                                        x2="8.8052"
                                                        y2="26.259"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8987_21528"
                                                        x1="5.22972"
                                                        y1="21.8757"
                                                        x2="21.0937"
                                                        y2="21.8773"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="32"
                                                height="28"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                            >
                                                <path
                                                    d="M14.0881 5.93587C15.7272 5.93587 17.056 4.60708 17.056 2.96793C17.056 1.32879 15.7272 0 14.0881 0C12.4489 0 11.1201 1.32879 11.1201 2.96793C11.1201 4.60708 12.4489 5.93587 14.0881 5.93587Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M29.2275 27.0395L28.1703 16.429C27.9437 14.0249 25.955 12.2188 23.5447 12.2188H22.1979C21.9839 12.2188 21.7762 12.2313 21.5686 12.2628C21.7637 12.6341 21.8706 13.0558 21.8518 13.4963C21.965 13.4837 22.0783 13.4774 22.1979 13.4774H23.5447C25.3005 13.4774 26.7543 14.799 26.9179 16.5486L27.1822 19.1729H18.5855L18.8247 16.5423C18.8436 16.3283 18.8876 16.1143 18.9442 15.9066L17.6856 15.7619C17.6289 15.9822 17.5912 16.2024 17.5723 16.429L16.3073 30.2051C16.2759 30.5512 16.5276 30.8596 16.8737 30.8911H16.9367C17.2576 30.8911 17.5282 30.6456 17.5597 30.3184L18.466 20.4315H27.3018L27.9752 27.1654C27.1445 27.499 26.5592 28.3045 26.5592 29.2485C26.5592 30.4946 27.5661 31.5015 28.8059 31.5015C30.052 31.5015 31.0589 30.4946 31.0589 29.2485C31.0589 28.1535 30.2659 27.2346 29.2275 27.0395ZM28.8059 30.2428C28.2647 30.2428 27.8178 29.796 27.8178 29.2485C27.8178 28.701 28.2647 28.2604 28.8059 28.2604C29.3534 28.2604 29.8002 28.701 29.8002 29.2485C29.8002 29.796 29.3534 30.2428 28.8059 30.2428Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M3.7959 29.5357L7.57189 25.3129C7.78587 25.0737 7.93691 24.7842 8.00613 24.4696L8.53477 22.1284L5.67131 19.7433C5.53286 19.6237 5.40069 19.4978 5.29371 19.3594L4.43152 23.1605L0.982778 27.0184C0.284219 27.7987 0.353445 28.9882 1.12752 29.6867C1.40443 29.9322 1.73168 30.0832 2.07152 30.1398C2.68827 30.2468 3.34278 30.0392 3.7959 29.5357Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M8.84355 20.7505L10.2721 21.94V28.7493C10.2721 29.7877 11.1154 30.6373 12.1601 30.6373C13.1985 30.6373 14.0481 29.7877 14.0481 28.7493V21.0589C14.0481 20.4988 13.7964 19.9701 13.3685 19.6114L9.91971 16.7291L12.1287 10.8071L14.325 13.702C14.5327 13.9726 14.8411 14.1551 15.1809 14.1929L19.1898 14.6649C19.2401 14.6712 19.2905 14.6712 19.3345 14.6712C19.9639 14.6712 20.5114 14.1992 20.5869 13.5635C20.6687 12.8713 20.1715 12.2482 19.4856 12.1664L16.0054 11.7573L12.6762 7.36461C12.4685 6.9933 12.1287 6.69122 11.7007 6.53389C10.7253 6.16887 9.63651 6.66605 9.2715 7.64151C9.24948 7.7013 5.89639 16.7102 5.88569 16.7731C5.87122 16.8015 5.83849 16.9166 5.82905 16.9934C5.70948 17.6479 5.94862 18.3339 6.47726 18.7744L8.84355 20.7505Z"
                                                    fill="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Recovery" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            RECOVERY
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Stretching")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Stretching" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="35"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M29.7502 19.7199L26.1645 14.8307C26.0472 14.6706 25.8975 14.5371 25.7253 14.4388L21.4503 11.9073L20.3577 7.28778L23.1243 2.07696C23.4907 1.38757 23.2284 0.531458 22.5387 0.165339C21.8491 -0.200781 20.9932 0.0615178 20.6271 0.75091L17.6105 6.43194C17.4496 6.73517 17.4043 7.08645 17.4834 7.42044L18.8036 13.0012L13.606 22.1075L6.31878 33.3822C5.81011 34.1691 6.03588 35.2194 6.82278 35.7281C7.61132 36.2376 8.66079 36.0094 9.16836 35.2241L16.6374 23.6679L18.8344 24.6943L23.6371 28.8174L23.6234 34.2988C23.6212 35.2359 24.3789 35.9973 25.3158 35.9997H25.3202C26.2551 35.9995 27.0143 35.2428 27.0165 34.3073L27.0321 28.0437C27.0335 27.5477 26.8174 27.0755 26.4408 26.7523L23.2037 23.9733L29.0827 21.8883C29.9746 21.5722 30.3102 20.4835 29.7502 19.7199ZM22.8727 21.0907L24.7637 17.702L26.3458 19.8589L22.8727 21.0907Z"
                                                    fill="url(#paint0_linear_9780_52437)"
                                                />
                                                <path
                                                    d="M26.5051 7.06091C25.0996 6.25863 23.31 6.7478 22.508 8.15323C21.7057 9.55865 22.1949 11.3483 23.6003 12.1503C25.0057 12.9526 26.7951 12.4634 27.5974 11.058C28.3997 9.65259 27.9105 7.86291 26.5051 7.06091Z"
                                                    fill="url(#paint1_linear_9780_52437)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_9780_52437"
                                                        x1="5.12467"
                                                        y1="22.9787"
                                                        x2="30.8312"
                                                        y2="22.9815"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_9780_52437"
                                                        x1="5.12467"
                                                        y1="22.9787"
                                                        x2="30.8312"
                                                        y2="22.9815"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="35"
                                                height="28"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M29.7502 19.7199L26.1645 14.8307C26.0472 14.6706 25.8975 14.5371 25.7253 14.4388L21.4503 11.9073L20.3577 7.28778L23.1243 2.07696C23.4907 1.38757 23.2284 0.531458 22.5387 0.165339C21.8491 -0.200781 20.9932 0.0615178 20.6271 0.75091L17.6105 6.43194C17.4496 6.73517 17.4043 7.08645 17.4834 7.42044L18.8036 13.0012L13.606 22.1075L6.31878 33.3822C5.81011 34.1691 6.03588 35.2194 6.82278 35.7281C7.61132 36.2376 8.66079 36.0093 9.16836 35.2241L16.6374 23.6679L18.8344 24.6943L23.6371 28.8174L23.6234 34.2988C23.6212 35.2359 24.3789 35.9973 25.3158 35.9997H25.3202C26.2551 35.9995 27.0143 35.2428 27.0165 34.3073L27.0321 28.0437C27.0335 27.5477 26.8174 27.0755 26.4408 26.7523L23.2037 23.9733L29.0827 21.8883C29.9746 21.5722 30.3102 20.4835 29.7502 19.7199ZM22.8727 21.0907L24.7637 17.702L26.3458 19.8589L22.8727 21.0907Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M26.383 7.38587C24.9776 6.58359 23.1879 7.07276 22.3859 8.47819C21.5836 9.88362 22.0728 11.6733 23.4782 12.4753C24.8836 13.2776 26.673 12.7884 27.4753 11.383C28.2776 9.97755 27.7884 8.18787 26.383 7.38587Z"
                                                    fill="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Stretching" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            STRETCHING
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Warmup")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Warmup" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="28"
                                                viewBox="0 0 24 32"
                                                fill="none"
                                            >
                                                <path
                                                    d="M11.5 17.6909H5.75V12.625C5.75 11.6586 6.53358 10.875 7.5 10.875H9.75C10.7164 10.875 11.5 11.6586 11.5 12.625V17.6909Z"
                                                    fill="url(#paint0_linear_8987_41309)"
                                                    stroke="url(#paint1_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M5.75 12.6239C5.75 12.5554 5.75524 12.4869 5.76518 12.418H5.88395C5.87813 12.4853 5.875 12.5539 5.875 12.6239V17.6898H5.75V12.6239Z"
                                                    fill="url(#paint2_linear_8987_41309)"
                                                    stroke="url(#paint3_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M8.625 9.475C7.56899 9.475 6.7125 8.61851 6.7125 7.5625C6.7125 6.50649 7.56899 5.65 8.625 5.65C9.68101 5.65 10.5375 6.50649 10.5375 7.5625C10.5375 8.61851 9.68101 9.475 8.625 9.475Z"
                                                    fill="url(#paint4_linear_8987_41309)"
                                                    stroke="url(#paint5_linear_8987_41309)"
                                                    strokeWidth="1.8"
                                                />
                                                <path
                                                    d="M5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625H5.8125Z"
                                                    fill="url(#paint6_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625C5.8125 9.11556 7.07194 10.375 8.625 10.375C9.0255 10.375 9.40519 10.2884 9.75 10.1376C8.75775 9.70337 8.0625 8.71506 8.0625 7.5625Z"
                                                    fill="url(#paint7_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M6.36672 7.0625C6.58689 6.06407 7.45253 5.30757 8.50351 5.25314C8.03189 5.73617 7.70629 6.36285 7.60008 7.0625H6.36672Z"
                                                    fill="url(#paint8_linear_8987_41309)"
                                                    stroke="url(#paint9_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M7 12.125H1.875C1.52958 12.125 1.25 11.8454 1.25 11.5C1.25 11.1546 1.52958 10.875 1.875 10.875H7V12.125Z"
                                                    fill="url(#paint10_linear_8987_41309)"
                                                    stroke="url(#paint11_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M8 13.125H9.25V13.25H8V13.125Z"
                                                    fill="url(#paint12_linear_8987_41309)"
                                                    stroke="url(#paint13_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M3.76049 11.723L3.76049 11.723L4.64643 14.9799C4.64643 14.9799 4.64643 14.9799 4.64643 14.9799C4.73707 15.3131 5.08043 15.5096 5.41353 15.419L3.76049 11.723ZM3.76049 11.723C3.66986 11.3899 3.86639 11.0464 4.19959 10.9558M3.76049 11.723L4.19959 10.9558M4.19959 10.9558C4.53272 10.8652 4.87616 11.0617 4.96681 11.3949M4.19959 10.9558L4.96681 11.3949M4.96681 11.3949C4.96681 11.3949 4.96681 11.3949 4.96681 11.3949M4.96681 11.3949L4.96681 11.3949M4.96681 11.3949L5.85263 14.6514C5.85264 14.6514 5.85265 14.6514 5.85266 14.6515C5.94302 14.985 5.74611 15.3284 5.41365 15.419L4.96681 11.3949Z"
                                                    fill="url(#paint14_linear_8987_41309)"
                                                    stroke="url(#paint15_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M9.09903 21.4674L8.62469 20.0442L8.15034 21.4674L5.04546 30.7826C4.95208 31.0621 4.6906 31.2505 4.39638 31.2505C3.97429 31.2505 3.65251 30.8715 3.72134 30.4541C3.72135 30.454 3.72136 30.4539 3.72137 30.4539L5.67354 18.6914H11.5758L13.5275 30.4547L13.5275 30.4549C13.5967 30.8713 13.2754 31.2505 12.853 31.2505C12.5588 31.2505 12.2973 31.0621 12.2039 30.7826L9.09903 21.4674Z"
                                                    fill="url(#paint16_linear_8987_41309)"
                                                    stroke="url(#paint17_linear_8987_41309)"
                                                />
                                                <mask id="path-11-inside-1_8987_41309" fill="white">
                                                    <path d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z" />
                                                </mask>
                                                <path
                                                    d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z"
                                                    fill="url(#paint18_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M4.141 30.3723L3.1545 30.2086L3.15445 30.2089L4.141 30.3723ZM6.16263 18.1914L7.14913 18.3551L7.34227 17.1914H6.16263V18.1914ZM5.24969 18.1914V17.1914H4.40198L4.26318 18.0277L5.24969 18.1914ZM3.22806 30.3723L2.24156 30.2086L2.24146 30.2092L3.22806 30.3723ZM4.84413 31.6509L5.22506 32.5755L7.42253 31.6701L5.23882 30.7321L4.84413 31.6509ZM5.12751 30.5361L7.14913 18.3551L5.17612 18.0277L3.1545 30.2086L5.12751 30.5361ZM6.16263 17.1914H5.24969V19.1914H6.16263V17.1914ZM4.26318 18.0277L2.24156 30.2086L4.21457 30.5361L6.23619 18.3551L4.26318 18.0277ZM2.24146 30.2092C2.02154 31.5391 3.04732 32.7499 4.39638 32.7499V30.7499C4.28293 30.7499 4.19609 30.6478 4.21466 30.5355L2.24146 30.2092ZM4.39638 32.7499C4.7294 32.7499 5.01194 32.6633 5.22506 32.5755L4.46319 30.7263C4.39506 30.7544 4.38061 30.7499 4.39638 30.7499V32.7499ZM5.23882 30.7321C5.15505 30.6961 5.11458 30.6141 5.12756 30.5358L3.15445 30.2089C2.98292 31.2444 3.56683 32.1906 4.44943 32.5697L5.23882 30.7321Z"
                                                    fill="url(#paint19_linear_8987_41309)"
                                                    mask="url(#path-11-inside-1_8987_41309)"
                                                />
                                                <path
                                                    d="M12.6429 30.9406L9.53737 21.625H8.625L11.73 30.9406C11.8914 31.4238 12.3437 31.75 12.8533 31.75C13.0198 31.75 13.1756 31.7123 13.3185 31.651C13.0074 31.5222 12.7538 31.2736 12.6429 30.9406Z"
                                                    fill="url(#paint20_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M16.5 10.375V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C19.7406 18.25 21 16.9906 21 15.4375C21 14.5206 20.5545 13.7134 19.875 13.2004V10.375H16.5Z"
                                                    fill="url(#paint21_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M19.875 1.9375C19.875 1.00544 19.1196 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H19.875V1.9375Z"
                                                    fill="url(#paint22_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M16.5 15.4375C16.5 14.5206 16.9455 13.7134 17.625 13.2004V10.375H16.5V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C18.3804 18.25 18.5683 18.2303 18.75 18.1932C17.4664 17.9327 16.5 16.7982 16.5 15.4375Z"
                                                    fill="url(#paint23_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M18.75 0.3535C18.5734 0.2905 18.3861 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H17.625V1.9375C17.625 1.204 18.0958 0.585813 18.75 0.3535Z"
                                                    fill="url(#paint24_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M18.1875 16.5625C17.5659 16.5625 17.0625 16.0591 17.0625 15.4375C17.0625 14.8159 17.5659 14.3125 18.1875 14.3125C18.8091 14.3125 19.3125 14.8159 19.3125 15.4375C19.3125 16.0591 18.8091 16.5625 18.1875 16.5625Z"
                                                    fill="url(#paint25_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M21 9.25H23.25V10.375H21V9.25Z"
                                                    fill="url(#paint26_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M21 11.5H23.25V12.625H21V11.5Z"
                                                    fill="url(#paint27_linear_8987_41309)"
                                                />
                                                <path
                                                    d="M21 7H23.25V8.125H21V7Z"
                                                    fill="url(#paint28_linear_8987_41309)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8987_41309"
                                                        x1="4.99038"
                                                        y1="15.3639"
                                                        x2="12.2272"
                                                        y2="15.3649"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8987_41309"
                                                        x1="4.99038"
                                                        y1="15.3639"
                                                        x2="12.2272"
                                                        y2="15.3649"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8987_41309"
                                                        x1="5.20195"
                                                        y1="15.9213"
                                                        x2="6.54136"
                                                        y2="15.9213"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8987_41309"
                                                        x1="5.20195"
                                                        y1="15.9213"
                                                        x2="6.54136"
                                                        y2="15.9213"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint4_linear_8987_41309"
                                                        x1="5.59615"
                                                        y1="8.34043"
                                                        x2="11.6268"
                                                        y2="8.3414"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint5_linear_8987_41309"
                                                        x1="5.59615"
                                                        y1="8.34043"
                                                        x2="11.6268"
                                                        y2="8.3414"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint6_linear_8987_41309"
                                                        x1="5.59615"
                                                        y1="6.54521"
                                                        x2="11.6268"
                                                        y2="6.54717"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint7_linear_8987_41309"
                                                        x1="5.66106"
                                                        y1="8.34043"
                                                        x2="9.88253"
                                                        y2="8.34091"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint8_linear_8987_41309"
                                                        x1="5.66106"
                                                        y1="6.54521"
                                                        x2="9.88253"
                                                        y2="6.54617"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint9_linear_8987_41309"
                                                        x1="5.66106"
                                                        y1="6.54521"
                                                        x2="9.88253"
                                                        y2="6.54617"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint10_linear_8987_41309"
                                                        x1="0.490385"
                                                        y1="11.8112"
                                                        x2="7.72719"
                                                        y2="11.8147"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint11_linear_8987_41309"
                                                        x1="0.490385"
                                                        y1="11.8112"
                                                        x2="7.72719"
                                                        y2="11.8147"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint12_linear_8987_41309"
                                                        x1="7.41346"
                                                        y1="13.3431"
                                                        x2="9.82573"
                                                        y2="13.3439"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint13_linear_8987_41309"
                                                        x1="7.41346"
                                                        y1="13.3431"
                                                        x2="9.82573"
                                                        y2="13.3439"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint14_linear_8987_41309"
                                                        x1="3.11765"
                                                        y1="13.9491"
                                                        x2="6.48029"
                                                        y2="13.9494"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint15_linear_8987_41309"
                                                        x1="3.11765"
                                                        y1="13.9491"
                                                        x2="6.48029"
                                                        y2="13.9494"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint16_linear_8987_41309"
                                                        x1="2.79556"
                                                        y1="26.8461"
                                                        x2="14.4014"
                                                        y2="26.8476"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint17_linear_8987_41309"
                                                        x1="2.79556"
                                                        y1="26.8461"
                                                        x2="14.4014"
                                                        y2="26.8476"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint18_linear_8987_41309"
                                                        x1="3.09843"
                                                        y1="26.8458"
                                                        x2="6.26194"
                                                        y2="26.8459"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint19_linear_8987_41309"
                                                        x1="3.09843"
                                                        y1="26.8458"
                                                        x2="6.26194"
                                                        y2="26.8459"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint20_linear_8987_41309"
                                                        x1="8.44448"
                                                        y1="28.0878"
                                                        x2="13.4765"
                                                        y2="28.0881"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint21_linear_8987_41309"
                                                        x1="15.1587"
                                                        y1="15.4016"
                                                        x2="21.1893"
                                                        y2="15.4023"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint22_linear_8987_41309"
                                                        x1="16.3702"
                                                        y1="6.71277"
                                                        x2="19.9886"
                                                        y2="6.71296"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint23_linear_8987_41309"
                                                        x1="15.2452"
                                                        y1="15.4016"
                                                        x2="18.8636"
                                                        y2="15.4018"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint24_linear_8987_41309"
                                                        x1="16.4135"
                                                        y1="6.71277"
                                                        x2="18.8257"
                                                        y2="6.71286"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint25_linear_8987_41309"
                                                        x1="16.976"
                                                        y1="15.7487"
                                                        x2="19.3882"
                                                        y2="15.7491"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint26_linear_8987_41309"
                                                        x1="20.9135"
                                                        y1="9.96809"
                                                        x2="23.3257"
                                                        y2="9.96887"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint27_linear_8987_41309"
                                                        x1="20.9135"
                                                        y1="12.2181"
                                                        x2="23.3257"
                                                        y2="12.2189"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint28_linear_8987_41309"
                                                        x1="20.9135"
                                                        y1="7.71809"
                                                        x2="23.3257"
                                                        y2="7.71887"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="28"
                                                viewBox="0 0 24 32"
                                                fill="none"
                                            >
                                                <path
                                                    d="M11.5 17.6909H5.75V12.625C5.75 11.6586 6.53358 10.875 7.5 10.875H9.75C10.7164 10.875 11.5 11.6586 11.5 12.625V17.6909Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M5.75 12.6239C5.75 12.5554 5.75524 12.4869 5.76518 12.418H5.88395C5.87813 12.4853 5.875 12.5539 5.875 12.6239V17.6898H5.75V12.6239Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M8.625 9.475C7.56899 9.475 6.7125 8.61851 6.7125 7.5625C6.7125 6.50649 7.56899 5.65 8.625 5.65C9.68101 5.65 10.5375 6.50649 10.5375 7.5625C10.5375 8.61851 9.68101 9.475 8.625 9.475Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                    strokeWidth="1.8"
                                                />
                                                <path
                                                    d="M5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625H5.8125Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625C5.8125 9.11556 7.07194 10.375 8.625 10.375C9.0255 10.375 9.40519 10.2884 9.75 10.1376C8.75775 9.70337 8.0625 8.71506 8.0625 7.5625Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M6.36672 7.0625C6.58689 6.06407 7.45253 5.30757 8.50351 5.25314C8.03189 5.73617 7.70629 6.36285 7.60008 7.0625H6.36672Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M7 12.125H1.875C1.52958 12.125 1.25 11.8454 1.25 11.5C1.25 11.1546 1.52958 10.875 1.875 10.875H7V12.125Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M8 13.125H9.25V13.25H8V13.125Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M3.76049 11.723L3.76049 11.723L4.64643 14.9799C4.64643 14.9799 4.64643 14.9799 4.64643 14.9799C4.73707 15.3131 5.08043 15.5096 5.41353 15.419L3.76049 11.723ZM3.76049 11.723C3.66986 11.3899 3.86639 11.0464 4.19959 10.9558M3.76049 11.723L4.19959 10.9558M4.19959 10.9558C4.53272 10.8652 4.87616 11.0617 4.96681 11.3949M4.19959 10.9558L4.96681 11.3949M4.96681 11.3949C4.96681 11.3949 4.96681 11.3949 4.96681 11.3949M4.96681 11.3949L4.96681 11.3949M4.96681 11.3949L5.85263 14.6514C5.85264 14.6514 5.85265 14.6514 5.85266 14.6515C5.94302 14.985 5.74611 15.3284 5.41365 15.419L4.96681 11.3949Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M9.09903 21.4674L8.62469 20.0442L8.15034 21.4674L5.04546 30.7826C4.95208 31.0621 4.6906 31.2505 4.39638 31.2505C3.97429 31.2505 3.65251 30.8715 3.72134 30.4541C3.72135 30.454 3.72136 30.4539 3.72137 30.4539L5.67354 18.6914H11.5758L13.5275 30.4547L13.5275 30.4549C13.5967 30.8713 13.2754 31.2505 12.853 31.2505C12.5588 31.2505 12.2973 31.0621 12.2039 30.7826L9.09903 21.4674Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <mask id="path-11-inside-1_6624_38064" fill="white">
                                                    <path d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z" />
                                                </mask>
                                                <path
                                                    d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M4.141 30.3723L3.1545 30.2086L3.15445 30.2089L4.141 30.3723ZM6.16263 18.1914L7.14913 18.3551L7.34227 17.1914H6.16263V18.1914ZM5.24969 18.1914V17.1914H4.40198L4.26318 18.0277L5.24969 18.1914ZM3.22806 30.3723L2.24156 30.2086L2.24146 30.2092L3.22806 30.3723ZM4.84413 31.6509L5.22506 32.5755L7.42253 31.6701L5.23882 30.7321L4.84413 31.6509ZM5.12751 30.5361L7.14913 18.3551L5.17612 18.0277L3.1545 30.2086L5.12751 30.5361ZM6.16263 17.1914H5.24969V19.1914H6.16263V17.1914ZM4.26318 18.0277L2.24156 30.2086L4.21457 30.5361L6.23619 18.3551L4.26318 18.0277ZM2.24146 30.2092C2.02154 31.5391 3.04732 32.7499 4.39638 32.7499V30.7499C4.28293 30.7499 4.19609 30.6478 4.21466 30.5355L2.24146 30.2092ZM4.39638 32.7499C4.7294 32.7499 5.01194 32.6633 5.22506 32.5755L4.46319 30.7263C4.39506 30.7544 4.38061 30.7499 4.39638 30.7499V32.7499ZM5.23882 30.7321C5.15505 30.6961 5.11458 30.6141 5.12756 30.5358L3.15445 30.2089C2.98292 31.2444 3.56683 32.1906 4.44943 32.5697L5.23882 30.7321Z"
                                                    fill="#D4D4D4"
                                                    mask="url(#path-11-inside-1_6624_38064)"
                                                />
                                                <path
                                                    d="M12.6429 30.9406L9.53737 21.625H8.625L11.73 30.9406C11.8914 31.4238 12.3437 31.75 12.8533 31.75C13.0198 31.75 13.1756 31.7123 13.3185 31.651C13.0074 31.5222 12.7538 31.2736 12.6429 30.9406Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M16.5 10.375V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C19.7406 18.25 21 16.9906 21 15.4375C21 14.5206 20.5545 13.7134 19.875 13.2004V10.375H16.5Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M19.875 1.9375C19.875 1.00544 19.1196 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H19.875V1.9375Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M16.5 15.4375C16.5 14.5206 16.9455 13.7134 17.625 13.2004V10.375H16.5V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C18.3804 18.25 18.5683 18.2303 18.75 18.1932C17.4664 17.9327 16.5 16.7982 16.5 15.4375Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M18.75 0.3535C18.5734 0.2905 18.3861 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H17.625V1.9375C17.625 1.204 18.0958 0.585813 18.75 0.3535Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M18.1875 16.5625C17.5659 16.5625 17.0625 16.0591 17.0625 15.4375C17.0625 14.8159 17.5659 14.3125 18.1875 14.3125C18.8091 14.3125 19.3125 14.8159 19.3125 15.4375C19.3125 16.0591 18.8091 16.5625 18.1875 16.5625Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M21 9.25H23.25V10.375H21V9.25Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M21 11.5H23.25V12.625H21V11.5Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path d="M21 7H23.25V8.125H21V7Z" fill="#D4D4D4" />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Warmup" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            WARMUP
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Hiit")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Hiit" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="28"
                                                viewBox="0 0 34 34"
                                                fill="none"
                                            >
                                                <path
                                                    d="M16.292 30.8867C16.3203 30.9689 16.3496 31.0507 16.3798 31.132H0.622641C0.555087 31.132 0.5 31.0769 0.5 31.0094C0.5 30.9418 0.555087 30.8867 0.622641 30.8867H16.292Z"
                                                    fill="url(#paint0_linear_8987_41363)"
                                                    stroke="url(#paint1_linear_8987_41363)"
                                                />
                                                <path
                                                    d="M15.8256 29.0195C15.8386 29.1016 15.8525 29.1834 15.8673 29.2648H0.622641C0.555085 29.2648 0.5 29.2097 0.5 29.1422C0.5 29.0746 0.555085 29.0195 0.622641 29.0195H15.8256Z"
                                                    fill="url(#paint2_linear_8987_41363)"
                                                    stroke="url(#paint3_linear_8987_41363)"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M2.16396 28.5189C4.6044 23.9496 10.9295 12.3031 10.9295 12.3031L11.5064 6.81734C11.5359 6.53372 11.662 6.2691 11.8635 6.06737C12.8724 5.05744 16.0498 1.87575 17.1559 0.768067C17.4523 0.471067 17.9124 0.414406 18.272 0.630463C18.2723 0.630463 18.6661 1.00841 18.7085 1.27832C18.7508 1.54792 18.6714 1.82251 18.4918 2.02829C17.2524 3.44698 14.0427 7.00288 14.0427 7.00288L13.7314 11.056L18.2446 14.0692C18.3467 14.1374 18.4264 14.2345 18.4737 14.3479L19.7561 17.4303C19.8853 17.7403 19.8834 18.0896 19.7511 18.3985L19.049 20.0394C18.4865 20.64 17.9927 21.3059 17.5812 22.0247C17.4856 22.0188 17.3875 21.9976 17.2895 21.9597C16.8489 21.7747 16.6566 21.3174 16.8116 20.8903L17.6715 18.5227C17.7387 18.3368 17.7141 18.1298 17.6045 17.9651L17.0871 17.188C16.9679 17.009 16.7649 16.9041 16.5501 16.9107C16.3353 16.9169 16.1388 17.0339 16.0305 17.2195L14.354 20.098C14.354 20.098 16.1261 21.4229 17.4106 22.3348C16.8988 23.3021 16.5323 24.3584 16.3409 25.4738C16.2107 25.1756 16.1024 24.9241 16.0271 24.7422C15.9536 24.5657 15.8029 24.4325 15.6186 24.3811C14.6865 24.1218 12.4039 23.3136 10.7094 22.704C10.4715 22.6184 10.2057 22.7224 10.0506 22.9219L3.94222 30.7878C3.70686 31.0907 3.35849 31.2853 2.97744 31.3264C2.59607 31.3678 2.21439 31.252 1.91988 31.0063L1.81497 30.9188C1.64499 30.7769 1.53073 30.5895 1.47843 30.3868C1.42582 30.1844 1.43516 29.9668 1.51174 29.7642C1.52668 29.7249 1.54412 29.6863 1.56404 29.6483C1.71939 29.3532 1.92268 28.9706 2.16396 28.5189Z"
                                                    fill="url(#paint4_linear_8987_41363)"
                                                />
                                                <path
                                                    d="M5.68433 18.2451C6.02709 18.2195 6.28455 17.9207 6.25902 17.5779C6.04639 14.7247 6.73223 12.2742 8.31094 10.2208L5.68433 18.2451ZM5.68433 18.2451C5.34156 18.2709 5.04269 18.0131 5.01717 17.6707L5.68433 18.2451ZM5.76041 17.6151C5.76541 17.6824 5.7146 17.7414 5.64719 17.7464L5.64674 17.7465C5.57999 17.7515 5.52081 17.7009 5.51578 17.6335L5.51578 17.6335C5.28656 14.5596 6.03926 11.9528 7.72007 9.76661L5.76041 17.6151ZM7.91454 9.91603C6.2531 12.0771 5.53963 14.6525 5.7604 17.615L7.89213 9.74407C7.94569 9.78528 7.95572 9.8625 7.91461 9.91594L7.91454 9.91603ZM7.72013 9.76654C7.76133 9.71304 7.83853 9.70296 7.89207 9.74402L7.72013 9.76654ZM5.01721 17.6707H5.0172H5.01721Z"
                                                    fill="url(#paint5_linear_8987_41363)"
                                                    stroke="url(#paint6_linear_8987_41363)"
                                                />
                                                <path
                                                    d="M3.88998 16.665L3.88995 16.6648C3.66189 15.531 3.69316 14.3109 3.87379 13.2309C4.05317 12.1583 4.38818 11.1751 4.80655 10.5295C4.84342 10.4725 4.82692 10.3963 4.77042 10.3597L4.7701 10.3595C4.71373 10.3229 4.63748 10.3391 4.60083 10.3956L3.88998 16.665ZM3.88998 16.665C3.90324 16.7308 3.8603 16.7958 3.79385 16.8092L3.8926 17.2994L3.79428 16.8091C3.7275 16.8225 3.66285 16.779 3.6497 16.7133L3.64962 16.7129M3.88998 16.665L3.64962 16.7129M3.64962 16.7129C3.41662 15.5547 3.45385 14.277 3.65634 13.1243M3.64962 16.7129L3.65634 13.1243M3.65634 13.1243C3.85996 11.9652 4.22214 10.9801 4.60081 10.3956L3.65634 13.1243Z"
                                                    fill="url(#paint7_linear_8987_41363)"
                                                    stroke="url(#paint8_linear_8987_41363)"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M26.7733 28.6101C27.3465 29.1232 27.7073 29.8688 27.7073 30.6978C27.7073 32.2441 26.4517 33.4997 24.9054 33.4997C23.3591 33.4997 22.1035 32.2441 22.1035 30.6978C22.1035 29.8688 22.4643 29.1232 23.0375 28.6101V22.2922C23.0375 21.9618 23.1685 21.6452 23.4023 21.4117C23.6358 21.1779 23.9524 21.0469 24.2828 21.0469H25.528C25.8584 21.0469 26.175 21.1779 26.4085 21.4117C26.6423 21.6452 26.7733 21.9618 26.7733 22.2922V28.6101Z"
                                                    fill="url(#paint9_linear_8987_41363)"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M29.2638 25.7179H28.6411C28.4089 25.7179 28.1959 25.5887 28.0888 25.3829C27.9818 25.1768 27.9979 24.9284 28.1312 24.7381L30.3104 21.6249C30.4269 21.4584 30.6171 21.3594 30.8204 21.3594C31.0237 21.3594 31.2139 21.4584 31.3303 21.6249L33.5096 24.7381C33.6428 24.9284 33.659 25.1768 33.5519 25.3829C33.4448 25.5887 33.2319 25.7179 32.9996 25.7179H32.377V30.0764C32.377 30.4204 32.0983 30.699 31.7543 30.699H29.8864C29.5424 30.699 29.2638 30.4204 29.2638 30.0764V25.7179Z"
                                                    fill="url(#paint10_linear_8987_41363)"
                                                />
                                                <path
                                                    d="M17.1562 13.5741C18.8756 13.5741 20.2694 12.1802 20.2694 10.4609C20.2694 8.74149 18.8756 7.34766 17.1562 7.34766C15.4368 7.34766 14.043 8.74149 14.043 10.4609C14.043 12.1802 15.4368 13.5741 17.1562 13.5741Z"
                                                    fill="url(#paint11_linear_8987_41363)"
                                                />
                                                <path
                                                    d="M24.9052 32.2538C25.7649 32.2538 26.4618 31.5569 26.4618 30.6972C26.4618 29.8375 25.7649 29.1406 24.9052 29.1406C24.0455 29.1406 23.3486 29.8375 23.3486 30.6972C23.3486 31.5569 24.0455 32.2538 24.9052 32.2538Z"
                                                    fill="url(#paint12_linear_8987_41363)"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M24.2832 22.9156C24.2832 22.5719 24.5621 22.293 24.9058 22.293C25.2495 22.293 25.5285 22.5719 25.5285 22.9156V29.7647C25.5285 30.1084 25.2495 30.3873 24.9058 30.3873C24.5621 30.3873 24.2832 30.1084 24.2832 29.7647V22.9156Z"
                                                    fill="url(#paint13_linear_8987_41363)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8987_41363"
                                                        x1="-0.658695"
                                                        y1="31.1816"
                                                        x2="17.7024"
                                                        y2="31.2225"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8987_41363"
                                                        x1="-0.658695"
                                                        y1="31.1816"
                                                        x2="17.7024"
                                                        y2="31.2225"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8987_41363"
                                                        x1="-0.633992"
                                                        y1="29.3144"
                                                        x2="17.0385"
                                                        y2="29.3523"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8987_41363"
                                                        x1="-0.633992"
                                                        y1="29.3144"
                                                        x2="17.0385"
                                                        y2="29.3523"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint4_linear_8987_41363"
                                                        x1="0.737376"
                                                        y1="20.1817"
                                                        x2="20.4712"
                                                        y2="20.1836"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint5_linear_8987_41363"
                                                        x1="4.84234"
                                                        y1="14.9814"
                                                        x2="8.55654"
                                                        y2="14.9816"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint6_linear_8987_41363"
                                                        x1="4.84234"
                                                        y1="14.9814"
                                                        x2="8.55654"
                                                        y2="14.9816"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint7_linear_8987_41363"
                                                        x1="2.89937"
                                                        y1="14.6091"
                                                        x2="5.40496"
                                                        y2="14.6092"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint8_linear_8987_41363"
                                                        x1="2.89937"
                                                        y1="14.6091"
                                                        x2="5.40496"
                                                        y2="14.6092"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint9_linear_8987_41363"
                                                        x1="21.888"
                                                        y1="28.9955"
                                                        x2="27.8959"
                                                        y2="28.9959"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint10_linear_8987_41363"
                                                        x1="27.803"
                                                        y1="27.3208"
                                                        x2="33.8108"
                                                        y2="27.3214"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint11_linear_8987_41363"
                                                        x1="13.8035"
                                                        y1="11.322"
                                                        x2="20.4789"
                                                        y2="11.323"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint12_linear_8987_41363"
                                                        x1="23.2289"
                                                        y1="31.1278"
                                                        x2="26.5666"
                                                        y2="31.1283"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint13_linear_8987_41363"
                                                        x1="24.2353"
                                                        y1="27.4596"
                                                        x2="25.5704"
                                                        y2="27.4596"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="28"
                                                viewBox="0 0 34 34"
                                                fill="none"
                                            >
                                                <path
                                                    d="M16.292 30.8867C16.3203 30.9689 16.3496 31.0507 16.3798 31.132H0.622641C0.555087 31.132 0.5 31.0769 0.5 31.0094C0.5 30.9418 0.555087 30.8867 0.622641 30.8867H16.292Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M15.8256 29.0195C15.8386 29.1016 15.8525 29.1834 15.8673 29.2648H0.622641C0.555085 29.2648 0.5 29.2097 0.5 29.1422C0.5 29.0746 0.555085 29.0195 0.622641 29.0195H15.8256Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M2.16396 28.5189C4.6044 23.9496 10.9295 12.3031 10.9295 12.3031L11.5064 6.81734C11.5359 6.53372 11.662 6.2691 11.8635 6.06737C12.8724 5.05744 16.0498 1.87575 17.1559 0.768067C17.4523 0.471067 17.9124 0.414406 18.272 0.630463C18.2723 0.630463 18.6661 1.00841 18.7085 1.27832C18.7508 1.54792 18.6714 1.82251 18.4918 2.02829C17.2524 3.44698 14.0427 7.00288 14.0427 7.00288L13.7314 11.056L18.2446 14.0692C18.3467 14.1374 18.4264 14.2345 18.4737 14.3479L19.7561 17.4303C19.8853 17.7403 19.8834 18.0896 19.7511 18.3985L19.049 20.0394C18.4865 20.64 17.9927 21.3059 17.5812 22.0247C17.4856 22.0188 17.3875 21.9976 17.2895 21.9597C16.8489 21.7747 16.6566 21.3174 16.8116 20.8903L17.6715 18.5227C17.7387 18.3368 17.7141 18.1298 17.6045 17.9651L17.0871 17.188C16.9679 17.009 16.7649 16.9041 16.5501 16.9107C16.3353 16.9169 16.1388 17.0339 16.0305 17.2195L14.354 20.098C14.354 20.098 16.1261 21.4229 17.4106 22.3348C16.8988 23.3021 16.5323 24.3584 16.3409 25.4738C16.2107 25.1756 16.1024 24.9241 16.0271 24.7422C15.9536 24.5657 15.8029 24.4325 15.6186 24.3811C14.6865 24.1218 12.4039 23.3136 10.7094 22.704C10.4715 22.6184 10.2057 22.7224 10.0506 22.9219L3.94222 30.7878C3.70686 31.0907 3.35849 31.2853 2.97744 31.3264C2.59607 31.3678 2.21439 31.252 1.91988 31.0063L1.81497 30.9188C1.64499 30.7769 1.53073 30.5895 1.47843 30.3868C1.42582 30.1844 1.43516 29.9668 1.51174 29.7642C1.52668 29.7249 1.54412 29.6863 1.56404 29.6483C1.71939 29.3532 1.92268 28.9706 2.16396 28.5189Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M5.68433 18.2451C6.02709 18.2195 6.28455 17.9207 6.25902 17.5779C6.04639 14.7247 6.73223 12.2742 8.31094 10.2208L5.68433 18.2451ZM5.68433 18.2451C5.34156 18.2709 5.04269 18.0131 5.01717 17.6707L5.68433 18.2451ZM5.76041 17.6151C5.76541 17.6824 5.7146 17.7414 5.64719 17.7464L5.64674 17.7465C5.57999 17.7515 5.52081 17.7009 5.51578 17.6335L5.51578 17.6335C5.28656 14.5596 6.03926 11.9528 7.72007 9.76661L5.76041 17.6151ZM7.91454 9.91603C6.2531 12.0771 5.53963 14.6525 5.7604 17.615L7.89213 9.74407C7.94569 9.78528 7.95572 9.8625 7.91461 9.91594L7.91454 9.91603ZM7.72013 9.76654C7.76133 9.71304 7.83853 9.70296 7.89207 9.74402L7.72013 9.76654ZM5.01721 17.6707H5.0172H5.01721Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M3.88998 16.665L3.88995 16.6648C3.66189 15.531 3.69316 14.3109 3.87379 13.2309C4.05317 12.1583 4.38818 11.1751 4.80655 10.5295C4.84342 10.4725 4.82692 10.3963 4.77042 10.3597L4.7701 10.3595C4.71373 10.3229 4.63748 10.3391 4.60083 10.3956L3.88998 16.665ZM3.88998 16.665C3.90324 16.7308 3.8603 16.7958 3.79385 16.8092L3.8926 17.2994L3.79428 16.8091C3.7275 16.8225 3.66285 16.779 3.6497 16.7133L3.64962 16.7129M3.88998 16.665L3.64962 16.7129M3.64962 16.7129C3.41662 15.5547 3.45385 14.277 3.65634 13.1243M3.64962 16.7129L3.65634 13.1243M3.65634 13.1243C3.85996 11.9652 4.22214 10.9801 4.60081 10.3956L3.65634 13.1243Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M26.7733 28.6101C27.3465 29.1232 27.7073 29.8688 27.7073 30.6978C27.7073 32.2441 26.4517 33.4997 24.9054 33.4997C23.3591 33.4997 22.1035 32.2441 22.1035 30.6978C22.1035 29.8688 22.4643 29.1232 23.0375 28.6101V22.2922C23.0375 21.9618 23.1685 21.6452 23.4023 21.4117C23.6358 21.1779 23.9524 21.0469 24.2828 21.0469H25.528C25.8584 21.0469 26.175 21.1779 26.4085 21.4117C26.6423 21.6452 26.7733 21.9618 26.7733 22.2922V28.6101Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M29.2638 25.7179H28.6411C28.4089 25.7179 28.1959 25.5887 28.0888 25.3829C27.9818 25.1768 27.9979 24.9284 28.1312 24.7381L30.3104 21.6249C30.4269 21.4584 30.6171 21.3594 30.8204 21.3594C31.0237 21.3594 31.2139 21.4584 31.3303 21.6249L33.5096 24.7381C33.6428 24.9284 33.659 25.1768 33.5519 25.3829C33.4448 25.5887 33.2319 25.7179 32.9996 25.7179H32.377V30.0764C32.377 30.4204 32.0983 30.699 31.7543 30.699H29.8864C29.5424 30.699 29.2638 30.4204 29.2638 30.0764V25.7179Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M17.1562 13.5741C18.8756 13.5741 20.2694 12.1802 20.2694 10.4609C20.2694 8.74149 18.8756 7.34766 17.1562 7.34766C15.4368 7.34766 14.043 8.74149 14.043 10.4609C14.043 12.1802 15.4368 13.5741 17.1562 13.5741Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    d="M24.9052 32.2538C25.7649 32.2538 26.4618 31.5569 26.4618 30.6972C26.4618 29.8375 25.7649 29.1406 24.9052 29.1406C24.0455 29.1406 23.3486 29.8375 23.3486 30.6972C23.3486 31.5569 24.0455 32.2538 24.9052 32.2538Z"
                                                    fill="#D4D4D4"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M24.2832 22.9156C24.2832 22.5719 24.5621 22.293 24.9058 22.293C25.2495 22.293 25.5285 22.5719 25.5285 22.9156V29.7647C25.5285 30.1084 25.2495 30.3873 24.9058 30.3873C24.5621 30.3873 24.2832 30.1084 24.2832 29.7647V22.9156Z"
                                                    fill="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Hiit" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            HIIT
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-auto bg-[#171717] pl-[32px]">
                                <div className="bg-[#171717] relative">
                                    <button
                                        onClick={() => setSingleCategory("Pilates")}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        {SingleCategory === "Pilates" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="29"
                                                height="28"
                                                viewBox="0 0 29 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M28.3264 13.1545L28.3155 13.1295C28.0939 12.6239 27.5289 12.3607 26.9944 12.5158C26.9941 12.5159 26.9939 12.516 26.9936 12.516L22.8469 13.739L22.5435 13.8284L22.3327 13.5925L18.6697 9.49368L28.3264 13.1545ZM28.3264 13.1545L28.3293 13.1718L28.3429 13.2113C28.541 13.7864 28.2376 14.4088 27.662 14.6075C27.6618 14.6076 27.6616 14.6077 27.6614 14.6077L23.0513 16.1819C23.0511 16.182 23.0508 16.1821 23.0506 16.1821C21.9565 16.5525 20.7519 16.2231 20.0071 15.3476C20.0069 15.3475 20.0068 15.3473 20.0067 15.3472L19.0299 14.1947L18.1484 13.1547V14.518V20.7406V20.8061L18.1653 20.8693L21.5965 33.7506L21.5967 33.7511C21.793 34.4846 21.3651 35.2391 20.6302 35.4466C19.8898 35.6537 19.1256 35.2243 18.919 34.4856L18.9187 34.4844L15.3832 21.9661C15.3829 21.9653 15.3827 21.9644 15.3825 21.9636C15.2952 21.6468 15.0453 21.3835 14.71 21.3025C14.2184 21.1812 13.7214 21.4833 13.5953 21.9677L10.0602 34.4844L10.0601 34.4847C9.85297 35.2202 9.0982 35.6485 8.36442 35.4522L8.36357 35.4519C7.62743 35.2563 7.18554 34.4913 7.38246 33.7503L10.8206 20.8696L10.8375 20.8062V20.7406V14.532V13.1688L9.95608 14.2087L8.97926 15.3613C8.97917 15.3614 8.97909 15.3615 8.97901 15.3616C8.23269 16.239 7.02796 16.5723 5.93698 16.1968L5.93644 16.1966L1.33452 14.6182C1.32582 14.6148 1.31779 14.6117 1.31148 14.6093L1.2868 14.5999C1.27308 14.5945 1.26766 14.592 1.2658 14.5911L1.25546 14.5859L1.2449 14.5812C0.687894 14.3342 0.436131 13.6857 0.677801 13.1289C0.899526 12.6237 1.46426 12.3608 1.99854 12.5158C1.99883 12.5159 1.99912 12.516 1.99941 12.516L6.14607 13.739L6.44984 13.8285L6.66065 13.5922L10.3163 9.49368C10.3164 9.49353 10.3165 9.49338 10.3167 9.49323C10.7631 8.99489 11.4008 8.71094 12.0672 8.71094H16.9188C17.5916 8.71094 18.2225 8.99444 18.6694 9.49333L28.3264 13.1545Z"
                                                    fill="url(#paint0_linear_8987_37862)"
                                                    stroke="url(#paint1_linear_8987_37862)"
                                                />
                                                <path
                                                    d="M17.5301 3.69844C17.5301 5.48715 16.1519 6.89687 14.5004 6.89687C12.8489 6.89687 11.4707 5.48715 11.4707 3.69844C11.4707 1.90973 12.8489 0.5 14.5004 0.5C16.1519 0.5 17.5301 1.90973 17.5301 3.69844Z"
                                                    fill="url(#paint2_linear_8987_37862)"
                                                    stroke="url(#paint3_linear_8987_37862)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_8987_37862"
                                                        x1="-1.02244"
                                                        y1="25.9486"
                                                        x2="29.8736"
                                                        y2="25.9538"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_8987_37862"
                                                        x1="-1.02244"
                                                        y1="25.9486"
                                                        x2="29.8736"
                                                        y2="25.9538"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint2_linear_8987_37862"
                                                        x1="10.6992"
                                                        y1="4.72141"
                                                        x2="18.2677"
                                                        y2="4.72258"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint3_linear_8987_37862"
                                                        x1="10.6992"
                                                        y1="4.72141"
                                                        x2="18.2677"
                                                        y2="4.72258"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#F43F5E" />
                                                        <stop offset="1" stopColor="#FB923C" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="29"
                                                height="28"
                                                viewBox="0 0 29 36"
                                                fill="none"
                                            >
                                                <path
                                                    d="M28.3264 13.1545L28.3155 13.1295C28.0939 12.6239 27.5289 12.3607 26.9944 12.5158C26.9941 12.5159 26.9939 12.516 26.9936 12.516L22.8469 13.739L22.5435 13.8284L22.3327 13.5925L18.6697 9.49368L28.3264 13.1545ZM28.3264 13.1545L28.3293 13.1718L28.3429 13.2113C28.541 13.7864 28.2376 14.4088 27.662 14.6075C27.6618 14.6076 27.6616 14.6077 27.6614 14.6077L23.0513 16.1819C23.0511 16.182 23.0508 16.1821 23.0506 16.1821C21.9565 16.5525 20.7519 16.2231 20.0071 15.3476C20.0069 15.3475 20.0068 15.3473 20.0067 15.3472L19.0299 14.1947L18.1484 13.1547V14.518V20.7406V20.8061L18.1653 20.8693L21.5965 33.7506L21.5967 33.7511C21.793 34.4846 21.3651 35.2391 20.6302 35.4466C19.8898 35.6537 19.1256 35.2243 18.919 34.4856L18.9187 34.4844L15.3832 21.9661C15.3829 21.9653 15.3827 21.9644 15.3825 21.9636C15.2952 21.6468 15.0453 21.3835 14.71 21.3025C14.2184 21.1812 13.7214 21.4833 13.5953 21.9677L10.0602 34.4844L10.0601 34.4847C9.85297 35.2202 9.0982 35.6485 8.36442 35.4522L8.36357 35.4519C7.62743 35.2563 7.18554 34.4913 7.38246 33.7503L10.8206 20.8696L10.8375 20.8062V20.7406V14.532V13.1688L9.95608 14.2087L8.97926 15.3613C8.97917 15.3614 8.97909 15.3615 8.97901 15.3616C8.23269 16.239 7.02796 16.5723 5.93698 16.1968L5.93644 16.1966L1.33452 14.6182C1.32582 14.6148 1.31779 14.6117 1.31148 14.6093L1.2868 14.5999C1.27308 14.5945 1.26766 14.592 1.2658 14.5911L1.25546 14.5859L1.2449 14.5812C0.687894 14.3342 0.436131 13.6857 0.677801 13.1289C0.899526 12.6237 1.46426 12.3608 1.99854 12.5158C1.99883 12.5159 1.99912 12.516 1.99941 12.516L6.14607 13.739L6.44984 13.8285L6.66065 13.5922L10.3163 9.49368C10.3164 9.49353 10.3165 9.49338 10.3167 9.49323C10.7631 8.99489 11.4008 8.71094 12.0672 8.71094H16.9188C17.5916 8.71094 18.2225 8.99444 18.6694 9.49333L28.3264 13.1545Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                                <path
                                                    d="M17.5301 3.69844C17.5301 5.48715 16.1519 6.89687 14.5004 6.89687C12.8489 6.89687 11.4707 5.48715 11.4707 3.69844C11.4707 1.90973 12.8489 0.5 14.5004 0.5C16.1519 0.5 17.5301 1.90973 17.5301 3.69844Z"
                                                    fill="#D4D4D4"
                                                    stroke="#D4D4D4"
                                                />
                                            </svg>
                                        )}
                                        <span
                                            className={`h-[30px] text-[16px] ${SingleCategory === "Pilates" ? "mid-heading activeLinkForFilter" : "text-[#D4D4D4]"}   font-bold leading-normal tracking-[0.36px]`}
                                        >
                                            PILATES
                                        </span>
                                    </button>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    <div className="flex gap-7">
                        <Dialog>
                            <DialogTrigger className="filterBtn flex w-[103px] h-[46px] justify-center items-center gap-3 border-[1px] border-solid border-[#FFF] rounded-[8px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                >
                                    <path
                                        d="M3.99954 3.69844C3.99954 3.48626 3.91525 3.28278 3.76522 3.13275C3.6152 2.98272 3.41171 2.89844 3.19954 2.89844C2.98737 2.89844 2.78388 2.98272 2.63385 3.13275C2.48382 3.28278 2.39954 3.48626 2.39954 3.69844V9.51284C2.15633 9.65327 1.95436 9.85525 1.81395 10.0985C1.67353 10.3417 1.59961 10.6176 1.59961 10.8984C1.59961 11.1793 1.67353 11.4552 1.81395 11.6984C1.95436 11.9416 2.15633 12.1436 2.39954 12.284V13.2984C2.39954 13.5106 2.48382 13.7141 2.63385 13.8641C2.78388 14.0142 2.98737 14.0984 3.19954 14.0984C3.41171 14.0984 3.6152 14.0142 3.76522 13.8641C3.91525 13.7141 3.99954 13.5106 3.99954 13.2984V12.284C4.24275 12.1436 4.44471 11.9416 4.58513 11.6984C4.72555 11.4552 4.79947 11.1793 4.79947 10.8984C4.79947 10.6176 4.72555 10.3417 4.58513 10.0985C4.44471 9.85525 4.24275 9.65327 3.99954 9.51284V3.69844ZM8.79954 3.69844C8.79954 3.48626 8.71525 3.28278 8.56522 3.13275C8.4152 2.98272 8.21171 2.89844 7.99954 2.89844C7.78737 2.89844 7.58388 2.98272 7.43385 3.13275C7.28382 3.28278 7.19954 3.48626 7.19954 3.69844V4.71284C6.95633 4.85327 6.75436 5.05525 6.61395 5.29847C6.47353 5.5417 6.39961 5.81759 6.39961 6.09844C6.39961 6.37928 6.47353 6.65518 6.61395 6.8984C6.75436 7.14162 6.95633 7.3436 7.19954 7.48404V13.2984C7.19954 13.5106 7.28382 13.7141 7.43385 13.8641C7.58388 14.0142 7.78737 14.0984 7.99954 14.0984C8.21171 14.0984 8.4152 14.0142 8.56522 13.8641C8.71525 13.7141 8.79954 13.5106 8.79954 13.2984V7.48404C9.04275 7.3436 9.24471 7.14162 9.38513 6.8984C9.52555 6.65518 9.59947 6.37928 9.59947 6.09844C9.59947 5.81759 9.52555 5.5417 9.38513 5.29847C9.24471 5.05525 9.04275 4.85327 8.79954 4.71284V3.69844ZM12.7995 2.89844C13.0117 2.89844 13.2152 2.98272 13.3652 3.13275C13.5153 3.28278 13.5995 3.48626 13.5995 3.69844V9.51284C13.8428 9.65327 14.0447 9.85525 14.1851 10.0985C14.3255 10.3417 14.3995 10.6176 14.3995 10.8984C14.3995 11.1793 14.3255 11.4552 14.1851 11.6984C14.0447 11.9416 13.8428 12.1436 13.5995 12.284V13.2984C13.5995 13.5106 13.5153 13.7141 13.3652 13.8641C13.2152 14.0142 13.0117 14.0984 12.7995 14.0984C12.5874 14.0984 12.3839 14.0142 12.2339 13.8641C12.0838 13.7141 11.9995 13.5106 11.9995 13.2984V12.284C11.7563 12.1436 11.5544 11.9416 11.4139 11.6984C11.2735 11.4552 11.1996 11.1793 11.1996 10.8984C11.1996 10.6176 11.2735 10.3417 11.4139 10.0985C11.5544 9.85525 11.7563 9.65327 11.9995 9.51284V3.69844C11.9995 3.48626 12.0838 3.28278 12.2339 3.13275C12.3839 2.98272 12.5874 2.89844 12.7995 2.89844Z"
                                        fill="#E5E5E5"
                                    />
                                </svg>
                                <span className="text-[20px] text-[#E5E5E5] font-medium leading-[30px]">
                                    Filter
                                </span>
                            </DialogTrigger>
                            <DialogContent
                                className="w-[580px] px-6"
                                style={{
                                    borderRadius: "var(--rounded-2xl, 16px)",
                                    border: "1px solid var(--Neutral-700, #404040)",
                                    background:
                                        "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                                    backdropFilter: "blur(100px)",
                                }}
                            >
                                <DialogHeader>
                                    <DialogTitle className="flex justify-start items-center border-b-[1px] border-[#a3a3a352]">
                                        <h1 className="text-[30px] h-[60px] text-[#FFF] font-bold leading-normal">
                                            Refine by
                                        </h1>
                                    </DialogTitle>
                                    <DialogDescription className="flex flex-col items-center justify-center">
                                        <div className="flex w-full flex-col justify-start items-start py-6 gap-[18px] max-h-[450px] overflow-y-auto">
                                            <div className="flex flex-col items-start justify-start w-full gap-4">
                                                <h2 className="text-[20px] text-[#F5F5F5] font-medium leading-[30px]">
                                                    Categories
                                                </h2>
                                                <div className="flex flex-wrap items-center justify-start w-full gap-2 pb-6 border-b-[1px] border-[#a3a3a352]">
                                                    {filterCategories.map((item) => {
                                                        const formattedItem = capitalizeFirstLetter(
                                                            item.toLowerCase(),
                                                        );
                                                        return (
                                                            <div
                                                                key={item}
                                                                onClick={() => manageCategory(formattedItem)}
                                                                className={`${categories.includes(formattedItem) || SingleCategory === formattedItem ? "fitness-level-selected font-semibold" : ""}
                                inline-block mb-1 px-4 py-2 bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[16px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                                                            >
                                                                {item}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-start w-full gap-2 pb-1 border-b-[1px] border-[#a3a3a352]">
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                    className="w-full"
                                                >
                                                    <AccordionItem
                                                        value="item-1"
                                                        className="border-b-0"
                                                    >
                                                        <AccordionTrigger className="text-[20px] text-[#F5F5F5] font-medium leading-[30px]">
                                                            Amenities
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="flex flex-wrap items-center justify-start w-full gap-2 cursor-pointer">
                                                                {Amenities.map((item) => (
                                                                    <div
                                                                        key={item}
                                                                        onClick={() =>
                                                                            manageOtherFilters(item, "amenities")
                                                                        }
                                                                        className={`${selectedAmenities.includes(item) ? "fitness-level-selected font-semibold" : ""}
                                inline-block py-2 px-4 bg-[#262626] border-[1px] border-[#262626] rounded-[8px] text-[14px] text-[#DADADA] font-normal leading-normal cursor-pointer`}
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>

                                            <div className="flex items-center justify-start w-full gap-2">
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                    className="w-full"
                                                >
                                                    <AccordionItem
                                                        value="item-1"
                                                        className="border-b-0"
                                                    >
                                                        <AccordionTrigger className="text-[20px] text-[#F5F5F5] font-medium leading-[30px]">
                                                            Rating
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="flex flex-wrap items-center justify-start w-full gap-2 cursor-pointer">
                                                                <div className="flex flex-wrap gap-3">
                                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                                        <Rating
                                                                            key={value}
                                                                            value={value}
                                                                            selectedRating={selectedRating}
                                                                            setSelectedRating={setSelectedRating}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                {/* <div className="mt-4">
                                                                    <h3>Selected Ratings:</h3>
                                                                    <p>{selectedRating.length > 0 ? selectedRating.join(", ") : "None"}</p>
                                                                </div> */}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <div className="flex items-center justify-between w-full sticky bottom-0 px-4 border-t-[1px] border-[#a3a3a352] pt-4">
                                        <span
                                            // onClick={clearFields}
                                            className="text-[24px] text-[#A3A3A3] font-medium leading-[36px] underline cursor-pointer"
                                        >
                                            Clear all
                                        </span>
                                        <DialogClose>
                                            <Button
                                                className="filterBtn text-[16px] text-[#FFF] font-semibold leading-[24px]"
                                                style={{
                                                    borderRadius: "var(--rounded-lg, 8px)",
                                                    border: "2px solid var(--Neutral-300, #D4D4D4)",
                                                    background:
                                                        "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
                                                    backdropFilter: "blur(100px)",
                                                }}
                                            //   onClick={() => fetchVideos(currentPage)}
                                            >
                                                Apply Filter
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <div className="flex w-[200px] h-[46px] justify-center items-center gap-3 border-[1px] border-solid border-[#FFF] rounded-[8px] px-3">
                            <label className="inline-flex items-center justify-center gap-2 cursor-pointer">
                                <span className="text-[20px] text-[#E5E5E5] font-medium leading-[30px]">
                                    5km Distance
                                </span>
                                <input
                                    type="checkbox"
                                    onChange={(e) => setLiveSession(e.target.checked)}
                                    value=""
                                    className="sr-only peer w-[60px] h-[32px]"
                                />
                                <div className="relative w-11 h-6 border border-[#FFF] bg-[#171717] peer-checked:after:border-none peer-checked:after:bg-[linear-gradient(90deg,_#f43f5e_3.36%,_#fb923c_96.64%)] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-[#171717] after:border-[#FFF] after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#171717]"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile carousel */}
            <div className="w-full mt-4">
                <nav className="flex md:hidden items-center justify-start w-full px-4 overflow-x-auto whitespace-nowrap md:px-0">
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] pl-0 pr-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Meditation")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Meditation" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 25 36"
                                    fill="none"
                                >
                                    <path
                                        d="M21.6479 35.9998H3.35148C1.92984 35.9998 0.777344 34.8474 0.777344 33.4257C0.777344 32.0041 1.92984 30.8516 3.35148 30.8516H21.6479C23.0696 30.8516 24.2221 32.0041 24.2221 33.4257C24.2221 34.8474 23.0696 35.9998 21.6479 35.9998Z"
                                        fill="url(#paint0_linear_7679_31639)"
                                    />
                                    <path
                                        d="M24.222 33.4256C24.222 34.1366 23.9339 34.78 23.4681 35.2457C23.0024 35.7115 22.3583 35.9996 21.6473 35.9996H20.6787C21.1687 35.8862 21.6066 35.6373 21.9504 35.2936C22.4282 34.8157 22.7242 34.1553 22.7242 33.4256C22.7242 32.1725 21.8505 31.1219 20.6787 30.8516H21.6473C23.0695 30.8515 24.222 32.0041 24.222 33.4256Z"
                                        fill="url(#paint1_linear_7679_31639)"
                                    />
                                    <path
                                        d="M20.6127 30.8516H4.3877C4.3877 31.8532 5.19966 32.6651 6.20127 32.6651H18.7991C19.8008 32.6651 20.6127 31.8532 20.6127 30.8516Z"
                                        fill="url(#paint2_linear_7679_31639)"
                                    />
                                    <path
                                        d="M20.7128 28.2324L20.0454 22.4879C19.8569 20.8656 18.851 19.4821 17.4224 18.8803L15.7041 18.1565C15.1037 17.9036 14.7094 17.2863 14.7094 16.5994L14.7175 14.6953H10.2826L10.2907 16.5994C10.2907 17.2864 9.89639 17.9037 9.29606 18.1565L7.57776 18.8803C6.14908 19.4821 5.14319 20.8656 4.95475 22.4879L4.28735 28.2324C4.08865 29.9425 5.34253 31.4514 6.96218 31.4514H18.0379C19.6576 31.4515 20.9114 29.9425 20.7128 28.2324Z"
                                        fill="url(#paint3_linear_7679_31639)"
                                    />
                                    <path
                                        d="M20.7123 28.2325L20.0447 22.4881C19.8564 20.8662 18.85 19.4825 17.4214 18.8806L15.7033 18.1567C15.1027 17.9042 14.709 17.2865 14.709 16.5997L14.7169 14.6953H13.2862L13.2783 17.3021C13.2783 17.989 13.6727 18.606 14.2732 18.8591L16.1355 19.7807C17.5641 20.3826 18.4257 21.568 18.6147 23.1906L19.2815 28.935C19.3949 29.9128 19.034 30.8244 18.4014 31.4256C19.84 31.2202 20.8956 29.8123 20.7123 28.2325Z"
                                        fill="url(#paint4_linear_7679_31639)"
                                    />
                                    <path
                                        d="M8.70248 22.6055L8.29685 26.9689C8.24475 27.5294 8.65861 28.0154 9.18806 28.0154H12.0857C13.0345 28.0154 13.8037 28.7845 13.8037 29.7333C13.8037 30.6821 13.0345 31.4513 12.0857 31.4513H6.96218C5.34253 31.4513 4.08865 29.9424 4.28735 28.2323L4.95475 22.6055H8.70248Z"
                                        fill="url(#paint5_linear_7679_31639)"
                                    />
                                    <path
                                        d="M14.0742 29.7018C14.083 30.1887 13.8888 30.6302 13.5709 30.9481C13.3056 31.2134 12.9547 31.3925 12.5631 31.4388C12.6181 31.2705 12.648 31.0915 12.648 30.9046C12.648 29.9553 11.8784 29.1864 10.9299 29.1864H8.032C7.50276 29.1864 7.08911 28.7 7.14114 28.1401L7.61174 23.5755C7.66856 23.0244 8.1329 22.6055 8.68689 22.6055H8.97341L8.56757 26.969C8.51554 27.5296 8.92919 28.0153 9.45843 28.0153H12.3172C13.2604 28.0152 14.0572 28.7588 14.0742 29.7018Z"
                                        fill="url(#paint6_linear_7679_31639)"
                                    />
                                    <path
                                        d="M13.2798 29.3784C13.5164 29.2558 13.785 29.1864 14.0697 29.1864H16.9676C17.4968 29.1864 17.9105 28.7 17.8584 28.1401L17.3878 23.5755C17.331 23.0244 16.8667 22.6055 16.3127 22.6055H16.0262L16.432 26.969C16.484 27.5296 16.0704 28.0153 15.5411 28.0153H12.6824C12.2561 28.0153 11.8598 28.1672 11.5518 28.4207L13.2798 29.3784Z"
                                        fill="url(#paint7_linear_7679_31639)"
                                    />
                                    <path
                                        d="M12.4996 16.0441C14.8493 16.0441 16.7541 14.1393 16.7541 11.7896C16.7541 9.43995 14.8493 7.53516 12.4996 7.53516C10.1499 7.53516 8.24512 9.43995 8.24512 11.7896C8.24512 14.1393 10.1499 16.0441 12.4996 16.0441Z"
                                        fill="url(#paint8_linear_7679_31639)"
                                    />
                                    <path
                                        d="M16.7544 11.7903C16.7544 14.1404 14.8493 16.0447 12.5 16.0447C11.5835 16.0447 10.7347 15.7552 10.04 15.2623C10.413 15.3693 10.8075 15.4264 11.2147 15.4264C13.5649 15.4264 15.4691 13.5213 15.4691 11.172C15.4691 9.73765 14.7602 8.46949 13.6725 7.69922C15.4521 8.20849 16.7544 9.84748 16.7544 11.7903Z"
                                        fill="url(#paint9_linear_7679_31639)"
                                    />
                                    <path
                                        d="M12.4998 5.40886C12.2043 5.40886 11.9648 5.16937 11.9648 4.87392V0.534938C11.9648 0.239484 12.2043 0 12.4998 0C12.7952 0 13.0347 0.239484 13.0347 0.534938V4.87399C13.0347 5.16937 12.7952 5.40886 12.4998 5.40886Z"
                                        fill="url(#paint10_linear_7679_31639)"
                                    />
                                    <path
                                        d="M6.33229 8.97003C6.24152 8.97003 6.14962 8.9469 6.06531 8.89824L2.3076 6.72875C2.05181 6.58102 1.96406 6.25393 2.11178 5.99806C2.25937 5.74227 2.58653 5.65445 2.84247 5.80224L6.60018 7.97173C6.85598 8.11946 6.94373 8.44656 6.796 8.70242C6.697 8.87406 6.51714 8.97003 6.33229 8.97003Z"
                                        fill="url(#paint11_linear_7679_31639)"
                                    />
                                    <path
                                        d="M22.4241 18.2591C22.3333 18.2591 22.2414 18.236 22.1571 18.1873L18.3994 16.0178C18.1436 15.8701 18.0559 15.543 18.2036 15.2871C18.3512 15.0313 18.6783 14.9435 18.9343 15.0913L22.692 17.2608C22.9478 17.4085 23.0355 17.7356 22.8878 17.9915C22.7887 18.1631 22.6089 18.2591 22.4241 18.2591Z"
                                        fill="url(#paint12_linear_7679_31639)"
                                    />
                                    <path
                                        d="M21.7905 12.5308H19.6209C19.3254 12.5308 19.0859 12.2913 19.0859 11.9959C19.0859 11.7004 19.3254 11.4609 19.6209 11.4609H21.7905C22.086 11.4609 22.3254 11.7004 22.3254 11.9959C22.3254 12.2913 22.086 12.5308 21.7905 12.5308Z"
                                        fill="url(#paint13_linear_7679_31639)"
                                    />
                                    <path
                                        d="M5.37937 12.5308H3.20974C2.91429 12.5308 2.6748 12.2913 2.6748 11.9959C2.6748 11.7004 2.91429 11.4609 3.20974 11.4609H5.37937C5.67483 11.4609 5.91431 11.7004 5.91431 11.9959C5.91431 12.2913 5.67483 12.5308 5.37937 12.5308Z"
                                        fill="url(#paint14_linear_7679_31639)"
                                    />
                                    <path
                                        d="M2.57551 18.259C2.39066 18.259 2.2108 18.1631 2.1118 17.9915C1.96407 17.7356 2.05175 17.4085 2.30762 17.2608L6.06533 15.0913C6.32098 14.9435 6.64836 15.0313 6.79602 15.2871C6.94374 15.543 6.85606 15.8702 6.60019 16.0178L2.84248 18.1873C2.75832 18.2359 2.66628 18.259 2.57551 18.259Z"
                                        fill="url(#paint15_linear_7679_31639)"
                                    />
                                    <path
                                        d="M18.6673 8.96998C18.4825 8.96998 18.3026 8.874 18.2036 8.70244C18.0559 8.44657 18.1435 8.11941 18.3994 7.97175L22.1571 5.80226C22.4128 5.65446 22.7402 5.74221 22.8878 5.99808C23.0355 6.25395 22.9479 6.58111 22.692 6.72877L18.9343 8.89826C18.85 8.94691 18.758 8.96998 18.6673 8.96998Z"
                                        fill="url(#paint16_linear_7679_31639)"
                                    />
                                    <path
                                        d="M16.0599 6.36412C15.9692 6.36412 15.8772 6.34099 15.793 6.29234C15.5372 6.14461 15.4494 5.81744 15.5971 5.56165L16.9983 3.13481C17.146 2.87887 17.4733 2.7912 17.729 2.93899C17.9848 3.08672 18.0726 3.41388 17.9248 3.66968L16.5236 6.09652C16.4246 6.26815 16.2448 6.36412 16.0599 6.36412Z"
                                        fill="url(#paint17_linear_7679_31639)"
                                    />
                                    <path
                                        d="M8.93959 6.36401C8.75473 6.36401 8.57495 6.26803 8.47588 6.09647L7.07469 3.66963C6.92696 3.41384 7.01464 3.08667 7.27051 2.93895C7.52623 2.79122 7.8534 2.8789 8.0012 3.13477L9.40238 5.5616C9.55011 5.8174 9.46243 6.14456 9.20656 6.29229C9.1224 6.3408 9.03036 6.36401 8.93959 6.36401Z"
                                        fill="url(#paint18_linear_7679_31639)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_31639"
                                            x1="-0.124376"
                                            y1="34.1377"
                                            x2="25.0111"
                                            y2="34.1563"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_31639"
                                            x1="20.5424"
                                            y1="34.1376"
                                            x2="24.3413"
                                            y2="34.138"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_31639"
                                            x1="3.76366"
                                            y1="32.0092"
                                            x2="21.1588"
                                            y2="32.0344"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_31639"
                                            x1="3.63326"
                                            y1="25.3907"
                                            x2="21.2877"
                                            y2="25.3935"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint4_linear_7679_31639"
                                            x1="12.9916"
                                            y1="25.3742"
                                            x2="20.9839"
                                            y2="25.3748"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint5_linear_7679_31639"
                                            x1="3.89979"
                                            y1="28.2517"
                                            x2="14.1246"
                                            y2="28.2535"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint6_linear_7679_31639"
                                            x1="6.86988"
                                            y1="28.2438"
                                            x2="14.308"
                                            y2="28.2447"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint7_linear_7679_31639"
                                            x1="11.309"
                                            y1="26.9286"
                                            x2="18.0753"
                                            y2="26.9296"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint8_linear_7679_31639"
                                            x1="7.91785"
                                            y1="12.9664"
                                            x2="17.0404"
                                            y2="12.9679"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint9_linear_7679_31639"
                                            x1="9.78179"
                                            y1="13.0262"
                                            x2="16.9804"
                                            y2="13.0271"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint10_linear_7679_31639"
                                            x1="11.9237"
                                            y1="3.45247"
                                            x2="13.0707"
                                            y2="3.4525"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint11_linear_7679_31639"
                                            x1="1.85436"
                                            y1="7.79828"
                                            x2="7.03023"
                                            y2="7.79953"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint12_linear_7679_31639"
                                            x1="17.9462"
                                            y1="17.0873"
                                            x2="23.122"
                                            y2="17.0886"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint13_linear_7679_31639"
                                            x1="18.9613"
                                            y1="12.1438"
                                            x2="22.4345"
                                            y2="12.1455"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint14_linear_7679_31639"
                                            x1="2.55021"
                                            y1="12.1438"
                                            x2="6.02334"
                                            y2="12.1455"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint15_linear_7679_31639"
                                            x1="1.85436"
                                            y1="17.0873"
                                            x2="7.03026"
                                            y2="17.0886"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint16_linear_7679_31639"
                                            x1="17.9462"
                                            y1="7.79824"
                                            x2="23.1221"
                                            y2="7.79949"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint17_linear_7679_31639"
                                            x1="15.4303"
                                            y1="5.09928"
                                            x2="18.0797"
                                            y2="5.09958"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint18_linear_7679_31639"
                                            x1="6.90788"
                                            y1="5.0992"
                                            x2="9.55732"
                                            y2="5.09951"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 25 36"
                                    fill="none"
                                >
                                    <path
                                        d="M21.6479 35.9998H3.35148C1.92984 35.9998 0.777344 34.8474 0.777344 33.4257C0.777344 32.0041 1.92984 30.8516 3.35148 30.8516H21.6479C23.0696 30.8516 24.2221 32.0041 24.2221 33.4257C24.2221 34.8474 23.0696 35.9998 21.6479 35.9998Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M24.222 33.4256C24.222 34.1366 23.9339 34.78 23.4681 35.2457C23.0024 35.7115 22.3583 35.9996 21.6473 35.9996H20.6787C21.1687 35.8862 21.6066 35.6373 21.9504 35.2936C22.4282 34.8157 22.7242 34.1553 22.7242 33.4256C22.7242 32.1725 21.8505 31.1219 20.6787 30.8516H21.6473C23.0695 30.8515 24.222 32.0041 24.222 33.4256Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M20.6127 30.8516H4.3877C4.3877 31.8532 5.19966 32.6651 6.20127 32.6651H18.7991C19.8008 32.6651 20.6127 31.8532 20.6127 30.8516Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M20.7128 28.2324L20.0454 22.4879C19.8569 20.8656 18.851 19.4821 17.4224 18.8803L15.7041 18.1565C15.1037 17.9036 14.7094 17.2863 14.7094 16.5994L14.7175 14.6953H10.2826L10.2907 16.5994C10.2907 17.2864 9.89639 17.9037 9.29606 18.1565L7.57776 18.8803C6.14908 19.4821 5.14319 20.8656 4.95475 22.4879L4.28735 28.2324C4.08865 29.9425 5.34253 31.4514 6.96218 31.4514H18.0379C19.6576 31.4515 20.9114 29.9425 20.7128 28.2324Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M20.7123 28.2325L20.0447 22.4881C19.8564 20.8662 18.85 19.4825 17.4214 18.8806L15.7033 18.1567C15.1027 17.9042 14.709 17.2865 14.709 16.5997L14.7169 14.6953H13.2862L13.2783 17.3021C13.2783 17.989 13.6727 18.606 14.2732 18.8591L16.1355 19.7807C17.5641 20.3826 18.4257 21.568 18.6147 23.1906L19.2815 28.935C19.3949 29.9128 19.034 30.8244 18.4014 31.4256C19.84 31.2202 20.8956 29.8123 20.7123 28.2325Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M8.70248 22.6055L8.29685 26.9689C8.24475 27.5294 8.65861 28.0154 9.18806 28.0154H12.0857C13.0345 28.0154 13.8037 28.7845 13.8037 29.7333C13.8037 30.6821 13.0345 31.4513 12.0857 31.4513H6.96218C5.34253 31.4513 4.08865 29.9424 4.28735 28.2323L4.95475 22.6055H8.70248Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M14.0742 29.7018C14.083 30.1887 13.8888 30.6302 13.5709 30.9481C13.3056 31.2134 12.9547 31.3925 12.5631 31.4388C12.6181 31.2705 12.648 31.0915 12.648 30.9046C12.648 29.9553 11.8784 29.1864 10.9299 29.1864H8.032C7.50276 29.1864 7.08911 28.7 7.14114 28.1401L7.61174 23.5755C7.66856 23.0244 8.1329 22.6055 8.68689 22.6055H8.97341L8.56757 26.969C8.51554 27.5296 8.92919 28.0153 9.45843 28.0153H12.3172C13.2604 28.0152 14.0572 28.7588 14.0742 29.7018Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M13.2798 29.3784C13.5164 29.2558 13.785 29.1864 14.0697 29.1864H16.9676C17.4968 29.1864 17.9105 28.7 17.8584 28.1401L17.3878 23.5755C17.331 23.0244 16.8667 22.6055 16.3127 22.6055H16.0262L16.432 26.969C16.484 27.5296 16.0704 28.0153 15.5411 28.0153H12.6824C12.2561 28.0153 11.8598 28.1672 11.5518 28.4207L13.2798 29.3784Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M12.4996 16.0441C14.8493 16.0441 16.7541 14.1393 16.7541 11.7896C16.7541 9.43995 14.8493 7.53516 12.4996 7.53516C10.1499 7.53516 8.24512 9.43995 8.24512 11.7896C8.24512 14.1393 10.1499 16.0441 12.4996 16.0441Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M16.7544 11.7903C16.7544 14.1404 14.8493 16.0447 12.5 16.0447C11.5835 16.0447 10.7347 15.7552 10.04 15.2623C10.413 15.3693 10.8075 15.4264 11.2147 15.4264C13.5649 15.4264 15.4691 13.5213 15.4691 11.172C15.4691 9.73765 14.7602 8.46949 13.6725 7.69922C15.4521 8.20849 16.7544 9.84748 16.7544 11.7903Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M12.4998 5.40886C12.2043 5.40886 11.9648 5.16937 11.9648 4.87392V0.534938C11.9648 0.239484 12.2043 0 12.4998 0C12.7952 0 13.0347 0.239484 13.0347 0.534938V4.87399C13.0347 5.16937 12.7952 5.40886 12.4998 5.40886Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M6.33229 8.97003C6.24152 8.97003 6.14962 8.9469 6.06531 8.89824L2.3076 6.72875C2.05181 6.58102 1.96406 6.25393 2.11178 5.99806C2.25937 5.74227 2.58653 5.65445 2.84247 5.80224L6.60018 7.97173C6.85598 8.11946 6.94373 8.44656 6.796 8.70242C6.697 8.87406 6.51714 8.97003 6.33229 8.97003Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M22.4241 18.2591C22.3333 18.2591 22.2414 18.236 22.1571 18.1873L18.3994 16.0178C18.1436 15.8701 18.0559 15.543 18.2036 15.2871C18.3512 15.0313 18.6783 14.9435 18.9343 15.0913L22.692 17.2608C22.9478 17.4085 23.0355 17.7356 22.8878 17.9915C22.7887 18.1631 22.6089 18.2591 22.4241 18.2591Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M21.7905 12.5308H19.6209C19.3254 12.5308 19.0859 12.2913 19.0859 11.9959C19.0859 11.7004 19.3254 11.4609 19.6209 11.4609H21.7905C22.086 11.4609 22.3254 11.7004 22.3254 11.9959C22.3254 12.2913 22.086 12.5308 21.7905 12.5308Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M5.37937 12.5308H3.20974C2.91429 12.5308 2.6748 12.2913 2.6748 11.9959C2.6748 11.7004 2.91429 11.4609 3.20974 11.4609H5.37937C5.67483 11.4609 5.91431 11.7004 5.91431 11.9959C5.91431 12.2913 5.67483 12.5308 5.37937 12.5308Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M2.57551 18.259C2.39066 18.259 2.2108 18.1631 2.1118 17.9915C1.96407 17.7356 2.05175 17.4085 2.30762 17.2608L6.06533 15.0913C6.32098 14.9435 6.64836 15.0313 6.79602 15.2871C6.94374 15.543 6.85606 15.8702 6.60019 16.0178L2.84248 18.1873C2.75832 18.2359 2.66628 18.259 2.57551 18.259Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M18.6673 8.96998C18.4825 8.96998 18.3026 8.874 18.2036 8.70244C18.0559 8.44657 18.1435 8.11941 18.3994 7.97175L22.1571 5.80226C22.4128 5.65446 22.7402 5.74221 22.8878 5.99808C23.0355 6.25395 22.9479 6.58111 22.692 6.72877L18.9343 8.89826C18.85 8.94691 18.758 8.96998 18.6673 8.96998Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M16.0599 6.36412C15.9692 6.36412 15.8772 6.34099 15.793 6.29234C15.5372 6.14461 15.4494 5.81744 15.5971 5.56165L16.9983 3.13481C17.146 2.87887 17.4733 2.7912 17.729 2.93899C17.9848 3.08672 18.0726 3.41388 17.9248 3.66968L16.5236 6.09652C16.4246 6.26815 16.2448 6.36412 16.0599 6.36412Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M8.93959 6.36401C8.75473 6.36401 8.57495 6.26803 8.47588 6.09647L7.07469 3.66963C6.92696 3.41384 7.01464 3.08667 7.27051 2.93895C7.52623 2.79122 7.8534 2.8789 8.0012 3.13477L9.40238 5.5616C9.55011 5.8174 9.46243 6.14456 9.20656 6.29229C9.1224 6.3408 9.03036 6.36401 8.93959 6.36401Z"
                                        fill="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Meditation" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"}  text-[12px] font-bold leading-normal`}
                            >
                                MEDITATION
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Yoga")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Yoga" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                >
                                    <path
                                        d="M21.7499 7.5C21.7499 8.49456 21.3549 9.44839 20.6516 10.1517C19.9483 10.8549 18.9945 11.25 17.9999 11.25C17.0054 11.25 16.0516 10.8549 15.3483 10.1517C14.645 9.44839 14.2499 8.49456 14.2499 7.5C14.2499 6.50544 14.645 5.55161 15.3483 4.84835C16.0516 4.14509 17.0054 3.75 17.9999 3.75C18.9945 3.75 19.9483 4.14509 20.6516 4.84835C21.3549 5.55161 21.7499 6.50544 21.7499 7.5ZM23.2499 32.25C23.2499 32.4489 23.1709 32.6397 23.0303 32.7803C22.8896 32.921 22.6989 33 22.4999 33H9.64195C9.17634 33 8.72342 32.8483 8.35176 32.5678C7.9801 32.2873 7.70994 31.8934 7.5822 31.4457C7.45445 30.9979 7.47608 30.5208 7.64379 30.0864C7.81151 29.6521 8.11619 29.2842 8.5117 29.0385L12.4747 26.577C12.7997 26.3751 13.0679 26.0937 13.2538 25.7593C13.4398 25.4249 13.5374 25.0486 13.5374 24.666V24H15.3179C16.1135 23.9998 16.8765 23.6836 17.4389 23.121L17.9999 22.5607L18.5602 23.121C18.8389 23.3998 19.1698 23.6209 19.534 23.7717C19.8982 23.9225 20.2885 24.0001 20.6827 24H22.4999V24.669C22.5001 25.0505 22.5972 25.4257 22.7822 25.7593C22.9672 26.0929 23.2339 26.3741 23.5574 26.5763L27.4919 29.0355C27.8872 29.2823 28.1913 29.651 28.3584 30.086C28.5254 30.5209 28.5463 30.9985 28.4179 31.4463C28.2894 31.8942 28.0186 32.2881 27.6464 32.5684C27.2742 32.8487 26.8209 33.0002 26.3549 33H24.6224C24.705 32.7652 24.7499 32.5125 24.7499 32.25V32.0625C24.7499 31.5175 24.552 30.9911 24.1931 30.581C23.8342 30.1709 23.3386 29.9051 22.7984 29.8328L12.8872 28.5067C12.6916 28.4835 12.4948 28.5381 12.3391 28.6588C12.1835 28.7795 12.0816 28.9566 12.0554 29.1518C12.0292 29.3469 12.0808 29.5446 12.1991 29.7021C12.3174 29.8595 12.4929 29.9641 12.6877 29.9933L22.5997 31.3192C22.7797 31.3434 22.9448 31.4321 23.0644 31.5687C23.184 31.7054 23.2499 31.8809 23.2499 32.0625V32.25ZM19.6214 22.0605L18.7499 21.189V18.3825C18.8609 18.447 18.9659 18.5265 19.0604 18.621L20.4697 20.031C20.6104 20.1714 20.8012 20.2502 20.9999 20.25H23.2499C23.3777 20.2499 23.5034 20.2172 23.615 20.1549C23.7266 20.0927 23.8204 20.0029 23.8876 19.8942C23.9548 19.7855 23.993 19.6614 23.9988 19.5337C24.0045 19.4061 23.9776 19.2791 23.9204 19.1647L23.1704 17.6647C23.1283 17.5736 23.0683 17.4918 22.994 17.4242C22.9197 17.3567 22.8325 17.3047 22.7377 17.2715C22.6429 17.2383 22.5424 17.2244 22.4422 17.2308C22.342 17.2371 22.244 17.2635 22.1542 17.3084C22.0643 17.3534 21.9844 17.4159 21.9192 17.4923C21.854 17.5686 21.8048 17.6574 21.7745 17.7531C21.7442 17.8489 21.7335 17.9498 21.7429 18.0498C21.7523 18.1498 21.7818 18.2468 21.8294 18.3353L22.0364 18.75H21.3104L20.1209 17.5605C19.5584 16.9981 18.7954 16.6821 17.9999 16.6821C17.2045 16.6821 16.4415 16.9981 15.8789 17.5605L14.6894 18.75H13.9634L14.1704 18.3353C14.2181 18.2468 14.2476 18.1498 14.257 18.0498C14.2664 17.9498 14.2557 17.8489 14.2254 17.7531C14.1951 17.6574 14.1459 17.5686 14.0807 17.4923C14.0155 17.4159 13.9356 17.3534 13.8457 17.3084C13.7559 17.2635 13.6579 17.2371 13.5577 17.2308C13.4575 17.2244 13.357 17.2383 13.2622 17.2715C13.1674 17.3047 13.0802 17.3567 13.0059 17.4242C12.9316 17.4918 12.8716 17.5736 12.8294 17.6647L12.0794 19.1647C12.0223 19.2791 11.9954 19.4061 12.0011 19.5337C12.0069 19.6614 12.0451 19.7855 12.1123 19.8942C12.1795 20.0029 12.2733 20.0927 12.3849 20.1549C12.4965 20.2172 12.6222 20.2499 12.7499 20.25H14.9999C15.1988 20.25 15.3896 20.1709 15.5302 20.0303L16.9394 18.621C17.0347 18.5265 17.1389 18.447 17.2499 18.3825V21.189L16.3784 22.0605C16.0972 22.3418 15.7157 22.4999 15.3179 22.5H10.7894C10.5455 22.5 10.3053 22.4405 10.0895 22.3267C9.87381 22.2129 9.68908 22.0482 9.55136 21.8469C9.41365 21.6456 9.32711 21.4137 9.29924 21.1714C9.27138 20.929 9.30303 20.6836 9.39145 20.4562L11.6444 14.6625C11.8636 14.0991 12.2478 13.6151 12.7467 13.2739C13.2456 12.9326 13.836 12.75 14.4404 12.75H21.5594C22.1639 12.75 22.7543 12.9326 23.2532 13.2739C23.7521 13.6151 24.1363 14.0991 24.3554 14.6625L26.6092 20.4562C26.6977 20.6837 26.7293 20.9293 26.7014 21.1717C26.6734 21.4142 26.5867 21.6461 26.4489 21.8475C26.311 22.0489 26.126 22.2135 25.9101 22.3272C25.6942 22.4409 25.4537 22.5002 25.2097 22.5H20.6812C20.2834 22.4999 19.9019 22.3418 19.6207 22.0605"
                                        fill="url(#paint0_linear_7678_44169)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7678_44169"
                                            x1="6.69227"
                                            y1="22.4202"
                                            x2="29.2078"
                                            y2="22.4228"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                >
                                    <path
                                        d="M21.7499 7.5C21.7499 8.49456 21.3549 9.44839 20.6516 10.1517C19.9483 10.8549 18.9945 11.25 17.9999 11.25C17.0054 11.25 16.0516 10.8549 15.3483 10.1517C14.645 9.44839 14.2499 8.49456 14.2499 7.5C14.2499 6.50544 14.645 5.55161 15.3483 4.84835C16.0516 4.14509 17.0054 3.75 17.9999 3.75C18.9945 3.75 19.9483 4.14509 20.6516 4.84835C21.3549 5.55161 21.7499 6.50544 21.7499 7.5ZM23.2499 32.25C23.2499 32.4489 23.1709 32.6397 23.0303 32.7803C22.8896 32.921 22.6989 33 22.4999 33H9.64195C9.17634 33 8.72342 32.8483 8.35176 32.5678C7.9801 32.2873 7.70994 31.8934 7.5822 31.4457C7.45445 30.9979 7.47608 30.5208 7.64379 30.0864C7.81151 29.6521 8.11619 29.2842 8.5117 29.0385L12.4747 26.577C12.7997 26.3751 13.0679 26.0937 13.2538 25.7593C13.4398 25.4249 13.5374 25.0486 13.5374 24.666V24H15.3179C16.1135 23.9998 16.8765 23.6836 17.4389 23.121L17.9999 22.5607L18.5602 23.121C18.8389 23.3998 19.1698 23.6209 19.534 23.7717C19.8982 23.9225 20.2885 24.0001 20.6827 24H22.4999V24.669C22.5001 25.0505 22.5972 25.4257 22.7822 25.7593C22.9672 26.0929 23.2339 26.3741 23.5574 26.5763L27.4919 29.0355C27.8872 29.2823 28.1913 29.651 28.3584 30.086C28.5254 30.5209 28.5463 30.9985 28.4179 31.4463C28.2894 31.8942 28.0186 32.2881 27.6464 32.5684C27.2742 32.8487 26.8209 33.0002 26.3549 33H24.6224C24.705 32.7652 24.7499 32.5125 24.7499 32.25V32.0625C24.7499 31.5175 24.552 30.9911 24.1931 30.581C23.8342 30.1709 23.3386 29.9051 22.7984 29.8328L12.8872 28.5067C12.6916 28.4835 12.4948 28.5381 12.3391 28.6588C12.1835 28.7795 12.0816 28.9566 12.0554 29.1518C12.0292 29.3469 12.0808 29.5446 12.1991 29.7021C12.3174 29.8595 12.4929 29.9641 12.6877 29.9933L22.5997 31.3192C22.7797 31.3434 22.9448 31.4321 23.0644 31.5687C23.184 31.7054 23.2499 31.8809 23.2499 32.0625V32.25ZM19.6214 22.0605L18.7499 21.189V18.3825C18.8609 18.447 18.9659 18.5265 19.0604 18.621L20.4697 20.031C20.6104 20.1714 20.8012 20.2502 20.9999 20.25H23.2499C23.3777 20.2499 23.5034 20.2172 23.615 20.1549C23.7266 20.0927 23.8204 20.0029 23.8876 19.8942C23.9548 19.7855 23.993 19.6614 23.9988 19.5337C24.0045 19.4061 23.9776 19.2791 23.9204 19.1647L23.1704 17.6647C23.1283 17.5736 23.0683 17.4918 22.994 17.4242C22.9197 17.3567 22.8325 17.3047 22.7377 17.2715C22.6429 17.2383 22.5424 17.2244 22.4422 17.2308C22.342 17.2371 22.244 17.2635 22.1542 17.3084C22.0643 17.3534 21.9844 17.4159 21.9192 17.4923C21.854 17.5686 21.8048 17.6574 21.7745 17.7531C21.7442 17.8489 21.7335 17.9498 21.7429 18.0498C21.7523 18.1498 21.7818 18.2468 21.8294 18.3353L22.0364 18.75H21.3104L20.1209 17.5605C19.5584 16.9981 18.7954 16.6821 17.9999 16.6821C17.2045 16.6821 16.4415 16.9981 15.8789 17.5605L14.6894 18.75H13.9634L14.1704 18.3353C14.2181 18.2468 14.2476 18.1498 14.257 18.0498C14.2664 17.9498 14.2557 17.8489 14.2254 17.7531C14.1951 17.6574 14.1459 17.5686 14.0807 17.4923C14.0155 17.4159 13.9356 17.3534 13.8457 17.3084C13.7559 17.2635 13.6579 17.2371 13.5577 17.2308C13.4575 17.2244 13.357 17.2383 13.2622 17.2715C13.1674 17.3047 13.0802 17.3567 13.0059 17.4242C12.9316 17.4918 12.8716 17.5736 12.8294 17.6647L12.0794 19.1647C12.0223 19.2791 11.9954 19.4061 12.0011 19.5337C12.0069 19.6614 12.0451 19.7855 12.1123 19.8942C12.1795 20.0029 12.2733 20.0927 12.3849 20.1549C12.4965 20.2172 12.6222 20.2499 12.7499 20.25H14.9999C15.1988 20.25 15.3896 20.1709 15.5302 20.0303L16.9394 18.621C17.0347 18.5265 17.1389 18.447 17.2499 18.3825V21.189L16.3784 22.0605C16.0972 22.3418 15.7157 22.4999 15.3179 22.5H10.7894C10.5455 22.5 10.3053 22.4405 10.0895 22.3267C9.87381 22.2129 9.68908 22.0482 9.55136 21.8469C9.41365 21.6456 9.32711 21.4137 9.29924 21.1714C9.27138 20.929 9.30303 20.6836 9.39145 20.4562L11.6444 14.6625C11.8636 14.0991 12.2478 13.6151 12.7467 13.2739C13.2456 12.9326 13.836 12.75 14.4404 12.75H21.5594C22.1639 12.75 22.7543 12.9326 23.2532 13.2739C23.7521 13.6151 24.1363 14.0991 24.3554 14.6625L26.6092 20.4562C26.6977 20.6837 26.7293 20.9293 26.7014 21.1717C26.6734 21.4142 26.5867 21.6461 26.4489 21.8475C26.311 22.0489 26.126 22.2135 25.9101 22.3272C25.6942 22.4409 25.4537 22.5002 25.2097 22.5H20.6812C20.2834 22.4999 19.9019 22.3418 19.6207 22.0605"
                                        fill="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Yoga" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] font-bold leading-normal`}
                            >
                                YOGA
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Cardio")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Cardio" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 30 28"
                                    fill="none"
                                >
                                    <path
                                        d="M20.9514 0.5C18.625 0.5 16.4185 1.43056 14.7971 3.08722C13.1686 1.43056 10.9621 0.5 8.62161 0.5C3.87019 0.5 0 4.37031 0 9.12167C0 18.8994 13.8525 27.0629 14.4375 27.4083C14.5504 27.4717 14.6702 27.5 14.797 27.5C14.9169 27.5 15.0367 27.4718 15.1495 27.4083C15.7417 27.0629 29.6082 18.8994 29.6082 9.12167C29.6083 4.37031 25.724 0.5 20.9514 0.5ZM23.588 13.8519H19.2383L17.5041 17.1159C17.3702 17.3556 17.1023 17.5177 16.7992 17.4825C16.5101 17.4543 16.2775 17.2498 16.1999 16.9678L14.4728 10.5879L13.0559 14.9798C12.9642 15.2477 12.7245 15.4451 12.4355 15.4662C12.1464 15.4874 11.8785 15.3323 11.7517 15.0785L10.6096 12.7874L9.77074 13.9225C9.63679 14.1057 9.42531 14.2115 9.19975 14.2115H6.02037C5.63265 14.2115 5.31543 13.8943 5.31543 13.5065C5.31543 13.1118 5.63265 12.8016 6.02037 12.8016H8.84728L10.1585 11.018C10.2994 10.8206 10.5321 10.7078 10.7859 10.736C11.0256 10.7572 11.2441 10.9052 11.3569 11.1238L12.2451 12.9002L13.8594 7.89506C13.9511 7.59895 14.2331 7.4016 14.5433 7.40864C14.8535 7.41568 15.1284 7.62716 15.2059 7.93031L17.0952 14.8812L18.1949 12.8157C18.3148 12.583 18.5545 12.442 18.8153 12.442H23.5879C23.9756 12.442 24.2928 12.7522 24.2928 13.147C24.2929 13.5348 23.9757 13.8519 23.588 13.8519Z"
                                        fill="url(#paint0_linear_7679_19637)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_19637"
                                            x1="-1.13878"
                                            y1="17.734"
                                            x2="30.6047"
                                            y2="17.7397"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7.5 3C8.36667 3 9.19167 3.18333 9.975 3.55C10.7583 3.91667 11.4333 4.43333 12 5.1C12.5667 4.43333 13.2417 3.91667 14.025 3.55C14.8083 3.18333 15.6333 3 16.5 3C18.0667 3 19.375 3.525 20.425 4.575C21.475 5.625 22 6.93333 22 8.5C22 8.58333 21.996 8.66667 21.988 8.75C21.98 8.83333 21.9757 8.91667 21.975 9H19.975C19.9917 8.91667 20 8.83333 20 8.75V8.5C20 7.5 19.6667 6.66667 19 6C18.3333 5.33333 17.5 5 16.5 5C15.7167 5 14.9917 5.221 14.325 5.663C13.6583 6.105 13.2 6.66733 12.95 7.35H11.05C10.8 6.66667 10.3417 6.10433 9.675 5.663C9.00833 5.22167 8.28333 5.00067 7.5 5C6.5 5 5.66667 5.33333 5 6C4.33333 6.66667 4 7.5 4 8.5V8.75C4 8.83333 4.00833 8.91667 4.025 9H2.025C2.025 8.91667 2.021 8.83333 2.013 8.75C2.005 8.66667 2.00067 8.58333 2 8.5C2 6.93333 2.525 5.625 3.575 4.575C4.625 3.525 5.93333 3 7.5 3ZM12 20.675C11.7667 20.675 11.5333 20.6333 11.3 20.55C11.0667 20.4667 10.8583 20.3333 10.675 20.15C10.1083 19.6333 9.571 19.1417 9.063 18.675C8.555 18.2083 8.07567 17.7583 7.625 17.325C7.175 16.8917 6.754 16.4833 6.362 16.1C5.97 15.7167 5.616 15.35 5.3 15H8.1C8.63333 15.5167 9.21667 16.075 9.85 16.675C10.4833 17.275 11.2 17.9333 12 18.65C12.8 17.9333 13.5167 17.275 14.15 16.675C14.7833 16.075 15.3667 15.5167 15.9 15H18.725C18.4083 15.35 18.0543 15.7167 17.663 16.1C17.2717 16.4833 16.8507 16.8917 16.4 17.325C15.95 17.7583 15.4667 18.2083 14.95 18.675C14.4333 19.1417 13.8917 19.6333 13.325 20.15C13.1417 20.3333 12.9333 20.4667 12.7 20.55C12.4667 20.6333 12.2333 20.675 12 20.675ZM11.05 16C11.2667 16 11.4543 15.9377 11.613 15.813C11.7717 15.6883 11.884 15.5257 11.95 15.325L13.3 11.25L14.175 12.55C14.2583 12.6833 14.375 12.7917 14.525 12.875C14.675 12.9583 14.8333 13 15 13H22C22.2833 13 22.521 12.904 22.713 12.712C22.905 12.52 23.0007 12.2827 23 12C23 11.7167 22.904 11.4793 22.712 11.288C22.52 11.0967 22.2827 11.0007 22 11H15.575L13.85 8.45C13.75 8.3 13.621 8.18767 13.463 8.113C13.305 8.03833 13.134 8.00067 12.95 8C12.7333 8 12.546 8.06267 12.388 8.188C12.23 8.31333 12.1173 8.47567 12.05 8.675L10.7 12.725L9.85 11.45C9.76667 11.3167 9.65 11.2083 9.5 11.125C9.35 11.0417 9.19167 11 9.025 11H2C1.71667 11 1.47933 11.096 1.288 11.288C1.09667 11.48 1.00067 11.7173 1 12C1 12.2833 1.096 12.521 1.288 12.713C1.48 12.905 1.71733 13.0007 2 13H8.425L10.15 15.55C10.25 15.7 10.3793 15.8127 10.538 15.888C10.6967 15.9633 10.8673 16.0007 11.05 16Z"
                                        fill="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Cardio" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] font-bold leading-normal`}
                            >
                                CARDIO
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("KickBoxing")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "KickBoxing" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                >
                                    <path
                                        d="M6.71606 8.13928C6.71606 9.8558 5.32455 11.2473 3.60803 11.2473C1.89151 11.2473 0.5 9.8558 0.5 8.13928C0.5 6.42276 1.89151 5.03125 3.60803 5.03125C5.32455 5.03125 6.71606 6.42276 6.71606 8.13928Z"
                                        fill="url(#paint0_linear_7679_35712)"
                                        stroke="url(#paint1_linear_7679_35712)"
                                    />
                                    <path
                                        d="M17.0158 10.3373L17.19 10.3162L17.3128 10.1909L25.938 1.38849C25.9384 1.38819 25.9387 1.38788 25.939 1.38758C26.3509 0.971693 26.8825 0.657159 27.388 0.544888C27.8826 0.435057 28.3105 0.522132 28.6324 0.83985C28.939 1.14354 28.997 1.51525 28.8589 1.97068C28.7141 2.44794 28.3609 2.9636 27.9271 3.40237L27.9271 3.40233L27.9216 3.40806L18.7118 13.0234L18.5661 13.1755L18.5732 13.3861C18.5741 13.4128 18.5764 13.4357 18.5783 13.4524C18.579 13.4579 18.5797 13.4635 18.5804 13.4685C18.5812 13.4748 18.582 13.4804 18.5825 13.4842V27.5953C18.5825 28.2025 18.4568 28.6899 18.2345 29.0107C18.0302 29.3057 17.7192 29.5 17.2124 29.5C16.7056 29.5 16.3949 29.3057 16.1907 29.0108C15.9685 28.69 15.8429 28.2026 15.8429 27.5953V15.9981V15.5262L15.3718 15.4989L11.7729 15.2902L10.8794 15.2384L11.3037 16.0264L12.8505 18.8991C12.8506 18.8992 12.8506 18.8992 12.8506 18.8993C13.2704 19.6799 12.9785 20.6528 12.1987 21.0729L12.1983 21.0731C11.9562 21.2038 11.6962 21.2651 11.4395 21.2651C10.8672 21.2651 10.3151 20.9587 10.0252 20.421C10.0251 20.4209 10.0251 20.4209 10.025 20.4208L6.51773 13.907L6.51764 13.9068C6.2121 13.3399 6.2861 12.6694 6.65484 12.1807L6.75813 12.0438L6.75732 11.9874C6.76752 11.9687 6.77965 11.9467 6.79382 11.9215C6.8559 11.8108 6.94654 11.6553 7.05775 11.4679C7.27961 11.0939 7.57648 10.6043 7.87447 10.1165C8.17222 9.62906 8.47012 9.14497 8.69365 8.78264C8.8054 8.6015 8.89852 8.45085 8.9637 8.34552L9.03932 8.22335L9.05559 8.19709C9.06744 8.18036 9.08214 8.15753 9.09632 8.12919L9.12332 8.07519L9.13669 8.01632C9.21736 7.66121 9.40676 7.33806 9.70624 7.1045L16.1694 2.06923C16.8691 1.52508 17.8777 1.65056 18.421 2.34873L18.4212 2.34906C18.9662 3.04818 18.8405 4.05664 18.1418 4.60074L18.1417 4.60081L12.0333 9.3598L11.4964 9.77809L12.0561 10.1654L12.4866 10.4633C12.4867 10.4634 12.4867 10.4634 12.4868 10.4635C12.7021 10.6125 12.9673 10.699 13.2128 10.7371C13.4428 10.7728 13.7023 10.7733 13.9401 10.7098L17.0158 10.3373ZM9.06595 8.18024C9.06594 8.18026 9.06593 8.18027 9.06592 8.18028L8.64106 7.91681L9.06595 8.18024Z"
                                        fill="url(#paint2_linear_7679_35712)"
                                        stroke="url(#paint3_linear_7679_35712)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_35712"
                                            x1="-0.277541"
                                            y1="9.13725"
                                            x2="7.45894"
                                            y2="9.1385"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_35712"
                                            x1="-0.277541"
                                            y1="9.13725"
                                            x2="7.45894"
                                            y2="9.1385"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_35712"
                                            x1="4.91938"
                                            y1="19.1489"
                                            x2="30.2236"
                                            y2="19.1522"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_35712"
                                            x1="4.91938"
                                            y1="19.1489"
                                            x2="30.2236"
                                            y2="19.1522"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                >
                                    <path
                                        d="M6.71606 8.13928C6.71606 9.8558 5.32455 11.2473 3.60803 11.2473C1.89151 11.2473 0.5 9.8558 0.5 8.13928C0.5 6.42276 1.89151 5.03125 3.60803 5.03125C5.32455 5.03125 6.71606 6.42276 6.71606 8.13928Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M17.0158 10.3373L17.19 10.3162L17.3128 10.1909L25.938 1.38849C25.9384 1.38819 25.9387 1.38788 25.939 1.38758C26.3509 0.971693 26.8825 0.657159 27.388 0.544888C27.8826 0.435057 28.3105 0.522132 28.6324 0.83985C28.939 1.14354 28.997 1.51525 28.8589 1.97068C28.7141 2.44794 28.3609 2.9636 27.9271 3.40237L27.9271 3.40233L27.9216 3.40806L18.7118 13.0234L18.5661 13.1755L18.5732 13.3861C18.5741 13.4128 18.5764 13.4357 18.5783 13.4524C18.579 13.4579 18.5797 13.4635 18.5804 13.4685C18.5812 13.4748 18.582 13.4804 18.5825 13.4842V27.5953C18.5825 28.2025 18.4568 28.6899 18.2345 29.0107C18.0302 29.3057 17.7192 29.5 17.2124 29.5C16.7056 29.5 16.3949 29.3057 16.1907 29.0108C15.9685 28.69 15.8429 28.2026 15.8429 27.5953V15.9981V15.5262L15.3718 15.4989L11.7729 15.2902L10.8794 15.2384L11.3037 16.0264L12.8505 18.8991C12.8506 18.8992 12.8506 18.8992 12.8506 18.8993C13.2704 19.6799 12.9785 20.6528 12.1987 21.0729L12.1983 21.0731C11.9562 21.2038 11.6962 21.2651 11.4395 21.2651C10.8672 21.2651 10.3151 20.9587 10.0252 20.421C10.0251 20.4209 10.0251 20.4209 10.025 20.4208L6.51773 13.907L6.51764 13.9068C6.2121 13.3399 6.2861 12.6694 6.65484 12.1807L6.75813 12.0438L6.75732 11.9874C6.76752 11.9687 6.77965 11.9467 6.79382 11.9215C6.8559 11.8108 6.94654 11.6553 7.05775 11.4679C7.27961 11.0939 7.57648 10.6043 7.87447 10.1165C8.17222 9.62906 8.47012 9.14497 8.69365 8.78264C8.8054 8.6015 8.89852 8.45085 8.9637 8.34552L9.03932 8.22335L9.05559 8.19709C9.06744 8.18036 9.08214 8.15753 9.09632 8.12919L9.12332 8.07519L9.13669 8.01632C9.21736 7.66121 9.40676 7.33806 9.70624 7.1045L16.1694 2.06923C16.8691 1.52508 17.8777 1.65056 18.421 2.34873L18.4212 2.34906C18.9662 3.04818 18.8405 4.05664 18.1418 4.60074L18.1417 4.60081L12.0333 9.3598L11.4964 9.77809L12.0561 10.1654L12.4866 10.4633C12.4867 10.4634 12.4867 10.4634 12.4868 10.4635C12.7021 10.6125 12.9673 10.699 13.2128 10.7371C13.4428 10.7728 13.7023 10.7733 13.9401 10.7098L17.0158 10.3373ZM9.06595 8.18024C9.06594 8.18026 9.06593 8.18027 9.06592 8.18028L8.64106 7.91681L9.06595 8.18024Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "KickBoxing" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] font-bold leading-normal`}
                            >
                                KICKBOXING
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Strength")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Strength" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 31 30"
                                    fill="none"
                                >
                                    <path
                                        d="M25.4311 8.25189L25.4311 8.2519L25.4335 8.25722C25.4673 8.3299 25.4845 8.40917 25.4839 8.48931C25.4834 8.56946 25.465 8.64847 25.4302 8.72065C25.3954 8.79284 25.345 8.8564 25.2826 8.90674C25.2202 8.95709 25.1475 8.99296 25.0696 9.01177L25.0615 9.01367L25.0287 9.02142L24.9026 9.05121L24.4387 9.16105C24.047 9.25395 23.5055 9.38271 22.9064 9.5261C21.7098 9.81255 20.2793 10.1584 19.3553 10.3935C19.2159 10.4288 19.0706 10.4347 18.9287 10.4111C18.7867 10.3874 18.6511 10.3346 18.5306 10.2559C18.41 10.1772 18.307 10.0744 18.2282 9.95391C18.1493 9.83344 18.0963 9.69794 18.0724 9.55596C18.0486 9.41397 18.0544 9.26858 18.0895 9.12895C18.1246 8.98933 18.1883 8.85849 18.2765 8.7447C18.3647 8.63092 18.4756 8.53664 18.602 8.46783C18.7281 8.39925 18.8669 8.35744 19.0099 8.34502L19.4759 8.30774L19.6654 8.29258L19.8116 8.17106C20.1851 7.86061 20.6442 7.67109 21.1279 7.62766C21.6116 7.58423 22.0971 7.68895 22.5199 7.92791L22.6846 8.02099L22.8729 8.00277L23.308 7.96067L24.0312 7.89068L23.8257 7.19376C23.6094 6.46 23.0781 4.73902 22.7703 3.83452L22.6762 3.558L22.4005 3.46151L21.4648 3.13403L21.4649 3.13395L21.4555 3.13084C21.3708 3.10275 21.3007 3.04217 21.2606 2.96242C21.2206 2.88266 21.2139 2.79027 21.242 2.70557C21.2701 2.62087 21.3307 2.55079 21.4104 2.51076C21.49 2.47079 21.5823 2.46403 21.6669 2.49198C21.667 2.49202 21.6671 2.49206 21.6672 2.4921L23.0698 2.95963L23.0815 2.96351L23.0933 2.96691C23.1768 2.991 23.1834 3.00039 23.1947 3.01653C23.1962 3.01863 23.1977 3.02084 23.1995 3.02321C23.2563 3.09751 23.3354 3.25125 23.4943 3.64251C23.5539 3.78924 23.6213 3.9602 23.6998 4.15917C24.02 4.9709 24.5242 6.24905 25.4311 8.25189Z"
                                        fill="url(#paint0_linear_7679_20186)"
                                        stroke="url(#paint1_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M5.5069 8.25723L5.50687 8.25722C5.4731 8.3299 5.45588 8.40917 5.45646 8.48931C5.45704 8.56946 5.4754 8.64847 5.51022 8.72066C5.54504 8.79284 5.59545 8.8564 5.65781 8.90674L5.28092 9.3736L5.65781 8.90674C5.71982 8.9568 5.79211 8.99256 5.86953 9.01146L5.87053 9.01169L5.87891 9.01367L5.91174 9.02142L6.03786 9.05121L6.50169 9.16105C6.89342 9.25395 7.43492 9.38271 8.03396 9.5261C9.23067 9.81256 10.6612 10.1585 11.5852 10.3936M5.5069 8.25723L11.4375 10.9751M5.5069 8.25723L5.50931 8.25189C6.41626 6.24905 6.92041 4.97091 7.24058 4.15918C7.31907 3.9602 7.3865 3.78924 7.44609 3.64251C7.60502 3.25125 7.68414 3.09751 7.74089 3.02321C7.7427 3.02084 7.74425 3.01863 7.74572 3.01653C7.75705 3.00039 7.76365 2.991 7.84713 2.96691L7.85892 2.96351L7.87057 2.95963L9.27316 2.4921L5.5069 8.25723ZM11.5852 10.3936C11.5853 10.3936 11.5854 10.3936 11.5855 10.3936L11.4375 10.9751M11.5852 10.3936C11.585 10.3935 11.5849 10.3935 11.5847 10.3934L11.4375 10.9751M11.5852 10.3936C11.7246 10.4288 11.8698 10.4347 12.0117 10.4111C12.1537 10.3874 12.2893 10.3346 12.4098 10.2559C12.5304 10.1772 12.6334 10.0744 12.7122 9.95391C12.7911 9.83344 12.8441 9.69794 12.868 9.55596C12.8918 9.41397 12.886 9.26858 12.8509 9.12896C12.8158 8.98933 12.7521 8.85849 12.6639 8.7447L13.08 8.42214L12.6639 8.7447C12.5757 8.63092 12.4648 8.53664 12.3384 8.46783C12.2123 8.39925 12.0735 8.35744 11.9305 8.34502M11.4375 10.9751C11.6575 11.0308 11.8865 11.0402 12.1103 11.0029C12.3341 10.9656 12.5478 10.8823 12.7377 10.7583C12.9277 10.6344 13.09 10.4723 13.2142 10.2825C13.3385 10.0927 13.4221 9.87917 13.4597 9.65543C13.4973 9.4317 13.4881 9.20259 13.4328 8.98257C13.3774 8.76255 13.2771 8.55639 13.1381 8.37708C12.9991 8.19778 12.8244 8.04923 12.6251 7.94079C12.4258 7.83236 12.2062 7.7664 11.9802 7.74708M11.9305 8.34502L11.9323 8.34517L11.9802 7.74708M11.9305 8.34502C11.93 8.34498 11.9296 8.34494 11.9291 8.3449L11.9802 7.74708M11.9305 8.34502L11.4645 8.30774L11.275 8.29258L11.1288 8.17106C10.7553 7.86061 10.2963 7.67109 9.81253 7.62766C9.3288 7.58423 8.8433 7.68895 8.42049 7.92791L8.25578 8.02099L8.06748 8.00277L7.6324 7.96067L6.90919 7.89068L7.11469 7.19376C7.33105 6.46 7.86231 4.73902 8.17012 3.83452L8.26422 3.558L8.53992 3.46151L9.47558 3.13403L9.48493 3.13076L9.48495 3.13084C9.56965 3.10275 9.63973 3.04217 9.67976 2.96242C9.7198 2.88266 9.72651 2.79027 9.69842 2.70557C9.67034 2.62087 9.60976 2.55079 9.53 2.51076C9.45036 2.47078 9.35812 2.46403 9.27351 2.49198L9.27406 2.4918L9.08432 1.92259C9.32007 1.84442 9.57721 1.86311 9.79918 1.97453C10.0211 2.08595 10.1898 2.28099 10.2679 2.51673C10.3461 2.75248 10.3274 3.00962 10.216 3.23159C10.1046 3.45356 9.90953 3.62218 9.67379 3.70035L8.73813 4.02783C8.49911 4.73019 8.12134 5.93837 7.86611 6.77768L7.74798 6.76625L7.69019 7.36346L8.11716 7.48936L8.18372 7.50898L8.26569 7.53315C8.28635 7.4631 8.30991 7.38393 8.3359 7.29728C8.81233 7.07571 9.34009 6.98283 9.86618 7.03006C10.4711 7.08437 11.0453 7.32139 11.5124 7.70965L11.9802 7.74708"
                                        fill="url(#paint2_linear_7679_20186)"
                                        stroke="url(#paint3_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M19.042 8.08438C18.7408 12.8801 18.6591 13.8824 18.6301 14.8863C18.5904 16.2618 18.6497 17.6401 18.3791 28.7842L18.3788 28.7992L18.3792 28.8143C18.3831 28.9654 18.3268 29.1119 18.2228 29.2215C18.1712 29.2758 18.1095 29.3194 18.0411 29.3499C17.9727 29.3803 17.899 29.397 17.8242 29.3989C17.6731 29.4028 17.5266 29.3466 17.417 29.2425L17.0039 29.6776L17.417 29.2425C17.3073 29.1384 17.2435 28.9951 17.2396 28.8439L17.2392 28.8277L17.2379 28.8115L16.5361 20.0678L16.4918 19.5158H15.9381H15.0024H14.4486L14.4043 20.0678L13.7026 28.8115L13.7013 28.8277L13.7009 28.8439C13.6969 28.9951 13.6331 29.1384 13.5235 29.2425L13.9366 29.6776L13.5235 29.2425C13.4139 29.3466 13.2674 29.4028 13.1163 29.3989C12.9652 29.395 12.8218 29.3312 12.7177 29.2215C12.6136 29.1119 12.5574 28.9654 12.5613 28.8143L12.5617 28.7992L12.5613 28.7841C12.3826 21.4301 12.3367 19.9858 12.327 18.5413C12.3214 17.717 12.3276 16.8925 12.3276 14.9697V14.9509L12.3264 14.9322L11.8984 8.08438H13.4573L15.2019 8.95669L15.4702 9.09086L15.7386 8.95669L17.4832 8.08438H19.042Z"
                                        fill="url(#paint4_linear_7679_20186)"
                                        stroke="url(#paint5_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M18.1449 3.27481C18.1449 4.75207 16.9474 5.94962 15.4701 5.94962C13.9929 5.94962 12.7953 4.75207 12.7953 3.27481C12.7953 1.79755 13.9929 0.6 15.4701 0.6C16.9474 0.6 18.1449 1.79755 18.1449 3.27481Z"
                                        fill="url(#paint6_linear_7679_20186)"
                                        stroke="url(#paint7_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M17.3422 7.48438C17.3422 7.98068 17.1451 8.45666 16.7942 8.8076C16.4432 9.15854 15.9672 9.3557 15.4709 9.3557C14.9746 9.3557 14.4986 9.15854 14.1477 8.8076C13.7968 8.45666 13.5996 7.98068 13.5996 7.48438H17.3422Z"
                                        fill="url(#paint8_linear_7679_20186)"
                                    />
                                    <path
                                        d="M29.978 24.8008H0.963152C0.70736 24.8008 0.5 25.0081 0.5 25.2639V25.2686C0.5 25.5244 0.70736 25.7318 0.963152 25.7318H29.978C30.2338 25.7318 30.4411 25.5244 30.4411 25.2686V25.2639C30.4411 25.0081 30.2338 24.8008 29.978 24.8008Z"
                                        fill="url(#paint9_linear_7679_20186)"
                                    />
                                    <path
                                        d="M5.17785 21.1859H6.11351C6.29889 21.1859 6.44917 21.3362 6.44917 21.5216V29.0069C6.44917 29.1923 6.29889 29.3425 6.11351 29.3425H5.17785C4.99247 29.3425 4.84219 29.1923 4.84219 29.0069V21.5216C4.84219 21.3362 4.99247 21.1859 5.17785 21.1859Z"
                                        fill="url(#paint10_linear_7679_20186)"
                                        stroke="url(#paint11_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M2.37121 21.1859H3.30687C3.49225 21.1859 3.64253 21.3362 3.64253 21.5216V29.0069C3.64253 29.1923 3.49225 29.3425 3.30687 29.3425H2.37121C2.18583 29.3425 2.03555 29.1923 2.03555 29.0069V21.5216C2.03555 21.3362 2.18583 21.1859 2.37121 21.1859Z"
                                        fill="url(#paint12_linear_7679_20186)"
                                        stroke="url(#paint13_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M25.7626 29.3414H24.8269C24.6415 29.3414 24.4913 29.1911 24.4913 29.0057V21.5205C24.4913 21.3351 24.6415 21.1848 24.8269 21.1848H25.7626C25.948 21.1848 26.0982 21.3351 26.0982 21.5205V29.0057C26.0982 29.1911 25.948 29.3414 25.7626 29.3414Z"
                                        fill="url(#paint14_linear_7679_20186)"
                                        stroke="url(#paint15_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M28.5702 29.3414H27.6345C27.4492 29.3414 27.2989 29.1911 27.2989 29.0057V21.5205C27.2989 21.3351 27.4492 21.1848 27.6345 21.1848H28.5702C28.7556 21.1848 28.9059 21.3351 28.9059 21.5205V29.0057C28.9059 29.1911 28.7556 29.3414 28.5702 29.3414Z"
                                        fill="url(#paint16_linear_7679_20186)"
                                        stroke="url(#paint17_linear_7679_20186)"
                                        strokeWidth="1.2"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_20186"
                                            x1="17.1262"
                                            y1="7.7156"
                                            x2="26.3743"
                                            y2="7.71702"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_20186"
                                            x1="17.1262"
                                            y1="7.7156"
                                            x2="26.3743"
                                            y2="7.71702"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_20186"
                                            x1="4.52468"
                                            y1="7.7156"
                                            x2="13.7727"
                                            y2="7.71702"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_20186"
                                            x1="4.52468"
                                            y1="7.7156"
                                            x2="13.7727"
                                            y2="7.71702"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint4_linear_7679_20186"
                                            x1="10.9359"
                                            y1="21.8555"
                                            x2="19.9641"
                                            y2="21.856"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint5_linear_7679_20186"
                                            x1="10.9359"
                                            y1="21.8555"
                                            x2="19.9641"
                                            y2="21.856"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint6_linear_7679_20186"
                                            x1="11.9434"
                                            y1="4.18061"
                                            x2="18.9654"
                                            y2="4.18175"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint7_linear_7679_20186"
                                            x1="11.9434"
                                            y1="4.18061"
                                            x2="18.9654"
                                            y2="4.18175"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint8_linear_7679_20186"
                                            x1="13.4557"
                                            y1="8.67884"
                                            x2="17.4682"
                                            y2="8.68014"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint9_linear_7679_20186"
                                            x1="-0.651582"
                                            y1="25.395"
                                            x2="31.448"
                                            y2="25.5624"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint10_linear_7679_20186"
                                            x1="4.13423"
                                            y1="26.5582"
                                            x2="7.14364"
                                            y2="26.5584"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint11_linear_7679_20186"
                                            x1="4.13423"
                                            y1="26.5582"
                                            x2="7.14364"
                                            y2="26.5584"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint12_linear_7679_20186"
                                            x1="1.32759"
                                            y1="26.5582"
                                            x2="4.337"
                                            y2="26.5584"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint13_linear_7679_20186"
                                            x1="1.32759"
                                            y1="26.5582"
                                            x2="4.337"
                                            y2="26.5584"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint14_linear_7679_20186"
                                            x1="26.8062"
                                            y1="23.9691"
                                            x2="23.7968"
                                            y2="23.969"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint15_linear_7679_20186"
                                            x1="26.8062"
                                            y1="23.9691"
                                            x2="23.7968"
                                            y2="23.969"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint16_linear_7679_20186"
                                            x1="29.6138"
                                            y1="23.9691"
                                            x2="26.6044"
                                            y2="23.969"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint17_linear_7679_20186"
                                            x1="29.6138"
                                            y1="23.9691"
                                            x2="26.6044"
                                            y2="23.969"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 31 30"
                                    fill="none"
                                >
                                    <path
                                        d="M25.4311 8.25189L25.4311 8.2519L25.4335 8.25722C25.4673 8.3299 25.4845 8.40917 25.4839 8.48931C25.4834 8.56946 25.465 8.64847 25.4302 8.72065C25.3954 8.79284 25.345 8.8564 25.2826 8.90674C25.2202 8.95709 25.1475 8.99296 25.0696 9.01177L25.0615 9.01367L25.0287 9.02142L24.9026 9.05121L24.4387 9.16105C24.047 9.25395 23.5055 9.38271 22.9064 9.5261C21.7098 9.81255 20.2793 10.1584 19.3553 10.3935C19.2159 10.4288 19.0706 10.4347 18.9287 10.4111C18.7867 10.3874 18.6511 10.3346 18.5306 10.2559C18.41 10.1772 18.307 10.0744 18.2282 9.95391C18.1493 9.83344 18.0963 9.69794 18.0724 9.55596C18.0486 9.41397 18.0544 9.26858 18.0895 9.12895C18.1246 8.98933 18.1883 8.85849 18.2765 8.7447C18.3647 8.63092 18.4756 8.53664 18.602 8.46783C18.7281 8.39925 18.8669 8.35744 19.0099 8.34502L19.4759 8.30774L19.6654 8.29258L19.8116 8.17106C20.1851 7.86061 20.6442 7.67109 21.1279 7.62766C21.6116 7.58423 22.0971 7.68895 22.5199 7.92791L22.6846 8.02099L22.8729 8.00277L23.308 7.96067L24.0312 7.89068L23.8257 7.19376C23.6094 6.46 23.0781 4.73902 22.7703 3.83452L22.6762 3.558L22.4005 3.46151L21.4648 3.13403L21.4649 3.13395L21.4555 3.13084C21.3708 3.10275 21.3007 3.04217 21.2606 2.96242C21.2206 2.88266 21.2139 2.79027 21.242 2.70557C21.2701 2.62087 21.3307 2.55079 21.4104 2.51076C21.49 2.47079 21.5823 2.46403 21.6669 2.49198C21.667 2.49202 21.6671 2.49206 21.6672 2.4921L23.0698 2.95963L23.0815 2.96351L23.0933 2.96691C23.1768 2.991 23.1834 3.00039 23.1947 3.01653C23.1962 3.01863 23.1977 3.02084 23.1995 3.02321C23.2563 3.09751 23.3354 3.25125 23.4943 3.64251C23.5539 3.78924 23.6213 3.9602 23.6998 4.15917C24.02 4.9709 24.5242 6.24905 25.4311 8.25189Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M5.5069 8.25723L5.50687 8.25722C5.4731 8.3299 5.45588 8.40917 5.45646 8.48931C5.45704 8.56946 5.4754 8.64847 5.51022 8.72066C5.54504 8.79284 5.59545 8.8564 5.65781 8.90674L5.28092 9.3736L5.65781 8.90674C5.71982 8.9568 5.79211 8.99256 5.86953 9.01146L5.87053 9.01169L5.87891 9.01367L5.91174 9.02142L6.03786 9.05121L6.50169 9.16105C6.89342 9.25395 7.43492 9.38271 8.03396 9.5261C9.23067 9.81256 10.6612 10.1585 11.5852 10.3936M5.5069 8.25723L11.4375 10.9751M5.5069 8.25723L5.50931 8.25189C6.41626 6.24905 6.92041 4.97091 7.24058 4.15918C7.31907 3.9602 7.3865 3.78924 7.44609 3.64251C7.60502 3.25125 7.68414 3.09751 7.74089 3.02321C7.7427 3.02084 7.74425 3.01863 7.74572 3.01653C7.75705 3.00039 7.76365 2.991 7.84713 2.96691L7.85892 2.96351L7.87057 2.95963L9.27316 2.4921L5.5069 8.25723ZM11.5852 10.3936C11.5853 10.3936 11.5854 10.3936 11.5855 10.3936L11.4375 10.9751M11.5852 10.3936C11.585 10.3935 11.5849 10.3935 11.5847 10.3934L11.4375 10.9751M11.5852 10.3936C11.7246 10.4288 11.8698 10.4347 12.0117 10.4111C12.1537 10.3874 12.2893 10.3346 12.4098 10.2559C12.5304 10.1772 12.6334 10.0744 12.7122 9.95391C12.7911 9.83344 12.8441 9.69794 12.868 9.55596C12.8918 9.41397 12.886 9.26858 12.8509 9.12896C12.8158 8.98933 12.7521 8.85849 12.6639 8.7447L13.08 8.42214L12.6639 8.7447C12.5757 8.63092 12.4648 8.53664 12.3384 8.46783C12.2123 8.39925 12.0735 8.35744 11.9305 8.34502M11.4375 10.9751C11.6575 11.0308 11.8865 11.0402 12.1103 11.0029C12.3341 10.9656 12.5478 10.8823 12.7377 10.7583C12.9277 10.6344 13.09 10.4723 13.2142 10.2825C13.3385 10.0927 13.4221 9.87917 13.4597 9.65543C13.4973 9.4317 13.4881 9.20259 13.4328 8.98257C13.3774 8.76255 13.2771 8.55639 13.1381 8.37708C12.9991 8.19778 12.8244 8.04923 12.6251 7.94079C12.4258 7.83236 12.2062 7.7664 11.9802 7.74708M11.9305 8.34502L11.9323 8.34517L11.9802 7.74708M11.9305 8.34502C11.93 8.34498 11.9296 8.34494 11.9291 8.3449L11.9802 7.74708M11.9305 8.34502L11.4645 8.30774L11.275 8.29258L11.1288 8.17106C10.7553 7.86061 10.2963 7.67109 9.81253 7.62766C9.3288 7.58423 8.8433 7.68895 8.42049 7.92791L8.25578 8.02099L8.06748 8.00277L7.6324 7.96067L6.90919 7.89068L7.11469 7.19376C7.33105 6.46 7.86231 4.73902 8.17012 3.83452L8.26422 3.558L8.53992 3.46151L9.47558 3.13403L9.48493 3.13076L9.48495 3.13084C9.56965 3.10275 9.63973 3.04217 9.67976 2.96242C9.7198 2.88266 9.72651 2.79027 9.69842 2.70557C9.67034 2.62087 9.60976 2.55079 9.53 2.51076C9.45036 2.47078 9.35812 2.46403 9.27351 2.49198L9.27406 2.4918L9.08432 1.92259C9.32007 1.84442 9.57721 1.86311 9.79918 1.97453C10.0211 2.08595 10.1898 2.28099 10.2679 2.51673C10.3461 2.75248 10.3274 3.00962 10.216 3.23159C10.1046 3.45356 9.90953 3.62218 9.67379 3.70035L8.73813 4.02783C8.49911 4.73019 8.12134 5.93837 7.86611 6.77768L7.74798 6.76625L7.69019 7.36346L8.11716 7.48936L8.18372 7.50898L8.26569 7.53315C8.28635 7.4631 8.30991 7.38393 8.3359 7.29728C8.81233 7.07571 9.34009 6.98283 9.86618 7.03006C10.4711 7.08437 11.0453 7.32139 11.5124 7.70965L11.9802 7.74708"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M19.042 8.08438C18.7408 12.8801 18.6591 13.8824 18.6301 14.8863C18.5904 16.2618 18.6497 17.6401 18.3791 28.7842L18.3788 28.7992L18.3792 28.8143C18.3831 28.9654 18.3268 29.1119 18.2228 29.2215C18.1712 29.2758 18.1095 29.3194 18.0411 29.3499C17.9727 29.3803 17.899 29.397 17.8242 29.3989C17.6731 29.4028 17.5266 29.3466 17.417 29.2425L17.0039 29.6776L17.417 29.2425C17.3073 29.1384 17.2435 28.9951 17.2396 28.8439L17.2392 28.8277L17.2379 28.8115L16.5361 20.0678L16.4918 19.5158H15.9381H15.0024H14.4486L14.4043 20.0678L13.7026 28.8115L13.7013 28.8277L13.7009 28.8439C13.6969 28.9951 13.6331 29.1384 13.5235 29.2425L13.9366 29.6776L13.5235 29.2425C13.4139 29.3466 13.2674 29.4028 13.1163 29.3989C12.9652 29.395 12.8218 29.3312 12.7177 29.2215C12.6136 29.1119 12.5574 28.9654 12.5613 28.8143L12.5617 28.7992L12.5613 28.7841C12.3826 21.4301 12.3367 19.9858 12.327 18.5413C12.3214 17.717 12.3276 16.8925 12.3276 14.9697V14.9509L12.3264 14.9322L11.8984 8.08438H13.4573L15.2019 8.95669L15.4702 9.09086L15.7386 8.95669L17.4832 8.08438H19.042Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M18.1449 3.27481C18.1449 4.75207 16.9474 5.94962 15.4701 5.94962C13.9929 5.94962 12.7953 4.75207 12.7953 3.27481C12.7953 1.79755 13.9929 0.6 15.4701 0.6C16.9474 0.6 18.1449 1.79755 18.1449 3.27481Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M17.3422 7.48438C17.3422 7.98068 17.1451 8.45666 16.7942 8.8076C16.4432 9.15854 15.9672 9.3557 15.4709 9.3557C14.9746 9.3557 14.4986 9.15854 14.1477 8.8076C13.7968 8.45666 13.5996 7.98068 13.5996 7.48438H17.3422Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M29.978 24.8008H0.963152C0.70736 24.8008 0.5 25.0081 0.5 25.2639V25.2686C0.5 25.5244 0.70736 25.7318 0.963152 25.7318H29.978C30.2338 25.7318 30.4411 25.5244 30.4411 25.2686V25.2639C30.4411 25.0081 30.2338 24.8008 29.978 24.8008Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M5.17785 21.1859H6.11351C6.29889 21.1859 6.44917 21.3362 6.44917 21.5216V29.0069C6.44917 29.1923 6.29889 29.3425 6.11351 29.3425H5.17785C4.99247 29.3425 4.84219 29.1923 4.84219 29.0069V21.5216C4.84219 21.3362 4.99247 21.1859 5.17785 21.1859Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M2.37121 21.1859H3.30687C3.49225 21.1859 3.64253 21.3362 3.64253 21.5216V29.0069C3.64253 29.1923 3.49225 29.3425 3.30687 29.3425H2.37121C2.18583 29.3425 2.03555 29.1923 2.03555 29.0069V21.5216C2.03555 21.3362 2.18583 21.1859 2.37121 21.1859Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M25.7626 29.3414H24.8269C24.6415 29.3414 24.4913 29.1911 24.4913 29.0057V21.5205C24.4913 21.3351 24.6415 21.1848 24.8269 21.1848H25.7626C25.948 21.1848 26.0982 21.3351 26.0982 21.5205V29.0057C26.0982 29.1911 25.948 29.3414 25.7626 29.3414Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M28.5702 29.3414H27.6345C27.4492 29.3414 27.2989 29.1911 27.2989 29.0057V21.5205C27.2989 21.3351 27.4492 21.1848 27.6345 21.1848H28.5702C28.7556 21.1848 28.9059 21.3351 28.9059 21.5205V29.0057C28.9059 29.1911 28.7556 29.3414 28.5702 29.3414Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Strength" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                STRENGTH
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Dance")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Dance" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 35 35"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_7679_36386"
                                        style={{ maskType: "luminance" }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="35"
                                        height="35"
                                    >
                                        <path d="M0.5 0.5H35V35H0.5V0.5Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_7679_36386)">
                                        <path
                                            d="M19.917 18.5413L20.5903 17.4443L22.2305 14.7717L22.5156 14.3072L22.0283 14.0631L19.8309 12.9622L18.9719 12.5319L19.1123 13.4823L19.6695 17.2558L19.8547 18.5098L19.8546 18.5098L19.9956 19.4644L20.0903 20.106L20.1006 20.176L20.1299 20.2403L25.9029 32.9146C26.1518 33.4611 25.9105 34.106 25.364 34.3549C24.8175 34.6038 24.1727 34.3627 23.9237 33.816C22.5007 30.6913 21.3635 28.1947 20.4854 26.2671C20.1104 25.4437 19.7826 24.7241 19.5 24.1037C19.028 23.0674 18.6822 22.3081 18.453 21.8041C18.3383 21.5522 18.2529 21.3642 18.1954 21.2374C18.1646 21.1695 18.1436 21.123 18.1305 21.094C18.1172 21.0647 18.1121 21.0534 18.1132 21.056L17.9655 20.6917L17.5767 20.7491L16.9256 20.8453L16.7139 20.8765L16.5904 21.0513L12.932 26.2263L12.8192 26.3858L12.8445 26.5795L13.7109 33.2248C13.7885 33.8203 13.3688 34.3659 12.7731 34.4436L19.917 18.5413ZM19.917 18.5413L20.7158 18.9451C20.8342 19.005 20.9601 19.0335 21.084 19.0334H21.0842C21.3625 19.0334 21.6318 18.8934 21.7867 18.641L21.7867 18.6409L24.3872 14.4038L24.3872 14.4037C24.6393 13.9931 24.4855 13.4537 24.0545 13.2377C24.0545 13.2377 24.0545 13.2377 24.0545 13.2377L18.3768 10.3931L18.3767 10.3931C18.2076 10.3083 18.0236 10.288 17.8491 10.3227L17.7636 10.3397L17.7196 10.3331C17.7186 10.3332 17.7177 10.3333 17.7166 10.3334C17.6848 10.3361 17.6376 10.3412 17.5743 10.3488C17.4488 10.364 17.2757 10.3874 17.0691 10.4168C16.6566 10.4756 16.1216 10.5565 15.5902 10.6386C15.0592 10.7206 14.5336 10.8035 14.1406 10.8659C13.9441 10.8971 13.7809 10.9232 13.6667 10.9414L13.5344 10.9626L13.4996 10.9682L13.4908 10.9696L13.4885 10.97L13.488 10.9701L13.4878 10.9701L13.4084 10.4764M19.917 18.5413L13.4084 10.4764M13.4084 10.4764L13.4878 10.9701L13.1423 11.0257L12.9717 10.7201L11.2638 7.65965L11.1793 7.50831L11.2067 7.33717L12.0586 1.99951C12.1303 1.55074 11.8246 1.12891 11.3759 1.05725L13.4084 10.4764ZM10.4336 1.74004L10.4336 1.74C10.5052 1.29139 10.9268 0.985668 11.3758 1.05724L10.4336 1.74004ZM10.4336 1.74004L9.5093 7.53042C9.50929 7.53045 9.50929 7.53049 9.50928 7.53052C9.48021 7.71302 9.51334 7.89997 9.60338 8.06136L13.0872 14.3036L13.131 14.3821M10.4336 1.74004L13.131 14.3821M13.131 14.3821L13.1447 14.471M13.131 14.3821L13.1447 14.471M13.1447 14.471L14.0884 20.5796L14.1193 20.7795M13.1447 14.471L14.1193 20.7795M14.1193 20.7795L14.0025 20.9446M14.1193 20.7795L14.0025 20.9446M14.0025 20.9446L10.7982 25.4774L10.7982 25.4774M14.0025 20.9446L10.7982 25.4774M10.7982 25.4774C10.6405 25.7004 10.5725 25.9746 10.6079 26.2457M10.7982 25.4774L10.6079 26.2457M10.6079 26.2457C10.6079 26.2457 10.6079 26.2457 10.6079 26.2457M10.6079 26.2457L10.6079 26.2457M10.6079 26.2457L11.5543 33.5059L10.6079 26.2457ZM17.7425 10.3315C17.7422 10.3315 17.7415 10.3315 17.7407 10.3316L17.7425 10.3315ZM11.5543 33.5059C11.6322 34.1029 12.1791 34.521 12.7731 34.4436L11.5543 33.5059Z"
                                            fill="url(#paint0_linear_7679_36386)"
                                            stroke="url(#paint1_linear_7679_36386)"
                                        />
                                        <path
                                            d="M15.3662 8.76857L15.3662 8.76856C16.5909 8.58775 17.4371 7.44831 17.2563 6.22362L17.751 6.15059L17.2563 6.22362C17.0755 4.99887 15.9361 4.15265 14.7114 4.33352L14.7114 4.33352C13.4867 4.51434 12.6405 5.65378 12.8213 6.87847C13.0021 8.10313 14.1415 8.94938 15.3662 8.76857Z"
                                            fill="url(#paint2_linear_7679_36386)"
                                            stroke="url(#paint3_linear_7679_36386)"
                                        />
                                    </g>
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_36386"
                                            x1="8.32587"
                                            y1="12.9916"
                                            x2="27.0901"
                                            y2="12.9901"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_36386"
                                            x1="8.32587"
                                            y1="12.9916"
                                            x2="27.0901"
                                            y2="12.9901"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_36386"
                                            x1="12.086"
                                            y1="5.79263"
                                            x2="17.9653"
                                            y2="5.79167"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_36386"
                                            x1="12.086"
                                            y1="5.79263"
                                            x2="17.9653"
                                            y2="5.79167"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 35 35"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_6646_37730"
                                        style={{ maskType: "luminance" }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="35"
                                        height="35"
                                    >
                                        <path d="M0.5 0.5H35V35H0.5V0.5Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_6646_37730)">
                                        <path
                                            d="M19.917 18.5413L20.5903 17.4443L22.2305 14.7717L22.5156 14.3072L22.0283 14.0631L19.8309 12.9622L18.9719 12.5319L19.1123 13.4823L19.6695 17.2558L19.8547 18.5098L19.8546 18.5098L19.9956 19.4644L20.0903 20.106L20.1006 20.176L20.1299 20.2403L25.9029 32.9146C26.1518 33.4611 25.9105 34.106 25.364 34.3549C24.8175 34.6038 24.1727 34.3627 23.9237 33.816C22.5007 30.6913 21.3635 28.1947 20.4854 26.2671C20.1104 25.4437 19.7826 24.7241 19.5 24.1037C19.028 23.0674 18.6822 22.3081 18.453 21.8041C18.3383 21.5522 18.2529 21.3642 18.1954 21.2374C18.1646 21.1695 18.1436 21.123 18.1305 21.094C18.1172 21.0647 18.1121 21.0534 18.1132 21.056L17.9655 20.6917L17.5767 20.7491L16.9256 20.8453L16.7139 20.8765L16.5904 21.0513L12.932 26.2263L12.8192 26.3858L12.8445 26.5795L13.7109 33.2248C13.7885 33.8203 13.3688 34.3659 12.7731 34.4436L19.917 18.5413ZM19.917 18.5413L20.7158 18.9451C20.8342 19.005 20.9601 19.0335 21.084 19.0334H21.0842C21.3625 19.0334 21.6318 18.8934 21.7867 18.641L21.7867 18.6409L24.3872 14.4038L24.3872 14.4037C24.6393 13.9931 24.4855 13.4537 24.0545 13.2377C24.0545 13.2377 24.0545 13.2377 24.0545 13.2377L18.3768 10.3931L18.3767 10.3931C18.2076 10.3083 18.0236 10.288 17.8491 10.3227L17.7636 10.3397L17.7196 10.3331C17.7186 10.3332 17.7177 10.3333 17.7166 10.3334C17.6848 10.3361 17.6376 10.3412 17.5743 10.3488C17.4488 10.364 17.2757 10.3874 17.0691 10.4168C16.6566 10.4756 16.1216 10.5565 15.5902 10.6386C15.0592 10.7206 14.5336 10.8035 14.1406 10.8659C13.9441 10.8971 13.7809 10.9232 13.6667 10.9414L13.5344 10.9626L13.4996 10.9682L13.4908 10.9696L13.4885 10.97L13.488 10.9701L13.4878 10.9701L13.4084 10.4764M19.917 18.5413L13.4084 10.4764M13.4084 10.4764L13.4878 10.9701L13.1423 11.0257L12.9717 10.7201L11.2638 7.65965L11.1793 7.50831L11.2067 7.33717L12.0586 1.99951C12.1303 1.55074 11.8246 1.12891 11.3759 1.05725L13.4084 10.4764ZM10.4336 1.74004L10.4336 1.74C10.5052 1.29139 10.9268 0.985668 11.3758 1.05724L10.4336 1.74004ZM10.4336 1.74004L9.5093 7.53042C9.50929 7.53045 9.50929 7.53049 9.50928 7.53052C9.48021 7.71302 9.51334 7.89997 9.60338 8.06136L13.0872 14.3036L13.131 14.3821M10.4336 1.74004L13.131 14.3821M13.131 14.3821L13.1447 14.471M13.131 14.3821L13.1447 14.471M13.1447 14.471L14.0884 20.5796L14.1193 20.7795M13.1447 14.471L14.1193 20.7795M14.1193 20.7795L14.0025 20.9446M14.1193 20.7795L14.0025 20.9446M14.0025 20.9446L10.7982 25.4774L10.7982 25.4774M14.0025 20.9446L10.7982 25.4774M10.7982 25.4774C10.6405 25.7004 10.5725 25.9746 10.6079 26.2457M10.7982 25.4774L10.6079 26.2457M10.6079 26.2457C10.6079 26.2457 10.6079 26.2457 10.6079 26.2457M10.6079 26.2457L10.6079 26.2457M10.6079 26.2457L11.5543 33.5059L10.6079 26.2457ZM17.7425 10.3315C17.7422 10.3315 17.7415 10.3315 17.7407 10.3316L17.7425 10.3315ZM11.5543 33.5059C11.6322 34.1029 12.1791 34.521 12.7731 34.4436L11.5543 33.5059Z"
                                            fill="#D4D4D4"
                                            stroke="#D4D4D4"
                                        />
                                        <path
                                            d="M15.3662 8.76857L15.3662 8.76856C16.5909 8.58775 17.4371 7.44831 17.2563 6.22362L17.751 6.15059L17.2563 6.22362C17.0755 4.99887 15.9361 4.15265 14.7114 4.33352L14.7114 4.33352C13.4867 4.51434 12.6405 5.65378 12.8213 6.87847C13.0021 8.10313 14.1415 8.94938 15.3662 8.76857Z"
                                            fill="#D4D4D4"
                                            stroke="#D4D4D4"
                                        />
                                    </g>
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Dance" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                DANCE
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Recovery")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Recovery" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <path
                                        d="M14.0881 5.93587C15.7272 5.93587 17.056 4.60708 17.056 2.96793C17.056 1.32879 15.7272 0 14.0881 0C12.4489 0 11.1201 1.32879 11.1201 2.96793C11.1201 4.60708 12.4489 5.93587 14.0881 5.93587Z"
                                        fill="url(#paint0_linear_7679_19630)"
                                    />
                                    <path
                                        d="M29.2275 27.0395L28.1703 16.429C27.9437 14.0249 25.955 12.2188 23.5447 12.2188H22.1979C21.9839 12.2188 21.7762 12.2313 21.5686 12.2628C21.7637 12.6341 21.8706 13.0558 21.8518 13.4963C21.965 13.4837 22.0783 13.4774 22.1979 13.4774H23.5447C25.3005 13.4774 26.7543 14.799 26.9179 16.5486L27.1822 19.1729H18.5855L18.8247 16.5423C18.8436 16.3283 18.8876 16.1143 18.9442 15.9066L17.6856 15.7619C17.6289 15.9822 17.5912 16.2024 17.5723 16.429L16.3073 30.2051C16.2759 30.5512 16.5276 30.8596 16.8737 30.8911H16.9367C17.2576 30.8911 17.5282 30.6456 17.5597 30.3184L18.466 20.4315H27.3018L27.9752 27.1654C27.1445 27.499 26.5592 28.3045 26.5592 29.2485C26.5592 30.4946 27.5661 31.5015 28.8059 31.5015C30.052 31.5015 31.0589 30.4946 31.0589 29.2485C31.0589 28.1535 30.2659 27.2346 29.2275 27.0395ZM28.8059 30.2428C28.2647 30.2428 27.8178 29.796 27.8178 29.2485C27.8178 28.701 28.2647 28.2604 28.8059 28.2604C29.3534 28.2604 29.8002 28.701 29.8002 29.2485C29.8002 29.796 29.3534 30.2428 28.8059 30.2428Z"
                                        fill="url(#paint1_linear_7679_19630)"
                                    />
                                    <path
                                        d="M3.7959 29.5357L7.57189 25.3129C7.78587 25.0737 7.93691 24.7842 8.00613 24.4696L8.53477 22.1284L5.67131 19.7433C5.53286 19.6237 5.40069 19.4978 5.29371 19.3594L4.43152 23.1605L0.982778 27.0184C0.284219 27.7987 0.353445 28.9882 1.12752 29.6867C1.40443 29.9322 1.73168 30.0832 2.07152 30.1398C2.68827 30.2468 3.34278 30.0392 3.7959 29.5357Z"
                                        fill="url(#paint2_linear_7679_19630)"
                                    />
                                    <path
                                        d="M8.84355 20.7505L10.2721 21.94V28.7493C10.2721 29.7877 11.1154 30.6373 12.1601 30.6373C13.1985 30.6373 14.0481 29.7877 14.0481 28.7493V21.0589C14.0481 20.4988 13.7964 19.9701 13.3685 19.6114L9.91971 16.7291L12.1287 10.8071L14.325 13.702C14.5327 13.9726 14.8411 14.1551 15.1809 14.1929L19.1898 14.6649C19.2401 14.6712 19.2905 14.6712 19.3345 14.6712C19.9639 14.6712 20.5114 14.1992 20.5869 13.5635C20.6687 12.8713 20.1715 12.2482 19.4856 12.1664L16.0054 11.7573L12.6762 7.36461C12.4685 6.9933 12.1287 6.69122 11.7007 6.53389C10.7253 6.16887 9.63651 6.66605 9.2715 7.64151C9.24948 7.7013 5.89639 16.7102 5.88569 16.7731C5.87122 16.8015 5.83849 16.9166 5.82905 16.9934C5.70948 17.6479 5.94862 18.3339 6.47726 18.7744L8.84355 20.7505Z"
                                        fill="url(#paint3_linear_7679_19630)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_19630"
                                            x1="10.8918"
                                            y1="3.78885"
                                            x2="17.2558"
                                            y2="3.78989"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_19630"
                                            x1="15.7372"
                                            y1="24.5269"
                                            x2="31.5555"
                                            y2="24.5289"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_19630"
                                            x1="0.19097"
                                            y1="26.258"
                                            x2="8.8052"
                                            y2="26.259"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_19630"
                                            x1="5.22972"
                                            y1="21.8757"
                                            x2="21.0937"
                                            y2="21.8773"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <path
                                        d="M14.0881 5.93587C15.7272 5.93587 17.056 4.60708 17.056 2.96793C17.056 1.32879 15.7272 0 14.0881 0C12.4489 0 11.1201 1.32879 11.1201 2.96793C11.1201 4.60708 12.4489 5.93587 14.0881 5.93587Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M29.2275 27.0395L28.1703 16.429C27.9437 14.0249 25.955 12.2188 23.5447 12.2188H22.1979C21.9839 12.2188 21.7762 12.2313 21.5686 12.2628C21.7637 12.6341 21.8706 13.0558 21.8518 13.4963C21.965 13.4837 22.0783 13.4774 22.1979 13.4774H23.5447C25.3005 13.4774 26.7543 14.799 26.9179 16.5486L27.1822 19.1729H18.5855L18.8247 16.5423C18.8436 16.3283 18.8876 16.1143 18.9442 15.9066L17.6856 15.7619C17.6289 15.9822 17.5912 16.2024 17.5723 16.429L16.3073 30.2051C16.2759 30.5512 16.5276 30.8596 16.8737 30.8911H16.9367C17.2576 30.8911 17.5282 30.6456 17.5597 30.3184L18.466 20.4315H27.3018L27.9752 27.1654C27.1445 27.499 26.5592 28.3045 26.5592 29.2485C26.5592 30.4946 27.5661 31.5015 28.8059 31.5015C30.052 31.5015 31.0589 30.4946 31.0589 29.2485C31.0589 28.1535 30.2659 27.2346 29.2275 27.0395ZM28.8059 30.2428C28.2647 30.2428 27.8178 29.796 27.8178 29.2485C27.8178 28.701 28.2647 28.2604 28.8059 28.2604C29.3534 28.2604 29.8002 28.701 29.8002 29.2485C29.8002 29.796 29.3534 30.2428 28.8059 30.2428Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M3.7959 29.5357L7.57189 25.3129C7.78587 25.0737 7.93691 24.7842 8.00613 24.4696L8.53477 22.1284L5.67131 19.7433C5.53286 19.6237 5.40069 19.4978 5.29371 19.3594L4.43152 23.1605L0.982778 27.0184C0.284219 27.7987 0.353445 28.9882 1.12752 29.6867C1.40443 29.9322 1.73168 30.0832 2.07152 30.1398C2.68827 30.2468 3.34278 30.0392 3.7959 29.5357Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M8.84355 20.7505L10.2721 21.94V28.7493C10.2721 29.7877 11.1154 30.6373 12.1601 30.6373C13.1985 30.6373 14.0481 29.7877 14.0481 28.7493V21.0589C14.0481 20.4988 13.7964 19.9701 13.3685 19.6114L9.91971 16.7291L12.1287 10.8071L14.325 13.702C14.5327 13.9726 14.8411 14.1551 15.1809 14.1929L19.1898 14.6649C19.2401 14.6712 19.2905 14.6712 19.3345 14.6712C19.9639 14.6712 20.5114 14.1992 20.5869 13.5635C20.6687 12.8713 20.1715 12.2482 19.4856 12.1664L16.0054 11.7573L12.6762 7.36461C12.4685 6.9933 12.1287 6.69122 11.7007 6.53389C10.7253 6.16887 9.63651 6.66605 9.2715 7.64151C9.24948 7.7013 5.89639 16.7102 5.88569 16.7731C5.87122 16.8015 5.83849 16.9166 5.82905 16.9934C5.70948 17.6479 5.94862 18.3339 6.47726 18.7744L8.84355 20.7505Z"
                                        fill="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Recovery" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                RECOVERY
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Stretching")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Stretching" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 27 36"
                                    fill="none"
                                >
                                    <path
                                        d="M12.5548 7.84753L12.5336 7.87411C11.7343 8.8761 10.5063 10.9516 9.31667 13.2203C8.13101 15.4814 7.00965 17.8841 6.41642 19.5201L6.40459 19.5527L6.38839 19.5834C4.21452 23.695 2.31326 28.5989 0.821659 33.0331C0.46722 34.0871 1.06355 34.9735 1.91295 35.3391C2.33425 35.5204 2.77413 35.549 3.13403 35.4228C3.47735 35.3025 3.79979 35.0241 3.98438 34.4758C5.10656 31.1385 6.46411 27.5246 8.0006 24.1665L8.46068 23.1609L8.91178 24.1705C10.4266 27.5607 11.9631 30.9339 13.6118 34.2516L13.612 34.2519C13.8693 34.7705 14.2293 35.0073 14.5912 35.0841C14.9697 35.1643 15.4058 35.08 15.8011 34.8484C16.5973 34.3819 17.0708 33.4359 16.5772 32.4403C16.5771 32.4402 16.577 32.4401 16.577 32.44L17.0249 32.2178C15.3766 28.9015 13.8418 25.5339 12.3317 22.1541L12.5548 7.84753ZM12.5548 7.84753L12.5722 7.81833C14.9711 3.7942 19.0851 1.00116 24.6996 0.506309L24.6558 0.00822755M12.5548 7.84753L24.6997 0.506297M13.1105 21.6584C14.4963 21.3982 15.882 21.1385 17.2681 20.8786C18.2664 20.6915 19.2648 20.5043 20.2636 20.3169C21.2826 20.1255 21.6732 19.0104 21.5125 18.1176C21.0307 15.4423 19.5065 13.5811 17.6092 11.8201C17.3275 10.8621 16.3882 10.0148 15.3459 9.17264C17.4591 5.75642 20.909 3.90224 25.3996 3.5065C27.6914 3.30572 26.9278 -0.191391 24.6558 0.00822755M13.1105 21.6584L5.94636 19.3497C7.15513 16.0161 10.4788 9.64811 12.1427 7.5623C14.6254 3.39767 18.8843 0.516876 24.6558 0.00822755M13.1105 21.6584C12.9578 21.6874 12.8118 21.6971 12.6725 21.6909C12.6617 21.6667 12.6508 21.6424 12.64 21.6182L12.5097 21.6763C12.42 21.6642 12.3332 21.6457 12.2492 21.6217C12.2401 21.6508 12.2302 21.6796 12.2204 21.7084C12.2075 21.746 12.1946 21.7837 12.1834 21.8219L13.1105 21.6584ZM24.6558 0.00822755L24.6997 0.506297M24.6997 0.506297C25.5245 0.433896 26.1013 1.02089 26.2503 1.71253C26.3238 2.05348 26.2773 2.36627 26.1428 2.58683C26.0188 2.79018 25.7876 2.97059 25.3559 3.00841L25.3557 3.00843C20.7424 3.41499 17.1334 5.3325 14.9207 8.90961L14.6888 9.28452L15.0317 9.56156C15.5499 9.98024 16.0206 10.3831 16.3942 10.7907C16.7689 11.1997 17.0189 11.585 17.1295 11.9611L17.1683 12.093L17.269 12.1865C19.1372 13.9206 20.5671 15.6896 21.0204 18.2062C21.0834 18.5562 21.0358 18.9483 20.8823 19.2586C20.734 19.5584 20.4996 19.7638 20.1713 19.8255L24.6997 0.506297ZM16.3308 14.8683L15.9556 14.4778L15.5963 14.883C14.8402 15.7355 14.1529 16.6427 13.5547 17.6059L12.9555 18.5706L14.0716 18.3611C14.6424 18.254 15.2134 18.147 15.7844 18.04L15.802 18.0367L15.8067 18.0358C16.382 17.928 16.9574 17.8202 17.5327 17.7122L18.1878 17.5893L17.8864 16.9947C17.4789 16.1911 16.9436 15.5059 16.3308 14.8683Z"
                                        fill="url(#paint0_linear_7679_38977)"
                                        stroke="url(#paint1_linear_7679_38977)"
                                    />
                                    <path
                                        d="M23.4758 9.10118C23.4758 10.5205 22.3252 11.6711 20.9059 11.6711C19.4865 11.6711 18.3359 10.5205 18.3359 9.10118C18.3359 7.68185 19.4865 6.53125 20.9059 6.53125C22.3252 6.53125 23.4758 7.68185 23.4758 9.10118Z"
                                        fill="url(#paint2_linear_7679_38977)"
                                        stroke="url(#paint3_linear_7679_38977)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_38977"
                                            x1="-0.80607"
                                            y1="22.9788"
                                            x2="27.6792"
                                            y2="22.9823"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_38977"
                                            x1="-0.80607"
                                            y1="22.9788"
                                            x2="27.6792"
                                            y2="22.9823"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_38977"
                                            x1="17.5998"
                                            y1="9.95032"
                                            x2="24.1825"
                                            y2="9.95138"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_38977"
                                            x1="17.5998"
                                            y1="9.95032"
                                            x2="24.1825"
                                            y2="9.95138"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 27 36"
                                    fill="none"
                                >
                                    <path
                                        d="M12.5548 7.84753L12.5336 7.87411C11.7343 8.8761 10.5063 10.9516 9.31667 13.2203C8.13101 15.4814 7.00965 17.8841 6.41642 19.5201L6.40459 19.5527L6.38839 19.5834C4.21452 23.695 2.31326 28.5989 0.821659 33.0331C0.46722 34.0871 1.06355 34.9735 1.91295 35.3391C2.33425 35.5204 2.77413 35.549 3.13403 35.4228C3.47735 35.3025 3.79979 35.0241 3.98438 34.4758C5.10656 31.1385 6.46411 27.5246 8.0006 24.1665L8.46068 23.1609L8.91178 24.1705C10.4266 27.5607 11.9631 30.9339 13.6118 34.2516L13.612 34.2519C13.8693 34.7705 14.2293 35.0073 14.5912 35.0841C14.9697 35.1643 15.4058 35.08 15.8011 34.8484C16.5973 34.3819 17.0708 33.4359 16.5772 32.4403C16.5771 32.4402 16.577 32.4401 16.577 32.44L17.0249 32.2178C15.3766 28.9015 13.8418 25.5339 12.3317 22.1541L12.5548 7.84753ZM12.5548 7.84753L12.5722 7.81833C14.9711 3.7942 19.0851 1.00116 24.6996 0.506309L24.6558 0.00822755M12.5548 7.84753L24.6997 0.506297M13.1105 21.6584C14.4963 21.3982 15.882 21.1385 17.2681 20.8786C18.2664 20.6915 19.2648 20.5043 20.2636 20.3169C21.2826 20.1255 21.6732 19.0104 21.5125 18.1176C21.0307 15.4423 19.5065 13.5811 17.6092 11.8201C17.3275 10.8621 16.3882 10.0148 15.3459 9.17264C17.4591 5.75642 20.909 3.90224 25.3996 3.5065C27.6914 3.30572 26.9278 -0.191391 24.6558 0.00822755M13.1105 21.6584L5.94636 19.3497C7.15513 16.0161 10.4788 9.64811 12.1427 7.5623C14.6254 3.39767 18.8843 0.516876 24.6558 0.00822755M13.1105 21.6584C12.9578 21.6874 12.8118 21.6971 12.6725 21.6909C12.6617 21.6667 12.6508 21.6424 12.64 21.6182L12.5097 21.6763C12.42 21.6642 12.3332 21.6457 12.2492 21.6217C12.2401 21.6508 12.2302 21.6796 12.2204 21.7084C12.2075 21.746 12.1946 21.7837 12.1834 21.8219L13.1105 21.6584ZM24.6558 0.00822755L24.6997 0.506297M24.6997 0.506297C25.5245 0.433896 26.1013 1.02089 26.2503 1.71253C26.3238 2.05348 26.2773 2.36627 26.1428 2.58683C26.0188 2.79018 25.7876 2.97059 25.3559 3.00841L25.3557 3.00843C20.7424 3.41499 17.1334 5.3325 14.9207 8.90961L14.6888 9.28452L15.0317 9.56156C15.5499 9.98024 16.0206 10.3831 16.3942 10.7907C16.7689 11.1997 17.0189 11.585 17.1295 11.9611L17.1683 12.093L17.269 12.1865C19.1372 13.9206 20.5671 15.6896 21.0204 18.2062C21.0834 18.5562 21.0358 18.9483 20.8823 19.2586C20.734 19.5584 20.4996 19.7638 20.1713 19.8255L24.6997 0.506297ZM16.3308 14.8683L15.9556 14.4778L15.5963 14.883C14.8402 15.7355 14.1529 16.6427 13.5547 17.6059L12.9555 18.5706L14.0716 18.3611C14.6424 18.254 15.2134 18.147 15.7844 18.04L15.802 18.0367L15.8067 18.0358C16.382 17.928 16.9574 17.8202 17.5327 17.7122L18.1878 17.5893L17.8864 16.9947C17.4789 16.1911 16.9436 15.5059 16.3308 14.8683Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M23.4758 9.10118C23.4758 10.5205 22.3252 11.6711 20.9059 11.6711C19.4865 11.6711 18.3359 10.5205 18.3359 9.10118C18.3359 7.68185 19.4865 6.53125 20.9059 6.53125C22.3252 6.53125 23.4758 7.68185 23.4758 9.10118Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Stretching" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                STRETCHING
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Warmup")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Warmup" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 32"
                                    fill="none"
                                >
                                    <path
                                        d="M11.5 17.6909H5.75V12.625C5.75 11.6586 6.53358 10.875 7.5 10.875H9.75C10.7164 10.875 11.5 11.6586 11.5 12.625V17.6909Z"
                                        fill="url(#paint0_linear_7679_38515)"
                                        stroke="url(#paint1_linear_7679_38515)"
                                    />
                                    <path
                                        d="M5.75 12.6239C5.75 12.5554 5.75524 12.4869 5.76518 12.418H5.88395C5.87813 12.4853 5.875 12.5539 5.875 12.6239V17.6898H5.75V12.6239Z"
                                        fill="url(#paint2_linear_7679_38515)"
                                        stroke="url(#paint3_linear_7679_38515)"
                                    />
                                    <path
                                        d="M8.625 9.475C7.56899 9.475 6.7125 8.61851 6.7125 7.5625C6.7125 6.50649 7.56899 5.65 8.625 5.65C9.68101 5.65 10.5375 6.50649 10.5375 7.5625C10.5375 8.61851 9.68101 9.475 8.625 9.475Z"
                                        fill="url(#paint4_linear_7679_38515)"
                                        stroke="url(#paint5_linear_7679_38515)"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625H5.8125Z"
                                        fill="url(#paint6_linear_7679_38515)"
                                    />
                                    <path
                                        d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625C5.8125 9.11556 7.07194 10.375 8.625 10.375C9.0255 10.375 9.40519 10.2884 9.75 10.1376C8.75775 9.70337 8.0625 8.71506 8.0625 7.5625Z"
                                        fill="url(#paint7_linear_7679_38515)"
                                    />
                                    <path
                                        d="M6.36672 7.0625C6.58689 6.06407 7.45253 5.30757 8.50351 5.25314C8.03189 5.73617 7.70629 6.36285 7.60008 7.0625H6.36672Z"
                                        fill="url(#paint8_linear_7679_38515)"
                                        stroke="url(#paint9_linear_7679_38515)"
                                    />
                                    <path
                                        d="M7 12.125H1.875C1.52958 12.125 1.25 11.8454 1.25 11.5C1.25 11.1546 1.52958 10.875 1.875 10.875H7V12.125Z"
                                        fill="url(#paint10_linear_7679_38515)"
                                        stroke="url(#paint11_linear_7679_38515)"
                                    />
                                    <path
                                        d="M8 13.125H9.25V13.25H8V13.125Z"
                                        fill="url(#paint12_linear_7679_38515)"
                                        stroke="url(#paint13_linear_7679_38515)"
                                    />
                                    <path
                                        d="M3.76049 11.723L3.76049 11.723L4.64643 14.9799C4.64643 14.9799 4.64643 14.9799 4.64643 14.9799C4.73707 15.3131 5.08043 15.5096 5.41353 15.419L3.76049 11.723ZM3.76049 11.723C3.66986 11.3899 3.86639 11.0464 4.19959 10.9558M3.76049 11.723L4.19959 10.9558M4.19959 10.9558C4.53272 10.8652 4.87616 11.0617 4.96681 11.3949M4.19959 10.9558L4.96681 11.3949M4.96681 11.3949C4.96681 11.3949 4.96681 11.3949 4.96681 11.3949M4.96681 11.3949L4.96681 11.3949M4.96681 11.3949L5.85263 14.6514C5.85264 14.6514 5.85265 14.6514 5.85266 14.6515C5.94302 14.985 5.74611 15.3284 5.41365 15.419L4.96681 11.3949Z"
                                        fill="url(#paint14_linear_7679_38515)"
                                        stroke="url(#paint15_linear_7679_38515)"
                                    />
                                    <path
                                        d="M9.09903 21.4674L8.62469 20.0442L8.15034 21.4674L5.04546 30.7826C4.95208 31.0621 4.6906 31.2505 4.39638 31.2505C3.97429 31.2505 3.65251 30.8715 3.72134 30.4541C3.72135 30.454 3.72136 30.4539 3.72137 30.4539L5.67354 18.6914H11.5758L13.5275 30.4547L13.5275 30.4549C13.5967 30.8713 13.2754 31.2505 12.853 31.2505C12.5588 31.2505 12.2973 31.0621 12.2039 30.7826L9.09903 21.4674Z"
                                        fill="url(#paint16_linear_7679_38515)"
                                        stroke="url(#paint17_linear_7679_38515)"
                                    />
                                    <mask id="path-11-inside-1_7679_38515" fill="white">
                                        <path d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z" />
                                    </mask>
                                    <path
                                        d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z"
                                        fill="url(#paint18_linear_7679_38515)"
                                    />
                                    <path
                                        d="M4.141 30.3723L3.1545 30.2086L3.15445 30.2089L4.141 30.3723ZM6.16263 18.1914L7.14913 18.3551L7.34227 17.1914H6.16263V18.1914ZM5.24969 18.1914V17.1914H4.40198L4.26318 18.0277L5.24969 18.1914ZM3.22806 30.3723L2.24156 30.2086L2.24146 30.2092L3.22806 30.3723ZM4.84413 31.6509L5.22506 32.5755L7.42253 31.6701L5.23882 30.7321L4.84413 31.6509ZM5.12751 30.5361L7.14913 18.3551L5.17612 18.0277L3.1545 30.2086L5.12751 30.5361ZM6.16263 17.1914H5.24969V19.1914H6.16263V17.1914ZM4.26318 18.0277L2.24156 30.2086L4.21457 30.5361L6.23619 18.3551L4.26318 18.0277ZM2.24146 30.2092C2.02154 31.5391 3.04732 32.7499 4.39638 32.7499V30.7499C4.28293 30.7499 4.19609 30.6478 4.21466 30.5355L2.24146 30.2092ZM4.39638 32.7499C4.7294 32.7499 5.01194 32.6633 5.22506 32.5755L4.46319 30.7263C4.39506 30.7544 4.38061 30.7499 4.39638 30.7499V32.7499ZM5.23882 30.7321C5.15505 30.6961 5.11458 30.6141 5.12756 30.5358L3.15445 30.2089C2.98292 31.2444 3.56683 32.1906 4.44943 32.5697L5.23882 30.7321Z"
                                        fill="url(#paint19_linear_7679_38515)"
                                        mask="url(#path-11-inside-1_7679_38515)"
                                    />
                                    <path
                                        d="M12.6429 30.9406L9.53737 21.625H8.625L11.73 30.9406C11.8914 31.4238 12.3437 31.75 12.8533 31.75C13.0198 31.75 13.1756 31.7123 13.3185 31.651C13.0074 31.5222 12.7538 31.2736 12.6429 30.9406Z"
                                        fill="url(#paint20_linear_7679_38515)"
                                    />
                                    <path
                                        d="M16.5 10.375V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C19.7406 18.25 21 16.9906 21 15.4375C21 14.5206 20.5545 13.7134 19.875 13.2004V10.375H16.5Z"
                                        fill="url(#paint21_linear_7679_38515)"
                                    />
                                    <path
                                        d="M19.875 1.9375C19.875 1.00544 19.1196 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H19.875V1.9375Z"
                                        fill="url(#paint22_linear_7679_38515)"
                                    />
                                    <path
                                        d="M16.5 15.4375C16.5 14.5206 16.9455 13.7134 17.625 13.2004V10.375H16.5V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C18.3804 18.25 18.5683 18.2303 18.75 18.1932C17.4664 17.9327 16.5 16.7982 16.5 15.4375Z"
                                        fill="url(#paint23_linear_7679_38515)"
                                    />
                                    <path
                                        d="M18.75 0.3535C18.5734 0.2905 18.3861 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H17.625V1.9375C17.625 1.204 18.0958 0.585813 18.75 0.3535Z"
                                        fill="url(#paint24_linear_7679_38515)"
                                    />
                                    <path
                                        d="M18.1875 16.5625C17.5659 16.5625 17.0625 16.0591 17.0625 15.4375C17.0625 14.8159 17.5659 14.3125 18.1875 14.3125C18.8091 14.3125 19.3125 14.8159 19.3125 15.4375C19.3125 16.0591 18.8091 16.5625 18.1875 16.5625Z"
                                        fill="url(#paint25_linear_7679_38515)"
                                    />
                                    <path
                                        d="M21 9.25H23.25V10.375H21V9.25Z"
                                        fill="url(#paint26_linear_7679_38515)"
                                    />
                                    <path
                                        d="M21 11.5H23.25V12.625H21V11.5Z"
                                        fill="url(#paint27_linear_7679_38515)"
                                    />
                                    <path
                                        d="M21 7H23.25V8.125H21V7Z"
                                        fill="url(#paint28_linear_7679_38515)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_38515"
                                            x1="4.99038"
                                            y1="15.3639"
                                            x2="12.2272"
                                            y2="15.3649"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_38515"
                                            x1="4.99038"
                                            y1="15.3639"
                                            x2="12.2272"
                                            y2="15.3649"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_38515"
                                            x1="5.20195"
                                            y1="15.9213"
                                            x2="6.54136"
                                            y2="15.9213"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_38515"
                                            x1="5.20195"
                                            y1="15.9213"
                                            x2="6.54136"
                                            y2="15.9213"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint4_linear_7679_38515"
                                            x1="5.59615"
                                            y1="8.34043"
                                            x2="11.6268"
                                            y2="8.3414"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint5_linear_7679_38515"
                                            x1="5.59615"
                                            y1="8.34043"
                                            x2="11.6268"
                                            y2="8.3414"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint6_linear_7679_38515"
                                            x1="5.59615"
                                            y1="6.54521"
                                            x2="11.6268"
                                            y2="6.54717"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint7_linear_7679_38515"
                                            x1="5.66106"
                                            y1="8.34043"
                                            x2="9.88253"
                                            y2="8.34091"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint8_linear_7679_38515"
                                            x1="5.66106"
                                            y1="6.54521"
                                            x2="9.88253"
                                            y2="6.54617"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint9_linear_7679_38515"
                                            x1="5.66106"
                                            y1="6.54521"
                                            x2="9.88253"
                                            y2="6.54617"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint10_linear_7679_38515"
                                            x1="0.490385"
                                            y1="11.8112"
                                            x2="7.72719"
                                            y2="11.8147"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint11_linear_7679_38515"
                                            x1="0.490385"
                                            y1="11.8112"
                                            x2="7.72719"
                                            y2="11.8147"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint12_linear_7679_38515"
                                            x1="7.41346"
                                            y1="13.3431"
                                            x2="9.82573"
                                            y2="13.3439"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint13_linear_7679_38515"
                                            x1="7.41346"
                                            y1="13.3431"
                                            x2="9.82573"
                                            y2="13.3439"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint14_linear_7679_38515"
                                            x1="3.11765"
                                            y1="13.9491"
                                            x2="6.48029"
                                            y2="13.9494"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint15_linear_7679_38515"
                                            x1="3.11765"
                                            y1="13.9491"
                                            x2="6.48029"
                                            y2="13.9494"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint16_linear_7679_38515"
                                            x1="2.79556"
                                            y1="26.8461"
                                            x2="14.4014"
                                            y2="26.8476"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint17_linear_7679_38515"
                                            x1="2.79556"
                                            y1="26.8461"
                                            x2="14.4014"
                                            y2="26.8476"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint18_linear_7679_38515"
                                            x1="3.09843"
                                            y1="26.8458"
                                            x2="6.26194"
                                            y2="26.8459"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint19_linear_7679_38515"
                                            x1="3.09843"
                                            y1="26.8458"
                                            x2="6.26194"
                                            y2="26.8459"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint20_linear_7679_38515"
                                            x1="8.44448"
                                            y1="28.0878"
                                            x2="13.4765"
                                            y2="28.0881"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint21_linear_7679_38515"
                                            x1="15.1587"
                                            y1="15.4016"
                                            x2="21.1893"
                                            y2="15.4023"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint22_linear_7679_38515"
                                            x1="16.3702"
                                            y1="6.71277"
                                            x2="19.9886"
                                            y2="6.71296"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint23_linear_7679_38515"
                                            x1="15.2452"
                                            y1="15.4016"
                                            x2="18.8636"
                                            y2="15.4018"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint24_linear_7679_38515"
                                            x1="16.4135"
                                            y1="6.71277"
                                            x2="18.8257"
                                            y2="6.71286"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint25_linear_7679_38515"
                                            x1="16.976"
                                            y1="15.7487"
                                            x2="19.3882"
                                            y2="15.7491"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint26_linear_7679_38515"
                                            x1="20.9135"
                                            y1="9.96809"
                                            x2="23.3257"
                                            y2="9.96887"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint27_linear_7679_38515"
                                            x1="20.9135"
                                            y1="12.2181"
                                            x2="23.3257"
                                            y2="12.2189"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint28_linear_7679_38515"
                                            x1="20.9135"
                                            y1="7.71809"
                                            x2="23.3257"
                                            y2="7.71887"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 32"
                                    fill="none"
                                >
                                    <path
                                        d="M11.5 17.6909H5.75V12.625C5.75 11.6586 6.53358 10.875 7.5 10.875H9.75C10.7164 10.875 11.5 11.6586 11.5 12.625V17.6909Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M5.75 12.6239C5.75 12.5554 5.75524 12.4869 5.76518 12.418H5.88395C5.87813 12.4853 5.875 12.5539 5.875 12.6239V17.6898H5.75V12.6239Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M8.625 9.475C7.56899 9.475 6.7125 8.61851 6.7125 7.5625C6.7125 6.50649 7.56899 5.65 8.625 5.65C9.68101 5.65 10.5375 6.50649 10.5375 7.5625C10.5375 8.61851 9.68101 9.475 8.625 9.475Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M5.8125 7.5625C5.8125 6.00944 7.07194 4.75 8.625 4.75C10.1781 4.75 11.4375 6.00944 11.4375 7.5625H5.8125Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M8.0625 7.5625C8.0625 6.40994 8.75775 5.42162 9.75 4.98737C9.40519 4.83662 9.0255 4.75 8.625 4.75C7.07194 4.75 5.8125 6.00944 5.8125 7.5625C5.8125 9.11556 7.07194 10.375 8.625 10.375C9.0255 10.375 9.40519 10.2884 9.75 10.1376C8.75775 9.70337 8.0625 8.71506 8.0625 7.5625Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M6.36672 7.0625C6.58689 6.06407 7.45253 5.30757 8.50351 5.25314C8.03189 5.73617 7.70629 6.36285 7.60008 7.0625H6.36672Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M7 12.125H1.875C1.52958 12.125 1.25 11.8454 1.25 11.5C1.25 11.1546 1.52958 10.875 1.875 10.875H7V12.125Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M8 13.125H9.25V13.25H8V13.125Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M3.76049 11.723L3.76049 11.723L4.64643 14.9799C4.64643 14.9799 4.64643 14.9799 4.64643 14.9799C4.73707 15.3131 5.08043 15.5096 5.41353 15.419L3.76049 11.723ZM3.76049 11.723C3.66986 11.3899 3.86639 11.0464 4.19959 10.9558M3.76049 11.723L4.19959 10.9558M4.19959 10.9558C4.53272 10.8652 4.87616 11.0617 4.96681 11.3949M4.19959 10.9558L4.96681 11.3949M4.96681 11.3949C4.96681 11.3949 4.96681 11.3949 4.96681 11.3949M4.96681 11.3949L4.96681 11.3949M4.96681 11.3949L5.85263 14.6514C5.85264 14.6514 5.85265 14.6514 5.85266 14.6515C5.94302 14.985 5.74611 15.3284 5.41365 15.419L4.96681 11.3949Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M9.09903 21.4674L8.62469 20.0442L8.15034 21.4674L5.04546 30.7826C4.95208 31.0621 4.6906 31.2505 4.39638 31.2505C3.97429 31.2505 3.65251 30.8715 3.72134 30.4541C3.72135 30.454 3.72136 30.4539 3.72137 30.4539L5.67354 18.6914H11.5758L13.5275 30.4547L13.5275 30.4549C13.5967 30.8713 13.2754 31.2505 12.853 31.2505C12.5588 31.2505 12.2973 31.0621 12.2039 30.7826L9.09903 21.4674Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <mask id="path-11-inside-1_6646_36793" fill="white">
                                        <path d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z" />
                                    </mask>
                                    <path
                                        d="M4.141 30.3723L6.16263 18.1914H5.24969L3.22806 30.3723C3.10881 31.0935 3.66513 31.7499 4.39638 31.7499C4.555 31.7499 4.7035 31.7088 4.84413 31.6509C4.36094 31.4433 4.04875 30.9292 4.141 30.3723Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M4.141 30.3723L3.1545 30.2086L3.15445 30.2089L4.141 30.3723ZM6.16263 18.1914L7.14913 18.3551L7.34227 17.1914H6.16263V18.1914ZM5.24969 18.1914V17.1914H4.40198L4.26318 18.0277L5.24969 18.1914ZM3.22806 30.3723L2.24156 30.2086L2.24146 30.2092L3.22806 30.3723ZM4.84413 31.6509L5.22506 32.5755L7.42253 31.6701L5.23882 30.7321L4.84413 31.6509ZM5.12751 30.5361L7.14913 18.3551L5.17612 18.0277L3.1545 30.2086L5.12751 30.5361ZM6.16263 17.1914H5.24969V19.1914H6.16263V17.1914ZM4.26318 18.0277L2.24156 30.2086L4.21457 30.5361L6.23619 18.3551L4.26318 18.0277ZM2.24146 30.2092C2.02154 31.5391 3.04732 32.7499 4.39638 32.7499V30.7499C4.28293 30.7499 4.19609 30.6478 4.21466 30.5355L2.24146 30.2092ZM4.39638 32.7499C4.7294 32.7499 5.01194 32.6633 5.22506 32.5755L4.46319 30.7263C4.39506 30.7544 4.38061 30.7499 4.39638 30.7499V32.7499ZM5.23882 30.7321C5.15505 30.6961 5.11458 30.6141 5.12756 30.5358L3.15445 30.2089C2.98292 31.2444 3.56683 32.1906 4.44943 32.5697L5.23882 30.7321Z"
                                        fill="#D4D4D4"
                                        mask="url(#path-11-inside-1_6646_36793)"
                                    />
                                    <path
                                        d="M12.6429 30.9406L9.53737 21.625H8.625L11.73 30.9406C11.8914 31.4238 12.3437 31.75 12.8533 31.75C13.0198 31.75 13.1756 31.7123 13.3185 31.651C13.0074 31.5222 12.7538 31.2736 12.6429 30.9406Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M16.5 10.375V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C19.7406 18.25 21 16.9906 21 15.4375C21 14.5206 20.5545 13.7134 19.875 13.2004V10.375H16.5Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M19.875 1.9375C19.875 1.00544 19.1196 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H19.875V1.9375Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M16.5 15.4375C16.5 14.5206 16.9455 13.7134 17.625 13.2004V10.375H16.5V13.2004C15.8205 13.714 15.375 14.5206 15.375 15.4375C15.375 16.9906 16.6344 18.25 18.1875 18.25C18.3804 18.25 18.5683 18.2303 18.75 18.1932C17.4664 17.9327 16.5 16.7982 16.5 15.4375Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M18.75 0.3535C18.5734 0.2905 18.3861 0.25 18.1875 0.25C17.2554 0.25 16.5 1.00544 16.5 1.9375V10.375H17.625V1.9375C17.625 1.204 18.0958 0.585813 18.75 0.3535Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M18.1875 16.5625C17.5659 16.5625 17.0625 16.0591 17.0625 15.4375C17.0625 14.8159 17.5659 14.3125 18.1875 14.3125C18.8091 14.3125 19.3125 14.8159 19.3125 15.4375C19.3125 16.0591 18.8091 16.5625 18.1875 16.5625Z"
                                        fill="#D4D4D4"
                                    />
                                    <path d="M21 9.25H23.25V10.375H21V9.25Z" fill="#D4D4D4" />
                                    <path d="M21 11.5H23.25V12.625H21V11.5Z" fill="#D4D4D4" />
                                    <path d="M21 7H23.25V8.125H21V7Z" fill="#D4D4D4" />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Warmup" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                WARMUP
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Hiit")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Hiit" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                >
                                    <path
                                        d="M16.292 30.8867C16.3203 30.9689 16.3496 31.0507 16.3798 31.132H0.622641C0.555087 31.132 0.5 31.0769 0.5 31.0094C0.5 30.9418 0.555087 30.8867 0.622641 30.8867H16.292Z"
                                        fill="url(#paint0_linear_7679_37997)"
                                        stroke="url(#paint1_linear_7679_37997)"
                                    />
                                    <path
                                        d="M15.8256 29.0195C15.8386 29.1016 15.8525 29.1834 15.8673 29.2648H0.622641C0.555085 29.2648 0.5 29.2097 0.5 29.1422C0.5 29.0746 0.555085 29.0195 0.622641 29.0195H15.8256Z"
                                        fill="url(#paint2_linear_7679_37997)"
                                        stroke="url(#paint3_linear_7679_37997)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.16396 28.5189C4.6044 23.9496 10.9295 12.3031 10.9295 12.3031L11.5064 6.81734C11.5359 6.53372 11.662 6.2691 11.8635 6.06737C12.8724 5.05744 16.0498 1.87575 17.1559 0.768067C17.4523 0.471067 17.9124 0.414406 18.272 0.630463C18.2723 0.630463 18.6661 1.00841 18.7085 1.27832C18.7508 1.54792 18.6714 1.82251 18.4918 2.02829C17.2524 3.44698 14.0427 7.00288 14.0427 7.00288L13.7314 11.056L18.2446 14.0692C18.3467 14.1374 18.4264 14.2345 18.4737 14.3479L19.7561 17.4303C19.8853 17.7403 19.8834 18.0896 19.7511 18.3985L19.049 20.0394C18.4865 20.64 17.9927 21.3059 17.5812 22.0247C17.4856 22.0188 17.3875 21.9976 17.2895 21.9597C16.8489 21.7747 16.6566 21.3174 16.8116 20.8903L17.6715 18.5227C17.7387 18.3368 17.7141 18.1298 17.6045 17.9651L17.0871 17.188C16.9679 17.009 16.7649 16.9041 16.5501 16.9107C16.3353 16.9169 16.1388 17.0339 16.0305 17.2195L14.354 20.098C14.354 20.098 16.1261 21.4229 17.4106 22.3348C16.8988 23.3021 16.5323 24.3584 16.3409 25.4738C16.2107 25.1756 16.1024 24.9241 16.0271 24.7422C15.9536 24.5657 15.8029 24.4325 15.6186 24.3811C14.6865 24.1218 12.4039 23.3136 10.7094 22.704C10.4715 22.6184 10.2057 22.7224 10.0506 22.9219L3.94222 30.7878C3.70686 31.0907 3.35849 31.2853 2.97744 31.3264C2.59607 31.3678 2.21439 31.252 1.91988 31.0063L1.81497 30.9188C1.64499 30.7769 1.53073 30.5895 1.47843 30.3868C1.42582 30.1844 1.43516 29.9668 1.51174 29.7642C1.52668 29.7249 1.54412 29.6863 1.56404 29.6483C1.71939 29.3532 1.92268 28.9706 2.16396 28.5189Z"
                                        fill="url(#paint4_linear_7679_37997)"
                                    />
                                    <path
                                        d="M5.68433 18.2451C6.02709 18.2195 6.28455 17.9207 6.25902 17.5779C6.04639 14.7247 6.73223 12.2742 8.31094 10.2208L5.68433 18.2451ZM5.68433 18.2451C5.34156 18.2709 5.04269 18.0131 5.01717 17.6707L5.68433 18.2451ZM5.76041 17.6151C5.76541 17.6824 5.7146 17.7414 5.64719 17.7464L5.64674 17.7465C5.57999 17.7515 5.52081 17.7009 5.51578 17.6335L5.51578 17.6335C5.28656 14.5596 6.03926 11.9528 7.72007 9.76661L5.76041 17.6151ZM7.91454 9.91603C6.2531 12.0771 5.53963 14.6525 5.7604 17.615L7.89213 9.74407C7.94569 9.78528 7.95572 9.8625 7.91461 9.91594L7.91454 9.91603ZM7.72013 9.76654C7.76133 9.71304 7.83853 9.70296 7.89207 9.74402L7.72013 9.76654ZM5.01721 17.6707H5.0172H5.01721Z"
                                        fill="url(#paint5_linear_7679_37997)"
                                        stroke="url(#paint6_linear_7679_37997)"
                                    />
                                    <path
                                        d="M3.88998 16.665L3.88995 16.6648C3.66189 15.531 3.69316 14.3109 3.87379 13.2309C4.05317 12.1583 4.38818 11.1751 4.80655 10.5295C4.84342 10.4725 4.82692 10.3963 4.77042 10.3597L4.7701 10.3595C4.71373 10.3229 4.63748 10.3391 4.60083 10.3956L3.88998 16.665ZM3.88998 16.665C3.90324 16.7308 3.8603 16.7958 3.79385 16.8092L3.8926 17.2994L3.79428 16.8091C3.7275 16.8225 3.66285 16.779 3.6497 16.7133L3.64962 16.7129M3.88998 16.665L3.64962 16.7129M3.64962 16.7129C3.41662 15.5547 3.45385 14.277 3.65634 13.1243M3.64962 16.7129L3.65634 13.1243M3.65634 13.1243C3.85996 11.9652 4.22214 10.9801 4.60081 10.3956L3.65634 13.1243Z"
                                        fill="url(#paint7_linear_7679_37997)"
                                        stroke="url(#paint8_linear_7679_37997)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M26.7733 28.6101C27.3465 29.1232 27.7073 29.8688 27.7073 30.6978C27.7073 32.2441 26.4517 33.4997 24.9054 33.4997C23.3591 33.4997 22.1035 32.2441 22.1035 30.6978C22.1035 29.8688 22.4643 29.1232 23.0375 28.6101V22.2922C23.0375 21.9618 23.1685 21.6452 23.4023 21.4117C23.6358 21.1779 23.9524 21.0469 24.2828 21.0469H25.528C25.8584 21.0469 26.175 21.1779 26.4085 21.4117C26.6423 21.6452 26.7733 21.9618 26.7733 22.2922V28.6101Z"
                                        fill="url(#paint9_linear_7679_37997)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M29.2638 25.7179H28.6411C28.4089 25.7179 28.1959 25.5887 28.0888 25.3829C27.9818 25.1768 27.9979 24.9284 28.1312 24.7381L30.3104 21.6249C30.4269 21.4584 30.6171 21.3594 30.8204 21.3594C31.0237 21.3594 31.2139 21.4584 31.3303 21.6249L33.5096 24.7381C33.6428 24.9284 33.659 25.1768 33.5519 25.3829C33.4448 25.5887 33.2319 25.7179 32.9996 25.7179H32.377V30.0764C32.377 30.4204 32.0983 30.699 31.7543 30.699H29.8864C29.5424 30.699 29.2638 30.4204 29.2638 30.0764V25.7179Z"
                                        fill="url(#paint10_linear_7679_37997)"
                                    />
                                    <path
                                        d="M17.1562 13.5741C18.8756 13.5741 20.2694 12.1802 20.2694 10.4609C20.2694 8.74149 18.8756 7.34766 17.1562 7.34766C15.4368 7.34766 14.043 8.74149 14.043 10.4609C14.043 12.1802 15.4368 13.5741 17.1562 13.5741Z"
                                        fill="url(#paint11_linear_7679_37997)"
                                    />
                                    <path
                                        d="M24.9052 32.2538C25.7649 32.2538 26.4618 31.5569 26.4618 30.6972C26.4618 29.8375 25.7649 29.1406 24.9052 29.1406C24.0455 29.1406 23.3486 29.8375 23.3486 30.6972C23.3486 31.5569 24.0455 32.2538 24.9052 32.2538Z"
                                        fill="url(#paint12_linear_7679_37997)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M24.2832 22.9156C24.2832 22.5719 24.5621 22.293 24.9058 22.293C25.2495 22.293 25.5285 22.5719 25.5285 22.9156V29.7647C25.5285 30.1084 25.2495 30.3873 24.9058 30.3873C24.5621 30.3873 24.2832 30.1084 24.2832 29.7647V22.9156Z"
                                        fill="url(#paint13_linear_7679_37997)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_37997"
                                            x1="-0.658695"
                                            y1="31.1816"
                                            x2="17.7024"
                                            y2="31.2225"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_37997"
                                            x1="-0.658695"
                                            y1="31.1816"
                                            x2="17.7024"
                                            y2="31.2225"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_37997"
                                            x1="-0.633992"
                                            y1="29.3144"
                                            x2="17.0385"
                                            y2="29.3523"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_37997"
                                            x1="-0.633992"
                                            y1="29.3144"
                                            x2="17.0385"
                                            y2="29.3523"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint4_linear_7679_37997"
                                            x1="0.737376"
                                            y1="20.1817"
                                            x2="20.4712"
                                            y2="20.1836"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint5_linear_7679_37997"
                                            x1="4.84234"
                                            y1="14.9814"
                                            x2="8.55654"
                                            y2="14.9816"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint6_linear_7679_37997"
                                            x1="4.84234"
                                            y1="14.9814"
                                            x2="8.55654"
                                            y2="14.9816"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint7_linear_7679_37997"
                                            x1="2.89937"
                                            y1="14.6091"
                                            x2="5.40496"
                                            y2="14.6092"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint8_linear_7679_37997"
                                            x1="2.89937"
                                            y1="14.6091"
                                            x2="5.40496"
                                            y2="14.6092"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint9_linear_7679_37997"
                                            x1="21.888"
                                            y1="28.9955"
                                            x2="27.8959"
                                            y2="28.9959"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint10_linear_7679_37997"
                                            x1="27.803"
                                            y1="27.3208"
                                            x2="33.8108"
                                            y2="27.3214"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint11_linear_7679_37997"
                                            x1="13.8035"
                                            y1="11.322"
                                            x2="20.4789"
                                            y2="11.323"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint12_linear_7679_37997"
                                            x1="23.2289"
                                            y1="31.1278"
                                            x2="26.5666"
                                            y2="31.1283"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint13_linear_7679_37997"
                                            x1="24.2353"
                                            y1="27.4596"
                                            x2="25.5704"
                                            y2="27.4596"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                >
                                    <path
                                        d="M16.292 30.8867C16.3203 30.9689 16.3496 31.0507 16.3798 31.132H0.622641C0.555087 31.132 0.5 31.0769 0.5 31.0094C0.5 30.9418 0.555087 30.8867 0.622641 30.8867H16.292Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M15.8256 29.0195C15.8386 29.1016 15.8525 29.1834 15.8673 29.2648H0.622641C0.555085 29.2648 0.5 29.2097 0.5 29.1422C0.5 29.0746 0.555085 29.0195 0.622641 29.0195H15.8256Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.16396 28.5189C4.6044 23.9496 10.9295 12.3031 10.9295 12.3031L11.5064 6.81734C11.5359 6.53372 11.662 6.2691 11.8635 6.06737C12.8724 5.05744 16.0498 1.87575 17.1559 0.768067C17.4523 0.471067 17.9124 0.414406 18.272 0.630463C18.2723 0.630463 18.6661 1.00841 18.7085 1.27832C18.7508 1.54792 18.6714 1.82251 18.4918 2.02829C17.2524 3.44698 14.0427 7.00288 14.0427 7.00288L13.7314 11.056L18.2446 14.0692C18.3467 14.1374 18.4264 14.2345 18.4737 14.3479L19.7561 17.4303C19.8853 17.7403 19.8834 18.0896 19.7511 18.3985L19.049 20.0394C18.4865 20.64 17.9927 21.3059 17.5812 22.0247C17.4856 22.0188 17.3875 21.9976 17.2895 21.9597C16.8489 21.7747 16.6566 21.3174 16.8116 20.8903L17.6715 18.5227C17.7387 18.3368 17.7141 18.1298 17.6045 17.9651L17.0871 17.188C16.9679 17.009 16.7649 16.9041 16.5501 16.9107C16.3353 16.9169 16.1388 17.0339 16.0305 17.2195L14.354 20.098C14.354 20.098 16.1261 21.4229 17.4106 22.3348C16.8988 23.3021 16.5323 24.3584 16.3409 25.4738C16.2107 25.1756 16.1024 24.9241 16.0271 24.7422C15.9536 24.5657 15.8029 24.4325 15.6186 24.3811C14.6865 24.1218 12.4039 23.3136 10.7094 22.704C10.4715 22.6184 10.2057 22.7224 10.0506 22.9219L3.94222 30.7878C3.70686 31.0907 3.35849 31.2853 2.97744 31.3264C2.59607 31.3678 2.21439 31.252 1.91988 31.0063L1.81497 30.9188C1.64499 30.7769 1.53073 30.5895 1.47843 30.3868C1.42582 30.1844 1.43516 29.9668 1.51174 29.7642C1.52668 29.7249 1.54412 29.6863 1.56404 29.6483C1.71939 29.3532 1.92268 28.9706 2.16396 28.5189Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M5.68433 18.2451C6.02709 18.2195 6.28455 17.9207 6.25902 17.5779C6.04639 14.7247 6.73223 12.2742 8.31094 10.2208L5.68433 18.2451ZM5.68433 18.2451C5.34156 18.2709 5.04269 18.0131 5.01717 17.6707L5.68433 18.2451ZM5.76041 17.6151C5.76541 17.6824 5.7146 17.7414 5.64719 17.7464L5.64674 17.7465C5.57999 17.7515 5.52081 17.7009 5.51578 17.6335L5.51578 17.6335C5.28656 14.5596 6.03926 11.9528 7.72007 9.76661L5.76041 17.6151ZM7.91454 9.91603C6.2531 12.0771 5.53963 14.6525 5.7604 17.615L7.89213 9.74407C7.94569 9.78528 7.95572 9.8625 7.91461 9.91594L7.91454 9.91603ZM7.72013 9.76654C7.76133 9.71304 7.83853 9.70296 7.89207 9.74402L7.72013 9.76654ZM5.01721 17.6707H5.0172H5.01721Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M3.88998 16.665L3.88995 16.6648C3.66189 15.531 3.69316 14.3109 3.87379 13.2309C4.05317 12.1583 4.38818 11.1751 4.80655 10.5295C4.84342 10.4725 4.82692 10.3963 4.77042 10.3597L4.7701 10.3595C4.71373 10.3229 4.63748 10.3391 4.60083 10.3956L3.88998 16.665ZM3.88998 16.665C3.90324 16.7308 3.8603 16.7958 3.79385 16.8092L3.8926 17.2994L3.79428 16.8091C3.7275 16.8225 3.66285 16.779 3.6497 16.7133L3.64962 16.7129M3.88998 16.665L3.64962 16.7129M3.64962 16.7129C3.41662 15.5547 3.45385 14.277 3.65634 13.1243M3.64962 16.7129L3.65634 13.1243M3.65634 13.1243C3.85996 11.9652 4.22214 10.9801 4.60081 10.3956L3.65634 13.1243Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M26.7733 28.6101C27.3465 29.1232 27.7073 29.8688 27.7073 30.6978C27.7073 32.2441 26.4517 33.4997 24.9054 33.4997C23.3591 33.4997 22.1035 32.2441 22.1035 30.6978C22.1035 29.8688 22.4643 29.1232 23.0375 28.6101V22.2922C23.0375 21.9618 23.1685 21.6452 23.4023 21.4117C23.6358 21.1779 23.9524 21.0469 24.2828 21.0469H25.528C25.8584 21.0469 26.175 21.1779 26.4085 21.4117C26.6423 21.6452 26.7733 21.9618 26.7733 22.2922V28.6101Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M29.2638 25.7179H28.6411C28.4089 25.7179 28.1959 25.5887 28.0888 25.3829C27.9818 25.1768 27.9979 24.9284 28.1312 24.7381L30.3104 21.6249C30.4269 21.4584 30.6171 21.3594 30.8204 21.3594C31.0237 21.3594 31.2139 21.4584 31.3303 21.6249L33.5096 24.7381C33.6428 24.9284 33.659 25.1768 33.5519 25.3829C33.4448 25.5887 33.2319 25.7179 32.9996 25.7179H32.377V30.0764C32.377 30.4204 32.0983 30.699 31.7543 30.699H29.8864C29.5424 30.699 29.2638 30.4204 29.2638 30.0764V25.7179Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M17.1562 13.5741C18.8756 13.5741 20.2694 12.1802 20.2694 10.4609C20.2694 8.74149 18.8756 7.34766 17.1562 7.34766C15.4368 7.34766 14.043 8.74149 14.043 10.4609C14.043 12.1802 15.4368 13.5741 17.1562 13.5741Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        d="M24.9052 32.2538C25.7649 32.2538 26.4618 31.5569 26.4618 30.6972C26.4618 29.8375 25.7649 29.1406 24.9052 29.1406C24.0455 29.1406 23.3486 29.8375 23.3486 30.6972C23.3486 31.5569 24.0455 32.2538 24.9052 32.2538Z"
                                        fill="#D4D4D4"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M24.2832 22.9156C24.2832 22.5719 24.5621 22.293 24.9058 22.293C25.2495 22.293 25.5285 22.5719 25.5285 22.9156V29.7647C25.5285 30.1084 25.2495 30.3873 24.9058 30.3873C24.5621 30.3873 24.2832 30.1084 24.2832 29.7647V22.9156Z"
                                        fill="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Hiit" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                HIIT
                            </span>
                        </div>
                    </div>
                    <div
                        className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer`}
                    >
                        <div
                            onClick={() => setSingleCategory("Pilates")}
                            className="flex flex-col items-center justify-center"
                        >
                            {SingleCategory === "Pilates" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 29 36"
                                    fill="none"
                                >
                                    <path
                                        d="M28.3264 13.1545L28.3155 13.1295C28.0939 12.6239 27.5289 12.3607 26.9944 12.5158C26.9941 12.5159 26.9939 12.516 26.9936 12.516L22.8469 13.739L22.5435 13.8284L22.3327 13.5925L18.6697 9.49368L28.3264 13.1545ZM28.3264 13.1545L28.3293 13.1718L28.3429 13.2113C28.541 13.7864 28.2376 14.4088 27.662 14.6075C27.6618 14.6076 27.6616 14.6077 27.6614 14.6077L23.0513 16.1819C23.0511 16.182 23.0508 16.1821 23.0506 16.1821C21.9565 16.5525 20.7519 16.2231 20.0071 15.3476C20.0069 15.3475 20.0068 15.3473 20.0067 15.3472L19.0299 14.1947L18.1484 13.1547V14.518V20.7406V20.8061L18.1653 20.8693L21.5965 33.7506L21.5967 33.7511C21.793 34.4846 21.3651 35.2391 20.6302 35.4466C19.8898 35.6537 19.1256 35.2243 18.919 34.4856L18.9187 34.4844L15.3832 21.9661C15.3829 21.9653 15.3827 21.9644 15.3825 21.9636C15.2952 21.6468 15.0453 21.3835 14.71 21.3025C14.2184 21.1812 13.7214 21.4833 13.5953 21.9677L10.0602 34.4844L10.0601 34.4847C9.85297 35.2202 9.0982 35.6485 8.36442 35.4522L8.36357 35.4519C7.62743 35.2563 7.18554 34.4913 7.38246 33.7503L10.8206 20.8696L10.8375 20.8062V20.7406V14.532V13.1688L9.95608 14.2087L8.97926 15.3613C8.97917 15.3614 8.97909 15.3615 8.97901 15.3616C8.23269 16.239 7.02796 16.5723 5.93698 16.1968L5.93644 16.1966L1.33452 14.6182C1.32582 14.6148 1.31779 14.6117 1.31148 14.6093L1.2868 14.5999C1.27308 14.5945 1.26766 14.592 1.2658 14.5911L1.25546 14.5859L1.2449 14.5812C0.687894 14.3342 0.436131 13.6857 0.677801 13.1289C0.899526 12.6237 1.46426 12.3608 1.99854 12.5158C1.99883 12.5159 1.99912 12.516 1.99941 12.516L6.14607 13.739L6.44984 13.8285L6.66065 13.5922L10.3163 9.49368C10.3164 9.49353 10.3165 9.49338 10.3167 9.49323C10.7631 8.99489 11.4008 8.71094 12.0672 8.71094H16.9188C17.5916 8.71094 18.2225 8.99444 18.6694 9.49333L28.3264 13.1545Z"
                                        fill="url(#paint0_linear_7679_35824)"
                                        stroke="url(#paint1_linear_7679_35824)"
                                    />
                                    <path
                                        d="M17.5301 3.69844C17.5301 5.48715 16.1519 6.89687 14.5004 6.89687C12.8489 6.89687 11.4707 5.48715 11.4707 3.69844C11.4707 1.90973 12.8489 0.5 14.5004 0.5C16.1519 0.5 17.5301 1.90973 17.5301 3.69844Z"
                                        fill="url(#paint2_linear_7679_35824)"
                                        stroke="url(#paint3_linear_7679_35824)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_7679_35824"
                                            x1="-1.02244"
                                            y1="25.9486"
                                            x2="29.8736"
                                            y2="25.9538"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_7679_35824"
                                            x1="-1.02244"
                                            y1="25.9486"
                                            x2="29.8736"
                                            y2="25.9538"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_7679_35824"
                                            x1="10.6992"
                                            y1="4.72141"
                                            x2="18.2677"
                                            y2="4.72258"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_7679_35824"
                                            x1="10.6992"
                                            y1="4.72141"
                                            x2="18.2677"
                                            y2="4.72258"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#F43F5E" />
                                            <stop offset="1" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 29 36"
                                    fill="none"
                                >
                                    <path
                                        d="M28.3264 13.1545L28.3155 13.1295C28.0939 12.6239 27.5289 12.3607 26.9944 12.5158C26.9941 12.5159 26.9939 12.516 26.9936 12.516L22.8469 13.739L22.5435 13.8284L22.3327 13.5925L18.6697 9.49368L28.3264 13.1545ZM28.3264 13.1545L28.3293 13.1718L28.3429 13.2113C28.541 13.7864 28.2376 14.4088 27.662 14.6075C27.6618 14.6076 27.6616 14.6077 27.6614 14.6077L23.0513 16.1819C23.0511 16.182 23.0508 16.1821 23.0506 16.1821C21.9565 16.5525 20.7519 16.2231 20.0071 15.3476C20.0069 15.3475 20.0068 15.3473 20.0067 15.3472L19.0299 14.1947L18.1484 13.1547V14.518V20.7406V20.8061L18.1653 20.8693L21.5965 33.7506L21.5967 33.7511C21.793 34.4846 21.3651 35.2391 20.6302 35.4466C19.8898 35.6537 19.1256 35.2243 18.919 34.4856L18.9187 34.4844L15.3832 21.9661C15.3829 21.9653 15.3827 21.9644 15.3825 21.9636C15.2952 21.6468 15.0453 21.3835 14.71 21.3025C14.2184 21.1812 13.7214 21.4833 13.5953 21.9677L10.0602 34.4844L10.0601 34.4847C9.85297 35.2202 9.0982 35.6485 8.36442 35.4522L8.36357 35.4519C7.62743 35.2563 7.18554 34.4913 7.38246 33.7503L10.8206 20.8696L10.8375 20.8062V20.7406V14.532V13.1688L9.95608 14.2087L8.97926 15.3613C8.97917 15.3614 8.97909 15.3615 8.97901 15.3616C8.23269 16.239 7.02796 16.5723 5.93698 16.1968L5.93644 16.1966L1.33452 14.6182C1.32582 14.6148 1.31779 14.6117 1.31148 14.6093L1.2868 14.5999C1.27308 14.5945 1.26766 14.592 1.2658 14.5911L1.25546 14.5859L1.2449 14.5812C0.687894 14.3342 0.436131 13.6857 0.677801 13.1289C0.899526 12.6237 1.46426 12.3608 1.99854 12.5158C1.99883 12.5159 1.99912 12.516 1.99941 12.516L6.14607 13.739L6.44984 13.8285L6.66065 13.5922L10.3163 9.49368C10.3164 9.49353 10.3165 9.49338 10.3167 9.49323C10.7631 8.99489 11.4008 8.71094 12.0672 8.71094H16.9188C17.5916 8.71094 18.2225 8.99444 18.6694 9.49333L28.3264 13.1545Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                    <path
                                        d="M17.5301 3.69844C17.5301 5.48715 16.1519 6.89687 14.5004 6.89687C12.8489 6.89687 11.4707 5.48715 11.4707 3.69844C11.4707 1.90973 12.8489 0.5 14.5004 0.5C16.1519 0.5 17.5301 1.90973 17.5301 3.69844Z"
                                        fill="#D4D4D4"
                                        stroke="#D4D4D4"
                                    />
                                </svg>
                            )}
                            <span
                                className={`h-[20px] ${SingleCategory === "Pilates" ? "mid-heading activeLinkForMobileFilter" : "text-[#D4D4D4]"} text-[12px] text-[#D4D4D4] font-bold leading-normal`}
                            >
                                PILATES
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
            {/* live session toggle btn */}
            <div className="flex md:hidden full justify-center items-center">
                <div className="flex w-[326px] h-[46px] justify-center items-center gap-3 border-[1px] border-solid border-[#FFF] rounded-[8px]">
                    <label className="inline-flex items-center justify-between w-full gap-2 mx-3 cursor-pointer">
                        <span className="text-[20px] text-[#E5E5E5] font-medium leading-[30px]">
                            5km Distance
                        </span>
                        <input
                            type="checkbox"
                            value=""
                            onChange={(e) => setLiveSession(e.target.checked)}
                            className="sr-only peer w-[60px] h-[32px] "
                        />
                        <div className="relative w-11 h-6 border border-[#FFF] bg-[#171717] peer-checked:after:border-none peer-checked:after:bg-[linear-gradient(90deg,_#f43f5e_3.36%,_#fb923c_96.64%)] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-[#171717] after:border-[#FFF] after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#171717]"></div>
                    </label>
                </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {state?.loading ? (
            <div className="text-center text-white text-2xl font-semibold">
              Loading...
            </div>
          ) : (
            state?.data.map((gym:any) => <GymCard key={gym.placeId} gym={gym} />)
          )}
        </div> */}

            <div className="flex flex-col justify-center items-center mt-10 mb-20">
                <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                    {gymCardsData.map((gym) => (
                        <div key={gym.id}>
                            <GymCard
                                id={gym.id}
                                imageUrl={gym.imageUrl}
                                label={gym.label}
                                name={gym.name}
                                distance={gym.distance}
                                status={gym.status}
                                categories={gym.categories}
                                location={gym.location}
                                rating={gym.rating}
                                reviews={gym.reviews}
                                buttonText={gym.buttonText}
                            />
                        </div>
                    ))}
                </div>
                <button className="primaryButton py-2 px-3 text-[12px] text-[#FFFFFF] font-medium leading-[18px]">View More</button>
            </div>
        </div >
    );
};

export default Gym;

