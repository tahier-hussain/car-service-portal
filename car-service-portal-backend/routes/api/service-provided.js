const express = require("express");
const router = express.Router();
const serviceProvidedController = require("../../controllers/service-provided");
const auth = require("../../middleware/auth");

router.post("/add", auth, serviceProvidedController.create);

router.get("/get", serviceProvidedController.get);

router.get("/get-user-service", auth, serviceProvidedController.getUserService);

router.post("/get-one", serviceProvidedController.getOne);

router.put("/update", auth, serviceProvidedController.update);

router.delete("/delete", auth, serviceProvidedController.delete);

module.exports = router;
