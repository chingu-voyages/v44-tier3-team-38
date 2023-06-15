const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/:location", async function (req, res, next) {
    const api_key = process.env.YELP_API_KEY;
    const url = 'https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=10'+"&location="+req.params.location;
    const options = {
        method: 'GET', 
        headers: {
            "Authorization": "Bearer " + api_key,
            "Content-Type": 'application/json'
        }
    };
    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        return res.json(json);
    })
    .catch(err => {
        next(err);
    }); 
});
  
module.exports = router;