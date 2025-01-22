import React from "react";
import Image from "next/image";
import Link from "next/link";

type cardProps = {
  id: number;
  imageUrl: string; // Accept imageUrl as a prop
  label: string;
  name: string;
  description: string;
  price: string;
  discounted_price: number;
  discount: string;
  AddToBag: string;
  rating: number;
  reviews: number;
  buttonText: string;
};

const Card: React.FC<cardProps> = ({
  id,
  imageUrl, // Use the dynamic imageUrl prop
  label,
  name,
  description,
  price,
  discounted_price,
  discount,
  AddToBag,
  rating,
  reviews,
  buttonText,
}) => {
  return (
    <div className="max-w-xs rounded-lg shadow-lg ">
      <div className="relative">
        <Link href={`/ProductInfo/${id}`}>
        <Image
          src={imageUrl} // Use dynamic image URL here
          alt="Yoga_mat" // Alt text can be dynamic too, if needed
          layout="fixed"
          width={380}
          height={300}
          className="rounded-[16px] object-cover w-[380px] h-[300px] cursor-pointer"
          loading="lazy"
        /></Link>
        
        <span className="absolute gymTag top-4 left-4 px-2 py-1 text-[#FFFFFF] text-base font-bold">
          {label}
        </span>
      </div>

      <div className="mt-4 flex justify-evenly">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <p className="text-sm flex items-center gap-1 text-[#D4D4D4]">
            {description}
          </p>
          <p className={`text-base text-[#E5E5E5] font-bold`}>{price}</p>
          <p className="text-sm text-[#D4D4D4] font-normal ">
            {discounted_price} {discount}
          </p>
        </div>
        <div className="flex flex-col items-end w-[60%] gap-7">
          <p className="text-lg flex items-center gap-1 font-bold text-[#E5E5E5]">
            {AddToBag}
          </p>
          <p className="text-sm font-semibold text-[#D4D4D4] flex items-center">
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <g clipPath="url(#clip0_14081_30621)">
                  <path
                    d="M10.8679 0.5L4 9.56641H6.87891L4.51514 16.5L11.7413 7.48244H8.75337L10.8679 0.5Z"
                    fill="url(#paint0_linear_14081_30621)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_14081_30621"
                    x1="3.70226"
                    y1="10.7128"
                    x2="12.0019"
                    y2="10.7134"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                  <clipPath id="clip0_14081_30621">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            {rating} ({reviews})
          </p>
          <Link
            href={`/gyms/${id}`}
            className="w-full px-[30px] py-2 gymBookBtn text-[14px] leading-[21px] font-medium text-[#FFF] rounded-lg border-[1px] border-[#F43F5E]"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
