"use client";
import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import downloadApp from "@/app/images/download-app.png";
import qr from "@/app/images/qr-transformed.png";
import mobile from "@/app/images/mobile.png";
import join from "@/app/images/join-community-transformed.png";
export type ContentType = {
  className?: string;
};
const Homepage3: NextPage<ContentType> = ({ className = "" }) => {
  return (
    <div className="w-full overflow-x-none opacity bg-[url('https://s3-alpha-sig.figma.com/img/c4fa/3a0c/9f0dd07c4cd343dc59527c54094d0c2e?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CyXfJKZxoei7rUPt9LUCmHLPJ5ALFiY2~IOY2ih84CkoxTYHAdyGqODluW7cRTHUywBnrzJaPwmo0cLF7Afyc2U0TLDVZyCaJ5qasxWdMWcZ7-5iWx40yZk6dVq~31jsNB~nfzxLLx4Iu-1TaxTY-Djf4ljcXmsXo9tvqUgx7uaDT8--WGcQy02~3lmaG~QmfJim8Ki3BGkLc5YDXjWi0jIyi9GgPkjXAJQCcNq1KcMzp3q37ip2ef7SSZn3fa8wrRayZOQgLzY~CJDQsJBVmPfIJ5hSMUCptF3ysrMzuwSZPdMZ1sp6u3bmqVeZfK7u3IwcyPkIjKLW9H9HAmfXhA__')]  relative bg-neutral-900 overflow-hidden flex flex-col items-end justify-end pt-[28px] px-[161px] pb-[62px] box-border gap-[48px] leading-[normal] tracking-[normal] lg:pl-20 lg:pr-20 lg:box-border mq750:gap-[24px] mq750:pl-10 mq750:pr-10 mq750:box-border">
      <section className="w-full  flex flex-row items-start justify-end py-0 px-[47px] box-border max-w-full   text-white font-Lato  mq1050:pl-[23px] mq1050:pr-[23px] mq1050:box-border">
        <div className="flex flex-col justify-center w-full">
          {/* <div className="mid-heading text-[22px] md:text-4xl font-normal relative mq450:text-[25px] text-center text-[44px] sm:text-[20px]  font-large text-transparent bg-clip-text bg-gradient-to-b from-[#f3742b] to-[#e21f77]">
            Latest News
          </div> */}

          {/* <div className="text-center mq450:w-[340px]  ">
            <Image alt="" src={join} layout="responsive" quality={100} />
          </div> */}
          {/* <div className="flex flex-row items-center justify-center w-full text-[105px] sm:text-[40px]">
            <div className="relative text-center font-extrabold flex items-center shrink-0 text-shadow-lg max-w-full lg:text-[105px] md:text-[80px] sm:text-[60px] xs:text-[40px]">
              <div className="font-Lato  text-center font-extrabold leading-[normal] text-transparent bg-clip-text bg-black text-stroke-2 lg:text-[105px] md:text-[80px] sm:text-[60px] xs:text-[40px]">
                Join Community
              </div>
            </div>
            <div className="flex text-center relative flex-col items-center justify-center pt-[23px] px-0 pb-0 box-border max-w-full ml-[-671px] text-[56px]">
              <div className="font-extrabold text-nowrap text-center z-[2] mq1050:text-[53px] mq450:text-[40px] text-white">
                <span>Join Community</span>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col items-center justify-center">
            <h4 className="mid-heading text-[22px] md:text-4xl font-normal">
              Latest News
            </h4>
            <div className="relative text-center">
              <h1 className="core-feature text-[42px] md:text-[105px] ">
                JOIN COMMUNITY
              </h1>
              <h2 className="text-[#FFFFFF] text-[30px] md:text-[70px] font-extrabold leading-normal absolute top-3 md:top-6 left-[7px] md:left-[225px]">
                Join Community
              </h2>
            </div>
          </div>
        </div>

        <style jsx>{`
          .text-shadow-lg {
            text-shadow:
              2px 0 0 rgba(255, 255, 255, 0.18),
              0 2px 0 rgba(255, 255, 255, 0.18),
              -2px 0 0 rgba(255, 255, 255, 0.18),
              0 -2px 0 rgba(255, 255, 255, 0.18);
          }
        `}</style>
      </section>
      <section
        className={`flex mx-auto flex-row items-center justify-center gap-[145px] max-w-full text-left text-13xl text-white font-Lato  mq1050:flex-wrap mq1050:gap-[72px] mq450:gap-[36px] ${className}`}
      >
        <div className="flex mq1050:mx-auto mq750:text-center mq750:justify-center flex-col items-start justify-center pt-[45px] px-0 pb-0 box-border min-w-[511px] max-w-full mq1050:flex-1 mq1050:min-w-full mq750:pt-[29px] mq750:box-border">
          <div className="flex mq1050:ml-[200px] text-[32px] mq450:ml-0 flex-col mq750:text-center mq750:justify-center items-start justify-start gap-[48px] max-w-full mq750:gap-[24px]">
            <div className="relative  font-extrabold mq1050:text-[26px] mq450:text-[19px]">
              Be The Part of Growing Community
            </div>
            <div className="w-[430px] h-[358px] flex flex-row py-0 px-[65px] box-border max-w-full text-center text-lg text-neutral-500 mq450:pl-5 mq450:pr-5 mq450:box-border">
              <div className="self-stretch flex-1 overflow-hidden flex flex-row items-end justify-center pt-[47px] px-[53px] pb-[47.2px] relative mq450:pl-5 mq450:pr-5 mq450:box-border">
                <Image
                  width={230}
                  height={230}
                  className="absolute mb-20  mq450:size-[200px] "
                  alt=""
                  src={qr}
                  quality={100}
                />
                <div className="hover:cursor-pointer">
                  <Image
                    className=" mq450:size-[200px]"
                    width={450}
                    height={50}
                    layout="intrinsic"
                    alt=""
                    src={downloadApp}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[45px]">
          <Image
            width={450}
            height={600}
            layout="intrinsic"
            objectFit="cover"
            className="h-[537px]  w-[264px] relative object-cover mq1050:flex-1"
            alt=""
            src={mobile}
          />
        </div>
      </section>
    </div>
  );
};

export default Homepage3;
