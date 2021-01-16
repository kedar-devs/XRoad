import { Grid } from "@material-ui/core";
import React from "react";
import "./ComplaintPage.css";
import moment from "moment";
import HorizontalLineHeading from "../HorizontalLineHeading/HorizontalLineHeading";
import ComplaintPageHistory from "./ComplaintPageHistory/ComplaintPageHistory";
import ProcessForm from "../Forms/ProcesForm/ProcessForm";
import { useParams } from "react-router-dom";
const ComplaintPage = (props) => {
  console.log(props.match);
  const { id } = useParams();
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
        md={7}
        sm={12}
        direction="column"
        className="complaintpage_details"
      >
        {data.map((d, i) => (
          <h6 key={i}>
            {d.title}
            <p className="complaintpage_details_highlight">{d.value}</p>
          </h6>
        ))}
      </Grid>
      <Grid item container md={5} sm={12}>
        <img
          src="https://media.istockphoto.com/photos/pot-hole-picture-id174662203?k=6&m=174662203&s=612x612&w=0&h=_tbGPLKp7e3p65fpskyxI3iYAkLBY1lmkiT4QEaLTOI="
          alt="complain image"
        />
      </Grid>
      <HorizontalLineHeading title="Complaint History" />
      <Grid item container>
        <ComplaintPageHistory value={"hello"} />
      </Grid>
      <Grid>
        <ProcessForm id={id} />
      </Grid>
    </Grid>
  );
};

export default ComplaintPage;
