import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 20.5937, // Default center (India)
  lng: 78.9629,
};

const MapComponent = ({ eventLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    if (eventLocation && !isNaN(eventLocation.lat) && !isNaN(eventLocation.lng)) {
      setMapCenter(eventLocation);
    }
  }, [eventLocation]);

  useEffect(() => {
    if (!isLoaded) return;

    async function initMap() {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const map = new Map(document.getElementById("map"), {
        center: eventLocation || defaultCenter,
        zoom: 20,
        mapId: "4504f8b37365c3d0",
      });

      new AdvancedMarkerElement({
        map,
        position: eventLocation || defaultCenter,
      });

      mapRef.current = map; // Store the map instance
    }

    initMap();
  }, [isLoaded, eventLocation]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return <div id="map" style={mapContainerStyle}></div>;
};

export default MapComponent;
