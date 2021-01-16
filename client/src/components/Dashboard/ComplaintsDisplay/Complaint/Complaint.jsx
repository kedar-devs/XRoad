import React from "react";
import "./Complaint.css";
import moment from "moment";
const Complaint = () => {
  return (
    <div className="complaint">
      <div className="startingletter">
        <h3>N</h3>
      </div>
      {/* <div className="complaint_details"> */}
      <p className="name">Name</p>
      <p className="date">
        {moment(Date.now()).subtract(10, "days").calendar()}
      </p>
      {/* </div> */}
    </div>
  );
};

export default Complaint;
