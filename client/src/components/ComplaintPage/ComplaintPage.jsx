import { Grid } from "@material-ui/core";
import React from "react";
import "./ComplaintPage.css";
import moment from "moment";
import HorizontalLineHeading from "../HorizontalLineHeading/HorizontalLineHeading";
const ComplaintPage = (props) => {
  console.log(props.location.params);
  const data = [
    {
      title: "Filer Name",
      value: "Name",
    },
    {
      title: "Filer Email",
      value: "Email@gmail.com",
    },
    {
      title: "Description Of Problem:",
      value: " Lorem ipsum dolor sit amet consectetur adipisicing",
    },
    {
      title: "Registered On:",
      value: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Priority:",
      value: 1,
    },
    {
      title: "No Of Upvotes:",
      value: 3,
    },
    {
      title: "Ward No",
      value: 1,
    },
    {
      title: "Lattitude",
      value: " 123456.22",
    },
    {
      title: "Longitude",
      value: " 123456.22",
    },
  ];
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="complaintpage"
    >
      <HorizontalLineHeading title="Complaint Details" />
      <Grid
        item
        container
        md={8}
        sm={12}
        direction="column"
        className="complaintpage_details"
      >
        {data.map((d) => (
          <h6>
            {d.title}
            <p className="complaintpage_details_highlight">{d.value}</p>
          </h6>
        ))}
        {/* <p>Filer Email:-email</p>
        <p>
          Description of problem:-.
        </p>
        <p>
          Registered On:-{moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p>Priority:{"  "}1</p>
        <p>No of upvotes:{"  "}3</p>
        <p>Ward No:{"  "} 3</p>
        <p>Address: Lorem ipsum dolor sit amet consectetur adipisicing. </p> */}
      </Grid>
      <Grid item container md={4} sm={12}>
        <img
          src="https://media.istockphoto.com/photos/pot-hole-picture-id174662203?k=6&m=174662203&s=612x612&w=0&h=_tbGPLKp7e3p65fpskyxI3iYAkLBY1lmkiT4QEaLTOI="
          alt="complain image"
        />
      </Grid>
    </Grid>
  );
};

export default ComplaintPage;
