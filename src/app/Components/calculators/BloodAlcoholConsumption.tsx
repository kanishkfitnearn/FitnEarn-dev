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

const BloodAlcoholConsumption = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [alcohol, setAlcohol] = useState<string>("");
  const [size, setSize] = useState<number>();
  const [percentage, setPercentage] = useState<number>();
  const [time, setTime] = useState<number>();
  const [gender, setGender] = useState("");
  const [bac, setBac] = useState<number>(0);

  const [weightErr, setWeightErr] = useState<string>("");
  const [heightErr, setHeightErr] = useState<string>("");

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

  const calculateBAC = (e: any) => {
    e.preventDefault();
    let weight;
    let height;
    // console.log(
    //   heightValue,
    //   weightValue,
    //   alcohol,
    //   size,
    //   percentage,
    //   gender,
    //   time,
    // );
    if (heightFlag === "Cm") {
      height = heightValue! / 100;
    } else if (heightFlag === "I") {
      height = heightValue! * 0.0254;
    }

    if (weightFlag === "Lb") {
      weight = weightValue!;
    } else if (weightFlag === "Kg") {
      weight = weightValue! * 2.20462;
    }

    if (height! > 2.2 || height! < 1.2) {
      setHeightErr(`valid height is between 120 cm and 220 cm.`);
      return;
    } else {
      setHeightErr("");
    }

    if (weight! > 331 || weight! < 77) {
      setWeightErr("valid height is between 35 kg and 150 kg.");
      return;
    } else {
      setWeightErr("");
    }

    const r = gender! === "Male" ? 0.73 : 0.66;
    const A = size! * (percentage! / 100) * 0.033814; // Volume of pure alcohol in ounces
    const BAC = (A * 5.14) / (weight! * r) - 0.015 * (time! / 60);

    // Ensure BAC is not negative
    const correctedBAC = Math.max(BAC, 0);

    setBac(parseFloat(correctedBAC.toFixed(3)));
  };

  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-0 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateBAC}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-3 md:gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Height"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${heightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Weight"
                  className={`block w-[144px] md:w-[232px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
            </div>

            <div className="flex  gap-4">
              <Select required onValueChange={setAlcohol}>
                <SelectTrigger className="calculator-input-for-alcohol w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Type of Alcohol" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Beer">Beer</SelectItem>
                  <SelectItem value="Cider">Cider</SelectItem>
                  <SelectItem value="Cocktail">Cocktail</SelectItem>
                  <SelectItem value="Wine">Wine</SelectItem>
                  <SelectItem value="Spirits">Spirits</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              <Select
                required
                onValueChange={(value) => setSize(parseFloat(value))}
              >
                <SelectTrigger className="calculator-input-for-alcohol px-1 w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Size of Alcohol" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="150">1 Glass (150ml)</SelectItem>
                  <SelectItem value="300">1 Bottle (300ml)</SelectItem>
                  <SelectItem value="375">1/5 Bottle (375ml)</SelectItem>
                  <SelectItem value="750">750ml</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Select
                required
                onValueChange={(value) => setPercentage(parseFloat(value))}
              >
                <SelectTrigger className="calculator-input-for-alcohol  w-[144px] md:w-[232px]">
                  <SelectValue placeholder="How Strong it was?" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="5%">&lt; 5 % Alcohol</SelectItem>
                  <SelectItem value="10%">&lt; 10 % Alcohol</SelectItem>
                  <SelectItem value="17%">10%-25% Alcohol</SelectItem>
                  <SelectItem value="32%">25-40% Alcohol</SelectItem>
                  <SelectItem value="40%">&gt; 40% Alcohol</SelectItem>
                </SelectContent>
              </Select>

              <Select required onValueChange={setGender}>
                <SelectTrigger className="calculator-input-for-alcohol w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-[298px] md:w-[480px]">
              <input
                type="number"
                required
                id="TimeOfDrink"
                className="w-[298px] md:w-[480px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 border-[#737373] appearance-none dark:text-[#FFF] dark:border-[#737373] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer"
                placeholder=" "
                value={time}
                onChange={(e) => setTime(parseInt(e.target.value))}
              />
              <label
                htmlFor="TimeOfDrink"
                className="absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] text-[#A3A3A3] dark:text-[#A3A3A3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Time of Drink
              </label>
              <span className="absolute right-2 top-2 md:top-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12.6357 2C10.6579 2 8.72454 2.58649 7.08004 3.6853C5.43555 4.78412 4.15383 6.3459 3.39695 8.17317C2.64008 10.0004 2.44204 12.0111 2.82789 13.9509C3.21375 15.8907 4.16615 17.6725 5.56468 19.0711C6.9632 20.4696 8.74503 21.422 10.6848 21.8079C12.6247 22.1937 14.6353 21.9957 16.4626 21.2388C18.2898 20.4819 19.8516 19.2002 20.9504 17.5557C22.0493 15.9112 22.6357 13.9778 22.6357 12C22.6328 9.34873 21.5783 6.80688 19.7036 4.93215C17.8289 3.05742 15.287 2.00291 12.6357 2ZM16.6177 15.982C16.4302 16.1695 16.1759 16.2748 15.9107 16.2748C15.6456 16.2748 15.3913 16.1695 15.2037 15.982L11.9297 12.708C11.7427 12.5197 11.6371 12.2654 11.6357 12V8C11.6357 7.73478 11.7411 7.48043 11.9286 7.29289C12.1162 7.10536 12.3705 7 12.6357 7C12.901 7 13.1553 7.10536 13.3429 7.29289C13.5304 7.48043 13.6357 7.73478 13.6357 8V11.586L16.6177 14.568C16.8052 14.7555 16.9105 15.0098 16.9105 15.275C16.9105 15.5402 16.8052 15.7945 16.6177 15.982Z"
                    fill="url(#paint0_linear_4150_23434)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4150_23434"
                      x1="22.1975"
                      y1="22"
                      x2="1.60527"
                      y2="20.8758"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E3206D" />
                      <stop offset="1" stopColor="#F16A33" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
            {/* <div className="relative">
              <Input
                type="number"
                required
                value={time}
                placeholder="time since you last drank alcohol in minutes"
                className="calculator-input w-[298px] md:w-[480px]"
                onChange={(e) => setTime(parseInt(e.target.value))}
              />
              <span className="absolute right-2 top-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12.6357 2C10.6579 2 8.72454 2.58649 7.08004 3.6853C5.43555 4.78412 4.15383 6.3459 3.39695 8.17317C2.64008 10.0004 2.44204 12.0111 2.82789 13.9509C3.21375 15.8907 4.16615 17.6725 5.56468 19.0711C6.9632 20.4696 8.74503 21.422 10.6848 21.8079C12.6247 22.1937 14.6353 21.9957 16.4626 21.2388C18.2898 20.4819 19.8516 19.2002 20.9504 17.5557C22.0493 15.9112 22.6357 13.9778 22.6357 12C22.6328 9.34873 21.5783 6.80688 19.7036 4.93215C17.8289 3.05742 15.287 2.00291 12.6357 2ZM16.6177 15.982C16.4302 16.1695 16.1759 16.2748 15.9107 16.2748C15.6456 16.2748 15.3913 16.1695 15.2037 15.982L11.9297 12.708C11.7427 12.5197 11.6371 12.2654 11.6357 12V8C11.6357 7.73478 11.7411 7.48043 11.9286 7.29289C12.1162 7.10536 12.3705 7 12.6357 7C12.901 7 13.1553 7.10536 13.3429 7.29289C13.5304 7.48043 13.6357 7.73478 13.6357 8V11.586L16.6177 14.568C16.8052 14.7555 16.9105 15.0098 16.9105 15.275C16.9105 15.5402 16.8052 15.7945 16.6177 15.982Z"
                    fill="url(#paint0_linear_4150_23434)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4150_23434"
                      x1="22.1975"
                      y1="22"
                      x2="1.60527"
                      y2="20.8758"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E3206D" />
                      <stop offset="1" stopColor="#F16A33" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div> */}

            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="flex1 relative h-auto md:h-[347px] flex flex-col justify-center items-center">
          <SvgGauge percentageValue={bac} range={5} />
          <span className="absolute left-[140px] top-[55px] md:top-[50px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
            >
              <path
                d="M9.93539 1H0.666992V5.94314H9.93539V1Z"
                fill="url(#paint0_linear_9140_36447)"
              />
              <path
                d="M7.36045 10.957H3.24121V22.2128C3.24121 23.3484 4.16516 24.2724 5.30083 24.2724C6.43651 24.2724 7.36045 23.3484 7.36045 22.2128V10.957Z"
                fill="url(#paint1_linear_9140_36447)"
              />
              <path
                d="M5.30093 26.3316C3.02593 26.3316 1.18164 24.4873 1.18164 22.2123V5.94141H9.42023V22.2123C9.42023 24.4873 7.57599 26.3316 5.30093 26.3316Z"
                stroke="url(#paint2_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.93539 1H0.666992V5.94314H9.93539V1Z"
                stroke="url(#paint3_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.59668 8.42188H3.24154"
                stroke="url(#paint4_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.59668 10.957H3.24154"
                stroke="url(#paint5_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.59668 13.4961H3.24154"
                stroke="url(#paint6_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.59668 16.0312H3.24154"
                stroke="url(#paint7_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.59668 18.5664H3.24154"
                stroke="url(#paint8_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.59668 21.1055H3.24154"
                stroke="url(#paint9_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8943 13.3053C14.7306 12.1416 14.5974 10.3002 15.5815 8.98123L17.8786 5.90246C18.0575 5.66272 18.4167 5.66272 18.5955 5.90246L20.8926 8.98123C21.8767 10.3002 21.7435 12.1417 20.5798 13.3053C19.286 14.5992 17.1882 14.5992 15.8943 13.3053Z"
                fill="url(#paint10_linear_9140_36447)"
              />
              <path
                d="M15.8943 13.3053C14.7306 12.1416 14.5974 10.3002 15.5815 8.98123L17.8786 5.90246C18.0575 5.66272 18.4167 5.66272 18.5955 5.90246L20.8926 8.98123C21.8767 10.3002 21.7435 12.1417 20.5798 13.3053C19.286 14.5992 17.1882 14.5992 15.8943 13.3053Z"
                stroke="url(#paint11_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.7773 9.99865L21.907 5.82812H23.9271"
                stroke="url(#paint12_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.2381 18.8562C21.0002 18.6954 20.7132 18.6016 20.4044 18.6016C19.5808 18.6016 18.9131 19.2692 18.9131 20.0928C18.9131 20.9164 19.5808 21.5841 20.4044 21.5841C20.7388 21.5841 21.014 21.474 21.2228 21.288C21.266 21.2495 21.3064 21.2078 21.3439 21.1631"
                stroke="url(#paint13_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8809 17.1367V21.5842"
                stroke="url(#paint14_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3381 21.6118C14.1263 21.6118 14.7652 20.9729 14.7652 20.1848C14.7652 19.3967 14.1263 18.7578 13.3381 18.7578C12.55 18.7578 11.9111 19.3967 11.9111 20.1848C11.9111 20.9729 12.55 21.6118 13.3381 21.6118Z"
                stroke="url(#paint15_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.7646 18.582V21.6066"
                stroke="url(#paint16_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.7148 21.58L25.1983 17.2891"
                stroke="url(#paint17_linear_9140_36447)"
                strokeWidth="0.9375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="22.9133"
                cy="17.2883"
                r="0.514905"
                fill="url(#paint18_linear_9140_36447)"
              />
              <circle
                cx="26.0003"
                cy="21.5774"
                r="0.514905"
                fill="url(#paint19_linear_9140_36447)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_36447"
                  x1="0.310515"
                  y1="4.1552"
                  x2="10.2473"
                  y2="4.15822"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9140_36447"
                  x1="3.08278"
                  y1="19.4562"
                  x2="7.49909"
                  y2="19.4564"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_9140_36447"
                  x1="0.864772"
                  y1="18.9564"
                  x2="9.69751"
                  y2="18.957"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_9140_36447"
                  x1="0.310515"
                  y1="4.1552"
                  x2="10.2473"
                  y2="4.15822"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_9140_36447"
                  x1="1.53342"
                  y1="9.06017"
                  x2="3.29691"
                  y2="9.06064"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_9140_36447"
                  x1="1.53342"
                  y1="11.5953"
                  x2="3.29691"
                  y2="11.5958"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_9140_36447"
                  x1="1.53342"
                  y1="14.1344"
                  x2="3.29691"
                  y2="14.1349"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_9140_36447"
                  x1="1.53342"
                  y1="16.6695"
                  x2="3.29691"
                  y2="16.67"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear_9140_36447"
                  x1="1.53342"
                  y1="19.2047"
                  x2="3.29691"
                  y2="19.2052"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint9_linear_9140_36447"
                  x1="1.53342"
                  y1="21.7438"
                  x2="3.29691"
                  y2="21.7442"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint10_linear_9140_36447"
                  x1="14.669"
                  y1="11.182"
                  x2="21.7733"
                  y2="11.1829"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint11_linear_9140_36447"
                  x1="14.669"
                  y1="11.182"
                  x2="21.7733"
                  y2="11.1829"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint12_linear_9140_36447"
                  x1="18.5793"
                  y1="8.49016"
                  x2="24.1004"
                  y2="8.49127"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint13_linear_9140_36447"
                  x1="18.8196"
                  y1="20.5053"
                  x2="21.4257"
                  y2="20.5057"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint14_linear_9140_36447"
                  x1="16.8424"
                  y1="19.9755"
                  x2="17.9145"
                  y2="19.9756"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint15_linear_9140_36447"
                  x1="11.8014"
                  y1="20.5795"
                  x2="14.8612"
                  y2="20.58"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint16_linear_9140_36447"
                  x1="14.7262"
                  y1="20.5126"
                  x2="15.7983"
                  y2="20.5127"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint17_linear_9140_36447"
                  x1="23.6578"
                  y1="20.028"
                  x2="25.2482"
                  y2="20.0281"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint18_linear_9140_36447"
                  x1="22.3588"
                  y1="17.4308"
                  x2="23.4629"
                  y2="17.4309"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint19_linear_9140_36447"
                  x1="25.4457"
                  y1="21.7198"
                  x2="26.5498"
                  y2="21.72"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[80px] md:w-[100px] h-[60px] absolute left-[115px] md:left-[100px] top-[90px] md:top-[90px] ">
            {bac}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Your Alcohol Percentage
          </div>
          <p className="text-[16px] hidden md:block text-white font-medium text-center leading-normal mt-3">
          BAC indicates how much alcohol is in your system. A BAC of 0.03% is the legal limit as per Motor vehicle act 1988. Also, BAC of 0.02% may affect your mood and coordination Stay safe by keeping your BAC low: drink slowly, have water, and know when to stop.
          </p>
          <p className="text-[16px] block md:hidden text-white font-medium text-center leading-normal mt-3">
          BAC indicates how much alcohol is in your system. 
          </p>
        </div>
      </section>
    </>
  );
};

export default BloodAlcoholConsumption;
