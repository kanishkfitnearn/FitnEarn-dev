import React from "react";
import "../exercise-category/icons.css";
const IconsLabel1 = ({ SvgIcon, name, isSelected, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className={`gap- hover-background justify-between  rounded-xl hover:bg-gray-700 w-[122px] h-[100px] mq450:w-[128px] mq450:h-[108px] flex flex-col  items-start text-white text-[20px] font-bold leading-[30px] p-4 m-0 md:m-2 ${
        isSelected
          ? "bg-gradient-to-r from-rose-500 to-orange-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-orange-500 border-[1px] border-neutral-200"
          : "bg-neutral-800"
      } rounded cursor-pointer transition-colors duration-200`}
      // className={`gap-4 hover-background calculator-btn1 w-[128px] h-[108px] flex flex-col justify-start items-start text-[#FFFFFF] text-[20px] font-bold leading-[30px] p-4 m-0 md:m-2 bg-gray-800 rounded ${isSelected ? " bg-red-300" : "bg-gray-800"}`}
    >
      <SvgIcon />
      <span className="text-[#E5E5E5] text-[14px] mq450:text-[12px] font-semibold leading-normal whitespace-normal break-words">
        {name}
      </span>
    </div>
  );
};

export default IconsLabel1;
