"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Popup = ({ p1, p2, p3, confirm, cancel, p3button }: any) => {
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60"></div>
      <div
        style={{
          borderRadius: "16px", // Tailwind's 'rounded-2xl' is equivalent to 16px
          border: "1px solid #404040", // Tailwind uses neutral-700 for #404040
          background:
            "linear-gradient(157deg, rgba(77, 77, 77, 0.59) 0%, rgba(140, 140, 140, 0.53) 99.6%)",
          backdropFilter: "blur(100px)", // Tailwind's 'backdrop-blur-lg' may be used for moderate blur, but custom blur can be applied inline
        }}
        className="border-2 border-neutral-300 bg-neutral-700 z-50 mq1050:left-60 justify-center mq450:justify-start fixed w-[580px] h-[397px] mq450:w-[300px] mq450:top-[190px] rounded-xl align-center  mq450:left-[30px] left-[450px] top-[152.50px] flex-col  items-center  inline-flex "
      >
        <svg
          onClick={cancel}
          className="ml-[500px] cursor-pointer mt-[-7px] mq450:ml-56 mq450:w-[24px] mq450:mt-4 mq450:h-[24px]"
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M26.8526 24.0246L37.4386 13.4386C37.6296 13.2541 37.782 13.0334 37.8868 12.7894C37.9916 12.5454 38.0468 12.2829 38.0491 12.0174C38.0514 11.7518 38.0008 11.4885 37.9002 11.2427C37.7997 10.9969 37.6512 10.7736 37.4634 10.5858C37.2756 10.398 37.0523 10.2495 36.8065 10.1489C36.5607 10.0484 36.2973 9.99777 36.0318 10.0001C35.7662 10.0024 35.5038 10.0576 35.2598 10.1624C35.0158 10.2672 34.7951 10.4196 34.6106 10.6106L24.0246 21.1966L13.4386 10.6106C13.0614 10.2463 12.5562 10.0447 12.0318 10.0492C11.5074 10.0538 11.0058 10.2641 10.6349 10.6349C10.2641 11.0058 10.0538 11.5074 10.0492 12.0318C10.0447 12.5562 10.2463 13.0614 10.6106 13.4386L21.1966 24.0246L10.6106 34.6106C10.4196 34.7951 10.2672 35.0158 10.1624 35.2598C10.0576 35.5038 10.0024 35.7662 10.0001 36.0318C9.99777 36.2973 10.0484 36.5607 10.1489 36.8065C10.2495 37.0523 10.398 37.2756 10.5858 37.4634C10.7736 37.6512 10.9969 37.7997 11.2427 37.9002C11.4885 38.0008 11.7518 38.0514 12.0174 38.0491C12.2829 38.0468 12.5454 37.9916 12.7894 37.8868C13.0334 37.782 13.2541 37.6296 13.4386 37.4386L24.0246 26.8526L34.6106 37.4386C34.9878 37.8029 35.493 38.0045 36.0174 37.9999C36.5418 37.9954 37.0434 37.785 37.4142 37.4142C37.785 37.0434 37.9954 36.5418 37.9999 36.0174C38.0045 35.493 37.8029 34.9878 37.4386 34.6106L26.8526 24.0246Z"
            fill="#D4D4D4"
          />
        </svg>
        <div className="flex inline-flex flex-col items-center justify-center gap-1 ">
          <Image
            className="mq450:w-[84px] mq450:h-[94px]"
            height={100}
            width={120}
            src="/mdi_alert.png"
            alt=""
          />
          <p className="text-white text-[36px] max-w-lg  text-center font-bold font-Lato leading-[60px] mq450:text-[28px] pt-">
            {p1}
          </p>
          <p className="text-lg font-semibold text-center text-neutral-100 font-Lato mq450:text-[16px] ">
            {p2}
          </p>
          <button onClick={p3button}>
            <p className="text-sm font-semibold text-center underline mq450:text-[13px]  text-neutral-100 font-Lato">
              {p3}
            </p>
          </button>
          <div className="flex items-start justify-center gap-4 pt-5">
            <button
              onClick={cancel}
              className="items-center justify-center px-4 py-2 text-white transition duration-200 border rounded rounded-lg border-neutral-100"
            >
              Go Back
            </button>
            <button
              onClick={confirm}
              className="px-4 py-2 text-white transition duration-200 rounded bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
