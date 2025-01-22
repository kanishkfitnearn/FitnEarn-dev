"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QueryForm from "@/app/(user_profile)/sub_plans/QueryFrom";
import axios from "axios";
import Image from "next/image";
import UserNavbar from "@/app/Components/UserNavbar";
import Popup from "@/app/Components/Popup";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import CancellationModal from "@/app/Components/CancellationModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
const Page = ({ params }: any) => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  interface OnActionButtonProps {
    email: string;
    index: number;
    isInvited: boolean;
    onRemove: (email: string) => Promise<void>;
    onResendInvite: (email: string) => Promise<void>;
  }
  interface SessionData {
    id: string;
    seats: number;
    bookedSeats: number;
    participantEmail: string[];
    participantNames: string[];
  }
  interface BookingDetail {
    bookingId: string;
    transactionId: string;
    payment_mode: string;
    actualAmount: number;
    discountAmount: number;
    grandTotal: number;
  }

  interface Props {
    bookingsDetails: {
      bookings: BookingDetail[];
    }[];
  }

  interface ActionPopup {
    isOpen: boolean;
    email: string | null;
    index: number | null;
  }

  interface ComponentProps {
    sessionData: SessionData;
    genToken: string;
  }
  interface VerifiedParticipant {
    email: string;
    userName: string;
  }

  // Utility function to decode email from cookie format
  const decodeEmail = (encodedEmail: string): string => {
    return decodeURIComponent(encodedEmail.replace(/%40/g, "@"));
  };
  const [email, setEmail] = useState<string>("");
  const [bookingId, setBookingId] = useState();
  const [err, setErr] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [showJoinButton, setShowJoinButton] = useState(false);
  const [verifiedParticipants, setVerifiedParticipants] = useState<
    VerifiedParticipant[]
  >([]);
  const [raiseTicket, setRaiseTicket] = useState(false);

  const [showPolicyPopup, setShowPolicyPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [actionPopup, setActionPopup] = useState<ActionPopup>({
    isOpen: false,
    email: null,
    index: null,
  });
  const [creatorEmail, setCreatorEmail] = useState<string>("");
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cookieEmail = Cookies.get("email");
    if (cookieEmail) {
      setCreatorEmail(decodeEmail(cookieEmail));
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setActionPopup({ isOpen: false, email: null, index: null });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [name, setName] = useState<string | null>("");
  const [bookingsDetails, setBookingsDetails] = useState<any>(null);
  const [userEmailFromAPI, setUserEmailFromApi] = useState<string | null>(null);
  const [coachImg, setCoachImg] = useState<any>(null);
  const [coachLvl, setCoachLvl] = useState<any>(null);
  const [showActionPopUp, setShowActionPopUp] = useState(false);

  const [verificationStatus, setVerificationStatus] = useState<
    Record<string, "verified" | "invited">
  >({});
  const router = useRouter();
  const genToken = Cookies.get("gen_token");
  const checkEmailVerification = async (emailId: string) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/user/search-email?query=${emailId}`,
      );
      return response.data;
    } catch (error) {
      //console.error("Error checking email verification:", error);
      throw error;
    }
  };

  const OnActionButtonInvited = ({
    email,
    index,
  }: {
    email: string;
    index: number;
  }) => {
    return (
      <div
        ref={popupRef}
        className={`absolute ${
          index === 0 ? "left-[980px]" : `left-[${index * 0 + 980}px]`
        } mq450:left-10 h-auto w-[220px] p-4 bg-neutral-800 rounded-2xl border border-[#3f3f3f] flex flex-col gap-4`}
      >
        {/* Remove Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-100 font-Lato">
            Remove
          </span>
          <svg
            className="cursor-pointer"
            onClick={() => removeFriend(email)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.6667 5.17674H13.3333V3.42235C13.3333 2.95706 13.1577 2.51083 12.8452 2.18182C12.5326 1.85281 12.1087 1.66797 11.6667 1.66797H8.33333C7.89131 1.66797 7.46738 1.85281 7.15482 2.18182C6.84226 2.51083 6.66667 2.95706 6.66667 3.42235V5.17674H3.33333C3.11232 5.17674 2.90036 5.26916 2.74408 5.43367C2.5878 5.59817 2.5 5.82129 2.5 6.05393C2.5 6.28658 2.5878 6.5097 2.74408 6.6742C2.90036 6.83871 3.11232 6.93113 3.33333 6.93113H4.16667V16.5803C4.16667 17.0455 4.34226 17.4918 4.65482 17.8208C4.96738 18.1498 5.39131 18.3346 5.83333 18.3346H14.1667C14.6087 18.3346 15.0326 18.1498 15.3452 17.8208C15.6577 17.4918 15.8333 17.0455 15.8333 16.5803V6.93113H16.6667C16.8877 6.93113 17.0996 6.83871 17.2559 6.6742C17.4122 6.5097 17.5 6.28658 17.5 6.05393C17.5 5.82129 17.4122 5.59817 17.2559 5.43367C17.0996 5.26916 16.8877 5.17674 16.6667 5.17674ZM8.33333 3.42235H11.6667V5.17674H8.33333V3.42235ZM14.1667 16.5803H5.83333V6.93113H14.1667V16.5803Z"
              fill="#E5E5E5"
            />
            <path
              d="M8.33333 7.80832C8.11232 7.80832 7.90036 7.90074 7.74408 8.06524C7.5878 8.22975 7.5 8.45287 7.5 8.68551V14.8259C7.5 15.0585 7.5878 15.2816 7.74408 15.4461C7.90036 15.6106 8.11232 15.7031 8.33333 15.7031C8.55435 15.7031 8.76631 15.6106 8.92259 15.4461C9.07887 15.2816 9.16667 15.0585 9.16667 14.8259V8.68551C9.16667 8.45287 9.07887 8.22975 8.92259 8.06524C8.76631 7.90074 8.55435 7.80832 8.33333 7.80832Z"
              fill="#E5E5E5"
            />
            <path
              d="M11.6667 7.80832C11.4457 7.80832 11.2337 7.90074 11.0774 8.06524C10.9211 8.22975 10.8333 8.45287 10.8333 8.68551V14.8259C10.8333 15.0585 10.9211 15.2816 11.0774 15.4461C11.2337 15.6106 11.4457 15.7031 11.6667 15.7031C11.8877 15.7031 12.0996 15.6106 12.2559 15.4461C12.4122 15.2816 12.5 15.0585 12.5 14.8259V8.68551C12.5 8.45287 12.4122 8.22975 12.2559 8.06524C12.0996 7.90074 11.8877 7.80832 11.6667 7.80832Z"
              fill="#E5E5E5"
            />
          </svg>
        </div>

        {/* Resend Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-100 font-Lato">
            Resend
          </span>
          <svg
            onClick={() => ResendInvitation(email)}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.50016 3.3335C1.57516 3.3335 0.833496 4.07516 0.833496 5.00016V15.0002C0.833496 15.4422 1.00909 15.8661 1.32165 16.1787C1.63421 16.4912 2.05814 16.6668 2.50016 16.6668H11.2502C10.9751 16.0067 10.8335 15.2986 10.8335 14.5835C10.8335 13.1469 11.4042 11.7692 12.42 10.7533C13.4358 9.73751 14.8136 9.16683 16.2502 9.16683C16.6712 9.16807 17.0907 9.21841 17.5002 9.31683V5.00016C17.5002 4.55814 17.3246 4.13421 17.012 3.82165C16.6994 3.50909 16.2755 3.3335 15.8335 3.3335H2.50016ZM2.50016 5.00016L9.16683 9.16683L15.8335 5.00016V6.66683L9.16683 10.8335L2.50016 6.66683V5.00016ZM15.8335 10.0002L13.9585 11.8752L15.8335 13.7502V12.5002C16.386 12.5002 16.9159 12.7197 17.3066 13.1104C17.6973 13.5011 17.9168 14.031 17.9168 14.5835C17.9168 14.9168 17.8418 15.2335 17.7002 15.5168L18.6085 16.4252C18.9585 15.9002 19.1668 15.2668 19.1668 14.5835C19.1668 12.7418 17.6752 11.2502 15.8335 11.2502V10.0002ZM13.0585 12.7418C12.7085 13.2668 12.5002 13.9002 12.5002 14.5835C12.5002 16.4252 13.9918 17.9168 15.8335 17.9168V19.1668L17.7085 17.2918L15.8335 15.4168V16.6668C15.281 16.6668 14.7511 16.4473 14.3604 16.0566C13.9697 15.6659 13.7502 15.136 13.7502 14.5835C13.7502 14.2502 13.8252 13.9335 13.9668 13.6502L13.0585 12.7418Z"
              fill="#E5E5E5"
            />
          </svg>
        </div>
      </div>
    );
  };

  const OnActionButton = ({
    email,
    index,
  }: {
    email: string;
    index: number;
  }) => {
    return (
      <div
        ref={popupRef}
        className={`h-11 absolute p-3 mq450:left-10 bg-neutral-800 rounded-2xl border border-[#3f3f3f] flex-col justify-start items-start gap-2.5 inline-flex ${
          index === 0 ? "left-[980px]" : `left-[${index * 0 + 980}px]`
        }`}
      >
        <div className="w-[193px] justify-between items-center inline-flex">
          <div className="text-sm font-semibold text-neutral-100 font-Lato">
            Remove
          </div>
          <svg
            className="cursor-pointer"
            onClick={() => removeFriend(email)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.6667 5.17674H13.3333V3.42235C13.3333 2.95706 13.1577 2.51083 12.8452 2.18182C12.5326 1.85281 12.1087 1.66797 11.6667 1.66797H8.33333C7.89131 1.66797 7.46738 1.85281 7.15482 2.18182C6.84226 2.51083 6.66667 2.95706 6.66667 3.42235V5.17674H3.33333C3.11232 5.17674 2.90036 5.26916 2.74408 5.43367C2.5878 5.59817 2.5 5.82129 2.5 6.05393C2.5 6.28658 2.5878 6.5097 2.74408 6.6742C2.90036 6.83871 3.11232 6.93113 3.33333 6.93113H4.16667V16.5803C4.16667 17.0455 4.34226 17.4918 4.65482 17.8208C4.96738 18.1498 5.39131 18.3346 5.83333 18.3346H14.1667C14.6087 18.3346 15.0326 18.1498 15.3452 17.8208C15.6577 17.4918 15.8333 17.0455 15.8333 16.5803V6.93113H16.6667C16.8877 6.93113 17.0996 6.83871 17.2559 6.6742C17.4122 6.5097 17.5 6.28658 17.5 6.05393C17.5 5.82129 17.4122 5.59817 17.2559 5.43367C17.0996 5.26916 16.8877 5.17674 16.6667 5.17674ZM8.33333 3.42235H11.6667V5.17674H8.33333V3.42235ZM14.1667 16.5803H5.83333V6.93113H14.1667V16.5803Z"
              fill="#E5E5E5"
            />
            <path
              d="M8.33333 7.80832C8.11232 7.80832 7.90036 7.90074 7.74408 8.06524C7.5878 8.22975 7.5 8.45287 7.5 8.68551V14.8259C7.5 15.0585 7.5878 15.2816 7.74408 15.4461C7.90036 15.6106 8.11232 15.7031 8.33333 15.7031C8.55435 15.7031 8.76631 15.6106 8.92259 15.4461C9.07887 15.2816 9.16667 15.0585 9.16667 14.8259V8.68551C9.16667 8.45287 9.07887 8.22975 8.92259 8.06524C8.76631 7.90074 8.55435 7.80832 8.33333 7.80832Z"
              fill="#E5E5E5"
            />
            <path
              d="M11.6667 7.80832C11.4457 7.80832 11.2337 7.90074 11.0774 8.06524C10.9211 8.22975 10.8333 8.45287 10.8333 8.68551V14.8259C10.8333 15.0585 10.9211 15.2816 11.0774 15.4461C11.2337 15.6106 11.4457 15.7031 11.6667 15.7031C11.8877 15.7031 12.0996 15.6106 12.2559 15.4461C12.4122 15.2816 12.5 15.0585 12.5 14.8259V8.68551C12.5 8.45287 12.4122 8.22975 12.2559 8.06524C12.0996 7.90074 11.8877 7.80832 11.6667 7.80832Z"
              fill="#E5E5E5"
            />
          </svg>
        </div>
      </div>
    );
  };

  const sendInvitation = async (emailId: string) => {
    try {
      // Replace with your actual invitation API endpoint
      const response = await axios.post(
        `${apiEndpoint}/api/fitnearn/web/users/session/invite`,
        {
          email: emailId,
          sessionId: params.id,
          userId: Cookies.get("user_id"),
        },
      );
      return response.data.success;
      toast({});
    } catch (error) {
      //console.error("Error sending invitation:", error);
      return false;
    }
  };

  const ResendInvitation = async (emailId: string) => {
    try {
      // Replace with your actual invitation API endpoint
      const response = await axios.post(
        `${apiEndpoint}/api/fitnearn/web/users/session/invite`,
        {
          email: emailId,
          sessionId: params.id,
          userId: Cookies.get("user_id"),
          resend: true,
        },
      );
      toast({
        title: "Email invitation sent successfully to:",
        description: emailId,
        duration: 5000, // 5 seconds
      });
      setActionPopup({ isOpen: false, email: null, index: null });
      return response.data.success;
    } catch (error) {
      //console.error("Error sending invitation:", error);
      return false;
    }
  };
  const updateBookedSeats = (change: number) => {
    setSessionData((prev: any) => ({
      ...prev,
      bookedSeats: Math.max(1, Math.min(prev.seats, prev.bookedSeats + change)),
    }));
  };

  const addFriend = async () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = pattern.test(email);
    if (email === userEmailFromAPI) {
      toast({
        title: "Cannot add yourself",
        description: "You cannot add your own email to the session.",
      });
      setEmail("");
      return;
    }
    if (validEmail) {
      if (invitees.includes(email)) {
        setErr("This email is already added");
        setEmail("");
        return;
      } else if (invitees.length < 6) {
        try {
          // Check if email is verified
          const response = await checkEmailVerification(email);
          const isVerified = response.success;
          const userName = response.data?.exactMatch?.name || "Username";

          if (isVerified) {
            // Email is verified, add participant to the session
            const addParticipantResponse = await fetch(
              `${apiEndpoint}/api/fitnearn/web/users/session/add-participant/${params.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${genToken}`,
                },
                body: JSON.stringify({
                  sessionType: "private",
                  userId: Cookies.get("user_id"),
                  participants: [email],
                }),
              },
            );
            //console.log("response after adding the verified user", response);
            if (addParticipantResponse.ok) {
              // Participant added successfully
              setInvitees([...invitees, email]);
              setVerifiedParticipants([
                ...verifiedParticipants,
                { email, userName },
              ]);

              setVerificationStatus((prev) => ({
                ...prev,
                [email]: "verified",
              }));
              setEmail("");
              setErr("");
              //console.log("response after adding the verified user", response);
              updateBookedSeats(1);
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
            } else {
              // Failed to add participant
              setErr("Failed to add participant. Please try again.");
              //console.log("failed to add  verified user", response);
            }
          } else {
            // Email is not verified, send invitation

            //console.log("Email is not verified, sending invitation to", email);
            const invitationSent = await sendInvitation(email);
            toast({
              title: "Email is not verified, sending invitation to",
              description: email,
              duration: 5000, // 5 seconds
            });

            if (invitationSent) {
              setInvitees([...invitees, email]);
              setVerificationStatus((prev) => ({
                ...prev,
                [email]: "invited",
              }));
              setEmail("");
              setErr("");
              updateBookedSeats(1);
            } else {
              setErr("Failed to send invitation. Please try again.");
            }
          }
        } catch (error) {
          //console.error("Error in email verification or invitation:", error);
          setErr("An error occurred. Please try again.");
        }
      } else {
        setErr("Only six invitees are allowed");
      }
    } else {
      setErr("Valid email is required");
    }
  };
  const removeFriend = async (emailToRemove: string) => {
    if (emailToRemove === creatorEmail) {
      toast({
        title: "Cannot remove creator",
        description: "The creator of the session cannot be removed.",
        duration: 3000,
      });
      return;
    }

    try {
      // First try removing as a participant
      let removeResponse = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/session/remove-participant/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${genToken}`,
          },
          body: JSON.stringify({ email: emailToRemove }),
        },
      );

      let responseData = await removeResponse.json();

      // If first API fails, try removing as an invited user
      if (!removeResponse.ok || !responseData.success) {
        removeResponse = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/session/remove-invited/${params.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${genToken}`,
            },
            body: JSON.stringify({ email: emailToRemove }),
          },
        );
        responseData = await removeResponse.json();
      }

      if (removeResponse.ok && responseData.success) {
        // Update local state immediately without page reload
        setInvitees((prevInvitees) =>
          prevInvitees.filter((e) => e !== emailToRemove),
        );

        setVerifiedParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p.email !== emailToRemove),
        );

        setVerificationStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          delete newStatus[emailToRemove];
          return newStatus;
        });

        setSessionData((prevData: any) => {
          if (!prevData) return null;

          const emailIndex = prevData.participantEmail.indexOf(emailToRemove);

          return {
            ...prevData,
            participantEmail: prevData.participantEmail.filter(
              (e: any) => e !== emailToRemove,
            ),
            participantNames: prevData.participantNames.filter(
              (_: any, i: any) => i !== emailIndex,
            ),
            invitedEmail: prevData.invitedEmail?.filter(
              (e: any) => e !== emailToRemove,
            ),
            bookedSeats: Math.max(1, prevData.bookedSeats - 1),
          };
        });

        toast({
          title: "Participant removed",
          description: `${emailToRemove} has been removed from the session.`,
          duration: 3000,
        });
      } else {
        throw new Error(responseData.message || "Failed to remove user");
      }
    } catch (error) {
      //console.error("Error removing participant:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setActionPopup({ isOpen: false, email: null, index: null });
    }
  };

  const userId = Cookies.get("user_id");
  useEffect(() => {
    //console.log("invitees", invitees);
  }, [invitees]);

  const handleInvite = (e: any) => {
    e.preventDefault();
    //console.log("email :", email);
    if (invitees.length === 0) {
      // setErr("At least one email is required");
      //console.log("invitees", invitees);
    } else {
      setErr("");
      //console.log("you have successfully invited your friends", invitees);
    }
  };
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      //console.log("params", { params });
      try {
        const response = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/session/${params.id}?userId=${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        const data = await response.json();
        setBookingsDetails(data.data.bookingDetails);
        setBookingId(data.data.bookingDetails[0].bookingId);
        setBookingsDetails(data.data.bookingDetails);
        setCoachImg(data.data.coachData.coachProfile);
        setCoachLvl(data.data.coachData.coachLevel);
        setSessionData(data.data.session);

        console.log("SessionData", data);
        console.log("SessionData state", sessionData);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        //console.log("error to fetch the session details");
      }
    };

    fetchSessionData();
  }, []);

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

  const formatTimeSlot = (timeSlot: any) => {
    const [start, end] = timeSlot.split("-");
    const formattedStart = start.replace(/^0/, "").replace(/AM|PM/, "");
    const period = start.includes("AM") ? "AM" : "PM";
    const formattedEnd = end.replace(/^0/, "").replace(/AM|PM/, "");
    return `${formattedStart} - ${formattedEnd} ${period}`;
  };
  async function checkSessionStatus(sessionId: string) {
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/user/session/meetlink/${sessionId}`,
        {
          method: "PATCH",
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking session status:", error);
      return { success: false, message: "Error checking session status" };
    }
  }

  const handleJoinSession = async () => {
    if (!params.id) {
      toast({
        title: "Error",
        description: "Session ID is missing",
        duration: 3000,
      });
      return;
    }

    const { success, message } = await checkSessionStatus(params.id);

    if (success) {
      window.open(sessionData?.meetLink, "_blank");
    } else {
      toast({
        title: "Refund initiated",
        description: message || "The session link is not available.",
        duration: 3000,
      });
    }
  };
  const handleCancelSession = async () => {
    const userId = Cookies.get("user_id");
    const sessionId = params.id;

    if (!userId || !sessionId) {
      // User ID or Session ID is missing
      return;
    }

    // Determine which API endpoint to use based on sessionType
    const apiendpoint =
      sessionData?.sessionType === "private"
        ? `${apiEndpoint}/api/fitnearn/web/users/session/private/cancel`
        : `${apiEndpoint}/api/fitnearn/web/users/session/public/cancel`;

    try {
      // Step 1: Cancel the session
      const cancelResponse = await fetch(apiendpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          sessionId: sessionId,
        }),
      });

      if (!cancelResponse.ok) {
        throw new Error("Failed to cancel session");
      }

      const cancelResult = await cancelResponse.json();

      // Display cancellation success message
      toast({
        title: "Canceled.",
        description: "Session Booking Cancelled Successfully!",
        duration: 3000, // 3 seconds
      });

      // Step 2: Trigger Razorpay refund API
      const refundApiEndpoint = `${apiEndpoint}/api/fitnearn/web/razorpay/refund/${bookingId}`;

      const refundResponse = await fetch(refundApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const refundResult = await refundResponse.json();

      if (refundResponse.ok && refundResult.success) {
        // Display refund success message
        toast({
          title: "Refund has been initiated",
          description: "Process could take 3 business days",
          duration: 3000, // 3 seconds
        });
      } else {
        throw new Error(refundResult.message || "Refund failed");
      }

      // Redirect to upcoming bookings page
      router.push("/my_bookings/upcoming_bookings");
      setShowPopup(false);
    } catch (error: any) {
      console.error("Error during cancellation or refund:", error.message);

      // Handle error (e.g., show an error message)
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        duration: 3000, // 3 seconds
      });
    }
  };

  function SkeletonCard() {
    return (
      <div className="w-full p-6 my-5 border shadow bg-neutral-800 rounded-2xl border-neutral-700 animate-pulse mq450:w-[350px]">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full h-64 md:w-1/3 bg-neutral-700 rounded-xl"></div>
          <div className="w-full space-y-4 md:w-2/3">
            <div className="w-3/4 h-8 rounded bg-neutral-700"></div>
            <div className="w-1/2 h-6 rounded bg-neutral-700"></div>
            <div className="flex gap-4">
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
            </div>
            <div className="w-1/3 h-6 rounded bg-neutral-700"></div>
            <div className="flex gap-4">
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
              <div className="w-1/4 h-6 rounded bg-neutral-700"></div>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="w-1/4 h-10 rounded bg-neutral-700"></div>
              <div className="w-1/4 h-10 rounded bg-neutral-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SkeletonCard1() {
    return (
      <div className="w-[1000px]  h-40 mq450:h-96 p-6 my-5 border shadow bg-neutral-800 rounded-2xl border-neutral-700 animate-pulse mq450:w-[350px]"></div>
    );
  }

  useEffect(() => {
    const checkSessionTime = () => {
      try {
        const now = new Date();
        const sessionDate = new Date(sessionData?.dateTime);

        // Extract start time from timeSlot safely
        const timeSlot = sessionData?.startTime || "";
        const startTimeMatch = timeSlot.match(/(\d{2}:\d{2})(AM|PM)/);

        if (!startTimeMatch) {
          //console.error("Invalid time slot format");
        }

        const timeStr = startTimeMatch[1]; // "04:00"
        const period = startTimeMatch[2]; // "PM"

        // Parse hours and minutes
        const [hoursStr, minutesStr] = timeStr.split(":");
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        // Convert to 24-hour format
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        // Set session date hours and minutes
        sessionDate.setHours(hours);
        sessionDate.setMinutes(minutes);

        // Calculate time window for joining (15 minutes before session)
        const joinWindowStart = new Date(sessionDate);
        joinWindowStart.setMinutes(joinWindowStart.getMinutes() - 15);

        // Calculate session end time (1 hour after start)
        const sessionEnd = new Date(sessionDate);
        sessionEnd.setHours(sessionEnd.getHours() + 1);

        // Show join button if current time is within the join window
        setShowJoinButton(now >= joinWindowStart && now <= sessionEnd);
      } catch (error) {
        //console.error("Error checking session time:", error);
        setShowJoinButton(false);
      }
    };

    // Initial check
    checkSessionTime();

    // Update every minute
    const interval = setInterval(checkSessionTime, 60000);

    return () => clearInterval(interval);
  }, [sessionData]);

  const handleRefundEligibility = async () => {
    try {
      const response = await axios.get(
        ` ${apiEndpoint}/api/fitnearn/web/users/session/refund/${params.id}`,
      );

      if (response.data.success) {
        // If response is true, user is eligible for a refund
        setPopupMessage("Session amound will be refunded.");
      } else {
        // If response is false, user is not eligible for a refund
        setPopupMessage("You are not eligible for a refund.");
      }

      setShowPopup(true); // Show the popup with the appropriate message
    } catch (error) {
      //console.error("Error cancelling session:", error);
      setPopupMessage("You are not eligible for a refund.");
      setShowPopup(true);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );
  if (!bookingsDetails || bookingsDetails.length === 0) {
    return null;
  }
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === bookingsDetails.length - 1;

  const handlePrevious = () => {
    if (!isTransitioning && !isFirstSlide) {
      setSlideDirection("right");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }, 300);
    }
  };

  const handleNext = () => {
    if (!isTransitioning && !isLastSlide) {
      setSlideDirection("left");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 300);
    }
  };

  const currentBooking = bookingsDetails[currentIndex];

  const getSlideStyle = () => {
    if (!isTransitioning) return {};

    return {
      transform: `translateX(${slideDirection === "left" ? "-100%" : "100%"})`,
      opacity: 0,
      transition: "all 300ms ease-in-out",
    };
  };

  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <CancellationModal
          isOpen={showPolicyPopup}
          onClose={() => {
            setShowPolicyPopup(false);
            setShowPopup(true);
          }}
        />
        {showPopup && (
          <Popup
            p1="Cancel Session?"
            p2={popupMessage}
            p3="Terms and Conditons."
            confirm={handleCancelSession}
            p3button={() => {
              setShowPolicyPopup(true);
              setShowPopup(false);
            }}
            cancel={() => setShowPopup(false)}
          />
        )}
        {raiseTicket && (
          <QueryForm
            close={() => {
              setRaiseTicket(false);
            }}
          />
        )}
        <UserNavbar bookingsactivecolor="neutral-700" activebookings={true} />
        <div className="absolute ml-12 mq450:left-[11px] text-white mb-96 mq1 mq450:justify-center mq450:ml-2 top-32 left-44 mq450:left-0 mq450:mt-5 w-fit mq1050:ml-2">
          <div className="w-11 h-11 p-2.5 rounded-full border border-neutral-600 justify-start items-start inline-flex">
            <Link href="/my_bookings/upcoming_bookings">
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
            </Link>
            <button
              onClick={() => {
                setRaiseTicket(!raiseTicket);
              }}
              className={` hover:bg-gradient-to-r hover:border hover:border-neutral-50 hover:from-[#F43F5E] hover:to-[#FB923C] text-white mq1050:ml-[00px] mq450:text-xs mq450:w-[80px] mq1240:ml-[00px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[px] text-sm text-nowrap h-[33px] px-3 py-3 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex 
             
                         ml-[860px] mq450:ml-52 mq450:top-[-210px]
                      
                    }`}
            >
              Raise Ticket
            </button>
          </div>
          <div>
            <p
              style={{ textAlign: "left" }}
              className="flex flex-col justify-start py-5 pl-5 text-4xl font-bold text-left text-center capitaliz text-neutral-300 font-Lato"
            >
              Booking Detail
            </p>
            <p
              style={{ textAlign: "left" }}
              className="py-2 pl-5 text-lg font-normal text-left text-white capitalize font-Lato"
            >
              Booked on{" "}
              {bookingsDetails && bookingsDetails[0]?.payment_date
                ? bookingsDetails[0]?.payment_date
                : "NaN"}
            </p>
            {loading ? (
              <SkeletonCard1 />
            ) : (
              <>
                <div className="flex flex-col items-center overflow-hidden">
                  <div className="relative w-full">
                    <div
                      style={getSlideStyle()}
                      className="w-full max-w-[1024px] mq450:w-[328px] mx-auto mq450:pl-8 mq450:h-auto mq450:flex-col mq450:gap-5 mq1050:w-[800px] h-auto min-h-[147px] pl-[58px] pr-[57px] py-5 flex bg-neutral-800 rounded-2xl shadow border border-neutral-700 mq1240:gap-[65px] gap-[90px]"
                    >
                      <div>
                        <p className="text-xl font-extrabold text-nowrap">
                          Booking Id
                        </p>
                        <p className="text-nowrap md:text-center">
                          {currentBooking?.bookingId || "MX41"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-extrabold text-nowrap">
                          Payment Mode
                        </p>
                        <p className="text-nowrap md:text-center">
                          {currentBooking?.payment_mode || "Card"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-extrabold text-nowrap">
                          Transaction Id
                        </p>
                        <p className="md:text-center text-nowrap">
                          {currentBooking?.razorpayPaymentId || "2201"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-extrabold text-nowrap">
                          Seats
                        </p>
                        <p className="md:text-center text-nowrap">
                          {currentBooking?.seats || "5"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xl font-extrabold text-nowrap">
                          Session Amount
                        </p>
                        <div className="grid grid-cols-2 gap-1 mt-[1px] text-neutral-200 text-[16px]">
                          <p className="">Total:</p>
                          <p className="text-right">
                            ₹ {currentBooking?.actualAmount || "2000"}
                          </p>
                          <p className="text-neutral-200">Discount:</p>
                          <p className="text-right text-neutral-200">
                            - ₹ {currentBooking?.discountAmount || "0"}
                          </p>
                          <p className="font-semibold text-neutral-200 text-nowrap">
                            Grand Total:
                          </p>
                          <p className="font-semibold text-right text-neutral-200">
                            ₹ {currentBooking?.grandTotal || "2000"}
                          </p>
                        </div>
                        {bookingsDetails.length > 1 && (
                          <div className="flex justify-end gap-4 mt-4">
                            <button
                              onClick={handlePrevious}
                              disabled={isTransitioning}
                              className={`p-2 transition-colors rounded-full bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isFirstSlide ? "opacity-50" : "hover:opacity-100"}`}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleNext}
                              disabled={isTransitioning}
                              className={`p-2 transition-colors rounded-full bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isLastSlide ? "opacity-50" : "hover:opacity-100"}`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {loading ? (
            <SkeletonCard />
          ) : (
            <>
              {" "}
              <div className="w-[1024px] mq450:w-[340px] mq450:pl-0 mq450:h-auto mq450:justify-center mq450:flex-col mq1050:pl-12 mq1050:w-[800px] mq1240:gap-5 mt-4  items-center  h-auto pl-10  py-[21px] bg-neutral-800 rounded-2xl shadow border border-neutral-700 gap-36 inline-flex">
                {coachImg ? (
                  <Image
                    layout="fixed"
                    className="object-cover rounded-xl w-[370px] h-[300px] mq450:w-[300px]"
                    src={coachImg}
                    width={370}
                    height={300}
                    alt="session_img"
                    quality={100}
                  />
                ) : (
                  <Image
                    className=""
                    layout="fixed"
                    src="/"
                    width={300}
                    height={400}
                    alt="sessioin_img"
                    quality={100}
                  />
                )}

                <div className="mq450:px-4">
                  <p className="py-2 text-neutral-300 text-[32px] font-bold font-Lato overflow-hidden whitespace-wrap mq450:text-wrap text-ellipsis  mq450:w-[295px]">
                    {sessionData?.title
                      ? sessionData.title
                      : sessionData?.title}
                  </p>
                  <p className="py-1 text-xl font-normal text-white capitalize font-Lato">
                    {sessionData?.coachName}
                  </p>
                  <div className="flex gap-6 mq450:gap-4 mq450:flex-wrap">
                    <div className="flex items-center gap-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6.24992 2.5C6.97214 2.5 7.65964 2.65278 8.31242 2.95833C8.9652 3.26389 9.5277 3.69444 9.99992 4.25C10.4721 3.69444 11.0346 3.26389 11.6874 2.95833C12.3402 2.65278 13.0277 2.5 13.7499 2.5C15.0555 2.5 16.1458 2.9375 17.0208 3.8125C17.8958 4.6875 18.3333 5.77778 18.3333 7.08333C18.3333 7.15278 18.3299 7.22222 18.3233 7.29167C18.3166 7.36111 18.313 7.43056 18.3124 7.5H16.6458C16.6596 7.43056 16.6666 7.36111 16.6666 7.29167V7.08333C16.6666 6.25 16.3888 5.55556 15.8333 5C15.2777 4.44444 14.5833 4.16667 13.7499 4.16667C13.0971 4.16667 12.493 4.35083 11.9374 4.71917C11.3819 5.0875 10.9999 5.55611 10.7916 6.125H9.20825C8.99992 5.55556 8.61797 5.08694 8.06242 4.71917C7.50686 4.35139 6.9027 4.16722 6.24992 4.16667C5.41658 4.16667 4.72214 4.44444 4.16659 5C3.61103 5.55556 3.33325 6.25 3.33325 7.08333V7.29167C3.33325 7.36111 3.3402 7.43056 3.35409 7.5H1.68742C1.68742 7.43056 1.68409 7.36111 1.67742 7.29167C1.67075 7.22222 1.66714 7.15278 1.66659 7.08333C1.66659 5.77778 2.10409 4.6875 2.97909 3.8125C3.85409 2.9375 4.94436 2.5 6.24992 2.5ZM9.99992 17.2292C9.80547 17.2292 9.61103 17.1944 9.41658 17.125C9.22214 17.0556 9.04853 16.9444 8.89575 16.7917C8.42353 16.3611 7.97575 15.9514 7.55242 15.5625C7.12909 15.1736 6.72964 14.7986 6.35408 14.4375C5.97908 14.0764 5.62825 13.7361 5.30159 13.4167C4.97492 13.0972 4.67992 12.7917 4.41659 12.5H6.74992C7.19436 12.9306 7.68047 13.3958 8.20825 13.8958C8.73603 14.3958 9.33325 14.9444 9.99992 15.5417C10.6666 14.9444 11.2638 14.3958 11.7916 13.8958C12.3194 13.3958 12.8055 12.9306 13.2499 12.5H15.6041C15.3402 12.7917 15.0452 13.0972 14.7191 13.4167C14.393 13.7361 14.0421 14.0764 13.6666 14.4375C13.2916 14.7986 12.8888 15.1736 12.4583 15.5625C12.0277 15.9514 11.5763 16.3611 11.1041 16.7917C10.9513 16.9444 10.7777 17.0556 10.5833 17.125C10.3888 17.1944 10.1944 17.2292 9.99992 17.2292ZM9.20825 13.3333C9.38881 13.3333 9.5452 13.2814 9.67742 13.1775C9.80964 13.0736 9.90325 12.9381 9.95825 12.7708L11.0833 9.375L11.8124 10.4583C11.8819 10.5694 11.9791 10.6597 12.1041 10.7292C12.2291 10.7986 12.361 10.8333 12.4999 10.8333H18.3333C18.5694 10.8333 18.7674 10.7533 18.9274 10.5933C19.0874 10.4333 19.1671 10.2356 19.1666 10C19.1666 9.76389 19.0866 9.56611 18.9266 9.40667C18.7666 9.24722 18.5688 9.16722 18.3333 9.16667H12.9791L11.5416 7.04167C11.4583 6.91667 11.3508 6.82306 11.2191 6.76083C11.0874 6.69861 10.9449 6.66722 10.7916 6.66667C10.611 6.66667 10.4549 6.71889 10.3233 6.82333C10.1916 6.92778 10.0977 7.06306 10.0416 7.22917L8.91658 10.6042L8.20825 9.54167C8.13881 9.43056 8.04158 9.34028 7.91658 9.27083C7.79158 9.20139 7.65964 9.16667 7.52075 9.16667H1.66659C1.43047 9.16667 1.2327 9.24667 1.07325 9.40667C0.913807 9.56667 0.833808 9.76444 0.833252 10C0.833252 10.2361 0.913252 10.4342 1.07325 10.5942C1.23325 10.7542 1.43103 10.8339 1.66659 10.8333H7.02075L8.45825 12.9583C8.54158 13.0833 8.64936 13.1772 8.78159 13.24C8.91381 13.3028 9.05603 13.3339 9.20825 13.3333Z"
                          fill="url(#paint0_linear_3962_28069)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3962_28069"
                            x1="9.99992"
                            y1="2.5"
                            x2="9.99992"
                            y2="17.2292"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                        {sessionData?.category &&
                        sessionData?.category?.length > 10
                          ? sessionData.category.slice(0, 10) + "..."
                          : sessionData?.category}
                      </p>
                      {sessionData?.equipment ? (
                        <>
                          <svg
                            className="ml-2 mq450:ml-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              d="M16.6667 8.83333H16.0358L15.4467 7.41083L15.8925 6.96417C16.0487 6.80789 16.1365 6.59597 16.1365 6.375C16.1365 6.15403 16.0487 5.94211 15.8925 5.78583L14.7142 4.6075C14.5579 4.45127 14.346 4.36351 14.125 4.36351C13.904 4.36351 13.6921 4.45127 13.5358 4.6075L13.0892 5.05333L11.6667 4.46417V3.83333C11.6667 3.61232 11.5789 3.40036 11.4226 3.24408C11.2663 3.0878 11.0543 3 10.8333 3H9.16667C8.94565 3 8.73369 3.0878 8.57741 3.24408C8.42113 3.40036 8.33333 3.61232 8.33333 3.83333V4.46417L6.91083 5.05333L6.46417 4.6075C6.30789 4.45127 6.09597 4.36351 5.875 4.36351C5.65403 4.36351 5.44211 4.45127 5.28583 4.6075L4.1075 5.78583C3.95127 5.94211 3.86351 6.15403 3.86351 6.375C3.86351 6.59597 3.95127 6.80789 4.1075 6.96417L4.55417 7.41083L3.96417 8.83333H3.33333C3.11232 8.83333 2.90036 8.92113 2.74408 9.07741C2.5878 9.23369 2.5 9.44565 2.5 9.66667V11.3333C2.5 11.5543 2.5878 11.7663 2.74408 11.9226C2.90036 12.0789 3.11232 12.1667 3.33333 12.1667H3.96417C4.24833 12.8525 4.27 12.9033 4.55333 13.5892L4.1075 14.0358C3.95127 14.1921 3.86351 14.404 3.86351 14.625C3.86351 14.846 3.95127 15.0579 4.1075 15.2142L5.28583 16.3925C5.44211 16.5487 5.65403 16.6365 5.875 16.6365C6.09597 16.6365 6.30789 16.5487 6.46417 16.3925L6.91083 15.9467L8.33333 16.5358V17.1667C8.33333 17.3877 8.42113 17.5996 8.57741 17.7559C8.73369 17.9122 8.94565 18 9.16667 18H10.8333C11.0543 18 11.2663 17.9122 11.4226 17.7559C11.5789 17.5996 11.6667 17.3877 11.6667 17.1667V16.5358L13.0892 15.9458L13.5358 16.3925C13.6921 16.5487 13.904 16.6365 14.125 16.6365C14.346 16.6365 14.5579 16.5487 14.7142 16.3925L15.8925 15.2142C16.0487 15.0579 16.1365 14.846 16.1365 14.625C16.1365 14.404 16.0487 14.1921 15.8925 14.0358L15.4467 13.5892L16.0358 12.1667H16.6667C16.8877 12.1667 17.0996 12.0789 17.2559 11.9226C17.4122 11.7663 17.5 11.5543 17.5 11.3333V9.66667C17.5 9.44565 17.4122 9.23369 17.2559 9.07741C17.0996 8.92113 16.8877 8.83333 16.6667 8.83333ZM10 13.8333C9.34073 13.8333 8.69626 13.6378 8.1481 13.2716C7.59994 12.9053 7.17269 12.3847 6.9204 11.7756C6.66811 11.1665 6.6021 10.4963 6.73072 9.8497C6.85933 9.2031 7.1768 8.60915 7.64298 8.14298C8.10915 7.6768 8.7031 7.35933 9.3497 7.23072C9.9963 7.1021 10.6665 7.16811 11.2756 7.4204C11.8847 7.67269 12.4053 8.09994 12.7716 8.6481C13.1378 9.19626 13.3333 9.84073 13.3333 10.5C13.3333 11.3841 12.9821 12.2319 12.357 12.857C11.7319 13.4821 10.8841 13.8333 10 13.8333Z"
                              fill="url(#paint0_linear_11257_17810)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_11257_17810"
                                x1="1.92308"
                                y1="12.5745"
                                x2="18.0049"
                                y2="12.5771"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#F43F5E" />
                                <stop offset="1" stopColor="#FB923C" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                            {sessionData?.equipment}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="10.1914"
                          width="4.43182"
                          height="7.19"
                          fill="url(#paint0_linear_3962_28074)"
                        />
                        <rect
                          x="7.90918"
                          y="7.3125"
                          width="4.43182"
                          height="10.066"
                          fill="url(#paint1_linear_3962_28074)"
                        />
                        <rect
                          x="14.3181"
                          y="3.5"
                          width="3.43182"
                          height="13.38"
                          stroke="url(#paint2_linear_3962_28074)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3962_28074"
                            x1="4.21591"
                            y1="10.1914"
                            x2="4.21591"
                            y2="17.3814"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_3962_28074"
                            x1="10.1251"
                            y1="7.3125"
                            x2="10.1251"
                            y2="17.3785"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_3962_28074"
                            x1="16.034"
                            y1="3"
                            x2="16.034"
                            y2="17.38"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3206D" />
                            <stop offset="1" stopColor="#F16A33" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="text-lg font-normal text-neutral-400 font-Lato">
                        {coachLvl}
                      </p>
                    </div>
                  </div>
                  <p className="py-2 text-xl font-bold capitalize text-neutral-300 font-Lato">
                    Session Time
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16 4H14.5V3.25C14.5 3.05109 14.421 2.86032 14.2803 2.71967C14.1397 2.57902 13.9489 2.5 13.75 2.5C13.5511 2.5 13.3603 2.57902 13.2197 2.71967C13.079 2.86032 13 3.05109 13 3.25V4H10.75V3.25C10.75 3.05109 10.671 2.86032 10.5303 2.71967C10.3897 2.57902 10.1989 2.5 10 2.5C9.80109 2.5 9.61032 2.57902 9.46967 2.71967C9.32902 2.86032 9.25 3.05109 9.25 3.25V4H7V3.25C7 3.05109 6.92098 2.86032 6.78033 2.71967C6.63968 2.57902 6.44891 2.5 6.25 2.5C6.05109 2.5 5.86032 2.57902 5.71967 2.71967C5.57902 2.86032 5.5 3.05109 5.5 3.25V4H4C3.60218 4 3.22064 4.15804 2.93934 4.43934C2.65804 4.72064 2.5 5.10218 2.5 5.5V16C2.5 16.3978 2.65804 16.7794 2.93934 17.0607C3.22064 17.342 3.60218 17.5 4 17.5H16C16.3978 17.5 16.7794 17.342 17.0607 17.0607C17.342 16.7794 17.5 16.3978 17.5 16V5.5C17.5 5.10218 17.342 4.72064 17.0607 4.43934C16.7794 4.15804 16.3978 4 16 4ZM5.5 5.5C5.5 5.69891 5.57902 5.88968 5.71967 6.03033C5.86032 6.17098 6.05109 6.25 6.25 6.25C6.44891 6.25 6.63968 6.17098 6.78033 6.03033C6.92098 5.88968 7 5.69891 7 5.5H9.25C9.25 5.69891 9.32902 5.88968 9.46967 6.03033C9.61032 6.17098 9.80109 6.25 10 6.25C10.1989 6.25 10.3897 6.17098 10.5303 6.03033C10.671 5.88968 10.75 5.69891 10.75 5.5H13C13 5.69891 13.079 5.88968 13.2197 6.03033C13.3603 6.17098 13.5511 6.25 13.75 6.25C13.9489 6.25 14.1397 6.17098 14.2803 6.03033C14.421 5.88968 14.5 5.69891 14.5 5.5H16V7H4V5.5H5.5ZM4 16V8.5H16V16H4Z"
                          fill="url(#paint0_linear_3962_28060)"
                        />
                        <path
                          d="M6.625 10H5.875C5.66789 10 5.5 10.1679 5.5 10.375V11.125C5.5 11.3321 5.66789 11.5 5.875 11.5H6.625C6.83211 11.5 7 11.3321 7 11.125V10.375C7 10.1679 6.83211 10 6.625 10Z"
                          fill="url(#paint1_linear_3962_28060)"
                        />
                        <path
                          d="M6.625 13H5.875C5.66789 13 5.5 13.1679 5.5 13.375V14.125C5.5 14.3321 5.66789 14.5 5.875 14.5H6.625C6.83211 14.5 7 14.3321 7 14.125V13.375C7 13.1679 6.83211 13 6.625 13Z"
                          fill="url(#paint2_linear_3962_28060)"
                        />
                        <path
                          d="M10.375 10H9.625C9.41789 10 9.25 10.1679 9.25 10.375V11.125C9.25 11.3321 9.41789 11.5 9.625 11.5H10.375C10.5821 11.5 10.75 11.3321 10.75 11.125V10.375C10.75 10.1679 10.5821 10 10.375 10Z"
                          fill="url(#paint3_linear_3962_28060)"
                        />
                        <path
                          d="M10.375 13H9.625C9.41789 13 9.25 13.1679 9.25 13.375V14.125C9.25 14.3321 9.41789 14.5 9.625 14.5H10.375C10.5821 14.5 10.75 14.3321 10.75 14.125V13.375C10.75 13.1679 10.5821 13 10.375 13Z"
                          fill="url(#paint4_linear_3962_28060)"
                        />
                        <path
                          d="M14.125 10H13.375C13.1679 10 13 10.1679 13 10.375V11.125C13 11.3321 13.1679 11.5 13.375 11.5H14.125C14.3321 11.5 14.5 11.3321 14.5 11.125V10.375C14.5 10.1679 14.3321 10 14.125 10Z"
                          fill="url(#paint5_linear_3962_28060)"
                        />
                        <path
                          d="M14.125 13H13.375C13.1679 13 13 13.1679 13 13.375V14.125C13 14.3321 13.1679 14.5 13.375 14.5H14.125C14.3321 14.5 14.5 14.3321 14.5 14.125V13.375C14.5 13.1679 14.3321 13 14.125 13Z"
                          fill="url(#paint6_linear_3962_28060)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint4_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint5_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint6_linear_3962_28060"
                            x1="1.92308"
                            y1="12.0745"
                            x2="18.0049"
                            y2="12.0771"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                        {/* {sessionData?.dateTime
                      ? new Date(sessionData.dateTime).toLocaleDateString()
                      : ""} */}
                        {sessionData?.dateTime
                          ? new Date(sessionData.dateTime)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                          : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10.0001 18.3346C8.35191 18.3346 6.74074 17.8459 5.37033 16.9302C3.99992 16.0145 2.93182 14.7131 2.30109 13.1903C1.67036 11.6676 1.50533 9.99206 1.82687 8.37555C2.14842 6.75905 2.94209 5.27419 4.10753 4.10875C5.27297 2.94331 6.75782 2.14964 8.37433 1.8281C9.99084 1.50655 11.6664 1.67158 13.1891 2.30231C14.7118 2.93304 16.0133 4.00114 16.929 5.37155C17.8447 6.74196 18.3334 8.35313 18.3334 10.0013C18.331 12.2107 17.4522 14.3289 15.89 15.8912C14.3277 17.4535 12.2095 18.3322 10.0001 18.3346ZM10.0001 3.33464C8.68154 3.33464 7.39261 3.72563 6.29628 4.45818C5.19996 5.19072 4.34547 6.23191 3.84089 7.45008C3.3363 8.66826 3.20428 10.0087 3.46152 11.3019C3.71875 12.5951 4.35369 13.783 5.28604 14.7154C6.21839 15.6477 7.40628 16.2826 8.69948 16.5399C9.99269 16.7971 11.3331 16.6651 12.5513 16.1605C13.7695 15.6559 14.8107 14.8014 15.5432 13.7051C16.2758 12.6088 16.6668 11.3198 16.6668 10.0013C16.6648 8.23381 15.9617 6.53927 14.7119 5.28945C13.4621 4.03964 11.7676 3.33662 10.0001 3.33464Z"
                          fill="url(#paint0_linear_3962_28063)"
                        />
                        <path
                          d="M10.0001 10.8346C9.77907 10.8346 9.56711 10.7468 9.41083 10.5906C9.25455 10.4343 9.16675 10.2223 9.16675 10.0013V6.66797C9.16675 6.44696 9.25455 6.235 9.41083 6.07872C9.56711 5.92244 9.77907 5.83464 10.0001 5.83464C10.2211 5.83464 10.4331 5.92244 10.5893 6.07872C10.7456 6.235 10.8334 6.44696 10.8334 6.66797V10.0013C10.8334 10.2223 10.7456 10.4343 10.5893 10.5906C10.4331 10.7468 10.2211 10.8346 10.0001 10.8346Z"
                          fill="url(#paint1_linear_3962_28063)"
                        />
                        <path
                          d="M12.7293 13.5638C12.5083 13.5638 12.2963 13.4759 12.1401 13.3196L9.41083 10.5906C9.25903 10.4334 9.17513 10.2228 9.17702 10.0043C9.17892 9.78581 9.26656 9.5768 9.42107 9.42229C9.57558 9.26778 9.78459 9.18014 10.0031 9.17824C10.2216 9.17635 10.4321 9.26034 10.5893 9.41214L13.3184 12.1413C13.4349 12.2578 13.5143 12.4063 13.5464 12.5679C13.5785 12.7296 13.562 12.8971 13.499 13.0494C13.4359 13.2016 13.3291 13.3317 13.1921 13.4233C13.0551 13.5149 12.894 13.5638 12.7293 13.5638Z"
                          fill="url(#paint2_linear_3962_28063)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3962_28063"
                            x1="1.02572"
                            y1="12.3063"
                            x2="18.8944"
                            y2="12.3092"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_3962_28063"
                            x1="1.02572"
                            y1="12.3063"
                            x2="18.8944"
                            y2="12.3092"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_3962_28063"
                            x1="1.02572"
                            y1="12.3063"
                            x2="18.8944"
                            y2="12.3092"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F43F5E" />
                            <stop offset="1" stopColor="#FB923C" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="text-lg font-normal text-nowrap text-neutral-400 font-Lato">
                        {sessionData?.timeSlot
                          ? formatTimeSlot(sessionData.timeSlot)
                          : sessionData?.startTime}
                      </p>
                      {bookingsDetails?.seat == 1 ? (
                        <></>
                      ) : (
                        <div className="flex items-center gap-1 ml-2 mq450:absolute mq450:top-[1070px] mq450:left-3 "></div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleRefundEligibility}
                    className=" text-nowrap hover:bg-gradient-to-r from-rose-500 to-orange-400 mt-10 h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center gap-2 inline-flex"
                  >
                    Cancel Session
                  </button>
                  {showJoinButton ? (
                    // <Link target="_blank" href={`${sessionData?.meetLink}`}>
                    <button
                      onClick={handleJoinSession}
                      className="text-nowrap mx-5 hover:bg-gradient-to-r from-rose-500 to-orange-400 mt-10 h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center gap-2 inline-flex"
                    >
                      Join Session
                    </button>
                  ) : (
                    // </Link>
                    <button
                      onClick={() => {
                        toast({
                          title: "Session not started yet.",
                          description:
                            "You can join the session when its started!",
                          duration: 3000, // 3 seconds
                        });
                      }}
                      className="text-nowrap mx-5 hover:bg-gradient-to-r from-rose-500 to-orange-400 mt-10 h-[37px] px-3 py-2 rounded-lg border border-rose-500 justify-center items-center gap-2 inline-flex"
                    >
                      Join Session
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {loading ? (
            <SkeletonCard1 />
          ) : (
            <>
              {" "}
              {sessionData?.sessionType != "public" && (
                <div className=" flex flex-col  mb-[235px] md:mb-[100px]">
                  <form onSubmit={handleInvite}>
                    <div className="flex md:flex-row flex-col justify-center items-start gap-[20px] mt-[20px] mb-[100px] md:mb-[40px] ">
                      <section className="flex">
                        <div className="invite-div mq450:w-[340px] h-full w-[328px] md:w-[1024px] px-5 md:px-10 py-6 md:py-6">
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
                          <div className="items-end hidden w-full gap-4 md:flex">
                            <div className="w-[781px]">
                              <Label
                                htmlFor="email"
                                className="text-[#FFFFFF] text-[18px] md:text-[20px] font-normal leading-normal"
                              >
                                Invite additional team members by email
                              </Label>
                              <div className="h-[25px] absolute left-[820px] px-2 py-1 bg-gradient-to-b from-[rgba(251,146,60,0.12)] to-[rgba(244,63,94,0.12)] rounded-lg justify-center items-center gap-2.5 inline-flex">
                                <div className="text-sm font-normal text-orange-500 ">
                                  Seats taken {sessionData?.bookedSeats}/
                                  {sessionData?.seats}
                                </div>
                              </div>
                              <Input
                                type="email"
                                value={email ?? ""}
                                id="email"
                                placeholder="Email"
                                className="bg-[#404040] text-[#FFFFFF] border-solid border-[1px] border-[#737373] mt-4"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            {sessionData?.seats === sessionData?.bookedSeats ? (
                              <Button
                                type="button"
                                className="seatButton cursor-not-allowed w-[112px]"
                                // onClick={addFriend}
                              >
                                + Add
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                className="primaryButton w-[112px]"
                                onClick={addFriend}
                              >
                                + Add
                              </Button>
                            )}
                          </div>
                          <div className="items-end hidden w-full gap-4 mt-4 md:flex">
                            <div className="w-[781px] h-full text-[14px] text-[#A3A3A3] font-normal leading-normal pb-3">
                              {invitees && invitees.length > 0 ? (
                                <div className="flex flex-wrap gap-1"></div>
                              ) : (
                                <span>
                                  You Have selected only {sessionData?.seats}{" "}
                                  seat so you can add only as per your
                                  requirement
                                </span>
                              )}
                            </div>
                            <Link
                              href={`/coachSessionBookingRedirected/${params.id}`}
                            >
                              <Button className="seatButton w-[112px] h-[35px]">
                                + Seat
                              </Button>
                            </Link>
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
                              <div className="h-[25px] absolute mt-3 left-[160px] px-2 py-1 bg-gradient-to-b from-[rgba(251,146,60,0.12)] to-[rgba(244,63,94,0.12)] rounded-lg justify-center items-center gap-2.5 inline-flex">
                                <div className="text-sm font-normal text-orange-500 ">
                                  Seat taken {sessionData?.bookedSeats}/
                                  {sessionData?.seats}
                                </div>
                              </div>
                              <Input
                                type="email"
                                value={email ?? ""}
                                id="email"
                                placeholder="Email"
                                className="bg-[#404040] text-[#FFFFFF] border-solid border-[1px] border-[#737373] mt-4"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="flex gap-3 mt-2">
                              {sessionData?.seats ===
                              sessionData?.bookedSeats ? (
                                <Button
                                  type="button"
                                  className="seatButton cursor-not-allowed w-[112px]"
                                  // onClick={addFriend}
                                >
                                  + Add
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  className="primaryButton w-[112px]"
                                  onClick={addFriend}
                                >
                                  + Add
                                </Button>
                              )}
                              <Link
                                href={`/coachSessionBookingRedirected/${params.id}`}
                              >
                                <Button className="seatButton w-[112px] h-[35px]">
                                  + Seat
                                </Button>
                              </Link>
                            </div>
                            {invitees && invitees.length > 0 ? (
                              <div className="flex flex-wrap gap-1 mt-2"></div>
                            ) : (
                              <span className="text-[12px] text-[#A3A3A3] font-normal leading-normal pb-3 mt-2">
                                You Have select only {sessionData?.seats} seat
                                so you can also add only as per your requirement
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
                            <div className="flex w-full justify-between my-[30px]">
                              <div className=" text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                                Name
                              </div>
                              <div className=" text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                                Email
                              </div>
                              <div className=" text-[12px] md:text-[18px] text-[#D4D4D4] font-normal leading-normal">
                                Action
                              </div>
                            </div>

                            {/* Verified invitees */}

                            {sessionData?.participantEmail &&
                              sessionData?.participantEmail.map(
                                (email: string, index: number) => (
                                  <div
                                    key={email}
                                    className="flex items-center w-full mb-4"
                                  >
                                    <div className="grid grid-cols-[425px_1fr_48px] mq450:grid-cols-[85px_1fr_18px] w-full items-center gap-4 mq450:gap-2">
                                      <div className="flex items-center mq450:flex-wrap mq450:items-start">
                                        <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                          {sessionData.participantNames[index]
                                            ? sessionData.participantNames[
                                                index
                                              ]
                                            : "------------"}
                                        </span>
                                        {sessionData.participantNames[index] ? (
                                          <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0 verified-bg text-[#15803D] font-medium leading-normal">
                                            Verified
                                          </span>
                                        ) : (
                                          <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0 verified-bg text-yellow-300 font-medium leading-normal">
                                            Invited
                                          </span>
                                        )}{" "}
                                      </div>

                                      <span className="text-[14px] mq450:W-[20px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                        {email}
                                      </span>

                                      <div
                                        onClick={() =>
                                          setActionPopup({
                                            isOpen: true,
                                            email,
                                            index,
                                          })
                                        }
                                        className="h-8 w-8 p-1 cursor-pointer bg-[#3f3f3f] rounded-[999px] flex items-center justify-center"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                    {actionPopup.isOpen &&
                                      actionPopup.email === email &&
                                      (sessionData.participantNames[index] ? (
                                        <OnActionButton
                                          email={email}
                                          index={index}
                                        />
                                      ) : (
                                        <OnActionButtonInvited
                                          email={email}
                                          index={index}
                                        />
                                      ))}
                                  </div>
                                ),
                              )}

                            {/* verified inviteees that are added manually */}
                            {verifiedParticipants.map((participant, index) => (
                              <div
                                key={email}
                                className="flex justify-start w-full mb-4"
                              >
                                <div className="grid grid-cols-[425px_1fr_48px] w-full items-center gap-4">
                                  <div className="flex items-center">
                                    <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                      {participant.userName}
                                    </span>
                                    <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0 verified-bg text-[#15803D] font-medium leading-normal">
                                      Verified
                                    </span>
                                  </div>

                                  <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                    {participant.email}
                                  </span>

                                  <div
                                    onClick={() => setShowActionPopUp(true)}
                                    className="h-8 w-8 p-1 cursor-pointer bg-[#3f3f3f] rounded-[999px] flex items-center justify-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  {actionPopup.isOpen &&
                                    actionPopup.email === email && (
                                      <OnActionButton
                                        email={email}
                                        index={index}
                                      />
                                    )}
                                </div>
                              </div>
                            ))}

                            {/* unVerified invitees */}
                            {invitees
                              .filter(
                                (email) =>
                                  verificationStatus[email] === "invited",
                              )
                              .map((email, index) => (
                                <div
                                  key={email}
                                  className="flex justify-start w-full mb-4"
                                >
                                  <div className="grid grid-cols-[425px_1fr_48px] w-full items-center gap-4">
                                    <div className="flex items-center mq450:flex-wrap">
                                      <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                        ------------
                                      </span>
                                      <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0  verified-bg text-yellow-300 font-medium leading-normal">
                                        Invited
                                      </span>
                                    </div>
                                    <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                      {email}
                                    </span>

                                    <div
                                      onClick={() =>
                                        setActionPopup({
                                          isOpen: true,
                                          email,
                                          index:
                                            sessionData.participantEmail
                                              .length + index,
                                        })
                                      }
                                      className="h-8 w-8 p-1 cursor-pointer bg-[#3f3f3f] rounded-[999px] flex items-center justify-center"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z"
                                          stroke="white"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  {actionPopup.isOpen &&
                                    actionPopup.email === email &&
                                    (sessionData.participantNames[index] ? (
                                      <OnActionButtonInvited
                                        email={email}
                                        index={index}
                                      />
                                    ) : (
                                      <OnActionButtonInvited
                                        email={email}
                                        index={index}
                                      />
                                    ))}
                                </div>
                              ))}

                            {/* unverifed invitees from the API */}
                            {sessionData?.invitedEmail?.map(
                              (email: any, index: any) => (
                                <div
                                  key={email}
                                  className="flex justify-start w-full mb-4"
                                >
                                  <div className="grid grid-cols-[425px_1fr_48px] mq450:grid-cols-[85px_1fr_48px] w-full items-center gap-4">
                                    <div className="flex items-center mq450:flex-wrap">
                                      <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                        ------------
                                      </span>
                                      <span className="text-[10px] px-2 py-1 ml-2 mq450:ml-0  verified-bg text-yellow-300 font-medium leading-normal">
                                        Invited
                                      </span>
                                    </div>
                                    <span className="text-[14px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                      {email}
                                    </span>

                                    <div
                                      onClick={() =>
                                        setActionPopup({
                                          isOpen: true,
                                          email,
                                          index:
                                            sessionData.participantEmail
                                              .length + index,
                                        })
                                      }
                                      className="h-8 w-8 p-1 cursor-pointer bg-[#3f3f3f] rounded-[999px] flex items-center justify-center"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z"
                                          stroke="white"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  {actionPopup.isOpen &&
                                    actionPopup.email === email &&
                                    (sessionData.participantNames[index] ? (
                                      <OnActionButtonInvited
                                        email={email}
                                        index={index}
                                      />
                                    ) : (
                                      <OnActionButtonInvited
                                        email={email}
                                        index={index}
                                      />
                                    ))}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
