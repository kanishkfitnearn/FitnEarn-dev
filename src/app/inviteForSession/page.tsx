"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  addInvitee,
  addRequestedInvitees,
  removeInvitee,
  resetInvitees,
} from "../../store/slice";

const InviteForSessionComponent = () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [email, setEmail] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [name, setName] = useState<string | null>("");
  const [userEmailFromAPI, setUserEmailFromApi] = useState<string | null>(null); // set null initially
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    "",
  );
  const [requestedEmails, setRequestedEmails] = useState<string[]>([]);
  const [verifiedEmails, setVerifiedEmails] = useState<
    { email: string; name: string }[]
  >([]);

  const userId = Cookies.get("user_id");
  const router = useRouter();
  const params = useSearchParams();
  const coachId = params.get("coachId");
  // //console.log("coach id",coachId);
  const dispatch = useDispatch();

  const seatCounter = useSelector(
    (state: RootState) => state.counter.seatCounter,
  );

  // Add the userEmailFromApi to the invitees array when it becomes available
  useEffect(() => {
    if (userEmailFromAPI && !invitees.includes(userEmailFromAPI)) {
      // Add the user email only if it's not already in the invitees array
      setInvitees([userEmailFromAPI, ...invitees]);
    }
  }, [userEmailFromAPI]); // Trigger only when userEmailFromAPI changes

  const checkEmailVerification = async (emailId: any) => {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/search-email?query=${emailId}`,
      );
      const result = await response.json();
      //console.log(result);
      if (result.success) {
        //console.log(result.data.exactMatch.name);
        setVerificationStatus("verified");
        setInvitees([...invitees, email]);
        setEmail("");
        //console.log("Invitees list :", [...invitees, email]);
        setErr("");
        setVerifiedEmails([
          ...verifiedEmails,
          { email: emailId, name: result.data.exactMatch.name },
        ]);
        // console.log("Verified emails list :", [
        //   ...verifiedEmails,
        //   { email: emailId, name: result.data.exactMatch.name },
        // ]);
      } else {
        setVerificationStatus("Invite");
      }
    } catch (error) {
      //console.error("Error checking email verification:", error);
      throw error;
    }
  };

  const addFriend = () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = pattern.test(email);
    //console.log("validEmail", validEmail);

    if (validEmail) {
      if (invitees.includes(email)) {
        setErr("This email is already added");
        setEmail("");
      } else if (invitees.length < seatCounter) {
        checkEmailVerification(email);
      } else {
        setErr(`You can select only ${seatCounter} seats.`);
      }
    } else {
      setErr("Valid email is required");
    }
  };

  const inviteFriend = async () => {
    sendInvitation(email);
    //console.log("Invitees list :", [...invitees, email]);
    setErr("");
  };

  const sendInvitation = async (emailId: string) => {
    //console.log("emailId in sendInvitation:", emailId);

    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/session/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set headers to indicate JSON format
          },
          body: JSON.stringify({
            email: emailId,
          }),
        },
      );
      if (!res.ok) {
        setErr("Error in sending Invitation");
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      setRequestedEmails([...requestedEmails, email]);
      setEmail("");
      setVerificationStatus("verified");
      setInvitees([...invitees, email]);
      //console.log("sendInvitation result:", result);
    } catch (error) {
      //console.error("Error sending invitation:", error);
      throw error;
    }
  };

  useEffect(() => {
    //console.log("RequestedEmails", requestedEmails);
  }, [requestedEmails]);

  const removeFriend = (emailToRemove: string) => {
    if (emailToRemove === userEmailFromAPI) {
      setErr("You can not remove yourself from the list");
    } else {
      setInvitees(invitees.filter((invitee) => invitee !== emailToRemove));
      setRequestedEmails(
        requestedEmails.filter(
          (requestedEmail) => requestedEmail !== emailToRemove,
        ),
      );
      setVerifiedEmails(
        verifiedEmails.filter(
          (verifiedMail) => verifiedMail.email !== emailToRemove,
        ),
      );
      setErr("");
    }
  };

  useEffect(() => {
    //console.log("invitees", invitees);
  }, [invitees]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/profile/get-profile?userId=${userId}`,
        );
        const data = await response.json();
        if (data.success) {
          //console.log("fetchUserProfile", data);
          setName(data.userProfile.name);
          setUserEmailFromApi(data.userProfile.email); // Set the user email here
        } else {
          //console.error("Failed to fetch user profile");
        }
      } catch (error) {
        //console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const checkSkipLogic = () => {
    if (seatCounter > 1 && seatCounter !== invitees.length) {
      setErr("You forgot to add your friend");
    } else {
      const url = `/confirmBooking?coachId=${coachId}&sessionType=Private`;
      router.push(url);
    }
  };

  const handleInvite = (e: any) => {
    e.preventDefault();

    //console.log("email :", email);
    if (invitees.length === 0) {
      setErr("At least one email is required");
      //console.log("invitees", invitees);
    }
    if (seatCounter > 1 && seatCounter !== invitees.length) {
      setErr("You forgot to add your friend");
    } else {
      setErr("");
      //console.log("you have successfully invited your friends", invitees);
      const filteredInvitees = invitees.filter(
        (invitee) => !requestedEmails.includes(invitee),
      );
      //console.log("Filtered invitees for dispatch:", filteredInvitees);
      // Dispatch the filtered invitees without changing the original invitees state
      dispatch(addInvitee(filteredInvitees));
      dispatch(addRequestedInvitees(requestedEmails));

      // const url = `/confirmBooking?coachId=${coachId}&sessionId=${metadata.sessionId}`;
      const url = `/confirmBooking?coachId=${coachId}&sessionType=Private`;
      router.push(url);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the form submission or navigation when Enter is pressed
      // Optionally handle other logic when pressing Enter here
      //console.log("Enter key pressed, prevent default action");
    }
  };

  return (
    <div className="pt-[70px] md:pt-[92px] flex flex-col justify-center items-center mb-[35px] md:mb-[100px]">
      <form onSubmit={handleInvite}>
        <div className="flex md:flex-row flex-col justify-center items-start gap-[20px] mt-[40px] mb-[100px] md:mb-[40px] ">
          <div className="flex justify-center items-center w-[40px]">
            <p
              onClick={() => router.back()}
              className="flex justify-center items-center border-[1px] border-[#525252] rounded-full px-[6px] py-[6px] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.7007 11.6351L9.30954 12.0004L9.70067 12.3658L15.3399 17.6341C15.34 17.6342 15.3401 17.6342 15.3401 17.6343C15.5425 17.8243 15.5527 18.1405 15.3644 18.3423L15.3637 18.3432C15.2669 18.4473 15.136 18.5004 15 18.5004C14.8766 18.5004 14.755 18.4561 14.6583 18.3661C14.6582 18.366 14.6581 18.3659 14.658 18.3658L8.95788 13.0406C8.95777 13.0405 8.95765 13.0404 8.95754 13.0403C8.65922 12.7606 8.5 12.3938 8.5 12.0004C8.5 11.6071 8.65926 11.2403 8.95842 10.9607L14.6593 5.63481L14.66 5.63416C14.8603 5.44637 15.1778 5.45698 15.365 5.65809L15.3654 5.65857C15.554 5.8606 15.5431 6.17735 15.3417 6.36605C15.3416 6.36614 15.3415 6.36622 15.3414 6.36631L9.7007 11.6351Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </p>
          </div>
          <section className="flex">
            <div className="invite-div h-full w-[328px] md:w-[1024px] px-5 md:px-10 py-6 md:py-6">
              <div className="flex items-center gap-4 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[24px] md:w-[32px] h-[24px] md:h-[32px]"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M11.3327 15.2995C10.146 15.2995 8.98596 14.9291 7.99926 14.2351C7.01257 13.5412 6.24353 12.5548 5.78941 11.4007C5.33528 10.2466 5.21646 8.97675 5.44797 7.75161C5.67948 6.52647 6.25093 5.4011 7.09004 4.51782C7.92916 3.63454 8.99825 3.03302 10.1621 2.78933C11.326 2.54563 12.5324 2.67071 13.6288 3.14873C14.7251 3.62676 15.6622 4.43627 16.3215 5.4749C16.9808 6.51352 17.3327 7.73462 17.3327 8.98376C17.3309 10.6582 16.6982 12.2636 15.5734 13.4476C14.4485 14.6317 12.9234 15.2977 11.3327 15.2995ZM11.3327 5.47499C10.6734 5.47499 10.0289 5.68077 9.48078 6.06632C8.93262 6.45187 8.50538 6.99987 8.25308 7.64101C8.00079 8.28216 7.93478 8.98765 8.0634 9.66829C8.19202 10.3489 8.50948 10.9741 8.97566 11.4648C9.44183 11.9555 10.0358 12.2897 10.6824 12.4251C11.329 12.5605 11.9992 12.491 12.6083 12.2254C13.2174 11.9599 13.738 11.5101 14.1042 10.9331C14.4705 10.3561 14.666 9.67773 14.666 8.98376C14.666 8.05318 14.3148 7.16071 13.6897 6.50268C13.0646 5.84466 12.2167 5.47499 11.3327 5.47499Z"
                    fill="white"
                  />
                  <path
                    d="M18.666 29.3346H3.99935C3.64573 29.3346 3.30659 29.1868 3.05654 28.9236C2.80649 28.6604 2.66602 28.3034 2.66602 27.9311V23.7206C2.66813 21.8601 3.37119 20.0765 4.62098 18.7609C5.87076 17.4453 7.56522 16.7053 9.33268 16.7031H13.3327C15.1001 16.7053 16.7946 17.4453 18.0444 18.7609C19.2942 20.0765 19.9972 21.8601 19.9993 23.7206V27.9311C19.9993 28.3034 19.8589 28.6604 19.6088 28.9236C19.3588 29.1868 19.0196 29.3346 18.666 29.3346ZM5.33268 26.5276H17.3327V23.7206C17.3327 22.6039 16.9113 21.5329 16.1611 20.7433C15.411 19.9537 14.3935 19.5101 13.3327 19.5101H9.33268C8.27182 19.5101 7.2544 19.9537 6.50426 20.7433C5.75411 21.5329 5.33268 22.6039 5.33268 23.7206V26.5276Z"
                    fill="white"
                  />
                  <path
                    d="M27.9993 12.4925H25.3327V9.68551C25.3327 9.31328 25.1922 8.95629 24.9422 8.69308C24.6921 8.42988 24.353 8.28201 23.9993 8.28201C23.6457 8.28201 23.3066 8.42988 23.0565 8.69308C22.8065 8.95629 22.666 9.31328 22.666 9.68551V12.4925H19.9993C19.6457 12.4925 19.3066 12.6404 19.0565 12.9036C18.8065 13.1668 18.666 13.5238 18.666 13.896C18.666 14.2683 18.8065 14.6253 19.0565 14.8885C19.3066 15.1517 19.6457 15.2995 19.9993 15.2995H22.666V18.1066C22.666 18.4788 22.8065 18.8358 23.0565 19.099C23.3066 19.3622 23.6457 19.5101 23.9993 19.5101C24.353 19.5101 24.6921 19.3622 24.9422 19.099C25.1922 18.8358 25.3327 18.4788 25.3327 18.1066V15.2995H27.9993C28.353 15.2995 28.6921 15.1517 28.9422 14.8885C29.1922 14.6253 29.3327 14.2683 29.3327 13.896C29.3327 13.5238 29.1922 13.1668 28.9422 12.9036C28.6921 12.6404 28.353 12.4925 27.9993 12.4925Z"
                    fill="white"
                  />
                </svg>
                <span className="text-[24px] md:text-[32px] text-[#FFFFFF] font-bold leading-normal">
                  Lets Invite your Friend
                </span>
              </div>
              <div className="items-end hidden w-full gap-0 md:flex">
                <div className="w-[781px]">
                  <Label
                    htmlFor="email"
                    className="text-[#FFFFFF] text-[18px] md:text-[20px] font-normal leading-normal"
                  >
                    Invite additional team members by email
                  </Label>
                  <Input
                    type="email"
                    value={email ?? ""}
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="bg-[#404040] text-[#FFFFFF] border-solid border-[1px] border-[#737373] mt-4"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span
                    className="text-[14px] text-white rounded-[8px] py-1 px-2 font-normal leading-normal"
                    style={{
                      background:
                        "linear-gradient(359deg, rgba(251, 146, 60, 0.12) 0.97%, rgba(244, 63, 94, 0.12) 99.03%)",
                    }}
                  >
                    Seat Available{" "}
                    {invitees.length >= 10
                      ? invitees.length
                      : `0${invitees.length}`}
                    /{seatCounter < 10 ? `0${seatCounter}` : seatCounter}
                  </span>

                  <Button
                    type="button"
                    className="primaryButton w-[112px] mt-5"
                    onClick={
                      verificationStatus === "Invite" ? inviteFriend : addFriend
                    }
                  >
                    {verificationStatus === "Invite" ? "Invite" : "+ Add"}
                  </Button>
                </div>
              </div>
              <div className="items-start justify-between hidden w-full gap-0 mt-4 md:flex">
                <div className=" h-full text-[14px] text-[#A3A3A3] font-normal leading-normal pb-3">
                  {invitees && invitees.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {invitees.map((invitee) => (
                        <span
                          className="flex justify-center items-center gap-2 h-[40px] border-solid border-[1px] border-[#404040] rounded-[8px] p-3"
                          key={invitee}
                        >
                          <span className="text-[#A3A3A3] text-[12px] font-normal leading-[15px]">
                            {invitee}
                          </span>
                          <span onClick={() => removeFriend(invitee)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M8.59796 7.65334L8.2444 8.00689L8.59796 8.36044L12.1225 11.885C12.1516 11.9162 12.1677 11.9574 12.1673 12.0001C12.1669 12.0438 12.1494 12.0856 12.1185 12.1165L12.4721 12.4701L12.1185 12.1166C12.0876 12.1475 12.0458 12.165 12.0021 12.1654C11.9594 12.1657 11.9182 12.1497 11.887 12.1206L8.3624 8.596L8.00884 8.24245L7.65529 8.596L4.12662 12.1247L4.12657 12.1246L4.12053 12.1309C4.10516 12.1468 4.08677 12.1595 4.06644 12.1682C4.0461 12.177 4.02423 12.1816 4.0021 12.1817C3.97997 12.1819 3.95802 12.1777 3.93754 12.1693C3.91706 12.161 3.89845 12.1486 3.8828 12.1329L3.52972 12.486L3.8828 12.1329C3.86715 12.1173 3.85478 12.0987 3.8464 12.0782C3.83802 12.0577 3.8338 12.0358 3.83399 12.0136C3.83418 11.9915 3.83878 11.9696 3.84752 11.9493C3.85625 11.929 3.86895 11.9106 3.88487 11.8952L3.88492 11.8953L3.89106 11.8891L7.41973 8.36044L7.77328 8.00689L7.41973 7.65334L3.89516 4.12876C3.86606 4.09757 3.85 4.05637 3.85037 4.01363C3.85075 3.96993 3.86828 3.92813 3.89918 3.89723C3.93009 3.86633 3.97189 3.8488 4.01559 3.84842C4.05832 3.84805 4.09952 3.86411 4.13072 3.8932L7.65529 7.41778L8.00884 7.77133L8.3624 7.41778L11.8911 3.88911L11.8911 3.88916L11.8972 3.88291C11.9125 3.86699 11.9309 3.8543 11.9513 3.84556C11.9716 3.83683 11.9935 3.83223 12.0156 3.83204C12.0377 3.83185 12.0597 3.83606 12.0801 3.84444C12.1006 3.85282 12.1192 3.8652 12.1349 3.88084L12.488 3.52777L12.1349 3.88085C12.1505 3.8965 12.1629 3.91511 12.1713 3.93559C12.1797 3.95607 12.1839 3.97802 12.1837 4.00014C12.1835 4.02227 12.1789 4.04414 12.1702 4.06448C12.1614 4.08482 12.1487 4.10321 12.1328 4.11858L12.1328 4.11852L12.1266 4.12467L8.59796 7.65334Z"
                                fill="#A3A3A3"
                                stroke="#A3A3A3"
                              />
                            </svg>
                          </span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span>
                      You Have select only {seatCounter} seat so you can also
                      add only as per your requirement
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => router.back()}
                  className="seatButton w-[112px] h-[35px] mr-5"
                >
                  + Seat
                </Button>
              </div>
              {err ? (
                <p className="hidden md:flex gap-2 text-[12px] text-[#EF4444] font-semibold">
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
                  {err}
                </p>
              ) : (
                ""
              )}

              {/* this is only for mobile design start*/}
              <div className="w-full md:hidden">
                <div className="w-full gap-4 ">
                  <Label
                    htmlFor="email"
                    className="text-[#FFFFFF] text-[18px] md:text-[20px] font-normal leading-normal"
                  >
                    Invite additional team members by email
                  </Label>
                  <Input
                    type="email"
                    value={email ?? ""}
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="bg-[#404040] text-[#FFFFFF] border-solid border-[1px] border-[#737373] mt-4"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <Button
                    type="button"
                    onClick={addFriend}
                    className="primaryButton w-[112px]"
                  >
                    + Add
                  </Button>
                  <Button className="seatButton w-[112px]">+ Seat</Button>
                </div>
                {invitees && invitees.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {invitees.map((invitee) => (
                      <span
                        className="flex justify-center items-center gap-1 h-[21px] p-[1.5px] border-solid border-[1px] border-[#404040] rounded-[8px]"
                        key={invitee}
                      >
                        <span className="text-[#A3A3A3] text-[10px] md:text-[12px] font-normal leading-[15px]">
                          {invitee}
                        </span>
                        <span onClick={() => removeFriend(invitee)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8.59796 7.65334L8.2444 8.00689L8.59796 8.36044L12.1225 11.885C12.1516 11.9162 12.1677 11.9574 12.1673 12.0001C12.1669 12.0438 12.1494 12.0856 12.1185 12.1165L12.4721 12.4701L12.1185 12.1166C12.0876 12.1475 12.0458 12.165 12.0021 12.1654C11.9594 12.1657 11.9182 12.1497 11.887 12.1206L8.3624 8.596L8.00884 8.24245L7.65529 8.596L4.12662 12.1247L4.12657 12.1246L4.12053 12.1309C4.10516 12.1468 4.08677 12.1595 4.06644 12.1682C4.0461 12.177 4.02423 12.1816 4.0021 12.1817C3.97997 12.1819 3.95802 12.1777 3.93754 12.1693C3.91706 12.161 3.89845 12.1486 3.8828 12.1329L3.52972 12.486L3.8828 12.1329C3.86715 12.1173 3.85478 12.0987 3.8464 12.0782C3.83802 12.0577 3.8338 12.0358 3.83399 12.0136C3.83418 11.9915 3.83878 11.9696 3.84752 11.9493C3.85625 11.929 3.86895 11.9106 3.88487 11.8952L3.88492 11.8953L3.89106 11.8891L7.41973 8.36044L7.77328 8.00689L7.41973 7.65334L3.89516 4.12876C3.86606 4.09757 3.85 4.05637 3.85037 4.01363C3.85075 3.96993 3.86828 3.92813 3.89918 3.89723C3.93009 3.86633 3.97189 3.8488 4.01559 3.84842C4.05832 3.84805 4.09952 3.86411 4.13072 3.8932L7.65529 7.41778L8.00884 7.77133L8.3624 7.41778L11.8911 3.88911L11.8911 3.88916L11.8972 3.88291C11.9125 3.86699 11.9309 3.8543 11.9513 3.84556C11.9716 3.83683 11.9935 3.83223 12.0156 3.83204C12.0377 3.83185 12.0597 3.83606 12.0801 3.84444C12.1006 3.85282 12.1192 3.8652 12.1349 3.88084L12.488 3.52777L12.1349 3.88085C12.1505 3.8965 12.1629 3.91511 12.1713 3.93559C12.1797 3.95607 12.1839 3.97802 12.1837 4.00014C12.1835 4.02227 12.1789 4.04414 12.1702 4.06448C12.1614 4.08482 12.1487 4.10321 12.1328 4.11858L12.1328 4.11852L12.1266 4.12467L8.59796 7.65334Z"
                              fill="#A3A3A3"
                              stroke="#A3A3A3"
                            />
                          </svg>
                        </span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[12px] text-[#A3A3A3] font-normal leading-normal pb-3 mt-2">
                    You Have select only five seat so you can also add only as
                    per your requirement
                  </span>
                )}
              </div>
              {err ? (
                <p className="md:hidden flex  gap-2 text-[12px] text-[#EF4444] font-semibold">
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
                  {err}
                </p>
              ) : (
                ""
              )}

              {/* this is only for mobile design end*/}

              <div>
                <div className="flex w-full justify-start my-[30px]">
                  <div className="flex-1 text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                    Name
                  </div>
                  <div className="flex-1 text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                    Email
                  </div>
                </div>
                <div className="flex justify-start w-full">
                  <div className="flex-1 text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                    {name} (You)
                  </div>
                  <div className="flex-1 flex justify-between items-center gap-[110px]">
                    <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                      {userEmailFromAPI}
                    </span>
                    <span className="hidden md:flex justify-center items-center verified-bg w-[70px] mr-5">
                      <span className="text-[10px] text-[#15803D] font-medium leading-normal">
                        Verified
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 12.25C5.96165 12.25 4.94662 11.9421 4.08326 11.3652C3.2199 10.7883 2.54699 9.9684 2.14963 9.00909C1.75227 8.04978 1.64831 6.99418 1.85088 5.97578C2.05345 4.95738 2.55347 4.02192 3.28769 3.28769C4.02192 2.55347 4.95738 2.05345 5.97578 1.85088C6.99418 1.64831 8.04978 1.75227 9.00909 2.14963C9.9684 2.54699 10.7883 3.2199 11.3652 4.08326C11.9421 4.94662 12.25 5.96165 12.25 7C12.2485 8.39192 11.6949 9.72639 10.7106 10.7106C9.72639 11.6949 8.39192 12.2485 7 12.25ZM7 2.8C6.16932 2.8 5.35729 3.04633 4.66661 3.50783C3.97592 3.96933 3.4376 4.62528 3.11971 5.39273C2.80182 6.16018 2.71865 7.00466 2.8807 7.81938C3.04276 8.6341 3.44277 9.38247 4.03015 9.96985C4.61753 10.5572 5.3659 10.9572 6.18062 11.1193C6.99534 11.2814 7.83982 11.1982 8.60727 10.8803C9.37472 10.5624 10.0307 10.0241 10.4922 9.3334C10.9537 8.64271 11.2 7.83068 11.2 7C11.1987 5.88648 10.7558 4.81892 9.96847 4.03153C9.18109 3.24415 8.11353 2.80125 7 2.8Z"
                          fill="#15803D"
                        />
                        <path
                          d="M6.475 8.575C6.33577 8.57497 6.20226 8.51964 6.10383 8.42118L5.05383 7.37118C4.95819 7.27216 4.90528 7.13954 4.90647 7.00189C4.90767 6.86424 4.96288 6.73256 5.06022 6.63522C5.15756 6.53788 5.28924 6.48267 5.42689 6.48147C5.56454 6.48028 5.69716 6.53319 5.79618 6.62883L6.475 7.30765L8.20383 5.57883C8.30284 5.48319 8.43546 5.43028 8.57311 5.43147C8.71076 5.43267 8.84244 5.48788 8.93978 5.58522C9.03712 5.68256 9.09233 5.81424 9.09353 5.95189C9.09473 6.08954 9.04181 6.22216 8.94618 6.32118L6.84618 8.42118C6.74774 8.51964 6.61423 8.57497 6.475 8.575Z"
                          fill="#15803D"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                {verifiedEmails &&
                  verifiedEmails.map((item) => (
                    <div key={item.name} className="flex justify-start w-full">
                      <div className="flex-1 text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                        {item.name}
                      </div>
                      <div className="flex-1 flex justify-between items-center gap-[110px]">
                        <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                          {item.email}
                        </span>
                        <span className="hidden md:flex justify-center items-center verified-bg w-[70px] mr-5">
                          <span className="text-[10px] text-[#15803D] font-medium leading-normal">
                            Verified
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M7 12.25C5.96165 12.25 4.94662 11.9421 4.08326 11.3652C3.2199 10.7883 2.54699 9.9684 2.14963 9.00909C1.75227 8.04978 1.64831 6.99418 1.85088 5.97578C2.05345 4.95738 2.55347 4.02192 3.28769 3.28769C4.02192 2.55347 4.95738 2.05345 5.97578 1.85088C6.99418 1.64831 8.04978 1.75227 9.00909 2.14963C9.9684 2.54699 10.7883 3.2199 11.3652 4.08326C11.9421 4.94662 12.25 5.96165 12.25 7C12.2485 8.39192 11.6949 9.72639 10.7106 10.7106C9.72639 11.6949 8.39192 12.2485 7 12.25ZM7 2.8C6.16932 2.8 5.35729 3.04633 4.66661 3.50783C3.97592 3.96933 3.4376 4.62528 3.11971 5.39273C2.80182 6.16018 2.71865 7.00466 2.8807 7.81938C3.04276 8.6341 3.44277 9.38247 4.03015 9.96985C4.61753 10.5572 5.3659 10.9572 6.18062 11.1193C6.99534 11.2814 7.83982 11.1982 8.60727 10.8803C9.37472 10.5624 10.0307 10.0241 10.4922 9.3334C10.9537 8.64271 11.2 7.83068 11.2 7C11.1987 5.88648 10.7558 4.81892 9.96847 4.03153C9.18109 3.24415 8.11353 2.80125 7 2.8Z"
                              fill="#15803D"
                            />
                            <path
                              d="M6.475 8.575C6.33577 8.57497 6.20226 8.51964 6.10383 8.42118L5.05383 7.37118C4.95819 7.27216 4.90528 7.13954 4.90647 7.00189C4.90767 6.86424 4.96288 6.73256 5.06022 6.63522C5.15756 6.53788 5.28924 6.48267 5.42689 6.48147C5.56454 6.48028 5.69716 6.53319 5.79618 6.62883L6.475 7.30765L8.20383 5.57883C8.30284 5.48319 8.43546 5.43028 8.57311 5.43147C8.71076 5.43267 8.84244 5.48788 8.93978 5.58522C9.03712 5.68256 9.09233 5.81424 9.09353 5.95189C9.09473 6.08954 9.04181 6.22216 8.94618 6.32118L6.84618 8.42118C6.74774 8.51964 6.61423 8.57497 6.475 8.575Z"
                              fill="#15803D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                {requestedEmails &&
                  requestedEmails.map((item) => (
                    <div key={item} className="flex justify-start w-full">
                      <div className="flex-1 text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                        -----
                      </div>
                      <div className="flex-1 flex justify-between items-center gap-[110px]">
                        <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                          {item}
                        </span>
                        <span className="hidden md:flex justify-center items-center verified-bg w-[70px] mr-5">
                          <span className="text-[10px] text-yellow-400 font-medium leading-normal">
                            Invited
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 ">
          <div
            onClick={checkSkipLogic}
            className="text-[20px] text-[#F9FAFB] font-normal leading-normal underline cursor-pointer"
          >
            Skip For Now
          </div>
          <Button
            type="submit"
            className="primaryButton w-[298px] md:w-[520px] text-[18px] text-[#DADADA] font-semibold leading-normal"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

const InviteForSession = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <InviteForSessionComponent />
  </Suspense>
);

export default InviteForSession;
