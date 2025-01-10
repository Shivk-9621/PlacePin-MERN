const express = require("express");
const PlacesControllers = require('../controllers/places-controller')

const router = express.Router();

router.get("/:pid", PlacesControllers.getPlaceByID);

router.get("/user/:uid", PlacesControllers.getPlaceByUserId);

router.post("/", PlacesControllers.createPlace);

module.exports = router;
