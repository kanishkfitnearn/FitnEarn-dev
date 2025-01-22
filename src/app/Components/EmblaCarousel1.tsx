"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
};

interface AvatarImage {
  _id: string;
  user_image_url: string;
  img_id: string;
  __v: number;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const [avatarImages, setAvatarImages] = useState<AvatarImage[]>([]);
  const [focusedImage, setFocusedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [err, setErr] = useState<string>();

  const email = Cookies.get("email");
  const userID = Cookies.get("user_id");
  const router = useRouter();

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (avatarImages.length === 0) return;
      const slideIndex = emblaApi.selectedScrollSnap();
      const selectedImage = avatarImages[slideIndex];
      if (selectedImage) {
        setFocusedImage(selectedImage.user_image_url);
      } else {
        setFocusedImage(null);
      }
    },
    [avatarImages],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale)
      .on("select", () => onSelect(emblaApi));
  }, [emblaApi, tweenScale, onSelect]);

  const fetchAllAvatars = () => {
    axios
      .get(`${apiEndpoint}/api/fitnearn/web/users/onboarding/avatar-images/all`)
      .then((response) => {
        setIsLoading(false);
        //console.log(response);
        setAvatarImages(response.data.avatarImages);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllAvatars();
  }, []);

  const handleContinue = () => {
    if (focusedImage) {
      setIsAdded(true);
      //console.log(focusedImage);
      axios
        .post(
          `${apiEndpoint}/api/fitnearn/web/users/onboarding/upload/avatar-image`,
          {
            email: email,
            user_image_url: focusedImage,
          },
        )
        .then((response) => {
          //console.log("Avatar selected:", response.data);
          setIsAdded(false);
          if (response.data.success) {
            window.location.reload();
            router.push(`/profile/${userID}`);
          }
        })
        .catch((error) => {
          setIsAdded(false);
          setErr(error.response?.data?.message || "An error occurred");
          //console.error("Error sending avatar:", error);
        });
    } else {
      //console.log("No avatar is focused");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <h1 className="text-white text-[36px] text-center">Loading...</h1>
      ) : (
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {avatarImages.map((image) => (
                <div className="embla__slide" key={image.img_id}>
                  <div className="embla__slide__number">
                    <Image
                      src={image.user_image_url}
                      alt="avatar"
                      className="rounded-full border-[2px] border-[#FB923C]"
                      width={110}
                      height={110}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleContinue}
        className="primaryButton w-[270px] md:w-[393px] h-[43px] rounded-[8px] py-2 text-[#DADADA] mt-8"
      >
        {isAdded ? "Loading..." : "Continue"}
      </button>
      {err ? (
        <span className="flex gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8.66602 9.33203H7.33268V5.9987H8.66602M8.66602 11.9987H7.33268V10.6654H8.66602M0.666016 13.9987H15.3327L7.99935 1.33203L0.666016 13.9987Z"
              fill="#EF4444"
            />
          </svg>
          <span className="text-[#EF4444] text-[12px] leading-normal font-extrabold ">
            {err}
          </span>
        </span>
      ) : (
        ""
      )}

      <style jsx>{`
        .embla {
          max-width: 48rem;
          margin: auto;
          --slide-height: 19rem;
          --slide-spacing: 1rem;
          --slide-size: 55%;
        }
        .embla__viewport {
          overflow: hidden;
        }
        .embla__container {
          backface-visibility: hidden;
          display: flex;
          touch-action: pan-y pinch-zoom;
          margin-left: calc(var(--slide-spacing) * -1);
        }
        .embla__slide {
          flex: 0 0 var(--slide-size);
          min-width: 0;
          max-width: 120px;
          padding-left: var(--slide-spacing);
        }
        .embla__slide__number {
          box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
          // border-radius: 50%;
          font-size: 4rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          // height: var(--slide-height);
          height: 120px;
        }
      `}</style>
    </div>
  );
};

export default EmblaCarousel;
