import React, { useState, useRef, useEffect } from "react";

const google_map_api_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

let autoComplete;

const loadScript = (url, callback) => {
  //   if (document.getElementById("googleMaps-fav-locations")) {
  //     return;
  //   }
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "googleMaps-fav-locations";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocation = ({ setSelectedLocation }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    console.log("🚀 ~ handleScriptLoad ~ updateQuery");
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        //componentRestrictions: { country: "IN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log(latLng);
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${google_map_api_key}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <label>Search Location</label>
      <input
        ref={autoCompleteRef}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search Location"
      />
    </div>
  );
};

export default SearchLocation;
