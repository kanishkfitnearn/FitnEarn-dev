import type { NextPage } from "next";

export type CardType = {
  className?: string;
  image?: string;
  star1?: string;
};

const CoachCard: NextPage<CardType> = ({ className = "", image, star1 }) => {
  return (
    <div
      className={`h-[317.6px] flex flex-col items-start justify-start pt-0 px-0 pb-[0.9px] box-border gap-[12.7px] text-left text-xs-1 text-neutral-400 font-lato ${className}`}
    >
      <img
        className="self-stretch flex-1 relative rounded-3xs-5 max-w-full overflow-hidden max-h-full object-cover"
        loading="lazy"
        alt=""
        src={image}
      />
      <img
        className="w-[19px] h-[19px] relative overflow-hidden shrink-0 hidden"
        alt=""
        src="/heart.svg"
      />
      <div className="flex flex-col items-start justify-start gap-[6.4px] text-base-8">
        <div className="flex flex-col items-start justify-start gap-[3.1px] shrink-0 [debug_commit:0448091]">
          <div className="relative font-semibold text-neutral-200 inline-block min-w-[99px]">
            Session Name
          </div>
          <div className="relative text-mini-3 inline-block min-w-[106px]">
            Session category
          </div>
          <div className="relative text-smi-7 whitespace-nowrap">
            12 - 02 - 2024 , 04:30PM
          </div>
        </div>
        <div className="flex flex-row items-start justify-start shrink-0 [debug_commit:0448091] text-xs-1 text-neutral-300">
          <div className="relative font-semibold inline-block min-w-[63px]">
            Coach Name
          </div>
        </div>
      </div>
      <div className="w-[38px] hidden flex-row items-center justify-end gap-[3.2px] text-shade-02">
        <img
          className="h-[12.7px] w-[12.7px] relative rounded-12xs-4"
          alt=""
          src={star1}
        />
        <div className="h-[13px] flex-1 relative inline-block">4.91</div>
      </div>
      <img
        className="w-[38.8px] h-[4.8px] relative hidden"
        alt=""
        src="/ellipses.svg"
      />
      <div className="w-[70px] rounded-[3.17px] bg-white hidden flex-row items-start justify-start py-[3.2px] px-[5px] box-border text-gray">
        <div className="h-[13px] relative font-semibold inline-block">Free</div>
      </div>
    </div>
  );
};

export default CoachCard;
