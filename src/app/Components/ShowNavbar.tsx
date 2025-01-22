"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ShowNavbar = () => {
  const pathname = usePathname();

  // List of paths belonging to the onboarding module
  const onboardingPaths = [
    "/signup",
    "/coming-soon",
"/unsubscribe-email",
"/error-verification",
    "/login",
    "/username",
    "/workoutHistory",
    "/exercise-category",
    "/classes-for-you",
    "/explore-video-lib",
    "/health-assesment",
    "/r-w-blogs",
    "/onboard-subscription-plans",
    "/chooseAvatar",
  ];

  // Check if current route belongs to the onboarding module
  const isOnboardingPage = onboardingPaths.some((path) =>
    pathname?.startsWith(path),
  );

  return <>{!isOnboardingPage && <Navbar />}</>;
};

export default ShowNavbar;
