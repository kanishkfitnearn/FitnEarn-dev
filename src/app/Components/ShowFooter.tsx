"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ShowFooter = () => {
  const pathname = usePathname();

  const onboardingPaths = [
    "/signup",
    "/login",
    "/username",
    "/workoutHistory",
    "/exercise-category",
    "/classes-for-you",
    "/explore-video-lib",
    "/health-assesment",
    "/r-w-blogs",
    "/onboard-subscription-plans",
    "/my_bookings/upcoming_bookings/",
    "/my_bookings/",
    "/user_blogs/all_blogs",
    "/sub_plans/",
    "/user_blogs/",
    "/live_session",
    "/coming-soon",

    "/subscription-plans",
    "/profile",
    "/chooseAvatar",
    "/not-found",
    "/user-not-found",
  ];

  // Check if current route belongs to the onboarding module
  const isOnboardingPage = onboardingPaths.some((path) =>
    pathname?.startsWith(path),
  );

  return <>{!isOnboardingPage && <Footer />}</>;
};

export default ShowFooter;
