"use client"
import React from "react"
import { BackgroundGradient } from "@/components/ui/background-gradient";

const PriceCard =  ({ premiumMonthlyFeatures }: { premiumMonthlyFeatures: string[] }) => {
  return (
    <div className="flex  flex-1 justify-center items-center">
      <BackgroundGradient className="rounded-[22px] max-w-sm bg-white dark:bg-zinc-900">
        
      <div className="p-7 premiumPlanDiv bg-[#262626] rounded-[16px] flex flex-col gap-5 justify-start items-start w-full max-w-[354px] h-auto">
            <div className="w-full">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[24px] text-[#F5F5F5] font-bold leading-normal">Premium Monthly</h1>
              </div>
              <h2 className="text-[18px] text-[#D4D4D4] font-normal leading-normal">Starting at</h2>
            </div>
            <div>
              <h1 className="text-[48px] text-[#F5F5F5] font-bold leading-normal">₹ 199 <span className="text-[14px] text-[#F5F5F5] font-normal leading-normal">/per month</span></h1>
            </div>
            <div>
              <h3 className="text-[18px] text-[#F5F5F5] font-medium leading-normal">Monthy Subscribed</h3>
              <p className="text-[14px] text-[#E5E5E5] font-normal leading-[24px]">Unlock premium features for a month, including custom workout plans and ad-free experience</p>
            </div>

            {premiumMonthlyFeatures.map((feature:string) => (
              <div key={feature} className="flex justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.39786 1.24642C8.59053 0.564994 7.40949 0.564995 6.60215 1.24642L5.8669 1.86701C5.52376 2.15663 5.09913 2.33254 4.65169 2.37037L3.69296 2.45145C2.64025 2.54048 1.80513 3.3756 1.7161 4.42831L1.63502 5.38704C1.59718 5.83448 1.42128 6.25911 1.13166 6.60226L0.511071 7.33751C-0.170358 8.14484 -0.170357 9.32588 0.511071 10.1332L1.13166 10.8685C1.42128 11.2116 1.59718 11.6363 1.63502 12.0837L1.7161 13.0424C1.80513 14.0952 2.64025 14.9303 3.69296 15.0193L4.65169 15.1003C5.09913 15.1382 5.52376 15.3141 5.86691 15.6038L6.60215 16.2243C7.40949 16.9057 8.59053 16.9057 9.39786 16.2243L10.1331 15.6038C10.4762 15.3141 10.9009 15.1382 11.3483 15.1003L12.3071 15.0193C13.3598 14.9303 14.1949 14.0952 14.2839 13.0424L14.365 12.0837C14.4029 11.6363 14.5788 11.2116 14.8684 10.8685L15.489 10.1332C16.1703 9.32588 16.1703 8.14484 15.489 7.33751L14.8684 6.60225C14.5788 6.25911 14.4029 5.83448 14.365 5.38704L14.2839 4.42831C14.1949 3.3756 13.3598 2.54048 12.3071 2.45145L11.3483 2.37037C10.9009 2.33254 10.4762 2.15663 10.1331 1.86701L9.39786 1.24642ZM11.9408 7.25781C12.3217 6.87695 12.3217 6.25947 11.9408 5.87861C11.5601 5.49775 10.9425 5.49775 10.5616 5.87861L6.91687 9.52341L5.43928 8.04581C5.05843 7.66495 4.44094 7.66495 4.06008 8.04581C3.67922 8.42666 3.67922 9.04415 4.06008 9.425L6.22728 11.5922C6.60814 11.973 7.22562 11.973 7.60648 11.5922L11.9408 7.25781Z" fill="#F5F5F5" />
                </svg>
                <h4 className="text-[14px] text-[#F5F5F5] font-normal leading-normal">{feature}</h4>
              </div>
            ))}

          </div>
      </BackgroundGradient>
    </div>
  )
};

export default PriceCard;
