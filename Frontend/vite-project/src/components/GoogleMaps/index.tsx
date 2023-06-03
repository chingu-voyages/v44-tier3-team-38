import React, { useEffect, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { business } from "./mockData";
import "./GoogleMaps.css";

// const latMarker: number = business[0].coordinates.latitude;
// const lngMarker: number = business[0].coordinates.longitude;

// console.log(latMarker, lngMarker);

const containerStyle = {
  height: "100vh",
  width: "100%",
};

// const markerPosition = {
//   lat: latMarker,
//   lng: lngMarker,
// };
const locations = [
  {
    lat: 37.772,
    lng: -122.214,
  },
  {
    lat: 37.672,
    lng: -122.219,
  },
  {
    lat: 37.832,
    lng: -122.424,
  },
];

const TripGoogleMaps: React.FC = () => {
  const center = useMemo(() => ({ lat: 37.09024, lng: -95.712891 }), []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAGiZ0jn302vwLSuChWuuRziuxMWfvEmKs",
  });


  const mapProps = {
    center,
    zoom: 4.5,
  };

  const onLoad = (marker: any) => {
    console.log("marker: ", marker);
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} {...mapProps}>
      {locations?.length &&
        locations?.map((markerPos) => (
          <Marker onLoad={onLoad} position={markerPos} />
        ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default TripGoogleMaps;
