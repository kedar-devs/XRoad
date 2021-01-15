import React from "react";
import LandingButton from "./LandingButtons/LandingButton";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="landingpage">
      <nav></nav>
      <div className="heading">
        <h2>XRoad</h2>
        <p>Lets make road building easy...</p>
        <div className="buttons">
          <LandingButton title="Lodge a complaint" />
          <LandingButton title="Check data" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
