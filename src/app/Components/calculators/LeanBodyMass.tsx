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

const LeanBodyMass = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState("");
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [lbm, setLbm] = useState<number>(0);
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

  const calculateLBM = (e: any) => {
    e.preventDefault();
    let weight;
    let height;
    let LBM;
    //console.log("height weight before", heightValue, weightValue, age, gender);

    // Convert height and weight based on the units
    if (heightFlag === "Cm") {
      height = heightValue;
    } else if (heightFlag === "I") {
      height = Math.round(heightValue! * 2.54); // Convert inches to cm
    }

    if (weightFlag === "Lb") {
      weight = Math.round(weightValue! * 0.453592); // Convert pounds to kg
    } else if (weightFlag === "Kg") {
      weight = weightValue;
    }

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

    if (age! > 70 || age! < 15) {
      setAgeErr("age range is 15 to 70 year.");
      return;
    } else {
      setAgeErr("");
    }

    //console.log("height weight after", height, weight);

    // Calculate LBM based on gender
    if (gender === "Male") {
      LBM = Math.round(0.407 * weight! + 0.267 * height! - 19.2);
    } else {
      LBM = Math.round(0.252 * weight! + 0.473 * height! - 48.3);
    }
    //console.log("LBM", LBM);
    setLbm(LBM);
  };

  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateLBM}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-[12px] md:gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Age"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${ageErr ? "border-[#F05252] dark:border-[#F05252]" : " border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
                  <span className=" absolute bottom-[-20px] text-[12px] text-center text-red-600">
                    {ageErr}
                  </span>
                ) : (
                  ""
                )}
              </div> */}
              {/* <div className="relative">
                             <Input type="number" required className="calculator-input w-[144px] md:w-[232px]" placeholder="Age"
                               value={age ?? ''} onChange={(e) => setAge(parseInt(e.target.value))} />
                              { ageErr ? <span  className="absolute bottom-[-20px] text-[12px] text-center text-red-600">{ageErr}</span> : ""}
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
                    className="w-[144px] md:w-[232px] text-[14px] md:text-[16px] text-[#A3A3A3]"
                    value=""
                    disabled
                  >
                    Gender
                  </option>
                  <option
                    className="w-[144px] md:w-[232px] text-[#FFF] bg-[#262626]"
                    value="Male"
                  >
                    Male
                  </option>
                  <option
                    className="w-[144px] md:w-[232px] text-[#FFF] bg-[#262626]"
                    value="Female"
                  >
                    Female
                  </option>
                </select>
                <label
                  htmlFor="Gender"
                  className="absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] text-[#A3A3A3] dark:text-[#A3A3A3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Gender
                </label>
              </div> */}
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

            <div className="flex flex-wrap gap-4 mt-1 md:flex-nowrap md:mt-0">
              <div className="relative w-[298px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Height"
                  className={`w-[298px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${heightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
              <div className="relative w-[298px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Weight"
                  className={`block w-[298px] md:w-[232px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={weightValue}
                  onChange={handleWeightChange}
                />
                <label
                  htmlFor="Weight"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${weightErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"}  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
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
                  className="calculator-input w-[298px] md:w-[232px]"
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
                    className={`${unit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-m h-[28px] w-[28px]`}
                  >
                    in{" "}
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
              <div className="relative">
                <Input
                  type="number"
                  required
                  className="calculator-input w-[298px] md:w-[232px]"
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
                    className={`${weight === "Kg" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-m h-[28px] w-[28px]`}
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

            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="relative flex flex-col items-center justify-center flex1">
          <SvgGauge percentageValue={lbm} range={120} />
          <span className="absolute left-[134px] top-[60px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M18.5689 24.6691L17.998 24.1735C17.6969 23.9163 17.3143 23.772 16.9128 23.772H15.081C14.4223 23.7281 13.8765 24.2676 13.4248 24.6691C13.0861 24.9576 12.879 25.3842 12.8539 25.8359L12.6469 29.7253H19.3405L19.1335 25.8359C19.1147 25.3842 18.9077 24.9576 18.5689 24.6691ZM16.7057 26.8145C17.0759 26.94 17.4146 26.8584 17.5777 26.7957C17.998 26.6452 18.2427 27.2913 17.8161 27.4481C17.4523 27.605 16.781 27.6363 16.3419 27.423V28.0002C16.643 28.3013 17.3456 28.3076 17.5777 28.1758C18.0043 28.0253 18.2427 28.6714 17.8161 28.8283C17.4523 28.9851 16.781 29.0165 16.3419 28.8032V29.1168C16.3419 29.305 16.1851 29.4619 15.9969 29.4619C15.8024 29.4619 15.6518 29.305 15.6518 29.1168V28.8032C15.219 29.0165 14.5415 28.9851 14.1776 28.8283C13.751 28.6714 13.9831 28.0253 14.416 28.1758C14.6481 28.3076 15.3507 28.3013 15.6518 28.0002V27.423C15.219 27.6363 14.5415 27.605 14.1776 27.4481C13.751 27.2913 13.9894 26.6452 14.416 26.7957C14.6481 26.9275 15.3507 26.9149 15.6518 26.6201V26.0429C15.219 26.2562 14.5415 26.2248 14.1776 26.068C13.751 25.9112 13.9894 25.265 14.416 25.4156C14.6481 25.5473 15.3444 25.5348 15.6518 25.2337V24.9639C15.6518 24.7757 15.8024 24.6189 15.9969 24.6189C16.1851 24.6189 16.3419 24.7757 16.3419 24.9639V25.2337C16.643 25.5411 17.3456 25.5411 17.5777 25.4156C17.998 25.265 18.2427 25.9112 17.8161 26.068C17.4523 26.2186 16.781 26.2562 16.3419 26.0429V26.6201C16.4548 26.7016 16.574 26.7706 16.7057 26.8145ZM25.6201 4.41892C24.8359 4.34991 24.0141 4.53184 23.186 4.9396C22.7093 6.82159 24.7732 7.96332 26.2725 6.80904C26.4858 6.62712 26.8308 6.80277 26.8308 7.07252C26.8371 7.25444 26.8685 7.4301 26.9186 7.5932C27.0316 7.92568 27.2323 8.1578 27.3766 8.29581C27.4581 8.37109 27.5021 8.48401 27.4832 8.59065C27.408 9.1427 27.4581 9.69475 27.6212 10.2154C27.9161 11.1627 28.5121 11.7775 28.97 12.1225C29.2084 12.2919 29.108 12.7059 28.8132 12.7373C28.167 12.8502 27.1884 12.8628 26.6175 12.8063C25.802 12.7122 25.3378 12.9067 24.8736 13.6093C24.7983 13.7222 24.6665 13.7849 24.5285 13.7598C23.8196 13.6532 23.0857 13.7096 22.4082 13.9167C21.5989 14.1676 21.0155 14.5816 20.6642 14.889C20.5701 14.9706 20.4258 14.9957 20.3066 14.9455C19.5162 14.6381 18.8449 14.061 18.3995 13.3395C17.7408 13.9794 16.9002 14.6318 15.9404 14.7134C14.9931 14.6318 14.1713 13.9919 13.5064 13.3709C13.1112 14.0986 12.4587 14.6695 11.6808 14.9518C11.5617 14.9957 11.4299 14.9706 11.3358 14.889C10.8277 14.4499 10.2254 14.1174 9.59184 13.9167C8.91433 13.7096 8.18036 13.6532 7.47148 13.7598C7.33346 13.7787 7.20172 13.7159 7.12645 13.603C6.6685 12.9004 6.198 12.7059 5.38247 12.8C4.80533 12.8565 3.83925 12.8439 3.18683 12.731C2.89198 12.6997 2.78534 12.2856 3.02999 12.1162C3.48167 11.7712 4.08391 11.1564 4.37875 10.2092C4.54185 9.68848 4.58577 9.13643 4.51676 8.58438C4.49794 8.47146 4.54185 8.36481 4.62341 8.28953C4.76769 8.15152 4.96844 7.91941 5.08136 7.58693C5.13782 7.41755 5.16918 7.24817 5.16918 7.07252C5.16918 6.79649 5.52049 6.62712 5.7275 6.80277C7.22682 7.95705 9.28445 6.80904 8.81396 4.93333C4.44776 2.88197 1.05391 7.27954 0 12.8753C0.0313664 13.0196 0.144285 13.4211 0.495589 13.5905C0.759067 13.7473 1.23584 13.534 1.31112 13.9543C1.69379 16.4699 4.0149 18.8286 6.98843 18.8349C7.20173 18.8349 7.37738 19.0482 7.32092 19.2552C7.23936 19.6065 7.21427 19.9578 7.23309 20.2966C7.33974 21.7645 8.22427 22.7306 8.61949 23.1948C9.78004 24.5499 10.5328 26.7393 10.859 29.7191H11.9631L12.1702 25.792C12.2078 25.1521 12.4964 24.5499 12.9794 24.1358L13.5566 23.6403C13.9831 23.2701 14.5289 23.0694 15.0935 23.0694H16.9253C17.7659 23.0317 18.456 23.5901 19.0331 24.1358C19.5162 24.5499 19.811 25.1521 19.8424 25.792L20.0494 29.7191H21.1535C21.4734 26.7455 22.2262 24.5436 23.3931 23.1948C23.782 22.7369 24.6791 21.7708 24.7732 20.2966C24.792 19.9516 24.7606 19.6065 24.6854 19.2552C24.6352 19.0482 24.8045 18.8286 25.0178 18.8349C25.7267 18.8224 27.1006 18.6593 28.3929 17.712C30.0929 16.4636 30.5697 14.6695 30.6952 13.9543C30.7704 13.5403 31.2472 13.7473 31.5044 13.5905C31.862 13.4148 31.9749 13.0133 32 12.8753C31.1657 8.1327 28.5497 4.65731 25.6201 4.41892ZM24.585 17.1474C23.644 17.7057 22.7783 18.446 22.3015 19.456L21.5613 20.9427C21.2539 21.5575 20.6328 21.959 19.9428 21.9841L17.8161 22.0657C17.0445 22.1096 16.298 21.6265 16.0031 20.9114C15.7083 21.6265 14.9555 22.1096 14.1902 22.0657L12.0635 21.9841C11.3735 21.959 10.7524 21.5575 10.445 20.9365L9.70476 19.456C9.30955 18.6655 8.71359 17.9943 7.97334 17.5113L7.42129 17.1474C7.26446 17.0408 7.21427 16.8275 7.32092 16.6706C7.42756 16.5075 7.64085 16.4636 7.79769 16.5703L8.34974 16.9278C9.19035 17.4799 9.87414 18.2452 10.3195 19.1423L11.0598 20.6228C11.2543 21.0117 11.6495 21.269 12.0886 21.2815L14.2153 21.3631C15.3884 21.3505 15.4825 20.3405 15.5703 19.4183C15.6079 19.1298 15.5766 18.4711 15.9969 18.4648C16.4172 18.4648 16.3858 19.1109 16.4234 19.3932C16.5113 20.3217 16.5991 21.3505 17.7785 21.3568L19.9051 21.2752C20.3442 21.2564 20.7332 21.0055 20.9277 20.6165L21.6679 19.136C22.1196 18.2327 22.8034 17.4673 23.6377 16.9216L24.1898 16.564C24.5724 16.3193 24.9677 16.8965 24.585 17.1474ZM12.0447 8.89177C11.0159 7.11643 11.6118 4.90824 13.3119 4.13035C14.2278 3.21445 15.4385 2.64986 16.6556 2.66868C20.0619 2.60594 21.5299 6.73376 19.6103 9.29953C19.3217 8.80394 19.1586 8.25817 19.0206 7.69357C18.9077 7.30463 18.3933 7.45519 18.0859 7.37991C16.7371 7.22935 15.4197 6.92196 14.1525 6.44519C13.7573 6.31972 13.682 6.72121 13.6005 7.00979C13.3558 7.8755 12.9167 8.66593 12.3458 9.34972C12.2266 9.20543 12.1388 9.0486 12.0447 8.89177ZM19.052 9.71984C19.1084 9.81394 19.1586 9.91431 19.2213 10.0084C19.1711 11.6395 17.8412 13.3646 16.2478 13.9731C15.6016 14.1864 14.9743 13.6344 14.4725 13.3082C13.5315 12.5742 12.9292 11.5328 12.6658 10.3409V10.0398C13.3872 9.22425 13.9392 8.26444 14.2654 7.22308C15.6142 7.69357 16.988 7.98214 18.4058 8.10761C18.5438 8.67848 18.7571 9.21171 19.052 9.71984Z"
                fill="url(#paint0_linear_9020_43342)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9020_43342"
                  x1="-1.23077"
                  y1="19.9386"
                  x2="33.077"
                  y2="19.9452"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[84px] absolute left-[108px] top-[100px]">
            {lbm}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Kg
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            Lean Body Mass (LBM) is the weight of everything in your body except
            fat—like muscles, bones, organs, and water.
          </p>
        </div>
      </section>
    </>
  );
};

export default LeanBodyMass;
