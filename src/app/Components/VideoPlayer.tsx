// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-contrib-quality-levels";
// import "videojs-hls-quality-selector";

// interface VideoPlayerHLSProps {
//   videoData: any; // Replace `any` with the correct type for your videoData if possible
// }

// const VideoPlayerHLS: React.FC<VideoPlayerHLSProps> = ({ videoData }) => {
//   const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
//   const [vidDuration, setVidDuration] = useState(50000);

//   const videoRef = useRef<HTMLDivElement>(null); // Changed to HTMLDivElement since video.js attaches to a div
//   const [player, setPlayer] = useState<any>(null); // Use any or define a more specific type for the player instance

//   const liveURL = "https://vz-b4f1e97e-483.b-cdn.net/65c65840-de66-4c27-afd0-a3b5a904b768/playlist.m3u8";

//   useEffect(() => {
//     if (videoRef.current) {
//       const playerInstance = videojs(videoRef.current, {
//         autoplay: false,
//         preload: "auto",
//         title: "Oceans",
//         controls: true,
//         poster: videoData.thumbnailUrl, // Ensure this URL is correct
//         sources: [
//           {
//             src: videoData.videoUrl,
//             type: "application/x-mpegURL",
//             withCredentials: false,
//           },
//         ],
//         html5: {
//           nativeAudioTracks: true,
//           nativeVideoTracks: true,
//           nativeTextTracks: true,
//         },
//         playbackRates: [0.5, 1, 1.5, 2, 2.5],
//       });

//       setPlayer(playerInstance);
//     }

//     return () => {
//       if (player) {
//         player.dispose();
//       }
//     };
//   }, [videoRef, videoData.thumbnailUrl, liveURL]);

//   useEffect(() => {
//     if (player) {
//       player.hlsQualitySelector({ displayCurrentQuality: true });
//     }
//   }, [player]);

//   useEffect(() => {
//     if (callFinishVideoAPI) {
//       // Placeholder for the function to call the finish video API
//       // finishesVideo()
//     }
//   }, [callFinishVideoAPI]);

//   return (
//     <div data-vjs-player>
//       <video
//         ref={videoRef}
//         onLoadedMetadata={(e) => {
//           setVidDuration((e.target as HTMLVideoElement).duration);
//         }}
//         onTimeUpdate={(e) => {
//           if ((e.target as HTMLVideoElement).currentTime >= vidDuration - 10) {
//             setCallFinishVideoAPI(true);
//           }
//         }}
//         className="w-[328px] md:w-[1136px] h-[222px] md:h-[400px] vidPlayer video-js vjs-default-skin vjs-big-play-centered vjs-matrix vjs-big-play-button vjs-volume-level"
//       ></video>
//     </div>
//   );
// };

// export default VideoPlayerHLS;

// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-contrib-quality-levels";
// import "videojs-hls-quality-selector";

// interface VideoPlayerHLSProps {
//   videoData: any; // Replace `any` with the correct type for your videoData if possible
// }

// const VideoPlayerHLS: React.FC<VideoPlayerHLSProps> = ({ videoData }) => {
//   const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
//   const [vidDuration, setVidDuration] = useState(50000);

//   const videoRef = useRef<HTMLVideoElement>(null); // Changed to HTMLVideoElement
//   const playerRef = useRef<HTMLDivElement>(null); // Ref for the container div
//   const [player, setPlayer] = useState<any>(null); // Use any or define a more specific type for the player instance

//   const liveURL =
//     "https://vz-b4f1e97e-483.b-cdn.net/65c65840-de66-4c27-afd0-a3b5a904b768/playlist.m3u8";

//   useEffect(() => {
//     if (playerRef.current) {
//       const playerInstance = videojs(playerRef.current, {
//         autoplay: false,
//         preload: "auto",
//         title: "Oceans",
//         controls: true,
//         poster: videoData?.thumbnailUrl || "", // Ensure this URL is correct
//         sources: [
//           {
//             src: videoData?.videoUrl,
//             type: "application/x-mpegURL",
//             withCredentials: false,
//           },
//         ],
//         html5: {
//           nativeAudioTracks: true,
//           nativeVideoTracks: true,
//           nativeTextTracks: true,
//         },
//         playbackRates: [0.5, 1, 1.5, 2, 2.5],
//       });

//       setPlayer(playerInstance);
//     }

//     return () => {
//       if (player) {
//         player.dispose();
//       }
//     };
//   }, [videoRef, videoData?.thumbnailUrl, liveURL]);

//   useEffect(() => {
//     if (player) {
//       player.hlsQualitySelector({ displayCurrentQuality: true });
//     }
//   }, [player]);

//   useEffect(() => {
//     if (callFinishVideoAPI) {
//       // Placeholder for the function to call the finish video API
//       // finishesVideo()
//     }
//   }, [callFinishVideoAPI]);

//   return (
//     <div data-vjs-player>
//       <div
//         ref={playerRef}
//         className="video-js vjs-default-skin vjs-big-play-centered vjs-matrix vjs-big-play-button vjs-volume-level"
//       >
//         <video
//           ref={videoRef}
//           onLoadedMetadata={(e) => {
//             setVidDuration((e.target as HTMLVideoElement).duration);
//           }}
//           onTimeUpdate={(e) => {
//             if (
//               (e.target as HTMLVideoElement).currentTime >=
//               vidDuration - 10
//             ) {
//               setCallFinishVideoAPI(true);
//             }
//           }}
//           className="w-[328px] md:w-[1136px] h-[222px] md:h-[400px] vidPlayer"
//         ></video>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayerHLS;

