import MapCard from "./MapCard";
import GetDirections from "./GetDirection";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_PLACE_DETAIL } from "../utils/API";

const GymPage = () => {
  const location = useLocation();
  const data = location.state;
  const [gymData, setGymData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(data?.placeId);
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${GET_PLACE_DETAIL}/${data.placeId}`);
        setGymData(response.data);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [data.placeId]);

  const userLocation = { lat: 26.8467, lng: 80.9462 };
  // const gymLocation = { lat: 28.5035123302915, lng: 77.39148138029151 };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="p-6 space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{gymData?.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-yellow-500 text-lg">{gymData?.rating}</span>
              <span>{gymData?.reviews?.length}</span>
              <span className="text-sm text-gray-400">Open until 10:00 PM</span>
              <span>•</span>
              <span className="text-gray-400">{gymData?.address}</span>
              <GetDirections
                userLocation={userLocation}
                gymLocation={gymData?.geometry}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-gray-800 p-2 rounded-lg">❤️</button>
            <button className="bg-gray-800 p-2 rounded-lg">Share</button>
          </div>
        </div>

        <div className="grid grid-cols-3 border gap-4">
          <img
            src={gymData?.image}
            alt="Main"
            className="col-span-2 rounded-lg"
          />
          {/* <div className="flex flex-col gap-4">
            <img
              src="https://via.placeholder.com/150"
              alt="1"
              className="rounded-lg"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="2"
              className="rounded-lg"
            />
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt="3"
                className="rounded-lg"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                16 Images
              </span>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">About</h2>
              <p className="text-gray-400 mt-2">
                Experienced fitness coach dedicated to helping individuals
                achieve their health and wellness goals. Passionate about
                motivating clients and empowering them to lead active and
                balanced lifestyles.
              </p>
            </div>
            {/* Map */}
            <div className="rounded-lg overflow-hidden">
              <MapCard position={gymData?.geometry} />
            </div>
            {/* Services */}
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-gray-800 rounded-full">Yoga</span>
              <span className="px-4 py-2 bg-gray-800 rounded-full">Gym</span>
              <span className="px-4 py-2 bg-gray-800 rounded-full">Zumba</span>
            </div>
          </div>

          {/* Booking Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Book your session</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg">Cardio Session</h3>
                <p className="text-gray-400">Sat, 8 June</p>
                <p className="text-gray-400">03:00 AM - 04:00 AM</p>
                <p className="text-orange-500 mt-2">₹450 (15% OFF)</p>
                <button className="w-full bg-orange-500 py-2 rounded-lg mt-4">
                  Book Now
                </button>
              </div>
              {/* Repeat for other sessions */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GymPage;
