import React from "react";
import "./HorizontalLineHeading.css";
const HorizontalLineHeading = ({ title, dark }) => {
  return (
    <>
      <h1 className="title" className={`${dark ? "dark" : ""}`}>
        {title}
      </h1>
    </>
  );
};

export default HorizontalLineHeading;
