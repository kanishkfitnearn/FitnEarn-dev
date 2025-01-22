"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "flowbite-react";
import dummy from "../../../../public/blogCardPic.png";
import gymImg from "../../../../public/gymImage.jpg";
import mapBg from "../../../../public/mapBg.png";
import owner from "../../../../public/blogAuthorPic.png";
import CoachAvailability from "@/app/Components/CoachAvailability";
const GymDetails = ({ params }: any) => {
    const Amenities = ["Shower", "Swimming Pool", "Water Cooler", "Waiting Lounge", "AC", "Towels", "Change Room", "Spa", "Water", "WIFI", "Supplements Store", "Locker", "Coffee", "Steam Room", "Childcare", "Equipment", "Smoothies and Bars", "Community", "Cleanliness"];

    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const displayedAmenities = showAll ? Amenities : Amenities.slice(0, 14);

    const handleScroll = (id: string) => {
        const targetDiv = document.getElementById(id);
        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className="pt-[72px] flex flex-col justify-center items-center">
            {/* <h1 className="text-white">Gym Id : ${params.gymId}</h1> */}
            <section className="mt-0 md:mt-6 flex md:flex-col flex-wrap-reverse md:flex-nowrap max-w-[1136px] w-full">
                <div className="hidden md:flex flex-wrap md:flex-nowrap justify-start items-center gap-3 md:gap-4 p-4 md:p-0">
                    <h1 className="text-[24px] md:text-[44px] text-[#FFFFFF] font-bold leading-normal">Gym Name</h1>
                    <div className="flex items-center gap-[14px]">
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#15803D] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Morning</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#8B5CF6] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Afternoon</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#1C64F2] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Evening</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#E3A008] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">All Day</Badge>
                    </div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 md:mb-8">
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 px-4 md:p-0">
                        <div className="flex justify-center items-center gap-2">
                            <h5 className="text-[14px] md:text-[20px] text-[#F5F5F5] font-normal md:font-medium leading-normal">5.0</h5>
                            <div className="flex">
                                {
                                    [1, 2, 3].map((item) => (
                                        <svg key={item} xmlns="http://www.w3.org/2000/svg" className="w-4 md:w-6 h-4 md:h-6" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16.3018 0L6 13.5996H10.3184L6.77271 24L17.612 10.4737H13.1301L16.3018 0Z" fill="url(#paint0_linear_14115_70006)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_14115_70006" x1="5.55338" y1="15.3192" x2="18.0028" y2="15.3201" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F43F5E" />
                                                    <stop offset="1" stopColor="#FB923C" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    ))
                                }
                                {
                                    [4, 5].map((item) => (
                                        <svg key={item} xmlns="http://www.w3.org/2000/svg" className="w-4 md:w-6 h-4 md:h-6" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M13.1301 10.8737H16.7789L7.88775 21.9689L10.697 13.7287L10.8773 13.1996H10.3184H6.80481L15.2713 2.02287L12.7472 10.3577L12.591 10.8737H13.1301Z" stroke="url(#paint0_linear_14115_70003)" stroke-width="0.8" />
                                            <defs>
                                                <linearGradient id="paint0_linear_14115_70003" x1="5.55338" y1="15.3192" x2="18.0028" y2="15.3201" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#F43F5E" />
                                                    <stop offset="1" stopColor="#FB923C" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    ))
                                }
                            </div>
                            <h5 className="text-[14px] md:text-[20px] text-[#A3A3A3] font-normal leading-normal">(378)</h5>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <h5 className="text-[14px] md:text-[16px] text-[#E5E5E5] font-normal leading-normal">Open until 10:00 PM</h5>
                        </div>
                        <h5 className="text-[14px] md:text-[16px] text-[#E5E5E5] font-normal leading-normal">Business Bay, Dubai</h5>
                        <h6 className="mid-heading text-[16px] leading-normal font-semibold">Get directions</h6>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Button className="border-[1px] border-[#F43F5E] rounded-full p-[10px] bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M22.2978 7.76312C21.7698 5.79512 20.2168 4.24412 18.2468 3.71712C16.3168 3.20312 14.2668 3.72512 12.5018 5.15412C11.2138 4.10312 9.78683 3.53412 8.32983 3.50012C6.74683 3.47812 5.26983 4.05712 4.15583 5.16812C2.06183 7.25912 1.60483 11.0351 4.78183 14.2071L11.7918 21.2071C11.9878 21.4021 12.2438 21.5001 12.4998 21.5001C12.7558 21.5001 13.0118 21.4021 13.2078 21.2071L20.2178 14.2071C22.1268 12.3011 22.8848 9.95212 22.2978 7.76312ZM18.8018 12.7931L12.4998 19.0861L6.19783 12.7931C3.84683 10.4441 4.22483 7.92812 5.57183 6.58212C6.22283 5.93212 7.14683 5.50812 8.19483 5.50812C9.31483 5.50812 10.5758 5.99312 11.7908 7.20712C12.1818 7.59812 12.8158 7.59812 13.2068 7.20712C15.5388 4.87912 18.0498 5.26912 19.3948 6.61312C20.1188 7.33712 20.5058 8.29712 20.4868 9.31612C20.4648 10.5131 19.8818 11.7151 18.8018 12.7931Z" fill="#F5F5F5" />
                            </svg>
                        </Button>
                        <Button className="border-[1px] border-[#F43F5E] rounded-full px-5 py-[10px] flex justify-center items-center gap-2 bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M13.4478 10.4705C13.4478 10.0618 13.2906 9.68405 13.0169 9.43419L9.0233 5.78507C8.68939 5.4794 8.25852 5.41415 7.87144 5.61506C7.45073 5.82972 7.18955 6.30024 7.18955 6.84031V7.88524C4.56991 8.12737 2.5 10.7822 2.5 14.0106V15.1517C2.5 15.6841 2.81201 16.1305 3.25931 16.2361C3.32577 16.2507 3.39068 16.2585 3.4548 16.2585C3.81295 16.2585 4.13825 16.0241 4.29934 15.6308C4.86941 14.2424 5.95402 13.3297 7.18955 13.17V14.1016C7.18955 14.6417 7.45073 15.1114 7.87144 15.3277C8.25852 15.5269 8.68861 15.4634 9.02252 15.1586L13.0169 11.5086C13.2906 11.2579 13.4478 10.8792 13.4478 10.4705Z" fill="white" />
                                <path d="M16.9714 9.13625L12.6572 4.88696C12.3342 4.56841 11.8416 4.59932 11.5522 4.95221C11.2637 5.3051 11.2911 5.84861 11.6124 6.16458L15.9274 10.4697L11.5397 14.8383C11.2199 15.1569 11.1957 15.7004 11.4858 16.0515C11.6398 16.2387 11.8525 16.3332 12.0652 16.3332C12.2521 16.3332 12.4406 16.2593 12.5899 16.1108L16.9776 11.7421C17.3108 11.4107 17.5008 10.9359 17.5 10.4379C17.4984 9.94077 17.3061 9.46596 16.9714 9.13625Z" fill="white" />
                            </svg>
                            Share
                        </Button>
                    </div>
                </div>

                {/* gym name section for mobile */}
                <div className="flex md:hidden flex-wrap md:flex-nowrap justify-start items-center gap-3 md:gap-4 p-4 md:p-0">
                    <h1 className="text-[24px] md:text-[44px] text-[#FFFFFF] font-bold leading-normal">Gym Name</h1>
                    <div className="flex items-center gap-[14px]">
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#15803D] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Morning</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#8B5CF6] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Afternoon</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#1C64F2] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Evening</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#E3A008] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">All Day</Badge>
                    </div>
                </div>

                <div className="h-auto md:h-[442px] flex justify-center items-center gap-8">
                    <div className="h-[300px] md:h-full w-[100vw] md:w-[747px] sm:h-64 xl:h-80 2xl:h-96 relative">
                        <Carousel className="h-full" slide={false}>
                            <Image width={747} height={492} className="w-[747px] h-[492px] object-cover" src={gymImg} alt="dummy" />
                            <Image width={747} height={492} className="w-[747px] h-[492px] object-cover" src={gymImg} alt="dummy" />
                            <Image width={747} height={492} className="w-[747px] h-[492px] object-cover" src={gymImg} alt="dummy" />
                            <Image width={747} height={492} className="w-[747px] h-[492px] object-cover" src={gymImg} alt="dummy" />
                            <Image width={747} height={492} className="w-[747px] h-[492px] object-cover" src={gymImg} alt="dummy" />
                        </Carousel>
                        <span className="absolute top-4 left-4 text-[16px] text-[#F5F5F5] font-medium leading-normal">01 / 16</span>
                        {/* like & share btn for mobile */}
                        <div className="flex md:hidden items-center gap-2 absolute top-4 right-4">
                            <Button className="bg-[#171717] border-[1px] border-[#F43F5E] rounded-full p-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 25 25" fill="none">
                                    <path d="M22.2978 7.76312C21.7698 5.79512 20.2168 4.24412 18.2468 3.71712C16.3168 3.20312 14.2668 3.72512 12.5018 5.15412C11.2138 4.10312 9.78683 3.53412 8.32983 3.50012C6.74683 3.47812 5.26983 4.05712 4.15583 5.16812C2.06183 7.25912 1.60483 11.0351 4.78183 14.2071L11.7918 21.2071C11.9878 21.4021 12.2438 21.5001 12.4998 21.5001C12.7558 21.5001 13.0118 21.4021 13.2078 21.2071L20.2178 14.2071C22.1268 12.3011 22.8848 9.95212 22.2978 7.76312ZM18.8018 12.7931L12.4998 19.0861L6.19783 12.7931C3.84683 10.4441 4.22483 7.92812 5.57183 6.58212C6.22283 5.93212 7.14683 5.50812 8.19483 5.50812C9.31483 5.50812 10.5758 5.99312 11.7908 7.20712C12.1818 7.59812 12.8158 7.59812 13.2068 7.20712C15.5388 4.87912 18.0498 5.26912 19.3948 6.61312C20.1188 7.33712 20.5058 8.29712 20.4868 9.31612C20.4648 10.5131 19.8818 11.7151 18.8018 12.7931Z" fill="#F5F5F5" />
                                </svg>
                            </Button>
                            <Button className="bg-[#171717] border-[1px] border-[#F43F5E] rounded-full p-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 21" fill="none">
                                    <path d="M13.4478 10.4705C13.4478 10.0618 13.2906 9.68405 13.0169 9.43419L9.0233 5.78507C8.68939 5.4794 8.25852 5.41415 7.87144 5.61506C7.45073 5.82972 7.18955 6.30024 7.18955 6.84031V7.88524C4.56991 8.12737 2.5 10.7822 2.5 14.0106V15.1517C2.5 15.6841 2.81201 16.1305 3.25931 16.2361C3.32577 16.2507 3.39068 16.2585 3.4548 16.2585C3.81295 16.2585 4.13825 16.0241 4.29934 15.6308C4.86941 14.2424 5.95402 13.3297 7.18955 13.17V14.1016C7.18955 14.6417 7.45073 15.1114 7.87144 15.3277C8.25852 15.5269 8.68861 15.4634 9.02252 15.1586L13.0169 11.5086C13.2906 11.2579 13.4478 10.8792 13.4478 10.4705Z" fill="white" />
                                    <path d="M16.9714 9.13625L12.6572 4.88696C12.3342 4.56841 11.8416 4.59932 11.5522 4.95221C11.2637 5.3051 11.2911 5.84861 11.6124 6.16458L15.9274 10.4697L11.5397 14.8383C11.2199 15.1569 11.1957 15.7004 11.4858 16.0515C11.6398 16.2387 11.8525 16.3332 12.0652 16.3332C12.2521 16.3332 12.4406 16.2593 12.5899 16.1108L16.9776 11.7421C17.3108 11.4107 17.5008 10.9359 17.5 10.4379C17.4984 9.94077 17.3061 9.46596 16.9714 9.13625Z" fill="white" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className="h-[492px] hidden md:flex flex-col justify-center items-center gap-3">
                        <Image width={357} height={153} className="w-[357px] h-[123px]" src={dummy} alt="dummy" />
                        <Image width={357} height={153} className="w-[357px] h-[123px]" src={dummy} alt="dummy" />
                        <Image width={357} height={153} className="w-[357px] h-[123px]" src={dummy} alt="dummy" />
                    </div>
                </div>
            </section>

            <section className="mt-0 md:mt-6 max-w-[1136px] w-full flex flex-wrap md:flex-nowrap justify-between items-center p-4 md:p-0">
                <Button onClick={() => handleScroll("aboutGym")} className="aboutButton py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px] rounded-full">About</Button>
                <Button onClick={() => handleScroll("gymServices")} className="py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px]">Services</Button>
                <Button onClick={() => handleScroll("gymTiming")} className="py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px]">Timing</Button>
                <Button onClick={() => handleScroll("gymAmenities")} className="py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px]">Amenities</Button>
            </section>

            <section className="mt-0 md:mt-6 max-w-[1136px] w-full flex flex-wrap md:flex-nowrap justify-start items-start gap-8 mb-20 p-3 md:p-0">
                <div className="max-w-[649px] flex flex-col justify-center items-center gap-6">
                    <div className="sectionBg w-full h-auto" id="aboutGym">
                        <h3 className="mid-heading text-[20px] md:text-[24px] font-semibold">About</h3>
                        <p className="text-[14px] md:text-[16px] text-[#D4D4D4] font-normal leading-[18px] md:leading-[24px] pt-1 md:pt-2 pb-4">Experienced fitness coach dedicated to helping individuals achieve their health and wellness goals.  Passionate about motivating clients and empowering them to lead active and balanced lifestyles.Experienced fitness coach dedicated to helping individuals achieve their health and wellness goals.  Passionate about motivating clients and empowering them to lead active and balanced lifestyles.</p>
                        <Image width={601} height={315} className="w-full h-[315px]" src={mapBg} alt="mapBg" />
                    </div>

                    <div className="sectionBg w-full h-auto" id="gymServices">
                        <h3 className="mid-heading text-[20px] md:text-[24px] font-semibold">Our Services</h3>
                        <div className="flex gap-[14px] mt-4">
                            <Badge className="h-[25px] text-[14px] text-[#D4D4D4] font-medium leading-[21px] bg-[#262626] py-[2px] px-3 rounded-[6px] flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M8.00017 1.83301C6.68162 1.83301 5.39269 2.224 4.29636 2.95654C3.20004 3.68909 2.34555 4.73028 1.84097 5.94845C1.33638 7.16663 1.20436 8.50707 1.4616 9.80028C1.71883 11.0935 2.35377 12.2814 3.28612 13.2137C4.21847 14.1461 5.40636 14.781 6.69956 15.0382C7.99277 15.2955 9.33322 15.1635 10.5514 14.6589C11.7696 14.1543 12.8108 13.2998 13.5433 12.2035C14.2758 11.1071 14.6668 9.81822 14.6668 8.49967C14.6649 6.73216 13.9619 5.0376 12.7121 3.78777C11.4622 2.53795 9.76768 1.83495 8.00017 1.83301ZM10.6548 11.1543C10.5298 11.2793 10.3603 11.3495 10.1835 11.3495C10.0067 11.3495 9.83718 11.2793 9.71217 11.1543L7.5295 8.97167C7.4048 8.84613 7.33441 8.67662 7.3335 8.49967V5.83301C7.3335 5.6562 7.40374 5.48663 7.52876 5.3616C7.65379 5.23658 7.82336 5.16634 8.00017 5.16634C8.17698 5.16634 8.34655 5.23658 8.47157 5.3616C8.59659 5.48663 8.66683 5.6562 8.66683 5.83301V8.22367L10.6548 10.2117C10.7798 10.3367 10.85 10.5062 10.85 10.683C10.85 10.8598 10.7798 11.0293 10.6548 11.1543Z" fill="#D4D4D4" />
                                </svg>
                                Yoga
                            </Badge>
                            <Badge className="h-[25px] text-[14px] text-[#D4D4D4] font-medium leading-[21px] bg-[#262626] py-[2px] px-3 rounded-[6px] flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M8.00017 1.83301C6.68162 1.83301 5.39269 2.224 4.29636 2.95654C3.20004 3.68909 2.34555 4.73028 1.84097 5.94845C1.33638 7.16663 1.20436 8.50707 1.4616 9.80028C1.71883 11.0935 2.35377 12.2814 3.28612 13.2137C4.21847 14.1461 5.40636 14.781 6.69956 15.0382C7.99277 15.2955 9.33322 15.1635 10.5514 14.6589C11.7696 14.1543 12.8108 13.2998 13.5433 12.2035C14.2758 11.1071 14.6668 9.81822 14.6668 8.49967C14.6649 6.73216 13.9619 5.0376 12.7121 3.78777C11.4622 2.53795 9.76768 1.83495 8.00017 1.83301ZM10.6548 11.1543C10.5298 11.2793 10.3603 11.3495 10.1835 11.3495C10.0067 11.3495 9.83718 11.2793 9.71217 11.1543L7.5295 8.97167C7.4048 8.84613 7.33441 8.67662 7.3335 8.49967V5.83301C7.3335 5.6562 7.40374 5.48663 7.52876 5.3616C7.65379 5.23658 7.82336 5.16634 8.00017 5.16634C8.17698 5.16634 8.34655 5.23658 8.47157 5.3616C8.59659 5.48663 8.66683 5.6562 8.66683 5.83301V8.22367L10.6548 10.2117C10.7798 10.3367 10.85 10.5062 10.85 10.683C10.85 10.8598 10.7798 11.0293 10.6548 11.1543Z" fill="#D4D4D4" />
                                </svg>
                                Gym
                            </Badge>
                            <Badge className="h-[25px] text-[14px] text-[#D4D4D4] font-medium leading-[21px] bg-[#262626] py-[2px] px-3 rounded-[6px] flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M8.00017 1.83301C6.68162 1.83301 5.39269 2.224 4.29636 2.95654C3.20004 3.68909 2.34555 4.73028 1.84097 5.94845C1.33638 7.16663 1.20436 8.50707 1.4616 9.80028C1.71883 11.0935 2.35377 12.2814 3.28612 13.2137C4.21847 14.1461 5.40636 14.781 6.69956 15.0382C7.99277 15.2955 9.33322 15.1635 10.5514 14.6589C11.7696 14.1543 12.8108 13.2998 13.5433 12.2035C14.2758 11.1071 14.6668 9.81822 14.6668 8.49967C14.6649 6.73216 13.9619 5.0376 12.7121 3.78777C11.4622 2.53795 9.76768 1.83495 8.00017 1.83301ZM10.6548 11.1543C10.5298 11.2793 10.3603 11.3495 10.1835 11.3495C10.0067 11.3495 9.83718 11.2793 9.71217 11.1543L7.5295 8.97167C7.4048 8.84613 7.33441 8.67662 7.3335 8.49967V5.83301C7.3335 5.6562 7.40374 5.48663 7.52876 5.3616C7.65379 5.23658 7.82336 5.16634 8.00017 5.16634C8.17698 5.16634 8.34655 5.23658 8.47157 5.3616C8.59659 5.48663 8.66683 5.6562 8.66683 5.83301V8.22367L10.6548 10.2117C10.7798 10.3367 10.85 10.5062 10.85 10.683C10.85 10.8598 10.7798 11.0293 10.6548 11.1543Z" fill="#D4D4D4" />
                                </svg>
                                Zumba
                            </Badge>
                        </div>
                    </div>

                    <div className="sectionBg w-full h-auto" id="gymTiming">
                        <h3 className="mid-heading text-[20px] md:text-[24px] font-semibold mb-4">Opening Time</h3>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col justify-center items-center">
                                <h4 className="text-[16px] text-[#F5F5F5] font-semibold leading-normal mb-[14px]">Days</h4>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Mon-Fri (Weekday)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal my-4">Sat-Sun (Weekend)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">All days</span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h4 className="text-[16px] text-[#F5F5F5] font-semibold leading-normal mb-[14px]">Days</h4>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Mon-Fri (Weekday)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal my-4">Sat-Sun (Weekend)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">All days</span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h4 className="text-[16px] text-[#F5F5F5] font-semibold leading-normal mb-[14px]">Days</h4>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Mon-Fri (Weekday)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal my-4">Sat-Sun (Weekend)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">All days</span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h4 className="text-[16px] text-[#F5F5F5] font-semibold leading-normal mb-[14px]">Days</h4>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Mon-Fri (Weekday)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal my-4">Sat-Sun (Weekend)</span>
                                <span className="text-[14px] text-[#D4D4D4] font-normal leading-normal">All days</span>
                            </div>
                        </div>
                    </div>

                    <div className="sectionBg w-full h-auto" id="gymAmenities">
                        <h3 className="mid-heading text-[20px] md:text-[24px] font-semibold">Amenities</h3>
                        <div className="flex flex-wrap gap-[14px] mt-4 border-b-[1px] border-[#525252] pb-6">
                            {displayedAmenities.map((amenity, index) => (
                                <div
                                    key={index}
                                    className="h-[25px] text-[14px] text-[#D4D4D4] font-medium leading-[21px] bg-[#262626] py-[2px] px-3 rounded-[6px] flex justify-center items-center gap-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                    >
                                        <path
                                            d="M8.00017 1.83301C6.68162 1.83301 5.39269 2.224 4.29636 2.95654C3.20004 3.68909 2.34555 4.73028 1.84097 5.94845C1.33638 7.16663 1.20436 8.50707 1.4616 9.80028C1.71883 11.0935 2.35377 12.2814 3.28612 13.2137C4.21847 14.1461 5.40636 14.781 6.69956 15.0382C7.99277 15.2955 9.33322 15.1635 10.5514 14.6589C11.7696 14.1543 12.8108 13.2998 13.5433 12.2035C14.2758 11.1071 14.6668 9.81822 14.6668 8.49967C14.6649 6.73216 13.9619 5.0376 12.7121 3.78777C11.4622 2.53795 9.76768 1.83495 8.00017 1.83301ZM10.6548 11.1543C10.5298 11.2793 10.3603 11.3495 10.1835 11.3495C10.0067 11.3495 9.83718 11.2793 9.71217 11.1543L7.5295 8.97167C7.4048 8.84613 7.33441 8.67662 7.3335 8.49967V5.83301C7.3335 5.6562 7.40374 5.48663 7.52876 5.3616C7.65379 5.23658 7.82336 5.16634 8.00017 5.16634C8.17698 5.16634 8.34655 5.23658 8.47157 5.3616C8.59659 5.48663 8.66683 5.6562 8.66683 5.83301V8.22367L10.6548 10.2117C10.7798 10.3367 10.85 10.5062 10.85 10.683C10.85 10.8598 10.7798 11.0293 10.6548 11.1543Z"
                                            fill="#D4D4D4"
                                        />
                                    </svg>
                                    {amenity}
                                </div>
                            ))}
                        </div>
                        {Amenities.length > 14 && (
                            <button
                                onClick={toggleShowAll}
                                className="mt-4 text-[14px] text-[#F5F5F5] font-medium leading-[21px]"
                            >
                                {showAll ?
                                    'Show less amenities' :
                                    (
                                        <span className="flex justify-center items-center gap-1">
                                            {`View all amenities (${Amenities.length})`}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z" fill="#F5F5F5" />
                                            </svg>
                                        </span>
                                    )}
                            </button>
                        )}
                    </div>

                    <div className="sectionBg w-full h-auto">
                        <h3 className="mid-heading text-[20px] md:text-[24px] font-semibold">Owner</h3>
                        <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-5 mt-4">
                            <div className="flex flex-col justify-center items-center max-w-[120px] w-full h-auto">
                                <div className="w-full relative flex flex-col justify-center items-center h-[98px] rounded-full">
                                    <Image src={owner} alt="mapBg" width={98} height={98} className=" w-[98px] h-[98px] rounded-full border-[1px] border-[#F43F5E]" />
                                    <span className="w-14 absolute bottom-[0] left-8 z-30 flex justify-between items-center text-[14px] text-[#FFFFFF] font-semibold leading-[21px]  py-[2px] px-2 ownerStarTag">
                                        5.0
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M13.9539 7.01343C13.9015 6.84266 13.8041 6.69076 13.6727 6.57517C13.5413 6.45959 13.3813 6.385 13.2111 6.35997L10.1805 5.90055L8.82517 3.03574C8.74921 2.87495 8.63162 2.73954 8.48572 2.64486C8.33981 2.55018 8.17141 2.5 7.99958 2.5C7.82774 2.5 7.65934 2.55018 7.51343 2.64486C7.36753 2.73954 7.24994 2.87495 7.17398 3.03574L5.8186 5.90055L2.78804 6.35997C2.61811 6.38583 2.4585 6.46074 2.32723 6.57624C2.19595 6.69173 2.09825 6.84321 2.04514 7.01357C1.99204 7.18394 1.98565 7.3664 2.0267 7.54035C2.06775 7.7143 2.1546 7.87281 2.27744 7.99799L4.47102 10.2281L3.95322 13.3765C3.9237 13.5532 3.94229 13.735 4.00687 13.9012C4.07145 14.0675 4.17943 14.2115 4.31854 14.3169C4.45766 14.4223 4.62233 14.4849 4.79384 14.4976C4.96536 14.5103 5.13684 14.4725 5.28881 14.3886L7.99958 12.902L10.7103 14.3886C10.8624 14.4717 11.0337 14.5089 11.2049 14.4959C11.3761 14.4829 11.5404 14.4202 11.6793 14.315C11.8182 14.2097 11.9261 14.0661 11.9909 13.9003C12.0557 13.7344 12.0747 13.553 12.0459 13.3765L11.5281 10.2281L13.7217 7.99737C13.8452 7.87272 13.9324 7.71429 13.9735 7.54025C14.0146 7.36621 14.0078 7.18362 13.9539 7.01343Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                                <h4 className="text-[16px] text-[#F5F5F5] font-semibold leading-normal mt-3">Name</h4>
                                <h6 className="text-[14px] text-[#D4D4D4] font-normal leading-normal mt-1">Owner</h6>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-4">
                                <p className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mpor Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                                <div className="flex w-full justify-between items-center">
                                    <div>
                                        <h5 className="text-[16px] text-[#F5F5F5] font-bold leading-normal">Owner Details</h5>
                                        <h6 className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Response rate : 100%</h6>
                                        <h6 className="text-[14px] text-[#D4D4D4] font-normal leading-normal">Responds within an hour</h6>
                                    </div>
                                    <div className="flex gap-2 md:gap-4">
                                        <Button className="border-[1px] bg-transparent border-[#F43F5E] rounded-[8px] px-3 py-2 text-[12px] text-[#FFFFFF] font-medium leading-[18px]">
                                            Claim Profile
                                        </Button>
                                        <Button className="border-[1px] bg-transparent border-[#F43F5E] rounded-[8px] px-3 py-2 text-[12px] text-[#FFFFFF] font-medium leading-[18px]">
                                            Message
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="max-w-[455px] w-full flex flex-col justify-center items-center gap-6">
                    <CoachAvailability />

                    <div className="sectionBg w-full h-auto flex flex-col gap-5">
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

                    <div className="sectionBg w-full h-auto">
                        <h2 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal mb-5">How it work after booking</h2>
                        <div className="flex flex-col gap-5">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="flex gap-[14px]">
                                    <span className="w-10 h-10 flex justify-center items-center bg-[#262626] rounded-full border-[1px] border-[#262626] text-[14px] text-[#F5F5F5] font-normal leading-normal">{index}</span>
                                    <div>
                                        <h5 className="text-[16px] text-[#F5F5F5] font-semibold leading-normal">Step {index}</h5>
                                        <p className="text-[14px] text-[#A3A3A3] font-normal leading-normal">Lorem ipsum dolor set amet Lorem ipsum dolor set amet</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 mb-5">
                            <h3 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal">Gym Rules</h3>
                            <p className="text-[16px] text-[#A3A3A3] font-normal leading-normal">Lorem ipsum dolor set amet Lorem ipsum dolor set amet</p>
                        </div>
                        <div className="">
                            <h3 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal">Checking in and out</h3>
                            <p className="text-[16px] text-[#A3A3A3] font-normal leading-normal flex justify-start items-center gap-2 mt-4 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M20.1977 10.5078H19.7055V8.04606C19.7055 7.2303 19.0443 6.56901 18.2287 6.56901H17.2442C17.0712 6.56901 16.9058 6.60748 16.752 6.65748V6.07666C16.752 5.2609 16.0908 4.59961 15.2752 4.59961H14.2907C13.4755 4.59961 12.814 5.2609 12.814 6.07666V10.5078H8.876V6.07666C8.876 5.2609 8.21485 4.59961 7.39925 4.59961H6.41475C5.59946 4.59961 4.938 5.2609 4.938 6.07666V6.65764C4.78417 6.60286 4.61804 6.56901 4.44575 6.56901H3.46125C2.64565 6.56901 1.9845 7.23061 1.9845 8.04606V10.5078H1.49225C1.22148 10.5078 1 10.7294 1 11.0002C1 11.2709 1.22148 11.4925 1.49225 11.4925H1.9845V13.9543C1.9845 14.77 2.64565 15.4313 3.46125 15.4313H4.44575C4.61881 15.4313 4.78417 15.3929 4.938 15.3429V15.9237C4.938 16.7394 5.59915 17.4007 6.41475 17.4007H7.39925C8.21454 17.4007 8.876 16.7391 8.876 15.9237V11.4925H12.814V15.9237C12.814 16.7394 13.4752 17.4007 14.2907 17.4007H15.2752C16.0908 17.4007 16.752 16.7394 16.752 15.9237V15.3427C16.9058 15.3975 17.072 15.4313 17.2442 15.4313H18.2287C19.0443 15.4313 19.7055 14.77 19.7055 13.9543V11.4925H20.1977C20.4685 11.4925 20.69 11.271 20.69 11.0002C20.69 10.7294 20.4685 10.5078 20.1977 10.5078ZM4.938 13.9543C4.938 14.2235 4.71495 14.4466 4.44575 14.4466H3.46125C3.19205 14.4466 2.969 14.2251 2.969 13.9543V8.04606C2.969 7.77681 3.19205 7.55371 3.46125 7.55371H4.44575C4.71649 7.55371 4.938 7.77835 4.938 8.04606V13.9543ZM7.8915 15.9237C7.8915 16.1929 7.66845 16.416 7.39925 16.416H6.41475C6.14709 16.416 5.9225 16.1945 5.9225 15.9237V6.07666C5.9225 5.80741 6.14555 5.58431 6.41475 5.58431H7.39925C7.66999 5.58431 7.8915 5.80741 7.8915 6.07666V15.9237ZM15.7675 15.9237C15.7675 16.1929 15.5444 16.416 15.2752 16.416H14.2907C14.0215 16.416 13.7985 16.1929 13.7985 15.9237V6.07666C13.7985 5.80741 14.0215 5.58431 14.2907 5.58431H15.2752C15.546 5.58431 15.7675 5.80741 15.7675 6.07666V15.9237ZM18.721 13.9543C18.721 14.2235 18.4979 14.4466 18.2287 14.4466H17.2442C16.975 14.4466 16.752 14.2235 16.752 13.9543V8.04606C16.752 7.77681 16.975 7.55371 17.2442 7.55371H18.2287C18.4995 7.55371 18.721 7.77835 18.721 8.04606V13.9543Z" fill="#A3A3A3" stroke="#A3A3A3" strokeWidth="0.0335694" />
                                </svg>
                                Check-in afetr 2:00 pm
                            </p>
                            <p className="text-[16px] text-[#A3A3A3] font-normal leading-normal flex justify-start items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M20.1977 10.5078H19.7055V8.04606C19.7055 7.2303 19.0443 6.56901 18.2287 6.56901H17.2442C17.0712 6.56901 16.9058 6.60748 16.752 6.65748V6.07666C16.752 5.2609 16.0908 4.59961 15.2752 4.59961H14.2907C13.4755 4.59961 12.814 5.2609 12.814 6.07666V10.5078H8.876V6.07666C8.876 5.2609 8.21485 4.59961 7.39925 4.59961H6.41475C5.59946 4.59961 4.938 5.2609 4.938 6.07666V6.65764C4.78417 6.60286 4.61804 6.56901 4.44575 6.56901H3.46125C2.64565 6.56901 1.9845 7.23061 1.9845 8.04606V10.5078H1.49225C1.22148 10.5078 1 10.7294 1 11.0002C1 11.2709 1.22148 11.4925 1.49225 11.4925H1.9845V13.9543C1.9845 14.77 2.64565 15.4313 3.46125 15.4313H4.44575C4.61881 15.4313 4.78417 15.3929 4.938 15.3429V15.9237C4.938 16.7394 5.59915 17.4007 6.41475 17.4007H7.39925C8.21454 17.4007 8.876 16.7391 8.876 15.9237V11.4925H12.814V15.9237C12.814 16.7394 13.4752 17.4007 14.2907 17.4007H15.2752C16.0908 17.4007 16.752 16.7394 16.752 15.9237V15.3427C16.9058 15.3975 17.072 15.4313 17.2442 15.4313H18.2287C19.0443 15.4313 19.7055 14.77 19.7055 13.9543V11.4925H20.1977C20.4685 11.4925 20.69 11.271 20.69 11.0002C20.69 10.7294 20.4685 10.5078 20.1977 10.5078ZM4.938 13.9543C4.938 14.2235 4.71495 14.4466 4.44575 14.4466H3.46125C3.19205 14.4466 2.969 14.2251 2.969 13.9543V8.04606C2.969 7.77681 3.19205 7.55371 3.46125 7.55371H4.44575C4.71649 7.55371 4.938 7.77835 4.938 8.04606V13.9543ZM7.8915 15.9237C7.8915 16.1929 7.66845 16.416 7.39925 16.416H6.41475C6.14709 16.416 5.9225 16.1945 5.9225 15.9237V6.07666C5.9225 5.80741 6.14555 5.58431 6.41475 5.58431H7.39925C7.66999 5.58431 7.8915 5.80741 7.8915 6.07666V15.9237ZM15.7675 15.9237C15.7675 16.1929 15.5444 16.416 15.2752 16.416H14.2907C14.0215 16.416 13.7985 16.1929 13.7985 15.9237V6.07666C13.7985 5.80741 14.0215 5.58431 14.2907 5.58431H15.2752C15.546 5.58431 15.7675 5.80741 15.7675 6.07666V15.9237ZM18.721 13.9543C18.721 14.2235 18.4979 14.4466 18.2287 14.4466H17.2442C16.975 14.4466 16.752 14.2235 16.752 13.9543V8.04606C16.752 7.77681 16.975 7.55371 17.2442 7.55371H18.2287C18.4995 7.55371 18.721 7.77835 18.721 8.04606V13.9543Z" fill="#A3A3A3" stroke="#A3A3A3" strokeWidth="0.0335694" />
                                </svg>
                                Check-out before 2:00 pm
                            </p>
                        </div>
                        <div className="w-full h-[1px] border-[1px] border-[#525252] my-4"></div>
                        <div className=" ">
                            <h3 className="text-[20px] text-[#F5F5F5] font-semibold leading-normal">Checking in and out</h3>
                            <p className="text-[16px] text-[#A3A3A3] font-normal leading-normal flex justify-start items-center gap-2 mt-4 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M20.1977 10.5078H19.7055V8.04606C19.7055 7.2303 19.0443 6.56901 18.2287 6.56901H17.2442C17.0712 6.56901 16.9058 6.60748 16.752 6.65748V6.07666C16.752 5.2609 16.0908 4.59961 15.2752 4.59961H14.2907C13.4755 4.59961 12.814 5.2609 12.814 6.07666V10.5078H8.876V6.07666C8.876 5.2609 8.21485 4.59961 7.39925 4.59961H6.41475C5.59946 4.59961 4.938 5.2609 4.938 6.07666V6.65764C4.78417 6.60286 4.61804 6.56901 4.44575 6.56901H3.46125C2.64565 6.56901 1.9845 7.23061 1.9845 8.04606V10.5078H1.49225C1.22148 10.5078 1 10.7294 1 11.0002C1 11.2709 1.22148 11.4925 1.49225 11.4925H1.9845V13.9543C1.9845 14.77 2.64565 15.4313 3.46125 15.4313H4.44575C4.61881 15.4313 4.78417 15.3929 4.938 15.3429V15.9237C4.938 16.7394 5.59915 17.4007 6.41475 17.4007H7.39925C8.21454 17.4007 8.876 16.7391 8.876 15.9237V11.4925H12.814V15.9237C12.814 16.7394 13.4752 17.4007 14.2907 17.4007H15.2752C16.0908 17.4007 16.752 16.7394 16.752 15.9237V15.3427C16.9058 15.3975 17.072 15.4313 17.2442 15.4313H18.2287C19.0443 15.4313 19.7055 14.77 19.7055 13.9543V11.4925H20.1977C20.4685 11.4925 20.69 11.271 20.69 11.0002C20.69 10.7294 20.4685 10.5078 20.1977 10.5078ZM4.938 13.9543C4.938 14.2235 4.71495 14.4466 4.44575 14.4466H3.46125C3.19205 14.4466 2.969 14.2251 2.969 13.9543V8.04606C2.969 7.77681 3.19205 7.55371 3.46125 7.55371H4.44575C4.71649 7.55371 4.938 7.77835 4.938 8.04606V13.9543ZM7.8915 15.9237C7.8915 16.1929 7.66845 16.416 7.39925 16.416H6.41475C6.14709 16.416 5.9225 16.1945 5.9225 15.9237V6.07666C5.9225 5.80741 6.14555 5.58431 6.41475 5.58431H7.39925C7.66999 5.58431 7.8915 5.80741 7.8915 6.07666V15.9237ZM15.7675 15.9237C15.7675 16.1929 15.5444 16.416 15.2752 16.416H14.2907C14.0215 16.416 13.7985 16.1929 13.7985 15.9237V6.07666C13.7985 5.80741 14.0215 5.58431 14.2907 5.58431H15.2752C15.546 5.58431 15.7675 5.80741 15.7675 6.07666V15.9237ZM18.721 13.9543C18.721 14.2235 18.4979 14.4466 18.2287 14.4466H17.2442C16.975 14.4466 16.752 14.2235 16.752 13.9543V8.04606C16.752 7.77681 16.975 7.55371 17.2442 7.55371H18.2287C18.4995 7.55371 18.721 7.77835 18.721 8.04606V13.9543Z" fill="#A3A3A3" stroke="#A3A3A3" strokeWidth="0.0335694" />
                                </svg>
                                Check-in afetr 2:00 pm
                            </p>
                            <p className="text-[16px] text-[#A3A3A3] font-normal leading-normal flex justify-start items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                    <path d="M20.1977 10.5078H19.7055V8.04606C19.7055 7.2303 19.0443 6.56901 18.2287 6.56901H17.2442C17.0712 6.56901 16.9058 6.60748 16.752 6.65748V6.07666C16.752 5.2609 16.0908 4.59961 15.2752 4.59961H14.2907C13.4755 4.59961 12.814 5.2609 12.814 6.07666V10.5078H8.876V6.07666C8.876 5.2609 8.21485 4.59961 7.39925 4.59961H6.41475C5.59946 4.59961 4.938 5.2609 4.938 6.07666V6.65764C4.78417 6.60286 4.61804 6.56901 4.44575 6.56901H3.46125C2.64565 6.56901 1.9845 7.23061 1.9845 8.04606V10.5078H1.49225C1.22148 10.5078 1 10.7294 1 11.0002C1 11.2709 1.22148 11.4925 1.49225 11.4925H1.9845V13.9543C1.9845 14.77 2.64565 15.4313 3.46125 15.4313H4.44575C4.61881 15.4313 4.78417 15.3929 4.938 15.3429V15.9237C4.938 16.7394 5.59915 17.4007 6.41475 17.4007H7.39925C8.21454 17.4007 8.876 16.7391 8.876 15.9237V11.4925H12.814V15.9237C12.814 16.7394 13.4752 17.4007 14.2907 17.4007H15.2752C16.0908 17.4007 16.752 16.7394 16.752 15.9237V15.3427C16.9058 15.3975 17.072 15.4313 17.2442 15.4313H18.2287C19.0443 15.4313 19.7055 14.77 19.7055 13.9543V11.4925H20.1977C20.4685 11.4925 20.69 11.271 20.69 11.0002C20.69 10.7294 20.4685 10.5078 20.1977 10.5078ZM4.938 13.9543C4.938 14.2235 4.71495 14.4466 4.44575 14.4466H3.46125C3.19205 14.4466 2.969 14.2251 2.969 13.9543V8.04606C2.969 7.77681 3.19205 7.55371 3.46125 7.55371H4.44575C4.71649 7.55371 4.938 7.77835 4.938 8.04606V13.9543ZM7.8915 15.9237C7.8915 16.1929 7.66845 16.416 7.39925 16.416H6.41475C6.14709 16.416 5.9225 16.1945 5.9225 15.9237V6.07666C5.9225 5.80741 6.14555 5.58431 6.41475 5.58431H7.39925C7.66999 5.58431 7.8915 5.80741 7.8915 6.07666V15.9237ZM15.7675 15.9237C15.7675 16.1929 15.5444 16.416 15.2752 16.416H14.2907C14.0215 16.416 13.7985 16.1929 13.7985 15.9237V6.07666C13.7985 5.80741 14.0215 5.58431 14.2907 5.58431H15.2752C15.546 5.58431 15.7675 5.80741 15.7675 6.07666V15.9237ZM18.721 13.9543C18.721 14.2235 18.4979 14.4466 18.2287 14.4466H17.2442C16.975 14.4466 16.752 14.2235 16.752 13.9543V8.04606C16.752 7.77681 16.975 7.55371 17.2442 7.55371H18.2287C18.4995 7.55371 18.721 7.77835 18.721 8.04606V13.9543Z" fill="#A3A3A3" stroke="#A3A3A3" strokeWidth="0.0335694" />
                                </svg>
                                Check-out before 2:00 pm
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
};

export default GymDetails;
