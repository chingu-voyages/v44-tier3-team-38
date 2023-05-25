var express = require("express");
var router = express.Router();
const Location = require("../../db/models")["Location"];

//GET ALL LOCATIONS FOR SPECIFIC TRIPID
router.get("/", async function (req, res, next) {
  const tripId = req.tripId;
  const locations = await Location.findAll({
    where: {
      tripId
    }
  });
  res.json(locations);
});

//CREATE LOCATION FOR TRIP
router.post("/", async function (req, res, next) {
  const tripId = req.tripId;
  const name = req.body.name;
  const address = req.body.address;
  const newLocation = new Location({
    tripId,
    name,
    address
  });
  let location = await newLocation.save();
  return res.json(location);
});

//DELETE LOCATION FOR SPECIFIC TRIPID
router.delete("/:locationId", async function (req, res, next) {
  try {
    let location = await Location.findByPk(req.params.locationId);
    await location.destroy();
    return res.send("location has been successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