"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const VideoPlayer = ({ videoData, isPlay }: any) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false); // Default should be false
  const [isFullScreen, setIsFullScreen] = useState(false); // Track fullscreen state

  const userId = Cookies.get("user_id");
  const token = Cookies.get("id_token");
  const refreshToken = Cookies.get("refresh_token");
  const username = Cookies.get("username");
  const genToken = Cookies.get("genToken");
  const router = useRouter();
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const playerRef = useRef(null); // Ref for ReactPlayer
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle video fetch and play
  // async function handlePlayClick(videoId: string) {
  //   if (!genToken || !username) {
  //     router.push("/signup");
  //     return false;
  //   } else {
  //     try {
  //       const response = await axios.get(
  //         `${apiEndpoint}/api/fitnearn/web/users/workout/video/details/${videoId}/${userId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "x-refresh-token": refreshToken,
  //             "x-username": username,
  //           },
  //         },
  //       );

  //       if (response.data.success) {
  //         setVideoUrl(response.data.data.videoUrl);
  //         window.gtag('event', 'video_play', {
  //           event_category: 'Workout Videos',
  //           event_label: 'Workout Video Name', // Replace with actual video name or ID
  //           value: 1, // Optional: Any value to track
  //         });
  //         return true;
  //       }
  //     } catch (error: any) {
  //       if (error.response) {
  //         if (error.response.status === 401) {
  //           router.push("/signup");
  //         }
  //         if (error.response.status === 403) {
  //           router.push("/subscription-plans");
  //         }
  //       } else if (error.request) {
  //         //console.error("Request error:", error.request);
  //       } else {
  //         //console.error("Error:", error.message);
  //       }
  //     }
  //   }
  //   return false;
  // }

  async function handlePlayClick(videoId: string) {
    if (!genToken || !username) {
      router.push("/signup");
      return false;
    } else {
      try {
        const response = await axios.get(
          `${apiEndpoint}/api/fitnearn/web/users/workout/video/details/${videoId}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-refresh-token": refreshToken,
              "x-username": username,
            },
          }
        );

        console.log("response from video play",response,response.data.data.title,response.data.data.id);

        if (response.data.success) {
          setVideoUrl(response.data.data.videoUrl);
          console.log(`this ${response.data.data.title} video play count is going to be added in a video_play event`);
          // Track the video play event
          (window as any).gtag("event", "video_play", {
            event_category: "Workout Videos",
            event_label: response.data.data.title || "Unknown Video", // Use actual video name
            event_videoId : response.data.data.id || "Unknown Video",
            value: 1, // Optional: Any value to track
          })
          return true;
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            router.push("/signup");
          }
          if (error.response.status === 403) {
            router.push("/subscription-plans");
          }
        } else if (error.request) {
          //console.error("Request error:", error.request);
        } else {
          //console.error("Error:", error.message);
        }
      }
    }
    return false;
  }
  

  // Trigger fullscreen based on isPlay
  // useEffect(() => {
  //   if (isPlay === "true") {
  //     enterFullScreen();
  //   }
  // }, [isPlay]);

  // Function to request full screen
  const enterFullScreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  // Function to exit full screen
  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Listen for fullscreen changes (user manually toggling fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Only play when user clicks if isPlay is false
  // const handleUserClick = async () => {
  //   //console.log("isPlay",isPlay);
  //   //console.log("Playing",playing);

  //   if (isPlay) {
  //     const success = await handlePlayClick(videoData.id);
  //     if (success) {
  //       setPlaying(true); // Start playing after user clicks and is authenticated
  //     }
  //   }
  // };
  const handleUserClick = async () => {
    if (playing) {
      setPlaying(false); // Pause the video if it's already playing
    } else {
      const success = await handlePlayClick(videoData.id);
      if (success) {
        setPlaying(true); // Start playing only after video URL is fetched
      }
    }
  };

  return (
    <div
      // ref={containerRef} // Reference to container div
      className="video-wrap-div relative w-[100%] overflow-hidden"
      onContextMenu={(e) => e.preventDefault()} // Prevent context menu
      style={{
        paddingBottom: "56.25%", // 16:9 aspect ratio (height/width * 100%)
        position: "relative",
      }}
    >
      <ReactPlayer
        // ref={playerRef} // Reference to the ReactPlayer component
        url={videoUrl || videoData.videoUrl} // Load URL dynamically
        // playing={isPlay === "true" && playing ? true : false}
        playing
        controls
        width="100%" // Make the player take full width of the container
        height="100%" // The player should take full height of the container
        onClick={handleUserClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }} // Positioning player absolutely inside the container
        className="react-player"
        light={
          <img
            src={videoData.thumbnailUrl}
            alt="Video Thumbnail"
            style={{ width: "100%", height: "100%" }}
          />
        }
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // Disable download button in HTML5 video controls
              onContextMenu: (e: any) => e.preventDefault(), // Disable right-click context menu
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
