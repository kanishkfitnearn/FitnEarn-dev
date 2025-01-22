"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import checkSessionValidity from "../(checkValidUser)/checkSessionValidity";
import Cookies from "js-cookie";

const SessionChecker = () => {
  const router = useRouter();
  const logoutFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    //console.log("SessionChecker initialized");
    const token = Cookies.get("genToken");

    const checkSession = async () => {
      if (!token) {
        // if token is not present then we will treat user as unregistered user
        return;
      }
      const data = await checkSessionValidity();
      //console.log("Session validity check result:", data);

      if (!data.success) {
        if (logoutFormRef.current) {
          logoutFormRef.current.submit(); // Programmatically submit the logout form
        }
      }
    };

    checkSession(); // Initial check on component mount

    const intervalId = setInterval(checkSession, 10 * 60 * 1000); // Check every 10 minutes

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
      //console.log("SessionChecker unmounted and interval cleared");
    };
  }, [router]);

  return (
    <>
      <form
        action="/api/auth/signout"
        method="GET"
        className="hidden"
        ref={logoutFormRef}
      >
        <button type="submit">Logout</button>
      </form>
    </>
  );
};

export default SessionChecker;
