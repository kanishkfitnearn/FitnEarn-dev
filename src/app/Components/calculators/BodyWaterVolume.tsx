"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import SvgGauge from "../GaugeMeter";

const ConversionFactors = {
  cm_to_inch: 0.393701,
  inch_to_cm: 2.54,
};

const ConversionFactorsForWeight = {
  lb_to_kg: 0.453592,
  kg_to_lb: 2.20462,
};

const BodyWaterVolume = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [waterVolume, setWaterVolume] = useState<number>(0);
  const [weightErr, setWeightErr] = useState<string>("");
  const [heightErr, setHeightErr] = useState<string>("");
  const [ageErr, setAgeErr] = useState<string>("");

  const handleHeightChange = (e: any) => {
    const value = parseInt(e.target.value);
    setHeightValue(value);
  };

  const toggleUnit = (selectedUnit: any) => {
    if (selectedUnit !== unit) {
      if (selectedUnit === "cm" && unit === "i") {
        const cmValue = Math.round(heightValue! * ConversionFactors.inch_to_cm);
        setHeightValue(cmValue);
        setHeightFlag("Cm");
      } else if (selectedUnit === "i" && unit === "cm") {
        const inchValue = Math.round(
          heightValue! * ConversionFactors.cm_to_inch,
        );
        setHeightValue(inchValue);
        setHeightFlag("I");
      }
      setUnit(selectedUnit);
    }
  };

  const handleWeightChange = (e: any) => {
    const value = parseInt(e.target.value);
    setWeightValue(value);
  };

  const toggleWeightUnits = (selectedUnit: string) => {
    if (selectedUnit !== weight) {
      if (selectedUnit === "Lb" && weight === "Kg") {
        const lbValue = Math.round(
          weightValue! * ConversionFactorsForWeight.kg_to_lb,
        );
        setWeightValue(lbValue);
        setWeightFlag("Lb");
      } else if (selectedUnit === "Kg" && weight === "Lb") {
        const kgValue = Math.round(
          weightValue! * ConversionFactorsForWeight.lb_to_kg,
        );
        setWeightValue(kgValue);
        setWeightFlag("Kg");
      }
      setWeight(selectedUnit);
    }
  };

  const calculateWaterVolume = (e: any) => {
    e.preventDefault();
    let weight, height, waterVolume;
    //console.log("height weight before", heightValue, weightValue, gender, age);
    if (heightFlag === "Cm") {
      height = heightValue!;
    }
    if (heightFlag === "I") {
      height = heightValue! * 2.54;
    }
    if (weightFlag === "Lb") {
      weight = weightValue! * 0.453592;
    }
    if (weightFlag === "Kg") {
      weight = weightValue;
    }

    if (age! < 15 || age! > 70) {
      setAgeErr("age range is 15 to 70 year.");
      return;
    } else setAgeErr("");
    if (height! > 220 || height! < 120) {
      setHeightErr(`valid height is between 120 cm and 220 cm.`);
      return;
    } else {
      setHeightErr("");
    }
    if (weight! > 150 || weight! < 35) {
      setWeightErr("valid height is between 35 kg and 150 kg.");
      return;
    } else {
      setWeightErr("");
    }
    // male:     2.447 - (0.09156 * age) + (0.1074 * height) + (0.3362 * weight)
    // 2.447 − 0.09156 × age (years) + 0.1074 × height (cm) + 0.3362 × weight (kg)
    // female:  -2.097 + (0.1069 * height) + (0.2466 * weight)
    //console.log("height weight after", height, weight);
    if (gender === "Male") {
      waterVolume =
        2.447 - 0.09156 * age! + 0.1074 * height! + 0.3362 * weight!;
    } else {
      waterVolume = -2.097 + 0.1069 * height! + 0.2466 * weight!;
    }
    setWaterVolume(parseFloat(waterVolume.toFixed(2)));
    //console.log(waterVolume);
  };
  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateWaterVolume}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Age"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[14px] md:text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${ageErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={age ?? ""}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Age"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${ageErr ? "text-[#F05252] dark:text-[#F05252]" : "text-[#A3A3A3] dark:text-[#A3A3A3]"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Age
                </label>
                {ageErr ? (
                  <span className=" absolute bottom-[-20px] mb-1 md:mb-0 text-[12px] text-center text-red-600">
                    {ageErr}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <Select required onValueChange={setGender}>
                <SelectTrigger className="calculator-input w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Male">Male </SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-[298px] md:w-[480px] mt-1 mb:mt-0">
              <input
                type="number"
                required
                id="Height"
                className={`w-[298px] md:w-[480px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${heightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                placeholder=" "
                value={heightValue}
                onChange={handleHeightChange}
              />
              <label
                htmlFor="Height"
                className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${heightErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
              >
                Height
              </label>
              <div className="flex absolute top-[6px] md:top-[10px] right-1 md:right-[10px]">
                <span
                  onClick={() => toggleUnit("cm")}
                  className={`${unit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                >
                  cm
                </span>
                <span
                  onClick={() => toggleUnit("i")}
                  className={`${unit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                >
                  in
                </span>
              </div>
              {heightErr ? (
                <span className="text-[12px] text-center text-red-600">
                  {heightErr}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="relative w-[298px] md:w-[480px]">
              <input
                type="number"
                required
                id="Weight"
                className={`block w-[298px] md:w-[480px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                placeholder=" "
                value={weightValue}
                onChange={handleWeightChange}
              />
              <label
                htmlFor="Weight"
                className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${weightErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
              >
                Weight
              </label>
              <div className="flex absolute top-[6px] md:top-[10px] right-1 md:right-[10px]">
                <span
                  onClick={() => toggleWeightUnits("Lb")}
                  className={`${weight === "Lb" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                >
                  Lb
                </span>
                <span
                  onClick={() => toggleWeightUnits("Kg")}
                  className={`${weight === "Kg" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                >
                  Kg
                </span>
              </div>
              {weightErr ? (
                <span className="text-[12px] text-center text-red-600">
                  {weightErr}
                </span>
              ) : (
                ""
              )}
            </div>

            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="relative flex flex-col items-center justify-center flex1">
          <SvgGauge percentageValue={waterVolume} range={100} />
          <span className="absolute left-[140px] top-[60px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="28"
              viewBox="0 0 21 28"
              fill="none"
            >
              <path
                d="M14.5815 9.19837C14.6072 10.3226 14.186 11.4112 13.4104 12.2254C12.6347 13.0396 11.5678 13.5129 10.4437 13.5417C9.31949 13.5129 8.25262 13.0396 7.47694 12.2254C6.70127 11.4112 6.28011 10.3226 6.3058 9.19837C6.3058 6.57772 8.56783 4.54833 10.0193 0.963565C10.0513 0.876832 10.1092 0.802002 10.1851 0.749152C10.2609 0.696302 10.3512 0.667969 10.4437 0.667969C10.5361 0.667969 10.6264 0.696302 10.7022 0.749152C10.7781 0.802002 10.836 0.876832 10.868 0.963565C12.3195 4.54833 14.5815 6.57634 14.5815 9.19837Z"
                fill="url(#paint0_linear_9140_38254)"
              />
              <path
                d="M20.5544 1.66966L18.3705 25.2463C18.3201 25.8179 18.0568 26.3498 17.6327 26.7364C17.2086 27.123 16.6547 27.3362 16.0809 27.3336H4.80751C4.23365 27.3362 3.67978 27.123 3.25569 26.7364C2.83161 26.3498 2.56827 25.8179 2.51789 25.2463L0.334019 1.66966C0.322911 1.43294 0.403624 1.20107 0.559322 1.02242C0.715021 0.843765 0.933682 0.73212 1.1697 0.710772C1.40571 0.689424 1.64086 0.760021 1.82609 0.907837C2.01132 1.05565 2.13233 1.26928 2.16387 1.50415L3.64891 17.5269L4.34774 25.0762C4.3581 25.1908 4.41108 25.2974 4.4962 25.3748C4.58133 25.4523 4.69241 25.495 4.80751 25.4945H16.0809C16.196 25.495 16.3071 25.4523 16.3922 25.3748C16.4773 25.2974 16.5303 25.1908 16.5406 25.0762L17.2901 16.9981L18.7245 1.50415C18.7561 1.26928 18.8771 1.05565 19.0623 0.907837C19.2475 0.760021 19.4827 0.689424 19.7187 0.710772C19.9547 0.73212 20.1734 0.843765 20.3291 1.02242C20.4848 1.20107 20.5655 1.43294 20.5544 1.66966Z"
                fill="url(#paint1_linear_9140_38254)"
              />
              <path
                d="M16.3795 16.8445L15.6622 24.5777H5.22562L4.62793 18.1088C5.44985 18.4528 6.33482 18.6204 7.22559 18.6008C10.9037 18.6008 11.8232 16.7617 15.0415 16.7617C15.4888 16.7621 15.9356 16.7897 16.3795 16.8445Z"
                fill="url(#paint2_linear_9140_38254)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_38254"
                  x1="5.98631"
                  y1="8.88527"
                  x2="14.8612"
                  y2="8.8862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9140_38254"
                  x1="-0.444776"
                  y1="17.7027"
                  x2="21.236"
                  y2="17.7054"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_9140_38254"
                  x1="4.17595"
                  y1="21.7506"
                  x2="16.775"
                  y2="21.7537"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[100px] absolute left-[100px] top-[97px] ">
            {waterVolume}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Your Water Volume in liters
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            As per National Institute of Health, Body water volume is crucial
            for overall health, as it makes up about 50-70% of your body weight.
          </p>
        </div>
      </section>
    </>
  );
};

export default BodyWaterVolume;
