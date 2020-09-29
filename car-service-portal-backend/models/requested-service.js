const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RequestedServiceSchema = new Schema({
  service_name: {
    type: String,
    required: true
  },
  service_id: {
    type: String,
    required: true
  },
  centre_id: {
    type: String,
    required: true
  },
  user_id: {
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

module.exports = RequestedService = mongoose.model("requested-service", RequestedServiceSchema);
