import "./App.css";
import { useState, useEffect } from "react";
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
      {currentLocation.lat}
      <GetUserLocation setCurrentLocation={setCurrentLocation} />
    </div>
  );
}

export default App;
