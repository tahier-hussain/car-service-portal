const express = require("express");
const router = express.Router();
const ServiceCentreRegisterController = require("../../controllers/service-centre-register");

router.post("/", ServiceCentreRegisterController.register);

module.exports = router;
