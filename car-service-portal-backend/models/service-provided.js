const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ServiceProvidedSchema = new Schema({
  service_name: {
    type: String,
    required: true
  },
  service_centre_id: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ServiceProvided = mongoose.model("service-provided", ServiceProvidedSchema);
