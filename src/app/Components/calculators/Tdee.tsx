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

const TDEE = () => {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("Lb");
  const [heightValue, setHeightValue] = useState<number | undefined>();
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [heightFlag, setHeightFlag] = useState<string>("Cm");
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [intensity, setIntensity] = useState<number>();
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState<string>("");
  const [tdee, setTdee] = useState<number>(0);
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

    let weight;
    let height;
    // console.log(
    //   "height weight before",
    //   heightValue,
    //   weightValue,
    //   age,
    //   intensity,
    //   gender,
    // );

    // Convert height to cm if it's in meters
    if (heightFlag === "Cm") {
      height = heightValue!;
    } else if (heightFlag === "I") {
      height = heightValue! * 2.54; // Convert inches to cm
    } else {
      height = heightValue! * 100; // Convert meters to cm
    }

    // Convert weight to kg if it's in pounds
    if (weightFlag === "Lb") {
      weight = Math.round(weightValue! * 0.453592);
    } else if (weightFlag === "Kg") {
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

    let bmr: number;
    if (gender === "Male") {
      bmr = 10 * weight! + 6.25 * height! - 5 * age! + 5;
    } else {
      bmr = 10 * weight! + 6.25 * height! - 5 * age! - 161;
    }

    //console.log("BMR", bmr);

    const TDEE = Math.round(bmr * intensity!);

    setTdee(TDEE);
    //console.log("TDEE", TDEE);
  };

  useEffect(() => {
    //console.log("intensity", intensity);
  }, [intensity]);

  return (
    <>
      <section className="flex flex-wrap md:flex-nowrap justify-center items-center mx-3 md:mx-[72px] gap-2 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full font-bold text-[18px] md:text-[24px] text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateBMR}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="flex gap-[12px] relative md:gap-4">
              <div className="relative w-[144px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Age"
                  className={`w-[144px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${ageErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:border-[#737373] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={age ?? ""}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Age"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${ageErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Age
                </label>
              </div>
              {/* <Input
                type="number"
                required
                className="calculator-input w-[144px] md:w-[232px]"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              /> */}

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

              <Select required onValueChange={(value) => setGender(value)}>
                <SelectTrigger className="calculator-input relative w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Male">Male </SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>

              {/* <Select required onValueChange={setGender}>
                <SelectTrigger className="calculator-input w-[144px] md:w-[232px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="Male">Male </SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select> */}

              {ageErr ? (
                <span className=" absolute bottom-[-20px] mb-1 md:mb-0 text-red-600 text-[12px] text-center">
                  {ageErr}
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4 mt-1 md:mt-0">
              <div className="relative w-[300px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Height"
                  className={`w-[300px] md:w-[232px] block h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${heightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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
                  className={`block w-[300px] md:w-[232px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${weightErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"}  appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
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

            <Select
              required
              onValueChange={(value) => setIntensity(Number(value))}
            >
              <SelectTrigger className="calculator-input w-[298px] md:w-[480px]">
                <SelectValue placeholder="Select Today’s Activity Level" />
              </SelectTrigger>
              <SelectContent className="select-content">
                <SelectItem value="1.2">Sedentary </SelectItem>
                <SelectItem value="1.375">Low</SelectItem>
                <SelectItem value="1.55">Moderate</SelectItem>
                <SelectItem value="1.725">High</SelectItem>
                <SelectItem value="1.9">Vigorous</SelectItem>
              </SelectContent>
            </Select>

            {/* <form className="max-w-sm mx-auto bg-[#262626]">
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select an option
              </label>
              <select
                id="countries"
                className="bg-[#262626] w-[298px] md:w-[480px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-[#A3A3A3]"
                style={{color: intensity ? "#FFFFFF" : "#A3A3A3"}} // Sets the placeholder color
                onChange={(e) => setIntensity(Number(e.target.value))}
              >
                <option value="" disabled selected hidden>
                  Choose a country
                </option>
                <option value="1.2" className="optionPicker">
                  United States
                </option>
                <option value="1.375" className="optionPicker">
                  Canada
                </option>
                <option value="FR" className="optionPicker">
                  France
                </option>
                <option value="DE" className="optionPicker">
                  Germany
                </option>
              </select>
            </form> */}

            <Button className="primaryButton w-[295px] md:w-[480px] text-[16px] md:text-[18px] text-[#E5E5E5] font-semibold">
              Calculate
            </Button>
          </form>
        </div>
        <div className="flex1 relative flex flex-col justify-center items-center">
          <SvgGauge percentageValue={tdee} range={5000} />
          <span className="absolute left-[134px] top-[60px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="28"
              viewBox="0 0 26 28"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.499 0.0078125C11.4745 0.0748991 10.5115 0.34772 9.64551 0.78418L10.0859 1.544C10.2262 1.78432 10.1432 2.0929 9.90137 2.23051C9.66168 2.36865 9.35533 2.28604 9.21777 2.04585L8.78223 1.29399C7.96829 1.85304 7.27037 2.56889 6.72852 3.39944L7.4502 3.8145C7.68825 3.9534 7.76906 4.25865 7.63086 4.4971C7.49333 4.73657 7.18771 4.81918 6.94824 4.6817L6.23828 4.27051C5.82333 5.13455 5.5633 6.08866 5.49414 7.09575H10.8057C11.094 6.14123 11.3634 5.14914 11.6357 4.34571C11.7887 3.89457 11.9381 3.5045 12.1152 3.19044C12.2038 3.03341 12.2984 2.8941 12.4297 2.76956C12.561 2.64503 12.7556 2.5225 12.998 2.5225C13.2405 2.5225 13.438 2.64495 13.5693 2.76956C13.7006 2.8941 13.7952 3.03341 13.8838 3.19044C14.061 3.5045 14.2104 3.89457 14.3633 4.34571C14.6356 5.14914 14.905 6.14123 15.1934 7.09575H20.5049C20.4357 6.08864 20.175 5.13456 19.7598 4.27051L19.0508 4.68164C18.8113 4.81922 18.5057 4.73666 18.3682 4.49704C18.23 4.25859 18.3108 3.95331 18.5488 3.81445L19.2705 3.39939C18.7285 2.56921 18.0296 1.85385 17.2158 1.29491L16.7813 2.04585C16.6437 2.28591 16.3373 2.36867 16.0977 2.23051C15.8558 2.09294 15.7729 1.78432 15.9131 1.544L16.3525 0.78418C15.4869 0.347909 14.5238 0.0762764 13.5 0.00879291V0.898484C13.5011 1.17617 13.2757 1.40149 12.998 1.40039C12.7215 1.39987 12.4979 1.17501 12.499 0.898484L12.499 0.0078125ZM2.99903 2.93554C1.6245 2.93554 0.5 4.06008 0.5 5.4346V25.4912C0.5 26.8658 1.6245 27.9942 2.99903 27.9942H23C24.3745 27.9942 25.499 26.8658 25.499 25.4912V5.4346C25.499 4.06008 24.3745 2.93554 23 2.93554H20.2275C21.0983 4.27978 21.6045 5.88081 21.6045 7.59766C21.6034 7.8738 21.3787 8.09675 21.1025 8.09571H4.89649C4.62035 8.09675 4.39564 7.8738 4.39454 7.59766C4.39454 5.88081 4.89939 4.27978 5.76953 2.93554H2.99903ZM13.001 3.66214C13.001 3.66214 12.3387 5.66223 11.8652 7.09575H14.1309C13.6599 5.66352 13.001 3.66214 13.001 3.66214ZM5.59375 9.76079H20.498C21.8724 9.76079 22.9961 10.8845 22.9961 12.2588V22.9922C22.9961 24.3669 21.8722 25.4912 20.498 25.4912H5.59375C4.21921 25.4912 3.09473 24.3667 3.09473 22.9922V12.2588C3.09473 10.8847 4.21907 9.76079 5.59375 9.76079ZM5.59375 10.7607C4.76044 10.7607 4.09473 11.426 4.09473 12.2588V22.9922C4.09473 23.8257 4.76029 24.4912 5.59375 24.4912H20.498C21.3309 24.4912 21.9961 23.8255 21.9961 22.9922V12.2588C21.9961 11.4261 21.3307 10.7607 20.498 10.7607H5.59375ZM8.27344 13.2042C8.27343 14.009 7.60952 14.669 6.80469 14.669C5.99986 14.669 5.33497 14.009 5.33496 13.2042C5.33495 12.4119 5.99784 11.7557 6.80469 11.7354C7.62857 11.7354 8.27345 12.3993 8.27344 13.2042ZM20.6641 13.2042C20.6641 14.009 19.9992 14.669 19.1943 14.669C18.3895 14.669 17.7256 14.009 17.7256 13.2042C17.7256 12.4119 18.3821 11.7557 19.1885 11.7354C20.0119 11.7354 20.6641 12.3993 20.6641 13.2042ZM6.33594 13.2042C6.33594 13.4685 6.5403 13.669 6.80469 13.669C7.06908 13.669 7.27344 13.4685 7.27344 13.2042C7.27344 12.9398 7.06908 12.7353 6.79834 12.7353C6.53361 12.741 6.33594 12.9439 6.33594 13.2042ZM18.7256 13.2042C18.7256 13.4685 18.9299 13.669 19.1943 13.669C19.4587 13.669 19.6631 13.4685 19.6631 13.2042C19.6631 12.9398 19.4587 12.7353 19.1885 12.7353C18.9242 12.741 18.7256 12.9439 18.7256 13.2042ZM6.80469 20.4971C7.60953 20.4971 8.27345 21.1619 8.27344 21.9668C8.27343 22.7716 7.60952 23.4356 6.80469 23.4356C5.99986 23.4356 5.33497 22.7716 5.33496 21.9668C5.33495 21.1619 5.99985 20.4971 6.80469 20.4971ZM19.1943 20.4971C19.9992 20.4971 20.6641 21.1619 20.6641 21.9668C20.6641 22.7716 19.9992 23.4356 19.1943 23.4356C18.3895 23.4356 17.7256 22.7716 17.7256 21.9668C17.7256 21.1619 18.3895 20.4971 19.1943 20.4971ZM6.33594 21.9668C6.33594 22.2312 6.5403 22.4356 6.80469 22.4356C7.06908 22.4356 7.27344 22.2312 7.27344 21.9668C7.27344 21.7024 7.08178 21.4981 6.80469 21.4981C6.53963 21.5094 6.33594 21.7107 6.33594 21.9668ZM18.7256 21.9668C18.7256 22.2312 18.9299 22.4356 19.1943 22.4356C19.4587 22.4356 19.6631 22.2312 19.6631 21.9668C19.6631 21.7024 19.4709 21.4981 19.1943 21.4981C18.9298 21.5094 18.7256 21.7107 18.7256 21.9668Z"
                fill="url(#paint0_linear_9140_36374)"
              />
              <path
                d="M7.66602 17.026V16.668H10.0482V17.026H9.04941V20.0013H8.66479V17.026H7.66602Z"
                fill="#262626"
              />
              <path
                d="M11.622 20.0013H10.6418V16.668H11.6654C11.9735 16.668 12.2371 16.7347 12.4563 16.8682C12.6755 17.0005 12.8435 17.191 12.9604 17.4395C13.0772 17.6868 13.1356 17.9831 13.1356 18.3281C13.1356 18.6753 13.0767 18.9743 12.9588 19.2249C12.841 19.4745 12.6693 19.6666 12.4439 19.8011C12.2185 19.9346 11.9445 20.0013 11.622 20.0013ZM11.0264 19.6432H11.5971C11.8598 19.6432 12.0774 19.5901 12.2501 19.4837C12.4227 19.3774 12.5515 19.226 12.6362 19.0296C12.721 18.8332 12.7634 18.5994 12.7634 18.3281C12.7634 18.059 12.7215 17.8274 12.6378 17.6331C12.554 17.4378 12.4289 17.2881 12.2625 17.1839C12.096 17.0787 11.8887 17.026 11.6406 17.026H11.0264V19.6432Z"
                fill="#262626"
              />
              <path
                d="M13.7808 20.0013V16.668H15.6977V17.026H14.1654V18.1523H15.5985V18.5104H14.1654V19.6432H15.7225V20.0013H13.7808Z"
                fill="#262626"
              />
              <path
                d="M16.391 20.0013V16.668H18.3079V17.026H16.7756V18.1523H18.2086V18.5104H16.7756V19.6432H18.3327V20.0013H16.391Z"
                fill="#262626"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9140_36374"
                  x1="-0.461501"
                  y1="17.8715"
                  x2="26.3404"
                  y2="17.8753"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[84px] absolute left-[108px] top-[100px] ">
            {tdee}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Daily Calorie Requirement
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            Total Daily Energy Expenditure (TDEE) reflects your daily calorie
            needs. Adjust your nutrition based on your TDEE score.
          </p>
        </div>
      </section>
    </>
  );
};

export default TDEE;
