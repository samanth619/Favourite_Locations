import React, { useState } from "react";
import Map from "./components/Map";
import Header from "./components/header";
import Cuboid from "./components/Cuboid";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 35.6764,
    lng: 139.65,
  });
  const [locations, setLocations] = useState([selectedLocation]);
  const [images, setImages] = useState([]);

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
    setLocations((prev) => [...prev, location]);
  };

  const addImage = (imageUrl) => {
    setImages((prev) => [...prev, imageUrl]);
  };

  return (
    <div className="App">
      <Header />
      {/* <SearchLocation setSelectedLocation={setSelectedLocation} /> */}
      <div className="main">
        <Map
          selectedLocation={selectedLocation}
          handleSelectedLocation={handleSelectedLocation}
          addImage={addImage}
        />
        <div className="crafts">
          {images.map((image, index) => {
            return <Cuboid key={index} imageUrl={image} id={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
