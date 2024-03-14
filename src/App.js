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
  const [image, setImage] = useState(null);

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
    setLocations((prev) => [...prev, location]);
  };

  const addImage = (imageUrl) => {
    setImage(imageUrl);
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
          {image ? <Cuboid imageUrl={image} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
