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
import axios from "axios";

const ConversionFactorsForWeight = {
  lb_to_kg: 0.453592,
  kg_to_lb: 2.20462,
};

type Activity = {
  _id: string;
  name: string;
  metValue: string;
};

const CalorieBurn = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [weight, setWeight] = useState("Lb");
  const [weightValue, setWeightValue] = useState<number | undefined>();
  const [time, setTime] = useState<number | undefined>();
  const [met, setMet] = useState<number | undefined>();
  const [weightFlag, setWeightFlag] = useState<string>("Lb");
  const [weightErr, setWeightErr] = useState<string>("");
  const [timeErr, setTimeErr] = useState<string>("");
  const [calorieBurn, setCalorieBurn] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("");

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

  const calculateCalorieBurn = (e: any) => {
    e.preventDefault();
    let weight, CB;
    //console.log(" weight time before", weightValue, time);

    if (weightFlag === "Lb") {
      weight = weightValue! * 0.453592;
    }
    if (weightFlag === "Kg") {
      weight = weightValue;
    }

    const timeInHrs = time! / 60;

    if (weight! > 150 || weight! < 35) {
      setWeightErr("valid height is between 35 kg and 150 kg.");
      return;
    } else {
      setWeightErr("");
    }

    if (timeInHrs! > 8 || timeInHrs! <= 0) {
      setTimeErr("valid time is between 1 min and 480 min.");
      return;
    } else {
      setTimeErr("");
    }
    //console.log("weight after", weight, timeInHrs, met);
    // Calories Burned = (MET x Body Weight in kg x Duration in hours)
    CB = Math.round(met! * weight! * timeInHrs!);
    //console.log("calorie burned", CB);
    setCalorieBurn(CB);
  };

  useEffect(() => {
    if (selectedCategory) {
      const fetchActivities = async () => {
        try {
          const response = await axios.get(
            `${apiEndpoint}/api/fitnearn/web/categories/${selectedCategory}`,
          );
          //console.log(response.data);
          if (response.data.success) {
            setActivities(response.data.data.subCategory);
          }
        } catch (error) {
          //console.error("Error fetching activities:", error);
        }
      };

      fetchActivities();
    }
  }, [selectedCategory]);

  const handleActivityChange = (e: any) => {
    //console.log(e.target.value);
    setSelectedActivity(e.target.value); // Update selected activity state
    setMet(parseFloat(e.target.value)); // Assuming setMet function is defined somewhere
  };

  return (
    <>
      <section className="flex justify-center items-center flex-wrap md:flex-nowrap mx-3 md:mx-[72px] gap-3 md:gap-[40px]">
        <div className="flex1">
          <h3 className="text-[#F5F5F5] w-full text-[18px] md:text-[24px] font-bold text-start mb-6">
            Enter Your Details
          </h3>
          <form
            onSubmit={calculateCalorieBurn}
            className="flex flex-col gap-4 md:gap-6"
          >
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
            {/* <div className="relative">
              <Input
                type="number"
                required
                className="calculator-input w-[298px] md:w-[480px]"
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

            <Select required onValueChange={setSelectedCategory}>
              <SelectTrigger className="calculator-input w-[298px] md:w-[480px]">
                <SelectValue placeholder="Pick Your Category" />
              </SelectTrigger>
              <SelectContent className="select-content">
                <SelectItem value="Household Chores">
                  Household Chores
                </SelectItem>
                <SelectItem value="Day-to-Day Activities">
                  Day-to-Day Activities
                </SelectItem>
                <SelectItem value="Activities by Profession">
                  Activities by Profession
                </SelectItem>
                <SelectItem value="Gym Activities">Gym Activities</SelectItem>
                <SelectItem value="Cardiovascular Activities">
                  Cardiovascular Activities
                </SelectItem>
                <SelectItem value="Sports Activities">
                  Sports Activities
                </SelectItem>
                <SelectItem value="Yoga and Meditation">
                  Yoga and Meditation
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-4 md:flex-nowrap">
              {/* <Select required onValueChange={handleActivityChange}>
                <SelectTrigger className="calculator-input w-[298px] md:w-[232px]">
                  <SelectValue className="text-white" placeholder={selectedActivity || "Activity"} />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {activities.map((activity, index) => (
                    <SelectItem key={`${activity._id}${index}`} value={activity.metValue}>
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <select
                name="activities"
                className="calculator-input w-[298px] md:w-[232px] focus:outline-none focus:ring-0 focus:border-[#737373]"
                id="activities"
                value={selectedActivity}
                onChange={handleActivityChange}
              >
                <option value="" disabled>
                  Activity
                </option>
                {activities &&
                  activities.map((activity) => (
                    <option key={activity._id} value={activity.metValue}>
                      {activity.name}
                    </option>
                  ))}
              </select>

              <div className="relative w-[298px] md:w-[232px]">
                <input
                  type="number"
                  required
                  id="Time"
                  className={`block w-[298px] md:w-[232px] h-[40px] md:h-[48px]  px-2.5 pb-2.5 pt-4 text-[16px] text-[#FFF] bg-transparent rounded-lg border-1 ${timeErr ? "border-[#F05252] dark:border-[#F05252]" : "border-[#737373] dark:border-[#737373]"} appearance-none dark:text-[#FFF] dark:focus:border-[#FFF] focus:outline-none focus:ring-0 focus:border-[#FFF] peer`}
                  placeholder=" "
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                />
                <label
                  htmlFor="Time"
                  className={`absolute text-[16px] peer-focus:text-[18px] font-normal peer-focus:font-medium leading-[24px] peer-focus:leading-[12px] ${timeErr ? "text-[#F05252] dark:text-[#F05252] peer-placeholder-shown:top-1/3" : "text-[#A3A3A3] dark:text-[#A3A3A3] peer-placeholder-shown:top-1/2"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#262626] dark:bg-[#262626] px-2 peer-focus:px-2 peer-focus:text-[#A3A3A3] peer-focus:dark:text-[#A3A3A3] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                  Time Spent
                </label>
                <span className="mins absolute top-[6px] md:top-[10px] right-2">
                  mins
                </span>
                {timeErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {timeErr}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="relative">
                <Input
                  type="number"
                  required
                  placeholder="Time Spent"
                  value={time}
                  className="calculator-input w-[298px] md:w-[232px]"
                  onChange={(e) => setTime(parseInt(e.target.value))}
                />
                <span className="mins absolute top-[10px] right-2">mins</span>
                {timeErr ? (
                  <span className="text-[12px] text-center text-red-600">
                    {timeErr}
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
          <SvgGauge percentageValue={calorieBurn} range={3000} />
          <span className="absolute left-[134px] top-[60px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M19 4.75C19 6.14844 19.2578 7.4375 19.7734 8.61719C20.2891 9.79688 21.0312 10.8828 22 11.875C22.9688 12.8672 23.7109 13.9531 24.2266 15.1328C24.7422 16.3125 25 17.6016 25 19C25 19.8281 24.8945 20.625 24.6836 21.3906C24.4727 22.1562 24.168 22.8711 23.7695 23.5352C23.3711 24.1992 22.9023 24.8086 22.3633 25.3633C21.8242 25.918 21.2188 26.3867 20.5469 26.7695C19.875 27.1523 19.1562 27.4531 18.3906 27.6719C17.625 27.8906 16.8281 28 16 28C15.1719 28 14.375 27.8945 13.6094 27.6836C12.8438 27.4727 12.1289 27.168 11.4648 26.7695C10.8008 26.3711 10.1914 25.9023 9.63672 25.3633C9.08203 24.8242 8.61328 24.2188 8.23047 23.5469C7.84766 22.875 7.54688 22.1562 7.32812 21.3906C7.10938 20.625 7 19.8281 7 19C7 18.3438 7.07031 17.6992 7.21094 17.0664C7.35156 16.4336 7.55469 15.8281 7.82031 15.25C8.08594 14.6719 8.41406 14.1211 8.80469 13.5977C9.19531 13.0742 9.63672 12.6016 10.1289 12.1797C10.1836 12.4766 10.2578 12.7812 10.3516 13.0938C10.4453 13.4062 10.5547 13.7188 10.6797 14.0312C10.8047 14.3438 10.9531 14.6406 11.125 14.9219C11.2969 15.2031 11.4766 15.4648 11.6641 15.707C11.8203 15.9023 12.0234 16 12.2734 16C12.4844 16 12.6602 15.9258 12.8008 15.7773C12.9414 15.6289 13.0156 15.4492 13.0234 15.2383C13.0234 15.1523 13.0117 15.0742 12.9883 15.0039C12.9648 14.9336 12.9258 14.8633 12.8711 14.793C12.6523 14.4727 12.4609 14.1562 12.2969 13.8438C12.1328 13.5312 11.9883 13.2109 11.8633 12.8828C11.7383 12.5547 11.6484 12.2148 11.5938 11.8633C11.5391 11.5117 11.5078 11.1406 11.5 10.75C11.5 9.82031 11.6758 8.94531 12.0273 8.125C12.3789 7.30469 12.8633 6.58984 13.4805 5.98047C14.0977 5.37109 14.8125 4.89062 15.625 4.53906C16.4375 4.1875 17.3125 4.00781 18.25 4H19V4.75Z"
                fill="url(#paint0_linear_9020_43345)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9020_43345"
                  x1="6.30769"
                  y1="19.3192"
                  x2="25.6058"
                  y2="19.3215"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="calculator-result w-[100px] absolute left-[100px] top-[100px] ">
            {calorieBurn}
          </span>
          <div className="text-[#F5F5F5] mt-2 w-full text-center text-[20px] font-bold leading-normal">
            Calories / day
          </div>
          <p className="text-[16px] text-white font-medium text-center leading-normal mt-3">
            Calorie burn refers to the energy your body uses throughout the day
            .Burning around 300-500 calories daily can help maintain a healthy
            weight, improve metabolism and reduces stress.
          </p>
        </div>
      </section>
    </>
  );
};

export default CalorieBurn;
