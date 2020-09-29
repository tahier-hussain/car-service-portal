const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ServiceDetailsSchema = new Schema({
  description: {
    type: String,
    required: false
  },
  service_provided_id: {
    type: String,
    required: true,
    unique: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ServiceDetails = mongoose.model("service-details", ServiceDetailsSchema);
