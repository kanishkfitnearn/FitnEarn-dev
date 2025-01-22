"use client";
import Image from "next/image";
// import Logo from "../../../public/logo.png";
import Logo from "../../../public/fitnearnLogo.png";
// import Logo from "./Logo";
import ProfileAvatar from "../../../public/profileAvatar.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Notification from "./notification/notification";

const Navbar = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [profilePic, setProfilePic] = useState<string>();
  const [username, setUsername] = useState<string | undefined>(); //google username is from cognito
  const [name, setName] = useState<string | null>("");
  const router = useRouter();

  const userId = Cookies.get("user_id");
  const token = Cookies.get("genToken");
  const emailFromCookie = Cookies.get("email");
  //console.log("emailFromCookie", emailFromCookie);
  // const username = Cookies.get("username");
  //console.log("userId: ", userId);

  useEffect(() => {
    const cookieUsername = Cookies.get("username");
    setUsername(cookieUsername);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (pathname === "/") {
      setActiveLink("home");
      return;
    }
    const path = pathname.replace(/^\/+/, "");
    //console.log("pathname : ", path);
    localStorage.setItem("activeLink", pathname);
    setActiveLink(path);
  }, []);

  const setLink = (pageLink: string) => {
    setActiveLink(pageLink);
    setIsMenuOpen(false);
    localStorage.setItem("activeLink", pageLink);
  };

  const compareEmails = () => {
    if (!token || !emailFromCookie) {
      //console.log("Token or email not found in cookies.");
      return false;
    }

    try {
      const decodedToken = jwt.decode(token);

      if (
        decodedToken &&
        typeof decodedToken !== "string" &&
        "email" in decodedToken
      ) {
        const emailFromToken = (decodedToken as JwtPayload).email;

        if (emailFromToken === emailFromCookie) {
          //console.log("Emails match!");
          //if (onboardingAllDone){
          //setUser(true)}lse{
          //   navigate("/onboarding-to-where-the-user-left")
          // }
          //

          //post -> on each onboarding-> path -> create the table of all the pathjs of onboarding -> function isOnboardingDone -> if any of the paths are missing -> get api on the home page -> the missing path should be fetched from the db table -> pass the missing path as a link on the login button-> insted of my profile button
          setUser(true);
          return true;
        } else {
          //console.log("Emails do not match.");
          return false;
        }
      } else {
        //console.error("Invalid token structure.");
        return false;
      }
    } catch (error) {
      //console.error("Error decoding token:", error);
      return false;
    }
  };

  const fetchUserAvatar = async () => {
    if (!emailFromCookie) {
      return false;
    } else {
      let res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/onboarding/avatar-image/getByEmail/${emailFromCookie}`,
      );
      let result = await res.json();
      console.log("result from fetchUserAvatar", result);
      if (result.success) {
        setProfilePic(result.userAvatarImage.user_image_url);
      }
    }
  };

  useEffect(() => {
    compareEmails();
    fetchUserAvatar();
  }, []);

  const checkOnboardingStatus = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }
    try {
      const statusResponse = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/onboarding/status/${userId}`,
      );
      const statusResult = await statusResponse.json();

      if (statusResult.success) {
        // console.log(
        //   "We are successfully redirecting user to the home page after checking the status",
        // );
        if (user) {
          setLink("profile");
          router.push(`/profile/${userId}`);
        }
        // href={user ? `/profile/${userId}` : "/login"}
      } else {
        //console.log(statusResult.message);
        router.push(`/${statusResult.missingPage}`);
        // window.location.href
      }
    } catch (err) {
      //console.log("Error while checking a status", err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        return;
      }
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/profile/get-profile?userId=${userId}`,
        );
        const data = await response.json();
        if (data.success) {
          console.log("fetchUserProfile", data);
          setName(data.userProfile.name);
        } else {
          //console.error("Failed to fetch user profile");
        }
      } catch (error) {
        //console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <>
      <nav className="navbar border-gray-200 dark:bg-gray-900 w-[100vw] h-[64px] md:h-[70px] fixed z-50">
        <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-[13px] ">
          <Link
            href="/home"
            onClick={() => setLink("home")}
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <Image
              src={Logo}
              alt="logo"
              width={48}
              height={48}
              className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] ml-4 md:ml-0 mt-[12px] md:mt-0"
            />
            {/* <Logo /> */}
            <span className="logoName hidden md:block self-center text-[30px] font-extrabold whitespace-nowrap leading-normal ml-4">
              FitnEarn
            </span>
          </Link>

          <li
            // href={user ? `/profile/${userId}` : "/login"}
            onClick={() => checkOnboardingStatus()}
            className={`absolute right-[40px] md:hidden flex justify-center items-center gap-2`}
          >
            {profilePic && token ? (
              <Image
                src={profilePic}
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20.0026 3.33203C16.7063 3.33203 13.4839 4.30951 10.7431 6.14087C8.00229 7.97223 5.86608 10.5752 4.60462 13.6206C3.34316 16.6661 3.0131 20.0172 3.65619 23.2502C4.29928 26.4832 5.88662 29.4529 8.2175 31.7838C10.5484 34.1147 13.5181 35.702 16.7511 36.3451C19.9841 36.9882 23.3352 36.6582 26.3807 35.3967C29.4261 34.1352 32.0291 31.999 33.8604 29.2582C35.6918 26.5174 36.6693 23.2951 36.6693 19.9987C36.6644 15.5799 34.9069 11.3435 31.7824 8.21894C28.6578 5.09439 24.4214 3.33688 20.0026 3.33203ZM20.0026 11.6654C20.9915 11.6654 21.9582 11.9586 22.7805 12.508C23.6027 13.0574 24.2436 13.8383 24.622 14.7519C25.0004 15.6656 25.0995 16.6709 24.9065 17.6408C24.7136 18.6107 24.2374 19.5016 23.5381 20.2009C22.8389 20.9002 21.948 21.3764 20.9781 21.5693C20.0082 21.7622 19.0028 21.6632 18.0892 21.2848C17.1756 20.9063 16.3947 20.2655 15.8453 19.4432C15.2959 18.621 15.0026 17.6543 15.0026 16.6654C15.0026 15.3393 15.5294 14.0675 16.4671 13.1298C17.4048 12.1921 18.6765 11.6654 20.0026 11.6654ZM20.0026 33.332C17.068 33.3353 14.1976 32.4726 11.7509 30.852C11.9443 29.2405 12.7208 27.7555 13.9339 26.6772C15.147 25.5988 16.7129 25.0018 18.3359 24.9987H21.6693C23.2924 25.0018 24.8582 25.5988 26.0713 26.6772C27.2844 27.7555 28.0609 29.2405 28.2543 30.852C25.8076 32.4726 22.9373 33.3353 20.0026 33.332Z"
                  fill="#E5E5E5"
                />
              </svg>
            )}
            {username && user ? (
              <span className="md:hidden block text-[20px] text-[#E5E5E5] font-bold leading-normal">
                Me
              </span>
            ) : (
              <span className="md:hidden block text-[20px] text-[#E5E5E5] font-bold leading-normal">
                {!username ? "Signup" : "Login"}
              </span>
            )}
          </li>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={toggleMenu}
            className={`inline-flex items-center justify-center w-10 h-10 ${isMenuOpen ? "pr-4" : "p-2"} text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50`}
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M31.7621 11.6654H8.23269C7.81666 11.6654 7.41768 11.4898 7.1235 11.1772C6.82933 10.8646 6.66406 10.4407 6.66406 9.9987C6.66406 9.55667 6.82933 9.13275 7.1235 8.82019C7.41768 8.50763 7.81666 8.33203 8.23269 8.33203H31.7621C32.1781 8.33203 32.5771 8.50763 32.8713 8.82019C33.1655 9.13275 33.3307 9.55667 33.3307 9.9987C33.3307 10.4407 33.1655 10.8646 32.8713 11.1772C32.5771 11.4898 32.1781 11.6654 31.7621 11.6654Z"
                  fill="#D4D4D4"
                />
                <path
                  d="M31.7621 21.6654H8.23269C7.81666 21.6654 7.41768 21.4898 7.1235 21.1772C6.82933 20.8646 6.66406 20.4407 6.66406 19.9987C6.66406 19.5567 6.82933 19.1327 7.1235 18.8202C7.41768 18.5076 7.81666 18.332 8.23269 18.332H31.7621C32.1781 18.332 32.5771 18.5076 32.8713 18.8202C33.1655 19.1327 33.3307 19.5567 33.3307 19.9987C33.3307 20.4407 33.1655 20.8646 32.8713 21.1772C32.5771 21.4898 32.1781 21.6654 31.7621 21.6654Z"
                  fill="#D4D4D4"
                />
                <path
                  d="M31.7621 31.6654H8.23269C7.81666 31.6654 7.41768 31.4898 7.1235 31.1772C6.82933 30.8646 6.66406 30.4407 6.66406 29.9987C6.66406 29.5567 6.82933 29.1327 7.1235 28.8202C7.41768 28.5076 7.81666 28.332 8.23269 28.332H31.7621C32.1781 28.332 32.5771 28.5076 32.8713 28.8202C33.1655 29.1327 33.3307 29.5567 33.3307 29.9987C33.3307 30.4407 33.1655 30.8646 32.8713 31.1772C32.5771 31.4898 32.1781 31.6654 31.7621 31.6654Z"
                  fill="#D4D4D4"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M13.4263 12.5123L18.7193 7.21929C18.8148 7.12704 18.891 7.0167 18.9434 6.89469C18.9958 6.77269 19.0234 6.64147 19.0245 6.50869C19.0257 6.37591 19.0004 6.24423 18.9501 6.12133C18.8998 5.99844 18.8256 5.88679 18.7317 5.79289C18.6378 5.699 18.5261 5.62475 18.4032 5.57447C18.2803 5.52419 18.1487 5.49888 18.0159 5.50004C17.8831 5.50119 17.7519 5.52878 17.6299 5.58119C17.5079 5.6336 17.3975 5.70978 17.3053 5.80529L12.0123 11.0983L6.71929 5.80529C6.53069 5.62313 6.27808 5.52234 6.01589 5.52461C5.75369 5.52689 5.50288 5.63206 5.31747 5.81747C5.13206 6.00288 5.02689 6.25369 5.02461 6.51589C5.02234 6.77808 5.12313 7.03069 5.30529 7.21929L10.5983 12.5123L5.30529 17.8053C5.20978 17.8975 5.1336 18.0079 5.08119 18.1299C5.02878 18.2519 5.00119 18.3831 5.00004 18.5159C4.99888 18.6487 5.02419 18.7803 5.07447 18.9032C5.12475 19.0261 5.199 19.1378 5.29289 19.2317C5.38679 19.3256 5.49844 19.3998 5.62133 19.4501C5.74423 19.5004 5.87591 19.5257 6.00869 19.5245C6.14147 19.5234 6.27269 19.4958 6.39469 19.4434C6.5167 19.391 6.62704 19.3148 6.71929 19.2193L12.0123 13.9263L17.3053 19.2193C17.4939 19.4014 17.7465 19.5022 18.0087 19.5C18.2709 19.4977 18.5217 19.3925 18.7071 19.2071C18.8925 19.0217 18.9977 18.7709 19 18.5087C19.0022 18.2465 18.9014 17.9939 18.7193 17.8053L13.4263 12.5123Z"
                  fill="#F5F5F5"
                />
              </svg>
            )}
          </button>

          <div
            className={`${isMenuOpen ? "block bg-[#171717] absolute top-0 h-[100vh]" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <span
              className={`${isMenuOpen ? "block" : "hidden"} md:hidden text-[20px] text-[#FFFFFF] font-semibold leading-[30px] my-3 mx-4`}
            >
              Quick Links
            </span>
            <ul
              className={`navUi ${isMenuOpen ? "bg-[#171717]" : ""} relative font-medium flex flex-col gap-10 md:gap-2 justify-start items-start p-4 md:p-0 mt-4 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}
            >
              <li className="flex items-center justify-between w-full md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("home")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.7189 11.2929L19.7165 9.29286L12.7079 2.29279C12.5201 2.10532 12.2655 2 12 2C11.7345 2 11.4799 2.10532 11.2921 2.29279L4.28352 9.29286L2.28106 11.2929C2.09867 11.4815 1.99776 11.7341 2.00004 11.9963C2.00232 12.2585 2.10762 12.5093 2.29325 12.6947C2.47889 12.8801 2.73001 12.9853 2.99253 12.9876C3.25505 12.9899 3.50796 12.8891 3.6968 12.7069L3.99016 12.4139V20C3.99016 20.5304 4.20113 21.0391 4.57666 21.4142C4.9522 21.7893 5.46153 22 5.99262 22H8.99631C9.26185 22 9.51652 21.8946 9.70429 21.7071C9.89205 21.5196 9.99754 21.2652 9.99754 21V16.9999C9.99754 16.7347 10.103 16.4804 10.2908 16.2928C10.4786 16.1053 10.7332 15.9999 10.9988 15.9999H13.0012C13.2668 15.9999 13.5214 16.1053 13.7092 16.2928C13.897 16.4804 14.0025 16.7347 14.0025 16.9999V21C14.0025 21.2652 14.1079 21.5196 14.2957 21.7071C14.4835 21.8946 14.7381 22 15.0037 22H18.0074C18.5385 22 19.0478 21.7893 19.4233 21.4142C19.7989 21.0391 20.0098 20.5304 20.0098 20V12.4139L20.3032 12.7069C20.492 12.8891 20.7449 12.9899 21.0075 12.9876C21.27 12.9853 21.5211 12.8801 21.7067 12.6947C21.8924 12.5093 21.9977 12.2585 22 11.9963C22.0022 11.7341 21.9013 11.4815 21.7189 11.2929Z"
                      fill="url(#paint0_linear_1696_72967)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1696_72967"
                        x1="1.23077"
                        y1="14.766"
                        x2="22.6731"
                        y2="14.7694"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/home"
                    className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 ${activeLink === "home" ? "activeLink" : ""}`}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("home")}
                  className="md:hidden"
                  href="/home"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-between w-full md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("workout")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 5V19H9V13H15V19H18V5H15V11H9V5H6ZM3 15C3 15.2652 3.10536 15.5196 3.29289 15.7071C3.48043 15.8946 3.73478 16 4 16H5V8H4C3.73478 8 3.48043 8.10536 3.29289 8.29289C3.10536 8.48043 3 8.73478 3 9V11H2V13H3V15ZM21 9C21 8.73478 20.8946 8.48043 20.7071 8.29289C20.5196 8.10536 20.2652 8 20 8H19V16H20C20.2652 16 20.5196 15.8946 20.7071 15.7071C20.8946 15.5196 21 15.2652 21 15V13H22V11H21V9Z"
                      fill="url(#paint0_linear_1696_72973)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1696_72973"
                        x1="1.23077"
                        y1="13.9362"
                        x2="22.6731"
                        y2="13.9411"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/workout"
                    className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "workout" ? "activeLink" : ""}`}
                  >
                    Workout
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("workout")}
                  className="md:hidden"
                  href="/workout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-between w-full md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("blogs")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11 5.1857C9.06 4.52753 3.646 3.25323 2.293 4.58034C2.10716 4.76202 2.0019 5.00794 2 5.26492V17.6851C2 17.8568 2.04621 18.0254 2.13398 18.1741C2.22175 18.3228 2.34799 18.4462 2.50001 18.5321C2.65203 18.6179 2.82447 18.6631 3.00001 18.6631C3.17554 18.6631 3.34798 18.6179 3.5 18.5321C4.559 18.2485 9.765 19.289 11 19.999V5.1857Z"
                      fill="url(#paint0_linear_1696_72979)"
                    />
                    <path
                      d="M21.707 4.58034C20.353 3.25421 14.94 4.52753 13 5.1857V20C14.234 19.29 19.436 18.2504 20.5 18.533C20.6521 18.6189 20.8246 18.6641 21.0002 18.6641C21.1759 18.664 21.3484 18.6188 21.5004 18.5328C21.6525 18.4469 21.7787 18.3233 21.8664 18.1745C21.9541 18.0257 22.0002 17.8569 22 17.6851V5.26492C21.9981 5.00794 21.8928 4.76202 21.707 4.58034Z"
                      fill="url(#paint1_linear_1696_72979)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1696_72979"
                        x1="1.23077"
                        y1="14.2128"
                        x2="22.6731"
                        y2="14.2171"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1696_72979"
                        x1="1.23077"
                        y1="14.2128"
                        x2="22.6731"
                        y2="14.2171"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/blogs"
                    className={`block  md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "blogs" ? "activeLink" : ""}`}
                  >
                    Blogs
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("blogs")}
                  className="md:hidden"
                  href="/blogs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-between w-full md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("coach")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M12.5 11.4737C15.1765 11.4737 17.3462 9.35293 17.3462 6.73684C17.3462 4.12076 15.1765 2 12.5 2C9.82354 2 7.65385 4.12076 7.65385 6.73684C7.65385 9.35293 9.82354 11.4737 12.5 11.4737Z"
                      fill="url(#paint0_linear_1696_72991)"
                    />
                    <path
                      d="M14.1154 12.5263H10.8846C9.45705 12.528 8.08845 13.083 7.07901 14.0697C6.06957 15.0564 5.50171 16.3941 5.5 17.7895V20.9474C5.5 21.2265 5.61346 21.4943 5.81542 21.6917C6.01739 21.8891 6.29131 22 6.57692 22H18.4231C18.7087 22 18.9826 21.8891 19.1846 21.6917C19.3865 21.4943 19.5 21.2265 19.5 20.9474V17.7895C19.4983 16.3941 18.9304 15.0564 17.921 14.0697C16.9116 13.083 15.5429 12.528 14.1154 12.5263Z"
                      fill="url(#paint1_linear_1696_72991)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1696_72991"
                        x1="4.96154"
                        y1="14.766"
                        x2="19.9712"
                        y2="14.7677"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1696_72991"
                        x1="4.96154"
                        y1="14.766"
                        x2="19.9712"
                        y2="14.7677"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/coach"
                    className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "coach" ? "activeLink" : ""}`}
                  >
                    Coach
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("coach")}
                  className="md:hidden"
                  href="/coach"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-between w-full md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("calculator")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_9081_43227)">
                      <path
                        d="M19.5195 -1H4.28516C3.02512 -1 2 0.0251212 2 1.28516V7.22656H21.8047V1.28516C21.8047 0.0251212 20.7796 -1 19.5195 -1Z"
                        fill="url(#paint0_linear_9081_43227)"
                      />
                      <path
                        d="M12.6641 16.1133H21.8047V8.75H12.6641V16.1133ZM15.7109 11.6699H18.7578C19.1785 11.6699 19.5195 12.011 19.5195 12.4316C19.5195 12.8523 19.1785 13.1934 18.7578 13.1934H15.7109C15.2903 13.1934 14.9492 12.8523 14.9492 12.4316C14.9492 12.011 15.2903 11.6699 15.7109 11.6699Z"
                        fill="url(#paint1_linear_9081_43227)"
                      />
                      <path
                        d="M12.6641 25H19.5195C20.7796 25 21.8047 23.9749 21.8047 22.7148V17.6367H12.6641V25ZM15.7109 19.0332H18.7578C19.1785 19.0332 19.5195 19.3743 19.5195 19.7949C19.5195 20.2156 19.1785 20.5566 18.7578 20.5566H15.7109C15.2903 20.5566 14.9492 20.2156 14.9492 19.7949C14.9492 19.3743 15.2903 19.0332 15.7109 19.0332ZM15.7109 22.0801H18.7578C19.1785 22.0801 19.5195 22.4211 19.5195 22.8418C19.5195 23.2625 19.1785 23.6035 18.7578 23.6035H15.7109C15.2903 23.6035 14.9492 23.2625 14.9492 22.8418C14.9492 22.4211 15.2903 22.0801 15.7109 22.0801Z"
                        fill="url(#paint2_linear_9081_43227)"
                      />
                      <path
                        d="M2 16.1133H11.1406V8.75H2V16.1133ZM5.04688 11.6699H5.80859V10.9082C5.80859 10.4875 6.14964 10.1465 6.57031 10.1465C6.99098 10.1465 7.33203 10.4875 7.33203 10.9082V11.6699H8.09375C8.51442 11.6699 8.85547 12.011 8.85547 12.4316C8.85547 12.8523 8.51442 13.1934 8.09375 13.1934H7.33203V13.9551C7.33203 14.3758 6.99098 14.7168 6.57031 14.7168C6.14964 14.7168 5.80859 14.3758 5.80859 13.9551V13.1934H5.04688C4.6262 13.1934 4.28516 12.8523 4.28516 12.4316C4.28516 12.011 4.6262 11.6699 5.04688 11.6699Z"
                        fill="url(#paint3_linear_9081_43227)"
                      />
                      <path
                        d="M2 22.7148C2 23.9749 3.02512 25 4.28516 25H11.1406V17.6367H2V22.7148ZM4.9545 20.7797C4.65703 20.4823 4.65703 20 4.9545 19.7025C5.25193 19.4051 5.73425 19.4051 6.03173 19.7025L6.57031 20.2411L7.1089 19.7026C7.40632 19.4051 7.88864 19.4051 8.18612 19.7026C8.4836 20 8.4836 20.4823 8.18612 20.7798L7.64753 21.3184L8.18612 21.8569C8.4836 22.1544 8.4836 22.6367 8.18612 22.9342C8.03738 23.0829 7.84243 23.1573 7.64753 23.1573C7.45264 23.1573 7.25764 23.0829 7.10895 22.9342L6.57031 22.3956L6.03173 22.9342C5.88299 23.0829 5.68804 23.1573 5.49314 23.1573C5.29824 23.1573 5.10324 23.0829 4.95455 22.9342C4.65708 22.6367 4.65708 22.1544 4.95455 21.8569L5.49314 21.3184L4.9545 20.7797Z"
                        fill="url(#paint4_linear_9081_43227)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_9081_43227"
                        x1="1.23828"
                        y1="15.5958"
                        x2="22.4713"
                        y2="15.5984"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_9081_43227"
                        x1="1.23828"
                        y1="15.5958"
                        x2="22.4713"
                        y2="15.5984"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_9081_43227"
                        x1="1.23828"
                        y1="15.5958"
                        x2="22.4713"
                        y2="15.5984"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_9081_43227"
                        x1="1.23828"
                        y1="15.5958"
                        x2="22.4713"
                        y2="15.5984"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_9081_43227"
                        x1="1.23828"
                        y1="15.5958"
                        x2="22.4713"
                        y2="15.5984"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <clipPath id="clip0_9081_43227">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <Link
                    href="/calculator"
                    className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "calculator" ? "activeLink" : ""}`}
                  >
                    Calculator
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("calculator")}
                  className="md:hidden"
                  href="/calculator"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>
              {/* <li className="flex items-center justify-between w-full md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("gyms")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 5V19H9V13H15V19H18V5H15V11H9V5H6ZM3 15C3 15.2652 3.10536 15.5196 3.29289 15.7071C3.48043 15.8946 3.73478 16 4 16H5V8H4C3.73478 8 3.48043 8.10536 3.29289 8.29289C3.10536 8.48043 3 8.73478 3 9V11H2V13H3V15ZM21 9C21 8.73478 20.8946 8.48043 20.7071 8.29289C20.5196 8.10536 20.2652 8 20 8H19V16H20C20.2652 16 20.5196 15.8946 20.7071 15.7071C20.8946 15.5196 21 15.2652 21 15V13H22V11H21V9Z"
                      fill="url(#paint0_linear_1696_72973)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1696_72973"
                        x1="1.23077"
                        y1="13.9362"
                        x2="22.6731"
                        y2="13.9411"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/gyms"
                    className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "gyms" ? "activeLink" : ""}`}
                  >
                    Gyms
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("gyms")}
                  className="md:hidden"
                  href="/gyms"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li> */}
              <li className="flex items-center justify-between w-full md:hidden md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("contactUs")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.824 7.937C10.089 7.937 10.353 7.833 10.55 7.625C11.291 6.845 12.613 6.815 13.385 7.56C13.783 7.943 14.416 7.932 14.799 7.534C15.183 7.137 15.171 6.503 14.774 6.12C14.024 5.397 13.039 5 12 5C10.908 5 9.851 5.455 9.099 6.249C8.719 6.649 8.736 7.283 9.136 7.663C9.329 7.846 9.577 7.937 9.824 7.937Z"
                      fill="url(#paint0_linear_10389_56317)"
                    />
                    <path
                      d="M19 9C19 5.14 15.859 2 12 2C8.141 2 5 5.14 5 9C3.346 9 2 10.346 2 12V14C2 15.654 3.346 17 5 17H6C6.553 17 7 16.552 7 16V9C7 6.243 9.243 4 12 4C14.757 4 17 6.243 17 9V16.083C17 17.692 15.691 19 14.083 19H14C14 17.897 13.103 17 12 17H11C9.897 17 9 17.897 9 19V20C9 21.103 9.897 22 11 22H12C12.737 22 13.375 21.595 13.722 21H14.083C16.48 21 18.476 19.273 18.907 17H19C20.654 17 22 15.654 22 14V12C22 10.346 20.654 9 19 9Z"
                      fill="url(#paint1_linear_10389_56317)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10389_56317"
                        x1="1.23077"
                        y1="14.766"
                        x2="22.6731"
                        y2="14.7694"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_10389_56317"
                        x1="1.23077"
                        y1="14.766"
                        x2="22.6731"
                        y2="14.7694"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/contactUs"
                    className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "contactUs" ? "activeLink" : ""}`}
                  >
                    Support
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("contactUs")}
                  className="md:hidden"
                  href="/contactUs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-between w-full md:hidden md:items-center md:justify-center md:gap-2">
                <div
                  onClick={() => setLink("language")}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.00001 12C9.00001 10.9455 9.06601 9.9375 9.18751 9H14.8125C14.9325 9.9375 15 10.9455 15 12C15 13.0545 14.934 14.0625 14.8125 15H9.18751C9.06239 14.0049 8.99977 13.0029 9.00001 12ZM7.67551 15C7.55809 14.0043 7.49948 13.0026 7.50001 12C7.50001 10.9605 7.56001 9.9525 7.67551 9H3.51001C3.17096 9.9638 2.99849 10.9783 3.00001 12C3.00001 13.0515 3.18001 14.061 3.51151 15H7.67551ZM4.20451 16.5H7.90951C8.09701 17.4825 8.34751 18.381 8.64901 19.164C8.85001 19.6875 9.07801 20.172 9.33451 20.5995C7.17063 19.9252 5.33943 18.4619 4.20451 16.5ZM9.43801 16.5H14.562C14.417 17.224 14.2128 17.9349 13.9515 18.6255C13.632 19.4565 13.269 20.079 12.9045 20.4795C12.54 20.88 12.234 21 12 21C11.766 21 11.46 20.88 11.0955 20.4795C10.731 20.079 10.368 19.4565 10.0485 18.6255C9.78723 17.9349 9.58304 17.224 9.43801 16.5ZM16.092 16.5C15.9236 17.408 15.6756 18.2994 15.351 19.164C15.1653 19.6618 14.9359 20.1422 14.6655 20.5995C16.8294 19.9252 18.6606 18.4619 19.7955 16.5H16.092ZM20.487 15C20.8271 14.0364 21.0006 13.0219 21 12C21.001 10.9782 20.8281 9.96371 20.4885 9H16.3245C16.4385 9.9525 16.5 10.9605 16.5 12C16.5 13.0395 16.44 14.0475 16.3245 15H20.487ZM13.953 5.3745C14.1915 5.9955 14.3985 6.7095 14.5635 7.5H9.43801C9.60301 6.7095 9.81001 5.9955 10.0485 5.3745C10.368 4.5435 10.731 3.921 11.0955 3.5205C11.46 3.12 11.766 3 12 3C12.234 3 12.54 3.12 12.9045 3.5205C13.269 3.921 13.632 4.5435 13.9515 5.3745M16.092 7.5H19.797C18.6617 5.53783 16.83 4.07444 14.6655 3.4005C14.9205 3.828 15.15 4.3125 15.351 4.836C15.6525 5.619 15.903 6.516 16.092 7.5ZM4.20451 7.5H7.90951C8.07744 6.59204 8.3249 5.70061 8.64901 4.836C8.85001 4.3125 9.07801 3.828 9.33451 3.4005C7.17063 4.07477 5.33943 5.53812 4.20451 7.5Z"
                      fill="url(#paint0_linear_10389_56339)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10389_56339"
                        x1="2.30769"
                        y1="14.4894"
                        x2="21.6058"
                        y2="14.4925"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link
                    href="/language"
                    className={`flex flex-col md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "language" ? "activeLink" : ""}`}
                  >
                    <span>India</span>
                    <span className="text-[14px] text-[#A3A3A3] font-normal leading-normal">
                      English
                    </span>
                  </Link>
                </div>
                <Link
                  onClick={() => setLink("language")}
                  className="md:hidden"
                  href="/language"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </Link>
              </li>

              {!user ? (
                <li className="items-center justify-between hidden w-full md:flex md:justify-center md:gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.5 11.4737C15.1765 11.4737 17.3462 9.35293 17.3462 6.73684C17.3462 4.12076 15.1765 2 12.5 2C9.82354 2 7.65385 4.12076 7.65385 6.73684C7.65385 9.35293 9.82354 11.4737 12.5 11.4737Z"
                        fill="url(#paint0_linear_1696_72991)"
                      />
                      <path
                        d="M14.1154 12.5263H10.8846C9.45705 12.528 8.08845 13.083 7.07901 14.0697C6.06957 15.0564 5.50171 16.3941 5.5 17.7895V20.9474C5.5 21.2265 5.61346 21.4943 5.81542 21.6917C6.01739 21.8891 6.29131 22 6.57692 22H18.4231C18.7087 22 18.9826 21.8891 19.1846 21.6917C19.3865 21.4943 19.5 21.2265 19.5 20.9474V17.7895C19.4983 16.3941 18.9304 15.0564 17.921 14.0697C16.9116 13.083 15.5429 12.528 14.1154 12.5263Z"
                        fill="url(#paint1_linear_1696_72991)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1696_72991"
                          x1="4.96154"
                          y1="14.766"
                          x2="19.9712"
                          y2="14.7677"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_1696_72991"
                          x1="4.96154"
                          y1="14.766"
                          x2="19.9712"
                          y2="14.7677"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F43F5E" />
                          <stop offset="1" stopColor="#FB923C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {username ? (
                      <Link
                        href={"/login"}
                        className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "signup" ? "activeLink" : "underline"}`}
                        suppressHydrationWarning
                      >
                        Login
                      </Link>
                    ) : (
                      <Link
                        href={"/signup"}
                        className={`block md:px-0 text-[#E5E5E5] text-[18px] font-bold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "signup" ? "activeLink" : "underline"}`}
                        suppressHydrationWarning
                      >
                        Signup
                      </Link>
                    )}
                  </div>
                  <Link
                    className="md:hidden"
                    href={username ? "/login" : "/signup"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16.0001 12.0004C16.0001 12.5274 15.7751 13.0394 15.3841 13.4044L9.68306 18.7304C9.27905 19.1074 8.64606 19.0864 8.26906 18.6834C7.89406 18.2804 7.91406 17.6464 8.31706 17.2704L13.9571 12.0004L8.31706 6.73044C7.91306 6.35444 7.89306 5.71944 8.26906 5.31744C8.64606 4.91444 9.27905 4.89244 9.68306 5.26944L15.3841 10.5954C15.7751 10.9614 16.0001 11.4734 16.0001 12.0004Z"
                        fill="#E5E5E5"
                      />
                    </svg>
                  </Link>
                </li>
              ) : (
                ""
              )}

              {
                user ? <Notification profilePic={profilePic}/> : ""
              }
              
              <li
                onClick={() => checkOnboardingStatus()}
                // setLink("profile")
                className="items-center justify-center hidden gap-1 cursor-pointer md:flex"
              >
                <ul>
                <li
                  // href={user ? `/profile/${userId}` : "/login"}
                  className={`flex justify-center items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent `}
                >
                  {profilePic && token ? (
                    <Image
                      src={profilePic ? profilePic : ProfileAvatar}
                      alt="profile avatar"
                      width={32}
                      height={32}
                      className="mr-2 rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M20.0026 3.33203C16.7063 3.33203 13.4839 4.30951 10.7431 6.14087C8.00229 7.97223 5.86608 10.5752 4.60462 13.6206C3.34316 16.6661 3.0131 20.0172 3.65619 23.2502C4.29928 26.4832 5.88662 29.4529 8.2175 31.7838C10.5484 34.1147 13.5181 35.702 16.7511 36.3451C19.9841 36.9882 23.3352 36.6582 26.3807 35.3967C29.4261 34.1352 32.0291 31.999 33.8604 29.2582C35.6918 26.5174 36.6693 23.2951 36.6693 19.9987C36.6644 15.5799 34.9069 11.3435 31.7824 8.21894C28.6578 5.09439 24.4214 3.33688 20.0026 3.33203ZM20.0026 11.6654C20.9915 11.6654 21.9582 11.9586 22.7805 12.508C23.6027 13.0574 24.2436 13.8383 24.622 14.7519C25.0004 15.6656 25.0995 16.6709 24.9065 17.6408C24.7136 18.6107 24.2374 19.5016 23.5381 20.2009C22.8389 20.9002 21.948 21.3764 20.9781 21.5693C20.0082 21.7622 19.0028 21.6632 18.0892 21.2848C17.1756 20.9063 16.3947 20.2655 15.8453 19.4432C15.2959 18.621 15.0026 17.6543 15.0026 16.6654C15.0026 15.3393 15.5294 14.0675 16.4671 13.1298C17.4048 12.1921 18.6765 11.6654 20.0026 11.6654ZM20.0026 33.332C17.068 33.3353 14.1976 32.4726 11.7509 30.852C11.9443 29.2405 12.7208 27.7555 13.9339 26.6772C15.147 25.5988 16.7129 25.0018 18.3359 24.9987H21.6693C23.2924 25.0018 24.8582 25.5988 26.0713 26.6772C27.2844 27.7555 28.0609 29.2405 28.2543 30.852C25.8076 32.4726 22.9373 33.3353 20.0026 33.332Z"
                        fill="#E5E5E5"
                      />
                    </svg>
                  )}

                  {/* <span className="text-[#D4D4D4] text-[18px] font-semibold leading-normal"> */}
                  <div
                    className={`text-[#D4D4D4] whitespace-nowrap text-[18px] font-semibold leading-normal ${activeLink === "profile" ? "activeLink" : ""}`}
                  >
                    {!user ? "" : name}
                  </div>
                </li>
                </ul>
              </li>
            </ul>
            
            <div className="mt-[150px] flex justify-start p-4 md:hidden">
              {user ? (
                <Dialog>
                  <DialogTrigger>
                    <li
                      onClick={() => setLink("logout")}
                      className="flex items-center justify-center gap-1 "
                    >
                      <svg
                        className="block md:hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M26.5666 15.4894C26.4986 15.3254 26.4013 15.1787 26.2773 15.0547L20.9453 9.7227C20.4239 9.20136 19.5813 9.20136 19.0599 9.7227C18.5386 10.244 18.5386 11.0867 19.0599 11.608L22.1173 14.6654H10.6693C9.93194 14.6654 9.33594 15.2627 9.33594 15.9987C9.33594 16.7347 9.93194 17.332 10.6693 17.332H22.1173L19.0599 20.3894C18.5386 20.9107 18.5386 21.7534 19.0599 22.2747C19.3199 22.5347 19.6613 22.6654 20.0026 22.6654C20.3439 22.6654 20.6853 22.5347 20.9453 22.2747L26.2773 16.9427C26.4013 16.82 26.4986 16.672 26.5666 16.508C26.7013 16.1827 26.7013 15.8147 26.5666 15.4894Z"
                          fill="url(#paint0_linear_1788_19196)"
                        />
                        <path
                          d="M13.3359 23.9987H9.33594C8.59994 23.9987 8.0026 23.4 8.0026 22.6654V9.33203C8.0026 8.59736 8.59994 7.9987 9.33594 7.9987H13.3359C14.0733 7.9987 14.6693 7.40136 14.6693 6.66536C14.6693 5.92936 14.0733 5.33203 13.3359 5.33203H9.33594C7.1306 5.33203 5.33594 7.1267 5.33594 9.33203V22.6654C5.33594 24.8707 7.1306 26.6654 9.33594 26.6654H13.3359C14.0733 26.6654 14.6693 26.068 14.6693 25.332C14.6693 24.596 14.0733 23.9987 13.3359 23.9987Z"
                          fill="url(#paint1_linear_1788_19196)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1788_19196"
                            x1="26.2002"
                            y1="26.6654"
                            x2="4.23684"
                            y2="25.4664"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1788_19196"
                            x1="26.2002"
                            y1="26.6654"
                            x2="4.23684"
                            y2="25.4664"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span
                        className={`block py-2 px-2 md:px-0 text-[#D4D4D4] text-[18px] font-semibold leading-normal rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                      >
                        Log Out
                      </span>
                    </li>
                  </DialogTrigger>
                  <DialogContent className="logout-dialog">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <form
                          action="/api/auth/signout"
                          method="GET"
                          className="flex flex-col items-center justify-center mt-6"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            fill="none"
                          >
                            <path
                              d="M43.3359 46.668H36.6693V30.0013H43.3359M43.3359 60.0013H36.6693V53.3346H43.3359M3.33594 70.0013H76.6693L40.0026 6.66797L3.33594 70.0013Z"
                              fill="#991B1B"
                            />
                          </svg>
                          <h1 className="text-[32px] text-[#FFFFFF] font-bold leading-normal">
                            Log Out
                          </h1>
                          <h5 className="text-[18px] text-[#F5F5F5] font-normal leading-normal">
                            Are you sure you want to log out ?
                          </h5>
                          <div className="flex items-center justify-center gap-6 mt-4">
                            <DialogClose className="text-[16px] text-[#FFFFFF] font-normal leading-[24px] px-4 py-[6px] rounded-[11px] border-[1px] border-[#F5F5F5]">
                              Cancel
                            </DialogClose>
                            <button
                              type="submit"
                              className="text-[16px] text-[#FFFFFF] font-normal leading-[24px] px-4 py-[6px] rounded-[8px] border-[1px] border-[#C72D65]"
                              style={{
                                background:
                                  "radial-gradient(12158.65% 140.68% at 99.42% 0%, #EB4C60 0%, #EB4C60 48.44%, #EB4C60 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #C72D65 0%, #D23760 48.44%, #D23755 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #C72D65 0%, #D23760 48.44%, #D23755 100%)",
                              }}
                            >
                              Log Out
                            </button>
                          </div>
                        </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
