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
        <Avatar>{data.officer[0]}</Avatar>
        <p>{data.officer}</p>
      </Grid>
      <Grid container item justify="space-between">
        <p>{data.action}</p>
        <SeepdfBtn link={data.link} />
      </Grid>
    </Grid>
    // </Grid>
  );
};

export default ComplaintPageHistory;
