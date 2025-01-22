"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const PersonalizedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null); // Ref for the section
  const [isInView, setIsInView] = useState(false); // Track if the section is in view
  const controls = useAnimation(); // Animation controls from Framer Motion

  // Adjust animation offset for small devices
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
  const animationOffset = isSmallScreen ? 10 : 100; // Smaller offset on small screens

  // Use IntersectionObserver to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting); // Update state based on visibility
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
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

  // Trigger animation when the section is in view
  useEffect(() => {
    if (isInView) {
      controls.start({ x: 0, opacity: 1, transition: { duration: 1 } }); // Animate in
    } else {
      controls.start({ x: animationOffset, opacity: 0 }); // Reset when out of view
    }
  }, [isInView, controls, animationOffset]);

  return (
    <>
      <motion.div
        ref={sectionRef}
        className="flex-1 flex flex-col justify-center items-start gap-3 md:gap-5 mq450:mb-10"
        animate={controls}
        initial={{ x: 100, opacity: 0 }} // Start off-screen to the right
      >
        <h1 className="text-[40px] md:text-[50px] max-w-[454px] text-[#F5F5F5] font-black md:font-extrabold leading-normal">
          Personalised Plans For You
        </h1>
        <h2 className="text-[24px] md:text-[32px] max-w-[454px] mid-heading font-semibold md:font-medium leading-normal">
          Your Goals, Our Guided Plans
        </h2>
        <p className="text-[18px] md:text-[20px] max-w-[454px] text-[#D4D4D4] font-normal leading-normal">
          Beginners to pros, FitnEarn offers structured workout to strengthen,
          tone, and build endurance. Choose your workout plan and start your
          journey to a healthier, fitter you.
        </p>
      </motion.div>
    </>
  );
};

export default PersonalizedSection;
