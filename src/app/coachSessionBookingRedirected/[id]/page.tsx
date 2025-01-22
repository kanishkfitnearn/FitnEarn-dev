"use client";
import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
// import CoachProfile from "../../../public/coachProfile.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "@/components/ui/use-toast";
import {
  incrementSeat,
  decrementSeat,
  setFormattedDate,
  setTimeSlot,
  setCoachCategory,
  setPrivateSessionDiscount,
  setSeatCounter,
  addInvitee,
  addRequestedInvitees,
  setPrivateSessionPrice,
} from "@/store/slice";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

type Coach = {
  _id: string;
  coverImage: string;
  profileImage: string;
  name: string;
  category: string;
  categoryLevel: string;
};
interface VerifiedParticipant {
  email: string;
  userName: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const [coachDetails, setCoachDetails] = useState<Coach>();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [isPayBtnOn, setIsPayBtnOn] = useState(false);
  const [privateSessionId, setPrivateSessionId] = useState("");
  const [calenderDate, setCalenderDate] = React.useState<Date | undefined>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [category, setCategory] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  // invite friends related states
  const [email, setEmail] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [name, setName] = useState<string | null>("");
  const [userEmailFromAPI, setUserEmailFromApi] = useState<string | null>(null); // set null initially
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    "",
  );
  const [requestedEmails, setRequestedEmails] = useState<string[]>([]);
  const [verifiedEmails, setVerifiedEmails] = useState<
    { email: string; name: string }[]
  >([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingsDetails, setBookingsDetails] = useState<any>(null);
  const [coachImg, setCoachImg] = useState<any>(null);
  const [coachLvl, setCoachLvl] = useState<any>(null);
  const cookieEmail = Cookies.get("email");
  const [verifiedParticipants, setVerifiedParticipants] = useState<
    VerifiedParticipant[]
  >([]);
  const [invitees, setInvitees] = useState<string[]>([]);

  const { push } = useRouter();
  const router = useRouter();

  const dispatch = useDispatch();
  const seatCounter = useSelector(
    (state: RootState) => state.counter.seatCounter,
  );
  const sessionPrize = useSelector(
    (state: RootState) => state.counter.sessionPrize,
  );
  const { formattedDate, timeSlot } = useSelector(
    (state: RootState) => state.counter,
  );
  const sessionDiscount = useSelector(
    (state: RootState) => state.counter.privateSessionDiscount,
  );

  const Invitees = useSelector((state: RootState) => state.counter.invitees);
  const requestedInvitees = useSelector(
    (state: RootState) => state.counter.requestedInvitees,
  );
  const coachCategory = useSelector(
    (state: RootState) => state.counter.coachCategory,
  );

  const userId = Cookies.get("user_id");
  const genToken = Cookies.get("genToken");

  const handleIncrement = () => {
    dispatch(incrementSeat());
  };

  const handleDecrement = () => {
    dispatch(decrementSeat());
  };

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
        setSessionData(data.data.session);
        setBookingsDetails(data.data.bookingDetails[0].bookings);
        setCoachImg(data.data.coachData.coachProfile);
        setCoachLvl(data.data.coachData.coachLevel);
        //console.log(data.data.coachData.coachLevel);
        //console.log(data);
        setLoading(false);
      } catch (err: any) {
        // seterror(err);
        setLoading(false);
        //console.log("error to fetch the session details");
      }
    };

    fetchSessionData();
  }, []);

  //console.log("sessionData", sessionData);

  const formatDateForCoachCard = (
    dateFromBackend: string | undefined | null,
  ) => {
    if (dateFromBackend) {
      const [day, month, year] = dateFromBackend.split("-");
      const date = new Date(`${year}-${month}-${day}`);

      // Add one day to the date
      date.setDate(date.getDate() - 1);

      // Format the date as "25 April"
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      };
      const formattedDate = date.toLocaleDateString("en-GB", options);
      return formattedDate;
    } else {
      return "";
    }
  };

  // payment related functionality starts here
  const paymentMethods = [
    "Pay by UPI",
    "Credit & Debit Cards",
    "More Payment Options",
    "Wallets",
  ];
  const payByUPI = ["PhonePe UPI", "Google Pay", "Add New UPI Id"];
  const morePaymentOptions = ["Google Play Store", "Apple Store"];
  const wallets = ["Paytm", "PhonePe", "PayPal"];

  const handleChange = (value: string) => {
    //console.log("Received value:", value);
    setSelectedValue(value);
    setSelectedUPI("");
    setSelectedCard("");
    setSelectedStore("");
    setSelectedWallet("");
    setIsPayBtnOn(false);
    // const discountedPrice = sessionPrize &&  sessionDiscount ? sessionPrize * (1 - sessionDiscount / 100) : sessionPrize;
    // dispatch(setPrivateSessionPrice(discountedPrice));
  };

  const handleUPIChange = (value: string) => {
    //console.log("Selected UPI method:", value);
    setSelectedUPI(value);
    setIsPayBtnOn(true);
  };

  const handleCardChange = (value: string) => {
    //console.log("Selected card method:", value);
    setSelectedCard(value);
    setIsPayBtnOn(true);
  };

  const handleStoreChange = (value: string) => {
    //console.log("Selected Store method:", value);
    setSelectedStore(value);
    setIsPayBtnOn(true);
  };

  const handleWalletChange = (value: string) => {
    //console.log("Selected Wallet method:", value);
    setSelectedWallet(value);
    setIsPayBtnOn(true);
  };

  const isDateAllowed = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short", // "Sat"
      day: "2-digit", // "23"
      month: "short", // "Sept"
    });
  };

  function formatADate(dateString: string): string {
    const dateParts = dateString.split("-");
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  const formatDateForAPI = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero to day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`; // Return the formatted date
  };

  // const addFriend = () => {
  //   const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const validEmail = pattern.test(email);
  //   //console.log("validEmail", validEmail);

  //   if (validEmail) {
  //     if (invitees.includes(email)) {
  //       setErr("This email is already added");
  //       setEmail("");
  //     } else if (invitees.length < seatCounter) {
  //       checkEmailVerification(email);
  //     } else {
  //       setErr(`You can select only ${seatCounter} seats.`);
  //     }
  //   } else {
  //     setErr("Valid email is required");
  //   }
  // };
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
      // Check if email exists in either invitees or verifiedParticipants
      const isEmailInInvitees = invitees.includes(email);
      const isEmailInVerified = verifiedParticipants.some(
        (p) => p.email === email,
      );

      if (isEmailInInvitees || isEmailInVerified) {
        setErr("This email is already added");
        setEmail("");
        return;
      }

      // Check if total participants (both verified and unverified) is less than seatCounter
      const totalParticipants = invitees.length + verifiedParticipants.length;

      if (totalParticipants < seatCounter) {
        try {
          const response = await checkEmailVerification(email);
          const isVerified = response.success;
          const userName = response.data?.exactMatch?.name || "Username";

          if (isVerified) {
            setVerifiedParticipants([
              ...verifiedParticipants,
              { email, userName },
            ]);
            setVerificationStatus((prev: any) => ({
              ...prev,
              [email]: "verified",
            }));
            setEmail("");
            setErr("");
            toast({
              title: "Verified user added",
              description: `${email} has been added to the session.`,
            });
          } else {
            setInvitees([...invitees, email]);
            setVerificationStatus((prev: any) => ({
              ...prev,
              [email]: "invited",
            }));
            setEmail("");
            setErr("");
            toast({
              title: "Invitation sent",
              description: `An invitation has been sent to ${email}.`,
            });
          }
        } catch (error) {
          //console.error("Error in email verification or invitation:", error);
          setErr("An error occurred. Please try again.");
        }
      } else {
        setErr(`Only ${seatCounter} invitees are allowed`);
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
    } catch (error) {
      //console.error("Error sending invitation:", error);
      return false;
    }
  };
  useEffect(() => {
    //console.log("RequestedEmails", requestedEmails);
  }, [requestedEmails]);

  const removeFriend = (emailToRemove: string) => {
    if (emailToRemove === userEmailFromAPI) {
      setErr("You cannot remove yourself from the list");
      return;
    }

    // Remove from invitees if present
    setInvitees(invitees.filter((invitee) => invitee !== emailToRemove));

    // Remove from verifiedParticipants if present
    setVerifiedParticipants(
      verifiedParticipants.filter(
        (participant) => participant.email !== emailToRemove,
      ),
    );

    // Clean up other related states
    setRequestedEmails(
      requestedEmails.filter(
        (requestedEmail) => requestedEmail !== emailToRemove,
      ),
    );

    // Remove from verification status
    setVerificationStatus((prev: any) => {
      const newStatus = { ...prev };
      delete newStatus[emailToRemove];
      return newStatus;
    });

    setErr("");
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

  // const checkSkipLogic = () => {
  //   if (seatCounter > 1 && seatCounter !== invitees.length) {
  //     setErr("You forgot to add your friend");
  //   } else {
  //     const url = `/confirmBooking?coachId=${coachId}&sessionType=Private`;
  //     router.push(url);
  //   }
  // };
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (invitees.length === 0 && verifiedParticipants.length === 0) {
      setErr("At least one email is required");
    }
    // else if (invitees.length || verifiedParticipants.length !== seatCounter) {
    //   setErr(`You need to add ${seatCounter} friends`);
    // }
    else {
      setErr("");
      //console.log("Invitees:", invitees);
      //console.log("Verified Participants:", verifiedParticipants);
      // Here you would typically dispatch actions or call APIs to process the invitations
      setIsInviteOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the form submission or navigation when Enter is pressed
      // Optionally handle other logic when pressing Enter here
      //console.log("Enter key pressed, prevent default action");
    }
  };

  const handlePrivateSessionPayment = async (   payMode: any,
    razorpayResponse: any) => {
    setIsLoading(true);

    const FinalPaymentPrice =
      sessionPrize && sessionData?.discountPercent
        ? sessionPrize * (1 - sessionData?.discountPercent / 100)
        : sessionPrize;

    const sessionDetails = {
      participantEmail: verifiedParticipants.map(
        (participant) => participant.email,
      ),
      invitedEmail: invitees,
      newSeats: seatCounter,
      price: FinalPaymentPrice,
    };

    //console.log("sessionDetails", sessionDetails);

    // Client-side validation
    if (sessionDetails.newSeats <= 0) {
      toast({
        title: "Invalid seat count",
        description: "The number of seats must be greater than zero.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/session/add-seat/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
          },
          body: JSON.stringify(sessionDetails),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        //console.error("Error response:", errorData);
        throw new Error(
          errorData?.message || `Failed to add seats: ${res.status}`,
        );
      }

      const result = await res.json();
      //console.log("Seats successfully added:", result);
      toast({
        title: "Success",
        description: "Seats have been successfully added to the session.",
      });
      recordPaymentDetails("Private", params.id,payMode, razorpayResponse);
      router.push(`/my_bookings/upcoming_bookings/${params.id}`);
    } catch (error: any) {
      //console.error("Error in adding seats:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "An error occurred while adding seats. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const recordPaymentDetails = async (
    flag: string,
    session_id: string,
    payMode: any,
    razorpayResponse: any
  ): Promise<void> => {
    const randomTransactionId = Math.floor(1000 + Math.random() * 9000);
    const receiptId = generateRandomId();
    console.log("receiptId", receiptId);
    const body = {
      paymentId: razorpayResponse.razorpay_payment_id || randomTransactionId,
      grandTotal: flag === "Public" ? 300 : sessionPrize,
      userId: userId,
      payment_mode: payMode,
      seats: seatCounter,
      note: "Coach Booking",
      sessionId: session_id,
      currency: "INR",
      receipt: receiptId,
      orderId: razorpayResponse.razorpay_order_id,
    }
    console.log("body of recordPaymentDetails api", body);
    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/booking/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: razorpayResponse.razorpay_payment_id || randomTransactionId,
            grandTotal: flag === "Public" ? 300 : sessionPrize,
            userId: userId,
            payment_mode: payMode,
            seats: seatCounter,
            note: "Coach Booking",
            sessionId: session_id,
            currency: "INR",
            receipt: receiptId,
            orderId: razorpayResponse.razorpay_order_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error recording payment details: ${response.status}`);
      }

      const result = await response.json();
      console.log("Payment details successfully recorded:", result);

      if (result.success) {
        toast({
          title: "Congratulations!",
          description: "Your session has been successfully booked.",
        });
        router.push(`/my_bookings/upcoming_bookings/${result.data.sessionId}`);
        // setTimeout(() => {
        //   router.push(
        //     `/my_bookings/upcoming_bookings/${result.data.sessionId}`
        //   );
        // }, 1000);
      }
    } catch (error) {
      console.error("Error recording payment details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // razor pay function
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const razorpayPrice = sessionPrize * (1 - sessionData?.discountPercent / 100);
  const amount = razorpayPrice * 100; //sesssionprice to be changed
  console.log("amount", amount);
  const currency = "INR";


  function generateRandomId() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let randomId = "";
    for (let i = 0; i < 5; i++) {
      randomId += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return randomId;
  }

  const paymentHandler = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    const receiptId = generateRandomId();
    console.log("receiptId", receiptId);

    type PaymentMode = "wallet" | "card" | "upi" | "netbanking";

    let payMode: PaymentMode;

    if (selectedValue === "Wallets") {
      payMode = "wallet";
    } else if (selectedValue === "Credit & Debit Cards") {
      payMode = "card";
    } else if (selectedValue === "UPI") {
      payMode = "upi";
    } else if (selectedValue === "Net Banking") {
      payMode = "netbanking";
    } else {
      throw new Error("Invalid payment method selected");
    }
    console.log("payMode", payMode);

    const API_URL = `${apiEndpoint}/api/fitnearn/web/razorpay/create-order`;

    try {
      // Create Razorpay order
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
          method: payMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create Razorpay order: ${response.status}`);
        setLoading(false);
      }

      const data = await response.json();
      console.log("Razorpay create-order API result:", data);

      // Razorpay options configuration
      const options = {
        key: "rzp_test_99Mi4G9l7ZajTw", // Replace with your Razorpay Key ID
        amount,
        currency,
        name: "FitnEarn",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.id, // Razorpay Order ID from create-order API
        handler: async function (response: any) {
          console.log("Payment success response:", response);

          // Call API to create a private session
          try {
            await handlePrivateSessionPayment(payMode, response);
          } catch (error) {
            console.error("Error in post-payment processing:", error);
            alert("Something went wrong after payment.");
            setLoading(false);
          }
        },
        prefill: {
          name: "Lokesh Yadav", // Replace with user's name
          email: "lokesh@gmail.com", // Replace with user's email
          contact: "9000090000", // Replace with user's contact number
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        display: {
          widget: {
            main: {
              isDarkMode: true, // Enable dark mode
            },
          },
        },
        theme: {
          color: "#121212", // Dark mode color
          // backdrop_color: "#000000", // Background overlay color
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response);
        alert("Payment failed. Please try again.");
      });

      rzp1.open();
    } catch (error) {
      console.error("Error in Razorpay payment handler:", error);
      alert("Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="pt-[72px] md:pt-[92px] mb-[70px]">
      {/* this for mobile device start */}
      <div className="md:hidden flex gap-[24px] mt-2">
        <div className="flex justify-center items-center w-[40px]">
          <span
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
          </span>
        </div>
        <h1 className="text-[#FFFFFF] text-[20px] font-bold leading-normal">
          Confirm Your Booking
        </h1>
      </div>
      {/* this for mobile device end */}
      <div className="flex md:flex-row flex-col-reverse md:mt-[50px]">
        <div className="flex flex-col items-center flex-1">
          <div className="md:flex hidden gap-[24px]">
            <div className="flex justify-center items-center w-[40px]">
              <span
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
              </span>
            </div>
            <h1 className="text-[#FFFFFF] text-[44px] font-bold leading-normal">
              Confirm Your Booking
            </h1>
          </div>
          <div className="md:pl-[120px] ml-0  w-[360px] md:p-0 md:w-full">
            <div
              className="flex justify-between items-center p-3 md:p-6 bg-[#262626] border-[1.5px] border-[#404040] w-full max-w-[482px] rounded-[18px] mt-6"
              style={{ boxShadow: "0px 0px 5.878px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex flex-col justify-start ">
                <h2 className=" text-[#FFFFFF] text-[20px] md:text-[30px] font-bold leading-normal text-left ">
                  Date
                </h2>
                <div className="flex gap-6 mt-2">
                  <div className="flex items-center justify-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-[16px] md:w-[24px] h-[16px] md:h-[24px]"
                    >
                      <path
                        d="M19.2 4.8H17.4V3.9C17.4 3.66131 17.3052 3.43239 17.1364 3.2636C16.9676 3.09482 16.7387 3 16.5 3C16.2613 3 16.0324 3.09482 15.8636 3.2636C15.6948 3.43239 15.6 3.66131 15.6 3.9V4.8H12.9V3.9C12.9 3.66131 12.8052 3.43239 12.6364 3.2636C12.4676 3.09482 12.2387 3 12 3C11.7613 3 11.5324 3.09482 11.3636 3.2636C11.1948 3.43239 11.1 3.66131 11.1 3.9V4.8H8.4V3.9C8.4 3.66131 8.30518 3.43239 8.1364 3.2636C7.96761 3.09482 7.73869 3 7.5 3C7.26131 3 7.03239 3.09482 6.8636 3.2636C6.69482 3.43239 6.6 3.66131 6.6 3.9V4.8H4.8C4.32261 4.8 3.86477 4.98964 3.52721 5.32721C3.18964 5.66477 3 6.12261 3 6.6V19.2C3 19.6774 3.18964 20.1352 3.52721 20.4728C3.86477 20.8104 4.32261 21 4.8 21H19.2C19.6774 21 20.1352 20.8104 20.4728 20.4728C20.8104 20.1352 21 19.6774 21 19.2V6.6C21 6.12261 20.8104 5.66477 20.4728 5.32721C20.1352 4.98964 19.6774 4.8 19.2 4.8ZM6.6 6.6C6.6 6.83869 6.69482 7.06761 6.8636 7.2364C7.03239 7.40518 7.26131 7.5 7.5 7.5C7.73869 7.5 7.96761 7.40518 8.1364 7.2364C8.30518 7.06761 8.4 6.83869 8.4 6.6H11.1C11.1 6.83869 11.1948 7.06761 11.3636 7.2364C11.5324 7.40518 11.7613 7.5 12 7.5C12.2387 7.5 12.4676 7.40518 12.6364 7.2364C12.8052 7.06761 12.9 6.83869 12.9 6.6H15.6C15.6 6.83869 15.6948 7.06761 15.8636 7.2364C16.0324 7.40518 16.2613 7.5 16.5 7.5C16.7387 7.5 16.9676 7.40518 17.1364 7.2364C17.3052 7.06761 17.4 6.83869 17.4 6.6H19.2V8.4H4.8V6.6H6.6ZM4.8 19.2V10.2H19.2V19.2H4.8Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M7.95 12H7.05C6.80147 12 6.6 12.2015 6.6 12.45V13.35C6.6 13.5985 6.80147 13.8 7.05 13.8H7.95C8.19853 13.8 8.4 13.5985 8.4 13.35V12.45C8.4 12.2015 8.19853 12 7.95 12Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M7.95 15.6H7.05C6.80147 15.6 6.6 15.8015 6.6 16.05V16.95C6.6 17.1985 6.80147 17.4 7.05 17.4H7.95C8.19853 17.4 8.4 17.1985 8.4 16.95V16.05C8.4 15.8015 8.19853 15.6 7.95 15.6Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M12.45 12H11.55C11.3015 12 11.1 12.2015 11.1 12.45V13.35C11.1 13.5985 11.3015 13.8 11.55 13.8H12.45C12.6985 13.8 12.9 13.5985 12.9 13.35V12.45C12.9 12.2015 12.6985 12 12.45 12Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M12.45 15.6H11.55C11.3015 15.6 11.1 15.8015 11.1 16.05V16.95C11.1 17.1985 11.3015 17.4 11.55 17.4H12.45C12.6985 17.4 12.9 17.1985 12.9 16.95V16.05C12.9 15.8015 12.6985 15.6 12.45 15.6Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M16.95 12H16.05C15.8015 12 15.6 12.2015 15.6 12.45V13.35C15.6 13.5985 15.8015 13.8 16.05 13.8H16.95C17.1985 13.8 17.4 13.5985 17.4 13.35V12.45C17.4 12.2015 17.1985 12 16.95 12Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M16.95 15.6H16.05C15.8015 15.6 15.6 15.8015 15.6 16.05V16.95C15.6 17.1985 15.8015 17.4 16.05 17.4H16.95C17.1985 17.4 17.4 17.1985 17.4 16.95V16.05C17.4 15.8015 17.1985 15.6 16.95 15.6Z"
                        fill="#F3F4F6"
                      />
                    </svg>
                    <span className="text-[#FFFFFF] text-[14px] md:text-[20px] font-normal leading-normal">
                      {/* {formattedDate ? formattedDate : "Wed, May 08"} */}
                      {/* {formattedDate
                        ? formatADate(formattedDate)
                        : formatDate(
                            new Date(calenderDate ? calenderDate : ""),
                          )} */}
                      {sessionData?.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-[16px] md:w-[24px] h-[16px] md:h-[24px]"
                    >
                      <path
                        d="M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92894C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.76121C17.6541 3.51809 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22ZM12 4C10.4178 4 8.87104 4.4692 7.55544 5.34825C6.23985 6.2273 5.21447 7.47673 4.60897 8.93854C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C19.9976 9.879 19.154 7.84556 17.6542 6.34578C16.1545 4.84601 14.121 4.00239 12 4Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.73479 11.1054 7.48043 11.2929 7.2929C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.2929C12.8946 7.48043 13 7.73479 13 8V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M15.275 16.275C15.0098 16.2749 14.7555 16.1696 14.568 15.982L11.2929 12.7071C11.1107 12.5185 11.0101 12.2658 11.0123 12.0036C11.0146 11.7414 11.1198 11.4906 11.3052 11.3052C11.4906 11.1198 11.7414 11.0146 12.0036 11.0123C12.2658 11.0101 12.5184 11.1108 12.707 11.293L15.982 14.568C16.1218 14.7079 16.217 14.886 16.2556 15.08C16.2942 15.2739 16.2744 15.475 16.1987 15.6577C16.123 15.8404 15.9949 15.9965 15.8305 16.1064C15.6661 16.2163 15.4728 16.275 15.275 16.275Z"
                        fill="#F3F4F6"
                      />
                    </svg>
                    <span className="text-[#FFFFFF]  text-[14px] md:text-[20px] font-normal leading-normal">
                      {sessionData?.timeSlot
                        ? sessionData?.timeSlot
                        : "5:45 pm"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Dialog>
                  {/* <DialogTrigger asChild> */}

                  {/* </DialogTrigger> */}
                  <DialogContent className="coach-dropdown mq450:w-[320px] sm:max-w-[495px] flex flex-col justify-center items-center pb-8">
                    <DialogTitle className="flex md:hidden mid-heading text-[22px]">
                      Select Date
                    </DialogTitle>
                    <div className=" w-[285px] h-auto flex flex-col justify-center items-center md:mt-4 py-2 px-2">
                      <div className="items-start justify-start hidden w-full px-4 pt-2 md:flex">
                        <h1 className="mid-heading text-[22px]">Select Date</h1>
                      </div>
                      <Calendar
                        mode="single"
                        selected={calenderDate}
                        onSelect={(day) => {
                          if (day && isDateAllowed(day)) {
                            setCalenderDate(day); // Set date only if allowed
                            const formattedDate = formatDateForAPI(day);
                            dispatch(setFormattedDate(formattedDate));
                          }
                        }}
                        className="text-white rounded-md"
                        disabled={(day) => !isDateAllowed(day)} // Disable dates not in allowed list
                      />

                      <div className="relative flex items-center justify-center w-full gap-5 p-4 cursor-pointer">
                        <DialogClose
                          // onClick={handleSave}
                          className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
                        >
                          Save
                        </DialogClose>
                        <button
                          // onClick={handleSave}
                          className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div
              className="flex justify-between items-center p-3 md:p-6 bg-[#262626] border-[1.5px] border-[#404040] w-full max-w-[482px] rounded-[18px] mt-6"
              style={{ boxShadow: "0px 0px 5.878px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex flex-col justify-start ">
                <h2 className=" text-[#FFFFFF] text-[20px] md:text-[30px] font-bold leading-normal text-left ">
                  Number of seats
                </h2>
                <div className="flex items-center justify-start gap-1 mt-2">
                  <svg
                    className="w-[16px] md:w-[25px] h-[16px] md:h-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M12.744 13.0976C14.3672 13.0976 15.683 11.7125 15.683 10.0039C15.683 8.29525 14.3672 6.91015 12.744 6.91015C11.1208 6.91015 9.80499 8.29525 9.80499 10.0039C9.80499 11.7125 11.1208 13.0976 12.744 13.0976Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M11.7643 16.1913H13.7237C14.763 16.1913 15.7597 16.6258 16.4946 17.3994C17.2295 18.173 17.6424 19.2222 17.6424 20.3162V22.3787H7.84564V20.3162C7.84564 19.2222 8.2585 18.173 8.9934 17.3994C9.7283 16.6258 10.725 16.1913 11.7643 16.1913Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M15.683 10.0039C15.6823 9.27476 15.4365 8.56946 14.9891 8.01286C14.5418 7.45625 13.9217 7.08425 13.2387 6.96274"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M17.1525 2.78522C16.4487 2.78748 15.7585 2.98992 15.1549 3.37112C14.5513 3.75232 14.0568 4.29812 13.7237 4.95081C14.8294 5.18998 15.823 5.82319 16.5368 6.74368C17.2507 7.66416 17.6411 8.81561 17.6424 10.0039C17.6408 10.3364 17.6079 10.668 17.5444 10.9938C18.5461 10.8935 19.4725 10.3903 20.1305 9.58903C20.7886 8.78775 21.1277 7.75015 21.0772 6.69229C21.0267 5.63443 20.5905 4.63785 19.8594 3.91005C19.1284 3.18226 18.1588 2.77935 17.1525 2.78522Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M10.1635 14.368C9.32739 13.8168 8.66662 13.0153 8.26592 12.0663H7.84564C6.54699 12.068 5.30197 12.6117 4.38368 13.5783C3.4654 14.5449 2.94882 15.8555 2.94727 17.2225V19.285C2.94727 19.5585 3.05048 19.8208 3.23421 20.0141C3.41793 20.2075 3.66711 20.3162 3.92694 20.3162H5.88629C5.88853 18.9702 6.30719 17.6616 7.07893 16.5884C7.85067 15.5152 8.93349 14.7357 10.1635 14.368Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M17.6424 12.0663H17.2221C16.8214 13.0153 16.1606 13.8168 15.3245 14.368C16.5545 14.7357 17.6374 15.5152 18.4091 16.5884C19.1808 17.6616 19.5995 18.9702 19.6017 20.3162H21.5611C21.8209 20.3162 22.0701 20.2075 22.2538 20.0141C22.4375 19.8208 22.5408 19.5585 22.5408 19.285V17.2225C22.5392 15.8555 22.0226 14.5449 21.1043 13.5783C20.1861 12.6117 18.941 12.068 17.6424 12.0663Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M7.84564 10.0039C7.84688 8.81561 8.23735 7.66417 8.9512 6.74368C9.66505 5.8232 10.6586 5.18998 11.7643 4.95081C11.4445 4.32567 10.9763 3.79835 10.4054 3.42017C9.83452 3.042 9.18033 2.82586 8.50652 2.79278C7.83271 2.75971 7.16225 2.91084 6.56039 3.23145C5.95854 3.55206 5.44579 4.03124 5.07206 4.62234C4.69834 5.21344 4.47637 5.89632 4.42776 6.60451C4.37915 7.31271 4.50556 8.02208 4.79468 8.66359C5.0838 9.3051 5.52578 9.85689 6.0776 10.2652C6.62942 10.6736 7.27228 10.9246 7.94361 10.9938C7.88008 10.668 7.84727 10.3364 7.84564 10.0039Z"
                      fill="#F3F4F6"
                    />
                  </svg>
                  <span className="text-[14px] md:text-[20px] text-[#FFF] font-normal leading-normal">
                    {seatCounter} member
                  </span>
                </div>
              </div>

              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-[#FFF] w-[80px] md:w-[118px] h-[32px] md:h-[48px] text-[14px] md:text-[20px] font-medium leading-[21px] md:leading-[30px] px-5 border-[1.5px] border-[#F43F5E] rounded-[11px]">
                      Edit
                    </button>
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogContent className="coach-dropdown h-[230px] mq450:w-[320px] sm:max-w-[320px] flex flex-col justify-center items-center gap-0 pb-0">
                    <DialogTitle className="flex mid-heading text-[22px]">
                      Select Seats
                    </DialogTitle>
                    <div className="w-[285px] min-h-[200px]  flex flex-col justify-center items-center gap-3">
                      {/* <div className="items-start justify-start hidden w-full px-4 pt-2 md:flex">
                        <h1 className="mid-heading text-[22px]">
                          Select Seats
                        </h1>
                      </div> */}
                      <div className="flex items-center justify-between w-full gap-1 px-4">
                        <div>
                          <h1 className="text-[#FFFFFF] text-[20px] font-normal tracking-[0.38px] leading-[24px]">
                            Add Your Friend
                          </h1>
                          <h4 className="text-[#D1D5DB] text-[13px] font-semibold tracking-[-0.078px] leading-[18px] mt-[14px]">
                            Add Now
                          </h4>
                        </div>
                        <div className="flex">
                          <button
                            aria-label="Decrement value"
                            onClick={handleDecrement}
                            className="counterButton w-[32px] h-[32px] flex justify-center items-center border-[1px] border-[#FFFFFF] rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M13.9045 9.00391L3.72266 9.00391Z"
                                fill="#525252"
                              />
                              <path
                                d="M13.9045 9.00391L3.72266 9.00391"
                                stroke="white"
                                strokeWidth="1.81818"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="mx-6 flex justify-center items-center text-white text-[18px] font-medium tracking-[0.38px] leading-[24px]">
                            {seatCounter}
                          </span>
                          <button
                            aria-label="Increment value"
                            onClick={handleIncrement}
                            className="counterButton w-[32px] h-[32px] flex justify-center items-center border-[1px] border-[#FFFFFF] rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M9.00107 9.00107H3.91016Z"
                                fill="#FFF7ED"
                              />
                              <path
                                d="M9.00107 3.91016V9.00107M9.00107 9.00107V14.092M9.00107 9.00107H14.092M9.00107 9.00107H3.91016"
                                stroke="white"
                                strokeWidth="1.45455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center w-full gap-5 p-4 cursor-pointer">
                        <DialogClose
                          // onClick={handleSave}
                          className="w-[118px] h-[37px] primaryButton text-[#FFFFFF]"
                        >
                          Save
                        </DialogClose>
                        <DialogClose
                          onClick={() => dispatch(setSeatCounter(1))}
                          className="w-[118px] h-[37px] border-[1px] border-[#FFFFFF] rounded-[8px] text-[#FFFFFF] "
                        >
                          Cancel
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div
              className="flex justify-between items-center p-3 md:p-6 bg-[#262626] border-[1.5px] border-[#404040] w-full max-w-[482px] rounded-[18px] mt-6"
              style={{ boxShadow: "0px 0px 5.878px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex flex-col justify-start ">
                <h2 className=" text-[#FFFFFF] text-[20px] md:text-[30px] font-bold leading-normal text-left ">
                  Invite member
                </h2>
                <div className="flex items-center justify-start gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[16px] md:w-[25px] h-[16px] md:h-[25px]"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M12.744 13.0976C14.3672 13.0976 15.683 11.7125 15.683 10.0039C15.683 8.29525 14.3672 6.91015 12.744 6.91015C11.1208 6.91015 9.80499 8.29525 9.80499 10.0039C9.80499 11.7125 11.1208 13.0976 12.744 13.0976Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M11.7643 16.1913H13.7237C14.763 16.1913 15.7597 16.6258 16.4946 17.3994C17.2295 18.173 17.6424 19.2222 17.6424 20.3162V22.3787H7.84564V20.3162C7.84564 19.2222 8.2585 18.173 8.9934 17.3994C9.7283 16.6258 10.725 16.1913 11.7643 16.1913Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M15.683 10.0039C15.6823 9.27476 15.4365 8.56946 14.9891 8.01286C14.5418 7.45625 13.9217 7.08425 13.2387 6.96274"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M17.1525 2.78522C16.4487 2.78748 15.7585 2.98992 15.1549 3.37112C14.5513 3.75232 14.0568 4.29812 13.7237 4.95081C14.8294 5.18998 15.823 5.82319 16.5368 6.74368C17.2507 7.66416 17.6411 8.81561 17.6424 10.0039C17.6408 10.3364 17.6079 10.668 17.5444 10.9938C18.5461 10.8935 19.4725 10.3903 20.1305 9.58903C20.7886 8.78775 21.1277 7.75015 21.0772 6.69229C21.0267 5.63443 20.5905 4.63785 19.8594 3.91005C19.1284 3.18226 18.1588 2.77935 17.1525 2.78522Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M10.1635 14.368C9.32739 13.8168 8.66662 13.0153 8.26592 12.0663H7.84564C6.54699 12.068 5.30197 12.6117 4.38368 13.5783C3.4654 14.5449 2.94882 15.8555 2.94727 17.2225V19.285C2.94727 19.5585 3.05048 19.8208 3.23421 20.0141C3.41793 20.2075 3.66711 20.3162 3.92694 20.3162H5.88629C5.88853 18.9702 6.30719 17.6616 7.07893 16.5884C7.85067 15.5152 8.93349 14.7357 10.1635 14.368Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M17.6424 12.0663H17.2221C16.8214 13.0153 16.1606 13.8168 15.3245 14.368C16.5545 14.7357 17.6374 15.5152 18.4091 16.5884C19.1808 17.6616 19.5995 18.9702 19.6017 20.3162H21.5611C21.8209 20.3162 22.0701 20.2075 22.2538 20.0141C22.4375 19.8208 22.5408 19.5585 22.5408 19.285V17.2225C22.5392 15.8555 22.0226 14.5449 21.1043 13.5783C20.1861 12.6117 18.941 12.068 17.6424 12.0663Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M7.84564 10.0039C7.84688 8.81561 8.23735 7.66417 8.9512 6.74368C9.66505 5.8232 10.6586 5.18998 11.7643 4.95081C11.4445 4.32567 10.9763 3.79835 10.4054 3.42017C9.83452 3.042 9.18033 2.82586 8.50652 2.79278C7.83271 2.75971 7.16225 2.91084 6.56039 3.23145C5.95854 3.55206 5.44579 4.03124 5.07206 4.62234C4.69834 5.21344 4.47637 5.89632 4.42776 6.60451C4.37915 7.31271 4.50556 8.02208 4.79468 8.66359C5.0838 9.3051 5.52578 9.85689 6.0776 10.2652C6.62942 10.6736 7.27228 10.9246 7.94361 10.9938C7.88008 10.668 7.84727 10.3364 7.84564 10.0039Z"
                      fill="#F3F4F6"
                    />
                  </svg>
                  <span className="text-[14px] md:text-[20px] text-[#FFF] font-normal leading-normal">
                    {seatCounter} invitations
                  </span>
                </div>
              </div>

              <div>
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                  <DialogTrigger asChild>
                    <button className="text-[#FFF] w-[80px] md:w-[118px] h-[32px] md:h-[48px] text-[14px] md:text-[20px] font-medium leading-[21px] md:leading-[30px] px-5 border-[1.5px] border-[#F43F5E] rounded-[11px]">
                      Invite
                    </button>
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogContent className="bg-[#262626] mq450:w-[328px] mq450:pt-0 sm:max-w-[1024px] rounded-[12px] flex flex-col justify-center items-center pb-1">
                    <form onSubmit={handleInvite}>
                      <div className="flex md:flex-row flex-col justify-center items-start gap-[20px] mt-[40px]">
                        <section className="flex">
                          <div className=" h-full w-[328px] md:w-[1024px] px-5 md:px-10 py-6 md:py-6">
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
                                  {invitees.length ||
                                  verifiedParticipants.length >= 10
                                    ? `0${invitees.length + verifiedParticipants.length}`
                                    : `0${invitees.length + verifiedParticipants.length}`}
                                  /
                                  {seatCounter < 10
                                    ? `0${seatCounter}`
                                    : seatCounter}
                                </span>

                                <Button
                                  type="button"
                                  className="primaryButton w-[112px] mt-5"
                                  onClick={
                                    verificationStatus === "Invite"
                                      ? inviteFriend
                                      : addFriend
                                  }
                                >
                                  {verificationStatus === "Invite"
                                    ? "Invite"
                                    : "+ Add"}
                                </Button>
                              </div>
                            </div>
                            <div className="items-start justify-between hidden w-full gap-0 mt-4 md:flex">
                              <div className="h-full text-[14px] text-[#A3A3A3] font-normal leading-normal pb-3">
                                {invitees.length > 0 ||
                                verifiedParticipants.length > 0 ? (
                                  <div className="flex flex-wrap gap-3">
                                    {invitees.map((invitee) => (
                                      <span
                                        className="flex justify-center items-center gap-2 h-[40px] border-solid border-[1px] border-[#404040] rounded-[8px] p-3"
                                        key={invitee}
                                      >
                                        <span className="text-[#A3A3A3] text-[12px] font-normal leading-[15px]">
                                          {invitee}
                                        </span>

                                        <span
                                          onClick={() => removeFriend(invitee)}
                                          className="cursor-pointer"
                                        >
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
                                    {verifiedParticipants.map((participant) => (
                                      <span
                                        className="flex justify-center items-center gap-2 h-[40px] border-solid border-[1px] border-[#404040] rounded-[8px] p-3"
                                        key={participant.email}
                                      >
                                        <span className="text-[#A3A3A3] text-[12px] font-normal leading-[15px]">
                                          {participant.email}
                                        </span>

                                        <span
                                          onClick={() =>
                                            removeFriend(participant.email)
                                          }
                                          className="cursor-pointer"
                                        >
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
                                    You have selected only {seatCounter} seat
                                    {seatCounter !== 1 ? "s" : ""} so you can
                                    also add only as per your requirement
                                  </span>
                                )}
                              </div>
                              {/* <Button
                                onClick={() => router.back()}
                                className="seatButton w-[112px] h-[35px] mr-5"
                              >
                                + Seat
                              </Button> */}
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
                              <div className="flex items-center justify-between gap-3 mt-2">
                                <span
                                  className="text-[14px] text-white rounded-[8px] py-1 px-2 font-normal leading-normal"
                                  style={{
                                    background:
                                      "linear-gradient(359deg, rgba(251, 146, 60, 0.12) 0.97%, rgba(244, 63, 94, 0.12) 99.03%)",
                                  }}
                                >
                                  Seat Available{" "}
                                  {invitees.length ||
                                  verifiedParticipants.length >= 10
                                    ? `0${invitees.length + verifiedParticipants.length}`
                                    : `0${invitees.length + verifiedParticipants.length}`}
                                  /
                                  {seatCounter < 10
                                    ? `0${seatCounter}`
                                    : seatCounter}
                                </span>
                                <Button
                                  type="button"
                                  onClick={
                                    verificationStatus === "Invite"
                                      ? inviteFriend
                                      : addFriend
                                  }
                                  className="primaryButton w-[112px]"
                                >
                                  {verificationStatus === "Invite"
                                    ? "Invite"
                                    : "+ Add"}
                                </Button>
                                {/* <Button className="seatButton w-[112px]">+ Seat</Button> */}
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
                                      <span
                                        onClick={() => removeFriend(invitee)}
                                      >
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
                                  You Have select only five seat so you can also
                                  add only as per your requirement
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
                              {/* <div className="flex justify-start w-full">
                                <div className="flex-1 text-[12px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                  {name} (You)
                                </div>
                                <div className="flex-1 flex justify-between items-center gap-2 md:gap-[110px]">
                                  <span className="text-[12px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                    {userEmailFromAPI}
                                  </span>
                                  <span className="flex justify-center items-center verified-bg w-auto md:w-[70px] md:mr-5">
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
                              </div> */}
                              {verifiedParticipants &&
                                verifiedParticipants.map((item) => (
                                  <div
                                    key={item.userName}
                                    className="flex justify-start w-full"
                                  >
                                    <div className="flex-1 text-[12px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                      {item.userName}
                                    </div>
                                    <div className="flex-1 flex justify-between items-center gap-2 md:gap-[110px]">
                                      <span className="text-[12px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                        {item.email}
                                      </span>
                                      <span className="flex justify-center items-center verified-bg w-auto md:w-[70px] md:mr-5">
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
                              {invitees &&
                                invitees.map((item) => (
                                  <div
                                    key={item}
                                    className="flex justify-start w-full"
                                  >
                                    <div className="flex-1 mq450:max-w-[84px] text-[12px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                      -----
                                    </div>
                                    <div className="flex-1 flex justify-between items-start md:items-center gap-2 md:gap-[110px]">
                                      <span className="text-[12px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                                        {item}
                                      </span>
                                      <span className="flex justify-center items-center verified-bg w-auto md:w-[70px] md:mr-5">
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
                      <div className="flex flex-col items-center justify-center gap-3 mb-3 md:gap-6 ">
                        <DialogClose
                          // onClick={checkSkipLogic}
                          className="text-[16px] md:text-[20px] text-[#F9FAFB] font-normal leading-normal underline cursor-pointer"
                        >
                          Skip For Now
                        </DialogClose>
                        <Button
                          type="submit"
                          className="primaryButton w-[298px] md:w-[520px] text-[18px] text-[#DADADA] font-semibold leading-normal"
                        >
                          Continue
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* <div className="flex flex-col pb-3 w-full max-w-[470px] border-solid border-b-[1px] border-[#525252]">
              <div className="flex justify-between items-center gap-6 w-[470px] max-w-[500px] mt-4 md:mt-10">
                <h2 className=" text-[#FFFFFF] text-[32px] font-bold leading-normal text-left ">
                  Date
                </h2>
                <button className="text-[#FFF] h-[48px] text-[16px] font-medium leading-[24px] py-3 px-5 border-[1px] border-[#F43F5E] rounded-[8px]">
                  Change
                </button>
              </div>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.2 4.8H17.4V3.9C17.4 3.66131 17.3052 3.43239 17.1364 3.2636C16.9676 3.09482 16.7387 3 16.5 3C16.2613 3 16.0324 3.09482 15.8636 3.2636C15.6948 3.43239 15.6 3.66131 15.6 3.9V4.8H12.9V3.9C12.9 3.66131 12.8052 3.43239 12.6364 3.2636C12.4676 3.09482 12.2387 3 12 3C11.7613 3 11.5324 3.09482 11.3636 3.2636C11.1948 3.43239 11.1 3.66131 11.1 3.9V4.8H8.4V3.9C8.4 3.66131 8.30518 3.43239 8.1364 3.2636C7.96761 3.09482 7.73869 3 7.5 3C7.26131 3 7.03239 3.09482 6.8636 3.2636C6.69482 3.43239 6.6 3.66131 6.6 3.9V4.8H4.8C4.32261 4.8 3.86477 4.98964 3.52721 5.32721C3.18964 5.66477 3 6.12261 3 6.6V19.2C3 19.6774 3.18964 20.1352 3.52721 20.4728C3.86477 20.8104 4.32261 21 4.8 21H19.2C19.6774 21 20.1352 20.8104 20.4728 20.4728C20.8104 20.1352 21 19.6774 21 19.2V6.6C21 6.12261 20.8104 5.66477 20.4728 5.32721C20.1352 4.98964 19.6774 4.8 19.2 4.8ZM6.6 6.6C6.6 6.83869 6.69482 7.06761 6.8636 7.2364C7.03239 7.40518 7.26131 7.5 7.5 7.5C7.73869 7.5 7.96761 7.40518 8.1364 7.2364C8.30518 7.06761 8.4 6.83869 8.4 6.6H11.1C11.1 6.83869 11.1948 7.06761 11.3636 7.2364C11.5324 7.40518 11.7613 7.5 12 7.5C12.2387 7.5 12.4676 7.40518 12.6364 7.2364C12.8052 7.06761 12.9 6.83869 12.9 6.6H15.6C15.6 6.83869 15.6948 7.06761 15.8636 7.2364C16.0324 7.40518 16.2613 7.5 16.5 7.5C16.7387 7.5 16.9676 7.40518 17.1364 7.2364C17.3052 7.06761 17.4 6.83869 17.4 6.6H19.2V8.4H4.8V6.6H6.6ZM4.8 19.2V10.2H19.2V19.2H4.8Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M7.95 12H7.05C6.80147 12 6.6 12.2015 6.6 12.45V13.35C6.6 13.5985 6.80147 13.8 7.05 13.8H7.95C8.19853 13.8 8.4 13.5985 8.4 13.35V12.45C8.4 12.2015 8.19853 12 7.95 12Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M7.95 15.6H7.05C6.80147 15.6 6.6 15.8015 6.6 16.05V16.95C6.6 17.1985 6.80147 17.4 7.05 17.4H7.95C8.19853 17.4 8.4 17.1985 8.4 16.95V16.05C8.4 15.8015 8.19853 15.6 7.95 15.6Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M12.45 12H11.55C11.3015 12 11.1 12.2015 11.1 12.45V13.35C11.1 13.5985 11.3015 13.8 11.55 13.8H12.45C12.6985 13.8 12.9 13.5985 12.9 13.35V12.45C12.9 12.2015 12.6985 12 12.45 12Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M12.45 15.6H11.55C11.3015 15.6 11.1 15.8015 11.1 16.05V16.95C11.1 17.1985 11.3015 17.4 11.55 17.4H12.45C12.6985 17.4 12.9 17.1985 12.9 16.95V16.05C12.9 15.8015 12.6985 15.6 12.45 15.6Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M16.95 12H16.05C15.8015 12 15.6 12.2015 15.6 12.45V13.35C15.6 13.5985 15.8015 13.8 16.05 13.8H16.95C17.1985 13.8 17.4 13.5985 17.4 13.35V12.45C17.4 12.2015 17.1985 12 16.95 12Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M16.95 15.6H16.05C15.8015 15.6 15.6 15.8015 15.6 16.05V16.95C15.6 17.1985 15.8015 17.4 16.05 17.4H16.95C17.1985 17.4 17.4 17.1985 17.4 16.95V16.05C17.4 15.8015 17.1985 15.6 16.95 15.6Z"
                      fill="#F3F4F6"
                    />
                  </svg>
                  <span className="text-[#FFFFFF] text-[16px] md:text-[20px] font-normal leading-normal">
                    {formattedDate ? formattedDate : "Wed, May 08"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92894C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.76121C17.6541 3.51809 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22ZM12 4C10.4178 4 8.87104 4.4692 7.55544 5.34825C6.23985 6.2273 5.21447 7.47673 4.60897 8.93854C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C19.9976 9.879 19.154 7.84556 17.6542 6.34578C16.1545 4.84601 14.121 4.00239 12 4Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.73479 11.1054 7.48043 11.2929 7.2929C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.2929C12.8946 7.48043 13 7.73479 13 8V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M15.275 16.275C15.0098 16.2749 14.7555 16.1696 14.568 15.982L11.2929 12.7071C11.1107 12.5185 11.0101 12.2658 11.0123 12.0036C11.0146 11.7414 11.1198 11.4906 11.3052 11.3052C11.4906 11.1198 11.7414 11.0146 12.0036 11.0123C12.2658 11.0101 12.5184 11.1108 12.707 11.293L15.982 14.568C16.1218 14.7079 16.217 14.886 16.2556 15.08C16.2942 15.2739 16.2744 15.475 16.1987 15.6577C16.123 15.8404 15.9949 15.9965 15.8305 16.1064C15.6661 16.2163 15.4728 16.275 15.275 16.275Z"
                      fill="#F3F4F6"
                    />
                  </svg>
                  <span className="text-[#FFFFFF]  text-[16px] md:text-[20px] font-normal leading-normal">
                    {timeSlot ? timeSlot : "5:45 pm"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col pb-3 w-full max-w-[470px] border-solid border-b-[1px] border-[#525252]">
              <div className="flex justify-between items-center gap-6 w-[470px] max-w-[500px] mt-4 md:mt-6">
                <h2 className=" text-[#FFFFFF] text-[32px] font-bold leading-normal text-left ">
                  Add your friend
                </h2>
                <button className="text-[#FFF] h-[48px] text-[16px] font-medium leading-[24px] py-3 px-5 border-[1px] border-[#F43F5E] rounded-[8px]">
                  Change
                </button>
              </div>
              <div className="flex gap-6 mt-2">
                <h6 className="text-[#FFF] text-[16px] font-medium leading-[24px]">{seatCounter} Guest</h6>
              </div>
            </div> */}

            <div className="flex flex-col w-full max-w-[482px] bg-[#262626] rounded-[16px] mt-6">
              <RadioGroup
                value={selectedValue}
                onValueChange={handleChange}
                className="flex flex-col gap-3"
              >
                <div className=" w-full max-w-[482px] border-solid border-[1px] border-[#404040] rounded-[16px]">
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="flex flex-col justify-start items-center border-solid border-b-[1px] border-b-[#404040]"
                    >
                      <div className="w-full max-w-[482px] py-4 px-5 flex justify-start items-center gap-4">
                        <RadioGroupItem
                          className="w-[24px] h-[24px] text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          value={method}
                          id={method}
                        />
                        <Label
                          htmlFor={method}
                          className="text-[20px] text-[#FFFFFF] font-bold leading-normal"
                        >
                          {method}
                        </Label>
                      </div>

                      {/* Conditionally render inner UPI options */}
                      {method === "Pay by UPI" &&
                        selectedValue === "Pay by UPI" && (
                          <div className="flex flex-col items-start justify-start">
                            {payByUPI.map((upiMethod) => (
                              <div key={upiMethod} className="w-full py-2">
                                <RadioGroup
                                  value={selectedUPI}
                                  onValueChange={() =>
                                    handleUPIChange(upiMethod)
                                  }
                                >
                                  <div className="flex items-center">
                                    <RadioGroupItem
                                      className="w-[24px] h-[24px] mr-4 text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      value={upiMethod}
                                      id={upiMethod}
                                      checked={selectedUPI === upiMethod} // Bind the checked state
                                    />
                                    {upiMethod === "PhonePe UPI" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                      >
                                        <g clipPath="url(#clip0_9109_4183)">
                                          <path
                                            d="M15.784 10.3372C16.7992 6.03796 14.1369 1.72978 9.8377 0.714597C5.53847 -0.300587 1.23029 2.36165 0.215107 6.66088C-0.800077 10.9601 1.86216 15.2683 6.16139 16.2835C10.4606 17.2987 14.7688 14.6364 15.784 10.3372Z"
                                            fill="#5F259F"
                                          />
                                          <path
                                            d="M11.6295 6.41258C11.6295 6.09983 11.3615 5.83154 11.0488 5.83154H9.97617L7.51873 3.01642C7.29517 2.74839 6.93773 2.65895 6.5803 2.74839L5.73123 3.01642C5.59711 3.06111 5.55239 3.23998 5.6418 3.32914L8.32305 5.87626H4.25677C4.12261 5.87626 4.0332 5.96567 4.0332 6.09983V6.54645C4.0332 6.85945 4.30148 7.12745 4.6142 7.12745H5.23967V9.27242C5.23967 10.881 6.08873 11.8193 7.51877 11.8193C7.96539 11.8193 8.32311 11.7745 8.7697 11.596V13.0257C8.7697 13.4279 9.0827 13.7409 9.48486 13.7409H10.1103C10.2445 13.7409 10.3784 13.6068 10.3784 13.4726V7.08273H11.4063C11.5404 7.08273 11.6295 6.99333 11.6295 6.85945V6.41258H11.6295ZM8.7697 10.2553C8.5017 10.3894 8.14423 10.4341 7.87623 10.4341C7.16105 10.4341 6.80361 10.0767 6.80361 9.27239V7.12742H8.7697V10.2553Z"
                                            fill="#FAFAFA"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_9109_4183">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0 0.5)"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    ) : (
                                      ""
                                    )}
                                    {upiMethod === "Google Pay" ? (
                                      <svg
                                        width="16"
                                        height="15"
                                        viewBox="0 0 16 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        href="http://www.w3.org/1999/xlink"
                                      >
                                        <mask
                                          id="mask0_9121_42511"
                                          style={{ maskType: "luminance" }}
                                          maskUnits="userSpaceOnUse"
                                          x="8"
                                          y="2"
                                          width="8"
                                          height="11"
                                        >
                                          <mask
                                            id="mask1_9121_42511"
                                            style={{ maskType: "luminance" }}
                                            maskUnits="userSpaceOnUse"
                                            x="8"
                                            y="2"
                                            width="8"
                                            height="11"
                                          >
                                            <path
                                              d="M8.43069 8.89875L12.3888 2.04297L14.545 3.28758C15.9368 4.09085 16.4147 5.87185 15.61 7.26357L13.381 11.1237C12.8784 11.9934 11.7665 12.2915 10.8954 11.7903L8.89421 10.6355C8.28747 10.2827 8.07914 9.50544 8.43069 8.89875Z"
                                              fill="white"
                                            />
                                          </mask>
                                          <g mask="url(#mask1_9121_42511)">
                                            <path
                                              d="M15.9992 0.683594H-0.125V14.3379H15.9992V0.683594Z"
                                              fill="white"
                                            />
                                          </g>
                                        </mask>
                                        <g mask="url(#mask0_9121_42511)">
                                          <mask
                                            id="mask2_9121_42511"
                                            style={{ maskType: "luminance" }}
                                            maskUnits="userSpaceOnUse"
                                            x="8"
                                            y="2"
                                            width="9"
                                            height="11"
                                          >
                                            <path
                                              d="M16.0035 2.03125H8.25391V12.0611H16.0035V2.03125Z"
                                              fill="white"
                                            />
                                          </mask>
                                          <g mask="url(#mask2_9121_42511)">
                                            <rect
                                              width="8.24959"
                                              height="10.2485"
                                              transform="matrix(1 0 0 -1 8 12.25)"
                                              fill="url(#pattern0_9121_42511)"
                                            />
                                          </g>
                                        </g>
                                        <path
                                          d="M8.01017 4.15126L3.08594 12.6787L5.24208 13.9233C6.63394 14.7266 8.4151 14.2501 9.21845 12.8583L12.4123 7.32659C12.9149 6.45692 12.6167 5.3438 11.7457 4.84127L9.74446 3.68649C9.13772 3.33497 8.36172 3.54328 8.01017 4.15126Z"
                                          fill="#FDBD00"
                                        />
                                        <path
                                          d="M10.8629 1.17188C9.1234 0.166812 6.89825 0.76308 5.89309 2.50372L3.0625 7.40405C2.55992 8.27372 2.85808 9.38684 3.72913 9.88937L5.2551 10.7695C6.12485 11.272 7.23808 10.9739 7.74065 10.1029L11.1194 4.25086C11.8212 3.03489 13.3758 2.61958 14.5906 3.32131L10.8629 1.17188Z"
                                          fill="#2DA94F"
                                        />
                                        <mask
                                          id="mask3_9121_42511"
                                          style={{ maskType: "luminance" }}
                                          maskUnits="userSpaceOnUse"
                                          x="0"
                                          y="2"
                                          width="8"
                                          height="12"
                                        >
                                          <mask
                                            id="mask4_9121_42511"
                                            style={{ maskType: "luminance" }}
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="2"
                                            width="8"
                                            height="12"
                                          >
                                            <path
                                              d="M6.33073 3.94161L4.64722 2.97169C3.89725 2.53946 2.93766 2.79594 2.50409 3.54453L0.483358 7.03491C-0.511384 8.75341 0.0784306 10.951 1.801 11.9431L3.08349 12.6812L4.6381 13.5769L5.31255 13.9649C4.11469 13.1629 3.7345 11.5564 4.46623 10.2923L4.98965 9.38874L6.90492 6.07932C7.33849 5.33203 7.08199 4.37383 6.33073 3.94161Z"
                                              fill="white"
                                            />
                                          </mask>
                                          <g mask="url(#mask4_9121_42511)">
                                            <path
                                              d="M15.9992 0.691406H-0.125V14.3457H15.9992V0.691406Z"
                                              fill="white"
                                            />
                                          </g>
                                        </mask>
                                        <g mask="url(#mask3_9121_42511)">
                                          <mask
                                            id="mask5_9121_42511"
                                            style={{ maskType: "luminance" }}
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="2"
                                            width="8"
                                            height="12"
                                          >
                                            <path
                                              d="M7.12465 2.75391H0V13.971H7.12465V2.75391Z"
                                              fill="white"
                                            />
                                          </mask>
                                          <g mask="url(#mask5_9121_42511)">
                                            <rect
                                              width="7.49963"
                                              height="11.3734"
                                              transform="matrix(1 0 0 -1 -0.0859375 14.0352)"
                                              fill="url(#pattern1_9121_42511)"
                                            />
                                          </g>
                                        </g>
                                        <defs>
                                          <pattern
                                            id="pattern0_9121_42511"
                                            patternContentUnits="objectBoundingBox"
                                            width="1"
                                            height="1"
                                          >
                                            <use
                                              href="#image0_9121_42511"
                                              transform="scale(0.0075188 0.00606061)"
                                            />
                                          </pattern>
                                          <pattern
                                            id="pattern1_9121_42511"
                                            patternContentUnits="objectBoundingBox"
                                            width="1"
                                            height="1"
                                          >
                                            <use
                                              href="#image1_9121_42511"
                                              transform="scale(0.00826446 0.00546448)"
                                            />
                                          </pattern>
                                          <image
                                            id="image0_9121_42511"
                                            width="133"
                                            height="165"
                                            href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEAlgCWAAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAANVAAAEYAAABk//2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAKUAhQMBIgACEQEDEQH/xACwAAEBAQEBAQEAAAAAAAAAAAAAAgEFBAYHAQEAAgMBAAAAAAAAAAAAAAAAAQYCBAUDEAACAAMGBgMBAAAAAAAAAAAAASADBTACEjM1BhAxMgQ0FSITIxERAAEBBQgCAQIHAAAAAAAAAAIBABAwsQMRoXKSM3MENNLTkTITITFxEiJSFBIAAQECDgEDBQAAAAAAAAAAAQAQAiAwETFxkXKSogMzQ6NEMiFBEoFCEyMU/9oADAMBAAIRAxEAAADrcn2cTT7/AEa51Ye3Q3wUe54iPa8RPteIj2vEPbXgo/RBv1v4vidviaVi2orD3uouG7moAAAVNI/RB0ax8XxO3xNKxKncPe6ii9nYjQAAKmkfog6NY+L4nb4mlYgw96qKLqKiKAAAqaR+iDo1j4vidviaViDD32oouoorc2IAAVNI/RB0ax8XxO3xNKxBh7twXUUXs1EaABU0fog6NX+L4nb4mlYgw9wNuKL2aiKZoAqaP0QdGr/F8Tt8TSsQYe4Cp0uoovZqIAVNH6IOjV/i+J2+JpWIMPcBuCrii9mojQKmj9EHRq/xfE7fE0rEGHuABtRRdRUK3NQqaP0QdGr/ACnJNbrhj6gaBoVoVoKEfbjb4n//2gAIAQIAAQUAmXr2PFeMV4xXjFeMV4xXjFe4TOuwmddhM67CZ12EzrsJnXYTOuwmddhM67C//MXxPifE+J8T4nx4f//aAAgBAwABBQDtZUtyPplH0yj6ZR9Mo+mUfTKHJlfw7Tx4nyO08eJ8jtPHifI7Tx4nyO08eJ8jtPHifI7Tx4nyO08eJ8jtPHifIkY/q/Q/Q/Q/Q/Q/Qf2fw//aAAgBAQABBQDctT7/ALWoquVYVcqwq3VRVqqHuaoe5qh7mqHuaoe5qh7mqHuaoe5qh7mqHuaoS6xU3fN26qIQhWUvMN26qIQhWUvMN26qIQhWUvMN26rwQhCsZeYbt1XghCFYy8w3bqvBCEIVhLzDduq8UIQrCXmG7dV4oQhWEvMN26rAhCFHLzDduqwIQhRy8w3bqsCEIUcvMN26rChCFFLzDduqwoQhRS8w3bqsKEIQoZeYbt1WJCEKGXmG7dViQhCFBLzDduqxoQhQS8w3bqsaEIUEvMN26rGhCELjLzDcqprqOGhmGhmGhmGhmGhmGhmGhmGhiu0QV2iCu0Uw0Yw0Yw0Yl3aPjP/aAAgBAgIGPwB71M6nNanNa8jWvI1ryNa8jWpzWx6mJepiXqYl6mJepiXqYl6mJepiXqYk6c/vKtvEtvEtvEtvEtvEtvEtvEz/2gAIAQMCBj8AyyXHCS6J3QtNy6FpuXQtNy6FpuXQtNy6FpuXQj+ty6GZdgQyzLsCGWZdgQyzLsCGWZdgQyzLsCGWZdgQyzLsCGWZdgQyxyT+mT4/b+P4/SX1Xb412+NdvjXb412+NdvjXb42f//aAAgBAQEGPwBKXHrlTD7Yr+0fytVSbtH8o3aP5Ru0fyjdk7m7J3N2Tubsnc3ZO5uydzdk7m7J3N2Tubsnc3ZO5hReSdiqlrk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcMSTcm0MyjhiSbk2hmUcP1Sbk/wBR1xqfbH8KQgQ2Wl/YkbU5WSn7G1OVkp+xtTlZKfsbU5WSn7G1OVkp+xtTlZKfsbU5WSn7G1OVkp+xtTlZKfsbU5WSn5tqcnJT82+vk5Kfm318nJT82+vk5Kfmw2HybbUs/hT83f/Z"
                                          />
                                          <image
                                            id="image1_9121_42511"
                                            width="121"
                                            height="183"
                                            href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEAlgCWAAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAAN8AAAEtwAABu3/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIALcAeQMBIgACEQEDEQH/xACmAAADAQEBAQAAAAAAAAAAAAAAAQIGBAUDAQADAQEBAAAAAAAAAAAAAAAAAQIEAwUQAAIAAwUJAQEAAAAAAAAAAAABIAMFAjRENQYQEjITIzMEFBUkMBEAAQICCwACAwAAAAAAAAAAAQIDABAwcTKSssLSc5MENBFBMRIiEgABAQYFAwUAAwAAAAAAAAAAAiABwTJyghGRobESMUJDIUFRYYEiohP/2gAMAwEAAhEDEQAAAPU4vtwe153QuaenPpXNLXSuVNdZxsOs4wOw4wNNp8jrsWnGcHfwauaml05wqlqZuSUAwTQAAe/rsjrsOrGcPdw94U0ukTNJzCqWpVIQAxAB7+uyOuw6sbwd/B3gml0iZuWpmpcyqkSYMQ0Hv67I67DqxnF28XeEmdIlVLUzcihUmpBNNNB7+uyOuw6sZxdvD3gGukpVIpVS1M0nMpoQAz3tdkddh1Yzh7uHvDQ+kpNCU0mom5amaRKAZ72uyOuw6sZw93D3gafSUAJTSCZqXMqpalUmve12R12HVjOHu4e8AHSWmgJpCmblqFUuZVSL3tdkddi1Yzh7uHvAB0kaYJMFKqWpm5FCqWve1uS1uHTjOHu4dEAHSRoAGgSqRTNy5maTXua3J6zDpyPEFgBaABNAAgBSDSkBe1qAyd//2gAIAQIAAQUAlWLHL5dg5dg5cs5cs5cs5cs3LPuye1FjpXaix0rtRY6T2osdJ7UWOldqLHSu1FjpXaix0rtRY6V2osdL5/L/AEH6D9B+g/QfoOr7f//aAAgBAwABBQCZatb+/aN+0b9s37Zv2zftm9a9WZxxYWZxxYW3xxYWZxxYWZxxYWZxxYW3xxYW3xxYW3xxYW3xxYW3y97pHSOkdI6R0Tp+v//aAAgBAQABBQCr1DzZVRdUqI6rUh1WpDq1TPrVM+vVD69UPr1Q+vVD69UPr1Q+vVD69UNL+d5nk+WVvNGMYxj/AIaQvxW80GMYxjj0hfit5oMYxjHHpC/FbzQYxjGMcWkL8VrNNjGMYxxaQvxWs02MYxjHFpC/FazTaxjGMcOkL8VrNNrGMYxw6QvxWs02sYxjGODSF+K1mkDGMYxwaQvxW80gYxjGODSF+K3mkLGMYx7dIX4reaQsYxjHt0hfit5pCxjGMY9mkL6VvNImMYxj2aQvpW80iYxjGPZpC+lbzSNjGMYzSF+K3mkbGMYxmkL8VvNI2MYxjNIX4reafwYxjGaRvpW80/gxjGM0jfSsePMt1L1Zp6s09WaerNPVmnqzT1Zp6s09SaPxJo/Emj8SaPw5ppaRbleYf//aAAgBAgIGPwBH8UyJ9volTkSJyJE5EicnEiciRORhxdhw6YenQRQnZuyAihOzdkBFCdm7ICKE7N2QEUJ2bsgIoTs3ZARQnZuyAihOzdkBFCdm7ICKE7N2QEYf5YcXYY4/B4tTxani1PFqeLU8X9js58fvj0P/2gAIAQMCBj8AV6vmf7kysyZWZMrMmVmTKzJlZmOL8eXX9FVPbuiKqe3dEVU9u6Iqp7d0RVT27oiqnt3RFVPbuiKqe3dEVU9u6Iqp7d0RWPOZ/wAHfod+h36Hfod+h5NDu48v0//aAAgBAQEGPwB9tp9aEJI+EhRAH8iPS5eMely8Y9Tt4x6nbxj1O3jHqdvGPW7eMet28Y9Tt4x63bxj1u3jHrdvGPW7eMOo7Dy3Uhv5AUSQD+wl2KxhFM/tZky7FYwimf2syZdisYRTP7WZMuxWMIpn9rMmXYrGEUz+1mTLsVjCKZ/azJl2KxhFM/tZky7FYwimf2syZdisYRTP7WZMuxWMIpn9rMmXYrGEUz+1mTLsVjCKZ/azJl2KxhFM9tZky7FYwime2syZdisYRTPbWZMuxWMIpntrMmXYrGEUz+1mTLsVjCKZ7azJl2KxhFM9tZky7FYwime2syZdisYRTPbWZMn1AoAJH5cQk2R9KUDFpvlb1xab5W9cWm+VvXFpvlb1xab5W9cWm+VvXFpvlb1xab5W9cWm+VvXFpvlb1xab5W9cWmuVvXFprma1w8VFBBb+P5WhZtD6Qoy/9k="
                                          />
                                        </defs>
                                      </svg>
                                    ) : (
                                      ""
                                    )}
                                    <Label
                                      htmlFor={upiMethod}
                                      className="text-[16px] md:text-[20px] ml-1 text-[#FFFFFF] font-bold leading-normal"
                                    >
                                      {upiMethod}
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            ))}
                          </div>
                        )}
                      {/* Conditionally render inner credit and debit card options */}
                      {method === "Credit & Debit Cards" &&
                        selectedValue === "Credit & Debit Cards" && (
                          <div className="flex flex-col items-start justify-start">
                            <div className="w-full py-2">
                              <RadioGroup
                                value={selectedCard}
                                onValueChange={() =>
                                  handleCardChange("Credit/Debit/ATM Card")
                                }
                              >
                                <div className="flex items-center">
                                  <RadioGroupItem
                                    className="w-[24px] h-[24px] mr-4 text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    value="Credit/Debit/ATM Card"
                                    id="Credit/Debit/ATM Card"
                                    checked={
                                      selectedCard === "Credit/Debit/ATM Card"
                                    } // Bind the checked state
                                  />
                                  <Label
                                    htmlFor={"Credit/Debit/ATM Card"}
                                    className="text-[16px] md:text-[20px] ml-1 text-[#FFFFFF] font-bold leading-normal"
                                  >
                                    Credit/Debit/ATM Card
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="23"
                                  height="23"
                                  rx="7.5"
                                  fill="#262626"
                                  stroke="#404040"
                                />
                                <path
                                  d="M20.3165 7H3V18H20.3165V7Z"
                                  fill="#FAFAFA"
                                />
                                <path
                                  d="M20.0276 16.2109H3.28809V17.7117H20.0276V16.2109Z"
                                  fill="#FCB315"
                                />
                                <path
                                  d="M20.0276 7.28906H3.28809V8.78983H20.0276V7.28906Z"
                                  fill="#0D357F"
                                />
                                <path
                                  d="M11.5138 10.4425L10.6315 14.5676H9.56429L10.4467 10.4425H11.5138ZM16.0036 13.1062L16.5655 11.5571L16.8886 13.1062H16.0036ZM17.1949 14.5676H18.1817L17.3195 10.4425H16.4093C16.2041 10.4425 16.0312 10.5615 15.9546 10.7449L14.3533 14.5676H15.4741L15.6966 13.9515H17.0656L17.1949 14.5676ZM14.4089 13.2209C14.4136 12.1323 12.904 12.0719 12.914 11.5855C12.9173 11.4377 13.0582 11.2802 13.3665 11.24C13.5194 11.2203 13.941 11.2044 14.4191 11.4246L14.606 10.5495C14.3492 10.4567 14.0188 10.3672 13.6078 10.3672C12.5528 10.3672 11.8105 10.9276 11.8046 11.7307C11.7979 12.3246 12.3349 12.6557 12.7385 12.8535C13.1547 13.0557 13.2942 13.1854 13.2922 13.366C13.2893 13.6427 12.9602 13.7652 12.6539 13.7699C12.117 13.7782 11.8059 13.6248 11.5579 13.5092L11.3642 14.4135C11.6139 14.5278 12.0741 14.6273 12.5506 14.6324C13.6722 14.6324 14.4056 14.0785 14.4089 13.2209ZM9.98895 10.4425L8.25978 14.5676H7.1318L6.2808 11.2755C6.22926 11.0731 6.18428 10.9987 6.02739 10.9131C5.77077 10.7737 5.34707 10.6434 4.97461 10.5622L4.99978 10.4425H6.81577C7.04706 10.4425 7.25518 10.5965 7.30809 10.8629L7.7576 13.2501L8.86778 10.4425H9.98895Z"
                                  fill="#0D357F"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="23"
                                  height="23"
                                  rx="7.5"
                                  fill="#262626"
                                  stroke="#404040"
                                />
                                <path
                                  d="M14.0431 8.23401L9.3916 8.25L9.53255 16.7658L14.1841 16.7498L14.0431 8.23401Z"
                                  fill="#FF5F00"
                                />
                                <path
                                  d="M9.69738 12.5244C9.66859 10.7924 10.4445 9.25339 11.6598 8.25513C10.7425 7.53529 9.59243 7.10243 8.34577 7.1067C5.39237 7.11682 3.04323 9.54985 3.09303 12.547C3.14284 15.5442 5.57257 17.9609 8.52598 17.9508C9.77264 17.9465 10.9082 17.5058 11.8015 16.7798C10.5534 15.805 9.72616 14.2565 9.69738 12.5244Z"
                                  fill="#EB001B"
                                />
                                <path
                                  d="M20.4826 12.451C20.5324 15.4482 18.1832 17.8813 15.2298 17.8914C13.9832 17.8956 12.8331 17.4628 11.9158 16.743C13.146 15.7446 13.907 14.2057 13.8782 12.4737C13.8495 10.7416 13.0225 9.20813 11.7742 8.21831C12.6675 7.49227 13.803 7.05158 15.0496 7.04731C18.003 7.03719 20.433 9.46893 20.4826 12.451Z"
                                  fill="#F79E1B"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_8625_53243)">
                                  <path
                                    d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
                                    fill="#F4F4F4"
                                  />
                                  <path
                                    opacity="0.938"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.780283 6.73722C0.769887 6.73039 0.841355 6.45507 1.01176 5.8455C1.14734 5.36049 1.27485 4.90681 1.29511 4.8373L1.33196 4.71094L1.86469 4.72066C2.48747 4.73203 2.58334 4.74026 2.68352 4.79095C2.86113 4.88081 2.91002 5.01907 2.84882 5.25838C2.79669 5.4622 2.6971 5.60092 2.50454 5.73792C2.46802 5.7639 2.43612 5.79566 2.43364 5.8085C2.4309 5.82276 2.45366 5.85415 2.49207 5.88911C2.52668 5.92061 2.56346 5.96276 2.57382 5.98278C2.60168 6.03666 2.59684 6.1446 2.55818 6.33169C2.53923 6.42341 2.52016 6.5545 2.51581 6.62299L2.50791 6.74753H2.25005C2.06744 6.74753 1.98747 6.74281 1.97603 6.73137C1.95087 6.70621 1.95656 6.64203 2.00027 6.45807C2.0489 6.25335 2.05185 6.17301 2.01254 6.12304C1.96062 6.05703 1.91353 6.04276 1.72711 6.03653C1.5767 6.0315 1.55163 6.03376 1.52881 6.0544C1.49334 6.0865 1.46455 6.16941 1.38043 6.48163L1.3088 6.74753L1.05206 6.74732C0.910854 6.74722 0.788554 6.74266 0.780283 6.73722ZM2.13567 5.59496C2.2581 5.5586 2.30968 5.47875 2.30984 5.3253C2.3099 5.27913 2.30208 5.24664 2.28636 5.22765C2.2492 5.18277 2.13726 5.16753 1.92731 5.17878L1.74479 5.18855L1.71822 5.27806C1.67718 5.41627 1.6484 5.5499 1.65289 5.58138C1.65583 5.60197 1.67005 5.61247 1.70408 5.61914C1.77862 5.63376 2.05764 5.61813 2.13567 5.59496Z"
                                    fill="#227FBB"
                                  />
                                  <path
                                    opacity="0.938"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.99953 6.77575C2.91799 6.74658 2.85388 6.69215 2.82694 6.62919C2.77574 6.50952 2.82282 6.24353 3.00974 5.59644C3.05451 5.44148 3.09113 5.31317 3.09113 5.31131C3.09113 5.30946 3.10065 5.29842 3.11229 5.28678C3.12956 5.26951 3.16898 5.26562 3.32682 5.26562C3.43318 5.26562 3.53526 5.27135 3.55366 5.27835L3.58713 5.29107L3.55374 5.40961C3.47187 5.7003 3.38696 6.05291 3.37228 6.16316C3.35894 6.2633 3.35945 6.28992 3.37535 6.32308C3.4115 6.39852 3.54275 6.41447 3.65445 6.35701C3.7855 6.2896 3.81008 6.2319 4.02073 5.49722C4.05161 5.3895 4.07517 5.33351 4.10147 5.30537L4.13859 5.26562H4.34902C4.51176 5.26562 4.56101 5.26969 4.56633 5.28354C4.57159 5.29726 4.30418 6.29291 4.19146 6.67925L4.17378 6.73983L3.94882 6.74656C3.82509 6.75027 3.72386 6.74951 3.72387 6.74489C3.72389 6.74027 3.73307 6.71048 3.74429 6.6787C3.78978 6.54975 3.73306 6.54166 3.56737 6.65347C3.40366 6.76394 3.33502 6.79011 3.19328 6.79611C3.09745 6.80016 3.05546 6.79575 2.99953 6.77575Z"
                                    fill="#227FBB"
                                  />
                                  <path
                                    opacity="0.938"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.49446 6.7342C4.4825 6.7266 4.55176 6.4594 4.75703 5.72131L5.03585 4.71875L5.50702 4.72269C6.09479 4.72761 6.21497 4.73804 6.3286 4.79399C6.42204 4.83998 6.46653 4.88112 6.50812 4.95998C6.57799 5.09247 6.57683 5.24614 6.50435 5.457C6.39294 5.78112 6.18499 5.99422 5.91087 6.06519C5.86645 6.0767 5.7271 6.09226 5.60122 6.09978C5.18536 6.12461 5.21037 6.11994 5.18809 6.17702C5.17745 6.2043 5.13591 6.34324 5.09578 6.48578L5.02282 6.74494L4.76677 6.74474C4.62594 6.74463 4.5034 6.73988 4.49446 6.7342ZM5.70688 5.65514C5.84392 5.63748 5.91591 5.59521 5.96164 5.50556C6.01078 5.40923 6.02375 5.30436 5.99243 5.25657C5.94976 5.19144 5.89132 5.17721 5.67115 5.17833C5.56152 5.17889 5.46643 5.18476 5.45984 5.19138C5.44476 5.20653 5.35216 5.57258 5.35216 5.61702C5.35216 5.63513 5.3562 5.65398 5.36113 5.65892C5.37389 5.67168 5.59749 5.66923 5.70688 5.65514Z"
                                    fill="#227FBB"
                                  />
                                  <path
                                    opacity="0.938"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.47665 6.78205C6.31811 6.71564 6.27703 6.60589 6.3287 6.38675C6.40092 6.08043 6.56001 5.97799 7.10618 5.88614C7.43595 5.83068 7.51828 5.79014 7.54199 5.67156C7.55954 5.58383 7.48435 5.53587 7.32906 5.53571C7.23212 5.53561 7.19576 5.54975 7.11166 5.62022L7.04388 5.677L6.86927 5.68148C6.66689 5.68667 6.60455 5.67861 6.60455 5.64728C6.60455 5.61077 6.68392 5.49923 6.75813 5.43146C6.83782 5.35869 6.94329 5.30292 7.05749 5.27317C7.29733 5.2107 7.71016 5.21796 7.85204 5.28715C7.92798 5.32418 7.99549 5.38569 8.02763 5.44714C8.05806 5.50531 8.04718 5.56566 7.9038 6.13415C7.83342 6.41318 7.77584 6.66529 7.77584 6.69439V6.74731H7.60943C7.5179 6.74731 7.41504 6.75115 7.38084 6.75584L7.31867 6.76436L7.29132 6.70056C7.25919 6.6256 7.25542 6.62562 7.08613 6.70177C6.90226 6.78447 6.83489 6.8029 6.69206 6.80959C6.57052 6.81527 6.54957 6.81259 6.47665 6.78205ZM7.20026 6.46748C7.29309 6.42641 7.39796 6.25834 7.39857 6.14963L7.39887 6.09719L7.31333 6.10518C7.2187 6.11402 7.01854 6.17857 6.94517 6.22391C6.88323 6.2622 6.84695 6.32387 6.84714 6.39054C6.84732 6.45449 6.85673 6.47198 6.90112 6.49089C6.95179 6.51248 7.13007 6.49853 7.20026 6.46748Z"
                                    fill="#227FBB"
                                  />
                                  <path
                                    opacity="0.938"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.94143 7.38432C7.8875 7.37216 7.88543 7.35203 7.92293 7.20431C7.97319 7.00634 7.96989 7.01046 8.0939 6.99118C8.22777 6.97037 8.28754 6.94095 8.3174 6.88119C8.35046 6.815 8.34809 6.55509 8.30806 5.858C8.28578 5.47008 8.28024 5.29414 8.28993 5.28245C8.30014 5.27014 8.36828 5.26562 8.54375 5.26562H8.78361L8.7878 5.71598C8.79066 6.02323 8.79675 6.17109 8.80696 6.18129C8.83146 6.20576 8.92154 6.05343 9.29071 5.36323L9.34291 5.26562H9.55469C9.67117 5.26562 9.76934 5.27026 9.77284 5.27593C9.77959 5.28684 9.45868 5.85889 9.13666 6.40999C8.67898 7.19326 8.59289 7.3012 8.37819 7.36102C8.30809 7.38055 7.99806 7.39709 7.94143 7.38432Z"
                                    fill="#227FBB"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.92676 7.20399L10.5562 4.89844L11.1553 6.08992L9.92676 7.20399Z"
                                    fill="#1AAF5D"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.53711 7.2118L10.1665 4.90625L10.7656 6.09773L9.53711 7.2118Z"
                                    fill="#F59D00"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_8625_53243">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        )}
                      {/* Conditionally render other payment options */}
                      {method === "More Payment Options" &&
                        selectedValue === "More Payment Options" && (
                          <div className="flex flex-col items-start justify-start">
                            {morePaymentOptions.map((paymentOption) => (
                              <div key={paymentOption} className="w-full py-2">
                                <RadioGroup
                                  value={selectedStore}
                                  onValueChange={() =>
                                    handleStoreChange(paymentOption)
                                  }
                                >
                                  <div className="flex items-center">
                                    <RadioGroupItem
                                      className="w-[24px] h-[24px] mr-4 text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      value={paymentOption}
                                      id={paymentOption}
                                      checked={selectedStore === paymentOption} // Bind the checked state
                                    />
                                    {paymentOption === "Google Play Store" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                      >
                                        <g clipPath="url(#clip0_8625_53272)">
                                          <path
                                            d="M11.9493 5.98785C10.0906 4.94826 7.10732 3.27891 2.48006 0.687999C2.16809 0.481967 1.80915 0.454967 1.49902 0.559936L9.4381 8.49901L11.9493 5.98785Z"
                                            fill="#32BBFF"
                                          />
                                          <path
                                            d="M1.49826 0.558594C1.44013 0.578281 1.38357 0.602031 1.32948 0.630719C0.987008 0.815969 0.735352 1.17244 0.735352 1.62328V15.3721C0.735352 15.8229 0.986977 16.1794 1.32948 16.3646C1.38348 16.3933 1.44001 16.4171 1.49807 16.4369L9.43734 8.49767L1.49826 0.558594Z"
                                            fill="#32BBFF"
                                          />
                                          <path
                                            d="M9.43731 8.5L1.49805 16.4392C1.80827 16.545 2.1672 16.52 2.47927 16.311C6.96671 13.7982 9.91634 12.1486 11.7965 11.1002C11.8489 11.0708 11.9002 11.042 11.9508 11.0136L9.43731 8.5Z"
                                            fill="#32BBFF"
                                          />
                                          <path
                                            d="M0.736328 8.5V15.3744C0.736328 15.8252 0.987954 16.1817 1.33045 16.3669C1.38445 16.3956 1.44099 16.4194 1.49905 16.4392L9.43831 8.5H0.736328Z"
                                            fill="#2C9FD9"
                                          />
                                          <path
                                            d="M2.47989 0.688373C2.10942 0.443747 1.67255 0.450716 1.33008 0.632466L9.31744 8.61986L11.9491 5.98823C10.0904 4.94863 7.10715 3.27928 2.47989 0.688373Z"
                                            fill="#29CC5E"
                                          />
                                          <path
                                            d="M9.3175 8.37891L1.33008 16.3663C1.67258 16.548 2.10942 16.5585 2.47989 16.3104C6.96734 13.7975 9.91697 12.148 11.7972 11.0995C11.8495 11.0701 11.9008 11.0414 11.9515 11.0129L9.3175 8.37891Z"
                                            fill="#D93F21"
                                          />
                                          <path
                                            d="M15.2644 8.49604C15.2644 8.1151 15.0722 7.73066 14.6912 7.51747C14.6912 7.51747 13.9787 7.11994 11.7949 5.89844L9.19727 8.49604L11.7974 11.0962C13.9573 9.88348 14.6912 9.47457 14.6912 9.47457C15.0722 9.26141 15.2644 8.87697 15.2644 8.49604Z"
                                            fill="#FFD500"
                                          />
                                          <path
                                            d="M14.6912 9.47856C15.0722 9.26538 15.2644 8.88094 15.2644 8.5H9.19727L11.7974 11.1002C13.9573 9.88747 14.6912 9.47856 14.6912 9.47856Z"
                                            fill="#FFAA00"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_8625_53272">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0 0.5)"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    ) : (
                                      ""
                                    )}
                                    {paymentOption === "Apple Store" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                      >
                                        <g clipPath="url(#clip0_8625_53286)">
                                          <path
                                            d="M12.7664 0.5H3.23159C1.44581 0.5 0 1.94581 0 3.73159V13.2684C0 15.0522 1.44581 16.498 3.23159 16.498H12.7684C14.5522 16.498 16 15.0522 16 13.2664V3.73159C15.998 1.94581 14.5522 0.5 12.7664 0.5Z"
                                            fill="url(#paint0_linear_8625_53286)"
                                          />
                                          <path
                                            d="M7.93109 4.17319L8.25505 3.61325C8.45502 3.26328 8.90096 3.14531 9.25093 3.34528C9.6009 3.54525 9.71887 3.99119 9.5189 4.34116L6.39727 9.7445H8.65499C9.3869 9.7445 9.79684 10.6044 9.4789 11.2003H2.85974C2.4558 11.2003 2.13184 10.8763 2.13184 10.4724C2.13184 10.0685 2.4558 9.7445 2.85974 9.7445H4.71552L7.09124 5.627L6.34934 4.33916C6.14937 3.98919 6.26734 3.54725 6.6173 3.34328C6.96727 3.14331 7.40921 3.26128 7.61318 3.61125L7.93109 4.17319Z"
                                            fill="#FAFAFA"
                                          />
                                          <path
                                            d="M5.12344 11.9482L4.42353 13.1621C4.22356 13.5121 3.77763 13.63 3.42766 13.4301C3.07769 13.2301 2.95972 12.7842 3.15969 12.4342L3.67963 11.5343C4.26753 11.3523 4.74547 11.4923 5.12344 11.9482Z"
                                            fill="#FAFAFA"
                                          />
                                          <path
                                            d="M11.1502 9.74859H13.0439C13.4479 9.74859 13.7719 10.0726 13.7719 10.4765C13.7719 10.8804 13.4479 11.2044 13.0439 11.2044H11.9921L12.702 12.4362C12.9019 12.7862 12.784 13.2282 12.434 13.4321C12.084 13.6321 11.6421 13.5141 11.4381 13.1642C10.2423 11.0904 9.34439 9.53863 8.74848 8.50475C8.13854 7.45288 8.57451 6.397 9.00445 6.03906C9.48242 6.85897 10.1963 8.09681 11.1502 9.74859Z"
                                            fill="#FAFAFA"
                                          />
                                        </g>
                                        <defs>
                                          <linearGradient
                                            id="paint0_linear_8625_53286"
                                            x1="8"
                                            y1="0.5"
                                            x2="8"
                                            y2="16.498"
                                            gradientUnits="userSpaceOnUse"
                                          >
                                            <stop stopColor="#00BFFC" />
                                            <stop
                                              offset="1"
                                              stopColor="#0073F6"
                                            />
                                          </linearGradient>
                                          <clipPath id="clip0_8625_53286">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0 0.5)"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    ) : (
                                      ""
                                    )}
                                    <Label
                                      htmlFor={paymentOption}
                                      className="text-[16px] md:text-[20px] ml-1 text-[#FFFFFF] font-bold leading-normal"
                                    >
                                      {paymentOption}
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            ))}
                          </div>
                        )}
                      {/* Conditionally render Wallet options */}
                      {method === "Wallets" && selectedValue === "Wallets" && (
                        <div className="flex flex-col items-start justify-start">
                          {wallets.map((wallet) => (
                            <div key={wallet} className="w-full py-2">
                              <RadioGroup
                                value={selectedWallet}
                                onValueChange={() => handleWalletChange(wallet)}
                              >
                                <div className="flex items-center">
                                  <RadioGroupItem
                                    className="w-[24px] h-[24px] mr-4 text-orange-500 bg-[#171717] border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    value={wallet}
                                    id={wallet}
                                    checked={selectedWallet === wallet} // Bind the checked state
                                  />
                                  {wallet === "Paytm" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="13"
                                      viewBox="0 0 16 13"
                                      fill="none"
                                    >
                                      <path
                                        d="M12.4652 5.00616C12.7741 4.70603 13.0699 4.58859 13.4266 4.67124C13.618 4.71473 13.792 4.77998 13.9007 4.94527C13.9703 5.04531 14.0095 5.01921 14.0791 4.94962C14.3793 4.63644 14.736 4.5625 15.1275 4.73648C15.5233 4.91047 15.6799 5.23234 15.6756 5.66296C15.6669 6.49809 15.6712 7.32887 15.6712 8.16401C15.6712 8.53373 15.5016 8.70336 15.1275 8.71206C14.662 8.72511 14.662 8.72511 14.662 8.27275C14.662 7.52461 14.662 6.78082 14.662 6.03268C14.662 5.69775 14.5968 5.60206 14.3793 5.59771C14.1617 5.59336 14.0791 5.7108 14.0791 6.05008C14.0791 6.73297 14.0791 7.41152 14.0791 8.09441C14.0791 8.54678 13.9138 8.71206 13.4701 8.71641C13.0568 8.71641 13.0568 8.71641 13.0568 8.30754C13.0568 7.53331 13.0568 6.75907 13.0568 5.98048C13.0568 5.71515 12.9698 5.59771 12.7784 5.59771C12.5783 5.59771 12.4739 5.72385 12.4739 5.98483C12.4739 6.70252 12.4739 7.42022 12.4739 8.13791C12.4739 8.53373 12.2999 8.70771 11.904 8.71206C11.4516 8.72076 11.4516 8.72076 11.4516 8.2597C11.4516 7.15924 11.456 6.05878 11.4473 4.95831C11.4473 4.75823 11.5038 4.71038 11.6909 4.72343C11.8779 4.74083 12.0693 4.73648 12.2564 4.72343C12.4173 4.71038 12.5174 4.74083 12.4652 5.00616Z"
                                        fill="#04B9EF"
                                      />
                                      <path
                                        d="M6.01826 6.64431C6.01826 7.07058 6.02261 7.49685 6.01826 7.92746C6.00956 8.43202 5.7442 8.69735 5.23524 8.7104C4.98728 8.71475 4.74367 8.7191 4.49571 8.7104C3.96065 8.68865 3.62569 8.34503 3.61264 7.81002C3.60829 7.51424 3.60829 7.21412 3.61264 6.91834C3.62134 6.43118 3.96065 6.07451 4.44786 6.03101C4.58272 6.01796 4.72192 6.02231 4.86112 6.02231C4.98728 6.02231 5.09168 6.00057 5.09168 5.83528C5.09168 5.67434 5.00468 5.63955 4.86547 5.64825C4.74367 5.65259 4.61752 5.64825 4.49571 5.64825C4.1738 5.6439 3.99545 5.47861 3.9737 5.16543C3.94325 4.73047 3.94325 4.73047 4.37391 4.73047C4.72192 4.73047 5.06993 4.73047 5.41794 4.73047C5.7877 4.73047 6.00956 4.94795 6.01391 5.32202C6.02261 5.75699 6.01826 6.20065 6.01826 6.64431ZM5.09603 7.33591C5.09603 7.21847 5.09603 7.10538 5.09603 6.98794C5.09603 6.93139 5.10038 6.88355 5.01338 6.86615C4.68277 6.80525 4.53487 6.92269 4.53487 7.25762C4.53487 7.33591 4.53052 7.41855 4.53487 7.49685C4.54792 7.71868 4.65232 7.77957 4.95248 7.78392C5.20043 7.78827 5.06993 7.60994 5.09603 7.50989C5.10908 7.45335 5.09603 7.39245 5.09603 7.33591Z"
                                        fill="#062F6F"
                                      />
                                      <path
                                        d="M8.74061 6.42138C8.71886 6.85634 8.78846 7.3957 8.71016 7.92636C8.64491 8.37872 8.3926 8.6223 7.94019 8.67885C7.56608 8.72669 7.18761 8.6919 6.80915 8.70059C6.77 8.70059 6.70475 8.70929 6.70475 8.65275C6.71345 8.41352 6.6221 8.15689 6.80045 7.93941C6.89616 7.81762 7.02666 7.76542 7.18326 7.76977C7.32682 7.76977 7.47472 7.76977 7.61828 7.76977C7.74443 7.76977 7.80098 7.70887 7.80098 7.57839C7.80098 7.4479 7.73573 7.40005 7.60958 7.40005C7.48777 7.4044 7.36162 7.4044 7.23982 7.40005C6.70475 7.37395 6.33934 7.02163 6.32629 6.49097C6.31324 5.94727 6.32629 5.40356 6.32194 4.85985C6.32194 4.74241 6.36109 4.70762 6.47419 4.71632C6.73085 4.73371 7.05711 4.61192 7.22677 4.76851C7.36597 4.89465 7.25722 5.22087 7.26157 5.46011C7.26592 5.70804 7.26157 5.95162 7.26157 6.19955C7.26157 6.38658 7.35727 6.47792 7.54433 6.47357C7.72703 6.46922 7.80098 6.36483 7.80098 6.1952C7.80098 5.76023 7.80533 5.32527 7.79663 4.8903C7.79228 4.75981 7.82708 4.70762 7.96629 4.71632C8.17074 4.72936 8.37085 4.72936 8.57531 4.71632C8.71016 4.70762 8.74496 4.75981 8.74496 4.8903C8.73626 5.36441 8.74061 5.84287 8.74061 6.42138Z"
                                        fill="#093271"
                                      />
                                      <path
                                        d="M0.97603 6.9825C0.97603 6.49534 0.97603 6.01253 0.97603 5.52537C0.98038 4.99906 1.25444 4.72503 1.7808 4.72068C2.04181 4.72068 2.30282 4.71633 2.56383 4.72068C3.02929 4.72938 3.38165 5.05996 3.39035 5.52537C3.4034 6.00383 3.4034 6.48229 3.39035 6.96075C3.38165 7.40442 3.05539 7.72629 2.60733 7.76979C2.57253 7.77414 2.53338 7.77414 2.49857 7.77414C2.31587 7.77414 2.09836 7.71324 1.96351 7.79589C1.8069 7.88723 1.92871 8.12646 1.89826 8.29609C1.85911 8.53098 1.68945 8.68321 1.43279 8.70496C0.97168 8.73976 0.97168 8.73976 0.97168 8.2874C0.97603 7.85243 0.97603 7.41747 0.97603 6.9825ZM1.89826 6.22566C1.89826 6.3866 1.89826 6.54319 1.89826 6.70412C1.89826 6.75197 1.88086 6.82591 1.93741 6.83896C2.07226 6.86506 2.21147 6.87376 2.34197 6.81721C2.45507 6.76937 2.47247 6.67368 2.47247 6.56493C2.46812 6.3692 2.47247 6.17347 2.47247 5.97773C2.47247 5.69065 2.41592 5.65586 2.10706 5.63411C1.81995 5.61236 1.91566 5.80375 1.90261 5.94293C1.89391 6.03863 1.89826 6.13432 1.89826 6.22566Z"
                                        fill="#093271"
                                      />
                                      <path
                                        d="M9.60649 7.01157C9.60649 6.6201 9.60214 6.22863 9.61084 5.83716C9.61519 5.68928 9.58039 5.63708 9.42378 5.63708C9.05402 5.64578 9.04967 5.63708 9.05402 5.26301C9.05402 5.09772 9.00182 4.90199 9.07577 4.7715C9.14537 4.64536 9.36288 4.70625 9.51078 4.65841C9.73699 4.58881 9.90229 4.44528 10.0458 4.27129C10.1546 4.1408 10.2721 4.02336 10.4417 3.98856C10.5548 3.96246 10.6462 3.96681 10.6244 4.12775C10.6201 4.16255 10.6244 4.2017 10.6244 4.23649C10.6288 4.38873 10.5809 4.57142 10.6505 4.68016C10.7245 4.7889 10.9202 4.7106 11.0594 4.7193C11.1551 4.72365 11.1856 4.75845 11.1812 4.84979C11.1769 5.06728 11.1725 5.28476 11.1812 5.50224C11.1856 5.61968 11.1377 5.64578 11.029 5.64578C10.6201 5.65883 10.6201 5.66318 10.6201 6.0677C10.6201 6.87673 10.6157 7.69012 10.6244 8.49915C10.6244 8.66009 10.5853 8.72533 10.42 8.70358C10.3112 8.69053 10.2025 8.70793 10.0937 8.69488C9.77614 8.65574 9.60649 8.46 9.60214 8.14248C9.60649 7.76406 9.60649 7.38999 9.60649 7.01157Z"
                                        fill="#04B9EF"
                                      />
                                    </svg>
                                  ) : (
                                    ""
                                  )}
                                  {wallet === "PhonePe" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="17"
                                      viewBox="0 0 16 17"
                                      fill="none"
                                    >
                                      <g clipPath="url(#clip0_8625_53321)">
                                        <path
                                          d="M15.784 10.3372C16.7992 6.03796 14.1369 1.72978 9.8377 0.714597C5.53847 -0.300587 1.23029 2.36165 0.215107 6.66088C-0.800077 10.9601 1.86216 15.2683 6.16139 16.2835C10.4606 17.2987 14.7688 14.6364 15.784 10.3372Z"
                                          fill="#5F259F"
                                        />
                                        <path
                                          d="M11.6295 6.41258C11.6295 6.09983 11.3615 5.83154 11.0488 5.83154H9.97617L7.51873 3.01642C7.29517 2.74839 6.93773 2.65895 6.5803 2.74839L5.73123 3.01642C5.59711 3.06111 5.55239 3.23998 5.6418 3.32914L8.32305 5.87626H4.25677C4.12261 5.87626 4.0332 5.96567 4.0332 6.09983V6.54645C4.0332 6.85945 4.30148 7.12745 4.6142 7.12745H5.23967V9.27242C5.23967 10.881 6.08873 11.8193 7.51877 11.8193C7.96539 11.8193 8.32311 11.7745 8.7697 11.596V13.0257C8.7697 13.4279 9.0827 13.7409 9.48486 13.7409H10.1103C10.2445 13.7409 10.3784 13.6068 10.3784 13.4726V7.08273H11.4063C11.5404 7.08273 11.6295 6.99333 11.6295 6.85945V6.41258H11.6295ZM8.7697 10.2553C8.5017 10.3894 8.14423 10.4341 7.87623 10.4341C7.16105 10.4341 6.80361 10.0767 6.80361 9.27239V7.12742H8.7697V10.2553Z"
                                          fill="#FAFAFA"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_8625_53321">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                            transform="translate(0 0.5)"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  ) : (
                                    ""
                                  )}
                                  {wallet === "PayPal" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="17"
                                      viewBox="0 0 16 17"
                                      fill="none"
                                    >
                                      <g clipPath="url(#clip0_8625_53328)">
                                        <path
                                          d="M5.07117 15.9576L5.34847 14.1963L4.73078 14.182H1.78125L3.83102 1.18506C3.83739 1.14583 3.85806 1.10924 3.88829 1.08326C3.91851 1.05728 3.95721 1.04297 3.99751 1.04297H8.97083C10.6219 1.04297 11.7613 1.38654 12.3562 2.06467C12.6351 2.3828 12.8127 2.71524 12.8986 3.08108C12.9887 3.46495 12.9903 3.92357 12.9023 4.48294L12.8959 4.52377V4.88218L13.1748 5.04019C13.4097 5.16478 13.5963 5.30741 13.7395 5.47071C13.9781 5.74271 14.1324 6.0884 14.1976 6.49825C14.2649 6.91976 14.2427 7.42134 14.1324 7.98919C14.0051 8.6424 13.7994 9.21131 13.5216 9.67683C13.266 10.1058 12.9405 10.4615 12.554 10.7372C12.1849 10.9992 11.7465 11.198 11.2507 11.3252C10.7703 11.4504 10.2226 11.5135 9.62192 11.5135H9.23487C8.95811 11.5135 8.68929 11.6131 8.47827 11.7918C8.26672 11.9742 8.12675 12.2234 8.0838 12.4959L8.05464 12.6545L7.56473 15.7588L7.54246 15.8728C7.53663 15.9089 7.52655 15.9269 7.51171 15.9391C7.49845 15.9502 7.47937 15.9576 7.46081 15.9576H5.07117Z"
                                          fill="#253B80"
                                        />
                                        <path
                                          d="M13.4391 4.56641C13.4242 4.66131 13.4073 4.75834 13.3882 4.85802C12.7323 8.22535 10.4885 9.38862 7.62273 9.38862H6.16361C5.81314 9.38862 5.51782 9.64312 5.46321 9.98881L4.71615 14.7267L4.5046 16.0697C4.46907 16.2967 4.64404 16.5013 4.87309 16.5013H7.46102C7.76748 16.5013 8.02781 16.2786 8.07606 15.9764L8.10151 15.8449L8.58877 12.7528L8.62005 12.5831C8.66777 12.2798 8.92863 12.0571 9.23509 12.0571H9.62214C12.1295 12.0571 14.0923 11.0392 14.666 8.09333C14.9056 6.86273 14.7816 5.83519 14.1474 5.11252C13.9555 4.8946 13.7174 4.7138 13.4391 4.56641Z"
                                          fill="#179BD7"
                                        />
                                        <path
                                          d="M12.7527 4.2901C12.6525 4.26094 12.5491 4.23443 12.443 4.21057C12.3365 4.18724 12.2272 4.16656 12.1148 4.14853C11.7214 4.08491 11.2904 4.05469 10.8286 4.05469H6.9305C6.83453 4.05469 6.74334 4.07643 6.66168 4.11566C6.48194 4.20208 6.34833 4.37228 6.31599 4.58065L5.48675 9.83286L5.46289 9.98609C5.5175 9.6404 5.81283 9.3859 6.16329 9.3859H7.62242C10.4882 9.3859 12.732 8.2221 13.3879 4.8553C13.4075 4.75562 13.4239 4.65859 13.4388 4.56368C13.2728 4.47567 13.0931 4.40038 12.8995 4.33623C12.8518 4.32032 12.8025 4.30494 12.7527 4.2901Z"
                                          fill="#222D65"
                                        />
                                        <path
                                          d="M6.31614 4.58205C6.34848 4.37368 6.48209 4.20348 6.66183 4.11759C6.74401 4.07835 6.83468 4.05662 6.93064 4.05662H10.8287C11.2905 4.05662 11.7216 4.08684 12.115 4.15046C12.2274 4.16849 12.3366 4.18917 12.4432 4.2125C12.5492 4.23636 12.6526 4.26287 12.7528 4.29203C12.8027 4.30687 12.852 4.32225 12.9002 4.33763C13.0938 4.40178 13.2735 4.4776 13.4394 4.56508C13.6346 3.32069 13.4379 2.47342 12.765 1.70622C12.0233 0.8616 10.6845 0.5 8.97141 0.5H3.99808C3.64814 0.5 3.34964 0.754499 3.29556 1.10072L1.22405 14.2313C1.18322 14.4911 1.38364 14.7254 1.64556 14.7254H4.71598L5.4869 9.83426L6.31614 4.58205Z"
                                          fill="#253B80"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_8625_53328">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                            transform="translate(0 0.5)"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  ) : (
                                    ""
                                  )}
                                  <Label
                                    htmlFor={wallet}
                                    className="text-[16px] md:text-[20px] ml-1 text-[#FFFFFF] font-bold leading-normal"
                                  >
                                    {wallet}
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center flex-1 mt-5 mq450:p-4 md:mt-0">
          <div className="w-full mq450:max-w-[482px] md:w-[522px] about-coach-sub-div p-[22px] md:p-8">
            <div className="flex justify-start items-center gap-10 md:gap-[53px] pb-6">
              {coachImg ? (
                <Image
                  src={coachImg}
                  alt="Coach Profile"
                  width={120}
                  height={120}
                  className="w-[70px] md:w-[120px] h-[70px] md:h-[120px] rounded-full"
                />
              ) : (
                <Image
                  src="/"
                  alt="Coach Profile"
                  width={120}
                  height={120}
                  className="w-[70px] md:w-[120px] h-[70px] md:h-[120px] rounded-full"
                />
              )}
              <div>
                <h2 className="text-[20px] md:text-[30px] text-[#FFFFFF] font-bold leading-normal">
                  {sessionData?.coachName}
                </h2>
                <p className="text-[18px] md:text-[24px] text-[#FFFFFF] font-medium leading-normal">
                  {coachLvl} : {sessionData?.category}
                </p>
              </div>
            </div>
            <div className="py-4 border-t-[1px] border-b-[1px] border-[#525252]">
              <h2 className="text-[20px] md:text-[30px] text-[#FFFFFF] font-bold leading-normal mb-3">
                Price Details
              </h2>
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[16px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                  Purchase Price
                </span>
                <span className="text-[18px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                  ₹ {sessionPrize}
                </span>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[16px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                  Discount
                </span>
                <span className="text-[18px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                  -{" "}
                  {sessionData?.discountPercent
                    ? sessionData?.discountPercent
                    : 0}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[16px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                  Final Price
                </span>
                <span className="text-[18px] md:text-[20px] text-[#FFFFFF] font-normal leading-normal">
                  {/* ₹ {sessionPrize} */}₹
                  {sessionPrize && sessionData?.discountPercent
                    ? `${sessionPrize * (1 - sessionData?.discountPercent / 100)}`
                    : sessionPrize}
                </span>
              </div>
            </div>
            <div className="text-[#FFFFFF] pt-3">
              <h2 className="text-[20px] md:text-[30px] hidden md:block font-bold leading-normal">
                {coachDetails?.name}
              </h2>
              <p className="text-[16px] md:text-[20px] font-normal leading-normal">
                {/* Get a full refund if you cancel by 8 May, 12:30 am (IST). */}
                Get a full refund if you cancel by{" "}
                {sessionData?.date
                  ? formatDateForCoachCard(sessionData.date)
                  : ""}
                , {sessionData?.timeSlot ? sessionData?.timeSlot : ""} (IST).
              </p>
              <Link
                href={"/terms-and-conditions"}
                rel="noopener noreferrer"
                target="_blank"
                className="text-[18px] md:text-[20px] font-bold leading-normal underline cursor-pointer"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-[50px]">
        {/* <Button
          onClick={handleBooking}
          className="primaryButton w-[328px] md:w-[520px] py-3 text-[18px] text-[#DADADA] font-semibold"
        >
          Continue
        </Button> */}
        {isPayBtnOn ? (
          <Button
            onClick={paymentHandler}
            className="primaryButton w-[328px] md:w-[520px] py-3 text-[18px] text-[#DADADA] font-semibold"
          >
            Pay ₹{" "}
            {sessionPrize && sessionData?.discountPercent
              ? `${sessionPrize * (1 - sessionData?.discountPercent / 100)}`
              : sessionPrize}
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Page;
