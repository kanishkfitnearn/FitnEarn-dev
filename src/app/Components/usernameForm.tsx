"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import userAvatar from "../../../public/userAvatar.png";
// import EmblaCarousel from "./EmblaCarousel";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { General } from "@/contexts/generalContext";

const UserNameForm = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  // const [username, setUserName] = useState<string>();
  const { username, setUserName } = General();
  const [usernameErr, setUserNameErr] = useState<string>();
  // const [isChosen, setIsChosen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const email = Cookies.get("email");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPic = searchParams.get("selectedPic");
  console.log("apiEndpoint :-", apiEndpoint);

  const handleAvatar = () => {
    axios
      .post(
        `${apiEndpoint}/api/fitnearn/web/users/onboarding/upload/avatar-image`,
        {
          email: email,
          user_image_url:
            "https://avatarimagesfne.s3.ap-south-1.amazonaws.com/Default.png",
        },
      )
      .then((response) => {
        console.log("Avatar selected:", response.data);
        if (response.data.success) {
          router.push(`/workoutHistory`);
        }
      })
      .catch((error) => {
        //console.error("Error sending avatar:", error);
      });
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^[A-Za-z\s]*$/;
    if (!username) {
      setUserNameErr("Name is required");
      return;
    }
    if (!regex.test(username)) {
      setUserNameErr("special characters and numbers are not allowed");
      return;
    }
    if (
      (username && username.length <= 3) ||
      (username && username.length > 28)
    ) {
      setUserNameErr("more than 3 and less than 28 characters required");
      return;
    } else {
      setUserNameErr("");
      setIsLoading(true);
      //console.log("email", email);
      axios
        .post(`${apiEndpoint}/api/fitnearn/web/users/onboarding/name`, {
          email: email,
          name: username,
        })
        .then((response) => {
          setIsLoading(false);
          console.log(response);
          if (response.data.success) {
            if (selectedPic) {
              router.push(`/workoutHistory`);
            } else {
              handleAvatar();
            }
          }
        })
        .catch((error) => {
          //console.log(error);
          setUserNameErr(error.response?.data?.message || "An error occurred");
          setIsLoading(false);
        });
    }
  };

  const changeAvatar = () => {
    // setIsChosen(true);
    router.push(`/chooseAvatar`);
  };

  return (
    <>
      <h1 className="text-[28px] text-[#E5E5E5] font-extrabold text-center md:text-left leading-normal mb-2 md:mb-[16px]">
        Complete your profile
      </h1>
      <article style={{ marginTop: "0" }}>
        <h2 className="text-[18px] md:text-[20px] w-full md:w-[393px] text-[#D4D4D4] text-center md:text-left font-semibold leading-normal mb-3 md:mb-[32px]">
          {" "}
          Enter your name and select your avatar to proceed.
        </h2>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleForm}
        >
          <div
            className={`flex flex-wrap md:flex-nowrap justify-center items-center mb-[12px] ${usernameErr ? "md:mb-1" : " md:mb-[23px]"} gap-[19px] `}
          >
            <div
              onClick={changeAvatar}
              className={` w-[89px] h-[89px] relative rounded-full border-solid border-[white] border-[3px]`}
            >
              <Image
                src={selectedPic ? selectedPic : userAvatar}
                className="rounded-full"
                alt="user avatar"
                height={84}
                width={84}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="absolute bottom-1 right-2"
              >
                <rect width="12" height="12" rx="6" fill="white" />
                <path
                  d="M8.83161 4.14644L6.43209 2.14642C6.37622 2.09976 6.30973 2.06287 6.23653 2.03792C6.08978 1.98736 5.92496 1.98736 5.77822 2.03792C5.70501 2.06287 5.63853 2.09976 5.58266 2.14642L3.18314 4.14644C3.12584 4.19257 3.08014 4.24774 3.0487 4.30874C3.01726 4.36975 3.00071 4.43536 3.00002 4.50175C2.99933 4.56814 3.01451 4.63398 3.04467 4.69543C3.07483 4.75688 3.11938 4.8127 3.1757 4.85965C3.23203 4.9066 3.299 4.94372 3.37273 4.96886C3.44645 4.994 3.52544 5.00666 3.60509 5.00608C3.68474 5.0055 3.76346 4.99171 3.83665 4.9655C3.90984 4.9393 3.97603 4.90121 4.03137 4.85345L5.40809 3.70694V8.49999C5.40809 8.6326 5.47129 8.75978 5.58379 8.85355C5.69629 8.94732 5.84887 9 6.00797 9C6.16707 9 6.31965 8.94732 6.43215 8.85355C6.54465 8.75978 6.60785 8.6326 6.60785 8.49999V3.70694L7.98338 4.85345C8.09651 4.94453 8.24805 4.99493 8.40533 4.99379C8.56262 4.99265 8.71308 4.94007 8.8243 4.84736C8.93552 4.75466 8.99861 4.62925 8.99998 4.49815C9.00134 4.36705 8.94088 4.24075 8.83161 4.14644Z"
                  fill="#525252"
                />
              </svg>
            </div>
            <div className={`flex flex-col`}>
              <label
                htmlFor="username"
                className="text-[#E5E5E5] text-[22px] font-bold leading-normal mb-2"
              >
                Name<sup className={usernameErr ? "text-[#EF4444]" : ""}>*</sup>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                className="md:w-[285px] w-[270px] h-[48px] bg-[#404040] rounded-[10px] pl-[20px] py-[12px] text-[18px] text-[#ffffff] border-none focus:outline-none focus:ring-[#FFFFFF]"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                minLength={3}
                maxLength={28}
              />
              {usernameErr ? (
                <span className="flex gap-2 mt-2">
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
                  <span className="text-[#EF4444] text-[12px] leading-normal font-extrabold ">
                    {usernameErr}
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
            {/* avatar image selection code is here */}
            {/* <div className={isChosen ? "block" : "hidden"}>
                        <EmblaCarousel options={{ loop: true }} />
                        </div> */}
          </div>
          <button
            type="submit"
            className="primaryButton w-[270px] md:w-[393px] h-[43px] rounded-[8px] py-2 flex justify-center items-center text-[18px] text-[#DADADA] font-semibold leading-normal"
          >
            {isLoading ? "...Loading" : "Continue"}
          </button>
        </form>
      </article>
    </>
  );
};

const UserNameFormWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UserNameForm />
  </Suspense>
);

export default UserNameFormWrapper;
