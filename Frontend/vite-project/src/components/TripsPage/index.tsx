import React from "react";
import TripGoogleMaps from "../GoogleMaps/index";
import "./Trips.css";
import CreateTrip from "../CreateTrip";

const Trips = () => {
  return (
    <div className="main-trip-div-page">
      <h3>Trips</h3>
      <CreateTrip />
      <div className="trip-google-maps">
        <TripGoogleMaps />
      </div>
    </div>
  );
};

export default Trips;
