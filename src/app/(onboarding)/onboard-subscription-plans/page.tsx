"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [isYearly, setIsYearly] = useState(false);
  const [popUp, isPopUp] = useState(false);
  const [plan, setPlan] = useState<number | null>(1);

  const email = Cookies.get("email");
  const genToken = Cookies.get("genToken");
  const user_id = Cookies.get("user_id");

  const authToken = Cookies.get("id_token");
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    let planId;
    if (!isYearly) {
      // Monthly plans
      planId = plan === 0 ? 1 : 2;
    } else {
      // Yearly plans
      planId = plan === 0 ? 3 : 4;
    }
    // console.log("plan selected by user", planId)
  }, [plan]);

  const plans = [
    {
      name: "Standard ",
      monthlyPrice: 0,
      yearlyPrice: 700,
      features: [
        { name: "Health Assessment Calculator", value: "✓" },
        { name: "Live Session", value: "✓" },
        { name: "Coach Live Sessions", value: "✓" },
        { name: "Access to Workout Videos", value: "Free Videos" },
        { name: "Contribute to our Blog", value: "Up to 10" },
      ],
    },
    {
      name: "Premium ",
      monthlyPrice: 600,
      yearlyPrice: 7200,
      features: [
        { name: "Health Assessment Calculator", value: "✓" },
        { name: "Live Session", value: "50% Less" },
        { name: "Coach Live Sessions", value: "50% Less" },
        { name: "Access to Workout Videos", value: "All Videos" },
        { name: "Contribute to our Blog", value: "Unlimited" },
      ],
    },
  ];

  const handleContinue = () => {
    let planId: any;
  
    // Determine the plan ID based on the `isYearly` and `plan` state
    if (!isYearly) {
      // Monthly plans
      planId = plan === 0 ? 1 : 2;
    } else {
      // Yearly plans
      planId = plan === 0 ? 3 : 4;
    }
  
    // Set the plan ID in cookies
    Cookies.set("planId", planId);
  
    // Navigate to the payment onboarding sub-plan page
    router.push("/payment-onboard-sub-plan");
  
    // Additional logic for toast notifications or other operations can go here
    // if (genToken) {
    //   createSession();
    //   createSubscription();
    //   toast({
    //     title: "Signup Successful",
    //     description: "Welcome to FitnEarn!",
    //     duration: 5000, // 5 seconds
    //   });
    // }
  };
  

  const createSession = async () => {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/onboarding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            userAgent: "web",
            authToken,
            accessToken,
            refreshToken,
          }),
        },
      );
      let result = await response.json();
      //console.log(result);
      if (result.success) {
        isPopUp(true);
        Cookies.set("genToken", result.genToken);
      } else {
        //console.log(result);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const createSubscription = async () => {
    let planId;
    if (!isYearly) {
      // Monthly plans
      planId = plan === 0 ? 1 : 2;
    } else {
      // Yearly plans
      planId = plan === 0 ? 3 : 4;
    }
    console.log("plan selected by the user:", planId);
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/subscription-plan/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user_id,
            updatedDetails: {
              planId: planId,
            },
          }),
        },
      );
      let result = await response.json();
      //console.log(result);
      if (result.success) {
        isPopUp(true);
        Cookies.set("genToken", result.genToken);
      } else {
        //console.log(result);
      }
      Cookies.set("plan_id", planId.toString());
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        className="relative w-[100vw] h-[900px] flex bg-black overflow-hidden scrollbar-hide  "
      >
        <div className="flex-1 hidden bg-center bg-cover usernameLeftImg md:block"></div>
        <div className="usernameMiddleImg flex-1 md:ml-[3px] md:mr-2 bg-cover bg-center flex justify-center items-center"></div>
        <div className="flex-1 hidden bg-center bg-cover usernameRightImg md:block"></div>

        <div className="absolute h-full flex justify-center items-center mq450:max-w-[400px] mq450:w-full w-[902px] md:mt-[2px] left-0 ml-auto mr-auto right-0">
          <div
            className="max-w-3xl mq450:max-w-[333px] mq450:w-full p-8 mq450:py-6 mq450:pl-5 mq450:pr-4 mx-auto md:mt-4 text-white left top-44 rounded-xl  
                           [backdrop-filter:blur(100px)] rounded-3xl [background:linear-gradient(157.48deg,_rgba(77,_77,_77,_0.59),_rgba(140,_140,_140,_0.53))] "
          >
            <div className="flex justify-center mb-2">
              <div
                className="flex p-1 rounded-full"
                style={{
                  background:
                    "var(--Linears-200, linear-gradient(359deg, rgba(251, 146, 60, 0.12) 0.97%, rgba(244, 63, 94, 0.12) 99.03%))",
                }}
              >
                <button
                  className={`px-4 py-2 w-[200px]  mq450:w-[130px] rounded-full ${!isYearly ? "bg-gradient-to-r from-rose-500 to-orange-400" : ""}`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly Plan
                </button>
                <button
                  className={`px-4 py-2 w-[200px] mq450:w-[130px] rounded-full ${isYearly ? "bg-gradient-to-r from-rose-500 to-orange-400" : ""}`}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly Plan
                </button>
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-center">
              Explore Our Comprehensive Subscription Plans
            </h2>
            <p className="mb-6 text-center text-neutral-300">
              Pick a plan that doesn&apos;t just fit your goals, but dares you
              to dream bigger!
            </p>

            <div className="mb-4 md:mb-6 h-[330px] md:h-[375px] mq450:overflow-y-scroll mq450:overflow-x-hidden">
              <div className="grid grid-cols-3 mb-4 md:gap-20">
                <div className="col-span-1 text-nowrap mq450:text-wrap">
                  FITNEARN Subscription Plans
                </div>
                {plans.map((plan, index) => (
                  <div key={index} className="font-bold text-center ">
                    {plan.name} Plan
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 mb-4 md:gap-20 ">
                <div className="col-span-1 ">Select Plans</div>
                {plans.map((planObj, index) => (
                  <div key={index} className="text-center ">
                    <button
                      className={`px-4 py-2 z-50 w-auto md:w-[100px] overflow-visible text-[12px] leading-[18px] font-semibold mq450:text-sm rounded-[8px] ${index === plan ? "bg-gradient-to-r from-rose-500 to-orange-400" : "bg-neutral-700"}`}
                      onClick={() => setPlan(index)}
                    >
                      {index === plan ? "Selected" : "Select"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 mb-4 md:gap-4">
                <div className="col-span-1 ">
                  Pricing / {isYearly ? "year" : "month"}
                </div>
                {plans.map((plan, index) => (
                  <div key={index} className="text-center ">
                    Rs. {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </div>
                ))}
              </div>

              {plans[0].features.map((feature, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 pt-3 mb-4 border-t md:gap-20 border-neutral-400"
                >
                  <div className="col-span-1 text-nowrap mq450:text-wrap mq450:text-sm mq450:w-20">
                    {feature.name}
                  </div>
                  {plans.map((plan, planIndex) => (
                    <div
                      key={planIndex}
                      className={` text-center mq450:text-sm`}
                    >
                      {plan.features[index].value}
                    </div>
                  ))}
                </div>
              ))}
              {popUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-[475px] items-center justify-center align-middle text-center flex flex-col h-[348px] bg-opacity-50 bg-neutral-800 rounded-[10px] border border-neutral-700 backdrop-blur-2xl">
                    <svg
                      className="mt-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="108"
                      height="108"
                      viewBox="0 0 108 108"
                      fill="none"
                    >
                      <path
                        d="M95.3632 44.4557L91.3222 40.4102C90.4672 39.5597 89.9992 38.4258 89.9992 37.2243V31.5002C89.9992 24.0573 83.9422 18.0002 76.4992 18.0002H70.7752C69.5917 18.0002 68.4307 17.5187 67.5937 16.6817L63.5482 12.6362C58.2832 7.37125 49.7242 7.37125 44.4592 12.6362L40.4047 16.6817C39.5677 17.5187 38.4067 18.0002 37.2232 18.0002H31.4992C24.0562 18.0002 17.9992 24.0573 17.9992 31.5002V37.2243C17.9992 38.4258 17.5312 39.5597 16.6807 40.4102L12.6352 44.4513C10.0837 47.0028 8.67969 50.3958 8.67969 54.0003C8.67969 57.6047 10.0882 60.9977 12.6352 63.5448L16.6762 67.5903C17.5312 68.4408 17.9992 69.5747 17.9992 70.7762V76.5003C17.9992 83.9432 24.0562 90.0003 31.4992 90.0003H37.2232C38.4067 90.0003 39.5677 90.4817 40.4047 91.3187L44.4502 95.3688C47.0827 97.9967 50.5387 99.3108 53.9947 99.3108C57.4507 99.3108 60.9067 97.9967 63.5392 95.3643L67.5847 91.3187C68.4307 90.4817 69.5917 90.0003 70.7752 90.0003H76.4992C83.9422 90.0003 89.9992 83.9432 89.9992 76.5003V70.7762C89.9992 69.5747 90.4672 68.4408 91.3222 67.5903L95.3632 63.5492C97.9102 60.9977 99.3187 57.6092 99.3187 54.0003C99.3187 50.3913 97.9147 47.0027 95.3632 44.4557ZM74.4967 48.7442L47.4967 66.7442C46.7362 67.2527 45.8632 67.5003 44.9992 67.5003C43.8382 67.5003 42.6862 67.0502 41.8177 66.1817L32.8177 57.1817C31.0582 55.4222 31.0582 52.5783 32.8177 50.8188C34.5772 49.0592 37.4212 49.0592 39.1807 50.8188L45.5707 57.2088L69.5017 41.2563C71.5762 39.8748 74.3662 40.4327 75.7432 42.5027C77.1247 44.5728 76.5667 47.3672 74.4967 48.7442Z"
                        fill="#15803D"
                      />
                    </svg>
                    <p className="text-rose-500 text-[32px] font-bold font-Lato leading-[48px]">
                      Congratulations
                    </p>
                    <p className="w-[411px] text-center text-neutral-300 text-base font-semibold font-Lato">
                      You are a FitnEarn member now!
                    </p>

                    <Link
                      href={"/"}
                      className="w-[400px] mq450:w-[200px]  m-auto flex justify-center items-center py-3 font-bold rounded-lg bg-gradient-to-r from-rose-500 to-orange-400"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                type="submit"
                className="primaryButton flex justify-center  mx-0 mt-2 w-[270px] text-[20px] font-semibold items-center md:w-[393px] h-[43px] rounded-[8px]  text-[#DADADA] bg-[#C72D65] "
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
