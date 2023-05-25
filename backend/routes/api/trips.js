var express = require("express");
var router = express.Router();
const Trip = require("../../db/models")["Trip"];

//GET ALL TRIPS (FILTER BY USER ID ONCE USER AUTH IS DONE)
router.get("/", async function (req, res, next) {
  const trips = await Trip.findAll();
  res.json(trips);
});

//CREATE NEW TRIP (ADD USER ID ONCE USER AUTH IS DONE)
router.post("/", async function (req, res, next) {
  const title = req.body.title;
  const date = new Date(req.body.date);
  const newTrip = new Trip({
    title,
    date
  });
  let trip;
  try {
    trip = await newTrip.save();
    return res.json(trip);
  } catch (err) {
    return next(err);
  }
  // return res.json(trip);
});

// GET TRIP BY TRIPID
router.get("/:tripId", async function (req, res, next) {
  const trip = await Trip.findByPk(req.params.tripId);
  if(trip === null) {
    const error = new Error("Trip not found");
    error.status = 404;
    error.name = "Trip not found";
    return next(error);
  }
  return res.json({ trip });
});

//DELETE TRIP BY TRIPID
router.delete("/:tripId", async function (req, res, next) {
  try {
    const trip = await Trip.findByPk(req.params.tripId);
    await trip.destroy();
    return res.send("trip has been successfully deleted");
  } catch (err) {
    next(err);
  }
})

module.exports = router;
