"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "flowbite-react";
import dummy from "../../../../public/blogCardPic.png";
import gymImg from "../../../../public/gymImage.jpg";
import mapBg from "../../../../public/mapBg.png";
import owner from "../../../../public/blogAuthorPic.png";
import CoachAvailability from "@/app/Components/CoachAvailability";
import { IconH5 } from "@tabler/icons-react";
import Card from "../../Components/storeComponents/card";
import Card1 from "../../Components/ReviewCards/card_review";
const GymDetails = ({ params }: any) => {
  const Amenities = [
    "Shower",
    "Swimming Pool",
    "Water Cooler",
    "Waiting Lounge",
    "AC",
    "Towels",
    "Change Room",
    "Spa",
    "Water",
    "WIFI",
    "Supplements Store",
    "Locker",
    "Coffee",
    "Steam Room",
    "Childcare",
    "Equipment",
    "Smoothies and Bars",
    "Community",
    "Cleanliness",
  ];

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleItemClick = (item: string) => {
    console.log("selectedItem: ", item);
    setSelectedItem(item); // Set the selected item
    setIsOpen(false); // Close the dropdown
  };
  const CardsData = [
    {
      id: 1,
      // imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
      imageUrl: "/Frame 13.png",
      label: "Best Seller",
      name: "Product Name",
      description: "Cardiovascular is defined as any product category",
      price: "Price here",
      discounted_price: 450,
      discount: "Get 15% off",
      AddToBag: "Add To Bag",
      rating: 4.7,
      reviews: 50,
      buttonText: "Buy Now",
    },
    {
      id: 2,
      // imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
      imageUrl: "/Frame 13 (1).png",
      label: "Best Seller",
      name: "Product Name",
      description: "Cardiovascular is defined as any product category",
      price: "Price here",
      discounted_price: 450,
      discount: "Get 15% off",
      AddToBag: "Add To Bag",
      rating: 4.7,
      reviews: 50,
      buttonText: "Buy Now",
    },
    {
      id: 3,
      // imageUrl: "/images/gym-placeholder.jpg", // Replace with the actual image URL or local path
      imageUrl: "/Frame 13 (2).png",
      label: "Best Seller",
      name: "Product Name",
      description: "Cardiovascular is defined as any product category",
      price: "Price here",
      discounted_price: 450,
      discount: "Get 15% off",
      AddToBag: "Add To Bag",
      rating: 4.7,
      reviews: 50,
      buttonText: "Buy Now",
    },
  ];
  const CardsData1 = [
    {
      id: 1,
      name: "Mehrnaz J",
      rating: 5.0,
      description:
        "Lorem ipsum dolor sit amet, sed consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mpor",
    },
    {
      id: 2,
      name: "Mehrnaz J",
      rating: 5.0,
      description:
        "Lorem ipsum dolor sit amet, sed consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mpor",
    },
  ];

  const [showAllCards, setShowAllCards] = useState(false); // State to toggle visibility

  const toggleCardVisibility = () => {
    setShowAllCards((prev) => !prev);
  };
  const visibleCards3 = showAllCards ? CardsData : CardsData.slice(0, 3);
  const visibleCards4 = showAllCards ? CardsData1 : CardsData1.slice(0, 2);
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  const handleCheck = () => {
    if (pincode.length !== 6) {
      setError("Invalid Pincode");
    } else {
      setError(""); // Clear the error if pincode is valid
      // You can add further logic for valid pin codes here
      console.log("Valid Pincode");
    }
  };

  return (
    <div className="pt-[72px] flex flex-col justify-center items-center">
      {/* <h1 className="text-white">Gym Id : ${params.Product_ID}</h1> */}
      <section className="mt-0 md:mt-6 flex md:flex-col flex-wrap-reverse md:flex-nowrap max-w-[1136px] w-full">
        <div className="hidden md:flex flex-wrap md:flex-nowrap justify-between items-center gap-3 md:gap-4 p-4 md:p-0">
          <h1 className="text-[24px] md:text-[44px] text-[#FFFFFF] font-bold leading-normal">
            Product Name
          </h1>
          {/* <div className="flex items-center gap-[14px]">
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#15803D] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Morning</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#8B5CF6] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Afternoon</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#1C64F2] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Evening</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#E3A008] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">All Day</Badge>
                    </div> */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="border-[1px] border-[#F43F5E] rounded-full p-[10px] bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M22.2978 7.76312C21.7698 5.79512 20.2168 4.24412 18.2468 3.71712C16.3168 3.20312 14.2668 3.72512 12.5018 5.15412C11.2138 4.10312 9.78683 3.53412 8.32983 3.50012C6.74683 3.47812 5.26983 4.05712 4.15583 5.16812C2.06183 7.25912 1.60483 11.0351 4.78183 14.2071L11.7918 21.2071C11.9878 21.4021 12.2438 21.5001 12.4998 21.5001C12.7558 21.5001 13.0118 21.4021 13.2078 21.2071L20.2178 14.2071C22.1268 12.3011 22.8848 9.95212 22.2978 7.76312ZM18.8018 12.7931L12.4998 19.0861L6.19783 12.7931C3.84683 10.4441 4.22483 7.92812 5.57183 6.58212C6.22283 5.93212 7.14683 5.50812 8.19483 5.50812C9.31483 5.50812 10.5758 5.99312 11.7908 7.20712C12.1818 7.59812 12.8158 7.59812 13.2068 7.20712C15.5388 4.87912 18.0498 5.26912 19.3948 6.61312C20.1188 7.33712 20.5058 8.29712 20.4868 9.31612C20.4648 10.5131 19.8818 11.7151 18.8018 12.7931Z"
                  fill="#F5F5F5"
                />
              </svg>
            </Button>
            <Button className="border-[1px] border-[#F43F5E] rounded-full px-5 py-[10px] flex justify-center items-center gap-2 bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M13.4478 10.4705C13.4478 10.0618 13.2906 9.68405 13.0169 9.43419L9.0233 5.78507C8.68939 5.4794 8.25852 5.41415 7.87144 5.61506C7.45073 5.82972 7.18955 6.30024 7.18955 6.84031V7.88524C4.56991 8.12737 2.5 10.7822 2.5 14.0106V15.1517C2.5 15.6841 2.81201 16.1305 3.25931 16.2361C3.32577 16.2507 3.39068 16.2585 3.4548 16.2585C3.81295 16.2585 4.13825 16.0241 4.29934 15.6308C4.86941 14.2424 5.95402 13.3297 7.18955 13.17V14.1016C7.18955 14.6417 7.45073 15.1114 7.87144 15.3277C8.25852 15.5269 8.68861 15.4634 9.02252 15.1586L13.0169 11.5086C13.2906 11.2579 13.4478 10.8792 13.4478 10.4705Z"
                  fill="white"
                />
                <path
                  d="M16.9714 9.13625L12.6572 4.88696C12.3342 4.56841 11.8416 4.59932 11.5522 4.95221C11.2637 5.3051 11.2911 5.84861 11.6124 6.16458L15.9274 10.4697L11.5397 14.8383C11.2199 15.1569 11.1957 15.7004 11.4858 16.0515C11.6398 16.2387 11.8525 16.3332 12.0652 16.3332C12.2521 16.3332 12.4406 16.2593 12.5899 16.1108L16.9776 11.7421C17.3108 11.4107 17.5008 10.9359 17.5 10.4379C17.4984 9.94077 17.3061 9.46596 16.9714 9.13625Z"
                  fill="white"
                />
              </svg>
              Share
            </Button>
          </div>
        </div>

        {/* gym name section for mobile */}
        <div className="flex md:hidden flex-wrap md:flex-nowrap justify-start items-center gap-3 md:gap-4 p-4 md:p-0">
          <h1 className="text-[24px] md:text-[44px] text-[#FFFFFF] font-bold leading-normal">
            Product Name
          </h1>
          {/* <div className="flex items-center gap-[14px]">
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#15803D] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Morning</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#8B5CF6] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Afternoon</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#1C64F2] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">Evening</Badge>
                        <Badge className="h-[20px] md:h-[25px] text-[14px] md:text-[10px] text-[#E3A008] font-medium leading-[21px] md:leading-[15px] bg-[#262626] py-[2px] px-3 rounded-[6px]">All Day</Badge>
                    </div> */}
        </div>

        <div className="h-auto md:h-[442px] flex justify-center items-center gap-8">
          <div className="h-[442px] hidden md:flex flex-col justify-center items-center gap-3">
            <Image
              width={357}
              height={353}
              className="w-[357px] h-full object-cover"
              src="/mat.png"
              alt="dummy"
            />
          </div>
          <div className="h-full hidden md:flex flex-col justify-center items-center gap-3">
            <Image
              width={357}
              height={153}
              className="w-[357px] h-[50%] object-cover"
              src="/mat.png"
              alt="dummy"
            />
            <Image
              width={357}
              height={153}
              className="w-[357px] h-[50%] object-cover"
              src="/mat.png"
              alt="dummy"
            />
          </div>
          <div className="h-full md:h-full w-[100vw] md:w-[447px] sm:h-64 xl:h-80 2xl:h-96 relative">
            <Carousel className="h-[300px] sm:h-[380px]" slide={false}>
              <Image
                width={747}
                height={492}
                className="w-[747px] h-[422px] object-cover"
                src="/mat.png"
                alt="dummy"
              />
              <Image
                width={747}
                height={492}
                className="w-[747px] h-[422px] object-cover"
                src="/mat.png"
                alt="dummy"
              />
              <Image
                width={747}
                height={492}
                className="w-[747px] h-[422px] object-cover"
                src="/mat.png"
                alt="dummy"
              />
              <Image
                width={747}
                height={492}
                className="w-[747px] h-[422px] object-cover"
                src="/mat.png"
                alt="dummy"
              />
              <Image
                width={747}
                height={492}
                className="w-[747px] h-[422px] object-cover"
                src="/mat.png"
                alt="dummy"
              />
            </Carousel>
            <span className="absolute top-4 left-4 text-[16px] text-[#F5F5F5] font-medium leading-normal">
              01 / 5
            </span>
            {/* like & share btn for mobile */}
            <div className="flex md:hidden items-center gap-2 absolute top-4 right-4">
              <Button className="bg-[#171717] border-[1px] border-[#F43F5E] rounded-full p-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M22.2978 7.76312C21.7698 5.79512 20.2168 4.24412 18.2468 3.71712C16.3168 3.20312 14.2668 3.72512 12.5018 5.15412C11.2138 4.10312 9.78683 3.53412 8.32983 3.50012C6.74683 3.47812 5.26983 4.05712 4.15583 5.16812C2.06183 7.25912 1.60483 11.0351 4.78183 14.2071L11.7918 21.2071C11.9878 21.4021 12.2438 21.5001 12.4998 21.5001C12.7558 21.5001 13.0118 21.4021 13.2078 21.2071L20.2178 14.2071C22.1268 12.3011 22.8848 9.95212 22.2978 7.76312ZM18.8018 12.7931L12.4998 19.0861L6.19783 12.7931C3.84683 10.4441 4.22483 7.92812 5.57183 6.58212C6.22283 5.93212 7.14683 5.50812 8.19483 5.50812C9.31483 5.50812 10.5758 5.99312 11.7908 7.20712C12.1818 7.59812 12.8158 7.59812 13.2068 7.20712C15.5388 4.87912 18.0498 5.26912 19.3948 6.61312C20.1188 7.33712 20.5058 8.29712 20.4868 9.31612C20.4648 10.5131 19.8818 11.7151 18.8018 12.7931Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Button>
              <Button className="bg-[#171717] border-[1px] border-[#F43F5E] rounded-full p-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M13.4478 10.4705C13.4478 10.0618 13.2906 9.68405 13.0169 9.43419L9.0233 5.78507C8.68939 5.4794 8.25852 5.41415 7.87144 5.61506C7.45073 5.82972 7.18955 6.30024 7.18955 6.84031V7.88524C4.56991 8.12737 2.5 10.7822 2.5 14.0106V15.1517C2.5 15.6841 2.81201 16.1305 3.25931 16.2361C3.32577 16.2507 3.39068 16.2585 3.4548 16.2585C3.81295 16.2585 4.13825 16.0241 4.29934 15.6308C4.86941 14.2424 5.95402 13.3297 7.18955 13.17V14.1016C7.18955 14.6417 7.45073 15.1114 7.87144 15.3277C8.25852 15.5269 8.68861 15.4634 9.02252 15.1586L13.0169 11.5086C13.2906 11.2579 13.4478 10.8792 13.4478 10.4705Z"
                    fill="white"
                  />
                  <path
                    d="M16.9714 9.13625L12.6572 4.88696C12.3342 4.56841 11.8416 4.59932 11.5522 4.95221C11.2637 5.3051 11.2911 5.84861 11.6124 6.16458L15.9274 10.4697L11.5397 14.8383C11.2199 15.1569 11.1957 15.7004 11.4858 16.0515C11.6398 16.2387 11.8525 16.3332 12.0652 16.3332C12.2521 16.3332 12.4406 16.2593 12.5899 16.1108L16.9776 11.7421C17.3108 11.4107 17.5008 10.9359 17.5 10.4379C17.4984 9.94077 17.3061 9.46596 16.9714 9.13625Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="mt-0 md:mt-6 max-w-[1136px] w-full flex flex-wrap md:flex-nowrap justify-between items-center p-4 md:p-0">
                <Button onClick={() => handleScroll("aboutGym")} className="aboutButton py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px] rounded-full">About</Button>
                <Button onClick={() => handleScroll("gymServices")} className="py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px]">Services</Button>
                <Button onClick={() => handleScroll("gymTiming")} className="py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px]">Timing</Button>
                <Button onClick={() => handleScroll("gymAmenities")} className="py-3 px-5 text-[14px] md:text-[16px] text-[#FFFFFF] font-medium leading-[24px]">Amenities</Button>
            </section> */}

      <section className="mt-0 md:mt-6 max-w-[1136px] w-full flex flex-wrap md:flex-nowrap justify-start items-start gap-8 mb-20 p-3 md:p-0">
        <div className="max-w-[649px] flex flex-col justify-center items-center gap-6">
          <div className="w-full h-auto" id="aboutGym">
            <h3 className="text-[20px] md:text-[24px] font-semibold text-white">
              Description
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#D4D4D4] font-normal leading-[18px] md:leading-[24px] pt-1 md:pt-2 pb-4">
              Experienced fitness coach dedicated to helping individuals achieve
              their health and wellness goals. Passionate about motivating
              clients and empowering them to lead active and balanced
              lifestyles.Experienced fitness coach dedicated to helping
              individuals achieve their health and wellness goals. Passionate
              about motivating clients and empowering them to lead active and
              balanced lifestyles.
            </p>
          </div>
          <div className="w-full h-auto" id="aboutGym">
            <h3 className="text-[20px] md:text-[24px] font-semibold text-white">
              Highlights
            </h3>
            <ul className="text-[14px] md:text-[16px] text-[#D4D4D4] font-normal leading-[18px] md:leading-[24px] pt-1 md:pt-2 pb-4 list-disc list-inside ml-2">
              <li>Hand Cut and sewn locally</li>
              <li>Dyed with our Proprietary colors</li>
              <li>Pre-washed and pre-shrunk</li>
              <li>Ultra soft 100% cotton</li>
            </ul>
          </div>

          <div className="sectionBg w-full h-auto space-y-4" id="gymServices">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h3 className="mid-heading text-[20px] md:text-[24px] font-semibold">
                  Reviews
                </h3>
                <Badge className="h-[25px] text-[14px] text-[#D4D4D4] font-medium leading-[21px] bg-brown py-[2px] px-3 rounded-[6px] flex justify-center items-center gap-1">
                  4.9
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2L14.9453 8.50785L22 9.60293L17 14.6381L18.4726 21.862L12 18.5L5.52737 21.862L7 14.6381L2 9.60293L9.05469 8.50785L12 2Z"
                      fill="white"
                    />
                  </svg>
                </Badge>
              </div>
              <Badge className="h-[25px] text-[14px] text-[#D4D4D4] font-medium leading-[21px] bg-brown py-[2px] px-3 rounded-[6px] flex justify-center items-center gap-1 underline underline-offset-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    fill="white"
                  />
                </svg>
                Write a Review
              </Badge>
            </div>
            <div className="text-white text-xl">10 Reviews</div>
            <div className="flex flex-wrap gap-4">
              <img
                className="w-[45%] sm:w-[30%] lg:w-[22%] h-auto object-cover rounded-md"
                src="/xxpoxphb2pkmolnvodyk.jpg.png"
                alt=""
              />
              <img
                className="w-[45%] sm:w-[30%] lg:w-[22%] h-auto object-cover rounded-md"
                src="/xxpoxphb2pkmolnvodyk.jpg (1).png"
                alt=""
              />
              <img
                className="w-[45%] sm:w-[30%] lg:w-[22%] h-auto object-cover rounded-md"
                src="/xxpoxphb2pkmolnvodyk.jpg (2).png"
                alt=""
              />
              <img
                className="w-[45%] sm:w-[30%] lg:w-[22%] h-auto object-cover rounded-md"
                src="/xxpoxphb2pkmolnvodyk.jpg (3).png"
                alt=""
              />
            </div>
            <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
              {visibleCards4.map((card2) => (
                <div key={card2.id}>
                  <Card1
                    id={card2.id}
                    name={card2.name}
                    rating={card2.rating}
                    description={card2.description}
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-l flex cursor-pointer">
              View all reviews
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[455px] w-full flex flex-col justify-left  gap-4">
          <div className="flex gap-2">
            <p className="text-white text-2xl">$49</p>
            <p className="text-neutral-700 mt-1">$99</p>
            <span className="text-[#FACA15] mt-1">Get (15% OFF)</span>
          </div>
          <div className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.3018 0L6 13.5996H10.3184L6.77271 24L17.612 10.4737H13.1301L16.3018 0Z"
                fill="url(#paint0_linear_13847_42867)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13847_42867"
                  x1="5.55338"
                  y1="15.3192"
                  x2="18.0028"
                  y2="15.3201"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F43F5E" />
                  <stop offset="1" stop-color="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.3018 0L6 13.5996H10.3184L6.77271 24L17.612 10.4737H13.1301L16.3018 0Z"
                fill="url(#paint0_linear_13847_42867)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13847_42867"
                  x1="5.55338"
                  y1="15.3192"
                  x2="18.0028"
                  y2="15.3201"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F43F5E" />
                  <stop offset="1" stop-color="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.1301 10.8737H16.7789L7.88775 21.9689L10.697 13.7287L10.8773 13.1996H10.3184H6.80481L15.2713 2.02287L12.7472 10.3577L12.591 10.8737H13.1301Z"
                stroke="url(#paint0_linear_13847_42871)"
                stroke-width="0.8"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13847_42871"
                  x1="5.55338"
                  y1="15.3192"
                  x2="18.0028"
                  y2="15.3201"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F43F5E" />
                  <stop offset="1" stop-color="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.1301 10.8737H16.7789L7.88775 21.9689L10.697 13.7287L10.8773 13.1996H10.3184H6.80481L15.2713 2.02287L12.7472 10.3577L12.591 10.8737H13.1301Z"
                stroke="url(#paint0_linear_13847_42871)"
                stroke-width="0.8"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13847_42871"
                  x1="5.55338"
                  y1="15.3192"
                  x2="18.0028"
                  y2="15.3201"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F43F5E" />
                  <stop offset="1" stop-color="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.1301 10.8737H16.7789L7.88775 21.9689L10.697 13.7287L10.8773 13.1996H10.3184H6.80481L15.2713 2.02287L12.7472 10.3577L12.591 10.8737H13.1301Z"
                stroke="url(#paint0_linear_13847_42871)"
                stroke-width="0.8"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13847_42871"
                  x1="5.55338"
                  y1="15.3192"
                  x2="18.0028"
                  y2="15.3201"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F43F5E" />
                  <stop offset="1" stop-color="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
            <h5 className="mid-heading text-[18px] md:text-[22px] ml-4">
              117 reviews
            </h5>
          </div>
          <div className="text-white text-xl">Color</div>
          <div className="flex items-center gap-2">
            {["white", "gray-600", "gray-900"].map((color) => (
              <label
                key={color}
                className="w-8 h-8 rounded-full border-2 border-neutral-700 cursor-pointer transition-all peer"
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  className="hidden peer"
                />
                <div
                  className={`w-full h-full rounded-full bg-${color} peer-checked:ring-2 peer-checked:ring-[#F43F5E] peer-checked:border-[#F43F5E]`}
                ></div>
              </label>
            ))}
          </div>

          <div className="text-white text-xl">Quantity</div>
          <div className="relative inline-block" ref={dropdownRef}>
            {/* Dropdown Button */}
            <div
              className="w-12 h-8 bg-neutral-800 rounded-md text-white flex items-center justify-between px-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <span>{selectedItem || "1"}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute mt-1 w-20 bg-neutral-800 text-white rounded-md shadow-lg z-10">
                <ul className="flex flex-col text-sm">
                  {["1", "2", "3", "4", "5"].map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="text-white text-xl">Size</div>
            <h6 className="mid-heading text-[14px] md:text-[16px] ml-auto mt-1 ">
              Size guide
            </h6>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"].map(
              (size, index) => (
                <label
                  key={size}
                  className={`flex justify-center items-center w-24 h-16 border-2 border-neutral-600 rounded-md cursor-pointer transition-all ${
                    index === 0
                      ? "opacity-50 cursor-not-allowed" // Disabled state for XXS
                      : "hover:border-gray-500"
                  } peer-checked:border-red-500`} // Default hover effect
                >
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    disabled={index === 0} // Disable the XXS button
                    className="hidden peer"
                  />
                  <span
                    className={`text-white flex justify-center items-center w-full h-full peer-checked:border-[#F43F5E] peer-checked:ring-2 peer-checked:ring-[#F43F5E] peer-checked:font-bold`}
                  >
                    {size}
                  </span>
                </label>
              ),
            )}
          </div>

          <div className="flex">
            <div className="text-white text-xl">
              Check delhivery availablity
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="w-[80%]">
                <input
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode"
                  className="w-full px-4 py-2 text-gray-400 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                />
              </div>
              <div className="w-[20%]">
                <button
                  type="button"
                  onClick={handleCheck}
                  className="w-full px-4 py-2 text-white placeholder-white bg-neutral-900 border border-[#F43F5E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F43F5E] focus:border-[#F43F5E] transition-all cursor-pointer"
                >
                  Check
                </button>
              </div>
            </div>
            {/* Error message */}
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
          <div className="text-white text-l">
            Delhivery by 30 Dec, Monday |{" "}
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex gap-8">
            <button className="w-48 border-[1px] border-[#F43F5E] rounded-md px-5 py-[10px] flex justify-center items-center gap-2 bg-transparent text-white cursor-pointer">
              Add to Bag
            </button>
            <button className="w-48 border-[1px] bg-black border-transparent bg-gradient-to-r from-[#F43F5E] to-[#F97316] hover:from-[#F97316] hover:to-[#F43F5E] rounded-md px-5 py-[10px] flex justify-center items-center gap-2 bg-transparent text-white cursor-pointer">
              Buy Now
            </button>
          </div>

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
          <div className="sectionBg w-full h-auto flex flex-col gap-5">
            <p className="text-[14px] md:text-[16px] text-[#E5E5E5] font-normal leading-normal">
              <span className="text-[#FACA15] font-semibold">
                Shipping Policy :
              </span>{" "}
              If a session is cancelled within 24 hours of the scheduled start
              time, no refund will be provided. For cancellations made
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
              READ SHIPPING POLICY
            </a>
          </div>
        </div>
      </section>
      <div className="text-white text-4xl ml-24 mr-auto">Similiar Products</div>
      <br />
      <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
        {visibleCards3.map((card1) => (
          <div key={card1.id}>
            <Card
              id={card1.id}
              imageUrl={card1.imageUrl}
              label={card1.label}
              name={card1.name}
              description={card1.description}
              price={card1.price}
              discounted_price={card1.discounted_price}
              discount={card1.discount}
              AddToBag={card1.AddToBag}
              rating={card1.rating}
              reviews={card1.reviews}
              buttonText={card1.buttonText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymDetails;
