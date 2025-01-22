"use client";
import UserNavbar from "@/app/Components/UserNavbar";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useToast } from "@/components/ui/use-toast";

import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  HeaderRowDirective,
  HeaderRowsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import "./App.css";
const styles = `

.e-schedule .e-schedule-toolbar .e-toolbar-items.e-tbar-pos {
    color: gray;
    // background: linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%) !important;
}
.e-schedule .e-schedule-toolbar,
.e-schedule .e-header-cells,
.e-schedule .e-all-day-cells {
//  background: linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%) !important;
  color: #ffffff !important;
}
.e-schedule .e-vertical-view .e-work-cells{
background-color: #171717;
}
.e-schedule .e-vertical-view .e-time-cells-wrap .e-time-cells{
background-color: #171717;}
.e-schedule .e-vertical-view .e-alternate-cells{
background-color: #171717;
}

.e-schedule .e-vertical-view .e-time-cells-wrap table td{
background-color: #171717;
}

.e-schedule .e-schedule-toolbar .e-toolbar-items.e-tbar-pos{
color:gray  }

.e-schedule .e-appointment {
  background-color: #4D2114 !important;
  // background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)) !important;

  border: none !important;
    border-left: 5px solid #fb923c !important; /* Orange-400 */
}

.e-schedule .e-current-day {
  background-color: rgba(255, 138, 101, 0.1) !important;
}

.e-schedule .e-header-cells.e-current-day {
  background-color: #000000 !important;
}
.e-schedule .e-month-view .e-work-days, .e-schedule .e-month-agenda-view .e-work-days  {
background-color: #171717;
}
.e-schedule .e-month-view .e-work-cells, .e-schedule .e-month-agenda-view .e-work-cells{
background-color: #171717;

}

.e-schedule .e-schedule-table tbody td.e-work-hours {
 
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent; /* Changed from #00b0ff to orange-200 */
}
.e-schedule .e-schedule-toolbar .e-active-view .e-tbar-btn-text{
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent; /* Changed from #00b0ff to orange-200 */
}
  .e-btn.e-flat.e-primary, .e-css.e-btn.e-flat.e-primary{
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent; /* Changed from #00b0ff to orange-200 */
    

  }
    .e-btn.e-flat.e-primary, .e-css.e-btn.e-flat.e-primary:hover{
    background-color: #514e46; /* Changed from #00b0ff to orange-200 */
      background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent; /* Changed from #00b0ff to orange-200 */
    }
        .e-calendar .e-content td.e-selected.e-focused-date span.e-day {
background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
    color: #fffff;
}
   .e-schedule .e-vertical-view .e-previous-timeline {
    position: relative;
        top: 0;
    left: 0;
    width: 100%;
    height: 1px; /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border-top: 1px dotted var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)); /* Maintains dotted effect */
    z-index: 1; /* Ensures positioning context for the pseudo-element */
}
.e-cell e-selected e-focused-date e-today{
    background: none;
    border: 1px solid #ffa800;
    border-radius: 50%;
    box-shadow: none;
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
}
.e-schedule .e-vertical-view .e-previous-timeline::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px; /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border-top: 1px dotted transparent; /* Maintains dotted effect */
    z-index: 1;
}

    .e-schedule .e-vertical-view .e-current-timeline {
    position: relative; /* Ensures positioning context for the pseudo-element */
     top: 0;
    left: 0;
    width: 100%;
    height: 1px; /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border-top: 1px dotted var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)); /* Maintains dotted effect */
    z-index: 1;
}
       .e-schedule .e-vertical-view .e-current-timeline::before {
   content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px; /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border-top: 1px dotted var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)); /* Maintains dotted effect */
    z-index: 1;
}
    .e-toolbar .e-toolbar-pop .e-toolbar-item .e-tbar-btn.e-btn .e-icons.e-btn-icon{
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
    }
   /* Apply the gradient to the text and clip it */
.e-calendar .e-content td.e-selected span.e-day {
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; /* Makes text show gradient */
    color: transparent; /* Ensures gradient text color */
    border: none;
    border-radius: 50%;
}

/* Hover on the parent td instead of the span to change background color */
.e-calendar .e-content td.e-selected:hover {
    background-color: #514e46; /* Change color on hover */
    border-radius: 50%; /* Ensure the rounded effect remains */
}

    .e-calendar .e-content td.e-today span.e-day, .e-calendar .e-content td.e-focused-date.e-today span.e-day :hover{
  
    top: 0;
    left: 0;
    width: 100%;
   /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border: 1px dotted var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)); /* Maintains dotted effect */
    z-index: 1;
    border-radius: 50%;
    box-shadow: none;
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
}

.e-calendar .e-content td.e-today.e-selected:hover span.e-day, .e-calendar .e-content td.e-selected:hover span.e-day, .e-calendar .e-content td.e-selected.e-focused-date span.e-day {
        background: none;
    top: 0;
    left: 0;
    width: 100%;
   /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border: 1px dotted var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)); /* Maintains dotted effect */
    z-index: 1;
    border-radius: 50%;
    box-shadow: none;
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    
}

.e-more-appointment-wrapper {
    display: flex;
    flex-direction: column;
    gap: 41px;
}

 .e-calendar .e-content td.e-today span.e-day, .e-calendar .e-content td.e-focused-date.e-today span.e-day::hover{
    background: none;
    top: 0;
    left: 0;
    width: 100%;
   /* Height of the top "border" */
    background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    border: 1px dotted var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%)); /* Maintains dotted effect */
    z-index: 1;
    border-radius: 50%;
    box-shadow: none;
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
}
    .e-calendar .e-content td.e-selected span.e-day ::hover {
    background-  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
    color: #fffff;
    border: none;
    border-radius: 50%;
    background-color:white
}

.e-calendar .e-content td.e-today span.e-day:hover{
backrgound:none}

.e-calendar .e-content td.e-today span.e-day, .e-calendar .e-content td.e-focused-date.e-today span.e-day {
    background: none;
    border: 1px solid #ffa800;
    border-radius: 50%;
    box-shadow: none;
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
    outline: none;
    
}
    .e-schedule .e-header-cells.e-current-day {
    background-color: #303030 !important;
}
    .e-schedule .e-month-view .e-current-date .e-date-header{
    background-  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: white;
    }


    .e-schedule .e-vertical-view .e-current-time {
  background: var(--Linears-linear-main, linear-gradient(90deg, #F43F5E -3.84%, #FB923C 103.36%));
    -webkit-background-clip: text;
    color: transparent;
}
 .e-schedule.e-device .e-schedule-toolbar .e-toolbar-items.e-tbar-pos .e-toolbar-right .e-toolbar-item .e-tbar-btn {
    border: none;
    border-radius: 0;
    display: none;
}
`;
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
interface PublicSession {
  _id: string;
  coachId: string;
  coachName: string;
  title: string;
  description: string;
  category: string;
  level: string;
  date: string;
  startTime: string;
  endTime: string;
  seats: number;
  bookedSeats: number;
  meetLink: string;
  price: number;
  intensityLevel?: string;
  equipment?: string;
}

