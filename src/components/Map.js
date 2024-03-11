import React, { useRef, useState } from "react";
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
  const [creatingCraft, setCreatingCraft] = useState(false);

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (!Array.isArray(places) || places.length < 0) return;
      let lat = places[0].geometry.location.lat();
      let lng = places[0].geometry.location.lng();
      handleSelectedLocation({ lat, lng });
    }
  };

  const createMapBox = async () => {
    try {
      if (!mapRef.current) return;
      setCreatingCraft(true);
      let imageUrl = await captureMapAsImage(
        document.getElementById("map-region")
      );
      addImage(imageUrl);
    } catch (placeholderImage) {
      addImage(placeholderImage);
    } finally {
      setCreatingCraft(false);
    }
  };

  const selectPoint = (e) => {
    handleSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
            draggableCursor="default"
            onLoad={(map) => (mapRef.current = map)}
            options={{ streetViewControl: false }}
            onClick={selectPoint}
          >
            <MarkerF position={selectedLocation} icon={love} />
            {!creatingCraft && (
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
      </div>
      <button className="btn" type="button" onClick={createMapBox}>
        Create Craft
      </button>
    </div>
  );
};

export default Map;
