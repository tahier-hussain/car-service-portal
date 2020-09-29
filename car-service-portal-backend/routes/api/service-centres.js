const express = require("express");
const router = express.Router();
const serviceCentresController = require("../../controllers/service-centres");
const auth = require("../../middleware/auth");

router.post("/get-nearby-centres", serviceCentresController.get);

router.post("/get-one", serviceCentresController.getOne);

module.exports = router;
