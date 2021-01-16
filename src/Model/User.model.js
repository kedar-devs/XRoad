const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema({
  email: { type: String, required: true },
  name: { type: String },
});
