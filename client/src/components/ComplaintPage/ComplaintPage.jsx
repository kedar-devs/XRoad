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
  const [jobs, setJobs] = useState([]);
  const [image, setImage] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/complain/get-complain/${params.id}`)
      .then(({ data }) => {
        setName(data.compname.join(", "));
        setEmail(data.comemail.join(", "));
        console.log(data);
        console.log(data.ActionTaken);
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
          {
            title: "Image",
            value: data.img,
          },
          //   {
          //     title: "Job done",
          //     value: data.ActionTaken,
          //   },
        ]);
        setImage(data.img);
        setJobs(data.ActionTaken);
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
            {apiData.map((d, i) => (
              <h6 key={i}>
                {d.title}
                <p className="complaintpage_details_highlight">{d.value}</p>
              </h6>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </Grid>
      <Grid item container md={5} sm={12}>
        {apiData[7] ? <img src={apiData[7].value} /> : <></>}
      </Grid>
      <HorizontalLineHeading title="Complaint History" />
      <Grid item container>
        {jobs.map((job) => (
          <ComplaintPageHistory data={job} />
        ))}
      </Grid>
      <Grid>
        <ProcessForm id={params.id} />
      </Grid>
    </Grid>
  );
};

export default ComplaintPage;