interface PrivateSession {
  _id: string;
  coachId: string;
  coachName: string;
  title: string;
  category: string;
  dateTime: string;
  seats: number;
  bookedSeats: number;
  timeSlot: string;
  meetLink: string;
  price: number;
}
interface TransformedSession {
  Id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  Description: string;
  meetLink: string;
  CategoryColor: string;
  CoachName: string;
  Price: number;
  AvailableSeats: number;
  Level: string;
  Equipment: string;
  IntensityLevel: string;
  IsPublic: boolean;
}

import Link from "next/link";
const Page = () => {
  const [currentView, setCurrentView] = useState("Week");
  const [sessions, setSessions] = useState<TransformedSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getCategoryColor = (category: any) => {
    const colorMap: any = {
      Yoga: "#7986CB",
      Meditation: "#4DB6AC",
      Fitness: "#FF8A65",
      // Add more categories as needed
      default: "#78909C",
    };
    return colorMap[category] || colorMap.default;
  };
  const userId = Cookies.get("user_id") || "";
  const transformSessionData = (apiData: any) => {
    const transformSession = (session: any, isPublic: boolean) => {
      let startTime, endTime;

      // Extract date components
      const [day, month, year] = session.date.split("-");

      // Parse start time
      const startHour = session.startTime.replace(/\s*AM|\s*PM/g, "");
      const startTimeParts =
        `${startHour}:00${parseInt(startHour) >= 12 ? "PM" : "AM"}`.match(
          /(\d+):(\d+)(AM|PM)/,
        );

      if (!startTimeParts) {
        console.warn(`Invalid start time format for session: ${session.title}`);
        return null;
      }

      // Create start time
      startTime = new Date(year, parseInt(month) - 1, parseInt(day));
      startTime.setHours(
        parseInt(startTimeParts[1]) +
          (startTimeParts[3] === "PM" && startTimeParts[1] !== "12" ? 12 : 0),
        parseInt(startTimeParts[2]),
      );

      // Parse end time
      const endHour = session.endTime.replace(/\s*AM|\s*PM/g, "");
      const endTimeParts =
        `${endHour}:00${parseInt(endHour) >= 12 ? "PM" : "AM"}`.match(
          /(\d+):(\d+)(AM|PM)/,
        );

      if (endTimeParts) {
        endTime = new Date(year, parseInt(month) - 1, parseInt(day));
        endTime.setHours(
          parseInt(endTimeParts[1]) +
            (endTimeParts[3] === "PM" && endTimeParts[1] !== "12" ? 12 : 0),
          parseInt(endTimeParts[2]),
        );
      } else {
        endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Default 1 hour duration
      }

      return {
        Id: session._id,
        Subject: `${session.title} (${session.category})`,
        StartTime: startTime,
        EndTime: endTime,
        Description: session.description || "",
        meetLink: session.meetLink,
        CategoryColor: getCategoryColor(session.category),
        CoachName: session.coachName,
        Price: session.price,
        AvailableSeats: session.seats - session.bookedSeats,
        Level: session.level || "",
        Equipment: session.equipment || "",
        IntensityLevel: session.intensityLevel || "",
        IsPublic: isPublic,
      };
    };

    const publicSessions = (apiData.public || []).map((session: any) =>
      transformSession(session, true),
    );
    const privateSessions = (apiData.private || []).map((session: any) =>
      transformSession(session, false),
    );

    return [...publicSessions, ...privateSessions].filter(Boolean);
  };

  const onCellClick = (args: any) => {
    args.cancel = true; // Prevent default behavior of adding a new event
  };
  const onCellDoubleClick = (args: any) => {
    args.cancel = true;
  };

  const hasSessionStarted = (startTime: Date) => {
    const now = new Date();
    return now >= startTime;
  };
  // Example usage:
  const apiData = [
    {
      _id: "66fc26b44514cf6bf19d033e",
      coachId: "667ff1b7bb0d5c742464bb30",
      coachName: "Akash",
      title: "Healthy Heart",
      description: "Yoga exercises for good heart health",
      category: "Yoga",
      level: "Advanced",
      focusArea: ["Back", "Upper Body"],
      date: "24-11-2024",
      startTime: "11:00AM",
      endTime: "12:00PM",
      sessionId: "LSP00001",
      // ... other fields
    },
    {
      _id: "66fc26b44514cf6bf19d034e",
      coachId: "667ff1b7bb0d5c742464b30",
      coachName: "Suyash",
      title: "Yoga Session",
      description: "Yoga exercises for good heart health",
      category: "Yoga",
      level: "Advanced",
      focusArea: ["Back", "Upper Body"],
      date: "25-11-2024",
      startTime: "8:00AM",
      endTime: "10:00PM",
      sessionId: "LSP00001",
      // ... other fields
    },
  ];

  const transformedData = transformSessionData(apiData);
  //console.log(transformedData);

  // Helper function to assign colors based on category
  // Function to fetch and transform session data
  const fetchSessionData = async (userId: string) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/fitnearn/web/users/session/get/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data) {
        return transformSessionData(response.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      //console.error("Error fetching session data:", error);
      throw error;
    }
  };
  const eventTemplate = (props: any) => {
    return (
      <div className="template-wrap">
        <div className="font-bold subject">{props.Subject}</div>
        <div className="coach">Coach: {props.CoachName}</div>
        <div className="seats">Meet Link: {props.meetLink}</div>
      </div>
    );
  };
  const { toast } = useToast();

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true);
        const data = await fetchSessionData(userId);
        setSessions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [userId]);

  // Handle event double click
  const onEventDoubleClick = (args: any) => {
    args.cancel = true;
    const meetLink =
      args?.element?.getAttribute("data-meetLink") ||
      args?.data?.meetLink ||
      args?.event?.meetLink;

    // console.log(meetLink);
    const startTime = args?.data?.StartTime || args?.event?.StartTime;
    if (meetLink === `paste meeting link here`) {
      toast({
        title: "Meeting link yet to be generated.",
        description: "",
        duration: 3000, // 3 seconds
      });
      return;
    }
    if (meetLink && startTime) {
      if (hasSessionStarted(startTime)) {
        const newWindow = window.open(
          meetLink,
          "_blank",
          "noopener,noreferrer",
        );
        if (newWindow) newWindow.opener = null;
      } else {
        toast({
          title: "Session not started yet.",
          description: "You can join the session when its started!",
          duration: 3000, // 3 seconds
        });
      }
    } else {
      console.warn("No meet link or start time found for this event");
    }
  };

  // Add style tag to document head
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Fetch the events from the API when the component mounts
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       // Replace with actual userId retrieval method, e.g., from cookies
  //       const userId = "6688077415c10dbb150d5ed8";
  //       const response = await fetch(
  //         `${apiEndpoint}/api/fitnearn/web/users/session/get/${userId}`,
  //       );
  //       const data = await response.json();

  //       // Extract and map events from the API response
  //       // Extract and map events from the API response
  //       const fetchedEvents: Event[] = [...data.public, ...data.private]
  //         .map((session, index) => {
  //           const startDate = new Date(session.dateTime);

  //           // Validate the date and duration
  //           if (
  //             isNaN(startDate.getTime()) ||
  //             typeof session.duration !== "number"
  //           ) {
  //             console.warn(`Invalid session data: ${JSON.stringify(session)}`);
  //             return null; // Skip invalid sessions
  //           }

  //           return {
  //             event_id: index + 1, // Unique event_id, you may use session._id
  //             title: session.title,
  //             start: startDate,
  //             end: new Date(startDate.getTime() + session.duration * 60000), // Calculate end time
  //           };
  //         })
  //         .filter((event): event is Event => event !== null); // Type guard to ensure TypeScript understands this is an array of Event

  //       // Update the state with the fetched events
  //       setEvents(fetchedEvents);
  //     } catch (error) {
  //       //console.error("Failed to fetch events", error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setCurrentView("Day");
      } else {
        setCurrentView("Week");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="relative mq450:static  pt-[827px] ">
        <UserNavbar activelive={true} liveactivecolor="neutral-700" />
        <div className="absolute ml-12 text-white mq1 mq450:justify-center mq450:ml-2 top-28 left-44 mq450:left-0 mq450:mt-14 w-[1000px] mq1050:ml-2 mb-10 mq450:w-[350px]">
          <div className="flex items-center gap-2 mq450:gap-8 mq450:mx-3 border-neutral-500 mq450:mx-5">
            <p className="text-2xl font-bold text-neutral-300 text-nowrap mq450:text-xl font-Lato">
              My Sessions
            </p>
            <Link href="/live_session/upcoming_session">
              <button className="w  mq1240:ml-[400px] hover:bg-gradient-to-l from-pink-600 to-orange-500 mq450:ml-[50px] ml-[730px] text-sm text-nowrap h-[33px] px-3 py-1.5 rounded-lg border border-neutral-600 justify-center items-center gap-2 inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12.6667 1.9987H10.4813C10.3652 1.79667 10.1981 1.62873 9.99656 1.51171C9.79507 1.3947 9.56634 1.33273 9.33333 1.33203H6.66667C6.43366 1.33273 6.20494 1.3947 6.00344 1.51171C5.80194 1.62873 5.63476 1.79667 5.51867 1.9987H3.33333C2.97971 1.9987 2.64057 2.13917 2.39052 2.38922C2.14048 2.63927 2 2.97841 2 3.33203V13.332C2 13.6857 2.14048 14.0248 2.39052 14.2748C2.64057 14.5249 2.97971 14.6654 3.33333 14.6654H12.6667C13.0203 14.6654 13.3594 14.5249 13.6095 14.2748C13.8595 14.0248 14 13.6857 14 13.332V3.33203C14 2.97841 13.8595 2.63927 13.6095 2.38922C13.3594 2.13917 13.0203 1.9987 12.6667 1.9987ZM9.33333 2.66536V3.9987H6.66667V2.66536H9.33333ZM12.6667 13.332H3.33333V3.33203H5.33333V3.9987C5.15652 3.9987 4.98695 4.06894 4.86193 4.19396C4.7369 4.31898 4.66667 4.48855 4.66667 4.66536C4.66667 4.84218 4.7369 5.01174 4.86193 5.13677C4.98695 5.26179 5.15652 5.33203 5.33333 5.33203H10.6667C10.8435 5.33203 11.013 5.26179 11.1381 5.13677C11.2631 5.01174 11.3333 4.84218 11.3333 4.66536C11.3333 4.48855 11.2631 4.31898 11.1381 4.19396C11.013 4.06894 10.8435 3.9987 10.6667 3.9987V3.33203H12.6667V13.332Z"
                    fill="white"
                  />
                  <path
                    d="M10.6667 7.33203H7.33333C7.15652 7.33203 6.98695 7.40227 6.86193 7.52729C6.7369 7.65232 6.66667 7.82189 6.66667 7.9987C6.66667 8.17551 6.7369 8.34508 6.86193 8.4701C6.98695 8.59513 7.15652 8.66536 7.33333 8.66536H10.6667C10.8435 8.66536 11.013 8.59513 11.1381 8.4701C11.2631 8.34508 11.3333 8.17551 11.3333 7.9987C11.3333 7.82189 11.2631 7.65232 11.1381 7.52729C11.013 7.40227 10.8435 7.33203 10.6667 7.33203Z"
                    fill="white"
                  />
                  <path
                    d="M10.6667 9.9987H7.33333C7.15652 9.9987 6.98695 10.0689 6.86193 10.194C6.7369 10.319 6.66667 10.4886 6.66667 10.6654C6.66667 10.8422 6.7369 11.0117 6.86193 11.1368C6.98695 11.2618 7.15652 11.332 7.33333 11.332H10.6667C10.8435 11.332 11.013 11.2618 11.1381 11.1368C11.2631 11.0117 11.3333 10.8422 11.3333 10.6654C11.3333 10.4886 11.2631 10.319 11.1381 10.194C11.013 10.0689 10.8435 9.9987 10.6667 9.9987Z"
                    fill="white"
                  />
                  <path
                    d="M5.33333 8.66536C5.70152 8.66536 6 8.36689 6 7.9987C6 7.63051 5.70152 7.33203 5.33333 7.33203C4.96514 7.33203 4.66667 7.63051 4.66667 7.9987C4.66667 8.36689 4.96514 8.66536 5.33333 8.66536Z"
                    fill="white"
                  />
                  <path
                    d="M5.33333 11.332C5.70152 11.332 6 11.0336 6 10.6654C6 10.2972 5.70152 9.9987 5.33333 9.9987C4.96514 9.9987 4.66667 10.2972 4.66667 10.6654C4.66667 11.0336 4.96514 11.332 5.33333 11.332Z"
                    fill="white"
                  />
                </svg>
                Session List
              </button>
            </Link>
          </div>
          {/* <div style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div> */}
          {/* <div
            style={{
              marginTop: "50px",
              borderRadius: "165px",
              marginLeft: "5px",
            }}
          >
            <Scheduler
              view="week" // You can also use "day", "month"
              events={events}
              // day={{
              //   startHour: 6, // Start from 6 AM
              //   endHour: 22, // End at 10 PM
              //   step: 30, // 30-minute intervals
              // }}
              week={{
                weekDays: [0, 1, 2, 3, 4, 5, 6],
                weekStartOn: 0,
                startHour: 6,
                endHour: 22,
                step: 60,
              }}
              height={1500}
            />
          </div> */}
          <div
            style={{ marginTop: "50px" }}
            className="mt-10 mq450:w-[350px] mq450:mx-2"
          >
            <ScheduleComponent
              className="mq450:w-[350px]"
              currentView="Day"
              selectedDate={new Date()}
              eventSettings={{
                dataSource: sessions,
                template: eventTemplate,
                fields: {
                  subject: { name: "Subject" },
                  startTime: { name: "StartTime" },
                  endTime: { name: "EndTime" },
                  description: { name: "Description" },
                  meetLink: { name: "meetLink" },
                  customFields: ["meetLink"],
                },
              }}
              showQuickInfo={false}
              cellClick={onCellClick}
              cellDoubleClick={onCellDoubleClick}
              eventDoubleClick={onEventDoubleClick}
              allowDragAndDrop={false}
              allowResizing={false}
              enablePersistence={false}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject services={[Day, Week, Month]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
