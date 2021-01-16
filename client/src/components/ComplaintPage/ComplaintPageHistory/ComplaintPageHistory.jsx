import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import "./ComplaintPageHistory.css";
import SeepdfBtn from "./SeepdfBtn";
const ComplaintPageHistory = ({ data }) => {
  console.log(data);
  return (
    <Grid
      container
      item
      className="complaintPageHistory"
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid container item alignItems="center">
        <Avatar>A</Avatar>
        <p>Officer Name</p>
      </Grid>
      <Grid container item justify="space-between">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
          laborum.
        </p>
        <SeepdfBtn />
      </Grid>
    </Grid>
    // </Grid>
  );
};

export default ComplaintPageHistory;
