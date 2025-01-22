import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useCallback } from "react";

const page = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      className="w-[100vw] h-screen scrollbar-hide md:h-[900px] mq450:overflow-x-hidden overflow-hidden overflow-y-hidden flex bg-black"
    >
      <div className="flex-1 hidden h-auto overflow-hidden bg-center bg-cover scrollbar-hide usernameLeftImg md:block "></div>
      {/* <div className="usernameMiddleImgForExploreVidLib flex-1 ml-[3px] mr-2 bg-cover bg-center flex justify-center items-center"></div> */}
      <div className="usernameMiddleImg flex-1 ml-[3px] mr-2 bg-cover bg-center  flex "></div>
      <div className="flex-1 bg-center bg-cover usernameRightImg mq450:hidden "></div>
      <div className="absolute flex justify-center items-center h-[100vh] w-full md:w-[902px] md:left-0 md:ml-auto md:mr-auto md:right-0 mt-0 ">
        <section className="flex flex-col  justify-start  items-center md:w-[902px] w-[328px] h-auto md:h-auto  mq450:align-center  [backdrop-filter:blur(100px)] rounded-3xl [background:linear-gradient(157.48deg,_rgba(77,_77,_77,_0.59),_rgba(140,_140,_140,_0.53))] overflow-hidden shrink-0 py-6 md:py-10 mt-0 box-border max-w-full z-[1] text-left text-[28px] text-neutral-200 font-lato mq900:py-[26px] mq900:px-[22px]  mq900:box-border">
          <section className="self-stretch  flex flex-col items-center justify-center  px-0 box-border gap-[8pt-px] max-w-full shrink-0 text-center text-[13px] text-white font-lato mq450:gap-[16px] ">
            <div className="self-stretch flex flex-col items-center justify-start gap-2">
              {/* <div className="rounded-lg h-[30px] bg-neutral-500 flex flex-row items-center justify-center py-[5px] px-[24px] whitespace-nowrap text-left border-[1px] border-solid border-neutral-600">
                <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[86px]">
                  Do you know ?
                </a>
              </div> */}
              <h1 className="m-0 self-stretch relative text-[24px] md:text-[28px] font-bold leading-normal font-inherit text-neutral-200 ">
                Explore Our Exercise Video Library
              </h1>
              <h3 className="mx-2 md:mb-6 md:w-full self-stretch relative text-[18px] md:text-[20px] font-normal font-inherit text-[#D4D4D4] leading-normal">
                Your home for a wide range of exercises. Workout on the go or
                watch and learn
              </h3>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start py-0 px-[11px] box-border gap-[23px] max-w-full md:pb-0">
              <Image
                width={700}
                height={300}
                src="/Rectangle 87.png"
                alt="workout Img"
                className="self-stretch w-[270px] md:w-[700px] h-[180px] md:h-[400px] relative mx-auto rounded-[4px] max-w-full overflow-hidden max-h-full object-cover"
              />

              <Link href="/classes-for-you">
                <button
                  type="submit"
                  className="primaryButton w-[270px] text-[18px] font-semibold items-center md:w-[393px] h-[43px] rounded-[8px]  text-[#DADADA] bg-[#C72D65] "
                >
                  Continue
                </button>
              </Link>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default page;
