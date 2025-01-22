"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import GradualSpacing from "@/components/ui/gradual-spacing";

const MidHeadingAnimation = ({
  head4,
  head1,
  head2,
}: {
  head4: string;
  head1: string;
  head2: string;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track screen size
  const controls = useAnimation();

  // Check viewport width in the browser
  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsSmallScreen(window.matchMedia("(max-width: 768px)").matches);
      }
    };

    updateScreenSize(); // Check size on component mount
    window.addEventListener("resize", updateScreenSize); // Update on resize

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // Intersection Observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);



  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1 },
      });
    } else {
      controls.start({
        x: isSmallScreen ? "0vw" : "10vw", // Keep animations within viewport
        opacity: 0,
      });
    }
  }, [isInView, controls, isSmallScreen]);
  

  return (
    <div ref={sectionRef} className="flex flex-col items-center overflow-hidden">
      <div className="flex flex-col justify-center items-center mt-[40px] md:mt-[50px] mb-8">
        {isSmallScreen ? (
          <h4 className="mid-heading text-[20px] font-normal">{head4}</h4>
        ) : (
          <motion.h4
            className="mid-heading text-[20px] md:text-4xl font-normal"
            animate={controls}
            initial={{ x: 100, opacity: 0 }}
          >
            {head4}
          </motion.h4>
        )}

        <div className="relative w-full h-full max-h-[150px] max-w-[90vw] flex justify-center items-center text-center">
          {/* <h1 className="core-feature w-full h-full text-[36px] md:text-[105px] font-bold leading-normal relative"> */}
          <h1 className="core-feature w-full h-full max-h-[150px] text-[36px] md:text-[105px] font-bold leading-normal relative">
            {head1}
          </h1>
          <motion.div
            className="text-[#FFFFFF] subHead absolute inset-0 flex items-center justify-center"
            animate={controls}
            initial={{ x: isSmallScreen ? "0vw" : "10vw", opacity: 0 }}
          >
            {isInView && (
              <GradualSpacing
                className="text-[#FFFFFF] subHead w-full max-w-[90vw] text-[20px] md:text-[66px] font-bold md:font-extrabold leading-normal"
                text={`${head2}`}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MidHeadingAnimation;
