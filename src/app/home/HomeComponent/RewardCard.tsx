"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const RewardCard = ({
  title,
  description,
  maxWidth,
  direction,
  changeFor,
  children,
}: {
  title: string;
  description: string;
  maxWidth: number;
  direction: "start" | "end";
  changeFor: string;
  children: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width to detect mobile devices
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      x: isMobile ? (direction === "start" ? 20 : -20) : direction === "start" ? 100 : -100, // Adjust movement for mobile
    },
    visible: {
      opacity: 1,
      x: 0, // Move to the center
    },
  };

  return (
    <motion.div
      className={`flex flex-col justify-center md:justify-${direction} items-center md:items-${direction} text-center`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={variants}
    >
      {children}
      
      {changeFor === "home" ? (
        <h3
        className={`text-[24px] md:text-[28px] text-[#FAFAFA] font-bold leading-normal mb-3 ${direction === "end" ? "pr-3" : "pl-3"
          }`}
      >
        {title}
      </h3>
      ): (
        <h3
        className={`text-[20px] text-[#FAFAFA] text-center md:text-right font-bold leading-normal mb-3 ${direction === "end" ? "pr-3" : "pl-3"
          }` }
          style={{ maxWidth : "283px" }}
      >
        {title}
      </h3>
      )}
      {changeFor === "home" ? (
        <p
          className={`text-[18px] md:text-[20px] text-[#FFFFFF] font-semibold leading-normal ${direction === "end"
              ? "text-center md:text-right pr-3"
              : "text-center md:text-left pl-3"
            }`}
          style={{ maxWidth }}
        >
          {description}
        </p>
      ) : (
        (changeFor === "coach" ? (
          <p
          className={`text-[16px] text-[#D4D4D4] font-normal leading-normal ${direction === "end"
              ? "text-center md:text-right pr-3"
              : "text-center md:text-left pl-3"
            }`}
          style={{ maxWidth }}
        >
          {description}
        </p>
        ) : (
          <p
          className={`text-[14px] text-[#D4D4D4] font-normal leading-normal ${direction === "end"
              ? "text-center md:text-right pr-3"
              : "text-center md:text-left pl-3"
            }`}
          style={{ maxWidth }}
        >
          {description}
        </p>
        ))
        
      )}

    </motion.div>
  );
};

export default RewardCard;
