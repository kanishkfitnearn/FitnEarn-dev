"use client";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { General } from "@/contexts/generalContext";

const fitnessLevel = [
  {
    name: "Beginner",
    details: "Never followed a fitness regime.",
  },
  {
    name: "Enthusiast",
    details: "Recently started with Fitness programs.",
  },
  {
    name: "Intermediate",
    details: "Following fitness programs for over a year.",
  },
  {
    name: "Advanced",
    details: "Exercising regularly for over two years.",
  },
];

const FitnessLevel = () => {
  // const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const { selectedLevel, setSelectedLevel } = General();
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [err, setErr] = useState<string>("");
  const [hover, setHover] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const email = Cookies.get("email");
  const router = useRouter();

  const handleMouseOver = (children: string) => {
    setHover(children);
  };

  const handleMouseOut = () => {
    setHover("");
  };

  const handleSelection = (level: string) => {
    setSelectedLevel(level);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedLevel) {
      setErr("");
      setIsLoading(true);
      let fitnessLevelId;
      //console.log("Selected Level:", selectedLevel);
      selectedLevel === "Beginner" ? (fitnessLevelId = 1) : "";
      selectedLevel === "Enthusiast" ? (fitnessLevelId = 2) : "";
      selectedLevel === "Intermediate" ? (fitnessLevelId = 3) : "";
      selectedLevel === "Advanced" ? (fitnessLevelId = 4) : "";
      //console.log(fitnessLevelId);
      try {
        axios
          .post(
            `${apiEndpoint}/api/fitnearn/web/users/onboarding/fitness-level`,
            {
              email,
              fitnessLevelId,
            },
          )
          .then((response) => {
            //console.log(response);
            if (response.data.success) {
              setIsLoading(false);
              router.push(`/exercise-category`);
            }
            if (response.data.userFitnessLevel) {
              setIsLoading(false);
              router.push(`/exercise-category`);
            } else {
              setErr(response.data.message);
              setIsLoading(false);
            }
          });
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setErr("Select at least one Fitness Level");
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center gap-3 md:gap-[22px]"
        onSubmit={handleSubmit}
      >
        {fitnessLevel.map((item) => (
          <div
            key={item.name}
            onClick={() => handleSelection(item.name)}
            onMouseOver={() => handleMouseOver(item.name)}
            onMouseOut={handleMouseOut}
            className={`${selectedLevel === item.name ? "fitness-level-selected" : "fitness-level"} ${
              hover === item.name && selectedLevel !== item.name
                ? "fitness-level-hovered w-[410px]"
                : ""
            } flex justify-between items-center w-[270px] md:w-[393px] h-[70px] px-[20px] py-[14px] cursor-pointer`}
            style={{
              background:
                selectedLevel !== item.name && hover === item.name
                  ? "var(--linear-200, linear-gradient(180deg, rgba(219, 39, 119, 0.12) 0%, rgba(249, 115, 22, 0.12) 100%))"
                  : "",
            }}
          >
            <div>
              <h3 className="text-[16px] text-[#E5E5E5] font-semibold leading-[20px]">
                {item.name}
              </h3>
              <span className="text-[10px] md:text-[12px] text-[#E5E5E5] font-normal leading-[20px]">
                {item.details}
              </span>
            </div>
            <div>
              {item.name === "Beginner" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect
                    y="12.8086"
                    width="4.2767"
                    height="7.19"
                    fill="#E5E5E5"
                  />
                  <rect
                    x="5.74219"
                    y="10.4336"
                    width="3.2767"
                    height="9.066"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="10.9824"
                    y="6.12109"
                    width="3.2767"
                    height="13.38"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="16.2246"
                    y="0.5"
                    width="3.27495"
                    height="19"
                    stroke="#E5E5E5"
                  />
                </svg>
              ) : (
                ""
              )}
              {item.name === "Enthusiast" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect
                    y="12.8086"
                    width="4.2767"
                    height="7.19"
                    fill="#E5E5E5"
                  />
                  <rect
                    x="5.74219"
                    y="10.4336"
                    width="3.2767"
                    height="9.066"
                    fill="#E5E5E5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="10.9824"
                    y="6.12109"
                    width="3.2767"
                    height="13.38"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="16.2246"
                    y="0.5"
                    width="3.27495"
                    height="19"
                    stroke="#E5E5E5"
                  />
                </svg>
              ) : (
                ""
              )}
              {item.name === "Intermediate" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect
                    y="12.8086"
                    width="4.2767"
                    height="7.19"
                    fill="#E5E5E5"
                  />
                  <rect
                    x="5.74219"
                    y="10.4336"
                    width="3.2767"
                    height="9.066"
                    fill="#E5E5E5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="10.9824"
                    y="6.12109"
                    width="3.2767"
                    height="13.38"
                    fill="#E5E5E5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="16.2246"
                    y="0.5"
                    width="3.27495"
                    height="19"
                    stroke="#E5E5E5"
                  />
                </svg>
              ) : (
                ""
              )}
              {item.name === "Advanced" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect
                    y="12.8086"
                    width="4.2767"
                    height="7.19"
                    fill="#E5E5E5"
                  />
                  <rect
                    x="5.74219"
                    y="10.4336"
                    width="3.2767"
                    height="9.066"
                    fill="#E5E5E5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="10.9824"
                    y="6.12109"
                    width="3.2767"
                    height="13.38"
                    fill="#E5E5E5"
                    stroke="#E5E5E5"
                  />
                  <rect
                    x="16.2246"
                    y="0.5"
                    width="3.27495"
                    height="19"
                    fill="#E5E5E5"
                    stroke="#E5E5E5"
                  />
                </svg>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="primaryButton w-[270px] md:w-[393px] h-[43px] rounded-[8px] py-2 flex justify-center items-center text-[18px] text-[#DADADA] font-semibold leading-normal"
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
        {err ? (
          <span className="flex justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
                fill="#EF4444"
              />
            </svg>
            <span className="text-[#EF4444] text-[12px] leading-normal font-extrabold ">
              {err}
            </span>
          </span>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default FitnessLevel;
