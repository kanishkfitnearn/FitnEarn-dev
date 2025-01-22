import React from "react";

const GetDirections = ({ userLocation, gymLocation }) => {
  const handleGetDirections = () => {
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${gymLocation.lat},${gymLocation.lng}`;
    const travelMode = "driving"; // driving, walking, bicycling, transit

    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${travelMode}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <button
      onClick={handleGetDirections}
      className="text-orange-500 hover:underline"
    >
      Get directions
    </button>
  );
};

export default GetDirections;
