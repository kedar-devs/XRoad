import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "400px",
};

const Map = ({ center, updateLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    updateLocation(markerPosition);
  }, [markerPosition, updateLocation]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC97Nl6IVxQFCv_lMuK3kBLMDsaXhV8yGA",
  });

  const handleClick = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
