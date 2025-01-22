"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CoachHeader from "../../../../public/coachHeader.png";
import CoachProfile from "../../../../public/coachProfile.png";
// import { Button } from "@/components/ui/button";
import CoachAbout from "@/app/Components/CoachAbout";
import CoachExperience from "@/app/Components/CoachExperience";
import CoachCertificate from "@/app/Components/CoachCertificate";
import CoachWorkoutVideos from "@/app/Components/CoachWorkoutVideos";
import axios from "axios";
import { HeaderImageSkeleton, ResponsiveImageSkeleton } from "@/app/Components/skeletons/BlogSkeleton";

type Coach = {
  coverImage: string;
  profileImage: string;
  name: string;
  category: string;
  categoryLevel: string;
};

export default function CoachDetails({ params }: any) {
  const [isSelect, setIsSelect] = useState("about");
  const [coachDetails, setCoachDetails] = useState<Coach>();

  const fetchCoachDetails = async () => {
    const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/coach/profile/${params.coachId}`,
      );
      //console.log(response.data);
      if (response.data.success) {
        setCoachDetails(response.data.data);
      }
    } catch (error) {
      //console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchCoachDetails();
  }, []);

  return (
    <div className="pt-[70px] md:pt-[92px]">
      {/* <h1 className="text-white">Coach Id : {params.coachId}</h1> */}

      <div className="h-[330px] md:h-[600px] mt-5 relative">
        <div className="relative flex items-center justify-center mq450:px-4">
          {
            coachDetails && coachDetails.coverImage ?
            (
              <Image
              src={coachDetails.coverImage }
              alt="Coach Header"
              height={444}
              width={1000}
              className="w-full h-[224px] mq450:max-w-[440] lg:w-[1260px] md:w-[1000px] lg:h-[444px] md:h-[444px] rounded-[20px]"
            />
            ) : (
              <HeaderImageSkeleton/>
            )
          }
        </div>

        <div className="flex md:w-[100vw]">
          <div className="flex flex-col md:gap-1 gap-10 md:flex-row items-start md:items-end absolute bottom-0 md:bottom-[45px] left-4 md:left-[137px]">
            <div>
              {coachDetails && coachDetails.profileImage ?
              (
                <Image
                src={coachDetails?.profileImage}
                alt="coach profile"
                width={200}
                height={200}
                className="w-[84px] md:w-[200px] h-[84px] md:h-[200px] rounded-full"
              />
              ) : (
                <ResponsiveImageSkeleton/>
              )
              }
            </div>
            <div className="relative w-[200px] md:w-[400px] mt-4 md:mt-0 md:ml-[27px]">
              <div className="absolute bottom-0 md:bottom-4">
                <h1 className="text-[#FFF] text-[18px] md:text-[48px] font-bold leading-normal">
                  {coachDetails && coachDetails.name}
                </h1>
                <span className="w-full text-[#262626] bg-[#FFEDD5] text-[12px] md:text-[20px] font-semibold rounded-[12px] leading-normal py-[2px] px-4">
                  {coachDetails && coachDetails.categoryLevel}:{" "}
                  {coachDetails && coachDetails.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="w-full flex justify-start items-center  md:border-b-[2px] border-red-500 overflow-x-auto whitespace-nowrap px-2 md:px-0 mt-6 md:mt-0 pb-0">
        <div
          className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.32px] md:tracking-[0.48px] py-[14px] px-4 cursor-pointer mq450:border-b-[2px] mq450:border-[#f43f5e] ${
            isSelect === "about" ? "selectedNav" : ""
          }`}
          onClick={() => setIsSelect("about")}
        >
          About
        </div>
        <div
          className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.48px] py-[14px] px-4 cursor-pointer mq450:border-b-[2px] mq450:border-[#f43f5e] ${
            isSelect === "experience" ? "selectedNav" : ""
          }`}
          onClick={() => setIsSelect("experience")}
        >
          Experience
        </div>
        <div
          className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.48px] py-[14px] px-4 cursor-pointer mq450:border-b-[2px] mq450:border-[#f43f5e] ${
            isSelect === "certificate" ? "selectedNav" : ""
          }`}
          onClick={() => setIsSelect("certificate")}
        >
          License & Certifications
        </div>
        <div
          className={`inline-block md:flex-1 text-[#E5E5E5] text-[16px] md:text-[24px] text-center font-semibold leading-normal tracking-[0.48px] py-[14px] px-4 cursor-pointer mq450:border-b-[2px] mq450:border-[#f43f5e] ${
            isSelect === "workoutVideos" ? "selectedNav" : ""
          }`}
          onClick={() => setIsSelect("workoutVideos")}
        >
          Workout Videos
        </div>
      </nav>

      <div>
        {isSelect === "about" && coachDetails ? (
          <CoachAbout data={coachDetails} id={params.coachId} />
        ) : (
          ""
        )}
        {isSelect === "experience" && coachDetails ? (
          <CoachExperience data={coachDetails} id={params.coachId} />
        ) : (
          ""
        )}
        {isSelect === "certificate" && coachDetails ? (
          <CoachCertificate data={coachDetails} id={params.coachId} />
        ) : (
          ""
        )}
        {isSelect === "workoutVideos" && coachDetails ? (
          <CoachWorkoutVideos data={coachDetails} id={params.coachId} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
