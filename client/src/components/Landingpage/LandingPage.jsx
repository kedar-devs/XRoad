import React from "react";
import LandingButton from "./LandingButtons/LandingButton";
import "./LandingPage.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const logoutuser = () => {
    localStorage.removeItem("Xroad");
  };
  return (
    <div className="landingpage">
      <nav>
        {localStorage.getItem("Xroad") ? (
          <>
            <div onClick={logoutuser}>
              <LandingButton title="Log out" />
            </div>
            <Link to="/authority-dashboard">
              <LandingButton title="Dashboard" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <LandingButton title="Login" />
          </Link>
        )}
      </nav>
      <div className="heading">
        <h2>XRoad</h2>
        <p>Lets make road building easy...</p>
        <div className="buttons">
          <Link to="/lodge-complaint">
            <LandingButton title="Lodge a complaint" />
          </Link>
          <Link to="/allcomplaints">
            <LandingButton title="Check data" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
