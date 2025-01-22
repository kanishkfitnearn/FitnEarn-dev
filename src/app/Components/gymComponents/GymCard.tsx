import React from "react";
import dummyImg from "../../../../public/blogImg.jpg";
import Image from "next/image";
import Link from "next/link";

type GymCardProps = {
    id: number;
    imageUrl: string;
    label: string;
    name: string;
    distance: string;
    status: string;
    categories: string;
    location: string;
    rating: number;
    reviews: number;
    buttonText: string;
};

const GymCard: React.FC<GymCardProps> = ({
    id,
    imageUrl,
    label,
    name,
    distance,
    status,
    categories,
    location,
    rating,
    reviews,
    buttonText,
}) => {
    return (
        <div className="max-w-xs rounded-lg shadow-lg">
            <div className="relative">
                <Image
                    src={dummyImg}
                    alt="gym banner"
                    layout="fixed"
                    width={350}
                    height={300}
                    className="rounded-[16px] object-cover w-[350px] h-[300px]"
                    loading="lazy"
                />
                <span className="absolute gymTag top-4 left-4 px-2 py-1 text-[#FFFFFF] text-base font-bold">
                    {label}
                </span>
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white">{name}</h3>
                    <p className="text-sm flex items-center gap-1 font-semibold text-[#D4D4D4]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8.0002 1.3335C7.02788 1.33255 6.07384 1.59769 5.24143 2.10019C4.40903 2.6027 3.73 3.3234 3.27792 4.18423C2.82584 5.04506 2.61794 6.01319 2.67675 6.98373C2.73555 7.95427 3.05882 8.89022 3.61153 9.69016C3.63365 9.73364 3.66048 9.77455 3.69153 9.81217L3.77153 9.9095C3.8462 10.0062 3.92286 10.0995 3.98886 10.1762L7.48553 14.4255C7.54823 14.5012 7.62688 14.562 7.71585 14.6038C7.80483 14.6455 7.90193 14.667 8.0002 14.6668C8.09874 14.6669 8.19607 14.6451 8.28518 14.603C8.37428 14.5609 8.45296 14.4996 8.51553 14.4235L11.9102 10.2868C12.0477 10.139 12.1764 9.98315 12.2955 9.82016L12.3802 9.71683C12.4124 9.67766 12.4398 9.63467 12.4615 9.58883C12.9884 8.78439 13.2879 7.85248 13.3285 6.89174C13.369 5.93099 13.1491 4.97715 12.6919 4.13118C12.2347 3.28521 11.5573 2.57859 10.7314 2.08609C9.9055 1.59359 8.9618 1.33356 8.0002 1.3335ZM8.0002 4.66683C8.39576 4.66683 8.78244 4.78413 9.11134 5.00389C9.44024 5.22366 9.69658 5.53601 9.84796 5.90146C9.99933 6.26692 10.0389 6.66905 9.96177 7.05701C9.8846 7.44497 9.69412 7.80134 9.41441 8.08105C9.13471 8.36075 8.77834 8.55123 8.39038 8.6284C8.00242 8.70557 7.60028 8.66597 7.23483 8.51459C6.86938 8.36322 6.55702 8.10687 6.33726 7.77797C6.1175 7.44907 6.0002 7.06239 6.0002 6.66683C6.0002 6.1364 6.21091 5.62769 6.58598 5.25262C6.96106 4.87755 7.46976 4.66683 8.0002 4.66683Z" fill="url(#paint0_linear_14081_30607)" />
                            <defs>
                                <linearGradient id="paint0_linear_14081_30607" x1="2.25675" y1="9.84414" x2="13.6922" y2="9.84562" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F43F5E" />
                                    <stop offset="1" stopColor="#FB923C" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {distance}
                    </p>
                    <p className={`text-base text-[#E5E5E5] font-bold`}>{status}</p>
                    <p className="text-sm text-[#D4D4D4] font-normal ">{categories}</p>
                </div>
                <div className="flex flex-col justify-evenly items-end">
                    <p className="text-lg flex items-center gap-1 font-bold text-[#E5E5E5]">{location}</p>
                    <p className="text-sm font-semibold text-[#D4D4D4] flex items-center">
                        <span className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clipPath="url(#clip0_14081_30621)">
                                    <path d="M10.8679 0.5L4 9.56641H6.87891L4.51514 16.5L11.7413 7.48244H8.75337L10.8679 0.5Z" fill="url(#paint0_linear_14081_30621)" />
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_14081_30621" x1="3.70226" y1="10.7128" x2="12.0019" y2="10.7134" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F43F5E" />
                                        <stop offset="1" stopColor="#FB923C" />
                                    </linearGradient>
                                    <clipPath id="clip0_14081_30621">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        {rating} ({reviews})
                    </p>
                    <Link href={`/gyms/${id}`} className="w-full px-[20px] py-2 gymBookBtn text-[14px] leading-[21px] font-medium text-[#FFF] rounded-lg border-[1px] border-[#F43F5E]">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GymCard;

