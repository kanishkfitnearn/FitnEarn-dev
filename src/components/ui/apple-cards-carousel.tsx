"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
// import { useOutsideClick } from "@/hooks/use-outside-click";
import { El_Messiri } from "next/font/google";
const el_messiri = El_Messiri({ subsets: ["latin"], weight: "400" });
import Link from "next/link";

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  description: string;

  _id: string;
  id:string;
  images: any;
  name: string;
  experienceLevel: string;
  level: number;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const getLevel = (experience: string) => {
    let level;
    if (experience === undefined) {
      level = "Lv.0";
    }
    if (experience === "Beginner") {
      level = "Lv.1";
    }
    if (experience === "Intermediate") {
      level = "Lv.2";
    }
    if (experience === "Expert") {
      level = "Lv.3";
    }
    return level;
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.category}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.name}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.name}
              </motion.p>
              {/* <div className="py-10">{card.content}</div> */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Link
        href={`/coach/${card.id}`}
        // layoutId={layout ? `card-${card.title}` : undefined}
        // onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative w-full h-full z-40">
          <div className="absolute bottom-0 w-full flex flex-col justify-center items-center gap-1 md:gap-4">
            <motion.p
              layoutId={layout ? `category-${card.name}` : undefined}
              className="text-white text-[24px] md:text-[36px] font-bold font-sans text-left"
            >
              <span className={el_messiri.className}>{card.name}</span>
            </motion.p>
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-white text-lg md:text-[20px] font-bold font-sans text-left"
            >
              <span className={el_messiri.className}>{card.category}</span>
            </motion.p>
          </div>
        </div>

        <div className="relative h-full w-full  z-40 ">
          <div className="absolute bottom-9 w-full flex justify-between items-center">
            <motion.p
              layoutId={layout ? `title-${card.experienceLevel}` : undefined}
              className="text-white text-base md:text-lg font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2
               flex justify-center items-center gap-1 pl-3 md:pl-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  fill="url(#paint0_linear_1398_11763)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1398_11763"
                    x1="-0.384615"
                    y1="6.38298"
                    x2="10.3366"
                    y2="6.38472"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
              {card.experienceLevel}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.experienceLevel}` : undefined}
              className="text-white text-base md:text-lg  font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2
              flex justify-center items-center gap-1 pr-3 md:pr-6"
            >
              {getLevel(card.experienceLevel) === "Lv.1" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.5 22.5H16.5V3H22.5V22.5ZM18 21H21V4.5H18V21ZM15 22.5H9V9H15V22.5ZM10.5 21H13.5V10.5H10.5V21ZM7.5 22.5H1.5V13.5H7.5V22.5Z"
                    fill="url(#paint0_linear_8368_40656)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8368_40656"
                      x1="0.692308"
                      y1="15.4468"
                      x2="23.2068"
                      y2="15.4507"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                ""
              )}
              {getLevel(card.experienceLevel) === "Lv.2" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.5 22.5H16.5V3H22.5V22.5ZM18 21H21V4.5H18V21ZM15 22.5H9V9H15V22.5ZM7.5 22.5H1.5V13.5H7.5V22.5Z"
                    fill="url(#paint0_linear_8368_40658)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8368_40658"
                      x1="0.692308"
                      y1="15.4468"
                      x2="23.2068"
                      y2="15.4507"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                ""
              )}
              {getLevel(card.experienceLevel) === "Lv.3" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.5 22.5H16.5V3H22.5V22.5ZM15 22.5H9V9H15V22.5ZM7.5 22.5H1.5V13.5H7.5V22.5Z"
                    fill="url(#paint0_linear_8368_40660)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8368_40660"
                      x1="0.692308"
                      y1="15.4468"
                      x2="23.2068"
                      y2="15.4507"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                ""
              )}
              <span>{getLevel(card.experienceLevel)}</span>
            </motion.p>
          </div>
        </div>
        <BlurImage
          src={card.images}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </Link>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
