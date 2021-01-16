import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage/LandingPage";
import ComplainForm from "./components/Forms/CitizenForm/CitizenForm";
import UpvoteForm from "./components/Forms/UpvoteForm/UpvoteForm";
import GetUserLocation from "./components/GetUserLocation";
import DisplayTable from "./components/DisplayTable/DisplayTable";
import HorizontalLineHeading from "./components/HorizontalLineHeading/HorizontalLineHeading";
import AuthorityDashboard from "./components/Dashboard/AuthorityDashboard";
import ProcessPage from "./components/Forms/ProcesForm/ProcessForm";
import LoginForm from "./components/Forms/LoginForm/LoginForm";
import ComplaintsDisplay from "./components/Dashboard/ComplaintsDisplay/ComplaintsDisplay";
import ComplaintPage from "./components/ComplaintPage/ComplaintPage";
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
          <Route path="/upvote/:id" component={UpvoteForm} />
          <Route path="/authority-dashboard">
            <AuthorityDashboard />
          </Route>
          <Route path="/allcomplaints">
            <HorizontalLineHeading title={"Registred Complaints"} dark="true" />
            <DisplayTable />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/complaint/:id">
            <ComplaintPage />
          </Route>
          <Route path="/view-and-proceed/:id" component={ProcessPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
