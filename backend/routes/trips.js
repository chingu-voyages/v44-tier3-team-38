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
  const title = req.body.title;
  const date = new Date(req.body.date);
  const newTrip = new Trip({
    title,
    date
  });

  let trip = await newTrip.save();
  return res.json(trip);
});

module.exports = router;
