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

const DailyWaterIntake = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [exerciseTime, setExerciseTime] = useState<number | undefined>();
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [dwi, setDwi] = useState<number>(0);
  const [weightErr, setWeightErr] = useState<string>("");
  const [heightErr, setHeightErr] = useState<string>("");
  const [ageErr, setAgeErr] = useState<string>("");
  const [timeErr, setTimeErr] = useState<string>("");

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

  const calculateWaterIntake = (e: any) => {
    e.preventDefault();
    // formula for BMI = weight (kg) / (height (m) * height (m))
    let weight;
    let height;
    // console.log(
    //   "height weight before",
    //   heightValue,
    //   weightValue,
    //   age,
    //   gender,
    //   exerciseTime,
    // );
    if (heightFlag === "Cm") {
      height = heightValue! / 100;
    }
    if (heightFlag === "I") {
      height = heightValue! * 0.0254;
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
    if (exerciseTime! > 480 || exerciseTime! <= 0) {
      setTimeErr("valid time is between 1 min and 480 min.");
      return;
    } else {
      setTimeErr("");
    }
    //console.log("height weight after", height, weight);
    const baseWaterIntake = weight! / 30;
    const exerciseWaterIntake = (exerciseTime! / 60) * 0.5; // Adjusted factor for exercise
    const totalWaterIntake = baseWaterIntake + exerciseWaterIntake;
    setDwi(parseFloat(totalWaterIntake.toFixed(1)));
    //console.log("daily water intake", totalWaterIntake);
  };
  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateWaterIntake}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-3 md:gap-4">
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
                  <span className=" absolute bottom-[-20px] mb-1 md:mb-1 text-[12px] text-center text-red-600">
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

            <div className="relative w-[298px] md:w-[480px]">
              <input
                type="number"
                required
                id="ExerciseDuration"
                className="w-[298px] md:w-[480px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[14px] md:text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 border-[#737373] appearance-none dark:text-[#FFF] dark:border-[#737373] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer"
                placeholder=" "
                value={exerciseTime}
                onChange={(e) => setExerciseTime(parseInt(e.target.value))}
              />
              <label
                htmlFor="ExerciseDuration"
                className="absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] text-[#A3A3A3] dark:text-[#A3A3A3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Exercise Duration
              </label>
              <span className="mins absolute top-[6px] md:top-[10px] right-2">
                mins
              </span>
            </div>
            {/* <div className="relative">
              <Input
                type="number"
                required
                className="calculator-input w-[298px] md:w-[480px]"
                placeholder="Exercise Duration"
                value={exerciseTime}
                onChange={(e) => setExerciseTime(parseInt(e.target.value))}
              />
              <span className="mins absolute top-[10px] right-2">mins</span>
              {timeErr ? (
                <span className="absolute bottom-[-20px] text-[12px] text-center text-red-600">
                  {timeErr}
                </span>
              ) : (
                ""
              )}
            </div> */}

            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="relative flex flex-col items-center justify-center flex1">
          <SvgGauge percentageValue={dwi} range={10} />
          <span className="absolute left-[144px] top-[60px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="32"
              viewBox="0 0 16 32"
              fill="none"
            >
              <path
                d="M10.9972 4.5741L8.49815 7.21673L6.42568 6.69393L7.95119 6.69091L8.00667 6.63223C7.74023 6.39806 7.40185 6.25956 7.03811 6.25956C6.09233 6.25956 5.42712 6.25956 4.37737 6.25956C3.64141 6.25956 3.01137 6.82124 2.86846 7.60217L0.516545 20.456C0.436414 20.8938 0.747629 21.3016 1.1581 21.3016H2.41082V30.4578C2.41082 31.3098 3.10143 32.0004 3.95338 32.0004C4.80532 32.0004 5.49593 31.3098 5.49593 30.4578V21.3017H6.03333L6.81294 24.2447L7.08038 30.5235C7.11667 31.3747 7.83603 32.0353 8.68722 31.999C9.53841 31.9627 10.199 31.2434 10.1627 30.3922L9.88811 23.946C9.88333 23.8348 9.8666 23.7243 9.83805 23.6167L9.2248 21.3017H10.2573C10.6687 21.3017 10.979 20.8946 10.8988 20.4561L9.13706 10.827C8.85817 10.839 8.57589 10.7666 8.33254 10.6071L6.39008 9.3365L8.59998 9.89396C9.05768 10.0094 9.53325 9.86395 9.84836 9.53072L12.8651 6.34057C13.3529 5.82475 13.3302 5.01111 12.8143 4.52335C12.2986 4.03558 11.485 4.05828 10.9972 4.5741Z"
                fill="url(#paint0_linear_9140_1168)"
              />
              <path
                d="M14.8529 3.99178L10.4953 2.37903C9.98467 2.19002 9.41753 2.45079 9.22852 2.96146L9.22368 2.97448L8.34689 2.64345C8.34689 2.64206 8.34701 2.64074 8.34701 2.63936C8.34695 1.18165 7.1653 0 5.70766 0C4.25001 0 3.06836 1.18165 3.06836 2.6393C3.06836 4.09694 4.25001 5.27859 5.70766 5.27859C6.68105 5.27859 7.53073 4.75126 7.98831 3.96712L8.74987 4.25462L8.7466 4.26349C8.58288 4.70585 8.75704 5.19028 9.13851 5.43483L10.4458 4.05235C11.2215 3.23204 12.5153 3.19594 13.3356 3.97159C14.1559 4.7473 14.192 6.04109 13.4163 6.86134L13.289 6.99594L13.6865 7.14306C14.1972 7.33206 14.7643 7.07129 14.9533 6.56063L15.4352 5.25853C15.6242 4.74793 15.3635 4.18078 14.8529 3.99178Z"
                fill="url(#paint1_linear_9140_1168)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_1168"
                  x1="0.0149564"
                  y1="21.9348"
                  x2="13.6445"
                  y2="21.9358"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9140_1168"
                  x1="2.59034"
                  y1="4.5987"
                  x2="15.9151"
                  y2="4.60242"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[84px] absolute left-[108px] top-[100px]">
            {dwi}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Your Water Intake in Ltr
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            As per National Institute Health, drinking at least 2-3 litres of
            water daily keeps you hydrated, improves focus, and supports
            digestion.
          </p>
        </div>
      </section>
    </>
  );
};

export default DailyWaterIntake;
