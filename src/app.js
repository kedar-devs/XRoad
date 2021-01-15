const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
// const StudentRoute = require("./db/routes/Student.route")
// const ClassworkRoute = require("./db/routes/Classwork.route")
const AuthorityRoute = require("./Routes/admin.route");
// const Bankhata=require("./db/routes/Bank.route")
const ComplainRoute = require("./Routes/complain.route");
require("./mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/Data", express.static(path.join(__dirname + "/Routes/Data")));
app.use("/complain", ComplainRoute);
app.use("/admin", AuthorityRoute);
// app.use('/User',ClassworkRoute)
// app.use('/something',Bankhata)

module.exports = app;
