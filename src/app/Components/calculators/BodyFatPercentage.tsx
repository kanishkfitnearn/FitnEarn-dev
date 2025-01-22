"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SvgGauge from "../GaugeMeter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConversionFactors = {
  cm_to_inch: 0.393701,
  inch_to_cm: 2.54,
};

const ConversionFactorsForWeight = {
  lb_to_kg: 0.453592,
  kg_to_lb: 2.20462,
};

const BodyFatPercentage = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [neckUnit, setNeckUnit] = useState("cm");
  const [waistUnit, setWaistUnit] = useState("cm");
  const [hipUnit, setHipUnit] = useState("cm");

  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [neckFlag, setNeckFlag] = useState<string>("Cm");
  const [waistFlag, setWaistFlag] = useState<string>("Cm");
  const [hipFlag, setHipFlag] = useState<string>("Cm");

  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [neckValue, setNeckValue] = useState<number>();
  const [waistValue, setWaistValue] = useState<number>();
  const [hipValue, setHipValue] = useState<number>();
  const [bodyFat, setBodyFat] = useState<number>(0);

  const [weightErr, setWeightErr] = useState<string>("");
  const [heightErr, setHeightErr] = useState<string>("");
  const [neckErr, setNeckErr] = useState<string>("");
  const [waistErr, setWaistErr] = useState<string>("");
  const [hipErr, setHipErr] = useState<string>("");
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

  const handleToggleUnitNeck = (selectedUnit: string) => {
    if (selectedUnit !== neckUnit) {
      if (selectedUnit === "cm" && neckUnit === "i") {
        setNeckValue(Math.round(neckValue! * ConversionFactors.inch_to_cm));
        setNeckFlag("Cm");
      } else if (selectedUnit === "i" && neckUnit === "cm") {
        setNeckValue(Math.round(neckValue! * ConversionFactors.cm_to_inch));
        setNeckFlag("I");
      }
      setNeckUnit(selectedUnit);
    }
  };

  const handleToggleUnitWaist = (selectedUnit: string) => {
    if (selectedUnit !== waistUnit) {
      if (selectedUnit === "cm" && waistUnit === "i") {
        setWaistValue(Math.round(waistValue! * ConversionFactors.inch_to_cm));
        setWaistFlag("Cm");
      } else if (selectedUnit === "i" && waistUnit === "cm") {
        setWaistValue(Math.round(waistValue! * ConversionFactors.cm_to_inch));
        setWaistFlag("I");
      }
      setWaistUnit(selectedUnit);
    }
  };

  const handleToggleUnitHip = (selectedUnit: string) => {
    if (selectedUnit !== hipUnit) {
      if (selectedUnit === "cm" && hipUnit === "i") {
        setHipValue(Math.round(hipValue! * ConversionFactors.inch_to_cm));
        setHipFlag("Cm");
      } else if (selectedUnit === "i" && hipUnit === "cm") {
        setHipValue(Math.round(hipValue! * ConversionFactors.cm_to_inch));
        setHipFlag("I");
      }
      setHipUnit(selectedUnit);
    }
  };

  const calculateBodyFat = (e: any) => {
    e.preventDefault();
    // formula for BMI = weight (kg) / (height (m) * height (m))
    let weight;
    let height;
    let neckSize, waistSize, hipSize, bodyFatPercentage;
    // console.log(
    //   "height weight before",
    //   heightValue,
    //   weightValue,
    //   neckValue,
    //   waistValue,
    //   hipValue,
    // );
    if (heightFlag === "Cm") {
      height = Math.round(heightValue! / 2.54);
    }
    if (heightFlag === "I") {
      height = heightValue;
    }
    if (weightFlag === "Lb") {
      weight = Math.round(weightValue! * 0.453592);
    }
    if (weightFlag === "Kg") {
      weight = weightValue;
    }
    neckFlag === "Cm"
      ? (neckSize = Math.round(neckValue! / 2.54))
      : (neckSize = neckValue);
    waistFlag === "Cm"
      ? (waistSize = Math.round(waistValue! / 2.54))
      : (waistSize = waistValue);
    hipFlag === "Cm"
      ? (hipSize = Math.round(hipValue! / 2.54))
      : (hipSize = hipValue);

    //console.log("neckSize waistSize hipSize", neckSize, waistSize, hipSize);

    if (height! > 86.6 || height! < 47.2) {
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
    if (age! < 15 || age! > 70) {
      setAgeErr("age range is 15 to 70 year.");
      return;
    } else setAgeErr("");

    if (neckSize! < 12 || neckSize! > 20) {
      setNeckErr("valid Neck size is 12 inch to 20 inch.");
      return;
    } else setNeckErr("");

    if (waistSize! < 20 || waistSize! > 60) {
      setWaistErr("valid Waist size is 20 inch to 60 inch.");
      return;
    } else setWaistErr("");

    if (hipSize! < 30 || hipSize! > 70) {
      setHipErr("valid Waist size is 30 inch to 70 inch.");
      return;
    } else setHipErr("");

    // console.log(
    //   "height weight age gender necksize waistsize hipsize",
    //   height,
    //   weight,
    //   age,
    //   gender,
    //   neckSize,
    //   waistSize,
    //   hipSize,
    // );
    if (gender === "Male") {
      bodyFatPercentage =
        86.01 * Math.log10(waistSize! - neckSize!) -
        70.041 * Math.log10(height!) +
        36.76;
    } else {
      bodyFatPercentage =
        163.205 * Math.log10(waistSize! + hipSize! - neckSize!) -
        97.684 * Math.log10(height!) -
        78.387;
    }
    //console.log(bodyFatPercentage);
    setBodyFat(parseFloat(bodyFatPercentage.toFixed(2)));
  };
  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-2 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] font-bold md:text-[24px] text-start  mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateBodyFat}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-[12px] md:gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Height"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${heightErr ? "border-[#F05252] dark:border-[#F05252] " : "border-[#737373] dark:border-[#737373] "}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
                  className={`block w-[144px] md:w-[232px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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

            <div className="flex gap-3 md:gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Age"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${ageErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
                  <span className="absolute bottom-[-20px] mb-1 md:mb-0 text-[12px] text-center text-red-600">
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

            <div className="flex gap-[12px] md:gap-4 mt-1 md:mt-0">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Neck"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${neckErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} dark:text-[#FFF]  appearance-none  dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={neckValue}
                  onChange={(e) => setNeckValue(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Neck"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${neckErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Neck Size
                </label>
                <div className="flex absolute top-[6px] md:top-[10px] right-[5px] md:right-[10px] z-50">
                  <span
                    onClick={() => handleToggleUnitNeck("cm")}
                    className={`${neckUnit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                  >
                    cm
                  </span>
                  <span
                    onClick={() => handleToggleUnitNeck("i")}
                    className={`${neckUnit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                  >
                    in
                  </span>
                </div>
                {neckErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {neckErr}
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
                  placeholder="Neck Size"
                  value={neckValue}
                  onChange={(e) => setNeckValue(parseInt(e.target.value))}
                />
                <div className="flex absolute top-[10px] right-[5px] md:right-[20px]">
                  <span
                    onClick={() => handleToggleUnitNeck("cm")}
                    className={`${neckUnit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                  >
                    cm
                  </span>
                  <span
                    onClick={() => handleToggleUnitNeck("i")}
                    className={`${neckUnit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                  >
                    in
                  </span>
                </div>
                {neckErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {neckErr}
                  </span>
                ) : (
                  ""
                )}
              </div> */}

              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Waist"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${waistErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={waistValue}
                  onChange={(e) => setWaistValue(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Waist"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${waistErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"}  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Waist Size
                </label>
                <div className="flex absolute top-[6px] md:top-[10px] right-[5px] md:right-[10px] z-50">
                  <span
                    onClick={() => handleToggleUnitWaist("cm")}
                    className={`${waistUnit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                  >
                    cm
                  </span>
                  <span
                    onClick={() => handleToggleUnitWaist("i")}
                    className={`${waistUnit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                  >
                    in
                  </span>
                </div>
                {waistErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {waistErr}
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
                  placeholder="Waist Size"
                  value={waistValue}
                  onChange={(e) => setWaistValue(parseInt(e.target.value))}
                />
                <div className="flex absolute top-[10px] right-[5px] md:right-[20px]">
                  <span
                    onClick={() => handleToggleUnitWaist("cm")}
                    className={`${waistUnit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                  >
                    cm
                  </span>
                  <span
                    onClick={() => handleToggleUnitWaist("i")}
                    className={`${waistUnit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                  >
                    in
                  </span>
                </div>
                {waistErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {waistErr}
                  </span>
                ) : (
                  ""
                )}
              </div> */}
            </div>

            {gender === "Female" ? (
              <div className="relative w-[298px] md:w-[480px]">
                <input
                  type="number"
                  required
                  id="Hip"
                  className={`w-[298px] md:w-[480px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${hipErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={hipValue}
                  onChange={(e) => setHipValue(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Hip"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${hipErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"}  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Hip Size
                </label>
                <div className="flex absolute  top-[6px] md:top-[10px] right-[5px] md:right-[10px]">
                  <span
                    onClick={() => handleToggleUnitHip("cm")}
                    className={`${hipUnit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
                  >
                    cm
                  </span>
                  <span
                    onClick={() => handleToggleUnitHip("i")}
                    className={`${hipUnit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
                  >
                    in
                  </span>
                </div>
                {hipErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {hipErr}
                  </span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              // <div className="relative">
              //   <Input
              //     type="number"
              //     required
              //     className="calculator-input w-[298px] md:w-[480px]"
              //     placeholder="Hip Size"
              //     value={hipValue}
              //     onChange={(e) => setHipValue(parseInt(e.target.value))}
              //   />
              //   <div className="flex absolute top-[10px] right-[5px] md:right-[20px]">
              //     <span
              //       onClick={() => handleToggleUnitHip("cm")}
              //       className={`${hipUnit === "cm" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-l-md h-[28px] w-[28px]`}
              //     >
              //       cm
              //     </span>
              //     <span
              //       onClick={() => handleToggleUnitHip("i")}
              //       className={`${hipUnit === "i" ? "gradient-background" : "inactive-toggle-btn"} text-white flex justify-center hover:cursor-pointer rounded-r-md h-[28px] w-[28px]`}
              //     >
              //       i
              //     </span>
              //   </div>
              //   {hipErr ? (
              //     <span className="text-[12px] text-center text-red-600">
              //       {hipErr}
              //     </span>
              //   ) : (
              //     ""
              //   )}
              // </div>
              ""
            )}

            <Button className="primaryButton w-[298px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="flex1 relative h-auto md:h-[347px] flex flex-col justify-center items-center">
          <SvgGauge percentageValue={bodyFat} range={80} />
          <span className="absolute left-[144px] top-[60px] md:top-[100px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="32"
              viewBox="0 0 16 32"
              fill="none"
            >
              <path
                d="M7.60877 6.5782C6.84726 6.5782 6.14285 6.32814 5.57319 5.90625H4.34612C4.32765 5.90625 4.3096 5.90807 4.29127 5.90905C4.03841 5.91255 3.62044 5.96754 3.14523 6.20752C2.39268 6.58058 1.58121 7.39694 1.01337 8.84384C0.438672 10.2963 0.0528802 12.396 0.0507812 15.5667C0.051201 16.3862 0.0770884 17.2772 0.13432 18.2477C0.169163 18.8427 0.662563 19.3015 1.25098 19.3015C1.27294 19.3015 1.29519 19.3008 1.31758 19.2995C1.93468 19.2633 2.40569 18.7335 2.36959 18.1166C2.31474 17.1861 2.28997 16.3384 2.28997 15.5669C2.28521 12.178 2.77917 10.2742 3.26473 9.28098V30.2714C3.26473 31.2272 4.03953 32.0014 4.99471 32.0014C5.95016 32.0014 6.72496 31.2272 6.72496 30.2714V17.6397H7.37355V30.2714C7.37355 31.2272 8.14835 32.0014 9.10352 32.0014C10.059 32.0014 10.8338 31.2272 10.8338 30.2714V16.6732C10.4523 16.7037 10.0269 16.7083 9.57607 16.7083C8.10763 16.7083 6.8954 16.2598 6.68508 15.6757C7.31184 15.9633 8.295 16.1487 9.40088 16.1487C10.5889 16.1487 11.7625 16.1123 12.3925 15.8084C12.4087 15.8323 12.4263 15.8553 12.4445 15.8781C12.4992 15.9465 12.5617 16.0102 12.634 16.0661C12.8379 16.2238 13.0791 16.3002 13.3185 16.3002C13.6531 16.3004 13.9841 16.1511 14.2047 15.8659C15.3886 14.3373 15.9476 12.9193 15.9494 11.5991C15.9537 10.453 15.5061 9.46135 14.8989 8.72335C13.9829 7.60922 12.757 6.957 11.7661 6.53412C11.0644 6.23929 10.4726 6.06857 10.169 5.98965C10.0408 5.93606 9.90015 5.90625 9.75239 5.90625H9.6445C9.0747 6.32814 8.37042 6.5782 7.60877 6.5782ZM11.8312 9.05807C12.3673 9.3662 12.8636 9.75283 13.1941 10.1767C13.5256 10.6067 13.7059 11.0371 13.7101 11.5992C13.7119 12.2424 13.4407 13.1563 12.52 14.3808C12.1757 13.9783 11.5963 13.6656 10.8338 13.4918V8.57139C11.1537 8.70292 11.4985 8.86441 11.8312 9.05807Z"
                fill="url(#paint0_linear_9140_31272)"
              />
              <path
                d="M7.60842 6.29693C9.34727 6.29693 10.7569 4.88731 10.7569 3.14846C10.7569 1.40961 9.34727 0 7.60842 0C5.86958 0 4.45996 1.40961 4.45996 3.14846C4.45996 4.88731 5.86958 6.29693 7.60842 6.29693Z"
                fill="url(#paint1_linear_9140_31272)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_31272"
                  x1="-0.560705"
                  y1="22.5627"
                  x2="16.4845"
                  y2="22.5644"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9140_31272"
                  x1="4.21777"
                  y1="4.01932"
                  x2="10.9688"
                  y2="4.02041"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[84px] absolute left-[108px] top-[100px] md:bottom-[145px] mb-2">
            {bodyFat}
          </span>
          <div className="text-[#F5F5F5] md:mt-4 w-full text-center text-[20px] font-bold leading-normal">
            Your Body Fat Percentage
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            As per WHO, the healthy body fat percentage for adult men is 12-20%
            and adult women is 20-30%.
          </p>
        </div>
      </section>
    </>
  );
};

export default BodyFatPercentage;
