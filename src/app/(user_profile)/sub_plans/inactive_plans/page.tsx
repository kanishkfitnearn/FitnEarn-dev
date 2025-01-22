"use client";
import Navbar from "@/app/Components/Navbar";
import UserNavbar from "@/app/Components/UserNavbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import QueryForm from "../QueryFrom";
import Link from "next/link";
const Page = () => {
  const [raiseTicket, setRaiseTicket] = useState(false);
  const [inactiveSubscriptions, setInactiveSubscriptions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [hasInactiveSub, setHasInactiveSub] = useState(false);
  const plan_id = parseInt(Cookies.get("plan_id") || "0");
  const [selected, setSelected] = useState("");
  const navItems = [
    { name: "Active Plans", path: "/sub_plans/active_plans" },
    { name: "Upcoming Plans", path: "/sub_plans/upcoming_plans" },
    { name: "Purchase History", path: "/sub_plans/inactive_plans" },
  ];

  const pathname = usePathname();
  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelected(currentItem.name);
    } else {
      setSelected("Active Plans");
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

  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const fetchInactiveSubscriptions = async (userId: any) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/subscription-plan/inactive/${userId}`,
      );
      setHasInactiveSub(true);
      return response.data.inactiveSubscriptions;
    } catch (error) {
      // setHasInactiveSub(false);
      //console.error("Error fetching inactive subscriptions:", error);
      setHasInactiveSub(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userId = Cookies.get("user_id");
    // const userId = ""; // This should ideally come from your app's state or props
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInactiveSubscriptions(userId);
        setHasInactiveSub(true);
        setInactiveSubscriptions(data);
      } catch (err) {
        setError("Failed to fetch inactive subscriptions");
        setHasInactiveSub(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  {
    isLoading && (
      <div>
        <div className="mq1240:w-[980px] mq450:top-4 w-[1220px] mq1050:w-[820px] mt-7 gap-32 h-[190px] relative bg-neutral-800 rounded-xl shadow border border-neutral-700 mq450:mt-8 mq450:w-full mq450:h-auto mq450:gap-0">
          <div className="flex p-5 pt-8 gap-[150px] mq1050:gap-[42px] mq1240:gap-24 mq450:hidden">
            <div className="w-32 h-6 rounded bg-neutral-700 animate-pulse"></div>
            <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            <div className="w-32 h-6 rounded bg-neutral-700 animate-pulse"></div>
            <div className="w-48 h-6 rounded bg-neutral-700 animate-pulse"></div>
            <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
          </div>

          <div className="w-full bg-neutral-800 h-[0px] border border-neutral-700 mq450:hidden"></div>

          {/* Skeleton for inactive subscriptions */}
          <div className="grid gap-4 p-4 mb-4 rounded-lg md:grid-cols-5 bg-neutral-800 mq450:grid-cols-1 mq450:gap-2 ">
            <div className="flex flex-col">
              <div className="w-32 h-6 rounded bg-neutral-700 animate-pulse"></div>
              <div className="w-48 h-4 mt-2 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="md:text-center mq450:text-left mq450:mt-2 mq450:flex mq450:gap-40">
              <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="md:text-center mq450:text-left mq450:flex mq450:gap-24">
              <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="ml-14 mq450:flex mq450:gap-24 md:text-center mq450:text-left mq450:ml-0">
              <div className="w-48 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="md:text-center ml-14 mq450:text-left mq450:ml-0 mq450:flex mq450:gap-32">
              <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
          </div>

          {/* Repeat the skeleton block if you need multiple */}
          <div className="grid gap-4 p-4 mb-4 rounded-lg md:grid-cols-5 bg-neutral-800 mq450:grid-cols-1 mq450:gap-2 ">
            <div className="flex flex-col">
              <div className="w-32 h-6 rounded bg-neutral-700 animate-pulse"></div>
              <div className="w-48 h-4 mt-2 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="md:text-center mq450:text-left mq450:mt-2 mq450:flex mq450:gap-40">
              <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="md:text-center mq450:text-left mq450:flex mq450:gap-24">
              <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="ml-14 mq450:flex mq450:gap-24 md:text-center mq450:text-left mq450:ml-0">
              <div className="w-48 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
            <div className="md:text-center ml-14 mq450:text-left mq450:ml-0 mq450:flex mq450:gap-32">
              <div className="w-20 h-6 rounded bg-neutral-700 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error)
    return (
      <div className="m-auto py-28">
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
          </div>
          {/* <div className="flex gap-5 mq450:flex-row-reverse mq450:gap-3 mq450:absolute mq450:left-[160px] mq450:top-[200px] z-20">
            <button
              onClick={() => {
                setRaiseTicket(!raiseTicket);
              }}
              className="w-[111px] text-white mq450:text-xs mq450:w-[80px] mq1050:ml-[0px]  mq1240:ml-[12px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[2px] ml-[490px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex"
            >
              Raise Ticket
            </button>
            {plan_id != 4 ? (
              <Link href="/subscription-plans">
                <button className="w-[111px] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px]  mq1240:ml-[00px] bg-gradient-to-r from-[#F43F5E] to-[#FB923C] mq450:ml-[px] ml-[00px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex">
                  Upgrade Plan
                </button>
              </Link>
            ) : (
              ""
            )}
          </div> */}
        </div>
        <div className="flex flex-col items-center justify-center pt-16">
          <Image
            width={350}
            height={400}
            quality={100}
            src="/no_active_plan.png"
            alt="no active plan"
          />
          <div className="flex flex-col items-center justify-center gap-3 mt-10 text-center">
            <p className="text-2xl font-semibold text-neutral-400 font-Lato ">
              You have no active plan 🙌
            </p>
            <p className="text-lg font-medium text-neutral-400 font-Lato w-[470px] mq450:w-[300px] ">
              Choose a subscription plan to access exclusive workouts, live
              sessions, and many more with FitnEarn Premium!
            </p>
            <Link href="/subscription-plans">
              <button className="w-[200px] h-[35px] text-white px-3 py-2 bg-gradient-to-l from-pink-600 to-orange-500 rounded-lg justify-center items-center gap-2 inline-flex">
                Premium member now
              </button>
            </Link>
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

  return (
    <>
      <div className="relative mq450:static ">
        <UserNavbar activeplans={true} plansactivecolor="neutral-700" />

        <div className="absolute block text-white mq450:ml-2 top-28 left-44 mq450:left-[5px] mq450:mt-14 w-fit">
          <div className="flex items-center gap-5 mq450:mt-30 ">
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
            {plan_id != 4 ? <></> : ""}
          </div>

          {hasInactiveSub && (
            <div>
              <div className="mq1240:w-[980px] mq450:top-4 w-[1220px] mq1050:w-[820px] mt-7 gap-32 h-[190px] relative bg-neutral-800 rounded-xl shadow border border-neutral-700 mq450:mt-8 mq450:w-full mq450:h-auto mq450:gap-0">
                <div className="flex p-5 pt-8 gap-[150px] mq1050:gap-[42px] mq1240:gap-24 mq450:hidden">
                  <p className="text-lg font-bold text-center text-white capitalize font-Lato text-nowrap">
                    Type of Subscription
                  </p>
                  <p className="text-lg font-bold text-center text-white capitalize font-Lato text-nowrap">
                    Date
                  </p>
                  <p className="text-lg font-bold text-center text-white capitalize font-Lato text-nowrap">
                    Payment Mode
                  </p>
                  <p className="text-lg font-bold text-center text-white capitalize font-Lato text-nowrap">
                    Transaction ID
                  </p>
                  <p className="text-lg font-bold text-center text-white capitalize font-Lato text-nowrap">
                    Total price
                  </p>
                </div>
                <div className="w-full bg-neutral-800 h-[0px] border border-neutral-700 mq450:hidden"></div>

                <div className="grid gap-8 p-4 mb-4 rounded-lg md:grid-cols-5 bg-neutral-800 mq450:grid-cols-1 mq450:gap-5 ">
                  {inactiveSubscriptions.map((subscription: any) => (
                    <React.Fragment key={subscription._id}>
                      <div className="flex flex-col">
                        <span className="font-semibold bg-gradient-to-r from-[#bd2c44] to-[#FB923C]  bg-clip-text text-transparent">
                          {subscription.subscriptionPlan.period
                            .charAt(0)
                            .toUpperCase() +
                            subscription.subscriptionPlan.period.slice(1)}{" "}
                          Plan
                        </span>
                        <span className="text-sm text-neutral-400">
                          Validity: {formatDate(subscription.startDate)} -{" "}
                          {formatDate(subscription.renewalDate)}
                        </span>
                      </div>
                      <div className="md:text-center mq450:text-left mq450:mt-2 mq450:flex mq450:gap-40">
                        <span className="hidden mq450:font-semibold mq450:mr-2 mq450:inline-block">
                          Date:
                        </span>
                        {formatDate(subscription.createdAt)}
                      </div>
                      <div className="md:text-center mq450:text-left mq450:flex mq450:gap-24">
                        <span className="hidden mq450:font-semibold mq450:mr-2 mq450:inline-block">
                          Payment Mode:
                        </span>
                        N/A
                      </div>
                      <div className="ml-14 mq450:flex mq450:gap-24 md:text-center mq450:text-left mq450:ml-0">
                        <span className="hidden mq450:font-semibold mq450:mr-2 mq450:inline-block">
                          Transaction ID:
                        </span>
                        {subscription.transactionId
                          ? subscription.transactionId.slice(0, 12)
                          : "N/A"}
                      </div>
                      <div className="md:text-center ml-14 mq450:text-left mq450:ml-0 mq450:flex mq450:gap-32">
                        <span className="hidden mq450:font-semibold mq450:mr-2 mq450:inline-block">
                          Total Price:
                        </span>
                        {formatCurrency(subscription.price)}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!hasInactiveSub && (
        <div className="absolute mq1240:left-[450px] mq1050:left-[390px] flex flex-col items-center justify-center mt-16 top-48 left-[600px] mq450:left-10">
          <Image
            width={350}
            height={400}
            src="/no_active_plan.png"
            alt="no active plan"
            quality={100}
          />
          <div className="flex flex-col items-center justify-center gap-1 mt-4 text-center">
            <p className="text-2xl font-semibold text-neutral-400 font-Lato">
              No Plan History
            </p>
            <p className="text-lg font-medium text-neutral-400 font-Lato">
              Upgrade & Enjoy Exclusive Services
            </p>
            <Link href="/subscription-plans">
              <button className="w-[200px] text-neutral-200 h-[35px] px-3 py-2 mt-2 bg-gradient-to-l from-pink-600 to-orange-500 rounded-lg justify-center items-center gap-2 inline-flex">
                Premium Member Now
              </button>
            </Link>
          </div>
        </div>
      )}
      {raiseTicket && (
        <QueryForm
          close={() => {
            setRaiseTicket(false);
          }}
        />
      )}
    </>
  );
};

export default Page;
