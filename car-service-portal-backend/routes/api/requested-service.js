const express = require("express");
const router = express.Router();
const requestedServiceController = require("../../controllers/requested-service");
const auth = require("../../middleware/auth");

router.post("/add", auth, requestedServiceController.create);

router.get("/get", requestedServiceController.get);

router.post("/get-one", requestedServiceController.getUserPost);

router.put("/update-post", auth, requestedServiceController.update);

router.delete("/delete-post", auth, requestedServiceController.delete);

module.exports = router;
