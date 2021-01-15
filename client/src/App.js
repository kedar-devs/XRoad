import "./App.css";
import LandingPage from "./components/Landingpage/LandingPage";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import GetUserLocation from "./components/GetUserLocation";

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 15.292158,
    lng: 73.969542,
  });

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

  return (
    <div className="App">
      <LandingPage />
      {currentLocation.lat}
      <Map center={currentLocation} />
      <GetUserLocation setCurrentLocation={setCurrentLocation} />
    </div>
  );
}

export default App;
