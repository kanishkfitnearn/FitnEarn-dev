"use client"
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import dummyPic from "../../../../public/blogAuthorPic.png";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { useRouter } from "next/navigation";

const Notification = ({ profilePic }: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);

    const [toggle, setToggle] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null); // Explicitly type as HTMLDivElement
    const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
    const user_id = Cookies.get('user_id')

    const router = useRouter();

    // const notifications = [
    //     {
    //         notificationId: "abc",
    //         image: `${dummyPic}`,
    //         name: "Jese Leos",
    //         message: 'New message from Jese: "Hey, what\'s up?"',
    //         timeAgo: "a few moments ago",
    //         timestamp: "2024-12-13T10:47:22.388Z",
    //         isRead: false,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abcd",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-11-13T10:47:22.388Z",
    //         isRead: false,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abcdef",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-12-10T10:47:22.388Z",
    //         isRead: true,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abccgyu",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-12-13T11:50:31.942Z",
    //         isRead: true,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abchjlijh",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-12-10T10:47:22.388Z",
    //         isRead: true,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abchjj",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-12-13T11:50:31.942Z",
    //         isRead: true,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abvjhc",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-12-10T10:47:22.388Z",
    //         isRead: true,
    //         link: "#"
    //     },
    //     {
    //         notificationId: "abbbc",
    //         image: `${dummyPic}`,
    //         name: "Bonnie Green",
    //         message: "Bonnie liked your post.",
    //         timeAgo: "10 minutes ago",
    //         timestamp: "2024-12-13T11:50:31.942Z",
    //         isRead: true,
    //         link: "#"
    //     },
    // ];

    dayjs.extend(relativeTime);

    // Function to get relative time
    function getRelativeTime(timestamp: any) {
        const now = dayjs();
        const time = dayjs(timestamp);
        return time.from(now);
    }


    const fetchNotifications = async () => {
        if (!user_id) {
            return;
        }
        try {
            const res = await fetch(`${apiEndpoint}/api/fitnearn/web/notifications/${user_id}`);
            const result = await res.json();
            if (Array.isArray(result)) {  // Ensure result is an array
                setNotifications(result);
                console.log("notifications", result);
            } else {
                console.error("Expected an array but got:", result);
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const updateNotifications = () => fetchNotifications();
        window.addEventListener("new-notification", updateNotifications);

        return () => window.removeEventListener("new-notification", updateNotifications);
    }, []);


    async function markNotificationAsRead(userId: string | undefined, notificationId: string) {
        const apiUrl = `${apiEndpoint}/api/fitnearn/web/notifications/mark-as-read`;

        try {
            const requestBody = {
                userId,
                notificationId,
            };

            const response = await axios.patch(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Notification marked as read:', response.data);
                return response.data.notification; // Return updated notification
            } else {
                console.error('Failed to mark notification as read:', response);
                return false;
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }

    const handleNotificationClick = async (userId: string | undefined, notificationId: string, url: string, isRead: boolean) => {
        if (!isRead) {
            const updatedNotification = await markNotificationAsRead(userId, notificationId);
            if (updatedNotification) {
                console.log('Notification updated successfully:', updatedNotification);
                router.push(url);
                fetchNotifications();
            } else {
                console.error('Failed to update notification.');
            }
        } else {
            console.log('notification is read by user.');
            // router.push(url);
            // fetchNotifications();
        }
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredNotifications = toggle
        ? notifications.filter((notif: any) => !notif.isRead) // Only unread notifications
        : notifications; // All notifications when toggle is off

    const unreadNotifications =  notifications.filter((notif: any) => !notif.isRead);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                id="dropdownNotificationButton"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                aria-expanded={isDropdownOpen}
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 28" fill="none">
                    <path d="M18.8224 15.448V12.9218C18.8234 11.2143 18.1991 9.5565 17.0504 8.21634C15.9017 6.87618 14.2959 5.93204 12.4925 5.53661C12.5062 5.48762 12.5169 5.43795 12.5245 5.38784V2.06999C12.5245 1.69776 12.3639 1.34078 12.0781 1.07758C11.7924 0.814371 11.4048 0.666504 11.0007 0.666504C10.5965 0.666504 10.2089 0.814371 9.92315 1.07758C9.63739 1.34078 9.47684 1.69776 9.47684 2.06999V5.38784C9.48442 5.43795 9.4951 5.48762 9.50884 5.53661C7.70543 5.93204 6.09955 6.87618 4.95088 8.21634C3.80222 9.5565 3.17792 11.2143 3.17894 12.9218V15.448C3.17894 18.7968 0.333984 19.6333 0.333984 21.3076C0.333984 22.1399 0.333985 22.982 1.15379 22.982H20.8475C21.6673 22.982 21.6673 22.1399 21.6673 21.3076C21.6673 19.6333 18.8224 18.7968 18.8224 15.448Z" fill="#D4D4D4" />
                    <path d="M6.15951 24.3855C6.56374 25.2599 7.23819 26.0055 8.09896 26.5296C8.95972 27.0537 9.9688 27.3332 11.0007 27.3332C12.0325 27.3332 13.0416 27.0537 13.9023 26.5296C14.7631 26.0055 15.4376 25.2599 15.8418 24.3855H6.15951Z" fill="#D4D4D4" />
                </svg>
                {unreadNotifications.length > 0 ? (
                    <span className="absolute -top-0.5 start-2.5">
                        <div className=" block w-6 h-4 bg-red-500 border-[0.5px] border-white text-[12px] leading-[0.8rem] text-white  rounded-full  dark:border-gray-900">
                            {
                            unreadNotifications.length > 9 ? "9+" : unreadNotifications.length
                            }
                        </div>
                    </span>
                ) : ("")}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    id="dropdownNotification"
                    className="z-20 absolute right-0 mt-2 w-96 max-h-[544px] overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-800"
                    role="menu"
                    aria-labelledby="dropdownNotificationButton"
                    style={{
                        scrollbarWidth: "thin", /* Firefox */
                        scrollbarColor: "#262626 #525252", /* Black thumb, gray track */
                    }}
                >
                    <div className="flex justify-between items-center px-4 py-2  bg-[#525252] dark:bg-[#525252]">
                        <h5 className="text-base text-[#D4D4D4] font-medium dark:text-white">Notifications</h5>
                        {notifications.length > 0 ? (
                            <label className="inline-flex justify-center items-center gap-2 mx-3 cursor-pointer">
                                <span className="text-xs text-[#D4D4D4] font-medium dark:text-white">only show unread</span>
                                <input
                                    type="checkbox"
                                    value=""
                                    checked={toggle}
                                    onChange={(e) => setToggle(e.target.checked)}
                                    className="sr-only peer w-[60px] h-[32px]"
                                />
                                <div className="relative w-11 h-6 border border-[#FFF] bg-[#525252] peer-checked:after:border-none peer-checked:after:bg-[linear-gradient(90deg,_#f43f5e_3.36%,_#fb923c_96.64%)] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-[#171717] after:border-[#FFF] after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#171717]"></div>
                            </label>
                        ) : ""}
                    </div>
                    <div>
                        {notifications.length > 0 ?  (
                            filteredNotifications.map((notif: any, index: number) => (
                                <div
                                    key={notif.notificationId}
                                    onClick={() => handleNotificationClick(user_id, notif.notificationId, notif.url, notif.isRead)}
                                    className={`flex items-center px-4 py-3 ${notif.isRead ? "bg-neutral-700" : "bg-neutral-800"} hover:bg-[#262626c4] dark:hover:bg-[#262626] border-[1px] border-solid border-[#525252]`}
                                    role="menuitem"
                                >
                                    <div className="flex-shrink-0">
                                        <Image
                                            className="rounded-full w-11 h-11"
                                            // src={notif.image || "/default-avatar.png"} 
                                            src={profilePic}
                                            alt={`${notif.notificationTitle} image`}
                                            width={44}
                                            height={44}
                                        />
                                    </div>
                                    <div className="w-full pl-3">
                                        {/* <div className="text-gray-500 text-sm dark:text-gray-400">
                                            {notif.notificationTitle}
                                        </div> */}
                                        <div className="text-[#A3A3A3] text-sm dark:text-gray-400 font-normal">
                                            {notif.notificationBody}
                                        </div>
                                        <div className="text-xs mid-heading ">
                                            {getRelativeTime(notif.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                No new notifications
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
