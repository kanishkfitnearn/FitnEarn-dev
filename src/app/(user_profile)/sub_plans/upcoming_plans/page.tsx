"use client";
import UserNavbar from "@/app/Components/UserNavbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Link from "next/link";
import QueryForm from "../QueryFrom";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Popup from "@/app/Components/Popup";
const Page = () => {

  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [data, isData] = useState(true);
  const router = useRouter();
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [showWarningPopUp, setShowWarningPopUp] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [showRepeat, setShowRepeat] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isUpcomingPlan, setUpcomingPlan] = useState(false);
  const [ShowCancellationTermsModal, setShowCancellationTermsModal] =
    useState(false);
  const [selected, setSelected] = useState("");
  const [raiseTicket, setRaiseTicket] = useState(false);
  const user_id = Cookies.get("user_id");
  const navItems = [
    { name: "Active Plans", path: "/sub_plans/active_plans" },
    { name: "Upcoming Plans", path: "/sub_plans/upcoming_plans" },
    { name: "Purchase History", path: "/sub_plans/inactive_plans" },
  ];
  const plan_id = parseInt(Cookies.get("plan_id") || "0");
  const pathname = usePathname();
  const { toast } = useToast();
  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelected(currentItem.name);
    } else {
      setSelected("Upcoming Plans");
    }
  }, [pathname]);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchUpcomingSubscription = async () => {
    const userId = Cookies.get("user_id");
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/subscription-plan/upcoming/${userId}`,
      );
      const hasUpcomingPlan = !!response.data.subscription;
      setUpcomingPlan(hasUpcomingPlan);
      return hasUpcomingPlan;
    } catch (error) {
      //console.error("Error fetching upcoming subscription:", error);
      setUpcomingPlan(true);

      return false;
    }
  };
  const repeatSubscriptionDetails = async () => {
    const userId = Cookies.get("user_id");
    // const userId = "670f6926a121e6d5f9640ec1";
    // const plan_id = 2;
    const plan_id = Cookies.get("plan_id");
    try {
      const hasUpcomingPlan = await fetchUpcomingSubscription();

      if (hasUpcomingPlan) {
        toast({
          title: "Cannot repeat plan twice!",
          description: "You already have an upcoming plan.",
          duration: 5000,
        });
        return;
      }

      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/subscription/repeat/show-upcoming-plan?userId=${userId}&planId=${plan_id}`,
      );

      const {
        originalPrice,
        discountedPrice,
        discountValue,
        renewalDate,
        planId,
      } = response.data.upcomingPlanDetails;

      Cookies.set("repeatSubPlanPrice", originalPrice);
      Cookies.set("repeatSubPlanValidity", renewalDate);
      Cookies.set("repeatSubPlanId", planId);
      Cookies.set("repeatPlanDiscountVal", discountValue);
      Cookies.set("repeatPlanFinalPrice", discountedPrice);

      router.push("/sub_plans/repeat_plan");
      return response.data.upcomingPlanDetails;
    } catch (error) {
      //console.error("Error Fetching repeated subscription:", error);
      toast({
        title: "Can Not repeat Plan twice.",
        description: "You already have an upcoming plan.",
        duration: 5000,
      });
    }
  };

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const fetchActiveSubscription = async (userId: any) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/subscription-plan/upcoming/${userId}`,
      );
      return response.data.subscription;
    } catch (error) {
      //console.error("Error fetching upcoming subscription:", error);

      throw error;
    }
  };
  const checkUpcomingPlanBeforeUpgrade = async () => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/subscription/upgrade/check-upcoming-plan?userId=${user_id}`,
      );
      //console.log("Heheheh");
      const { planId, startDate, renewalDate, price } =
        response.data.upcomingSubscriptionDetails;
      Cookies.set("upcomingPlanPrice", price);
      Cookies.set("repeatPlanValidity", renewalDate);
      setUpcomingPlan(true);
      setShowWarningPopUp(true);
      if (response.data.upcomingSubscriptionDetails) {
        setUpcomingPlan(true);
        setShowWarningPopUp(true);
        //console.log("hehe inside the data.upcoming plans");
      } else {
        setUpcomingPlan(false);
        router.push("/subscription-plans");
      }
    } catch (error) {
      //console.log("User can uprgrade easily it has no upcoming plan");
      router.push("/subscription-plans");
    }
  };
  useEffect(() => {
    const userId = Cookies.get("user_id");
    // const userId = "6668244b91ca7fc3a382d033"; // This should ideally come from your app's state or props
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchActiveSubscription(userId);
        setActiveSubscription(data);
      } catch (err) {
        setError("Failed to fetch active subscription");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // Usage
  const repeatPlanValidity = Cookies.get("repeatPlanValidity");
  const formattedDate = formatDate(repeatPlanValidity);
  if (isLoading)
    return (
      <div className="absolute top-0 left-0">
        {" "}
        <Loader />
      </div>
    );

  const handleConfirmUpgrade = () => {
    router.push("/subscription-plans");
  };
  const removePopUP = () => {
    setShowWarningPopUp(false);
  };
  if (error)
    return (
      <div className="m-auto py-28">
        {showRepeat && (
          <div className="bg-[#4d4d4d] justify-center z-50  w-[580px] h-[397px] mq450:w-[300px] mq450:top-[190px] rounded-xl align-center absolute mq450:left-[30px] left-[450px] top-[152.50px] flex-col justify-start items-center  inline-flex ">
            <svg
              onClick={() => {
                setShowRepeat(false);
              }}
              className="ml-[500px] mq450:w-[24px] mq450:mt-[-5px] cursor-pointer mq450:ml-56"
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M26.8526 24.0246L37.4386 13.4386C37.6296 13.2541 37.782 13.0334 37.8868 12.7894C37.9916 12.5454 38.0468 12.2829 38.0491 12.0174C38.0514 11.7518 38.0008 11.4885 37.9002 11.2427C37.7997 10.9969 37.6512 10.7736 37.4634 10.5858C37.2756 10.398 37.0523 10.2495 36.8065 10.1489C36.5607 10.0484 36.2973 9.99777 36.0318 10.0001C35.7662 10.0024 35.5038 10.0576 35.2598 10.1624C35.0158 10.2672 34.7951 10.4196 34.6106 10.6106L24.0246 21.1966L13.4386 10.6106C13.0614 10.2463 12.5562 10.0447 12.0318 10.0492C11.5074 10.0538 11.0058 10.2641 10.6349 10.6349C10.2641 11.0058 10.0538 11.5074 10.0492 12.0318C10.0447 12.5562 10.2463 13.0614 10.6106 13.4386L21.1966 24.0246L10.6106 34.6106C10.4196 34.7951 10.2672 35.0158 10.1624 35.2598C10.0576 35.5038 10.0024 35.7662 10.0001 36.0318C9.99777 36.2973 10.0484 36.5607 10.1489 36.8065C10.2495 37.0523 10.398 37.2756 10.5858 37.4634C10.7736 37.6512 10.9969 37.7997 11.2427 37.9002C11.4885 38.0008 11.7518 38.0514 12.0174 38.0491C12.2829 38.0468 12.5454 37.9916 12.7894 37.8868C13.0334 37.782 13.2541 37.6296 13.4386 37.4386L24.0246 26.8526L34.6106 37.4386C34.9878 37.8029 35.493 38.0045 36.0174 37.9999C36.5418 37.9954 37.0434 37.785 37.4142 37.4142C37.785 37.0434 37.9954 36.5418 37.9999 36.0174C38.0045 35.493 37.8029 34.9878 37.4386 34.6106L26.8526 24.0246Z"
                fill="#D4D4D4"
              />
            </svg>
            <div className="flex inline-flex flex-col items-center justify-center gap-1 ">
              <Image height={100} width={120} src="/Crown.png" alt="" />
              <p className="text-white mq450:text-[25px] text-[40px] mq450:pt-2 font-bold font-Lato leading-[60px] pt-5">
                Repeat Plan
              </p>
              <p className="text-xl font-semibold text-center mq450:text-[16px] text-neutral-100 font-Lato">
                Are you sure you want to repeat your plan?
              </p>

              <div className="flex items-start justify-center gap-4 pt-5">
                <button
                  onClick={() => {
                    setShowRepeat(false);
                  }}
                  className="items-center justify-center px-4 py-2 text-white transition duration-200 border rounded rounded-lg border-neutral-100"
                >
                  Go Back
                </button>
                <button
                  onClick={repeatSubscriptionDetails}
                  className="px-4 py-2 text-white transition duration-200 rounded bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        <UserNavbar activeplans={true} plansactivecolor="neutral-700" />
        <div className="flex items-center gap-8 ml-44 mq450:ml-2 mq450:mt-14">
          <div className="flex items-center gap-5  mq450:gap-3 border-neutral-500 mq450:w-[340px] mq450:overflow-x-auto mq450:scrollbar-thin">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative pb-2 text-2xl font-bold text-nowrap mq450:text-xl font-Lato ${
                  selected === item.name
                    ? "bg-clip-text text-transparent font-semibold bg-gradient-to-r from-[#F43F5E] to-[#FB923C]"
                    : "text-neutral-400"
                }`}
                onClick={() => setSelected(item.name)}
              >
                {item.name}
                {selected === item.name && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]" />
                )}
              </Link>
            ))}
            <div className="flex gap-5  mq450:flex-row-reverse mq450:gap-3 mq450:absolute mq450:left-[170px] mq450:top-[215px] z-20">
              <div className="flex gap-5 mq450:flex-row-reverse mq450:gap-3 mq450:absolute mq450:left-[10px] mq450:top-[-8px] z-20">
                {plan_id != 4 ? (
                  // <Link href="/subscription-plans">
                  <button
                    onClick={checkUpcomingPlanBeforeUpgrade}
                    className="w-[111px] text-white mq450:text-xs mq450:w-[80px] mq1050:ml-[0px] border hover:border hover:border-neutral-500  mq1240:ml-[12px] bg-gradient-to-r from-[#F43F5E] hover:bg-transparent to-[#FB923C] mq450:ml-[2px] ml-[370px] hover:bg-transparent text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
                  >
                    Upgrade Plan
                  </button>
                ) : (
                  // </Link>
                  ""
                )}
                <button
                  onClick={() => {
                    setRaiseTicket(!raiseTicket);
                  }}
                  className={` hover:bg-gradient-to-r hover:border hover:border-neutral-50 hover:from-[#F43F5E] hover:to-[#FB923C] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px] mq1240:ml-[00px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[px] ml-[00px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex ${
                    plan_id == 4
                      ? "ml-[500px] mq450:ml-24 mq450:top-[-210px]"
                      : ""
                  }`}
                >
                  Raise Ticket
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mq450:flex-row hidden flex-row-reverse mq450:gap-3 mq450:absolute mq450:left-[180px] mq450:top-[210px] z-20">
            <button
              onClick={() => {
                setRaiseTicket(!raiseTicket);
              }}
              className="w-[111px] text-white mq450:text-xs    mq450:w-[80px] mq1050:ml-[0px]  mq1240:ml-[12px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[2px] ml-[370px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
            >
              Raise Ticket
            </button>
            {activeSubscription?.plan_id != 4 ? (
              <button
                onClick={checkUpcomingPlanBeforeUpgrade}
                className="w-[111px] text-white mq1050:ml-[00px]   mq450:text-xs mq450:w-[80px]  mq1240:ml-[00px] bg-gradient-to-r from-[#F43F5E] to-[#FB923C] mq450:ml-[px] ml-[00px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
              >
                Upgrade Plan
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-16">
          <Image
            width={350}
            height={400}
            quality={100}
            src="/no_active_plan.png"
            alt="no active plan"
          />
          <div className="flex flex-col items-center justify-center gap-5  mt-10 text-center p-">
            <p className="text-2xl font-semibold text-neutral-400 font-Lato ">
            You have no upcoming plan 🙌
            </p>
            <p className="text-lg font-medium text-neutral-400 font-Lato mq450:w-[300px] w-[470px] ">
            Choose a subscription plan to access exclusive workouts, live sessions, and many more with FitnEarn Premium!
            </p>
            <button
              onClick={() => {
                setShowRepeat(true);
                //console.log("clciked repreat plan");
              }}
              className="w-[150px] h-[35px] text-white px-3 py-2 bg-gradient-to-l from-pink-600 to-orange-500 rounded-lg justify-center items-center gap-2 inline-flex"
            >
              Repeat plan
            </button>
          </div>
        </div>
        {raiseTicket && (
          <QueryForm
            close={() => {
              setRaiseTicket(false);
            }}
          />
        )}
      </div>
    );
  if (!activeSubscription) return <div>No active subscription found.</div>;

  return (
    <div className="relative mq450:static ">
      {raiseTicket && (
        <QueryForm
          close={() => {
            setRaiseTicket(false);
          }}
        />
      )}

      <UserNavbar activeplans={true} plansactivecolor="neutral-700" />
      {data ? (
        <div className="absolute text-white mq450:ml-2 top-28 left-44 mq450:left-[5px] mq450:mt-14 w-fit">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-5  mq450:gap-3 border-neutral-500 mq450:w-[340px] mq450:overflow-x-auto mq450:scrollbar-thin">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative pb-2 text-2xl font-bold text-nowrap mq450:text-xl font-Lato ${
                    selected === item.name
                      ? "bg-clip-text text-transparent font-semibold bg-gradient-to-r from-[#F43F5E] to-[#FB923C]"
                      : "text-neutral-400"
                  }`}
                  onClick={() => setSelected(item.name)}
                >
                  {item.name}
                  {selected === item.name && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]" />
                  )}
                </Link>
              ))}
            </div>
            <div className="flex gap-5 mq450:flex-row mq450:gap-3 mq450:absolute mq450:left-[161px] mq450:top-[45px] z-20">
              {plan_id != 4 ? (
                // <Link href="/subscription-plans">
                <button
                  onClick={checkUpcomingPlanBeforeUpgrade}
                  className=" text-white mq450:text-xs mq450:w-[88px] mq1050:ml-[0px]  mq1240:ml-[12px] bg-gradient-to-r from-[#F43F5E] to-[#FB923C] mq450:ml-[2px] ml-[370px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
                >
                  Upgrade Plan
                </button>
              ) : (
                // </Link>
                ""
              )}
              <button
                onClick={() => {
                  setRaiseTicket(!raiseTicket);
                }}
                className={` hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px] mq1240:ml-[00px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[px] ml-[00px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex ${
                  plan_id == 4
                    ? "ml-[500px] mq450:mt-1 mq450:ml-[91px] mq450:top-[-220px]"
                    : ""
                }`}
              >
                Raise Ticket
              </button>
            </div>
          </div>
          {showWarningPopUp && (
            <Popup
              p1="You have plan in queue!"
              p2="Do you wish to Continue?"
              p3={`Validity: ${formattedDate}`}
              confirm={handleConfirmUpgrade}
              cancel={removePopUP}
            />
          )}

          <div className="mq1240:w-[980px] mq450:top-7 mq w-[1220px] mq450:justify-start mq450:ml-2 mq450:flex mq1050:w-[820px] mq450:flex-col mq450:h-[388px] mq450:gap-3 mq450:items-start mt-7 mq450:w-[338px] gap-32 h-[190px] relative bg-neutral-800 rounded-xl shadow border border-neutral-700 mq450:mt-7">
            <div className="flex p-5 pt-8 gap-[350px] mq1240:gap-[225px] mq450:p-5 mq450:flex-col mq450:gap-2 mq1050:gap-36">
              <div className="mq450:flex-col">
                <p className="text-lg font-bold text-white capitalize font-Lato text-nowrap text-start mq1240:text-start mq450:text-start">
                  Type Of Plan
                </p>
                <p className="pt-4 text-base font-normal capitalize text-neutral-200 font-Lato">
                  {activeSubscription.subscriptionPlan.plan_name} Plan
                </p>
                <p className="text-base font-normal capitalize text-nowrap text-neutral-200 font-Lato">
                  Purchase on {formatDate(activeSubscription.createdAt)}
                </p>
              </div>
              <hr
                style={{ backgroundColor: "neutral-700" }}
                className="mq450:w-[300px] border-neutral-600 mq450:block hidden"
              />
              <div>
                <p className="text-lg font-bold text-center text-white capitalize text-nowrap mq450:pt-2 mq450:text-start font-Lato">
                  Expiry Date
                </p>
                <p className="w-[92px] text-center pt-4 mq450:pt-2 text-nowrap text-neutral-200 text-base font-normal font-Lato capitalize">
                  {formatDate(activeSubscription.renewalDate)}
                </p>
              </div>
              <hr className="mq450:w-[300px]  border-neutral-600 mq450:block hidden" />
              <div>
                <p className="text-xl font-bold text-nowrap font-Lato mq450:pt-2">
                  Plan Amount
                </p>
                <div className="grid grid-cols-2 gap- mt-[16px] text-neutral-200 text-[16px]">
                  <p className="">Total:</p>
                  <p className="text-right">
                    {formatCurrency(activeSubscription.subscriptionPlan.price)}
                  </p>
                  <p className="text-neutral-200">Discount:</p>
                  <p className="text-right text-neutral-200">
                    -
                    {formatCurrency(
                      activeSubscription.subscriptionPlan.discountValue,
                    )}
                  </p>
                  <p className="font-semibold text-neutral-200">Grand Total:</p>
                  <p className="font-semibold text-right text-neutral-200">
                    {formatCurrency(activeSubscription.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="w-full  h-[0px] border border-neutral-700 mq450:hidden"></div> */}
          </div>

          {showNotification && (
            <div className="absolute flex flex-col items-start justify-between gap-2 p-4 py-6 mx-auto text-white border-neutral-700 border-2 rounded-xl w-[800px] top-10 left-60 bg-neutral-800 mq1050:left-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 2.25C7.66498 2.25 6.35994 2.64588 5.2499 3.38758C4.13987 4.12928 3.27471 5.18348 2.76382 6.41689C2.25292 7.65029 2.11925 9.00749 2.3797 10.3169C2.64015 11.6262 3.28303 12.829 4.22703 13.773C5.17104 14.717 6.37377 15.3598 7.68314 15.6203C8.99251 15.8807 10.3497 15.7471 11.5831 15.2362C12.8165 14.7253 13.8707 13.8601 14.6124 12.7501C15.3541 11.6401 15.75 10.335 15.75 9C15.748 7.21039 15.0362 5.49464 13.7708 4.2292C12.5054 2.96375 10.7896 2.25197 9 2.25ZM11.5022 8.12722L8.80223 10.8272C8.67565 10.9538 8.50399 11.0249 8.325 11.0249C8.14602 11.0249 7.97436 10.9538 7.84778 10.8272L6.49778 9.47722C6.37482 9.34992 6.30678 9.17941 6.30832 9.00243C6.30986 8.82545 6.38085 8.65615 6.506 8.531C6.63115 8.40585 6.80045 8.33486 6.97743 8.33332C7.15441 8.33178 7.32492 8.39982 7.45223 8.52277L8.325 9.39555L10.5478 7.17277C10.6751 7.04982 10.8456 6.98178 11.0226 6.98332C11.1996 6.98486 11.3689 7.05585 11.494 7.181C11.6192 7.30615 11.6901 7.47545 11.6917 7.65243C11.6932 7.82941 11.6252 7.99992 11.5022 8.12722Z"
                    fill="white"
                  />
                </svg>
                <h2 className="font-semibold">Amount Refunded</h2>
              </div>
              <div />
              <p className="text-sm">
                Your Subscription has been Canceled and amount will be refunded
                in next 72 hours
              </p>

              <button
                onClick={() => setShowNotification(false)}
                className="flex items-center px-4 py-1 space-x-1 text-white rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 14C6.81331 14 5.65328 13.6481 4.66658 12.9888C3.67989 12.3295 2.91085 11.3925 2.45673 10.2961C2.0026 9.19975 1.88378 7.99335 2.11529 6.82946C2.3468 5.66557 2.91825 4.59648 3.75736 3.75736C4.59648 2.91825 5.66557 2.3468 6.82946 2.11529C7.99335 1.88378 9.19975 2.0026 10.2961 2.45673C11.3925 2.91085 12.3295 3.67989 12.9888 4.66658C13.6481 5.65328 14 6.81331 14 8C13.9983 9.59076 13.3656 11.1159 12.2407 12.2407C11.1159 13.3656 9.59076 13.9983 8 14ZM8 3.2C7.05065 3.2 6.12262 3.48152 5.33326 4.00895C4.54391 4.53638 3.92868 5.28604 3.56538 6.16312C3.20208 7.04021 3.10702 8.00533 3.29223 8.93644C3.47744 9.86754 3.9346 10.7228 4.60589 11.3941C5.27718 12.0654 6.13246 12.5226 7.06357 12.7078C7.99468 12.893 8.9598 12.7979 9.83688 12.4346C10.714 12.0713 11.4636 11.4561 11.9911 10.6667C12.5185 9.87738 12.8 8.94935 12.8 8C12.7986 6.7274 12.2924 5.50733 11.3925 4.60747C10.4927 3.7076 9.2726 3.20143 8 3.2Z"
                    fill="#F5F5F5"
                  />
                  <path
                    d="M7.4 9.8C7.24088 9.79997 7.0883 9.73673 6.9758 9.6242L5.7758 8.4242C5.66651 8.31104 5.60603 8.15948 5.6074 8.00216C5.60876 7.84484 5.67187 7.69436 5.78311 7.58311C5.89436 7.47187 6.04484 7.40876 6.20216 7.4074C6.35948 7.40603 6.51104 7.46651 6.6242 7.5758L7.4 8.3516L9.3758 6.3758C9.48896 6.26651 9.64052 6.20603 9.79784 6.2074C9.95516 6.20876 10.1056 6.27187 10.2169 6.38311C10.3281 6.49436 10.3912 6.64484 10.3926 6.80216C10.394 6.95948 10.3335 7.11104 10.2242 7.2242L7.8242 9.6242C7.71171 9.73673 7.55912 9.79997 7.4 9.8Z"
                    fill="#F5F5F5"
                  />
                </svg>
                <span>Okay</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute text-white mq450:ml-2 top-40 left-44 mq450:left-[5px] mq450:mt-5 w-fit">
          <div className="flex items-center gap-5 ">
            <div className="flex items-center gap-5 mq450:gap-2 border-neutral-500 ">
              <p className="bg-clip-text  text-nowrap mq450:text-base text-transparent bg-gradient-to-r from-[#db2777] to-[#f97316] at-[90deg]  text-2xl font-bold  font-Lato  underline">
                Active Plans
              </p>
              <p className="text-2xl font-bold text-nowrap mq450:text-base text-neutral-500 font-Lato ">
                In active plans
              </p>
            </div>
            {plan_id != 4 ? (
              // <Link href="/subscription-plans">
              <button
                onClick={checkUpcomingPlanBeforeUpgrade}
                className=" text-white mq450:text-xs mq450:w-[80px] mq1050:ml-[0px]  mq1240:ml-[12px] bg-gradient-to-r from-[#F43F5E] to-[#FB923C] mq450:ml-[2px] ml-[370px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
              >
                Upgrade Plan
              </button>
            ) : (
              // </Link>
              ""
            )}
            <button
              onClick={() => {
                setRaiseTicket(!raiseTicket);
              }}
              className={` hover:bg-gradient-to-r hover:from-[#F43F5E] hover:to-[#FB923C] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px] mq1240:ml-[00px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[px] ml-[00px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex ${
                plan_id == 4
                  ? "ml-[500px] mq450:absolute mq450:top-[-210px]"
                  : ""
              }`}
            >
              Raise Ticket
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mt-16">
            <Image
              width={350}
              height={400}
              quality={100}
              src="/no_active_plan.png"
              alt="no active plan"
            />
            <div className="flex flex-col items-center justify-center gap-1 mt-10 text-center">
              <p className="text-2xl font-semibold text-neutral-400 font-Lato ">
                No Active Plan 🙌
              </p>
              <p className="text-lg font-medium text-neutral-400 font-Lato ">
                Upgrade & Enjoy Exclusive Services
              </p>

              <button
                onClick={() => {
                  setShowRepeat(true);
                }}
                className="w-[200px] h-[35px] text-white px-3 py-2 bg-gradient-to-l from-pink-600 to-orange-500 rounded-lg justify-center items-center gap-2 inline-flex"
              >
                Repeat Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
