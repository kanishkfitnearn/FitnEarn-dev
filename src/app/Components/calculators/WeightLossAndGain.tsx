"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import SvgGauge from "../GaugeMeter";

const WeightLossAndGain = () => {
  const [calorieIntake, setCalorieIntake] = useState<number | undefined>();
  const [calorieBurned, setCalorieBurned] = useState<number | undefined>();
  const [weightChange, setWeightChange] = useState<number | undefined>(0);
  const [weightLossOrGain, setWeightLossOrGain] = useState<string | undefined>(
    "",
  );

  const calculateWeighChange = (e: any) => {
    e.preventDefault();
    // Weight Change (kg) = (Calorie Intake - Calorie Burned) / 7700
    //console.log(calorieIntake, calorieBurned);
    let changeInWeight = (calorieIntake! - calorieBurned!) / 7700;

    if (changeInWeight === 0) {
      setWeightLossOrGain("noProgress");
    } else if (changeInWeight > 0) {
      setWeightLossOrGain("weightGain");
    } else {
      setWeightLossOrGain("weightLoss");
    }

    setWeightChange(parseFloat(changeInWeight.toFixed(3)));
    //console.log(changeInWeight);
  };

  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form onSubmit={calculateWeighChange} className="flex flex-col gap-6">
            <div className="relative w-[298px] md:w-[480px]">
              <input
                type="number"
                required
                id="Calorie-Intake"
                className="w-[298px] md:w-[480px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 border-[#737373] appearance-none dark:text-[#FFF] dark:border-[#737373] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer"
                placeholder=" "
                value={calorieIntake ?? ""}
                onChange={(e) => setCalorieIntake(parseInt(e.target.value))}
              />
              <label
                htmlFor="Calorie-Intake"
                className="absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] text-[#A3A3A3] dark:text-[#A3A3A3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Daily Calorie Intake
              </label>
            </div>
            <div className="relative w-[298px] md:w-[480px]">
              <input
                type="number"
                required
                id="Daily-Calorie-Burned"
                className="w-[298px] md:w-[480px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 border-[#737373] appearance-none dark:text-[#FFF] dark:border-[#737373] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer"
                placeholder=" "
                value={calorieBurned ?? ""}
                onChange={(e) => setCalorieBurned(parseInt(e.target.value))}
              />
              <label
                htmlFor="Daily-Calorie-Burned"
                className="absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] text-[#A3A3A3] dark:text-[#A3A3A3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Daily Calorie Burned
              </label>
            </div>
            {/* <Input
              type="number"
              placeholder="Calorie Intake"
              className="calculator-input"
              value={calorieIntake ?? ""}
              onChange={(e) => setCalorieIntake(parseInt(e.target.value))}
            /> */}
            {/* <Input
              type="number"
              placeholder="Daily Calorie Burned"
              className="calculator-input"
              value={calorieBurned ?? ""}
              onChange={(e) => setCalorieBurned(parseInt(e.target.value))}
            /> */}
            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="relative flex flex-col items-center justify-center flex1">
          <SvgGauge percentageValue={weightChange} range={1} />
          <span className="absolute left-[134px] top-[60px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M23.6973 0H2.97004C1.69985 0 0.666992 1.03285 0.666992 2.30305V23.0303C0.666992 24.3004 1.69985 25.3333 2.97004 25.3333H23.6973C24.9674 25.3333 26.0003 24.3005 26.0003 23.0303V2.30305C26.0003 1.03285 24.9674 0 23.6973 0ZM20.6616 7.30436L17.405 10.561C17.2926 10.6734 17.1452 10.7296 16.9979 10.7296C16.8506 10.7296 16.7033 10.6734 16.5908 10.561C15.4471 9.41724 13.7475 9.04107 12.2202 9.40132L10.9789 6.67066C10.8484 6.38167 10.5077 6.25234 10.2165 6.38502C9.92689 6.51661 9.79929 6.85786 9.93083 7.14744L11.1405 9.80847C10.7568 10.0092 10.3908 10.2466 10.0765 10.5609C9.85154 10.7858 9.48719 10.7858 9.26232 10.5609L6.00571 7.3043C5.78079 7.07938 5.78079 6.71503 6.00571 6.49016C7.96293 4.53241 10.5656 3.45454 13.3337 3.45454C16.1017 3.45454 18.7044 4.53241 20.6616 6.49022C20.8865 6.71509 20.8865 7.07943 20.6616 7.30436Z"
                fill="url(#paint0_linear_9140_40931)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_40931"
                  x1="-0.307367"
                  y1="16.1702"
                  x2="26.853"
                  y2="16.1746"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[96px] absolute left-[100px] top-[97px] ">
            {weightChange}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            {weightLossOrGain === "weightGain"
              ? "You will gain weight (kg/day)"
              : weightLossOrGain === "weightLoss"
                ? "You will lose weight (kg/day)"
                : "No change in weight (kg/day)"}
          </div>

          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            To lose weight, consume less than maintenance calories. For weight
            gain, be caloric surplus with nutrient-rich foods!
          </p>
        </div>
      </section>
    </>
  );
};

export default WeightLossAndGain;
