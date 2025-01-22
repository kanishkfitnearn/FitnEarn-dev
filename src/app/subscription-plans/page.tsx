"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const Page = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [isYearly, setIsYearly] = useState(false);
  const [popUp, isPopUp] = useState(false);
  const [plan, setPlan] = useState<number | null>(1);
  const [validPlans, setValidPlans] = useState<any>([]);

  const email = Cookies.get("email");
  const genToken = Cookies.get("genToken");
  const user_id = Cookies.get("user_id");

  const authToken = Cookies.get("id_token");
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    //console.log("plan Id", plan);
  }, [plan]);

  const plans = [
    {
      id: 1,
      name: "Standard ",
      monthlyPrice: 0,
      yearlyPrice: 700,
      features: [
        { name: "Health Assessment Calculator", value: "✓" },
        { name: "Live Session", value: "✓" },
        { name: "Coach Live Session", value: "✓" },
        { name: "Access Workout Video", value: "Free Videos" },
        { name: "Contribute to our Blog", value: "Up to 10" },
      ],
    },
    {
      id: 2,
      name: "Premium ",
      monthlyPrice: 600,
      yearlyPrice: 7200,
      features: [
        { name: "Health Assessment Calculator", value: "✓" },
        { name: "Live Session", value: "50% Less" },
        { name: "Coach Live Session", value: "50% Less" },
        { name: "Access Workout Video", value: "All Videos" },
        { name: "Contribute to our Blog", value: "Unlimited" },
      ],
    },
  ];

  // Function to check if a plan is valid for selection
  function isValidPlan(currentPlanId: any, selectedPlanId: any) {
    if (currentPlanId <= 2 && selectedPlanId >= currentPlanId) return true;
    if (currentPlanId >= 3 && selectedPlanId >= 3) return true;
    return false;
  }

  useEffect(() => {
    const currentPlanId = parseInt(Cookies.get("plan_id") || "1");
    setValidPlans(plans.filter((plan) => isValidPlan(currentPlanId, plan.id)));
  }, []);

  // Retrieve current plan_id from cookies
  const currentPlanId = parseInt(Cookies.get("plan_id") || "1", 10);

  useEffect(() => {
    //console.log("Selected Plan Id", plan);
  }, [plan]);

  // const handlePlanSelection = (planId: number) => {
  //   // Prevent selecting a plan with a lower id than the current one
  //   if (planId >= currentPlanId) {
  //     setPlan(planId);
  //   } else {
  //     toast({
  //       title: "Cannot Downgrade",
  //       description: "You cannot select a plan lower than your current plan.",
  //       duration: 5000, // 5 seconds
  //     });
  //   }
  // };

  const handleContinue = async () => {
    if (plan === null) return;

    const userId = Cookies.get("user_id");
    const newPlanId = plan + (isYearly ? 3 : 1);
    //console.log("the New Plan id is", newPlanId);

    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/subscription/upgrade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            newPlanId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upgrade subscription");
      }

      const data = await response.json();
      //console.log(data);
      // Store API response in cookies
      Cookies.set("finalPrice", data.subscriptionDetails.finalPrice);
      Cookies.set("discountValue", data.subscriptionDetails.discountValue);
      Cookies.set(
        "previousPlanPrice",
        data.subscriptionDetails.previousPlanPrice,
      );
      Cookies.set(
        "upgradePlanPrice",
        data.subscriptionDetails.upgradePlanPrice,
      );
      Cookies.set("expiryDate", data.subscriptionDetails.expiryDate);

      // Update plan_id cookie
      Cookies.set("plan_id", newPlanId.toString());

      router.push("/subscription-plans/paymentPlan");
    } catch (error) {
      //console.error("Error upgrading subscription:", error);
      toast({
        title: "Error!!",
        description:
          "Same/ Downgrade plans can not be selected while Upgrading.",
        duration: 5000,
      });
    }
  };

  // const handleContinue = async () => {
  //   if (!plan) return;

  //   try {
  //     const response = await fetch(
  //       "${apiEndpoint}/api/fitnearn/web/users/subscription/upgrade",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: Cookies.get("user_id"),
  //           newPlanId: plan,
  //         }),
  //       },
  //     );

  //     const data = await response.json();

  //     if (data.success) {
  //       // Store variables in cookies
  //       Cookies.set("final_price", data.subscriptionDetails.finalPrice);
  //       Cookies.set("discount_value", data.subscriptionDetails.discountValue);
  //       Cookies.set(
  //         "previous_plan_price",
  //         data.subscriptionDetails.previousPlanPrice,
  //       );

  //       // Show success popup
  //       isPopUp(true);
  //     } else {
  //       toast({
  //         title: "Upgrade Failed",
  //         description: data.message,
  //         duration: 5000, // 5 seconds
  //       });
  //     }
  //   } catch (error) {
  //     //console.error("Error upgrading subscription:", error);
  //     toast({
  //       title: "Upgrade Failed",
  //       description:
  //         "There was an error processing your request. Please try again.",
  //       duration: 5000, // 5 seconds
  //     });
  //   }
  // };

  // const handleContinue = () => {
  //   //console.log("token from BE is present", genToken);
  //   if (genToken) {
  //     router.push("/");
  //     // // Show toast notification
  //     // toast({
  //     //   title: "Signup Successful",
  //     //   description: "Welcome to FitnEarn!",
  //     //   duration: 5000, // 5 seconds
  //     // }); //route the user to the home page
  //   } else {
  //     if (plan === 2) {
  //       //console.log("user selected premium plan");
  //       // // logic for payment gateway
  //       // toast({
  //       //   title: "Signup Successful",
  //       //   description: "Welcome to FitnEarn!",
  //       //   duration: 5000, // 5 seconds
  //       // }); //route the user to the home page
  //     } else {
  //       //console.log("user selected standard plan");

  //       // run the api or function related to adding a subscription plan inside createSession function.
  //       // toast({
  //       //   title: "Signup Successful",
  //       //   description: "Welcome to FitnEarn!",
  //       //   duration: 5000, // 5 seconds
  //       // }); //route the user to the home page
  //     }
  //   }
  // };


  
  return (
    <>
      <div className="pt-20">
        <div className="flex flex-col items-center justify-center mt-5">
          <h4 className="mid-heading text-[22px] md:text-4xl font-normal">
            Plans
          </h4>
          <div className="relative text-center">
            <h1 className="core-feature text-[40px] md:text-[105px] ">
              Our Plans
            </h1>
            <h2 className="text-[#FFFFFF] text-[32px] md:text-[66px] font-extrabold leading-normal absolute top-0 md:top-3 left-[34px] md:left-[100px]">
              Our Plans
            </h2>
          </div>
        </div>
        <div className="absolute mq450:w-[300px] items-center w-[902px] mt-[18px] mq450:mt-0  left-0 ml-auto mr-auto  right-0  ">
          <div
            className="max-w-3xl mq450:w-[320px] p-1 mq450:p- mx-auto mt-0 text-white left top-44 rounded-xl  
                         rounded-3xl  "
          >
            <div className="flex justify-center mb-6 mq450:mt-5 ">
              {/* <div className="absolute h-full flex justify-center items-center mq450:max-w-[400px] mq450:w-full w-[902px] md:mt-[2px] left-0 ml-auto mr-auto right-0">
          <div
            className="max-w-3xl mq450:max-w-[333px] mq450:w-full p-8 mq450:py-6 mq450:pl-5 mq450:pr-4 mx-auto md:mt-4 text-white left top-44 rounded-xl  
                           "
          >
            <div className="flex justify-center mb-2"> */}
              <div
                className="flex p-1 rounded-full "
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
            <div className="p-8 bg-neutral-800 rounded-3xl mq450:w-[325px] mq450:mr-2">
              <h2 className="mb-2 text-2xl font-bold text-center">
                Choose your Subscription
              </h2>
              <p className="mb-6 text-center text-gray-400">
                Buy our plans then access our video library and join live
                sessions.
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
                        className={`px-4 py-1 mq450:text-sm rounded ${index === plan ? "rounded-lg bg-gradient-to-r from-rose-500 to-orange-400" : "bg-neutral-700"}`}
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
                      <div
                        key={planIndex}
                        className="text-center mq450:text-sm"
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
                        You are a premium FitnEarn member now!
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
                  className="primaryButton flex justify-center  mx-0 mt-2 w-[270px] text-2xl items-center md:w-[393px] h-[43px] rounded-[8px]  text-[#DADADA] bg-[#C72D65] "
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
