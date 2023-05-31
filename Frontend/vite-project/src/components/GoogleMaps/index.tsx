import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { business } from "./exampleFile";
import "./GoogleMaps.css";

const latMarker = business[0].coordinates.latitude;
const lngMarker = business[0].coordinates.longitude;

// console.log(latMarker, lngMarker);

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.09024,
  lng: -95.712891,
};

const markerPosition = {
  lat: latMarker,
  lng: lngMarker,
};

const TripGoogleMaps: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapProps = {
    center,
    zoom: 4.5,
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} {...mapProps}>
      <Marker position={markerPosition} onLoad={onLoad} />
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default TripGoogleMaps;
