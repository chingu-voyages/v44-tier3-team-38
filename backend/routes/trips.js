var express = require("express");
var router = express.Router();
// var Trip = require("");
/* GET home page. */
router.get("/", function (req, res, next) {
  const trip = await Trip.find
  res.json({ test: "test response from index" });
});

module.exports = router;
