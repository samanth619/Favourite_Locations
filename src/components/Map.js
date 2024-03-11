import React, { useRef, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import "./Map.css";
import captureMapAsImage from "../utils/captureMapAsImage";
import love from "../assets/love-dark.png";

const libraries = ["places"];

const Map = ({ selectedLocation, handleSelectedLocation, addImage }) => {
  const searchBoxRef = useRef();
  const mapRef = useRef();

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

  const createMapBox = async () => {
    let imageUrl = await captureMapAsImage(
      document.getElementById("map-region")
    );
    addImage(imageUrl);
  };

  return (
    <div className="actions">
      <div className="map" id="map-region">
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
            <MarkerF position={selectedLocation} icon={love} />
            {true && (
              <StandaloneSearchBox
                onLoad={(ref) => {
                  searchBoxRef.current = ref;
                }}
                onPlacesChanged={handlePlacesChanged}
              >
                <div className="search-box-container">
                  <input
                    type="text"
                    placeholder="Search for a location"
                    className="search-box"
                    id="search-location"
                  />
                </div>
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
      <button className="btn" type="button" onClick={createMapBox}>
        Create Craft
      </button>
    </div>
  );
};

export default Map;
