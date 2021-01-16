import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComplaintPageHistory from "./ComplaintPageHistory/ComplaintPageHistory";
import ProcessForm from "../Forms/ProcesForm/ProcessForm";
import "./ComplaintPage.css";
import moment from "moment";
import HorizontalLineHeading from "../HorizontalLineHeading/HorizontalLineHeading";
import axios from "axios";

const ComplaintPage = () => {
  let params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/complain/get-complain/${params.id}`)
      .then(({ data }) => {
        setName(data.compname.join(", "));
        setEmail(data.comemail.join(", "));
        console.log(data);
        setApiData([
          {
            title: "Description Of Problem:",
            value: data.discription,
          },
          {
            title: "Registered On:",
            value: data.regDate,
          },
          {
            title: "Priority:",
            value: data.priority,
          },
          {
            title: "No Of Upvotes:",
            value: data.upvotes,
          },
          {
            title: "Ward No",
            value: data.ward,
          },
          {
            title: "Lattitude",
            value: data.lat,
          },
          {
            title: "Longitude",
            value: data.long,
          },
        ]);
      });
  }, []);

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
        {apiData ? (
          <div>
            <h6>
              Name
              <p className="complaintpage_details_highlight">{name}</p>
            </h6>
            <h6>
              Emails
              <p className="complaintpage_details_highlight">{email}</p>
            </h6>
            {apiData.map((d) => (
              <h6>
                {d.title}
                <p className="complaintpage_details_highlight">{d.value}</p>
              </h6>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
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
        <ProcessForm id={params.id} />
      </Grid>
    </Grid>
  );
};

export default ComplaintPage;
