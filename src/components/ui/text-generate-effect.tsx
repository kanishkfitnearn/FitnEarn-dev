"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 1,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  let wordsArray = words.split(" ");
  const paragraphs = words.split(/\n{2,}|\n/).filter(Boolean)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.07),
        }
      );
    }
  }, [isVisible, animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="space-y-6">
      {paragraphs.map((paragraph, pIdx) => (
        <motion.p key={pIdx} className="text-center">
          {paragraph.split(' ').map((word, idx) => (
            <React.Fragment key={`${pIdx}-${idx}`}>
              <motion.span
                className="inline-block font-normal text-white opacity-0 "
                style={{
                  filter: filter ? 'blur(8px)' : 'none',
                }}
              >
                {word}
              </motion.span>
              {idx < paragraph.split(' ').length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </motion.p>
      ))}
    </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-3xl leading-snug tracking-wide text-white mq450:text-[20px] dark:text-white">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;