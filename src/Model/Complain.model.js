const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ActionSchema = Schema({
  action: { type: String },
  link: { type: String },
  officer: { type: String },
});
const ComplainBox = Schema({
  priority: { type: Number, required: true },
  level: { type: Number, required: true },
  upvotes: { type: Number, required: true },
  discription: { type: String, required: true },
  ward: { type: Number, required: true },
  lat: { type: String, required: true },
  long: { type: String, required: true },
  img: { type: String, required: true },
  comemail: { type: [String], required: true },
  compname: { type: [String], required: true },
  regDate: { type: Date, required: true },
  ActionTaken: [ActionSchema],
  ActionDate: { type: Date },
});
const complain = mongoose.model("Complain", ComplainBox);
module.exports = complain;
