import React, { useRef, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import "./Map.css";

const Map = ({ selectedLocation, handleSelectedLocation }) => {
  const searchBoxRef = useRef();
  const mapRef = useRef();
  const libraries = ["places"];

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      console.log("🚀 ~ handlePlacesChanged ~ places:", places);
      if (!Array.isArray(places) || places.length < 0) return;
      let lat = places[0].geometry.location.lat();
      let lng = places[0].geometry.location.lng();
      handleSelectedLocation({ lat, lng });
    }
  };

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={selectedLocation}
          zoom={13}
          onLoad={(map) => (mapRef.current = map)}
          options={{ streetViewControl: false }}
        >
          <MarkerF
            position={selectedLocation}
            icon={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          />
          {true && (
            <StandaloneSearchBox
              onLoad={(ref) => {
                searchBoxRef.current = ref;
              }}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                placeholder="Customized your placeholder"
                className="search-box"
              />
            </StandaloneSearchBox>
          )}
        </GoogleMap>
      </LoadScript>
      {false && (
        <>
          <div className="outer-frame f1"></div>
          <div className="outer-frame f2"></div>
          <div className="outer-frame f3"></div>
          <div className="outer-frame f4"></div>
        </>
      )}
    </div>
  );
};

export default Map;
