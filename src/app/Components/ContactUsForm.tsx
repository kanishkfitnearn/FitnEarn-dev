"use client";
import React from "react";
import Hero from "./Hero";

const ContactUsForm = () => {
  return (
    <div className="flex flex-wrap items-center w-auto mt-6 justify- md:flex-nowrap md:mt-[90px]">
      <div className="flex-1 mb-8 md:pl-7 md:mb-0">
        <h5 className="text-[14px] md:text-[16px] text-[#A3A3A3] font-semibold leading-normal mb-4 md:mb-[32px]">
          Fill in your details, and we’ll get back to you as soon as possible!
        </h5>
        <Hero />
      </div>

      {/* <div className="flex flex-col items-center justify-center flex-1 gap-7">
        <div className="w-[350px]">
          <h2 className="text-[24px] md:text-[32px] text-[#D4D4D4] font-bold leading-normal">
            Address
          </h2>
          <span className="text-[16px] md:text-[20px] text-[#A3A3A3] font-normal leading-normal mt-2">
            19174 Parker Cliffs, North Lucio 70998-5168
          </span>
        </div>
        <div className="w-[350px]">
          <h2 className="text-[24px] md:text-[32px] text-[#D4D4D4] font-bold leading-normal">
            Email
          </h2>
          <span className="text-[16px] md:text-[20px] text-[#A3A3A3] font-normal leading-normal mt-2 underline">
            fitearn@gmail.com
          </span>
        </div>
        <div className="w-[350px]">
          <h2 className="text-[24px] md:text-[32px] text-[#D4D4D4] font-bold leading-normal">
            Helpline{" "}
          </h2>
          <span className="text-[16px] md:text-[20px] text-[#A3A3A3] font-normal leading-normal mt-2">
            151555544
          </span>
        </div>
        <div className="w-[350px]">
          <h2 className="text-[24px] md:text-[32px] text-[#D4D4D4] font-bold leading-normal">
            Office Hours{" "}
          </h2>
          <span className="text-[16px] md:text-[20px] text-[#A3A3A3] font-normal leading-normal mt-2">
            Mon - Sat 10 AM to 8 PM{" "}
          </span>
        </div>
      </div> */}
      <div className="w-[455px] mq450:mr-0 mq1050:mr-0 mr-20 h-[442px] rounded-2xl border px-10 pt-7 mq450:pt-2 flex flex-col gap-6 border-[#F43F5E] bg-gradient-to-b from-[rgba(251,146,60,0.12)] to-[rgba(244,63,94,0.12)] rounded-2xl border border-rose-500">
        <div>
          <p className="py-2 text-2xl font-bold text-neutral-100 font-Lato">
            Our office address
          </p>
          <p className="text-base font-normal text-neutral-400 font-Lato">
            395, Purav Deen Dayal, Old Railway Road, Veer Bhawan Nagar,
            Roorkee-247667
          </p>
        </div>
        <div>
          <p className="py-2 text-2xl font-bold text-neutral-100 font-Lato">
            Email
          </p>
          <p className="text-base font-normal text-neutral-400 font-Lato">
            help-support@fitnearn.com
          </p>
        </div>
        <div>
          <p className="py-2 text-2xl font-bold text-neutral-100 font-Lato">
            Helpline
          </p>
          <p className="text-base font-normal text-neutral-400 font-Lato">
            +91-8630222654
          </p>
        </div>
        <div>
          <p className="py-2 text-2xl font-bold text-neutral-100 font-Lato">
            Office Hours
          </p>
          <p className="text-base font-normal text-neutral-400 font-Lato">
            Mon - Sat 10 AM to 08 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
