import React, { useState, useEffect } from "react";
import Complaint from "./Complaint/Complaint";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
const ComplaintsDisplay = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Xroad"));
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
    <>
      {complaints.map((complaint, k) => (
        <Grid key={k} item container md={4} sm={3} xs={6} key={complaint._id}>
          <Link
            to={`/complaint/${complaint._id}`}
            style={{ textDecoration: "none" }}
          >
            <Complaint data={complaint} />
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default ComplaintsDisplay;
