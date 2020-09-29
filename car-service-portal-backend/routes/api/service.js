const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/service");
const auth = require("../../middleware/auth");

router.post("/add", serviceController.create);

router.get("/get", serviceController.get);

router.put("/update", auth, serviceController.update);

router.delete("/delete", auth, serviceController.delete);

module.exports = router;
