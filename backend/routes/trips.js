var express = require("express");
var router = express.Router();
const Trip = require("../db/models")["Trip"];

// var Trip = require("");
/* GET home page. */
router.get("/", async function (req, res, next) {
  const trips = await Trip.findAll();
  res.json(trips);
});

router.post("/", async function (req, res, next) {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const newTrip = new Trip({
    startDate,
    endDate,
  });

  let trip = await newTrip.save();
  return res.json(trip);
});

module.exports = router;
