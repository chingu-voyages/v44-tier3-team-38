import React, { useMemo } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
// import { business } from "./mockData";
import "./GoogleMaps.css";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

// testing data
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
  {
    lat: 42.962891037731644,
    lng: -85.67038868154219,
  },
];

const TripGoogleMaps: React.FC = () => {
  const center = useMemo(
    () => ({ lat: 37.09024, lng: -95.712891 }),
    []
  );
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = (marker: object) => {
    console.log("marker: ", marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={4}
      center={center}
    >
      {locations?.length &&
        locations?.map((markerPos) => (
          <MarkerF
            key={locations.indexOf(markerPos)}
            position={markerPos}
            onLoad={onLoad}
          />
        ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default TripGoogleMaps;
