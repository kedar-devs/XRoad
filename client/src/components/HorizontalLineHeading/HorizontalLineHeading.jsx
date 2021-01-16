import React from "react";
import "./HorizontalLineHeading.css";
const HorizontalLineHeading = ({ title, dark }) => {
  return (
    <>
      <h1 className={`title ${dark ? "darkbg" : ""}`}>{title}</h1>
    </>
  );
};

export default HorizontalLineHeading;
