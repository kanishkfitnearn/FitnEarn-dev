"use client";
import { Typewriter} from "react-simple-typewriter";
export function TypewriterEffectSmoothDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="mid-heading text-[32px] font-semibold leading-normal">
            <Typewriter
                words={['Your Fitness Adventure Begins Here!']}
                loop={1}
                cursor
                cursorStyle="|"
                cursorColor="white"
                cursorBlinking
                typeSpeed={30}
                deleteSpeed={70}
                delaySpeed={600}
            />
            </span>
        </div>
  );
}
