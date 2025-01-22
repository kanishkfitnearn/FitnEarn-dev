"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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

const BMR = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [bmr, setBmr] = useState<number>(0);
  const [weightErr, setWeightErr] = useState<string>("");
  const [heightErr, setHeightErr] = useState<string>("");
  const [ageErr, setAgeErr] = useState<string>("");

  useEffect(() => {
    //console.log("weight: ", weightValue);
    //console.log("height: ", heightValue);
  }, [weightValue, heightValue]);

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

  const calculateBMR = (e: any) => {
    e.preventDefault();
    //console.log(weightValue, heightValue, age, gender);

    let weight;
    let height;
    if (heightFlag === "Cm") {
      height = heightValue;
    }
    if (heightFlag === "I") {
      height = Math.round(heightValue! * 2.54);
    }
    if (weightFlag === "Lb") {
      weight = Math.round(weightValue! * 0.453592);
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
    //console.log("height weight after", height, weight);
    let bmrValue;

    if (gender === "Male") {
      bmrValue = Math.round(
        13.397 * weight! + 4.799 * height! - 5.677 * age! + 88.362,
      );
    } else {
      bmrValue = Math.round(
        9.247 * weight! + 3.098 * height! - 4.33 * age! + 447.593,
      );
    }
    setBmr(bmrValue);
    //console.log(bmrValue);
  };

  return (
    <>
      <section className="flex flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] font-bold md:text-[24px] text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateBMR}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-[12px] md:gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Age"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${ageErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={age ?? ""}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Age"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${ageErr ? " text-[#F05252]" : "text-[#A3A3A3]"} dark:text-[#A3A3A3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 ${ageErr ? "peer-placeholder-shown:top-1/3" : "peer-placeholder-shown:top-1/2"} peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Age
                </label>
                {ageErr ? (
                  <span className="absolute bottom-[-20px] pb-1 md:pb-0 text-[12px] text-center text-red-600">
                    {ageErr}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="relative">
                <Input
                  type="number"
                  required
                  className="calculator-input w-[144px] md:w-[232px]"
                  placeholder="Age"
                  value={age ?? ""}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                {ageErr ? (
                  <span className="absolute bottom-[-20px] text-[12px] text-center text-red-600">
                    {ageErr}
                  </span>
                ) : (
                  ""
                )}
              </div> */}

              {/* <div className="relative w-[144px] md:w-[232px]">
                <select
                  id="Gender"
                  required
                  className={`${gender === "" ? "text-[#A3A3A3]" : "text-[#FFF]"} w-[144px] md:w-[232px] block h-[40px] md:h-[48px] px-2.5 pb-0 md:pb-2.5 pt-1 md:pt-4 text-[16px] text-[#A3A3A3] bg-transparent rounded-lg border-1 border-[#737373] appearance-none dark:text-[#FFF] dark:border-[#737373] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option
                    className="text-[14px] md:text-[16px] text-[#A3A3A3]"
                    value=""
                    disabled
                  >
                    Gender
                  </option>
                  <option className="text-[#FFF] bg-[#262626]" value="Male">
                    Male
                  </option>
                  <option className="text-[#FFF] bg-[#262626]" value="Female">
                    Female
                  </option>
                </select>
              </div> */}

              <Select required onValueChange={setGender}>
                <SelectTrigger className="calculator-input h-[40px] md:h-[48px] w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-4 mt-1 md:flex-nowrap md:mt-0">
              <div className="relative w-[300px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Height"
                  className={`w-[300px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${heightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={heightValue}
                  onChange={handleHeightChange}
                />
                <label
                  htmlFor="Height"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${heightErr ? " text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
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

              {/* <div className="relative">
                <Input
                  type="number"
                  required
                  className="calculator-input w-[300px] md:w-[232px]"
                  placeholder="Height"
                  value={heightValue}
                  onChange={handleHeightChange}
                />
                <div className="flex absolute top-[10px] right-[20px]">
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
              </div> */}

              <div className="relative w-[300px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Weight"
                  className={`block w-[300px] md:w-[232px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252] " : "border-[#737373] dark:border-[#737373] "}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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

              {/* <div className="relative">
                <Input
                  type="number"
                  required
                  className="calculator-input w-[300px] md:w-[232px]"
                  placeholder="Weight"
                  value={weightValue}
                  onChange={handleWeightChange}
                />
                <div className="flex  absolute top-[10px] right-[20px]">
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
              </div> */}
            </div>
            <Button className="primaryButton w-[300px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="relative flex flex-col items-center justify-center flex1">
          <SvgGauge percentageValue={bmr} range={4000} />
          <span className="absolute left-[134px] top-[62px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M25.8677 5.0747L26.0258 4.60035L25.8677 5.0747C25.9597 5.10538 26.0299 5.1816 26.0526 5.27668C26.0747 5.37144 26.0462 5.47111 25.9774 5.53998L24.832 6.68534L24.5469 6.97041L24.7651 7.30944C26.0944 9.37551 26.8695 11.7839 26.8695 14.2456C26.8695 21.2929 21.0834 27.079 14.0361 27.079C13.8805 27.079 13.7549 26.9534 13.7549 26.7977C13.7549 26.642 13.8805 26.5165 14.0361 26.5165C20.7744 26.5165 26.307 20.9838 26.307 14.2456C26.307 11.9945 25.6166 9.80138 24.4793 7.91515L24.1494 7.36795L23.6976 7.81977L22.6624 8.85498C22.5964 8.92093 22.4992 8.95274 22.3981 8.92995C22.3035 8.90701 22.2277 8.83713 22.1971 8.74528C22.1971 8.74527 22.1971 8.74525 22.1971 8.74523L20.54 3.7732L20.5399 3.77278C20.5062 3.67194 20.5325 3.56043 20.6077 3.48526L20.6083 3.4846C20.6835 3.40911 20.7942 3.38328 20.8933 3.41684L20.8956 3.41762L25.8677 5.0747ZM21.0537 2.94327L21.0537 2.94331L21.0537 2.94327Z"
                fill="url(#paint0_linear_7214_16906)"
                fillOpacity="0.12"
                stroke="url(#paint1_linear_7214_16906)"
              />
              <path
                d="M6.93976 24.8646L6.94247 24.8655C7.03755 24.8978 7.15085 24.8737 7.2277 24.797C7.22774 24.7969 7.22779 24.7969 7.22783 24.7969M6.93976 24.8646L7.22783 24.7969M6.93976 24.8646L1.96767 23.2075C1.87561 23.1769 1.80549 23.1006 1.78278 23.0056C1.76071 22.9108 1.78912 22.8111 1.85798 22.7423L3.086 21.5142L3.36466 21.2356L3.15882 20.8995C1.92497 18.8851 1.20312 16.6082 1.20312 14.2474C1.20312 7.2001 6.98917 1.41406 14.0365 1.41406C14.1921 1.41406 14.3177 1.53963 14.3177 1.69531C14.3177 1.85099 14.1921 1.97656 14.0365 1.97656C7.29824 1.97656 1.76563 7.50917 1.76563 14.2474C1.76563 16.3945 2.40165 18.4466 3.43883 20.2673L3.7633 20.8369L4.22684 20.3734L5.1722 19.428C5.24059 19.3597 5.34054 19.3308 5.43583 19.3529C5.53131 19.3758 5.6068 19.4454 5.63735 19.5374L5.63751 19.5378L7.29537 24.5091L7.29548 24.5095C7.32917 24.6102 7.3029 24.7217 7.22783 24.7969M6.93976 24.8646L7.22783 24.7969"
                fill="url(#paint2_linear_7214_16906)"
                fillOpacity="0.12"
                stroke="url(#paint3_linear_7214_16906)"
              />
              <path
                d="M15.5998 4.03906C14.2513 4.03906 13.0607 4.7263 12.3584 5.76865C12.9018 5.66057 13.4626 5.60156 14.0373 5.60156C16.0944 5.60156 17.9839 6.32979 19.465 7.53979C19.2588 5.57859 17.6147 4.03906 15.5998 4.03906Z"
                fill="url(#paint4_linear_7214_16906)"
              />
              <path
                d="M18.7236 21.2773C20.0181 21.2773 21.0674 20.228 21.0674 18.9336C21.0674 17.6392 20.0181 16.5898 18.7236 16.5898C17.4292 16.5898 16.3799 17.6392 16.3799 18.9336C16.3799 20.228 17.4292 21.2773 18.7236 21.2773Z"
                fill="url(#paint5_linear_7214_16906)"
              />
              <path
                d="M8.56738 19.7148C9.43033 19.7148 10.1299 19.0153 10.1299 18.1523C10.1299 17.2894 9.43033 16.5898 8.56738 16.5898C7.70444 16.5898 7.00488 17.2894 7.00488 18.1523C7.00488 19.0153 7.70444 19.7148 8.56738 19.7148Z"
                fill="url(#paint6_linear_7214_16906)"
              />
              <path
                d="M8.56738 10.2891C9.43033 10.2891 10.1299 9.58951 10.1299 8.72656C10.1299 7.86362 9.43033 7.16406 8.56738 7.16406C7.70444 7.16406 7.00488 7.86362 7.00488 8.72656C7.00488 9.58951 7.70444 10.2891 8.56738 10.2891Z"
                fill="url(#paint7_linear_7214_16906)"
              />
              <path
                d="M14.0361 7.16406C13.1361 7.16406 12.2827 7.3488 11.4917 7.65693C11.6148 7.99203 11.6924 8.34922 11.6924 8.72656C11.6924 10.4501 10.2909 11.8516 8.56738 11.8516C8.19004 11.8516 7.83285 11.774 7.49775 11.6509C7.18962 12.4419 7.00488 13.3474 7.00488 14.2474C7.00488 14.6422 7.05858 15.023 7.12113 15.4001C7.55561 15.1708 8.04275 15.0287 8.56738 15.0287C10.2909 15.0287 11.6924 16.4302 11.6924 18.1537C11.6924 19.0425 11.3154 19.841 10.7179 20.4105C11.7105 20.9464 12.8291 21.2787 14.0361 21.2787C14.5354 21.2787 15.0211 21.223 15.491 21.1241C15.0663 20.4991 14.8174 19.7457 14.8174 18.9349C14.8174 16.7811 16.5698 15.0287 18.7236 15.0287C19.5345 15.0287 20.2879 15.2776 20.9128 15.7022C21.0118 15.2324 21.0674 14.7467 21.0674 14.2474C21.0674 10.3641 17.9194 7.16406 14.0361 7.16406Z"
                fill="url(#paint8_linear_7214_16906)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7214_16906"
                  x1="20.3122"
                  y1="27.579"
                  x2="19.464"
                  y2="2.93153"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FB923C" />
                  <stop offset="1" stopColor="#F43F5E" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_7214_16906"
                  x1="12.712"
                  y1="18.6534"
                  x2="27.8445"
                  y2="18.6548"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_7214_16906"
                  x1="7.76042"
                  y1="25.3795"
                  x2="6.92669"
                  y2="0.942508"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FB923C" />
                  <stop offset="1" stopColor="#F43F5E" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_7214_16906"
                  x1="0.160256"
                  y1="16.5303"
                  x2="15.2928"
                  y2="16.5317"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_7214_16906"
                  x1="12.0851"
                  y1="6.27357"
                  x2="19.7042"
                  y2="6.27608"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_7214_16906"
                  x1="16.1996"
                  y1="19.5819"
                  x2="21.2252"
                  y2="19.5827"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_7214_16906"
                  x1="6.88469"
                  y1="18.5845"
                  x2="10.2351"
                  y2="18.5851"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_7214_16906"
                  x1="6.88469"
                  y1="9.15875"
                  x2="10.2351"
                  y2="9.15929"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear_7214_16906"
                  x1="6.46402"
                  y1="16.1734"
                  x2="21.5407"
                  y2="16.1758"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[84px] absolute left-[108px] bottom-[100px] ">
            {bmr}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Kcal
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            A healthy BMR shows how many calories your body needs when resting.
          </p>
        </div>
      </section>
    </>
  );
};

export default BMR;
