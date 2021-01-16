import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import "./ComplaintPageHistory.css";
import SeepdfBtn from "./SeepdfBtn";
const ComplaintPageHistory = ({ value }) => {
  console.log(value);
  return (
    <Grid
      container
      item
      className="complaintPageHistory"
      direction="row"
      alignItems="center"
      justify="center"
    >
      {/* <Grid container item xs={1}></Grid> */}
      {/* <Grid
        item
        container
        xs={11}
        direction="row"
        justify="space-between"
        alignItems="center"
        > */}
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
