import { useState } from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ center, zoom }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={zoom}
      ></GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 8.0844,
    lng: 77.5495,
  },
  zoom: 6,
};

export default Map;
