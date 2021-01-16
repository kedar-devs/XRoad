import React from "react";
import "./Complaint.css";
import moment from "moment";
const Complaint = ({ data }) => {
  console.log(data);
  return (
    <div className="complaint">
      <div className="startingletter">
        <h3>{data.compname[0][0]}</h3>
      </div>
      {/* <div className="complaint_details"> */}
      <p className="name">{data.compname[0]}</p>
      <p className="date">
        {moment(data.regDate).subtract(10, "days").calendar()}
      </p>
      {/* </div> */}
    </div>
  );
};

export default Complaint;
