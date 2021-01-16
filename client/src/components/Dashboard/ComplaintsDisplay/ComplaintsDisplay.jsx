import React, { useState, useEffect } from "react";
import Complaint from "./Complaint/Complaint";
import "./ComplaintsDisplay.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const ComplaintsDisplay = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Xroad"));
    // console.log(JSON.parse(token));
    if (!token) history.push("/login");
    if (token.level === "1") {
      axios
        .get(`http://localhost:5000/complain/get-ward-complains/${token.ward}`)
        .then((res) => {
          console.log(res);
          setComplaints(res.data);
        })
        .catch((err) => {
          console.log("There is an error here in getting the data per ward");
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:5000/complain/get-levelwise/${token.level}`)
        .then((res) => {
          console.log(res);
          setComplaints(res.data);
        })
        .catch((err) => {
          console.log("There is an error here in getting the data per ward");
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="ComplaintsDisplay">
      {complaints.map((complaint) => (
        <Complaint key={complaint._id} data={complaint} />
      ))}
    </div>
  );
};

export default ComplaintsDisplay;
