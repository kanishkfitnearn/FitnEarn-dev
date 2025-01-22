"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SubscriptionScreen = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [isYearly, setIsYearly] = useState(false);
  const [popUp, isPopUp] = useState(false);
  const [plan, setPlan] = useState<number | null>(0);

  const email = Cookies.get("email");
  const genToken = Cookies.get("genToken");

  const authToken = Cookies.get("id_token");
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const router = useRouter();

  useEffect(() => {
    //console.log("plan Id", plan);
  }, [plan]);

  const handleContinue = () => {
    //console.log("token from BE is present", genToken);
    if (genToken) {
      router.push("/");
    } else {
      if (plan === 1) {
        //console.log("user selected premium plan");
        // logic for payment gateway
      } else {
        //console.log("user selected standard plan");
        createSession();
        // run the api or function related to adding a subscription plan inside createSession function.
      }
    }
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
  const plans = [
    {
      name: "Standard ",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: "Health Assessment Calculator", value: "✓" },
        { name: "Live Session", value: "✓" },
        { name: "Coach Session Booking", value: "✓" },
        { name: "Workout Video", value: "Free Videos" },
        { name: "Write your own Blog", value: "Up to 10" },
      ],
    },
    {
      name: "Premium ",
      monthlyPrice: 600,
      yearlyPrice: 2000,
      features: [
        { name: "Health Assessment Calculator", value: "✓" },
        { name: "Live Session", value: "50% Less" },
        { name: "Coach Session Booking", value: "50% Less" },
        { name: "Workout Video", value: "All Videos" },
        { name: "Write your own Blog", value: "Unlimited" },
      ],
    },
  ];

  return (
    <div className="relative pt-[832px]  mq450:pt-20 bg-neutral-1000">
      <div className="absolute text-white mq450:static font-Lato top-40 left-96 ">
        {" "}
        <div className="flex flex-col justify-center w-full">
          <div className="mid-heading text-[22px] md:text-4xl font-normal relative mq450:text-[25px] text-center text-[44px] sm:text-[20px]  font-large text-transparent bg-clip-text bg-gradient-to-b from-[#f3742b] to-[#e21f77]">
            Plans
          </div>

          <div className="text-center mq450:w-[340px]  mq450:ml-12 bg-blend-luminosity  ">
            <Image
              style={{}}
              className="m-auto bg-blend-luminosity"
              alt=""
              objectFit="cover"
              src="/our_plans_img.png"
              layout="fixed"
              quality={100}
              width={500}
              height={10}
            />
          </div>
        </div>
        <div className="max-w-3xl p-16 mx-auto mt-8 text-white left-96 top-44 rounded-xl bg-neutral-800">
          <div className="flex justify-center mb-6 mq450:mt-5 ">
            <div className="flex p-1 rounded-full bg-neutral-800">
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
            Choose your membership
          </h2>
          <p className="mb-6 text-center text-gray-400">
            Buy our plans then access our video library and join live sessions.
          </p>

          <div className="mb-6">
            <div className="grid grid-cols-3 gap-20 mb-4 mq450:gap-12">
              <div className="col-span-1"> Subscription Plans</div>
              {plans.map((plan, index) => (
                <div key={index} className="font-bold text-center ">
                  {plan.name}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-20 mb-4 mq450:gap-12">
              <div className="col-span-1">Select Plans</div>
              {plans.map((planObj, index) => (
                <div key={index} className="text-center ">
                  <button
                    className={`px-4 py-1 mq450:text-sm rounded ${index === plan ? "rounded-lg bg-gradient-to-r from-rose-500 to-orange-400" : "bg-gray-700"}`}
                    onClick={() => setPlan(index)}
                  >
                    {index === plan ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-1">
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
                className="grid grid-cols-3 gap-20 pt-4 mb-4 border-t border-gray-700 mq450:gap-16"
              >
                <div className="col-span-1 mq450:text-sm mq450:w-20">
                  {feature.name}
                </div>
                {plans.map((plan, planIndex) => (
                  <div key={planIndex} className="text-center mq450:text-sm">
                    {plan.features[index].value}
                  </div>
                ))}
              </div>
            ))}
            {/* {popUp && (
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
                    You are a premium FitnEarn member now!
                  </p>

                  <Link
                    href={"/"}
                    className="w-[400px] mq450:w-[200px] m-auto flex justify-center items-center py-3 font-bold rounded-lg bg-gradient-to-r from-rose-500 to-orange-400"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            )} */}
          </div>

          <button className="w-[400px] mq450:w-[200px] m-auto flex justify-center items-center py-3 font-bold rounded-lg bg-gradient-to-r from-rose-500 to-orange-400">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
{
  /* //renderthis for the mobile view */
}
{
  /* {  <div className="max-w-3xl p-16 mx-auto text-white left-96 top-24 rounded-xl bg-neutral-800">
          <div className="flex justify-center mb-6">
            <div className="flex p-1 bg-gray-800 rounded-full">
              <button
                className={`px-4 py-2 rounded-full ${!isYearly ? "bg-red-500" : ""}`}
                onClick={() => setIsYearly(false)}
              >
                Monthly Plan
              </button>
              <button
                className={`px-4 py-2 rounded-full ${isYearly ? "bg-red-500" : ""}`}
                onClick={() => setIsYearly(true)}
              >
                Yearly Plan
              </button>
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold">Choose your membership</h2>
          <p className="mb-6 text-gray-400">
            Buy our plans then access our video library and join live sessions.
          </p>

          <div className="mb-6">
            <div className="grid grid-cols-3 gap-20 mb-4">
              <div className="col-span-1">FITNEARN Subscription Plans</div>
              {plans.map((plan, index) => (
                <div key={index} className="font-bold text-center">
                  {plan.name}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-20 mb-4">
              <div className="col-span-1">Select Plans</div>
              {plans.map((plan, index) => (
                <div key={index} className="text-center">
                  <button
                    className={`px-4 py-1 rounded ${index === 0 ? "rounded-lg bg-gradient-to-r from-rose-500 to-orange-400" : "bg-gray-700"}`}
                  >
                    {index === 0 ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-1">
                Pricing / {isYearly ? "year" : "month"}
              </div>
              {plans.map((plan, index) => (
                <div key={index} className="text-center">
                  Rs. {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </div>
              ))}
            </div>

            {plans[0].features.map((feature, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-20 pt-4 mb-4 border-t border-gray-700"
              >
                <div className="col-span-1">{feature.name}</div>
                {plans.map((plan, planIndex) => (
                  <div key={planIndex} className="text-center">
                    {plan.features[index].value}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button className="w-[400px] m-auto py-3 font-bold rounded-lg bg-gradient-to-r from-rose-500 to-orange-400">
            Continue
          </button>
        </div>} */
}
{
  /* //renderthis for the mobile view */
}
