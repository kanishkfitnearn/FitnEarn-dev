// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
// } from "@vis.gl/react-google-maps";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { darkModeStyles } from "../assets/constant";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const MapCard = ({ position }) => {
  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Map options including dark mode styles
  const mapOptions = useMemo(
    () => ({
      styles: darkModeStyles,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    }),
    []
  );

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apikey || "",
  });

  // Handle the map load event
  const onMapLoad = useCallback(() => {
    console.log("Map loaded successfully");
  }, []);
  const onMarkerLoad = useCallback((marker) => {
    console.log("Marker loaded successfully");
  }, []);

  if (loadError) {
    return <div className="text-red-500">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="text-gray-500">Loading maps...</div>;
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={13}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {position && position.lat && position.lng && (
          <Marker
            position={position}
            onLoad={onMarkerLoad}
            // Add visible prop explicitly
            visible={true}
            // Optional: Add custom marker icon
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </div>
    // <APIProvider apiKey={apikey}>
    //   <div className="w-full h-96">
    //     <Map
    //       center={position}
    //       zoom={14}
    //       mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
    //       styles={darkModeStyles}
    //       options={{
    //         styles: darkModeStyles, // Apply dark mode styles
    //         disableDefaultUI: true, // Disable UI controls
    //       }}
    //     >
    //       <AdvancedMarker position={position}>
    //         <Pin
    //           background={"red"}
    //           borderColor={"white"}
    //           glyphColor={"white"}
    //         />
    //       </AdvancedMarker>
    //     </Map>
    //   </div>
    // </APIProvider>
  );
};

MapCard.propTypes = {
  position: PropTypes.object.isRequired,
};

export default MapCard;
