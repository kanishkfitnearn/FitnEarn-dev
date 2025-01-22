import type { NextPage } from "next";

// import CoachCard from "@/app/Components/CoachCard";
import Image from "next/image";
import Link from "next/link";
import SeatedTricep from "../../../../public/seatedTricep.png";
import Split from "../../../../public/Split.png";
import Pranayam from "../../../../public/Pranayam.png";

const page: NextPage = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        className="flex relative w-screen h-screen overflow-hidden bg-black scrollbar-hide"
      >
        <div className="flex-1 hidden bg-center bg-cover usernameLeftImg md:block"></div>
        <div className="usernameMiddleImg flex-1 ml-[3px] mr-2 bg-cover bg-center  flex justify-center items-center"></div>
        <div className="flex-1 hidden bg-center bg-cover usernameRightImg md:block"></div>

        <div className="absolute flex justify-center items-center h-full  mq450:w-[330px] w-[902px]  left-0 ml-auto mr-auto  right-0  ">
          <div className="w-[902px] md:h-auto mq450:h-[770px] mq450:w-[330px] mt-1 [background:linear-gradient(157.48deg,_rgba(77,_77,_77,_0.59),_rgba(140,_140,_140,_0.53))] mq450:px-4  flex  h-[680px] px-11 py-6  md:py-10 bg-gradient-to-br from-neutral-600 to-neutral-400 rounded-3xl backdrop-blur-[100px] flex-col justify-start md:justify-center items-center  gap-2.5 ">
            <div className="flex justify-center items-center mq450:flex-col ">
              <div className="w-[300px] md:w-full">
                <div className="flex mq450:justify-start">
                  <div className="w-[54px] h-[54px] mq450:justify-start px-2 pt-[10.50px] pb-[9.50px] bg-neutral-800 rounded-[130px] border border-neutral-700 justify-center items-center inline-flex">
                    <div className="w-[38px] flex justify-center items-center mid-heading text-[28px] font-extrabold font-Lato">
                      11
                    </div>
                  </div>
                  <span className="px-4 mq450:px-1">
                    <p className="w-[392px] mq450:text-xl text-neutral-200 text-2xl font-bold font-Lato">
                      Exercise Categories
                    </p>
                    <p className="w-[392px] text-neutral-300 text-lg font-medium font-Lato">
                    Tailored workouts, loved by your schedule
                    </p>
                  </span>
                </div>
                <div className="py-2">
                  <span className="flex p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.72432 18C9.46319 18.0011 9.21203 17.8907 9.02454 17.6924L4.30195 12.693C4.20782 12.5927 4.13272 12.4732 4.08092 12.3413C4.02912 12.2094 4.00165 12.0676 4.00007 11.9241C3.99689 11.6343 4.09936 11.3549 4.28496 11.1475C4.47055 10.9401 4.72407 10.8217 4.98972 10.8182C5.25538 10.8147 5.51143 10.9265 5.70153 11.129L9.72832 15.3901L18.2978 6.31057C18.4881 6.10809 18.7444 5.99641 19.0103 6.00009C19.2761 6.00377 19.5297 6.12251 19.7153 6.3302C19.9009 6.53788 20.0033 6.8175 19.9999 7.10752C19.9965 7.39755 19.8877 7.67424 19.6973 7.87672L10.4241 17.6924C10.2366 17.8907 9.98546 18.0011 9.72432 18Z"
                        fill="#D4D4D4"
                      />
                    </svg>
                    <p className="text-base font-normal mq450:text-sm text-neutral-300 font-Lato">
                      Unlock access to {`>`}1000 sessions from 20+ categories
                    </p>
                  </span>
                  <span className="flex p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.72432 18C9.46319 18.0011 9.21203 17.8907 9.02454 17.6924L4.30195 12.693C4.20782 12.5927 4.13272 12.4732 4.08092 12.3413C4.02912 12.2094 4.00165 12.0676 4.00007 11.9241C3.99689 11.6343 4.09936 11.3549 4.28496 11.1475C4.47055 10.9401 4.72407 10.8217 4.98972 10.8182C5.25538 10.8147 5.51143 10.9265 5.70153 11.129L9.72832 15.3901L18.2978 6.31057C18.4881 6.10809 18.7444 5.99641 19.0103 6.00009C19.2761 6.00377 19.5297 6.12251 19.7153 6.3302C19.9009 6.53788 20.0033 6.8175 19.9999 7.10752C19.9965 7.39755 19.8877 7.67424 19.6973 7.87672L10.4241 17.6924C10.2366 17.8907 9.98546 18.0011 9.72432 18Z"
                        fill="#D4D4D4"
                      />
                    </svg>
                    <p className="text-base font-normal mq450:text-sm text-neutral-300 font-Lato">
                      New sessions added monthly to keep it exciting
                    </p>
                  </span>
                  <span className="flex p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.72432 18C9.46319 18.0011 9.21203 17.8907 9.02454 17.6924L4.30195 12.693C4.20782 12.5927 4.13272 12.4732 4.08092 12.3413C4.02912 12.2094 4.00165 12.0676 4.00007 11.9241C3.99689 11.6343 4.09936 11.3549 4.28496 11.1475C4.47055 10.9401 4.72407 10.8217 4.98972 10.8182C5.25538 10.8147 5.51143 10.9265 5.70153 11.129L9.72832 15.3901L18.2978 6.31057C18.4881 6.10809 18.7444 5.99641 19.0103 6.00009C19.2761 6.00377 19.5297 6.12251 19.7153 6.3302C19.9009 6.53788 20.0033 6.8175 19.9999 7.10752C19.9965 7.39755 19.8877 7.67424 19.6973 7.87672L10.4241 17.6924C10.2366 17.8907 9.98546 18.0011 9.72432 18Z"
                        fill="#D4D4D4"
                      />
                    </svg>
                    <p className="font-normal text-md mq450:text-sm text-neutral-300 font-Lato">
                      Freedom to choose between personalized & group sessions
                    </p>
                  </span>
                </div>
              </div>
              <div className="md:h-[160px] w-[300px] flex flex-col items-center justify-center p-2  border-2 rounded-3xl border-neutral-500">
                <p className="w-[318px] text-center mq450:w-[285px] ">
                  <span className="text-xl font-normal mq450:text-base text-neutral-300 font-Lato"></span>
                  <span className="text-xl font-medium text text-n mq450:text-base text-neutral-300 font-Lato">
                    Starting at Rs. 499 only.
                  </span>
                  <br />
                  <span className="text-xl font-medium mq450:text-base text-neutral-300 font-Lato">
                    Sign Up Now
                  </span>
                  <span>&nbsp;</span>
                  {/* <span className="text-xl font-medium text- mq450:text-base text-neutral-300 font-Lato">
                    exercise categories and all sessions.
                  </span> */}
                </p>
                <Link href="/onboard-subscription-plans">
                  <button className="mt-4 primaryButton text-nowrap text-neutral-200 text-[18px] font-medium font-base font-Lato w-[270px] h-[43px] px-10 py-[7px] bg-gradient-to-r from-rose-500 to-orange-400   rounded-lg justify-center items-center inline-flex ">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-neutral-200 mq450:text-xl py-2 text-center  text-[28px] font-bold font-Lato">
                Live Sessions
              </p>
              <div className="flex gap-6 md:gap-8 mq450:overflow-x-scroll mq450:scrollbar-thin">
                <div className="shrink-0">
                  <Image
                    src={Pranayam}
                    width={250}
                    height={400}
                    layout="fixed"
                    alt="hehe"
                    className="object-cover w-[200px] md:w-[240px] h-[180px] md:h-[220px] rounded-[8px]"
                  />
                  <p className="text-base font-bold text-neutral-200 font-Lato mt-2">
                    Pranayam Session
                  </p>
                  <p className="text-sm font-normal text-neutral-400 font-Lato">
                    Yoga
                  </p>
                  <p className="text-xs font-normal text-neutral-400 font-Lato">
                    12 - 10 - 2024 , 04:30PM
                  </p>
                  <p className="text-neutral-300 text-[11.09px] font-semibold font-Lato">
                    Yashita
                  </p>
                </div>
                <div className="shrink-0">
                  <Image
                    src={SeatedTricep}
                    width={250}
                    height={400}
                    alt="exercise"
                    className="object-cover w-[200px] md:w-[240px] h-[180px] md:h-[220px] rounded-[8px]"
                  />
                  <p className="text-base font-semibold text-neutral-200 font-Lato mt-2">
                    Tricep Workout Session
                  </p>
                  <p className="text-sm font-normal text-neutral-400 font-Lato">
                    Gym
                  </p>
                  <p className="text-xs font-normal text-neutral-400 font-Lato">
                    18 - 10 - 2024 , 06:30PM
                  </p>
                  <p className="text-neutral-300 text-[11.09px] font-semibold font-Lato">
                    Darshan
                  </p>
                </div>
                <div className="shrink-0">
                  <Image
                    src={Split}
                    width={250}
                    height={400}
                    alt="exercise"
                    className="object-cover w-[200px] md:w-[240px] h-[180px] md:h-[220px] rounded-[8px]"
                  />
                  <p className="text-base font-semibold text-neutral-200 font-Lato mt-2">
                    Stretching Session
                  </p>
                  <p className="text-sm font-normal text-neutral-400 font-Lato">
                    Stretching
                  </p>
                  <p className="text-xs font-normal text-neutral-400 font-Lato">
                    23 - 10 - 2024 , 01:30PM
                  </p>
                  <p className="text-neutral-300 text-[11.09px] font-semibold font-Lato">
                    Pooja
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/onboard-subscription-plans">
                <button
                  type="submit"
                  className="primaryButton mt-2 w-[270px] text-[18px] font-semibold items-center md:w-[393px] h-[43px] rounded-[8px]  text-[#DADADA] bg-[#C72D65] "
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
