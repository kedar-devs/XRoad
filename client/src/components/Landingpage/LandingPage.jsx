import React from "react";
import LandingButton from "./LandingButtons/LandingButton";
import "./LandingPage.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="landingpage">
      <nav>
        <Link to="/login">
          <LandingButton title="Login" />
        </Link>
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
