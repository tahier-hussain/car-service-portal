const express = require("express");
const router = express.Router();
const serviceDetailsController = require("../../controllers/service-details");
const auth = require("../../middleware/auth");

router.post("/add-description", serviceDetailsController.addDescription);

router.post("/get-service-details", serviceDetailsController.getServiceDetails);

router.delete("/delete", auth, serviceDetailsController.delete);

module.exports = router;
