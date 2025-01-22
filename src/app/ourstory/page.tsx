import { Timeline } from "@/components/ui/timeline";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
// import NumberTicker from "@/components/magicui/number-ticker";
import NumberTicker from "@/components/ui/number-ticker";
import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FocusCards } from "@/components/ui/focus-cards";

import TextReveal from "@/components/ui/text-reveal";
import MidHeadingAnimation from "../Components/midHeadingAnimation";

const page = () => {
  const timelineData = [
    {
      title: "2020",
      content: (
        <div className="p-6 rounded-lg shadow-lg bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative w-full md:w-1/2 h-[300px]  md:mt-7">
              <Image
                src="/ourstorygif9.gif"
                alt="Project Kickoff"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-3 text-lg font-semibold text-white">
                A spark in a crisis
              </h4>
              <p className="mb-4 text-neutral-300">
                The COVID-19 pandemic transformed lives worldwide, forcing
                people indoors to stay safe. While this brought safety, it also
                led to anxiety and isolation. Saransh found himself in this
                predicament—his gym closed, he was left without the one thing
                that kept him grounded. Witnessing the widespread lack of
                awareness about health and wellness in India during this time
                ignited a realization: there was a pressing need for a health
                and fitness platform that offered easy accessibility and a
                diverse range of fitness solutions for everyone. This was the
                moment the idea behind FitnEarn was born.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm text-red-200 border border-red-800 rounded-full bg-red-900/50">
                  Covid breakout
                </span>
                {/* <span className="px-3 py-1 text-sm text-green-200 border border-green-800 rounded-full bg-green-900/50">
                 Covid-19
                </span> */}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="p-6 rounded-lg shadow-lg bg-neutral-900/50 backdrop-blur-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative w-full h-[300px]">
              <Image
                src="/ourstorygif5.gif"
                alt="Beta Release"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative w-full h-[300px]">
              <Image
                src="/ourstorygif18.gif"
                alt="User Testing"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="mt-6">
            <h4 className="mb-3 text-lg font-semibold text-white">
              From Vision to Collaboration
            </h4>
            <p className="mb-4 text-neutral-300">
              With a seed of inspiration planted, Saransh began discussing his
              vision with friends and family. Although online fitness platforms
              existed, many were expensive or limited in scope. Emerging
              platforms that rewarded walking primarily connected with urban
              youth, leaving a significant gap for a broader audience.Through
              countless brainstorming sessions, the vision for FitnEarn evolved
              into a comprehensive health and fitness product designed for all
              Indians. This year also marked the entry of Suyash—Saransh’s
              younger brother, confidante, and tech enthusiast—into the journey.
              Together, this dynamic duo infused the project with renewed
              enthusiasm and commitment.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-white">1000+</span> Beta
                Users
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-white">50+</span> Features
                Added
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="p-6 rounded-lg shadow-lg bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row-reverse">
            <div className="relative w-full md:w-1/2 h-[300px]">
              <Image
                src="/ourstorygif8.gif"
                alt="Public Launch"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex-1">
              <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-white">
                Laying the Foundation
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-normal text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h4>
              <p className="mb-4 text-neutral-300">
                The year 2022 was dedicated to laying the groundwork. The team
                focused on gathering user feedback, conducting surveys, and
                outlining the product&apos;s preliminary design and
                requirements. After months of research, planning and iterations,
                FitnEarn officially came into existence in July 2022. From that
                point forward, design and project planning took centre stage as
                the team worked tirelessly to bring their vision to life.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-neutral-300">
                    Laying Foundation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-neutral-300">
                    Planning and Execution
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-neutral-300">
                    Ready for Development
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="p-6 rounded-lg shadow-lg bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row-reverse">
            <div className="relative w-full md:w-1/2 h-[300px]">
              <Image
                src="/ourstorygif19.gif"
                alt="Public Launch"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex-1">
              <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-white">
                Overcoming Challenges
                <a
                  target="_blank"
                  href="https://www.instagram.com/fitearn/"
                  className="inline-flex items-center text-sm font-normal text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h4>
              <p className="mb-4 text-neutral-300">
                As development progressed rapidly throughout 2023, we faced
                typical startup hurdles. Team dynamics shifted as members joined
                and left, impacting timelines and workflows. Recognizing the
                need for stability, Saransh and Suyash focused on expanding
                their team with motivated individuals who shared their passion
                for fitness and innovation.This year was about
                resilience—overcoming challenges together while keeping our eyes
                on our mission.
              </p>
              {/* <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-neutral-300">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-neutral-300">
                    Enterprise-ready
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-neutral-300">
                    Full API Support
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="p-6 rounded-lg shadow-lg bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative w-full md:w-1/2 h-[300px] md:mt-5">
              <Image
                src="/ourstorygif14.gif"
                alt="Project Kickoff"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-3 text-lg font-semibold text-white">
                A Grand Launch and New Beginnings
              </h4>
              <p className="mb-4 text-neutral-300">
                With a dedicated team of 15 enthusiasts on board, we reached the
                final stages of development by September 2024. After rigorous
                testing, we proudly launched the FitnEarn app on Dhanteras in
                October 2024, making it available on both iOS and Android app
                stores. Alongside this milestone, we unveiled our meticulously
                designed website during Diwali celebrations.The response was
                incredible—over hundred of downloads on launch day alone! This
                marks not just a launch but the beginning of a new chapter where
                we strive to make India healthier and fitter.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm text-red-200 border border-red-500 rounded-full bg-red-900/50">
                  App Launch
                </span>
                <span className="px-3 py-1 text-sm text-green-200 border border-green-800 rounded-full bg-green-900/50">
                  300+ Downloads
                </span>
                {/* <span className="px-3 py-1 text-sm text-purple-200 border border-purple-800 rounded-full bg-purple-900/50">
                  TypeScript
                </span> */}
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Way Forward: Our Vision!",
      content: (
        <div className="p-6 rounded-lg shadow-lg bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative w-full md:w-1/2 h-[340px]">
              <Image
                src="/ourstorygif21.gif" // Replace with the actual image path
                alt="Way Forward"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-3 text-lg font-semibold text-white">
                Way Forward: Our Vision for the Future
              </h4>
              {/* <p className="mb-4 text-neutral-300">
                As we look ahead, our ambitious vision includes:
              </p> */}
              <ul className="mb-4 space-y-2 text-neutral-300">
                <li>
                  <span className="font-semibold text-white">
                    Reaching 1 Million Downloads by 2025:
                  </span>{" "}
                  We aim to empower a million individuals to prioritize their
                  health and fitness journeys through our platform by 2025.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Multi-Lingual Support:
                  </span>{" "}
                  To ensure accessibility for everyone, we will offer
                  multi-lingual support across all exercises and workout plans.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Leveraging Technology:
                  </span>{" "}
                  We are dedicated to utilizing cutting-edge technology to
                  enhance user experience.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Offline Integrations:
                  </span>{" "}
                  Recognizing the importance of community in fitness, we will
                  develop offline integrations that supplement our online
                  platform.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const cards = [
    { title: "Saransh Pal", subtitle: "Co-Founder", src: "/Saransh.png" },
    { title: "Suyash Pal", subtitle: "Co-Founder", src: "/Suyash.png" },
    {
      title: "Archita Moitra",
      subtitle: "Head of Content",
      src: "/Archita.png",
    },
    {
      title: "Aniruddha Teke",
      subtitle: "Front End Developer",
      src: "/member-2.png",
    },
    { title: "Zoffi Khan", subtitle: "UI UX Designer", src: "/member-3.png" },
    {
      title: "Swapnil Nichal",
      subtitle: "Front End Developer",
      src: "/Swapnil.png",
    },
    {
      title: "Lokesh Yadav",
      subtitle: "Back End Developer",
      src: "/Lokesh.png",
    },

    { title: "Nikita Jain", subtitle: "UI UX Designer", src: "/Nikita.png" },
    {
      title: "Harsha Vardhan Dasari",
      subtitle: "Graphic Designer",
      src: "/Harsha.png",
    },
    {
      title: "Bhanuprakhar Reddy",
      subtitle: "Video Editor",
      src: "/Bhanuprakash.png",
    },
    { title: "Avijit Bera", subtitle: "App Developer", src: "/Avijit.png" },

    {
      title: "Kanthi Temburni",
      subtitle: "Graphic Designer",
      src: "/Kanthi.png",
    },
    {
      title: "Mukul Tyagi",
      subtitle: "Front-End Developer(Intern)",
      src: "/Mukul.png",
    },
    { title: "Neha Tyagi", subtitle: "Tester(Intern)", src: "/Neha.png" },
  ];

  const words = `Founded in Roorkee, Uttarakhand, by a team of fitness enthusiasts and tech innovators, FitnEarn was born out of a desire to merge the worlds of fitness and technology. Recognizing the need for a platform that not only guides individuals on their fitness journey but also provides an extra layer of motivation, we set out to create FitnEarn. Today, we are proud to offer a comprehensive platform that has helped countless users transform their lives, one reward at a time.

  Whether you're looking to start your fitness journey, seeking motivation to continue, or aiming to reach new heights in your wellness goals, FitnEarn is here for you. Let's embark on this rewarding journey together. Your fitness achievements await, and we can't wait to see where they take you. Join Now!`;

  const words1 = ` 
`;

  return (
    <>
      <div>
        <div className="pt-12 mq450:pt-8">
          <MidHeadingAnimation
            head4="Our Story"
            head1="Our Story"
            head2="FitnEarn Journey"
          />
        </div>
        <Timeline data={timelineData} />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center pb-2 my-5 mq450:my-0 mq450:pt-0">
          <MidHeadingAnimation
            head4="     Our Achievement"
            head1="     Our Achievement"
            head2="  User Goals"
          />
        </div>
        <div className="flex items-start justify-evenly mq450:flex-col ">
          <div className="mq450:justify-center mq450:px-3 mq450:flex mq450:pb-7">
            <div className="w-[538px] mq450:w-auto h-[221px] mq450:h-auto mq450:items-center flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch md:mt-4 mq450:flex mq450:justify-center mq450:items-center text-white text-[34px] font-bold font-Lato">
                Our Core Values
              </div>
              <div className="self-stretch text-[18px] font-medium leading-normal mq450:flex mq450:justify-center mq450:px-3 mq450:items-center text-neutral-200 font-Lato">
                <ul className="pl-5 space-y-2 list-disc">
                  <li>
                    <strong>Fitness First:</strong> We believe a healthier body
                    leads to a sharper mind and better overall well-being. Your
                    fitness is our top priority.
                  </li>
                  <li>
                    <strong>Community Connection:</strong> We foster a
                    supportive environment where fitness enthusiasts can inspire
                    and uplift each other.
                  </li>
                  <li>
                    <strong>Rewarding Progress:</strong> Every step, every
                    workout, every effort counts. We make sure your journey is
                    as rewarding as the destination.
                  </li>
                  <li>
                    <strong>Inclusivity:</strong> Fitness is for everyone. We
                    embrace diversity and ensure our platform caters to all
                    fitness levels and goals.
                  </li>
                  <li>
                    <strong>Continuous Innovation:</strong> We are community to
                    evolving and bringing cutting-edge features to keep your
                    fitness journey exciting and effective.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <svg
            width="473"
            height="431"
            viewBox="0 0 473 431"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mq450:w-[328px] mq450:m-auto"
          >
            <path
              d="M249.5 125C249.5 144.923 244.82 163.753 236.5 180.451C228.18 163.753 223.5 144.923 223.5 125C223.5 105.077 228.18 86.2467 236.5 69.5488C244.82 86.2467 249.5 105.077 249.5 125ZM222.5 125C222.5 144.926 227.144 163.767 235.408 180.501C235.272 180.5 235.136 180.5 235 180.5C186.019 180.5 143.591 208.56 122.916 249.483C55.1177 248.37 0.5 193.063 0.5 125C0.5 56.2406 56.2406 0.5 125 0.5C173.393 0.5 215.337 28.1101 235.939 68.437C227.343 85.4337 222.5 104.651 222.5 125ZM235 181.5C235.303 181.5 235.606 181.501 235.909 181.503C235.919 181.523 235.929 181.543 235.939 181.563C215.337 221.89 173.393 249.5 125 249.5C124.677 249.5 124.354 249.499 124.031 249.496C144.622 209.137 186.583 181.5 235 181.5ZM125 250.5C173.524 250.5 215.617 222.961 236.5 182.659C257.164 222.537 298.592 249.919 346.471 250.491C354.809 267.203 359.5 286.054 359.5 306C359.5 374.759 303.759 430.5 235 430.5C166.241 430.5 110.5 374.759 110.5 306C110.5 286.054 115.19 267.204 123.529 250.492C124.018 250.497 124.509 250.5 125 250.5ZM345.963 249.484C298.432 248.721 257.373 221.323 237.061 181.563C237.069 181.548 237.076 181.532 237.084 181.517C284.614 182.297 325.665 209.712 345.963 249.484ZM237.061 68.437C257.663 28.1101 299.607 0.5 348 0.5C416.759 0.5 472.5 56.2406 472.5 125C472.5 193.759 416.759 249.5 348 249.5C347.697 249.5 347.394 249.499 347.091 249.497C326.782 209.287 285.473 181.492 237.579 180.526C245.852 163.786 250.5 144.936 250.5 125C250.5 104.651 245.657 85.4337 237.061 68.437Z"
              fill="url(#paint0_linear_12617_23753)"
              fill-opacity="0.12"
              stroke="url(#paint1_linear_12617_23753)"
            />
            <path
              d="M244.083 261.643C241.609 262.552 238.717 263.061 235.308 263.185C235.003 263.198 234.685 263.201 234.37 263.204C234.133 263.207 233.906 263.217 233.662 263.217C233.256 263.217 232.867 263.159 232.494 263.051C232.123 263.159 231.734 263.217 231.328 263.217C231.085 263.217 230.857 263.207 230.617 263.204C226.803 263.142 223.602 262.633 220.908 261.643C220.375 261.448 219.856 261.24 219.362 261.01C219.035 260.857 218.72 260.691 218.408 260.519C218.346 260.552 218.281 260.584 218.216 260.617C215.772 261.902 213.292 263.337 211.153 265.003C210.078 265.85 209.078 266.746 208.172 267.911C207.721 268.499 207.293 269.164 206.942 269.986C206.592 270.8 206.322 271.797 206.322 272.93C206.309 274.131 206.673 275.449 207.306 276.488C207.793 277.312 208.481 277.971 209.13 278.393C210.12 279.03 210.964 279.241 211.64 279.371C212.324 279.491 212.889 279.513 213.422 279.517C215.003 279.5 216.473 279.296 218.174 279.095C218.447 279.065 218.726 279.033 219.015 279C221.06 278.767 223.378 278.549 225.9 278.549C227.984 278.552 230.198 278.702 232.497 279.104C234.964 279.539 237.529 280.27 240.142 281.445C240.823 281.75 241.538 281.896 242.242 281.896C244.118 281.896 245.914 280.857 246.816 279.095C246.858 279.017 246.901 278.936 246.936 278.851C248.098 276.254 246.939 273.206 244.349 272.044C240.239 270.193 236.22 269.18 232.494 268.677C230.205 268.369 228.027 268.249 226.011 268.246C226.423 268.051 226.826 267.866 227.212 267.687C228.481 267.106 229.598 266.626 230.387 266.298C230.468 266.262 230.546 266.23 230.624 266.197H234.367C235.379 266.619 237.077 267.346 238.976 268.246C237.921 268.249 236.821 268.281 235.685 268.359C238.827 269.005 241.84 269.973 244.703 271.261C247.719 272.618 249.072 276.179 247.719 279.205C249.053 279.364 250.273 279.504 251.565 279.517C252.28 279.507 253.039 279.487 254.081 279.202C254.597 279.052 255.204 278.822 255.857 278.393C256.506 277.971 257.198 277.316 257.685 276.491C258.314 275.449 258.681 274.141 258.668 272.93C258.668 271.797 258.396 270.8 258.048 269.986C257.376 268.457 256.49 267.437 255.575 266.519C253.964 264.947 252.111 263.694 250.14 262.5C248.975 261.805 247.771 261.139 246.579 260.519C246.271 260.691 245.956 260.857 245.628 261.01C245.135 261.24 244.615 261.448 244.083 261.643Z"
              fill="white"
            />
            <path
              d="M219.113 279.854C218.966 279.87 218.827 279.887 218.684 279.903C219.664 281.172 221.177 281.899 222.748 281.899C223.453 281.899 224.167 281.753 224.852 281.445C226.608 280.656 228.342 280.068 230.043 279.633C228.702 279.491 227.326 279.413 225.897 279.409C223.362 279.409 221.044 279.633 219.113 279.854Z"
              fill="white"
            />
            <path
              d="M234.682 208.251C235.298 208.397 235.896 208.599 236.473 208.862C237.048 209.121 237.593 209.436 238.11 209.806C238.622 210.176 239.096 210.592 239.528 211.056C239.963 211.517 240.346 212.017 240.681 212.556C241.015 213.095 241.294 213.66 241.515 214.254C241.739 214.848 241.901 215.458 242.005 216.085C242.109 216.708 242.151 217.338 242.128 217.974C242.109 218.607 242.028 219.233 241.885 219.85C241.739 220.467 241.538 221.064 241.278 221.642C241.015 222.22 240.7 222.769 240.333 223.285C239.963 223.798 239.548 224.275 239.087 224.707C238.626 225.142 238.126 225.525 237.587 225.859C237.051 226.197 236.486 226.476 235.896 226.7C235.302 226.921 234.694 227.086 234.068 227.19C233.445 227.294 232.818 227.333 232.185 227.313C231.552 227.294 230.929 227.21 230.312 227.067C229.695 226.924 229.098 226.719 228.52 226.46C227.945 226.197 227.4 225.882 226.884 225.512C226.371 225.142 225.897 224.726 225.465 224.265C225.03 223.801 224.647 223.301 224.313 222.762C223.979 222.223 223.699 221.658 223.479 221.064C223.255 220.47 223.092 219.86 222.988 219.237C222.885 218.61 222.842 217.98 222.865 217.347C222.885 216.711 222.966 216.088 223.109 215.468C223.255 214.851 223.456 214.254 223.716 213.676C223.979 213.098 224.293 212.549 224.66 212.036C225.03 211.52 225.446 211.046 225.907 210.611C226.368 210.176 226.868 209.793 227.407 209.459C227.942 209.125 228.507 208.845 229.098 208.621C229.692 208.397 230.299 208.232 230.926 208.131C231.549 208.027 232.175 207.985 232.808 208.005C233.441 208.027 234.068 208.108 234.682 208.251Z"
              fill="white"
            />
            <path
              d="M218.431 259.542C218.726 259.718 219.028 259.883 219.343 260.042C219.469 260.107 219.596 260.169 219.726 260.23C220.109 260.409 220.502 260.578 220.908 260.734C223.482 261.727 226.579 262.253 230.302 262.341C230.565 262.344 230.825 262.354 231.098 262.354C230.724 262.074 230.4 261.74 230.137 261.357C229.659 260.665 229.377 259.828 229.377 258.925C229.377 257.76 229.845 256.702 230.601 255.926C230.757 255.767 230.926 255.621 231.107 255.488C229.89 255.481 228.793 255.42 227.809 255.312C224.439 254.946 222.359 254.059 221.219 253.147C221.109 253.059 221.005 252.972 220.908 252.884C220.333 252.365 219.969 251.832 219.703 251.232C219.593 250.975 219.508 250.696 219.434 250.404C219.31 249.901 219.239 249.349 219.239 248.732C219.213 246.866 219.908 244.532 220.908 242.431V251.608C221.132 251.917 221.398 252.196 221.748 252.475C222.758 253.28 225.332 254.631 231.27 254.631H231.328C231.734 254.631 232.123 254.692 232.497 254.799C232.867 254.692 233.26 254.631 233.662 254.631H233.724C239.658 254.631 242.232 253.28 243.242 252.475C243.592 252.199 243.859 251.917 244.083 251.608V242.431C245.086 244.532 245.777 246.866 245.751 248.732C245.751 249.349 245.68 249.901 245.556 250.404C245.482 250.696 245.397 250.975 245.287 251.232C245.021 251.832 244.661 252.365 244.083 252.884C243.985 252.972 243.885 253.059 243.774 253.147C242.297 254.326 239.259 255.465 233.886 255.488C233.808 255.488 233.737 255.491 233.662 255.491C233.266 255.491 232.89 255.559 232.536 255.682C232.523 255.689 232.51 255.692 232.497 255.699C232.166 255.819 231.857 255.988 231.581 256.199C230.763 256.828 230.234 257.812 230.234 258.925C230.234 259.166 230.26 259.399 230.306 259.623C230.549 260.799 231.39 261.75 232.497 262.152C232.86 262.285 233.253 262.36 233.662 262.36C233.74 262.36 233.815 262.354 233.896 262.354C234.165 262.354 234.425 262.344 234.688 262.341C234.987 262.331 235.289 262.328 235.581 262.315C238.911 262.169 241.716 261.646 244.083 260.734C244.488 260.578 244.881 260.409 245.264 260.23C245.394 260.169 245.521 260.104 245.647 260.042C247.585 259.068 249.163 257.734 250.303 256.186C250.815 255.488 251.244 254.748 251.572 253.978C252.315 252.261 252.607 250.466 252.607 248.732C252.601 245.778 251.799 242.967 250.715 240.451C249.621 237.938 248.235 235.721 246.826 233.991C245.871 232.832 244.959 231.894 243.823 231.15C243.232 230.797 242.586 230.397 241.505 230.28C241.268 230.225 241.025 230.196 240.771 230.196H224.219C223.966 230.196 223.722 230.225 223.485 230.28C222.404 230.397 221.758 230.797 221.167 231.15C220.031 231.894 219.122 232.832 218.164 233.991C216.756 235.721 215.369 237.938 214.275 240.451C213.191 242.967 212.389 245.778 212.383 248.732C212.383 250.466 212.675 252.261 213.418 253.978C213.75 254.748 214.175 255.488 214.688 256.186C215.645 257.484 216.908 258.633 218.431 259.542Z"
              fill="white"
            />
            <path
              d="M127.47 59.7179C132.09 59.6089 135.745 55.7844 135.636 51.1728C135.534 46.5541 131.709 42.9002 127.088 43.0021C122.467 43.103 118.812 46.9356 118.921 51.5543C119.023 56.1659 122.849 59.8269 127.47 59.7179Z"
              fill="white"
            />
            <path
              d="M132.496 93.3444L133.673 101.858C133.968 104.031 135.831 105.597 137.958 105.597C138.153 105.597 138.356 105.581 138.558 105.558C140.927 105.231 142.587 103.042 142.26 100.674L140.639 88.9821C140.382 87.0891 138.909 85.5935 137.031 85.2978L128.981 84.0123L131.584 72.8193L135.745 75.9586C136.899 76.8305 138.457 76.9707 139.742 76.3168L146.911 72.6951C148.781 71.7526 149.53 69.47 148.586 67.6002C147.644 65.7313 145.361 64.9755 143.491 65.926L138.433 68.481L132.402 63.932C131.303 63.1065 130.003 62.5607 128.646 62.3507L123.239 61.5324C122.389 61.4002 121.54 61.4002 120.698 61.5405L110.187 63.1914C109.126 63.3558 108.184 63.9633 107.6 64.8584L102.69 72.3672C101.545 74.12 102.036 76.4722 103.789 77.6175C104.428 78.0383 105.153 78.2331 105.862 78.2331C107.101 78.2331 108.316 77.6256 109.041 76.5196L113.03 70.4206L116.49 69.8747C116.015 72.562 115.602 76.4026 115.174 81.987C114.901 85.5078 116.101 88.1718 118.695 89.9639L113.662 111.688C113.124 114.017 114.573 116.346 116.903 116.891C117.231 116.97 117.566 117 117.885 117C119.857 117 121.642 115.645 122.109 113.644L127.018 92.4716L132.496 93.3444Z"
              fill="white"
            />
            <path
              d="M125.556 107.629H150.942V117H125.556V107.629Z"
              fill="white"
            />
            <path
              d="M150.893 115.513L148.797 108.572C148.657 108.098 148.213 107.77 147.714 107.77H128.982C128.483 107.77 128.046 108.098 127.899 108.572L125.802 115.513C125.584 116.237 126.13 116.97 126.886 116.97H132.262C132.76 116.97 133.197 116.65 133.345 116.175L133.914 114.337H142.781L143.351 116.175C143.499 116.65 143.935 116.97 144.433 116.97H149.81C150.573 116.97 151.111 116.237 150.893 115.513Z"
              fill="white"
            />
            <path
              d="M389.233 84.6884H383.856C383.856 84.4529 383.845 84.219 383.822 83.9851C383.799 83.7511 383.764 83.5205 383.718 83.2899C383.673 83.0593 383.616 82.832 383.548 82.608C383.479 82.3823 383.4 82.1616 383.311 81.9441C383.22 81.7283 383.12 81.5159 383.01 81.3083C382.899 81.1024 382.779 80.9014 382.649 80.7054C382.517 80.5094 382.379 80.3216 382.229 80.1404C382.08 79.9592 381.922 79.7846 381.756 79.6199C381.591 79.4535 381.417 79.2954 381.235 79.1471C381.054 78.9972 380.865 78.8572 380.67 78.7271C380.474 78.597 380.273 78.4767 380.068 78.3663C379.86 78.256 379.648 78.1555 379.43 78.0649C379.214 77.976 378.994 77.8969 378.768 77.8277C378.544 77.7602 378.317 77.7025 378.086 77.6564C377.855 77.6119 377.623 77.5773 377.391 77.5543C377.157 77.5312 376.923 77.5197 376.687 77.5197C375.403 77.5328 374.208 77.8672 373.103 78.5228V77.5197C373.103 77.2841 373.092 77.0502 373.068 76.8163C373.045 76.5824 373.011 76.3518 372.965 76.1212C372.92 75.8906 372.863 75.6632 372.795 75.4392C372.726 75.2136 372.647 74.9928 372.558 74.7754C372.467 74.5596 372.367 74.3471 372.256 74.1396C372.146 73.9337 372.026 73.7327 371.896 73.5367C371.764 73.3423 371.626 73.1529 371.476 72.9717C371.327 72.7905 371.169 72.6159 371.003 72.4511C370.838 72.2848 370.664 72.1266 370.482 71.9784C370.301 71.8285 370.112 71.6901 369.917 71.5583C369.721 71.4282 369.52 71.308 369.314 71.1976C369.107 71.0872 368.894 70.9868 368.677 70.8962C368.461 70.8072 368.24 70.7281 368.015 70.659C367.791 70.5914 367.563 70.5338 367.333 70.4876C367.102 70.4432 366.87 70.4086 366.638 70.3855C366.404 70.3625 366.17 70.3509 365.934 70.3509C365.7 70.3509 365.465 70.3625 365.231 70.3855C364.999 70.4086 364.766 70.4432 364.536 70.4876C364.305 70.5338 364.078 70.5914 363.854 70.659C363.628 70.7281 363.407 70.8072 363.192 70.8962C362.974 70.9868 362.762 71.0872 362.556 71.1976C362.348 71.308 362.147 71.4282 361.951 71.5583C361.757 71.6901 361.568 71.8285 361.386 71.9784C361.205 72.1266 361.032 72.2848 360.866 72.4511C360.699 72.6159 360.541 72.7905 360.393 72.9717C360.243 73.1529 360.105 73.3423 359.973 73.5367C359.843 73.7327 359.723 73.9337 359.612 74.1396C359.502 74.3471 359.401 74.5596 359.311 74.7754C359.222 74.9928 359.143 75.2136 359.074 75.4392C359.006 75.6632 358.948 75.8906 358.904 76.1212C358.858 76.3518 358.823 76.5824 358.8 76.8163C358.777 77.0502 358.766 77.2841 358.766 77.5197V84.6884H337.259V77.5197C337.259 77.2841 337.248 77.0502 337.225 76.8163C337.202 76.5824 337.167 76.3518 337.121 76.1212C337.077 75.8906 337.019 75.6632 336.951 75.4392C336.882 75.2136 336.803 74.9928 336.714 74.7754C336.624 74.5596 336.523 74.3471 336.413 74.1396C336.302 73.9337 336.182 73.7327 336.052 73.5367C335.92 73.3423 335.782 73.1529 335.632 72.9717C335.484 72.7905 335.326 72.6159 335.159 72.4511C334.994 72.2848 334.82 72.1266 334.639 71.9784C334.457 71.8285 334.268 71.6901 334.074 71.5583C333.878 71.4282 333.677 71.308 333.471 71.1976C333.263 71.0872 333.051 70.9868 332.833 70.8962C332.617 70.8072 332.397 70.7281 332.171 70.659C331.947 70.5914 331.72 70.5338 331.489 70.4876C331.258 70.4432 331.026 70.4086 330.794 70.3855C330.56 70.3625 330.326 70.3509 330.091 70.3509C329.857 70.3509 329.621 70.3625 329.387 70.3855C329.155 70.4086 328.923 70.4432 328.692 70.4876C328.462 70.5338 328.234 70.5914 328.01 70.659C327.784 70.7281 327.564 70.8072 327.348 70.8962C327.131 70.9868 326.918 71.0872 326.712 71.1976C326.505 71.308 326.304 71.4282 326.108 71.5583C325.913 71.6901 325.724 71.8285 325.543 71.9784C325.361 72.1266 325.188 72.2848 325.022 72.4511C324.856 72.6159 324.698 72.7905 324.549 72.9717C324.399 73.1529 324.261 73.3423 324.129 73.5367C323.999 73.7327 323.879 73.9337 323.769 74.1396C323.658 74.3471 323.558 74.5596 323.467 74.7754C323.378 74.9928 323.299 75.2136 323.23 75.4392C323.162 75.6632 323.105 75.8906 323.06 76.1212C323.014 76.3518 322.98 76.5824 322.956 76.8163C322.933 77.0502 322.922 77.2841 322.922 77.5197V78.5228C321.817 77.8672 320.622 77.5328 319.337 77.5197C319.104 77.5197 318.868 77.5312 318.634 77.5543C318.402 77.5773 318.17 77.6119 317.939 77.6564C317.708 77.7025 317.481 77.7602 317.257 77.8277C317.031 77.8969 316.811 77.976 316.595 78.0649C316.377 78.1555 316.165 78.256 315.959 78.3663C315.751 78.4767 315.551 78.597 315.354 78.7271C315.16 78.8572 314.971 78.9972 314.789 79.1471C314.608 79.2954 314.435 79.4535 314.269 79.6199C314.103 79.7846 313.944 79.9592 313.796 80.1404C313.646 80.3216 313.508 80.5094 313.376 80.7054C313.246 80.9014 313.126 81.1024 313.015 81.3083C312.905 81.5159 312.805 81.7283 312.714 81.9441C312.625 82.1616 312.546 82.3823 312.477 82.608C312.409 82.832 312.352 83.0593 312.307 83.2899C312.261 83.5205 312.226 83.7511 312.203 83.9851C312.18 84.219 312.169 84.4529 312.169 84.6884H306.792C306.675 84.6884 306.558 84.7 306.443 84.723C306.328 84.7461 306.216 84.779 306.107 84.8251C305.998 84.8696 305.894 84.9256 305.797 84.9899C305.698 85.0557 305.608 85.1299 305.525 85.2139C305.441 85.2962 305.367 85.3868 305.301 85.484C305.237 85.5829 305.181 85.685 305.137 85.7937C305.092 85.9024 305.058 86.0161 305.035 86.1314C305.012 86.2467 305 86.362 305 86.4806V97.2337C305 97.3507 305.012 97.4676 305.035 97.5829C305.058 97.6982 305.092 97.8103 305.137 97.919C305.181 98.0277 305.237 98.1315 305.301 98.2286C305.367 98.3275 305.441 98.4181 305.525 98.5004C305.608 98.5844 305.698 98.6586 305.797 98.7228C305.894 98.7887 305.998 98.8447 306.107 98.8892C306.216 98.9337 306.328 98.9683 306.443 98.9913C306.558 99.0144 306.675 99.0259 306.792 99.0259H312.169C312.169 99.2598 312.18 99.4954 312.203 99.7276C312.226 99.9615 312.261 100.194 312.307 100.424C312.352 100.655 312.409 100.882 312.477 101.106C312.546 101.332 312.625 101.553 312.714 101.769C312.805 101.986 312.905 102.198 313.015 102.404C313.126 102.612 313.246 102.813 313.376 103.009C313.508 103.203 313.646 103.391 313.796 103.574C313.944 103.755 314.103 103.928 314.269 104.094C314.435 104.261 314.608 104.419 314.789 104.567C314.971 104.715 315.16 104.855 315.354 104.986C315.551 105.117 315.751 105.238 315.959 105.348C316.165 105.458 316.377 105.559 316.595 105.648C316.811 105.738 317.031 105.817 317.257 105.885C317.481 105.954 317.708 106.01 317.939 106.056C318.17 106.102 318.402 106.137 318.634 106.16C318.868 106.183 319.104 106.195 319.337 106.195C320.622 106.181 321.817 105.847 322.922 105.191V106.195C322.922 106.429 322.933 106.664 322.956 106.896C322.98 107.13 323.014 107.363 323.06 107.593C323.105 107.824 323.162 108.051 323.23 108.275C323.299 108.499 323.378 108.722 323.467 108.937C323.558 109.155 323.658 109.367 323.769 109.573C323.879 109.781 323.999 109.982 324.129 110.178C324.261 110.372 324.399 110.56 324.549 110.743C324.698 110.924 324.856 111.097 325.022 111.263C325.188 111.43 325.361 111.586 325.543 111.736C325.724 111.884 325.913 112.024 326.108 112.154C326.304 112.286 326.505 112.406 326.712 112.517C326.918 112.627 327.131 112.728 327.348 112.817C327.564 112.907 327.784 112.986 328.01 113.054C328.234 113.123 328.462 113.179 328.692 113.225C328.923 113.271 329.155 113.306 329.387 113.329C329.621 113.352 329.857 113.363 330.091 113.363C330.326 113.363 330.56 113.352 330.794 113.329C331.026 113.306 331.258 113.271 331.489 113.225C331.72 113.179 331.947 113.123 332.171 113.054C332.397 112.986 332.617 112.907 332.833 112.817C333.051 112.728 333.263 112.627 333.471 112.517C333.677 112.406 333.878 112.286 334.074 112.154C334.268 112.024 334.457 111.884 334.639 111.736C334.82 111.586 334.994 111.43 335.159 111.263C335.326 111.097 335.484 110.924 335.632 110.743C335.782 110.56 335.92 110.372 336.052 110.178C336.182 109.982 336.302 109.781 336.413 109.573C336.523 109.367 336.624 109.155 336.714 108.937C336.803 108.722 336.882 108.499 336.951 108.275C337.019 108.051 337.077 107.824 337.121 107.593C337.167 107.363 337.202 107.13 337.225 106.896C337.248 106.664 337.259 106.429 337.259 106.195V99.0259H358.766V106.195C358.766 106.429 358.777 106.664 358.8 106.896C358.823 107.13 358.858 107.363 358.904 107.593C358.948 107.824 359.006 108.051 359.074 108.275C359.143 108.499 359.222 108.722 359.311 108.937C359.401 109.155 359.502 109.367 359.612 109.573C359.723 109.781 359.843 109.982 359.973 110.178C360.105 110.372 360.243 110.56 360.393 110.743C360.541 110.924 360.699 111.097 360.866 111.263C361.032 111.43 361.205 111.586 361.386 111.736C361.568 111.884 361.757 112.024 361.951 112.154C362.147 112.286 362.348 112.406 362.556 112.517C362.762 112.627 362.974 112.728 363.192 112.817C363.407 112.907 363.628 112.986 363.854 113.054C364.078 113.123 364.305 113.179 364.536 113.225C364.766 113.271 364.999 113.306 365.231 113.329C365.465 113.352 365.7 113.363 365.934 113.363C366.17 113.363 366.404 113.352 366.638 113.329C366.87 113.306 367.102 113.271 367.333 113.225C367.563 113.179 367.791 113.123 368.015 113.054C368.24 112.986 368.461 112.907 368.677 112.817C368.894 112.728 369.107 112.627 369.314 112.517C369.52 112.406 369.721 112.286 369.917 112.154C370.112 112.024 370.301 111.884 370.482 111.736C370.664 111.586 370.838 111.43 371.003 111.263C371.169 111.097 371.327 110.924 371.476 110.743C371.626 110.56 371.764 110.372 371.896 110.178C372.026 109.982 372.146 109.781 372.256 109.573C372.367 109.367 372.467 109.155 372.558 108.937C372.647 108.722 372.726 108.499 372.795 108.275C372.863 108.051 372.92 107.824 372.965 107.593C373.011 107.363 373.045 107.13 373.068 106.896C373.092 106.664 373.103 106.429 373.103 106.195V105.191C374.208 105.847 375.403 106.181 376.687 106.195C376.923 106.195 377.157 106.183 377.391 106.16C377.623 106.137 377.855 106.102 378.086 106.056C378.317 106.01 378.544 105.954 378.768 105.885C378.994 105.817 379.214 105.738 379.43 105.648C379.648 105.559 379.86 105.458 380.068 105.348C380.273 105.238 380.474 105.117 380.67 104.986C380.865 104.855 381.054 104.715 381.235 104.567C381.417 104.419 381.591 104.261 381.756 104.094C381.922 103.928 382.08 103.755 382.229 103.574C382.379 103.391 382.517 103.203 382.649 103.009C382.779 102.813 382.899 102.612 383.01 102.404C383.12 102.198 383.22 101.986 383.311 101.769C383.4 101.553 383.479 101.332 383.548 101.106C383.616 100.882 383.673 100.655 383.718 100.424C383.764 100.194 383.799 99.9615 383.822 99.7276C383.845 99.4954 383.856 99.2598 383.856 99.0259H389.233C389.35 99.0259 389.467 99.0144 389.582 98.9913C389.697 98.9683 389.809 98.9337 389.918 98.8892C390.027 98.8447 390.131 98.7887 390.228 98.7228C390.327 98.6586 390.417 98.5844 390.499 98.5004C390.583 98.4181 390.658 98.3275 390.724 98.2286C390.788 98.1315 390.844 98.0277 390.888 97.919C390.934 97.8103 390.967 97.6982 390.99 97.5829C391.013 97.4676 391.025 97.3507 391.025 97.2337V86.4806C391.025 86.362 391.013 86.2467 390.99 86.1314C390.967 86.0161 390.934 85.9024 390.888 85.7937C390.844 85.685 390.788 85.5829 390.724 85.484C390.658 85.3868 390.583 85.2962 390.499 85.2139C390.417 85.1299 390.327 85.0557 390.228 84.9899C390.131 84.9256 390.027 84.8696 389.918 84.8251C389.809 84.779 389.697 84.7461 389.582 84.723C389.467 84.7 389.35 84.6884 389.233 84.6884ZM337.259 95.4415V88.2728H358.766V95.4415H337.259Z"
              fill="white"
            />
            <path
              d="M347.153 77.4499C347.335 77.6251 347.542 77.761 347.777 77.8557C348.011 77.9487 348.254 77.997 348.506 77.997C348.758 77.997 349.001 77.9487 349.234 77.8557C349.468 77.761 349.675 77.6251 349.857 77.4499L364.367 63.3482C364.651 63.0765 364.923 62.7922 365.178 62.4919C365.434 62.1933 365.674 61.8823 365.899 61.5587C366.122 61.2351 366.33 60.9008 366.521 60.5576C366.71 60.2125 366.884 59.8603 367.038 59.4974C367.193 59.1363 367.329 58.768 367.447 58.3926C367.565 58.0172 367.663 57.6364 367.742 57.2502C367.821 56.8641 367.88 56.4761 367.919 56.0846C367.96 55.6931 367.98 55.2998 367.98 54.9065C367.98 54.5132 367.96 54.1217 367.919 53.7302C367.88 53.3387 367.821 52.9489 367.742 52.5646C367.663 52.1784 367.565 51.7976 367.447 51.4222C367.329 51.0468 367.193 50.6785 367.038 50.3156C366.884 49.9545 366.71 49.6005 366.521 49.2573C366.33 48.9122 366.122 48.5797 365.899 48.2561C365.674 47.9325 365.434 47.6215 365.178 47.3211C364.923 47.0226 364.651 46.7365 364.367 46.4648C363.848 45.9678 363.289 45.5173 362.692 45.1151C362.093 44.7146 361.465 44.3678 360.807 44.0746C360.149 43.7814 359.472 43.5472 358.773 43.3738C358.074 43.1986 357.366 43.0842 356.647 43.0323C355.93 42.9805 355.212 42.9912 354.497 43.0627C353.78 43.136 353.075 43.2701 352.382 43.465C351.688 43.6598 351.018 43.9119 350.369 44.223C349.718 44.534 349.101 44.8987 348.515 45.3189C347.929 44.8987 347.312 44.534 346.663 44.223C346.012 43.9119 345.342 43.6598 344.648 43.465C343.954 43.2701 343.25 43.136 342.533 43.0627C341.818 42.9912 341.099 42.9805 340.382 43.0323C339.664 43.0842 338.956 43.1986 338.257 43.3738C337.558 43.5472 336.88 43.7814 336.222 44.0746C335.565 44.3678 334.937 44.7146 334.338 45.1151C333.741 45.5173 333.181 45.9678 332.663 46.4648C332.379 46.7365 332.107 47.0226 331.851 47.3211C331.596 47.6215 331.356 47.9325 331.133 48.2561C330.907 48.5797 330.7 48.9122 330.511 49.2573C330.319 49.6005 330.146 49.9545 329.992 50.3156C329.837 50.6785 329.701 51.0468 329.583 51.4222C329.467 51.7976 329.368 52.1784 329.288 52.5646C329.209 52.9489 329.15 53.3387 329.111 53.7302C329.071 54.1217 329.05 54.5132 329.05 54.9065C329.05 55.2998 329.071 55.6931 329.111 56.0846C329.15 56.4761 329.209 56.8641 329.288 57.2502C329.368 57.6364 329.467 58.0172 329.583 58.3926C329.701 58.768 329.837 59.1363 329.992 59.4974C330.146 59.8603 330.319 60.2125 330.511 60.5576C330.7 60.9008 330.907 61.2351 331.133 61.5587C331.356 61.8823 331.596 62.1933 331.851 62.4919C332.107 62.7922 332.379 63.0765 332.663 63.3482L347.153 77.4499Z"
              fill="white"
            />
            <path
              d="M190.323 304.432C190.323 306.448 190.104 308.203 189.667 309.696C189.24 311.179 188.643 312.405 187.875 313.376C187.117 314.347 186.216 315.072 185.171 315.552C184.136 316.021 183.016 316.256 181.811 316.256C180.605 316.256 179.485 316.021 178.451 315.552C177.427 315.072 176.536 314.347 175.779 313.376C175.021 312.405 174.429 311.179 174.003 309.696C173.576 308.203 173.363 306.448 173.363 304.432C173.363 302.405 173.576 300.651 174.003 299.168C174.429 297.685 175.021 296.459 175.779 295.488C176.536 294.517 177.427 293.797 178.451 293.328C179.485 292.848 180.605 292.608 181.811 292.608C183.016 292.608 184.136 292.848 185.171 293.328C186.216 293.797 187.117 294.517 187.875 295.488C188.643 296.459 189.24 297.685 189.667 299.168C190.104 300.651 190.323 302.405 190.323 304.432ZM186.243 304.432C186.243 302.757 186.12 301.371 185.875 300.272C185.629 299.173 185.299 298.299 184.883 297.648C184.477 296.997 184.008 296.544 183.475 296.288C182.941 296.021 182.387 295.888 181.811 295.888C181.245 295.888 180.696 296.021 180.163 296.288C179.64 296.544 179.176 296.997 178.771 297.648C178.365 298.299 178.04 299.173 177.795 300.272C177.56 301.371 177.443 302.757 177.443 304.432C177.443 306.107 177.56 307.493 177.795 308.592C178.04 309.691 178.365 310.565 178.771 311.216C179.176 311.867 179.64 312.325 180.163 312.592C180.696 312.848 181.245 312.976 181.811 312.976C182.387 312.976 182.941 312.848 183.475 312.592C184.008 312.325 184.477 311.867 184.883 311.216C185.299 310.565 185.629 309.691 185.875 308.592C186.12 307.493 186.243 306.107 186.243 304.432ZM202.517 307.28V299.712C202.517 298.997 202.565 298.208 202.661 297.344L195.477 307.28H202.517ZM208.869 307.28V309.568C208.869 309.781 208.8 309.968 208.661 310.128C208.522 310.277 208.325 310.352 208.069 310.352H205.957V316H202.517V310.352H192.757C192.49 310.352 192.256 310.272 192.053 310.112C191.85 309.941 191.722 309.733 191.669 309.488L191.253 307.488L202.213 292.848H205.957V307.28H208.869ZM211.384 313.824C211.384 313.493 211.442 313.179 211.56 312.88C211.688 312.581 211.858 312.325 212.072 312.112C212.285 311.899 212.541 311.728 212.84 311.6C213.138 311.472 213.458 311.408 213.799 311.408C214.141 311.408 214.456 311.472 214.744 311.6C215.042 311.728 215.298 311.899 215.512 312.112C215.736 312.325 215.912 312.581 216.04 312.88C216.168 313.179 216.232 313.493 216.232 313.824C216.232 314.165 216.168 314.485 216.04 314.784C215.912 315.072 215.736 315.323 215.512 315.536C215.298 315.749 215.042 315.915 214.744 316.032C214.456 316.16 214.141 316.224 213.799 316.224C213.458 316.224 213.138 316.16 212.84 316.032C212.541 315.915 212.285 315.749 212.072 315.536C211.858 315.323 211.688 315.072 211.56 314.784C211.442 314.485 211.384 314.165 211.384 313.824ZM211.384 302.416C211.384 302.085 211.442 301.771 211.56 301.472C211.688 301.173 211.858 300.917 212.072 300.704C212.285 300.491 212.541 300.32 212.84 300.192C213.138 300.064 213.458 300 213.799 300C214.141 300 214.456 300.064 214.744 300.192C215.042 300.32 215.298 300.491 215.512 300.704C215.736 300.917 215.912 301.173 216.04 301.472C216.168 301.771 216.232 302.085 216.232 302.416C216.232 302.757 216.168 303.077 216.04 303.376C215.912 303.664 215.736 303.915 215.512 304.128C215.298 304.341 215.042 304.512 214.744 304.64C214.456 304.757 214.141 304.816 213.799 304.816C213.458 304.816 213.138 304.757 212.84 304.64C212.541 304.512 212.285 304.341 212.072 304.128C211.858 303.915 211.688 303.664 211.56 303.376C211.442 303.077 211.384 302.757 211.384 302.416ZM235.698 304.432C235.698 306.448 235.479 308.203 235.042 309.696C234.615 311.179 234.018 312.405 233.25 313.376C232.492 314.347 231.591 315.072 230.546 315.552C229.511 316.021 228.391 316.256 227.186 316.256C225.98 316.256 224.86 316.021 223.826 315.552C222.802 315.072 221.911 314.347 221.154 313.376C220.396 312.405 219.804 311.179 219.378 309.696C218.951 308.203 218.738 306.448 218.738 304.432C218.738 302.405 218.951 300.651 219.378 299.168C219.804 297.685 220.396 296.459 221.154 295.488C221.911 294.517 222.802 293.797 223.826 293.328C224.86 292.848 225.98 292.608 227.186 292.608C228.391 292.608 229.511 292.848 230.546 293.328C231.591 293.797 232.492 294.517 233.25 295.488C234.018 296.459 234.615 297.685 235.042 299.168C235.479 300.651 235.698 302.405 235.698 304.432ZM231.618 304.432C231.618 302.757 231.495 301.371 231.25 300.272C231.004 299.173 230.674 298.299 230.258 297.648C229.852 296.997 229.383 296.544 228.85 296.288C228.316 296.021 227.762 295.888 227.186 295.888C226.62 295.888 226.071 296.021 225.538 296.288C225.015 296.544 224.551 296.997 224.146 297.648C223.74 298.299 223.415 299.173 223.17 300.272C222.935 301.371 222.818 302.757 222.818 304.432C222.818 306.107 222.935 307.493 223.17 308.592C223.415 309.691 223.74 310.565 224.146 311.216C224.551 311.867 225.015 312.325 225.538 312.592C226.071 312.848 226.62 312.976 227.186 312.976C227.762 312.976 228.316 312.848 228.85 312.592C229.383 312.325 229.852 311.867 230.258 311.216C230.674 310.565 231.004 309.691 231.25 308.592C231.495 307.493 231.618 306.107 231.618 304.432ZM254.26 304.432C254.26 306.448 254.041 308.203 253.604 309.696C253.177 311.179 252.58 312.405 251.812 313.376C251.055 314.347 250.153 315.072 249.108 315.552C248.073 316.021 246.953 316.256 245.748 316.256C244.543 316.256 243.423 316.021 242.388 315.552C241.364 315.072 240.473 314.347 239.716 313.376C238.959 312.405 238.367 311.179 237.94 309.696C237.513 308.203 237.3 306.448 237.3 304.432C237.3 302.405 237.513 300.651 237.94 299.168C238.367 297.685 238.959 296.459 239.716 295.488C240.473 294.517 241.364 293.797 242.388 293.328C243.423 292.848 244.543 292.608 245.748 292.608C246.953 292.608 248.073 292.848 249.108 293.328C250.153 293.797 251.055 294.517 251.812 295.488C252.58 296.459 253.177 297.685 253.604 299.168C254.041 300.651 254.26 302.405 254.26 304.432ZM250.18 304.432C250.18 302.757 250.057 301.371 249.812 300.272C249.567 299.173 249.236 298.299 248.82 297.648C248.415 296.997 247.945 296.544 247.412 296.288C246.879 296.021 246.324 295.888 245.748 295.888C245.183 295.888 244.633 296.021 244.1 296.288C243.577 296.544 243.113 296.997 242.708 297.648C242.303 298.299 241.977 299.173 241.732 300.272C241.497 301.371 241.38 302.757 241.38 304.432C241.38 306.107 241.497 307.493 241.732 308.592C241.977 309.691 242.303 310.565 242.708 311.216C243.113 311.867 243.577 312.325 244.1 312.592C244.633 312.848 245.183 312.976 245.748 312.976C246.324 312.976 246.879 312.848 247.412 312.592C247.945 312.325 248.415 311.867 248.82 311.216C249.236 310.565 249.567 309.691 249.812 308.592C250.057 307.493 250.18 306.107 250.18 304.432ZM256.759 313.824C256.759 313.493 256.817 313.179 256.935 312.88C257.063 312.581 257.233 312.325 257.447 312.112C257.66 311.899 257.916 311.728 258.215 311.6C258.513 311.472 258.833 311.408 259.174 311.408C259.516 311.408 259.831 311.472 260.119 311.6C260.417 311.728 260.673 311.899 260.887 312.112C261.111 312.325 261.287 312.581 261.415 312.88C261.543 313.179 261.607 313.493 261.607 313.824C261.607 314.165 261.543 314.485 261.415 314.784C261.287 315.072 261.111 315.323 260.887 315.536C260.673 315.749 260.417 315.915 260.119 316.032C259.831 316.16 259.516 316.224 259.174 316.224C258.833 316.224 258.513 316.16 258.215 316.032C257.916 315.915 257.66 315.749 257.447 315.536C257.233 315.323 257.063 315.072 256.935 314.784C256.817 314.485 256.759 314.165 256.759 313.824ZM256.759 302.416C256.759 302.085 256.817 301.771 256.935 301.472C257.063 301.173 257.233 300.917 257.447 300.704C257.66 300.491 257.916 300.32 258.215 300.192C258.513 300.064 258.833 300 259.174 300C259.516 300 259.831 300.064 260.119 300.192C260.417 300.32 260.673 300.491 260.887 300.704C261.111 300.917 261.287 301.173 261.415 301.472C261.543 301.771 261.607 302.085 261.607 302.416C261.607 302.757 261.543 303.077 261.415 303.376C261.287 303.664 261.111 303.915 260.887 304.128C260.673 304.341 260.417 304.512 260.119 304.64C259.831 304.757 259.516 304.816 259.174 304.816C258.833 304.816 258.513 304.757 258.215 304.64C257.916 304.512 257.66 304.341 257.447 304.128C257.233 303.915 257.063 303.664 256.935 303.376C256.817 303.077 256.759 302.757 256.759 302.416ZM281.073 304.432C281.073 306.448 280.854 308.203 280.417 309.696C279.99 311.179 279.393 312.405 278.625 313.376C277.867 314.347 276.966 315.072 275.921 315.552C274.886 316.021 273.766 316.256 272.561 316.256C271.355 316.256 270.235 316.021 269.201 315.552C268.177 315.072 267.286 314.347 266.529 313.376C265.771 312.405 265.179 311.179 264.753 309.696C264.326 308.203 264.113 306.448 264.113 304.432C264.113 302.405 264.326 300.651 264.753 299.168C265.179 297.685 265.771 296.459 266.529 295.488C267.286 294.517 268.177 293.797 269.201 293.328C270.235 292.848 271.355 292.608 272.561 292.608C273.766 292.608 274.886 292.848 275.921 293.328C276.966 293.797 277.867 294.517 278.625 295.488C279.393 296.459 279.99 297.685 280.417 299.168C280.854 300.651 281.073 302.405 281.073 304.432ZM276.993 304.432C276.993 302.757 276.87 301.371 276.625 300.272C276.379 299.173 276.049 298.299 275.633 297.648C275.227 296.997 274.758 296.544 274.225 296.288C273.691 296.021 273.137 295.888 272.561 295.888C271.995 295.888 271.446 296.021 270.913 296.288C270.39 296.544 269.926 296.997 269.521 297.648C269.115 298.299 268.79 299.173 268.545 300.272C268.31 301.371 268.193 302.757 268.193 304.432C268.193 306.107 268.31 307.493 268.545 308.592C268.79 309.691 269.115 310.565 269.521 311.216C269.926 311.867 270.39 312.325 270.913 312.592C271.446 312.848 271.995 312.976 272.561 312.976C273.137 312.976 273.691 312.848 274.225 312.592C274.758 312.325 275.227 311.867 275.633 311.216C276.049 310.565 276.379 309.691 276.625 308.592C276.87 307.493 276.993 306.107 276.993 304.432ZM299.635 304.432C299.635 306.448 299.416 308.203 298.979 309.696C298.552 311.179 297.955 312.405 297.187 313.376C296.43 314.347 295.528 315.072 294.483 315.552C293.448 316.021 292.328 316.256 291.123 316.256C289.918 316.256 288.798 316.021 287.763 315.552C286.739 315.072 285.848 314.347 285.091 313.376C284.334 312.405 283.742 311.179 283.315 309.696C282.888 308.203 282.675 306.448 282.675 304.432C282.675 302.405 282.888 300.651 283.315 299.168C283.742 297.685 284.334 296.459 285.091 295.488C285.848 294.517 286.739 293.797 287.763 293.328C288.798 292.848 289.918 292.608 291.123 292.608C292.328 292.608 293.448 292.848 294.483 293.328C295.528 293.797 296.43 294.517 297.187 295.488C297.955 296.459 298.552 297.685 298.979 299.168C299.416 300.651 299.635 302.405 299.635 304.432ZM295.555 304.432C295.555 302.757 295.432 301.371 295.187 300.272C294.942 299.173 294.611 298.299 294.195 297.648C293.79 296.997 293.32 296.544 292.787 296.288C292.254 296.021 291.699 295.888 291.123 295.888C290.558 295.888 290.008 296.021 289.475 296.288C288.952 296.544 288.488 296.997 288.083 297.648C287.678 298.299 287.352 299.173 287.107 300.272C286.872 301.371 286.755 302.757 286.755 304.432C286.755 306.107 286.872 307.493 287.107 308.592C287.352 309.691 287.678 310.565 288.083 311.216C288.488 311.867 288.952 312.325 289.475 312.592C290.008 312.848 290.558 312.976 291.123 312.976C291.699 312.976 292.254 312.848 292.787 312.592C293.32 312.325 293.79 311.867 294.195 311.216C294.611 310.565 294.942 309.691 295.187 308.592C295.432 307.493 295.555 306.107 295.555 304.432Z"
              fill="white"
            />
            <path
              d="M197.208 326.601V336H195.453V331.892H191.04V336H189.285V326.601H191.04V330.644H195.453V326.601H197.208ZM211.645 326.601V336H209.89V331.892H205.476V336H203.721V326.601H205.476V330.644H209.89V326.601H211.645ZM217.8 335.116C217.8 334.982 217.824 334.854 217.872 334.732C217.924 334.611 217.993 334.507 218.08 334.42C218.166 334.334 218.27 334.264 218.392 334.212C218.513 334.16 218.643 334.134 218.782 334.134C218.92 334.134 219.048 334.16 219.165 334.212C219.287 334.264 219.391 334.334 219.477 334.42C219.568 334.507 219.64 334.611 219.692 334.732C219.744 334.854 219.77 334.982 219.77 335.116C219.77 335.255 219.744 335.385 219.692 335.506C219.64 335.623 219.568 335.725 219.477 335.811C219.391 335.898 219.287 335.965 219.165 336.013C219.048 336.065 218.92 336.091 218.782 336.091C218.643 336.091 218.513 336.065 218.392 336.013C218.27 335.965 218.166 335.898 218.08 335.811C217.993 335.725 217.924 335.623 217.872 335.506C217.824 335.385 217.8 335.255 217.8 335.116ZM217.8 330.481C217.8 330.347 217.824 330.219 217.872 330.098C217.924 329.977 217.993 329.873 218.08 329.786C218.166 329.699 218.27 329.63 218.392 329.578C218.513 329.526 218.643 329.5 218.782 329.5C218.92 329.5 219.048 329.526 219.165 329.578C219.287 329.63 219.391 329.699 219.477 329.786C219.568 329.873 219.64 329.977 219.692 330.098C219.744 330.219 219.77 330.347 219.77 330.481C219.77 330.62 219.744 330.75 219.692 330.871C219.64 330.988 219.568 331.09 219.477 331.177C219.391 331.264 219.287 331.333 219.165 331.385C219.048 331.433 218.92 331.456 218.782 331.456C218.643 331.456 218.513 331.433 218.392 331.385C218.27 331.333 218.166 331.264 218.08 331.177C217.993 331.09 217.924 330.988 217.872 330.871C217.824 330.75 217.8 330.62 217.8 330.481ZM236.121 326.601V336H234.581V329.929C234.581 329.686 234.594 329.424 234.62 329.142L231.779 334.479C231.645 334.735 231.439 334.862 231.162 334.862H230.915C230.637 334.862 230.432 334.735 230.297 334.479L227.424 329.123C227.437 329.266 227.448 329.407 227.457 329.545C227.465 329.684 227.47 329.812 227.47 329.929V336H225.929V326.601H227.249C227.327 326.601 227.394 326.603 227.45 326.607C227.507 326.612 227.556 326.623 227.6 326.64C227.647 326.657 227.689 326.685 227.723 326.724C227.762 326.763 227.799 326.815 227.834 326.88L230.648 332.1C230.722 332.239 230.789 332.382 230.85 332.529C230.915 332.676 230.978 332.828 231.038 332.984C231.099 332.824 231.162 332.67 231.227 332.522C231.292 332.371 231.361 332.226 231.435 332.087L234.21 326.88C234.245 326.815 234.282 326.763 234.321 326.724C234.36 326.685 234.401 326.657 234.444 326.64C234.492 326.623 234.544 326.612 234.6 326.607C234.657 326.603 234.724 326.601 234.802 326.601H236.121ZM252.83 326.601V336H251.29V329.929C251.29 329.686 251.303 329.424 251.329 329.142L248.488 334.479C248.354 334.735 248.148 334.862 247.871 334.862H247.624C247.347 334.862 247.141 334.735 247.006 334.479L244.133 329.123C244.146 329.266 244.157 329.407 244.166 329.545C244.175 329.684 244.179 329.812 244.179 329.929V336H242.638V326.601H243.958C244.036 326.601 244.103 326.603 244.159 326.607C244.216 326.612 244.266 326.623 244.309 326.64C244.357 326.657 244.398 326.685 244.432 326.724C244.471 326.763 244.508 326.815 244.543 326.88L247.357 332.1C247.431 332.239 247.498 332.382 247.559 332.529C247.624 332.676 247.687 332.828 247.747 332.984C247.808 332.824 247.871 332.67 247.936 332.522C248.001 332.371 248.07 332.226 248.144 332.087L250.919 326.88C250.954 326.815 250.991 326.763 251.03 326.724C251.069 326.685 251.11 326.657 251.153 326.64C251.201 326.623 251.253 326.612 251.309 326.607C251.366 326.603 251.433 326.601 251.511 326.601H252.83ZM258.99 335.116C258.99 334.982 259.014 334.854 259.061 334.732C259.113 334.611 259.183 334.507 259.269 334.42C259.356 334.334 259.46 334.264 259.581 334.212C259.703 334.16 259.833 334.134 259.971 334.134C260.11 334.134 260.238 334.16 260.355 334.212C260.476 334.264 260.58 334.334 260.667 334.42C260.758 334.507 260.829 334.611 260.881 334.732C260.933 334.854 260.959 334.982 260.959 335.116C260.959 335.255 260.933 335.385 260.881 335.506C260.829 335.623 260.758 335.725 260.667 335.811C260.58 335.898 260.476 335.965 260.355 336.013C260.238 336.065 260.11 336.091 259.971 336.091C259.833 336.091 259.703 336.065 259.581 336.013C259.46 335.965 259.356 335.898 259.269 335.811C259.183 335.725 259.113 335.623 259.061 335.506C259.014 335.385 258.99 335.255 258.99 335.116ZM258.99 330.481C258.99 330.347 259.014 330.219 259.061 330.098C259.113 329.977 259.183 329.873 259.269 329.786C259.356 329.699 259.46 329.63 259.581 329.578C259.703 329.526 259.833 329.5 259.971 329.5C260.11 329.5 260.238 329.526 260.355 329.578C260.476 329.63 260.58 329.699 260.667 329.786C260.758 329.873 260.829 329.977 260.881 330.098C260.933 330.219 260.959 330.347 260.959 330.481C260.959 330.62 260.933 330.75 260.881 330.871C260.829 330.988 260.758 331.09 260.667 331.177C260.58 331.264 260.476 331.333 260.355 331.385C260.238 331.433 260.11 331.456 259.971 331.456C259.833 331.456 259.703 331.433 259.581 331.385C259.46 331.333 259.356 331.264 259.269 331.177C259.183 331.09 259.113 330.988 259.061 330.871C259.014 330.75 258.99 330.62 258.99 330.481ZM272.124 328.31C272.072 328.401 272.016 328.469 271.955 328.512C271.899 328.551 271.827 328.57 271.74 328.57C271.649 328.57 271.55 328.538 271.441 328.473C271.337 328.404 271.212 328.328 271.064 328.245C270.917 328.163 270.744 328.089 270.544 328.024C270.349 327.955 270.118 327.92 269.849 327.92C269.606 327.92 269.394 327.951 269.212 328.011C269.03 328.068 268.876 328.148 268.75 328.252C268.629 328.356 268.538 328.482 268.477 328.629C268.417 328.772 268.386 328.93 268.386 329.103C268.386 329.324 268.447 329.509 268.568 329.656C268.694 329.803 268.859 329.929 269.062 330.033C269.266 330.137 269.498 330.23 269.758 330.312C270.018 330.395 270.284 330.484 270.557 330.579C270.83 330.67 271.097 330.778 271.357 330.904C271.617 331.025 271.849 331.181 272.052 331.372C272.256 331.558 272.419 331.788 272.54 332.061C272.666 332.334 272.728 332.665 272.728 333.055C272.728 333.48 272.655 333.879 272.507 334.251C272.364 334.62 272.152 334.943 271.87 335.22C271.593 335.493 271.253 335.71 270.85 335.87C270.447 336.026 269.985 336.104 269.465 336.104C269.166 336.104 268.872 336.074 268.581 336.013C268.291 335.957 268.012 335.874 267.743 335.766C267.479 335.658 267.229 335.528 266.995 335.376C266.761 335.224 266.553 335.055 266.371 334.869L266.885 334.03C266.928 333.97 266.985 333.92 267.054 333.881C267.123 333.838 267.197 333.816 267.275 333.816C267.383 333.816 267.5 333.861 267.626 333.952C267.752 334.039 267.901 334.137 268.074 334.245C268.248 334.353 268.449 334.453 268.679 334.544C268.913 334.631 269.192 334.674 269.517 334.674C270.016 334.674 270.401 334.557 270.674 334.323C270.947 334.085 271.084 333.744 271.084 333.302C271.084 333.055 271.021 332.854 270.895 332.698C270.774 332.542 270.612 332.412 270.408 332.308C270.204 332.2 269.972 332.109 269.712 332.035C269.452 331.961 269.188 331.881 268.919 331.794C268.651 331.708 268.386 331.604 268.126 331.482C267.866 331.361 267.635 331.203 267.431 331.008C267.227 330.813 267.063 330.57 266.937 330.28C266.816 329.985 266.755 329.623 266.755 329.194C266.755 328.852 266.822 328.518 266.956 328.193C267.095 327.868 267.294 327.58 267.554 327.329C267.814 327.078 268.135 326.876 268.516 326.724C268.898 326.573 269.335 326.497 269.829 326.497C270.384 326.497 270.895 326.584 271.363 326.757C271.831 326.93 272.23 327.173 272.559 327.485L272.124 328.31ZM283.679 328.31C283.627 328.401 283.57 328.469 283.51 328.512C283.453 328.551 283.382 328.57 283.295 328.57C283.204 328.57 283.105 328.538 282.996 328.473C282.892 328.404 282.767 328.328 282.619 328.245C282.472 328.163 282.299 328.089 282.099 328.024C281.904 327.955 281.672 327.92 281.404 327.92C281.161 327.92 280.949 327.951 280.767 328.011C280.585 328.068 280.431 328.148 280.305 328.252C280.184 328.356 280.093 328.482 280.032 328.629C279.972 328.772 279.941 328.93 279.941 329.103C279.941 329.324 280.002 329.509 280.123 329.656C280.249 329.803 280.414 329.929 280.617 330.033C280.821 330.137 281.053 330.23 281.313 330.312C281.573 330.395 281.839 330.484 282.112 330.579C282.385 330.67 282.652 330.778 282.912 330.904C283.172 331.025 283.404 331.181 283.607 331.372C283.811 331.558 283.973 331.788 284.095 332.061C284.22 332.334 284.283 332.665 284.283 333.055C284.283 333.48 284.21 333.879 284.062 334.251C283.919 334.62 283.707 334.943 283.425 335.22C283.148 335.493 282.808 335.71 282.405 335.87C282.002 336.026 281.54 336.104 281.02 336.104C280.721 336.104 280.427 336.074 280.136 336.013C279.846 335.957 279.566 335.874 279.298 335.766C279.033 335.658 278.784 335.528 278.55 335.376C278.316 335.224 278.108 335.055 277.926 334.869L278.44 334.03C278.483 333.97 278.539 333.92 278.609 333.881C278.678 333.838 278.752 333.816 278.83 333.816C278.938 333.816 279.055 333.861 279.181 333.952C279.306 334.039 279.456 334.137 279.629 334.245C279.803 334.353 280.004 334.453 280.234 334.544C280.468 334.631 280.747 334.674 281.072 334.674C281.571 334.674 281.956 334.557 282.229 334.323C282.502 334.085 282.639 333.744 282.639 333.302C282.639 333.055 282.576 332.854 282.45 332.698C282.329 332.542 282.166 332.412 281.963 332.308C281.759 332.2 281.527 332.109 281.267 332.035C281.007 331.961 280.743 331.881 280.474 331.794C280.206 331.708 279.941 331.604 279.681 331.482C279.421 331.361 279.189 331.203 278.986 331.008C278.782 330.813 278.617 330.57 278.492 330.28C278.37 329.985 278.31 329.623 278.31 329.194C278.31 328.852 278.377 328.518 278.511 328.193C278.65 327.868 278.849 327.58 279.109 327.329C279.369 327.078 279.69 326.876 280.071 326.724C280.453 326.573 280.89 326.497 281.384 326.497C281.939 326.497 282.45 326.584 282.918 326.757C283.386 326.93 283.785 327.173 284.114 327.485L283.679 328.31Z"
              fill="white"
            />
            <path
              d="M219.397 349.975H215.473V361H213.052V349.975H209.128V347.986H219.397V349.975ZM233.072 354.493C233.072 355.447 232.913 356.332 232.595 357.148C232.283 357.958 231.839 358.66 231.263 359.254C230.687 359.848 229.994 360.313 229.184 360.649C228.374 360.979 227.474 361.144 226.484 361.144C225.5 361.144 224.603 360.979 223.793 360.649C222.983 360.313 222.287 359.848 221.705 359.254C221.129 358.66 220.682 357.958 220.364 357.148C220.046 356.332 219.887 355.447 219.887 354.493C219.887 353.539 220.046 352.657 220.364 351.847C220.682 351.031 221.129 350.326 221.705 349.732C222.287 349.138 222.983 348.676 223.793 348.346C224.603 348.01 225.5 347.842 226.484 347.842C227.144 347.842 227.765 347.92 228.347 348.076C228.929 348.226 229.463 348.442 229.949 348.724C230.435 349 230.87 349.339 231.254 349.741C231.644 350.137 231.974 350.581 232.244 351.073C232.514 351.565 232.718 352.099 232.856 352.675C233 353.251 233.072 353.857 233.072 354.493ZM230.597 354.493C230.597 353.779 230.501 353.14 230.309 352.576C230.117 352.006 229.844 351.523 229.49 351.127C229.136 350.731 228.704 350.428 228.194 350.218C227.69 350.008 227.12 349.903 226.484 349.903C225.848 349.903 225.275 350.008 224.765 350.218C224.261 350.428 223.829 350.731 223.469 351.127C223.115 351.523 222.842 352.006 222.65 352.576C222.458 353.14 222.362 353.779 222.362 354.493C222.362 355.207 222.458 355.849 222.65 356.419C222.842 356.983 223.115 357.463 223.469 357.859C223.829 358.249 224.261 358.549 224.765 358.759C225.275 358.969 225.848 359.074 226.484 359.074C227.12 359.074 227.69 358.969 228.194 358.759C228.704 358.549 229.136 358.249 229.49 357.859C229.844 357.463 230.117 356.983 230.309 356.419C230.501 355.849 230.597 355.207 230.597 354.493ZM243.849 349.975H239.925V361H237.504V349.975H233.58V347.986H243.849V349.975ZM251.162 356.086L249.578 351.757C249.5 351.565 249.419 351.337 249.335 351.073C249.251 350.809 249.167 350.524 249.083 350.218C249.005 350.524 248.924 350.812 248.84 351.082C248.756 351.346 248.675 351.577 248.597 351.775L247.022 356.086H251.162ZM255.437 361H253.565C253.355 361 253.184 360.949 253.052 360.847C252.92 360.739 252.821 360.607 252.755 360.451L251.783 357.796H246.392L245.42 360.451C245.372 360.589 245.279 360.715 245.141 360.829C245.003 360.943 244.832 361 244.628 361H242.738L247.859 347.986H250.325L255.437 361ZM264.407 359.002V361H256.784V347.986H259.205V359.002H264.407ZM172.538 369.986V383H170.405V374.594C170.405 374.258 170.423 373.895 170.459 373.505L166.526 380.894C166.34 381.248 166.055 381.425 165.671 381.425H165.329C164.945 381.425 164.66 381.248 164.474 380.894L160.496 373.478C160.514 373.676 160.529 373.871 160.541 374.063C160.553 374.255 160.559 374.432 160.559 374.594V383H158.426V369.986H160.253C160.361 369.986 160.454 369.989 160.532 369.995C160.61 370.001 160.679 370.016 160.739 370.04C160.805 370.064 160.862 370.103 160.91 370.157C160.964 370.211 161.015 370.283 161.063 370.373L164.96 377.6C165.062 377.792 165.155 377.99 165.239 378.194C165.329 378.398 165.416 378.608 165.5 378.824C165.584 378.602 165.671 378.389 165.761 378.185C165.851 377.975 165.947 377.774 166.049 377.582L169.892 370.373C169.94 370.283 169.991 370.211 170.045 370.157C170.099 370.103 170.156 370.064 170.216 370.04C170.282 370.016 170.354 370.001 170.432 369.995C170.51 369.989 170.603 369.986 170.711 369.986H172.538ZM177.871 371.912V375.521H182.425V377.384H177.871V381.065H183.649V383H175.441V369.986H183.649V371.912H177.871ZM197.351 376.493C197.351 377.447 197.192 378.323 196.874 379.121C196.556 379.919 196.109 380.606 195.533 381.182C194.957 381.758 194.264 382.205 193.454 382.523C192.644 382.841 191.744 383 190.754 383H185.795V369.986H190.754C191.744 369.986 192.644 370.148 193.454 370.472C194.264 370.79 194.957 371.237 195.533 371.813C196.109 372.383 196.556 373.067 196.874 373.865C197.192 374.663 197.351 375.539 197.351 376.493ZM194.867 376.493C194.867 375.779 194.771 375.14 194.579 374.576C194.393 374.006 194.12 373.526 193.76 373.136C193.406 372.74 192.974 372.437 192.464 372.227C191.96 372.017 191.39 371.912 190.754 371.912H188.225V381.074H190.754C191.39 381.074 191.96 380.969 192.464 380.759C192.974 380.549 193.406 380.249 193.76 379.859C194.12 379.463 194.393 378.983 194.579 378.419C194.771 377.849 194.867 377.207 194.867 376.493ZM201.918 383H199.488V369.986H201.918V383ZM213.922 371.975H209.998V383H207.577V371.975H203.653V369.986H213.922V371.975ZM221.235 378.086L219.651 373.757C219.573 373.565 219.492 373.337 219.408 373.073C219.324 372.809 219.24 372.524 219.156 372.218C219.078 372.524 218.997 372.812 218.913 373.082C218.829 373.346 218.748 373.577 218.67 373.775L217.095 378.086H221.235ZM225.51 383H223.638C223.428 383 223.257 382.949 223.125 382.847C222.993 382.739 222.894 382.607 222.828 382.451L221.856 379.796H216.465L215.493 382.451C215.445 382.589 215.352 382.715 215.214 382.829C215.076 382.943 214.905 383 214.701 383H212.811L217.932 369.986H220.398L225.51 383ZM234.682 371.975H230.758V383H228.337V371.975H224.413V369.986H234.682V371.975ZM238.815 383H236.385V369.986H238.815V383ZM254.139 376.493C254.139 377.447 253.98 378.332 253.662 379.148C253.35 379.958 252.906 380.66 252.33 381.254C251.754 381.848 251.061 382.313 250.251 382.649C249.441 382.979 248.541 383.144 247.551 383.144C246.567 383.144 245.67 382.979 244.86 382.649C244.05 382.313 243.354 381.848 242.772 381.254C242.196 380.66 241.749 379.958 241.431 379.148C241.113 378.332 240.954 377.447 240.954 376.493C240.954 375.539 241.113 374.657 241.431 373.847C241.749 373.031 242.196 372.326 242.772 371.732C243.354 371.138 244.05 370.676 244.86 370.346C245.67 370.01 246.567 369.842 247.551 369.842C248.211 369.842 248.832 369.92 249.414 370.076C249.996 370.226 250.53 370.442 251.016 370.724C251.502 371 251.937 371.339 252.321 371.741C252.711 372.137 253.041 372.581 253.311 373.073C253.581 373.565 253.785 374.099 253.923 374.675C254.067 375.251 254.139 375.857 254.139 376.493ZM251.664 376.493C251.664 375.779 251.568 375.14 251.376 374.576C251.184 374.006 250.911 373.523 250.557 373.127C250.203 372.731 249.771 372.428 249.261 372.218C248.757 372.008 248.187 371.903 247.551 371.903C246.915 371.903 246.342 372.008 245.832 372.218C245.328 372.428 244.896 372.731 244.536 373.127C244.182 373.523 243.909 374.006 243.717 374.576C243.525 375.14 243.429 375.779 243.429 376.493C243.429 377.207 243.525 377.849 243.717 378.419C243.909 378.983 244.182 379.463 244.536 379.859C244.896 380.249 245.328 380.549 245.832 380.759C246.342 380.969 246.915 381.074 247.551 381.074C248.187 381.074 248.757 380.969 249.261 380.759C249.771 380.549 250.203 380.249 250.557 379.859C250.911 379.463 251.184 378.983 251.376 378.419C251.568 377.849 251.664 377.207 251.664 376.493ZM267.236 369.986V383H265.994C265.802 383 265.64 382.97 265.508 382.91C265.382 382.844 265.259 382.736 265.139 382.586L258.344 373.91C258.38 374.306 258.398 374.672 258.398 375.008V383H256.265V369.986H257.534C257.636 369.986 257.723 369.992 257.795 370.004C257.873 370.01 257.939 370.028 257.993 370.058C258.053 370.082 258.11 370.121 258.164 370.175C258.218 370.223 258.278 370.289 258.344 370.373L265.166 379.085C265.148 378.875 265.133 378.668 265.121 378.464C265.109 378.26 265.103 378.071 265.103 377.897V369.986H267.236ZM283.057 371.975H279.133V383H276.712V371.975H272.788V369.986H283.057V371.975ZM287.19 383H284.76V369.986H287.19V383ZM304.215 369.986V383H302.082V374.594C302.082 374.258 302.1 373.895 302.136 373.505L298.203 380.894C298.017 381.248 297.732 381.425 297.348 381.425H297.006C296.622 381.425 296.337 381.248 296.151 380.894L292.173 373.478C292.191 373.676 292.206 373.871 292.218 374.063C292.23 374.255 292.236 374.432 292.236 374.594V383H290.103V369.986H291.93C292.038 369.986 292.131 369.989 292.209 369.995C292.287 370.001 292.356 370.016 292.416 370.04C292.482 370.064 292.539 370.103 292.587 370.157C292.641 370.211 292.692 370.283 292.74 370.373L296.637 377.6C296.739 377.792 296.832 377.99 296.916 378.194C297.006 378.398 297.093 378.608 297.177 378.824C297.261 378.602 297.348 378.389 297.438 378.185C297.528 377.975 297.624 377.774 297.726 377.582L301.569 370.373C301.617 370.283 301.668 370.211 301.722 370.157C301.776 370.103 301.833 370.064 301.893 370.04C301.959 370.016 302.031 370.001 302.109 369.995C302.187 369.989 302.28 369.986 302.388 369.986H304.215ZM309.549 371.912V375.521H314.103V377.384H309.549V381.065H315.327V383H307.119V369.986H315.327V371.912H309.549Z"
              fill="white"
              fill-opacity="0.6"
            />
            <path
              d="M277.275 136.312C277.435 135.203 277.744 134.232 278.203 133.4C278.662 132.557 279.232 131.859 279.915 131.304C280.608 130.739 281.398 130.317 282.283 130.04C283.179 129.752 284.139 129.608 285.163 129.608C286.23 129.608 287.19 129.763 288.043 130.072C288.907 130.371 289.643 130.792 290.251 131.336C290.859 131.869 291.323 132.499 291.643 133.224C291.974 133.949 292.139 134.733 292.139 135.576C292.139 136.312 292.054 136.963 291.883 137.528C291.723 138.083 291.488 138.568 291.179 138.984C290.87 139.4 290.486 139.752 290.027 140.04C289.568 140.328 289.051 140.568 288.475 140.76C289.862 141.197 290.896 141.864 291.579 142.76C292.262 143.656 292.603 144.781 292.603 146.136C292.603 147.288 292.39 148.307 291.963 149.192C291.536 150.077 290.96 150.824 290.235 151.432C289.51 152.029 288.667 152.483 287.707 152.792C286.758 153.101 285.75 153.256 284.683 153.256C283.52 153.256 282.507 153.123 281.643 152.856C280.779 152.589 280.027 152.195 279.387 151.672C278.747 151.149 278.203 150.509 277.755 149.752C277.307 148.995 276.923 148.12 276.603 147.128L278.347 146.408C278.806 146.216 279.232 146.168 279.627 146.264C280.032 146.349 280.326 146.563 280.507 146.904C280.699 147.277 280.907 147.645 281.131 148.008C281.366 148.371 281.643 148.696 281.963 148.984C282.283 149.261 282.656 149.491 283.083 149.672C283.52 149.843 284.038 149.928 284.635 149.928C285.307 149.928 285.894 149.821 286.395 149.608C286.896 149.384 287.312 149.096 287.643 148.744C287.984 148.392 288.235 148.003 288.395 147.576C288.566 147.139 288.651 146.701 288.651 146.264C288.651 145.709 288.592 145.208 288.475 144.76C288.358 144.301 288.112 143.912 287.739 143.592C287.366 143.272 286.827 143.021 286.123 142.84C285.43 142.659 284.496 142.568 283.323 142.568V139.752C284.294 139.741 285.099 139.651 285.739 139.48C286.379 139.309 286.886 139.075 287.259 138.776C287.643 138.467 287.91 138.099 288.059 137.672C288.208 137.245 288.283 136.776 288.283 136.264C288.283 135.176 287.979 134.349 287.371 133.784C286.763 133.219 285.952 132.936 284.939 132.936C284.47 132.936 284.038 133.005 283.643 133.144C283.248 133.272 282.891 133.459 282.571 133.704C282.262 133.939 282 134.216 281.787 134.536C281.574 134.856 281.414 135.208 281.307 135.592C281.126 136.083 280.886 136.408 280.587 136.568C280.299 136.728 279.888 136.765 279.355 136.68L277.275 136.312ZM300.605 138.264C301.117 138.157 301.608 138.083 302.077 138.04C302.547 137.987 303 137.96 303.437 137.96C304.653 137.96 305.725 138.141 306.653 138.504C307.581 138.867 308.36 139.368 308.989 140.008C309.619 140.648 310.093 141.4 310.413 142.264C310.733 143.117 310.893 144.04 310.893 145.032C310.893 146.259 310.675 147.379 310.237 148.392C309.811 149.405 309.213 150.275 308.445 151C307.677 151.715 306.765 152.269 305.709 152.664C304.664 153.059 303.523 153.256 302.285 153.256C301.56 153.256 300.872 153.181 300.221 153.032C299.571 152.883 298.957 152.685 298.381 152.44C297.816 152.184 297.288 151.896 296.797 151.576C296.317 151.245 295.885 150.899 295.501 150.536L296.717 148.856C296.973 148.493 297.309 148.312 297.725 148.312C297.992 148.312 298.264 148.397 298.541 148.568C298.819 148.739 299.133 148.925 299.485 149.128C299.848 149.331 300.269 149.517 300.749 149.688C301.24 149.859 301.827 149.944 302.509 149.944C303.235 149.944 303.875 149.827 304.429 149.592C304.984 149.357 305.443 149.032 305.805 148.616C306.179 148.189 306.456 147.688 306.637 147.112C306.829 146.525 306.925 145.891 306.925 145.208C306.925 143.949 306.557 142.968 305.821 142.264C305.096 141.549 304.019 141.192 302.589 141.192C301.491 141.192 300.365 141.395 299.213 141.8L296.749 141.096L298.669 129.864H310.093V131.544C310.093 132.109 309.917 132.568 309.565 132.92C309.213 133.272 308.616 133.448 307.773 133.448H301.421L300.605 138.264ZM330.432 141.432C330.432 143.448 330.213 145.203 329.776 146.696C329.349 148.179 328.752 149.405 327.984 150.376C327.227 151.347 326.325 152.072 325.28 152.552C324.245 153.021 323.125 153.256 321.92 153.256C320.715 153.256 319.595 153.021 318.56 152.552C317.536 152.072 316.645 151.347 315.888 150.376C315.131 149.405 314.539 148.179 314.112 146.696C313.685 145.203 313.472 143.448 313.472 141.432C313.472 139.405 313.685 137.651 314.112 136.168C314.539 134.685 315.131 133.459 315.888 132.488C316.645 131.517 317.536 130.797 318.56 130.328C319.595 129.848 320.715 129.608 321.92 129.608C323.125 129.608 324.245 129.848 325.28 130.328C326.325 130.797 327.227 131.517 327.984 132.488C328.752 133.459 329.349 134.685 329.776 136.168C330.213 137.651 330.432 139.405 330.432 141.432ZM326.352 141.432C326.352 139.757 326.229 138.371 325.984 137.272C325.739 136.173 325.408 135.299 324.992 134.648C324.587 133.997 324.117 133.544 323.584 133.288C323.051 133.021 322.496 132.888 321.92 132.888C321.355 132.888 320.805 133.021 320.272 133.288C319.749 133.544 319.285 133.997 318.88 134.648C318.475 135.299 318.149 136.173 317.904 137.272C317.669 138.371 317.552 139.757 317.552 141.432C317.552 143.107 317.669 144.493 317.904 145.592C318.149 146.691 318.475 147.565 318.88 148.216C319.285 148.867 319.749 149.325 320.272 149.592C320.805 149.848 321.355 149.976 321.92 149.976C322.496 149.976 323.051 149.848 323.584 149.592C324.117 149.325 324.587 148.867 324.992 148.216C325.408 147.565 325.739 146.691 325.984 145.592C326.229 144.493 326.352 143.107 326.352 141.432ZM348.994 141.432C348.994 143.448 348.776 145.203 348.338 146.696C347.912 148.179 347.314 149.405 346.546 150.376C345.789 151.347 344.888 152.072 343.842 152.552C342.808 153.021 341.688 153.256 340.482 153.256C339.277 153.256 338.157 153.021 337.122 152.552C336.098 152.072 335.208 151.347 334.45 150.376C333.693 149.405 333.101 148.179 332.674 146.696C332.248 145.203 332.034 143.448 332.034 141.432C332.034 139.405 332.248 137.651 332.674 136.168C333.101 134.685 333.693 133.459 334.45 132.488C335.208 131.517 336.098 130.797 337.122 130.328C338.157 129.848 339.277 129.608 340.482 129.608C341.688 129.608 342.808 129.848 343.842 130.328C344.888 130.797 345.789 131.517 346.546 132.488C347.314 133.459 347.912 134.685 348.338 136.168C348.776 137.651 348.994 139.405 348.994 141.432ZM344.914 141.432C344.914 139.757 344.792 138.371 344.546 137.272C344.301 136.173 343.97 135.299 343.554 134.648C343.149 133.997 342.68 133.544 342.146 133.288C341.613 133.021 341.058 132.888 340.482 132.888C339.917 132.888 339.368 133.021 338.834 133.288C338.312 133.544 337.848 133.997 337.442 134.648C337.037 135.299 336.712 136.173 336.466 137.272C336.232 138.371 336.114 139.757 336.114 141.432C336.114 143.107 336.232 144.493 336.466 145.592C336.712 146.691 337.037 147.565 337.442 148.216C337.848 148.867 338.312 149.325 338.834 149.592C339.368 149.848 339.917 149.976 340.482 149.976C341.058 149.976 341.613 149.848 342.146 149.592C342.68 149.325 343.149 148.867 343.554 148.216C343.97 147.565 344.301 146.691 344.546 145.592C344.792 144.493 344.914 143.107 344.914 141.432ZM363.482 129.224V142.84H364.218C364.485 142.84 364.693 142.808 364.842 142.744C365.002 142.669 365.162 142.525 365.322 142.312L369.402 137.272C369.573 137.048 369.759 136.877 369.962 136.76C370.175 136.643 370.447 136.584 370.778 136.584H374.394L369.29 142.68C368.927 143.16 368.533 143.528 368.106 143.784C368.33 143.944 368.527 144.131 368.698 144.344C368.879 144.557 369.05 144.787 369.21 145.032L374.682 153H371.114C370.805 153 370.538 152.952 370.314 152.856C370.09 152.749 369.903 152.563 369.754 152.296L365.562 146.072C365.413 145.827 365.258 145.667 365.098 145.592C364.938 145.517 364.698 145.48 364.378 145.48H363.482V153H359.53V129.224H363.482ZM392.573 147.544C392.808 147.544 393.016 147.635 393.197 147.816L394.893 149.656C393.955 150.819 392.797 151.709 391.421 152.328C390.056 152.947 388.413 153.256 386.493 153.256C384.776 153.256 383.229 152.963 381.853 152.376C380.488 151.789 379.32 150.973 378.349 149.928C377.379 148.883 376.632 147.635 376.109 146.184C375.597 144.733 375.341 143.149 375.341 141.432C375.341 139.693 375.619 138.104 376.173 136.664C376.728 135.213 377.507 133.965 378.509 132.92C379.523 131.875 380.728 131.064 382.125 130.488C383.523 129.901 385.069 129.608 386.765 129.608C388.451 129.608 389.944 129.885 391.245 130.44C392.557 130.995 393.672 131.72 394.589 132.616L393.149 134.616C393.064 134.744 392.952 134.856 392.813 134.952C392.685 135.048 392.504 135.096 392.269 135.096C392.109 135.096 391.944 135.053 391.773 134.968C391.603 134.872 391.416 134.76 391.213 134.632C391.011 134.493 390.776 134.344 390.509 134.184C390.243 134.024 389.933 133.88 389.581 133.752C389.229 133.613 388.819 133.501 388.349 133.416C387.891 133.32 387.357 133.272 386.749 133.272C385.715 133.272 384.765 133.459 383.901 133.832C383.048 134.195 382.312 134.728 381.693 135.432C381.075 136.125 380.595 136.979 380.253 137.992C379.912 138.995 379.741 140.141 379.741 141.432C379.741 142.733 379.923 143.891 380.285 144.904C380.659 145.917 381.16 146.771 381.789 147.464C382.419 148.157 383.16 148.691 384.013 149.064C384.867 149.427 385.784 149.608 386.765 149.608C387.352 149.608 387.88 149.576 388.349 149.512C388.829 149.448 389.267 149.347 389.661 149.208C390.067 149.069 390.445 148.893 390.797 148.68C391.16 148.456 391.517 148.184 391.869 147.864C391.976 147.768 392.088 147.693 392.205 147.64C392.323 147.576 392.445 147.544 392.573 147.544ZM405.89 145.992C404.748 146.045 403.788 146.147 403.01 146.296C402.231 146.435 401.607 146.616 401.138 146.84C400.668 147.064 400.332 147.325 400.13 147.624C399.927 147.923 399.826 148.248 399.826 148.6C399.826 149.293 400.028 149.789 400.434 150.088C400.85 150.387 401.388 150.536 402.05 150.536C402.86 150.536 403.559 150.392 404.146 150.104C404.743 149.805 405.324 149.357 405.89 148.76V145.992ZM396.834 138.872C398.722 137.144 400.994 136.28 403.65 136.28C404.61 136.28 405.468 136.44 406.226 136.76C406.983 137.069 407.623 137.507 408.146 138.072C408.668 138.627 409.063 139.293 409.33 140.072C409.607 140.851 409.746 141.704 409.746 142.632V153H407.954C407.58 153 407.292 152.947 407.09 152.84C406.887 152.723 406.727 152.493 406.61 152.152L406.258 150.968C405.842 151.341 405.436 151.672 405.042 151.96C404.647 152.237 404.236 152.472 403.81 152.664C403.383 152.856 402.924 153 402.434 153.096C401.954 153.203 401.42 153.256 400.834 153.256C400.14 153.256 399.5 153.165 398.914 152.984C398.327 152.792 397.82 152.509 397.394 152.136C396.967 151.763 396.636 151.299 396.402 150.744C396.167 150.189 396.05 149.544 396.05 148.808C396.05 148.392 396.119 147.981 396.258 147.576C396.396 147.16 396.62 146.765 396.93 146.392C397.25 146.019 397.66 145.667 398.162 145.336C398.663 145.005 399.276 144.717 400.002 144.472C400.738 144.227 401.591 144.029 402.562 143.88C403.532 143.72 404.642 143.624 405.89 143.592V142.632C405.89 141.533 405.655 140.723 405.186 140.2C404.716 139.667 404.039 139.4 403.154 139.4C402.514 139.4 401.98 139.475 401.554 139.624C401.138 139.773 400.77 139.944 400.45 140.136C400.13 140.317 399.836 140.483 399.57 140.632C399.314 140.781 399.026 140.856 398.706 140.856C398.428 140.856 398.194 140.787 398.002 140.648C397.81 140.499 397.655 140.328 397.538 140.136L396.834 138.872ZM417.468 129.224V153H413.516V129.224H417.468Z"
              fill="white"
            />
            <path
              d="M286.723 170.975H282.799V182H280.378V170.975H276.454V168.986H286.723V170.975ZM300.397 175.493C300.397 176.447 300.238 177.332 299.92 178.148C299.608 178.958 299.164 179.66 298.588 180.254C298.012 180.848 297.319 181.313 296.509 181.649C295.699 181.979 294.799 182.144 293.809 182.144C292.825 182.144 291.928 181.979 291.118 181.649C290.308 181.313 289.612 180.848 289.03 180.254C288.454 179.66 288.007 178.958 287.689 178.148C287.371 177.332 287.212 176.447 287.212 175.493C287.212 174.539 287.371 173.657 287.689 172.847C288.007 172.031 288.454 171.326 289.03 170.732C289.612 170.138 290.308 169.676 291.118 169.346C291.928 169.01 292.825 168.842 293.809 168.842C294.469 168.842 295.09 168.92 295.672 169.076C296.254 169.226 296.788 169.442 297.274 169.724C297.76 170 298.195 170.339 298.579 170.741C298.969 171.137 299.299 171.581 299.569 172.073C299.839 172.565 300.043 173.099 300.181 173.675C300.325 174.251 300.397 174.857 300.397 175.493ZM297.922 175.493C297.922 174.779 297.826 174.14 297.634 173.576C297.442 173.006 297.169 172.523 296.815 172.127C296.461 171.731 296.029 171.428 295.519 171.218C295.015 171.008 294.445 170.903 293.809 170.903C293.173 170.903 292.6 171.008 292.09 171.218C291.586 171.428 291.154 171.731 290.794 172.127C290.44 172.523 290.167 173.006 289.975 173.576C289.783 174.14 289.687 174.779 289.687 175.493C289.687 176.207 289.783 176.849 289.975 177.419C290.167 177.983 290.44 178.463 290.794 178.859C291.154 179.249 291.586 179.549 292.09 179.759C292.6 179.969 293.173 180.074 293.809 180.074C294.445 180.074 295.015 179.969 295.519 179.759C296.029 179.549 296.461 179.249 296.815 178.859C297.169 178.463 297.442 177.983 297.634 177.419C297.826 176.849 297.922 176.207 297.922 175.493ZM311.174 170.975H307.25V182H304.829V170.975H300.905V168.986H311.174V170.975ZM318.487 177.086L316.903 172.757C316.825 172.565 316.744 172.337 316.66 172.073C316.576 171.809 316.492 171.524 316.408 171.218C316.33 171.524 316.249 171.812 316.165 172.082C316.081 172.346 316 172.577 315.922 172.775L314.347 177.086H318.487ZM322.762 182H320.89C320.68 182 320.509 181.949 320.377 181.847C320.245 181.739 320.146 181.607 320.08 181.451L319.108 178.796H313.717L312.745 181.451C312.697 181.589 312.604 181.715 312.466 181.829C312.328 181.943 312.157 182 311.953 182H310.063L315.184 168.986H317.65L322.762 182ZM331.732 180.002V182H324.109V168.986H326.53V180.002H331.732ZM346.23 178.931C346.362 178.931 346.479 178.982 346.581 179.084L347.535 180.119C347.007 180.773 346.356 181.274 345.582 181.622C344.814 181.97 343.89 182.144 342.81 182.144C341.844 182.144 340.974 181.979 340.2 181.649C339.432 181.319 338.775 180.86 338.229 180.272C337.683 179.684 337.263 178.982 336.969 178.166C336.681 177.35 336.537 176.459 336.537 175.493C336.537 174.515 336.693 173.621 337.005 172.811C337.317 171.995 337.755 171.293 338.319 170.705C338.889 170.117 339.567 169.661 340.353 169.337C341.139 169.007 342.009 168.842 342.963 168.842C343.911 168.842 344.751 168.998 345.483 169.31C346.221 169.622 346.848 170.03 347.364 170.534L346.554 171.659C346.506 171.731 346.443 171.794 346.365 171.848C346.293 171.902 346.191 171.929 346.059 171.929C345.969 171.929 345.876 171.905 345.78 171.857C345.684 171.803 345.579 171.74 345.465 171.668C345.351 171.59 345.219 171.506 345.069 171.416C344.919 171.326 344.745 171.245 344.547 171.173C344.349 171.095 344.118 171.032 343.854 170.984C343.596 170.93 343.296 170.903 342.954 170.903C342.372 170.903 341.838 171.008 341.352 171.218C340.872 171.422 340.458 171.722 340.11 172.118C339.762 172.508 339.492 172.988 339.3 173.558C339.108 174.122 339.012 174.767 339.012 175.493C339.012 176.225 339.114 176.876 339.318 177.446C339.528 178.016 339.81 178.496 340.164 178.886C340.518 179.276 340.935 179.576 341.415 179.786C341.895 179.99 342.411 180.092 342.963 180.092C343.293 180.092 343.59 180.074 343.854 180.038C344.124 180.002 344.37 179.945 344.592 179.867C344.82 179.789 345.033 179.69 345.231 179.57C345.435 179.444 345.636 179.291 345.834 179.111C345.894 179.057 345.957 179.015 346.023 178.985C346.089 178.949 346.158 178.931 346.23 178.931ZM356.069 177.086L354.485 172.757C354.407 172.565 354.326 172.337 354.242 172.073C354.158 171.809 354.074 171.524 353.99 171.218C353.912 171.524 353.831 171.812 353.747 172.082C353.663 172.346 353.582 172.577 353.504 172.775L351.929 177.086H356.069ZM360.344 182H358.472C358.262 182 358.091 181.949 357.959 181.847C357.827 181.739 357.728 181.607 357.662 181.451L356.69 178.796H351.299L350.327 181.451C350.279 181.589 350.186 181.715 350.048 181.829C349.91 181.943 349.739 182 349.535 182H347.645L352.766 168.986H355.232L360.344 182ZM369.314 180.002V182H361.691V168.986H364.112V180.002H369.314ZM382.997 175.493C382.997 176.447 382.838 177.332 382.52 178.148C382.208 178.958 381.764 179.66 381.188 180.254C380.612 180.848 379.919 181.313 379.109 181.649C378.299 181.979 377.399 182.144 376.409 182.144C375.425 182.144 374.528 181.979 373.718 181.649C372.908 181.313 372.212 180.848 371.63 180.254C371.054 179.66 370.607 178.958 370.289 178.148C369.971 177.332 369.812 176.447 369.812 175.493C369.812 174.539 369.971 173.657 370.289 172.847C370.607 172.031 371.054 171.326 371.63 170.732C372.212 170.138 372.908 169.676 373.718 169.346C374.528 169.01 375.425 168.842 376.409 168.842C377.069 168.842 377.69 168.92 378.272 169.076C378.854 169.226 379.388 169.442 379.874 169.724C380.36 170 380.795 170.339 381.179 170.741C381.569 171.137 381.899 171.581 382.169 172.073C382.439 172.565 382.643 173.099 382.781 173.675C382.925 174.251 382.997 174.857 382.997 175.493ZM380.522 175.493C380.522 174.779 380.426 174.14 380.234 173.576C380.042 173.006 379.769 172.523 379.415 172.127C379.061 171.731 378.629 171.428 378.119 171.218C377.615 171.008 377.045 170.903 376.409 170.903C375.773 170.903 375.2 171.008 374.69 171.218C374.186 171.428 373.754 171.731 373.394 172.127C373.04 172.523 372.767 173.006 372.575 173.576C372.383 174.14 372.287 174.779 372.287 175.493C372.287 176.207 372.383 176.849 372.575 177.419C372.767 177.983 373.04 178.463 373.394 178.859C373.754 179.249 374.186 179.549 374.69 179.759C375.2 179.969 375.773 180.074 376.409 180.074C377.045 180.074 377.615 179.969 378.119 179.759C378.629 179.549 379.061 179.249 379.415 178.859C379.769 178.463 380.042 177.983 380.234 177.419C380.426 176.849 380.522 176.207 380.522 175.493ZM389.056 175.178C389.512 175.178 389.908 175.121 390.244 175.007C390.586 174.893 390.865 174.737 391.081 174.539C391.303 174.335 391.468 174.095 391.576 173.819C391.684 173.543 391.738 173.24 391.738 172.91C391.738 172.25 391.519 171.743 391.081 171.389C390.649 171.035 389.986 170.858 389.092 170.858H387.544V175.178H389.056ZM395.284 182H393.097C392.683 182 392.383 181.838 392.197 181.514L389.461 177.347C389.359 177.191 389.245 177.08 389.119 177.014C388.999 176.948 388.819 176.915 388.579 176.915H387.544V182H385.123V168.986H389.092C389.974 168.986 390.73 169.079 391.36 169.265C391.996 169.445 392.515 169.7 392.917 170.03C393.325 170.36 393.625 170.756 393.817 171.218C394.009 171.674 394.105 172.178 394.105 172.73C394.105 173.168 394.039 173.582 393.907 173.972C393.781 174.362 393.595 174.716 393.349 175.034C393.109 175.352 392.809 175.631 392.449 175.871C392.095 176.111 391.69 176.3 391.234 176.438C391.39 176.528 391.534 176.636 391.666 176.762C391.798 176.882 391.918 177.026 392.026 177.194L395.284 182ZM399.119 182H396.689V168.986H399.119V182ZM404.463 170.912V174.521H409.017V176.384H404.463V180.065H410.241V182H402.033V168.986H410.241V170.912H404.463ZM419.317 171.353C419.245 171.479 419.167 171.572 419.083 171.632C419.005 171.686 418.906 171.713 418.786 171.713C418.66 171.713 418.522 171.668 418.372 171.578C418.228 171.482 418.054 171.377 417.85 171.263C417.646 171.149 417.406 171.047 417.13 170.957C416.86 170.861 416.539 170.813 416.167 170.813C415.831 170.813 415.537 170.855 415.285 170.939C415.033 171.017 414.82 171.128 414.646 171.272C414.478 171.416 414.352 171.59 414.268 171.794C414.184 171.992 414.142 172.211 414.142 172.451C414.142 172.757 414.226 173.012 414.394 173.216C414.568 173.42 414.796 173.594 415.078 173.738C415.36 173.882 415.681 174.011 416.041 174.125C416.401 174.239 416.77 174.362 417.148 174.494C417.526 174.62 417.895 174.77 418.255 174.944C418.615 175.112 418.936 175.328 419.218 175.592C419.5 175.85 419.725 176.168 419.893 176.546C420.067 176.924 420.154 177.383 420.154 177.923C420.154 178.511 420.052 179.063 419.848 179.579C419.65 180.089 419.356 180.536 418.966 180.92C418.582 181.298 418.111 181.598 417.553 181.82C416.995 182.036 416.356 182.144 415.636 182.144C415.222 182.144 414.814 182.102 414.412 182.018C414.01 181.94 413.623 181.826 413.25 181.676C412.885 181.526 412.54 181.346 412.216 181.136C411.892 180.926 411.604 180.692 411.352 180.434L412.062 179.273C412.123 179.189 412.201 179.12 412.297 179.066C412.393 179.006 412.495 178.976 412.603 178.976C412.753 178.976 412.915 179.039 413.089 179.165C413.263 179.285 413.47 179.42 413.71 179.57C413.95 179.72 414.229 179.858 414.547 179.984C414.871 180.104 415.258 180.164 415.708 180.164C416.398 180.164 416.932 180.002 417.31 179.678C417.688 179.348 417.877 178.877 417.877 178.265C417.877 177.923 417.79 177.644 417.616 177.428C417.448 177.212 417.223 177.032 416.941 176.888C416.659 176.738 416.338 176.612 415.978 176.51C415.618 176.408 415.252 176.297 414.88 176.177C414.508 176.057 414.142 175.913 413.782 175.745C413.422 175.577 413.101 175.358 412.819 175.088C412.537 174.818 412.309 174.482 412.135 174.08C411.967 173.672 411.883 173.171 411.883 172.577C411.883 172.103 411.976 171.641 412.162 171.191C412.354 170.741 412.63 170.342 412.99 169.994C413.35 169.646 413.794 169.367 414.322 169.157C414.85 168.947 415.456 168.842 416.14 168.842C416.908 168.842 417.616 168.962 418.264 169.202C418.912 169.442 419.464 169.778 419.92 170.21L419.317 171.353ZM324.1 202.11C324.55 202.11 324.928 202.056 325.234 201.948C325.54 201.84 325.783 201.696 325.963 201.516C326.149 201.336 326.281 201.126 326.359 200.886C326.443 200.646 326.485 200.391 326.485 200.121C326.485 199.839 326.44 199.587 326.35 199.365C326.26 199.137 326.119 198.945 325.927 198.789C325.735 198.627 325.486 198.504 325.18 198.42C324.88 198.336 324.517 198.294 324.091 198.294H321.652V202.11H324.1ZM321.652 192.858V196.62H323.578C324.406 196.62 325.03 196.47 325.45 196.17C325.876 195.87 326.089 195.393 326.089 194.739C326.089 194.061 325.897 193.578 325.513 193.29C325.129 193.002 324.529 192.858 323.713 192.858H321.652ZM323.713 190.986C324.565 190.986 325.294 191.067 325.9 191.229C326.506 191.391 327.001 191.622 327.385 191.922C327.775 192.222 328.06 192.585 328.24 193.011C328.42 193.437 328.51 193.917 328.51 194.451C328.51 194.757 328.465 195.051 328.375 195.333C328.285 195.609 328.144 195.87 327.952 196.116C327.766 196.356 327.526 196.575 327.232 196.773C326.944 196.971 326.599 197.139 326.197 197.277C327.985 197.679 328.879 198.645 328.879 200.175C328.879 200.727 328.774 201.237 328.564 201.705C328.354 202.173 328.048 202.578 327.646 202.92C327.244 203.256 326.749 203.52 326.161 203.712C325.573 203.904 324.901 204 324.145 204H319.231V190.986H323.713ZM336.317 202.047C336.785 202.047 337.202 201.969 337.568 201.813C337.94 201.657 338.252 201.438 338.504 201.156C338.756 200.874 338.948 200.532 339.08 200.13C339.218 199.728 339.287 199.278 339.287 198.78V190.986H341.708V198.78C341.708 199.554 341.582 200.271 341.33 200.931C341.084 201.585 340.727 202.152 340.259 202.632C339.797 203.106 339.233 203.478 338.567 203.748C337.901 204.012 337.151 204.144 336.317 204.144C335.477 204.144 334.724 204.012 334.058 203.748C333.392 203.478 332.825 203.106 332.357 202.632C331.895 202.152 331.538 201.585 331.286 200.931C331.04 200.271 330.917 199.554 330.917 198.78V190.986H333.338V198.771C333.338 199.269 333.404 199.719 333.536 200.121C333.674 200.523 333.869 200.868 334.121 201.156C334.379 201.438 334.691 201.657 335.057 201.813C335.429 201.969 335.849 202.047 336.317 202.047ZM348.371 197.178C348.827 197.178 349.223 197.121 349.559 197.007C349.901 196.893 350.18 196.737 350.396 196.539C350.618 196.335 350.783 196.095 350.891 195.819C350.999 195.543 351.053 195.24 351.053 194.91C351.053 194.25 350.834 193.743 350.396 193.389C349.964 193.035 349.301 192.858 348.407 192.858H346.859V197.178H348.371ZM354.599 204H352.412C351.998 204 351.698 203.838 351.512 203.514L348.776 199.347C348.674 199.191 348.56 199.08 348.434 199.014C348.314 198.948 348.134 198.915 347.894 198.915H346.859V204H344.438V190.986H348.407C349.289 190.986 350.045 191.079 350.675 191.265C351.311 191.445 351.83 191.7 352.232 192.03C352.64 192.36 352.94 192.756 353.132 193.218C353.324 193.674 353.42 194.178 353.42 194.73C353.42 195.168 353.354 195.582 353.222 195.972C353.096 196.362 352.91 196.716 352.664 197.034C352.424 197.352 352.124 197.631 351.764 197.871C351.41 198.111 351.005 198.3 350.549 198.438C350.705 198.528 350.849 198.636 350.981 198.762C351.113 198.882 351.233 199.026 351.341 199.194L354.599 204ZM366.976 190.986V204H365.734C365.542 204 365.38 203.97 365.248 203.91C365.122 203.844 364.999 203.736 364.879 203.586L358.084 194.91C358.12 195.306 358.138 195.672 358.138 196.008V204H356.005V190.986H357.274C357.376 190.986 357.463 190.992 357.535 191.004C357.613 191.01 357.679 191.028 357.733 191.058C357.793 191.082 357.85 191.121 357.904 191.175C357.958 191.223 358.018 191.289 358.084 191.373L364.906 200.085C364.888 199.875 364.873 199.668 364.861 199.464C364.849 199.26 364.843 199.071 364.843 198.897V190.986H366.976ZM378.964 192.975H375.04V204H372.619V192.975H368.695V190.986H378.964V192.975Z"
              fill="white"
              fill-opacity="0.6"
            />
            <path
              d="M77.3085 138.264C77.8205 138.157 78.3112 138.083 78.7805 138.04C79.2498 137.987 79.7032 137.96 80.1405 137.96C81.3565 137.96 82.4285 138.141 83.3565 138.504C84.2845 138.867 85.0632 139.368 85.6925 140.008C86.3218 140.648 86.7965 141.4 87.1165 142.264C87.4365 143.117 87.5965 144.04 87.5965 145.032C87.5965 146.259 87.3778 147.379 86.9405 148.392C86.5138 149.405 85.9165 150.275 85.1485 151C84.3805 151.715 83.4685 152.269 82.4125 152.664C81.3672 153.059 80.2258 153.256 78.9885 153.256C78.2632 153.256 77.5752 153.181 76.9245 153.032C76.2738 152.883 75.6605 152.685 75.0845 152.44C74.5192 152.184 73.9912 151.896 73.5005 151.576C73.0205 151.245 72.5885 150.899 72.2045 150.536L73.4205 148.856C73.6765 148.493 74.0125 148.312 74.4285 148.312C74.6952 148.312 74.9672 148.397 75.2445 148.568C75.5218 148.739 75.8365 148.925 76.1885 149.128C76.5512 149.331 76.9725 149.517 77.4525 149.688C77.9432 149.859 78.5298 149.944 79.2125 149.944C79.9378 149.944 80.5778 149.827 81.1325 149.592C81.6872 149.357 82.1458 149.032 82.5085 148.616C82.8818 148.189 83.1592 147.688 83.3405 147.112C83.5325 146.525 83.6285 145.891 83.6285 145.208C83.6285 143.949 83.2605 142.968 82.5245 142.264C81.7992 141.549 80.7218 141.192 79.2925 141.192C78.1938 141.192 77.0685 141.395 75.9165 141.8L73.4525 141.096L75.3725 129.864H86.7965V131.544C86.7965 132.109 86.6205 132.568 86.2685 132.92C85.9165 133.272 85.3192 133.448 84.4765 133.448H78.1245L77.3085 138.264ZM107.135 141.432C107.135 143.448 106.916 145.203 106.479 146.696C106.052 148.179 105.455 149.405 104.687 150.376C103.93 151.347 103.028 152.072 101.983 152.552C100.948 153.021 99.8283 153.256 98.623 153.256C97.4177 153.256 96.2977 153.021 95.263 152.552C94.239 152.072 93.3483 151.347 92.591 150.376C91.8337 149.405 91.2417 148.179 90.815 146.696C90.3883 145.203 90.175 143.448 90.175 141.432C90.175 139.405 90.3883 137.651 90.815 136.168C91.2417 134.685 91.8337 133.459 92.591 132.488C93.3483 131.517 94.239 130.797 95.263 130.328C96.2977 129.848 97.4177 129.608 98.623 129.608C99.8283 129.608 100.948 129.848 101.983 130.328C103.028 130.797 103.93 131.517 104.687 132.488C105.455 133.459 106.052 134.685 106.479 136.168C106.916 137.651 107.135 139.405 107.135 141.432ZM103.055 141.432C103.055 139.757 102.932 138.371 102.687 137.272C102.442 136.173 102.111 135.299 101.695 134.648C101.29 133.997 100.82 133.544 100.287 133.288C99.7537 133.021 99.199 132.888 98.623 132.888C98.0577 132.888 97.5083 133.021 96.975 133.288C96.4523 133.544 95.9883 133.997 95.583 134.648C95.1777 135.299 94.8523 136.173 94.607 137.272C94.3723 138.371 94.255 139.757 94.255 141.432C94.255 143.107 94.3723 144.493 94.607 145.592C94.8523 146.691 95.1777 147.565 95.583 148.216C95.9883 148.867 96.4523 149.325 96.975 149.592C97.5083 149.848 98.0577 149.976 98.623 149.976C99.199 149.976 99.7537 149.848 100.287 149.592C100.82 149.325 101.29 148.867 101.695 148.216C102.111 147.565 102.442 146.691 102.687 145.592C102.932 144.493 103.055 143.107 103.055 141.432ZM125.698 141.432C125.698 143.448 125.479 145.203 125.042 146.696C124.615 148.179 124.018 149.405 123.25 150.376C122.492 151.347 121.591 152.072 120.546 152.552C119.511 153.021 118.391 153.256 117.186 153.256C115.98 153.256 114.86 153.021 113.826 152.552C112.802 152.072 111.911 151.347 111.154 150.376C110.396 149.405 109.804 148.179 109.378 146.696C108.951 145.203 108.738 143.448 108.738 141.432C108.738 139.405 108.951 137.651 109.378 136.168C109.804 134.685 110.396 133.459 111.154 132.488C111.911 131.517 112.802 130.797 113.826 130.328C114.86 129.848 115.98 129.608 117.186 129.608C118.391 129.608 119.511 129.848 120.546 130.328C121.591 130.797 122.492 131.517 123.25 132.488C124.018 133.459 124.615 134.685 125.042 136.168C125.479 137.651 125.698 139.405 125.698 141.432ZM121.618 141.432C121.618 139.757 121.495 138.371 121.25 137.272C121.004 136.173 120.674 135.299 120.258 134.648C119.852 133.997 119.383 133.544 118.85 133.288C118.316 133.021 117.762 132.888 117.186 132.888C116.62 132.888 116.071 133.021 115.538 133.288C115.015 133.544 114.551 133.997 114.146 134.648C113.74 135.299 113.415 136.173 113.17 137.272C112.935 138.371 112.818 139.757 112.818 141.432C112.818 143.107 112.935 144.493 113.17 145.592C113.415 146.691 113.74 147.565 114.146 148.216C114.551 148.867 115.015 149.325 115.538 149.592C116.071 149.848 116.62 149.976 117.186 149.976C117.762 149.976 118.316 149.848 118.85 149.592C119.383 149.325 119.852 148.867 120.258 148.216C120.674 147.565 121.004 146.691 121.25 145.592C121.495 144.493 121.618 143.107 121.618 141.432ZM144.26 141.432C144.26 143.448 144.041 145.203 143.604 146.696C143.177 148.179 142.58 149.405 141.812 150.376C141.055 151.347 140.153 152.072 139.108 152.552C138.073 153.021 136.953 153.256 135.748 153.256C134.543 153.256 133.423 153.021 132.388 152.552C131.364 152.072 130.473 151.347 129.716 150.376C128.959 149.405 128.367 148.179 127.94 146.696C127.513 145.203 127.3 143.448 127.3 141.432C127.3 139.405 127.513 137.651 127.94 136.168C128.367 134.685 128.959 133.459 129.716 132.488C130.473 131.517 131.364 130.797 132.388 130.328C133.423 129.848 134.543 129.608 135.748 129.608C136.953 129.608 138.073 129.848 139.108 130.328C140.153 130.797 141.055 131.517 141.812 132.488C142.58 133.459 143.177 134.685 143.604 136.168C144.041 137.651 144.26 139.405 144.26 141.432ZM140.18 141.432C140.18 139.757 140.057 138.371 139.812 137.272C139.567 136.173 139.236 135.299 138.82 134.648C138.415 133.997 137.945 133.544 137.412 133.288C136.879 133.021 136.324 132.888 135.748 132.888C135.183 132.888 134.633 133.021 134.1 133.288C133.577 133.544 133.113 133.997 132.708 134.648C132.303 135.299 131.977 136.173 131.732 137.272C131.497 138.371 131.38 139.757 131.38 141.432C131.38 143.107 131.497 144.493 131.732 145.592C131.977 146.691 132.303 147.565 132.708 148.216C133.113 148.867 133.577 149.325 134.1 149.592C134.633 149.848 135.183 149.976 135.748 149.976C136.324 149.976 136.879 149.848 137.412 149.592C137.945 149.325 138.415 148.867 138.82 148.216C139.236 147.565 139.567 146.691 139.812 145.592C140.057 144.493 140.18 143.107 140.18 141.432ZM162.823 141.432C162.823 143.448 162.604 145.203 162.167 146.696C161.74 148.179 161.143 149.405 160.375 150.376C159.617 151.347 158.716 152.072 157.671 152.552C156.636 153.021 155.516 153.256 154.311 153.256C153.105 153.256 151.985 153.021 150.951 152.552C149.927 152.072 149.036 151.347 148.279 150.376C147.521 149.405 146.929 148.179 146.503 146.696C146.076 145.203 145.863 143.448 145.863 141.432C145.863 139.405 146.076 137.651 146.503 136.168C146.929 134.685 147.521 133.459 148.279 132.488C149.036 131.517 149.927 130.797 150.951 130.328C151.985 129.848 153.105 129.608 154.311 129.608C155.516 129.608 156.636 129.848 157.671 130.328C158.716 130.797 159.617 131.517 160.375 132.488C161.143 133.459 161.74 134.685 162.167 136.168C162.604 137.651 162.823 139.405 162.823 141.432ZM158.743 141.432C158.743 139.757 158.62 138.371 158.375 137.272C158.129 136.173 157.799 135.299 157.383 134.648C156.977 133.997 156.508 133.544 155.975 133.288C155.441 133.021 154.887 132.888 154.311 132.888C153.745 132.888 153.196 133.021 152.663 133.288C152.14 133.544 151.676 133.997 151.271 134.648C150.865 135.299 150.54 136.173 150.295 137.272C150.06 138.371 149.943 139.757 149.943 141.432C149.943 143.107 150.06 144.493 150.295 145.592C150.54 146.691 150.865 147.565 151.271 148.216C151.676 148.867 152.14 149.325 152.663 149.592C153.196 149.848 153.745 149.976 154.311 149.976C154.887 149.976 155.441 149.848 155.975 149.592C156.508 149.325 156.977 148.867 157.383 148.216C157.799 147.565 158.129 146.691 158.375 145.592C158.62 144.493 158.743 143.107 158.743 141.432ZM181.385 141.432C181.385 143.448 181.166 145.203 180.729 146.696C180.302 148.179 179.705 149.405 178.937 150.376C178.18 151.347 177.278 152.072 176.233 152.552C175.198 153.021 174.078 153.256 172.873 153.256C171.668 153.256 170.548 153.021 169.513 152.552C168.489 152.072 167.598 151.347 166.841 150.376C166.084 149.405 165.492 148.179 165.065 146.696C164.638 145.203 164.425 143.448 164.425 141.432C164.425 139.405 164.638 137.651 165.065 136.168C165.492 134.685 166.084 133.459 166.841 132.488C167.598 131.517 168.489 130.797 169.513 130.328C170.548 129.848 171.668 129.608 172.873 129.608C174.078 129.608 175.198 129.848 176.233 130.328C177.278 130.797 178.18 131.517 178.937 132.488C179.705 133.459 180.302 134.685 180.729 136.168C181.166 137.651 181.385 139.405 181.385 141.432ZM177.305 141.432C177.305 139.757 177.182 138.371 176.937 137.272C176.692 136.173 176.361 135.299 175.945 134.648C175.54 133.997 175.07 133.544 174.537 133.288C174.004 133.021 173.449 132.888 172.873 132.888C172.308 132.888 171.758 133.021 171.225 133.288C170.702 133.544 170.238 133.997 169.833 134.648C169.428 135.299 169.102 136.173 168.857 137.272C168.622 138.371 168.505 139.757 168.505 141.432C168.505 143.107 168.622 144.493 168.857 145.592C169.102 146.691 169.428 147.565 169.833 148.216C170.238 148.867 170.702 149.325 171.225 149.592C171.758 149.848 172.308 149.976 172.873 149.976C173.449 149.976 174.004 149.848 174.537 149.592C175.07 149.325 175.54 148.867 175.945 148.216C176.361 147.565 176.692 146.691 176.937 145.592C177.182 144.493 177.305 143.107 177.305 141.432Z"
              fill="white"
            />
            <path
              d="M81.6845 170.975H77.7605V182H75.3395V170.975H71.4155V168.986H81.6845V170.975ZM95.359 175.493C95.359 176.447 95.2 177.332 94.882 178.148C94.57 178.958 94.126 179.66 93.55 180.254C92.974 180.848 92.281 181.313 91.471 181.649C90.661 181.979 89.761 182.144 88.771 182.144C87.787 182.144 86.89 181.979 86.08 181.649C85.27 181.313 84.574 180.848 83.992 180.254C83.416 179.66 82.969 178.958 82.651 178.148C82.333 177.332 82.174 176.447 82.174 175.493C82.174 174.539 82.333 173.657 82.651 172.847C82.969 172.031 83.416 171.326 83.992 170.732C84.574 170.138 85.27 169.676 86.08 169.346C86.89 169.01 87.787 168.842 88.771 168.842C89.431 168.842 90.052 168.92 90.634 169.076C91.216 169.226 91.75 169.442 92.236 169.724C92.722 170 93.157 170.339 93.541 170.741C93.931 171.137 94.261 171.581 94.531 172.073C94.801 172.565 95.005 173.099 95.143 173.675C95.287 174.251 95.359 174.857 95.359 175.493ZM92.884 175.493C92.884 174.779 92.788 174.14 92.596 173.576C92.404 173.006 92.131 172.523 91.777 172.127C91.423 171.731 90.991 171.428 90.481 171.218C89.977 171.008 89.407 170.903 88.771 170.903C88.135 170.903 87.562 171.008 87.052 171.218C86.548 171.428 86.116 171.731 85.756 172.127C85.402 172.523 85.129 173.006 84.937 173.576C84.745 174.14 84.649 174.779 84.649 175.493C84.649 176.207 84.745 176.849 84.937 177.419C85.129 177.983 85.402 178.463 85.756 178.859C86.116 179.249 86.548 179.549 87.052 179.759C87.562 179.969 88.135 180.074 88.771 180.074C89.407 180.074 89.977 179.969 90.481 179.759C90.991 179.549 91.423 179.249 91.777 178.859C92.131 178.463 92.404 177.983 92.596 177.419C92.788 176.849 92.884 176.207 92.884 175.493ZM106.136 170.975H102.212V182H99.7907V170.975H95.8667V168.986H106.136V170.975ZM113.449 177.086L111.865 172.757C111.787 172.565 111.706 172.337 111.622 172.073C111.538 171.809 111.454 171.524 111.37 171.218C111.292 171.524 111.211 171.812 111.127 172.082C111.043 172.346 110.962 172.577 110.884 172.775L109.309 177.086H113.449ZM117.724 182H115.852C115.642 182 115.471 181.949 115.339 181.847C115.207 181.739 115.108 181.607 115.042 181.451L114.07 178.796H108.679L107.707 181.451C107.659 181.589 107.566 181.715 107.428 181.829C107.29 181.943 107.119 182 106.915 182H105.025L110.146 168.986H112.612L117.724 182ZM126.694 180.002V182H119.071V168.986H121.492V180.002H126.694ZM139.185 171.353C139.113 171.479 139.035 171.572 138.951 171.632C138.873 171.686 138.774 171.713 138.654 171.713C138.528 171.713 138.39 171.668 138.24 171.578C138.096 171.482 137.922 171.377 137.718 171.263C137.514 171.149 137.274 171.047 136.998 170.957C136.728 170.861 136.407 170.813 136.035 170.813C135.699 170.813 135.405 170.855 135.153 170.939C134.901 171.017 134.688 171.128 134.514 171.272C134.346 171.416 134.22 171.59 134.136 171.794C134.052 171.992 134.01 172.211 134.01 172.451C134.01 172.757 134.094 173.012 134.262 173.216C134.436 173.42 134.664 173.594 134.946 173.738C135.228 173.882 135.549 174.011 135.909 174.125C136.269 174.239 136.638 174.362 137.016 174.494C137.394 174.62 137.763 174.77 138.123 174.944C138.483 175.112 138.804 175.328 139.086 175.592C139.368 175.85 139.593 176.168 139.761 176.546C139.935 176.924 140.022 177.383 140.022 177.923C140.022 178.511 139.92 179.063 139.716 179.579C139.518 180.089 139.224 180.536 138.834 180.92C138.45 181.298 137.979 181.598 137.421 181.82C136.863 182.036 136.224 182.144 135.504 182.144C135.09 182.144 134.682 182.102 134.28 182.018C133.878 181.94 133.491 181.826 133.119 181.676C132.753 181.526 132.408 181.346 132.084 181.136C131.76 180.926 131.472 180.692 131.22 180.434L131.931 179.273C131.991 179.189 132.069 179.12 132.165 179.066C132.261 179.006 132.363 178.976 132.471 178.976C132.621 178.976 132.783 179.039 132.957 179.165C133.131 179.285 133.338 179.42 133.578 179.57C133.818 179.72 134.097 179.858 134.415 179.984C134.739 180.104 135.126 180.164 135.576 180.164C136.266 180.164 136.8 180.002 137.178 179.678C137.556 179.348 137.745 178.877 137.745 178.265C137.745 177.923 137.658 177.644 137.484 177.428C137.316 177.212 137.091 177.032 136.809 176.888C136.527 176.738 136.206 176.612 135.846 176.51C135.486 176.408 135.12 176.297 134.748 176.177C134.376 176.057 134.01 175.913 133.65 175.745C133.29 175.577 132.969 175.358 132.687 175.088C132.405 174.818 132.177 174.482 132.003 174.08C131.835 173.672 131.751 173.171 131.751 172.577C131.751 172.103 131.844 171.641 132.03 171.191C132.222 170.741 132.498 170.342 132.858 169.994C133.218 169.646 133.662 169.367 134.19 169.157C134.718 168.947 135.324 168.842 136.008 168.842C136.776 168.842 137.484 168.962 138.132 169.202C138.78 169.442 139.332 169.778 139.788 170.21L139.185 171.353ZM151.224 170.975H147.3V182H144.879V170.975H140.955V168.986H151.224V170.975ZM155.357 170.912V174.521H159.911V176.384H155.357V180.065H161.135V182H152.927V168.986H161.135V170.912H155.357ZM167.51 175.529C167.954 175.529 168.341 175.475 168.671 175.367C169.001 175.253 169.274 175.094 169.49 174.89C169.712 174.68 169.877 174.428 169.985 174.134C170.093 173.834 170.147 173.501 170.147 173.135C170.147 172.787 170.093 172.472 169.985 172.19C169.877 171.908 169.715 171.668 169.499 171.47C169.283 171.272 169.01 171.122 168.68 171.02C168.35 170.912 167.96 170.858 167.51 170.858H165.701V175.529H167.51ZM167.51 168.986C168.38 168.986 169.133 169.088 169.769 169.292C170.405 169.496 170.93 169.781 171.344 170.147C171.758 170.513 172.064 170.951 172.262 171.461C172.466 171.971 172.568 172.529 172.568 173.135C172.568 173.765 172.463 174.344 172.253 174.872C172.043 175.394 171.728 175.844 171.308 176.222C170.888 176.6 170.36 176.894 169.724 177.104C169.094 177.314 168.356 177.419 167.51 177.419H165.701V182H163.28V168.986H167.51ZM181.355 171.353C181.283 171.479 181.205 171.572 181.121 171.632C181.043 171.686 180.944 171.713 180.824 171.713C180.698 171.713 180.56 171.668 180.41 171.578C180.266 171.482 180.092 171.377 179.888 171.263C179.684 171.149 179.444 171.047 179.168 170.957C178.898 170.861 178.577 170.813 178.205 170.813C177.869 170.813 177.575 170.855 177.323 170.939C177.071 171.017 176.858 171.128 176.684 171.272C176.516 171.416 176.39 171.59 176.306 171.794C176.222 171.992 176.18 172.211 176.18 172.451C176.18 172.757 176.264 173.012 176.432 173.216C176.606 173.42 176.834 173.594 177.116 173.738C177.398 173.882 177.719 174.011 178.079 174.125C178.439 174.239 178.808 174.362 179.186 174.494C179.564 174.62 179.933 174.77 180.293 174.944C180.653 175.112 180.974 175.328 181.256 175.592C181.538 175.85 181.763 176.168 181.931 176.546C182.105 176.924 182.192 177.383 182.192 177.923C182.192 178.511 182.09 179.063 181.886 179.579C181.688 180.089 181.394 180.536 181.004 180.92C180.62 181.298 180.149 181.598 179.591 181.82C179.033 182.036 178.394 182.144 177.674 182.144C177.26 182.144 176.852 182.102 176.45 182.018C176.048 181.94 175.661 181.826 175.289 181.676C174.923 181.526 174.578 181.346 174.254 181.136C173.93 180.926 173.642 180.692 173.39 180.434L174.101 179.273C174.161 179.189 174.239 179.12 174.335 179.066C174.431 179.006 174.533 178.976 174.641 178.976C174.791 178.976 174.953 179.039 175.127 179.165C175.301 179.285 175.508 179.42 175.748 179.57C175.988 179.72 176.267 179.858 176.585 179.984C176.909 180.104 177.296 180.164 177.746 180.164C178.436 180.164 178.97 180.002 179.348 179.678C179.726 179.348 179.915 178.877 179.915 178.265C179.915 177.923 179.828 177.644 179.654 177.428C179.486 177.212 179.261 177.032 178.979 176.888C178.697 176.738 178.376 176.612 178.016 176.51C177.656 176.408 177.29 176.297 176.918 176.177C176.546 176.057 176.18 175.913 175.82 175.745C175.46 175.577 175.139 175.358 174.857 175.088C174.575 174.818 174.347 174.482 174.173 174.08C174.005 173.672 173.921 173.171 173.921 172.577C173.921 172.103 174.014 171.641 174.2 171.191C174.392 170.741 174.668 170.342 175.028 169.994C175.388 169.646 175.832 169.367 176.36 169.157C176.888 168.947 177.494 168.842 178.178 168.842C178.946 168.842 179.654 168.962 180.302 169.202C180.95 169.442 181.502 169.778 181.958 170.21L181.355 171.353ZM107.62 190.986L103.579 204H101.392L98.5485 195.108C98.4705 194.892 98.3985 194.628 98.3325 194.316C98.2965 194.466 98.2605 194.607 98.2245 194.739C98.1885 194.871 98.1495 194.994 98.1075 195.108L95.2365 204H93.0405L89.0085 190.986H91.0335C91.2435 190.986 91.4175 191.037 91.5555 191.139C91.6995 191.235 91.7955 191.367 91.8435 191.535L94.0575 199.32C94.1055 199.512 94.1505 199.722 94.1925 199.95C94.2405 200.172 94.2885 200.406 94.3365 200.652C94.3845 200.4 94.4355 200.163 94.4895 199.941C94.5495 199.719 94.6125 199.512 94.6785 199.32L97.2345 191.535C97.2825 191.397 97.3755 191.271 97.5135 191.157C97.6575 191.043 97.8315 190.986 98.0355 190.986H98.7465C98.9565 190.986 99.1275 191.037 99.2595 191.139C99.3915 191.241 99.4905 191.373 99.5565 191.535L102.103 199.32C102.229 199.692 102.343 200.121 102.445 200.607C102.523 200.133 102.61 199.704 102.706 199.32L104.92 191.535C104.956 191.385 105.046 191.256 105.19 191.148C105.34 191.04 105.517 190.986 105.721 190.986H107.62ZM115.233 199.086L113.649 194.757C113.571 194.565 113.49 194.337 113.406 194.073C113.322 193.809 113.238 193.524 113.154 193.218C113.076 193.524 112.995 193.812 112.911 194.082C112.827 194.346 112.746 194.577 112.668 194.775L111.093 199.086H115.233ZM119.508 204H117.636C117.426 204 117.255 203.949 117.123 203.847C116.991 203.739 116.892 203.607 116.826 203.451L115.854 200.796H110.463L109.491 203.451C109.443 203.589 109.35 203.715 109.212 203.829C109.074 203.943 108.903 204 108.699 204H106.809L111.93 190.986H114.396L119.508 204ZM128.478 202.002V204H120.855V190.986H123.276V202.002H128.478ZM132.628 196.44H133.195C133.423 196.44 133.612 196.41 133.762 196.35C133.912 196.284 134.041 196.182 134.149 196.044L137.74 191.499C137.89 191.307 138.046 191.175 138.208 191.103C138.376 191.025 138.586 190.986 138.838 190.986H140.926L136.543 196.395C136.285 196.725 136.018 196.959 135.742 197.097C135.94 197.169 136.117 197.271 136.273 197.403C136.435 197.529 136.588 197.697 136.732 197.907L141.25 204H139.117C138.829 204 138.613 203.961 138.469 203.883C138.331 203.799 138.214 203.679 138.118 203.523L134.437 198.717C134.323 198.555 134.191 198.441 134.041 198.375C133.891 198.309 133.675 198.276 133.393 198.276H132.628V204H130.207V190.986H132.628V196.44ZM144.977 192.912V196.521H149.531V198.384H144.977V202.065H150.755V204H142.547V190.986H150.755V192.912H144.977ZM164.456 197.493C164.456 198.447 164.297 199.323 163.979 200.121C163.661 200.919 163.214 201.606 162.638 202.182C162.062 202.758 161.369 203.205 160.559 203.523C159.749 203.841 158.849 204 157.859 204H152.9V190.986H157.859C158.849 190.986 159.749 191.148 160.559 191.472C161.369 191.79 162.062 192.237 162.638 192.813C163.214 193.383 163.661 194.067 163.979 194.865C164.297 195.663 164.456 196.539 164.456 197.493ZM161.972 197.493C161.972 196.779 161.876 196.14 161.684 195.576C161.498 195.006 161.225 194.526 160.865 194.136C160.511 193.74 160.079 193.437 159.569 193.227C159.065 193.017 158.495 192.912 157.859 192.912H155.33V202.074H157.859C158.495 202.074 159.065 201.969 159.569 201.759C160.079 201.549 160.511 201.249 160.865 200.859C161.225 200.463 161.498 199.983 161.684 199.419C161.876 198.849 161.972 198.207 161.972 197.493Z"
              fill="white"
              fill-opacity="0.6"
            />
            <defs>
              <linearGradient
                id="paint0_linear_12617_23753"
                x1="236.5"
                y1="431"
                x2="228.772"
                y2="0.138612"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FB923C" />
                <stop offset="1" stop-color="#F43F5E" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_12617_23753"
                x1="-18.1923"
                y1="275.106"
                x2="488.92"
                y2="275.197"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F43F5E" />
                <stop offset="1" stop-color="#FB923C" />
              </linearGradient>
            </defs>
          </svg>

          {/* <div className="flex flex-col gap-5 mq450:mx-auto">
            <div className="text-white ">
              <div className="w-[382px] mq450:w-[360px]  h-[113px] relative">
                <div className="w-[382px] mq450:w-[360px]   h-[113px] left-0 top-0 absolute  [background:linear-gradient(180deg,_rgba(219,_39,_119,_0.12),_rgba(249,_115,_22,_0.12))] rounded-2xl" />
                <div className="left-[51px]  absolute justify-start items-center gap-4 inline-flex">
                  <div className="w-[56.60px] h-20  relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="80"
                      viewBox="0 0 57 80"
                      fill="none"
                    >
                      <mask
                        id="mask0_12113_2069"
                        className="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="56"
                        width="57"
                        height="24"
                      >
                        <path
                          d="M0 56.1494H56.601V79.9999H0V56.1494Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_12113_2069)">
                        <path
                          d="M40.8227 57.9919C38.1485 58.9745 35.0215 59.5255 31.3365 59.6589C31.0067 59.6729 30.6627 59.6764 30.3223 59.6799C30.0661 59.6834 29.8204 59.694 29.5572 59.694C29.1186 59.694 28.6974 59.6308 28.2938 59.515C27.8937 59.6308 27.4726 59.694 27.0339 59.694C26.7707 59.694 26.525 59.6834 26.2653 59.6799C22.1417 59.6133 18.6813 59.0623 15.7685 57.9919C15.1929 57.7813 14.6314 57.5567 14.098 57.3075C13.7435 57.1426 13.4031 56.9636 13.0662 56.7776C12.9995 56.8127 12.9293 56.8478 12.8591 56.8829C10.2165 58.2726 7.53523 59.8238 5.22248 61.6242C4.06084 62.5402 2.97992 63.5088 2.00077 64.7687C1.51295 65.4039 1.0497 66.1233 0.670675 67.0112C0.291652 67.8921 0.000363645 68.9695 0.000363645 70.1943C-0.0136743 71.4929 0.379389 72.9177 1.06374 74.0407C1.59016 74.9321 2.33417 75.6446 3.03607 76.1008C4.10646 76.7887 5.01893 77.0168 5.7489 77.1572C6.4894 77.287 7.10005 77.3116 7.6756 77.3151C9.38472 77.2975 10.9745 77.0764 12.8135 76.8589C13.1083 76.8273 13.4101 76.7922 13.7224 76.7571C15.9334 76.5044 18.4392 76.2693 21.1661 76.2693C23.4192 76.2728 25.8126 76.4342 28.2973 76.8694C30.9645 77.3397 33.737 78.1293 36.5622 79.3997C37.2992 79.7296 38.0712 79.8875 38.8328 79.8875C40.8613 79.8875 42.802 78.7645 43.7777 76.8589C43.8233 76.7746 43.8689 76.6869 43.9075 76.5956C45.1639 73.7881 43.911 70.4927 41.1105 69.2363C36.6675 67.2358 32.3227 66.1409 28.2938 65.5969C25.8196 65.2635 23.4648 65.1337 21.2854 65.1302C21.7311 64.9196 22.1663 64.7195 22.5839 64.5265C23.9561 63.8983 25.1634 63.3789 26.0162 63.0245C26.1039 62.9859 26.1881 62.9508 26.2724 62.9157H30.3188C31.4138 63.3719 33.2492 64.158 35.3023 65.1302C34.1617 65.1337 32.972 65.1688 31.7436 65.253C35.1408 65.9514 38.3976 66.9972 41.493 68.3905C44.7533 69.8574 46.2168 73.7073 44.7533 76.9782C46.1957 77.1501 47.5153 77.301 48.912 77.3151C49.6841 77.3046 50.5053 77.2835 51.6319 76.9747C52.1899 76.8132 52.8462 76.5641 53.5516 76.1008C54.2535 75.6446 55.001 74.9357 55.5274 74.0442C56.2083 72.9177 56.6048 71.5034 56.5908 70.1943C56.5908 68.9695 56.296 67.8921 55.9205 67.0112C55.194 65.3583 54.2359 64.2563 53.2463 63.2631C51.5056 61.5645 49.5016 60.2099 47.3714 58.9184C46.1115 58.1673 44.8095 57.4479 43.5215 56.7776C43.1881 56.9636 42.8477 57.1426 42.4932 57.3075C41.9598 57.5567 41.3982 57.7813 40.8227 57.9919Z"
                          fill="white"
                        />
                      </g>
                      <mask
                        id="mask1_12113_2069"
                        className="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="13"
                        y="76"
                        width="14"
                        height="4"
                      >
                        <path
                          d="M13.0166 76.8132H26.493V79.9998H13.0166V76.8132Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask1_12113_2069)">
                        <path
                          d="M13.8275 77.68C13.6696 77.6976 13.5187 77.7151 13.3643 77.7327C14.4241 79.1049 16.0595 79.891 17.7581 79.891C18.5197 79.891 19.2918 79.7331 20.0323 79.3997C21.9309 78.5469 23.805 77.9116 25.6439 77.4414C24.1945 77.287 22.7065 77.2027 21.1623 77.1992C18.4214 77.1992 15.9157 77.4414 13.8275 77.68Z"
                          fill="white"
                        />
                      </g>
                      <path
                        d="M30.6589 0.271708C31.3257 0.429634 31.9715 0.647223 32.5962 0.931491C33.2173 1.21225 33.8069 1.55267 34.3649 1.95275C34.9194 2.35283 35.4318 2.80205 35.8986 3.3039C36.3688 3.80225 36.783 4.34271 37.1444 4.92528C37.5059 5.50786 37.8077 6.11851 38.0464 6.76074C38.2885 7.40298 38.464 8.06276 38.5763 8.74009C38.6886 9.41391 38.7342 10.0948 38.7097 10.7826C38.6886 11.467 38.6009 12.1443 38.4465 12.8111C38.2885 13.4779 38.0709 14.1236 37.7902 14.7483C37.5059 15.373 37.1655 15.9661 36.7689 16.5241C36.3688 17.0786 35.9196 17.5945 35.4213 18.0613C34.9229 18.5316 34.3825 18.9457 33.7999 19.3071C33.2208 19.6721 32.6102 19.9739 31.9715 20.2161C31.3292 20.4547 30.673 20.6337 29.9956 20.746C29.3218 20.8583 28.6445 20.9005 27.9601 20.8794C27.2758 20.8583 26.602 20.7671 25.9352 20.6127C25.2684 20.4583 24.6226 20.2372 23.9979 19.9564C23.3767 19.6721 22.7871 19.3317 22.2291 18.9316C21.6746 18.5316 21.1623 18.0823 20.6955 17.584C20.2252 17.0821 19.8111 16.5417 19.4496 15.9591C19.0882 15.3765 18.7863 14.7659 18.5477 14.1236C18.3055 13.4814 18.1301 12.8216 18.0178 12.1478C17.9055 11.4705 17.8598 10.7896 17.8844 10.1053C17.9055 9.41742 17.9932 8.7436 18.1476 8.07329C18.3055 7.40649 18.5231 6.76074 18.8039 6.13605C19.0882 5.51137 19.4286 4.91826 19.8251 4.36377C20.2252 3.80576 20.6744 3.29337 21.1728 2.8231C21.6711 2.35283 22.2116 1.93871 22.7942 1.57724C23.3732 1.21576 23.9839 0.913943 24.6226 0.671789C25.2648 0.429635 25.9211 0.250651 26.5984 0.141857C27.2723 0.0295534 27.9496 -0.0160694 28.6339 0.00498701C29.3183 0.0295536 29.9956 0.11729 30.6589 0.271708Z"
                        fill="white"
                      />
                      <path
                        d="M13.0909 55.7213C13.4103 55.9109 13.7366 56.0898 14.0771 56.2618C14.2139 56.332 14.3508 56.3987 14.4912 56.4654C14.9053 56.6584 15.33 56.8409 15.7686 57.0093C18.5517 58.0832 21.8997 58.6518 25.9251 58.7465C26.2094 58.75 26.4901 58.7606 26.7849 58.7606C26.3813 58.4587 26.0304 58.0973 25.7461 57.6831C25.2302 56.9356 24.9249 56.0302 24.9249 55.0545C24.9249 53.7946 25.4302 52.6505 26.248 51.8118C26.4164 51.6398 26.5989 51.4819 26.7954 51.338C25.4794 51.331 24.2932 51.2643 23.2298 51.1485C19.587 50.7519 17.3374 49.7938 16.1055 48.8077C15.9862 48.7129 15.8739 48.6181 15.7686 48.5234C15.1475 47.9619 14.7544 47.3863 14.4666 46.7371C14.3473 46.4598 14.2561 46.158 14.1753 45.8421C14.042 45.2982 13.9648 44.7016 13.9648 44.0348C13.9367 42.0168 14.6877 39.4935 15.7686 37.2228V47.1442C16.0108 47.4776 16.2986 47.7794 16.6776 48.0812C17.769 48.9515 20.5521 50.4115 26.9709 50.4115H27.0341C27.4728 50.4115 27.8939 50.4782 28.2975 50.594C28.6976 50.4782 29.1222 50.4115 29.5574 50.4115H29.6241C36.0394 50.4115 38.8224 48.9515 39.9139 48.0812C40.2929 47.7829 40.5807 47.4776 40.8228 47.1442V37.2228C41.9073 39.4935 42.6548 42.0168 42.6267 44.0348C42.6267 44.7016 42.5495 45.2982 42.4161 45.8421C42.3354 46.158 42.2442 46.4598 42.1249 46.7371C41.8371 47.3863 41.4475 47.9619 40.8228 48.5234C40.7176 48.6181 40.6088 48.7129 40.4894 48.8077C38.8926 50.0816 35.6077 51.3134 29.7996 51.338C29.7153 51.338 29.6381 51.3415 29.5574 51.3415C29.1292 51.3415 28.7221 51.4152 28.3396 51.5486C28.3256 51.5556 28.3115 51.5591 28.2975 51.5661C27.9395 51.696 27.6061 51.8785 27.3078 52.1066C26.4234 52.7874 25.8514 53.8508 25.8514 55.0545C25.8514 55.3142 25.8795 55.5669 25.9286 55.8091C26.1918 57.0795 27.1008 58.1078 28.2975 58.543C28.6906 58.6869 29.1152 58.7676 29.5574 58.7676C29.6416 58.7676 29.7223 58.7606 29.8101 58.7606C30.1014 58.7606 30.3821 58.75 30.6664 58.7465C30.9893 58.736 31.3157 58.7325 31.6315 58.7184C35.2322 58.5605 38.2644 57.9955 40.8228 57.0093C41.2615 56.8409 41.6862 56.6584 42.1003 56.4654C42.2407 56.3987 42.3775 56.3285 42.5144 56.2618C44.6096 55.209 46.3152 53.7666 47.547 52.0925C48.1015 51.338 48.5648 50.5378 48.9192 49.7061C49.7229 47.8496 50.0387 45.9088 50.0387 44.0348C50.0317 40.8411 49.1649 37.8019 47.9927 35.0821C46.81 32.3657 45.3115 29.9687 43.7884 28.0982C42.7566 26.8453 41.7704 25.8311 40.5421 25.0274C39.9034 24.6449 39.205 24.2132 38.0363 24.0869C37.7801 24.0272 37.5169 23.9956 37.2432 23.9956H19.3483C19.0746 23.9956 18.8114 24.0272 18.5552 24.0869C17.3865 24.2132 16.6881 24.6449 16.0494 25.0274C14.8211 25.8311 13.8384 26.8453 12.8031 28.0982C11.28 29.9687 9.78146 32.3657 8.59876 35.0821C7.4266 37.8019 6.55975 40.8411 6.55273 44.0348C6.55273 45.9088 6.86859 47.8496 7.67226 49.7061C8.03023 50.5378 8.48997 51.338 9.04447 52.0925C10.0798 53.4963 11.445 54.7387 13.0909 55.7213Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="w-[219px] flex-col justify-start items-center gap-2 inline-flex">
                    <div className="flex flex-col items-center justify-start">
                      <div className="text-center text-white text-[32px] mq450:text-[26px] font-bold font-Lato">
                        <p className="text-4xl font-bold tracking-tighter text-white whitespace-pre-wrap ">
                          <NumberTicker value={4} />
                          :00:00
                        </p>{" "}
                      </div>
                      <div className="text-center text-white text-base font-bold font-Lato tracking-[5.44px]">
                        HH:MM:SS
                      </div>
                    </div>
                    <div className="self-stretch text-lg font-bold text-center uppercase text-nowrap text-white/60 font-Lato">
                      Total Meditation Time{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white mq450:ml-0 ml-[80px]">
              <div className="w-[382px] mq450:w-[360px] h-[113px] relative">
                <div className="w-[382px] mq450:w-[360px] h-[113px] left-0 top-0 absolute  [background:linear-gradient(180deg,_rgba(219,_39,_119,_0.12),_rgba(249,_115,_22,_0.12))] rounded-2xl" />
                <div className="left-[52.85px] top-[17px] absolute justify-start items-center gap-4 inline-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="80"
                    viewBox="0 0 54 80"
                    fill="none"
                  >
                    <path
                      d="M28.3801 18.0734C33.3753 17.9556 37.3264 13.821 37.2085 8.8355C37.0984 3.84229 32.9629 -0.107855 27.9667 0.00224681C22.9716 0.111383 19.0205 4.25469 19.1383 9.2479C19.2484 14.2334 23.384 18.1913 28.3801 18.0734Z"
                      fill="white"
                    />
                    <mask
                      id="mask0_12113_2092"
                      className="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="19"
                      width="52"
                      height="61"
                    >
                      <path
                        d="M0.844727 19.9258H51.7775V79.9999H0.844727V19.9258Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_12113_2092)">
                      <path
                        d="M33.8136 54.4262L35.0856 63.6303C35.4053 65.9792 37.419 67.6722 39.7186 67.6722C39.9291 67.6722 40.1483 67.6549 40.3676 67.6297C42.9279 67.2763 44.7224 64.91 44.3689 62.3497L42.6169 49.7102C42.3388 47.6637 40.7462 46.0469 38.716 45.7272L30.0141 44.3374L32.8275 32.2368L37.3263 35.6307C38.5731 36.5733 40.2575 36.7249 41.6473 36.018L49.3979 32.1026C51.4193 31.0837 52.2286 28.616 51.2087 26.5946C50.1898 24.5741 47.7212 23.7571 45.6998 24.7847L40.2324 27.5469L33.7122 22.629C32.5243 21.7366 31.1181 21.1465 29.652 20.9195L23.8059 20.0349C22.8875 19.8919 21.969 19.8919 21.0592 20.0435L9.69552 21.8284C8.54911 22.0061 7.53018 22.6628 6.89855 23.6305L1.59144 31.7481C0.35328 33.6431 0.883507 36.186 2.77938 37.4242C3.46994 37.8791 4.2532 38.0896 5.02005 38.0896C6.35963 38.0896 7.67312 37.4329 8.45736 36.2372L12.7697 29.6437L16.5102 29.0535C15.9964 31.9587 15.5502 36.1107 15.0866 42.1479C14.7921 45.9542 16.0892 48.8342 18.8939 50.7716L13.4525 74.2571C12.8711 76.775 14.4376 79.2928 16.9564 79.882C17.3109 79.9669 17.6731 79.9998 18.0179 79.9998C20.1494 79.9998 22.0791 78.5347 22.5842 76.3713L27.8913 53.4826L33.8136 54.4262Z"
                        fill="white"
                      />
                    </g>
                    <mask
                      id="mask1_12113_2092"
                      className="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="26"
                      y="69"
                      width="28"
                      height="11"
                    >
                      <path
                        d="M26.3115 69.8696H53.7559V80H26.3115V69.8696Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask1_12113_2092)">
                      <path
                        d="M53.7024 78.3919L51.4366 70.8885C51.2849 70.3757 50.8049 70.0212 50.2651 70.0212H30.014C29.4751 70.0212 29.0028 70.3757 28.8435 70.8885L26.5767 78.3919C26.3411 79.1751 26.9312 79.9671 27.7483 79.9671H33.5605C34.0994 79.9671 34.5717 79.6213 34.731 79.1075L35.3463 77.1209H44.9328L45.5481 79.1075C45.7084 79.6213 46.1797 79.9671 46.7186 79.9671H52.5318C53.3566 79.9671 53.938 79.1751 53.7024 78.3919Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                  <div className="w-[219px] flex-col justify-start items-center gap-2 inline-flex">
                    <div className="self-stretch text-center text-white text-[32px] font-bold font-Lato">
                      <p className="text-5xl font-bold tracking-tighter text-white whitespace-pre-wrap ">
                        <NumberTicker value={100000} />
                      </p>
                    </div>
                    <div className="self-stretch text-lg font-bold text-center uppercase text-white/60 font-Lato">
                      Total Steps walked
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white">
              <div className="w-[382px] mq450:w-[360px] h-[113px] relative">
                <div className="w-[382px] mq450:w-[360px] h-[113px] left-0 top-0 absolute   [background:linear-gradient(180deg,_rgba(219,_39,_119,_0.12),_rgba(249,_115,_22,_0.12))] rounded-2xl" />
                <div className="left-[22.85px] top-[17px] absolute justify-start items-center gap-4 inline-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="93"
                    height="80"
                    viewBox="0 0 93 80"
                    fill="none"
                  >
                    <mask
                      id="mask0_11968_58355"
                      className="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="29"
                      width="93"
                      height="51"
                    >
                      <path d="M0 29.0388H93V80.0001H0V29.0388Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_11968_58355)">
                      <path
                        d="M91.0625 44.9214H85.25C85.25 44.6667 85.2375 44.4139 85.2126 44.161C85.1877 43.9081 85.1503 43.6588 85.1004 43.4095C85.0523 43.1602 84.99 42.9144 84.917 42.6722C84.8422 42.4283 84.7567 42.1897 84.6606 41.9546C84.5626 41.7213 84.454 41.4916 84.3347 41.2672C84.2154 41.0446 84.0854 40.8274 83.9447 40.6154C83.8022 40.4035 83.6526 40.2005 83.4906 40.0046C83.3303 39.8087 83.1594 39.62 82.9795 39.4419C82.8014 39.262 82.6126 39.0911 82.4168 38.9308C82.2209 38.7688 82.0161 38.6174 81.806 38.4767C81.594 38.336 81.3768 38.206 81.1542 38.0867C80.9298 37.9674 80.7001 37.8588 80.465 37.7608C80.2317 37.6647 79.9931 37.5792 79.7491 37.5044C79.507 37.4314 79.2612 37.3691 79.0119 37.3192C78.7626 37.2711 78.5115 37.2337 78.2604 37.2088C78.0075 37.1839 77.7547 37.1714 77.5 37.1714C76.111 37.1856 74.8199 37.5471 73.625 38.2559V37.1714C73.625 36.9167 73.6125 36.6639 73.5876 36.411C73.5627 36.1581 73.5253 35.9088 73.4754 35.6595C73.4273 35.4102 73.365 35.1644 73.292 34.9222C73.2172 34.6783 73.1317 34.4397 73.0356 34.2046C72.9376 33.9713 72.829 33.7416 72.7097 33.5172C72.5904 33.2946 72.4604 33.0773 72.3197 32.8654C72.1772 32.6553 72.0276 32.4505 71.8656 32.2546C71.7053 32.0587 71.5344 31.87 71.3545 31.6919C71.1764 31.512 70.9876 31.3411 70.7918 31.1808C70.5959 31.0188 70.3911 30.8692 70.181 30.7267C69.969 30.586 69.7518 30.456 69.5292 30.3367C69.3048 30.2174 69.0751 30.1088 68.84 30.0108C68.6067 29.9147 68.3681 29.8292 68.1241 29.7544C67.882 29.6814 67.6362 29.6191 67.3869 29.5692C67.1376 29.5211 66.8865 29.4837 66.6354 29.4588C66.3825 29.4339 66.1297 29.4214 65.875 29.4214C65.6221 29.4214 65.3675 29.4339 65.1146 29.4588C64.8635 29.4837 64.6124 29.5211 64.3631 29.5692C64.1138 29.6191 63.868 29.6814 63.6259 29.7544C63.3819 29.8292 63.1433 29.9147 62.91 30.0108C62.6749 30.1088 62.4452 30.2174 62.2226 30.3367C61.9982 30.456 61.781 30.586 61.569 30.7267C61.3589 30.8692 61.1541 31.0188 60.9582 31.1808C60.7624 31.3411 60.5754 31.512 60.3955 31.6919C60.2156 31.87 60.0447 32.0587 59.8844 32.2546C59.7224 32.4505 59.5728 32.6553 59.4303 32.8654C59.2896 33.0773 59.1596 33.2946 59.0403 33.5172C58.921 33.7416 58.8124 33.9713 58.7144 34.2046C58.6183 34.4397 58.5328 34.6783 58.458 34.9222C58.385 35.1644 58.3227 35.4102 58.2746 35.6595C58.2247 35.9088 58.1873 36.1581 58.1624 36.411C58.1375 36.6639 58.125 36.9167 58.125 37.1714V44.9214H34.875V37.1714C34.875 36.9167 34.8625 36.6639 34.8376 36.411C34.8127 36.1581 34.7753 35.9088 34.7254 35.6595C34.6773 35.4102 34.615 35.1644 34.542 34.9222C34.4672 34.6783 34.3817 34.4397 34.2856 34.2046C34.1876 33.9713 34.079 33.7416 33.9597 33.5172C33.8404 33.2946 33.7104 33.0773 33.5697 32.8654C33.4272 32.6553 33.2776 32.4505 33.1156 32.2546C32.9553 32.0587 32.7844 31.87 32.6045 31.6919C32.4264 31.512 32.2377 31.3411 32.0418 31.1808C31.8459 31.0188 31.6411 30.8692 31.431 30.7267C31.219 30.586 31.0018 30.456 30.7792 30.3367C30.5548 30.2174 30.3251 30.1088 30.09 30.0108C29.8567 29.9147 29.6181 29.8292 29.3741 29.7544C29.132 29.6814 28.8862 29.6191 28.6369 29.5692C28.3876 29.5211 28.1365 29.4837 27.8854 29.4588C27.6325 29.4339 27.3797 29.4214 27.125 29.4214C26.8721 29.4214 26.6175 29.4339 26.3646 29.4588C26.1135 29.4837 25.8624 29.5211 25.6131 29.5692C25.3638 29.6191 25.118 29.6814 24.8759 29.7544C24.6319 29.8292 24.3933 29.9147 24.16 30.0108C23.9249 30.1088 23.6952 30.2174 23.4726 30.3367C23.2482 30.456 23.031 30.586 22.819 30.7267C22.6089 30.8692 22.4041 31.0188 22.2082 31.1808C22.0124 31.3411 21.8254 31.512 21.6455 31.6919C21.4656 31.87 21.2947 32.0587 21.1344 32.2546C20.9724 32.4505 20.8228 32.6553 20.6803 32.8654C20.5396 33.0773 20.4096 33.2946 20.2903 33.5172C20.171 33.7416 20.0624 33.9713 19.9644 34.2046C19.8683 34.4397 19.7828 34.6783 19.708 34.9222C19.635 35.1644 19.5727 35.4102 19.5246 35.6595C19.4747 35.9088 19.4373 36.1581 19.4124 36.411C19.3875 36.6639 19.375 36.9167 19.375 37.1714V38.2559C18.1801 37.5471 16.889 37.1856 15.5 37.1714C15.2471 37.1714 14.9925 37.1839 14.7396 37.2088C14.4885 37.2337 14.2374 37.2711 13.9881 37.3192C13.7388 37.3691 13.493 37.4314 13.2509 37.5044C13.0069 37.5792 12.7683 37.6647 12.535 37.7608C12.2999 37.8588 12.0702 37.9674 11.8476 38.0867C11.6232 38.206 11.406 38.336 11.194 38.4767C10.9839 38.6174 10.7791 38.7688 10.5832 38.9308C10.3874 39.0911 10.2004 39.262 10.0205 39.4419C9.84065 39.62 9.66969 39.8087 9.50942 40.0046C9.34737 40.2005 9.19778 40.4035 9.05532 40.6154C8.91464 40.8274 8.78464 41.0446 8.66533 41.2672C8.54601 41.4916 8.43739 41.7213 8.33944 41.9546C8.24328 42.1897 8.1578 42.4283 8.08301 42.6722C8.01 42.9144 7.94767 43.1602 7.89959 43.4095C7.84972 43.6588 7.81233 43.9081 7.7874 44.161C7.76247 44.4139 7.75 44.6667 7.75 44.9214H1.9375C1.81106 44.9214 1.68463 44.9339 1.55997 44.9588C1.43532 44.9837 1.31422 45.0193 1.19669 45.0692C1.07916 45.1173 0.966969 45.1778 0.861903 45.2473C0.755055 45.3185 0.657112 45.3986 0.568072 45.4895C0.477252 45.5785 0.397116 45.6764 0.325885 45.7815C0.256434 45.8884 0.195887 45.9988 0.147806 46.1163C0.0997242 46.2338 0.0623274 46.3567 0.0373966 46.4814C0.0124653 46.606 0 46.7307 0 46.8589V58.4839C0 58.6103 0.0124653 58.7368 0.0373966 58.8614C0.0623274 58.9861 0.0997242 59.1072 0.147806 59.2247C0.195887 59.3422 0.256434 59.4544 0.325885 59.5595C0.397116 59.6663 0.477252 59.7643 0.568072 59.8533C0.657112 59.9441 0.755055 60.0243 0.861903 60.0937C0.966969 60.165 1.07916 60.2255 1.19669 60.2736C1.31422 60.3217 1.43532 60.3591 1.55997 60.384C1.68463 60.4089 1.81106 60.4214 1.9375 60.4214H7.75C7.75 60.6743 7.76247 60.9289 7.7874 61.18C7.81233 61.4329 7.84972 61.684 7.89959 61.9333C7.94767 62.1826 8.01 62.4283 8.08301 62.6705C8.1578 62.9145 8.24328 63.1531 8.33944 63.3864C8.43739 63.6215 8.54601 63.8512 8.66533 64.0738C8.78464 64.2982 8.91464 64.5154 9.05532 64.7273C9.19778 64.9375 9.34737 65.1405 9.50942 65.3382C9.66969 65.534 9.84065 65.721 10.0205 65.9009C10.2004 66.0807 10.3874 66.2517 10.5832 66.412C10.7791 66.5722 10.9839 66.7236 11.194 66.8643C11.406 67.0068 11.6232 67.1367 11.8476 67.2561C12.0702 67.3754 12.2999 67.484 12.535 67.5802C12.7683 67.6781 13.0069 67.7636 13.2509 67.8366C13.493 67.9114 13.7388 67.9719 13.9881 68.0218C14.2374 68.0717 14.4885 68.1091 14.7396 68.134C14.9925 68.1589 15.2471 68.1714 15.5 68.1714C16.889 68.1571 18.1801 67.7956 19.375 67.0869V68.1714C19.375 68.4243 19.3875 68.6789 19.4124 68.93C19.4373 69.1829 19.4747 69.434 19.5246 69.6833C19.5727 69.9326 19.635 70.1783 19.708 70.4205C19.7828 70.6627 19.8683 70.9031 19.9644 71.1364C20.0624 71.3715 20.171 71.6012 20.2903 71.8238C20.4096 72.0482 20.5396 72.2654 20.6803 72.4773C20.8228 72.6875 20.9724 72.8905 21.1344 73.0882C21.2947 73.284 21.4656 73.471 21.6455 73.6509C21.8254 73.8307 22.0124 73.9999 22.2082 74.162C22.4041 74.3222 22.6089 74.4736 22.819 74.6143C23.031 74.7568 23.2482 74.8867 23.4726 75.0061C23.6952 75.1254 23.9249 75.234 24.16 75.3302C24.3933 75.4281 24.6319 75.5136 24.8759 75.5866C25.118 75.6614 25.3638 75.7219 25.6131 75.7718C25.8624 75.8217 26.1135 75.8591 26.3646 75.884C26.6175 75.9089 26.8721 75.9214 27.125 75.9214C27.3797 75.9214 27.6325 75.9089 27.8854 75.884C28.1365 75.8591 28.3876 75.8217 28.6369 75.7718C28.8862 75.7219 29.132 75.6614 29.3741 75.5866C29.6181 75.5136 29.8567 75.4281 30.09 75.3302C30.3251 75.234 30.5548 75.1254 30.7792 75.0061C31.0018 74.8867 31.219 74.7568 31.431 74.6143C31.6411 74.4736 31.8459 74.3222 32.0418 74.162C32.2377 73.9999 32.4264 73.8307 32.6045 73.6509C32.7844 73.471 32.9553 73.284 33.1156 73.0882C33.2776 72.8905 33.4272 72.6875 33.5697 72.4773C33.7104 72.2654 33.8404 72.0482 33.9597 71.8238C34.079 71.6012 34.1876 71.3715 34.2856 71.1364C34.3817 70.9031 34.4672 70.6627 34.542 70.4205C34.615 70.1783 34.6773 69.9326 34.7254 69.6833C34.7753 69.434 34.8127 69.1829 34.8376 68.93C34.8625 68.6789 34.875 68.4243 34.875 68.1714V60.4214H58.125V68.1714C58.125 68.4243 58.1375 68.6789 58.1624 68.93C58.1873 69.1829 58.2247 69.434 58.2746 69.6833C58.3227 69.9326 58.385 70.1783 58.458 70.4205C58.5328 70.6627 58.6183 70.9031 58.7144 71.1364C58.8124 71.3715 58.921 71.6012 59.0403 71.8238C59.1596 72.0482 59.2896 72.2654 59.4303 72.4773C59.5728 72.6875 59.7224 72.8905 59.8844 73.0882C60.0447 73.284 60.2156 73.471 60.3955 73.6509C60.5754 73.8307 60.7624 73.9999 60.9582 74.162C61.1541 74.3222 61.3589 74.4736 61.569 74.6143C61.781 74.7568 61.9982 74.8867 62.2226 75.0061C62.4452 75.1254 62.6749 75.234 62.91 75.3302C63.1433 75.4281 63.3819 75.5136 63.6259 75.5866C63.868 75.6614 64.1138 75.7219 64.3631 75.7718C64.6124 75.8217 64.8635 75.8591 65.1146 75.884C65.3675 75.9089 65.6221 75.9214 65.875 75.9214C66.1297 75.9214 66.3825 75.9089 66.6354 75.884C66.8865 75.8591 67.1376 75.8217 67.3869 75.7718C67.6362 75.7219 67.882 75.6614 68.1241 75.5866C68.3681 75.5136 68.6067 75.4281 68.84 75.3302C69.0751 75.234 69.3048 75.1254 69.5292 75.0061C69.7518 74.8867 69.969 74.7568 70.181 74.6143C70.3911 74.4736 70.5959 74.3222 70.7918 74.162C70.9876 73.9999 71.1764 73.8307 71.3545 73.6509C71.5344 73.471 71.7053 73.284 71.8656 73.0882C72.0276 72.8905 72.1772 72.6875 72.3197 72.4773C72.4604 72.2654 72.5904 72.0482 72.7097 71.8238C72.829 71.6012 72.9376 71.3715 73.0356 71.1364C73.1317 70.9031 73.2172 70.6627 73.292 70.4205C73.365 70.1783 73.4273 69.9326 73.4754 69.6833C73.5253 69.434 73.5627 69.1829 73.5876 68.93C73.6125 68.6789 73.625 68.4243 73.625 68.1714V67.0869C74.8199 67.7956 76.111 68.1571 77.5 68.1714C77.7547 68.1714 78.0075 68.1589 78.2604 68.134C78.5115 68.1091 78.7626 68.0717 79.0119 68.0218C79.2612 67.9719 79.507 67.9114 79.7491 67.8366C79.9931 67.7636 80.2317 67.6781 80.465 67.5802C80.7001 67.484 80.9298 67.3754 81.1542 67.2561C81.3768 67.1367 81.594 67.0068 81.806 66.8643C82.0161 66.7236 82.2209 66.5722 82.4168 66.412C82.6126 66.2517 82.8014 66.0807 82.9795 65.9009C83.1594 65.721 83.3303 65.534 83.4906 65.3382C83.6526 65.1405 83.8022 64.9375 83.9447 64.7273C84.0854 64.5154 84.2154 64.2982 84.3347 64.0738C84.454 63.8512 84.5626 63.6215 84.6606 63.3864C84.7567 63.1531 84.8422 62.9145 84.917 62.6705C84.99 62.4283 85.0523 62.1826 85.1004 61.9333C85.1503 61.684 85.1877 61.4329 85.2126 61.18C85.2375 60.9289 85.25 60.6743 85.25 60.4214H91.0625C91.1889 60.4214 91.3154 60.4089 91.44 60.384C91.5647 60.3591 91.6858 60.3217 91.8033 60.2736C91.9208 60.2255 92.033 60.165 92.1381 60.0937C92.2449 60.0243 92.3429 59.9441 92.4319 59.8533C92.5228 59.7643 92.6029 59.6663 92.6741 59.5595C92.7436 59.4544 92.8041 59.3422 92.8522 59.2247C92.9021 59.1072 92.9377 58.9861 92.9626 58.8614C92.9875 58.7368 93 58.6103 93 58.4839V46.8589C93 46.7307 92.9875 46.606 92.9626 46.4814C92.9377 46.3567 92.9021 46.2338 92.8522 46.1163C92.8041 45.9988 92.7436 45.8884 92.6741 45.7815C92.6029 45.6764 92.5228 45.5785 92.4319 45.4895C92.3429 45.3986 92.2449 45.3185 92.1381 45.2473C92.033 45.1778 91.9208 45.1173 91.8033 45.0692C91.6858 45.0193 91.5647 44.9837 91.44 44.9588C91.3154 44.9339 91.1889 44.9214 91.0625 44.9214ZM34.875 56.5464V48.7964H58.125V56.5464H34.875Z"
                        fill="white"
                      />
                    </g>
                    <path
                      d="M45.5704 37.2432C45.7676 37.4326 45.9918 37.5795 46.245 37.6819C46.4981 37.7824 46.761 37.8346 47.0335 37.8346C47.306 37.8346 47.5688 37.7824 47.8201 37.6819C48.0733 37.5795 48.2975 37.4326 48.4946 37.2432L64.1803 21.9981C64.4876 21.7043 64.7814 21.397 65.0578 21.0723C65.3342 20.7496 65.5931 20.4133 65.8367 20.0635C66.0782 19.7136 66.3024 19.3522 66.5092 18.9812C66.7141 18.6081 66.9016 18.2274 67.0678 17.8351C67.2359 17.4447 67.3828 17.0465 67.5104 16.6407C67.6379 16.2348 67.7442 15.8231 67.8293 15.4057C67.9143 14.9882 67.9781 14.5688 68.0206 14.1456C68.0651 13.7223 68.0863 13.2971 68.0863 12.8719C68.0863 12.4467 68.0651 12.0235 68.0206 11.6002C67.9781 11.1769 67.9143 10.7556 67.8293 10.3401C67.7442 9.92262 67.6379 9.51096 67.5104 9.10509C67.3828 8.69923 67.2359 8.30109 67.0678 7.90876C66.9016 7.51835 66.7141 7.13568 66.5092 6.7646C66.3024 6.39159 66.0782 6.03211 65.8367 5.6823C65.5931 5.33248 65.3342 4.99619 65.0578 4.6715C64.7814 4.34874 64.4876 4.03951 64.1803 3.74574C63.6199 3.20845 63.0149 2.72141 62.3694 2.28656C61.722 1.85363 61.0436 1.47869 60.3323 1.16173C59.6211 0.844767 58.8886 0.591584 58.1329 0.404113C57.3773 0.214709 56.6119 0.0910169 55.835 0.0349685C55.06 -0.0210795 54.283 -0.00948345 53.5099 0.0678243C52.7349 0.147065 51.9735 0.292017 51.2236 0.50268C50.4737 0.713343 49.7489 0.985853 49.0474 1.32214C48.3439 1.65843 47.6771 2.0527 47.0432 2.50688C46.4092 2.0527 45.7425 1.65843 45.0409 1.32214C44.3374 0.985853 43.6126 0.713343 42.8627 0.50268C42.1129 0.292017 41.3514 0.147065 40.5764 0.0678243C39.8033 -0.00948345 39.0263 -0.0210795 38.2513 0.0349685C37.4744 0.0910169 36.709 0.214709 35.9534 0.404113C35.1977 0.591584 34.4652 0.844767 33.754 1.16173C33.0427 1.47869 32.3644 1.85363 31.7169 2.28656C31.0714 2.72141 30.4665 3.20845 29.906 3.74574C29.5987 4.03951 29.3049 4.34874 29.0285 4.6715C28.7522 4.99619 28.4932 5.33248 28.2516 5.6823C28.0081 6.03211 27.7839 6.39159 27.579 6.7646C27.3722 7.13568 27.1847 7.51835 27.0185 7.90876C26.8504 8.30109 26.7035 8.69923 26.5759 9.10509C26.4503 9.51096 26.344 9.92262 26.257 10.3401C26.172 10.7556 26.1082 11.1769 26.0657 11.6002C26.0232 12.0235 26 12.4467 26 12.8719C26 13.2971 26.0232 13.7223 26.0657 14.1456C26.1082 14.5688 26.172 14.9882 26.257 15.4057C26.344 15.8231 26.4503 16.2348 26.5759 16.6407C26.7035 17.0465 26.8504 17.4447 27.0185 17.8351C27.1847 18.2274 27.3722 18.6081 27.579 18.9812C27.7839 19.3522 28.0081 19.7136 28.2516 20.0635C28.4932 20.4133 28.7522 20.7496 29.0285 21.0723C29.3049 21.397 29.5987 21.7043 29.906 21.9981L45.5704 37.2432Z"
                      fill="white"
                    />
                    <path
                      d="M43.4485 22.5024C43.5452 22.601 43.6515 22.686 43.7655 22.7633C43.8795 22.8387 44.0013 22.9025 44.1288 22.9566C44.2564 23.0088 44.3859 23.0474 44.5212 23.0745C44.6565 23.1015 44.7918 23.1151 44.9309 23.1151C45.0681 23.1151 45.2034 23.1015 45.3387 23.0745C45.474 23.0474 45.6054 23.0088 45.731 22.9566C45.8586 22.9025 45.9804 22.8387 46.0944 22.7633C46.2084 22.686 46.3147 22.601 46.4133 22.5024L54.8244 14.0913C54.9964 13.8903 55.1259 13.6661 55.2128 13.4149C55.2998 13.1656 55.3385 12.9085 55.3269 12.6437C55.3172 12.379 55.2592 12.1258 55.1529 11.8823C55.0466 11.6387 54.8997 11.4242 54.7142 11.2367C54.5267 11.0493 54.3103 10.9043 54.0687 10.798C53.8252 10.6917 53.572 10.6337 53.3072 10.6241C53.0424 10.6125 52.7854 10.6511 52.5361 10.7381C52.2848 10.8251 52.0606 10.9546 51.8596 11.1266L44.9406 18.0456L42.229 15.3321C42.0261 15.1601 41.8019 15.0306 41.5506 14.9436C41.3013 14.8567 41.0443 14.818 40.7795 14.8296C40.5147 14.8393 40.2615 14.8973 40.018 15.0036C39.7764 15.1099 39.56 15.2548 39.3725 15.4423C39.1869 15.6298 39.0401 15.8443 38.9338 16.0878C38.8275 16.3313 38.7695 16.5845 38.7598 16.8493C38.7482 17.1141 38.7869 17.3711 38.8739 17.6204C38.9608 17.8717 39.0903 18.0959 39.2623 18.2969L43.4485 22.5024Z"
                      fill="url(#paint0_linear_11968_58355)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_11968_58355"
                        x1="38.1205"
                        y1="18.5963"
                        x2="55.8866"
                        y2="18.6002"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#FB923C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="w-[219px] flex-col justify-start items-center gap-2 inline-flex">
                    <div className="self-stretch text-center text-white text-[32px] font-bold font-Lato">
                      <p className="text-4xl font-bold tracking-tighter text-white whitespace-pre-wrap ">
                        <NumberTicker value={3500} />
                      </p>
                    </div>
                    <div className="self-stretch text-xl font-bold text-center uppercase text-nowrap text-white/60 font-Lato">
                      Total Exercises
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center ">
          <MidHeadingAnimation
            head4="FitnEarn Team"
            head1="FitnEarn Team"
            head2="Our Experts"
          />
        </div>
        <FocusCards cards={cards} />
      </div>
      <div></div>

      <div className="px-28 mq450:px-8">
        <div className="flex flex-col items-center justify-center pt-20 pb-8 ">
          <MidHeadingAnimation
            head4="     Join FitnEarn"
            head1="     Join FitnEarn"
            head2="    Journey Begins"
          />
        </div>
        <div className="px-48 pb-20 mq450:px-0">
          <div className="max-w-4xl pb-20 mx-auto">
            <TextGenerateEffect duration={1.5} filter={true} words={words} />
            {/* <div className="z-10 flex items-center justify-center text-white rounded-lg bg-transperant dark:bg-black">
      <TextReveal text="Founded in Roorkee, Uttarakhand, by a team of fitness enthusiasts and tech innovators, FitnEarn was born out of a desire to merge the worlds of fitness and technology. Recognizing the need for a platform that not only guides individuals on their fitness journey but also provides an extra layer of motivation, we set out to create FitnEarn. Today, we are proud to offer a comprehensive platform that has helped countless users transform their lives, one reward at a time.

  Whether you're looking to start your fitness journey, seeking motivation to continue, or aiming to reach new heights in your wellness goals, FitnEarn is here for you. Let's embark on this rewarding journey together. Your fitness achievements await, and we can't wait to see where they take you. Join Now!" />
    </div> */}
          </div>{" "}
          {/* <TextGenerateEffect duration={50} filter={false} words={words1} />; */}
        </div>
      </div>
    </>
  );
};

export default page;
