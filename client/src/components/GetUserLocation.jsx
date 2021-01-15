import React, { useEffect } from "react";

const GetUserLocation = ({ setCurrentLocation }) => {
  //get user location from brwser

  useEffect(() => {
    //Get user current Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getLocation,
        handleLocationError,
        { maximumAge: 1500000, timeout: 0 }
      );
    }
  }, []);

  /* Geolocation api to get nearby airports logic */
  const getLocation = (position) => {
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  function handleLocationError(error) {
    if (error.code === 3)
      // timeout was hit, meaning nothing's in the cache
      // now let's make a non-cached request to get the actual position
      navigator.geolocation.getCurrentPosition(
        getLocation,
        handleLocationError
      );
  }

  return <></>;
};

export default GetUserLocation;
