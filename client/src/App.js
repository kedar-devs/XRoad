import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage/LandingPage";
import ComplainForm from "./components/Forms/CitizenForm";
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
      <Router>
        <GetUserLocation setCurrentLocation={setCurrentLocation} />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/lodge-complaint">
            <ComplainForm center={currentLocation} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
