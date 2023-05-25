var express = require("express");
var router = express.Router();
const Location = require("../../db/models")["Location"];

// var Trip = require("");
/* GET home page. */

router.get("/", async function (req, res, next) {
  const tripId = req.params.tripId;
  const locations = await Location.findAll({
    where: {
      tripId
    }
  });
  res.json(locations);
});

router.post("/", async function (req, res, next) {
  const tripId = req.params.tripId;
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

router.delete("/:locationId", async function (req, res, next) {
  try {
    let location = await Trip.findById(req.params.tripId);
    trip.delete();
    return res.send("trip has been successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
