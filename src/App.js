import React, { useState } from "react";
import Map from "./components/Map";
import SearchLocation from "./components/SearchLocation";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 14.0169,
    lng: 74.3272,
  });

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="App">
      <h1>Mark your favourite locations</h1>
      {/* <SearchLocation setSelectedLocation={setSelectedLocation} /> */}
      <Map
        selectedLocation={selectedLocation}
        handleSelectedLocation={handleSelectedLocation}
      />
    </div>
  );
}

export default App;
