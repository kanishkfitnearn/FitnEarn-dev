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

const HealthyBloodVolume = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string | undefined>();
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [bloodVolume, setBloodVolume] = useState<number>(0);
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

  const calculateBloodVolume = (e: any) => {
    e.preventDefault();
    let weight;
    let height;
    let bv;

    //console.log("height weight before", heightValue, weightValue, age, gender);
    if (heightFlag === "Cm") {
      height = heightValue! / 100;
    }
    if (heightFlag === "I") {
      height = heightValue! * 0.0254;
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

    if (height! > 2.2 || height! < 1.2) {
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
    //console.log("height weight after", height, weight, age, gender);

    if (gender && gender === "Male") {
      bv = 0.3669 * height! * height! * height! + 0.03219 * weight! + 0.6041;
    } else {
      bv = 0.3561 * height! * height! * height! + 0.03308 * weight! + 0.1833;
    }
    const roundedBv = parseFloat(bv.toFixed(1));
    setBloodVolume(roundedBv);
    //console.log("blood volume", bv);
  };

  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateBloodVolume}
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
                <SelectTrigger className="calculator-input w-[144px] md:w-[232px] h-[40px] md:h-[48px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Male">Male </SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-4 mt-1 md:flex-nowrap md:mt-1">
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
                  className={`block w-[298px] md:w-[232px] h-[40px] md:h-[48px] px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={weightValue}
                  onChange={handleWeightChange}
                />
                <label
                  htmlFor="Weight"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${weightErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
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
            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="relative flex flex-col items-center justify-center flex1">
          <SvgGauge percentageValue={bloodVolume} range={12} />
          <span className="absolute left-[134px] top-[62px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M7.43815 22.7005C6.77654 22.7005 6.24023 22.1642 6.24023 21.5026V20.3047H8.63607V21.5026C8.63607 22.1642 8.09971 22.7005 7.43815 22.7005Z"
                fill="url(#paint0_linear_9140_38278)"
              />
              <path
                d="M25.9272 2.11944C24.7471 0.939352 22.8338 0.939352 21.6537 2.11944C20.4736 0.939352 18.5603 0.939352 17.3802 2.11944C16.2001 3.29953 16.2001 5.21284 17.3802 6.39293L21.1226 10.1354C21.4159 10.4287 21.8914 10.4287 22.1847 10.1354L25.9272 6.39293C27.1073 5.21284 27.1073 3.29953 25.9272 2.11944Z"
                fill="url(#paint1_linear_9140_38278)"
              />
              <path
                d="M11.8124 18.0323V9.6079C11.8124 9.26744 11.4508 9.05207 11.1493 9.21025C9.73961 9.94972 7.98249 9.92503 6.55517 8.99254C5.60211 8.36989 4.50201 8.1526 3.45635 8.29661C3.23146 8.3276 3.0625 8.51718 3.0625 8.74416V18.0323C3.0625 18.2506 3.23942 18.4275 3.4577 18.4275H11.4172C11.6355 18.4275 11.8124 18.2506 11.8124 18.0323Z"
                fill="url(#paint2_linear_9140_38278)"
              />
              <path
                d="M26.2958 1.75134C25.6266 1.08223 24.737 0.713697 23.7907 0.713697C23.0088 0.713697 22.2657 0.965257 21.6536 1.4301C20.2663 0.380003 18.2764 0.48719 17.0121 1.75134C15.6308 3.13263 15.6308 5.38015 17.0121 6.76139L20.7546 10.5038C20.867 10.6163 20.9959 10.7019 21.1331 10.7633V24.7576C21.1331 25.6042 20.4443 26.2929 19.5977 26.2929C18.7511 26.2929 18.0623 25.6041 18.0623 24.7576V24.6087C18.0623 22.8486 16.6303 21.4168 14.8703 21.4168C13.1103 21.4168 11.6784 22.8486 11.6784 24.6087V24.7576C11.6784 25.6042 10.9896 26.2929 10.143 26.2929H9.49387C8.64726 26.2929 7.95847 25.6041 7.95847 24.7576V23.1389C8.65232 22.9177 9.15637 22.2672 9.15637 21.501V20.8239H11.4174C12.9563 20.8239 14.2084 19.5719 14.2084 18.0329V5.90687C14.2084 4.36787 12.9563 3.11586 11.4174 3.11586H10.3161C10.0912 1.72973 8.88627 0.667969 7.43764 0.667969C5.98901 0.667969 4.78424 1.72973 4.55929 3.11586H3.458C1.91901 3.11586 0.666992 4.36787 0.666992 5.90687V18.033C0.666992 19.572 1.91906 20.824 3.458 20.824H5.71902V21.5011C5.71902 22.2673 6.22307 22.9178 6.91692 23.1389V24.7576C6.91692 26.1786 8.073 27.3346 9.49397 27.3346H10.1431C11.5641 27.3346 12.7202 26.1786 12.7202 24.7576V24.6087C12.7202 23.4231 13.6848 22.4585 14.8704 22.4585C16.0561 22.4585 17.0207 23.4231 17.0207 24.6087V24.7576C17.0207 26.1786 18.1768 27.3346 19.5978 27.3346C21.0187 27.3346 22.1748 26.1786 22.1748 24.7576V10.7633C22.3119 10.7019 22.4409 10.6163 22.5533 10.5039L26.2958 6.76144C27.677 5.38015 27.677 3.13258 26.2958 1.75134ZM7.43775 1.70962C8.30982 1.70962 9.04471 2.30805 9.2534 3.11586H5.62209C5.83079 2.30805 6.56567 1.70962 7.43775 1.70962ZM1.70865 18.033V5.90687C1.70865 4.94224 2.49338 4.15751 3.458 4.15751H11.4175C12.3821 4.15751 13.1668 4.94224 13.1668 5.90687V18.033C13.1668 18.9976 12.3821 19.7823 11.4175 19.7823H3.458C2.49338 19.7823 1.70865 18.9976 1.70865 18.033ZM6.76067 20.824H8.11482V21.5011C8.11482 21.8744 7.81108 22.1781 7.43775 22.1781C7.06442 22.1781 6.76067 21.8744 6.76067 21.5011V20.824ZM25.5591 6.02483L21.8167 9.76729C21.727 9.85703 21.5809 9.85703 21.4912 9.76729L17.7487 6.02483C16.7736 5.04969 16.7736 3.46304 17.7487 2.48795C18.2363 2.0004 18.8767 1.7566 19.5172 1.7566C20.1576 1.7566 20.7981 2.0004 21.2857 2.48795C21.3833 2.5856 21.5158 2.6405 21.6539 2.6405C21.7921 2.6405 21.9246 2.5856 22.0222 2.48795C22.4945 2.01556 23.1226 1.7554 23.7907 1.7554C24.4587 1.7554 25.0868 2.01556 25.5591 2.48795C26.5343 3.46304 26.5343 5.04969 25.5591 6.02483Z"
                fill="url(#paint3_linear_9140_38278)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_38278"
                  x1="6.14809"
                  y1="21.8339"
                  x2="8.7167"
                  y2="21.8344"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9140_38278"
                  x1="16.0983"
                  y1="7.05628"
                  x2="27.1595"
                  y2="7.0583"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_9140_38278"
                  x1="2.72597"
                  y1="14.7477"
                  x2="12.1069"
                  y2="14.749"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_9140_38278"
                  x1="-0.358573"
                  y1="17.6893"
                  x2="28.2291"
                  y2="17.6939"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[84px] absolute left-[108px] top-[98px] ">
            {bloodVolume}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Your Blood Volume in liters
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            As per NIH (USA), the adult human has a blood volume of around 5
            liters, which is about 7–8% of their total body weight.
          </p>
        </div>
      </section>
    </>
  );
};

export default HealthyBloodVolume;
