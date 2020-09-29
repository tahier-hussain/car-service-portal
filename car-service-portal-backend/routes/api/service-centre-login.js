const express = require("express");
const router = express.Router();
const ServiceCentreLoginController = require("../../controllers/service-centre-login");

router.post("/", ServiceCentreLoginController.login);

module.exports = router;
