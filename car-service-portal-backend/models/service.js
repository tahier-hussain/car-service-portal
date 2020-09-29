const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ServiceSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Service = mongoose.model("service", ServiceSchema);
